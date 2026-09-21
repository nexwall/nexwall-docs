---
title: Registros
sidebar_position: 5
description: Lectura y búsqueda en los registros del sistema.
---

# Registros

**Operación y Analítica > Registros** muestra el registro del sistema de la unidad: mensajes del firewall, de los
servicios, de la red y del kernel.

## Lectura del registro

- Elija cuántas líneas cargar.
- Active **ajustar líneas** para ver mensajes largos sin desplazarse hacia los lados.
- Use el cuadro de búsqueda para conservar solo las líneas que coinciden. La búsqueda acepta expresiones regulares.
- Active **seguir** para ver los mensajes nuevos a medida que llegan.

## Búsquedas útiles

| Objetivo | Busque |
|---|---|
| Paquetes bloqueados | el nombre de la zona, o el prefijo de registro que usa la regla |
| Problemas de VPN | `openvpn`, `charon` o `wireguard` |
| Actividad de DHCP | `dnsmasq-dhcp` |
| Bloqueos de Threat Shield IP | `banIP` |
| Problemas de actualización o de registro | el nombre del servicio, por ejemplo `ns-plug` |

## Conservar los registros entre reinicios

De forma predeterminada el registro reside en memoria y se pierde al reiniciar. Para conservar una copia, conecte un disco
o una unidad USB y configúrelo en **Infraestructura > Sistema**, en la pestaña Almacenamiento. La unidad entonces también
escribe los registros en ese dispositivo. Vea [Sistema](../infrastructure/system.md).

Cuando una unidad está conectada a un controlador, los registros también se transmiten a él, vea
[Gestión central](../administration/central-management.md).

## Desde la línea de comandos

El mismo registro está disponible por SSH con `logread`. Vea [Línea de comandos y preguntas frecuentes](../help/command-line-and-faq.md).
