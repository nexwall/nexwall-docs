---
title: DNS filtering (Threat Shield DNS)
sidebar_position: 3
description: Block unwanted and malicious domains at name resolution.
---

# DNS filtering (Threat Shield DNS)

**Security Services > DNS Filtering** blocks websites by stopping the resolution of their names. When a device asks for
the address of a blocked domain, the unit does not answer with a usable address, so the site cannot be reached. It is
light, it works for every device on the network without installing anything, and it also blocks advertising and
trackers.

## Blocklists

A **blocklist** is a list of domains grouped by purpose and maintained by someone. The page lists the available sources
and lets you enable the ones you want. They cover categories such as malware and phishing, advertising and trackers,
adult content, gambling, piracy, and services used to bypass filtering. Some lists are available to every unit, others
only with a subscription that includes Threat Shield. The page says which is which.

Blocklists are updated automatically.

## Enabling the filter

1. Open the **Settings** tab and enable Threat Shield DNS.
2. Choose the **zones** whose traffic is redirected to the filter. Devices in those zones are filtered even if they
   are configured with another DNS server.
3. Choose the **ports** to redirect. DNS normally uses port 53.
4. In **Blocklist sources**, enable the lists you want.
5. Save and **Apply changes**.

## Your own lists

- **Local blocklist:** domains you want to block in addition to the lists.
- **Allowed domains:** domains that must never be blocked, even when a list contains them. Removing a domain from this
  list can make it blocked again if a list includes it, and the page warns you.

## Exceptions for some devices

Use the **Filter bypass** tab to stop filtering for specific addresses or subnets, for example a management network or a
server that needs unfiltered access.

## Limits to keep in mind

- DNS filtering does not see the content of pages, it only blocks names. A device that connects directly to an address
  without a name is not affected. Combine it with [IP and geo blocking](ip-geo-blocking.md) and
  [application control](application-control.md).
- Encrypted DNS used by an application can bypass a resolver that is not the unit. Redirecting the DNS ports of the
  zone, and enabling the lists that block services used to bypass filtering, reduces this.

## Related pages

- [DNS and DHCP](../network/dns-dhcp.md)
- [Objects](../policy/objects.md)
