---
title: Requisitos y medio de instalación
sidebar_position: 1
description: Qué necesita para ejecutar una unidad y qué es la ISO del instalador.
---

# Requisitos y medio de instalación

## Requisitos de hardware y de máquina virtual

| Elemento | Requisito |
|---|---|
| Arquitectura | x86 de 64 bits (x86_64) |
| Firmware | **UEFI**. El sistema instalado no arranca en BIOS heredado |
| Memoria | Se recomiendan 4 GB. Los sistemas más pequeños pueden ejecutar el firewall básico, pero funciones como el sistema de prevención de intrusiones, el control de aplicaciones y la base de datos de métricas necesitan memoria |
| Disco | 16 GB o más. 32 GB es un buen punto de partida; agregue más si quiere guardar registros y copias de seguridad localmente |
| Red | Al menos dos interfaces de red, una para la WAN y otra para la LAN |
| CPU | Dos núcleos o más. Más núcleos ayudan al inspeccionar tráfico a mayores velocidades |

## La ISO del instalador

Nexwall se instala desde un solo archivo, la ISO del instalador:

```
NEXWALL-Installer-<versión>.iso
```

Junto a ella encontrará un archivo `.sha256` con su suma de comprobación. La misma ISO sirve en todas partes:

- en una **máquina virtual**, conéctela como unidad de CD/DVD;
- en un **servidor o un equipo dedicado**, escríbala en una memoria USB;
- en un servidor de rack con **consola remota** (iDRAC, iLO, IPMI), móntela como medio virtual.

La ISO contiene el sistema Nexwall y un pequeño instalador. El instalador comprueba la imagen del sistema antes de tocar
ningún disco, nunca ofrece como destino la memoria USB desde la que arrancó, le pide escribir `INSTALL` antes de borrar el
disco elegido y verifica lo que escribió. Habla inglés, español y portugués.

### Dónde descargarla

Cada versión tiene una página en las notas de la versión, [releasenotes.nexwall.com.br](https://releasenotes.nexwall.com.br/).
La sección **Downloads** al final de la página lista los archivos de esa versión con su tamaño y su suma SHA-256. La página de
descargas del sitio, [releasenotes.nexwall.com.br/download](https://releasenotes.nexwall.com.br/download/), lista todas las
versiones.

### Verifique la descarga

Compare siempre la suma del archivo con la de la tabla **Downloads** (o con la del archivo `.sha256`):

```bash
sha256sum -c NEXWALL-Installer-<versión>.iso.sha256
```

En Windows, en PowerShell: `Get-FileHash .\NEXWALL-Installer-<versión>.iso -Algorithm SHA256`. En macOS:
`shasum -a 256 NEXWALL-Installer-<versión>.iso`.

:::info La imagen de disco
La versión también publica la imagen de disco sin procesar (`.img.gz`) que lleva la ISO. Normalmente no la necesita. Si debe
escribir la imagen usted mismo, por ejemplo para clonar un disco en una fábrica o para importarla en una plataforma que no
puede arrancar una ISO, siga [Instalar desde la imagen de disco](../help/install-from-image.md).
:::

## Versiones y canales

Las versiones siguen el patrón `AA.M.P`, opcionalmente con un sufijo de candidata como `26.0.0-rc1`. Las actualizaciones se
publican en canales; el canal por defecto es `stable`. Consulte [Sistema](../infrastructure/system.md) para saber cómo se
comprueban, programan e instalan las actualizaciones.

## Antes de instalar

- Decida el plan de direcciones de su LAN. La LAN por defecto es `192.168.1.0/24`; si choca con una red existente, puede
  cambiarla después del primer acceso.
- Reúna lo que le dio su proveedor para la WAN: DHCP, o una dirección, una puerta de enlace y servidores DNS, o las
  credenciales PPPoE.
- Tenga a mano un equipo y un cable para conectar a la interfaz LAN.
- Tenga una memoria USB de 2 GB o más, o una forma de conectar la ISO a su máquina virtual.
- El instalador **borra el disco que usted elija**. Respalde antes lo que necesite de él.

Continúe con [Instalar con la ISO](install-vm-and-hardware.md).
