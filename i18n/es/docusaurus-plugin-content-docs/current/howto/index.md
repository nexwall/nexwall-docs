---
title: 'Guías prácticas'
sidebar_position: 0
description: 'Guías paso a paso para configurar cada módulo de la interfaz web de Nexwall Firewall.'
---

# Guías prácticas

Guías orientadas a tareas para administradores: cada una indica dónde hacer clic, qué escribir y cómo confirmar que funcionó. Todas usan la interfaz web y muestran capturas de las pantallas reales. La resolución de problemas está en **Ayuda y KBAs**.

## Políticas

- [Cómo permitir o bloquear tráfico con una regla de firewall](policy/firewall-rule.md) — Cree una regla de reenvío, entrada o salida, elija la acción y colóquela en la posición correcta.
- [Cómo publicar un servidor interno (redirección de puertos)](policy/port-forward.md) — Envíe las conexiones que llegan a la dirección pública a un host de su LAN.
- [Cómo crear una regla de NAT (enmascaramiento o NAT de origen)](policy/nat-rule.md) — Reescriba la dirección de origen del tráfico saliente o excluya tráfico de la traducción.
- [Cómo crear una zona y definir su política](policy/zone.md) — Agrupe interfaces en una zona y controle quién puede comunicarse con quién.
- [Cómo crear objetos reutilizables (conjuntos de hosts y de dominios)](policy/object.md) — Nombre un grupo de hosts, redes o dominios una vez y reutilícelo en reglas, redirecciones y SD-WAN.

## Red

- [Cómo configurar una interfaz de red (WAN, LAN, VLAN)](network/interface.md) — Asigne un puerto libre a una zona, defina su dirección y protocolo o cree un dispositivo VLAN.
- [Cómo añadir una ruta estática](network/route.md) — Indique al firewall qué puerta de enlace alcanza una red a la que no está conectado directamente.
- [Cómo activar y ajustar el servidor DHCP](network/dhcp-server.md) — Entregue direcciones a una red, defina rango y tiempo de concesión, añada opciones DHCP y restrinja quién puede conectarse.
- [Cómo reservar una dirección IP fija para un dispositivo](network/dhcp-reservation.md) — Entregue siempre la misma dirección a un servidor, impresora o cámara.
- [Cómo definir servidores DNS y nombres DNS locales](network/dns-record.md) — Elija los servidores DNS externos y cree nombres que resuelvan a direcciones locales.
- [Cómo usar dos enlaces de internet (failover o balanceo)](network/sd-wan.md) — Cree una política SD-WAN predeterminada, monitorice cada enlace y añada reglas para tráfico específico.
- [Cómo limitar y repartir el ancho de banda (QoS)](network/qos.md) — Aplique gestión inteligente de colas a un enlace WAN para que ninguna conexión deje sin ancho de banda a las demás.
- [Cómo publicar una aplicación web con el proxy inverso](network/reverse-proxy.md) — Reenvíe peticiones HTTPS por ruta o dominio a un servidor web interno.

## Servicios de seguridad

- [Cómo bloquear aplicaciones y protocolos (Control de aplicaciones)](security/app-control.md) — Cree una regla que bloquee apps como juegos o streaming y añada excepciones para hosts concretos.
- [Cómo filtrar sitios web por categoría (Protección web)](security/web-protection.md) — Bloquee o permita categorías web para una zona, red o grupo de hosts.
- [Cómo activar la prevención de intrusiones (IPS)](security/ips.md) — Active la protección de red, elija la política de reglas y excluya direcciones de confianza.
- [Cómo bloquear dominios maliciosos (Filtrado de DNS)](security/dns-filtering.md) — Active listas de bloqueo DNS, fuerce a los clientes a usar el DNS del firewall y gestione una lista local de permitidos y bloqueados.
- [Cómo bloquear direcciones IP y países maliciosos (Bloqueo de IP y Geolocalización)](security/ip-geo-blocking.md) — Active listas de IP, elija qué registrar y gestione listas locales de permitidos y bloqueados.
- [Cómo activar la Protección avanzada y colectiva](security/atp.md) — Puntúe los dispositivos por comportamiento sospechoso y use las listas compartidas de Defensa colectiva.

## VPN

- [Cómo permitir que los usuarios se conecten desde casa (acceso remoto OpenVPN)](vpn/openvpn-remote-access.md) — Cree el servidor de acceso remoto, añada cuentas y entregue a los usuarios su archivo de configuración.
- [Cómo conectar dos oficinas con OpenVPN (sitio a sitio)](vpn/openvpn-site-to-site.md) — Cree un túnel servidor en un sitio e importe el túnel cliente en el otro.
- [Cómo crear un túnel IPsec con otro firewall o router](vpn/ipsec-site-to-site.md) — Cree un túnel IPsec sitio a sitio con clave precompartida, compatible con la mayoría de fabricantes.
- [Cómo configurar WireGuard (servidor con pares o túnel de par)](vpn/wireguard.md) — Cree un servidor WireGuard y sus pares para usuarios, o un túnel de par hacia otro servidor WireGuard.

## Acceso e identidad

- [Cómo crear usuarios y conectar un directorio (LDAP / Active Directory)](access/user.md) — Añada usuarios locales para acceso VPN o conecte una base remota LDAP o Active Directory.
- [Cómo convertir una red en red de invitados con página de acceso (Portal cautivo)](access/captive-portal.md) — Registre la unidad en un gestor de portal cautivo y publique una red para invitados.

## Administración

- [Cómo definir el nombre de host, la zona horaria y NTP](admin/system-settings.md) — Ponga nombre a la unidad, defina la zona horaria y sincronice el reloj.
- [Cómo gestionar el acceso SSH](admin/ssh.md) — Cambie el puerto SSH y permita o prohíba el acceso con contraseña.
- [Cómo actualizar el firewall (ahora o programado)](admin/update.md) — Compruebe si hay una versión nueva, haga una copia e instálela de inmediato o a la hora elegida.
- [Cómo hacer copia de seguridad y restaurar la configuración](admin/backup-restore.md) — Descargue una copia cifrada, ejecute una copia en la nube y restáurela.
- [Cómo instalar un certificado web de confianza (Let's Encrypt o importado)](admin/certificate.md) — Sustituya el certificado autofirmado por uno de confianza para la interfaz web y el proxy inverso.
- [Cómo conectar el firewall al Cloud Controller](admin/central-management.md) — Una la unidad a un controlador con un código de unión para gestionarla de forma remota.
- [Cómo registrar la licencia y revisar la suscripción](admin/licensing.md) — Registre la unidad en el servidor de licencias y vea el plan, la caducidad y las funciones.
- [Cómo reiniciar o apagar el firewall de forma segura](admin/reboot-shutdown.md) — Reinicie o apague la unidad desde la interfaz web.

## Monitorización y registros

- [Cómo leer el panel](monitor/dashboard.md) — Entienda la salud, el tráfico y los servicios de la primera página.
- [Cómo buscar en los registros](monitor/logs.md) — Abra el visor de registros, siga los eventos en vivo y filtre con una expresión regular.
- [Cómo ver y cortar conexiones activas](monitor/connections.md) — Lea la tabla de seguimiento de conexiones, fíltrela y elimine una conexión.
- [Cómo ver quién usa la red (Traffic Analytics)](monitor/traffic-analytics.md) — Encuentre los dispositivos, aplicaciones, sitios y horas de más tráfico.
- [Cómo revisar las amenazas detenidas y los dispositivos en riesgo](monitor/threat-analytics.md) — Lea la línea de tiempo de amenazas, las protecciones que actuaron y los dispositivos que necesitan atención.
