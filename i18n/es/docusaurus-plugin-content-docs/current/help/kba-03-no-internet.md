---
title: 'KBA-03: La LAN no tiene internet'
sidebar_position: 13
description: Encuentre por qué los clientes LAN no llegan a internet, desde el enlace WAN hasta NAT y política.
---

# KBA-03: La LAN no tiene internet

**Síntoma.** Los clientes LAN no navegan; el propio firewall puede tener o no internet.

Comprobaciones de solo lectura salvo que se indique. Los comandos se ejecutan como `root` por SSH, consola o terminal remota del controlador.

## Revise, en este orden

1. Abra **Operación y analítica > Panel** y mire la tarjeta de conexión a internet.
2. ¿El propio firewall tiene internet? En la unidad:

   ```sh
   ip route | grep default
   ping -c2 -W2 8.8.8.8
   dig +short +time=3 +tries=1 nexwall.com.br
   ```

3. En **Red > Interfaces**, verifique que la WAN tenga dirección, gateway y DNS. Con WAN estática, se requiere al menos un reenviador DNS en **Red > DNS y DHCP**.
4. Verifique que exista una regla de masquerade para la LAN en **Política > NAT**.
5. Verifique la política LAN a WAN en **Política > Zonas y políticas** y las reglas en **Política > Reglas de firewall**.
6. Con varios enlaces WAN, revise los hosts de seguimiento en **Red > SD-WAN**: si ninguno responde, el enlace se considera caído.
7. Use [Conexiones](../operation-analytics/monitor-connections.md) para ver si se crean conexiones.

## ¿No se resolvió?

Firewall bien pero un cliente falla: [KBA-04](kba-04-site-unreachable.md). La IP funciona pero los nombres no: [KBA-05](kba-05-dns.md). Pruebas de paquetes y MTU: [KBA-14](kba-14-connectivity.md).
