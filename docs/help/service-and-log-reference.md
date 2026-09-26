---
title: Service and log command reference
sidebar_position: 4
description: Which service backs each feature, how to restart it, and where to find its logs, over SSH.
---

# Service and log command reference

Each page in the web interface is backed by one or more system services. When a feature misbehaves and the web
interface does not say why, restarting the right service or reading its log directly is often the fastest way
forward. This page is that lookup table. For the basics of the command line, see
[Command line and FAQ](command-line-and-faq.md); for reading logs from the web interface, see
[Logs](../operation-analytics/logs.md).

All commands run as `root` over SSH or the console.

## Services by feature

| Feature (web interface) | Service | Restart | Find it in the log |
|---|---|---|---|
| Firewall Rules, NAT, Zones & Policies | `firewall` | `/etc/init.d/firewall reload` (rules only) or `restart` | the zone name, or the log prefix set on the rule |
| DNS & DHCP | `dnsmasq` | `/etc/init.d/dnsmasq restart` | `dnsmasq-dhcp` |
| Application control (DPI) | `netifyd`, `dpi` | `/etc/init.d/netifyd restart`, `/etc/init.d/dpi restart` | `netifyd` |
| Intrusion prevention (IPS/IDS) | `snort` | `/etc/init.d/snort restart` | `snort` |
| DNS filtering (Threat Shield DNS) | `ns-flashstart` | `/etc/init.d/ns-flashstart restart` | `ns-flashstart` |
| IP & geo blocking (Threat Shield IP) | `banip` | `/etc/init.d/banip restart` | `banIP` |
| SD-WAN | `mwan3` | `/etc/init.d/mwan3 restart` | `mwan3` |
| Captive portal | `dedalo`, `dedalo_users_auth` | `/etc/init.d/dedalo restart` | `dedalo` |
| OpenVPN (remote access, site-to-site) | `openvpn` | `/etc/init.d/openvpn restart` | `openvpn` |
| IPsec tunnels | `ipsec` | `/etc/init.d/ipsec restart` | `charon` |
| WireGuard | managed as a network interface | `ifdown <interface>` then `ifup <interface>` | `wireguard` |
| MAC binding | `ns-binding` | `/etc/init.d/ns-binding restart` | `ns-binding` |
| Port forwarding via NAT reflection | `ns-netmap` | `/etc/init.d/ns-netmap restart` | `ns-netmap` |
| Central management (controller connection) | `ns-plug` | `/etc/init.d/ns-plug restart` | `ns-plug` — see [Controller registration troubleshooting](controller-registration-troubleshooting.md) |
| High availability | `keepalived`, managed via `ns-ha-config` | do not restart `keepalived` directly, use `ns-ha-config`, see [High availability](../infrastructure/high-availability.md) | `keepalived` |
| Web interface | `ns-ui` | `/etc/init.d/ns-ui restart` | `ns-ui` |
| System log forwarding | `rsyslog` | `/etc/init.d/rsyslog restart` | — |
| MSP monitoring agent | `check_mk_agent` | `/etc/init.d/check_mk_agent restart` | `check_mk_agent` |

A `restart` interrupts the service briefly; a `reload`, where available, applies configuration without a full restart
and is worth trying first on a production unit.

## Diagnostic commands beyond restart and logread

These read the live state of a service instead of, or in addition to, its log.

| Task | Command |
|---|---|
| SD-WAN link and policy state | `mwan3 status`, `mwan3 interfaces` |
| IPsec tunnel state | `ipsec statusall` |
| WireGuard peer state and handshakes | `wg show` |
| IPS: service status, memory use, active rule counters | `snort-mgr status` |
| IPS: validate the rendered configuration without applying it | `snort-mgr check` |
| IPS: report on recent incidents | `snort-mgr report`, add `-n 10` for only the ten most frequent |
| OpenVPN: list connected clients from the management socket | `openvpn-status <path-to-socket>` — find the socket first with `find /var/run /var/etc -iname '*openvpn*.sock' 2>/dev/null` |
| Controller connection state | `ubus call ns.plug status` |
| High availability pair state | `ns-ha-config status` |

## Forcing DPI signature and rule updates

The application control database and its license check run on their own schedule via cron. To force an update
immediately instead of waiting:

```bash
/etc/init.d/dpi-data-update start     # application signature database
/etc/init.d/dpi-license-update start  # subscription license check
```

For the IPS ruleset, use `snort-mgr update-rules` instead of restarting a service; it downloads the ruleset and
rewrites the configuration `snort` reads on its next start.

## Reading a service's own configuration as UCI sees it

Every service above is configured through `/etc/config/<name>`, usually with the same name as the UCI package (for
example `uci show dpi`, `uci show mwan3`, `uci show snort`). Not all service and UCI package names match exactly —
`ns-flashstart` and `banip` do — check `ls /etc/config/` if a name from this table returns nothing. For what UCI is
and how to use it beyond just reading it, see [What is UCI, and why it matters](understanding-uci.md).

## Related pages

- [Command line and FAQ](command-line-and-faq.md)
- [Controller registration troubleshooting](controller-registration-troubleshooting.md)
- [What is UCI, and why it matters](understanding-uci.md)
- [Logs](../operation-analytics/logs.md)
- [High availability](../infrastructure/high-availability.md)
