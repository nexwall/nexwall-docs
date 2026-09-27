---
title: Herramientas de solución de problemas de red
sidebar_position: 6
description: Las herramientas de línea de comandos que trae la unidad para diagnosticar conectividad, enrutamiento, NAT y DNS más allá de lo que muestra la interfaz web.
---

# Herramientas de solución de problemas de red

La interfaz web no tiene una herramienta de ping o traceroute integrada, así que para cualquier cosa más allá de "el
enlace está activo", el acceso SSH y estas herramientas de línea de comandos son el camino. Esta página recorre
capa por capa, desde la tarjeta de red hasta el DNS, con las herramientas que esta unidad realmente trae. La mayoría
vienen instaladas por defecto; unas pocas son paquetes opcionales, indicado donde corresponda.

## Interfaces y estado del enlace

| Tarea | Comando |
|---|---|
| Listar direcciones de cada interfaz | `ip -4 addr`, `ip -6 addr` |
| Estado de la interfaz y de la portadora | `ip link` |
| Velocidad del enlace, dúplex, y si un cable realmente se detecta | `ethtool <interfaz>` |
| Throughput en vivo por interfaz | `bwm-ng` |

`ethtool` es la forma más rápida de distinguir un problema de cableado o de autonegociación de cualquier otra cosa
más arriba en la pila — compruebe `Link detected` y `Speed` antes de mirar cualquier otro lado si toda una interfaz
parece estar fallando.

## El segmento local: ARP

| Tarea | Comando |
|---|---|
| Ver lo que la unidad ya resolvió en el segmento local | `ip neigh` |
| Preguntarle activamente a un host específico si responde | `arping -I <interfaz> <ip>` |
| Barrer toda una red local para ver qué hay realmente presente | `arp-scan --interface=<interfaz> --localnet` |

`arp-scan` es la herramienta para "hay una IP duplicada en esta red" o "qué está realmente conectado a este switch",
ya que pregunta a nivel de ARP y obtiene respuesta incluso de hosts que bloquean ICMP.

## Enrutamiento y enrutamiento por políticas

| Tarea | Comando |
|---|---|
| Tabla de enrutamiento principal | `ip route` |
| Qué ruta tomaría realmente un destino específico | `ip route get <destino>` |
| Reglas de enrutamiento por políticas (muy usadas cuando SD-WAN está configurado) | `ip rule` |
| Una tabla de enrutamiento específica por número | `ip route show table <id>` |

