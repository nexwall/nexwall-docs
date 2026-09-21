---
title: Filtrado de DNS (Threat Shield DNS)
sidebar_position: 3
description: Bloquee dominios no deseados y maliciosos en la resolución de nombres.
---

# Filtrado de DNS (Threat Shield DNS)

**Servicios de Seguridad > Filtrado de DNS** bloquea sitios web impidiendo la resolución de sus nombres. Cuando un
dispositivo pide la dirección de un dominio bloqueado, la unidad no responde con una dirección utilizable, así que el sitio
no se puede alcanzar. Es ligero, funciona para todos los dispositivos de la red sin instalar nada y también bloquea
publicidad y rastreadores.

## Listas de bloqueo

Una **lista de bloqueo** es una lista de dominios agrupados por finalidad y mantenida por alguien. La página lista las
fuentes disponibles y le permite habilitar las que quiera. Cubren categorías como malware y phishing, publicidad y
rastreadores, contenido para adultos, juegos de azar, piratería y servicios usados para eludir el filtrado. Algunas listas
están disponibles para todas las unidades, otras solo con una suscripción que incluya Threat Shield. La página indica cuál
es cuál.

Las listas de bloqueo se actualizan automáticamente.

## Activar el filtro

1. Abra la pestaña **Configuración** y habilite Threat Shield DNS.
2. Elija las **zonas** cuyo tráfico se redirige al filtro. Los dispositivos de esas zonas se filtran aunque estén
   configurados con otro servidor DNS.
3. Elija los **puertos** que se redirigen. El DNS normalmente usa el puerto 53.
4. En **Fuentes de listas de bloqueo**, habilite las listas que quiera.
5. Guarde y **Aplicar cambios**.

## Sus propias listas

- **Lista de bloqueo local:** dominios que quiere bloquear además de las listas.
- **Dominios permitidos:** dominios que nunca deben bloquearse, aunque una lista los contenga. Quitar un dominio de esta
  lista puede hacer que vuelva a bloquearse si una lista lo incluye, y la página se lo advierte.

## Excepciones para algunos dispositivos

Use la pestaña **Bypass del filtro** para dejar de filtrar direcciones o subredes concretas, por ejemplo una red de gestión
o un servidor que necesita acceso sin filtrar.

## Límites que conviene tener presentes

- El filtrado de DNS no ve el contenido de las páginas, solo bloquea nombres. Un dispositivo que se conecta directamente a
  una dirección sin nombre no se ve afectado. Combínelo con el [bloqueo de IP y geolocalización](ip-geo-blocking.md) y con
  el [control de aplicaciones](application-control.md).
- El DNS cifrado que usa una aplicación puede eludir un resolvedor que no sea la unidad. Redirigir los puertos de DNS de la
  zona y habilitar las listas que bloquean servicios usados para eludir el filtrado reduce este riesgo.

## Páginas relacionadas

- [DNS y DHCP](../network/dns-dhcp.md)
- [Objetos](../policy/objects.md)
