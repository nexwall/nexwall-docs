---
title: Panel
sidebar_position: 1
description: La página de resumen de la unidad.
---

# Panel

**Operación y Analítica > Panel** es la primera página que ve después de iniciar sesión. Resume el estado de la unidad y
señala lo que necesita atención.

## Qué muestran las tarjetas

| Tarjeta | Contenido |
|---|---|
| Sistema | Nombre de host, versión, tiempo de actividad y los promedios de carga de 1, 5 y 15 minutos |
| Conexión a internet | Si la unidad llega a internet, por enlace WAN |
| Tráfico de la WAN | Tráfico reciente en las interfaces WAN |
| Almacenamiento y memoria | Uso de la partición del sistema, de la partición de datos y de la memoria |
| Servicios | Qué servicios están habilitados y en ejecución, por ejemplo SD-WAN, el motor de clasificación de tráfico, el portal cautivo y Threat Shield |
| VPN | Clientes de acceso remoto conectados y el número de túneles habilitados y conectados |
| Seguridad | Direcciones bloqueadas por Threat Shield en el período reciente y paquetes bloqueados |
| Hosts conocidos | Dispositivos que la unidad ha visto en sus redes |

Cada tarjeta enlaza con la página donde puede profundizar.

## Avisos que puede ver

El panel resalta problemas de configuración habituales:

- **Nombre de host predeterminado.** La unidad todavía se llama `Nexwall`. Cámbielo en **Infraestructura > Sistema** y
  aplique el cambio.
- **Sin reenviador de DNS.** Un enlace WAN con dirección estática necesita al menos un reenviador de DNS. Configure uno en
  **Red > DNS y DHCP**.
- **La monitorización de amenazas está desactivada.** Las estadísticas de amenazas dependen del registro. Active el
  registro en al menos una cadena en **Políticas > Zonas y Políticas**.

## Páginas relacionadas

- [Monitorización y conexiones](monitor-connections.md) para el tráfico en tiempo real.
- [Rendimiento](performance.md) para el historial y las alertas.
