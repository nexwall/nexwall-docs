---
title: 'KBA-0004: A site or service is blocked or unreachable'
sidebar_position: 14
description: Find the rule, list or inspection feature that blocks one destination or a published service.
---

# KBA-0004: A site or service is blocked or unreachable

**Symptom.** One destination does not open, or a published service is not reachable from outside.

Read-only checks unless said otherwise. Commands run as `root` over SSH, the console or the controller remote terminal.

## Check, in this order

1. Turn on logging on the rule or the zone and look at the [Logs](../operation-analytics/logs.md).
2. Check the order of the rules: the first match wins.
3. For a published service, confirm the port forward, the destination, and that the zone policy allows the traffic.
4. If [IP and geo blocking](../security-services/ip-geo-blocking.md) is enabled, check whether the address is on a list or in a blocked country. Add it to the allowlist if it should be reachable.
5. If the [IPS](../security-services/ips.md) is on, look at its events for blocked traffic.
6. Test the port from the firewall:

   ```sh
   nc -zv -w3 <destination-ip> 443
   ```


## Not solved?

Port closed or timeout from the firewall too: [KBA-0014](kba-14-connectivity.md) (MTU, packets). Works by IP but not by name: [KBA-0005](kba-05-dns.md).
