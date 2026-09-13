// =============================================================
// FICHAS.JS — Módulo 4: Fichas Técnicas
// =============================================================

function renderFichas() {
  const app = document.getElementById("app");
  app.innerHTML = `
  <div class="page-wrapper">
    <div class="page-header">
      <div>
        <div class="page-eyebrow">Módulo 4</div>
        <h1 class="page-title">Fichas Técnicas</h1>
        <p class="page-subtitle">Parámetros y geometría de insertos — ${DATA.insertos.length} fichas disponibles</p>
      </div>
    </div>

    <div class="filter-bar">
      <input type="text" id="ficha-search" class="input-search" placeholder="Buscar por código o detalle…" oninput="filtrarFichas()">
      <select id="ficha-iso" class="input-select" onchange="filtrarFichas()">
        <option value="">Todas las clasificaciones ISO</option>
        <option value="P">ISO P — Acero</option>
        <option value="M">ISO M — Inoxidable</option>
        <option value="N">ISO N — Aluminio / No ferroso</option>
      </select>
    </div>

    <div id="fichas-grid" class="fichas-grid"></div>
  </div>
  `;
  renderFichasGrid(DATA.insertos);
  Utils.renderDone();
}

function renderFichasGrid(lista) {
  const grid = document.getElementById("fichas-grid");
  if (!grid) return;
  grid.innerHTML = lista.map(ins => `
    <div class="ficha-card" onclick="Router.navigate('/fichas/${ins.codigo}')">
      <div class="ficha-card-img">
        <img src="${ins.url_imagen_inserto || Utils.imgPlaceholder()}"
             onerror="this.src='${Utils.imgPlaceholder()}'"
             alt="${ins.detalle}">
      </div>
      <div class="ficha-card-body">
        <div class="ficha-card-codigo">${ins.codigo}</div>
        <div class="ficha-card-detalle">${ins.detalle}</div>
        <div class="ficha-card-badges">
          ${ins.clasificacion_iso.map(Utils.badgeISO).join(" ")}
        </div>
      </div>
    </div>
  `).join("");
}

function filtrarFichas() {
  const search = (document.getElementById("ficha-search")?.value || "").toLowerCase();
  const iso = document.getElementById("ficha-iso")?.value || "";
  const filtrado = DATA.insertos.filter(i => {
    const matchSearch = !search || i.codigo.toLowerCase().includes(search) || i.detalle.toLowerCase().includes(search);
    const matchISO = !iso || i.clasificacion_iso.includes(iso);
    return matchSearch && matchISO;
  });
  renderFichasGrid(filtrado);
}

