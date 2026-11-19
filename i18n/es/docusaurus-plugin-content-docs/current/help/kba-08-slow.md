---
title: 'KBA-08: La unidad está lenta o con poca memoria'
sidebar_position: 18
description: Encuentre qué función cuesta más y si el disco o la memoria son la causa.
---

# KBA-08: La unidad está lenta o con poca memoria

**Síntoma.** Interfaz web lenta, latencia alta a través del firewall o servicios que se reinician.

Comprobaciones de solo lectura salvo que se indique. Los comandos se ejecutan como `root` por SSH, consola o terminal remota del controlador.

## Revise, en este orden

1. Mire la carga y la memoria en [Rendimiento](../operation-analytics/performance.md), o en la unidad:

   ```sh
   uptime; free -m | head -2; df -h / | tail -1; conntrack -C
   ```

2. Desactive una a una las funciones de inspección recientes (IPS, luego control de aplicaciones) para hallar la más costosa.
3. Use bypass y excepciones para tráfico confiable de alto volumen.
4. Verifique que el disco no esté lleno (la línea `df` de arriba y las alertas).

## ¿No se resolvió?

Memoria casi agotada: [KBA-16](kba-16-services.md#9-la-poca-memoria-es-una-causa-oculta-frecuente). Conntrack cerca del máximo: ubique al cliente en [Conexiones](../operation-analytics/monitor-connections.md).
