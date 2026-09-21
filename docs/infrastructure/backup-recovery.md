---
title: Backup and recovery
sidebar_position: 1
description: Back up, restore, migrate and reset a unit.
---

# Backup and recovery

**Infrastructure > Backup & Recovery** protects your configuration. It has four tabs: Backup, Restore, Migration and
Factory reset.

## Backup

A backup contains the settings and data of the unit. It is your safeguard against a failed disk, a mistake, or a
replacement.

- **Download a backup** to your computer at any time.
- **Encrypt it.** Enter a **passphrase** and the backup is encrypted with GPG. If you leave the passphrase empty, the
  backup is stored in clear text.

:::warning Keep the passphrase safe
If you lose the passphrase you cannot read an encrypted backup, and it cannot be recovered. Changing the passphrase
affects only the backups made afterwards; to restore an older backup you need the passphrase that was in force when it was
made.
:::

With a subscription, the unit can also **create encrypted backups automatically** and keep them in the cloud. The system
manages up to ten backups. You can start one at any moment with **Run cloud backup**.

## Restore

Choose where the backup comes from: a file on your computer, or one of the cloud backups. If it is encrypted, enter its
passphrase. The unit applies the configuration and restarts.

Restoring replaces the current configuration, so take a backup first if you might need to go back.

## Migration

The Migration tab imports a migration archive produced from a supported source machine and maps its network interfaces
to the interfaces of this unit. Follow the instructions of the page, and review the result before you apply it.

## Factory reset

**Factory reset** removes every installed package and customized setting and returns the unit to the state it had right
after installation. It restores the version that is currently installed, not an older one.

This is permanent and cannot be undone. The page asks for confirmation before it proceeds. Use it when you repurpose or
decommission a unit, or when you want to start over.

## Good practice

- Take a backup before every update and before every important change.
- Keep at least one backup outside the unit.
- Test a restore on a spare unit from time to time.

## Related pages

- [System](system.md), for updates
- [Licensing and account](../administration/licensing-account.md), for cloud backups
