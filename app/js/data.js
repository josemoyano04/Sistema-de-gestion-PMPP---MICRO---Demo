// =============================================================
// DATA.JS — Datos de ejemplo para la demo del Sistema de Pañol
// MICRO AUTOMACIÓN
// =============================================================

const DATA = {

  insertos: [
    { codigo: "HINSE267", detalle: "DCMT 11T304 PCD", porta_herramientas: ["SDJCR 2020K-11"], vc_m_min: "120-250", ft_mm_rpm: "0,05 - 3,00", r_mm: 0.4, ap_mm: "0,10 - 3,00", clasificacion_iso: ["N"], url_imagen_inserto: "https://www.iscar.com/ecatalog/Ecat/datafile/PICTURE/2596.gif", url_imagen_tipo_mecanizado: null, url_imagen_plano: "https://www.iscar.com/Ecat/JPG2D/5700454.jpg", medidas_plano: null, stock: 18, stockMinimo: 8, estado: "OK" },
    { codigo: "HINSE268", detalle: "VCGT 160404 PCD", porta_herramientas: ["SVJCR 2020K-16"], vc_m_min: "120-250", ft_mm_rpm: "0,05 - 3,00", r_mm: 0.4, ap_mm: "0,10 - 3,00", clasificacion_iso: ["N"], url_imagen_inserto: "https://www.iscar.com/ecatalog/Ecat/datafile/PICTURE/3728.gif", url_imagen_tipo_mecanizado: null, url_imagen_plano: "https://www.iscar.com/eCatalog/Ecat/illust_ISOm/3728.gif", medidas_plano: null, stock: 6, stockMinimo: 8, estado: "Stock bajo" },
    { codigo: "HINSE211", detalle: "CCGT 09T304 PCD", porta_herramientas: ["SCLCR 1616H-09"], vc_m_min: "120-250", ft_mm_rpm: "0,03 - 0,60", r_mm: 0.4, ap_mm: "0,05 - 3,80", clasificacion_iso: ["N"], url_imagen_inserto: "https://www.iscar.com/ecatalog/Ecat/datafile/PICTURE/4856.gif", url_imagen_tipo_mecanizado: null, url_imagen_plano: "https://www.iscar.com/eCatalog/Ecat/illust_ISOm/4856.svg", medidas_plano: null, stock: 25, stockMinimo: 10, estado: "OK" },
    { codigo: "HINSE210", detalle: "CCGT 060204 PCD", porta_herramientas: ["S12M SCLCR 06"], vc_m_min: "120-250", ft_mm_rpm: "0,03 - 0,61", r_mm: 0.4, ap_mm: "0,05 - 2,80", clasificacion_iso: ["N"], url_imagen_inserto: "https://www.iscar.com/ecatalog/Ecat/datafile/PICTURE/4856.gif", url_imagen_tipo_mecanizado: null, url_imagen_plano: "https://www.iscar.com/eCatalog/Ecat/illust_ISOm/4856.svg", medidas_plano: null, stock: 0, stockMinimo: 10, estado: "Sin stock" },
    { codigo: "HINSE269", detalle: "DGN 2000P PCD", porta_herramientas: ["DGTR 20B 2D35"], vc_m_min: "120-250", ft_mm_rpm: null, r_mm: null, ap_mm: null, clasificacion_iso: ["N"], url_imagen_inserto: null, url_imagen_tipo_mecanizado: null, url_imagen_plano: null, medidas_plano: null, stock: 14, stockMinimo: 6, estado: "OK" },
    { codigo: "HINSE212", detalle: "GIPA 3,00 PCD", porta_herramientas: ["GHGR 20-3"], vc_m_min: "120-250", ft_mm_rpm: "0,09 - 0,16", r_mm: 0.2, ap_mm: "0,25 - 1,80", clasificacion_iso: ["N"], url_imagen_inserto: "https://www.iscar.com/ISCARCatalogConfirmPictures/6496822.gif", url_imagen_tipo_mecanizado: null, url_imagen_plano: "https://www.iscar.com/eCatalog/Ecat/illust_ISOm/216.gif", medidas_plano: null, stock: 9, stockMinimo: 10, estado: "Stock bajo" },
    { codigo: "HINSE270", detalle: "GIPA 4,00 PCD", porta_herramientas: ["GHGR 20-4"], vc_m_min: "120-250", ft_mm_rpm: "0,14 - 0,31", r_mm: 0.4, ap_mm: "0,50 - 2,40", clasificacion_iso: ["N"], url_imagen_inserto: "https://www.iscar.com/ISCARCatalogConfirmPictures/6496822.gif", url_imagen_tipo_mecanizado: null, url_imagen_plano: "https://www.iscar.com/eCatalog/Ecat/illust_ISOm/216.gif", medidas_plano: null, stock: 20, stockMinimo: 10, estado: "OK" },
    { codigo: "HINSE271", detalle: "GEPI 2,70 PCD", porta_herramientas: ["GHIMR 16SC-16"], vc_m_min: "120-250", ft_mm_rpm: "0,09 - 0,12", r_mm: 0.2, ap_mm: "0,25 - 1,20", clasificacion_iso: ["N"], url_imagen_inserto: "https://www.iscar.com/ISCARCatalogConfirmPictures/6403205.gif", url_imagen_tipo_mecanizado: null, url_imagen_plano: "https://www.iscar.com/eCatalog/Ecat/illust_ISOm/1533.gif", medidas_plano: null, stock: 5, stockMinimo: 6, estado: "Stock bajo" },
    { codigo: "HINSE040", detalle: "TPGX 090204 ID5", porta_herramientas: ["S10K STFCR 09"], vc_m_min: "120-250", ft_mm_rpm: "0,05 - 0,30", r_mm: 0.4, ap_mm: "0,10 - 3,00", clasificacion_iso: ["N"], url_imagen_inserto: "https://www.iscar.com/ecatalog/Ecat/datafile/PICTURE/2598.gif", url_imagen_tipo_mecanizado: null, url_imagen_plano: "https://www.iscar.com/eCatalog/Ecat/illust_ISOm/2598.gif", medidas_plano: null, stock: 30, stockMinimo: 12, estado: "OK" },
    { codigo: "HINSE088", detalle: "TPGX 110302 ID5", porta_herramientas: ["SIR 0010 H11B"], vc_m_min: "120-250", ft_mm_rpm: "0,05 - 0,30", r_mm: 0.2, ap_mm: "0,10 - 3,00", clasificacion_iso: ["N"], url_imagen_inserto: "https://www.iscar.com/ecatalog/Ecat/datafile/PICTURE/2598.gif", url_imagen_tipo_mecanizado: null, url_imagen_plano: "https://www.iscar.com/eCatalog/Ecat/illust_ISOm/2598.gif", medidas_plano: null, stock: 0, stockMinimo: 8, estado: "Sin stock" },
    { codigo: "HINSE272", detalle: "HORN R105.0100.1.4 TN35", porta_herramientas: ["B105.0012.01"], vc_m_min: null, ft_mm_rpm: null, r_mm: null, ap_mm: null, clasificacion_iso: ["P","M","N"], url_imagen_inserto: "https://paulhorn.sirv.com/conversions/R105_0100_1_4_TN35-PICTO.JPG?h=280&w=280", url_imagen_tipo_mecanizado: null, url_imagen_plano: "https://paulhorn.sirv.com/conversions/SMK21-1_20170127_184641282.JPG", medidas_plano: null, stock: 12, stockMinimo: 5, estado: "OK" },
    { codigo: "HINSE161", detalle: "HORN R108.0150.02 TN35", porta_herramientas: ["B108.0012.03S"], vc_m_min: null, ft_mm_rpm: null, r_mm: 0.2, ap_mm: null, clasificacion_iso: ["P","M","N"], url_imagen_inserto: "https://paulhorn.sirv.com/conversions/R108015002.JPG?h=460&w=460", url_imagen_tipo_mecanizado: null, url_imagen_plano: "https://paulhorn.sirv.com/conversions/108K1_20170622_171651411.JPG", medidas_plano: null, stock: 7, stockMinimo: 8, estado: "Stock bajo" },
    { codigo: "HINSE221", detalle: "HORN L108.0510.01 TN35", porta_herramientas: ["B108.0012.03S"], vc_m_min: null, ft_mm_rpm: null, r_mm: 0.2, ap_mm: null, clasificacion_iso: ["P","M","N"], url_imagen_inserto: "https://paulhorn.sirv.com/conversions/L108015002.JPG?h=460&w=460", url_imagen_tipo_mecanizado: null, url_imagen_plano: "https://paulhorn.sirv.com/conversions/108K1_20170622_171651411.JPG", medidas_plano: null, stock: 16, stockMinimo: 6, estado: "OK" },
    { codigo: "HINSE062", detalle: "HORN R111.0006.12 MG12", porta_herramientas: ["B111.0012.2.02"], vc_m_min: null, ft_mm_rpm: null, r_mm: 0.6, ap_mm: null, clasificacion_iso: ["P","M","N"], url_imagen_inserto: "https://paulhorn.sirv.com/conversions/R111_0006_12_MG12-PICTO.JPG?h=460&w=460", url_imagen_tipo_mecanizado: null, url_imagen_plano: "https://paulhorn.sirv.com/conversions/111K19_20161108_121151903.JPG", medidas_plano: null, stock: 22, stockMinimo: 10, estado: "OK" },
    { codigo: "HINSE187", detalle: "HORN RS111.0006.12 MG12", porta_herramientas: ["B111.0012.2.02"], vc_m_min: null, ft_mm_rpm: null, r_mm: null, ap_mm: null, clasificacion_iso: ["P","M","N"], url_imagen_inserto: null, url_imagen_tipo_mecanizado: null, url_imagen_plano: null, medidas_plano: null, stock: 3, stockMinimo: 5, estado: "Stock bajo" },
    { codigo: "HINSE273", detalle: "HORN R114.0200.02 MG12", porta_herramientas: ["B114.0016.2.02"], vc_m_min: null, ft_mm_rpm: null, r_mm: 0.2, ap_mm: null, clasificacion_iso: ["P","M","N"], url_imagen_inserto: "https://paulhorn.sirv.com/conversions/R114020002.JPG?h=460&w=460", url_imagen_tipo_mecanizado: null, url_imagen_plano: "https://paulhorn.sirv.com/conversions/114K1_20170127_184726346.JPG", medidas_plano: null, stock: 11, stockMinimo: 5, estado: "OK" },
    { codigo: "HINSE274", detalle: "HORN RS114.0200.02 MG12", porta_herramientas: ["B114.0016.2.02"], vc_m_min: null, ft_mm_rpm: null, r_mm: null, ap_mm: null, clasificacion_iso: ["P","M","N"], url_imagen_inserto: null, url_imagen_tipo_mecanizado: null, url_imagen_plano: null, medidas_plano: null, stock: 0, stockMinimo: 4, estado: "Sin stock" },
    { codigo: "HINSE163", detalle: "HORN R116.0200.02 TN35", porta_herramientas: ["B116.0012.2.01"], vc_m_min: null, ft_mm_rpm: null, r_mm: 0.2, ap_mm: null, clasificacion_iso: ["P","M","N"], url_imagen_inserto: "https://paulhorn.sirv.com/conversions/R116_0200_02_TN35-PICTO.JPG?h=460&w=460", url_imagen_tipo_mecanizado: null, url_imagen_plano: "https://paulhorn.sirv.com/conversions/116K1_20170127_182114586.JPG", medidas_plano: null, stock: 19, stockMinimo: 8, estado: "OK" }
  ],

  accesorios: [
    { codigo: "HPORT001", descripcion: "SDJCR 2020K-11",  tipo: "Portaherramientas", stock: 5, compatibles: ["HINSE267"] },
    { codigo: "HPORT002", descripcion: "SVJCR 2020K-16",  tipo: "Portaherramientas", stock: 3, compatibles: ["HINSE268"] },
    { codigo: "HPORT003", descripcion: "SCLCR 1616H-09",  tipo: "Portaherramientas", stock: 6, compatibles: ["HINSE211"] },
    { codigo: "HPORT004", descripcion: "S12M SCLCR 06",   tipo: "Portaherramientas", stock: 2, compatibles: ["HINSE210"] },
    { codigo: "HPORT005", descripcion: "DGTR 20B 2D35",   tipo: "Portaherramientas", stock: 4, compatibles: ["HINSE269"] },
    { codigo: "HPORT006", descripcion: "GHGR 20-3",       tipo: "Portaherramientas", stock: 5, compatibles: ["HINSE212"] },
    { codigo: "HPORT007", descripcion: "GHGR 20-4",       tipo: "Portaherramientas", stock: 4, compatibles: ["HINSE270"] },
    { codigo: "HPORT008", descripcion: "GHIMR 16SC-16",   tipo: "Portaherramientas", stock: 3, compatibles: ["HINSE271"] },
    { codigo: "HPORT009", descripcion: "S10K STFCR 09",   tipo: "Portaherramientas", stock: 6, compatibles: ["HINSE040"] },
    { codigo: "HPORT010", descripcion: "SIR 0010 H11B",   tipo: "Portaherramientas", stock: 2, compatibles: ["HINSE088"] },
    { codigo: "HPORT011", descripcion: "B105.0012.01",    tipo: "Portaherramientas", stock: 4, compatibles: ["HINSE272"] },
    { codigo: "HPORT012", descripcion: "B108.0012.03S",   tipo: "Portaherramientas", stock: 7, compatibles: ["HINSE161","HINSE221"] },
    { codigo: "HPORT013", descripcion: "B111.0012.2.02",  tipo: "Portaherramientas", stock: 5, compatibles: ["HINSE062","HINSE187"] },
    { codigo: "HPORT014", descripcion: "B114.0016.2.02",  tipo: "Portaherramientas", stock: 3, compatibles: ["HINSE273","HINSE274"] },
    { codigo: "HPORT015", descripcion: "B116.0012.2.01",  tipo: "Portaherramientas", stock: 6, compatibles: ["HINSE163"] }
  ],

  maquinas: [
    { codigo: "233", denominacion: "CNC Mazak QT-200" },
    { codigo: "240", denominacion: "CNC Doosan Puma 240" },
    { codigo: "215", denominacion: "Centro de mecanizado Haas VF-2" }
  ],

  empleados: [
    { legajo: 3067, nombre: "Jose Moyano" },
    { legajo: 502,  nombre: "Matias Gomez" },
    { legajo: 552,  nombre: "Cerrudo Rodrigo" },
    { legajo: 367,  nombre: "Leonardo Giacoboni" }
  ],

  setups: [
    { numeroSetup: "SET-0142", pieza: "PZ-1045", maquina: "233", operacion: 2, programa: "O1045", herramientas: [{ herr: "HINSE270", porta: "HPORT007" },{ herr: "HINSE211", porta: "HPORT003" }], boquillas: [], tiempoProg: 3.5, tiempoSetup: 95 },
    { numeroSetup: "SET-0143", pieza: "PZ-1098", maquina: "240", operacion: 1, programa: "O1098", herramientas: [{ herr: "HINSE088", porta: "HPORT010" }], boquillas: ["ER32 Ø10-9"], tiempoProg: 1.8, tiempoSetup: 60 },
    { numeroSetup: "SET-0144", pieza: "PZ-1102", maquina: "215", operacion: 3, programa: "O1102", herramientas: [{ herr: "HINSE161", porta: "HPORT012" },{ herr: "HINSE273", porta: "HPORT014" }], boquillas: [], tiempoProg: 4.2, tiempoSetup: 140 },
    { numeroSetup: "SET-0145", pieza: "12345",   maquina: "233", operacion: 2, programa: "O2345", herramientas: [{ herr: "HINSE211", porta: "HPORT001" },{ herr: "HINSE270", porta: "HPORT004" }], boquillas: [], tiempoProg: 2, tiempoSetup: 120 }
  ],

  movimientos: [
    { fechaHora: "12/09/2026 08:15", legajo: 3067, empleado: "Jose Moyano",        tipo: "Egreso",     codigo: "HINSE270", cantidad: 2 },
    { fechaHora: "12/09/2026 09:40", legajo: 367,  empleado: "Leonardo Giacoboni", tipo: "Devolución", codigo: "HINSE211", cantidad: 1 },
    { fechaHora: "12/09/2026 10:05", legajo: 552,  empleado: "Cerrudo Rodrigo",    tipo: "Egreso",     codigo: "HINSE161", cantidad: 3 },
    { fechaHora: "11/09/2026 16:20", legajo: 502,  empleado: "Matias Gomez",       tipo: "Ingreso",    codigo: "HINSE210", cantidad: 15 },
    { fechaHora: "11/09/2026 14:00", legajo: 3067, empleado: "Jose Moyano",        tipo: "Egreso",     codigo: "HINSE088", cantidad: 4 }
  ],

  historialPorItem: {
    "HINSE270": [
      { fechaHora: "12/09/2026 08:15", legajo: 3067, empleado: "Jose Moyano",        tipo: "Egreso",     cantidad: 2 },
      { fechaHora: "10/09/2026 14:30", legajo: 502,  empleado: "Matias Gomez",       tipo: "Devolución", cantidad: 1 },
      { fechaHora: "08/09/2026 09:00", legajo: 3067, empleado: "Jose Moyano",        tipo: "Egreso",     cantidad: 3 },
      { fechaHora: "05/09/2026 11:20", legajo: 367,  empleado: "Leonardo Giacoboni", tipo: "Ingreso",    cantidad: 10 }
    ],
    "HINSE211": [
      { fechaHora: "12/09/2026 09:40", legajo: 367,  empleado: "Leonardo Giacoboni", tipo: "Devolución", cantidad: 1 },
      { fechaHora: "09/09/2026 10:00", legajo: 552,  empleado: "Cerrudo Rodrigo",    tipo: "Egreso",     cantidad: 2 },
      { fechaHora: "06/09/2026 08:45", legajo: 502,  empleado: "Matias Gomez",       tipo: "Ingreso",    cantidad: 15 }
    ],
    "HINSE161": [
      { fechaHora: "12/09/2026 10:05", legajo: 552,  empleado: "Cerrudo Rodrigo",    tipo: "Egreso",  cantidad: 3 },
      { fechaHora: "07/09/2026 15:00", legajo: 367,  empleado: "Leonardo Giacoboni", tipo: "Egreso",  cantidad: 2 },
      { fechaHora: "03/09/2026 09:30", legajo: 3067, empleado: "Jose Moyano",        tipo: "Ingreso", cantidad: 12 }
    ],
    "HINSE088": [
      { fechaHora: "11/09/2026 14:00", legajo: 3067, empleado: "Jose Moyano",    tipo: "Egreso",  cantidad: 4 },
      { fechaHora: "09/09/2026 11:00", legajo: 502,  empleado: "Matias Gomez",   tipo: "Egreso",  cantidad: 3 },
      { fechaHora: "01/09/2026 08:00", legajo: 552,  empleado: "Cerrudo Rodrigo", tipo: "Ingreso", cantidad: 7 }
    ]
  },

  evolucionStock: {
    "HINSE267": [18,18,19,19,18,20,20,20,18,18,18,17,17,18,18,19,19,18,18,18,18,18,18,18,18,18,18,18,18,18],
    "HINSE268": [10,10,9,9,8,8,7,7,6,6,6,6,7,7,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
    "HINSE211": [22,22,23,23,25,25,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25],
    "HINSE210": [15,15,14,12,10,8,6,4,2,0,0,0,0,0,0,0,0,0,0,15,14,12,10,5,3,1,0,0,0,0],
    "HINSE269": [12,12,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14],
    "HINSE212": [12,11,11,10,10,10,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
    "HINSE270": [25,24,23,22,22,21,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20],
    "HINSE271": [8,8,7,7,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
    "HINSE040": [28,29,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30],
    "HINSE088": [7,7,6,5,4,3,2,1,0,0,0,0,0,0,0,0,0,0,0,7,6,5,4,3,2,1,0,0,0,0],
    "HINSE272": [10,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12],
    "HINSE161": [12,11,10,9,9,8,8,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
    "HINSE221": [14,14,15,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
    "HINSE062": [20,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22],
    "HINSE187": [5,5,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    "HINSE273": [9,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    "HINSE274": [4,3,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    "HINSE163": [17,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19]
  }
};