// ─── DETALLE DE FICHA TÉCNICA ─────────────────────────────────
function renderFichaDetalle(codigo) {
  const ins = Utils.getInserto(codigo);
  if (!ins) { Router.navigate("/fichas"); return; }
  const app = document.getElementById("app");

  app.innerHTML = `
  <div class="page-wrapper">
    <!-- Banner de producto -->
    <div class="ficha-banner">
      <div class="ficha-banner-info">
        <button class="btn btn-sm btn-ghost" style="color:rgba(255,255,255,0.75);margin-bottom:14px" onclick="Router.navigate('/fichas')">
          <i data-lucide="arrow-left"></i> Fichas técnicas
        </button>
        <h1 class="ficha-banner-titulo">${ins.detalle}</h1>
        <span class="ficha-banner-codigo">${ins.codigo}</span>
        <div style="margin-top:14px;display:flex;gap:6px;flex-wrap:wrap">
          ${ins.clasificacion_iso.map(Utils.badgeISO).join(" ")}
        </div>
      </div>
      <div class="ficha-banner-actions">
        <button class="btn btn-outline btn-sm" style="color:rgba(255,255,255,0.85);border-color:rgba(255,255,255,0.3);backdrop-filter:blur(4px)" onclick="Router.navigate('/stock/${ins.codigo}')">
          <i data-lucide="package"></i> Ver stock
        </button>
      </div>
    </div>

    <!-- Cuerpo de ficha en grid -->
    <div class="ficha-detalle-grid">

      <!-- Card imagen -->
      <div class="card ficha-img-card">
        <div class="card-header"><h2 class="card-title">Geometría del inserto</h2></div>
        <div class="img-container img-container-lg">
          <img src="${ins.url_imagen_inserto || Utils.imgPlaceholder()}"
               onerror="this.src='${Utils.imgPlaceholder()}'"
               alt="${ins.detalle}" class="inserto-img-lg">
        </div>
      </div>

      <!-- Card parámetros -->
      <div class="card">
        <div class="card-header"><h2 class="card-title">Parámetros de mecanizado</h2></div>
        <div class="params-grid params-grid-lg">
          <div class="param-item param-item-lg">
            <span class="param-label">Ap [mm]</span>
            <span class="param-label-sub">Prof. de corte</span>
            <span class="param-value param-value-lg">${Utils.val(ins.ap_mm)}</span>
          </div>
          <div class="param-item param-item-lg">
            <span class="param-label">Ft [mm/rpm]</span>
            <span class="param-label-sub">Avance</span>
            <span class="param-value param-value-lg">${Utils.val(ins.ft_mm_rpm)}</span>
          </div>
          <div class="param-item param-item-lg">
            <span class="param-label">Vc [m/min]</span>
            <span class="param-label-sub">Vel. de corte</span>
            <span class="param-value param-value-lg">${Utils.val(ins.vc_m_min)}</span>
          </div>
          <div class="param-item param-item-lg">
            <span class="param-label">R [mm]</span>
            <span class="param-label-sub">Radio del inserto</span>
            <span class="param-value param-value-lg">${Utils.val(ins.r_mm)}</span>
          </div>
        </div>
        <div style="padding:12px 20px;border-top:1px solid var(--border)">
          <div class="info-row" style="padding:6px 0">
            <span class="info-label">Clasificación ISO</span>
            <span>${ins.clasificacion_iso.map(Utils.badgeISO).join(" ")}</span>
          </div>
        </div>
        <div class="ficha-nota">
          Este dato es orientativo y complementa el criterio del preparador. Los parámetros pueden variar según material, estado de la máquina y condiciones de corte.
        </div>
      </div>

      <!-- Card porta herramientas -->
      <div class="card">
        <div class="card-header"><h2 class="card-title">Portaherramientas Compatibles</h2></div>
        <div style="padding:16px 20px">
          ${Utils.renderChips(ins.porta_herramientas, "chip chip-blue chip-lg")}
          <p class="text-muted" style="margin-top:12px;font-size:12px">
            Códigos de portaherramientas recomendados para montar este inserto.
          </p>
        </div>
      </div>

      <!-- Card tipos de mecanizado -->
      <div class="card">
        <div class="card-header"><h2 class="card-title">Tipos de Mecanizado Admitidos</h2></div>
        <div style="padding:16px 20px">
          ${ins.url_imagen_tipo_mecanizado
            ? `<img src="${ins.url_imagen_tipo_mecanizado}" alt="Tipo de mecanizado" style="max-width:100%;border-radius:4px">`
            : `<p class="text-muted ficha-sin-datos">Imagen de tipo de mecanizado no disponible en catálogo.</p>`
          }
        </div>
      </div>

      <!-- Botón plano técnico -->
      <div class="ficha-plano-section">
        <button class="btn btn-secondary btn-lg" onclick="abrirModalPlano('${ins.codigo}')">
          <i data-lucide="file-search"></i> Ver Plano Técnico
        </button>
        ${!ins.url_imagen_plano ? '<span class="text-muted" style="font-size:12px">Plano esquemático no disponible para este ítem</span>' : ""}
      </div>
    </div>

    <!-- Modal plano técnico -->
    <div id="modal-plano" class="modal-overlay" onclick="cerrarModalPlano(event)">
      <div class="modal-content modal-lg">
        <div class="modal-header">
          <h3>Plano Técnico — ${ins.codigo}</h3>
          <button class="modal-close" onclick="cerrarModalPlano()">
            <i data-lucide="x"></i>
          </button>
        </div>
        <div class="modal-body">
          ${ins.url_imagen_plano
            ? `<img src="${ins.url_imagen_plano}" alt="Plano técnico ${ins.codigo}" class="plano-img" onerror="this.parentElement.innerHTML='<p class=\\'text-muted\\'>Plano no disponible.</p>'">`
            : `<p class="text-muted">Plano esquemático no disponible para este inserto.</p>`
          }
          <div style="margin-top:22px">
            <h4 style="margin-bottom:10px;font-size:13px;color:var(--text-secondary)">Medidas del plano</h4>
            ${ins.medidas_plano
              ? `<pre style="font-size:12px">${JSON.stringify(ins.medidas_plano, null, 2)}</pre>`
              : `<p class="text-muted" style="font-size:13px">Sin datos especificados</p>`
            }
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  Utils.renderDone();
}

function abrirModalPlano(codigo) {
  const modal = document.getElementById("modal-plano");
  if (modal) {
    modal.classList.add("modal-visible");
    document.body.style.overflow = "hidden";
  }
}

function cerrarModalPlano(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById("modal-plano");
  if (modal) {
    modal.classList.remove("modal-visible");
    document.body.style.overflow = "";
  }
}