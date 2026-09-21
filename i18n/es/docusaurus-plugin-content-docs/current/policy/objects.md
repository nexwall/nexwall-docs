---
title: Objetos
sidebar_position: 4
description: Grupos con nombre de direcciones y dominios que reutiliza en toda la configuración.
---

# Objetos

**Políticas > Objetos** le permite dar un nombre a un conjunto de direcciones o dominios y usar ese nombre siempre que la
interfaz los pida. Cuando cambia el objeto, todas las reglas que lo usan lo siguen automáticamente.

## Conjuntos de hosts

Un conjunto de hosts es un host o un grupo de hosts. Cada entrada puede ser:

- una dirección IP, una red en notación CIDR o un rango de IP;
- una reserva de DHCP;
- un registro DNS;
- un usuario de VPN;
- otro conjunto de hosts.

Todo conjunto de hosts tiene una **familia de IP**, IPv4 o IPv6, y todas las entradas deben corresponder a ella.

Los conjuntos de hosts se usan en reglas de firewall, en reglas de SD-WAN y en otras páginas que aceptan direcciones.

## Conjuntos de dominios

Un conjunto de dominios es un dominio o un grupo de dominios, por ejemplo los sitios de un servicio de vídeo. Úselo en una
regla para permitir o bloquear el tráfico hacia esos dominios. Los dominios se resuelven a direcciones, y usted elige si
resolverlos a direcciones IPv4 o IPv6, según lo que necesite la regla.

## Dónde se usa un objeto

La página muestra dónde se usa cada objeto. Un objeto en uso no se puede eliminar; quítelo primero de los lugares que lo
usan.

## Límites

- Los conjuntos de hosts que contienen rangos de IP, o que contienen otros objetos, no se pueden usar en redirecciones de
  puertos. La página indica qué redirección de puerto usa el conjunto.
- Los nombres deben estar formados por letras, números y separadores sencillos.

## Páginas relacionadas

- [Reglas de firewall](firewall-rules.md)
- [NAT y redirección de puertos](nat-port-forwarding.md)
