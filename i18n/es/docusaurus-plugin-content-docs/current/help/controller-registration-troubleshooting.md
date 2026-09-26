---
title: Solución de problemas de registro en el controlador
sidebar_position: 3
description: Diagnostique problemas de vinculación y conexión entre una unidad y un controlador, en ambos lados, desde la línea de comandos.
---

# Solución de problemas de registro en el controlador

Esto va más allá de la [comprobación básica](troubleshooting.md) y requiere acceso SSH a la unidad y al host del
controlador. Úselo cuando una unidad no logra vincularse a un controlador, la conexión se cae repetidamente, o se
conecta pero el controlador no puede alcanzarla.

## Cómo funciona el registro

1. En el controlador, agregar una unidad genera un **código de vinculación**: una cadena en base64 que contiene la
   dirección del controlador, un token de registro y el ID de la nueva unidad. El controlador también emite un
   certificado de cliente OpenVPN para ese ID, pero la unidad todavía no lo ha usado.
2. En la unidad, introducir el código de vinculación inicia `ns-plug`, que llama al endpoint de registro del
   controlador con el token y los datos de la unidad.
3. El controlador verifica el token y el certificado que emitió, guarda las credenciales de la unidad y devuelve la
   configuración de la VPN.
4. La unidad levanta un túnel OpenVPN hacia el controlador. Al conectarse, el controlador le asigna una dirección de
   VPN y crea una ruta en el proxy para que su interfaz web y su API sean accesibles a través del controlador.

Una interrupción en cualquier paso ayuda a localizar el problema: ninguna respuesta al código de vinculación es un
problema de red o del lado de la unidad; una VPN conectada sin ruta en el proxy es un problema del lado del
controlador.

## En la unidad

### Compruebe el estado actual

```bash
ubus call ns.plug status
```

`status` es uno de `unregistered`, `pending` (registrada, pero el túnel no está activo) o `connected`.
`push_last_sent` muestra cuándo se enviaron las métricas al controlador por última vez, `-1` si nunca.

### Comandos de registro

```bash
# registrar con un código de vinculación
echo '{"join_code":"<código>","tls_verify":true,"unit_name":"fw1.ejemplo.com","description":""}' | ubus call ns.plug register

# cancelar el registro y limpiar el estado local
ubus call ns.plug unregister

# reiniciar el cliente sin cambiar su configuración
ubus call ns.plug restart
```

El código de vinculación es solo un JSON en base64, así que puede inspeccionarlo sin registrarse:

```bash
echo '<código>' | base64 -d
# {"unit_id":"...","token":"...","fqdn":"controller.ejemplo.com"}
```

Esto detecta los dos errores más comunes: un código copiado del controlador equivocado, o uno desactualizado porque
la unidad ya fue eliminada y vuelta a agregar en el controlador desde que se generó.

### Servicio, configuración y registros

| Qué | Comando |
|---|---|
| Reiniciar el cliente | `/etc/init.d/ns-plug restart` |
| Configuración actual | `uci show ns-plug` |
| Registros del cliente | `logread \| grep -i ns-plug` |
| Configuración OpenVPN generada | `cat /usr/share/ns-plug/client.conf` (solo existe tras un registro exitoso) |
| Interfaz del túnel | `ip -4 addr show tun-nsplug` (solo aparece una vez que el túnel está activo) |

`ns-plug` está supervisado por `procd` y se reinicia solo si falla, así que una unidad detenida en `pending`
normalmente está reintentando en silencio, no detenida. `logread` muestra cada intento y su resultado.

### Entendiendo el comportamiento de salida

`ns-plug` falla rápido cuando falta configuración y se rinde después de cinco intentos fallidos de alcanzar el
controlador:

| Código de salida | Significado |
|---|---|
| 1 | No hay dirección de controlador configurada |
| 2 | No hay ID de unidad configurado |
| 3 | No hay token configurado |
| 4 | El controlador respondió `409` (este ID de unidad ya está registrado con otra cuenta); se borran las credenciales locales |
| 5 | Controlador inalcanzable después de 5 intentos (10 segundos) |

Los códigos 1–3 significan que el código de vinculación nunca llegó a aplicarse — repita el paso de registro. El
código 4 significa que la unidad fue eliminada y vuelta a agregar en el controlador, o que el código de vinculación
se reutilizó; elimine la unidad en el controlador primero, o use un código de vinculación nuevo. El código 5 es un
problema de red: confirme que la unidad puede resolver y alcanzar la dirección del controlador en el puerto 443, y
que su reloj esté correcto (un reloj incorrecto hace fallar el handshake TLS).

