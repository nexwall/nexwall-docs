---
title: Proxy inverso
sidebar_position: 5
description: Publique aplicaciones web internas a través del firewall mediante HTTPS.
---

# Proxy inverso

**Red > Proxy Inverso** publica aplicaciones web que residen en su red interna. Los visitantes se conectan al firewall
mediante HTTPS, y el firewall reenvía sus peticiones al servidor interno. Esto le permite publicar varios sitios detrás de
una sola dirección pública y terminar el cifrado en un solo lugar.

El proxy inverso funciona **únicamente en el puerto TCP 443 (HTTPS)**.

## Requisitos

- El puerto TCP 443 debe estar abierto y ser accesible en la WAN. Si no lo está, la página se lo indica y le pide que
  revise sus reglas en [Reglas de firewall](../policy/firewall-rules.md).
- Un certificado válido para los nombres que publica. Configure los certificados en
  [Certificados](../infrastructure/certificates.md); la página se lo recuerda cuando no hay ninguno configurado.

## Crear una regla

| Campo | Significado |
|---|---|
| Coincidencia | Un **nombre de sitio** (un nombre de dominio completo) o una **ruta de recurso** que empieza por `/` |
| Destino | La dirección interna a la que reenviar, por ejemplo `http://servidor:8080/app` |
| Certificado | El certificado que se presenta a los visitantes |
| Redes permitidas | Opcional. Solo estas redes IPv4 o IPv6 pueden usar la regla |

Las reglas que coinciden con un nombre de sitio se usan para sitios completos. Las reglas que coinciden con una ruta
publican una parte de un sitio.

## Consejos

- Restrinja las aplicaciones administrativas con **Redes permitidas**.
- Pruebe con un navegador desde fuera y revise los [Registros](../operation-analytics/logs.md) si una regla no responde.
- Recuerde que la interfaz web del firewall también usa el puerto 443. Un nombre publicado no debe chocar con el nombre que
  llega al propio firewall.

## Páginas relacionadas

- [NAT y redirección de puertos](../policy/nat-port-forwarding.md) para servicios que no son HTTPS
