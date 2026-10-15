---
title: Install from the disk image (img.gz)
description: Download the disk image of a release and write it to a disk or import it into a virtualization platform, when you cannot use the ISO installer.
---

# Install from the disk image (img.gz)

The recommended way to install Nexwall is the installer ISO, see [Install with the ISO](../installation/install-vm-and-hardware.md).
Use the disk image only when the ISO does not fit your case, for example when you copy the same image to many disks in
a factory, or when you import the system into a platform that can only use disk files.

The image is a **complete disk**: partition table, partitions and boot loader. It starts in **UEFI** mode only; it does not
boot on legacy BIOS.

## Where to download the image

1. Open the release notes, [releasenotes.nexwall.com.br](https://releasenotes.nexwall.com.br/), and open the page of the
   version you want to install.
2. Go to the **Downloads** section at the end of the page. It lists the files of the version with their size and SHA-256
   checksum.
3. Download the file named `nexwall-<version>-x86-64-generic-squashfs-combined-efi.img.gz`. It is about 1 GB.

Always verify the download against the checksum of the table:

```bash
sha256sum nexwall-<version>-x86-64-generic-squashfs-combined-efi.img.gz
```

On Windows, in PowerShell: `Get-FileHash .\nexwall-<version>-x86-64-generic-squashfs-combined-efi.img.gz -Algorithm SHA256`.

## Copy the image to a disk

1. Uncompress the image and write it to the target disk. On Linux, replace `/dev/sdX` with the correct disk. Double check
   the name, because this erases the disk:

   ```bash
   gunzip -k nexwall-<version>-x86-64-generic-squashfs-combined-efi.img.gz
   sudo dd if=nexwall-<version>-x86-64-generic-squashfs-combined-efi.img of=/dev/sdX bs=4M status=progress conv=fsync
   ```

   On Windows, use a disk writing tool such as Rufus or balenaEtcher with the uncompressed image.

2. If the disk is larger than the image, the free space is used for data.
3. Boot the machine with UEFI. In the firmware setup make sure the boot order starts with the new disk and that Secure
   Boot is disabled.
4. Connect the LAN cable to the interface that will be the LAN and continue with the
   [Quick start](../getting-started/quick-start.md).

## Use the image in VMware

VMware cannot boot a raw image directly, so convert it to a VMDK disk first. On any Linux machine with `qemu-utils`:

```bash
gunzip -k nexwall-<version>-x86-64-generic-squashfs-combined-efi.img.gz
qemu-img resize -f raw nexwall-<version>-x86-64-generic-squashfs-combined-efi.img 32G
qemu-img convert -f raw -O vmdk -o subformat=monolithicSparse \
  nexwall-<version>-x86-64-generic-squashfs-combined-efi.img nexwall.vmdk
```

The resize step gives the unit a 32 GB disk. Without it the disk would be only as large as the image.

Create the virtual machine:

1. Choose a custom configuration, **Linux**, version **Other Linux 6.x kernel 64-bit**.
2. Give it 2 CPUs and 4 GB of memory.
3. When asked for a disk, choose **Use an existing virtual disk** and select `nexwall.vmdk`. Use a SATA controller.
4. Add **two network adapters**: the first is the LAN, the second is the WAN.
5. Before the first boot, set the firmware type to **UEFI** and turn **Secure Boot** off.

On ESXi, upload the VMDK to a datastore, convert it with `vmkfstools -i nexwall.vmdk nexwall-esx.vmdk -d thin`, and
attach the converted disk to a VM with UEFI firmware.

## Use the image in KVM, libvirt or Proxmox

These platforms use raw or qcow2 disks directly:

1. Uncompress the image and, if you want more space, resize it: `qemu-img resize -f raw <image> 32G`.
2. Create a VM with UEFI (OVMF) firmware, two or more vCPUs and 4 GB of memory.
3. Import the image as the VM disk (`qm importdisk` on Proxmox, or point the libvirt disk to the file).
4. Add two network devices and set the boot order to the imported disk.

## After the first boot

The unit is reachable on `192.168.1.1` from the LAN and the console shows a login prompt. If the web interface does not
answer, see [Troubleshooting](troubleshooting.md).
