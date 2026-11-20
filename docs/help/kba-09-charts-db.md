---
title: 'KBA-0009: Charts say the database is not reachable'
sidebar_position: 19
description: Restart the metrics service when charts stay empty.
---

# KBA-0009: Charts say the database is not reachable

**Symptom.** Dashboard and analytics charts show that the database is not reachable.

Read-only checks unless said otherwise. Commands run as `root` over SSH, the console or the controller remote terminal.

## Check, in this order

1. Check the metrics service:
2. If it is stopped, start it; if running, restart it:

   ```sh
   /etc/init.d/victoria-metrics status
   /etc/init.d/victoria-metrics restart
   ```

3. Wait a minute and reload the charts.

## Not solved?

Still empty: check free disk and memory ([KBA-0008](kba-08-slow.md)) and read the log ([Logs and debugging](cli-logs-and-debugging.md)).
