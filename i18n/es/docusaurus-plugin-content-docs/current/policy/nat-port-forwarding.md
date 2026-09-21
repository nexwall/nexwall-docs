---
title: NAT y redirección de puertos
sidebar_position: 2
description: Enmascaramiento, NAT de origen, asignación uno a uno, ayudantes de NAT y redirecciones de puertos.
---

# NAT y redirección de puertos

La Traducción de Direcciones de Red, el NAT, cambia las direcciones de los paquetes a medida que pasan por el firewall. La
unidad admite varias formas, cada una en su propio lugar.

## NAT

**Políticas > NAT** lista las reglas que traducen direcciones de origen.

| Tipo | Qué hace |
|---|---|
| Enmascaramiento (Masquerade) | Los hosts de una red privada comparten la dirección de la interfaz de salida. Es lo que da a su LAN acceso a internet |
| NAT de origen (SNAT) | Reescribe el origen del tráfico coincidente a una dirección que usted elige |
| Sin NAT | Excluye tráfico concreto de la traducción, por ejemplo el tráfico entre dos sedes por un túnel |

Cree una regla eligiendo el tipo, el tráfico con el que coincide (origen, destino, servicio) y, para SNAT, la dirección a
usar.

### NETMAP

NETMAP realiza una traducción **uno a uno** de una red completa. Cada host conserva su posición en la red: un host `.15`
de `192.168.1.0/24` puede aparecer como `.15` en otra red. Se usa típicamente para conectar dos sedes que usan las mismas
direcciones, sin renumerar ninguna de ellas.

### Ayudantes de NAT

Algunos protocolos llevan direcciones dentro de su carga útil, lo que se rompe cuando el NAT cambia las cabeceras de los
paquetes. Los ayudantes de NAT son módulos del kernel que corrigen la carga útil de protocolos concretos. La página los
lista y le permite activar o desactivar cada uno.

:::note
Un ayudante que desactiva puede seguir cargado en el kernel porque otro módulo depende de él, o porque se cargó antes. La
página se lo indica cuando ocurre, y puede hacer falta un reinicio para descargarlo por completo.
:::

## Redirección de puertos

**Políticas > Redirección de Puertos** envía las conexiones que llegan a la dirección pública del firewall a un host de
una red interna. Es la forma de publicar un servicio, como un servidor web.

### Crear una redirección de puerto

| Campo | Significado |
|---|---|
| Nombre | Una etiqueta |
| Protocolo | TCP, UDP, ambos o cualquiera |
| Puerto de origen | El puerto al que se conectan los clientes. Se acepta un rango |
| Dirección de destino | El host interno, o un objeto, que recibe el tráfico |
| Puerto de destino | El puerto en el host interno. Si lo deja vacío, es el mismo que el puerto de origen |
| Restringir acceso desde | De forma predeterminada cualquiera puede conectarse. Añada direcciones o redes para permitir solo esas |
| Reflexión | Permite que los hosts de la red interna accedan al servicio usando la dirección pública |
| Registro | Escribe una línea de registro para las coincidencias |

### Qué debe saber

- **El protocolo `cualquiera` redirige todo.** La página le avisa: todo el tráfico de ese tipo va al destino.
- **Redirigir todo el tráfico** a un host omite la protección del firewall para ese host y hace inaccesibles, en esa
  dirección pública, los servicios del propio firewall, como la interfaz web o SSH.
- La lista de restricción acepta direcciones, redes y la mayoría de los objetos. Los conjuntos de hosts que contienen
  rangos de IP u otros objetos no son compatibles con las redirecciones de puertos.
- Una redirección de puerto abre el destino, pero puede que aún necesite una regla de reenvío si la política de su zona
  bloquea el tráfico. Vea [Reglas de firewall](firewall-rules.md).

## Páginas relacionadas

- [Zonas y políticas](zones-policies.md)
- [Objetos](objects.md)
