---
title: Windows shows "no internet" and Microsoft sign-in fails
sidebar_position: 5
description: A Windows PC that reaches the firewall through a virtual adapter can show the offline icon, and Teams cannot sign in, while browsing works. What was checked, what was ruled out, and a workaround.
---

# Windows shows "no internet" and Microsoft sign-in fails

**Applies to:** Windows 10 and 11 computers behind the firewall · **Audience:** administrators and support

This article continues [Microsoft Teams or Microsoft 365 will not sign in](teams-microsoft-365-signin.md). It describes a real
case in which the firewall was working correctly and the problem was in how Windows decided the computer was offline.

## Symptom

- The Windows network icon shows **offline** ("no internet"), although web pages open.
- The new Microsoft Teams shows that it cannot authenticate and asks to check the network connection or proxy.
- The error details show `NoNetwork`, code `2606`, "Invalid authentication credentials for a proxy server".

## Why it happens

Windows decides if a network has internet with a small connectivity check (NCSI) that it runs **for each network it
knows**. Microsoft sign-in (WAM, used by Teams and Office) asks Windows first and does not even try the network when Windows
says there is no internet.

In the real case the computer is a Windows host running the firewall as a virtual machine. It reaches the firewall through a
virtual adapter (VMware `VMnet 1`), and its real Wi-Fi adapter has no gateway. What was seen:

- `Get-NetConnectionProfile` listed **only the Wi-Fi network**, as "Unidentified network" with `IPv4Connectivity: LocalNetwork`.
- The virtual adapter was up and held the only default route (`0.0.0.0/0` via the firewall), but **Windows had no network
  profile for it**, so it never checked it.
- After restarting the "Network Location Awareness" service, a capture on the firewall showed **no connectivity checks at
  all** from the computer (no query for `dns.msftncsi.com` or `www.msftconnecttest.com`, no HTTP request on port 80). Other
  traffic, including DNS for `login.microsoftonline.com`, reached the firewall normally.
- The firewall dropped nothing, the proxy log had no denied or authentication (`407`) requests, and `netsh winhttp show proxy`
  said direct access.

## How to check

On the Windows computer, in an administrator PowerShell:

```powershell
Get-NetConnectionProfile | Format-List Name,InterfaceAlias,IPv4Connectivity
Get-NetRoute -DestinationPrefix 0.0.0.0/0
Get-NetAdapter | Format-Table Name,Status,InterfaceDescription,Virtual
netsh winhttp show proxy
```

If the adapter that holds the default route is virtual, has no entry in `Get-NetConnectionProfile`, and the networks that are
listed show `LocalNetwork` or `NoTraffic`, this article applies.

On the firewall, capture while you restart the service on the computer (`Restart-Service NlaSvc`) and look for the checks:

```bash
timeout 120 tcpdump -nn -i br-lan host 192.168.1.100 and \( port 53 or port 80 \)
```

A healthy computer asks for `dns.msftncsi.com` and requests `www.msftconnecttest.com/connecttest.txt` on port 80. If neither
appears, Windows is not checking the firewall path.

## What was ruled out

- **Firewall rules and drops:** nothing dropped for the computer.
- **Proxy and Web Protection:** no denied or `407` requests; SSL inspection was off.
- **DNS filtering of Microsoft names:** the names were allowed (see the previous article) and the sign-in still failed.
- **`dns.google`:** the computer was repeating queries for it and getting "not found" because it is in the DoH/VPN bypass list.
  After allowing it on the firewall, and with only the firewall as DNS server, the icon and Teams still failed. It was not the cause.
- **A system proxy:** `netsh winhttp show proxy` said direct access.

## Workaround that worked

Adding **8.8.8.8 as a secondary DNS server** on the computer's network adapter made the icon return to online and Teams sign
in. The reason is not understood. The firewall redirects all DNS from the LAN to its own resolver, so this does not bypass
the filter. Use it as a workaround.

## Other options

These were not tested in this case:

- **Test with a physical adapter.** Connect the computer to the firewall LAN through a real network card instead of a virtual
  adapter. Windows creates a normal network profile for it.
- **Turn off the active connectivity check** (reversible; restart the service afterwards). Windows then stops depending on the check:

```powershell
Set-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Services\NlaSvc\Parameters\Internet' -Name EnableActiveProbing -Value 0 -Type DWord
Restart-Service NlaSvc
```

  Undo it with `-Value 1`.

## Summary

This was a Windows behavior on a test computer that reaches the firewall through a virtual adapter. It is not a firewall fault,
and a normal computer with a physical network card does not need any of this. If Microsoft sign-in fails and the icon shows
offline, check the Windows network profile before changing the firewall.

## Related pages

- [Microsoft Teams or Microsoft 365 will not sign in](teams-microsoft-365-signin.md)
- [DNS filtering](pathname:///docs/security-services/dns-filtering)
- [Network troubleshooting tools](network-troubleshooting-tools.md)
