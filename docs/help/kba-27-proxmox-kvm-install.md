---
title: 'KBA-0027: Install on Proxmox or KVM: recommended settings and LAN/WAN networks'
sidebar_position: 37
description: 'Recommended Proxmox/KVM virtual machine settings for Nexwall Firewall, which adapter is the LAN and which is the WAN, and what to do when 192.168.1.1 does not answer.'
---

# KBA-0027: Install on Proxmox or KVM: recommended settings and LAN/WAN networks

**Applies to.** Nexwall Firewall 26.2.2 and later (the image starts on SeaBIOS and on UEFI).

## Symptom

You installed the firewall on Proxmox or another KVM host and `192.168.1.1` does not answer, or the LAN and the WAN seem to be on the same network.

## Which adapter is which

| In the VM | Inside the firewall | Role | Address |
|---|---|---|---|
| First adapter (`net0` on Proxmox) | `eth0`, part of `br-lan` | **LAN** | `192.168.1.1/24`, fixed. The firewall serves DHCP here |
| Second adapter (`net1`) | `eth1` | **WAN** | By DHCP from your network or provider |

`192.168.1.1` exists inside the VM even with no cable, but it can only be reached from a computer or VM that is on the same bridge as the **first** adapter.

## Recommended VM settings on Proxmox

Use a paravirtualized VM:

| Setting | Value |
|---|---|
| Memory | 4 GB or more (2 GB is the limit: it already uses swap) |
| Processors | 2 cores or more, 1 socket; type `x86-64-v2-AES` |
| BIOS | SeaBIOS (default) or OVMF (UEFI) |
| Machine | i440fx (default) |
| SCSI controller | VirtIO SCSI single |
| Hard disk | Bus VirtIO Block, 32 GB, IO thread on |
| CD/DVD | The Nexwall ISO. Remove it after the installation |
| Network | Two VirtIO devices, each on **its own bridge** |

## The network layout that works

- **LAN (`net0`)**: a bridge without a physical port (for example `vmbr1`) or a VLAN, where you connect the computer or the VM you use to manage the firewall.
- **WAN (`net1`)**: the bridge that reaches your network or the internet (for example `vmbr0`).

If `net0` and `net1` are on the same bridge, the LAN and the WAN share one network. The WAN gets an address from the DHCP of that network, the LAN `192.168.1.1/24` overlaps with what is there, and a computer on that bridge normally has an address in another range, so it cannot reach `192.168.1.1`.

## Check from the VM console

Log in on the console as `root` and run:

```sh
ip -br link
ip -br addr
```

You should see `br-lan` with `192.168.1.1/24`, and `eth1` (the WAN) with an address from your network. If the WAN got an address in the same range as the LAN (`192.168.1.x`), change the LAN address (next section).

## Change the LAN address

Use another range that does not exist on your network, for example `192.168.45.1/24`. Make the change permanent with:

```sh
uci set network.lan.ipaddr='192.168.45.1'
uci set network.lan.netmask='255.255.255.0'
uci commit network
/etc/init.d/network reload
ip -br addr show br-lan
```

:::note
The `ifconfig` of the system does not accept the mask in `/24` form (it answers *bad address*). Use `ifconfig br-lan 192.168.45.1 netmask 255.255.255.0` for a change that lasts only until the next restart, or the `uci` commands above for a permanent one.
:::

The DHCP server of the LAN follows the new address. Give your computer an address in the new range, or renew its DHCP lease, and open `https://192.168.45.1`.

## If it still does not work

- Confirm that the computer is on the bridge of `net0` and not on the bridge of `net1`.
- Check that the ISO was removed and the VM starts from the disk.
- Run the [health check](kba-01-health-check.md) and keep the output.
- Open a ticket in the support portal with the output of `ip -br addr` and `ip -br link`, and say which bridge each adapter uses.

## See also

- [Install on a virtual machine](../installation/install-vm-and-hardware.md)
- [Requirements and images](../installation/requirements-and-images.md)
- [KBA-0002: The web interface does not open](kba-02-web-interface.md)
