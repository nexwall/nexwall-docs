---
title: Logs
sidebar_position: 5
description: Reading and searching the system logs.
---

# Logs

**Operation & Analytics > Logs** shows the system log of the unit: messages from the firewall, the services, the
network and the kernel.

## Reading the log

- Choose how many lines to load.
- Turn **wrap lines** on to see long messages without scrolling sideways.
- Use the search box to keep only the lines that match. The search accepts regular expressions.
- Turn on **follow** to watch new messages as they arrive.

## Useful searches

| Goal | Search for |
|---|---|
| Blocked packets | the name of the zone, or the log prefix used by the rule |
| VPN problems | `openvpn`, `charon` or `wireguard` |
| DHCP activity | `dnsmasq-dhcp` |
| Threat Shield IP blocks | `banIP` |
| Update or registration problems | the name of the service, for example `ns-plug` |

## Keeping logs across reboots

By default the log lives in memory and is lost on reboot. To keep a copy, attach a disk or a USB drive and configure
it in **Infrastructure > System**, in the Storage tab. The unit then also writes the logs to that device. See
[System](../infrastructure/system.md).

When a unit is connected to a controller, logs are also transmitted to it, see
[Central management](../administration/central-management.md).

## From the command line

The same log is available over SSH with `logread`. See [Command line and FAQ](../help/command-line-and-faq.md).
