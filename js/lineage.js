// ============================================================
// LINEAGE GRAPH — Canvas-based framework relationship view
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.Lineage = (function() {
  const edgeColors = {
    influenced: '#c9a84c',
    broke_from: '#d4544c',
    parallel: '#4cbcd4',
    synthesized: '#9a4cd4',
    evolved_from: '#4cd49a'
  };
  const edgeLabels = {
    influenced: 'Influenced',
    broke_from: 'Broke from',
    parallel: 'Parallel',
    synthesized: 'Synthesized',
    evolved_from: 'Evolved from'
  };
  const traditionColors = {
    western: '#c9a84c',
    eastern: '#e8836b',
    indigenous: '#4cd49a',
    esoteric: '#9a4cd4'
  };

  function render(container) {
    const D = window.PsycheData || {};
    const lineage = D.lineage || [];
    const positions = D.lineagePositions || {};
    const frameworks = window.PsycheApp.allFrameworks || [];

    container.innerHTML = `
      <div class="view-header">
        <h1>Framework Lineage</h1>
        <p>How 16 psychological and spiritual traditions connect, influence, and mirror each other across history.</p>
      </div>
      <div class="lineage-legend">
        ${Object.entries(edgeLabels).map(([k, v]) =>
          `<span class="lineage-legend-item"><span class="lineage-legend-line" style="background:${edgeColors[k]}"></span>${v}</span>`
        ).join('')}
      </div>
      <div class="lineage-canvas-wrap">
        <canvas id="lineage-canvas"></canvas>
      </div>
    `;

    const canvas = document.getElementById('lineage-canvas');
    const wrap = container.querySelector('.lineage-canvas-wrap');
    if (!canvas || !wrap) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = wrap.clientWidth;
    const h = Math.max(500, w * 0.6);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const isDark = !document.documentElement.hasAttribute('data-theme') || document.documentElement.getAttribute('data-theme') === 'dark';

    // Background
    ctx.fillStyle = isDark ? '#0a0a1e' : '#F5F3EB';
    ctx.fillRect(0, 0, w, h);

    // Draw edges
    lineage.forEach(edge => {
      const from = positions[edge.from];
      const to = positions[edge.to];
      if (!from || !to) return;
      const x1 = from.x * w, y1 = from.y * h;
      const x2 = to.x * w, y2 = to.y * h;

      ctx.beginPath();
      // Curved edge
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const dx = x2 - x1, dy = y2 - y1;
      const cx1 = mx - dy * 0.15, cy1 = my + dx * 0.15;
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(cx1, cy1, x2, y2);

      ctx.strokeStyle = edgeColors[edge.type] || '#555';
      ctx.lineWidth = edge.type === 'parallel' ? 1 : 1.5;
      ctx.globalAlpha = 0.4;
      if (edge.type === 'parallel') ctx.setLineDash([4, 4]);
      else ctx.setLineDash([]);
      ctx.stroke();
      ctx.globalAlpha = 1.0;
      ctx.setLineDash([]);

      // Arrow
      const angle = Math.atan2(y2 - cy1, x2 - cx1);
      const arrLen = 8;
      if (edge.type !== 'parallel') {
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - arrLen * Math.cos(angle - 0.3), y2 - arrLen * Math.sin(angle - 0.3));
        ctx.lineTo(x2 - arrLen * Math.cos(angle + 0.3), y2 - arrLen * Math.sin(angle + 0.3));
        ctx.closePath();
        ctx.fillStyle = edgeColors[edge.type] || '#555';
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // Edge label
      ctx.font = '400 9px Inter, sans-serif';
      ctx.fillStyle = isDark ? 'rgba(180,175,165,0.5)' : 'rgba(100,95,85,0.6)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(edge.label, cx1, cy1);
    });

    // Tradition cluster labels
    const clusters = [
      { label: 'WESTERN', x: 0.15, y: 0.06 },
      { label: 'EASTERN', x: 0.80, y: 0.06 },
      { label: 'ESOTERIC', x: 0.48, y: 0.20 },
      { label: 'INDIGENOUS', x: 0.50, y: 0.92 }
    ];
    clusters.forEach(c => {
      ctx.font = '600 10px Inter, sans-serif';
      ctx.fillStyle = isDark ? 'rgba(201,168,76,0.25)' : 'rgba(138,114,51,0.2)';
      ctx.textAlign = 'center';
      ctx.fillText(c.label, c.x * w, c.y * h);
    });

    // Draw nodes
    frameworks.forEach(fw => {
      const pos = positions[fw.id];
      if (!pos) return;
      const x = pos.x * w;
      const y = pos.y * h;
      const tradColor = traditionColors[fw.tradition] || '#888';

      // Glow
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 28);
      grad.addColorStop(0, hexToRGBA(tradColor, 0.15));
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(x - 28, y - 28, 56, 56);

      // Node circle
      ctx.beginPath();
      ctx.arc(x, y, 14, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#0e0e26' : '#FAF8F0';
      ctx.fill();
      ctx.strokeStyle = tradColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.font = '600 11px Inter, sans-serif';
      ctx.fillStyle = isDark ? '#e8d48b' : '#4a3f20';
      ctx.fillText(fw.name, x, y + 18);
    });

    // --- INTERACTIVITY ---
    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      frameworks.forEach(fw => {
        const pos = positions[fw.id];
        if (!pos) return;
        const x = pos.x * w, y = pos.y * h;
        const dist = Math.sqrt((clickX - x)**2 + (clickY - y)**2);
        
        if (dist < 20) {
          if (window.PsycheApp.Sound) window.PsycheApp.Sound.playUIClick();
          window.PsycheApp.setFrameworkById(fw.id);
          // Auto-switch to map view
          const mapBtn = document.querySelector('[data-view="map"]');
          if (mapBtn) mapBtn.click();
        }
      });
    });

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let hovered = false;
      
      frameworks.forEach(fw => {
        const pos = positions[fw.id];
        if (!pos) return;
        const x = pos.x * w, y = pos.y * h;
        if (Math.sqrt((mx - x)**2 + (my - y)**2) < 20) hovered = true;
      });
      canvas.style.cursor = hovered ? 'pointer' : 'default';
    });
  }

  function hexToRGBA(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  return { render };
})();
