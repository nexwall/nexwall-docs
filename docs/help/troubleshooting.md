---
title: Troubleshooting
sidebar_position: 1
description: Find the cause of a problem starting from what you observe.
---

# Troubleshooting

Start with the symptom. Each section lists the most likely causes in the order worth checking. Most checks use the web
interface; the few that need the command line refer to [Command line and FAQ](command-line-and-faq.md).

## I cannot open the web interface

1. Make sure your computer is on the **LAN** side and has an address in the LAN network (`192.168.1.0/24` by default).
2. Use `https://` and the address of the unit. Accept the certificate warning of the self-signed certificate.
3. If you changed the access settings in the wizard or the System page, check that your network is allowed to reach the
   web interface.
4. On the console, log in as `root` and run `ip -4 addr` to confirm the address of the LAN.
5. If you lost the password, use the console to reset it, or restore a backup.

## The LAN has no internet

1. Open **Operation & Analytics > Dashboard** and look at the internet connection card.
2. In **Network > Interfaces**, check that the WAN has an address, a gateway and DNS servers. With a static WAN, at
   least one DNS forwarder is required in **Network > DNS & DHCP**.
3. Check that a masquerade rule exists for the LAN in **Policy > NAT**.
4. Check the LAN to WAN policy and rules in **Policy > Zones & Policies** and **Policy > Firewall Rules**.
5. With several WAN links, check the tracking hosts in **Network > SD-WAN**: if none answers, the link is considered
   down.
6. Use [Connections](../operation-analytics/monitor-connections.md) to see whether connections are being created.

For routing, NAT and firewall checks from the command line — `ip route`, `conntrack -L`, `nft list ruleset` and more
— see [Network troubleshooting tools](network-troubleshooting-tools.md).

## Names do not resolve

- Confirm the clients use the unit as their DNS server, or a server that works.
- Check the forwarders in **Network > DNS & DHCP**.
- If DNS filtering is on, check whether the name is on a blocklist, and add it to the allowed domains if it should not
  be blocked.
- Check that a device with its own encrypted DNS is not bypassing the unit.
- To rule out this unit's resolver entirely, query a public one directly: see [Network troubleshooting
  tools](network-troubleshooting-tools.md#dns).

## A service is blocked or not reachable

1. Turn on logging on the rule or the zone and look at the [Logs](../operation-analytics/logs.md).
2. Check the order of the rules: the first match wins.
3. For a published service, confirm the port forward, the destination, and that the zone policy allows the traffic.
4. If [IP and geo blocking](../security-services/ip-geo-blocking.md) is enabled, check whether the address is on a list
   or in a blocked country. Add it to the allowlist if it should be reachable.
5. If the [IPS](../security-services/ips.md) is on, look at the events for blocked traffic.

## Application control does nothing

- Confirm the service is enabled, the rule is enabled, and the changes were applied.
- Check in the live flows that the application is recognized. If it shows as **Unknown**, it cannot be blocked.
- Check that the rule is on the interface that the traffic passes through.
- Check that the address is not in the exceptions.

## A VPN does not connect

| Symptom | Check |
|---|---|
| No handshake at all | The port is open on the WAN and the public address or name in the configuration is correct |
| Connects but cannot reach anything | The routes or the networks in the tunnel definition, and the firewall rules for the VPN zone |
| Certificate errors | The clock on both sides, and whether the certificate expired or was renewed |
| IPsec does not come up | Identifiers are reversed on the two ends, the pre-shared key and the security parameters match, and the service was restarted after changing networks |
| WireGuard peer is silent | The peer has the latest configuration after a server change |

Use the [Logs](../operation-analytics/logs.md) and search for the name of the VPN service.

## The unit will not register or connect to the controller

1. The unit needs outbound internet and correct **time**. A wrong clock makes certificates fail.
2. Check that the unit can resolve names and reach the Nexwall services and the controller address.
3. Check the token or join code: it must be recent and unused.
4. Search the [Logs](../operation-analytics/logs.md) for the registration service.

For the exact commands to run on the unit and on the controller, and what each error message means, see
[Controller registration troubleshooting](controller-registration-troubleshooting.md).

## Updates fail

- The message tells the reason: the update server is under maintenance, the subscription is not valid, or the repository
  address is not set.
- Check the internet connection, DNS and the time.
- Back up before retrying. See [System](../infrastructure/system.md).

## The unit is slow

1. Look at the load and memory in [Performance](../operation-analytics/performance.md).
2. Turn off recently enabled inspection features one at a time to find the one that costs most: the intrusion
   prevention system and application control.
3. Use bypass and exceptions for high volume trusted traffic.
4. Check that the disk is not full, in the alerts.

## Charts show that the database is not reachable

The metrics service may have stopped. Restart it from the command line, see
[Command line and FAQ](command-line-and-faq.md).

## When you need to ask for help

Gather, before you contact support: the version of the unit, what you were doing, the exact message, and the relevant
lines of the log. If your plan includes it, open a remote support session from **Administration > Licensing**.
