---
title: Overview
sidebar_position: 1
description: What Nexwall Firewall is and what it can do.
---

# Overview

Nexwall Firewall is a network security appliance for organizations and for the service providers that look after
them. It runs as a ready-made disk image on ordinary x86 hardware or on a virtual machine, and it is administered from
a web interface. Under the hood it is built on OpenWrt, a mature Linux distribution designed for network devices, and
on well-known open source components such as nftables, Snort, OpenVPN, strongSwan and WireGuard.

## What it does

| Area | What you can do |
|---|---|
| Filtering | Control traffic between networks with zone based rules, NAT and port forwarding |
| Protection | Block applications, stop intrusions, filter malicious domains, and block hostile addresses or whole countries |
| Connectivity | Use several internet links with failover and balancing, shape bandwidth, and run DHCP and DNS |
| Remote access and sites | Give users secure remote access and connect offices with site-to-site tunnels |
| Visibility | See live connections, traffic statistics, performance charts and logs |
| Operations | Back up, update and restore units, keep them highly available, and manage many of them from one place |

## How the documentation is organized

The administration guide follows the menu of the web interface, so you can find a page by looking for the menu entry
you are using:

- **Getting started** and **Installation** explain what you need to bring a unit into service.
- **Operation & Analytics** covers the dashboard, live traffic, performance and logs.
- **Policy** covers rules, NAT, zones and objects.
- **Security Services** covers application control, the intrusion prevention system, DNS filtering and IP or country
  blocking.
- **Network**, **VPN**, **Access & Identity**, **Infrastructure** and **Administration** cover the rest of the menu.
- **Help** collects troubleshooting steps organized by symptom, and a command line reference.

:::tip Start here
If you are setting up a unit for the first time, read [Quick start](quick-start.md) next. If you want to understand the
terms used everywhere else, read [Concepts](concepts.md).
:::

## Editions and features

Some features depend on a subscription, for example the larger application catalog, encrypted cloud backups and the
advanced Threat Shield lists. Where a page describes such a feature, it says so. See
[Licensing and account](../administration/licensing-account.md) for how a subscription is activated.
