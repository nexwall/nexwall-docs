---
title: Microsoft Teams or Microsoft 365 will not sign in
sidebar_position: 4
description: A real case, step by step. Teams shows "Something went wrong" behind the firewall. Find blocked Microsoft names with a DNS capture, add them to Allowed domains, and check the Windows "offline" state.
---

# Microsoft Teams or Microsoft 365 will not sign in

**Applies to:** Nexwall Firewall with DNS filtering enabled · **Audience:** administrators and support

This article follows a real case from the lab, from the first symptom to the checks. The same method works for any
application that works on a direct connection and fails behind the firewall.

## Symptom

A Windows computer behind the firewall works with the internet and with the corporate VPN, but the new Microsoft Teams shows
**"Something went wrong"** and will not sign in. Restarting Teams or the computer does not help. Connecting the computer
directly to the internet, or through a VPN that bypasses the firewall, makes Teams work.

The error details in Teams look like this:

```text
NoNetwork ... "Domain":"com.microsoft.oneauth","ErrorCode":"2606",
"Message":"Invalid authentication credentials for a proxy server. Authentication proxy issue.","SubStatus":"6101"
```

:::note
Despite the words "proxy server", this message is Windows reporting that it has no usable network for the sign-in. It does
not prove that a proxy is configured. Use the steps below to see what really happens.
:::

## Step 1: Rule out the obvious on the firewall

1. In **Web Protection**, turn **SSL inspection** off for the test. If Teams still fails, inspection is not the cause.
2. In the firewall log, check that nothing from the computer is dropped.
3. On the unit, look at the proxy log for the computer's address. Replace `192.168.1.100`:

```bash
grep 192.168.1.100 /var/log/squid/access.log | tail -50
```

Lines such as `TCP_TUNNEL/200 CONNECT teams.microsoft.com:443` mean the connection was allowed. In the real case there were no
denied requests, no authentication requests (`407`) and no drops, so the cause was not the proxy and not the firewall rules.

## Step 2: Capture the computer's DNS and look for blocked names

DNS filtering answers "not found" for a listed name. An application that needs that name fails, and the error it shows
rarely says so. The fastest way to find this is to capture the computer's DNS while you reproduce the problem.

On the unit, start a capture on the LAN interface. It stops by itself after 120 seconds:

```bash
timeout 120 tcpdump -i br-lan -n -s 200 -w /tmp/dns.pcap host 192.168.1.100 and port 53
```

While it runs, close Teams completely and open it again, then wait for the error. Read the capture:

```bash
tcpdump -nn -r /tmp/dns.pcap | grep -E "NXDomain|NXDOMAIN"
```

An answer of `NXDomain` for a Microsoft name is the clue. You can also test a name directly, first on the unit and then
on a public server, and compare:

```bash
dig @127.0.0.1 events.data.microsoft.com
dig @8.8.8.8 events.data.microsoft.com
```

If the public server answers with an address and the unit does not, a block list contains the name.

In the real case the capture showed three Microsoft names answered with `NXDomain`:

| Name | Used by |
|---|---|
| `events.data.microsoft.com` | Microsoft telemetry and sign-in diagnostics |
| `config.edge.skype.com` | Teams configuration |
| `fp.msedge.net` | Edge and WebView2, used inside Teams |

To find which list holds a name, search the lists on the unit:

```bash
grep -rl "events.data.microsoft.com" /mnt/data/threat-feeds/*/ | head
```

The names were in the **advertising and tracking** category. Block lists are broad on purpose, and a few names that
Microsoft applications need are inside categories made for telemetry and advertising.

## Step 3: Add the names to Allowed domains

1. Open **DNS Filtering** and go to **Allowed domains**.
2. Add each name, one per entry, and save.
3. **Apply changes.**
4. Wait about a minute for the filter to reload, then test the names again with `dig @127.0.0.1 <name>`. They must now
   return an address.

Allowed domains win over every list, and they stay in place when the lists update. Allow only the names you saw blocked,
not whole categories. See [DNS filtering](pathname:///docs/security-services/dns-filtering).

If one computer needs unfiltered DNS for a different reason, use the **Filter bypass** tab instead of allowing names.

## Step 4: Check whether Windows thinks it is offline

In the real case, after the three names were allowed, they resolved and Teams' own connections worked, but Teams still
failed. The Windows network icon showed **no internet**. This matters: the Teams sign-in service asks Windows whether
the network is usable, and it refuses to send any request when Windows says "offline". A capture on the firewall confirmed
that while Teams was reopened, the computer sent no DNS query for `login.microsoftonline.com` and no Windows connectivity
check at all. The sign-in was failing on the computer before it sent a packet.

The computer in the case is a Windows host that reaches the firewall through a VMware network adapter, while a Wi-Fi adapter
without a gateway is also connected. Windows runs its connectivity check on the adapter it considers best, and with two
adapters it can pick the one that cannot reach the internet. Check on the Windows computer, in an administrator PowerShell:

```powershell
Get-NetIPConfiguration | Format-List InterfaceAlias,IPv4Address,IPv4DefaultGateway,DNSServer
Get-NetIPInterface -AddressFamily IPv4 | Sort InterfaceMetric | Format-Table InterfaceAlias,InterfaceMetric,ConnectionState
netsh winhttp show proxy
```

What to look for:

- The adapter facing the firewall should have the firewall as **gateway** and **DNS server**, and the **lowest interface
  metric**.
- Other adapters, such as an unused Wi-Fi, should not have a default gateway, and should have a higher metric.
- `netsh winhttp show proxy` should say `Direct access`. A proxy left behind by a VPN client breaks the sign-in the same way.
- A VPN client that was disconnected can leave a virtual adapter, a route or a proxy setting. Quit the client completely.

After correcting, restart the network location service and reopen Teams:

```powershell
Restart-Service NlaSvc
```

The Windows icon must show the network as connected before Teams can sign in.

## Quick checklist

1. Does Teams work on a direct connection? If yes, continue.
2. Is anything dropped, denied or authenticated in the firewall and proxy logs? Normally no.
3. Capture the computer's DNS while reproducing, and look for `NXDomain` on Microsoft names.
4. Find the list that holds the name, then add only that name to **Allowed domains** and apply.
5. Confirm the name resolves on the unit.
6. If Teams still fails, check that Windows reports the network as online, and check adapters, metrics and proxy.

## Related pages

- [DNS filtering](pathname:///docs/security-services/dns-filtering)
- [Web Protection](pathname:///docs/security-services/web-protection)
- [Network troubleshooting tools](network-troubleshooting-tools.md)
- [Troubleshooting](troubleshooting.md)
