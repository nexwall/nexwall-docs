---
title: Microsoft Teams o Microsoft 365 no inicia sesión
sidebar_position: 4
description: Un caso real, paso a paso. Teams muestra "Algo salió mal" detrás del firewall. Encuentre los nombres de Microsoft bloqueados con una captura de DNS, agréguelos a Dominios permitidos y revise el estado "sin conexión" de Windows.
---

# Microsoft Teams o Microsoft 365 no inicia sesión

**Aplica a:** Nexwall Firewall con filtrado DNS activado · **Audiencia:** administradores y soporte

Este artículo sigue un caso real del laboratorio, desde el primer síntoma hasta las comprobaciones. El mismo método sirve
para cualquier aplicación que funciona con conexión directa y falla detrás del firewall.

## Síntoma

Un equipo Windows detrás del firewall funciona con internet y con la VPN corporativa, pero el nuevo Microsoft Teams muestra
**"Algo salió mal"** y no inicia sesión. Reiniciar Teams o el equipo no ayuda. Con el equipo conectado directamente a internet,
o por una VPN que no pasa por el firewall, Teams funciona.

Los detalles del error en Teams son así:

```text
NoNetwork ... "Domain":"com.microsoft.oneauth","ErrorCode":"2606",
"Message":"Invalid authentication credentials for a proxy server. Authentication proxy issue.","SubStatus":"6101"
```

:::note
Aunque diga "proxy server", este mensaje es Windows informando que no tiene una red utilizable para el inicio de sesión. No
prueba que haya un proxy configurado. Use los pasos siguientes para ver qué ocurre realmente.
:::

## Paso 1: Descarte lo obvio en el firewall

1. En **Web Protection**, desactive la **inspección SSL** para la prueba. Si Teams sigue fallando, la inspección no es la causa.
2. En el registro del firewall, compruebe que no se descarta nada del equipo.
3. En la unidad, revise el registro del proxy para la dirección del equipo. Cambie `192.168.1.100`:

```bash
grep 192.168.1.100 /var/log/squid/access.log | tail -50
```

Líneas como `TCP_TUNNEL/200 CONNECT teams.microsoft.com:443` indican que la conexión fue permitida. En el caso real no hubo
solicitudes denegadas, ni de autenticación (`407`), ni descartes, así que la causa no era el proxy ni las reglas del firewall.

## Paso 2: Capture el DNS del equipo y busque nombres bloqueados

El filtrado DNS responde "no encontrado" para un nombre de la lista. Una aplicación que necesita ese nombre falla, y el error
que muestra rara vez lo dice. La forma más rápida de encontrarlo es capturar el DNS del equipo mientras se reproduce el problema.

En la unidad, inicie una captura en la interfaz LAN. Se detiene sola a los 120 segundos:

```bash
timeout 120 tcpdump -i br-lan -n -s 200 -w /tmp/dns.pcap host 192.168.1.100 and port 53
```

Mientras corre, cierre Teams por completo y ábralo de nuevo, y espere el error. Lea la captura:

```bash
tcpdump -nn -r /tmp/dns.pcap | grep -E "NXDomain|NXDOMAIN"
```

Una respuesta `NXDomain` para un nombre de Microsoft es la pista. También puede probar un nombre directamente, primero en
la unidad y luego en un servidor público, y comparar:

```bash
dig @127.0.0.1 events.data.microsoft.com
dig @8.8.8.8 events.data.microsoft.com
```

Si el servidor público responde con una dirección y la unidad no, una lista de bloqueo contiene el nombre.

En el caso real la captura mostró tres nombres de Microsoft respondidos con `NXDomain`:

| Nombre | Lo usa |
|---|---|
| `events.data.microsoft.com` | Telemetría y diagnóstico de inicio de sesión de Microsoft |
| `config.edge.skype.com` | Configuración de Teams |
| `fp.msedge.net` | Edge y WebView2, usado dentro de Teams |

Para saber qué lista contiene un nombre, busque en las listas de la unidad:

```bash
grep -rl "events.data.microsoft.com" /mnt/data/threat-feeds/*/ | head
```

Los nombres estaban en la categoría **publicidad y seguimiento**. Las listas de bloqueo son amplias a propósito, y algunos
nombres que necesitan las aplicaciones de Microsoft están dentro de categorías creadas para telemetría y publicidad.

## Paso 3: Agregue los nombres a Dominios permitidos

1. Abra **Filtrado DNS** y vaya a **Dominios permitidos**.
2. Agregue cada nombre, uno por entrada, y guarde.
3. **Aplique los cambios.**
4. Espere cerca de un minuto a que el filtro se recargue y pruebe de nuevo los nombres con `dig @127.0.0.1 <nombre>`. Ahora
   deben devolver una dirección.

Los dominios permitidos tienen prioridad sobre todas las listas y se mantienen cuando las listas se actualizan. Permita solo
los nombres que vio bloqueados, no categorías enteras. Vea [Filtrado DNS](pathname:///docs/security-services/dns-filtering).

Si un equipo necesita DNS sin filtrar por otro motivo, use la pestaña **Bypass del filtro** en lugar de permitir nombres.

## Paso 4: Compruebe si Windows cree que no tiene conexión

En el caso real, tras permitir los tres nombres, estos se resolvieron y las conexiones propias de Teams funcionaron, pero Teams
siguió fallando y el icono de red de Windows mostraba **sin internet**. El servicio de inicio de sesión de Teams pregunta a
Windows si la red es utilizable, y no envía nada cuando Windows dice "sin conexión". Una captura en el firewall confirmó que,
mientras se volvía a abrir Teams, el equipo no envió al principio ninguna consulta de `login.microsoftonline.com` ni ninguna
comprobación de conectividad de Windows.

La causa estaba en Windows, no en el firewall. Vea
[Windows muestra "sin internet" y falla el inicio de sesión de Microsoft](windows-offline-icon-sign-in.md) para las
comprobaciones, lo que se descartó y la solución provisional que funcionó.

## Resultado en el caso real

- Los tres nombres de Microsoft estaban bloqueados por las listas DNS. Permitirlos fue una solución real para esos nombres.
- Teams siguió fallando porque Windows informaba la red como sin conexión. Agregar **8.8.8.8 como servidor DNS secundario** en
  el equipo hizo que el icono y Teams se recuperaran.
- El equipo también repetía consultas de `dns.google`, que está en la lista de bloqueo de DoH/VPN. Permitirlo, y quitar de nuevo
  el 8.8.8.8, **no** resolvió el problema, así que `dns.google` no era la causa.

## Lista rápida

1. ¿Teams funciona con conexión directa? Si es así, continúe.
2. ¿Hay algo descartado, denegado o autenticado en los registros del firewall y del proxy? Normalmente no.
3. Capture el DNS del equipo al reproducir y busque `NXDomain` en nombres de Microsoft.
4. Encuentre la lista que contiene el nombre, agregue solo ese nombre a **Dominios permitidos** y aplique.
5. Confirme que el nombre se resuelve en la unidad.
6. Si Teams sigue fallando, compruebe que Windows informa la red como conectada (vea el segundo artículo).

## Páginas relacionadas

- [Filtrado DNS](pathname:///docs/security-services/dns-filtering)
- [Web Protection](pathname:///docs/security-services/web-protection)
- [Herramientas de solución de problemas de red](network-troubleshooting-tools.md)
- [Solución de problemas](troubleshooting.md)
