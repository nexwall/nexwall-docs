---
title: 'Cómo definir servidores DNS y nombres DNS locales'
sidebar_position: 20
description: 'Elija los servidores DNS externos y cree nombres que resuelvan a direcciones locales.'
---

# Cómo definir servidores DNS y nombres DNS locales

El firewall responde DNS a la LAN. Reenvía los nombres desconocidos a servidores externos y responde él mismo los nombres locales.

**Dónde:** **Red** > **DNS y DHCP**

## Pasos

1. Abra la página y elija la pestaña **DNS**.
2. En **Servidores de reenvío DNS** haga clic en **Añadir servidor DNS** e introduzca la dirección de cada servidor. Déjelo vacío para usar los servidores de la WAN.
3. Defina el **Dominio DNS** (sufijo local) si lo usa. Mantenga **Protección contra rebind** activado y añada en **Lista blanca de dominios** los dominios que legítimamente resuelven a direcciones privadas.
4. Guarde. Ahora abra la pestaña **Registros DNS** y haga clic en **Añadir registro DNS**.
5. Rellene el **Nombre de host** (por ejemplo `nas.empresa.local`) y la **Dirección IP**. Use **Registro DNS comodín** para responder por todos los subdominios. Guarde.

## Compruebe que funciona

- Desde un cliente, `nslookup nas.empresa.local 192.168.1.1` devuelve la dirección.

## Si no funciona

- Los nombres no resuelven: [KBA-0005](../../help/kba-05-dns.md) y [KBA-0015](../../help/kba-15-dns-deep-dive.md).
- Un nombre público debe resolver a una dirección privada solo para usuarios internos: cree el registro aquí.

## Guías relacionadas

- [Cómo activar y ajustar el servidor DHCP](dhcp-server.md)
- [Cómo bloquear dominios maliciosos (Filtrado de DNS)](../security/dns-filtering.md)
