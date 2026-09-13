# Spec – Demo Navegable: Sistema de Gestión de Pañol y Setups (MICRO AUTOMACIÓN)

## 1. Objetivo de este documento

Este documento es la especificación funcional y de contenido para que un agente de IA (ej. Claude Code) construya una **demo navegable** del sistema propuesto en el informe técnico "Propuesta de Implementación de Sistema a Medida para Gestión de Pañol y Setups".

**Esta demo NO es el producto final.** Es una maqueta funcional de alta fidelidad, pensada exclusivamente para que la Gerencia de Producción pueda ver y recorrer visualmente la idea del sistema antes de aprobar el desarrollo real.

### Reglas duras para el agente que construya esto

- **Todos los datos son de ejemplo/demo**, cargados de antemano (hardcodeados o en un archivo/JSON local, ver Sección 5). No se conecta a ninguna base de datos real ni a ningún backend real.
- **La única interacción permitida es la navegación** entre pantallas (clickear en un ítem de una lista para ver su detalle, moverse entre módulos del menú, cambiar de pestaña, abrir/cerrar un modal, completar un formulario que simula un guardado).
- **No debe haber persistencia de datos ni lógica real**: los formularios (por ejemplo "Registrar movimiento" o "Nuevo setup") se muestran visualmente y pueden simular un guardado (ej. mostrar un toast de "Guardado correctamente" y volver al listado), pero **no deben guardar nada de verdad**, ni validar contra una base de datos, ni persistir cambios entre sesiones.
- **No hay pantalla de login.** El sistema no requiere usuario/contraseña. La identificación de quién retira o devuelve un insumo se hace mediante el **N° de legajo del empleado** directamente en el formulario de movimiento (ver Sección 4.2.3). Esto es una decisión de diseño real del proyecto, no una limitación de la demo.
- Priorizar que se vea **profesional, prolijo y creíble** por sobre la complejidad funcional. Es una vidriera, no un MVP funcional.
- Stack sugerido para la demo (no es el stack del proyecto final, que será Django): una app web simple de una sola página (React o HTML/CSS/JS plano), rápida de levantar, sin backend. El stack real del proyecto es Django + PostgreSQL, pero **no es necesario usarlo para esta demo**.
- Diseño visual: interfaz industrial/profesional, sobria, tipo panel de gestión (no "flashy"). Paleta sugerida: azul marino / gris / blanco, con acentos de color para alertas (rojo/naranja para stock bajo, verde para OK). Debe verse cómoda de usar en una tablet o PC ubicada físicamente en el pañol de una planta industrial.
- **Referencia visual disponible**: se adjunta un archivo `ficha-tecnica-inserto.html` (ver Sección 6) que es una ficha técnica real ya desarrollada por la empresa para otro proyecto. El agente debe tomarlo como **referencia de estilo y de campos** para el Módulo 4 (Fichas Técnicas) de esta demo — no hace falta copiarlo literal, pero sí respetar la lógica de secciones (parámetros de mecanizado, porta herramientas compatibles, tipos de mecanizado, plano técnico en modal) y, si resulta práctico, reutilizar directamente su HTML/CSS como base.

---

## 2. Contexto del sistema real (para que el agente entienda el dominio)

El sistema completo, del cual esta demo es una muestra, está pensado para digitalizar la gestión del pañol de herramientas y los procesos de setup de máquinas en una planta de mecanizado de partes y piezas. Se desarrolla en fases:

1. **Control de stock de insertos y herramientas** (reemplaza una planilla física; agrega control de devoluciones y elimina la carga manual por parte de un administrativo).
2. **Gestión de accesorios de sujeción** (portaherramientas y accesorios, con reglas de compatibilidad con insertos/herramientas).
3. **Gestión de setup de máquinas** (digitaliza la planilla de puesta a punto: programa, herramientas, portaherramientas, accesorios, n° de pieza, n° de operación).
4. **Fichas técnicas digitales** (mejora complementaria, no crítica: estandariza parámetros de uso de insertos y herramientas).

A futuro (no incluir en la demo, pero el agente puede dejarlo como una nota visual tipo "Próximamente" si lo considera prolijo): migración del ingreso manual de datos a lectura de códigos QR mediante lector dedicado, sobre insumos etiquetados.

La demo debe representar visualmente **estas 4 áreas funcionando de forma integrada**, como si fuera la interfaz que se usaría desde una computadora/tablet ubicada en el pañol.

### 2.1. Cómo se registra un movimiento en la vida real (importante para el diseño del formulario)

No hay login de usuario. El flujo real es así: un empleado se acerca al dispositivo del pañol, indica su **N° de legajo**, el **código interno** del inserto/herramienta que retira o devuelve, y la **cantidad**. Ejemplo: el empleado con legajo 3067 retira 2 unidades del código `HINSE270`, lo carga él mismo (o el pañolero) en el dispositivo, sin necesidad de iniciar sesión.

---

## 3. Mapa de navegación (Sitemap)

