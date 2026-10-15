---
title: Traffic Analytics
sidebar_position: 3
description: "Where the traffic of the firewall goes: how much, when, and which devices, applications, websites and protocols."
---

# Traffic Analytics

**Operation & Analytics > Traffic Analytics** shows where the traffic goes. It is built from the hourly traffic reports of the
local classification engine and runs on the firewall: nothing leaves the unit. The content of connections is never
recorded, only which applications and protocols were seen and how many bytes they carried.

![Traffic Analytics](/img/docs/traffic-en.png)

Choose **Today**, **7 days** or **30 days** at the top right. The reports are kept for 35 days.

## What the page shows

- **Four figures**: the total traffic, the busiest hour, the top application and the top device.
- **Traffic by hour**: a bar per hour of the day. For 7 or 30 days the hours of all the days are added together. Today is
  updated every minute.
- **Ranked lists** of the local hosts (devices), the applications, the remote hosts and the protocols, each row with its
  volume and its share of the total.
- **Web categories**: the traffic by website category.

The firewall itself is not counted as a device or as a remote host. With the web proxy on, everything the proxy fetches
for your devices leaves from the firewall address, and counting it would show the firewall as the busiest device and count
the traffic twice.

## Following a row

Click a row of a list to filter the whole page by it, for example by one device. The filter appears at the top as a chip;
click the **x** of a chip, or **Clear**, to remove it. Filters combine: a device, then one of its applications, then one
remote host. The filters are in the address of the page, so you can bookmark or share a link to a view.

## When there is nothing to see

If the traffic classification engine is not running, the page has no data. The engine is also what feeds the live flows of the
[Monitor](monitor-connections.md), so check there first. Approximations to keep in mind: for 7 and 30 days each day brings its own
top list, so something that is small every day can be missing from the totals of the lists.

## Related pages

- [Threat Analytics](threat-analytics.md)
- [Monitor and connections](monitor-connections.md)
- [Application control](../security-services/application-control.md)
