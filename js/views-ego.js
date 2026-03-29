// ============================================================
// VIEWS — EGO: Deep-Dive on the Ego across all traditions
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsEgo = (function() {
  const D = () => window.PsycheData;
  let currentTab = 'what';

  function render(container) {
    const ego = D().ego;
    if (!ego) { container.innerHTML = '<p style="text-align:center;color:var(--text-dim);padding:60px">Ego data not loaded.</p>'; return; }

    container.innerHTML = `
      <div class="view-header">
        <h1>${ego.title}</h1>
        <p>${ego.subtitle}</p>
      </div>
      <div class="view-tabs" id="ego-tabs">
        <button class="view-tab ${currentTab==='what'?'active':''}" data-tab="what">What Is It?</button>
        <button class="view-tab ${currentTab==='operates'?'active':''}" data-tab="operates">How It Operates</button>
        <button class="view-tab ${currentTab==='transcend'?'active':''}" data-tab="transcend">Transcending It</button>
        <button class="view-tab ${currentTab==='traditions'?'active':''}" data-tab="traditions">Across Traditions</button>
        <button class="view-tab ${currentTab==='history'?'active':''}" data-tab="history">Historical Thread</button>
      </div>
      <div id="ego-content"></div>
    `;

    container.querySelectorAll('#ego-tabs .view-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        currentTab = tab.dataset.tab;
        render(container);
        window.PsycheApp.Sound?.playUIClick();
      });
    });

    const content = container.querySelector('#ego-content');
    switch(currentTab) {
      case 'what': renderWhatIsIt(content, ego); break;
      case 'operates': renderHowItOperates(content, ego); break;
      case 'transcend': renderTranscendence(content, ego); break;
      case 'traditions': renderAcrossTraditions(content, ego); break;
      case 'history': renderHistory(content, ego); break;
    }
  }

  function renderWhatIsIt(el, ego) {
    el.innerHTML = `
      <div class="card-grid">
        ${ego.whatIsIt.map((item, i) => `
          <div class="card fade-in" style="cursor:default;animation-delay:${i*0.08}s">
            <div style="font-size:2rem;margin-bottom:12px">${item.icon}</div>
            <div class="card-title">${item.lens}</div>
            <div class="card-text">${item.description}</div>
            <div class="sb-question" style="margin-top:14px"><strong>Key Insight:</strong> ${item.keyInsight}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderHowItOperates(el, ego) {
    const d = ego.howItOperates;
    el.innerHTML = `
      <div class="card fade-in" style="cursor:default;margin-bottom:24px">
        <div class="card-title">Identity Attachment</div>
        <div class="card-text" style="margin-top:8px">${d.identityAttachment}</div>
      </div>
      <div class="card fade-in" style="cursor:default;margin-bottom:24px;animation-delay:0.06s">
        <div class="card-title">Separation from the Whole</div>
        <div class="card-text" style="margin-top:8px">${d.separationFromWhole}</div>
      </div>
      <h3 style="margin:24px 0 16px">The 12 Defense Mechanisms</h3>
      <div class="card-grid">
        ${d.defenseMechanisms.map((def, i) => `
          <div class="card fade-in" style="cursor:default;animation-delay:${i*0.04}s">
            <div class="card-title" style="font-size:0.95rem">${def.name}</div>
            <div class="card-text" style="margin-top:6px">${def.description}</div>
            <div style="margin-top:10px;padding:8px 12px;background:rgba(201,168,76,0.04);border-radius:var(--r-xs);font-size:0.82rem;color:var(--text-dim);font-style:italic">
              <strong>Example:</strong> ${def.example}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderTranscendence(el, ego) {
    el.innerHTML = `
      <div class="card-grid" style="grid-template-columns: repeat(auto-fill, minmax(380px, 1fr))">
        ${ego.transcendence.map((method, i) => `
          <div class="card fade-in" style="cursor:default;animation-delay:${i*0.08}s">
            <div class="card-subtitle">${method.tradition}</div>
            <div class="card-title">${method.method}</div>
            <div class="card-text" style="margin-top:8px">${method.description}</div>
            <div style="margin-top:12px">
              <div style="font-size:0.72rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--gold);margin-bottom:6px">Practices</div>
              ${method.practices.map(p => `<div class="sb-tag">${p}</div>`).join('')}
            </div>
            <div class="sb-question" style="margin-top:14px"><strong>Key Insight:</strong> ${method.keyInsight}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderAcrossTraditions(el, ego) {
    el.innerHTML = `
      <p style="text-align:center;color:var(--text-secondary);max-width:700px;margin:0 auto 24px;font-size:0.88rem">
        How each framework conceptualizes the ego — from necessary structure to fundamental illusion.
      </p>
      <table class="comp-table fade-in">
        <thead>
          <tr>
            <th>Framework</th>
            <th>Ego Concept</th>
            <th>Role</th>
            <th>Stance</th>
          </tr>
        </thead>
        <tbody>
          ${ego.acrossTraditions.map(row => `
            <tr>
              <td style="font-weight:600;color:var(--gold)">${row.framework}</td>
              <td>${row.concept}</td>
              <td>${row.role}</td>
              <td style="font-style:italic;color:var(--text-dim)">${row.stance}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function renderHistory(el, ego) {
    el.innerHTML = `
      <p style="text-align:center;color:var(--text-secondary);max-width:700px;margin:0 auto 24px;font-size:0.88rem">
        The ego across 3,000 years of human thought — from the Upanishads to Eckhart Tolle.
      </p>
      <div class="timeline">
        ${ego.historicalThread.map((item, i) => `
          <div class="timeline-item fade-in" style="animation-delay:${i*0.06}s">
            <div class="timeline-title">${item.figure}</div>
            <div class="timeline-sub">${item.era}</div>
            <div class="timeline-text">${item.insight}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  return { render };
})();
