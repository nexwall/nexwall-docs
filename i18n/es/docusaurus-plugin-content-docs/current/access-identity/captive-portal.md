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
