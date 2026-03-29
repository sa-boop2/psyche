// ============================================================
// VIEWS — DEVELOPMENT: Erikson timeline, Personal Mapping, Longitudinal Tracking
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsDevelop = (function() {
  const D = () => window.PsycheData;
  const STORAGE_KEY = 'psyche_personal_data';

  // ── ERIKSON DEVELOPMENTAL ARC ──
  function renderDevelopmentalArc(container) {
    const fw = (window.PsycheApp.allFrameworks || []).find(f => f.id === 'erikson');
    if (!fw) { container.innerHTML = '<p>Erikson framework not found.</p>'; return; }
    container.innerHTML = `
      <div class="view-header">
        <h1>Developmental Arc</h1>
        <p>Erik Erikson\'s eight stages of psychosocial development — each a crisis whose resolution shapes the soul.</p>
      </div>
      <div class="timeline">${fw.layers.map((l, i) => `
        <div class="timeline-item fade-in" style="animation-delay:${i*0.08}s" data-idx="${i}">
          <div class="timeline-title">${l.name}</div>
          <div class="timeline-sub">${l.subtitle}</div>
          <div class="timeline-text">${l.description.substring(0, 200)}...</div>
          <div style="margin-top:8px"><span class="sb-tag" style="border-color:${l.color};color:${l.color}">Virtue: ${['Hope','Will','Purpose','Competence','Fidelity','Love','Care','Wisdom'][i] || ''}</span></div>
        </div>
      `).join('')}</div>`;
    container.querySelectorAll('.timeline-item').forEach(el => {
      el.addEventListener('click', () => {
        const layer = fw.layers[parseInt(el.dataset.idx)];
        layer.framework = 'Erikson';
        window.PsycheApp.Sidebar.show(layer);
      });
    });
  }

  // ── PERSONAL MAPPING ──
  function renderPersonalMapping(container) {
    const allFw = window.PsycheApp.allFrameworks || [];
    const currentFw = window.PsycheApp.currentFramework || allFw[0];
    if (!currentFw) return;
    const saved = loadPersonalData();

    container.innerHTML = `
      <div class="view-header">
        <h1>Personal Psyche Map</h1>
        <p>Rate your relationship with each layer. Where are you strong? Where is growth needed? This is private reflection — stored only in your browser.</p>
      </div>
      <div class="view-tabs">${allFw.slice(0, 8).map(fw => `
        <button class="view-tab ${fw.id === currentFw.id ? 'active':''}" data-fw="${fw.id}">${fw.name}</button>
      `).join('')}</div>
      <div id="personal-layers">
        ${currentFw.layers.map((l, i) => {
          const key = currentFw.id + '_' + i;
          const val = saved[key] || 5;
          return `
          <div class="card fade-in" style="cursor:default;margin-bottom:12px;animation-delay:${i*0.05}s">
            <div class="card-title" style="font-size:0.95rem">${l.name} <span style="color:var(--text-dim);font-family:var(--font);font-size:0.72rem">${l.subtitle}</span></div>
            <div class="slider-group">
              <label>How integrated is this layer for you?</label>
              <input type="range" min="1" max="10" value="${val}" data-key="${key}">
              <span class="slider-value">${val}</span>
            </div>
            ${(l.reflections || []).slice(0, 1).map(q => `<div class="sb-question" style="margin-top:8px">${q}</div>`).join('')}
            <textarea class="journal-textarea" style="margin-top:8px;min-height:60px" placeholder="Your reflections on ${l.name}..." data-journal="${key}">${saved['journal_'+key] || ''}</textarea>
          </div>`;
        }).join('')}
      </div>
      <div style="text-align:center;margin-top:20px;display:flex;gap:12px;justify-content:center">
        <button class="btn btn-primary" id="save-personal">Save Reflections</button>
        <button class="btn btn-ghost" id="view-profile">View My Profile</button>
      </div>
      <div id="profile-viz" style="margin-top:24px"></div>`;

    // Slider live values
    container.querySelectorAll('input[type="range"]').forEach(slider => {
      slider.addEventListener('input', () => {
        slider.nextElementSibling.textContent = slider.value;
      });
    });

    // Framework tabs
    container.querySelectorAll('.view-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        window.PsycheApp.currentFramework = allFw.find(f => f.id === tab.dataset.fw);
        renderPersonalMapping(container);
      });
    });

    // Save
    document.getElementById('save-personal')?.addEventListener('click', () => {
      const data = loadPersonalData();
      container.querySelectorAll('input[type="range"]').forEach(s => data[s.dataset.key] = parseInt(s.value));
      container.querySelectorAll('textarea[data-journal]').forEach(t => data['journal_'+t.dataset.journal] = t.value);
      data['_lastSaved'] = new Date().toISOString();
      savePersonalData(data);
      alert('Reflections saved to your browser!');
    });

    // Profile view
    document.getElementById('view-profile')?.addEventListener('click', () => {
      renderProfile(document.getElementById('profile-viz'), currentFw);
    });
  }

  function renderProfile(el, fw) {
    const saved = loadPersonalData();
    const vals = fw.layers.map((l, i) => parseInt(saved[fw.id + '_' + i]) || 5);
    const max = 10;
    const w = Math.min(el.parentElement.clientWidth - 40, 500);
    const h = w;
    const cx = w / 2, cy = h / 2, r = w * 0.38;
    const n = vals.length;

    let polygon = '', labels = '', dots = '';
    vals.forEach((v, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const vr = (v / max) * r;
      const x = cx + vr * Math.cos(angle);
      const y = cy + vr * Math.sin(angle);
      polygon += `${x},${y} `;
      const lx = cx + (r + 25) * Math.cos(angle);
      const ly = cy + (r + 25) * Math.sin(angle);
      labels += `<text x="${lx}" y="${ly}" text-anchor="middle" fill="#c9a84c" font-size="11" font-family="Inter">${fw.layers[i].name}</text>`;
      dots += `<circle cx="${x}" cy="${y}" r="4" fill="${fw.layers[i].color}" stroke="#060612" stroke-width="1.5"/>`;
    });

    // Grid rings
    let rings = '';
    for (let g = 2; g <= 10; g += 2) {
      const gr = (g / max) * r;
      let ringPoints = '';
      for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        ringPoints += `${cx + gr * Math.cos(angle)},${cy + gr * Math.sin(angle)} `;
      }
      rings += `<polygon points="${ringPoints}" fill="none" stroke="rgba(201,168,76,0.08)" stroke-width="1"/>`;
    }

    // Axes
    let axes = '';
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      axes += `<line x1="${cx}" y1="${cy}" x2="${cx + r * Math.cos(angle)}" y2="${cy + r * Math.sin(angle)}" stroke="rgba(201,168,76,0.1)" stroke-width="1"/>`;
    }

    el.innerHTML = `
      <h3 style="text-align:center;margin-bottom:16px">Your ${fw.name} Profile</h3>
      <div style="display:flex;justify-content:center">
        <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
          ${rings}${axes}
          <polygon points="${polygon}" fill="rgba(201,168,76,0.12)" stroke="#c9a84c" stroke-width="2"/>
          ${dots}${labels}
        </svg>
      </div>`;
  }

  // ── LONGITUDINAL TRACKING ──
  function renderLongitudinalTracking(container) {
    const saved = loadPersonalData();
    const entries = saved._timeline || [];

    container.innerHTML = `
      <div class="view-header">
        <h1>Longitudinal Tracking</h1>
        <p>Track your psyche\'s development over time. Create periodic snapshots to see how you evolve.</p>
      </div>
      <div class="card" style="cursor:default;margin-bottom:24px;padding:24px">
        <h3 style="margin-bottom:16px">New Entry</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
          <div>
            <label style="font-size:0.78rem;color:var(--text-dim);display:block;margin-bottom:4px">Date</label>
            <input type="date" id="track-date" value="${new Date().toISOString().split('T')[0]}" class="journal-textarea" style="min-height:auto;padding:8px 12px">
          </div>
          <div>
            <label style="font-size:0.78rem;color:var(--text-dim);display:block;margin-bottom:4px">Current Theme</label>
            <select id="track-theme" class="journal-textarea" style="min-height:auto;padding:8px 12px">
              <option value="shadow">Shadow Work</option>
              <option value="growth">Personal Growth</option>
              <option value="crisis">Crisis / Dark Night</option>
              <option value="integration">Integration</option>
              <option value="relationships">Relationships</option>
              <option value="creative">Creative Expression</option>
              <option value="spiritual">Spiritual Practice</option>
            </select>
          </div>
        </div>
        <label style="font-size:0.78rem;color:var(--text-dim);display:block;margin-bottom:4px">Current Layer of Focus</label>
        <input type="text" id="track-layer" placeholder="e.g. Shadow, Anima, Trust vs Mistrust..." class="journal-textarea" style="min-height:auto;padding:8px 12px;margin-bottom:12px">
        <label style="font-size:0.78rem;color:var(--text-dim);display:block;margin-bottom:4px">Reflections</label>
        <textarea id="track-notes" class="journal-textarea" placeholder="What are you noticing? What is shifting? What needs attention?"></textarea>
        <div class="slider-group" style="margin-top:12px">
          <label>Overall integration level</label>
          <input type="range" min="1" max="10" value="5" id="track-level">
          <span class="slider-value" id="track-level-val">5</span>
        </div>
        <button class="btn btn-primary" style="margin-top:16px" id="save-entry">Save Entry</button>
      </div>
      <h3 style="margin-bottom:16px">Timeline</h3>
      <div class="timeline" id="tracking-timeline">
        ${entries.length === 0 ? '<p style="color:var(--text-dim);padding:20px">No entries yet. Create your first snapshot above.</p>' : ''}
        ${entries.slice().reverse().map((e, i) => `
          <div class="timeline-item fade-in" style="animation-delay:${i*0.05}s">
            <div class="timeline-title">${e.date} — ${e.theme}</div>
            <div class="timeline-sub">Layer: ${e.layer} · Integration: ${e.level}/10</div>
            <div class="timeline-text">${e.notes}</div>
          </div>
        `).join('')}
      </div>`;

    document.getElementById('track-level')?.addEventListener('input', function() {
      document.getElementById('track-level-val').textContent = this.value;
    });

    document.getElementById('save-entry')?.addEventListener('click', () => {
      const data = loadPersonalData();
      if (!data._timeline) data._timeline = [];
      data._timeline.push({
        date: document.getElementById('track-date').value,
        theme: document.getElementById('track-theme').value,
        layer: document.getElementById('track-layer').value,
        notes: document.getElementById('track-notes').value,
        level: document.getElementById('track-level').value
      });
      savePersonalData(data);
      renderLongitudinalTracking(container);
    });
  }

  // ── STORAGE ──
  function loadPersonalData() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
  }
  function savePersonalData(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) { console.warn('Storage failed', e); }
  }

  return { renderDevelopmentalArc, renderPersonalMapping, renderLongitudinalTracking };
})();
