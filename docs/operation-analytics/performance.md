---
title: Performance
sidebar_position: 4
description: Historical charts, alerts and latency monitoring.
---

# Performance

**Operation & Analytics > Performance** shows how the unit behaves over time. It has three tabs.

## Charts

Historical charts of system metrics: processor use and load, memory, disk use and input and output, running
processes, the connection table, network packets and the traffic of each interface. Metrics are collected by an agent
and stored in a time series database on the unit. Choose a time range to change the window shown by all charts.

If the charts say the database is not reachable, check that the service is running, see
[Troubleshooting](../help/troubleshooting.md).

## Alerts

Alerts are conditions evaluated continuously against the metrics, for example a disk that is nearly full. The tab
lists the alerts that are **pending** (the condition just became true) and **firing** (it stayed true long enough). The
number of active alerts is shown in the tab title.

## Settings

Here you choose which hosts the unit pings to measure the quality of the network. Add the addresses or names of the
hosts you care about. Adding the address of the other end of a VPN tunnel is a good way to watch tunnel quality.

The measurements appear as two charts in the Charts tab: **latency** (round trip time) and **packet delivery** (the
share of pings that were answered).

## Related pages

- [SD-WAN](../network/sd-wan.md) uses its own tracking hosts to decide when a WAN link is down.
- [Central management](../administration/central-management.md) keeps a longer history of the metrics.
