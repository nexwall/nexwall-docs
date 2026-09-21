---
title: Conceptos
sidebar_position: 4
description: El vocabulario que se usa en toda la documentación.
---

# Conceptos

## Zonas

Una **zona** es un grupo de interfaces de red que comparten un nivel de seguridad. Las reglas no hablan de interfaces,
hablan de zonas. La unidad comienza con estas:

| Zona | Significado |
|---|---|
| `lan` (verde) | Su red interna de confianza |
| `wan` (roja) | El exterior no confiable, normalmente internet |
| `guest` (azul) | Una red aislada para visitantes |
| `dmz` (naranja) | Una red para servidores que deben ser accesibles desde fuera |

Usted decide qué zonas pueden comunicarse con cuáles. Vea [Zonas y políticas](../policy/zones-policies.md).

## Reglas y su orden

Una **regla de firewall** indica qué hacer con el tráfico que cumple ciertas condiciones. Las reglas se leen de arriba
hacia abajo, y decide la primera que coincide. Hay tres listas: reglas para el tráfico que atraviesa el firewall
(reenvío), reglas para el tráfico dirigido al propio firewall (entrada) y reglas para el tráfico que inicia el propio
firewall (salida). Vea [Reglas de firewall](../policy/firewall-rules.md).

## NAT y redirección de puertos

El **NAT** reescribe direcciones a medida que el tráfico pasa. El caso habitual es el enmascaramiento: muchos hosts
privados comparten la dirección pública de la WAN. La **redirección de puertos** es lo contrario: envía las conexiones que
llegan a una dirección pública a un host interno. Vea [NAT y redirección de puertos](../policy/nat-port-forwarding.md).

## Objetos

Un **objeto** es una lista con nombre de direcciones o dominios que usted define una vez y reutiliza en reglas,
redirecciones de puertos y reglas de SD-WAN. Cuando la lista cambia, todo lo que la usa la sigue. Vea
[Objetos](../policy/objects.md).

## Interfaces y dispositivos

Un **dispositivo** es una tarjeta de red física o virtual, o una lógica, como un puente, un bond o una VLAN. Una
**interfaz** es la configuración asociada a un dispositivo: su dirección, su zona, su protocolo. Vea
[Interfaces y enrutamiento](../network/interfaces-routing.md).

## Control de aplicaciones

En lugar de puertos, el control de aplicaciones reconoce qué es una conexión: un servicio de streaming, una aplicación de
mensajería, un protocolo. Después puede bloquearla. Vea [Control de aplicaciones](../security-services/application-control.md).

## Threat Shield

Threat Shield es el nombre de la protección basada en listas de bloqueo. **Threat Shield DNS** bloquea dominios no
deseados en la resolución de nombres. **Threat Shield IP** bloquea conexiones desde y hacia direcciones hostiles. Vea
[Filtrado de DNS](../security-services/dns-filtering.md) y
[Bloqueo de IP y geolocalización](../security-services/ip-geo-blocking.md).

## Unidades y el controlador

Una **unidad** es un firewall. Un **controlador** es un servidor al que se conectan muchas unidades para que un
administrador pueda llegar a todas desde un solo lugar. Vea [Gestión central](../administration/central-management.md).

## Suscripción

Una **suscripción** activa funciones adicionales en una unidad, como un catálogo mayor de aplicaciones. Todo lo demás
funciona sin ella. Vea [Licencias y cuenta](../administration/licensing-account.md).