```
Dashboard (Home)
├── Módulo 1: Stock de Insertos y Herramientas
│   ├── Listado de insertos y herramientas
│   ├── Detalle de un ítem
│   ├── Registrar movimiento (ingreso / egreso / devolución, por legajo) — UI only
│   └── Historial de movimientos
├── Módulo 2: Accesorios de Sujeción
│   ├── Listado de portaherramientas y accesorios
│   └── Detalle de accesorio (con compatibilidades)
├── Módulo 3: Setup de Máquinas
│   ├── Listado de setups
│   ├── Detalle de un setup (hoja de ruta completa)
│   └── Nuevo setup — UI only
└── Módulo 4: Fichas Técnicas
    ├── Listado de fichas técnicas
    └── Detalle de ficha técnica (con modal de plano técnico)
```

No hay pantalla de login. Al abrir la app se entra directamente al Dashboard.

Navegación principal: **sidebar fija a la izquierda** con los 4 módulos + Dashboard, y un header superior simple con el nombre del sistema (ej. "MICRO AUTOMACIÓN — Gestión de Pañol y Setups") y la fecha/hora actual.

---

## 4. Especificación de pantallas

### 4.1. Dashboard (Home)

Vista de resumen general al entrar al sistema. Debe transmitir "de un vistazo, así está el pañol hoy".

**Contenido:**
- 2 pequeñas tarjetas (cards) de KPIs arriba:
  - Ítems con stock bajo o sin stock (contar `estado` = "Stock bajo" o "Sin stock", ver Sección 5.1 — en este dataset son 7 de 18)
  - Accesorios de sujeción en uso (ej. "42")
- Tabla "Últimos movimientos" (5-6 filas): fecha/hora, legajo + nombre del empleado, tipo (Ingreso/Egreso/Devolución), código, cantidad.
- Sección "Alertas de stock bajo": lista de insertos con `estado` distinto de "OK" (usar los del dataset real, Sección 5.1), con botón decorativo "Ver detalle".
- Accesos rápidos (botones): "Registrar movimiento", "Nuevo setup", "Ver fichas técnicas".

---

### 4.2. Módulo 1 — Stock de Insertos y Herramientas

#### 4.2.1. Listado

Tabla con columnas, usando el dataset real de la Sección 5.1:
- Código (`codigo`)
- Detalle (`detalle`)
- Porta herramientas compatible (`porta_herramientas`, primer valor)
- Stock (`stock`)
- Stock mínimo (`stockMinimo`)
- Estado (badge de color: **OK** verde / **Stock bajo** naranja / **Sin stock** rojo, usando el campo `estado`)

Filtros decorativos arriba: por estado, buscador por código/detalle (puede filtrar sobre los datos falsos en el cliente).

Cada fila es clickeable → lleva al detalle.

Botón "Registrar movimiento" arriba a la derecha.

#### 4.2.2. Detalle de ítem

- Código, detalle, imagen (`url_imagen_inserto`, si no hay usar un placeholder genérico de inserto industrial).
- Stock actual / stock mínimo / estado.
- Parámetros de mecanizado (mismos campos que la ficha técnica: `vc_m_min`, `ft_mm_rpm`, `r_mm`, `ap_mm`) a modo de resumen rápido, con link "Ver ficha técnica completa" que lleva al Módulo 4.
- Gráfico simple (barra o línea) de evolución de stock en los últimos 30 días (datos falsos, no del Excel).
- Tabla de movimientos históricos de ese ítem específico (fecha, legajo/nombre, tipo, cantidad).
- Botón "Registrar movimiento de este ítem" (UI only).

#### 4.2.3. Registrar movimiento (formulario, UI only)

Campos:
- **N° de Legajo** (input numérico o selector con los empleados de la Sección 5.3 — al tipear/seleccionar el legajo, mostrar el nombre del empleado debajo a modo de confirmación, ej. "Legajo 3067 — Jose Moyano")
- **Código** (selector con autocompletado sobre los códigos del dataset de la Sección 5.1, ej. `HINSE270`)
- **Cantidad**
- **Tipo de movimiento**: Ingreso / Egreso / Devolución
- Observaciones (texto libre, opcional)
- Botón "Guardar" → simula guardado (toast/alerta de confirmación tipo "Movimiento registrado: Legajo 3067 retiró 2 u. de HINSE270") y vuelve al listado o al detalle. No persiste nada.

#### 4.2.4. Historial de movimientos (vista general del módulo)

Tabla completa de movimientos (no filtrada por ítem), con columnas: fecha/hora, legajo, nombre del empleado, tipo de movimiento, código, detalle, cantidad. Filtros decorativos por fecha, tipo de movimiento y legajo.

---

### 4.3. Módulo 2 — Accesorios de Sujeción

#### 4.3.1. Listado

Tabla con columnas, usando el dataset de la Sección 5.2:
- Código interno (`HPORT0XX`)
- Descripción / modelo comercial (ej. "SCLCR 1616H-09")
- Tipo (Portaherramientas / Accesorio de sujeción)
- Stock actual
- Estado (OK / Stock bajo, a criterio del agente según el stock cargado)

