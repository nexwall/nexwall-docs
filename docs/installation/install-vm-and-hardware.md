---
title: Install with the ISO
sidebar_position: 2
description: Start the installer from the ISO on a server, an appliance or a virtual machine and install Nexwall on the internal disk.
---

# Install with the ISO

## Before you start

- Download the installer ISO and verify its checksum, see [Requirements and installation media](requirements-and-images.md).
- The installer **erases the disk you choose**.
- The machine must start in **UEFI** mode, with **Secure Boot turned off** in the firmware setup.

## Step 1. Prepare the installation media

**Virtual machine.** Attach the ISO to the CD/DVD drive of the machine, see the platform sections below.

**Server or appliance.** Write the ISO to a USB stick of 2 GB or more. The stick is erased.

- **Rufus** (Windows): select the ISO and the stick, and write it. If Rufus asks how, choose **Write in DD Image mode**
  (ISO mode also works).
- **balenaEtcher** (Windows, macOS, Linux): **Flash from file**, select the ISO and the stick.
- **Linux**: replace `/dev/sdX` with the USB stick. Check the name twice, because this erases the disk:

  ```bash
  sudo dd if=NEXWALL-Installer-<version>.iso of=/dev/sdX bs=4M status=progress conv=fsync
  ```

**Rack server with a remote console.** Mount the ISO as virtual media in the console of the server.

## Step 2. Start the installer

Boot the machine from the USB stick, or from the virtual CD/DVD, in UEFI mode. Use the boot menu of the firmware if it does
not start by itself. If the machine has Secure Boot, turn it off in the firmware setup.

## Step 3. Follow the installer

1. **Language.** Choose English, Español or Português. Every message after this one is shown in that language.
2. **Introduction.** The installer says that it installs Nexwall `<version>` on an internal disk and that all data on the
   disk you select will be erased. Choose **Yes** to continue to the disk selection.
3. **Check.** *Checking the installation image...* The installer verifies the system image that the ISO carries. If it
   reports that the image is damaged or failed the SHA-256 verification, do not install: download the ISO again.
4. **Disk.** The installer lists the disks it can use: internal, not removable and large enough, with size, bus and model.
   **The USB stick or CD it started from is not listed.** Choose the disk to erase.
5. **Confirmation.** The installer shows the disk, the version and the size and asks you to **type `INSTALL`** in capital
   letters. Anything else cancels and nothing is written.
6. **Writing.** *Writing Nexwall to the disk. Do not power off or remove the USB. This takes a few minutes.* When the
   writing ends, the installer reads the disk back and compares its checksum with the expected one (*Verifying what was
   written...*).
7. **Done.** *Nexwall `<version>` was written and verified.* Remove the USB stick or the virtual ISO, then choose **Yes**
   to restart. If you choose **No**, you can power off, remove the media and start from the internal disk.

## First start

The first start of the new system opens the console login prompt. The unit is reachable on `192.168.1.1` from the LAN.
Continue with the [Quick start](../getting-started/quick-start.md), which opens the setup wizard.

If the web interface does not answer:

- Check that your computer is on the LAN side and has an address in `192.168.1.0/24`.
- Log in on the console as `root` and check the address with `ip -4 addr`.
- See [Troubleshooting](../help/troubleshooting.md).

## On a virtual machine

The ISO works the same on every platform. Create the machine with UEFI firmware, **2 CPUs or more, 4 GB of memory,
a virtual disk of 16 GB or more (32 GB is comfortable)** and **two network adapters**: the first is the LAN, the second is
the WAN. Attach the ISO as the CD/DVD, boot it, and follow Step 3. After the installation, detach the ISO.

### VMware Workstation, Fusion or ESXi

1. Create a new machine with a custom configuration, **Linux**, version **Other Linux 6.x kernel 64-bit**.
2. Give it 2 CPUs and 4 GB of memory, a new virtual disk of 32 GB and two network adapters connected to the virtual
   networks of the LAN and the WAN.
3. In the machine settings set the firmware type to **UEFI** and turn **Secure Boot** off.
4. For the CD/DVD drive choose **Use ISO image file** and select the Nexwall ISO. On ESXi, upload the ISO to a datastore and
   choose **Datastore ISO file**. Connect the drive at power on.
5. Power on the machine and follow Step 3.

:::tip If the network adapters are not detected
Change the adapter type to E1000E in the machine settings.
:::

### KVM, libvirt and Proxmox

1. Create a VM with **UEFI (OVMF)** firmware, two or more vCPUs, 4 GB of memory, a disk of 16 GB or more and two network
   devices. On Proxmox use **BIOS: OVMF (UEFI)** and add an EFI disk with **Pre-Enroll keys** turned off, so that Secure
   Boot is off.
2. Attach the ISO as the CD/DVD drive and put it first in the boot order.
3. Start the VM and follow Step 3. When it finishes, remove the ISO from the drive.

## If the installer reports a problem

| What you see | What to do |
|---|---|
| The machine does not start from the USB stick | Start it in UEFI mode from the firmware boot menu, turn Secure Boot off, and write the stick again in DD Image mode |
| *Installer payload is incomplete*, *The embedded image is damaged* or *failed SHA-256 verification* | The ISO is damaged or incomplete. Download it again and verify its checksum |
| *No eligible internal disk was found* | The disk must be detected by the machine, be non-removable and at least as large as the message says. On a VM add a virtual disk of 16 GB or more. On hardware check the storage mode of the firmware (use AHCI, not a RAID mode that hides the disk) |
| *The installation USB could not be identified, so it is NOT excluded from the list* | Read the names and sizes of the disks carefully before you choose. The disk you choose is erased |
| *Safety check blocked the installation USB as a target* | You chose the medium the installer started from. Choose the internal disk |
| *Writing the image failed* | Try again. If it repeats, the disk may be faulty: try another disk. The message names the log file |
| *Read-back verification failed. Do not deploy this disk.* | The data on the disk is not what was written. Try again, then another disk |
