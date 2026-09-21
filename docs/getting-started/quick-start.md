---
title: Quick start
sidebar_position: 2
description: From a freshly installed unit to a working, secured firewall.
---

# Quick start

This page takes a newly installed unit to a secured firewall that forwards traffic. It assumes you have already
written the image to a disk or created a virtual machine; if not, start with
[Installation](../installation/requirements-and-images.md).

## Before you begin

- A computer connected to the **LAN** network interface of the unit. Give it an address in `192.168.1.0/24` (for
  example `192.168.1.10`) if it does not get one automatically.
- The **WAN** interface connected to your internet connection.
- The default credentials: user `root`, password `Nexwall,1234`.

:::warning Change the default password immediately
The default password is public. The setup wizard asks you to replace it, and you should do so before connecting the
unit to an untrusted network.
:::

## 1. Open the web interface

Open `https://192.168.1.1` in a browser. The unit uses a self-signed certificate at first, so the browser shows a
warning; accept it to continue. You can replace the certificate later, see
[Certificates](../infrastructure/certificates.md).

Log in as `root`.

## 2. Run the setup wizard

On first login a wizard guides you through a secure baseline. It is recommended to do this while the unit is not yet
connected to the internet.

1. Choose **Secure by default** to apply the recommended settings, or the customized path to decide each step
   yourself.
2. **Change the root password.** Use at least 8 characters with upper and lower case letters, a number and a
   special character. Fourteen or more characters are recommended.
3. **Configure SSH access.** You can allow SSH from the LAN and from the WAN, choose the TCP port, and disable
   password login for the root user. If you disable password login you must upload an SSH public key, otherwise you
   lock yourself out of SSH.
4. **Configure web interface access.** Choose from which networks the web interface may be reached, and whether the WAN
   may reach it.
5. Review the summary and finish. The wizard applies everything and reloads the interface.

## 3. Check the network

Open **Network > Interfaces**. Confirm that:

- the LAN interface has the address you expect and belongs to the `lan` zone;
- the WAN interface has an address from your provider (DHCP), or configure a static address or PPPoE if your provider
  requires it.

See [Interfaces and routing](../network/interfaces-routing.md) for the options.

## 4. Check DNS and DHCP

Open **Network > DNS & DHCP**. The LAN interface serves addresses to your clients by default. If your WAN uses a
static address, make sure at least one DNS forwarder is configured, otherwise name resolution fails. The dashboard
warns you about this.

## 5. Give the unit its own name

The default hostname is `Nexwall`. Set a meaningful one in **Infrastructure > System**, in the General tab. The
dashboard reminds you until you do.

## 6. Apply and verify

Changes you make in most pages are staged first. Use **Apply changes** in the banner that appears to activate them.
From a LAN client, verify that you can browse the internet and that
**Operation & Analytics > Dashboard** shows the internet connection as up.

## Next steps

- Understand how rules and zones work: [Zones and policies](../policy/zones-policies.md) and
  [Firewall rules](../policy/firewall-rules.md).
- Turn on protection: [Security Services](../security-services/ips.md).
- Take a first backup: [Backup and recovery](../infrastructure/backup-recovery.md).
