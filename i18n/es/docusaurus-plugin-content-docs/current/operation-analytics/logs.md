---
title: Registros
sidebar_position: 6
description: Lectura y búsqueda en los registros del sistema, y el Visor de registros.
---

# Registros

**Operación y Analítica > Registros** muestra el registro del sistema de la unidad: mensajes del firewall, de los servicios, de la
red y del kernel. El registro ocupa todo el ancho y el alto de la página. El botón **Abrir el Visor de registros** abre el
Visor de registros, una vista con búsqueda de los mismos eventos con pestañas para cada parte del firewall.

## Leer el registro

- Elija cuántas líneas cargar.
- Active **ajustar líneas** para ver los mensajes largos sin desplazarse hacia los lados.
- Use el cuadro de búsqueda para dejar solo las líneas que coinciden. La búsqueda acepta expresiones regulares.
- Active **seguir** para ver los mensajes nuevos a medida que llegan.

El registro es silencioso a propósito. La API de gestión no escribe una línea por cada petición de lectura de la interfaz web; escribe
las autorizaciones fallidas y cada petición que cambia algo (añadir, editar, eliminar, establecer, ...), que es el rastro de
auditoría. Tampoco se escriben las consultas DNS, solo las respuestas del filtro DNS.

## Visor de registros

El Visor de registros tiene estas pestañas:

| Pestaña | Qué muestra |
|---|---|
| Tráfico del firewall | Paquetes aceptados o bloqueados por las reglas del firewall, con el motivo |
| Tráfico y aplicaciones | Las conexiones con la aplicación, el nombre del sitio, el origen y el destino, los bytes en cada sentido y la duración. Solo registra mientras el Visor de registros está abierto y empieza con las conexiones abiertas en ese momento; no se escribe nada en el registro del sistema |
| Bloqueo de IP y geografía | Direcciones y países bloqueados por Threat Shield IP |
| Protección de red (IPS) | Las alertas y bloqueos del motor de prevención de intrusiones |
| Control de aplicaciones (DPI) | Flujos bloqueados por el Control de aplicaciones |
| Protección DNS | Dominios bloqueados por el filtro DNS |
| Web Protection | Todo el tráfico web que trató el proxy, permitido o bloqueado: páginas de bloqueo, archivos detenidos por el antivirus o el sandbox, bloqueos del filtro de contenido y peticiones que el proxy rechazó. Una casilla agrega los mensajes de los servicios de Web Protection. Haga clic en un dispositivo para buscarlo |
| VPN, Alta disponibilidad, Proxy inverso | Los eventos de cada servicio |
| Autenticación, Actividad de administración | Inicios de sesión e inicios fallidos; los cambios hechos desde la interfaz web |
| Registros del sistema | Todo el registro del sistema |
| Traza de reglas en vivo, Ruta del paquete, Paquetes descartados | Trazas en vivo de lo que le pasa a un paquete, para diagnóstico |

Elija el rango de tiempo, filtre por acción (bloqueado o permitido) y busque por texto. Las tablas se pueden exportar.

Los informes de tráfico de **Operación y Analítica** guardan los totales por hora durante 35 días.

## Búsquedas útiles

| Objetivo | Buscar |
|---|---|
| Paquetes bloqueados | el nombre de la zona, o el prefijo de registro que usa la regla |
| Problemas de VPN | `openvpn`, `charon` o `wireguard` |
| Actividad de DHCP | `dnsmasq-dhcp` |
| Bloqueos de Threat Shield IP | `banIP` |
| Problemas de actualización o registro | el nombre del servicio, por ejemplo `ns-plug` |

## Conservar los registros tras un reinicio

Por defecto el registro vive en memoria y se pierde al reiniciar. Para conservar una copia, conecte un disco o una unidad USB y configúrela
en **Administración > Sistema**, en la pestaña Almacenamiento. La unidad entonces también escribe los registros en ese dispositivo. Vea
[Sistema](../infrastructure/system.md).

Cuando una unidad está conectada a un controlador, los registros también se transmiten a él, vea
[Gestión central](../administration/central-management.md).

## Desde la línea de comandos

El mismo registro está disponible por SSH con `logread`. Vea [Línea de comandos y preguntas frecuentes](../help/command-line-and-faq.md).
