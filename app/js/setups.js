// =============================================================
// SETUPS.JS — Módulo 3: Setup de Máquinas
// =============================================================

function renderSetups() {
  const app = document.getElementById("app");
  app.innerHTML = `
  <div class="page-wrapper">
    <div class="page-header">
      <div>
        <h1 class="page-title">Setup de Máquinas</h1>
        <p class="page-subtitle">Módulo 3 — Hojas de ruta de puesta a punto (${DATA.setups.length} setups)</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="Router.navigate('/setups/nuevo')">
          <i data-lucide="plus-circle"></i> Nuevo setup
        </button>
      </div>
    </div>

    <div class="filter-bar">
      <input type="text" id="setup-search" class="input-search" placeholder="Buscar por pieza, programa o número de setup…" oninput="filtrarSetups()">
      <select id="setup-maquina" class="input-select" onchange="filtrarSetups()">
        <option value="">Todas las máquinas</option>
        ${DATA.maquinas.map(m => `<option value="${m.codigo}">${m.codigo} — ${m.denominacion}</option>`).join("")}
      </select>
    </div>

    <div class="card">
      <div class="table-container">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>N° Setup</th>
              <th>Pieza</th>
              <th>Máquina</th>
              <th class="text-center">Op.</th>
              <th>Programa</th>
              <th class="text-center">Herramientas</th>
              <th class="text-center">T. Setup (min)</th>
            </tr>
          </thead>
          <tbody id="setup-tbody"></tbody>
        </table>
      </div>
    </div>
  </div><!-- .page-wrapper -->
  `;
  renderFilasSetup(DATA.setups);
  Utils.renderDone();
}

function renderFilasSetup(lista) {
  const tbody = document.getElementById("setup-tbody");
  if (!tbody) return;
  tbody.innerHTML = lista.map(s => {
    const maq = Utils.getMaquina(s.maquina);
    return `
      <tr class="table-row-link" onclick="Router.navigate('/setups/${s.numeroSetup}')">
        <td><strong>${s.numeroSetup}</strong></td>
        <td><code>${s.pieza}</code></td>
        <td>${s.maquina} <span class="text-muted">— ${maq ? maq.denominacion : ""}</span></td>
        <td class="text-center">${s.operacion}</td>
        <td><code>${s.programa}</code></td>
        <td class="text-center"><span class="chip">${s.herramientas.length}</span></td>
        <td class="text-center"><strong>${s.tiempoSetup}</strong></td>
      </tr>
    `;
  }).join("");
}

function filtrarSetups() {
  const search = (document.getElementById("setup-search")?.value || "").toLowerCase();
  const maquina = document.getElementById("setup-maquina")?.value || "";
  const filtrado = DATA.setups.filter(s => {
    const matchSearch = !search || s.numeroSetup.toLowerCase().includes(search) ||
      s.pieza.toLowerCase().includes(search) || s.programa.toLowerCase().includes(search);
    const matchMaq = !maquina || s.maquina === maquina;
    return matchSearch && matchMaq;
  });
  renderFilasSetup(filtrado);
}

// ─── DETALLE DE SETUP ─────────────────────────────────────────
function renderSetupDetalle(numeroSetup) {
  const setup = Utils.getSetup(numeroSetup);
  if (!setup) { Router.navigate("/setups"); return; }
  const app = document.getElementById("app");
  const maq = Utils.getMaquina(setup.maquina);

  const herrRows = setup.herramientas.map(h => {
    const ins = Utils.getInserto(h.herr);
    const acc = Utils.getAccesorio(h.porta);
    return `
      <tr>
        <td>
          <code>${h.herr}</code>
          <div class="text-muted" style="font-size:0.82em;margin-top:2px">${ins ? ins.detalle : "—"}</div>
        </td>
        <td>
          <code>${h.porta}</code>
          <div class="text-muted" style="font-size:0.82em;margin-top:2px">${acc ? acc.descripcion : "—"}</div>
        </td>
        <td class="text-center">${ins ? ins.clasificacion_iso.map(Utils.badgeISO).join(" ") : "—"}</td>
        <td class="text-center">${ins ? Utils.badgeEstado(ins.estado) : "—"}</td>
      </tr>
    `;
  }).join("");

  const boquillasHTML = setup.boquillas && setup.boquillas.length > 0
    ? setup.boquillas.map(b => `<span class="chip chip-blue">${b}</span>`).join(" ")
    : '<span class="text-muted">Sin boquillas requeridas</span>';

  app.innerHTML = `
  <div class="page-wrapper">
    <div class="page-header">
      <div>
        <button class="btn btn-sm btn-ghost" onclick="Router.navigate('/setups')">← Volver al listado</button>
        <h1 class="page-title" style="margin-top:8px">Hoja de Ruta — ${setup.numeroSetup}</h1>
        <p class="page-subtitle">Pieza: <strong>${setup.pieza}</strong> · Operación ${setup.operacion}</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-outline" onclick="Utils.showToast('Función de impresión/exportación en desarrollo', 'info')">
          <i data-lucide="printer"></i> Imprimir / Exportar
        </button>
      </div>
    </div>

    <!-- KPIs de tiempo -->
    <div class="kpi-grid kpi-grid-4" style="margin-bottom:16px">
      <div class="kpi-card kpi-info">
        <div class="kpi-card-top">
          <div class="kpi-icon"><i data-lucide="timer"></i></div>
        </div>
        <div class="kpi-body">
          <div class="kpi-value">${setup.tiempoSetup} <small>min</small></div>
          <div class="kpi-label">Tiempo de setup</div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-card-top">
          <div class="kpi-icon"><i data-lucide="repeat"></i></div>
        </div>
        <div class="kpi-body">
          <div class="kpi-value">${setup.tiempoProg} <small>min</small></div>
          <div class="kpi-label">Tiempo de programa</div>
        </div>
      </div>
    </div>

    <!-- Datos generales -->
    <div class="detalle-grid detalle-grid-setup">
      <div class="card">
        <div class="card-header"><h2 class="card-title">Datos generales</h2></div>
        <div class="info-list">
          <div class="info-row"><span class="info-label">N° de Setup</span><strong>${setup.numeroSetup}</strong></div>
          <div class="info-row"><span class="info-label">Pieza</span><code>${setup.pieza}</code></div>
          <div class="info-row"><span class="info-label">Máquina</span>
            <span>${setup.maquina} <span class="text-muted">— ${maq ? maq.denominacion : "—"}</span></span>
          </div>
          <div class="info-row"><span class="info-label">Operación</span><strong>Op. ${setup.operacion}</strong></div>
          <div class="info-row"><span class="info-label">Programa CNC</span><code>${setup.programa}</code></div>
        </div>
      </div>

      <!-- Boquillas -->
      <div class="card">
        <div class="card-header"><h2 class="card-title">Boquillas requeridas</h2></div>
        <div style="padding:16px 20px">
          ${boquillasHTML}
        </div>
      </div>
    </div>

    <!-- Tabla de herramientas -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Herramientas / Insertos / Portaherramientas</h2>
        <span class="badge badge-info">${setup.herramientas.length} herramienta${setup.herramientas.length !== 1 ? "s" : ""}</span>
      </div>
      <div class="table-container">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Herramienta / Inserto</th>
              <th>Portaherramientas</th>
              <th class="text-center">ISO</th>
              <th class="text-center">Estado stock</th>
            </tr>
          </thead>
          <tbody>${herrRows}</tbody>
        </table>
      </div>
    </div>
  </div><!-- .page-wrapper -->
  `;

  Utils.renderDone();
}

