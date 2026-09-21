---
title: System
sidebar_position: 2
description: Hostname, time, SSH, updates, storage, and rebooting the unit.
---

# System

**Infrastructure > System** groups the settings of the unit itself in five tabs: General, Time sync, SSH, Updates and
Storage. Power actions are on **Infrastructure > Reboot & Shutdown**.

## General

Set the **hostname** and a description. Using the default hostname `Nexwall` is not recommended, because in a network
with several units it becomes impossible to tell them apart. The dashboard reminds you until you change it. You can also
keep free notes about the unit here.

## Time sync

Correct time matters for certificates, logs, VPNs and updates.

- Choose the **time zone**.
- Check the **local time** the unit shows, and **sync it with an NTP server** on demand.
- Turn on the **NTP client** so the clock is kept right automatically. You can use the servers advertised by DHCP, or
  enter your own.
- Optionally **provide an NTP server** to your networks, choosing the interfaces that receive it.

## SSH

Control SSH access to the command line.

- Set the **TCP port** and whether password authentication is allowed.
- Choose whether the `root` user may log in with a password. Disabling it is safer, but you must have added your SSH
  public key first.
- Manage **authorized public keys**. Keys allow passwordless logins and are more secure than passwords.
- Choose whether remote hosts may connect to forwarded ports of the unit.

:::warning Do not lock yourself out
Before you disable password login, add your public key and verify you can log in with it from a second session.
:::

## Updates

There are two kinds of updates:

| Kind | What it contains | How it is delivered |
|---|---|---|
| Security and bug fixes | Small corrections to installed software | Packages |
| New versions | New features | A full system image |

The tab shows whether a new version is available. Back up your configuration before you update. The current settings are
kept. You can update at once, **schedule** the update for a time that suits you, or cancel a scheduled update. You can
also upload a compatible image yourself.

If the tab reports that the update server is not reachable or refuses access, check the internet connection, the
time, and the state of your subscription, see [Troubleshooting](../help/troubleshooting.md).

## Storage

By default logs are kept in memory. In the Storage tab you configure a persistent device, such as a USB drive or a
second disk, where the unit also writes the logs. This helps troubleshooting and keeps a record of activity across
reboots. You can also let the unit copy extra data to the device once a day. Removing the storage stops writing logs
to it.

## Reboot and shutdown

**Reboot** restarts the unit, which is unavailable for a short time. **Shutdown** powers it off, for maintenance,
relocation or decommissioning. Both warn you when there are pending changes, which are lost.

## Related pages

- [Backup and recovery](backup-recovery.md)
- [Certificates](certificates.md)
