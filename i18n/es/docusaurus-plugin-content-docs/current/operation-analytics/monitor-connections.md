---
title: Monitorización y conexiones
sidebar_position: 4
description: Flujos en vivo, principales consumidores, los enlaces WAN, VPN y la tabla de conexiones.
---

# Monitorización y conexiones


![La página Monitorización con los flujos en vivo](/img/docs/monitor-es.png)

## Monitorización

**Operación y Analítica > Monitorización** da una vista en tiempo real de lo que ocurre en la unidad. Se organiza en pestañas.

| Pestaña | Qué responde |
|---|---|
| Flujos en vivo | Qué conexiones están activas ahora, con sus velocidades de transferencia |
| Principales consumidores | Qué equipos locales, aplicaciones y protocolos usan más tráfico en este momento: el total, el dispositivo, la aplicación y el protocolo más activos, y una tarjeta ordenada para cada uno con la velocidad de cada fila |
| Enlaces WAN | El estado de cada enlace WAN, su tráfico, y la latencia y la pérdida de paquetes hacia los equipos que monitoriza |
| VPN | Las sesiones de acceso remoto y el estado de los túneles |

El tráfico del día, por hora, dispositivo y aplicación, está ahora en [Analítica de Tráfico](traffic-analytics.md), y lo que se
detuvo está en [Análisis de amenazas](threat-analytics.md).

:::note Dónde se guardan los datos
Los datos de monitorización se guardan en el firewall. Con un disco de datos sobreviven a los reinicios; sin él se mantienen en memoria y empiezan
de nuevo tras un reinicio. Cuando la unidad está conectada a un controlador, las métricas también se guardan allí. Vea
[Gestión central](../administration/central-management.md).
:::

### Flujos en vivo

Cada fila es un flujo activo. Ve los extremos local y remoto, el protocolo, la aplicación reconocida cuando
la hay, la velocidad y el volumen total. Use los filtros para acotar la lista por aplicación, protocolo, etiqueta, origen o destino.
La tabla llena la página hasta el final de la ventana y se desplaza dentro de su propio recuadro, así que los controles de página (número de filas y páginas)
siguen a la vista. Dos etiquetas de dirección ayudan a leer la tabla:

- **Saliente**: la conexión se inició desde una red local hacia internet.
- **Remota**: la conexión se inició desde internet hacia el firewall o un equipo detrás de él.

Algunos ajustes de la página controlan cómo se conservan los flujos. Puede mantener un flujo visible un tiempo corto después de que termine, lo que
sirve para investigar una conexión que se abrió y cerró rápido.

Si la lista está vacía, se muestra el motivo:

- el servicio de flujos en vivo está desactivado: actívelo en los ajustes de la página;
- se acaba de activar: aplique los cambios y espere unos segundos a que arranque;
- no está funcionando: revise los registros del sistema, vea [Registros](logs.md).

El tráfico que el motor no puede clasificar se muestra como **Desconocido**. El conjunto de aplicaciones reconocidas depende del
catálogo instalado en la unidad, vea [Control de aplicaciones](../security-services/application-control.md).

### Enlaces WAN

Para cada enlace WAN la pestaña muestra su estado y dirección pública, los eventos del enlace (activo e inactivo), su tráfico y,
para cada equipo que monitoriza, la **latencia** y la **pérdida de paquetes**. Elija los equipos en la pestaña Ajustes de
[Rendimiento](performance.md).

Elija la **ventana de tiempo** arriba: 1 hora (la predeterminada), 6 horas, 12 horas, 24 horas, 7 días o 30 días. En
las ventanas largas cada punto de un gráfico es el valor más alto de su intervalo, así que un pico corto de pérdida, latencia o tráfico sigue
visible. El historial se guarda 7 días, o un año cuando el firewall tiene un disco de datos; sin disco de datos
la ventana de 30 días muestra los últimos 7 días.

Cada gráfico es una tarjeta con el valor actual, el máximo y el promedio de cada serie sobre la línea.

## Conexiones

**Operación y Analítica > Conexiones** muestra la tabla de seguimiento de conexiones del kernel. El seguimiento de conexiones es el
mecanismo que permite al firewall seguir el estado de cada conexión, y es lo que hace posibles las reglas con estado y el NAT.

![La tabla de conexiones](/img/screenshots/operation-connections-content.png)

*La tabla de seguimiento de conexiones.*

De cada entrada ve el origen, el destino, el protocolo y el estado. Puede buscar en la tabla y puede eliminar
una entrada. Eliminar una entrada corta esa conexión: los dos equipos deben establecerla de nuevo. Es útil para que
una regla modificada surta efecto en una conexión que ya está establecida.

## Páginas relacionadas

- [Analítica de Tráfico](traffic-analytics.md)
- [Reglas de firewall](../policy/firewall-rules.md)
- [Herramientas de diagnóstico de red](../help/network-troubleshooting-tools.md) para la misma tabla de seguimiento de conexiones
  desde la línea de comandos, con `conntrack`
