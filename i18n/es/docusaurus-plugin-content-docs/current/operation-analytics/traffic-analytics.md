---
title: Analítica de Tráfico
sidebar_position: 3
description: "A dónde va el tráfico del firewall: cuánto, cuándo y qué dispositivos, aplicaciones, sitios y protocolos."
---

# Analítica de Tráfico

**Operación y Analítica > Analítica de Tráfico** muestra a dónde va el tráfico. Se construye con los informes horarios de tráfico del
motor de clasificación local y funciona en el firewall: nada sale de la unidad. El contenido de las conexiones nunca se
registra, solo qué aplicaciones y protocolos se vieron y cuántos bytes transportaron.

Elija **Hoy**, **7 días** o **30 días** arriba a la derecha. Los informes se conservan 35 días.

## Qué muestra la página

- **Cuatro cifras**: el tráfico total, la hora de más tráfico, la aplicación principal y el dispositivo principal.
- **Tráfico por hora**: una barra por hora del día. Para 7 o 30 días se suman las horas de todos los días. Hoy se
  actualiza cada minuto.
- **Listas ordenadas** de los equipos locales (dispositivos), las aplicaciones, los equipos remotos y los protocolos, cada fila con su
  volumen y su parte del total.
- **Categorías web**: el tráfico por categoría de sitio.

El propio firewall no se cuenta como dispositivo ni como equipo remoto. Con el proxy web activado, todo lo que el proxy descarga
para sus dispositivos sale desde la dirección del firewall, y contarlo mostraría al firewall como el dispositivo con más tráfico y contaría
el tráfico dos veces.

## Seguir una fila

Haga clic en una fila de una lista para filtrar toda la página por ella, por ejemplo por un dispositivo. El filtro aparece arriba como una etiqueta;
haga clic en la **x** de la etiqueta, o en **Quitar**, para eliminarlo. Los filtros se combinan: un dispositivo, luego una de sus aplicaciones, luego un
equipo remoto. Los filtros están en la dirección de la página, así que puede guardar o compartir un enlace a una vista.

## Cuando no hay nada que ver

Si el motor de clasificación de tráfico no está funcionando, la página no tiene datos. El motor también alimenta los flujos en vivo del
[Monitor](monitor-connections.md), así que compruebe allí primero. Aproximación que conviene recordar: para 7 y 30 días cada día aporta su propia
lista de principales, así que algo que es pequeño todos los días puede faltar en los totales de las listas.

## Páginas relacionadas

- [Análisis de amenazas](threat-analytics.md)
- [Monitorización y conexiones](monitor-connections.md)
- [Control de aplicaciones](../security-services/application-control.md)
