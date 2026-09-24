---
title: Zones and policies
sidebar_position: 3
description: Group interfaces into zones and set what is allowed between them by default.
---

# Zones and policies

Zones are the foundation of the rule set. **Policy > Zones & Policies** shows every zone, the interfaces it contains
and its default behavior.

![Zones and their policies](/img/screenshots/policy-zones.png)

*The default zones and their policies.*

## Default zones

| Zone | Role |
|---|---|
| `lan` | Trusted internal network |
| `wan` | Untrusted outside |
| `guest` | Isolated visitors network |
| `dmz` | Servers exposed to the outside |

You can create your own zones, for example one for a network of cameras.

## The policy of a zone

The **policy** of a zone is what happens to traffic when no rule matches. For each zone you set what is allowed:

- traffic **from the zone to the firewall itself** (input);
- traffic **from the zone to other zones** (forward);
- traffic **inside the zone** between its own interfaces.

A restrictive policy with explicit allow rules is easier to audit than a permissive policy with many blocks.

## Creating a zone

1. Choose **Add zone**.
2. Enter a name and choose a type. The types match the default zones: LAN, WAN, guest, DMZ.
3. Select the interfaces and networks that belong to the zone.
4. Choose whether to create **preset rules**. The system then adds rules that allow access to the essential services,
   for example DHCP and DNS for a LAN. You can see and adjust them later in
   **Policy > Firewall Rules > Input rules**.
5. Save and **Apply changes**.

## Logging

Each zone has a logging option that records the packets that the zone policy blocks. Threat statistics on the
dashboard and in the Monitor depend on logging being enabled on at least one chain. Logging on a busy zone can produce a
lot of messages, so enable it where you need it.

## Related pages

- [Firewall rules](firewall-rules.md)
- [Interfaces and routing](../network/interfaces-routing.md)
