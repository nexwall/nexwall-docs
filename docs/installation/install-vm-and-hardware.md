---
title: Install on a virtual machine or hardware
sidebar_position: 2
description: Write the image to a disk, or run it in VMware, KVM or Proxmox.
---

# Install on a virtual machine or hardware

## On hardware

1. Uncompress the image and write it to the target disk. On Linux, replace `/dev/sdX` with the correct disk. Double
   check the name, because this erases the disk:

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

## In VMware Workstation, Fusion or ESXi

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
4. Add **two network adapters**: the first is the LAN, the second is the WAN. Connect each to the virtual network that
   matches its role.
5. Before the first boot, open the machine settings and set the firmware type to **UEFI**. Turn **Secure Boot** off.

On ESXi, upload the VMDK to a datastore and convert it with
`vmkfstools -i nexwall.vmdk nexwall-esx.vmdk -d thin`, then attach the converted disk to a VM with UEFI firmware.

:::tip If the network adapters are not detected
Change the adapter type to E1000E in the machine settings.
:::

## In KVM, libvirt or Proxmox

These platforms use raw or qcow2 disks directly:

1. Uncompress the image and, if you want more space, resize it: `qemu-img resize -f raw <image> 32G`.
2. Create a VM with UEFI (OVMF) firmware, two or more vCPUs and 4 GB of memory.
3. Import the image as the VM disk (`qm importdisk` on Proxmox, or point the libvirt disk to the file).
4. Add two network devices and set the boot order to the imported disk.

## After the first boot

The console shows a login prompt. The unit is reachable on `192.168.1.1` from the LAN. If the web interface does not
answer:

- Check that your computer is on the LAN side and has an address in `192.168.1.0/24`.
- Log in on the console as `root` and check the address with `ip -4 addr`.
- See [Troubleshooting](../help/troubleshooting.md).

Continue with the [Quick start](../getting-started/quick-start.md).
