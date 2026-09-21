---
title: Monitorización y conexiones
sidebar_position: 2
description: Tráfico en tiempo real, mayores consumidores, conectividad, VPN, seguridad y la tabla de conexiones.
---

# Monitorización y conexiones

## Monitorización

**Operación y Analítica > Monitorización** ofrece una vista en tiempo real de lo que ocurre en la unidad. Está organizada
en pestañas.

| Pestaña | Qué responde |
|---|---|
| Tráfico diario | Cuánto tráfico ha pasado hoy y cuándo |
| Flujos en vivo | Qué conexiones están activas ahora, con sus velocidades de transferencia |
| Mayores consumidores | Qué hosts locales, aplicaciones, hosts remotos y protocolos usan más tráfico |
| Conectividad | El estado y el tráfico de cada enlace WAN, con latencia y entrega de paquetes |
| VPN | Sesiones de acceso remoto y el estado de los túneles |
| Seguridad | Amenazas bloqueadas a lo largo del tiempo, por dirección y categoría, y las direcciones más bloqueadas |

:::note Dónde se guardan los datos
Los datos de monitorización se conservan en memoria y vuelven a empezar tras un reinicio. Cuando la unidad está conectada
a un controlador, las métricas también se almacenan allí, de modo que el historial sobrevive a los reinicios. Vea
[Gestión central](../administration/central-management.md).
:::

### Flujos en vivo

Cada fila es un flujo activo. Ve los extremos local y remoto, el protocolo, la aplicación reconocida cuando la hay, la
velocidad y el volumen total. Use los filtros para limitar la lista a un host, una aplicación o una dirección. Dos
etiquetas de dirección ayudan a leer la tabla:

- **Saliente**: la conexión se inició desde una red local hacia internet.
- **Remota**: la conexión se inició desde internet hacia el firewall o hacia un host detrás de él.

Algunos ajustes de la página controlan cómo se conservan los flujos. Puede mantener un flujo visible durante un breve
período después de que termine, lo que es útil para investigar una conexión que se abrió y se cerró rápidamente.

Si la lista está vacía, se muestra el motivo:

- el servicio de flujos en vivo está desactivado: habilítelo en los ajustes de la página;
- se acaba de habilitar: aplique los cambios y espere unos segundos a que arranque;
- no está en ejecución: revise los registros del sistema, vea [Registros](logs.md).

El tráfico que el motor no puede clasificar se muestra como **Desconocido**. El conjunto de aplicaciones reconocidas
depende del catálogo instalado en la unidad, vea [Control de aplicaciones](../security-services/application-control.md).

## Conexiones

**Operación y Analítica > Conexiones** muestra la tabla de seguimiento de conexiones del kernel. El seguimiento de
conexiones es el mecanismo que permite al firewall seguir el estado de cada conexión, y es lo que hace posibles las reglas
con estado y el NAT.

Para cada entrada ve el origen, el destino, el protocolo y el estado. Puede buscar en la tabla y puede eliminar una
entrada. Eliminar una entrada corta esa conexión: los dos hosts deben establecerla de nuevo. Esto es útil para que una
regla modificada surta efecto en una conexión que ya estaba establecida.

## Páginas relacionadas

- [Analítica de Tráfico](traffic-analytics.md)
- [Reglas de firewall](../policy/firewall-rules.md)
