---
title: Requisitos e imágenes
sidebar_position: 1
description: Lo que necesita para ejecutar una unidad y qué es la imagen de disco.
---

# Requisitos e imágenes

## Requisitos de hardware y de máquina virtual

| Elemento | Requisito |
|---|---|
| Arquitectura | x86 de 64 bits (x86_64) |
| Firmware | **UEFI**. La imagen no arranca en BIOS heredado |
| Memoria | Se recomiendan 4 GB. Los sistemas más pequeños pueden ejecutar el firewall básico, pero funciones como el sistema de prevención de intrusiones, el control de aplicaciones y la base de datos de métricas necesitan memoria |
| Disco | 16 GB o más. 32 GB es un buen comienzo; añada más si quiere conservar registros y copias de seguridad localmente |
| Red | Al menos dos interfaces de red, una para la WAN y otra para la LAN |
| CPU | Dos núcleos o más. Más núcleos ayudan al inspeccionar tráfico a mayores velocidades |

## La imagen de disco

La unidad se distribuye como una imagen de disco sin formato comprimida:

```
nexwall-<versión>-x86-64-generic-squashfs-combined-efi.img.gz
```

Junto a ella encuentra un archivo `sha256sums`. Verifique siempre la descarga antes de usarla:

```bash
sha256sum -c sha256sums
```

Datos clave sobre la imagen:

- Es un disco completo, con particiones para el cargador de arranque, el sistema y sus datos. **No** es un instalador y
  no es una ISO. Se escribe en un disco, o se conecta a una máquina virtual como disco.
- Arranca solo con UEFI. En máquinas virtuales, elija el firmware UEFI y desactive Secure Boot, porque la imagen no está
  firmada para él.
- El sistema se ejecuta desde una base de solo lectura con su configuración superpuesta. Esto permite que un
  restablecimiento de fábrica vuelva al estado instalado.
- Si da al disco más espacio del que necesita la imagen, la partición de datos usa el espacio adicional.

## Versiones y canales

Las imágenes siguen el patrón `AA.M.P`, opcionalmente con un sufijo de release candidate como `26.0.0-rc1`. Las
actualizaciones se publican en canales; el canal predeterminado es `stable`. Vea [Sistema](../infrastructure/system.md)
para saber cómo se comprueban, programan e instalan las actualizaciones.

## Antes de instalar

- Decida el plan de direcciones de su LAN. La LAN predeterminada es `192.168.1.0/24`; si choca con una red existente,
  puede cambiarla después del primer inicio de sesión.
- Reúna lo que le dio su proveedor para la WAN: DHCP, o una dirección, una puerta de enlace y servidores DNS, o
  credenciales PPPoE.
- Tenga listos un equipo y un cable para conectar a la interfaz LAN.

Continúe con [Instalar en una máquina virtual o en hardware](install-vm-and-hardware.md).
