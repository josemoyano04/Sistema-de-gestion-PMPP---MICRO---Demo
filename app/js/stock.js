// =============================================================
// STOCK.JS — Módulo 1: Stock de Insertos y Herramientas
// =============================================================

// ─── LISTADO ─────────────────────────────────────────────────
function renderStock() {
  const app = document.getElementById("app");

  app.innerHTML = `
  <div class="page-wrapper">
    <div class="page-header">
      <div>
        <h1 class="page-title">Stock de Insertos y Herramientas</h1>
        <p class="page-subtitle">Módulo 1 — ${DATA.insertos.length} ítems en catálogo</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="Router.navigate('/movimiento')">
          <i data-lucide="plus-circle"></i> Registrar movimiento
        </button>
        <button class="btn btn-outline" onclick="Router.navigate('/historial')">
          <i data-lucide="list"></i> Historial
        </button>
      </div>
    </div>

    <div class="filter-bar">
      <input type="text" id="filter-search" class="input-search" placeholder="Buscar por código o detalle…" oninput="filtrarStock()">
      <select id="filter-estado" class="input-select" onchange="filtrarStock()">
        <option value="">Todos los estados</option>
        <option value="OK">OK</option>
        <option value="Stock bajo">Stock bajo</option>
        <option value="Sin stock">Sin stock</option>
      </select>
    </div>

    <div class="card">
      <div class="table-container">
        <table class="table table-hover" id="tabla-stock">
          <thead>
            <tr>
              <th>Código</th>
              <th>Detalle</th>
              <th>Portaherramientas</th>
              <th class="text-center">Stock</th>
              <th class="text-center">Stock mín.</th>
              <th class="text-center">Estado</th>
            </tr>
          </thead>
          <tbody id="stock-tbody"></tbody>
        </table>
      </div>
    </div>
  </div><!-- .page-wrapper -->
  `;

  renderFilasStock(DATA.insertos);
  Utils.renderDone();
}

function renderFilasStock(insertos) {
  const tbody = document.getElementById("stock-tbody");
  if (!tbody) return;
  tbody.innerHTML = insertos.map(i => `
    <tr class="table-row-link" onclick="Router.navigate('/stock/${i.codigo}')">
      <td><code>${i.codigo}</code></td>
      <td>${i.detalle}</td>
      <td class="text-muted">${i.porta_herramientas[0] || "—"}</td>
      <td class="text-center"><strong>${i.stock}</strong></td>
      <td class="text-center">${i.stockMinimo}</td>
      <td class="text-center">${Utils.badgeEstado(i.estado)}</td>
    </tr>
  `).join("");
}

function filtrarStock() {
  const search = document.getElementById("filter-search")?.value.toLowerCase() || "";
  const estado = document.getElementById("filter-estado")?.value || "";
  const filtrado = DATA.insertos.filter(i => {
    const matchSearch = !search || i.codigo.toLowerCase().includes(search) || i.detalle.toLowerCase().includes(search);
    const matchEstado = !estado || i.estado === estado;
    return matchSearch && matchEstado;
  });
  renderFilasStock(filtrado);
}

