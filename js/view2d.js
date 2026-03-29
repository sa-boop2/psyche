// ============================================================
// 2D RADIAL VIEW — Canvas-based concentric circle map
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.View2D = (function() {
  let canvas, ctx, container;
  let currentFramework = null;
  let hoveredLayer = -1;
  let animFrame = null;
  let dpr = 1;

  function init() {
    canvas = document.getElementById('canvas-2d');
    container = document.getElementById('map-view');
    if (!canvas) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onClick);
    window.addEventListener('resize', resize);
  }

  function show() {
    if (!canvas) return;
    canvas.style.display = 'block';
    resize();
    draw();
  }

  function hide() {
    if (!canvas) return;
    canvas.style.display = 'none';
    if (animFrame) cancelAnimationFrame(animFrame);
  }

  function resize() {
    if (!canvas || !container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    draw();
  }

  function setFramework(fw) {
    currentFramework = fw;
    draw();
  }

  function draw() {
    if (!ctx || !canvas || !container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    const cx = w / 2;
    const cy = h / 2;
    const maxR = Math.min(cx, cy) - 50;
    const minR = 30;

    // Background
    const isDark = !document.documentElement.hasAttribute('data-theme') || document.documentElement.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark ? '#060612' : '#FAF8F0';
    ctx.fillRect(0, 0, w, h);

    if (!currentFramework) return;
    const layers = currentFramework.layers;
    const count = layers.length;

    // Draw rings from outer (layer 0 = surface) to inner (last = core)
    layers.forEach((layer, i) => {
      const r = maxR - (i / (count - 1 || 1)) * (maxR - minR);
      const isHovered = hoveredLayer === i;

      // Ring fill
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = hexToRGBA(layer.color, isHovered ? 0.15 : 0.06);
      ctx.fill();

      // Ring stroke
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = hexToRGBA(layer.color, isHovered ? 0.7 : 0.3);
      ctx.lineWidth = isHovered ? 2.5 : 1.2;
      ctx.stroke();

      // Node dot on the ring
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const nx = cx + r * Math.cos(angle);
      const ny = cy + r * Math.sin(angle);
      const dotR = isHovered ? 10 : 7;

      // Glow
      if (isHovered) {
        ctx.beginPath();
        ctx.arc(nx, ny, dotR + 6, 0, Math.PI * 2);
        ctx.fillStyle = hexToRGBA(layer.color, 0.2);
        ctx.fill();
      }

      // Dot
      ctx.beginPath();
      ctx.arc(nx, ny, dotR, 0, Math.PI * 2);
      ctx.fillStyle = layer.color;
      ctx.fill();

      // Label
      const labelX = nx + (Math.cos(angle) > 0 ? 16 : -16);
      const textAlign = Math.cos(angle) > 0 ? 'left' : 'right';
      ctx.textAlign = textAlign;
      ctx.textBaseline = 'middle';
      ctx.font = `${isHovered ? '600' : '500'} ${isHovered ? 14 : 12}px Inter, sans-serif`;
      ctx.fillStyle = isDark ? (isHovered ? '#e8d48b' : '#b0ada6') : (isHovered ? '#8a7233' : '#555');
      ctx.fillText(`${i + 1}. ${layer.name}`, labelX, ny);

      // Connecting line from center to node
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(nx, ny);
      ctx.strokeStyle = hexToRGBA(layer.color, 0.08);
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Center label
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '600 14px Cinzel, serif';
    ctx.fillStyle = isDark ? '#c9a84c' : '#8a7233';
    ctx.fillText(currentFramework.name, cx, cy);
    ctx.font = '400 10px Inter, sans-serif';
    ctx.fillStyle = isDark ? '#706c66' : '#999';
    ctx.fillText('CORE', cx, cy + 16);
  }

  function getLayerAtPoint(x, y) {
    if (!currentFramework || !container) return -1;
    const w = container.clientWidth;
    const h = container.clientHeight;
    const cx = w / 2;
    const cy = h / 2;
    const maxR = Math.min(cx, cy) - 50;
    const minR = 30;
    const layers = currentFramework.layers;
    const count = layers.length;

    for (let i = 0; i < count; i++) {
      const r = maxR - (i / (count - 1 || 1)) * (maxR - minR);
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const nx = cx + r * Math.cos(angle);
      const ny = cy + r * Math.sin(angle);
      const dist = Math.hypot(x - nx, y - ny);
      if (dist < 18) return i;
    }
    return -1;
  }

  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const prev = hoveredLayer;
    hoveredLayer = getLayerAtPoint(x, y);
    canvas.style.cursor = hoveredLayer >= 0 ? 'pointer' : 'default';
    if (hoveredLayer !== prev) draw();
  }

  function onClick(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const idx = getLayerAtPoint(x, y);
    if (idx >= 0 && currentFramework) {
      const layer = currentFramework.layers[idx];
      layer.framework = currentFramework.name;
      layer.crossRefs = [];
      window.PsycheApp.Sidebar.show(layer);
      window.PsycheApp.Sound?.playNodeClick(idx, currentFramework.layers.length);
    }
  }

  function hexToRGBA(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  return { init, show, hide, setFramework };
})();
