// =============================================================
// ROUTER.JS — SPA Router hash-based (con prioridad: exacto > literal > param)
// =============================================================

const Router = {
  routes: [],

  register(pattern, handler) {
    this.routes.push({ pattern, handler });
  },

  navigate(path) {
    window.location.hash = path;
  },

  handleRoute() {
    const rawHash = window.location.hash.replace(/^#/, "") || "/";
    const hash = rawHash.split("?")[0];

    // Update sidebar active state
    document.querySelectorAll(".nav-link").forEach(a => a.classList.remove("active"));
    const navLinks = [...document.querySelectorAll(".nav-link[data-route]")];
    navLinks.sort((a, b) => (b.getAttribute("data-route") || "").length - (a.getAttribute("data-route") || "").length);
    for (const a of navLinks) {
      const route = a.getAttribute("data-route");
      if (route && (hash === route || (route !== "/" && hash.startsWith(route)))) {
        a.classList.add("active");
        break;
      }
    }
    if (hash === "/") {
      document.querySelector('.nav-link[data-route="/"]')?.classList.add("active");
    }

    // Update header breadcrumb
    if (typeof updateHeaderSection === 'function') updateHeaderSection();

    // Match route — exact first
    for (const { pattern, handler } of this.routes) {
      if (!pattern.includes(":") && pattern === hash) {
        handler(); return;
      }
    }
    // Dynamic params
    for (const { pattern, handler } of this.routes) {
      if (pattern.includes(":")) {
        const regex = new RegExp("^" + pattern.replace(/:[^/]+/g, "([^/?]+)") + "(?:\\?.*)?$");
        const match = hash.match(regex);
        if (match) { handler(...match.slice(1)); return; }
      }
    }
    // Fallback
    const dash = this.routes.find(r => r.pattern === "/");
    if (dash) dash.handler();
  },

  init() {
    window.addEventListener("hashchange", () => this.handleRoute());
    this.handleRoute();
  }
};