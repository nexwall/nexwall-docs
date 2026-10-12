---
title: Protección web
sidebar_position: 5
description: Bloquee sitios web por categoría, lea las páginas con un filtro de contenido, inspeccione el tráfico cifrado donde importa, analice las descargas y fuerce SafeSearch y las restricciones de YouTube.
---

# Protección web

**Servicios de seguridad > Web Protection** controla qué sitios web pueden visitar sus usuarios y qué pueden descargar. Funciona en
capas que puede usar por separado o juntas:

1. **Categorías de sitios web** (bloqueo). Los sitios se clasifican en categorías como contenido adulto, apuestas, drogas, redes
   sociales, streaming, juegos, malware y phishing. Una regla bloquea las categorías que elija para sus redes o dispositivos.
   La primera capa no necesita certificado en los dispositivos.
2. **Página de bloqueo.** Cuando se bloquea un sitio, el usuario ve una página que dice por qué en lugar de un error de conexión.
3. **Filtro de contenido.** Se leen y puntúan las palabras de una página; una página con puntuación demasiado alta para el perfil se bloquea.
4. **Inspección del tráfico cifrado.** Para las categorías que elija, el firewall abre la conexión HTTPS a través de su proxy web,
   comprueba el certificado del sitio, aplica la página de bloqueo y el filtro de contenido, y deja que el antivirus analice las
   descargas. Los dispositivos deben confiar en el certificado de inspección del firewall.
5. **Antivirus y sandbox.** ClamAV y YARA analizan los archivos descargados; los archivos que no pueden decidir pueden abrirse en un sandbox
   (**Intelligent Threat Block**).

Web Protection forma parte del Security Bundle (vea [Licencias y cuenta](../administration/licensing-account)). Una unidad en
período de prueba puede usarla.

## Valores por defecto en una unidad nueva

La primera vez que arranca una unidad se aplican una sola vez los **valores seguros por defecto**, aunque nunca ejecute el asistente: el IPS, el filtro
DNS, la protección de IP y países, y el perfil **Estándar** de Control de aplicaciones, que crea las reglas de Web Protection de ese perfil
(con su perfil de filtro de contenido, y el antivirus cuando la licencia lo incluye y existe el almacenamiento de datos).
Ejecute el asistente o abra **Control de aplicaciones** para elegir otro perfil. No se vuelve a aplicar nada en los arranques siguientes.

## Perfiles: la forma rápida

En el asistente de configuración (y en **Control de aplicaciones**) puede elegir un perfil. Una sola elección crea las reglas de aplicaciones **y** las de
sitios web:

| Perfil | Sitios bloqueados | Inspeccionado y analizado | Opciones familiares | Filtro de contenido |
|---|---|---|---|---|
| **Estándar** | malware, phishing, hacking, cryptojacking, stalkerware, contenido adulto, anonimizadores VPN y proxy, DNS cifrado, piratería | compartición de archivos, hosting, acortadores de URL, correo web, foros | desactivadas | Work |
| **Escuela** | Estándar más apuestas, drogas, violencia, citas, redes sociales, streaming, juegos, entretenimiento | Estándar más servicios de IA | SafeSearch activo, YouTube Estricto | School |
| **Restringido** | Escuela más compras, deportes, acceso remoto, compartición de archivos, publicidad, criptomonedas, acortadores de URL | hosting, correo web, foros, servicios de IA | SafeSearch activo, YouTube Moderado | Private |

Las reglas creadas por un perfil se marcan **Desde un perfil** en la lista. Puede editarlas; elegir otro perfil reemplaza
solo las reglas que creó un perfil, nunca las suyas.

## Las pestañas

| Pestaña | Para qué sirve |
|---|---|
| **Reglas** | Las reglas: dónde se aplican, qué bloquean, inspeccionan o fuerzan |
| **Políticas TLS** | Versión mínima de TLS, cifrados y comprobaciones de certificado, y qué pasa cuando una falla |
| **Filtro de contenido** | Los tres perfiles de contenido (School, Private, Work): modo, umbral, temas y alcance |
| **Excepciones** | Sitios que siempre se permiten o nunca se inspeccionan, y la lista gestionada de sitios que nunca se inspeccionan |
| **Ajustes** | El módulo, la inspección SSL y su CA, las listas de categorías, las actualizaciones automáticas, el antivirus, el sandbox y el monitor del motor |

## Reglas

Abra la pestaña **Reglas**.

