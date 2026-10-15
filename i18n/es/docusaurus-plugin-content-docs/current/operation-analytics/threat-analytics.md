---
title: Análisis de amenazas
sidebar_position: 2
description: Qué detuvo o detectó el firewall, qué dispositivos están en riesgo y el informe ejecutivo.
---

# Análisis de amenazas

**Operación y Analítica > Análisis de amenazas** cuenta lo que hicieron las protecciones del firewall: qué se bloqueó o
detectó, cuándo, de dónde venía, qué dispositivos de la red fueron afectados y por qué. Funciona en el propio firewall,
sin servicio en la nube.

![Análisis de amenazas](/img/docs/threats-es.png)

Elija **Hoy**, **7 días** o **30 días** arriba a la derecha.

## La historia de una amenaza

El primer bloque sigue las capas que encuentra una amenaza, en orden:

| Capa | Qué cuenta |
|---|---|
| Bloqueo | Detenido en el borde: bloqueo de IP y geolocalización, filtrado DNS, IPS y la política web (categorías y filtro de contenido) |
| Antivirus | Archivos infectados encontrados en el tráfico web |
| Sandbox | Archivos desconocidos abiertos en una máquina segura, vea [Protección web](../security-services/web-protection.md) |
| Advanced Threat Protection | Veredictos aprendidos de muchos análisis. Aún no disponible: el recuadro muestra **Próximamente** |
| Collective Defense (Loop) | Lo que encuentra un análisis se bloquea en todos los firewalls. Aún no disponible: el recuadro muestra **Próximamente** |

Una capa que no está en su plan muestra **No incluida en su plan**.

## Qué más hay en la página

- **Amenazas en el tiempo**, detenidas o detectadas, con el cambio respecto al período anterior.
- **Dispositivos en riesgo**: una puntuación por dispositivo (peso de la protección que actuó, por la gravedad, por el número de
  eventos). Los pesos se imprimen bajo la tabla.
- **Categorías web**: el tráfico por categoría de sitio. También dice qué parte del tráfico está en una categoría, porque
  los sitios que no están en ninguna lista no se cuentan en una.
- **Dispositivos más afectados**, **principales orígenes de amenazas** y **principales motivos**.
- **Eventos**: cada evento con su hora, dispositivo, dirección remota, protección, acción (bloqueado, detectado o permitido),
  motivo y detalle. Busque por dispositivo, dirección o motivo y abra un evento para ver su detalle.

Los eventos se conservan en el firewall 35 días. El historial empieza cuando se instaló la versión que introdujo esta página.

## Informe ejecutivo

**Informe ejecutivo** (botón arriba) genera un PDF del período elegido: un resumen ejecutivo, los eventos de amenazas,
los dispositivos en riesgo, el tráfico, las categorías web, el estado de las protecciones y recomendaciones. Es gratuito en todos los
planes y lleva solo una pequeña marca *Powered by Nexwall*.

Por defecto los dispositivos aparecen como *Dispositivo 1*, *Dispositivo 2* y así sucesivamente. Active **Incluir nombres y direcciones de los dispositivos** para ver
sus nombres y direcciones.

## Páginas relacionadas

- [Panel](dashboard.md)
- [Analítica de Tráfico](traffic-analytics.md)
- [Registros](logs.md) para los eventos en bruto en el Visor de registros.
