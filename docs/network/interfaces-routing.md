---
title: Interfaces and routing
sidebar_position: 1
description: Configure network devices, addresses, logical interfaces and static routes.
---

# Interfaces and routing

## Interfaces and devices

**Network > Interfaces** lists the network **devices** of the unit and the **interfaces** configured on them. A device
is a network card, or a logical device you create. An interface gives a device an address, a zone and a protocol.

### Configuring a device

Select a device and choose **Configure**. The main choices are:

| Setting | Meaning |
|---|---|
| Zone | The zone the interface belongs to. This decides which rules apply, see [Zones and policies](../policy/zones-policies.md) |
| Protocol | Static address, DHCP client, or PPPoE |
| IPv4 | Address and mask, and for a WAN, the gateway |
| IPv6 | An address, or leave it empty for automatic assignment from the provider. The assigned length is 64 |
| DNS | Servers used by this interface |
| MTU | Maximum packet size, when your provider requires a specific value |

:::note PPPoE names
PPPoE interface names have a length limit. If a name is too long, remove the configuration from the device and configure
it again with a shorter name.
:::

To stop using a device, remove its configuration; the device becomes **unassigned** and can be used elsewhere.

### Logical devices

| Type | Use |
|---|---|
| Bridge | Joins several devices into one network segment |
| Bond | Combines several devices for redundancy or throughput. Several modes are available, including active-backup and LACP (802.3ad) |
| VLAN | Carries a tagged network over a device. You choose the VLAN identifier and the base device |

A bond can have an internal **management address**. It is for internal use and does not become the main address of the
bond; make sure it is not already used in your network. Deleting a bond frees its devices for other configurations.

### Aliases

An **alias** adds another address to an existing interface, for example to serve a second subnet on the same segment.

## Routing

**Network > Routing** shows the routing table and lets you add **static routes**. A route says through which interface
and gateway a host or network is reached.

| Field | Meaning |
|---|---|
| Network | The destination in CIDR notation. Use `0.0.0.0/0` (or `::/0` for IPv6) for the default route |
| Gateway | The next hop. If you leave it empty, a link-scope route is created. With `0.0.0.0` no gateway is set |
| Interface | The interface used to reach the network |
| Metric | Priority when several routes match. Lower wins |
| On-link | Treat the gateway as reachable even if it is not inside a network of the interface |

Routes that VPN tunnels need are added and removed automatically.

## Related pages

- [SD-WAN](sd-wan.md) for several WAN links
- [DNS and DHCP](dns-dhcp.md)
