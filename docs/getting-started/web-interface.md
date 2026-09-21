---
title: Using the web interface
sidebar_position: 3
description: Navigation, staged changes, tabs, language and theme.
---

# Using the web interface

## The menu

The menu on the left is organized in sections. Every section is always expanded, so every page is one click away.

| Section | Contains |
|---|---|
| Operation & Analytics | Dashboard, Monitor, Traffic Analytics, Connections, Performance, Logs |
| Policy | Firewall Rules, NAT, Port Forwarding, Zones & Policies, Objects |
| Security Services | DPI, IPS / IDS, DNS Filtering, IP & Geo Blocking |
| Network | Interfaces, Routing, SD-WAN, DNS & DHCP, QoS, Reverse Proxy |
| VPN | Remote Access (OpenVPN), OpenVPN Site-to-Site, IPsec Site-to-Site, WireGuard |
| Access & Identity | Users & Groups, Captive Portal |
| Infrastructure | Backup & Recovery, System, Certificates, Reboot & Shutdown |
| Administration | Central Management, Licensing |

Related settings are grouped as tabs of one page. **System** has the tabs General, Time sync, SSH, Updates and Storage,
and **Backup & Recovery** has Backup, Restore, Migration and Factory reset. Old bookmarks still work: they redirect to
the right tab.

## Tabs

Many pages have tabs at the top, for example **Firewall Rules** has Forward, Input and Output rules. The selected tab
is kept in the address bar, so you can share or bookmark a link to it.

## Staged changes

Most configuration changes are written to a pending configuration first. While changes are pending, a banner offers two
actions:

- **Apply changes** activates everything that is pending.
- **Revert changes** discards it.

This lets you prepare several related changes, for example a new zone and its rules, and activate them together.

:::caution
Pending changes are lost if the unit reboots or shuts down. The reboot and shutdown pages warn you when there are
unsaved changes.
:::

## Tables

Tables share a common set of tools: a filter box, sortable columns, pagination, and an actions menu on each row. When a
filter hides everything, a message tells you to change the filter.

## Confirmation prompts

Destructive actions, such as deleting a rule or a database, ask for confirmation. Some critical operations, for example
a factory reset, ask you to type the name of the unit before they proceed.

## Your account

Open the user menu at the top right for **Account settings**. There you can change your password, choose the language
of the interface and configure two-factor authentication. See
[Licensing and account](../administration/licensing-account.md).

## Language and theme

The interface is available in English, Portuguese (Brazil) and Spanish. It uses the language of your browser by
default, and you can choose another in your account settings. The light and dark themes are switched from the top bar.
