---
title: SD-WAN
sidebar_position: 2
description: Use varios enlaces de internet con conmutación por error, balanceo y enrutamiento basado en políticas.
---

# SD-WAN

**Red > SD-WAN** gestiona varios enlaces WAN. Supervisa cada enlace, desvía el tráfico de uno que falla y puede repartir o
dirigir el tráfico según la política.

## Conceptos

- **Puerta de enlace:** una interfaz WAN que participa en SD-WAN.
- **Política:** cómo se distribuye el tráfico entre las puertas de enlace, por ejemplo "usar el enlace A, con el B de
  respaldo" o "balancear entre A y B".
- **Regla:** asigna una política a cierto tráfico.

## Políticas

Abra la pestaña **Políticas**. Con más de una WAN, la **política predeterminada** es obligatoria y no se puede eliminar.
Cree otras políticas para casos especiales, como "las videoconferencias siempre por el enlace más rápido". Una política
lista sus puertas de enlace con un **peso** o un orden, según quiera balancear o tener un principal y uno de respaldo.

## Reglas

Las reglas eligen qué política se aplica a qué tráfico. Compare por origen, destino, protocolo y puertos (puede usar
[objetos](../policy/objects.md)) y luego elija la política. La regla predeterminada está al final de la lista, así que
**coloque sus reglas por encima de ella**. Las reglas se evalúan en orden.

La opción **persistente (sticky)** mantiene el tráfico del mismo origen en el mismo enlace que su sesión anterior durante
un período (diez minutos de forma predeterminada). Evita problemas con servicios sensibles a que cambie la dirección de
origen.

## Seguimiento

Para cada WAN, la unidad hace ping a un conjunto de hosts para decidir si el enlace funciona. El enlace sigue activo
mientras **al menos un** host responda. Configure:

- los hosts a los que hacer ping (direcciones o nombres). Elija hosts fiables y a los que no le importe hacer ping;
- con qué frecuencia hacer ping y cuánto esperar;
- cuántas pruebas fallidas dan de baja un enlace y cuántas correctas lo vuelven a dar de alta.

Los valores predeterminados se ajustan a la mayoría de las conexiones. Cámbielos solo si los enlaces oscilan o tardan
demasiado en recuperarse.

## Páginas relacionadas

- [Interfaces y enrutamiento](interfaces-routing.md)
- [Rendimiento](../operation-analytics/performance.md) para el historial de latencia
