---
title: Traffic Analytics
sidebar_position: 3
description: The optional cloud analytics service fed with traffic metadata.
---

# Traffic Analytics

**Operation & Analytics > Traffic Analytics** connects the unit to a cloud analytics service. The service turns the
metadata about your traffic, which the local classification engine produces, into higher level reports about your
network.

## What is sent

Only metadata is sent: which applications and protocols were seen, and summary information about flows. The content of
connections is not sent. The service is optional and it is **off by default**.

:::caution Decide before enabling
Enabling the service means metadata about your network leaves the unit. Review your privacy obligations first.
:::

## How to enable it

1. Open the page and turn on **metadata sending**. This must be done before the unit is provisioned.
2. Apply the changes.
3. The page shows the **agent identifier** of the unit. Use it, from the analytics portal, to add the unit to your
   account.
4. Open the portal from the link on the page and sign in. The service is provided through the Nexwall services
   platform and requires a subscription.

## When there is nothing to see

If the traffic classification engine is not running, the page tells you so. The engine is also what feeds the live flows
of the [Monitor](monitor-connections.md), so check there first.

## Turning it off

Turn off metadata sending and apply the changes. The unit stops sending immediately.
