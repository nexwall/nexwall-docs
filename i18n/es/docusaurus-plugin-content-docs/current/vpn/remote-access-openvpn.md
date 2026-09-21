---
title: Acceso remoto (OpenVPN)
sidebar_position: 1
description: Permita que los usuarios se conecten de forma segura desde cualquier lugar con un servidor OpenVPN road warrior.
---

# Acceso remoto (OpenVPN)

**VPN > Acceso Remoto (OpenVPN)** configura un servidor OpenVPN **road warrior**. Los usuarios remotos, en portátiles o
teléfonos, se conectan a él desde cualquier lugar de internet y obtienen acceso seguro a sus redes privadas.

## Antes de empezar

- Cree una **base de datos de usuarios** con las personas que pueden conectarse, vea
  [Usuarios y grupos](../access-identity/users-groups.md).
- Decida la **red VPN**: una red privada que usan solo los clientes VPN. Elija una que no se solape con ninguna otra red
  que use, incluidas las redes domésticas de sus usuarios si puede preverlas.
- Asegúrese de que la dirección pública o un nombre DNS de la unidad sea conocido por sus usuarios.

## Crear el servidor

Elija **Añadir servidor** (o configure el predeterminado) y establezca:

| Ajuste | Significado |
|---|---|
| Base de datos de usuarios | De dónde proceden las cuentas |
| Autenticación | Qué presentan los usuarios: una contraseña, un certificado o ambos. También puede exigir un código de un solo uso |
| Protocolo y puerto | Se prefiere UDP por rendimiento; TCP puede atravesar redes restrictivas |
| Red VPN | La red virtual de los clientes |
| Direcciones públicas | Los nombres o direcciones que usan los clientes para llegar al servidor |
| Rutas | Las redes a las que pueden acceder los clientes. Añada las redes de su LAN o envíe **todo el tráfico** por la VPN |
| Cliente a cliente | Si los clientes pueden alcanzarse entre sí |
| Opciones DHCP | Opciones adicionales que se envían a los clientes, útiles para llegar a una red Windows por la VPN |

Al crear el servidor también puede elegir crear las cuentas de todos los usuarios de la base de datos a la vez. Esta opción
solo está disponible en la creación. Los certificados creados tienen una validez de diez años.

La unidad abre automáticamente en el firewall el puerto necesario.

## Cuentas

La lista de cuentas muestra quién puede conectarse. Según el modo de autenticación, un usuario necesita una contraseña, un
certificado válido o ambos. Los cambios surten efecto de inmediato.

Para cada cuenta puede:

- **Descargar la configuración del cliente** y entregarla al usuario. Algunos clientes también admiten un código QR.
- **Reservar una dirección** para que el usuario reciba siempre la misma dirección VPN.
- **Renovar el certificado.** Esto revoca el anterior, así que el usuario debe descargar el nuevo certificado para volver a
  conectarse.
- **Desactivar o eliminar** la cuenta. Eliminar una cuenta también elimina su certificado.

## Clientes conectados e historial

La página muestra quién está conectado ahora, desde cuándo y cuánto ha transferido. El historial lista las sesiones
pasadas y se puede filtrar por usuario y por intervalo de fechas.

## Eliminar el servidor

Eliminar el servidor elimina todas las cuentas asociadas a él y no se puede deshacer. Exporte antes lo que necesite.

## Software cliente

Use cualquier cliente compatible con OpenVPN. La configuración descargada contiene lo que el cliente necesita. Pida a los
usuarios que instalen un cliente, importen el archivo y se conecten.

## Páginas relacionadas

- [Usuarios y grupos](../access-identity/users-groups.md)
- [Reglas de firewall](../policy/firewall-rules.md), para controlar a qué pueden acceder los usuarios de la VPN
