---
title: Protección web
sidebar_position: 5
description: Bloquee sitios web por categoría, inspeccione el tráfico cifrado donde importa, analice las descargas en busca de virus y fuerce SafeSearch y las restricciones de YouTube.
---

# Protección web

**Servicios de seguridad > Protección web** controla qué sitios web pueden visitar sus usuarios y qué pueden descargar. Funciona en
tres capas que puede usar por separado o juntas:

1. **Categorías de sitios web** (bloqueo). Los sitios se clasifican en 59 categorías, como contenido para adultos, juegos de azar,
   drogas, redes sociales, streaming, juegos, malware y phishing. Una regla bloquea las categorías que elija para sus redes o
   dispositivos. No hace falta ningún certificado en los dispositivos.
2. **Inspección del tráfico cifrado.** Para las categorías que elija, el firewall abre la conexión HTTPS a través de su proxy web,
   comprueba el certificado del sitio y deja que el antivirus analice las descargas. Los dispositivos deben confiar en el
   certificado de inspección del firewall.
3. **Antivirus.** ClamAV y las reglas YARA analizan los archivos descargados por conexiones inspeccionadas y las descargas web
   (HTTP) sin cifrar de los mismos dispositivos. Un archivo infectado se sustituye por una página de bloqueo y se registra.

La protección web forma parte del paquete de seguridad (vea [Licencias y cuenta](../administration/licensing-account)). Una unidad
en su periodo de prueba puede usarla.

## Perfiles: la forma rápida

En el asistente de configuración (y en **Control de aplicaciones**) puede elegir un perfil. Una sola elección crea las reglas de
aplicaciones **y** las reglas web:

| Perfil | Sitios bloqueados | Inspeccionado y analizado | Opciones familiares |
|---|---|---|---|
| **Estándar** | malware, phishing, hacking, cryptojacking, stalkerware, contenido para adultos, anonimizadores VPN y proxy, DNS cifrado, piratería | intercambio de archivos, alojamiento, acortadores de URL, correo web, foros | desactivadas |
| **Escuela** | Estándar más juegos de azar, drogas, violencia, citas, redes sociales, streaming, juegos, entretenimiento | Estándar más servicios de IA | SafeSearch activado, YouTube Estricto |
| **Restringido** | Escuela más compras, deportes, acceso remoto, intercambio de archivos, publicidad, criptomonedas, acortadores de URL | alojamiento, correo web, foros, servicios de IA | SafeSearch activado, YouTube Moderado |

Las reglas creadas por un perfil aparecen marcadas como **De un perfil** en la lista. Puede editarlas o borrarlas; al elegir otro
perfil solo se reemplazan las reglas que creó un perfil, nunca las suyas.

## Reglas

Abra **Servicios de seguridad > Protección web > Reglas**.

- **Dónde se aplica**: una o más zonas (por ejemplo LAN) y, si lo desea, solo algunos dispositivos o redes (objetos).
- **Bloquear estas categorías**: las categorías a bloquear. Use **Permitir solo estas categorías** para una lista de permitidos; las
  categorías de infraestructura (redes de distribución de contenido, actualizaciones de software) siguen abiertas para que la
  red no se rompa.
- **Política TLS**: versión mínima de TLS, cifrados y comprobaciones de certificado, y qué ocurre cuando una comprobación falla.
- **Inspeccionar el tráfico cifrado**: en una regla con esta opción las categorías que indique no se bloquean, se **inspeccionan**
  (se descifran, se revisan y se analizan). Use una segunda regla para bloquear otras categorías de los mismos dispositivos.
- **Forzar SafeSearch** y **Modo restringido de YouTube**: vea más abajo.

Las categorías siguen al catálogo: un sitio nuevo en una categoría queda cubierto sin tocar la regla. El catálogo se descarga del
servidor de licencias de Nexwall y se actualiza automáticamente; **Ajustes** muestra su versión y permite actualizarlo ahora.
En el firewall solo se instalan las categorías que usan sus reglas.

:::note
Los sitios que no están en ninguna categoría se permiten. Para permitir siempre un sitio o no inspeccionarlo nunca, agréguelo como **excepción**.
:::

## Inspección del tráfico cifrado

Cada firewall crea su propia autoridad de certificación (CA) la primera vez que necesita inspeccionar. Instale este certificado en
cada dispositivo cuyo tráfico se inspecciona; de lo contrario el navegador muestra una advertencia:

1. Abra **Servicios de seguridad > Protección web > Inspección** y descargue el certificado de la CA.
2. Instálelo como autoridad raíz de confianza en los dispositivos (Windows: administrador de certificados; macOS: Acceso a
   Llaveros; Linux y Android: el almacén de certificados del sistema o el del navegador; las empresas lo distribuyen con su gestión de dispositivos).
3. Compruebe un dispositivo abriendo un sitio inspeccionado: el certificado debe estar emitido por *Nexwall Firewall Inspection CA*.

Conviene saber:

