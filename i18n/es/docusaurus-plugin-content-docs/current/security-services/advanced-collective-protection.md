---
title: Protección Avanzada y Colectiva (IA)
sidebar_position: 6
description: Avisos sobre dispositivos que se comportan como infectados y las listas compartidas de los firewalls Nexwall.
---

# Protección Avanzada y Colectiva (IA)

**Servicios de seguridad > Protección Avanzada y Colectiva (IA)** reúne dos protecciones en una página. Ambas necesitan el
módulo de Protección Avanzada contra Amenazas de su plan (está incluido en la prueba).

| Protección | Qué hace | ¿Bloquea? |
|---|---|---|
| **Protección Avanzada** | Puntúa cada dispositivo de sus redes internas con un modelo de comportamiento que se ejecuta en este firewall y genera un aviso, con el motivo en palabras, cuando uno actúa como una máquina infectada | No. Los avisos son informativos |
| **Protección Colectiva** | Usa listas de direcciones y nombres de dominio externos que varios firewalls Nexwall encontraron detrás de ataques y que Nexwall revisó, y, si usted lo permite, envía informes del mismo tipo | Sí, mediante el Bloqueo de IP y Geografía y el Filtrado DNS, solo para las entradas que Nexwall aprobó |

En la parte superior derecha de la página, una insignia para cada protección muestra su estado tal como lo tiene realmente
el firewall, no solo el interruptor: **en ejecución** (verde), **degradada** (ámbar: funciona, pero algo está mal, y el aviso
bajo la insignia dice qué), **no está en ejecución** (rojo: activada, pero el servicio está caído) o **desactivada**.

## Protección Avanzada

Cada minuto el firewall puntúa cada dispositivo de las redes internas con el modelo de comportamiento. Observa qué tan
regulares son las conexiones, cuántos datos salen, puertos poco comunes, a cuántos destinos nuevos se conecta el dispositivo
y los nombres DNS que pide (nombres de aspecto generado, consultas fallidas). No se lee ningún contenido ni dirección web
completa.

Un dispositivo que parece infectado aparece como aviso en **Operación y Análisis > Análisis de Amenazas** (capa Protección
Avanzada) y en la lista al final de esta página, con los motivos. El aviso es informativo: esta protección no bloquea nada.

Desactívela con el interruptor y **Guardar**, y luego aplique los cambios. El servicio de puntuación se detiene; las demás
protecciones no se ven afectadas. El monitor de la página muestra la CPU y la memoria del servicio, cuántas conexiones y
nombres DNS lee por minuto, cuánto dura un ciclo de puntuación y cuántos dispositivos sigue.

## Protección Colectiva

La Protección Colectiva añade dos listas a las listas de amenazas de Nexwall: **Defensa Colectiva: direcciones** (usada por
el Bloqueo de IP y Geografía) y **Defensa Colectiva: dominios** (usada por el Filtrado DNS). Se activan una sola vez, cuando
su firewall las ve por primera vez; después, su elección se respeta. Una entrada se publica para todos los firewalls solo
después de que al menos tres firewalls distintos la informaron y Nexwall la revisó, y caduca catorce días después del último
informe. Los servicios que aplican las listas deben estar activados; la página lo indica cuando uno está apagado.

### Informes

Con **Enviar informes a Nexwall** activado (el valor por defecto), el firewall envía un informe breve cuando la Protección
Avanzada encuentra un dispositivo que actúa como infectado, para que los demás firewalls Nexwall se protejan del mismo
atacante. Un informe contiene solamente:

- la dirección o el nombre de dominio **externo** que el dispositivo contactó o pidió,
- el tipo de evidencia (conexiones periódicas o un nombre de aspecto generado) y una puntuación,
- la versión del modelo y el día.

Un informe nunca contiene datos: ni archivos, ni tráfico, ni direcciones o páginas web, ni nombres de usuario, ni
direcciones o nombres de su red interna o del dispositivo. Las direcciones privadas y los nombres bajo dominios de nivel
superior privados (`.lan`, `.local`, `.internal`, ...) se eliminan en el firewall y de nuevo en el servidor. Puede
desactivar los informes en cualquier momento; la protección del firewall sigue funcionando y sigue recibiendo las listas
compartidas. Lea el aviso de privacidad enlazado junto al interruptor.

## Actualizaciones

La tarjeta **Actualizaciones del modelo y de las listas** muestra lo que el firewall tiene del servidor de Nexwall: el
modelo de comportamiento (nombre, versión, cuándo se entrenó, la ventana que observa y sus umbrales), el paquete de listas
de amenazas con el número de direcciones y dominios compartidos, y el último informe enviado. Todo está firmado: el
firewall comprueba la firma y el hash antes de usar un archivo y conserva el modelo anterior si rechaza uno nuevo.

- **Actualizar ahora** busca un modelo nuevo y listas nuevas de inmediato y envía un informe pendiente.
- **Actualizaciones automáticas del modelo**: elija con qué frecuencia se busca el modelo (cada 1, 3, 6, 12 o 24 horas).
  Las listas compartidas siguen el calendario de las listas de Threat Shield (cada 30 minutos). Los informes se envían como
  máximo una vez por hora.

## Cuando la insignia no es verde

| Aviso | Significado | Qué hacer |
|---|---|---|
| El servicio de puntuación no está en ejecución o dejó de informar | La Protección Avanzada está activada pero el servicio está caído | Espere un minuto; si persiste, revise el registro del sistema (`logread \| grep nexwall-atp`) y contacte al soporte |
| Todavía no hay un modelo de comportamiento instalado | El modelo no se ha descargado | Use **Actualizar ahora**; compruebe que el firewall llega al servidor de licencias de Nexwall |
| No se pueden leer los nombres DNS | No se pudo abrir la vista de paquetes de las redes internas, por lo que faltan las señales de DNS | Compruebe que existen las interfaces internas; la vista se reintenta cada diez minutos |
| Hace mucho que no se comprueba el modelo | No se llega al servidor de Nexwall o la comprobación falla | Compruebe la conexión a Internet y el estado de la licencia |
| La lista compartida está desactivada o no descargada | La lista todavía no está en uso | Use **Actualizar ahora**; las listas se activan con la primera actualización |
| El Bloqueo de IP y Geografía / Filtrado DNS está desactivado | La lista compartida no la aplica un servicio apagado | Active el servicio en Servicios de seguridad |

## Lo que no puede hacer

El modelo de comportamiento se entrenó con escenarios de laboratorio y es **informativo**. Puede no detectar un dispositivo
infectado y puede avisar sobre uno inofensivo, por ejemplo un programa que se conecta a intervalos regulares. Trate un aviso
como un motivo para revisar el dispositivo, no como un veredicto. No reemplaza al IPS, al antivirus ni al sandbox, y no ve
el tráfico que no cruza el firewall ni el DNS cifrado. Las cifras medidas están en las notas de la versión.

## Línea de comandos

```
nexwall-atp status      # estado del servicio en JSON
nexwall-atp update      # buscar un modelo nuevo ahora
nexwall-atp rollback    # volver al modelo anterior
nexwall-atp report      # enviar el informe pendiente ahora
```