// ─── DETALLE DE ÍTEM ─────────────────────────────────────────
function renderStockDetalle(codigo) {
  const ins = Utils.getInserto(codigo);
  if (!ins) { Router.navigate("/stock"); return; }
  const app = document.getElementById("app");

  const historial = DATA.historialPorItem[codigo] || [];
  const evolucion = DATA.evolucionStock[codigo] || [];
  const histRows = historial.map(h => `
    <tr>
      <td>${h.fechaHora}</td>
      <td><span class="legajo-tag">${h.legajo}</span> ${h.empleado}</td>
      <td>${Utils.badgeTipo(h.tipo)}</td>
      <td class="text-center"><strong>${h.cantidad}</strong></td>
    </tr>
  `).join("");

  app.innerHTML = `
  <div class="page-wrapper">
    <div class="page-header">
      <div>
        <button class="btn btn-sm btn-ghost" onclick="Router.navigate('/stock')">← Volver al listado</button>
        <h1 class="page-title" style="margin-top:8px">${ins.codigo} — ${ins.detalle}</h1>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="Router.navigate('/movimiento?codigo=${ins.codigo}')">
          <i data-lucide="plus-circle"></i> Registrar movimiento
        </button>
        <button class="btn btn-outline" onclick="Router.navigate('/fichas/${ins.codigo}')">
          <i data-lucide="file-text"></i> Ver ficha técnica
        </button>
      </div>
    </div>

    <div class="detalle-grid">
      <!-- Imagen + info principal -->
      <div class="card">
        <div class="card-header"><h2 class="card-title">Geometría del inserto</h2></div>
        <div class="img-container">
          <img src="${ins.url_imagen_inserto || Utils.imgPlaceholder()}"
               onerror="this.src='${Utils.imgPlaceholder()}'"
               alt="${ins.detalle}" class="inserto-img">
        </div>
        <div class="info-list">
          <div class="info-row"><span class="info-label">Clasificación ISO</span><span>${ins.clasificacion_iso.map(Utils.badgeISO).join(" ")}</span></div>
          <div class="info-row"><span class="info-label">Portaherramientas</span><span>${Utils.renderChips(ins.porta_herramientas, "chip chip-blue")}</span></div>
        </div>
      </div>

      <!-- Stock -->
      <div class="card">
        <div class="card-header"><h2 class="card-title">Estado de stock</h2></div>
        <div class="stock-kpis">
          <div class="stock-kpi">
            <div class="stock-kpi-value ${ins.estado === 'OK' ? 'color-ok' : ins.estado === 'Stock bajo' ? 'color-warn' : 'color-danger'}">${ins.stock}</div>
            <div class="stock-kpi-label">Stock actual</div>
          </div>
          <div class="stock-kpi">
            <div class="stock-kpi-value">${ins.stockMinimo}</div>
            <div class="stock-kpi-label">Stock mínimo</div>
          </div>
          <div class="stock-kpi">
            <div class="stock-kpi-value">${Utils.badgeEstado(ins.estado)}</div>
            <div class="stock-kpi-label">Estado</div>
          </div>
        </div>
        <div class="chart-section">
          <h3 class="chart-title">Evolución de stock — últimos 30 días</h3>
          <canvas id="chart-stock" width="400" height="140"></canvas>
        </div>
      </div>

      <!-- Parámetros de mecanizado -->
      <div class="card">
        <div class="card-header"><h2 class="card-title">Parámetros de mecanizado</h2></div>
        <div class="params-grid">
          <div class="param-item"><span class="param-label">Vc [m/min]</span><span class="param-value">${Utils.val(ins.vc_m_min)}</span></div>
          <div class="param-item"><span class="param-label">Ft [mm/rpm]</span><span class="param-value">${Utils.val(ins.ft_mm_rpm)}</span></div>
          <div class="param-item"><span class="param-label">R [mm]</span><span class="param-value">${Utils.val(ins.r_mm)}</span></div>
          <div class="param-item"><span class="param-label">Ap [mm]</span><span class="param-value">${Utils.val(ins.ap_mm)}</span></div>
        </div>
        <div style="padding:12px 20px 16px;border-top:1px solid var(--border)">
          <button class="btn btn-outline btn-sm" onclick="Router.navigate('/fichas/${ins.codigo}')">
            <i data-lucide="file-text"></i> Ver ficha técnica completa
          </button>
        </div>
      </div>

      <!-- Historial de movimientos -->
      <div class="card span-full">
        <div class="card-header"><h2 class="card-title">Historial de movimientos</h2></div>
        ${historial.length > 0 ? `
        <div class="table-container">
          <table class="table">
            <thead><tr><th>Fecha / Hora</th><th>Empleado</th><th>Tipo</th><th>Cant.</th></tr></thead>
            <tbody>${histRows}</tbody>
          </table>
        </div>` : '<p class="text-muted" style="padding:16px">Sin movimientos registrados para este ítem.</p>'}
      </div>
    </div>
  </div><!-- .page-wrapper -->
  `;

  Utils.renderDone();
  drawStockChart(evolucion, ins.stockMinimo);
}

