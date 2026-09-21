---
title: Requirements and images
sidebar_position: 1
description: What you need to run a unit, and what the disk image is.
---

# Requirements and images

## Hardware and virtual machine requirements

| Item | Requirement |
|---|---|
| Architecture | 64-bit x86 (x86_64) |
| Firmware | **UEFI**. The image does not boot on legacy BIOS |
| Memory | 4 GB recommended. Smaller systems can run the basic firewall, but features such as the intrusion prevention system, application control and the metrics database need memory |
| Disk | 16 GB or more. 32 GB is a comfortable start; add more if you want to keep logs and backups locally |
| Network | At least two network interfaces, one for the WAN and one for the LAN |
| CPU | Two cores or more. More cores help when inspecting traffic at higher speeds |

## The disk image

The unit is distributed as a compressed raw disk image:

```
nexwall-<version>-x86-64-generic-squashfs-combined-efi.img.gz
```

Next to it you find a `sha256sums` file. Always verify the download before using it:

```bash
sha256sum -c sha256sums
```

Key facts about the image:

- It is a complete disk, with partitions for the boot loader, the system and your data. It is **not** an installer and
  it is not an ISO. You write it to a disk, or attach it to a virtual machine as a disk.
- It boots with UEFI only. In virtual machines, choose UEFI firmware and turn Secure Boot off, because the image is not
  signed for it.
- The system runs from a read-only base with your configuration layered on top. This is what allows a factory reset to
  return to the installed state.
- If you give the disk more space than the image needs, the data partition uses the extra space.

## Versions and channels

Images follow the pattern `YY.M.P`, optionally with a release candidate suffix such as `26.0.0-rc1`. Updates are
published on channels; the default channel is `stable`. See [System](../infrastructure/system.md) for how updates are
checked, scheduled and installed.

## Before you install

- Decide the address plan of your LAN. The default LAN is `192.168.1.0/24`; if that clashes with an existing network,
  you can change it after the first login.
- Collect what your provider gave you for the WAN: DHCP, or an address, a gateway and DNS servers, or PPPoE
  credentials.
- Have a computer and a cable ready to connect to the LAN interface.

Continue with [Install on a virtual machine or hardware](install-vm-and-hardware.md).
