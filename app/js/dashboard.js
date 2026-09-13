// =============================================================
// DASHBOARD.JS — Módulo Dashboard (Home)
// =============================================================

function renderDashboard() {
  const app = document.getElementById("app");

  const stockBajo = DATA.insertos.filter(i => i.estado === "Stock bajo" || i.estado === "Sin stock");
  const accesoriosEnUso = 42;

  const alertasRows = stockBajo.map(i => `
    <div class="alert-stock-row">
      <div>
        <code>${i.codigo}</code>
        <span class="text-muted" style="margin-left:8px">${i.detalle}</span>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <span style="font-size:12px;color:var(--text-muted)">
          Stock: <strong style="color:var(--text)">${i.stock}</strong> / Mín: ${i.stockMinimo}
        </span>
        ${Utils.badgeEstado(i.estado)}
        <button class="btn btn-sm btn-outline" onclick="Router.navigate('/stock/${i.codigo}')">Ver detalle</button>
      </div>
    </div>
  `).join("");

  const movRows = DATA.movimientos.map(m => `
    <tr>
      <td style="color:var(--text-muted);font-family:var(--font-mono);font-size:12px">${m.fechaHora}</td>
      <td><span class="legajo-tag">${m.legajo}</span> ${m.empleado}</td>
      <td>${Utils.badgeTipo(m.tipo)}</td>
      <td><code>${m.codigo}</code></td>
      <td class="text-center"><strong>${m.cantidad}</strong></td>
    </tr>
  `).join("");

  app.innerHTML = `
  <div class="page-wrapper">
    <div class="page-header">
      <div>
        <div class="page-eyebrow">Sistema de Gestión</div>
        <h1 class="page-title">Dashboard</h1>
        <p class="page-subtitle">Estado actual del pañol — ${new Date().toLocaleDateString('es-AR', {weekday:'long', day:'numeric', month:'long'})}</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-outline" onclick="Router.navigate('/historial')">
          <i data-lucide="list"></i> Historial
        </button>
        <button class="btn btn-primary" onclick="Router.navigate('/movimiento')">
          <i data-lucide="plus"></i> Registrar movimiento
        </button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="kpi-grid">
      <div class="kpi-card kpi-danger">
        <div class="kpi-card-top">
          <div class="kpi-icon"><i data-lucide="alert-triangle"></i></div>
        </div>
        <div class="kpi-body">
          <div class="kpi-value">${stockBajo.length}</div>
          <div class="kpi-label">Ítems con stock crítico</div>
        </div>
      </div>
      <div class="kpi-card kpi-info">
        <div class="kpi-card-top">
          <div class="kpi-icon"><i data-lucide="wrench"></i></div>
        </div>
        <div class="kpi-body">
          <div class="kpi-value">${accesoriosEnUso}</div>
          <div class="kpi-label">Accesorios en uso</div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-card-top">
          <div class="kpi-icon"><i data-lucide="package"></i></div>
        </div>
        <div class="kpi-body">
          <div class="kpi-value">${DATA.insertos.length}</div>
          <div class="kpi-label">Ítems en catálogo</div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-card-top">
          <div class="kpi-icon"><i data-lucide="cpu"></i></div>
        </div>
        <div class="kpi-body">
          <div class="kpi-value">${DATA.setups.length}</div>
          <div class="kpi-label">Setups activos</div>
        </div>
      </div>
    </div>

    <!-- Accesos rápidos -->
    <div class="quick-actions">
      <button class="btn btn-primary" onclick="Router.navigate('/movimiento')">
        <i data-lucide="plus-circle"></i> Registrar movimiento
      </button>
      <button class="btn btn-outline" onclick="Router.navigate('/setups/nuevo')">
        <i data-lucide="cpu"></i> Nuevo setup
      </button>
      <button class="btn btn-ghost" onclick="Router.navigate('/fichas')">
        <i data-lucide="file-text"></i> Fichas técnicas
      </button>
    </div>

    <!-- Grid -->
    <div class="dash-grid">
      <!-- Últimos movimientos -->
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Últimos movimientos</h2>
          <button class="btn btn-sm btn-ghost" onclick="Router.navigate('/historial')">
            Ver todos <i data-lucide="arrow-right"></i>
          </button>
        </div>
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Fecha / Hora</th>
                <th>Empleado</th>
                <th>Tipo</th>
                <th>Código</th>
                <th class="text-center">Cant.</th>
              </tr>
            </thead>
            <tbody>${movRows}</tbody>
          </table>
        </div>
      </div>

      <!-- Alertas de stock -->
      <div class="card">
        <div class="card-header">
          <h2 class="card-title card-title-with-icon">
            <span class="icon-warn"><i data-lucide="alert-triangle"></i></span>
            Alertas de stock
          </h2>
          <span class="badge badge-danger">${stockBajo.length}</span>
        </div>
        <div class="alert-stock-list">
          ${alertasRows}
        </div>
      </div>
    </div>
  </div><!-- .page-wrapper -->
  `;

  Utils.renderDone();
}