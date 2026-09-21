---
title: Uso de la interfaz web
sidebar_position: 3
description: Navegación, cambios pendientes, pestañas, idioma y tema.
---

# Uso de la interfaz web

## El menú

El menú de la izquierda está organizado en secciones. Todas las secciones permanecen siempre expandidas, por lo que cada
página está a un clic de distancia.

| Sección | Contiene |
|---|---|
| Operación y Analítica | Panel, Monitorización, Analítica de Tráfico, Conexiones, Rendimiento, Registros |
| Políticas | Reglas de Firewall, NAT, Redirección de Puertos, Zonas y Políticas, Objetos |
| Servicios de Seguridad | DPI, IPS / IDS, Filtrado de DNS, Bloqueo de IP y Geolocalización |
| Red | Interfaces, Enrutamiento, SD-WAN, DNS y DHCP, QoS, Proxy Inverso |
| VPN | Acceso Remoto (OpenVPN), OpenVPN Sitio a Sitio, IPsec Sitio a Sitio, WireGuard |
| Acceso e Identidad | Usuarios y Grupos, Portal Cautivo |
| Infraestructura | Copia de Seguridad y Recuperación, Sistema, Certificados, Reiniciar y Apagar |
| Administración | Gestión Central, Licencias |

Los ajustes relacionados se agrupan como pestañas de una misma página. **Sistema** tiene las pestañas General,
Sincronización de hora, SSH, Actualizaciones y Almacenamiento, y **Copia de Seguridad y Recuperación** tiene Copia de
seguridad, Restauración, Migración y Restablecimiento de fábrica. Los marcadores antiguos siguen funcionando: redirigen a
la pestaña correcta.

## Pestañas

Muchas páginas tienen pestañas en la parte superior; por ejemplo, **Reglas de Firewall** tiene reglas de Reenvío, de
Entrada y de Salida. La pestaña seleccionada se conserva en la barra de direcciones, así que puede compartir o guardar un
enlace a ella.

## Cambios pendientes

La mayoría de los cambios de configuración se escriben primero en una configuración pendiente. Mientras hay cambios
pendientes, un aviso ofrece dos acciones:

- **Aplicar cambios** activa todo lo que está pendiente.
- **Revertir cambios** lo descarta.

Esto le permite preparar varios cambios relacionados, por ejemplo una zona nueva y sus reglas, y activarlos juntos.

:::caution
Los cambios pendientes se pierden si la unidad se reinicia o se apaga. Las páginas de reinicio y apagado le avisan cuando
hay cambios sin guardar.
:::

## Tablas

Las tablas comparten un conjunto común de herramientas: un cuadro de filtro, columnas ordenables, paginación y un menú de
acciones en cada fila. Cuando un filtro oculta todo, un mensaje le indica que cambie el filtro.

## Mensajes de confirmación

Las acciones destructivas, como eliminar una regla o una base de datos, piden confirmación. Algunas operaciones críticas,
por ejemplo un restablecimiento de fábrica, le piden que escriba el nombre de la unidad antes de continuar.

## Su cuenta

Abra el menú de usuario en la esquina superior derecha para acceder a la **Configuración de la cuenta**. Allí puede
cambiar su contraseña, elegir el idioma de la interfaz y configurar la autenticación de dos factores. Vea
[Licencias y cuenta](../administration/licensing-account.md).

## Idioma y tema

La interfaz está disponible en inglés, portugués (Brasil) y español. Usa el idioma de su navegador de forma
predeterminada, y puede elegir otro en la configuración de su cuenta. Los temas claro y oscuro se alternan desde la barra
superior.
