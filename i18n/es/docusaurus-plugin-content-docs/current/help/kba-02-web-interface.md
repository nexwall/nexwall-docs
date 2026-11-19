---
title: 'KBA-02: No puedo abrir la interfaz web'
sidebar_position: 12
description: Solucione una unidad cuya interfaz web no carga o rechaza el acceso.
---

# KBA-02: No puedo abrir la interfaz web

**Síntoma.** La página no carga, muestra error de certificado o no acepta la contraseña.

Comprobaciones de solo lectura salvo que se indique. Los comandos se ejecutan como `root` por SSH, consola o terminal remota del controlador.

## Revise, en este orden

1. Su computadora debe estar del lado **LAN**, con dirección en la red LAN (`192.168.1.0/24` por defecto).
2. Use `https://` y la dirección de la unidad. Acepte la advertencia del certificado autofirmado.
3. En la consola, inicie sesión como `root` y confirme la dirección LAN:

   ```sh
   ip -br a
   /etc/init.d/nginx status
   ```

4. Si cambió el acceso en el asistente o en la página Sistema, verifique que su red pueda llegar a la interfaz web.
5. ¿Sin contraseña? Restablézcala desde la consola o restaure un respaldo.

## ¿No se resolvió?

Ejecute el [chequeo de salud (KBA-01)](kba-01-health-check.md) desde la consola. Si `nginx` está detenido, vea [KBA-16: un servicio está detenido](kba-16-services.md).