## En el controlador

### Encuentre los registros

El contenedor de la API registra cada intento de registro en la salida de error, con el prefijo `[RegisterUnit]` o
`[AddUnit]`:

```bash
podman logs <nombre-del-contenedor-api> 2>&1 | grep -i registerunit
# o, con docker:
docker logs <nombre-del-contenedor-api> 2>&1 | grep -i registerunit
```

Los registros del contenedor del servidor OpenVPN cubren el túnel en sí (errores de handshake y de certificado), y
los del contenedor del proxy cubren el enrutamiento una vez que una unidad está conectada.

### Qué significa cada mensaje de error

| Mensaje | Causa | Solución |
|---|---|---|
| `registration token required` | La unidad no envió ningún token | Build antiguo o corrupto de `ns-plug`; regístrese de nuevo con un código de vinculación nuevo |
| `invalid registration token` | El token del código de vinculación no coincide con el token actual del controlador | El token de registro del controlador cambió desde que se generó el código, o el código es de otro controlador |
| `unit not allowed, no certificate found` | El ID de unidad de la solicitud nunca se agregó en el controlador | Agregue la unidad en el controlador para generar un código de vinculación nuevo, y use ese |
| `unit subscription is required` | El controlador exige suscripciones pero la unidad no envió ninguna | Compruebe el estado de suscripción de la unidad, o el requisito de suscripción del controlador |
| `unit with subscription is not allowed` | El controlador no espera suscripciones pero la unidad envió una | El error opuesto al de la fila anterior |
| HTTP `409` (sin cuerpo de mensaje) | Ya hay una unidad con ese ID registrada con otro usuario | Elimine la unidad existente en el controlador antes de volver a agregarla |
| `cannot retrieve openvpn config: ...` / `cannot write credentials file` | El controlador no pudo leer sus propios archivos de PKI o escribir en el directorio de credenciales | Compruebe los permisos y que el volumen con la PKI de OpenVPN y el directorio de credenciales esté montado y sea escribible |

### Confirme el registro de la unidad

Con un token de administrador:

```bash
curl -s -H "Authorization: Bearer <token>" https://<controlador>/api/units/<id-de-unidad>
```

`registered` y `vpn_connected_since` muestran si el controlador considera que la unidad está registrada y
actualmente conectada. Si `vpn_connected_since` nunca se actualiza después de que la unidad reporta `connected`
localmente, el problema está del lado del controlador del túnel, no en la unidad.

### Túnel y ruta del proxy

- El contenedor de la API espera el socket de gestión de OpenVPN en `/etc/openvpn/run/mgmt.sock` antes de
  arrancar; si sus registros muestran `Socket not found!`, el servidor OpenVPN aún no estaba activo o los dos
  contenedores no comparten ese volumen.
- Cuando una unidad se conecta, aparece un archivo de ruta en `/etc/openvpn/proxy/<id-de-unidad>.yaml` dentro del
  directorio de configuración del proxy. Si la unidad aparece como conectada pero falta ese archivo, el hook de
  conexión no terminó — compruebe que la base de datos de reportes sea accesible, ya que el hook también la
  actualiza.
- Compruebe que el certificado no haya expirado: `openssl x509 -in /etc/openvpn/pki/issued/<id-de-unidad>.crt
  -noout -enddate`. Los certificados se renuevan automáticamente cuando quedan seis meses de validez, pero solo
  mientras el controlador esté en funcionamiento para hacerlo.

### Repita un registro manualmente

Para distinguir un problema del lado de la unidad de uno del lado del controlador, llame al endpoint directamente
desde el host del controlador, con los mismos campos que envía `ns-plug`:

```bash
curl -s -H "Content-Type: application/json" -H "RegistrationToken: <token>" \
  https://<controlador>/api/units/register -X POST \
  --data '{"unit_id":"<id-de-unidad>","unit_name":"prueba","username":"prueba","password":"prueba","version":"","subscription_type":""}'
```

Una respuesta aquí distinta a la que recibe la unidad significa que la diferencia está en lo que envía la unidad o
en cómo alcanza al controlador, no en la lógica propia del controlador.

## Páginas relacionadas

- [Gestión central](../administration/central-management.md)
- [Registros](../operation-analytics/logs.md)
- [Línea de comandos y preguntas frecuentes](command-line-and-faq.md)
- [Referencia de comandos de servicios y registros](service-and-log-reference.md)
