---
title: Portal cautivo
sidebar_position: 2
description: Exija que los invitados se autentiquen antes de usar la red.
---

# Portal cautivo

**Acceso e Identidad > Portal Cautivo** convierte una interfaz de red en una red de invitados con una página de inicio de
sesión. Los dispositivos que se conectan son interceptados hasta que el usuario se autentica, por ejemplo con un código, un
cupón o un inicio de sesión social, según lo que ofrezca el gestor de hotspot. Está pensado para hoteles, cafeterías, salas
de espera y oficinas con visitantes.

## Cómo funciona

La unidad ejecuta la parte del portal cautivo que intercepta las conexiones. La gestión de la experiencia del invitado
(páginas, cupones, sesiones y estadísticas) se hace en un **gestor de hotspot** en el que se registra la unidad.

### Paso a paso

1. Un invitado se conecta a la interfaz de invitados y recibe una dirección del hotspot (no del DHCP de la LAN).
2. El componente de hotspot de la unidad (Dedalo, basado en CoovaChilli) retiene al invitado: su tráfico aún no se reenvía a internet,
   solo lo necesario para llegar a la página de inicio de sesión.
3. El navegador del invitado se redirige a la página de inicio de sesión, que sirve el gestor de hotspot (Icaro), no el firewall.
4. El invitado se autentica allí (código, cupón, inicio de sesión social...). El gestor avisa a la unidad que ese dispositivo puede salir y por cuánto tiempo
   (el intercambio RADIUS entre la unidad y el gestor viaja sobre HTTP).
5. A partir de entonces el tráfico de ese dispositivo se reenvía según sus reglas de firewall, hasta que la sesión termina o caduca.

### Por dentro

- El hotspot tiene su propio dispositivo de red (`tun-dedalo`) y su propia zona de firewall, `hotspot`. Una regla descarta el reenvío desde la interfaz
  de invitados para los dispositivos no autenticados; la zona es donde decide qué pueden alcanzar los invitados autenticados.
- La unidad se registra en el gestor con el punto de conexión y las credenciales de la pestaña **Configuración**. El gestor es un servidor externo: si no
  es alcanzable, los invitados nuevos no pueden iniciar sesión, mientras los ya autenticados conservan su sesión hasta que termine.
- Las reglas de firewall, la [QoS](../network/qos.md) y la protección de contenido de la [Protección web](../security-services/web-protection.md) se aplican
  a la zona hotspot como a cualquier otra.

## Configuración

1. Abra la pestaña **Configuración** e inicie sesión: introduzca el **punto de conexión** del gestor de hotspot y el usuario
   y la contraseña que le dieron.
2. Elija el **dispositivo de red** en el que escucha el hotspot. Intercepta todas las conexiones de esa interfaz y exige
   autenticación.
3. Elija la **dirección de red** del hotspot. Los invitados reciben direcciones dentro de esa red.
4. Establezca el **límite de DHCP**, el número máximo de concesiones. La primera dirección del rango DHCP se calcula por
   usted.
5. Guarde. Se confirman todos los cambios pendientes en la configuración del firewall y de la red.

## Sesiones

La pestaña **Estado** muestra las sesiones de los clientes conectados a esta unidad.

## Quitar la unidad del gestor

**Anular registro** separa la unidad del gestor de hotspot. La configuración local del firewall y de la red no cambia, así
que elimine usted mismo la red del hotspot si ya no la necesita.

## Buenas prácticas

- Coloque el hotspot en una zona propia, separada de la LAN. Vea [Zonas y políticas](../policy/zones-policies.md).
- Limite a qué pueden acceder los invitados con [reglas de firewall](../policy/firewall-rules.md) y limite el ancho de
  banda con [QoS](../network/qos.md).
- En un par de alta disponibilidad, el hotspot funciona solo en una interfaz física, y las sesiones activas no sobreviven a
  un cambio, vea [Alta disponibilidad](../infrastructure/high-availability.md).
