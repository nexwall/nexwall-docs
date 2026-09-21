---
title: Monitor and connections
sidebar_position: 2
description: Live traffic, top talkers, connectivity, VPN and security views, and the connection table.
---

# Monitor and connections

## Monitor

**Operation & Analytics > Monitor** gives a real-time view of what is happening on the unit. It is organized in tabs.

| Tab | What it answers |
|---|---|
| Daily traffic | How much traffic has passed today, and when |
| Live flows | Which connections are active right now, with their transfer rates |
| Top talkers | Which local hosts, applications, remote hosts and protocols use the most traffic |
| Connectivity | The state and traffic of each WAN link, with latency and packet delivery |
| VPN | Remote access sessions and the state of the tunnels |
| Security | Threats blocked over time, by direction and category, and the most blocked addresses |

:::note Where the data is kept
Monitoring data is held in memory and starts again after a reboot. When the unit is connected to a controller, the
metrics are also stored there, so history survives reboots. See
[Central management](../administration/central-management.md).
:::

### Live flows

Each row is one active flow. You see the local and remote endpoints, the protocol, the recognized application when
there is one, the rate and the total volume. Use the filters to narrow the list to a host, an application or a
direction. Two direction labels help you read the table:

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

## Connections

**Operation & Analytics > Connections** shows the kernel's connection tracking table. Connection tracking is the
mechanism that lets the firewall follow the state of every connection, and it is what makes stateful rules and NAT
possible.

For each entry you see the source, the destination, the protocol and the state. You can search the table, and you can
delete an entry. Deleting an entry drops that connection: the two hosts must establish it again. This is useful to make
a changed rule take effect for a connection that is already established.

## Related pages

- [Traffic Analytics](traffic-analytics.md)
- [Firewall rules](../policy/firewall-rules.md)
