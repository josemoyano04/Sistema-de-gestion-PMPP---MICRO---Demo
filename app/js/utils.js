// =============================================================
// UTILS.JS — Helpers y utilidades compartidas
// =============================================================

const Utils = {

  // Badge de estado de stock
  badgeEstado(estado) {
    const map = {
      "OK":         '<span class="badge badge-ok">OK</span>',
      "Stock bajo": '<span class="badge badge-warn">Stock bajo</span>',
      "Sin stock":  '<span class="badge badge-danger">Sin stock</span>'
    };
    return map[estado] || `<span class="badge">${estado}</span>`;
  },

  // Badge de clasificación ISO (estándar P/M/K/N/S/H)
  badgeISO(letra) {
    const map = {
      P: { css: "badge-iso-p", label: "Acero" },
      M: { css: "badge-iso-m", label: "Acero inoxidable" },
      K: { css: "badge-iso-k", label: "Fundición" },
      N: { css: "badge-iso-n", label: "Aluminio / No ferroso" },
      S: { css: "badge-iso-s", label: "Superaleaciones" },
      H: { css: "badge-iso-h", label: "Material endurecido" },
    };
    const info = map[letra] || map["N"];
    return `<span class="badge ${info.css}" title="ISO ${letra} — ${info.label}">${letra}</span>`;
  },

  // Badge del tipo de movimiento
  badgeTipo(tipo) {
    const map = {
      "Ingreso":    '<span class="badge badge-ingreso">Ingreso</span>',
      "Egreso":     '<span class="badge badge-egreso">Egreso</span>',
      "Devolución": '<span class="badge badge-devolucion">Devolución</span>'
    };
    return map[tipo] || `<span class="badge">${tipo}</span>`;
  },

  // Lookups de datos
  getInserto(codigo)   { return DATA.insertos.find(i => i.codigo === codigo); },
  getAccesorio(codigo) { return DATA.accesorios.find(a => a.codigo === codigo); },
  getMaquina(codigo)   { return DATA.maquinas.find(m => m.codigo === codigo); },
  getEmpleado(legajo)  { return DATA.empleados.find(e => e.legajo === Number(legajo)); },
  getSetup(numero)     { return DATA.setups.find(s => s.numeroSetup === numero); },

  // Estado de accesorio según stock
  estadoAccesorio(stock) {
    if (stock <= 0) return "Sin stock";
    if (stock <= 2) return "Stock bajo";
    return "OK";
  },

  // Imagen placeholder para insertos
  imgPlaceholder() {
    return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="#e8edf2"/><text x="60" y="55" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8b9ab0">Sin imagen</text><text x="60" y="72" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8b9ab0">disponible</text></svg>`)}`;
  },

  // Renderizar chips/tags desde array
  renderChips(arr, cssClass = "chip") {
    if (!arr || arr.length === 0) return '<span class="text-muted">—</span>';
    return arr.map(v => `<span class="${cssClass}">${v}</span>`).join(" ");
  },

  // Mostrar valor o guión si null
  val(v) {
    return (v !== null && v !== undefined && v !== "") ? v : "—";
  },

  // Llamar después de cada render para activar los iconos Lucide inyectados en innerHTML
  renderDone() {
    if (window.lucide) lucide.createIcons();
  },

  // Toast de confirmación
  showToast(mensaje, tipo = "success") {
    const iconMap = {
      success: '<i data-lucide="check-circle"></i>',
      info:    '<i data-lucide="info"></i>',
      warn:    '<i data-lucide="alert-triangle"></i>'
    };
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast toast-${tipo}`;
    toast.innerHTML = `
      <span class="toast-icon">${iconMap[tipo] || iconMap.success}</span>
      <span>${mensaje}</span>
    `;
    container.appendChild(toast);
    if (window.lucide) lucide.createIcons({ el: toast });
    setTimeout(() => toast.classList.add("toast-show"), 10);
    setTimeout(() => {
      toast.classList.remove("toast-show");
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  },

  // Renderizar tabla de movimientos (reutilizable)
  renderTablaMovimientos(movimientos, container) {
    if (!movimientos || movimientos.length === 0) {
      container.innerHTML = '<p class="text-muted" style="padding:16px">Sin movimientos registrados.</p>';
      return;
    }
    const rows = movimientos.map(m => {
      const ins = Utils.getInserto(m.codigo);
      return `
        <tr>
          <td>${m.fechaHora}</td>
          <td><span class="legajo-tag">${m.legajo}</span> ${m.empleado || ""}</td>
          <td>${Utils.badgeTipo(m.tipo)}</td>
          <td><code>${m.codigo}</code></td>
          <td>${ins ? ins.detalle : ""}</td>
          <td class="text-center"><strong>${m.cantidad}</strong></td>
        </tr>`;
    }).join("");
    container.innerHTML = `
      <table class="table">
        <thead>
          <tr>
            <th>Fecha / Hora</th>
            <th>Empleado</th>
            <th>Tipo</th>
            <th>Código</th>
            <th>Detalle</th>
            <th>Cant.</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
  },

  // Reloj en header
  startClock() {
    const el = document.getElementById("header-datetime");
    if (!el) return;
    const update = () => {
      const now = new Date();
      const dias = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
      const d  = now.getDate().toString().padStart(2,"0");
      const mo = (now.getMonth()+1).toString().padStart(2,"0");
      const y  = now.getFullYear();
      const h  = now.getHours().toString().padStart(2,"0");
      const mi = now.getMinutes().toString().padStart(2,"0");
      const s  = now.getSeconds().toString().padStart(2,"0");
      el.textContent = `${dias[now.getDay()]} ${d}/${mo}/${y}  ${h}:${mi}:${s}`;
    };
    update();
    setInterval(update, 1000);
  }
};