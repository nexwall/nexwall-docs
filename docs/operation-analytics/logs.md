---
title: Logs
sidebar_position: 6
description: Reading and searching the system logs, and the Log Viewer.
---

# Logs

**Operation & Analytics > Logs** shows the system log of the unit: messages from the firewall, the services, the
network and the kernel. The log fills the width and the height of the page. The button **Open Log Viewer** opens the
Log Viewer, a searchable view of the same events with tabs for each part of the firewall.

## Reading the log

- Choose how many lines to load.
- Turn **wrap lines** on to see long messages without scrolling sideways.
- Use the search box to keep only the lines that match. The search accepts regular expressions.
- Turn on **follow** to watch new messages as they arrive.

The log is quiet on purpose. The management API does not write a line for every read request of the web interface; it writes
the failed authorizations and every request that changes something (add, edit, delete, set, ...), which is the audit
trail. DNS queries are not written either, only the answers of the DNS filter.

## Log Viewer

The Log Viewer has these tabs:

| Tab | What it shows |
|---|---|
| Firewall traffic | Packets accepted or blocked by the firewall rules, with the reason |
| Traffic and applications | The connections with the application, the website name, the source and destination, the bytes in each direction and the duration. It records only while the Log Viewer is open and starts with the connections that are open at that moment; nothing is written to the system log for it |
| IP & Geo Block | Addresses and countries blocked by IP & geo blocking |
| Network Protection (IPS) | The alerts and blocks of the intrusion prevention engine |
| Application Control (DPI) | Flows blocked by Application Control |
| DNS Protection | Domains blocked by the DNS filter |
| Web Protection | All the web traffic the proxy handled, allowed or blocked: block pages, files stopped by the antivirus or the sandbox, content filter blocks, and requests the proxy refused. A check adds the messages of the Web Protection services. Click a device to search for it |
| VPN, High Availability, Reverse Proxy | The events of each service |
| Authentication, Admin activity | Logins and failed logins; the changes made through the web interface |
| System logs | The whole system log |
| Live rule trace, Packet path, Dropped Packets | Live traces of what happens to a packet, for troubleshooting |

Choose the time range, filter by action (blocked or allowed) and search by text. The tables can be exported.

The traffic reports of **Operation & Analytics** keep the hourly totals for 35 days.

## Useful searches

| Goal | Search for |
|---|---|
| Blocked packets | the name of the zone, or the log prefix used by the rule |
| VPN problems | `openvpn`, `charon` or `wireguard` |
| DHCP activity | `dnsmasq-dhcp` |
| IP & geo blocks | `banIP` |
| Update or registration problems | the name of the service, for example `ns-plug` |

## Keeping logs across reboots

By default the log lives in memory and is lost on reboot. To keep a copy, attach a disk or a USB drive and configure
it in **Administration > System**, in the Storage tab. The unit then also writes the logs to that device. See
[System](../infrastructure/system.md).

When a unit is connected to a controller, logs are also transmitted to it, see
[Central management](../administration/central-management.md).

## From the command line

The same log is available over SSH with `logread`. See [Command line and FAQ](../help/command-line-and-faq.md).
