---
title: Remote access (OpenVPN)
sidebar_position: 1
description: Let users connect securely from anywhere with an OpenVPN road warrior server.
---

# Remote access (OpenVPN)

**VPN > Remote Access (OpenVPN)** configures an OpenVPN **road warrior** server. Remote users, on laptops or phones,
connect to it from anywhere on the internet and get secure access to your private networks.

## Before you start

- Create a **user database** with the people who may connect, see [Users and groups](../access-identity/users-groups.md).
- Decide the **VPN network**: a private network used only by VPN clients. Choose one that does not overlap with any
  other network you use, including the home networks of your users if you can foresee them.
- Make sure the public address or a DNS name of the unit is known to your users.

## Creating the server

Choose **Add server** (or configure the default one) and set:

| Setting | Meaning |
|---|---|
| User database | Where the accounts come from |
| Authentication | What users present: a password, a certificate, or both. You can also require a one-time code |
| Protocol and port | UDP is preferred for performance; TCP can pass through restrictive networks |
| VPN network | The virtual network for clients |
| Public addresses | The names or addresses that clients use to reach the server |
| Routes | The networks clients can reach. Add the networks of your LAN, or send **all traffic** through the VPN |
| Client to client | Whether clients can reach each other |
| DHCP options | Extra options sent to clients, useful to reach a Windows network over the VPN |

When you create the server you can also choose to create accounts for all the users of the database at once. This choice
is available only at creation. The certificates created have a validity of ten years.

The unit opens the required port in the firewall automatically.

## Accounts

The accounts list shows who can connect. Depending on the authentication mode, a user needs a password, a valid
certificate, or both. Changes take effect immediately.

For each account you can:

- **Download the client configuration** and give it to the user. Some clients also support a QR code.
- **Reserve an address** so the user always gets the same VPN address.
- **Renew the certificate.** This revokes the previous one, so the user must download the new certificate to reconnect.
- **Disable or delete** the account. Deleting an account also deletes its certificate.

## Connected clients and history

The page shows who is connected now, how long for and how much they transferred. The history lists past sessions and can
be filtered by user and by date range.

## Deleting the server

Deleting the server deletes all accounts associated with it, and it cannot be undone. Export what you need first.

## Client software

Use any OpenVPN compatible client. The downloaded configuration contains what the client needs. Have users install a
client, import the file, and connect.

## Related pages

- [Users and groups](../access-identity/users-groups.md)
- [Firewall rules](../policy/firewall-rules.md), to control what VPN users can reach