Cada fila clickeable → detalle.

#### 4.3.2. Detalle de accesorio

- Código interno (`HPORT0XX`), descripción/modelo comercial, tipo, imagen placeholder.
- Stock actual y ubicación.
- Sección "Compatibilidad": lista de insertos del Módulo 1 que son aptos para este accesorio, usando la columna "Compatible con" de la Sección 5.2 (ej. `HPORT001` es compatible con el inserto `HINSE267`).

---

### 4.4. Módulo 3 — Setup de Máquinas

El foco de este módulo **no es un registro de actividad** (no importa fecha, quién lo hizo, ni si está "finalizado"), sino una **hoja de ruta consultable**: dado una pieza y una operación, saber de antemano qué máquina, programa, herramientas, insertos, portaherramientas y boquillas hacen falta, y cuánto tiempo demanda el setup y el ciclo de programa.

#### 4.4.1. Listado de setups

Tabla con columnas (usando el dataset de la Sección 5.4):
- N° de Setup (`numeroSetup`)
- Pieza (`pieza`)
- Máquina (`maquina`, mostrar también la denominación de la Sección 5.2.1, ej. "233 — CNC Mazak QT-200")
- Operación (`operacion`)
- Programa (`programa`)
- Cant. de herramientas (largo del array `herramientas`)
- Tiempo de setup (`tiempoSetup`, en minutos)

Cada fila clickeable → detalle. Botón "Nuevo setup" arriba a la derecha.

#### 4.4.2. Detalle de setup (hoja de ruta)

Debe reflejar visualmente la planilla física que hoy completan los preparadores, pero digitalizada:

- Datos generales: Pieza, Máquina (código + denominación), Operación, Programa.
- Dos indicadores destacados: **Tiempo de Setup** (`tiempoSetup`, minutos) y **Tiempo de Programa** (`tiempoProg`, minutos) — mostrarlos como KPIs grandes, ya que son datos clave para planificación de producción.
- Tabla "Herramientas / Insertos / Portaherramientas necesarios", con columnas: Código de herramienta o inserto (`herr`, del dataset de la Sección 5.1), Código de portaherramientas (`porta`, del dataset de la Sección 5.2, mostrar también la descripción comercial), Descripción del inserto.
- Sección "Boquillas" (solo si `boquillas` no está vacío): listar cada boquilla como tag (ej. "ER32 Ø10-9").
- Botón "Imprimir / Exportar" (decorativo, no funcional).

#### 4.4.3. Nuevo setup (formulario, UI only)

Campos:
- Pieza
- Máquina (selector, con los códigos de la Sección 5.2.1)
- Operación
- Programa
- Tiempo de Setup (minutos)
- Tiempo de Programa (minutos)
- Tabla para agregar filas de herramienta/inserto (`herr`) + portaherramientas (`porta`) — puede ser estática con 2-3 filas de ejemplo, no hace falta que agregar/quitar filas sea funcional
- Boquillas (campo de texto libre o chips, opcional — ej. "ER32 Ø10-9")
- Botón "Guardar setup" → simula guardado y vuelve al listado. No persiste nada.

---

### 4.5. Módulo 4 — Fichas Técnicas

Esta sección debe tomar como referencia directa de diseño el archivo `ficha-tecnica-inserto.html` adjunto (ver Sección 6), que ya define la estructura visual real usada por la empresa para este tipo de ficha.

#### 4.5.1. Listado

Grid de tarjetas, una por cada inserto del dataset de la Sección 5.1:
- Imagen (`url_imagen_inserto`, placeholder si no hay)
- Código (`codigo`)
- Detalle (`detalle`)
- Badge de clasificación ISO (`clasificacion_iso`)

Clickeable → detalle.

#### 4.5.2. Detalle de ficha técnica

Replicar la estructura del HTML de referencia:
- **Banner de producto**: detalle del inserto + badge con el código.
- **Card de imagen**: "Geometría del Inserto" (`url_imagen_inserto`).
- **Card de parámetros de mecanizado**:
  - Ap [mm] (Prof. corte) → `ap_mm`
  - Ft [mm/rpm] (Avance) → `ft_mm_rpm`
  - Vc [m/min] (Vel. corte) → `vc_m_min`
  - R [mm] (Radio inserto) → `r_mm`
  - Clasificación ISO → `clasificacion_iso` (badges, uno por letra: P / M / N, con color distinto por letra)
  - Si algún parámetro no tiene dato (`null`), mostrar un guión o "Sin datos" en lugar de dejarlo vacío.
- Botón "Ver Plano Técnico" → abre un **modal** con:
  - Imagen del plano (`url_imagen_plano`, o texto "Plano esquemático no disponible" si es `null`)
  - Tabla de medidas (`medidas_plano` — en el dataset actual todos vienen sin datos, mostrar "Sin datos especificados" como en el HTML de referencia)
