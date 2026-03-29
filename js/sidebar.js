// ============================================================
// SIDEBAR — Floating detail panel for selected psyche nodes
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.Sidebar = (function() {
  let sidebarEl, titleEl, subtitleEl, contentEl, closeBtn;
  let isOpen = false;

  function init() {
    sidebarEl = document.getElementById('sidebar');
    titleEl = document.getElementById('sidebar-title');
    subtitleEl = document.getElementById('sidebar-subtitle');
    contentEl = document.getElementById('sidebar-content');
    closeBtn = document.getElementById('sidebar-close');
    closeBtn.addEventListener('click', hide);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
  }

  function show(data) {
    if (!data) return;
    titleEl.textContent = data.name || '';
    subtitleEl.textContent = data.subtitle || data.framework || '';
    contentEl.innerHTML = buildContent(data);
    sidebarEl.classList.remove('hidden');
    isOpen = true;
    // Bind section toggles
    contentEl.querySelectorAll('.sb-section-header').forEach(h => {
      h.addEventListener('click', () => {
        h.classList.toggle('open');
        const body = h.nextElementSibling;
        if (body) body.classList.toggle('open');
      });
    });
    // Bind accordion toggles
    contentEl.querySelectorAll('.js-accordion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        const body = btn.nextElementSibling;
        if (body) {
          if (btn.classList.contains('active')) {
            body.style.maxHeight = body.scrollHeight + "px";
          } else {
            body.style.maxHeight = null;
          }
        }
      });
    });
    // Auto-open first two sections
    const headers = contentEl.querySelectorAll('.sb-section-header');
    headers.forEach((h, i) => {
      if (i < 2) { h.classList.add('open'); h.nextElementSibling?.classList.add('open'); }
    });
  }

  function hide() {
    sidebarEl.classList.add('hidden');
    isOpen = false;
    if (window.PsycheApp.onSidebarClose) window.PsycheApp.onSidebarClose();
  }

  function buildContent(data) {
    let html = '';
    
    // Core Data
    if (data.description) html += section('Description', `<p>${esc(data.description)}</p>`);
    if (data.pathology) html += section('What Goes Wrong', `<p>${esc(data.pathology)}</p>`);
    if (data.shadow) html += section('Shadow Aspect', `<p>${esc(data.shadow)}</p>`);
    if (data.history) html += section('Historical Context', `<p>${esc(data.history)}</p>`);
    if (data.philosophy) html += section('Philosophical Connections', `<p>${esc(data.philosophy)}</p>`);
    if (data.psychology) html += section('Modern Psychology', `<p>${esc(data.psychology)}</p>`);

    // == PHASE 8 DEEP DIVE EXPANDED CARDS ==
    const hasDeepDive = data.neurology || data.archetype || data.trauma || data.development || data.culturalLens;
    if (hasDeepDive) {
      let dd = '<div class="deep-dive-grid">';
      if (data.neurology) dd += `<div class="dd-card"><div class="dd-icon">🧠</div><div class="dd-title">Neurology & Hardware</div><div class="dd-text">${esc(data.neurology)}</div></div>`;
      if (data.archetype) dd += `<div class="dd-card"><div class="dd-icon">🎭</div><div class="dd-title">Archetypal & Mythic</div><div class="dd-text">${esc(data.archetype)}</div></div>`;
      if (data.trauma) dd += `<div class="dd-card"><div class="dd-icon">⚡</div><div class="dd-title">Trauma & Healing</div><div class="dd-text">${esc(data.trauma)}</div></div>`;
      if (data.development) dd += `<div class="dd-card"><div class="dd-icon">🌱</div><div class="dd-title">Developmental</div><div class="dd-text">${esc(data.development)}</div></div>`;
      if (data.culturalLens) dd += `<div class="dd-card"><div class="dd-icon">👁️</div><div class="dd-title">Cultural Lens</div><div class="dd-text">${esc(data.culturalLens)}</div></div>`;
      dd += '</div>';
      html += section('Deep Dive Analysis', dd);
    }

    // Lists & Tags
    if (data.practices && data.practices.length) {
      html += section('Practices', data.practices.map(p => `<div class="sb-tag">${esc(p)}</div>`).join(''));
    }
    if (data.reflections && data.reflections.length) {
      html += section('Reflect', data.reflections.map(q => `<div class="sb-question">${esc(q)}</div>`).join(''));
    }
    if (data.resources && data.resources.length) {
      html += section('Resources', data.resources.map(r =>
        `<div class="sb-resource"><span class="sb-resource-title">${esc(r.title)}</span></div>`
      ).join(''));
    }
    
    // Cross-framework connections
    if (data.crossRefs && data.crossRefs.length) {
      html += section('Universal Resonance', data.crossRefs.map(cr =>
        `<div class="sb-crossref" data-fw="${cr.frameworkId}" data-layer="${cr.layerIdx}"><strong>${esc(cr.frameworkName)}:</strong> ${esc(cr.layerName)}</div>`
      ).join(''));
    }
    return html;
  }

  function section(title, body) {
    return `<div class="sb-section"><div class="sb-section-header">${esc(title)}</div><div class="sb-section-body">${body}</div></div>`;
  }

  function esc(str) {
    if (!str) return '';
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  return { init, show, hide, get isOpen() { return isOpen; } };
})();