function drawStockChart(data, minimo) {
  const canvas = document.getElementById("chart-stock");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  const pad = { top: 10, right: 20, bottom: 30, left: 36 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;
  const maxVal = Math.max(...data, minimo) + 3;
  const minVal = 0;
  ctx.clearRect(0, 0, W, H);

  const xPos = (i) => pad.left + (i / (data.length - 1)) * innerW;
  const yPos = (v) => pad.top + innerH - ((v - minVal) / (maxVal - minVal)) * innerH;

  ctx.fillStyle = "#F8FAFC";
  ctx.fillRect(0, 0, W, H);

  // Línea mínimo
  const yMin = yPos(minimo);
  ctx.setLineDash([5, 4]);
  ctx.strokeStyle = "#D97706";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(pad.left, yMin);
  ctx.lineTo(W - pad.right, yMin);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#D97706";
  ctx.font = "10px sans-serif";
  ctx.fillText("mín.", pad.left - 34, yMin + 4);

  // Área
  ctx.beginPath();
  ctx.moveTo(xPos(0), yPos(data[0]));
  data.forEach((v, i) => ctx.lineTo(xPos(i), yPos(v)));
  ctx.lineTo(xPos(data.length - 1), H - pad.bottom);
  ctx.lineTo(xPos(0), H - pad.bottom);
  ctx.closePath();
  ctx.fillStyle = "rgba(37,99,235,0.08)";
  ctx.fill();

  // Línea
  ctx.beginPath();
  ctx.moveTo(xPos(0), yPos(data[0]));
  data.forEach((v, i) => ctx.lineTo(xPos(i), yPos(v)));
  ctx.strokeStyle = "#2563EB";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Etiquetas X
  ctx.fillStyle = "#94A3B8";
  ctx.font = "9px sans-serif";
  [0, 7, 14, 21, 29].forEach(i => {
    if (i < data.length) ctx.fillText(`d-${29 - i}`, xPos(i) - 10, H - 6);
  });
}

// ─── REGISTRAR MOVIMIENTO ────────────────────────────────────
function renderMovimiento(codigoPreseleccionado) {
  const app = document.getElementById("app");
  const opcionesInsertos = DATA.insertos.map(i =>
    `<option value="${i.codigo}" ${i.codigo === codigoPreseleccionado ? "selected" : ""}>${i.codigo} — ${i.detalle}</option>`
  ).join("");
  const opcionesEmpleados = DATA.empleados.map(e =>
    `<option value="${e.legajo}">${e.legajo} — ${e.nombre}</option>`
  ).join("");

  app.innerHTML = `
  <div class="page-wrapper">
    <div class="page-header">
      <div>
        <button class="btn btn-sm btn-ghost" onclick="history.back()">← Volver</button>
        <h1 class="page-title" style="margin-top:8px">Registrar movimiento</h1>
      </div>
    </div>

    <div class="form-container">
      <div class="card">
        <div class="card-header"><h2 class="card-title">Nuevo movimiento de stock</h2></div>
        <form id="form-movimiento" class="form" onsubmit="submitMovimiento(event)">

          <div class="form-group">
            <label class="form-label" for="mv-legajo">N° de Legajo <span class="required">*</span></label>
            <select class="form-input" id="mv-legajo" required onchange="onLegajoChange()">
              <option value="">— Seleccionar empleado —</option>
              ${opcionesEmpleados}
            </select>
            <div class="form-hint" id="mv-legajo-hint"></div>
          </div>

          <div class="form-group">
            <label class="form-label" for="mv-codigo">Código de inserto / herramienta <span class="required">*</span></label>
            <select class="form-input" id="mv-codigo" required>
              <option value="">— Seleccionar ítem —</option>
              ${opcionesInsertos}
            </select>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="mv-cantidad">Cantidad <span class="required">*</span></label>
              <input type="number" class="form-input" id="mv-cantidad" min="1" value="1" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="mv-tipo">Tipo de movimiento <span class="required">*</span></label>
              <select class="form-input" id="mv-tipo" required>
                <option value="Egreso">Egreso</option>
                <option value="Ingreso">Ingreso</option>
                <option value="Devolución">Devolución</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="mv-obs">Observaciones</label>
            <textarea class="form-input" id="mv-obs" rows="3" placeholder="Opcional…"></textarea>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-ghost" onclick="history.back()">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar movimiento</button>
          </div>
        </form>
      </div>
    </div>
  </div><!-- .page-wrapper -->
  `;

  Utils.renderDone();
}

function onLegajoChange() {
  const sel = document.getElementById("mv-legajo");
  const hint = document.getElementById("mv-legajo-hint");
  if (!sel || !hint) return;
  const emp = Utils.getEmpleado(sel.value);
  hint.textContent = emp ? `Empleado: ${emp.nombre}` : "";
  hint.className = emp ? "form-hint form-hint-ok" : "form-hint";
}

function submitMovimiento(e) {
  e.preventDefault();
  const legajo = document.getElementById("mv-legajo").value;
  const codigo = document.getElementById("mv-codigo").value;
  const cantidad = document.getElementById("mv-cantidad").value;
  const tipo = document.getElementById("mv-tipo").value;
  const emp = Utils.getEmpleado(legajo);
  const nombreEmp = emp ? emp.nombre : `Legajo ${legajo}`;
  Utils.showToast(`Movimiento registrado: ${nombreEmp} — ${tipo} de ${cantidad} u. de ${codigo}`);
  setTimeout(() => Router.navigate("/stock"), 500);
}

// ─── HISTORIAL GLOBAL ────────────────────────────────────────
function renderHistorial() {
  const app = document.getElementById("app");
  app.innerHTML = `
  <div class="page-wrapper">
    <div class="page-header">
      <div>
        <button class="btn btn-sm btn-ghost" onclick="Router.navigate('/stock')">← Stock</button>
        <h1 class="page-title" style="margin-top:8px">Historial de movimientos</h1>
        <p class="page-subtitle">Registro completo de egresos, ingresos y devoluciones</p>
      </div>
    </div>

    <div class="filter-bar">
      <input type="text" id="hist-search" class="input-search" placeholder="Buscar por código, empleado o legajo…" oninput="filtrarHistorial()">
      <select id="hist-tipo" class="input-select" onchange="filtrarHistorial()">
        <option value="">Todos los tipos</option>
        <option value="Egreso">Egreso</option>
        <option value="Ingreso">Ingreso</option>
        <option value="Devolución">Devolución</option>
      </select>
    </div>

    <div class="card">
      <div id="hist-container"></div>
    </div>
  </div><!-- .page-wrapper -->
  `;

  renderHistorialRows(buildHistorialCompleto());
  Utils.renderDone();
}

function buildHistorialCompleto() {
  const todos = [...DATA.movimientos];
  Object.entries(DATA.historialPorItem).forEach(([codigo, movs]) => {
    movs.forEach(m => {
      const yaEsta = todos.some(t => t.fechaHora === m.fechaHora && t.codigo === codigo && t.legajo === m.legajo);
      if (!yaEsta) todos.push({ ...m, codigo });
    });
  });
  return todos.sort((a, b) => b.fechaHora.localeCompare(a.fechaHora));
}

function renderHistorialRows(movs) {
  Utils.renderTablaMovimientos(movs, document.getElementById("hist-container"));
}

function filtrarHistorial() {
  const search = (document.getElementById("hist-search")?.value || "").toLowerCase();
  const tipo = document.getElementById("hist-tipo")?.value || "";
  const todos = buildHistorialCompleto();
  const filtrado = todos.filter(m => {
    const matchSearch = !search || m.codigo.toLowerCase().includes(search) ||
      (m.empleado || "").toLowerCase().includes(search) ||
      String(m.legajo).includes(search);
    const matchTipo = !tipo || m.tipo === tipo;
    return matchSearch && matchTipo;
  });
  renderHistorialRows(filtrado);
}