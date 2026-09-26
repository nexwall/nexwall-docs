---
title: Qué es UCI, y por qué importa
sidebar_position: 5
description: El sistema de configuración detrás de la interfaz web, la API y la línea de comandos, y cómo usarlo para la gestión y la solución de problemas.
---

# Qué es UCI, y por qué importa

UCI, la Unified Configuration Interface, es el sistema de configuración que OpenWrt introdujo para que cada
servicio del sistema — red, firewall, DHCP, VPNs, y todas las funciones propias de Nexwall — se configure de la
misma manera, en lugar de que cada demonio invente su propio formato de archivo. Nexwall Firewall está construido
sobre OpenWrt y mantiene este sistema, y casi todo lo que hace la interfaz web termina siendo un cambio en un
archivo UCI. Entender cómo funciona hace que el comportamiento de la interfaz sea predecible, y le da a usted una
segunda forma de ver y corregir una unidad cuando la interfaz web no basta.

## Qué aporta

- **Una sola sintaxis para todo.** Apréndala una vez y podrá leer o editar la configuración de cualquier servicio,
  no solo los que ya conoce.
- **Una única fuente de verdad.** La interfaz web, la API y la herramienta de línea de comandos `uci` leen y
  escriben exactamente los mismos archivos. Nada se cachea ni se duplica entre ellas — vea por qué las interfaces nunca discrepan, más abajo.
- **Cambios por etapas.** Las ediciones hechas con la herramienta `uci` se mantienen separadas de la configuración
  activa hasta que las confirma (`commit`), así que un cambio a medias no puede dejar un archivo en un estado roto.
- **Estructura que un editor de texto por sí solo no da.** Los archivos de configuración están organizados en
  secciones tipadas, con opciones y listas con nombre, y eso es lo que permite que las herramientas generen,
  validen y comparen configuraciones en lugar de solo concatenar texto.
- **Un formato natural para el respaldo.** Como la configuración es solo un conjunto de pequeños archivos de texto
  en un único directorio, respaldarla, restaurarla o comparar dos unidades entre sí es simple. Vea [Copia de
  seguridad y recuperación](../infrastructure/backup-recovery.md).

## El modelo de datos

Un archivo de configuración UCI se llama **paquete**, y vive en `/etc/config/<paquete>` — por ejemplo
`/etc/config/network`, `/etc/config/firewall`, `/etc/config/dpi`. Dentro de un paquete:

- Una **sección** agrupa opciones relacionadas y tiene un **tipo** (por ejemplo una sección `zone` en el paquete
  firewall, o una sección `interface` en el paquete network). Una sección puede tener **nombre**
  (`config interface 'lan'`) o ser **anónima**, en cuyo caso UCI le da un nombre interno como `@interface[0]` según
  su posición.
- Una **opción** guarda un único valor: `option proto 'static'`.
- Una **lista** guarda varios valores para el mismo nombre de opción: varias líneas `list network 'lan'` bajo una
  zona de firewall, por ejemplo.

Un ejemplo breve, parte de `/etc/config/network`:

```
config interface 'lan'
	option device 'br-lan'
	option proto 'static'
	option ipaddr '192.168.1.1'
	option netmask '255.255.255.0'
```

## Usándolo desde la línea de comandos

| Tarea | Comando |
|---|---|
| Mostrar todo un paquete | `uci show network` |
| Mostrar una opción | `uci get network.lan.ipaddr` |
| Cambiar una opción | `uci set network.lan.ipaddr='192.168.2.1'` |
| Agregar un valor a una lista | `uci add_list firewall.@zone[0].network='guest'` |
| Quitar un valor de una lista | `uci del_list firewall.@zone[0].network='guest'` |
| Crear una sección anónima nueva | `uci add firewall rule` |
| Darle nombre a una sección | `uci rename network.@interface[-1]='guest'` |
| Eliminar una sección u opción | `uci delete network.guest` |
| Ver lo que aún no se confirmó | `uci changes` |
| Escribir los cambios por etapas en disco | `uci commit network` |
| Descartar los cambios por etapas | `uci revert network` |
| Exportar un paquete completo como texto | `uci export network` |
| Extraer toda la configuración para soporte | `uci show` (sin nombre de paquete, todo) |

## Cambios por etapas frente a confirmados

