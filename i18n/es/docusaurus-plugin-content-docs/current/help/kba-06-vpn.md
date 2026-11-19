---
title: 'KBA-06: La VPN no conecta'
sidebar_position: 16
description: Relacione el síntoma de la VPN con el ajuste que lo causa (IPsec, WireGuard, OpenVPN).
---

# KBA-06: La VPN no conecta

**Síntoma.** Un túnel no sube, o sube y no transporta nada.

Comprobaciones de solo lectura salvo que se indique. Los comandos se ejecutan como `root` por SSH, consola o terminal remota del controlador.

## Revise, en este orden

1. Sin handshake: el puerto está abierto en la WAN y la dirección o nombre público de la configuración es correcto.
2. Conecta pero no llega a nada: las rutas o redes en la definición del túnel y las reglas del firewall para la zona VPN.
3. Errores de certificado: el reloj en ambos lados y si el certificado venció o se renovó.
4. IPsec no sube: los identificadores no están invertidos en los dos extremos, la clave precompartida y los parámetros coinciden, y se reinició el servicio tras cambiar redes.
5. El peer WireGuard está mudo: el peer tiene la última configuración tras un cambio en el servidor.
6. Vea el estado en la unidad:

   ```sh
   swanctl --list-sas   # IPsec
   wg show               # WireGuard
   ```


## ¿No se resolvió?

Busque en los [Logs](../operation-analytics/logs.md) el nombre del servicio VPN. Comandos por función: [KBA-16](kba-16-services.md#8-estado-específico-de-cada-función).
