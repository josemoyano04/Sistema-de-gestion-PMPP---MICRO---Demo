// =============================================================
// ACCESORIOS.JS — Módulo 2: Accesorios de Sujeción
// =============================================================

function renderAccesorios() {
  const app = document.getElementById("app");
  app.innerHTML = `
  <div class="page-wrapper">
    <div class="page-header">
      <div>
        <h1 class="page-title">Accesorios de Sujeción</h1>
        <p class="page-subtitle">Módulo 2 — Portaherramientas y accesorios (${DATA.accesorios.length} ítems)</p>
      </div>
    </div>

    <div class="filter-bar">
      <input type="text" id="acc-search" class="input-search" placeholder="Buscar por código o descripción…" oninput="filtrarAccesorios()">
      <select id="acc-estado" class="input-select" onchange="filtrarAccesorios()">
        <option value="">Todos los estados</option>
        <option value="OK">OK</option>
        <option value="Stock bajo">Stock bajo</option>
        <option value="Sin stock">Sin stock</option>
      </select>
    </div>

    <div class="card">
      <div class="table-container">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Código interno</th>
              <th>Descripción / Modelo comercial</th>
              <th>Tipo</th>
              <th class="text-center">Stock actual</th>
              <th class="text-center">Estado</th>
            </tr>
          </thead>
          <tbody id="acc-tbody"></tbody>
        </table>
      </div>
    </div>
  </div><!-- .page-wrapper -->
  `;
  renderFilasAccesorios(DATA.accesorios);
  Utils.renderDone();
}

function renderFilasAccesorios(lista) {
  const tbody = document.getElementById("acc-tbody");
  if (!tbody) return;
  tbody.innerHTML = lista.map(a => {
    const est = Utils.estadoAccesorio(a.stock);
    return `
      <tr class="table-row-link" onclick="Router.navigate('/accesorios/${a.codigo}')">
        <td><code>${a.codigo}</code></td>
        <td><strong>${a.descripcion}</strong></td>
        <td><span class="chip">${a.tipo}</span></td>
        <td class="text-center"><strong>${a.stock}</strong></td>
        <td class="text-center">${Utils.badgeEstado(est)}</td>
      </tr>
    `;
  }).join("");
}

function filtrarAccesorios() {
  const search = (document.getElementById("acc-search")?.value || "").toLowerCase();
  const estado = document.getElementById("acc-estado")?.value || "";
  const filtrado = DATA.accesorios.filter(a => {
    const est = Utils.estadoAccesorio(a.stock);
    const matchSearch = !search || a.codigo.toLowerCase().includes(search) || a.descripcion.toLowerCase().includes(search);
    const matchEstado = !estado || est === estado;
    return matchSearch && matchEstado;
  });
  renderFilasAccesorios(filtrado);
}

// ─── DETALLE ─────────────────────────────────────────────────
function renderAccesorioDetalle(codigo) {
  const acc = Utils.getAccesorio(codigo);
  if (!acc) { Router.navigate("/accesorios"); return; }
  const app = document.getElementById("app");
  const estado = Utils.estadoAccesorio(acc.stock);

  const compatiblesRows = acc.compatibles.map(cod => {
    const ins = Utils.getInserto(cod);
    if (!ins) return "";
    return `
      <tr class="table-row-link" onclick="Router.navigate('/stock/${ins.codigo}')">
        <td><code>${ins.codigo}</code></td>
        <td>${ins.detalle}</td>
        <td class="text-center">${ins.clasificacion_iso.map(Utils.badgeISO).join(" ")}</td>
        <td class="text-center">${Utils.badgeEstado(ins.estado)}</td>
        <td class="text-center">${ins.stock}</td>
      </tr>
    `;
  }).join("");

  // SVG genérico de portaherramientas (geométrico, sin emoji)
  const iconoPH = `<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="80" fill="#e8edf2" rx="8"/>
    <rect x="18" y="34" width="44" height="12" fill="#8b9ab0" rx="3"/>
    <rect x="34" y="16" width="12" height="48" fill="#8b9ab0" rx="3"/>
    <circle cx="40" cy="40" r="7" fill="#1b6fa8"/>
    <circle cx="40" cy="40" r="3" fill="#e8edf2"/>
  </svg>`;

  app.innerHTML = `
  <div class="page-wrapper">
    <div class="page-header">
      <div>
        <button class="btn btn-sm btn-ghost" onclick="Router.navigate('/accesorios')">← Volver al listado</button>
        <h1 class="page-title" style="margin-top:8px">${acc.codigo} — ${acc.descripcion}</h1>
      </div>
    </div>

    <div class="detalle-grid detalle-grid-2">
      <!-- Info principal -->
      <div class="card">
        <div class="card-header"><h2 class="card-title">Información del accesorio</h2></div>
        <div class="img-container img-container-sm">
          ${iconoPH}
        </div>
        <div class="info-list">
          <div class="info-row"><span class="info-label">Código interno</span><code>${acc.codigo}</code></div>
          <div class="info-row"><span class="info-label">Modelo comercial</span><strong>${acc.descripcion}</strong></div>
          <div class="info-row"><span class="info-label">Tipo</span><span class="chip">${acc.tipo}</span></div>
          <div class="info-row"><span class="info-label">Stock actual</span>
            <span class="${estado === 'OK' ? 'color-ok' : estado === 'Stock bajo' ? 'color-warn' : 'color-danger'}">
              <strong>${acc.stock} unidades</strong>
            </span>
          </div>
          <div class="info-row"><span class="info-label">Estado</span>${Utils.badgeEstado(estado)}</div>
          <div class="info-row"><span class="info-label">Ubicación</span><span class="text-muted">Estante B-${acc.codigo.replace("HPORT","")}</span></div>
        </div>
      </div>

      <!-- Compatibilidades -->
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Compatibilidad con insertos</h2>
          <span class="badge badge-info">${acc.compatibles.length} inserto${acc.compatibles.length !== 1 ? "s" : ""}</span>
        </div>
        <p class="text-muted" style="padding: 12px 20px 0">Insertos aptos para usar con este portaherramientas:</p>
        <div class="table-container">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Código</th>
                <th>Detalle</th>
                <th class="text-center">ISO</th>
                <th class="text-center">Estado</th>
                <th class="text-center">Stock</th>
              </tr>
            </thead>
            <tbody>${compatiblesRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  </div><!-- .page-wrapper -->
  `;

  Utils.renderDone();
}