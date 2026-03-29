// ============================================================
// SEARCH — Cmd+K Command Palette
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.Search = (function() {
  let overlay, input, resultsList;
  let allItems = [];
  let isOpen = false;

  function init() {
    overlay = document.getElementById('cmd-palette');
    if (!overlay) return;
    input = overlay.querySelector('.cmd-input');
    resultsList = overlay.querySelector('.cmd-results');
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    input.addEventListener('input', () => search(input.value));
    input.addEventListener('keydown', handleKeyNav);
    buildIndex();
  }

  function buildIndex() {
    allItems = [];
    const App = window.PsycheApp;
    const D = window.PsycheData || {};

    // Index all framework layers
    (App.allFrameworks || []).forEach(fw => {
      allItems.push({ type: 'framework', label: fw.fullName || fw.name, sub: fw.tradition, action: () => { App.setFrameworkById(fw.id); close(); } });
      (fw.layers || []).forEach((layer, i) => {
        allItems.push({ type: 'layer', label: layer.name, sub: `${fw.name} · Layer ${i+1}`, action: () => { App.setFrameworkById(fw.id); App.selectLayer(i); close(); } });
      });
    });

    // Index archetypes
    (D.archetypes || []).forEach(a => {
      allItems.push({ type: 'archetype', label: a.name, sub: a.subtitle || 'Archetype', action: () => { App.goToView('archetypes'); close(); } });
    });

    // Index figures
    (D.historicalFigures || []).forEach(f => {
      allItems.push({ type: 'figure', label: f.name, sub: f.era || 'Historical Figure', action: () => { App.goToView('figures'); close(); } });
    });

    // Index views
    const views = [
      { id: 'map', label: 'Map View' }, { id: 'archetypes', label: 'Archetypes' },
      { id: 'figures', label: 'Historical Figures' }, { id: 'cases', label: 'Case Studies' },
      { id: 'disagree', label: 'Framework Tensions' }, { id: 'development', label: 'Growth & Development' },
      { id: 'trauma', label: 'Trauma Cartography' }, { id: 'darknight', label: 'Dark Night of the Soul' },
      { id: 'relationships', label: 'Relationship Dynamics' }, { id: 'personal', label: 'Personal Map' },
      { id: 'tracking', label: 'Journal & Tracking' }, { id: 'resources', label: 'Library & Resources' },
      { id: 'compare', label: 'Cultural Comparison' }, { id: 'lineage', label: 'Framework Lineage' }
    ];
    views.forEach(v => {
      allItems.push({ type: 'view', label: v.label, sub: 'Navigate', action: () => { App.goToView(v.id); close(); } });
    });
  }

  function search(query) {
    if (!resultsList) return;
    const q = query.toLowerCase().trim();
    if (!q) { resultsList.innerHTML = renderGrouped(allItems.slice(0, 12)); return; }
    const scored = allItems.map(item => {
      const label = item.label.toLowerCase();
      const sub = (item.sub || '').toLowerCase();
      let score = 0;
      if (label === q) score = 100;
      else if (label.startsWith(q)) score = 80;
      else if (label.includes(q)) score = 60;
      else if (sub.includes(q)) score = 40;
      else {
        // Fuzzy: check if all chars of query appear in order
        let qi = 0;
        for (let ci = 0; ci < label.length && qi < q.length; ci++) {
          if (label[ci] === q[qi]) qi++;
        }
        if (qi === q.length) score = 20;
      }
      return { ...item, score };
    }).filter(i => i.score > 0).sort((a, b) => b.score - a.score).slice(0, 15);
    resultsList.innerHTML = renderGrouped(scored);
    // Select first
    const first = resultsList.querySelector('.cmd-item');
    if (first) first.classList.add('selected');
  }

  function renderGrouped(items) {
    if (!items.length) return '<div class="cmd-empty">No results found</div>';
    const groups = {};
    const typeLabels = { framework: 'Frameworks', layer: 'Layers', archetype: 'Archetypes', figure: 'Figures', view: 'Views' };
    items.forEach(item => {
      const g = typeLabels[item.type] || 'Other';
      if (!groups[g]) groups[g] = [];
      groups[g].push(item);
    });
    let html = '';
    Object.entries(groups).forEach(([group, items]) => {
      html += `<div class="cmd-group">${group}</div>`;
      items.forEach((item, i) => {
        html += `<div class="cmd-item" data-idx="${allItems.indexOf(item)}" tabindex="-1">
          <span class="cmd-item-label">${highlight(item.label, input?.value || '')}</span>
          <span class="cmd-item-sub">${item.sub || ''}</span>
        </div>`;
      });
    });
    return html;
  }

  function highlight(text, query) {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return text.slice(0, idx) + '<mark>' + text.slice(idx, idx + query.length) + '</mark>' + text.slice(idx + query.length);
  }

  function handleKeyNav(e) {
    const items = resultsList.querySelectorAll('.cmd-item');
    const current = resultsList.querySelector('.cmd-item.selected');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!current) { items[0]?.classList.add('selected'); return; }
      const next = current.nextElementSibling;
      if (next?.classList.contains('cmd-item')) { current.classList.remove('selected'); next.classList.add('selected'); next.scrollIntoView({ block: 'nearest' }); }
      else {
        const nextGroup = current.nextElementSibling?.nextElementSibling;
        if (nextGroup?.classList.contains('cmd-item')) { current.classList.remove('selected'); nextGroup.classList.add('selected'); nextGroup.scrollIntoView({ block: 'nearest' }); }
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!current) return;
      const prev = current.previousElementSibling;
      if (prev?.classList.contains('cmd-item')) { current.classList.remove('selected'); prev.classList.add('selected'); prev.scrollIntoView({ block: 'nearest' }); }
      else if (prev?.classList.contains('cmd-group')) {
        const prevItem = prev.previousElementSibling;
        if (prevItem?.classList.contains('cmd-item')) { current.classList.remove('selected'); prevItem.classList.add('selected'); prevItem.scrollIntoView({ block: 'nearest' }); }
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const sel = resultsList.querySelector('.cmd-item.selected');
      if (sel) {
        const idx = parseInt(sel.dataset.idx);
        if (allItems[idx]?.action) allItems[idx].action();
      }
    } else if (e.key === 'Escape') {
      close();
    }
  }

  function open() {
    if (!overlay) return;
    isOpen = true;
    overlay.classList.add('open');
    input.value = '';
    search('');
    setTimeout(() => input.focus(), 50);
    window.PsycheApp.Sound?.playSearchOpen();
    // Click on items
    resultsList.addEventListener('click', (e) => {
      const item = e.target.closest('.cmd-item');
      if (item) {
        const idx = parseInt(item.dataset.idx);
        if (allItems[idx]?.action) allItems[idx].action();
      }
    });
  }

  function close() {
    if (!overlay) return;
    isOpen = false;
    overlay.classList.remove('open');
  }

  function isSearchOpen() { return isOpen; }

  return { init, open, close, isSearchOpen };
})();