- **Card "Porta Herramientas Compatibles"**: listar `porta_herramientas` como tags/chips.
- **Card "Tipos de Mecanizado Admitidos"**: usar `url_imagen_tipo_mecanizado`, o el texto "Imagen de tipo de mecanizado no disponible en catálogo" si es `null` (en el dataset actual, todos son `null`).
- Nota visual aclarando que esta información es complementaria a la experiencia del preparador (texto breve, ej. "Este dato es orientativo, complementa el criterio del preparador").

---

## 5. Datos falsos / de ejemplo (usar como base, se puede expandir)

### 5.1. Insertos (Módulo 1 y Módulo 4) — dataset real extraído del catálogo interno

Este dataset proviene del archivo `INSERTOS_POLICRISTALINOS_Y_HORN.xlsx` provisto por la empresa. Los campos `stock`, `stockMinimo` y `estado` fueron agregados para la demo (no existen en el catálogo real, son valores ficticios pensados para mostrar los tres estados posibles: OK, Stock bajo y Sin stock).

```json
[
  {
    "codigo": "HINSE267",
    "detalle": "DCMT 11T304 PCD",
    "porta_herramientas": ["SDJCR 2020K-11"],
    "vc_m_min": "120-250",
    "ft_mm_rpm": "0,05 - 3,00",
    "r_mm": 0.4,
    "ap_mm": "0,10 - 3,00",
    "clasificacion_iso": ["N"],
    "url_imagen_inserto": "https://www.iscar.com/ecatalog/Ecat/datafile/PICTURE/2596.gif",
    "url_imagen_tipo_mecanizado": null,
    "url_imagen_plano": "https://www.iscar.com/Ecat/JPG2D/5700454.jpg",
    "medidas_plano": null,
    "stock": 18,
    "stockMinimo": 8,
    "estado": "OK"
  },
  {
    "codigo": "HINSE268",
    "detalle": "VCGT 160404 PCD",
    "porta_herramientas": ["SVJCR 2020K-16"],
    "vc_m_min": "120-250",
    "ft_mm_rpm": "0,05 - 3,00",
    "r_mm": 0.4,
    "ap_mm": "0,10 - 3,00",
    "clasificacion_iso": ["N"],
    "url_imagen_inserto": "https://www.iscar.com/ecatalog/Ecat/datafile/PICTURE/3728.gif",
    "url_imagen_tipo_mecanizado": null,
    "url_imagen_plano": "https://www.iscar.com/eCatalog/Ecat/illust_ISOm/3728.gif",
    "medidas_plano": null,
    "stock": 6,
    "stockMinimo": 8,
    "estado": "Stock bajo"
  },
  {
    "codigo": "HINSE211",
    "detalle": "CCGT 09T304 PCD",
    "porta_herramientas": ["SCLCR 1616H-09"],
    "vc_m_min": "120-250",
    "ft_mm_rpm": "0,03 - 0,60",
    "r_mm": 0.4,
    "ap_mm": "0,05 - 3,80",
    "clasificacion_iso": ["N"],
    "url_imagen_inserto": "https://www.iscar.com/ecatalog/Ecat/datafile/PICTURE/4856.gif",
    "url_imagen_tipo_mecanizado": null,
    "url_imagen_plano": "https://www.iscar.com/eCatalog/Ecat/illust_ISOm/4856.svg",
    "medidas_plano": null,
    "stock": 25,
    "stockMinimo": 10,
    "estado": "OK"
  },
  {
    "codigo": "HINSE210",
    "detalle": "CCGT 060204 PCD",
    "porta_herramientas": ["S12M SCLCR 06"],
    "vc_m_min": "120-250",
    "ft_mm_rpm": "0,03 - 0,61",
    "r_mm": 0.4,
    "ap_mm": "0,05 - 2,80",
    "clasificacion_iso": ["N"],
    "url_imagen_inserto": "https://www.iscar.com/ecatalog/Ecat/datafile/PICTURE/4856.gif",
    "url_imagen_tipo_mecanizado": null,
    "url_imagen_plano": "https://www.iscar.com/eCatalog/Ecat/illust_ISOm/4856.svg",
    "medidas_plano": null,
    "stock": 0,
    "stockMinimo": 10,
    "estado": "Sin stock"
  },
  {
    "codigo": "HINSE269",
    "detalle": "DGN 2000P PCD",
    "porta_herramientas": ["DGTR 20B 2D35"],
    "vc_m_min": "120-250",
    "ft_mm_rpm": null,
    "r_mm": null,
    "ap_mm": null,
    "clasificacion_iso": ["N"],
    "url_imagen_inserto": null,
    "url_imagen_tipo_mecanizado": null,
    "url_imagen_plano": null,
    "medidas_plano": null,
    "stock": 14,
    "stockMinimo": 6,
    "estado": "OK"
  },
  {
    "codigo": "HINSE212",
    "detalle": "GIPA 3,00 PCD",
    "porta_herramientas": ["GHGR 20-3"],
    "vc_m_min": "120-250",
    "ft_mm_rpm": "0,09 - 0,16",
    "r_mm": 0.2,
    "ap_mm": "0,25 - 1,80",
    "clasificacion_iso": ["N"],
    "url_imagen_inserto": "https://www.iscar.com/ISCARCatalogConfirmPictures/6496822.gif",
    "url_imagen_tipo_mecanizado": null,
    "url_imagen_plano": "https://www.iscar.com/eCatalog/Ecat/illust_ISOm/216.gif",
    "medidas_plano": null,
    "stock": 9,
    "stockMinimo": 10,
    "estado": "Stock bajo"
  },
  {
    "codigo": "HINSE270",
    "detalle": "GIPA 4,00 PCD",
    "porta_herramientas": ["GHGR 20-4"],
    "vc_m_min": "120-250",
    "ft_mm_rpm": "0,14 - 0,31",
    "r_mm": 0.4,
    "ap_mm": "0,50 - 2,40",
    "clasificacion_iso": ["N"],
    "url_imagen_inserto": "https://www.iscar.com/ISCARCatalogConfirmPictures/6496822.gif",
    "url_imagen_tipo_mecanizado": null,
    "url_imagen_plano": "https://www.iscar.com/eCatalog/Ecat/illust_ISOm/216.gif",
    "medidas_plano": null,
    "stock": 20,
    "stockMinimo": 10,
    "estado": "OK"
  },
  {
    "codigo": "HINSE271",
    "detalle": "GEPI 2,70 PCD",
    "porta_herramientas": ["GHIMR 16SC-16"],
    "vc_m_min": "120-250",
    "ft_mm_rpm": "0,09 - 0,12",
    "r_mm": 0.2,
    "ap_mm": "0,25 - 1,20",
    "clasificacion_iso": ["N"],
    "url_imagen_inserto": "https://www.iscar.com/ISCARCatalogConfirmPictures/6403205.gif",
    "url_imagen_tipo_mecanizado": null,
    "url_imagen_plano": "https://www.iscar.com/eCatalog/Ecat/illust_ISOm/1533.gif",
    "medidas_plano": null,
    "stock": 5,
    "stockMinimo": 6,
    "estado": "Stock bajo"
  },
  {
    "codigo": "HINSE040",
    "detalle": "TPGX 090204 ID5",
    "porta_herramientas": ["S10K STFCR 09"],
    "vc_m_min": "120-250",
    "ft_mm_rpm": "0,05 - 0,30",
    "r_mm": 0.4,
    "ap_mm": "0,10 - 3,00",
    "clasificacion_iso": ["N"],
    "url_imagen_inserto": "https://www.iscar.com/ecatalog/Ecat/datafile/PICTURE/2598.gif",
    "url_imagen_tipo_mecanizado": null,
    "url_imagen_plano": "https://www.iscar.com/eCatalog/Ecat/illust_ISOm/2598.gif",
    "medidas_plano": null,
    "stock": 30,
    "stockMinimo": 12,
    "estado": "OK"
  },
  {
    "codigo": "HINSE088",
    "detalle": "TPGX 110302 ID5",
    "porta_herramientas": ["SIR 0010 H11B"],
    "vc_m_min": "120-250",
    "ft_mm_rpm": "0,05 - 0,30",
    "r_mm": 0.2,
    "ap_mm": "0,10 - 3,00",
    "clasificacion_iso": ["N"],
    "url_imagen_inserto": "https://www.iscar.com/ecatalog/Ecat/datafile/PICTURE/2598.gif",
    "url_imagen_tipo_mecanizado": null,
    "url_imagen_plano": "https://www.iscar.com/eCatalog/Ecat/illust_ISOm/2598.gif",
    "medidas_plano": null,
    "stock": 0,
    "stockMinimo": 8,
    "estado": "Sin stock"
  },
  {
    "codigo": "HINSE272",
    "detalle": "HORN R105.0100.1.4 TN35",
    "porta_herramientas": ["B105.0012.01"],
    "vc_m_min": null,
    "ft_mm_rpm": null,
    "r_mm": null,
    "ap_mm": null,
    "clasificacion_iso": ["P", "M", "N"],
    "url_imagen_inserto": "https://paulhorn.sirv.com/conversions/R105_0100_1_4_TN35-PICTO.JPG?h=280&w=280",
    "url_imagen_tipo_mecanizado": null,
    "url_imagen_plano": "https://paulhorn.sirv.com/conversions/SMK21-1_20170127_184641282.JPG",
    "medidas_plano": null,
    "stock": 12,
    "stockMinimo": 5,
    "estado": "OK"
  },
  {
    "codigo": "HINSE161",
    "detalle": "HORN R108.0150.02 TN35",
    "porta_herramientas": ["B108.0012.03S"],
    "vc_m_min": null,
    "ft_mm_rpm": null,
    "r_mm": 0.2,
    "ap_mm": null,
    "clasificacion_iso": ["P", "M", "N"],
    "url_imagen_inserto": "https://paulhorn.sirv.com/conversions/R108015002.JPG?h=460&w=460",
    "url_imagen_tipo_mecanizado": null,
    "url_imagen_plano": "https://paulhorn.sirv.com/conversions/108K1_20170622_171651411.JPG",
    "medidas_plano": null,
    "stock": 7,
    "stockMinimo": 8,
    "estado": "Stock bajo"
  },
  {
    "codigo": "HINSE221",
    "detalle": "HORN L108.0510.01 TN35",
    "porta_herramientas": ["B108.0012.03S"],
    "vc_m_min": null,
    "ft_mm_rpm": null,
    "r_mm": 0.2,
    "ap_mm": null,
    "clasificacion_iso": ["P", "M", "N"],
    "url_imagen_inserto": "https://paulhorn.sirv.com/conversions/L108015002.JPG?h=460&w=460",
    "url_imagen_tipo_mecanizado": null,
    "url_imagen_plano": "https://paulhorn.sirv.com/conversions/108K1_20170622_171651411.JPG",
    "medidas_plano": null,
    "stock": 16,
    "stockMinimo": 6,
    "estado": "OK"
  },
  {
    "codigo": "HINSE062",
    "detalle": "HORN R111.0006.12 MG12",
    "porta_herramientas": ["B111.0012.2.02"],
    "vc_m_min": null,
    "ft_mm_rpm": null,
    "r_mm": 0.6,
    "ap_mm": null,
    "clasificacion_iso": ["P", "M", "N"],
    "url_imagen_inserto": "https://paulhorn.sirv.com/conversions/R111_0006_12_MG12-PICTO.JPG?h=460&w=460",
    "url_imagen_tipo_mecanizado": null,
    "url_imagen_plano": "https://paulhorn.sirv.com/conversions/111K19_20161108_121151903.JPG",
    "medidas_plano": null,
    "stock": 22,
    "stockMinimo": 10,
    "estado": "OK"
  },
  {
    "codigo": "HINSE187",
    "detalle": "HORN RS111.0006.12 MG12",
    "porta_herramientas": ["B111.0012.2.02"],
    "vc_m_min": null,
    "ft_mm_rpm": null,
    "r_mm": null,
    "ap_mm": null,
    "clasificacion_iso": ["P", "M", "N"],
    "url_imagen_inserto": null,
    "url_imagen_tipo_mecanizado": null,
    "url_imagen_plano": null,
    "medidas_plano": null,
    "stock": 3,
    "stockMinimo": 5,
    "estado": "Stock bajo"
  },
  {
    "codigo": "HINSE273",
    "detalle": "HORN R114.0200.02 MG12",
    "porta_herramientas": ["B114.0016.2.02"],
    "vc_m_min": null,
    "ft_mm_rpm": null,
    "r_mm": 0.2,
    "ap_mm": null,
    "clasificacion_iso": ["P", "M", "N"],
    "url_imagen_inserto": "https://paulhorn.sirv.com/conversions/R114020002.JPG?h=460&w=460",
    "url_imagen_tipo_mecanizado": null,
    "url_imagen_plano": "https://paulhorn.sirv.com/conversions/114K1_20170127_184726346.JPG",
    "medidas_plano": null,
    "stock": 11,
    "stockMinimo": 5,
    "estado": "OK"
  },
  {
    "codigo": "HINSE274",
    "detalle": "HORN RS114.0200.02 MG12",
    "porta_herramientas": ["B114.0016.2.02"],
    "vc_m_min": null,
    "ft_mm_rpm": null,
    "r_mm": null,
    "ap_mm": null,
    "clasificacion_iso": ["P", "M", "N"],
    "url_imagen_inserto": null,
    "url_imagen_tipo_mecanizado": null,
    "url_imagen_plano": null,
    "medidas_plano": null,
    "stock": 0,
    "stockMinimo": 4,
    "estado": "Sin stock"
  },
  {
    "codigo": "HINSE163",
    "detalle": "HORN R116.0200.02 TN35",
    "porta_herramientas": ["B116.0012.2.01"],
    "vc_m_min": null,
    "ft_mm_rpm": null,
    "r_mm": 0.2,
    "ap_mm": null,
    "clasificacion_iso": ["P", "M", "N"],
    "url_imagen_inserto": "https://paulhorn.sirv.com/conversions/R116_0200_02_TN35-PICTO.JPG?h=460&w=460",
    "url_imagen_tipo_mecanizado": null,
    "url_imagen_plano": "https://paulhorn.sirv.com/conversions/116K1_20170127_182114586.JPG",
    "medidas_plano": null,
    "stock": 19,
    "stockMinimo": 8,
    "estado": "OK"
  }
]
```

