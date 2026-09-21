---
title: Concepts
sidebar_position: 4
description: The vocabulary used throughout the documentation.
---

# Concepts

## Zones

A **zone** is a group of network interfaces that share a security level. Rules do not talk about interfaces, they talk
about zones. The unit starts with these:

| Zone | Meaning |
|---|---|
| `lan` (green) | Your trusted internal network |
| `wan` (red) | The untrusted outside, usually the internet |
| `guest` (blue) | An isolated network for visitors |
| `dmz` (orange) | A network for servers that must be reachable from outside |

You decide which zones may talk to which. See [Zones and policies](../policy/zones-policies.md).

## Rules and their order

A **firewall rule** says what to do with traffic that matches some conditions. Rules are read from the top, and the
first rule that matches decides. There are three lists: rules for traffic that crosses the firewall (forward), rules
for traffic addressed to the firewall (input) and rules for traffic that the firewall itself starts (output). See
[Firewall rules](../policy/firewall-rules.md).

## NAT and port forwarding

**NAT** rewrites addresses as traffic passes. The usual case is masquerading: many private hosts share the public
address of the WAN. **Port forwarding** is the opposite: it sends connections that arrive at a public address to a
host inside. See [NAT and port forwarding](../policy/nat-port-forwarding.md).

## Objects

An **object** is a named list of addresses or domains that you define once and reuse in rules, port forwards and
SD-WAN rules. When the list changes, everything that uses it follows. See [Objects](../policy/objects.md).

## Interfaces and devices

A **device** is a physical or virtual network card, or a logical one such as a bridge, a bond or a VLAN. An
**interface** is the configuration attached to a device: its address, its zone, its protocol. See
[Interfaces and routing](../network/interfaces-routing.md).

## Application control

Instead of ports, application control recognizes what a connection is: a streaming service, a messaging app, a
protocol. You can then block it. See [Application control](../security-services/application-control.md).

## Threat Shield

Threat Shield is the name of the blocklist based protection. **Threat Shield DNS** blocks unwanted domains at name
resolution. **Threat Shield IP** blocks connections to and from hostile addresses. See
[DNS filtering](../security-services/dns-filtering.md) and
[IP and geo blocking](../security-services/ip-geo-blocking.md).

## Units and the controller

A **unit** is one firewall. A **controller** is a server that many units connect to so that an administrator can reach
all of them from one place. See [Central management](../administration/central-management.md).

## Subscription

A **subscription** activates extra features on a unit, such as a larger application catalog. Everything else works
without one. See [Licensing and account](../administration/licensing-account.md).
