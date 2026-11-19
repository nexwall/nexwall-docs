---
title: "KBA-17: Recoger un paquete de soporte"
sidebar_position: 24
description: Cree un archivo con el estado y los logs recientes de la unidad, sin contraseñas ni claves, para adjuntar a una solicitud de soporte.
---

# KBA-17: Recoger un paquete de soporte

**Síntoma.** Soporte pidió "logs" o "diagnóstico", o quiere guardar evidencia de un problema antes de cambiar algo.

**Aplica a.** Nexwall Firewall 26.2.1. Solo lectura.

## 1. Cree el paquete

Pegue el bloque como `root`. Genera `/tmp/support-<fecha>-<hora>.tgz` con estado del sistema, enlaces, rutas, lista de servicios, estado del controlador, las últimas 1000 líneas de log y la configuración sin ninguna línea que mencione password, secret, key, psk o token.

```sh
D=/tmp/support-$(date +%Y%m%d-%H%M); mkdir -p $D
{ date; uptime; cat /etc/os-release; } > $D/system.txt
df -h > $D/disk.txt; free -m > $D/memory.txt
ip -br a > $D/links.txt; ip route > $D/routes.txt
ubus call service list > $D/services.json
ubus call ns.plug status > $D/controller.txt
tail -n 1000 /var/log/messages > $D/messages.txt
uci show 2>/dev/null | grep -viE 'password|secret|key|psk|token|passwd' > $D/config.txt
tar czf $D.tgz -C /tmp $(basename $D); ls -l $D.tgz
```

## 2. Cópielo

Desde su computadora (cambie la dirección del firewall y el nombre del archivo):

```sh
scp root@<firewall-ip>:/tmp/support-YYYYMMDD-HHMM.tgz .
```

## 3. Revise antes de enviar

El filtro es conservador pero no perfecto. Abra `messages.txt` y `config.txt` y quite lo que no quiera compartir (IP públicas, usuarios, nombres de host). No envíe el archivo por canales públicos; use el ticket de soporte.

## 4. Limpie

El paquete queda en `/tmp` y se borra al reiniciar, pero puede eliminarlo ya:

```sh
rm -rf /tmp/support-*
```

## Relacionado

[KBA-01 chequeo de salud](kba-01-health-check.md), [KBA-16 servicios](kba-16-services.md), [Logs y depuración](cli-logs-and-debugging.md).
