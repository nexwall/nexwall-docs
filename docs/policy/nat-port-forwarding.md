---
title: NAT and port forwarding
sidebar_position: 2
description: Masquerading, source NAT, one to one mapping, NAT helpers and port forwards.
---

# NAT and port forwarding

Network Address Translation, NAT, changes the addresses of packets as they pass through the firewall. The unit supports
several forms, each in its own place.

## NAT

**Policy > NAT** lists the rules that translate source addresses.

| Type | What it does |
|---|---|
| Masquerade | Hosts on a private network share the address of the outgoing interface. This is what gives your LAN access to the internet |
| Source NAT (SNAT) | Rewrites the source of matching traffic to an address you choose |
| No NAT | Excludes specific traffic from translation, for example traffic between two sites over a tunnel |

Create a rule by choosing the type, the traffic it matches (source, destination, service) and, for SNAT, the address to
use.

### NETMAP

NETMAP performs a **one to one** translation of a whole network. Each host keeps its position in the network: a host
`.15` in `192.168.1.0/24` can appear as `.15` in another network. This is typically used to connect two sites that use
the same addresses, without renumbering either of them.

### NAT helpers

Some protocols carry addresses inside their payload, which breaks when NAT changes the packet headers. NAT helpers are
kernel modules that fix the payload of specific protocols. The page lists them and lets you turn each one on or off.

:::note
A helper that you turn off can stay loaded in the kernel because another module depends on it, or because it was loaded
before. The page tells you when this happens, and a reboot may be needed to unload it fully.
:::

## Port forwarding

**Policy > Port Forwarding** sends connections that arrive at the public address of the firewall to a host on an
internal network. It is how you publish a service such as a web server.

### Creating a port forward

| Field | Meaning |
|---|---|
| Name | A label |
| Protocol | TCP, UDP, both, or any |
| Source port | The port that clients connect to. A range is accepted |
| Destination address | The internal host, or an object, that receives the traffic |
| Destination port | The port on the internal host. If you leave it empty, it is the same as the source port |
| Restrict access from | By default anyone can connect. Add addresses or networks to allow only them |
| Reflection | Allows hosts on the internal network to reach the service using the public address |
| Logging | Writes a log line for matches |

### Things to know

- **The `any` protocol forwards everything.** The page warns you: all traffic of that kind goes to the destination.
- **Forwarding all traffic** to one host bypasses the firewall protection of that host and makes the services of the
  firewall itself, such as the web interface or SSH, unreachable on that public address.
- The restriction list accepts addresses, networks and most objects. Host sets that contain IP ranges or other objects
  are not compatible with port forwards.
- A port forward opens the destination, but you may still need a forward rule if your zone policy blocks the traffic. See
  [Firewall rules](firewall-rules.md).

## Related pages

- [Zones and policies](zones-policies.md)
- [Objects](objects.md)
