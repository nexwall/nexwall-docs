---
title: Network troubleshooting tools
sidebar_position: 6
description: The command-line tools the unit ships with for diagnosing connectivity, routing, NAT and DNS problems beyond what the web interface shows.
---

# Network troubleshooting tools

The web interface has no built-in ping or traceroute tool, so for anything past "is the link up", SSH access and
these command-line tools are the way in. This page goes layer by layer, from the network card up to DNS, with the
tools this unit actually ships with. Most are installed by default; a couple are optional packages, noted where
that's the case.

## Interfaces and link state

| Task | Command |
|---|---|
| List addresses on every interface | `ip -4 addr`, `ip -6 addr` |
| Interface and carrier state | `ip link` |
| Link speed, duplex, and whether a cable is actually detected | `ethtool <interface>` |
| Live per-interface throughput | `bwm-ng` |

`ethtool` is the fastest way to tell a cabling or auto-negotiation problem from anything higher up the stack — check
`Link detected` and `Speed` before looking anywhere else if a whole interface seems to be misbehaving.

## The local segment: ARP

| Task | Command |
|---|---|
| See what the unit has resolved on the local segment | `ip neigh` |
| Actively ask a specific host to respond | `arping -I <interface> <ip>` |
| Sweep a whole local network for what is actually present | `arp-scan --interface=<interface> --localnet` |

`arp-scan` is the tool for "is there a duplicate IP on this network" or "what's actually plugged into this switch",
since it asks at the ARP level and gets a response even from hosts that block ICMP.

## Routing and policy routing

| Task | Command |
|---|---|
| Main routing table | `ip route` |
| Which route a specific destination would actually take | `ip route get <destination>` |
| Policy routing rules (used heavily when SD-WAN is configured) | `ip rule` |
| A specific routing table by number | `ip route show table <id>` |

When [SD-WAN](../network/sd-wan.md) is active, `mwan3` maintains its own routing tables and rules per WAN — `ip rule`
shows which traffic gets steered into which table, and `ip route get <destination>` is the fastest way to confirm
which WAN a given destination will actually go out. For the state `mwan3` itself thinks each link is in, see
[Service and log command reference](service-and-log-reference.md#diagnostic-commands-beyond-restart-and-logread).

## Reachability

| Task | Command |
|---|---|
| Basic reachability | `ping <host>` |
| Reachability with a specific packet size, without fragmenting (MTU/PMTU testing) | `ping -M do -s <size> <host>` |
| Reachability at the ARP level, no IP routing involved | `arping -I <interface> <ip>` |

This unit ships the full `iputils` ping, not the cut-down BusyBox one, specifically so `-M do -s` works — it is the
standard way to find the real MTU across a path, which matters most across VPN tunnels: send progressively smaller
sizes until one stops needing fragmentation, and that is the usable MTU for that tunnel.

## DNS

| Task | Command |
|---|---|
| Resolve a name using the unit's own resolver | `dig <name>` |
| Resolve using a specific server, bypassing the unit's resolver entirely | `dig @<server> <name>` |
| Trace the resolution from the root down | `dig +trace <name>` |
| Resolve over DNS-over-HTTPS | `dig +https <name>` |

Querying `@1.1.1.1` or `@8.8.8.8` directly tells you whether a name genuinely does not resolve, or whether the
problem is specific to this unit's resolver — DNS filtering, a misconfigured forwarder, or `dnsmasq` itself. See
[Service and log command reference](service-and-log-reference.md) for restarting `dnsmasq` and reading its log.

## Packet capture

```bash
tcpdump -i <interface> -n host <ip> and port <port>
```

A few filters worth knowing beyond the basics:

| What you want to see | Filter |
|---|---|
| Only one host | `host <ip>` |
| Only one port, either direction | `port <port>` |
| Traffic through a specific VPN tunnel | `-i tun-nsplug`, `-i tun0`, or whatever the tunnel's interface is named |
| Save to a file for offline analysis (e.g. in Wireshark) | `-w /tmp/capture.pcap` |

Capturing on the LAN-side interface versus the WAN-side interface of the same connection is how you tell whether
NAT and firewall rules are actually being applied the way you expect — the packet should look different (source
address, and often port) on each side.

## NAT, firewall rules and connection state

| Task | Command |
|---|---|
| The compiled nftables ruleset, as the kernel actually sees it | `nft list ruleset` |
| The same, in `firewall4`'s own higher-level form | `fw4 print` |
| The connection tracking table: what the kernel considers an active connection right now | `conntrack -L` |
| Live stream of connections as they are created and destroyed | `conntrack -E` |
| Filter the tracking table to one host | `conntrack -L -s <ip>` or `-d <ip>` |

`conntrack -L` answers a specific, common question that the GUI's [Monitor and connections](../operation-analytics/monitor-connections.md)
page does not always make obvious: whether a connection is actually being tracked and NATed as expected, or whether
it never reached conntrack at all (which usually points at an earlier drop, not a NAT problem).

## Ports and processes

| Task | Command |
|---|---|
| What is listening, and on which interface | `ss -tlnp`, `ss -ulnp` |
| Which process holds a given port or file | `lsof -i :<port>` |
| Which process to kill to free up a port | `fuser -k <port>/tcp` |
| Manually probe whether a TCP or UDP port is open from here | `nc -zv <host> <port>` |

`nc -zv` is the single fastest way to separate "the network path is fine but nothing is listening" from "the network
path itself is blocked" — a connection refused is the former, a timeout is the latter.

## Throughput and bandwidth

| Task | Command |
|---|---|
| Live view of interface throughput | `bwm-ng` |
| WAN speed test from the command line | `speedtestcpp` |
| Controlled throughput test between this unit and another host | `iperf3` |

`iperf3` and `nmap` are optional packages, not part of the default image — install them first with
`opkg update && opkg install iperf3` (or `nmap`). Run `iperf3 -s` on one side and `iperf3 -c <server>` on the other
to measure real achievable throughput between two specific points, which separates a genuine bandwidth or link
problem from something application-specific.

## Putting it together

A reasonable order to work through, from the bottom of the stack up, so you do not chase a DNS or application
symptom that is actually a cable:

1. **Link**: `ethtool` — is the interface even up, at the expected speed?
2. **Local segment**: `ip neigh`, `arping`, `arp-scan` — can the unit reach its immediate neighbors?
3. **Routing**: `ip route get`, `ip rule` — is traffic being sent where you expect?
4. **Firewall and NAT**: `nft list ruleset`, `conntrack -L` — is the traffic allowed, and is it actually being
   tracked?
5. **DNS**: `dig @<public resolver>` — does the name resolve at all, independent of this unit?
6. **Application**: `nc -zv`, `tcpdump`, `iperf3` — is the specific service reachable, and is throughput what it
   should be?

## Related pages

- [Service and log command reference](service-and-log-reference.md)
- [What is UCI, and why it matters](understanding-uci.md)
- [SD-WAN](../network/sd-wan.md)
- [Monitor and connections](../operation-analytics/monitor-connections.md)
- [Command line and FAQ](command-line-and-faq.md)
