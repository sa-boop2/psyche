// ============================================================
// VIEWS — EXPLORE: Archetypes, Historical Figures, Case Studies, Disagreements
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsExplore = (function() {
  const D = () => window.PsycheData;

  function renderArchetypes(container) {
    const archetypes = D().archetypes || [];
    container.innerHTML = `
      <div class="view-header">
        <h1>Archetypes</h1>
        <p>Universal patterns living in the collective unconscious. These primordial images shape human experience across all cultures.</p>
      </div>
      <div class="card-grid">${archetypes.map((a, i) => `
        <div class="card card-archetype fade-in" style="animation-delay:${i*0.06}s" data-idx="${i}">
          <div class="card-title">${a.name}</div>
          <div class="card-subtitle" style="color:var(--text-dim);opacity:0.8">${a.subtitle}</div>
          <div class="card-text" style="margin-top:12px">${a.description}</div>
          <div class="card-tags" style="margin-top:16px">${(a.culturalExamples || []).slice(0, 3).map(e => `<span class="sb-tag">${e}</span>`).join('')}</div>
        </div>
      `).join('')}</div>`;
    container.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        const a = archetypes[parseInt(card.dataset.idx)];
        window.PsycheApp.Sidebar.show(a);
      });
    });
  }

  function renderHistoricalFigures(container) {
    const figures = D().historicalFigures || [];
    container.innerHTML = `
      <div class="view-header">
        <h1>Historical Figures</h1>
        <p>How the psyche\'s landscape manifests in notable lives. Each figure embodies particular layers and archetypes.</p>
      </div>
      <div class="card-grid">${figures.map((f, i) => `
        <div class="card card-history fade-in" style="animation-delay:${i*0.05}s" data-idx="${i}">
          <div class="card-title">${f.name}</div>
          <div class="card-subtitle" style="font-family:var(--font-ui);font-style:italic;font-size:0.8rem">${f.years}</div>
          <div class="card-text" style="margin-top:12px;font-size:0.85rem">${f.description}</div>
          <div class="card-tags" style="margin-top:14px">${(f.primaryLayers || []).map(l => `<span class="sb-tag" style="background:rgba(201,168,76,0.1)">${l}</span>`).join('')}</div>
        </div>
      `).join('')}</div>`;
    container.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        const f = figures[parseInt(card.dataset.idx)];
        window.PsycheApp.Sidebar.show({
          name: f.name,
          subtitle: f.years,
          description: f.description,
          practices: f.frameworks,
          reflections: ['How does this figure\'s journey mirror your own?','What aspect of their psyche resonates with you?']
        });
      });
    });
  }

  function renderCaseStudies(container) {
    const cases = D().caseStudies || [];
    let activeCase = 0;
    function render() {
      const c = cases[activeCase];
      container.innerHTML = `
        <div class="view-header">
          <h1>Case Studies</h1>
          <p>Real-world scenarios analyzed through multiple psychological and spiritual frameworks.</p>
        </div>
        <div class="view-tabs">${cases.map((cs, i) => `
          <button class="view-tab ${i === activeCase ? 'active':''}" data-idx="${i}">${cs.title}</button>
        `).join('')}</div>
        <div class="case-detail fade-in">
          <div class="card" style="cursor:default;margin-bottom:24px">
            <div class="card-title" style="font-size:1.2rem">${c.title}</div>
            <div class="card-subtitle">${c.subtitle}</div>
            <div class="card-text" style="margin-top:12px;font-size:0.9rem;line-height:1.8;color:var(--text)">${c.scenario}</div>
          </div>
          <h3 style="margin-bottom:16px;font-size:1rem;color:var(--gold)">Multi-Framework Analysis</h3>
          <div class="card-grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">
            ${c.lenses.map((l, i) => `
              <div class="card card-case fade-in" style="cursor:default;animation-delay:${i*0.08}s">
                <div class="card-subtitle" style="color:var(--gold);margin-bottom:8px;font-weight:700">${l.framework}</div>
                <div class="card-text" style="font-size:0.82rem;line-height:1.7">${l.analysis}</div>
              </div>
            `).join('')}
          </div>
        </div>`;
      container.querySelectorAll('.view-tab').forEach(tab => {
        tab.addEventListener('click', () => { activeCase = parseInt(tab.dataset.idx); render(); });
      });
    }
    render();
  }

  function renderDisagreements(container) {
    const disags = D().disagreements || [];
    container.innerHTML = `
      <div class="view-header">
        <h1>Where Frameworks Disagree</h1>
        <p>Not just different terminology — genuine philosophical conflicts between traditions. These are the fault lines of human understanding.</p>
      </div>
      ${disags.map((d, i) => `
        <div class="card fade-in" style="cursor:default;margin-bottom:24px;animation-delay:${i*0.08}s">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
            <div class="card-title" style="flex:1">${d.title}</div>
            <span class="disagree-level ${d.level}">${d.level}</span>
          </div>
          <div class="card-text" style="margin-bottom:16px;font-style:italic">${d.description}</div>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${d.positions.map(p => `
              <div style="padding:10px 14px;background:rgba(255,255,255,0.02);border-left:3px solid var(--gold-dark);border-radius:0 var(--r-xs) var(--r-xs) 0">
                <div style="font-size:0.72rem;text-transform:uppercase;color:var(--gold);letter-spacing:0.06em;margin-bottom:4px;font-weight:600">${p.framework}</div>
                <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.7">${p.position}</div>
              </div>
            `).join('')}
          </div>
          <div style="margin-top:14px;padding:12px;background:rgba(201,168,76,0.04);border-radius:var(--r-xs);font-size:0.82rem;color:var(--text-dim);font-style:italic">
            <strong style="color:var(--gold)">Implication:</strong> ${d.implication}
          </div>
        </div>
      `).join('')}`;
  }

  return { renderArchetypes, renderHistoricalFigures, renderCaseStudies, renderDisagreements };
})();
