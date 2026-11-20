---
title: 'KBA-0027: Instalar en Proxmox o KVM: ajustes recomendados y redes LAN/WAN'
sidebar_position: 37
description: 'Ajustes recomendados de la máquina virtual Proxmox/KVM para Nexwall Firewall, qué adaptador es la LAN y cuál la WAN, y qué hacer cuando 192.168.1.1 no responde.'
---

# KBA-0027: Instalar en Proxmox o KVM: ajustes recomendados y redes LAN/WAN

**Se aplica a.** Nexwall Firewall 26.2.2 y posteriores (la imagen arranca en SeaBIOS y en UEFI).

## Síntoma

Instaló el firewall en Proxmox u otro host KVM y `192.168.1.1` no responde, o la LAN y la WAN parecen estar en la misma red.

## Qué adaptador es cada uno

| En la VM | Dentro del firewall | Función | Dirección |
|---|---|---|---|
| Primer adaptador (`net0` en Proxmox) | `eth0`, parte de `br-lan` | **LAN** | `192.168.1.1/24`, fija. El firewall sirve DHCP aquí |
| Segundo adaptador (`net1`) | `eth1` | **WAN** | Por DHCP de su red o proveedor |

`192.168.1.1` existe dentro de la VM aunque no haya cable, pero solo es accesible desde un equipo o VM que esté en el mismo bridge que el **primer** adaptador.

## Ajustes recomendados de la VM en Proxmox

Use una VM paravirtualizada:

| Ajuste | Valor |
|---|---|
| Memoria | 4 GB o más (2 GB es el límite: ya usa swap) |
| Procesadores | 2 núcleos o más, 1 socket; tipo `x86-64-v2-AES` |
| BIOS | SeaBIOS (por defecto) u OVMF (UEFI) |
| Máquina | i440fx (por defecto) |
| Controlador SCSI | VirtIO SCSI single |
| Disco duro | Bus VirtIO Block, 32 GB, IO thread activado |
| CD/DVD | La ISO de Nexwall. Quítela después de la instalación |
| Red | Dos dispositivos VirtIO, cada uno en **su propio bridge** |

## El diseño de red que funciona

- **LAN (`net0`)**: un bridge sin puerto físico (por ejemplo `vmbr1`) o una VLAN, donde conecta el equipo o la VM con la que administra el firewall.
- **WAN (`net1`)**: el bridge que llega a su red o a internet (por ejemplo `vmbr0`).

Si `net0` y `net1` están en el mismo bridge, la LAN y la WAN comparten una sola red. La WAN recibe dirección del DHCP de esa red, la LAN `192.168.1.1/24` se superpone con lo que hay allí, y un equipo en ese bridge normalmente tiene una dirección en otro rango, por lo que no alcanza `192.168.1.1`.

## Compruebe desde la consola de la VM

Entre en la consola como `root` y ejecute:

```sh
ip -br link
ip -br addr
```

Debe ver `br-lan` con `192.168.1.1/24` y `eth1` (la WAN) con una dirección de su red. Si la WAN recibió una dirección del mismo rango que la LAN (`192.168.1.x`), cambie la dirección de la LAN (siguiente sección).

## Cambiar la dirección de la LAN

Use otro rango que no exista en su red, por ejemplo `192.168.45.1/24`. Haga el cambio permanente con:

```sh
uci set network.lan.ipaddr='192.168.45.1'
uci set network.lan.netmask='255.255.255.0'
uci commit network
/etc/init.d/network reload
ip -br addr show br-lan
```

:::note
El `ifconfig` del sistema no acepta la máscara en la forma `/24` (responde *bad address*). Use `ifconfig br-lan 192.168.45.1 netmask 255.255.255.0` para un cambio que dura solo hasta el próximo reinicio, o los comandos `uci` de arriba para uno permanente.
:::

El servidor DHCP de la LAN sigue la nueva dirección. Dé a su equipo una dirección del nuevo rango, o renueve su concesión DHCP, y abra `https://192.168.45.1`.

## Si aún no funciona

- Confirme que el equipo está en el bridge de `net0` y no en el de `net1`.
- Compruebe que la ISO se quitó y que la VM arranca desde el disco.
- Ejecute la [verificación de salud](kba-01-health-check.md) y guarde la salida.
- Abra un chamado en el portal de soporte con la salida de `ip -br addr` y `ip -br link`, e indique qué bridge usa cada adaptador.

## Vea también

- [Instalación en una máquina virtual](../installation/install-vm-and-hardware.md)
- [Requisitos e imágenes](../installation/requirements-and-images.md)
- [KBA-0002: La interfaz web no abre](kba-02-web-interface.md)
