---
title: Control de aplicaciones (DPI)
sidebar_position: 1
description: Reconozca aplicaciones y protocolos y bloquéelos por interfaz.
---

# Control de aplicaciones (DPI)

**Servicios de Seguridad > DPI** bloquea el tráfico por lo que es, y no solo por el puerto que usa. La unidad inspecciona
las conexiones con inspección profunda de paquetes (DPI). Un motor reconoce el protocolo de cada flujo y, cuando puede, la
aplicación que lo produjo, por ejemplo un servicio de streaming o una aplicación de mensajería. Después escribe reglas que
bloquean las que no desea en una red.

## Cómo funciona

1. El motor observa el tráfico y clasifica cada conexión usando el protocolo y los nombres que lleva, como el nombre del
   servidor en una conexión cifrada.
2. Las reglas que usted define se comparan con el resultado.
3. Cuando una conexión coincide con una regla de bloqueo, la unidad la rechaza y sigue rechazándola durante un período.

La clasificación necesita los primeros paquetes de una conexión, así que una conexión bloqueada se detiene en cuanto se
reconoce la aplicación, y no antes de que la conexión empiece.

## El catálogo

Las aplicaciones que puede seleccionar proceden del **catálogo** instalado en la unidad. El catálogo base reconoce un
conjunto de aplicaciones habituales y muchos protocolos. Cuando su plan incluye un catálogo ampliado, este añade muchas más
aplicaciones. La página le indica cuándo el número de aplicaciones está limitado por la falta de una suscripción.

:::note
El tráfico que el motor no puede clasificar aparece como *Desconocido* en los flujos en vivo. Nunca lo bloquea una regla de
aplicación.
:::

## Reglas

Abra la pestaña **Reglas**. Una regla se aplica a **una interfaz**: solo el tráfico que pasa por ella está sujeto a la
regla.

1. Añada una regla y elija la interfaz.
2. Busque y seleccione las aplicaciones, protocolos o categorías a bloquear. La búsqueda muestra más resultados a medida
   que escribe.
3. Elija si registrar las conexiones bloqueadas.
4. Guarde y **Aplicar cambios**.

Las reglas se pueden activar y desactivar, editar y eliminar. Eliminar una regla detiene el bloqueo en esa interfaz.

## Excepciones

Use la pestaña **Excepciones** para eximir direcciones del bloqueo de aplicaciones, por ejemplo la puerta de enlace u otra
infraestructura importante. El tráfico desde o hacia una dirección eximida nunca lo bloquean estas reglas.

## Consejos

- Empiece con pocas reglas y compruebe el resultado en la [Monitorización](../operation-analytics/monitor-connections.md).
- Combine el control de aplicaciones con el [filtrado de DNS](dns-filtering.md): uno trabaja con nombres, el otro con lo
  que es el tráfico.
- Si una regla parece no tener efecto, compruebe que el servicio está habilitado, que la regla está habilitada, que aplicó
  los cambios y que la aplicación aparece como reconocida en los flujos en vivo.

## Páginas relacionadas

- [Analítica de Tráfico](../operation-analytics/traffic-analytics.md)
- [Licencias y cuenta](../administration/licensing-account.md)
