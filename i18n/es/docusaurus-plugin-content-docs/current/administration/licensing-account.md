---
title: Licencias y cuenta
sidebar_position: 2
description: Active una suscripción y gestione su propia cuenta.
---

# Licencias y cuenta

## Licencias

**Administración > Licencias** muestra el estado de la suscripción de la unidad y le permite activar una suscripción.

### Qué desbloquea una suscripción

El firewall funciona sin suscripción. Una suscripción añade funciones que dependen de los servicios de Nexwall:

- un catálogo de aplicaciones ampliado para el [control de aplicaciones](../security-services/application-control.md),
  cuando el plan incluye uno;
- las listas avanzadas de [Threat Shield](../security-services/dns-filtering.md);
- copias de seguridad remotas (en la nube), cifradas, vea [Copia de seguridad y recuperación](../infrastructure/backup-recovery.md);
- la [Analítica de Tráfico](../operation-analytics/traffic-analytics.md);
- la gestión de un número ilimitado de unidades desde un controlador;
- bases de datos remotas de usuarios de VPN;
- sesiones de soporte remoto, en los planes que las incluyen.

### Activar

1. Obtenga un **token de autenticación** para la unidad desde su cuenta de Nexwall.
2. Pegue el token en la página Licencias y guarde. La unidad se registra en la plataforma de servicios de Nexwall.
3. La página muestra el plan, la vigencia y el identificador de sistema de la unidad.

Si la unidad no se ha sincronizado desde que arrancó, la página lo indica, y puede forzar una sincronización con
**Sincronizar ahora**.

### Sesiones de soporte

Puede abrir una **sesión de soporte remoto** para que el soporte le ayude. La sesión se cierra automáticamente a la hora
indicada, y puede detenerla en cualquier momento.

### Cancelar

Si cancela la suscripción de una unidad, pierde las funciones adicionales de su plan. El firewall básico sigue
funcionando.

## Su cuenta

Abra **Configuración de la cuenta** desde el menú de usuario.

### Contraseña

Cambie su contraseña. Si cambia la contraseña del usuario `root`, también cambia la contraseña que se usa para el acceso a
la shell.

### Idioma

Elija el idioma de la interfaz: inglés, portugués (Brasil) o español.

### Autenticación de dos factores

La autenticación de dos factores añade un segundo paso al inicio de sesión: un código generado en su teléfono.

1. Instale una aplicación de autenticación en su teléfono o tableta, por ejemplo FreeOTP.
2. En Configuración de la cuenta elija configurar la autenticación de dos factores y escanee el código QR.
3. Introduzca el código de seis dígitos que muestra la aplicación.
4. **Guarde los códigos de recuperación.** Cada uno se puede usar una vez si pierde el acceso a su aplicación.

Para generar nuevos códigos de recuperación, revoque la autenticación de dos factores y vuelva a configurarla. Revocarla
reduce la seguridad de la cuenta, y los códigos dejan de solicitarse al iniciar sesión.

## Páginas relacionadas

- [Usuarios y grupos](../access-identity/users-groups.md)
- [Gestión central](central-management.md)
