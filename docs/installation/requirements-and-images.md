---
title: Requirements and installation media
sidebar_position: 1
description: What you need to run a unit, and what the installer ISO is.
---

# Requirements and installation media

## Hardware and virtual machine requirements

| Item | Requirement |
|---|---|
| Architecture | 64-bit x86 (x86_64) |
| Firmware | **UEFI**. The installed system does not boot on legacy BIOS |
| Memory | 4 GB recommended. Smaller systems can run the basic firewall, but features such as the intrusion prevention system, application control and the metrics database need memory |
| Disk | 16 GB or more. 32 GB is a comfortable start; add more if you want to keep logs and backups locally |
| Network | At least two network interfaces, one for the WAN and one for the LAN |
| CPU | Two cores or more. More cores help when inspecting traffic at higher speeds |

## The installer ISO

Nexwall is installed from a single file, the installer ISO:

```
NEXWALL-Installer-<version>.iso
```

Next to it you find a `.sha256` file with its checksum. The same ISO works everywhere:

- on a **virtual machine**, attach it as a CD/DVD drive;
- on a **server or an appliance**, write it to a USB stick;
- on a rack server with a **remote console** (iDRAC, iLO, IPMI), mount it as virtual media.

The ISO contains the Nexwall system and a small installer. The installer checks the system image before it touches any
disk, never offers the USB stick it started from as a destination, asks you to type `INSTALL` before it erases the
chosen disk, and verifies what it wrote. It speaks English, Spanish and Portuguese.

### Where to download it

Every release has a page in the release notes, [releasenotes.nexwall.com.br](https://releasenotes.nexwall.com.br/). The
**Downloads** section at the end of the page lists the files of that version with their size and SHA-256 checksum. The
download page of the site, [releasenotes.nexwall.com.br/download](https://releasenotes.nexwall.com.br/download/), lists
every version.

### Verify the download

Always compare the checksum of the file with the one in the **Downloads** table (or in the `.sha256` file):

```bash
sha256sum -c NEXWALL-Installer-<version>.iso.sha256
```

On Windows, in PowerShell: `Get-FileHash .\NEXWALL-Installer-<version>.iso -Algorithm SHA256`. On macOS:
`shasum -a 256 NEXWALL-Installer-<version>.iso`.

:::info The disk image
The release also publishes the raw disk image (`.img.gz`) that the ISO carries. You normally do not need it. If you have
to write the image yourself, for example to clone a disk in a factory or to import it in a platform that cannot boot an
ISO, follow [Install from the disk image](../help/install-from-image.md).
:::

## Versions and channels

Releases follow the pattern `YY.M.P`, optionally with a release candidate suffix such as `26.0.0-rc1`. Updates are
published on channels; the default channel is `stable`. See [System](../infrastructure/system.md) for how updates are
checked, scheduled and installed.

## Before you install

- Decide the address plan of your LAN. The default LAN is `192.168.1.0/24`; if that clashes with an existing network,
  you can change it after the first login.
- Collect what your provider gave you for the WAN: DHCP, or an address, a gateway and DNS servers, or PPPoE
  credentials.
- Have a computer and a cable ready to connect to the LAN interface.
- Have a USB stick of 2 GB or more, or a way to attach the ISO to your virtual machine.
- The installer **erases the disk you choose**. Back up anything you need from it first.

Continue with [Install with the ISO](install-vm-and-hardware.md).