### 5.2. Accesorios de sujeción / Portaherramientas (Módulo 2)

**Importante:** el valor que figura como "descripción/modelo comercial" en la tabla siguiente (ej. `SCLCR 1616H-09`) **no es el código interno**, es la denominación comercial del fabricante. El código interno con el que se identifica cada portaherramientas dentro del sistema sigue la nomenclatura `HPORT0XX`, numerado correlativamente. Es el código que se usa en el resto del sistema (listados, compatibilidad, y el campo `porta` dentro de cada setup del Módulo 3).

| Código interno | Descripción / modelo comercial | Tipo | Stock actual | Compatible con (códigos de insertos, dataset 5.1) |
|---|---|---|---|---|
| HPORT001 | SDJCR 2020K-11 | Portaherramientas | 5 | HINSE267 |
| HPORT002 | SVJCR 2020K-16 | Portaherramientas | 3 | HINSE268 |
| HPORT003 | SCLCR 1616H-09 | Portaherramientas | 6 | HINSE211 |
| HPORT004 | S12M SCLCR 06 | Portaherramientas | 2 | HINSE210 |
| HPORT005 | DGTR 20B 2D35 | Portaherramientas | 4 | HINSE269 |
| HPORT006 | GHGR 20-3 | Portaherramientas | 5 | HINSE212 |
| HPORT007 | GHGR 20-4 | Portaherramientas | 4 | HINSE270 |
| HPORT008 | GHIMR 16SC-16 | Portaherramientas | 3 | HINSE271 |
| HPORT009 | S10K STFCR 09 | Portaherramientas | 6 | HINSE040 |
| HPORT010 | SIR 0010 H11B | Portaherramientas | 2 | HINSE088 |
| HPORT011 | B105.0012.01 | Portaherramientas | 4 | HINSE272 |
| HPORT012 | B108.0012.03S | Portaherramientas | 7 | HINSE161, HINSE221 |
| HPORT013 | B111.0012.2.02 | Portaherramientas | 5 | HINSE062, HINSE187 |
| HPORT014 | B114.0016.2.02 | Portaherramientas | 3 | HINSE273, HINSE274 |
| HPORT015 | B116.0012.2.01 | Portaherramientas | 6 | HINSE163 |

