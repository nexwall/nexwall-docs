---
title: "KBA-0017: Collect a support package"
sidebar_position: 24
description: Create one file with the state and the recent logs of the unit, with passwords and keys filtered out, to attach to a support request.
---

# KBA-0017: Collect a support package

**Symptom.** Support asked for "logs" or "diagnostics", or you want to keep evidence of a problem before changing anything.

**Applies to.** Nexwall Firewall 26.2.1. Read-only.

## 1. Create the package

Paste the block as `root`. It writes `/tmp/support-<date>-<time>.tgz` with the system state, links, routes, service list, controller status, the last 1000 log lines and the configuration without any line that mentions password, secret, key, psk or token.

```sh
D=/tmp/support-$(date +%Y%m%d-%H%M); mkdir -p $D
{ date; uptime; cat /etc/os-release; } > $D/system.txt
df -h > $D/disk.txt; free -m > $D/memory.txt
ip -br a > $D/links.txt; ip route > $D/routes.txt
ubus call service list > $D/services.json
ubus call ns.plug status > $D/controller.txt
tail -n 1000 /var/log/messages > $D/messages.txt
uci show 2>/dev/null | grep -viE 'password|secret|key|psk|token|passwd' > $D/config.txt
tar czf $D.tgz -C /tmp $(basename $D); ls -l $D.tgz
```

## 2. Copy it out

From your computer (replace the address of the firewall and the file name):

```sh
scp root@<firewall-ip>:/tmp/support-YYYYMMDD-HHMM.tgz .
```

## 3. Review before sending

The filter is conservative but not perfect. Open `messages.txt` and `config.txt` and remove anything you do not want to share (public IP addresses, user names, host names). Never send the file by public channels; use the support ticket.

## 4. Clean up

The package lives in `/tmp` and is removed on reboot, but you can delete it right away:

```sh
rm -rf /tmp/support-*
```

## Related

[KBA-0001 health check](kba-01-health-check.md), [KBA-0016 services](kba-16-services.md), [Logs and debugging](cli-logs-and-debugging.md).
