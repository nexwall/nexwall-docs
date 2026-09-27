---
title: Logs and debugging from the command line
sidebar_position: 7
description: Where log copies actually live, how to search and follow them, how to query VictoriaLogs, and how to make a specific service log more.
---

# Logs and debugging from the command line

This unit does not use BusyBox's `logread` — there is no such command here. Logging runs through `rsyslogd`,
which by default keeps `/var/log/messages` in memory and, on a unit with persistent storage configured, also
writes a copy that survives a reboot and feeds [VictoriaLogs](https://docs.victoriametrics.com/victorialogs/), a
small log database. This page covers where those copies live, how to search them, and how to make a specific
service log more. For which service backs which feature and its one-line restart command, see
[Service and log command reference](service-and-log-reference.md); for the basics of the command line itself, see
[Command line and FAQ](command-line-and-faq.md).

All commands run as `root` over SSH or the console.

## Where logs actually live

By default `/var/log` is in memory: this protects the storage device from wearing out or filling up, but it also
means `/var/log/messages` does not survive a reboot on its own.

| Copy | Path | When it exists |
|---|---|---|
| Default, in-memory | `/var/log/messages` | Always. Rotated by `/usr/sbin/rotate-messages` once it passes roughly 98 MB; only the previous rotation is kept, as `messages.1.gz`. |
| Persistent | `/mnt/data/log/messages` | Once persistent storage is configured on the [System](../infrastructure/system.md#storage) page's Storage tab. The same stream is written there too, without the 98 MB cutoff. |
| VictoriaLogs | queried over HTTP, not a plain file — see below | Alongside the persistent copy: `rsyslogd` forwards every message to it over UDP as soon as persistent storage is configured, and it keeps a 30-day index on the same storage device. |

A handful of services keep their own state alongside this, outside the log stream entirely — for example
`/mnt/data/dnsmasq/dhcp.leases`, and, per VPN instance, a connection-tracking database under
`/mnt/data/openvpn/<instance>/connections.db`. These are state files, not logs, but worth knowing about when a
service's behavior doesn't match what its log says.

## Tailing and searching

```bash
tail -f /var/log/messages
grep openvpn /var/log/messages | tail -20
```

If persistent storage is configured, `/mnt/data/log/messages` holds the same stream further back in time — check
`ls /mnt/data/log/` first to confirm it exists on this unit before relying on it.

For the log prefix each service actually writes under, see the table in
[Service and log command reference](service-and-log-reference.md#services-by-feature).

## Querying VictoriaLogs

Where it is running, VictoriaLogs answers queries on port 9428 using its own query language, LogsQL. A plain
keyword searches the message text:

```bash
curl -s 'http://127.0.0.1:9428/select/logsql/query' \
  --data-urlencode 'query=openvpn' \
  --data-urlencode 'limit=20'
```

Each result is a JSON object with fields including `_msg`, `_time`, `app_name`, `hostname`, `level` and
`severity`, which makes it easy to filter more precisely than a plain grep would allow:

```bash
# only this service
curl -s 'http://127.0.0.1:9428/select/logsql/query' --data-urlencode 'query=app_name:nethsecurity-api' --data-urlencode 'limit=20'

# only errors, across every service
curl -s 'http://127.0.0.1:9428/select/logsql/query' --data-urlencode 'query=level:error' --data-urlencode 'limit=20'

# only the last five minutes
curl -s 'http://127.0.0.1:9428/select/logsql/query' --data-urlencode 'query=_time:5m' --data-urlencode 'limit=50'
```

If that `curl` returns nothing or connection refused, VictoriaLogs is not running on this unit — check
`/etc/init.d/victoria-logs status`, and confirm persistent storage is configured, since that is what enables it.

## What the Logs page in the web interface calls

The web interface's **Logs** page is a thin layer over one `ubus` call, which you can use directly — useful in a
script, or when you want the page's exact search behavior without opening a browser:

```bash
ubus call ns.log get-log '{"search":"openvpn","limit":20}'
```

## Turning up verbosity for a specific service

The default log volume is usually too quiet to debug a specific problem. Each of these raises it for one service;
turn it back down once you have what you need — full IKE tracing or OpenVPN's top verbosity produces a lot of
output very fast, which pushes `/var/log/messages` toward its rotation point sooner.

| Service | How to increase verbosity | Then |
|---|---|---|
| OpenVPN | `uci set openvpn.<instance>.verb='5'` (`0` quiet to `11` very verbose; `3` is the shipped default) | `uci commit openvpn && /etc/init.d/openvpn restart` |
| dnsmasq (DNS/DHCP) | `uci set dhcp.@dnsmasq[0].logqueries='1'` to log every DNS query, add `.logdhcp='1'` for DHCP transactions too | `uci commit dhcp && /etc/init.d/dnsmasq restart` |
| IPsec (charon) | Edit `/etc/strongswan.d/charon-logging.conf` — raise a specific subsystem (for example `ike = 2`) or `default` for everything | `/etc/init.d/ipsec restart` |
| nftables (firewall) | Add `log` to one rule (the web interface's per-rule logging toggle does exactly this) for a persistent record, or run `nft monitor trace` for a live, unfiltered packet trace | Rule changes need `/etc/init.d/firewall reload`; `monitor trace` runs immediately in the foreground |

The DNS query-logging option above is also what the web interface's own DNS settings expose — `uci get
dhcp.@dnsmasq[0].logqueries` is the same value the [DNS & DHCP](../network/dns-dhcp.md) page's own query-logging
toggle reads and writes.

## Related pages

- [Service and log command reference](service-and-log-reference.md)
- [Network troubleshooting tools](network-troubleshooting-tools.md)
- [Command line and FAQ](command-line-and-faq.md)
- [System](../infrastructure/system.md)
- [Logs](../operation-analytics/logs.md)