### 5.2.1. Máquinas (referencia para el Módulo 3)

Se agrega un pequeño listado de máquinas de ejemplo, identificadas por un código corto (tal como se usan en planta), para usar en los setups de la Sección 5.4:

| Código de máquina | Denominación |
|---|---|
| 233 | CNC Mazak QT-200 |
| 240 | CNC Doosan Puma 240 |
| 215 | Centro de mecanizado Haas VF-2 |

### 5.3. Empleados (para el campo "N° de Legajo" en movimientos y setups)

```json
[
  { "legajo": 3067, "nombre": "Jose Moyano" },
  { "legajo": 502, "nombre": "Matias Gomez" },
  { "legajo": 552, "nombre": "Cerrudo Rodrigo" },
  { "legajo": 367, "nombre": "Leonardo Giacoboni" }
]
```

Usar estos 4 empleados de forma consistente en: movimientos del Dashboard/Historial, y como preparadores responsables en el Módulo 3 (Setups).

### 5.4. Setups de ejemplo (Módulo 3)

El objetivo del Módulo 3 **no es registrar cuándo se hizo un setup ni quién lo hizo**, sino dejar armada una **hoja de ruta** con todo lo que hace falta saber de antemano para poner a punto una pieza en una operación determinada: qué máquina, qué programa, qué herramientas/insertos/portaherramientas/boquillas se necesitan, y cuánto tiempo demanda el setup y el ciclo de programa.

