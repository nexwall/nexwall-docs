---
title: 'KBA-07: El control de aplicaciones no hace nada'
sidebar_position: 17
description: Por qué una regla de aplicación no bloquea ni limita el tráfico.
---

# KBA-07: El control de aplicaciones no hace nada

**Síntoma.** Una regla de aplicación está activa pero el tráfico sigue pasando.

Comprobaciones de solo lectura salvo que se indique. Los comandos se ejecutan como `root` por SSH, consola o terminal remota del controlador.

## Revise, en este orden

1. Confirme que el servicio está activo, la regla activa y los cambios aplicados (banner **Aplicar cambios**).
2. Verifique en los flujos en vivo que la aplicación se reconoce. Si aparece como **Desconocida**, no se puede bloquear.
3. Verifique que la regla está en la interfaz por donde pasa el tráfico.
4. Verifique que la dirección no esté en las excepciones.
5. Verifique que el servicio de clasificación esté corriendo:

   ```sh
   /etc/init.d/netifyd status
   ```


## ¿No se resolvió?

Servicio detenido o poca memoria: [KBA-16](kba-16-services.md) y [KBA-08](kba-08-slow.md).
