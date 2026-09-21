---
title: Analítica de Tráfico
sidebar_position: 3
description: El servicio opcional de analítica en la nube, alimentado con metadatos de tráfico.
---

# Analítica de Tráfico

**Operación y Analítica > Analítica de Tráfico** conecta la unidad a un servicio de analítica en la nube. El servicio
convierte los metadatos sobre su tráfico, que produce el motor local de clasificación, en informes de más alto nivel
sobre su red.

## Qué se envía

Solo se envían metadatos: qué aplicaciones y protocolos se vieron e información resumida sobre los flujos. El contenido de
las conexiones no se envía. El servicio es opcional y viene **desactivado de forma predeterminada**.

:::caution Decida antes de activar
Activar el servicio significa que metadatos sobre su red salen de la unidad. Revise antes sus obligaciones de privacidad.
:::

## Cómo activarlo

1. Abra la página y active el **envío de metadatos**. Esto debe hacerse antes de aprovisionar la unidad.
2. Aplique los cambios.
3. La página muestra el **identificador del agente** de la unidad. Úselo, desde el portal de analítica, para añadir la
   unidad a su cuenta.
4. Abra el portal desde el enlace de la página e inicie sesión. El servicio lo presta la plataforma de servicios Nexwall y
   requiere una suscripción.

## Cuando no hay nada que ver

Si el motor de clasificación de tráfico no está en ejecución, la página se lo indica. El motor también alimenta los flujos
en vivo de la [Monitorización](monitor-connections.md), así que compruebe allí primero.

## Desactivarlo

Desactive el envío de metadatos y aplique los cambios. La unidad deja de enviar de inmediato.
