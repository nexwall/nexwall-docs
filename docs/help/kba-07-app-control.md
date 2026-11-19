---
title: 'KBA-07: Application control does nothing'
sidebar_position: 17
description: Why an application rule does not block or limit the traffic.
---

# KBA-07: Application control does nothing

**Symptom.** A rule for an application is enabled but the traffic still passes.

Read-only checks unless said otherwise. Commands run as `root` over SSH, the console or the controller remote terminal.

## Check, in this order

1. Confirm the service is enabled, the rule is enabled and the changes were applied (**Apply changes** banner).
2. Check in the live flows that the application is recognized. If it shows as **Unknown**, it cannot be blocked.
3. Check that the rule is on the interface the traffic passes through.
4. Check that the address is not in the exceptions.
5. Check that the classification service runs:

   ```sh
   /etc/init.d/netifyd status
   ```


## Not solved?

Service stopped or low memory: [KBA-16](kba-16-services.md) and [KBA-08](kba-08-slow.md).
