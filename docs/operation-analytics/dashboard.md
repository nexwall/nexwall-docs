---
title: Dashboard
sidebar_position: 1
description: The overview page of the unit.
---

# Dashboard

**Operation & Analytics > Dashboard** is the first page you see after logging in. It summarizes the state of the unit
and points out things that need attention.

## What the cards show

| Card | Content |
|---|---|
| System | Hostname, version, uptime, and the load averages for 1, 5 and 15 minutes |
| Internet connection | Whether the unit reaches the internet, per WAN link |
| WAN traffic | Recent traffic on the WAN interfaces |
| Storage and memory | Use of the system partition, the data partition and memory |
| Services | Which services are enabled and running, for example SD-WAN, the traffic classification engine, the captive portal and Threat Shield |
| VPN | Connected remote access clients, and the number of tunnels that are enabled and connected |
| Security | Addresses blocked by Threat Shield in the last period, and blocked packets |
| Known hosts | Devices the unit has seen on its networks |

Each card links to the page where you can go deeper.

## Warnings you may see

The dashboard highlights common configuration problems:

- **Default hostname.** The unit is still called `Nexwall`. Change it in
  **Infrastructure > System**, then apply the change.
- **No DNS forwarder.** A WAN link with a static address needs at least one DNS forwarder. Configure one in
  **Network > DNS & DHCP**.
- **Threat monitoring is off.** Threat statistics rely on logging. Enable logging on at least one chain in
  **Policy > Zones & Policies**.

## Related pages

- [Monitor and connections](monitor-connections.md) for live traffic.
- [Performance](performance.md) for history and alerts.