`uci set`, `uci add`, `uci delete` y las variantes `_list` no tocan `/etc/config/` de inmediato. Primero escriben en
un área de cambios pendientes, por eso `uci changes` puede mostrar lo que está a punto de suceder antes de que
suceda. Solo `uci commit` los escribe de verdad en el archivo; `uci revert` los descarta en su lugar.

Esta distinción solo se aplica a los cambios hechos con la herramienta `uci`. Si edita `/etc/config/network`
directamente con un editor de texto, ese cambio ya está en el archivo — no hay un paso de confirmación aparte, ni
un estado pendiente que revertir.

## Después de un cambio: reinicie el servicio correcto

Confirmar un cambio en UCI actualiza el archivo, pero el servicio que lo lee normalmente sigue funcionando con lo
que ya había cargado hasta que se le indica que recargue. Qué servicio reiniciar, y cómo, está cubierto en
[Referencia de comandos de servicios y registros](service-and-log-reference.md) — la misma tabla aplica sin
importar si el cambio vino de la interfaz web, de la API, o directamente de `uci`.

## Por qué la interfaz web, la API y la CLI nunca discrepan

La interfaz web y la API de Nexwall no son una capa sobre una base de datos que por casualidad refleja la
configuración — leen y escriben los archivos UCI directamente, mediante los mismos enlaces `python3-uci` sobre los
que está construida la propia herramienta de línea de comandos `uci`. Solo existe una copia de la configuración en
disco. Un valor que usted define con `uci set` aparece en la interfaz web en cuanto la página se recarga, y un
cambio hecho en la interfaz web es visible para `uci get` de inmediato, sin ningún paso de sincronización entre
ambos y nada que pueda desincronizarse.

## Solución de problemas con UCI

- **Un cambio en la interfaz no parece haber surtido efecto.** Compruebe la opción directamente con `uci get`, y
  compruebe `uci changes` para ese paquete — un cambio hecho por la API puede quedar por etapas sin confirmarse si
  una solicitud se interrumpió a la mitad.
- **Una función se comporta distinto de lo que muestra la interfaz.** Compare `uci show <paquete>` con lo que
  muestra la página. Si ya discrepan en este nivel, el problema está en cómo se lee o se aplica el valor, no en
  cómo lo muestra la interfaz web.
- **Necesita entregar su configuración exacta a soporte**, sin entregar un respaldo completo: `uci show` extrae
  todo, `uci show <paquete>` extrae solo un servicio. Oculte los secretos (PSKs, contraseñas) antes de compartir
  cualquiera de los dos.
- **Cambió algo y un servicio ya no arranca.** Un archivo de configuración editado a mano con un error de tipeo es
  una causa común. `uci show <paquete>` falla de inmediato con un archivo mal formado, lo cual suele ser más rápido
  que leer primero la salida de error del propio servicio.
- **Quiere saber qué contiene realmente un respaldo.** Un respaldo de Nexwall se genera con el `sysupgrade -b`
  estándar de OpenWrt, que siempre incluye todo lo que hay en `/etc/config/` — así que restaurar un respaldo es, en
  el fondo, volver a poner un conjunto conocido de archivos UCI. Vea [Copia de seguridad y
  recuperación](../infrastructure/backup-recovery.md).

## Editar UCI directamente, con seguridad

Recurra a un editor de texto sobre `/etc/config/<paquete>` cuando la interfaz web en sí no sea accesible, o cuando
necesite corregir algo para lo que la interfaz no tiene control. Algunas precauciones:

- Haga un respaldo primero — vea [Copia de seguridad y recuperación](../infrastructure/backup-recovery.md).
- Después de guardar, ejecute `uci show <paquete>` antes de reiniciar nada. Analiza el archivo y falla de
  inmediato ante un error de sintaxis, un error mucho más barato de detectar que descubrirlo después porque un
  servicio no arranca.
- Reinicie solo el servicio que lee ese paquete — vea [Referencia de comandos de servicios y
  registros](service-and-log-reference.md) — en lugar de reiniciar toda la unidad.
- Tenga especial cuidado con `/etc/config/network`: un error ahí puede cortar la interfaz por la que está
  conectado. Mantenga una sesión de consola disponible (no solo SSH por la red que está a punto de cambiar) hasta
  confirmar que la nueva configuración funciona.

## Páginas relacionadas

- [Línea de comandos y preguntas frecuentes](command-line-and-faq.md)
- [Referencia de comandos de servicios y registros](service-and-log-reference.md)
- [Copia de seguridad y recuperación](../infrastructure/backup-recovery.md)
- [Sistema](../infrastructure/system.md)