Estructura de datos por setup:

```json
{
  "numeroSetup": "SET-0142",
  "pieza": "PZ-1045",
  "maquina": "233",
  "operacion": 2,
  "programa": "O1045",
  "herramientas": [
    { "herr": "HINSE270", "porta": "HPORT007" },
    { "herr": "HINSE211", "porta": "HPORT003" }
  ],
  "boquillas": [],
  "tiempoProg": 3.5,
  "tiempoSetup": 95
}
```

> Nota: el campo `numeroSetup` se agrega únicamente para poder identificar y listar cada hoja de ruta en la demo (no formaba parte de la estructura provista, pero es necesario para poder navegar del listado al detalle). El resto de los campos respeta exactamente la estructura definida: `pieza`, `maquina` (código corto, ver Sección 5.2.1), `operacion`, `programa`, `herramientas` (array de pares `herr` + `porta`), `boquillas` (array de strings, vacío si no aplica), `tiempoProg` y `tiempoSetup` (ambos en minutos).

Dataset completo de setups de ejemplo para el listado del Módulo 3:

```json
[
  {
    "numeroSetup": "SET-0142",
    "pieza": "PZ-1045",
    "maquina": "233",
    "operacion": 2,
    "programa": "O1045",
    "herramientas": [
      { "herr": "HINSE270", "porta": "HPORT007" },
      { "herr": "HINSE211", "porta": "HPORT003" }
    ],
    "boquillas": [],
    "tiempoProg": 3.5,
    "tiempoSetup": 95
  },
  {
    "numeroSetup": "SET-0143",
    "pieza": "PZ-1098",
    "maquina": "240",
    "operacion": 1,
    "programa": "O1098",
    "herramientas": [
      { "herr": "HINSE088", "porta": "HPORT010" }
    ],
    "boquillas": ["ER32 Ø10-9"],
    "tiempoProg": 1.8,
    "tiempoSetup": 60
  },
  {
    "numeroSetup": "SET-0144",
    "pieza": "PZ-1102",
    "maquina": "215",
    "operacion": 3,
    "programa": "O1102",
    "herramientas": [
      { "herr": "HINSE161", "porta": "HPORT012" },
      { "herr": "HINSE273", "porta": "HPORT014" }
    ],
    "boquillas": [],
    "tiempoProg": 4.2,
    "tiempoSetup": 140
  },
  {
    "numeroSetup": "SET-0145",
    "pieza": "12345",
    "maquina": "233",
    "operacion": 2,
    "programa": "O2345",
    "herramientas": [
      { "herr": "HINSE211", "porta": "HPORT001" },
      { "herr": "HINSE270", "porta": "HPORT004" }
    ],
    "boquillas": [],
    "tiempoProg": 2,
    "tiempoSetup": 120
  }
]
```

