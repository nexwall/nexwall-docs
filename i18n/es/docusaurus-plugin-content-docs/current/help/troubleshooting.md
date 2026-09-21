---
title: Solución de problemas
sidebar_position: 1
description: Encuentre la causa de un problema a partir de lo que observa.
---

# Solución de problemas

Empiece por el síntoma. Cada sección lista las causas más probables en el orden en que conviene comprobarlas. La mayoría de
las comprobaciones usan la interfaz web; las pocas que necesitan la línea de comandos remiten a
[Línea de comandos y preguntas frecuentes](command-line-and-faq.md).

## No puedo abrir la interfaz web

1. Compruebe que su equipo está en el lado de la **LAN** y tiene una dirección en la red de la LAN (`192.168.1.0/24` de
   forma predeterminada).
2. Use `https://` y la dirección de la unidad. Acepte la advertencia del certificado autofirmado.
3. Si cambió los ajustes de acceso en el asistente o en la página Sistema, compruebe que su red tiene permiso para llegar a
   la interfaz web.
4. En la consola, inicie sesión como `root` y ejecute `ip -4 addr` para confirmar la dirección de la LAN.
5. Si perdió la contraseña, use la consola para restablecerla o restaure una copia de seguridad.

## La LAN no tiene internet

1. Abra **Operación y Analítica > Panel** y mire la tarjeta de la conexión a internet.
2. En **Red > Interfaces**, compruebe que la WAN tiene dirección, puerta de enlace y servidores DNS. Con una WAN estática,
   se requiere al menos un reenviador de DNS en **Red > DNS y DHCP**.
3. Compruebe que existe una regla de enmascaramiento para la LAN en **Políticas > NAT**.
4. Compruebe la política y las reglas de LAN a WAN en **Políticas > Zonas y Políticas** y **Políticas > Reglas de
   Firewall**.
5. Con varios enlaces WAN, compruebe los hosts de seguimiento en **Red > SD-WAN**: si ninguno responde, el enlace se
   considera caído.
6. Use [Conexiones](../operation-analytics/monitor-connections.md) para ver si se están creando conexiones.

## Los nombres no se resuelven

- Confirme que los clientes usan la unidad como servidor DNS, o un servidor que funcione.
- Compruebe los reenviadores en **Red > DNS y DHCP**.
- Si el filtrado de DNS está activo, compruebe si el nombre está en una lista de bloqueo y añádalo a los dominios permitidos
  si no debería estar bloqueado.
- Compruebe que un dispositivo con DNS cifrado propio no está eludiendo la unidad.

## Un servicio está bloqueado o no es accesible

1. Active el registro en la regla o en la zona y mire los [Registros](../operation-analytics/logs.md).
2. Compruebe el orden de las reglas: gana la primera coincidencia.
3. Para un servicio publicado, confirme la redirección de puerto, el destino y que la política de la zona permite el
   tráfico.
4. Si el [bloqueo de IP y geolocalización](../security-services/ip-geo-blocking.md) está activo, compruebe si la dirección
   está en una lista o en un país bloqueado. Añádala a la lista de permitidos si debe ser accesible.
5. Si el [IPS](../security-services/ips.md) está activo, mire los eventos en busca de tráfico bloqueado.

## El control de aplicaciones no hace nada

- Confirme que el servicio está habilitado, que la regla está habilitada y que se aplicaron los cambios.
- Compruebe en los flujos en vivo que la aplicación se reconoce. Si aparece como **Desconocido**, no se puede bloquear.
- Compruebe que la regla está en la interfaz por la que pasa el tráfico.
- Compruebe que la dirección no está en las excepciones.

## Una VPN no se conecta

| Síntoma | Compruebe |
|---|---|
| No hay ningún handshake | El puerto está abierto en la WAN y la dirección pública o el nombre de la configuración es correcto |
| Conecta pero no llega a nada | Las rutas o las redes de la definición del túnel y las reglas de firewall de la zona de la VPN |
| Errores de certificado | El reloj en ambos lados y si el certificado caducó o se renovó |
| IPsec no se levanta | Los identificadores están invertidos en los dos extremos, la clave precompartida y los parámetros de seguridad coinciden, y el servicio se reinició tras cambiar redes |
| El par WireGuard está en silencio | El par tiene la configuración más reciente tras un cambio en el servidor |

Use los [Registros](../operation-analytics/logs.md) y busque el nombre del servicio de VPN.

## La unidad no se registra o no se conecta al controlador

1. La unidad necesita internet saliente y **hora** correcta. Un reloj incorrecto hace que fallen los certificados.
2. Compruebe que la unidad resuelve nombres y llega a los servicios de Nexwall y a la dirección del controlador.
3. Compruebe el token o el código de unión: debe ser reciente y no usado.
4. Busque en los [Registros](../operation-analytics/logs.md) el servicio de registro.

## Las actualizaciones fallan

- El mensaje indica el motivo: el servidor de actualizaciones está en mantenimiento, la suscripción no es válida o la
  dirección del repositorio no está definida.
- Compruebe la conexión a internet, el DNS y la hora.
- Haga una copia de seguridad antes de reintentar. Vea [Sistema](../infrastructure/system.md).

## La unidad va lenta

1. Mire la carga y la memoria en [Rendimiento](../operation-analytics/performance.md).
2. Desactive, de una en una, las funciones de inspección habilitadas recientemente para encontrar la que más cuesta: el
   sistema de prevención de intrusiones y el control de aplicaciones.
3. Use el bypass y las excepciones para el tráfico de confianza de gran volumen.
4. Compruebe en las alertas que el disco no está lleno.

## Los gráficos indican que la base de datos no es accesible

El servicio de métricas puede haberse detenido. Reinícielo desde la línea de comandos, vea
[Línea de comandos y preguntas frecuentes](command-line-and-faq.md).

## Cuando necesite pedir ayuda

Reúna, antes de contactar con el soporte: la versión de la unidad, lo que estaba haciendo, el mensaje exacto y las líneas
relevantes del registro. Si su plan lo incluye, abra una sesión de soporte remoto en **Administración > Licencias**.
