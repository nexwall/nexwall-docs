---
title: Sistema
sidebar_position: 2
description: Nombre de host, hora, SSH, actualizaciones, almacenamiento y reinicio de la unidad.
---

# Sistema

**Infraestructura > Sistema** agrupa los ajustes de la propia unidad en cinco pestañas: General, Sincronización de hora,
SSH, Actualizaciones y Almacenamiento. Las acciones de energía están en **Infraestructura > Reiniciar y Apagar**.

## General

Establezca el **nombre de host** y una descripción. No se recomienda usar el nombre de host predeterminado `Nexwall`,
porque en una red con varias unidades resulta imposible distinguirlas. El panel se lo recuerda hasta que lo cambie.
También puede guardar aquí notas libres sobre la unidad.

## Sincronización de hora

La hora correcta importa para los certificados, los registros, las VPN y las actualizaciones.

- Elija la **zona horaria**.
- Compruebe la **hora local** que muestra la unidad y **sincronícela con un servidor NTP** bajo demanda.
- Active el **cliente NTP** para que el reloj se mantenga correcto automáticamente. Puede usar los servidores anunciados
  por DHCP o introducir los suyos.
- Opcionalmente, **proporcione un servidor NTP** a sus redes, eligiendo las interfaces que lo reciben.

## SSH

Controle el acceso SSH a la línea de comandos.

- Establezca el **puerto TCP** y si se permite la autenticación con contraseña.
- Elija si el usuario `root` puede iniciar sesión con contraseña. Desactivarlo es más seguro, pero debe haber añadido antes
  su clave pública SSH.
- Gestione las **claves públicas autorizadas**. Las claves permiten inicios de sesión sin contraseña y son más seguras que
  las contraseñas.
- Elija si los hosts remotos pueden conectarse a los puertos reenviados de la unidad.

:::warning No se quede sin acceso
Antes de desactivar el inicio de sesión con contraseña, añada su clave pública y verifique que puede iniciar sesión con ella
desde una segunda sesión.
:::

## Actualizaciones

Hay dos tipos de actualizaciones:

| Tipo | Qué contiene | Cómo se entrega |
|---|---|---|
| Correcciones de seguridad y de errores | Pequeñas correcciones del software instalado | Paquetes |
| Nuevas versiones | Nuevas funciones | Una imagen completa del sistema |

La pestaña muestra si hay una nueva versión disponible. Haga una copia de seguridad de su configuración antes de
actualizar. Los ajustes actuales se conservan. Puede actualizar de inmediato, **programar** la actualización para un momento
que le convenga o cancelar una actualización programada. También puede cargar usted mismo una imagen compatible.

Si la pestaña indica que el servidor de actualizaciones no es accesible o rechaza el acceso, compruebe la conexión a
internet, la hora y el estado de su suscripción, vea [Solución de problemas](../help/troubleshooting.md).

## Almacenamiento

De forma predeterminada los registros se guardan en memoria. En la pestaña Almacenamiento configura un dispositivo
persistente, como una unidad USB o un segundo disco, donde la unidad también escribe los registros. Ayuda a resolver
problemas y conserva un historial de la actividad entre reinicios. También puede dejar que la unidad copie datos adicionales
al dispositivo una vez al día. Quitar el almacenamiento detiene la escritura de registros en él.

## Reiniciar y apagar

**Reiniciar** reinicia la unidad, que no está disponible durante un breve período. **Apagar** la apaga, para
mantenimiento, traslado o baja. Ambas avisan cuando hay cambios pendientes, que se pierden.

## Páginas relacionadas

- [Copia de seguridad y recuperación](backup-recovery.md)
- [Certificados](certificates.md)
