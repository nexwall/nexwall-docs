---
title: Inicio rápido
sidebar_position: 2
description: De una unidad recién instalada a un firewall funcionando y protegido.
---

# Inicio rápido

Esta página lleva una unidad recién instalada a un firewall protegido que reenvía tráfico. Supone que ya escribió la
imagen en un disco o creó una máquina virtual; si no, comience por
[Instalación](../installation/requirements-and-images.md).

## Antes de empezar

- Un equipo conectado a la interfaz de red **LAN** de la unidad. Asígnele una dirección en `192.168.1.0/24` (por ejemplo
  `192.168.1.10`) si no la obtiene automáticamente.
- La interfaz **WAN** conectada a su conexión de internet.
- Las credenciales predeterminadas: usuario `root`, contraseña `Nexwall,1234`.

:::warning Cambie la contraseña predeterminada de inmediato
La contraseña predeterminada es pública. El asistente de configuración le pide que la reemplace, y debe hacerlo antes de
conectar la unidad a una red no confiable.
:::

## 1. Abra la interfaz web

Abra `https://192.168.1.1` en un navegador. La unidad usa al principio un certificado autofirmado, por lo que el navegador
muestra una advertencia; acéptela para continuar. Puede reemplazar el certificado más tarde, vea
[Certificados](../infrastructure/certificates.md).

Inicie sesión como `root`.

## 2. Ejecute el asistente de configuración

En el primer inicio de sesión, un asistente le guía por una base segura. Se recomienda hacerlo mientras la unidad todavía
no está conectada a internet.

1. Elija **Seguro por defecto** para aplicar la configuración recomendada, o la ruta personalizada para decidir cada paso
   usted mismo.
2. **Cambie la contraseña de root.** Use al menos 8 caracteres con mayúsculas y minúsculas, un número y un carácter
   especial. Se recomiendan catorce o más caracteres.
3. **Configure el acceso SSH.** Puede permitir SSH desde la LAN y desde la WAN, elegir el puerto TCP y desactivar el inicio
   de sesión con contraseña para el usuario root. Si desactiva el inicio de sesión con contraseña, debe cargar una clave
   pública SSH; de lo contrario se queda sin acceso por SSH.
4. **Configure el acceso a la interfaz web.** Elija desde qué redes se puede acceder a la interfaz web y si la WAN puede
   acceder a ella.
5. Revise el resumen y finalice. El asistente aplica todo y recarga la interfaz.

## 3. Compruebe la red

Abra **Red > Interfaces**. Confirme que:

- la interfaz LAN tiene la dirección que espera y pertenece a la zona `lan`;
- la interfaz WAN tiene una dirección de su proveedor (DHCP), o configure una dirección estática o PPPoE si su proveedor
  lo requiere.

Vea [Interfaces y enrutamiento](../network/interfaces-routing.md) para conocer las opciones.

## 4. Compruebe el DNS y el DHCP

Abra **Red > DNS y DHCP**. La interfaz LAN entrega direcciones a sus clientes de forma predeterminada. Si su WAN usa una
dirección estática, configure al menos un reenviador de DNS; de lo contrario falla la resolución de nombres. El panel le
avisa de ello.

## 5. Dé nombre a la unidad

El nombre de host predeterminado es `Nexwall`. Defina uno significativo en **Infraestructura > Sistema**, en la pestaña
General. El panel se lo recuerda hasta que lo haga.

## 6. Aplique y verifique

Los cambios que realiza en la mayoría de las páginas quedan pendientes primero. Use **Aplicar cambios** en el aviso que
aparece para activarlos. Desde un cliente de la LAN, verifique que puede navegar por internet y que
**Operación y Analítica > Panel** muestra la conexión de internet como activa.

## Próximos pasos

- Comprenda cómo funcionan las reglas y las zonas: [Zonas y políticas](../policy/zones-policies.md) y
  [Reglas de firewall](../policy/firewall-rules.md).
- Active la protección: [Servicios de Seguridad](../security-services/ips.md).
- Haga una primera copia de seguridad: [Copia de seguridad y recuperación](../infrastructure/backup-recovery.md).
