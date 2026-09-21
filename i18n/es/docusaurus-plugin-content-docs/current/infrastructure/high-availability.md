---
title: Alta disponibilidad
sidebar_position: 4
description: Ejecute dos unidades como un par, para que un fallo no interrumpa la red.
---

# Alta disponibilidad

Un par de alta disponibilidad (HA) usa dos unidades, una **primaria** y una **de respaldo**, que comparten una **dirección
IP virtual**. Si la primaria falla, la de respaldo asume esa dirección y la interfaz WAN en unos instantes, y la red sigue
funcionando.

En esta versión el HA se configura desde la línea de comandos con la herramienta `ns-ha-config`. El estado y los registros
también están disponibles allí.

## Requisitos

- Ambas unidades tienen los **mismos dispositivos de red**.
- Ambas están conectadas a la misma LAN.
- En la LAN solo se admiten **direcciones IPv4 estáticas**.

## Qué se admite

Las conexiones WAN pueden ser IPv4 o IPv6 estática, o IPv4 por DHCP, en interfaces físicas, bonds, puentes, VLAN (incluso
sobre bonds y puentes) y PPPoE (incluso sobre VLAN).

La configuración que se sincroniza con la unidad de respaldo incluye reglas de firewall y redirecciones de puertos, DHCP y
DNS, el servidor SSH, los servicios de VPN (OpenVPN, IPsec, WireGuard), rutas estáticas, QoS, SD-WAN, reglas de control de
aplicaciones, Threat Shield, el proxy inverso y los certificados, bases de datos de usuarios, ajustes de NAT, ajustes de
copia de seguridad, la conexión con un controlador y el portal cautivo.

El estado de las conexiones activas también se sincroniza, de modo que la mayoría de las sesiones sobreviven a un cambio.

## Límites

- No se admiten paquetes adicionales que no formen parte de la imagen estándar.
- La configuración del servidor de registros no se sincroniza. Use un controlador para conservar los registros de ambas
  unidades.
- Tras la primera sincronización, la unidad de respaldo tiene el mismo nombre de host que la primaria.
- El portal cautivo funciona solo en interfaces físicas. Las sesiones activas de los invitados están en memoria y se pierden
  cuando las unidades cambian de función, así que los invitados pueden tener que iniciar sesión de nuevo.

## Configuración

El ejemplo usa `192.168.100.238` para la primaria, `192.168.100.239` para la de respaldo y `192.168.100.240/24` como
dirección virtual.

1. Encienda la **de respaldo** y dé a su LAN una dirección estática. Después haga lo mismo en la **primaria**. Estas
   direcciones llegan a cada unidad directamente, incluso con el clúster apagado.
2. En la primaria, compruebe los requisitos:

   ```bash
   ns-ha-config check-primary-node lan
   ```

   Si la primaria ejecuta un servidor DHCP, la opción de puerta de enlace debe ser la dirección virtual, y debe definirse un
   servidor DNS al que los clientes puedan llegar aunque la primaria esté caída.
3. Compruebe la de respaldo desde la primaria:

   ```bash
   ns-ha-config check-backup-node 192.168.100.239 lan
   ```

4. Inicialice la primaria y después la de respaldo:

   ```bash
   ns-ha-config init-primary-node 192.168.100.238 192.168.100.239 192.168.100.240/24 lan
   ns-ha-config init-backup-node lan
   ```

La configuración prepara el tráfico de HA en la LAN, la dirección virtual con una contraseña aleatoria y un canal SSH en el
puerto 65022 que se usa solo para sincronizar datos con autenticación por clave.

A partir de ahí, configure la primaria. Sus cambios se sincronizan con la de respaldo, salvo la configuración de red de la
LAN.

## Operar el par

| Tarea | Comando |
|---|---|
| Comprobar el estado | `ns-ha-config status` |
| Mostrar la configuración | `ns-ha-config show-config` |
| Añadir o quitar una interfaz LAN | `ns-ha-config add-lan-interface` y `ns-ha-config remove-interface` |
| Añadir o quitar una dirección virtual | `ns-ha-config add-vip` y `ns-ha-config remove-vip` |
| Abrir una shell en la de respaldo | `ns-ha-config ssh-remote` |
| Actualizar la de respaldo | `ns-ha-config upgrade-remote` |
| Desactivar o activar el clúster | `ns-ha-config disable` y `ns-ha-config enable` |
| Eliminar la configuración | `ns-ha-config reset` |

Pruebe una conmutación por error antes de fiarse del par, apagando la primaria y comprobando que el tráfico continúa.

## Páginas relacionadas

- [Copia de seguridad y recuperación](backup-recovery.md)
- [Línea de comandos y preguntas frecuentes](../help/command-line-and-faq.md)
