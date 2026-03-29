// ============================================================
// EXPORT — PNG image export of views and personal map
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.Export = (function() {

  // Export current 3D/2D canvas as PNG
  function exportMapView() {
    // Try 3D canvas first
    const canvas3d = document.getElementById('three-canvas');
    const canvas2d = document.getElementById('canvas-2d');
    const active = canvas2d?.style.display !== 'none' ? canvas2d : canvas3d;
    if (!active) return;

    // For WebGL, need to render one frame with preserveDrawingBuffer
    if (active === canvas3d && window.PsycheApp.Sphere3D) {
      // Re-render to ensure buffer is fresh
      const renderer = window.PsycheApp.Sphere3D._getRenderer?.();
    }

    try {
      const dataUrl = active.toDataURL('image/png');
      downloadDataUrl(dataUrl, `psyche-map-${Date.now()}.png`);
    } catch(e) {
      // WebGL may need preserveDrawingBuffer — fallback: screenshot the container
      exportViaHTML(document.getElementById('map-view'));
    }
  }

  // Export personal mapping as styled image
  function exportPersonalMap() {
    const container = document.getElementById('secondary-view');
    if (!container) return;
    exportViaHTML(container);
  }

  // Generic HTML element → canvas → PNG
  function exportViaHTML(element) {
    if (!element) return;
    // Create a styled snapshot using html2canvas-like approach
    // Simple approach: serialize the DOM to an SVG foreignObject
    const w = element.scrollWidth;
    const h = element.scrollHeight;
    const data = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="width:${w}px;height:${h}px;">
            ${element.innerHTML}
          </div>
        </foreignObject>
      </svg>`;
    const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    downloadDataUrl(url, `psyche-export-${Date.now()}.svg`);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  function downloadDataUrl(dataUrl, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return { exportMapView, exportPersonalMap };
})();
