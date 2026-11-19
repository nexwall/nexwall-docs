---
title: 'KBA-04: Un sitio o servicio está bloqueado o inaccesible'
sidebar_position: 14
description: Encuentre la regla, lista o función de inspección que bloquea un destino o un servicio publicado.
---

# KBA-04: Un sitio o servicio está bloqueado o inaccesible

**Síntoma.** Un destino no abre, o un servicio publicado no es accesible desde fuera.

Comprobaciones de solo lectura salvo que se indique. Los comandos se ejecutan como `root` por SSH, consola o terminal remota del controlador.

## Revise, en este orden

1. Active el registro en la regla o la zona y mire los [Logs](../operation-analytics/logs.md).
2. Revise el orden de las reglas: gana la primera coincidencia.
3. Para un servicio publicado, confirme el reenvío de puerto, el destino y que la política de zona permita el tráfico.
4. Si el [bloqueo de IP y geo](../security-services/ip-geo-blocking.md) está activo, verifique si la dirección está en una lista o en un país bloqueado. Agréguela a la lista de permitidos si debe ser accesible.
5. Si el [IPS](../security-services/ips.md) está activo, mire sus eventos de tráfico bloqueado.
6. Pruebe el puerto desde el firewall:

   ```sh
   nc -zv -w3 <ip-destino> 443
   ```


## ¿No se resolvió?

Puerto cerrado o timeout también desde el firewall: [KBA-14](kba-14-connectivity.md) (MTU, paquetes). Funciona por IP pero no por nombre: [KBA-05](kba-05-dns.md).
