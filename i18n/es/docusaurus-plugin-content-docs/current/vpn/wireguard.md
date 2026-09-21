---
title: WireGuard
sidebar_position: 3
description: Túneles rápidos y modernos para sedes y usuarios.
---

# WireGuard

**VPN > WireGuard** crea túneles con el protocolo WireGuard: ligero, moderno y ampliamente disponible en muchas
plataformas. Sirve tanto para conectar sedes como para dar acceso a dispositivos individuales.

## Túneles de servidor

Un túnel de servidor acepta conexiones de **pares (peers)**.

1. Añada un túnel y establezca su **nombre**, el **puerto de escucha** y la **red VPN**, una red privada que usan los
   pares. Elija una red que no se use en ningún otro lugar. La red VPN no se puede cambiar después de la primera
   configuración.
2. Añada los **pares**. Para cada uno establece un nombre, la dirección que recibe, las redes detrás de él (si es una sede)
   y si envía todo su tráfico por el túnel.
3. Guarde y **Aplicar cambios**.
4. Para cada par, **descargue la configuración** o muestre su código QR y entréguelo al par.

:::caution Los cambios solo llegan a los pares cuando se actualizan
Cuando edita el servidor o un par, los pares deben descargar la configuración actualizada o ajustarse a mano. La página se
lo advierte.
:::

Eliminar un túnel también elimina sus pares y los desconecta. Eliminar un par lo desconecta.

## Túneles de par (lado cliente)

Para conectar esta unidad a otro servidor WireGuard, abra el lado cliente de la página e **importe** el archivo de
configuración generado por ese servidor, o introduzca los parámetros a mano. Funciona con cualquier dispositivo que admita
WireGuard.

## Consejos

- Use pares de corta duración, por persona, para los usuarios, y un par por sede.
- Controle a qué pueden acceder los usuarios del túnel con [reglas de firewall](../policy/firewall-rules.md).
- Compruebe el estado del túnel en la [Monitorización](../operation-analytics/monitor-connections.md).

## Páginas relacionadas

- [Túneles sitio a sitio](site-to-site-tunnels.md)
- [Acceso remoto (OpenVPN)](remote-access-openvpn.md)
