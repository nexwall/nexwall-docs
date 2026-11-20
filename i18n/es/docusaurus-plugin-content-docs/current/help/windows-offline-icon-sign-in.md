---
title: 'KBA-0013: Windows muestra "sin internet" y falla el inicio de sesión de Microsoft'
sidebar_position: 27
description: Un equipo Windows que llega al firewall por un adaptador virtual puede mostrar el icono sin conexión, y Teams no inicia sesión, aunque la navegación funcione. Qué se revisó, qué se descartó y una solución provisional.
---

# KBA-0013: Windows muestra "sin internet" y falla el inicio de sesión de Microsoft

**Aplica a:** equipos Windows 10 y 11 detrás del firewall · **Audiencia:** administradores y soporte

Este artículo continúa [Microsoft Teams o Microsoft 365 no inicia sesión](teams-microsoft-365-signin.md). Describe un caso real
en el que el firewall funcionaba bien y el problema estaba en cómo Windows decidía que el equipo estaba sin conexión.

## Síntoma

- El icono de red de Windows muestra **sin conexión** ("sin internet"), aunque las páginas web abren.
- El nuevo Microsoft Teams indica que no puede autenticar y pide revisar la conexión de red o el proxy.
- Los detalles del error muestran `NoNetwork`, código `2606`, "Invalid authentication credentials for a proxy server".

## Por qué ocurre

Windows decide si una red tiene internet con una pequeña comprobación de conectividad (NCSI) que ejecuta **para cada red que
conoce**. El inicio de sesión de Microsoft (WAM, usado por Teams y Office) pregunta primero a Windows y ni siquiera prueba la
red cuando Windows dice que no hay internet.

En el caso real el equipo es un host Windows que ejecuta el firewall como máquina virtual. Llega al firewall por un adaptador
virtual (VMware `VMnet 1`), y su adaptador Wi-Fi real no tiene puerta de enlace. Lo que se vio:

- `Get-NetConnectionProfile` listaba **solo la red Wi-Fi**, como "Red no identificada" con `IPv4Connectivity: LocalNetwork`.
- El adaptador virtual estaba activo y tenía la única ruta predeterminada (`0.0.0.0/0` por el firewall), pero **Windows no
  tenía un perfil de red para él**, así que nunca lo comprobaba.
- Tras reiniciar el servicio "Network Location Awareness", una captura en el firewall no mostró **ninguna comprobación de
  conectividad** del equipo (ni consulta de `dns.msftncsi.com` o `www.msftconnecttest.com`, ni solicitud HTTP al puerto 80). El
  resto del tráfico, incluido el DNS de `login.microsoftonline.com`, llegaba normalmente al firewall.
- El firewall no descartó nada, el registro del proxy no tenía solicitudes denegadas ni de autenticación (`407`), y
  `netsh winhttp show proxy` decía acceso directo.

## Cómo comprobarlo

En el equipo Windows, en PowerShell como administrador:

```powershell
Get-NetConnectionProfile | Format-List Name,InterfaceAlias,IPv4Connectivity
Get-NetRoute -DestinationPrefix 0.0.0.0/0
Get-NetAdapter | Format-Table Name,Status,InterfaceDescription,Virtual
netsh winhttp show proxy
```

Si el adaptador que tiene la ruta predeterminada es virtual, no aparece en `Get-NetConnectionProfile`, y las redes listadas
muestran `LocalNetwork` o `NoTraffic`, este artículo aplica.

En el firewall, capture mientras reinicia el servicio en el equipo (`Restart-Service NlaSvc`) y busque las comprobaciones:

```bash
timeout 120 tcpdump -nn -i br-lan host 192.168.1.100 and \( port 53 or port 80 \)
```

Un equipo sano consulta `dns.msftncsi.com` y solicita `www.msftconnecttest.com/connecttest.txt` por el puerto 80. Si no aparece
ninguna, Windows no está comprobando el camino por el firewall.

## Qué se descartó

- **Reglas y descartes del firewall:** no se descartó nada del equipo.
- **Proxy y Web Protection:** sin solicitudes denegadas ni `407`; la inspección SSL estaba desactivada.
- **Filtrado DNS de nombres de Microsoft:** los nombres se permitieron (vea el artículo anterior) y el inicio de sesión siguió
  fallando.
- **`dns.google`:** el equipo repetía consultas y recibía "no encontrado" porque está en la lista de bloqueo de DoH/VPN. Tras
  permitirlo en el firewall, y con solo el firewall como servidor DNS, el icono y Teams siguieron fallando. No era la causa.
- **Un proxy del sistema:** `netsh winhttp show proxy` decía acceso directo.

## Solución provisional que funcionó

Agregar **8.8.8.8 como servidor DNS secundario** en el adaptador de red del equipo hizo que el icono volviera a conectado y que
Teams iniciara sesión. No se entiende la razón. El firewall redirige todo el DNS de la LAN a su propio resolvedor, así que esto
no evita el filtro. Úsela como solución provisional.

## Otras opciones

No se probaron en este caso:

- **Probar con un adaptador físico.** Conecte el equipo a la LAN del firewall con una tarjeta de red real en lugar de un
  adaptador virtual. Windows crea un perfil de red normal para ella.
- **Desactivar la comprobación activa de conectividad** (reversible; reinicie el servicio después). Windows deja de depender de la comprobación:

```powershell
Set-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Services\NlaSvc\Parameters\Internet' -Name EnableActiveProbing -Value 0 -Type DWord
Restart-Service NlaSvc
```

  Se deshace con `-Value 1`.

## Resumen

Fue un comportamiento de Windows en un equipo de pruebas que llega al firewall por un adaptador virtual. No es una falla del
firewall, y un equipo normal con tarjeta de red física no necesita nada de esto. Si el inicio de sesión de Microsoft falla y el
icono muestra sin conexión, revise el perfil de red de Windows antes de cambiar el firewall.

## Páginas relacionadas

- [Microsoft Teams o Microsoft 365 no inicia sesión](teams-microsoft-365-signin.md)
- [Filtrado DNS](pathname:///docs/security-services/dns-filtering)
- [Herramientas de solución de problemas de red](network-troubleshooting-tools.md)
