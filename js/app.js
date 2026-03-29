// ============================================================
// APP CONTROLLER — Navigation, keyboard, theme, initialization
// ============================================================
(function() {
  const App = window.PsycheApp = window.PsycheApp || {};
  const D = window.PsycheData || {};

  // Combine all frameworks
  App.allFrameworks = [
    ...(D.frameworksWestern || []),
    ...(D.frameworksEastern || []),
    ...(D.frameworksIndigenous || []),
    ...(D.frameworksEsoteric || []),
    ...(D.frameworksModern || []),
    ...(D.frameworksSpiritual || [])
  ];

  App.currentFramework = App.allFrameworks[0];
  let currentView = 'map';
  let currentTradition = 'all';
  let mapMode = '3d'; // '3d' or '2d'

  // ── VIEWS CONFIG ──
  const views = [
    { id: 'map', label: 'Map', icon: '◉', group: 'core' },
    { id: 'compare', label: 'Compare', icon: '⊞', group: 'core' },
    { id: 'lineage', label: 'Lineage', icon: '⟡', group: 'core' },
    { id: '_sep1', sep: true },
    { id: 'archetypes', label: 'Archetypes', icon: '☿', group: 'explore' },
    { id: 'scanner', label: 'Shadow Scanner', icon: '◖', group: 'explore' },
    { id: 'ego', label: 'Ego', icon: 'ψ', group: 'explore' },
    { id: 'figures', label: 'Figures', icon: '♰', group: 'explore' },
    { id: 'cases', label: 'Cases', icon: '◈', group: 'explore' },
    { id: 'disagree', label: 'Tensions', icon: '⚡', group: 'explore' },
    { id: '_sep2', sep: true },
    { id: 'development', label: 'Growth', icon: '↑', group: 'journey' },
    { id: 'trauma', label: 'Trauma', icon: '◇', group: 'journey' },
    { id: 'darknight', label: 'Dark Night', icon: '☾', group: 'journey' },
    { id: 'relationships', label: 'Relations', icon: '∞', group: 'journey' },
    { id: '_sep3', sep: true },
    { id: 'personal', label: 'My Map', icon: '◎', group: 'you' },
    { id: 'resources', label: 'Library', icon: '⊡', group: 'you' },
  ];
  const navigableViews = views.filter(v => !v.sep);

  // ── INIT ──
  function init() {
    console.log("PSYCHE: Initializing Master Edition...");
    
    if (!App.allFrameworks || App.allFrameworks.length === 0) {
      console.error("PSYCHE: No frameworks loaded. Check your 'data/' folder and script paths.");
      const errorMsg = document.createElement('div');
      errorMsg.style = "position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(20,0,0,0.95); color:#ff4d4d; z-index:9999; font-family:monospace; padding:40px; text-align:center;";
      errorMsg.innerHTML = "<h1>Data Load Error</h1><p>No frameworks found. Please ensure the 'data/' folder is correctly uploaded to your server.</p>";
      document.body.appendChild(errorMsg);
      return;
    }

    App.Sidebar.init();
    App.Sphere3D.init();
    App.View2D?.init();
    App.Sound?.init();
    App.Search?.init();

    buildFrameworkTabs();
    buildViewTabs();
    bindTraditionFilter();
    bindMapModeToggle();
    bindUtilityButtons();
    bindKeyboard();
    bindLogoClick();
    bindPhase8Expansions();
    loadTheme();

    setFramework(App.allFrameworks[0]);
    setView('map');

    setTimeout(() => {
      const ls = document.getElementById('loading-screen');
      if (ls) { ls.classList.add('done'); setTimeout(() => ls.remove(), 1000); }
    }, 2200);
  }

  // ── PUBLIC API (for search/other modules) ──
  App.setFrameworkById = function(id, targetLayerIdx = null, noSwitch = false) {
    const fw = App.allFrameworks.find(f => f.id === id);
    if (fw) {
      setFramework(fw);
      if (targetLayerIdx !== null) {
        // Delay slightly for 3D map to prep
        setTimeout(() => App.selectLayer(targetLayerIdx, noSwitch), 100);
      }
    }
  };
  App.selectLayer = function(idx, noSwitch = false) {
    // 3D sync should happen regardless of noSwitch
    if (App.Sphere3D && App.Sphere3D.selectNodeByIndex) {
      App.Sphere3D.selectNodeByIndex(idx);
    }
    // Only redirect if explicitly allowed
    if (noSwitch === false && currentView !== 'map') {
      setView('map');
    }
  };
  App.goToView = function(id) { setView(id); };

  // ── FRAMEWORK TABS ──
  function buildFrameworkTabs() {
    const c = document.getElementById('framework-tabs');
    if (!c) return;
    renderFrameworkTabs(c, App.allFrameworks);
  }
  function renderFrameworkTabs(container, frameworks) {
    const year = App.currentYear || 2026;
    const visible = frameworks.filter(f => (f.year || 0) <= year);
    
    container.innerHTML = visible.map(fw =>
      `<button class="fw-tab ${fw.id === App.currentFramework?.id ? 'active':''}" data-id="${fw.id}" title="${fw.fullName}">${fw.name}</button>`
    ).join('');
    container.querySelectorAll('.fw-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const fw = App.allFrameworks.find(f => f.id === tab.dataset.id);
        if (fw) setFramework(fw);
      });
    });
  }
  function setFramework(fw) {
    if (!fw) return;
    const prev = App.currentFramework;
    App.currentFramework = fw;
    
    // Safety check for ID
    const fwId = fw.id || '';
    document.querySelectorAll('.fw-tab').forEach(t => t.classList.toggle('active', t.dataset.id === fwId));
    
    // ALWAYS sync 3D map in background if available
    if (App.Sphere3D && App.Sphere3D.setFramework) {
      App.Sphere3D.setFramework(fw);
    }

    if (currentView === 'map' && mapMode !== '3d') {
      App.View2D?.setFramework(fw);
    }
    if (prev?.id !== fwId && fwId) App.Sound?.playTransition();
  }

  // ── TRADITION FILTER ──
  function bindTraditionFilter() {
    document.querySelectorAll('#tradition-filter .trad-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentTradition = btn.dataset.tradition;
        document.querySelectorAll('#tradition-filter .trad-btn').forEach(b => b.classList.toggle('active', b === btn));
        const filtered = currentTradition === 'all' ? App.allFrameworks : App.allFrameworks.filter(f => f.tradition === currentTradition);
        renderFrameworkTabs(document.getElementById('framework-tabs'), filtered);
        if (!filtered.find(f => f.id === App.currentFramework?.id) && filtered.length) setFramework(filtered[0]);
        App.Sound?.playUIClick();
      });
    });
  }

  // ── PHASE 8 EXPANSIONS ──
  function bindPhase8Expansions() {
    const atmoSelect = document.getElementById('atmosphere-select');
    if (atmoSelect) {
      atmoSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (App.Sphere3D && App.Sphere3D.setAtmosphere) {
          App.Sphere3D.setAtmosphere(val);
        }
        if (window.PsycheApp.Sound) {
          window.PsycheApp.Sound.updateAmbientAtmo(val);
        }
      });
    }

    const slider = document.getElementById('timeline-slider');
    const label = document.getElementById('timeline-current');
    const eraInd = document.getElementById('timeline-era-indicator');

    // Auto-generate evenly spaced epochs based on loaded frameworks
    const tempEpochs = [...new Set(App.allFrameworks.map(f => f.year || 2026))].sort((a,b) => a - b);
    if (!tempEpochs.includes(2026)) tempEpochs.push(2026);
    App.timelineEpochs = tempEpochs;
    App.currentYear = 2026;

    if (slider) {
      slider.disabled = false;
      slider.min = 0;
      slider.max = tempEpochs.length - 1;
      slider.value = tempEpochs.length - 1;
      
      updateTimelineHistogram();

      slider.addEventListener('input', (e) => {
        const valIdx = parseInt(e.target.value);
        const year = App.timelineEpochs[valIdx];
        App.currentYear = year; // Sync global state
        
        if (label) {
          if (year === 2026) label.textContent = "Present (2026 CE)";
          else label.textContent = year < 0 ? Math.abs(year).toLocaleString() + " BCE" : year.toLocaleString() + " CE";
        }

        updateEraIndicator(year, slider);
        
        // Rise of Frameworks: Sync Navigation UI
        const filtered = currentTradition === 'all' ? App.allFrameworks : App.allFrameworks.filter(f => f.tradition === currentTradition);
        renderFrameworkTabs(document.getElementById('framework-tabs'), filtered);

        // Sync 3D Map Visual Evolution
        if (currentView === 'map' && mapMode === '3d' && App.Sphere3D.updateYearVisibility) {
          App.Sphere3D.updateYearVisibility(year);
        }
      });
      // Init
      updateEraIndicator(tempEpochs[tempEpochs.length-1], slider);
    }
  }

  function updateTimelineHistogram() {
    const container = document.getElementById('timeline-epoch-map');
    if (!container) return;
    
    // We want to show density where 'spikes' happen
    const bins = 40; 
    const years = App.allFrameworks.map(f => f.year || 2026);
    const min = Math.min(...years), max = 2026;
    const range = max - min;
    const histogram = new Array(bins).fill(0);
    
    years.forEach(y => {
      const pos = (y - min) / (range || 1);
      const binIdx = Math.min(bins - 1, Math.floor(pos * bins));
      histogram[binIdx]++;
    });
    
    const maxVal = Math.max(...histogram) || 1;
    let svg = `<svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 ${bins} 20" style="display:block">`;
    svg += `<path d="M 0 20 `;
    histogram.forEach((val, i) => {
      const h = (val / maxVal) * 16;
      svg += `L ${i} ${20 - h} L ${i+1} ${20 - h} `;
    });
    svg += `L ${bins} 20 Z" fill="rgba(201, 168, 76, 0.4)" />`;
    svg += `</svg>`;
    container.innerHTML = svg;
  }

  function updateEraIndicator(year, slider) {
    const ind = document.getElementById('timeline-era-indicator');
    if (!ind || !slider) return;
    
    let label = "ANCIENT WISDOM";
    if (year > 1950) label = "MODERN NEUROLOGY";
    else if (year > 1850) label = "PSYCHOANALYSIS ERA";
    else if (year > 1700) label = "ENLIGHTENMENT";
    else if (year > 1400) label = "RENAISSANCE HUMANISM";
    else if (year > 500) label = "MEDIEVAL SCHOLASTICISM";
    else if (year > -400) label = "CLASSICAL PHILOSOPHY";
    else if (year > -3000) label = "BRONZE AGE MYSTICISM";
    else label = "PREHISTORIC ORIGINS";
    
    ind.textContent = label;
    const percent = slider.value / (slider.max || 1);
    ind.style.left = `calc(${percent * 100}% )`;
  }

  // ── MAP MODE (2D/3D) ──
  function bindMapModeToggle() {
    document.querySelectorAll('#map-mode-toggle .mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setMapMode(btn.dataset.mode);
        App.Sound?.playUIClick();
      });
    });
  }
  function setMapMode(mode) {
    mapMode = mode;
    document.querySelectorAll('#map-mode-toggle .mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
    const canvas3d = document.getElementById('three-canvas');
    const canvas2d = document.getElementById('canvas-2d');
    if (mode === '3d') {
      canvas3d.style.display = 'block';
      canvas2d.style.display = 'none';
      App.View2D?.hide();
      App.Sphere3D.setFramework(App.currentFramework);
    } else {
      canvas3d.style.display = 'none';
      canvas2d.style.display = 'block';
      App.View2D?.show();
      App.View2D?.setFramework(App.currentFramework);
    }
  }

  // ── VIEW TABS ──
  function buildViewTabs() {
    const container = document.getElementById('view-tabs');
    if (!container) return;
    container.innerHTML = views.map(v => {
      if (v.sep) return '<div class="view-sep"></div>';
      return `<button class="view-btn ${v.id === 'map' ? 'active':''}" data-view="${v.id}" title="${v.label}"><span class="view-btn-icon">${v.icon}</span><span class="view-btn-label">${v.label}</span></button>`;
    }).join('');
    container.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => { setView(btn.dataset.view); App.Sound?.playUIClick(); });
    });
  }
  
  function bindLogoClick() {
    const brand = document.querySelector('.nav-brand');
    if (brand) {
      brand.style.cursor = 'pointer';
      brand.addEventListener('click', () => {
        if (window.PsycheApp.Sound) window.PsycheApp.Sound.playUIClick();
        setView('map');
      });
    }
  }
  function setView(viewId) {
    if (currentView === viewId) return; // Prevent redundant view switching and sidebar hiding
    currentView = viewId;
    document.querySelectorAll('#view-tabs .view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === viewId));
    const mapView = document.getElementById('map-view');
    const secView = document.getElementById('secondary-view');
    if (viewId === 'map') {
      mapView.classList.add('active');
      secView.classList.remove('active');
      if (mapMode === '3d') App.Sphere3D.setFramework(App.currentFramework);
      else { App.View2D?.show(); App.View2D?.setFramework(App.currentFramework); }
    } else {
      mapView.classList.remove('active');
      secView.classList.add('active');
      App.View2D?.hide();
      secView.scrollTop = 0;
      renderSecondaryView(secView, viewId);
    }
    App.Sidebar.hide();
  }
  function renderSecondaryView(container, viewId) {
    container.innerHTML = '';
    switch(viewId) {
      case 'archetypes': App.ViewsExplore.renderArchetypes(container); break;
      case 'development': App.ViewsDevelop.renderDevelopmentalArc(container); break;
      case 'trauma': App.ViewsMap.renderTraumaCartography(container); break;
      case 'figures': App.ViewsExplore.renderHistoricalFigures(container); break;
      case 'relationships': App.ViewsMap.renderRelationships(container); break;
      case 'darknight': App.ViewsMap.renderDarkNight(container); break;
      case 'cases': App.ViewsExplore.renderCaseStudies(container); break;
      case 'disagree': App.ViewsExplore.renderDisagreements(container); break;
      case 'scanner': App.ViewsScanner?.render(container); break;
      case 'ego': App.ViewsEgo?.render(container); break;
      case 'personal': App.ViewsDevelop.renderPersonalMapping(container); break;
      case 'compare': App.ViewsMap.renderCulturalComparison(container); break;
      case 'resources': App.ViewsMap.renderResources(container); break;
      case 'lineage': App.Lineage?.render(container); break;
      default: container.innerHTML = '<p style="text-align:center;color:var(--text-dim);padding:60px">View not found.</p>';
    }
  }

  // ── UTILITY BUTTONS ──
  function bindUtilityButtons() {
    document.getElementById('btn-search')?.addEventListener('click', () => App.Search?.open());
    document.getElementById('btn-theme')?.addEventListener('click', toggleTheme);
    document.getElementById('btn-keyboard')?.addEventListener('click', () => {
      document.getElementById('keyboard-hints')?.classList.toggle('hidden');
    });
    document.getElementById('btn-toggle-sound')?.addEventListener('click', function() {
      const on = App.Sound?.toggle();
      this.classList.toggle('active', on);
    });
    document.getElementById('btn-export')?.addEventListener('click', () => App.Export?.exportMapView());
  }

  // ── THEME ──
  function loadTheme() {
    const saved = localStorage.getItem('psyche-theme') || 'dark';
    applyTheme(saved);
  }
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('psyche-theme', next);
    App.Sound?.playUIClick();
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const sun = document.querySelector('.icon-sun');
    const moon = document.querySelector('.icon-moon');
    if (sun && moon) {
      sun.style.display = theme === 'dark' ? 'block' : 'none';
      moon.style.display = theme === 'light' ? 'block' : 'none';
    }
    // Re-apply atmosphere to pick up the new light/dark bg colors
    const atmoSelect = document.getElementById('atmosphere-select');
    if (atmoSelect && App.Sphere3D && App.Sphere3D.setAtmosphere) {
      const val = atmoSelect.value;
      App.Sphere3D.setAtmosphere(val);
      if (window.PsycheApp.Sound) {
        window.PsycheApp.Sound.updateAmbientAtmo(val);
      }
    } else {
      if (theme === 'light') {
        App.Sphere3D.setBackground?.(0xFAF8F0);
      } else {
        App.Sphere3D.setBackground?.(0x060612);
      }
    }
  }

  // ── KEYBOARD NAVIGATION ──
  function bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      // Don't capture when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (App.Search?.isSearchOpen()) return;

      const key = e.key;
      const ctrl = e.ctrlKey || e.metaKey;

      // Ctrl+K — Search
      if (ctrl && key === 'k') { e.preventDefault(); App.Search?.open(); return; }
      // Escape — close things
      if (key === 'Escape') {
        App.Sidebar.hide();
        App.Search?.close();
        document.getElementById('keyboard-hints')?.classList.add('hidden');
        return;
      }
      // ? — keyboard hints
      if (key === '?') { document.getElementById('keyboard-hints')?.classList.toggle('hidden'); return; }
      // T — toggle theme
      if (key === 't' || key === 'T') { toggleTheme(); return; }
      // S — toggle sound
      if (key === 's' || key === 'S') {
        const on = App.Sound?.toggle();
        document.getElementById('btn-toggle-sound')?.classList.toggle('active', on);
        return;
      }
      // L — toggle labels
      // L — no longer bound (labels button removed)

      // ← → — cycle frameworks
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        e.preventDefault();
        const filtered = currentTradition === 'all' ? App.allFrameworks : App.allFrameworks.filter(f => f.tradition === currentTradition);
        const idx = filtered.findIndex(f => f.id === App.currentFramework?.id);
        const next = key === 'ArrowRight' ? (idx + 1) % filtered.length : (idx - 1 + filtered.length) % filtered.length;
        if (filtered[next]) setFramework(filtered[next]);
        return;
      }
      // ↑ ↓ — cycle views
      if (key === 'ArrowUp' || key === 'ArrowDown') {
        e.preventDefault();
        const idx = navigableViews.findIndex(v => v.id === currentView);
        const next = key === 'ArrowDown' ? (idx + 1) % navigableViews.length : (idx - 1 + navigableViews.length) % navigableViews.length;
        setView(navigableViews[next].id);
        return;
      }
      // 1-9 — select layer
      if (key >= '1' && key <= '9') {
        const layerIdx = parseInt(key) - 1;
        if (App.currentFramework?.layers[layerIdx]) {
          App.selectLayer(layerIdx);
          App.Sound?.playNodeClick(layerIdx, App.currentFramework.layers.length);
        }
        return;
      }
    });
    // Global Ctrl+K capture even in inputs
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); App.Search?.open(); }
    });
  }

  // ── BOOT ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
