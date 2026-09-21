---
title: IP and geo blocking (Threat Shield IP)
sidebar_position: 4
description: Block hostile addresses, countries, brute force attempts and floods.
---

# IP and geo blocking (Threat Shield IP)

**Security Services > IP & Geo Blocking** blocks new connections to and from addresses that are known to be hostile. It
works at the network layer, before a connection reaches any service, and it can also block whole countries.

## Status and blocklists

Turn the service on in the **Settings** tab. Then open the blocklist page.

A **blocklist** is a list of addresses compiled by someone and grouped by purpose. Each one has a clear name that tells
you who maintains it and what it targets. Choose the lists to enable, and for each one the direction it is applied
to (inbound, outbound or both). Some lists need a subscription that includes Threat Shield.

Blocked connections are logged with a tag that includes the direction, the zone and the action, so you can search for
them in [Logs](../operation-analytics/logs.md).

## Your own entries

| List | Effect |
|---|---|
| Local blocklist | Addresses, networks, host names or MAC addresses that must always be blocked |
| Allowlist | Entries that must always be allowed, even if a blocklist contains them |

An entry can be an IPv4 or IPv6 address (with optional CIDR), a fully qualified host name, or a MAC address in the form
`xx:xx:xx:xx:xx:xx`.

:::warning Avoid locking yourself out
Add the address you administer the unit from, and the addresses of your VPN, to the allowlist before you enable
aggressive blocklists.
:::

## Geo blocking

You can block traffic to and from countries or regions. Select them in the geo blocking settings. Use this when a
service has no legitimate users in some parts of the world.

## Brute force and flood protection

The service can also react to abuse:

- **Brute force protection** bans a source that repeatedly fails to log in to a service. You choose how many failures
  cause a ban and for how long.
- **Flood protection** limits ICMP, TCP SYN and UDP floods per second.

## Banned addresses

The **Banned addresses** view lists the addresses that are currently blocked. You can search for an address to see which
list contains it, and remove a ban.

## Logging and the dashboard

The threat statistics show only what was logged. Enable logging in the settings to feed them. See
[Dashboard](../operation-analytics/dashboard.md).

## Related pages

- [DNS filtering](dns-filtering.md)
- [Intrusion prevention](ips.md)