- **Dónde se aplica**: una o más zonas (por ejemplo LAN) y, si quiere, solo algunos dispositivos o redes (objetos).
- **Bloquear estas categorías**: las categorías a bloquear. Use **Permitir solo estas categorías** para una lista de permitidos; las
  categorías de infraestructura (redes de distribución de contenido, actualizaciones de software) quedan abiertas para que la red siga funcionando.
- **Inspeccionar**: bloquear e inspeccionar son dos elecciones separadas. Bloquear nunca necesita el proxy: se decide por el nombre del
  servidor y casi no cuesta nada. Inspeccionar es lo que abre una categoría en el proxy (la descifra). En la columna **PERMITIDAS**,
  inspeccionar deja que el antivirus, el filtro de contenido y la política TLS miren dentro del tráfico; en la columna **BLOQUEADAS**,
  deja que el proxy muestre una página de bloqueo en lugar de un error de conexión. Cada columna tiene un interruptor **Inspeccionar todo**
  en la parte superior y cada categoría su propio botón **Inspeccionar**, así abre solo lo necesario y el resto queda fuera del proxy.
- **Filtro de contenido**: el perfil de contenido de la regla, o ninguno.
- **Forzar SafeSearch** y **Modo restringido de YouTube**: vea más abajo.

Para eliminar una regla abra el **menú de tres puntos** de la regla y elija **Eliminar**. No hay botón de eliminar en la fila a propósito,
para que una regla no se borre por un clic accidental.

Las categorías siguen el catálogo: un sitio nuevo añadido a una categoría queda cubierto sin tocar la regla. El catálogo se
descarga del servidor de licencias de Nexwall y se actualiza automáticamente; **Ajustes** muestra su versión y permite actualizarlo
ahora. Solo se instalan en el firewall las categorías que usan sus reglas.

:::note
Los sitios que no están en ninguna categoría se permiten. Para permitir siempre o no inspeccionar nunca un sitio, añádalo como **excepción**.
:::

## La página de bloqueo

Cuando **inspecciona** categorías bloqueadas, un sitio bloqueado muestra al usuario una página que dice por qué (en portugués, español o inglés, con la
categoría, la regla y un código de referencia) en lugar de un error de conexión. El tráfico web de los clientes de la regla pasa entonces por
el proxy del firewall.

- Los sitios por **HTTP** siempre muestran la página.
- Los sitios por **HTTPS** la muestran solo a los dispositivos que confían en el certificado de inspección del firewall. Sin el certificado, el
  navegador muestra su propia advertencia de seguridad, porque la página no puede mostrarse sin abrir la conexión. Las categorías demasiado grandes para el
  proxy, y las aplicaciones, se siguen bloqueando como antes, sin página.
- Si el proxy está caído, las conexiones bloqueadas igualmente son cortadas por la primera capa (el clasificador de tráfico). Una respuesta muy pequeña puede llegar
  antes de que el clasificador decida, así que no lo tome como una garantía.

## Filtro de contenido

El **Filtro de contenido** lee las palabras de una página al pasar por el proxy y le da una puntuación de 0 a 100 en seis temas: contenido
adulto, violencia, drogas, apuestas, discurso de odio y autolesión. Una página cuya puntuación alcanza el umbral del perfil se reemplaza por
la página de bloqueo (con el tema y la puntuación) o solo se registra, según el modo.

| Perfil | Umbral | Sensibilidad | Temas | Páginas leídas por defecto |
|---|---|---|---|---|
| **School** | 45 | alta | los seis | foros y blogs, noticias, entretenimiento, portales, deportes, redes sociales, juegos |
| **Private** | 60 | media | adulto, violencia, drogas, odio, autolesión | foros y blogs, noticias, entretenimiento, portales, deportes |
| **Work** | 85 | baja | adulto, odio | foros y blogs, noticias, portales |

En la pestaña **Filtro de contenido** puede cambiar, para cada perfil, el modo (**bloquear** o **solo registrar**), el umbral (20 a 95), los
temas y el alcance (ciertas categorías o todos los sitios). **Volver a los valores por defecto** restaura el perfil. Una regla elige un perfil.

Cómo funciona la puntuación, en breve: cada tema tiene una lista de palabras y frases en inglés, español y portugués con pesos; cuantas más
palabras y más pesadas, mayor la puntuación. Una página larga cuenta menos, las palabras de estudio, salud o noticias alrededor del tema bajan la
puntuación y, para autolesión, las palabras de ayuda la bajan mucho. Las páginas con menos de 25 palabras no se juzgan y las de más de 2 MB no se leen.