- Al restaurar una copia de configuración en un firewall nuevo o reinstalado, vuelven las reglas y los perfiles, pero el firewall crea una CA de inspección **nueva**: instale el nuevo certificado en los dispositivos otra vez. Las listas de categorías, las firmas del antivirus y las reglas YARA se descargan de nuevo después de la primera comprobación de licencia (unos minutos).
- La clave privada de la CA permanece en el firewall y no se incluye en copias de seguridad ni imágenes. **Rote** la CA desde la
  misma página si sospecha que quedó expuesta; los dispositivos deberán confiar en el certificado nuevo.
- Los sitios que nunca deben abrirse (bancos, gobierno, salud, educación) no están en las categorías inspeccionadas de los
  perfiles. Agregue otros sitios sensibles como excepciones.
- Si el proxy web deja de responder, el firewall retira la redirección por sí solo, las conexiones salen directamente a internet
  (sin inspección) y se registra un mensaje. Cuando el proxy vuelve a responder, la redirección regresa.
- Los navegadores pueden intentar QUIC (UDP puerto 443). Para los dispositivos inspeccionados el firewall lo rechaza y el navegador usa la
  conexión TLS inspeccionada (opción `block_quic`, activada por defecto).
- Las aplicaciones que fijan su certificado (algunos clientes bancarios y de actualización) fallan al ser inspeccionadas: agréguelas como excepciones.
- La inspección consume CPU en proporción al tráfico que abre. Empiece con las categorías que realmente necesite.

## Antivirus

Abra **Servicios de seguridad > Protección web > Antivirus**.

- **Motores**: ClamAV (firmas de los espejos de ClamAV, actualizadas varias veces al día) y YARA (reglas del servidor de licencias de
  Nexwall, actualizadas cada semana). Ambos analizan cada archivo; cualquiera de los dos puede detenerlo.
- **Almacenamiento**: las firmas de ClamAV necesitan unos 300 MB y el motor unos 1 GB de memoria. El antivirus necesita el
  almacenamiento de datos del firewall y no arranca sin él. El primer arranque descarga las firmas (unos minutos); la página
  muestra su fecha y el estado de cada motor.
- **Tamaño máximo de análisis**: los archivos mayores no se analizan. Elija si se **permiten** o se **bloquean**.
- **Cuando el analizador no está disponible**: elija **abrir ante fallo** (las descargas continúan) o **cerrar ante fallo** (las
  descargas se rechazan). Si solo un motor está caído, el otro sigue decidiendo y la página muestra *degradado*.
- **Detecciones**: se listan las últimas detecciones con el cliente, el tamaño del archivo y la firma o regla que coincidió.

Para probar el antivirus con seguridad descargue el archivo de prueba EICAR (https://www.eicar.org/download-anti-malware-testfile/) desde un
dispositivo cubierto por una regla que inspecciona: la descarga debe sustituirse por la página de bloqueo.

## SafeSearch y modo restringido de YouTube

Una regla puede forzar los modos seguros de los buscadores y de YouTube para sus dispositivos:

- **Forzar SafeSearch**: Google (todos los dominios por país), Bing y DuckDuckGo devuelven solo resultados filtrados.
- **Modo restringido de YouTube**: **Estricto** oculta la mayor parte del contenido para adultos (para niños), **Moderado** oculta menos (para adolescentes).

Cómo funciona: el firewall responde los nombres de estos servicios con la dirección que los proveedores publican para sus modos seguros, solo
para los dispositivos de la regla. Las consultas de esos dispositivos a **cualquier** servidor DNS se redirigen a él, así que cambiar el servidor
DNS en el dispositivo no sirve. El DNS sobre HTTPS y TLS los bloquean los perfiles. Las opciones no necesitan el certificado de inspección.

Límites: las opciones se aplican a dispositivos, no a cuentas de usuario, todavía no hay horarios ni cuotas de tiempo, y un niño que pueda
instalar su propia VPN o usar la red móvil queda fuera del firewall.

## Registros

Los sitios bloqueados y las detecciones del antivirus aparecen en el **Visor de registros** (pestañas Control de aplicaciones, Tráfico del
firewall y Sistema; la pestaña **Tráfico y aplicaciones** muestra lo que se usó). El firewall conserva los informes de tráfico por hora durante 35 días.

## Solución de problemas

| Síntoma | Compruebe |
|---|---|
| Un sitio bloqueado sigue abriéndose | El dispositivo no está en las zonas u objetos de la regla; el sitio está en una excepción; la lista de la categoría aún no está instalada (Ajustes muestra el estado del catálogo); el sitio usa un nombre que no está en ninguna categoría. |
| Advertencias de certificado en sitios inspeccionados | La CA de inspección no está instalada en el dispositivo, o el dispositivo no es el que cree (compruebe su dirección). |
| Un sitio falla solo cuando se inspecciona | Fija su certificado: agréguelo como excepción. |
| El antivirus no arranca | Falta el almacenamiento de datos (página Almacenamiento), la licencia no incluye Antivirus / Sandbox, o la primera descarga de firmas no ha terminado. |
| SafeSearch no se aplica | El dispositivo no está en el alcance de la regla, la regla está desactivada o la protección web está apagada (el aviso en la parte superior de la página lo indica). |
