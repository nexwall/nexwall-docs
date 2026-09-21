---
title: Instalar en una máquina virtual o en hardware
sidebar_position: 2
description: Escriba la imagen en un disco, o ejecútela en VMware, KVM o Proxmox.
---

# Instalar en una máquina virtual o en hardware

## En hardware

1. Descomprima la imagen y escríbala en el disco de destino. En Linux, sustituya `/dev/sdX` por el disco correcto.
   Compruebe el nombre dos veces, porque esto borra el disco:

   ```bash
   gunzip -k nexwall-<versión>-x86-64-generic-squashfs-combined-efi.img.gz
   sudo dd if=nexwall-<versión>-x86-64-generic-squashfs-combined-efi.img of=/dev/sdX bs=4M status=progress conv=fsync
   ```

   En Windows, use una herramienta de escritura de discos como Rufus o balenaEtcher con la imagen descomprimida.

2. Si el disco es mayor que la imagen, el espacio libre se usa para datos.
3. Arranque la máquina con UEFI. En la configuración del firmware, asegúrese de que el orden de arranque comienza por el
   disco nuevo y de que Secure Boot está desactivado.
4. Conecte el cable de la LAN a la interfaz que será la LAN y continúe con el
   [Inicio rápido](../getting-started/quick-start.md).

## En VMware Workstation, Fusion o ESXi

VMware no puede arrancar una imagen sin formato directamente, así que conviértala primero a un disco VMDK. En cualquier
equipo Linux con `qemu-utils`:

```bash
gunzip -k nexwall-<versión>-x86-64-generic-squashfs-combined-efi.img.gz
qemu-img resize -f raw nexwall-<versión>-x86-64-generic-squashfs-combined-efi.img 32G
qemu-img convert -f raw -O vmdk -o subformat=monolithicSparse \
  nexwall-<versión>-x86-64-generic-squashfs-combined-efi.img nexwall.vmdk
```

El paso de redimensionado da a la unidad un disco de 32 GB. Sin él, el disco tendría solo el tamaño de la imagen.

Cree la máquina virtual:

1. Elija una configuración personalizada, **Linux**, versión **Other Linux 6.x kernel 64-bit**.
2. Asígnele 2 CPU y 4 GB de memoria.
3. Cuando pida un disco, elija **Use an existing virtual disk** y seleccione `nexwall.vmdk`. Use un controlador SATA.
4. Añada **dos adaptadores de red**: el primero es la LAN, el segundo es la WAN. Conecte cada uno a la red virtual que
   corresponda a su función.
5. Antes del primer arranque, abra la configuración de la máquina y establezca el tipo de firmware en **UEFI**. Desactive
   **Secure Boot**.

En ESXi, suba el VMDK a un datastore y conviértalo con `vmkfstools -i nexwall.vmdk nexwall-esx.vmdk -d thin`; después
conecte el disco convertido a una VM con firmware UEFI.

:::tip Si no se detectan los adaptadores de red
Cambie el tipo de adaptador a E1000E en la configuración de la máquina.
:::

## En KVM, libvirt o Proxmox

Estas plataformas usan discos raw o qcow2 directamente:

1. Descomprima la imagen y, si quiere más espacio, redimensiónela: `qemu-img resize -f raw <imagen> 32G`.
2. Cree una VM con firmware UEFI (OVMF), dos o más vCPU y 4 GB de memoria.
3. Importe la imagen como disco de la VM (`qm importdisk` en Proxmox, o apunte el disco de libvirt al archivo).
4. Añada dos dispositivos de red y establezca el orden de arranque en el disco importado.

## Después del primer arranque

La consola muestra un indicador de inicio de sesión. La unidad es accesible en `192.168.1.1` desde la LAN. Si la interfaz
web no responde:

- Compruebe que su equipo está en el lado de la LAN y tiene una dirección en `192.168.1.0/24`.
- Inicie sesión en la consola como `root` y compruebe la dirección con `ip -4 addr`.
- Vea [Solución de problemas](../help/troubleshooting.md).

Continúe con el [Inicio rápido](../getting-started/quick-start.md).
