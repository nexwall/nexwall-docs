---
title: DNS y DHCP
sidebar_position: 3
description: Entregue direcciones, resuelva nombres y gestione concesiones y registros locales.
---

# DNS y DHCP

**Red > DNS y DHCP** configura el servidor DHCP que da direcciones a sus dispositivos y el servicio DNS que resuelve
nombres para ellos.

## DHCP

Cada interfaz con dirección estática puede servir DHCP. Para cada una establece:

| Ajuste | Significado |
|---|---|
| Habilitado | Activa el servidor para la interfaz |
| Rango | La primera y la última dirección que se reparten, o el inicio y el número de direcciones |
| Tiempo de concesión | Cuánto tiempo conserva un dispositivo una dirección antes de pedirla de nuevo. Use valores como `45m`, `12h`, `2d`, `1w` o `infinite`. El valor predeterminado es una hora para IPv4 |
| Opciones | Opciones DHCP adicionales que se envían a los clientes, por ejemplo una puerta de enlace o un servidor DNS distintos |

El rango debe caber dentro de la red de la interfaz.

### Concesiones estáticas

Una concesión estática entrega siempre la misma dirección a un dispositivo. El dispositivo se identifica por su **dirección
MAC**, y también puede darle un nombre. Use concesiones estáticas para impresoras, servidores y todo lo que quiera
alcanzar en una dirección fija.

### Concesiones dinámicas

La vista **Concesiones dinámicas** lista las direcciones que están en uso: el dispositivo, su dirección y cuándo termina la
concesión.

### Escanear la red

La herramienta **Escanear red** descubre dispositivos en una interfaz. Solo está disponible para interfaces con una red de
/20 o menor.

### Vinculación de MAC

Puede restringir una interfaz para que solo reciban servicio los dispositivos con una concesión estática. Combinada con una
política estricta, esto mantiene fuera de la red a los dispositivos desconocidos.

## DNS

La unidad actúa como resolvedor para sus redes.

| Ajuste | Significado |
|---|---|
| Reenviadores | Servidores DNS ascendentes para los nombres que la unidad no conoce. Use `/dominio/servidor` para enviar las consultas de un dominio a un servidor concreto |
| Dominio local | El sufijo que se añade a los nombres de los clientes DHCP. El valor predeterminado es `lan` |
| Protección contra rebind | Descarta respuestas de internet que apuntan a direcciones privadas, lo que detiene un ataque en el que se usa un navegador para sondear su red |
| Registrar consultas | Anota las consultas DNS en el registro del sistema |

Si su WAN usa una dirección estática, configure al menos un reenviador.

### Registros DNS locales

Los registros asignan un nombre a una dirección en su red local. No son necesarios para los hosts con concesiones
estáticas. Úselos para nombres que apuntan a otro host, o para registros **comodín (wildcard)**, que responden por un
dominio y todos sus subdominios.

## Páginas relacionadas

- [Filtrado de DNS](../security-services/dns-filtering.md)
- [Objetos](../policy/objects.md), donde se pueden usar reservas de DHCP y registros DNS
