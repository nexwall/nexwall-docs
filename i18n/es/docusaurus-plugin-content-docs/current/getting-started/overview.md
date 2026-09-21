---
title: Visión general
sidebar_position: 1
description: Qué es Nexwall Firewall y qué puede hacer.
---

# Visión general

Nexwall Firewall es un dispositivo de seguridad de red para organizaciones y para los proveedores de servicios que se
ocupan de ellas. Se ejecuta como una imagen de disco lista para usar en hardware x86 común o en una máquina virtual, y se
administra desde una interfaz web. Por debajo está construido sobre OpenWrt, una distribución Linux madura diseñada para
dispositivos de red, y sobre componentes de código abierto conocidos como nftables, Snort, OpenVPN, strongSwan y
WireGuard.

## Qué hace

| Área | Qué puede hacer |
|---|---|
| Filtrado | Controlar el tráfico entre redes con reglas basadas en zonas, NAT y redirección de puertos |
| Protección | Bloquear aplicaciones, detener intrusiones, filtrar dominios maliciosos y bloquear direcciones hostiles o países enteros |
| Conectividad | Usar varios enlaces de internet con conmutación por error y balanceo, controlar el ancho de banda y ejecutar DHCP y DNS |
| Acceso remoto y sedes | Ofrecer acceso remoto seguro a los usuarios y conectar oficinas con túneles sitio a sitio |
| Visibilidad | Ver conexiones en tiempo real, estadísticas de tráfico, gráficos de rendimiento y registros |
| Operación | Hacer copias de seguridad, actualizar y restaurar unidades, mantenerlas en alta disponibilidad y gestionar muchas desde un solo lugar |

## Cómo está organizada la documentación

La guía de administración sigue el menú de la interfaz web, de modo que puede encontrar una página buscando la entrada de
menú que está usando:

- **Primeros pasos** e **Instalación** explican lo que necesita para poner una unidad en servicio.
- **Operación y Analítica** cubre el panel, el tráfico en tiempo real, el rendimiento y los registros.
- **Políticas** cubre reglas, NAT, zonas y objetos.
- **Servicios de Seguridad** cubre el control de aplicaciones, el sistema de prevención de intrusiones, el filtrado de DNS
  y el bloqueo de IP o de países.
- **Red**, **VPN**, **Acceso e Identidad**, **Infraestructura** y **Administración** cubren el resto del menú.
- **Ayuda** reúne pasos de solución de problemas organizados por síntoma y una referencia de la línea de comandos.

:::tip Empiece aquí
Si está configurando una unidad por primera vez, lea a continuación [Inicio rápido](quick-start.md). Si quiere entender
los términos que se usan en el resto de la guía, lea [Conceptos](concepts.md).
:::

## Ediciones y funciones

Algunas funciones dependen de una suscripción, por ejemplo el catálogo mayor de aplicaciones, las copias de seguridad
cifradas en la nube y las listas avanzadas de Threat Shield. Cuando una página describe una función así, lo indica. Vea
[Licencias y cuenta](../administration/licensing-account.md) para saber cómo se activa una suscripción.
