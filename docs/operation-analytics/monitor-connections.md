---
title: Monitor and connections
sidebar_position: 4
description: Live flows, top talkers, the WAN uplinks, VPN, and the connection table.
---

# Monitor and connections

## Monitor

**Operation & Analytics > Monitor** gives a real-time view of what is happening on the unit. It is organized in tabs.

| Tab | What it answers |
|---|---|
| Live flows | Which connections are active right now, with their transfer rates |
| Top Talkers | Which local hosts, applications and protocols use the most traffic at this moment: the total, the busiest device, application and protocol, and a ranked card for each with the speed of every row |
| WAN uplinks | The state of each WAN link, its traffic, and the latency and packet loss to the hosts you monitor |
| VPN | Remote access sessions and the state of the tunnels |

The traffic of the day, by hour, device and application, is now in [Traffic Analytics](traffic-analytics.md), and what was
stopped is in [Threat Analytics](threat-analytics.md).

:::note Where the data is kept
Monitoring data is held on the firewall. With a data disk it survives reboots; without one it is held in memory and starts
again after a reboot. When the unit is connected to a controller, the metrics are also stored there. See
[Central management](../administration/central-management.md).
:::

### Live flows

Each row is one active flow. You see the local and remote endpoints, the protocol, the recognized application when
there is one, the rate and the total volume. Use the filters to narrow the list by application, protocol, tag, source or destination. The table fills the page down to the bottom of the window and scrolls inside its own box, so the
page controls (number of rows and pages) stay in view. Two direction labels help you read the table:

- **Outgoing**: the connection was started from a local network towards the internet.
- **Remote**: the connection was started from the internet towards the firewall or a host behind it.

Some settings on the page control how flows are kept. You can keep a flow visible for a short time after it ends, which
is useful to investigate a connection that was opened and closed quickly.

If the list is empty, the reason is shown:

- the live flows service is disabled: enable it in the page settings;
- it was just enabled: apply the changes and wait a few seconds for it to start;
- it is not running: check the system logs, see [Logs](logs.md).

Traffic that the engine cannot classify is shown as **Unknown**. The set of recognized applications depends on the
catalog installed on the unit, see [Application control](../security-services/application-control.md).

### WAN uplinks

For every WAN link the tab shows its state and public address, the events of the link (up and down), its traffic, and
for every host you monitor the **latency** and the **packet loss**. Choose the hosts in the Settings tab of
[Performance](performance.md).

Choose the **time window** at the top: 1 hour (the default), 6 hours, 12 hours, 24 hours, 7 days or 30 days. For
the longer windows each point of a plot is the highest value in its step, so a short spike of loss, latency or traffic is
still visible. The history is kept for 7 days, or for a year when the firewall has a data disk, so without a data disk
the 30 days window shows the last 7 days.

Every plot is a card with the current, peak and average value of each series above the line.

## Connections

**Operation & Analytics > Connections** shows the kernel's connection tracking table. Connection tracking is the
mechanism that lets the firewall follow the state of every connection, and it is what makes stateful rules and NAT
possible.

![The connections table](/img/screenshots/operation-connections-content.png)

*The connection tracking table.*

For each entry you see the source, the destination, the protocol and the state. You can search the table, and you can
delete an entry. Deleting an entry drops that connection: the two hosts must establish it again. This is useful to make
a changed rule take effect for a connection that is already established.

## Related pages

- [Traffic Analytics](traffic-analytics.md)
- [Firewall rules](../policy/firewall-rules.md)
- [Network troubleshooting tools](../help/network-troubleshooting-tools.md) for the same connection tracking table
  from the command line, with `conntrack`