Límites, con honestidad:

- Lee **palabras, no imágenes**. Las imágenes no están cubiertas.
- Una lista de palabras puede equivocarse en ambos sentidos (una página médica sobre drogas, una página inocua que menciona una marca de apuestas). El modo **solo registrar**
  y el umbral existen para eso: empiece registrando, revise el registro y luego bloquee.
- Solo se leen páginas HTML. Las páginas HTTPS se leen solo donde el proxy descifra (las categorías del perfil, o todos los sitios si elige ese alcance,
  lo que cuesta más procesador y puede romper aplicaciones que rechazan una conexión descifrada). Las redes sociales envían su texto como datos, no como
  página, así que use reglas de categoría, SafeSearch y el Modo restringido de YouTube para ellas.
- La comprobación falla abierta: si su servicio está caído, el proxy sigue funcionando y las páginas no se juzgan.

## Inspección del tráfico cifrado

Solo pasan por el proxy las categorías que marque como **Inspeccionar**. Cada firewall crea su propia autoridad certificadora (CA) la primera vez que se necesita la inspección. Instale este certificado en cada
dispositivo cuyo tráfico se inspecciona; de lo contrario el navegador muestra una advertencia:

1. Abra **Servicios de seguridad > Web Protection > Ajustes**, sección **Inspección SSL**, y descargue el certificado de la CA.
2. Instálelo como autoridad raíz de confianza en los dispositivos (Windows: administrador de certificados; macOS: Acceso a Llaveros; Linux y
   Android: el almacén de certificados del sistema o el del navegador; las empresas lo distribuyen con su gestión de dispositivos).
3. Compruebe un dispositivo abriendo un sitio inspeccionado: el certificado mostrado está emitido por *Nexwall Firewall Inspection CA*.

Conviene saber:

- Después de restaurar una copia de seguridad en un firewall nuevo o reinstalado, las reglas y los perfiles vuelven pero el firewall crea una CA de inspección **nueva**: instale el nuevo certificado en los dispositivos otra vez. Las listas de categorías, las firmas del antivirus y las reglas YARA se descargan de nuevo tras la primera comprobación de licencia (unos minutos).
- La clave privada de la CA se queda en el firewall y no se incluye en copias de seguridad ni en imágenes. **Rote** la CA desde la misma
  sección si sospecha que quedó expuesta; los dispositivos deberán confiar entonces en el nuevo certificado.
- Los sitios que nunca deben abrirse (bancos, gobierno, salud, educación) no están en las categorías inspeccionadas de los
  perfiles. Añada otros sitios sensibles como excepciones.
- Si el proxy web deja de responder, el firewall quita la redirección por sí mismo y las conexiones van directo a internet
  (sin inspección), y registra un mensaje. Cuando el proxy vuelve a responder, la redirección regresa.
- Los navegadores pueden intentar QUIC (UDP puerto 443). Para los dispositivos inspeccionados el firewall lo rechaza para que el navegador use la
  conexión TLS inspeccionada.
- Las aplicaciones que fijan sus certificados (algunos clientes bancarios y de actualización) fallan al inspeccionarse: añádalas como excepciones.
- La inspección usa procesador en proporción al tráfico que abre. Empiece con las categorías que realmente necesita.

## Antivirus

En **Ajustes**, sección **Antivirus**.

- **Motores**: ClamAV (firmas de los espejos de ClamAV, actualizadas varias veces al día) y YARA (reglas del servidor de licencias de Nexwall,
  actualizadas semanalmente). Ambos analizan cada archivo; cualquiera puede detenerlo.
- **Almacenamiento**: las firmas de ClamAV necesitan unos 300 MB y el motor unos 1 GB de memoria. El antivirus necesita el almacenamiento de
  datos del firewall y no arranca sin él. El primer arranque descarga las firmas (unos minutos); la página
  muestra su fecha y el estado de cada motor.
- **Tamaño máximo de análisis**: los archivos mayores no se analizan. Elija si se **permiten** o se **bloquean**.
- **Cuando el analizador no está disponible**: elija **fallar abierto** (las descargas continúan) o **fallar cerrado** (las descargas se
  rechazan). Si solo un motor está caído, el otro sigue decidiendo y la página muestra *degradado*.
- **Detecciones**: las últimas detecciones se listan con el cliente, el tamaño del archivo y la firma o regla que coincidió.

