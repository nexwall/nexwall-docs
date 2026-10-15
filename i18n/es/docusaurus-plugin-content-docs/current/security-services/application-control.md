---
title: Control de aplicaciones (DPI)
sidebar_position: 1
description: Reconozca aplicaciones y protocolos y bloquéelos por interfaz.
---

# Control de aplicaciones (DPI)

**Servicios de Seguridad > Control de aplicaciones (DPI)** bloquea el tráfico por lo que es, y no solo por el puerto que usa. La unidad inspecciona
las conexiones con inspección profunda de paquetes (DPI). Un motor reconoce el protocolo de cada flujo y, cuando puede, la
aplicación que lo produjo, por ejemplo un servicio de streaming o una aplicación de mensajería. Después escribe reglas que
bloquean las que no desea en una red.

![Reglas de Control de aplicaciones](/img/docs/appcontrol-en.png)

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

## Perfiles

En lugar de elegir las aplicaciones una por una puede aplicar un **perfil**: **Estándar**, **Escuela** o **Restringido**. Un perfil crea las
reglas de aplicaciones y, junto con ellas, las reglas de [Protección web](web-protection.md) (categorías de sitios, antivirus,
SafeSearch y restricciones de YouTube, y un perfil de filtro de contenido). Una unidad nueva empieza con el perfil **Estándar** ya aplicado.
Las reglas que crea un perfil se marcan **Desde un perfil**; elegir otro perfil reemplaza solo esas reglas, nunca las suyas. Las nuevas
conexiones también se bloquean mientras el motor de inspección no da abasto, de modo que nada pasa sin inspección.

## El interruptor del motor y la sobrecarga

En **Ajustes** el interruptor **Control de aplicaciones** enciende o apaga el motor de inspección por completo. Apagado, el tráfico se reenvía
sin inspeccionar y no se aplica ninguna regla de aplicaciones, categorías ni de la primera capa de Web Protection; las reglas siguen guardadas.
También es la forma rápida de recuperar la red si el motor falla. Activar la [Protección web](web-protection.md) vuelve a encender el interruptor,
porque su primera capa reconoce los sitios con este motor.

Cuando el motor no da abasto (su cola está llena) o no está en ejecución, el ajuste **Sobrecarga del motor de inspección** decide qué pasa con las
conexiones nuevas: **Permitir el tráfico** (el valor por defecto y la recomendación: las conexiones siguen funcionando, sin inspección mientras tanto) o
**Bloquear conexiones nuevas** (nada pasa sin inspección, pero las conexiones fallan hasta que el motor vuelva).

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

- [Protección web](web-protection.md)
- [Analítica de Tráfico](../operation-analytics/traffic-analytics.md)
- [Licencias y cuenta](../administration/licensing-account.md)
