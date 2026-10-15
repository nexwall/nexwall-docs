---
title: Dashboard
sidebar_position: 1
description: "The overview page of the unit: protection, traffic and the state of the firewall."
---

# Dashboard

**Operation & Analytics > Dashboard** is the first page you see after logging in. It shows the state of the firewall on
the left and what the firewall is protecting and carrying on the right. The data is refreshed every 20 seconds.

![The Dashboard](/img/docs/dashboard-en.png)

## The left column: the firewall

| Card | Content |
|---|---|
| System | Name, version, uptime and the load averages for 1, 5 and 15 minutes. It warns you while the unit still has its factory name |
| Connectivity | Whether the unit reaches the internet, the state of each WAN link, multi-WAN and the number of known hosts |
| VPN | Connected remote access clients and the number of tunnels that are enabled and connected |
| Access and continuity | The captive portal, MAC address bindings, the remote backup, high availability and the number of active alerts of [Performance](performance.md) |

Each card links to the page where you can go deeper.

## The right column: protection and traffic

- **Four figures.** Addresses blocked in the last hour, IPS alerts in the last 24 hours, files scanned by the antivirus
  (and how many were infected) and how many protection catalogs are current. A protection that is not active, or not in
  your plan, says so instead of showing zero.
- **Protection layers.** One tile per layer: IP and geo blocking, DNS filter, IPS, Application Control and
  [Web Protection](../security-services/web-protection.md), each with its state (active, inactive, late or not in your plan)
  and its main figure, for example the active rules or the alerts of the day. The Web Protection tile also tells you when
  rules decrypt traffic, when category lists were left out because they are too large, and when the web proxy or the
  antivirus is not working.
- **Intelligent Threat Block.** How far a file got: scanned by the antivirus, analysed by the sandbox, malicious verdicts
  and indicators applied. It says when the verdict is advisory (the download is not held for the sandbox).
- **Intelligence loaded on this firewall.** The version, size and last update of the application catalog, the IPS rules,
  the website categories and the other catalogs, and which ones are late or failing.
- **What your firewall learned today.** The catalogs that were updated and the files that were blocked in the last 24 hours.
- **Traffic.** For today, 7 or 30 days: the bandwidth of the first WAN link in the last hour (choose another link when
  there are several), the traffic by hour, the top applications and top devices and the web categories used. The link
  **View all in Traffic Analytics** opens [Traffic Analytics](traffic-analytics.md).

The traffic reports are kept for 35 days.

## Warnings you may see

- **Factory name.** The unit still has its factory hostname. Change it in **Administration > System**, then apply the
  change.
- **No DNS forwarder.** A WAN link with a static address needs at least one DNS forwarder. Configure one in
  **Network > DNS & DHCP**.
- **Threat monitoring is off.** Threat statistics rely on logging. Enable logging on at least one chain in
  **Policy > Zones & Policies**.

## Related pages

- [Threat Analytics](threat-analytics.md) for what was stopped.
- [Traffic Analytics](traffic-analytics.md) for where the traffic goes.
- [Monitor and connections](monitor-connections.md) for live traffic and the WAN uplinks.
- [Performance](performance.md) for history and alerts.
