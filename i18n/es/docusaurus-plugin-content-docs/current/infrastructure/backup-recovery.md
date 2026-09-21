---
title: Copia de seguridad y recuperación
sidebar_position: 1
description: Haga copias de seguridad, restaure, migre y restablezca de fábrica una unidad.
---

# Copia de seguridad y recuperación

**Infraestructura > Copia de Seguridad y Recuperación** protege su configuración. Tiene cuatro pestañas: Copia de
seguridad, Restauración, Migración y Restablecimiento de fábrica.

## Copia de seguridad

Una copia de seguridad contiene los ajustes y los datos de la unidad. Es su salvaguarda frente a un disco averiado, un
error o una sustitución.

- **Descargue una copia** a su equipo en cualquier momento.
- **Cífrela.** Introduzca una **frase de contraseña (passphrase)** y la copia se cifra con GPG. Si deja la frase vacía, la
  copia se guarda en texto plano.

:::warning Guarde bien la frase de contraseña
Si pierde la frase de contraseña, no podrá leer una copia cifrada, y no se puede recuperar. Cambiar la frase afecta solo a
las copias que se hagan después; para restaurar una copia más antigua necesita la frase que estaba vigente cuando se hizo.
:::

Con una suscripción, la unidad también puede **crear copias cifradas automáticamente** y conservarlas en la nube. El
sistema gestiona hasta diez copias. Puede iniciar una en cualquier momento con **Ejecutar copia en la nube**.

## Restauración

Elija de dónde procede la copia: un archivo de su equipo o una de las copias en la nube. Si está cifrada, introduzca su
frase de contraseña. La unidad aplica la configuración y se reinicia.

Restaurar reemplaza la configuración actual, así que haga una copia antes si pudiera necesitar volver atrás.

## Migración

La pestaña Migración importa un archivo de migración producido desde una máquina de origen compatible y asigna sus
interfaces de red a las interfaces de esta unidad. Siga las instrucciones de la página y revise el resultado antes de
aplicarlo.

## Restablecimiento de fábrica

El **restablecimiento de fábrica** elimina todos los paquetes instalados y todos los ajustes personalizados y devuelve la
unidad al estado que tenía justo después de la instalación. Restaura la versión que está instalada actualmente, no una más
antigua.

Es permanente y no se puede deshacer. La página pide confirmación antes de continuar. Úselo cuando reutilice o dé de baja
una unidad, o cuando quiera empezar de cero.

## Buenas prácticas

- Haga una copia antes de cada actualización y de cada cambio importante.
- Conserve al menos una copia fuera de la unidad.
- Pruebe una restauración en una unidad de repuesto de vez en cuando.

## Páginas relacionadas

- [Sistema](system.md), para las actualizaciones
- [Licencias y cuenta](../administration/licensing-account.md), para las copias en la nube
