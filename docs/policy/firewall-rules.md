---
title: Firewall rules
sidebar_position: 1
description: Forward, input and output rules, and how to write them.
---

# Firewall rules

**Policy > Firewall Rules** is where you decide which traffic is allowed. Rules are evaluated from the top of the list
and **the first rule that matches wins**, so order matters.

## The three lists

| Tab | Applies to | Typical use |
|---|---|---|
| Forward rules | Traffic that crosses the firewall, from one zone to another | Let the LAN reach a server in the DMZ, block a guest network from the LAN |
| Input rules | Traffic addressed to the firewall itself | Allow the web interface or SSH from a network, allow a VPN to connect |
| Output rules | Traffic that the firewall starts itself | Restrict which destinations the unit itself may reach |

What is not matched by any rule falls to the **policy** of the zone, see [Zones and policies](zones-policies.md).

## The parts of a rule

| Part | Meaning |
|---|---|
| Name | A label for you and for your colleagues |
| Source | The zone the traffic comes from, and optionally addresses. Choose `Any` to include every zone |
| Destination | The zone the traffic goes to, and optionally addresses. In a forward rule, source and destination zones must differ |
| Service | The protocols and ports to match |
| Action | What happens to matching traffic: it is accepted, or refused |
| Logging | Whether to write a log line for matches |
| Enabled | A disabled rule is kept but ignored |

### Addresses

Address fields accept one or several entries, each of them being:

- a single IPv4 or IPv6 address;
- a network in CIDR notation, for example `10.10.10.0/24`;
- a range, for example `10.10.10.1-10.10.10.5`;
- an [object](objects.md), which lets you name and reuse a group of addresses.

### Ports

Enter one port, several separated by commas (`8686, 9090`), or ranges (`5500-5600`).

## Common tasks

### Allow a service from a zone

1. Open the right tab. To let the LAN reach a web server in the DMZ, use **Forward rules**.
2. Add a rule. Set the source zone to `lan`, the destination zone to `dmz`, the destination address to the server, the
   service to TCP 443, and the action to allow.
3. Save, then **Apply changes**.

### Change the order

Rules are processed top to bottom. Move a rule with the ordering controls, or add it at the top or the bottom. Place
specific rules above general ones.

### Investigate what a rule does

Turn on logging for the rule and look for its lines in [Logs](../operation-analytics/logs.md).

## Rules created by the system

Some rules are added automatically, for example when you create a zone with a preset or when a VPN server needs a port.
They are marked so you can recognize them. You can inspect them, and you should change them with care, since the feature
that created them may stop working.

## Related pages

- [Zones and policies](zones-policies.md)
- [NAT and port forwarding](nat-port-forwarding.md)
- [Objects](objects.md)
