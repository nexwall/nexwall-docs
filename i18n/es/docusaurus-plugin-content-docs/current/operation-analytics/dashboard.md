---
title: Panel
sidebar_position: 1
description: "La página de resumen de la unidad: protección, tráfico y estado del firewall."
---

# Panel

**Operación y Analítica > Panel** es la primera página que ve después de iniciar sesión. Muestra el estado del firewall
a la izquierda y lo que el firewall protege y transporta a la derecha. Los datos se actualizan cada 20 segundos.

![El Panel](/img/docs/dashboard-es.png)

## La columna izquierda: el firewall

| Tarjeta | Contenido |
|---|---|
| Sistema | Nombre, versión, tiempo en línea y la carga media de 1, 5 y 15 minutos. Avisa mientras la unidad conserva su nombre de fábrica |
| Conectividad | Si la unidad llega a internet, el estado de cada enlace WAN, el multi-WAN y el número de equipos conocidos |
| VPN | Clientes de acceso remoto conectados y número de túneles habilitados y conectados |
| Acceso y continuidad | El portal cautivo, las asociaciones de dirección MAC, la copia de seguridad remota, la alta disponibilidad y el número de alertas activas de [Rendimiento](performance.md) |

Cada tarjeta enlaza con la página donde puede profundizar.

## La columna derecha: protección y tráfico

- **Cuatro cifras.** Direcciones bloqueadas en la última hora, alertas del IPS en las últimas 24 horas, archivos analizados por el
  antivirus (y cuántos estaban infectados) y cuántos catálogos de protección están al día. Una protección que no está
  activa, o que no está en su plan, lo dice en lugar de mostrar cero.
- **Capas de protección.** Un recuadro por capa: bloqueo de IP y geolocalización, filtro DNS, IPS, Control de aplicaciones y
  [Protección web](../security-services/web-protection.md), cada uno con su estado (activa, inactiva, atrasada o no incluida en su plan)
  y su cifra principal, por ejemplo las reglas activas o las alertas del día. El recuadro de Protección web también avisa cuando
  hay reglas que descifran tráfico, cuando se dejaron fuera listas de categorías por ser demasiado grandes y cuando el proxy web o el
  antivirus no funcionan.
- **Intelligent Threat Block.** Hasta dónde llegó un archivo: analizado por el antivirus, analizado por el sandbox, veredictos
  maliciosos e indicadores aplicados. Indica cuándo el veredicto es consultivo (la descarga no espera al sandbox).
- **Inteligencia cargada en este firewall.** La versión, el tamaño y la última actualización del catálogo de aplicaciones, de las reglas del IPS,
  de las categorías de sitios y de los demás catálogos, y cuáles están atrasados o fallando.
- **Lo que su firewall aprendió hoy.** Los catálogos que se actualizaron y los archivos que se bloquearon en las últimas 24 horas.
- **Tráfico.** Para hoy, 7 o 30 días: el ancho de banda del primer enlace WAN en la última hora (elija otro enlace cuando
  hay varios), el tráfico por hora, las aplicaciones y los dispositivos principales y las categorías web usadas. El enlace
  **Ver todo en Analítica de Tráfico** abre [Analítica de Tráfico](traffic-analytics.md).

Los informes de tráfico se conservan 35 días.

## Avisos que puede ver

- **Nombre de fábrica.** La unidad aún tiene su nombre de equipo de fábrica. Cámbielo en **Administración > Sistema** y aplique el
  cambio.
- **Sin reenviador DNS.** Un enlace WAN con dirección estática necesita al menos un reenviador DNS. Configúrelo en
  **Red > DNS y DHCP**.
- **La supervisión de amenazas está desactivada.** Las estadísticas de amenazas dependen del registro. Active el registro en al menos una cadena en
  **Políticas > Zonas y políticas**.

## Páginas relacionadas

- [Análisis de amenazas](threat-analytics.md) para saber qué se detuvo.
- [Analítica de Tráfico](traffic-analytics.md) para saber a dónde va el tráfico.
- [Monitorización y conexiones](monitor-connections.md) para el tráfico en vivo y los enlaces WAN.
- [Rendimiento](performance.md) para el historial y las alertas.
