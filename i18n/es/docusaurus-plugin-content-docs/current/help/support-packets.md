---
title: "Support Packets: diagnósticos ejecutados desde el controlador"
sidebar_position: 25
description: Qué son los Support Packets, qué pueden y qué no pueden hacer en el firewall y cómo ejecutarlos desde la pantalla Soporte del controlador en la nube.
---

# Support Packets: diagnósticos ejecutados desde el controlador

**Qué es.** Un Support Packet es un diagnóstico fijo y documentado que el firewall lleva dentro de la imagen. El controlador en la nube puede pedir al firewall que ejecute uno de ellos y traer el resultado, con los datos sensibles retirados y en un archivo zip, a la solicitud de soporte. Es la misma información que los artículos de línea de comandos de esta sección recogen a mano (por ejemplo [KBA-0001](kba-01-health-check) y [KBA-0017](kba-17-support-package)), sin abrir un terminal.

**Se aplica a.** Nexwall Firewall 26.2.2 o posterior, administrado por el Nexwall Cloud Controller. Las versiones anteriores muestran "esta versión del firewall no admite diagnósticos remotos".

## Qué puede y qué no puede hacer un paquete

- Hay 26 paquetes, en grupos: estado, conectividad, DNS, servicios y logs, inspección y rendimiento, Threat Shield, licencia y certificado, y capturas de paquetes. La lista completa, con las entradas y el artículo de cada uno, está publicada en [support.nexwall.com.br](https://support.nexwall.com.br/es/#packets), en la pestaña **Support Packets**.
- Un paquete solo lee. Las capturas (clase R1) observan el tráfico que coincide durante unos segundos y terminan solas. Nada cambia la configuración.
- El firewall ejecuta únicamente los paquetes instalados con la imagen. Acepta el nombre de un paquete y las entradas de ese paquete (una dirección, un nombre, un puerto, un número de líneas); todo lo demás se rechaza. Nunca ejecuta una línea de comandos libre.
- Cada ejecución tiene límite de tiempo y de tamaño de salida, y solo corre un paquete a la vez.
- Contraseñas, claves y tokens se eliminan del resultado antes de que salga del controlador.

En el firewall los paquetes son archivos de solo lectura en `/usr/share/nexwall/support-packets` (un `.sh` y un `.json` por paquete). Puede leerlos allí, y `ubus call ns.support list` muestra cuáles están instalados.

## Ejecutar un paquete desde el controlador

1. Abra **Soporte** en el menú del controlador y seleccione el firewall.
2. En **Seleccione Support Packet**, elija un paquete. Su documentación aparece en el panel central: qué verifica, las entradas, los límites y el artículo para leer.
3. Complete las entradas, marque la casilla de confirmación y seleccione **Ejecutar**. El botón queda deshabilitado hasta marcar la casilla.
4. Lea el resultado en el panel central. **Descargar** (arriba a la derecha del panel) guarda los resultados de la sesión en un archivo zip.
5. Para pedir ayuda, adjunte el zip a su solicitud en el panel de chat, pegándolo o eligiendo un archivo.

## Qué paquete ejecutar

| Síntoma | Paquetes, en este orden |
|---|---|
| No sabe por dónde empezar | `health-check`, luego `links-routes` |
| Sin internet o lento | `links-routes`, `ping`, `dns-resolve`, `path-mtu`, `throughput` |
| Un sitio o aplicación está bloqueado | `packet-1` (quién lo descartó), luego `packet-2` o `packet-3`, `dpi-unknown`, `threat-shield` |
| Las conexiones se caen o se detienen | `dpi-stall`, `conntrack`, `fastpath-state`, `path-mtu` |
| Los nombres no se resuelven | `dns-resolve`, `dns-config`, `dns-trace` |
| Un puerto o servicio no responde | `port-test`, `https-check`, `listening`, `traceroute` |
| Interfaz web o certificado | `web-cert`, `services-state`, `service-detail` |
| Licencia | `license-state` |
| El equipo pide un informe completo | `support-package` |

En las capturas de paquetes, inicie el paquete y luego repita el problema (abra el sitio, haga ping desde el cliente) mientras se ejecuta.

## Artículos relacionados

[KBA-0001](kba-01-health-check), [KBA-0014](kba-14-connectivity), [KBA-0016](kba-16-services), [KBA-0017](kba-17-support-package).
