---
title: Captive portal
sidebar_position: 2
description: Require guests to authenticate before they use the network.
---

# Captive portal

**Access & Identity > Captive Portal** turns a network interface into a guest network with a login page. Devices that
connect are intercepted until the user authenticates, for example with a code, a voucher or a social login, depending on
what the hotspot manager offers. It is meant for hotels, cafes, waiting rooms and offices with visitors.

## How it works

The unit runs the part of the captive portal that intercepts connections. The management of the guest experience
(pages, vouchers, sessions and statistics) is done in a **hotspot manager** that the unit registers with.

### Step by step

1. A guest connects to the guest interface and gets an address from the hotspot (not from the LAN DHCP).
2. The unit's hotspot component (Dedalo, based on CoovaChilli) holds the guest: the guest's traffic is not forwarded to the internet
   yet, only what is needed to reach the login page.
3. The guest's browser is redirected to the login page, which is served by the hotspot manager (Icaro), not by the firewall.
4. The guest authenticates there (code, voucher, social login...). The manager tells the unit that this device may go out and for how long
   (the RADIUS exchange between the unit and the manager runs over HTTP).
5. From then on the traffic of that device is forwarded according to your firewall rules, until the session ends or expires.

### Under the hood

- The hotspot has its own network device (`tun-dedalo`) and its own firewall zone, `hotspot`. A rule drops forwarding from the guest
  interface for unauthenticated devices; the zone is where you decide what authenticated guests may reach.
- The unit is registered with the manager using the endpoint and credentials of the **Settings** tab. The manager is an external server: if it
  is unreachable, new guests cannot log in, while guests already authenticated keep their session until it ends.
- The firewall rules, [QoS](../network/qos.md) and the content protection of [Web Protection](../security-services/web-protection.md) apply
  to the hotspot zone like to any other.

## Setting it up

1. Open the **Settings** tab and sign in: enter the **endpoint** of the hotspot manager and the username and password you
   were given.
2. Choose the **network device** the hotspot listens on. It intercepts all connections on that interface and demands
   authentication.
3. Choose the **network address** for the hotspot. Guests receive addresses inside that network.
4. Set the **DHCP limit**, the maximum number of leases. The first address of the DHCP range is calculated for you.
5. Save. All pending changes to the firewall and network configuration are committed.

## Sessions

The **Status** tab shows the sessions of the clients connected to this unit.

## Removing the unit from the manager

**Unregister** detaches the unit from the hotspot manager. The local firewall and network configuration is not changed,
so remove the hotspot network yourself if you no longer need it.

## Good practice

- Place the hotspot in its own zone, separate from the LAN. See [Zones and policies](../policy/zones-policies.md).
- Limit what guests can reach with [firewall rules](../policy/firewall-rules.md), and limit bandwidth with
  [QoS](../network/qos.md).
- In a high availability pair the hotspot works only on a physical interface, and active sessions do not survive a
  switch, see [High availability](../infrastructure/high-availability.md).