Para probar el antivirus con seguridad descargue el archivo de prueba EICAR (https://www.eicar.org/download-anti-malware-testfile/) desde un
dispositivo cubierto por una regla que inspecciona: la descarga debe reemplazarse por la página de bloqueo.

## Sandbox (Intelligent Threat Block)

Los archivos que el antivirus no puede decidir se abren en una máquina Windows aislada y se juzgan por lo que hacen.

- **Usar el sandbox** lo activa (necesita la licencia que lo incluye). Elija el **idioma de la máquina de análisis**.
- **Retener descargas de riesgo hasta el veredicto**: desactivado por defecto, el usuario recibe el archivo al instante y sigue una alerta si resulta
  malicioso. Activado, la descarga espera el veredicto hasta la **espera máxima** que defina (15 a 300 segundos; un análisis normal
  tarda unos 90 segundos); si no hay veredicto a tiempo, el archivo se entrega.
- **Detener también los archivos juzgados sospechosos**: trata *sospechoso* como *malicioso*.
- **Límites**: 60 archivos por hora, 500 archivos y 500 MB por día, 20 MB por archivo, 2 análisis a la vez (una licencia de prueba recibe la mitad).
  Los archivos fuera de los límites no se envían y se entregan normalmente.
- La página muestra los archivos analizados, los que esperan, los maliciosos o sospechosos y el último mensaje.

## SafeSearch y Modo restringido de YouTube

Una regla puede forzar los modos seguros de los buscadores y de YouTube para sus dispositivos:

- **Forzar SafeSearch**: Google (todos los dominios por país), Bing y DuckDuckGo devuelven solo resultados filtrados.
- **Modo restringido de YouTube**: **Estricto** oculta la mayor parte del contenido para adultos (para niños), **Moderado** oculta menos (para adolescentes).

Cómo funciona: el firewall responde los nombres de estos servicios con la dirección que los proveedores publican para sus modos seguros, solo
a los dispositivos de la regla. Las consultas de esos dispositivos a **cualquier** servidor DNS se redirigen a él, así que cambiar el servidor DNS en el
dispositivo no sirve. Los perfiles bloquean DNS sobre HTTPS y TLS. Las opciones no necesitan el certificado de inspección. El firewall
mantiene las direcciones del modo seguro fuera del clasificador de tráfico para que el Control de aplicaciones no las corte.

Límites: las opciones se aplican a dispositivos, no a cuentas de usuario, aún no hay horarios ni cuotas de tiempo, y un niño que pueda
instalar su propia VPN o usar la red móvil queda fuera del firewall.

## Registros

En el **Visor de registros**, la pestaña **Web Protection** muestra todo el tráfico web del proxy, permitido o bloqueado: páginas de bloqueo, archivos detenidos
por el antivirus o el sandbox, bloqueos del filtro de contenido y peticiones que el proxy rechazó. Una casilla agrega los mensajes de los servicios de Web
Protection. Haga clic en un dispositivo para buscarlo. La pestaña **Tráfico y aplicaciones** muestra lo que se usó. El firewall conserva
los informes horarios de tráfico 35 días, y [Análisis de amenazas](../operation-analytics/threat-analytics) muestra lo que se detuvo.

## Solución de problemas

| Síntoma | Compruebe |
|---|---|
| Un sitio bloqueado sigue abriéndose | El dispositivo no está en las zonas u objetos de la regla; el sitio está en una excepción; la lista de categorías aún no está instalada (Ajustes muestra el estado del catálogo); el sitio usa un nombre que no está en ninguna categoría. |
| Un sitio HTTPS bloqueado muestra una advertencia de certificado | La página de bloqueo sobre HTTPS necesita la CA de inspección en el dispositivo. Instálela, o acepte la advertencia: el sitio está bloqueado de todos modos. |
| Advertencias de certificado en sitios inspeccionados | La CA de inspección no está instalada en el dispositivo, o el dispositivo no es el que cree (compruebe su dirección). |
| Un sitio falla solo al inspeccionarse | Fija su certificado: añádalo como excepción. |
| Una página inocua la bloquea el filtro de contenido | Cambie el perfil a **solo registrar**, o suba el umbral; la página de bloqueo muestra el tema y la puntuación. |
| El antivirus no arranca | Falta el almacenamiento de datos (página Almacenamiento), la licencia no incluye Antivirus / Sandbox, o la primera descarga de firmas no ha terminado. |
| SafeSearch no se aplica | El dispositivo no está en el alcance de la regla, la regla está desactivada, o Web Protection está apagado (el aviso en lo alto de la página lo dice). |
