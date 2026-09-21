---
title: DNS and DHCP
sidebar_position: 3
description: Serve addresses, resolve names, and manage leases and local records.
---

# DNS and DHCP

**Network > DNS & DHCP** configures the DHCP server that gives addresses to your devices and the DNS service that
resolves names for them.

## DHCP

Each interface with a static address can serve DHCP. For each one you set:

| Setting | Meaning |
|---|---|
| Enabled | Turns the server on for the interface |
| Range | The first and last address handed out, or the start and the number of addresses |
| Lease time | How long a device keeps an address before asking again. Use values such as `45m`, `12h`, `2d`, `1w` or `infinite`. The default is one hour for IPv4 |
| Options | Extra DHCP options sent to clients, for example a different gateway or a DNS server |

The range must fit inside the network of the interface.

### Static leases

A static lease always gives the same address to a device. The device is identified by its **MAC address**, and you can
also give it a name. Use static leases for printers, servers and anything you want to reach at a fixed address.

### Dynamic leases

The **Dynamic leases** view lists the addresses currently in use: the device, its address and when the lease ends.

### Scan the network

The **Scan network** tool discovers devices on an interface. It is available only for interfaces with a network of /20
or smaller.

### MAC binding

You can restrict an interface so that only devices with a static lease receive service. Combined with a strict policy,
this keeps unknown devices off the network.

## DNS

The unit acts as a resolver for its networks.

| Setting | Meaning |
|---|---|
| Forwarders | Upstream DNS servers for names the unit does not know. Use `/domain/server` to send queries for a domain to a specific server |
| Local domain | The suffix added to names of DHCP clients. The default is `lan` |
| Rebind protection | Drops answers from the internet that point to private addresses, which stops an attack where a browser is used to probe your network |
| Log queries | Records DNS queries in the system log |

If your WAN uses a static address, configure at least one forwarder.

### Local DNS records

Records map a name to an address for your local network. They are not needed for hosts with static leases. Use them for
names that point to another host, or for **wildcard** records, which answer for a domain and all its subdomains.

## Related pages

- [DNS filtering](../security-services/dns-filtering.md)
- [Objects](../policy/objects.md), where DHCP reservations and DNS records can be used
