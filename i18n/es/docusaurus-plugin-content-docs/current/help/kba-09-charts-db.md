---
title: 'KBA-0009: Los gráficos indican que la base de datos no responde'
sidebar_position: 19
description: Reinicie el servicio de métricas cuando los gráficos siguen vacíos.
---

# KBA-0009: Los gráficos indican que la base de datos no responde

**Síntoma.** Los gráficos del panel y analítica muestran que la base de datos no es accesible.

Comprobaciones de solo lectura salvo que se indique. Los comandos se ejecutan como `root` por SSH, consola o terminal remota del controlador.

## Revise, en este orden

1. Revise el servicio de métricas:
2. Si está detenido, inícielo; si corre, reinícielo:

   ```sh
   /etc/init.d/victoria-metrics status
   /etc/init.d/victoria-metrics restart
   ```

3. Espere un minuto y recargue los gráficos.

## ¿No se resolvió?

Siguen vacíos: revise disco y memoria libres ([KBA-0008](kba-08-slow.md)) y lea el log ([Logs y depuración](cli-logs-and-debugging.md)).
