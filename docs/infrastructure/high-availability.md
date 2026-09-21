---
title: High availability
sidebar_position: 4
description: Run two units as a pair, so a failure does not interrupt the network.
---

# High availability

A high availability (HA) pair uses two units, a **primary** and a **backup**, that share a **virtual IP address**. If the
primary fails, the backup takes over that address and the WAN interface within moments, and the network keeps working.

In this release HA is configured from the command line with the `ns-ha-config` tool. Status and logs are available there
too.

## Requirements

- Both units have the **same network devices**.
- Both are connected to the same LAN.
- On the LAN, only **static IPv4 addresses** are supported.

## What is supported

WAN connections can be static IPv4 or IPv6, or DHCP IPv4, on physical interfaces, bonds, bridges, VLANs (including over
bonds and bridges) and PPPoE (including over VLANs).

The configuration that is synchronized to the backup includes firewall rules and port forwards, DHCP and DNS, the SSH
server, the VPN services (OpenVPN, IPsec, WireGuard), static routes, QoS, SD-WAN, application control rules, Threat
Shield, the reverse proxy and certificates, user databases, NAT settings, backup settings, the connection to a
controller, and the captive portal.

The state of active connections is also synchronized, so most sessions survive a switch.

## Limits

- Extra packages that are not part of the standard image are not supported.
- The log server configuration is not synchronized. Use a controller to keep logs from both units.
- After the first synchronization the backup has the same hostname as the primary.
- The captive portal works only on physical interfaces. Active guest sessions are held in memory and are lost when the
  units switch, so guests may need to log in again.

## Setting it up

The example uses `192.168.100.238` for the primary, `192.168.100.239` for the backup and `192.168.100.240/24` as the
virtual address.

1. Power on the **backup** and give its LAN a static address. Then do the same on the **primary**. These addresses reach
   each unit directly, even when the cluster is off.
2. On the primary, check the requirements:

   ```bash
   ns-ha-config check-primary-node lan
   ```

   If the primary runs a DHCP server, the gateway option must be the virtual address, and a DNS server that the clients
   can reach even when the primary is down must be set.
3. Check the backup from the primary:

   ```bash
   ns-ha-config check-backup-node 192.168.100.239 lan
   ```

4. Initialize the primary, then the backup:

   ```bash
   ns-ha-config init-primary-node 192.168.100.238 192.168.100.239 192.168.100.240/24 lan
   ns-ha-config init-backup-node lan
   ```

The setup configures the HA traffic on the LAN, the virtual address with a random password, and an SSH channel on
port 65022 used only to synchronize data with key authentication.

From then on, configure the primary. Its changes are synchronized to the backup, except for the LAN network
configuration.

## Operating the pair

| Task | Command |
|---|---|
| Check the state | `ns-ha-config status` |
| Show the configuration | `ns-ha-config show-config` |
| Add or remove a LAN interface | `ns-ha-config add-lan-interface` and `ns-ha-config remove-interface` |
| Add or remove a virtual address | `ns-ha-config add-vip` and `ns-ha-config remove-vip` |
| Open a shell on the backup | `ns-ha-config ssh-remote` |
| Update the backup | `ns-ha-config upgrade-remote` |
| Disable or enable the cluster | `ns-ha-config disable` and `ns-ha-config enable` |
| Remove the configuration | `ns-ha-config reset` |

Test a failover before you rely on the pair, by switching off the primary and checking that traffic continues.

## Related pages

- [Backup and recovery](backup-recovery.md)
- [Command line and FAQ](../help/command-line-and-faq.md)
