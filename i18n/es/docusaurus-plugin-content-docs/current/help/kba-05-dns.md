---
title: 'KBA-05: Los nombres no resuelven'
sidebar_position: 15
description: 'Comprobaciones rápidas de DNS: clientes, reenviadores, filtro DNS y bypass.'
---

# KBA-05: Los nombres no resuelven

**Síntoma.** Los sitios abren por IP pero no por nombre, o solo fallan algunos nombres.

Comprobaciones de solo lectura salvo que se indique. Los comandos se ejecutan como `root` por SSH, consola o terminal remota del controlador.

## Revise, en este orden

1. Confirme que los clientes usan la unidad como servidor DNS, o uno que funcione.
2. Consulte el resolvedor de la unidad y luego uno público, y compare:

   ```sh
   dig +short @127.0.0.1 example.com
   dig +short @8.8.8.8 example.com
   ```

3. Revise los reenviadores en **Red > DNS y DHCP**.
4. Si el filtro DNS está activo, vea si el nombre está en una lista de bloqueo y agréguelo a los dominios permitidos si no debe bloquearse.
5. Verifique que un dispositivo con DNS cifrado propio no esté evitando la unidad.

## ¿No se resolvió?

Falla la unidad y funciona el público: el problema es el upstream o el resolvedor, vea [KBA-15: DNS en profundidad](kba-15-dns-deep-dive.md).
