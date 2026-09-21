---
title: Túneles sitio a sitio (OpenVPN e IPsec)
sidebar_position: 2
description: Conecte dos redes de forma permanente con OpenVPN o IPsec.
---

# Túneles sitio a sitio (OpenVPN e IPsec)

Un túnel sitio a sitio une dos redes a través de internet como si fueran una sola. Use **OpenVPN Sitio a Sitio** cuando
ambos extremos son unidades Nexwall, o cuando quiera una configuración sencilla. Use **IPsec Sitio a Sitio** para la
interoperabilidad con la amplia gama de dispositivos que admiten IPsec.

## OpenVPN sitio a sitio

Una unidad es el **servidor** y la otra es el **cliente**.

### En el servidor

1. Abra **VPN > OpenVPN Sitio a Sitio** y cree un servidor de túnel.
2. Establezca los **puntos de conexión públicos** (direcciones o nombres que usará el cliente para llegar al servidor), las
   **redes locales** (redes que deben ser accesibles desde el otro extremo) y las **redes remotas** (redes detrás del otro
   extremo). Las redes remotas se convierten en rutas estáticas mientras el túnel está activo.
3. Guarde y **Aplicar cambios**.
4. Exporte el túnel. Puede descargar una configuración lista para importar en otra unidad Nexwall, o los certificados y el
   material de claves para montar el túnel con un dispositivo de terceros.

### En el cliente

Abra la misma página en la otra unidad, elija el lado del cliente e **importe** el archivo que descargó. También puede
configurar el cliente a mano para conectarse a cualquier dispositivo que hable OpenVPN.

Compruebe que el túnel está activo en la lista y en la [Monitorización](../operation-analytics/monitor-connections.md).

## IPsec sitio a sitio

IPsec es la mejor opción cuando el otro lado no es una unidad Nexwall.

1. Abra **VPN > IPsec Sitio a Sitio** y añada un túnel.
2. Introduzca la **dirección remota**. Si el otro lado tiene una dirección dinámica, introduzca `any`.
3. Establezca los **identificadores**. El identificador local es una cadena que empieza por `@` e identifica esta unidad; en
   el otro extremo los identificadores se invierten.
4. Introduzca o genere la **clave precompartida**.
5. Establezca las **redes locales** y **remotas** que conectar.
6. Elija los parámetros de seguridad. Ambos extremos deben coincidir en el cifrado, la integridad y el grupo de intercambio
   de claves. Elegir un grupo Diffie-Hellman activa el **secreto perfecto hacia adelante (PFS)**.
7. Elija qué hacer cuando el túnel falla: la **detección de par caído (DPD)** establece la acción tras un tiempo de espera,
   y la **acción de cierre** establece qué ocurre después de que el par cierre el túnel (nada, reiniciar bajo demanda o
   reiniciar de inmediato).
8. Guarde y **Aplicar cambios**.

:::note Reinicie tras cambiar redes
Añadir o quitar redes de un túnel existente requiere reiniciar el servicio IPsec. Esto reinicia todos los túneles, y la
página le pide que lo confirme.
:::

## Elegir entre ellos

| | OpenVPN | IPsec |
|---|---|---|
| Ambos extremos son Nexwall | Sencillo, importar y listo | Funciona |
| Dispositivo de terceros | Posible con el material exportado | Mejor interoperabilidad |
| Detrás de redes restrictivas | Puede usar TCP | Necesita que sus puertos estén abiertos |

## Páginas relacionadas

- [WireGuard](wireguard.md)
- [Reglas de firewall](../policy/firewall-rules.md)
