---
title: Users and groups
sidebar_position: 1
description: Local and directory user databases, used by VPN and other services.
---

# Users and groups

**Access & Identity > Users & Groups** manages the **user databases**, and the users inside them, that other features use
to authenticate people.
Today they are used mainly by the [OpenVPN remote access server](../vpn/remote-access-openvpn.md).

## Two kinds of database

| Kind | When to use it |
|---|---|
| Local | A small number of users kept on the unit itself |
| LDAP or Active Directory | Users already managed in a directory. The unit queries it, so accounts are maintained in one place |

## Local database

Create the database, then add users. For each user you set a **name**, a **display name** and a **password**. A user
without a password must authenticate in another way, for example with a certificate. Passwords must be at least 8
characters and contain upper and lower case letters, a number and a special character.

## Remote database (LDAP or Active Directory)

Enter how to reach the directory:

| Field | Example and meaning |
|---|---|
| URI | `ldaps://ldap.example.com`. Includes the protocol and the port when it is not the default |
| Base DN | Where searches start, for example `dc=example,dc=com` |
| User DN | Where the users are, for example `cn=Users,dc=example,dc=com` |
| Display attribute | The attribute with the full name. Use `displayName` for Active Directory |
| Bind DN and password | The account the unit uses to search the directory |
| Security | Whether to use TLS and whether to verify the server certificate |

![A connected Active Directory database](/img/screenshots/access-users-ad.png)

*A connected Active Directory database and its user list.*

Save and use the connection test to confirm that the unit can reach the directory and read users. Prefer an encrypted
connection.

## Good to know

- A database that is in use by a feature cannot be deleted; remove it from that feature first.
- A user can be **set as administrator**. An administrator can log in to the web interface and configure the unit. Keep
  this set small, and remove the role when it is no longer needed.

## Related pages

- [Remote access (OpenVPN)](../vpn/remote-access-openvpn.md)
- [Licensing and account](../administration/licensing-account.md)
