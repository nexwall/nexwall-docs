---
title: 'KBA-10: Updates fail'
sidebar_position: 20
description: Read the update error and check subscription, connectivity and time.
---

# KBA-10: Updates fail

**Symptom.** An update or a list download fails.

Read-only checks unless said otherwise. Commands run as `root` over SSH, the console or the controller remote terminal.

## Check, in this order

1. Read the message: it states whether the update server is under maintenance, the subscription is not valid, or the repository address is not set.
2. Check internet, DNS and the clock:

   ```sh
   date
   ping -c2 -W2 8.8.8.8
   dig +short +time=3 +tries=1 nexwall.com.br
   ```

3. Back up before retrying. See [System](../infrastructure/system.md).

## Not solved?

Internet or DNS fails: [KBA-03](kba-03-no-internet.md) or [KBA-05](kba-05-dns.md). Nothing explains it: [KBA-17](kba-17-support-package.md).
