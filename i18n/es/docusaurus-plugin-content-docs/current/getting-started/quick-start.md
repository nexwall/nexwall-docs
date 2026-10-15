---
title: Inicio rápido
sidebar_position: 2
description: De una unidad recién instalada a un firewall funcionando y protegido.
---

# Inicio rápido

Esta página lleva una unidad recién instalada a un firewall protegido que reenvía tráfico. Supone que ya escribió la imagen
en un disco o creó una máquina virtual; si no, empiece por
[Instalación](../installation/requirements-and-images.md).

![El asistente de configuración](/img/docs/wizard-en.png)

## Antes de empezar

- Un ordenador conectado a la interfaz de red **LAN** de la unidad. La unidad entrega direcciones a sus clientes de la LAN por defecto
  (DHCP), así que el ordenador normalmente recibe una por sí mismo. Si no, asígnele una dirección en
  `192.168.1.0/24` (por ejemplo `192.168.1.10`).
- La interfaz **WAN** conectada a su acceso a internet. En una unidad nueva el segundo puerto de red (`eth1`) es la WAN y pide
  una dirección a su proveedor (DHCP) por sí solo, incluso antes de ejecutar el asistente.
- Las credenciales por defecto: usuario `root`, contraseña `nexwall`.

:::warning Cambie la contraseña por defecto de inmediato
La contraseña por defecto es pública. El asistente de configuración le pide reemplazarla, y debe hacerlo antes de conectar la
unidad a una red no confiable.
:::

## Lo que la unidad ya hace por sí sola

Aunque nunca ejecute el asistente, el primer arranque aplica una sola vez los **valores seguros por defecto**: la Protección de red (IPS), el filtro
DNS, la protección de IP y países, y el perfil **Estándar** de Control de aplicaciones con sus reglas de Web Protection (y el
antivirus, cuando su licencia lo incluye y la unidad tiene almacenamiento de datos). La LAN ofrece DHCP (direcciones `192.168.1.100` a
`192.168.1.249`) y DNS, con el propio firewall (`192.168.1.1`) como puerta de enlace y servidor DNS de los clientes. El asistente
permite cambiar estas opciones.

## 1. Abra la interfaz web

Abra `https://192.168.1.1` en un navegador. La unidad usa al principio un certificado autofirmado, así que el navegador muestra una
advertencia; acéptela para continuar. Puede reemplazar el certificado más tarde, vea
[Certificados](../infrastructure/certificates.md).

Inicie sesión como `root`.

## 2. Ejecute el asistente de configuración

En el primer inicio de sesión un asistente le guía por una base segura. Mantenga la unidad conectada a internet durante la configuración, porque las
listas de protección se descargan entonces.

1. Elija **Seguro por defecto** para aplicar los ajustes recomendados, o la ruta personalizada para decidir cada paso
   usted mismo.
2. **Cambie la contraseña de root.** Use al menos 8 caracteres con mayúsculas y minúsculas, un número y un
   carácter especial. Se recomiendan catorce o más caracteres.
3. **Red.** Elija el nombre del firewall (`FIREWALL` es el predeterminado y un buen nombre si tiene una sola unidad) y cómo se conecta
   a internet: automático (DHCP), una dirección IP fija o PPPoE.
4. **Acceso SSH.** Puede permitir SSH desde la LAN y desde la WAN, elegir el puerto TCP y desactivar
   el inicio de sesión con contraseña para root. Si lo desactiva debe subir una clave pública SSH; de lo contrario
   se queda sin acceso SSH.
5. **Acceso a la interfaz web** en los puertos TCP 9090 y 443. Elija desde qué redes se puede acceder a la interfaz web y si la WAN
   puede hacerlo.
6. **Servicios de seguridad.** La Protección de red (IPS), el Filtrado DNS y el Bloqueo de IP y geografía están activos por defecto; desactive lo que no
   quiera y elija los países a bloquear.
7. **Perfil de Control de aplicaciones.** Elija **Estándar**, **Escuela** o **Restringido**. La elección crea las reglas de aplicaciones y las de
   Web Protection (categorías de sitios, antivirus, SafeSearch y el perfil de filtro de contenido). Vea
   [Protección web](../security-services/web-protection.md).
8. Revise el resumen y termine. El asistente aplica todo y recarga la interfaz.

## 3. Compruebe la red

Abra **Red > Interfaces**. Confirme que:

- la interfaz LAN tiene la dirección que espera y pertenece a la zona `lan`;
- la interfaz WAN tiene una dirección de su proveedor (DHCP), o configure una dirección estática o PPPoE si su proveedor
  lo requiere.

Vea [Interfaces y enrutamiento](../network/interfaces-routing.md) para las opciones.

## 4. Compruebe DNS y DHCP

Abra **Red > DNS y DHCP**. La interfaz LAN entrega direcciones y DNS a sus clientes por defecto. Si su WAN usa una dirección
estática, asegúrese de que haya al menos un reenviador DNS configurado; de lo contrario la resolución de nombres falla. El panel
se lo advierte.

## 5. Dele su propio nombre a la unidad

El nombre de equipo por defecto es `FIREWALL`. Si usa varias unidades, ponga un nombre distinto en **Administración > Sistema**, pestaña General.
El panel se lo recuerda mientras la unidad conserve su nombre de fábrica.

## 6. Aplique y verifique

Los cambios que hace en la mayoría de las páginas quedan primero en espera. Use **Aplicar cambios** en el aviso que aparece para activarlos.
Desde un cliente de la LAN, verifique que puede navegar por internet y que
**Operación y Analítica > Panel** muestra la conexión a internet como activa.

## Siguientes pasos

- Entienda cómo funcionan las reglas y las zonas: [Zonas y políticas](../policy/zones-policies.md) y
  [Reglas de firewall](../policy/firewall-rules.md).
- Active la protección: [Servicios de seguridad](../security-services/ips.md) y [Protección web](../security-services/web-protection.md).
- Haga una primera copia de seguridad: [Copia de seguridad y recuperación](../infrastructure/backup-recovery.md).
