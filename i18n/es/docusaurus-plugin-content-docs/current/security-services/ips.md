---
title: Prevención de intrusiones (IPS / IDS)
sidebar_position: 2
description: Detecte y bloquee ataques con Snort.
---

# Prevención de intrusiones (IPS / IDS)

**Servicios de Seguridad > IPS / IDS** ejecuta el sistema de prevención de intrusiones Snort sobre el tráfico que pasa por
el firewall. Snort compara el tráfico con un conjunto de **reglas** que describen ataques conocidos. El tráfico que
coincide con una regla activa se bloquea, o genera una alerta, según la regla.

## Activar el IPS

1. Abra la pestaña **Configuración** y active el IPS.
2. Elija la política de reglas que se ajuste a sus necesidades. Una política más estricta bloquea más y puede producir más
   falsos positivos.
3. Opcionalmente, introduzca un **Oinkcode**. El Oinkcode es un identificador personal que da acceso a los conjuntos de
   reglas oficiales más recientes. Se obtiene registrando una cuenta gratuita en el sitio web de Snort. Sin él, se usan las
   reglas de la comunidad.
4. Defina sus **redes locales**: las redes que protege. Las reglas las usan para distinguir lo interno de lo externo.
5. Guarde y **Aplicar cambios**.

Las reglas se actualizan automáticamente una vez al día, durante la noche.

## Eventos

La pestaña **Eventos** lista lo que ha visto el IPS: el tráfico que bloqueó y las alertas que generó. Cada evento muestra
la hora, la regla, las direcciones y la acción. Use esta lista para decidir qué ajustar.

## Ajuste

Ningún conjunto de reglas es perfecto. Cuando una regla interfiere con tráfico legítimo, dispone de tres herramientas:

| Herramienta | Efecto |
|---|---|
| **Reglas desactivadas** | La regla se elimina del conjunto para todos. Úsela cuando una regla es, en general, demasiado estricta para su entorno |
| **Alertas suprimidas** | La regla sigue activa, pero ignora una dirección o red en un sentido. Úsela cuando una regla es buena en general pero un host la dispara legítimamente |
| **Bypass** | El tráfico de una dirección no se inspecciona en absoluto. Úselo con moderación, por ejemplo para un servidor de copias de seguridad que mueve grandes volúmenes de datos |

Para desactivar una regla o suprimir una alerta, parta del evento que muestra el problema.

## Rendimiento

Inspeccionar todo el tráfico consume capacidad de procesamiento y memoria. Si ve una carga alta tras activar el IPS, revise
la página [Rendimiento](../operation-analytics/performance.md), use el bypass para flujos de confianza de gran volumen y
considere una política con menos reglas.

## Páginas relacionadas

- [Bloqueo de IP y geolocalización](ip-geo-blocking.md)
- [Reglas de firewall](../policy/firewall-rules.md)
