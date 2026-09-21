---
title: Application control (DPI)
sidebar_position: 1
description: Recognize applications and protocols and block them per interface.
---

# Application control (DPI)

**Security Services > DPI** blocks traffic by what it is, not only by the port it uses. The unit inspects connections
with deep packet inspection (DPI). An engine recognizes the protocol of each flow and, when it can, the application that
produced it, for example a streaming service or a messaging app. You then write rules that block the ones you do not
want on a network.

## How it works

1. The engine watches the traffic and classifies each connection using the protocol and the names it carries, such as
   the server name in an encrypted connection.
2. The rules you define are compared with the result.
3. When a connection matches a block rule, the unit rejects it and keeps rejecting it for a period.

Classification needs the first packets of a connection, so a blocked connection is stopped as soon as the application is
recognized, not before the connection starts.

## The catalog

The applications you can select come from the **catalog** installed on the unit. The base catalog recognizes a set of
common applications and many protocols. Where your plan includes an extended catalog, it adds many more applications. The page tells you when the number of
applications is limited by the lack of a subscription.

:::note
Traffic the engine cannot classify is shown as *Unknown* in the live flows. It is never blocked by an application rule.
:::

## Rules

Open the **Rules** tab. A rule applies to **one interface**: only the traffic that passes through it is subject to the
rule.

1. Add a rule and choose the interface.
2. Search and select the applications, protocols or categories to block. The search shows more results as you type.
3. Choose whether to log the blocked connections.
4. Save and **Apply changes**.

Rules can be turned on and off, edited and deleted. Deleting a rule stops the blocking on that interface.

## Exceptions

Use the **Exceptions** tab to exempt addresses from application blocking, for example the gateway or important
infrastructure. Traffic from or to an exempted address is never blocked by these rules.

## Tips

- Start with a small number of rules and check the result in the [Monitor](../operation-analytics/monitor-connections.md).
- Combine application control with [DNS filtering](dns-filtering.md): one works on names, the other on what the traffic
  is.
- If a rule seems to have no effect, check that the service is enabled, that the rule is enabled, that you applied the
  changes, and that the application shows up as recognized in the live flows.

## Related pages

- [Traffic Analytics](../operation-analytics/traffic-analytics.md)
- [Licensing and account](../administration/licensing-account.md)
