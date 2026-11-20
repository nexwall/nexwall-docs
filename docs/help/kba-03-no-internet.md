---
title: 'KBA-0003: The LAN has no internet'
sidebar_position: 13
description: Find why LAN clients cannot reach the internet, from the WAN link to NAT and policy.
---

# KBA-0003: The LAN has no internet

**Symptom.** LAN clients cannot browse, but the firewall itself may or may not.

Read-only checks unless said otherwise. Commands run as `root` over SSH, the console or the controller remote terminal.

## Check, in this order

1. Open **Operation & Analytics > Dashboard** and look at the internet connection card.
2. Does the firewall itself have internet? On the unit:

   ```sh
   ip route | grep default
   ping -c2 -W2 8.8.8.8
   dig +short +time=3 +tries=1 nexwall.com.br
   ```

3. In **Network > Interfaces**, check that the WAN has an address, a gateway and DNS servers. With a static WAN, at least one DNS forwarder is required in **Network > DNS & DHCP**.
4. Check that a masquerade rule for the LAN exists in **Policy > NAT**.
5. Check the LAN to WAN policy in **Policy > Zones & Policies** and the rules in **Policy > Firewall Rules**.
6. With several WAN links, check the tracking hosts in **Network > SD-WAN**: if none answers, the link is considered down.
7. Use [Connections](../operation-analytics/monitor-connections.md) to see whether connections are being created.

## Not solved?

Firewall ok but one client fails: [KBA-0004](kba-04-site-unreachable.md). IP works but names do not: [KBA-0005](kba-05-dns.md). Need packets and MTU tests: [KBA-0014](kba-14-connectivity.md).