Cuando [SD-WAN](pathname:///es/docs/network/sd-wan) está activo, `mwan3` mantiene sus propias tablas y reglas de enrutamiento por
WAN — `ip rule` muestra qué tráfico se dirige a qué tabla, y `ip route get <destino>` es la forma más rápida de
confirmar por cuál WAN saldrá realmente un destino determinado. Para el estado en que `mwan3` mismo cree que está
cada enlace, vea la sección de comandos de diagnóstico en la [Referencia de comandos de servicios y
registros](service-and-log-reference.md).

## Alcanzabilidad

| Tarea | Comando |
|---|---|
| Alcanzabilidad básica | `ping <host>` |
| Alcanzabilidad con un tamaño de paquete específico, sin fragmentar (prueba de MTU/PMTU) | `ping -M do -s <tamaño> <host>` |
| Alcanzabilidad a nivel de ARP, sin enrutamiento IP de por medio | `arping -I <interfaz> <ip>` |

Esta unidad trae el `ping` completo de `iputils`, no el reducido de BusyBox, específicamente para que `-M do -s`
funcione — es la forma estándar de encontrar la MTU real de una ruta, algo que importa sobre todo en túneles VPN:
envíe tamaños cada vez más pequeños hasta que uno deje de necesitar fragmentación, y esa es la MTU utilizable para
ese túnel.

## DNS

| Tarea | Comando |
|---|---|
| Resolver un nombre usando el propio resolvedor de la unidad | `dig <nombre>` |
| Resolver usando un servidor específico, sin pasar por el resolvedor de la unidad | `dig @<servidor> <nombre>` |
| Rastrear la resolución desde la raíz | `dig +trace <nombre>` |
| Resolver mediante DNS sobre HTTPS | `dig +https <nombre>` |

Consultar `@1.1.1.1` u `@8.8.8.8` directamente le dice si un nombre realmente no resuelve, o si el problema es
específico del resolvedor de esta unidad — filtrado de DNS, un reenviador mal configurado, o el propio `dnsmasq`.
Vea la [Referencia de comandos de servicios y registros](service-and-log-reference.md) para reiniciar `dnsmasq` y
leer su registro.

## Captura de paquetes

```bash
tcpdump -i <interfaz> -n host <ip> and port <puerto>
```

Algunos filtros que vale la pena conocer más allá de lo básico:

| Qué quiere ver | Filtro |
|---|---|
| Solo un host | `host <ip>` |
| Solo un puerto, en cualquier dirección | `port <puerto>` |
| Tráfico por un túnel VPN específico | `-i tun-nsplug`, `-i tun0`, o el nombre que tenga la interfaz del túnel |
| Guardar en un archivo para análisis fuera de línea (por ejemplo en Wireshark) | `-w /tmp/captura.pcap` |

Capturar en la interfaz del lado LAN frente a la del lado WAN de la misma conexión es cómo comprueba si el NAT y las
reglas de firewall se están aplicando de verdad como se espera — el paquete debería verse distinto (dirección de
origen, y a menudo el puerto) en cada lado.

## NAT, reglas de firewall y estado de conexión

| Tarea | Comando |
|---|---|
| El conjunto de reglas nftables compilado, tal como lo ve el kernel | `nft list ruleset` |
| Lo mismo, en la forma de más alto nivel del propio `firewall4` | `fw4 print` |
| La tabla de seguimiento de conexiones: lo que el kernel considera una conexión activa ahora mismo | `conntrack -L` |
| Flujo en vivo de conexiones creándose y destruyéndose | `conntrack -E` |
| Filtrar la tabla de seguimiento a un host | `conntrack -L -s <ip>` o `-d <ip>` |

`conntrack -L` responde una pregunta común y específica que la página de [Monitorización y
conexiones](../operation-analytics/monitor-connections.md) de la interfaz no siempre deja clara: si una conexión
realmente se está siguiendo y pasando por NAT como se espera, o si nunca llegó a alcanzar conntrack (lo cual
generalmente apunta a un bloqueo anterior, no a un problema de NAT).

## Puertos y procesos

| Tarea | Comando |
|---|---|
| Qué está escuchando, y en qué interfaz | `ss -tlnp`, `ss -ulnp` |
| Qué proceso tiene ocupado un puerto o archivo | `lsof -i :<puerto>` |
| Qué proceso matar para liberar un puerto | `fuser -k <puerto>/tcp` |
| Probar manualmente si un puerto TCP o UDP está abierto desde aquí | `nc -zv <host> <puerto>` |

`nc -zv` es la forma más rápida de separar "la ruta de red está bien pero nada está escuchando" de "la ruta de red
en sí está bloqueada" — una conexión rechazada es el primer caso, un tiempo de espera agotado es el segundo.

## Throughput y ancho de banda

| Tarea | Comando |
|---|---|
| Vista en vivo del throughput de la interfaz | `bwm-ng` |
| Prueba de velocidad de la WAN desde la línea de comandos | `speedtestcpp` |
| Prueba de throughput controlada entre esta unidad y otro host | `iperf3` |

`iperf3` y `nmap` son paquetes opcionales, no forman parte de la imagen por defecto — instálelos primero con
`opkg update && opkg install iperf3` (o `nmap`). Ejecute `iperf3 -s` en un lado y `iperf3 -c <servidor>` en el otro
para medir el throughput real alcanzable entre dos puntos específicos, lo cual separa un problema genuino de ancho
de banda o de enlace de algo específico de la aplicación.

## Uniendo todo

Un orden razonable para trabajar, de abajo hacia arriba en la pila, para no perseguir un síntoma de DNS o de
aplicación que en realidad es un cable:

1. **Enlace**: `ethtool` — ¿la interfaz está realmente activa, a la velocidad esperada?
2. **Segmento local**: `ip neigh`, `arping`, `arp-scan` — ¿la unidad puede alcanzar a sus vecinos inmediatos?
3. **Enrutamiento**: `ip route get`, `ip rule` — ¿el tráfico se está enviando a donde usted espera?
4. **Firewall y NAT**: `nft list ruleset`, `conntrack -L` — ¿el tráfico está permitido, y realmente se está
   siguiendo?
5. **DNS**: `dig @<resolvedor público>` — ¿el nombre resuelve, independientemente de esta unidad?
6. **Aplicación**: `nc -zv`, `tcpdump`, `iperf3` — ¿el servicio específico es alcanzable, y el throughput es el
   esperado?

## Páginas relacionadas

- [Referencia de comandos de servicios y registros](service-and-log-reference.md)
- [Qué es UCI, y por qué importa](understanding-uci.md)
- [SD-WAN](pathname:///es/docs/network/sd-wan)
- [Monitorización y conexiones](../operation-analytics/monitor-connections.md)
- [Línea de comandos y preguntas frecuentes](command-line-and-faq.md)
