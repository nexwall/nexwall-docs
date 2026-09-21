---
title: Licensing and account
sidebar_position: 2
description: Activate a subscription and manage your own account.
---

# Licensing and account

## Licensing

**Administration > Licensing** shows the subscription state of the unit and lets you activate a subscription.

### What a subscription unlocks

The firewall works without a subscription. A subscription adds features that depend on Nexwall services:

- an extended application catalog for [application control](../security-services/application-control.md), where the
  plan includes one;
- the advanced lists of [Threat Shield](../security-services/dns-filtering.md);
- remote (cloud) backups, encrypted, see [Backup and recovery](../infrastructure/backup-recovery.md);
- [Traffic Analytics](../operation-analytics/traffic-analytics.md);
- management of an unlimited number of units from a controller;
- remote VPN user databases;
- remote support sessions, on plans that include them.

### Activating

1. Obtain an **authentication token** for the unit from your Nexwall account.
2. Paste the token in the Licensing page and save. The unit registers with the Nexwall services platform.
3. The page shows the plan, the validity and the system identifier of the unit.

If the unit has not synchronized since it started, the page says so, and you can force a synchronization with
**Sync now**.

### Support sessions

You can open a **remote support session** so that support can help you. The session closes automatically at the time
shown, and you can stop it at any moment.

### Canceling

If you cancel the subscription of a unit, you lose the extra features of your plan. The core firewall keeps working.

## Your account

Open **Account settings** from the user menu.

### Password

Change your password. If you change the password of the `root` user, you also change the password used for shell access.

### Language

Choose the language of the interface: English, Portuguese (Brazil) or Spanish.

### Two-factor authentication

Two-factor authentication adds a second step to login: a code generated on your phone.

1. Install an authenticator app on your phone or tablet, for example FreeOTP.
2. In Account settings choose to configure two-factor authentication and scan the QR code.
3. Enter the six digit code the app shows.
4. **Save the recovery codes.** Each can be used once if you lose access to your app.

To generate new recovery codes, revoke two-factor authentication and set it up again. Revoking it lowers the security of
the account, and codes are no longer requested at login.

## Related pages

- [Users and groups](../access-identity/users-groups.md)
- [Central management](central-management.md)
