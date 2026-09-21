---
title: Central management
sidebar_position: 1
description: Manage many units from one controller.
---

# Central management

A **controller** is a server that many units connect to. From it, an administrator can find any unit, open its web
interface, see its metrics and logs and manage it, without having a direct network path to each site. This is what makes
it practical for a service provider to look after many customers.

## Connecting a unit

1. In the controller, add a new unit. The controller generates a **join code**.
2. On the unit, open **Administration > Central Management**.
3. Enter the address of the controller and paste the **join code**.
4. Give the unit a **name** that is easy to find in the controller. Using the fully qualified domain name of the firewall
   is a good habit. You can also add a **description**.
5. Connect. The connection is established within a few seconds.

The description takes up to fifteen minutes to show in the controller, and changing it restarts the connection.

## What the controller receives

When a unit is connected, its **logs are transmitted to the controller** for storage, monitoring and analysis of
network use, and its metrics are kept there. If you do not want this data to leave the unit, do not connect it. The page
tells you this before you connect.

## What you can do from the controller

- See all units with their state, and organize them in **unit groups**.
- Open the web interface of a unit through the controller.
- Open a **terminal session** to a unit.
- Follow metrics and logs of many units.
- Manage the **users** of the controller.
- Manage the settings of your own account.

## Disconnecting

Disconnect the unit from the page. It stops being reachable from the controller. Its own configuration is not changed.

## Requirements

- The unit must reach the controller over the internet, so outbound connectivity is needed.
- Some features, such as descriptions, require a recent controller version. The page says when this is the case.
- Managing more than a limited number of units may require a subscription.

## Related pages

- [Licensing and account](licensing-account.md)
- [Performance](../operation-analytics/performance.md)
