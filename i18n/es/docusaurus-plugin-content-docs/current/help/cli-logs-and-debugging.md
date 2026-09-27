---
title: Registros y depuración desde la línea de comandos
sidebar_position: 7
description: Dónde viven realmente las copias de registro, cómo buscarlas y seguirlas, cómo consultar VictoriaLogs y cómo hacer que un servicio específico registre más.
---

# Registros y depuración desde la línea de comandos

Esta unidad no usa el `logread` de BusyBox — ese comando no existe aquí. El registro de logs pasa por `rsyslogd`,
que por defecto mantiene `/var/log/messages` en memoria y, en una unidad con almacenamiento persistente
configurado, también escribe una copia que sobrevive a un reinicio y alimenta
[VictoriaLogs](https://docs.victoriametrics.com/victorialogs/), una pequeña base de datos de registros. Esta
página cubre dónde viven esas copias, cómo buscarlas y cómo hacer que un servicio específico registre más. Para
saber qué servicio respalda qué función y su comando de reinicio en una línea, consulte
[Referencia de comandos de servicios y registros](service-and-log-reference.md); para lo básico de la línea de
comandos en sí, consulte [Línea de comandos y preguntas frecuentes](command-line-and-faq.md).

Todos los comandos se ejecutan como `root` por SSH o consola.

## Dónde viven realmente los registros

Por defecto, `/var/log` está en memoria: esto protege el dispositivo de almacenamiento del desgaste o de llenarse,
pero también significa que `/var/log/messages` no sobrevive por sí solo a un reinicio.

| Copia | Ruta | Cuándo existe |
|---|---|---|
| Predeterminada, en memoria | `/var/log/messages` | Siempre. Rotada por `/usr/sbin/rotate-messages` al superar aproximadamente 98 MB; solo se conserva la rotación anterior, como `messages.1.gz`. |
| Persistente | `/mnt/data/log/messages` | Una vez que se configura el almacenamiento persistente en la pestaña Almacenamiento de la página [Sistema](../infrastructure/system.md#storage). El mismo flujo se escribe también ahí, sin el límite de 98 MB. |
| VictoriaLogs | se consulta por HTTP, no es un archivo común — vea abajo | Junto con la copia persistente: `rsyslogd` reenvía cada mensaje hacia él por UDP tan pronto como se configura el almacenamiento persistente, y mantiene un índice de 30 días en el mismo dispositivo de almacenamiento. |

Algunos servicios mantienen su propio estado aparte de esto, fuera del flujo de registros — por ejemplo,
`/mnt/data/dnsmasq/dhcp.leases` y, por instancia de VPN, una base de datos de seguimiento de conexiones en
`/mnt/data/openvpn/<instancia>/connections.db`. Son archivos de estado, no registros, pero vale la pena conocerlos
cuando el comportamiento de un servicio no coincide con lo que dice su registro.

## Seguir y buscar

```bash
tail -f /var/log/messages
grep openvpn /var/log/messages | tail -20
```

Si el almacenamiento persistente está configurado, `/mnt/data/log/messages` guarda el mismo flujo durante más
tiempo — compruebe primero `ls /mnt/data/log/` para confirmar que existe en esta unidad antes de confiar en él.

Para el prefijo de registro que realmente usa cada servicio, consulte la tabla en
[Referencia de comandos de servicios y registros](service-and-log-reference.md#services-by-feature).

## Consultar VictoriaLogs

Donde esté en ejecución, VictoriaLogs responde a consultas en el puerto 9428 usando su propio lenguaje de
consulta, LogsQL. Una palabra clave simple busca en el texto del mensaje:

```bash
curl -s 'http://127.0.0.1:9428/select/logsql/query' \
  --data-urlencode 'query=openvpn' \
  --data-urlencode 'limit=20'
```

Cada resultado es un objeto JSON con campos como `_msg`, `_time`, `app_name`, `hostname`, `level` y `severity`, lo
que facilita filtrar con más precisión de lo que permitiría un simple grep:

```bash
# solo este servicio
curl -s 'http://127.0.0.1:9428/select/logsql/query' --data-urlencode 'query=app_name:nethsecurity-api' --data-urlencode 'limit=20'

# solo errores, de todos los servicios
curl -s 'http://127.0.0.1:9428/select/logsql/query' --data-urlencode 'query=level:error' --data-urlencode 'limit=20'

# solo los últimos cinco minutos
curl -s 'http://127.0.0.1:9428/select/logsql/query' --data-urlencode 'query=_time:5m' --data-urlencode 'limit=50'
```

Si ese `curl` no devuelve nada o da "connection refused", VictoriaLogs no está en ejecución en esta unidad —
compruebe `/etc/init.d/victoria-logs status` y confirme que el almacenamiento persistente esté configurado, ya que
es eso lo que lo habilita.

## Qué llama la página Registros de la interfaz web

La página **Registros** de la interfaz web es una capa fina sobre una única llamada `ubus`, que puede usar
directamente — útil en un script, o cuando quiera el mismo comportamiento de búsqueda de la página sin abrir un
navegador:

```bash
ubus call ns.log get-log '{"search":"openvpn","limit":20}'
```

## Aumentar el nivel de detalle de un servicio específico

El volumen de registro predeterminado suele ser demasiado silencioso para depurar un problema específico. Cada
uno de estos aumenta el detalle de un servicio; vuelva a bajarlo en cuanto tenga lo que necesita — un rastreo
completo de IKE o el nivel máximo de verbosidad de OpenVPN produce mucha salida muy rápido, lo que acerca
`/var/log/messages` a su punto de rotación antes.

| Servicio | Cómo aumentar el detalle | Luego |
|---|---|---|
| OpenVPN | `uci set openvpn.<instancia>.verb='5'` (`0` silencioso a `11` muy detallado; `3` es el valor de fábrica) | `uci commit openvpn && /etc/init.d/openvpn restart` |
| dnsmasq (DNS/DHCP) | `uci set dhcp.@dnsmasq[0].logqueries='1'` para registrar cada consulta DNS, agregue `.logdhcp='1'` también para transacciones DHCP | `uci commit dhcp && /etc/init.d/dnsmasq restart` |
| IPsec (charon) | Edite `/etc/strongswan.d/charon-logging.conf` — aumente un subsistema específico (por ejemplo `ike = 2`) o `default` para todo | `/etc/init.d/ipsec restart` |
| nftables (firewall) | Agregue `log` a una regla (es exactamente lo que hace el interruptor de registro por regla de la interfaz web) para un registro persistente, o ejecute `nft monitor trace` para un rastreo de paquetes en vivo y sin filtrar | Los cambios de regla necesitan `/etc/init.d/firewall reload`; `monitor trace` se ejecuta de inmediato en primer plano |

La opción de registro de consultas DNS anterior es también lo que expone la propia configuración de DNS de la
interfaz web — `uci get dhcp.@dnsmasq[0].logqueries` es el mismo valor que lee y escribe el interruptor de
registro de consultas de la página [DNS y DHCP](../network/dns-dhcp.md).

## Páginas relacionadas

- [Referencia de comandos de servicios y registros](service-and-log-reference.md)
- [Herramientas de solución de problemas de red](network-troubleshooting-tools.md)
- [Línea de comandos y preguntas frecuentes](command-line-and-faq.md)
- [Sistema](../infrastructure/system.md)
- [Registros](../operation-analytics/logs.md)
