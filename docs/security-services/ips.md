---
title: Intrusion prevention (IPS / IDS)
sidebar_position: 2
description: Detect and block attacks with Snort.
---

# Intrusion prevention (IPS / IDS)

**Security Services > IPS / IDS** runs the Snort intrusion prevention system on the traffic that goes through the
firewall. Snort compares traffic with a set of **rules** that describe known attacks. Traffic that matches an active rule
is blocked, or it generates an alert, according to the rule.

## Enabling the IPS

1. Open the **Settings** tab and turn the IPS on.
2. Choose the rule policy that fits your needs. A stricter policy blocks more and can produce more false positives.
3. Optionally enter an **Oinkcode**. The Oinkcode is a personal identifier that gives access to the latest official
   rule sets. You obtain it by registering for a free account on the Snort website. Without one, the community rules
   are used.
4. Define your **home networks**: the networks you protect. Rules use them to tell inside from outside.
5. Save and **Apply changes**.

Rules are updated automatically once a day during the night.

## Events

The **Events** tab lists what the IPS has seen: traffic that it blocked and alerts it raised. Each event shows the time,
the rule, the addresses and the action. Use this list to decide what to tune.

## Tuning

No rule set is perfect. When a rule interferes with legitimate traffic you have three tools:

| Tool | Effect |
|---|---|
| **Disabled rules** | The rule is removed from the rule set for everyone. Use it when a rule is generally too strict for your environment |
| **Suppressed alerts** | The rule stays active, but it ignores one address or network in one direction. Use it when a rule is good in general but one host triggers it legitimately |
| **Bypass** | Traffic from an address is not inspected at all. Use it sparingly, for example for a backup server that moves large amounts of data |

To disable a rule or suppress an alert, start from the event that shows the problem.

## Performance

Inspecting all traffic takes processing power and memory. If you see high load after enabling the IPS, check the
[Performance](../operation-analytics/performance.md) page, use bypass for high volume trusted flows and consider a
policy with fewer rules.

## Related pages

- [IP and geo blocking](ip-geo-blocking.md)
- [Firewall rules](../policy/firewall-rules.md)