### 5.5. Movimientos de ejemplo (Dashboard / Historial, Módulo 1)

| Fecha/Hora | Legajo | Empleado | Tipo | Código | Cantidad |
|---|---|---|---|---|---|
| 12/09/2026 08:15 | 3067 | Jose Moyano | Egreso | HINSE270 | 2 |
| 12/09/2026 09:40 | 367 | Leonardo Giacoboni | Devolución | HINSE211 | 1 |
| 12/09/2026 10:05 | 552 | Cerrudo Rodrigo | Egreso | HINSE161 | 3 |
| 11/09/2026 16:20 | 502 | Matias Gomez | Ingreso | HINSE210 | 15 |
| 11/09/2026 14:00 | 3067 | Jose Moyano | Egreso | HINSE088 | 4 |

---

## 6. Referencia de diseño: `ficha-tecnica-inserto.html`

Se adjunta un archivo HTML real, ya desarrollado por la empresa para otro proyecto interno, que sirve como **referencia de diseño y de campos** para el Módulo 4 (Fichas Técnicas) de esta demo. El agente debería:

- Reutilizar su estructura de secciones: banner de producto (detalle + código), card de imagen del inserto, card de parámetros de mecanizado (Ap, Ft, Vc, R, clasificación ISO con badges por letra), card de porta herramientas compatibles (tags), card de tipos de mecanizado admitidos, y modal de plano técnico con tabla de medidas.
- Los nombres de campo usados en el HTML (`inserto.codigo`, `inserto.detalle`, `inserto.ap_mm`, `inserto.ft_mm_rpm`, `inserto.vc_m_min`, `inserto.r_mm`, `inserto.clasificacion_iso`, `inserto.porta_herramientas`, `inserto.url_imagen_inserto`, `inserto.url_imagen_tipo_mecanizado`, `inserto.url_imagen_plano`, `inserto.medidas_plano`) **coinciden exactamente** con las keys del dataset de la Sección 5.1, para que el agente pueda mapear uno a uno sin adivinar nombres.
- Si el agente construye la demo en HTML/JS plano, no hace falta usar el motor de templates original (Jinja) — puede adaptar la misma estructura y clases CSS a la tecnología elegida para la demo.

---

## 7. Checklist final para el agente

- [ ] Sidebar de navegación con los 4 módulos + Dashboard, siempre visible. Sin pantalla de login.
- [ ] Todas las pantallas del sitemap de la Sección 3 implementadas.
- [ ] Módulo 1 y Módulo 4 usan el dataset real de insertos de la Sección 5.1 (18 ítems), incluyendo `stock`, `stockMinimo` y `estado`.
- [ ] Módulo 2 usa los códigos internos `HPORT0XX` de la Sección 5.2 (no las descripciones comerciales) como identificador principal, cruzados correctamente con los códigos de insertos del Módulo 1.
- [ ] El formulario de "Registrar movimiento" (Módulo 1) pide **N° de Legajo** (no login), validado contra los 4 empleados de la Sección 5.3, y muestra el nombre del empleado como confirmación visual.
- [ ] Módulo 3 usa los setups de ejemplo de la Sección 5.4, con la estructura `pieza / maquina / operacion / programa / herramientas (herr+porta) / boquillas / tiempoProg / tiempoSetup`, sin campos de fecha, preparador o estado.
- [ ] Módulo 4 sigue el diseño de referencia de `ficha-tecnica-inserto.html` (Sección 6), incluyendo el modal de plano técnico.
- [ ] Ningún formulario persiste datos reales; los "guardados" son simulados (toast + redirección).
- [ ] No hay llamadas a APIs externas ni backend real.
- [ ] Diseño prolijo, sobrio, tipo panel industrial — apto para mostrarle a la Gerencia como demo visual del concepto.
- [ ] El sistema se siente como un todo integrado, no como 4 pantallas sueltas sin relación entre sí.
