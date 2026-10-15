---
title: Instalar desde la imagen de disco (img.gz)
description: Descargue la imagen de disco de una versión y escríbala en un disco o impórtela en una plataforma de virtualización, cuando no pueda usar la ISO del instalador.
---

# Instalar desde la imagen de disco (img.gz)

La forma recomendada de instalar Nexwall es la ISO del instalador, consulte [Instalar con la ISO](../installation/install-vm-and-hardware.md).
Use la imagen de disco solo cuando la ISO no se ajuste a su caso, por ejemplo cuando copia la misma imagen a muchos discos en
una fábrica, o cuando importa el sistema en una plataforma que solo puede usar archivos de disco.

La imagen es un **disco completo**: tabla de particiones, particiones y cargador de arranque. Solo arranca en modo **UEFI**; no
arranca en BIOS heredado.

## Dónde descargar la imagen

1. Abra las notas de la versión, [releasenotes.nexwall.com.br](https://releasenotes.nexwall.com.br/), y abra la página de la
   versión que quiere instalar.
2. Vaya a la sección **Downloads** al final de la página. Lista los archivos de la versión con su tamaño y su suma SHA-256.
3. Descargue el archivo llamado `nexwall-<versión>-x86-64-generic-squashfs-combined-efi.img.gz`. Pesa alrededor de 1 GB.

Verifique siempre la descarga con la suma de la tabla:

```bash
sha256sum nexwall-<versión>-x86-64-generic-squashfs-combined-efi.img.gz
```

En Windows, en PowerShell: `Get-FileHash .\nexwall-<versión>-x86-64-generic-squashfs-combined-efi.img.gz -Algorithm SHA256`.

## Copiar la imagen a un disco

1. Descomprima la imagen y escríbala en el disco de destino. En Linux, sustituya `/dev/sdX` por el disco correcto. Compruebe
   el nombre dos veces, porque esto borra el disco:

   ```bash
   gunzip -k nexwall-<versión>-x86-64-generic-squashfs-combined-efi.img.gz
   sudo dd if=nexwall-<versión>-x86-64-generic-squashfs-combined-efi.img of=/dev/sdX bs=4M status=progress conv=fsync
   ```

   En Windows, use una herramienta de escritura de discos como Rufus o balenaEtcher con la imagen descomprimida.

2. Si el disco es mayor que la imagen, el espacio libre se usa para datos.
3. Arranque la máquina en UEFI. En la configuración del firmware asegúrese de que el orden de arranque empieza por el disco
   nuevo y de que Secure Boot está desactivado.
4. Conecte el cable de la LAN a la interfaz que será la LAN y continúe con el [Inicio rápido](../getting-started/quick-start.md).

## Usar la imagen en VMware

VMware no puede arrancar una imagen sin procesar, así que conviértala primero a un disco VMDK. En cualquier máquina Linux con
`qemu-utils`:

```bash
gunzip -k nexwall-<versión>-x86-64-generic-squashfs-combined-efi.img.gz
qemu-img resize -f raw nexwall-<versión>-x86-64-generic-squashfs-combined-efi.img 32G
qemu-img convert -f raw -O vmdk -o subformat=monolithicSparse \
  nexwall-<versión>-x86-64-generic-squashfs-combined-efi.img nexwall.vmdk
```

El paso de ampliación da a la unidad un disco de 32 GB. Sin él, el disco tendría solo el tamaño de la imagen.

Cree la máquina virtual:

1. Elija una configuración personalizada, **Linux**, versión **Other Linux 6.x kernel 64-bit**.
2. Asígnele 2 CPU y 4 GB de memoria.
3. Cuando pida un disco, elija **Use an existing virtual disk** y seleccione `nexwall.vmdk`. Use un controlador SATA.
4. Agregue **dos adaptadores de red**: el primero es la LAN, el segundo la WAN.
5. Antes del primer arranque, fije el firmware en **UEFI** y desactive **Secure Boot**.

En ESXi, suba el VMDK a un datastore, conviértalo con `vmkfstools -i nexwall.vmdk nexwall-esx.vmdk -d thin` y conecte el disco
convertido a una VM con firmware UEFI.

## Usar la imagen en KVM, libvirt o Proxmox

Estas plataformas usan discos raw o qcow2 directamente:

1. Descomprima la imagen y, si quiere más espacio, amplíela: `qemu-img resize -f raw <imagen> 32G`.
2. Cree una VM con firmware UEFI (OVMF), dos o más vCPU y 4 GB de memoria.
3. Importe la imagen como disco de la VM (`qm importdisk` en Proxmox, o apunte el disco de libvirt al archivo).
4. Agregue dos dispositivos de red y fije el orden de arranque en el disco importado.

## Después del primer arranque

La unidad responde en `192.168.1.1` desde la LAN y la consola muestra el acceso. Si la interfaz web no responde, consulte
[Solución de problemas](troubleshooting.md).
