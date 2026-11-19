---
title: 'How-To guides'
sidebar_position: 0
description: 'Step-by-step configuration guides for every module of the Nexwall Firewall web interface.'
---

# How-To guides

Task-oriented guides for administrators: each one says where to click, what to type and how to confirm that it worked. All guides use the web interface and show screenshots of the real screens. Problem solving is in **Help & KBAs**.

## Policy

- [How to allow or block traffic with a firewall rule](policy/firewall-rule.md) — Create a forward, input or output rule, choose the action and put it in the right position.
- [How to publish an internal server (port forward)](policy/port-forward.md) — Send connections that arrive at the public address to a host on your LAN.
- [How to create a NAT rule (masquerade or source NAT)](policy/nat-rule.md) — Rewrite the source address of outgoing traffic, or exclude traffic from translation.
- [How to create a zone and set its policy](policy/zone.md) — Group interfaces into a zone and control who can talk to whom.
- [How to create reusable objects (host sets and domain sets)](policy/object.md) — Name a group of hosts, networks or domains once and reuse it in rules, port forwards and SD-WAN.

## Network

- [How to configure a network interface (WAN, LAN, VLAN)](network/interface.md) — Assign an unused port to a zone, set its address and protocol, or create a VLAN device.
- [How to add a static route](network/route.md) — Tell the firewall which gateway reaches a network it is not directly connected to.
- [How to enable and tune the DHCP server](network/dhcp-server.md) — Give addresses to a network, set the range and lease time, add DHCP options and restrict who can connect.
- [How to reserve a fixed IP address for a device](network/dhcp-reservation.md) — Always give the same address to a server, printer or camera.
- [How to set DNS servers and local DNS names](network/dns-record.md) — Choose the upstream DNS servers and create names that resolve to local addresses.
- [How to use two internet links (failover or load balancing)](network/sd-wan.md) — Create a default SD-WAN policy, monitor each link and add rules for specific traffic.
- [How to limit and share bandwidth (QoS)](network/qos.md) — Apply smart queue management to a WAN link so that no connection starves the others.
- [How to publish a web application through the reverse proxy](network/reverse-proxy.md) — Forward HTTPS requests by path or domain to an internal web server.

## Security services

- [How to block applications and protocols (Application Control)](security/app-control.md) — Create a rule that blocks apps such as games or streaming, and add exceptions for specific hosts.
- [How to filter web sites by category (Web Protection)](security/web-protection.md) — Block or allow web categories for a zone, network or group of hosts.
- [How to turn on intrusion prevention (IPS)](security/ips.md) — Enable network protection, choose the rule policy and bypass trusted addresses.
- [How to block malicious domains (DNS Filtering)](security/dns-filtering.md) — Enable DNS blocklists, force clients to use the firewall DNS and manage a local allowlist and blocklist.
- [How to block bad IP addresses and countries (IP & Geo Blocking)](security/ip-geo-blocking.md) — Enable IP blocklist feeds, choose what to log and manage local allow and block lists.
- [How to turn on Advanced and Collective Protection](security/atp.md) — Score devices for suspicious behaviour and use the shared Collective Defense lists.

## VPN

- [How to let users connect from home (OpenVPN remote access)](vpn/openvpn-remote-access.md) — Create the remote access server, add accounts and give users their configuration file.
- [How to connect two offices with OpenVPN (site-to-site)](vpn/openvpn-site-to-site.md) — Create a server tunnel at one site and import the client tunnel at the other.
- [How to build an IPsec tunnel to another firewall or router](vpn/ipsec-site-to-site.md) — Create an IPsec site-to-site tunnel with a pre-shared key, compatible with most vendors.
- [How to set up WireGuard (server with peers, or peer tunnel)](vpn/wireguard.md) — Create a WireGuard server and its peers for users, or a peer tunnel to another WireGuard server.

## Access and identity

- [How to create users and connect a directory (LDAP / Active Directory)](access/user.md) — Add local users for VPN access or connect a remote LDAP or Active Directory database.
- [How to turn a network into a guest network with a login page (Captive Portal)](access/captive-portal.md) — Register the unit with a captive portal manager and publish a network for guests.

## Administration

- [How to set the hostname, time zone and NTP](admin/system-settings.md) — Name the unit, set the time zone and synchronise the clock.
- [How to manage SSH access](admin/ssh.md) — Change the SSH port and allow or forbid password logins.
- [How to update the firewall (now or scheduled)](admin/update.md) — Check for a new release, back up and install it immediately or at a chosen time.
- [How to back up and restore the configuration](admin/backup-restore.md) — Download an encrypted backup, run a cloud backup and restore it.
- [How to install a trusted web certificate (Let's Encrypt or import)](admin/certificate.md) — Replace the self-signed certificate with a trusted one for the web interface and the reverse proxy.
- [How to connect the firewall to the Cloud Controller](admin/central-management.md) — Join the unit to a controller with a join code to manage it remotely.
- [How to register the license and check the subscription](admin/licensing.md) — Register the unit with the license server and see the plan, expiration and features.
- [How to reboot or shut down the firewall safely](admin/reboot-shutdown.md) — Restart or power off the unit from the web interface.

## Monitoring and logs

- [How to read the dashboard](monitor/dashboard.md) — Understand the health, traffic and services shown on the first page.
- [How to search the logs](monitor/logs.md) — Open the Log Viewer, follow events live and filter with a regular expression.
- [How to see and drop active connections](monitor/connections.md) — Read the connection tracking table, filter it and delete a connection.
- [How to see who uses the network (Traffic Analytics)](monitor/traffic-analytics.md) — Find the busiest devices, applications, websites and hours.
- [How to review the threats stopped and the devices at risk](monitor/threat-analytics.md) — Read the threat timeline, the protections that acted and the devices that need attention.
