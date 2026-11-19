---
title: 'KBA-10: Las actualizaciones fallan'
sidebar_position: 20
description: Lea el error de actualización y revise suscripción, conectividad y hora.
---

# KBA-10: Las actualizaciones fallan

**Síntoma.** Una actualización o descarga de listas falla.

Comprobaciones de solo lectura salvo que se indique. Los comandos se ejecutan como `root` por SSH, consola o terminal remota del controlador.

## Revise, en este orden

1. Lea el mensaje: indica si el servidor está en mantenimiento, la suscripción no es válida o la dirección del repositorio no está definida.
2. Verifique internet, DNS y el reloj:

   ```sh
   date
   ping -c2 -W2 8.8.8.8
   dig +short +time=3 +tries=1 nexwall.com.br
   ```

3. Haga respaldo antes de reintentar. Vea [Sistema](../infrastructure/system.md).

## ¿No se resolvió?

Falla internet o DNS: [KBA-03](kba-03-no-internet.md) o [KBA-05](kba-05-dns.md). Nada lo explica: [KBA-17](kba-17-support-package.md).
