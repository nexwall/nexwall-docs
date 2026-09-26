---
title: Referencia de comandos de servicios y registros
sidebar_position: 4
description: Qué servicio hay detrás de cada función, cómo reiniciarlo y dónde encontrar sus registros, por SSH.
---

# Referencia de comandos de servicios y registros

Cada página de la interfaz web se apoya en uno o más servicios del sistema. Cuando una función falla y la interfaz
web no dice por qué, reiniciar el servicio correcto o leer su registro directamente suele ser el camino más rápido.
Esta página es esa tabla de consulta. Para lo básico de la línea de comandos, vea
[Línea de comandos y preguntas frecuentes](command-line-and-faq.md); para leer registros desde la interfaz web, vea
[Registros](../operation-analytics/logs.md).

Todos los comandos se ejecutan como `root`, por SSH o por la consola.

## Servicios por función

| Función (interfaz web) | Servicio | Reiniciar | Búsquelo en el registro |
|---|---|---|---|
| Reglas de Firewall, NAT, Zonas y Políticas | `firewall` | `/etc/init.d/firewall reload` (solo reglas) o `restart` | el nombre de la zona, o el prefijo de registro definido en la regla |
| DNS y DHCP | `dnsmasq` | `/etc/init.d/dnsmasq restart` | `dnsmasq-dhcp` |
| Control de aplicaciones (DPI) | `netifyd`, `dpi` | `/etc/init.d/netifyd restart`, `/etc/init.d/dpi restart` | `netifyd` |
| Prevención de intrusiones (IPS/IDS) | `snort` | `/etc/init.d/snort restart` | `snort` |
| Filtrado de DNS (Threat Shield DNS) | `ns-flashstart` | `/etc/init.d/ns-flashstart restart` | `ns-flashstart` |
| Bloqueo de IP y geolocalización (Threat Shield IP) | `banip` | `/etc/init.d/banip restart` | `banIP` |
| SD-WAN | `mwan3` | `/etc/init.d/mwan3 restart` | `mwan3` |
| Portal cautivo | `dedalo`, `dedalo_users_auth` | `/etc/init.d/dedalo restart` | `dedalo` |
| OpenVPN (acceso remoto, sitio a sitio) | `openvpn` | `/etc/init.d/openvpn restart` | `openvpn` |
| Túneles IPsec | `ipsec` | `/etc/init.d/ipsec restart` | `charon` |
| WireGuard | gestionado como una interfaz de red | `ifdown <interfaz>` y luego `ifup <interfaz>` | `wireguard` |
| Vinculación por MAC | `ns-binding` | `/etc/init.d/ns-binding restart` | `ns-binding` |
| Redirección de puertos vía NAT reflection | `ns-netmap` | `/etc/init.d/ns-netmap restart` | `ns-netmap` |
| Gestión central (conexión con el controlador) | `ns-plug` | `/etc/init.d/ns-plug restart` | `ns-plug` — vea [Solución de problemas de registro en el controlador](controller-registration-troubleshooting.md) |
| Alta disponibilidad | `keepalived`, gestionado con `ns-ha-config` | no reinicie `keepalived` directamente, use `ns-ha-config`, vea [Alta disponibilidad](../infrastructure/high-availability.md) | `keepalived` |
| Interfaz web | `ns-ui` | `/etc/init.d/ns-ui restart` | `ns-ui` |
| Reenvío de logs del sistema | `rsyslog` | `/etc/init.d/rsyslog restart` | — |
| Agente de monitoreo MSP | `check_mk_agent` | `/etc/init.d/check_mk_agent restart` | `check_mk_agent` |

Un `restart` interrumpe el servicio brevemente; un `reload`, cuando está disponible, aplica la configuración sin un
reinicio completo, y vale la pena probarlo primero en una unidad en producción.

## Comandos de diagnóstico más allá de restart y logread

Estos leen el estado en vivo de un servicio, en lugar de (o además de) su registro.

| Tarea | Comando |
|---|---|
| Estado de enlaces y políticas de SD-WAN | `mwan3 status`, `mwan3 interfaces` |
| Estado de los túneles IPsec | `ipsec statusall` |
| Estado de los pares WireGuard y handshakes | `wg show` |
| IPS: estado del servicio, uso de memoria, contadores de reglas activas | `snort-mgr status` |
| IPS: validar la configuración generada sin aplicarla | `snort-mgr check` |
| IPS: informe de incidentes recientes | `snort-mgr report`, agregue `-n 10` para solo los diez más frecuentes |
| OpenVPN: listar clientes conectados desde el socket de gestión | `openvpn-status <ruta-al-socket>` — encuentre el socket primero con `find /var/run /var/etc -iname '*openvpn*.sock' 2>/dev/null` |
| Estado de la conexión con el controlador | `ubus call ns.plug status` |
| Estado del par de alta disponibilidad | `ns-ha-config status` |

## Forzar actualizaciones de firmas y reglas del DPI

La base de datos de control de aplicaciones y su verificación de licencia se ejecutan según su propio calendario,
por cron. Para forzar una actualización de inmediato en lugar de esperar:

```bash
/etc/init.d/dpi-data-update start     # base de datos de firmas de aplicaciones
/etc/init.d/dpi-license-update start  # verificación de la licencia de suscripción
```

Para el conjunto de reglas del IPS, use `snort-mgr update-rules` en lugar de reiniciar un servicio; descarga el
conjunto de reglas y reescribe la configuración que `snort` lee la próxima vez que inicia.

## Leer la configuración de un servicio tal como la ve UCI

Cada servicio anterior se configura mediante `/etc/config/<nombre>`, generalmente con el mismo nombre que el
paquete UCI (por ejemplo `uci show dpi`, `uci show mwan3`, `uci show snort`). No todos los nombres de servicio
coinciden exactamente con el nombre del paquete UCI — `ns-flashstart` y `banip` sí coinciden — compruebe
`ls /etc/config/` si un nombre de esta tabla no devuelve nada.

## Páginas relacionadas

- [Línea de comandos y preguntas frecuentes](command-line-and-faq.md)
- [Solución de problemas de registro en el controlador](controller-registration-troubleshooting.md)
- [Registros](../operation-analytics/logs.md)
- [Alta disponibilidad](../infrastructure/high-availability.md)
