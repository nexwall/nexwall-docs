---
title: 'How to connect two offices with OpenVPN (site-to-site)'
sidebar_position: 36
description: 'Create a server tunnel at one site and import the client tunnel at the other.'
---

# How to connect two offices with OpenVPN (site-to-site)

One firewall acts as the tunnel server and the other as the client. The server exports a package that the client imports.

**Where:** **VPN** > **OpenVPN Site-to-Site**

## Before you start

- A public address (or name) reachable at the server side.
- The local and remote networks must not overlap.

## Steps

1. At the server site open the page, tab **Server tunnel**, and click **Add server tunnel**.

   ![OpenVPN site-to-site page](/img/screenshots/howto/en/openvpn-site-to-site-1.png)

2. Type the **Tunnel name**. Add the **Local networks** to share and the **Remote networks** of the other site. Add the **Public endpoints** (public address or name).
3. Keep the default **Protocol** and **Port**. Click **Save**.
4. Click **Download** on the tunnel row and choose the **\{product\} client configuration** file.
5. At the other site open the tab **Client tunnel**, click **Import configuration** and choose the file. Save.
6. On both firewalls create a [How to allow or block traffic with a firewall rule](../policy/firewall-rule.md) between the LAN zone and the VPN zone, and make sure NAT does not translate the tunnel traffic ([How to create a NAT rule (masquerade or source NAT)](../policy/nat-rule.md)).

## Check that it worked

- Both sides show the connection as **Connected**. A host of one LAN pings a host of the other.

## If it does not work

- Not connected: UDP port not reachable at the server. Test from outside.
- Connected, no traffic: missing firewall rule, overlapping networks, or a missing route on the hosts.
- See [KBA-0006](../../help/kba-06-vpn.md).

## Related guides

- [How to build an IPsec tunnel to another firewall or router](ipsec-site-to-site.md)
- [How to set up WireGuard (server with peers, or peer tunnel)](wireguard.md)
