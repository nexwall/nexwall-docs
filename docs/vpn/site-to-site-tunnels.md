---
title: Site-to-site tunnels (OpenVPN and IPsec)
sidebar_position: 2
description: Connect two networks permanently with OpenVPN or IPsec.
---

# Site-to-site tunnels (OpenVPN and IPsec)

A site-to-site tunnel joins two networks over the internet as if they were one. Use **OpenVPN Site-to-Site** when both
ends are Nexwall units, or when you want a simple setup. Use **IPsec Site-to-Site** for interoperability with the wide
range of devices that support IPsec.

## OpenVPN site-to-site

One unit is the **server** and the other is the **client**.

### On the server

1. Open **VPN > OpenVPN Site-to-Site** and create a tunnel server.
2. Set the **public endpoints** (addresses or names the client will use to reach the server), the **local networks**
   (networks that must be reachable from the other end) and the **remote networks** (networks behind the other end).
   The remote networks become static routes while the tunnel is up.
3. Save and **Apply changes**.
4. Export the tunnel. You can download a configuration ready to import on another Nexwall unit, or the certificates and
   key material to build the tunnel with a third party device.

### On the client

Open the same page on the other unit, choose the client side and **import** the file you downloaded. You can also
configure the client by hand to connect to any device that speaks OpenVPN.

Check that the tunnel is up in the list, and in the [Monitor](../operation-analytics/monitor-connections.md).

## IPsec site-to-site

IPsec is the best choice when the other side is not a Nexwall unit.

![A configured IPsec site-to-site tunnel](/img/screenshots/vpn-ipsec-site-to-site-content.png)

*A configured IPsec site-to-site tunnel.*

1. Open **VPN > IPsec Site-to-Site** and add a tunnel.
2. Enter the **remote address**. If the other side has a dynamic address, enter `any`.
3. Set the **identifiers**. The local identifier is a string that starts with `@` and identifies this unit; on the other
   end the identifiers are reversed.
4. Enter or generate the **pre-shared key**.
5. Set the **local** and **remote networks** to connect.
6. Choose the security parameters. Both ends must agree on the encryption, integrity and key exchange group. Choosing a
   Diffie-Hellman group enables **perfect forward secrecy**.
7. Choose what to do when the tunnel fails: **dead peer detection** sets the action after a timeout, and the **close
   action** sets what happens after the peer closes the tunnel (nothing, restart on demand, or restart at once).
8. Save and **Apply changes**.

:::note Restart after changing networks
Adding or removing networks from an existing tunnel requires restarting the IPsec service. This restarts all tunnels,
and the page asks you to confirm.
:::

## Choosing between them

| | OpenVPN | IPsec |
|---|---|---|
| Both ends Nexwall | Simple, import and go | Works |
| Third party device | Possible with exported material | Best interoperability |
| Behind restrictive networks | Can use TCP | Needs its ports open |

## Related pages

- [WireGuard](wireguard.md)
- [Firewall rules](../policy/firewall-rules.md)
