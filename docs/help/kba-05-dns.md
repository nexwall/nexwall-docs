---
title: 'KBA-05: Names do not resolve'
sidebar_position: 15
description: 'Quick DNS checks: clients, forwarders, DNS filtering and bypass.'
---

# KBA-05: Names do not resolve

**Symptom.** Sites open by IP address but not by name, or only some names fail.

Read-only checks unless said otherwise. Commands run as `root` over SSH, the console or the controller remote terminal.

## Check, in this order

1. Confirm the clients use the unit as their DNS server, or a server that works.
2. Ask the unit's resolver, then a public one, and compare:

   ```sh
   dig +short @127.0.0.1 example.com
   dig +short @8.8.8.8 example.com
   ```

3. Check the forwarders in **Network > DNS & DHCP**.
4. If DNS filtering is on, check whether the name is on a blocklist and add it to the allowed domains if it should not be blocked.
5. Check that a device with its own encrypted DNS is not bypassing the unit.

## Not solved?

Unit fails, public works: the upstream or the resolver is the problem, see [KBA-15: DNS in depth](kba-15-dns-deep-dive.md).
