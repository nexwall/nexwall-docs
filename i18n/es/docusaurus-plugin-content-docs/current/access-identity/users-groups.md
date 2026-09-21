---
title: Usuarios y grupos
sidebar_position: 1
description: Bases de datos de usuarios locales y de directorio, usadas por la VPN y otros servicios.
---

# Usuarios y grupos

**Acceso e Identidad > Usuarios y Grupos** gestiona las **bases de datos de usuarios**, y los usuarios que contienen, que
otras funciones usan para autenticar a las personas. Hoy las usa principalmente el
[servidor de acceso remoto OpenVPN](../vpn/remote-access-openvpn.md).

## Dos tipos de base de datos

| Tipo | Cuándo usarla |
|---|---|
| Local | Un pequeño número de usuarios guardados en la propia unidad |
| LDAP o Active Directory | Usuarios que ya se gestionan en un directorio. La unidad lo consulta, así que las cuentas se mantienen en un solo lugar |

## Base de datos local

Cree la base de datos y después añada usuarios. Para cada usuario establece un **nombre**, un **nombre para mostrar** y una
**contraseña**. Un usuario sin contraseña debe autenticarse de otra forma, por ejemplo con un certificado. Las contraseñas
deben tener al menos 8 caracteres y contener mayúsculas y minúsculas, un número y un carácter especial.

## Base de datos remota (LDAP o Active Directory)

Indique cómo llegar al directorio:

| Campo | Ejemplo y significado |
|---|---|
| URI | `ldaps://ldap.ejemplo.com`. Incluye el protocolo y el puerto cuando no es el predeterminado |
| Base DN | Dónde empiezan las búsquedas, por ejemplo `dc=ejemplo,dc=com` |
| User DN | Dónde están los usuarios, por ejemplo `cn=Users,dc=ejemplo,dc=com` |
| Atributo para mostrar | El atributo con el nombre completo. Use `displayName` para Active Directory |
| Bind DN y contraseña | La cuenta que usa la unidad para consultar el directorio |
| Seguridad | Si se usa TLS y si se verifica el certificado del servidor |

Guarde y use la prueba de conexión para confirmar que la unidad llega al directorio y lee los usuarios. Prefiera una
conexión cifrada.

## Conviene saber

- Una base de datos que está en uso por una función no se puede eliminar; quítela primero de esa función.
- Un usuario puede **establecerse como administrador**. Un administrador puede iniciar sesión en la interfaz web y
  configurar la unidad. Mantenga ese conjunto reducido y retire el rol cuando ya no haga falta.

## Páginas relacionadas

- [Acceso remoto (OpenVPN)](../vpn/remote-access-openvpn.md)
- [Licencias y cuenta](../administration/licensing-account.md)
