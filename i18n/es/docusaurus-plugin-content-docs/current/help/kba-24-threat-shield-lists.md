---
title: 'KBA-0024: Threat Shield: de dónde vienen las listas y cuánto cuestan'
sidebar_position: 34
description: 'Qué son las listas de bloqueo, cómo se entregan y verifican, y cuánta memoria necesita cada categoría.'
---

# KBA-0024: Threat Shield: de dónde vienen las listas y cuánto cuestan

**Aplica a.** Nexwall Firewall 26.2.1.

## Qué es

Threat Shield bloquea dos tipos de cosas con listas que Nexwall construye cada día en su propio servidor a partir de fuentes abiertas verificadas:

- **Dominios** (filtrado DNS): el servidor DNS del propio firewall (dnsmasq, mediante adblock) responde "no encontrado" para un dominio listado y todos sus subdominios. Categorías: malware, phishing, ransomware, estafas y fraude, minería de cripto, elusión por DoH/VPN/Tor/proxy, adultos, apuestas, piratería, drogas, publicidad y rastreo, y un conjunto ampliado de malware.
- **Direcciones IP** (bloqueo de IP): banIP descarta el tráfico desde y hacia las direcciones listadas. Categorías: comando y control de botnets, atacantes conocidos.

No interviene ningún servicio DNS en la nube: las listas son archivos en el firewall y el DNS sigue siendo local. Las listas se entregan por el servicio de licencias (prueba o suscripción), firmadas y verificadas en el firewall antes de usarse. Sin licencia no se entregan listas de Nexwall.

## Cómo funciona

1. Cada 30 minutos (con retraso aleatorio) `nexwall-threat-feeds sync` pide al servidor de licencias el catálogo firmado del paquete actual.
2. Verifica la firma y luego descarga **solo las categorías activadas**, comprobando el tamaño y el SHA-256 de cada archivo (comprimido y plano).
3. adblock y banIP leen las listas como archivos locales (`file:///mnt/data/threat-feeds/<version>/dns-<categoria>.txt`). Se recargan solo cuando algo cambió, no por temporizador.
4. Si el servicio de licencias no responde, las listas del firewall se mantienen. Si la licencia termina, las listas se retiran una vez.

Primer arranque: **todas** las categorías se activan (cada lista de direcciones y cada categoría de dominios), pero solo donde aún no se eligió nada y solo cuando las listas de dominios ocupan como máximo una cuarta parte de la memoria instalada (75 bytes por dominio; el catálogo completo son unos 3,3 millones de dominios, 250 MB, así que una unidad con cerca de 1 GiB o más califica). Una unidad más pequeña recibe solo las categorías marcadas como predeterminadas (malware, phishing, ransomware, estafas, C2 de botnets, atacantes conocidos). El asistente de configuración también activa los servicios. Las páginas Filtrado DNS y Bloqueo de IP y geo tienen un interruptor **Activar todo** que maneja las listas de Nexwall (las listas de terceros de banIP no se tocan). Las elecciones hechas con versiones anteriores se conservan (adultos, apuestas, piratería, elusión por DoH/VPN, malware, listas de privacidad).

## Memoria y velocidad

Las listas DNS cuestan cerca de **75 bytes por dominio** en dnsmasq (medido: 1,8 millones de dominios = 134 MB). Planifique antes de activar categorías grandes:

| Categoría | Entradas (2026-10) | Aprox. |
|---|---|---|
| Malware (núcleo) | 195.000 | 15 MB |
| Phishing | 486.000 | 36 MB |
| Estafas y fraude | 186.000 | 14 MB |
| Ransomware, minería de cripto, drogas, elusión, piratería | 2.000 a 54.000 cada una | 0,2 a 4 MB |
| Apuestas | 226.000 | 17 MB |
| Publicidad y rastreo | 408.000 | 31 MB |
| Adultos | 953.000 | 71 MB |
| Malware (ampliado, incluye el núcleo) | 735.000 | 55 MB |

El conjunto predeterminado son unos 870.000 dominios (65 MB). Todo junto son unos 3,3 millones de dominios (250 MB), 12 % de una unidad de 2 GiB: la advertencia de memoria de la página DNS (20 % / 35 % de la memoria instalada) indica cuándo las listas activas son demasiadas. Recargar dnsmasq con una lista grande interrumpe el DNS unos segundos (cerca de 10 segundos con 1,8 millones de dominios); por eso las recargas ocurren solo cuando las listas cambian (normalmente una vez al día).

## Bloqueo geográfico y la advertencia de memoria

Los bloqueos por país (feed `country` de banIP) vienen del mismo paquete firmado: `nexwall-threat-feeds status` lista `country_v4` y `country_v6`, y los archivos están en `/mnt/data/threat-feeds/<paquete>/geo/`. Los datos son de asignación de registros, así que algunas direcciones pueden estar en un país distinto al de sus usuarios. Sin licencia banIP mantiene su propia descarga. En la página de listas de bloqueo DNS aparece una advertencia cuando las listas activas necesitan más de una quinta parte de la memoria instalada, y un error por encima de un tercio; apague categorías grandes o añada memoria.
