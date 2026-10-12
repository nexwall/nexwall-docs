---
title: Performance
sidebar_position: 5
description: Historical charts, alerts and latency monitoring.
---

# Performance

**Operation & Analytics > Performance** shows how the unit behaves over time. It has three tabs.

## Charts

Historical charts of system metrics: processor use and load, memory, disk use and input and output, running
processes, the connection table, network packets, the traffic of each interface and, for the hosts you monitor, the
latency and the packet loss. Metrics are collected by an agent and stored in a time series database on the unit.

Choose the **time window** with the buttons at the top: 5 minutes, 30 minutes (the default), 1 hour, 12 hours, 24 hours, 7
days or 30 days. Every chart is a card with the current, peak and average value of each series above the plot, and the plot
stays a plot: the lines are smoothed without rounding off the peaks, and for the long windows each point is the highest
value in its step (the lowest for free memory), so a short spike of processor, memory, load or packet loss is still
visible. Traffic, packets and disk input and output are averages over each step.

The history is kept for 7 days, or for a year when the firewall has a data disk, so without a data disk the 30 days window
shows the last 7 days.

If the charts say the database is not reachable, check that the service is running, see
[Troubleshooting](../help/troubleshooting.md).

## Alerts

Alerts are conditions evaluated continuously against the metrics, for example a disk that is nearly full. The tab
lists the alerts that are **pending** (the condition just became true) and **firing** (it stayed true long enough). The
number of active alerts is shown in the tab title and on the [Dashboard](dashboard.md).

## Settings

Here you choose which hosts the unit pings to measure the quality of the network. Add the addresses or names of the
hosts you care about. Adding the address of the other end of a VPN tunnel is a good way to watch tunnel quality.

The measurements appear as two charts for every host: **latency** (round trip time, with the minimum, maximum and
average) and **packet loss** (the share of pings that were not answered; zero is a healthy link). The same charts are in the
**WAN uplinks** tab of the [Monitor](monitor-connections.md).

## Related pages

- [SD-WAN](../network/sd-wan.md) uses its own tracking hosts to decide when a WAN link is down.
- [Central management](../administration/central-management.md) keeps a longer history of the metrics.
