---
title: Interfaces y enrutamiento
sidebar_position: 1
description: Configure dispositivos de red, direcciones, interfaces lógicas y rutas estáticas.
---

# Interfaces y enrutamiento

## Interfaces y dispositivos

**Red > Interfaces** lista los **dispositivos** de red de la unidad y las **interfaces** configuradas en ellos. Un
dispositivo es una tarjeta de red, o un dispositivo lógico que usted crea. Una interfaz da a un dispositivo una dirección,
una zona y un protocolo.

### Configurar un dispositivo

Seleccione un dispositivo y elija **Configurar**. Las opciones principales son:

| Ajuste | Significado |
|---|---|
| Zona | La zona a la que pertenece la interfaz. Decide qué reglas se aplican, vea [Zonas y políticas](../policy/zones-policies.md) |
| Protocolo | Dirección estática, cliente DHCP o PPPoE |
| IPv4 | Dirección y máscara y, para una WAN, la puerta de enlace |
| IPv6 | Una dirección, o déjelo vacío para la asignación automática del proveedor. La longitud asignada es 64 |
| DNS | Servidores que usa esta interfaz |
| MTU | Tamaño máximo de paquete, cuando su proveedor exige un valor concreto |

:::note Nombres PPPoE
Los nombres de interfaz PPPoE tienen un límite de longitud. Si un nombre es demasiado largo, elimine la configuración del
dispositivo y vuelva a configurarlo con un nombre más corto.
:::

Para dejar de usar un dispositivo, elimine su configuración; el dispositivo queda **sin asignar** y puede usarse en otro
lugar.

### Dispositivos lógicos

| Tipo | Uso |
|---|---|
| Puente (Bridge) | Une varios dispositivos en un solo segmento de red |
| Bond | Combina varios dispositivos para redundancia o rendimiento. Hay varios modos disponibles, incluidos active-backup y LACP (802.3ad) |
| VLAN | Transporta una red etiquetada sobre un dispositivo. Elija el identificador de la VLAN y el dispositivo base |

Un bond puede tener una **dirección de gestión** interna. Es para uso interno y no se convierte en la dirección principal
del bond; asegúrese de que no esté ya en uso en su red. Eliminar un bond libera sus dispositivos para otras
configuraciones.

### Alias

Un **alias** añade otra dirección a una interfaz existente, por ejemplo para atender una segunda subred en el mismo
segmento.

## Enrutamiento

**Red > Enrutamiento** muestra la tabla de enrutamiento y le permite añadir **rutas estáticas**. Una ruta indica por qué
interfaz y puerta de enlace se llega a un host o a una red.

| Campo | Significado |
|---|---|
| Red | El destino en notación CIDR. Use `0.0.0.0/0` (o `::/0` para IPv6) para la ruta predeterminada |
| Puerta de enlace | El siguiente salto. Si la deja vacía, se crea una ruta de ámbito de enlace. Con `0.0.0.0` no se establece ninguna puerta de enlace |
| Interfaz | La interfaz que se usa para llegar a la red |
| Métrica | Prioridad cuando coinciden varias rutas. Gana la menor |
| On-link | Trata la puerta de enlace como alcanzable aunque no esté dentro de una red de la interfaz |

Las rutas que necesitan los túneles VPN se añaden y se eliminan automáticamente.

## Páginas relacionadas

- [SD-WAN](sd-wan.md) para varios enlaces WAN
- [DNS y DHCP](dns-dhcp.md)
