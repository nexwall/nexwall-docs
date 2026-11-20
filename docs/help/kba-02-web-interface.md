---
title: 'KBA-0002: I cannot open the web interface'
sidebar_position: 12
description: Fix a unit whose web interface does not load or refuses the login.
---

# KBA-0002: I cannot open the web interface

**Symptom.** The page does not load, shows a certificate error or does not accept the password.

Read-only checks unless said otherwise. Commands run as `root` over SSH, the console or the controller remote terminal.

## Check, in this order

1. Your computer must be on the **LAN** side with an address in the LAN network (`192.168.1.0/24` by default).
2. Use `https://` and the unit address. Accept the warning of the self-signed certificate.
3. On the console, log in as `root` and confirm the LAN address:

   ```sh
   ip -br a
   /etc/init.d/nginx status
   ```

4. If you changed access settings in the wizard or the System page, check that your network is allowed to reach the web interface.
5. No password? Reset it from the console, or restore a backup.

## Not solved?

Run the [health check (KBA-0001)](kba-01-health-check.md) from the console. If `nginx` is stopped, see [KBA-0016: a service is stopped](kba-16-services.md).
