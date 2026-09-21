---
title: Reglas de firewall
sidebar_position: 1
description: Reglas de reenvío, entrada y salida, y cómo escribirlas.
---

# Reglas de firewall

**Políticas > Reglas de Firewall** es donde decide qué tráfico se permite. Las reglas se evalúan desde la parte superior de
la lista hacia abajo y **gana la primera regla que coincide**, por lo que el orden importa.

## Las tres listas

| Pestaña | Se aplica a | Uso típico |
|---|---|---|
| Reglas de reenvío | Tráfico que atraviesa el firewall, de una zona a otra | Dejar que la LAN acceda a un servidor en la DMZ, bloquear una red de invitados respecto de la LAN |
| Reglas de entrada | Tráfico dirigido al propio firewall | Permitir la interfaz web o SSH desde una red, permitir que se conecte una VPN |
| Reglas de salida | Tráfico que inicia el propio firewall | Restringir a qué destinos puede acceder la propia unidad |

Lo que no coincide con ninguna regla cae en la **política** de la zona, vea [Zonas y políticas](zones-policies.md).

## Las partes de una regla

| Parte | Significado |
|---|---|
| Nombre | Una etiqueta para usted y sus compañeros |
| Origen | La zona de la que procede el tráfico y, opcionalmente, direcciones. Elija `Cualquiera` para incluir todas las zonas |
| Destino | La zona a la que va el tráfico y, opcionalmente, direcciones. En una regla de reenvío, las zonas de origen y destino deben ser distintas |
| Servicio | Los protocolos y puertos que se comparan |
| Acción | Qué ocurre con el tráfico coincidente: se acepta o se rechaza |
| Registro | Si se escribe una línea de registro para las coincidencias |
| Habilitada | Una regla deshabilitada se conserva pero se ignora |

### Direcciones

Los campos de dirección aceptan una o varias entradas, cada una de las cuales puede ser:

- una única dirección IPv4 o IPv6;
- una red en notación CIDR, por ejemplo `10.10.10.0/24`;
- un rango, por ejemplo `10.10.10.1-10.10.10.5`;
- un [objeto](objects.md), que le permite dar nombre a un grupo de direcciones y reutilizarlo.

### Puertos

Introduzca un puerto, varios separados por comas (`8686, 9090`) o rangos (`5500-5600`).

## Tareas habituales

### Permitir un servicio desde una zona

1. Abra la pestaña adecuada. Para que la LAN acceda a un servidor web en la DMZ, use **Reglas de reenvío**.
2. Añada una regla. Establezca la zona de origen en `lan`, la zona de destino en `dmz`, la dirección de destino en el
   servidor, el servicio en TCP 443 y la acción en permitir.
3. Guarde y después **Aplicar cambios**.

### Cambiar el orden

Las reglas se procesan de arriba hacia abajo. Mueva una regla con los controles de ordenación, o añádala al principio o al
final. Coloque las reglas específicas por encima de las generales.

### Investigar qué hace una regla

Active el registro de la regla y busque sus líneas en [Registros](../operation-analytics/logs.md).

## Reglas creadas por el sistema

Algunas reglas se añaden automáticamente, por ejemplo cuando crea una zona con un preajuste o cuando un servidor VPN
necesita un puerto. Están marcadas para que pueda reconocerlas. Puede inspeccionarlas, y debe cambiarlas con cuidado, ya
que la función que las creó podría dejar de funcionar.

## Páginas relacionadas

- [Zonas y políticas](zones-policies.md)
- [NAT y redirección de puertos](nat-port-forwarding.md)
- [Objetos](objects.md)
