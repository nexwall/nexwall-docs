---
title: 'KBA-06: A VPN does not connect'
sidebar_position: 16
description: Match the VPN symptom to the setting that causes it (IPsec, WireGuard, OpenVPN).
---

# KBA-06: A VPN does not connect

**Symptom.** A tunnel does not come up, or comes up and carries nothing.

Read-only checks unless said otherwise. Commands run as `root` over SSH, the console or the controller remote terminal.

## Check, in this order

1. No handshake at all: the port is open on the WAN and the public address or name in the configuration is correct.
2. Connects but reaches nothing: the routes or networks in the tunnel definition, and the firewall rules for the VPN zone.
3. Certificate errors: the clock on both sides, and whether the certificate expired or was renewed.
4. IPsec does not come up: identifiers are not reversed on the two ends, the pre-shared key and security parameters match, and the service was restarted after changing networks.
5. WireGuard peer is silent: the peer has the latest configuration after a server change.
6. See the state on the unit:

   ```sh
   swanctl --list-sas   # IPsec
   wg show               # WireGuard
   ```


## Not solved?

Search the [Logs](../operation-analytics/logs.md) for the VPN service name. Commands per feature: [KBA-16](kba-16-services.md#8-feature-specific-status).
