---
title: Bloqueo de IP y geolocalización (Threat Shield IP)
sidebar_position: 4
description: Bloquee direcciones hostiles, países, intentos de fuerza bruta e inundaciones.
---

# Bloqueo de IP y geolocalización (Threat Shield IP)

**Servicios de Seguridad > Bloqueo de IP y Geolocalización** bloquea nuevas conexiones desde y hacia direcciones que se
sabe que son hostiles. Actúa en la capa de red, antes de que una conexión llegue a ningún servicio, y también puede
bloquear países enteros.

## Estado y listas de bloqueo

Active el servicio en la pestaña **Configuración**. Después abra la página de listas de bloqueo.

Una **lista de bloqueo** es una lista de direcciones compilada por alguien y agrupada por finalidad. Cada una tiene un
nombre claro que indica quién la mantiene y a qué apunta. Elija las listas que habilitar y, para cada una, el sentido en
que se aplica (entrada, salida o ambos). Algunas listas necesitan una suscripción que incluya Threat Shield.

Las conexiones bloqueadas se registran con una etiqueta que incluye la dirección, la zona y la acción, para que pueda
buscarlas en [Registros](../operation-analytics/logs.md).

## Sus propias entradas

| Lista | Efecto |
|---|---|
| Lista de bloqueo local | Direcciones, redes, nombres de host o direcciones MAC que deben bloquearse siempre |
| Lista de permitidos | Entradas que deben permitirse siempre, aunque una lista de bloqueo las contenga |

Una entrada puede ser una dirección IPv4 o IPv6 (con CIDR opcional), un nombre de host completo o una dirección MAC con la
forma `xx:xx:xx:xx:xx:xx`.

:::warning Evite quedarse sin acceso
Añada a la lista de permitidos la dirección desde la que administra la unidad y las direcciones de su VPN antes de
habilitar listas de bloqueo agresivas.
:::

## Bloqueo por geolocalización

Puede bloquear el tráfico desde y hacia países o regiones. Selecciónelos en la configuración del bloqueo por
geolocalización. Úselo cuando un servicio no tiene usuarios legítimos en algunas partes del mundo.

## Protección contra fuerza bruta e inundaciones

El servicio también puede reaccionar ante abusos:

- La **protección contra fuerza bruta** veta un origen que falla repetidamente al iniciar sesión en un servicio. Usted elige
  cuántos fallos causan un veto y por cuánto tiempo.
- La **protección contra inundaciones** limita las inundaciones de ICMP, TCP SYN y UDP por segundo.

## Direcciones vetadas

La vista **Direcciones vetadas** lista las direcciones que están bloqueadas en este momento. Puede buscar una dirección
para ver qué lista la contiene y quitar un veto.

## Registro y panel

Las estadísticas de amenazas solo muestran lo que se registró. Habilite el registro en la configuración para alimentarlas.
Vea [Panel](../operation-analytics/dashboard.md).

## Páginas relacionadas

- [Filtrado de DNS](dns-filtering.md)
- [Prevención de intrusiones](ips.md)
