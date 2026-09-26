---
title: SD-WAN
sidebar_position: 2
description: Use several internet links with failover, balancing and policy based routing.
---

# SD-WAN

**Network > SD-WAN** manages several WAN links. It monitors each link, switches traffic away from one that fails,
and can spread or steer traffic according to policy.

## Concepts

- **Gateway:** a WAN interface taking part in SD-WAN.
- **Policy:** how traffic is distributed over the gateways, for example "use link A, fall back to link B" or "balance
  between A and B".
- **Rule:** assigns a policy to some traffic.

## Policies

Open the **Policies** tab. With more than one WAN, the **default policy** is mandatory and cannot be deleted. Create
other policies for special cases, such as "video conferencing always over the fastest link". A policy lists its
gateways with a **weight** or an order, depending on whether you want to balance or to have a primary and a backup.

## Rules

Rules choose which policy applies to which traffic. Match on source, destination, protocol and ports (you can use
[objects](../policy/objects.md)), then pick the policy. The default rule is at the end of the list, so **place your
rules above it**. Rules are evaluated in order.

The **sticky** option keeps traffic from the same source on the same link as its previous session for a period (ten
minutes by default). It avoids problems with services that are sensitive to the source address changing.

## Tracking

For each WAN, the unit pings a set of hosts to decide whether the link works. The link stays active while **at least
one** host answers. Configure:

- the hosts to ping (addresses or names). Choose hosts that are reliable and that you do not mind pinging;
- how often to ping and how long to wait;
- how many failed tests take a link down, and how many successful tests bring it back up.

The default values fit most connections. Change them only if links flap or take too long to recover.

## Related pages

- [Interfaces and routing](interfaces-routing.md)
- [Performance](../operation-analytics/performance.md) for latency history
- [Network troubleshooting tools](../help/network-troubleshooting-tools.md) for policy routing and connectivity
  checks from the command line
