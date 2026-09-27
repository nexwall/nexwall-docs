---
title: Logs and debugging from the command line
sidebar_position: 7
description: Where log copies actually live, how to search and follow them, how to make a specific service log more, and what VictoriaLogs is — and is not — used for on this unit.
---

# Logs and debugging from the command line

This unit does not use BusyBox's `logread` — there is no such command here. Logging runs through `rsyslogd`
instead. This page covers where log copies actually live, how to search them from the command line, and how to
make a specific service log more. For which service backs which feature and its one-line restart command, see
[Service and log command reference](service-and-log-reference.md); for the basics of the command line itself, see
[Command line and FAQ](command-line-and-faq.md).

All commands run as `root` over SSH or the console.

## Where logs actually live

By default, `/var/log` is a volatile, in-memory directory — this protects the root filesystem from wearing out or
filling up, but it also means `/var/log/messages` does not survive a reboot on its own.

| Copy | Path | Rotation |
|---|---|---|
| Default, in-memory | `/var/log/messages` | Rotated by `/usr/sbin/rotate-messages` once it passes 50 MB, or 10% of `/tmp`'s size if that is larger. Only the previous rotation is kept, as `messages.1.gz`. |
| Persistent, optional | `/mnt/data/log/messages` | Only written if a persistent storage device has been configured on the [System](../infrastructure/system.md#storage) page's Storage tab — it is not automatic. When present, `logrotate` rotates it weekly and keeps 52 compressed rotations, roughly a year. |

A separate daily cron job (`5 1 * * * /usr/sbin/logrotate /etc/logrotate.conf`) handles `logrotate.conf`-managed
logs generally, independent of the size-triggered rotation above.

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

## What the Logs page in the web interface actually does

The web interface's **Logs** page is a thin layer over one `ubus` call, which you can use directly — useful in a
script, or when you want the page's exact search behavior without opening a browser:

```bash
ubus call ns.log get-log '{"search":"openvpn","limit":20}'
```

This searches `/var/log/messages` directly (effectively `grep <search> /var/log/messages | tail -n <limit>`) — it
is not backed by a separate log database.

## VictoriaLogs: what it is, and is not, used for here

[VictoriaLogs](https://docs.victoriametrics.com/victorialogs/) is an optional package (`opkg install
victoria-logs`), not part of the default image. Installing it sets up everything needed in one step: the package
also registers an `rsyslogd` forwarding rule, so once it's installed, every log message is sent on to it at
`127.0.0.1:5514` over TCP (octet-counted framing) as `rsyslogd` processes it. What VictoriaLogs is **not**,
currently, is wired into anything else: neither the web interface's Logs page nor the API queries it — the Logs
page still works the way described above, straight off the plain-text file. If you install VictoriaLogs, you get
everything `rsyslogd` sees from that point on, queryable yourself with its own query language, LogsQL, over HTTP on
port 9428:

```bash
opkg update && opkg install victoria-logs
/etc/init.d/victoria-logs start

curl -s 'http://127.0.0.1:9428/select/logsql/query' \
  --data-urlencode 'query=openvpn' \
  --data-urlencode 'limit=20'
```

This is worth doing if you want LogsQL's filtering (by time range, by field, combined conditions) rather than a
plain `grep` — the exact field names available depend on the syslog template `rsyslogd` forwards with, so check a
raw result first (drop `--data-urlencode 'limit=20'` down to `'limit=1'` to see one) before building a filtered
query around a specific field. Either way, it is a tool you query yourself — not a second copy the GUI already
shows.

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
