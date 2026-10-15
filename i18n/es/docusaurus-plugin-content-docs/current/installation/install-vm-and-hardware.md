---
title: Instalar con la ISO
sidebar_position: 2
description: Inicie el instalador desde la ISO en un servidor, un equipo dedicado o una máquina virtual e instale Nexwall en el disco interno.
---

# Instalar con la ISO

## Antes de empezar

- Descargue la ISO del instalador y verifique su suma de comprobación, consulte [Requisitos y medio de instalación](requirements-and-images.md).
- El instalador **borra el disco que usted elija**.
- La máquina debe arrancar en modo **UEFI**, con el **Secure Boot desactivado** en la configuración del firmware.

## Paso 1. Prepare el medio de instalación

**Máquina virtual.** Conecte la ISO a la unidad de CD/DVD de la máquina, consulte las secciones de cada plataforma más abajo.

**Servidor o equipo dedicado.** Escriba la ISO en una memoria USB de 2 GB o más. La memoria se borra.

- **Rufus** (Windows): seleccione la ISO y la memoria, y escríbala. Si Rufus pregunta cómo, elija **Escribir en modo imagen DD**
  (el modo ISO también funciona).
- **balenaEtcher** (Windows, macOS, Linux): **Flash from file**, seleccione la ISO y la memoria.
- **Linux**: sustituya `/dev/sdX` por la memoria USB. Compruebe el nombre dos veces, porque esto borra el disco:

  ```bash
  sudo dd if=NEXWALL-Installer-<versión>.iso of=/dev/sdX bs=4M status=progress conv=fsync
  ```

**Servidor de rack con consola remota.** Monte la ISO como medio virtual en la consola del servidor.

## Paso 2. Inicie el instalador

Arranque la máquina desde la memoria USB, o desde el CD/DVD virtual, en modo UEFI. Use el menú de arranque del firmware si no
arranca solo. Si la máquina tiene Secure Boot, desactívelo en la configuración del firmware.

## Paso 3. Siga el instalador

1. **Idioma.** Elija English, Español o Português. Todos los mensajes siguientes se muestran en ese idioma.
2. **Introducción.** El instalador indica que instala Nexwall `<versión>` en un disco interno y que se borrarán todos los
   datos del disco que seleccione. Elija **Sí** para continuar con la selección del disco.
3. **Comprobación.** *Comprobando la imagen de instalación...* El instalador verifica la imagen del sistema que lleva la ISO.
   Si informa de que la imagen está dañada o no pasó la verificación SHA-256, no instale: descargue la ISO de nuevo.
4. **Disco.** El instalador lista los discos que puede usar: internos, no extraíbles y suficientemente grandes, con tamaño,
   bus y modelo. **La memoria USB o el CD desde el que arrancó no aparece.** Elija el disco que se borrará.
5. **Confirmación.** El instalador muestra el disco, la versión y el tamaño y le pide **escribir `INSTALL`** en mayúsculas.
   Cualquier otra cosa cancela y no se escribe nada.
6. **Escritura.** *Escribiendo Nexwall en el disco. No apague el equipo ni quite la memoria USB. Esto tarda unos minutos.*
   Al terminar, el instalador lee el disco y compara su suma con la esperada (*Verificando lo escrito...*).
7. **Listo.** *Nexwall `<versión>` se escribió y verificó.* Quite la memoria USB o la ISO virtual y elija **Sí** para
   reiniciar. Si elige **No**, puede apagar, quitar el medio y arrancar desde el disco interno.

## Primer arranque

El primer arranque del nuevo sistema muestra el acceso de la consola. La unidad responde en `192.168.1.1` desde la LAN.
Continúe con el [Inicio rápido](../getting-started/quick-start.md), que abre el asistente de configuración.

Si la interfaz web no responde:

- Compruebe que su equipo está en el lado LAN y tiene una dirección en `192.168.1.0/24`.
- Acceda a la consola como `root` y compruebe la dirección con `ip -4 addr`.
- Consulte [Solución de problemas](../help/troubleshooting.md).

## En una máquina virtual

La ISO funciona igual en todas las plataformas. Cree la máquina con firmware UEFI, **2 CPU o más, 4 GB de memoria, un disco
virtual de 16 GB o más (32 GB es cómodo)** y **dos adaptadores de red**: el primero es la LAN, el segundo la WAN. Conecte la
ISO como CD/DVD, arranque desde ella y siga el Paso 3. Terminada la instalación, desconecte la ISO.

### VMware Workstation, Fusion o ESXi

1. Cree una máquina nueva con configuración personalizada, **Linux**, versión **Other Linux 6.x kernel 64-bit**.
2. Asígnele 2 CPU y 4 GB de memoria, un disco virtual nuevo de 32 GB y dos adaptadores de red conectados a las redes
   virtuales de la LAN y de la WAN.
3. En la configuración de la máquina fije el tipo de firmware en **UEFI** y desactive **Secure Boot**.
4. Para la unidad de CD/DVD elija **Use ISO image file** y seleccione la ISO de Nexwall. En ESXi, suba la ISO a un datastore y
   elija **Datastore ISO file**. Conecte la unidad al encender.
5. Encienda la máquina y siga el Paso 3.

:::tip Si no se detectan los adaptadores de red
Cambie el tipo de adaptador a E1000E en la configuración de la máquina.
:::

### KVM, libvirt y Proxmox

1. Cree una VM con firmware **UEFI (OVMF)**, dos o más vCPU, 4 GB de memoria, un disco de 16 GB o más y dos dispositivos de
   red. En Proxmox use **BIOS: OVMF (UEFI)** y agregue un disco EFI con **Pre-Enroll keys** desactivado, para que Secure Boot
   quede desactivado.
2. Conecte la ISO como unidad de CD/DVD y póngala primera en el orden de arranque.
3. Inicie la VM y siga el Paso 3. Al terminar, quite la ISO de la unidad.

## Si el instalador informa de un problema

| Qué ve | Qué hacer |
|---|---|
| La máquina no arranca desde la memoria USB | Arránquela en modo UEFI desde el menú de arranque del firmware, desactive Secure Boot y escriba la memoria de nuevo en modo imagen DD |
| *Installer payload is incomplete*, *La imagen incluida está dañada* o *no pasó la verificación SHA-256* | La ISO está dañada o incompleta. Descárguela de nuevo y verifique su suma |
| *No se encontró ningún disco interno válido* | El disco debe estar detectado por la máquina, no ser extraíble y tener al menos el tamaño que indica el mensaje. En una VM agregue un disco virtual de 16 GB o más. En hardware revise el modo de almacenamiento del firmware (use AHCI, no un modo RAID que oculte el disco) |
| *No se pudo identificar la memoria USB de instalación, por lo que NO se excluye de la lista* | Lea con cuidado los nombres y tamaños de los discos antes de elegir. El disco que elija se borra |
| *La comprobación de seguridad bloqueó la memoria USB de instalación como destino* | Eligió el medio desde el que arrancó el instalador. Elija el disco interno |
| *Falló la escritura de la imagen* | Inténtelo de nuevo. Si se repite, el disco puede estar defectuoso: pruebe con otro. El mensaje indica el archivo de registro |
| *Falló la verificación de lectura. No use este disco.* | Los datos del disco no son los escritos. Inténtelo de nuevo y luego con otro disco |
