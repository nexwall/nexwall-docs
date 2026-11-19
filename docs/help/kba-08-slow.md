---
title: 'KBA-08: The unit is slow or low on memory'
sidebar_position: 18
description: Find which feature costs the most and whether disk or memory is the cause.
---

# KBA-08: The unit is slow or low on memory

**Symptom.** Slow web interface, high latency through the firewall, or services restarting.

Read-only checks unless said otherwise. Commands run as `root` over SSH, the console or the controller remote terminal.

## Check, in this order

1. Look at the load and memory in [Performance](../operation-analytics/performance.md), or on the unit:

   ```sh
   uptime; free -m | head -2; df -h / | tail -1; conntrack -C
   ```

2. Turn off recently enabled inspection features one at a time (IPS, then application control) to find the one that costs most.
3. Use bypass and exceptions for high volume trusted traffic.
4. Check that the disk is not full (the `df` line above, and the alerts).

## Not solved?

Memory almost gone: [KBA-16](kba-16-services.md#9-low-memory-is-a-common-hidden-cause). Conntrack near the maximum: find the client in [Connections](../operation-analytics/monitor-connections.md).
