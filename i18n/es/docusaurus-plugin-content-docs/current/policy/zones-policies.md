---
title: Zonas y políticas
sidebar_position: 3
description: Agrupe interfaces en zonas y defina qué se permite entre ellas de forma predeterminada.
---

# Zonas y políticas

Las zonas son la base del conjunto de reglas. **Políticas > Zonas y Políticas** muestra todas las zonas, las interfaces
que contienen y su comportamiento predeterminado.

## Zonas predeterminadas

| Zona | Función |
|---|---|
| `lan` | Red interna de confianza |
| `wan` | Exterior no confiable |
| `guest` | Red aislada de visitantes |
| `dmz` | Servidores expuestos al exterior |

Puede crear sus propias zonas, por ejemplo una para una red de cámaras.

## La política de una zona

La **política** de una zona es lo que ocurre con el tráfico cuando ninguna regla coincide. Para cada zona establece qué se
permite:

- el tráfico **de la zona al propio firewall** (entrada);
- el tráfico **de la zona a otras zonas** (reenvío);
- el tráfico **dentro de la zona**, entre sus propias interfaces.

Una política restrictiva con reglas de permiso explícitas es más fácil de auditar que una política permisiva con muchos
bloqueos.

## Crear una zona

1. Elija **Añadir zona**.
2. Introduzca un nombre y elija un tipo. Los tipos corresponden a las zonas predeterminadas: LAN, WAN, invitados, DMZ.
3. Seleccione las interfaces y redes que pertenecen a la zona.
4. Elija si crear **reglas predefinidas**. El sistema entonces añade reglas que permiten el acceso a los servicios
   esenciales, por ejemplo DHCP y DNS para una LAN. Puede verlas y ajustarlas después en
   **Políticas > Reglas de Firewall > Reglas de entrada**.
5. Guarde y **Aplicar cambios**.

## Registro

Cada zona tiene una opción de registro que anota los paquetes que bloquea la política de la zona. Las estadísticas de
amenazas del panel y de la Monitorización dependen de que el registro esté habilitado en al menos una cadena. El registro
en una zona con mucha actividad puede producir muchos mensajes, así que actívelo donde lo necesite.

## Páginas relacionadas

- [Reglas de firewall](firewall-rules.md)
- [Interfaces y enrutamiento](../network/interfaces-routing.md)
