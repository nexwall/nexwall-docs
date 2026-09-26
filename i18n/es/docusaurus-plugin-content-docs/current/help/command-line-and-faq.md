---
title: Línea de comandos y preguntas frecuentes
sidebar_position: 2
description: Comandos útiles por SSH, dónde está cada cosa y preguntas frecuentes.
---

# Línea de comandos y preguntas frecuentes

## Acceder a la línea de comandos

Use SSH con el usuario `root`, o la consola de la máquina virtual o del hardware. Los ajustes de SSH están en
**Infraestructura > Sistema**, en la pestaña SSH. Inicie sesión con una clave si desactivó el inicio de sesión con
contraseña.

El sistema está basado en OpenWrt, así que sus herramientas son las de ese ecosistema.

## La configuración

La configuración reside en archivos de texto plano en `/etc/config`, gestionados con la herramienta `uci`.

```bash
uci show network            # todo sobre la red
uci show firewall           # zonas, reglas, redirecciones
uci get system.@system[0].hostname
uci changes                 # lo que está pendiente
```

La interfaz web escribe en los mismos archivos. Los cambios que haga desde la línea de comandos con `uci set` deben
guardarse con `uci commit <configuración>`, y el servicio afectado debe recargarse.

## Comandos de uso diario

| Objetivo | Comando |
|---|---|
| Leer el registro | `logread`, y `logread -f` para seguirlo |
| Reiniciar un servicio | `/etc/init.d/<servicio> restart` |
| Listar los servicios | `ls /etc/init.d` |
| Direcciones de las interfaces | `ip -4 addr`, `ip -6 addr` |
| Rutas | `ip route` |
| Estado de la interfaz | `ifstatus wan` e `ifstatus lan` |
| Reglas de firewall tal como están cargadas | `nft list ruleset` |
| Seguimiento de conexiones | `conntrack -L` |
| Probar internet | `ping -c 3 1.1.1.1`, después `ping -c 3 example.com` |
| Versión | `cat /etc/os-release` |
| Disco y memoria libres | `df -h`, `free -m` |

Reiniciar "un servicio" significa el correcto para lo que está resolviendo, no siempre el mismo. Vea la
[Referencia de comandos de servicios y registros](service-and-log-reference.md) para saber qué servicio sostiene
cada función de la interfaz web, y qué buscar en su registro. Casi todo lo que puede cambiar también vive en un archivo de configuración UCI, que es lo que hace
que la interfaz web, la API y la línea de comandos siempre coincidan — vea
[Qué es UCI, y por qué importa](understanding-uci.md).

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Configuración | `/etc/config/` |
| Scripts de arranque | `/etc/init.d/` |
| Certificados del servidor web | se gestionan en **Infraestructura > Certificados** |
| Datos de clasificación de tráfico | `/etc/netifyd/` |
| Registro del sistema | en memoria, se lee con `logread` |

## Preguntas frecuentes

**¿Cuál es la dirección y la contraseña predeterminadas?**
La LAN responde en `192.168.1.1`. El usuario es `root` y la contraseña es `Nexwall,1234`. Cámbiela en el primer inicio de
sesión.

**¿Puedo ejecutarlo en una máquina virtual?**
Sí. Use firmware UEFI, asígnele al menos dos adaptadores de red y 4 GB de memoria. Vea
[Instalar en una máquina virtual o en hardware](../installation/install-vm-and-hardware.md).

**¿Por qué no está activo mi cambio?**
La mayoría de los cambios quedan pendientes. Use **Aplicar cambios** en el aviso. Vea
[Uso de la interfaz web](../getting-started/web-interface.md).

**Perdí los cambios que hice antes de un reinicio.**
Los cambios pendientes que no se aplicaron se pierden cuando la unidad se reinicia. Los cambios aplicados se conservan.

**¿Funciona sin suscripción?**
Sí. El firewall, las VPN, el sistema de prevención de intrusiones, las listas gratuitas de Threat Shield y el catálogo base
de aplicaciones funcionan sin ella. Una suscripción añade las funciones enumeradas en
[Licencias y cuenta](../administration/licensing-account.md).

**¿Adónde se envían mis datos?**
A ninguna parte, salvo que active una función que lo necesite. La Analítica de Tráfico envía metadatos de tráfico cuando la
activa, y una unidad conectada a un controlador envía sus registros y métricas a ese controlador.

**¿Cómo traslado una configuración a otra unidad?**
Haga una copia de seguridad y restáurela en la unidad nueva. Vea
[Copia de seguridad y recuperación](../infrastructure/backup-recovery.md).

**¿Cómo conecto muchas sedes?**
Use [túneles sitio a sitio](../vpn/site-to-site-tunnels.md) o [WireGuard](../vpn/wireguard.md) y gestione las unidades con la
[gestión central](../administration/central-management.md).

**¿Cómo vuelvo a un estado conocido?**
Use la pestaña **Restablecimiento de fábrica** y restaure una copia de seguridad después.
