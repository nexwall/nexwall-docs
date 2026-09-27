---
title: Registros y depuración desde la línea de comandos
sidebar_position: 7
description: Dónde viven realmente las copias de registros, cómo buscarlas y seguirlas, cómo hacer que un servicio específico registre más, y para qué sirve — y no sirve — VictoriaLogs en esta unidad.
---

# Registros y depuración desde la línea de comandos

Esta unidad no usa el `logread` de BusyBox — ese comando no existe aquí. El registro funciona mediante `rsyslogd`
en su lugar. Esta página cubre dónde viven realmente las copias de registros, cómo buscarlas desde la línea de
comandos, y cómo hacer que un servicio específico registre más. Para saber qué servicio sostiene cada función y su
comando de reinicio, vea la [Referencia de comandos de servicios y registros](service-and-log-reference.md); para
lo básico de la línea de comandos en sí, vea [Línea de comandos y preguntas frecuentes](command-line-and-faq.md).

Todos los comandos se ejecutan como `root`, por SSH o por la consola.

## Dónde viven realmente los registros

Por defecto, `/var/log` es un directorio volátil, en memoria — esto protege el sistema de archivos raíz del
desgaste o de llenarse, pero también significa que `/var/log/messages` no sobrevive por sí solo a un reinicio.

| Copia | Ruta | Rotación |
|---|---|---|
| Por defecto, en memoria | `/var/log/messages` | Rotado por `/usr/sbin/rotate-messages` en cuanto supera los 50 MB, o el 10% del tamaño de `/tmp` si eso es mayor. Solo se conserva la rotación anterior, como `messages.1.gz`. |
| Persistente, opcional | `/mnt/data/log/messages` | Solo se escribe si se ha configurado un dispositivo de almacenamiento persistente en la pestaña Almacenamiento de la página [Sistema](../infrastructure/system.md#almacenamiento) — no es automático. Cuando existe, `logrotate` lo rota semanalmente y conserva 52 rotaciones comprimidas, aproximadamente un año. |

Una tarea cron diaria aparte (`5 1 * * * /usr/sbin/logrotate /etc/logrotate.conf`) se encarga en general de los
registros gestionados por `logrotate.conf`, independientemente de la rotación por tamaño anterior.

Algunos servicios mantienen su propio estado aparte de esto, totalmente fuera del flujo de registros — por ejemplo
`/mnt/data/dnsmasq/dhcp.leases`, y, por instancia de VPN, una base de datos de seguimiento de conexiones en
`/mnt/data/openvpn/<instancia>/connections.db`. Son archivos de estado, no registros, pero vale la pena
conocerlos cuando el comportamiento de un servicio no coincide con lo que dice su registro.

## Seguir y buscar

```bash
tail -f /var/log/messages
grep openvpn /var/log/messages | tail -20
```

Si hay almacenamiento persistente configurado, `/mnt/data/log/messages` guarda el mismo flujo con más historial —
compruebe `ls /mnt/data/log/` primero para confirmar que existe en esta unidad antes de depender de él.

Para el prefijo de registro que realmente escribe cada servicio, vea la tabla en la
[Referencia de comandos de servicios y registros](service-and-log-reference.md).

## Qué hace realmente la página de Registros de la interfaz web

La página **Registros** de la interfaz web es una capa fina sobre una única llamada `ubus`, que puede usar
directamente — útil en un script, o cuando quiere el comportamiento de búsqueda exacto de la página sin abrir un
navegador:

```bash
ubus call ns.log get-log '{"search":"openvpn","limit":20}'
```

Esto busca directamente en `/var/log/messages` (en efecto `grep <búsqueda> /var/log/messages | tail -n
<límite>`) — no está respaldado por una base de datos de registros aparte.

## VictoriaLogs: para qué sirve, y no sirve, aquí

[VictoriaLogs](https://docs.victoriametrics.com/victorialogs/) es un paquete opcional (`opkg install
victoria-logs`), que no forma parte de la imagen por defecto. Instalarlo configura todo lo necesario de una vez: el
paquete también registra una regla de reenvío de `rsyslogd`, así que en cuanto se instala, cada mensaje de registro
se envía a `127.0.0.1:5514` por TCP (con framing por conteo de octetos) a medida que `rsyslogd` lo procesa. Lo que
VictoriaLogs **no es**, actualmente, es algo conectado a nada más: ni la página de Registros de la interfaz web ni
la API lo consultan — la página de Registros sigue funcionando como se describió arriba, directamente desde el
archivo de texto plano. Si instala VictoriaLogs, obtiene todo lo que `rsyslogd` vea a partir de ese momento,
consultable usted mismo con su propio lenguaje de consulta, LogsQL, por HTTP en el puerto 9428:

```bash
opkg update && opkg install victoria-logs
/etc/init.d/victoria-logs start

curl -s 'http://127.0.0.1:9428/select/logsql/query' \
  --data-urlencode 'query=openvpn' \
  --data-urlencode 'limit=20'
```

Vale la pena hacerlo si quiere el filtrado de LogsQL (por rango de tiempo, por campo, condiciones combinadas) en
lugar de un `grep` simple — los nombres exactos de campo disponibles dependen de la plantilla de syslog con la que
`rsyslogd` reenvía, así que revise primero un resultado sin filtrar (baje `--data-urlencode 'limit=20'` a
`'limit=1'` para ver uno) antes de construir una consulta filtrada alrededor de un campo específico. En cualquier
caso, es una herramienta que usted mismo consulta — no una segunda copia que la interfaz ya muestre.

## Aumentar la verbosidad de un servicio específico

El volumen de registro por defecto suele ser demasiado silencioso para depurar un problema específico. Cada uno de
estos aumenta la verbosidad de un servicio; bájela de nuevo cuando ya tenga lo que necesita — un rastreo IKE
completo o la verbosidad máxima de OpenVPN produce mucha salida muy rápido, lo cual empuja `/var/log/messages`
hacia su punto de rotación antes.

| Servicio | Cómo aumentar la verbosidad | Después |
|---|---|---|
| OpenVPN | `uci set openvpn.<instancia>.verb='5'` (`0` silencioso a `11` muy detallado; `3` es el valor de fábrica) | `uci commit openvpn && /etc/init.d/openvpn restart` |
| dnsmasq (DNS/DHCP) | `uci set dhcp.@dnsmasq[0].logqueries='1'` para registrar cada consulta DNS, agregue `.logdhcp='1'` para las transacciones DHCP también | `uci commit dhcp && /etc/init.d/dnsmasq restart` |
| IPsec (charon) | Edite `/etc/strongswan.d/charon-logging.conf` — suba un subsistema específico (por ejemplo `ike = 2`) o `default` para todo | `/etc/init.d/ipsec restart` |
| nftables (firewall) | Agregue `log` a una regla (es exactamente lo que hace el interruptor de registro por regla de la interfaz web) para un registro persistente, o ejecute `nft monitor trace` para un rastreo de paquetes en vivo, sin filtrar | Los cambios de regla necesitan `/etc/init.d/firewall reload`; `monitor trace` se ejecuta de inmediato en primer plano |

La opción de registro de consultas DNS de arriba es también lo que exponen los propios ajustes de DNS de la
interfaz web — `uci get dhcp.@dnsmasq[0].logqueries` es el mismo valor que lee y escribe el interruptor de
registro de consultas de la página [DNS y DHCP](../network/dns-dhcp.md).

## Páginas relacionadas

- [Referencia de comandos de servicios y registros](service-and-log-reference.md)
- [Herramientas de solución de problemas de red](network-troubleshooting-tools.md)
- [Línea de comandos y preguntas frecuentes](command-line-and-faq.md)
- [Sistema](../infrastructure/system.md)
- [Registros](../operation-analytics/logs.md)
