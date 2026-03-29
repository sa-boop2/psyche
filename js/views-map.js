// ============================================================
// VIEWS — MAP: Trauma, Dark Night, Relationships, Cultural Comparison, Resources
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsMap = (function() {
  const D = () => window.PsycheData;

  // ── TRAUMA CARTOGRAPHY ──
  function renderTraumaCartography(container) {
    const trauma = D().trauma;
    if (!trauma) return;
    container.innerHTML = `
      <div class="view-header">
        <h1>Trauma Cartography</h1>
        <p>${trauma.description}</p>
      </div>
      <div class="card-grid">${trauma.types.map((t, i) => `
        <div class="card fade-in" style="cursor:default;animation-delay:${i*0.08}s">
          <div class="card-title">${t.name}</div>
          <div class="card-tags" style="margin-bottom:10px">${t.layers.map(l => `<span class="sb-tag">${l}</span>`).join('')}</div>
          <div class="card-text">${t.description}</div>
          <div style="margin-top:14px;border-top:1px solid var(--border);padding-top:10px">
            <div style="font-size:0.7rem;text-transform:uppercase;color:var(--gold);font-weight:600;letter-spacing:0.08em;margin-bottom:6px">Healing Modalities</div>
            ${t.healing.map(h => `<div class="sb-tag" style="background:rgba(76,212,154,0.06);border-color:rgba(76,212,154,0.2);color:var(--accent-green)">${h}</div>`).join('')}
          </div>
        </div>
      `).join('')}</div>`;
  }

  // ── DARK NIGHT OF THE SOUL ──
  function renderDarkNight(container) {
    const dn = D().darkNight;
    if (!dn) return;
    container.innerHTML = `
      <div class="view-header">
        <h1>Dark Night of the Soul</h1>
        <p>${dn.description}</p>
      </div>
      <div class="timeline">${dn.stages.map((s, i) => `
        <div class="timeline-item fade-in" style="animation-delay:${i*0.1}s;cursor:default">
          <div class="timeline-title">Stage ${i+1}: ${s.name}</div>
          <div class="timeline-text" style="margin-bottom:12px">${s.description}</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            ${Object.entries(s.traditions).map(([fw, desc]) => `
              <div style="padding:6px 10px;background:rgba(201,168,76,0.04);border:1px solid var(--border);border-radius:var(--r-xs);font-size:0.78rem">
                <span style="color:var(--gold);font-weight:600">${fw}:</span>
                <span style="color:var(--text-secondary)">${desc}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}</div>
      <div class="card" style="cursor:default;margin-top:24px;padding:24px;border-color:var(--accent-red);border-left:3px solid var(--accent-red)">
        <div class="card-title" style="color:var(--accent-red);font-size:0.95rem">Important Note</div>
        <div class="card-text" style="margin-top:8px">The Dark Night is not depression, though it can look similar. Depression is a clinical condition requiring medical attention. The Dark Night is a transformative process that occurs within an existing contemplative or psychological practice. If you are in crisis, please seek professional help.</div>
      </div>`;
  }

  // ── RELATIONSHIP DYNAMICS ──
  function renderRelationships(container) {
    const rels = D().relationships;
    if (!rels) return;
    container.innerHTML = `
      <div class="view-header">
        <h1>Relationship Dynamics</h1>
        <p>${rels.description}</p>
      </div>
      ${rels.dynamics.map((d, i) => `
        <div class="card fade-in" style="cursor:default;margin-bottom:20px;animation-delay:${i*0.07}s">
          <div class="card-title">${d.name}</div>
          <div class="card-tags" style="margin-bottom:10px">${d.layers.map(l => `<span class="sb-tag">${l}</span>`).join('')}</div>
          <div class="card-text">${d.description}</div>
          <div style="margin-top:12px;padding:10px 14px;background:rgba(201,168,76,0.04);border-radius:var(--r-xs);font-size:0.82rem;color:var(--text-secondary);font-style:italic">
            <strong style="color:var(--gold);font-style:normal">Example:</strong> ${d.example}
          </div>
        </div>
      `).join('')}`;
  }

  // ── CULTURAL COMPARISON ──
  function renderCulturalComparison(container) {
    const allFw = window.PsycheApp.allFrameworks || [];
    const traditions = { western: 'Western', eastern: 'Eastern', indigenous: 'Indigenous', esoteric: 'Esoteric', modern: 'Modern' };
    let activeTraditions = ['western', 'eastern', 'modern'];

    function render() {
      const fws = allFw.filter(f => activeTraditions.includes(f.tradition));
      const maxLayers = Math.max(...fws.map(f => f.layers.length));

      container.innerHTML = `
        <div class="view-header">
          <h1>Cultural Comparison</h1>
          <p>Side-by-side view of how different traditions map the same psychic territory. Click any layer to synchronize the map and see that concept in context.</p>
        </div>
        <div class="view-tabs">
          ${Object.entries(traditions).map(([key, label]) => `
            <button class="view-tab ${activeTraditions.includes(key)?'active':''}" data-trad="${key}">${label}</button>
          `).join('')}
        </div>
        <div style="overflow-x:auto">
          <table class="comp-table">
            <thead><tr>
              <th style="width:40px">Depth</th>
              ${fws.map(fw => `<th>${fw.name}</th>`).join('')}
            </tr></thead>
            <tbody>
              ${Array.from({length: maxLayers}, (_, i) => `
                <tr>
                  <td style="color:var(--text-dim);font-size:0.72rem">${i === 0 ? '↑ Surface' : i === maxLayers-1 ? '↓ Depth' : 'Layer ' + (i+1)}</td>
                  ${fws.map(fw => {
                    const layer = fw.layers[i];
                    if (!layer) return '<td style="color:var(--text-dim)">—</td>';
                    return `<td class="comp-cell-clickable" data-fw="${fw.id}" data-layer-idx="${i}">
                      <div style="font-weight:600;color:${layer.color};font-size:0.82rem;margin-bottom:2px">${layer.name}</div>
                      <div style="font-size:0.72rem;color:var(--text-dim)">${layer.subtitle}</div>
                    </td>`;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div style="margin-top:24px;padding:20px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--r)">
          <h3 style="margin-bottom:12px;font-size:0.95rem">Key Observations</h3>
          <div class="card-text" style="line-height:1.8">
            <p>• <strong>Convergence:</strong> Almost all traditions recognize a layered structure from gross/physical to subtle/spiritual.</p>
            <p>• <strong>Body:</strong> Every tradition starts with the physical body but differs on its significance — from prison (Platonic Greek) to sacred site (Daoist, Aboriginal).</p>
            <p>• <strong>Middle layers:</strong> All traditions identify emotional/mental processing as a distinct zone, though they describe it differently.</p>
            <p>• <strong>Deepest layer:</strong> Indigenous frameworks tend toward relational/communal depth; Eastern toward transcendent dissolution; Western toward structural integration.</p>
            <p>• <strong>Core tension:</strong> Is the deepest reality personal (Atman, Self, Orí) or impersonal (Anatta, Dao, NTU)? This is the fault line between traditions.</p>
          </div>
        </div>`;

      // Event Listeners
      container.querySelectorAll('.view-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          const trad = tab.dataset.trad;
          if (activeTraditions.includes(trad)) {
            if (activeTraditions.length > 1) activeTraditions = activeTraditions.filter(t => t !== trad);
          } else {
            activeTraditions.push(trad);
          }
          render();
        });
      });

      container.querySelectorAll('.comp-cell-clickable').forEach(cell => {
        cell.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const target = e.currentTarget;
          const fwId = target.dataset.fw;
          const layerIdx = parseInt(target.dataset.layerIdx);
          const fw = allFw.find(f => f.id === fwId);
          if (!fw || !fw.layers[layerIdx]) return;
          
          if (window.PsycheApp.Sound) window.PsycheApp.Sound.playUIClick();
          
          // Show Sidebar
          window.PsycheApp.Sidebar.show(fw.layers[layerIdx]);
          
          // Switch Framework and Select Node in BACKGROUND (noSwitch = true)
          // noSwitch is explicitly TRUE here to prevent any view redirects
          window.PsycheApp.setFrameworkById(fwId, layerIdx, true);
        });
      });

    }
    render();
  }

  // ── RESOURCES ──
  function renderResources(container) {
    const resources = D().resources;
    if (!resources) return;
    let activeIdx = 0;
    function render() {
      const topics = resources.byTopic;
      const active = topics[activeIdx];
      container.innerHTML = `
        <div class="view-header">
          <h1>Where to Explore Next</h1>
          <p>Curated reading lists, key thinkers, and practices organized by area of interest.</p>
        </div>
        <div class="view-tabs">${topics.map((t, i) => `
          <button class="view-tab ${i === activeIdx ? 'active':''}" data-idx="${i}">${t.topic}</button>
        `).join('')}</div>
        <div class="fade-in" style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
          <div class="card" style="cursor:default">
            <div class="card-subtitle" style="margin-bottom:12px">📚 Key Texts</div>
            ${active.books.map(b => `<div class="sb-resource"><span class="sb-resource-title">${b}</span></div>`).join('')}
          </div>
          <div class="card" style="cursor:default">
            <div class="card-subtitle" style="margin-bottom:12px">🧘 Practices</div>
            ${active.practices.map(p => `<div class="sb-tag" style="margin-bottom:4px">${p}</div>`).join('')}
            <div class="card-subtitle" style="margin-top:16px;margin-bottom:8px">🧠 Key Thinkers</div>
            ${active.thinkers.map(t => `<div class="sb-tag" style="background:rgba(76,140,212,0.06);border-color:rgba(76,140,212,0.2);color:var(--accent-blue)">${t}</div>`).join('')}
          </div>
        </div>`;
      container.querySelectorAll('.view-tab').forEach(tab => {
        tab.addEventListener('click', () => { activeIdx = parseInt(tab.dataset.idx); render(); });
      });
    }
    render();
  }

  return { renderTraumaCartography, renderDarkNight, renderRelationships, renderCulturalComparison, renderResources };
})();
