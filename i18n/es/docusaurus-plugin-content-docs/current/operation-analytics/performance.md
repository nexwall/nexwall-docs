---
title: Rendimiento
sidebar_position: 4
description: Gráficos históricos, alertas y monitorización de latencia.
---

# Rendimiento

**Operación y Analítica > Rendimiento** muestra cómo se comporta la unidad a lo largo del tiempo. Tiene tres pestañas.

## Gráficos

Gráficos históricos de métricas del sistema: uso del procesador y carga, memoria, uso y entrada y salida del disco,
procesos en ejecución, la tabla de conexiones, paquetes de red y el tráfico de cada interfaz. Las métricas las recoge un
agente y se almacenan en una base de datos de series temporales en la unidad. Elija un intervalo de tiempo para cambiar la
ventana que muestran todos los gráficos.

Si los gráficos indican que la base de datos no es accesible, compruebe que el servicio está en ejecución, vea
[Solución de problemas](../help/troubleshooting.md).

## Alertas

Las alertas son condiciones que se evalúan continuamente sobre las métricas, por ejemplo un disco casi lleno. La pestaña
lista las alertas **pendientes** (la condición acaba de cumplirse) y **activas** (se mantuvo el tiempo suficiente). El
número de alertas activas se muestra en el título de la pestaña.

## Ajustes

Aquí elige a qué hosts hace ping la unidad para medir la calidad de la red. Añada las direcciones o nombres de los hosts
que le interesan. Añadir la dirección del otro extremo de un túnel VPN es una buena forma de vigilar la calidad del
túnel.

Las mediciones aparecen como dos gráficos en la pestaña Gráficos: **latencia** (tiempo de ida y vuelta) y **entrega de
paquetes** (la proporción de pings que se respondieron).

## Páginas relacionadas

- [SD-WAN](../network/sd-wan.md) usa sus propios hosts de seguimiento para decidir cuándo un enlace WAN está caído.
- La [Gestión central](../administration/central-management.md) conserva un historial más largo de las métricas.
