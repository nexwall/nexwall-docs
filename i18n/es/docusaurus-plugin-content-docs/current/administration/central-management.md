---
title: Gestión central
sidebar_position: 1
description: Gestione muchas unidades desde un solo controlador.
---

# Gestión central

Un **controlador** es un servidor al que se conectan muchas unidades. Desde él, un administrador puede encontrar cualquier
unidad, abrir su interfaz web, ver sus métricas y registros y gestionarla, sin tener una ruta de red directa a cada sede.
Esto es lo que hace práctico que un proveedor de servicios se ocupe de muchos clientes.

## Conectar una unidad

1. En el controlador, añada una unidad nueva. El controlador genera un **código de unión**.
2. En la unidad, abra **Administración > Gestión Central**.
3. Introduzca la dirección del controlador y pegue el **código de unión**.
4. Dé a la unidad un **nombre** fácil de encontrar en el controlador. Usar el nombre de dominio completo del firewall es un
   buen hábito. También puede añadir una **descripción**.
5. Conecte. La conexión se establece en pocos segundos.

La descripción tarda hasta quince minutos en aparecer en el controlador, y cambiarla reinicia la conexión.

## Qué recibe el controlador

Cuando una unidad está conectada, sus **registros se transmiten al controlador** para su almacenamiento, monitorización y
análisis del uso de la red, y sus métricas se conservan allí. Si no quiere que esos datos salgan de la unidad, no la
conecte. La página se lo indica antes de conectar.

## Qué puede hacer desde el controlador

- Ver todas las unidades con su estado y organizarlas en **grupos de unidades**.
- Abrir la interfaz web de una unidad a través del controlador.
- Abrir una **sesión de terminal** en una unidad.
- Seguir las métricas y los registros de muchas unidades.
- Gestionar los **usuarios** del controlador.
- Gestionar los ajustes de su propia cuenta.

## Desconectar

Desconecte la unidad desde la página. Deja de ser accesible desde el controlador. Su propia configuración no cambia.

## Requisitos

- La unidad debe llegar al controlador por internet, así que hace falta conectividad saliente.
- Algunas funciones, como las descripciones, requieren una versión reciente del controlador. La página indica cuándo es el
  caso.
- Gestionar más de un número limitado de unidades puede requerir una suscripción.

## Páginas relacionadas

- [Licencias y cuenta](licensing-account.md)
- [Rendimiento](../operation-analytics/performance.md)
