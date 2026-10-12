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

- A computer connected to the **LAN** network interface of the unit. The unit gives addresses to its LAN
  clients by default (DHCP), so the computer normally gets one by itself. If it does not, give it an address in
  `192.168.1.0/24` (for example `192.168.1.10`).
- The **WAN** interface connected to your internet connection. On a new unit the second network port (`eth1`) is the WAN and asks
  your provider for an address (DHCP) by itself, even before you run the wizard.
- The default credentials: user `root`, password `nexwall`.

:::warning Change the default password immediately
The default password is public. The setup wizard asks you to replace it, and you should do so before connecting the
unit to an untrusted network.
:::

## What the unit already does by itself

Even if you never run the wizard, the first boot applies the **secure defaults** once: the Network Protection (IPS), the DNS
filter, IP and country protection, and the Application Control **Standard** profile with its Web Protection rules (and the
antivirus, when your license includes it and the unit has data storage). The LAN serves DHCP (addresses `192.168.1.100` to
`192.168.1.249`) and DNS, with the firewall itself (`192.168.1.1`) as gateway and DNS server for the clients. The wizard
lets you change these choices.

## 1. Open the web interface

Open `https://192.168.1.1` in a browser. The unit uses a self-signed certificate at first, so the browser shows a
warning; accept it to continue. You can replace the certificate later, see
[Certificates](../infrastructure/certificates.md).

Log in as `root`.

## 2. Run the setup wizard

On first login a wizard guides you through a secure baseline. Keep the unit connected to the internet during the setup, because the
protection lists are downloaded then.

1. Choose **Secure by default** to apply the recommended settings, or the tailored path to decide each step
   yourself.
2. **Change the root password.** Use at least 8 characters with upper and lower case letters, a number and a
   special character. Fourteen or more characters are recommended.
3. **Network.** Choose the name of the firewall (`FIREWALL` is the default and a good name when you have one unit) and how it connects
   to the internet: automatic (DHCP), a fixed IP address or PPPoE.
4. **SSH access.** You can allow SSH from the LAN and from the WAN, choose the TCP port, and disable
   password login for the root user. If you disable password login you must upload an SSH public key, otherwise you
   lock yourself out of SSH.
5. **Web interface access** on TCP ports 9090 and 443. Choose from which networks the web interface may be reached, and whether the WAN
   may reach it.
6. **Security services.** Network Protection (IPS), DNS Filtering and IP & Geo Blocking are on by default; switch off what you do not
   want and choose the countries to block.
7. **Application Control profile.** Choose **Standard**, **School** or **Restricted**. The choice creates the application rules and the
   Web Protection rules (website categories, antivirus, SafeSearch and the content filter profile). See
   [Web Protection](../security-services/web-protection.md).
8. Review the summary and finish. The wizard applies everything and reloads the interface.

## 3. Check the network

Open **Network > Interfaces**. Confirm that:

- the LAN interface has the address you expect and belongs to the `lan` zone;
- the WAN interface has an address from your provider (DHCP), or configure a static address or PPPoE if your provider
  requires it.

See [Interfaces and routing](../network/interfaces-routing.md) for the options.

## 4. Check DNS and DHCP

Open **Network > DNS & DHCP**. The LAN interface serves addresses and DNS to your clients by default. If your WAN uses a
static address, make sure at least one DNS forwarder is configured, otherwise name resolution fails. The dashboard
warns you about this.

## 5. Give the unit its own name

The default hostname is `FIREWALL`. If you run several units, set a distinct name in **Administration > System**, in the General tab.
The dashboard reminds you while the unit keeps its factory name.

## 6. Apply and verify

Changes you make in most pages are staged first. Use **Apply changes** in the banner that appears to activate them.
From a LAN client, verify that you can browse the internet and that
**Operation & Analytics > Dashboard** shows the internet connection as up.

## Next steps

- Understand how rules and zones work: [Zones and policies](../policy/zones-policies.md) and
  [Firewall rules](../policy/firewall-rules.md).
- Turn on protection: [Security Services](../security-services/ips.md) and [Web Protection](../security-services/web-protection.md).
- Take a first backup: [Backup and recovery](../infrastructure/backup-recovery.md).