// ─── NUEVO SETUP ─────────────────────────────────────────────
function renderNuevoSetup() {
  const app = document.getElementById("app");
  const opcionesMaq = DATA.maquinas.map(m =>
    `<option value="${m.codigo}">${m.codigo} — ${m.denominacion}</option>`
  ).join("");
  const opcionesIns = DATA.insertos.map(i =>
    `<option value="${i.codigo}">${i.codigo} — ${i.detalle}</option>`
  ).join("");
  const opcionesAcc = DATA.accesorios.map(a =>
    `<option value="${a.codigo}">${a.codigo} — ${a.descripcion}</option>`
  ).join("");

  app.innerHTML = `
  <div class="page-wrapper">
    <div class="page-header">
      <div>
        <button class="btn btn-sm btn-ghost" onclick="Router.navigate('/setups')">← Volver al listado</button>
        <h1 class="page-title" style="margin-top:8px">Nuevo Setup</h1>
      </div>
    </div>

    <div class="form-container">
      <div class="card">
        <div class="card-header"><h2 class="card-title">Datos de la hoja de ruta</h2></div>
        <form id="form-setup" class="form" onsubmit="submitSetup(event)">

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Pieza <span class="required">*</span></label>
              <input type="text" class="form-input" id="ns-pieza" placeholder="Ej: PZ-1045" required>
            </div>
            <div class="form-group">
              <label class="form-label">Máquina <span class="required">*</span></label>
              <select class="form-input" id="ns-maquina" required>
                <option value="">— Seleccionar —</option>
                ${opcionesMaq}
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Operación <span class="required">*</span></label>
              <input type="number" class="form-input" id="ns-operacion" min="1" placeholder="Ej: 2" required>
            </div>
            <div class="form-group">
              <label class="form-label">Programa CNC <span class="required">*</span></label>
              <input type="text" class="form-input" id="ns-programa" placeholder="Ej: O1045" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Tiempo de setup (min) <span class="required">*</span></label>
              <input type="number" class="form-input" id="ns-tsetup" min="1" required>
            </div>
            <div class="form-group">
              <label class="form-label">Tiempo de programa (min) <span class="required">*</span></label>
              <input type="number" class="form-input" id="ns-tprog" min="0.1" step="0.1" required>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Herramientas / Insertos</label>
            <table class="table" style="margin-top:8px">
              <thead>
                <tr><th>Inserto / Herramienta</th><th>Portaherramientas</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><select class="form-input"><option value="">— Seleccionar —</option>${opcionesIns}</select></td>
                  <td><select class="form-input"><option value="">— Seleccionar —</option>${opcionesAcc}</select></td>
                </tr>
                <tr>
                  <td><select class="form-input"><option value="">— Seleccionar —</option>${opcionesIns}</select></td>
                  <td><select class="form-input"><option value="">— Seleccionar —</option>${opcionesAcc}</select></td>
                </tr>
                <tr>
                  <td><select class="form-input"><option value="">— Seleccionar —</option>${opcionesIns}</select></td>
                  <td><select class="form-input"><option value="">— Seleccionar —</option>${opcionesAcc}</select></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="form-group">
            <label class="form-label">Boquillas (separadas por coma, opcional)</label>
            <input type="text" class="form-input" id="ns-boquillas" placeholder="Ej: ER32 Ø10-9, ER25 Ø8-7">
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-ghost" onclick="Router.navigate('/setups')">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar setup</button>
          </div>
        </form>
      </div>
    </div>
  </div><!-- .page-wrapper -->
  `;

  Utils.renderDone();
}

function submitSetup(e) {
  e.preventDefault();
  const pieza = document.getElementById("ns-pieza").value;
  Utils.showToast(`Setup guardado: Pieza ${pieza} registrada correctamente`);
  setTimeout(() => Router.navigate("/setups"), 500);
}