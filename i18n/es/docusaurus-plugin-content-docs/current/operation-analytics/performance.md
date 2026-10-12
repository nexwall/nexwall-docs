---
title: Rendimiento
sidebar_position: 5
description: Gráficos históricos, alertas y monitorización de latencia.
---

# Rendimiento

**Operación y Analítica > Rendimiento** muestra cómo se comporta la unidad a lo largo del tiempo. Tiene tres pestañas.

## Gráficos

Gráficos históricos de métricas del sistema: uso del procesador y carga, memoria, uso del disco y entrada y salida, procesos en
ejecución, la tabla de conexiones, paquetes de red, el tráfico de cada interfaz y, para los equipos que monitoriza, la
latencia y la pérdida de paquetes. Las métricas las recoge un agente y se guardan en una base de datos de series temporales en la unidad.

Elija la **ventana de tiempo** con los botones de arriba: 5 minutos, 30 minutos (la predeterminada), 1 hora, 12 horas, 24 horas, 7
días o 30 días. Cada gráfico es una tarjeta con el valor actual, el máximo y el promedio de cada serie sobre el gráfico, y el gráfico
sigue siendo un gráfico: las líneas se suavizan sin recortar los picos y, en las ventanas largas, cada punto es el valor más alto
de su intervalo (el más bajo para la memoria libre), así que un pico corto de procesador, memoria, carga o pérdida de paquetes sigue
visible. El tráfico, los paquetes y la entrada y salida de disco son promedios de cada intervalo.

El historial se guarda 7 días, o un año cuando el firewall tiene un disco de datos; sin disco de datos la ventana de 30 días
muestra los últimos 7 días.

Si los gráficos dicen que la base de datos no es accesible, compruebe que el servicio está en ejecución, vea
[Solución de problemas](../help/troubleshooting.md).

## Alertas

Las alertas son condiciones evaluadas de forma continua sobre las métricas, por ejemplo un disco casi lleno. La pestaña
lista las alertas **pendientes** (la condición acaba de cumplirse) y **activas** (se mantuvo el tiempo suficiente). El
número de alertas activas aparece en el título de la pestaña y en el [Panel](dashboard.md).

## Ajustes

Aquí elige a qué equipos hace ping la unidad para medir la calidad de la red. Añada las direcciones o nombres de los
equipos que le interesan. Añadir la dirección del otro extremo de un túnel VPN es una buena forma de vigilar la calidad del túnel.

Las mediciones aparecen como dos gráficos por equipo: **latencia** (tiempo de ida y vuelta, con mínimo, máximo y
promedio) y **pérdida de paquetes** (la parte de los ping que no recibieron respuesta; cero es un enlace sano). Los mismos gráficos están en la
pestaña **Enlaces WAN** de la [Monitorización](monitor-connections.md).

## Páginas relacionadas

- [SD-WAN](../network/sd-wan.md) usa sus propios equipos de seguimiento para decidir cuándo un enlace WAN está caído.
- [Gestión central](../administration/central-management.md) guarda un historial más largo de las métricas.
