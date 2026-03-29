// ============================================================
// 3D SPHERE VISUALIZATION — Three.js concentric sphere map
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.Sphere3D = (function() {
  let scene, camera, renderer, raycaster, mouse;
  let container, canvas;
  let sphereGroup, particleSystem, nodeObjects = [];
  let autoRotate = false, showLabels = true;
  let isDragging = false, prevMouse = { x: 0, y: 0 };
  let theta = 0.5, phi = 1.0, radius = 6;
  let targetTheta = 0.5, targetPhi = 1.0, targetRadius = 6;
  let hoveredNode = null, selectedNode = null;
  let currentFramework = null;
  let animFrame = null;
  let labelSprites = [];
  let dimableObjects = []; // rings, shells, halos for spotlight dimming
  let spotlightActive = false;
  let prevHoveredNode = null; // for hover sound
  let resonanceGroup = null;
  let resonanceObjects = []; // for animation
  let resonanceNodeObjects = []; // for clicking
  let currentAtmosphere = 'neutral';
  const DAMPING = 0.08;

  function init() {
    canvas = document.getElementById('three-canvas');
    container = document.getElementById('map-view');
    if (!canvas || !window.THREE) return;

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060612);
    scene.fog = new THREE.FogExp2(0x060612, 0.035);

    // Camera
    camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 100);
    updateCameraPosition();

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Raycaster
    raycaster = new THREE.Raycaster();
    raycaster.params.Points = { threshold: 0.15 };
    mouse = new THREE.Vector2();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404060, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xc9a84c, 1.2, 30);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    const pointLight2 = new THREE.PointLight(0x4c7ec9, 0.6, 25);
    pointLight2.position.set(-5, -3, -5);
    scene.add(pointLight2);

    // Groups
    sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // Particles background
    createParticles();

    // Events
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);
    window.addEventListener('resize', onResize);

    // Control buttons
    document.getElementById('btn-toggle-autorotate')?.addEventListener('click', function() {
      autoRotate = !autoRotate;
      this.classList.toggle('active', autoRotate);
    });
    // Ensure button state matches default
    const btnAr = document.getElementById('btn-toggle-autorotate');
    if (btnAr) btnAr.classList.toggle('active', autoRotate);

    document.getElementById('btn-reset-camera')?.addEventListener('click', resetCamera);
    document.getElementById('btn-toggle-labels')?.addEventListener('click', function() {
      showLabels = !showLabels;
      this.classList.toggle('active', showLabels);
      labelSprites.forEach(s => s.visible = showLabels);
    });

    animate();
  }

  function createParticles() {
    const count = 600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 10 + Math.random() * 20;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      positions[i*3] = r * Math.sin(p) * Math.cos(t);
      positions[i*3+1] = r * Math.sin(p) * Math.sin(t);
      positions[i*3+2] = r * Math.cos(p);
      const gold = Math.random() > 0.7;
      colors[i*3] = gold ? 0.78 : 0.4;
      colors[i*3+1] = gold ? 0.66 : 0.4;
      colors[i*3+2] = gold ? 0.3 : 0.5;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({ size: 0.06, vertexColors: true, transparent: true, opacity: 0.5, sizeAttenuation: true });
    particleSystem = new THREE.Points(geo, mat);
    scene.add(particleSystem);
  }

  function buildFrameworkVisuals(fw, angleOffset) {
    const layers = fw.layers;
    const count = layers.length;
    const minR = 0.6;
    const maxR = 3.2;
    const builtNodes = [];
    const builtLabels = [];
    const builtDimable = [];

    layers.forEach((layer, i) => {
      const r = maxR - (i / (count - 1 || 1)) * (maxR - minR);
      const color = new THREE.Color(layer.color);

      // ── EQUATORIAL RING ──
      const ringSegments = 96;
      const ringPoints = [];
      for (let s = 0; s <= ringSegments; s++) {
        const a = (s / ringSegments) * Math.PI * 2;
        ringPoints.push(new THREE.Vector3(r * Math.cos(a), 0, r * Math.sin(a)));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
      const ringMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 + (i * 0.04) });
      const ring1 = new THREE.Line(ringGeo, ringMat);
      sphereGroup.add(ring1);
      builtDimable.push(ring1);

      const ring2 = new THREE.Line(ringGeo.clone(), ringMat.clone());
      ring2.rotation.x = Math.PI / 2;
      sphereGroup.add(ring2);
      builtDimable.push(ring2);

      const ring3 = new THREE.Line(ringGeo.clone(), ringMat.clone());
      ring3.rotation.z = Math.PI / 4;
      ring3.material.opacity = 0.1;
      sphereGroup.add(ring3);
      builtDimable.push(ring3);

      // Procedural Mindscapes based on Tradition
      let sphereGeo;
      if (fw.tradition === 'western' || fw.tradition === 'modern') {
        sphereGeo = new THREE.IcosahedronGeometry(r, 1); // Sharp, rational
      } else if (fw.tradition === 'indigenous') {
        sphereGeo = new THREE.DodecahedronGeometry(r, 0); // Grounded, elemental
      } else if (fw.tradition === 'esoteric') {
        sphereGeo = new THREE.OctahedronGeometry(r, 2); // Crystalline, magical
      } else if (fw.tradition === 'spiritual') {
        sphereGeo = new THREE.TorusGeometry(r - 0.2, 0.2 + (i*0.05), 16, 64); // Continual loop
      } else {
        sphereGeo = new THREE.SphereGeometry(r, 32, 24); // Smooth, natural (eastern)
      }

      const shellMat = new THREE.MeshPhongMaterial({ color, transparent: true, opacity: 0.025 + (i * 0.01), side: THREE.DoubleSide, depthWrite: false });
      const shell = new THREE.Mesh(sphereGeo, shellMat);
      sphereGroup.add(shell);
      builtDimable.push(shell);

      // ── NODE ──
      const angle = (i / count) * Math.PI * 2 - Math.PI / 6 + (angleOffset || 0);
      const nx = r * Math.cos(angle);
      const ny = 0;
      const nz = r * Math.sin(angle);
      const nodeSize = 0.09 + (0.015 * i);
      const nodeGeo = new THREE.SphereGeometry(nodeSize, 14, 10);
      const nodeMat = new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.5 + (i * 0.08), transparent: true, opacity: 0.95 });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(nx, ny, nz);
      node.userData = { layerIndex: i, layer, framework: fw, targetPos: new THREE.Vector3(nx, ny, nz), baseScale: nodeSize };
      sphereGroup.add(node);
      builtNodes.push(node);

      const haloGeo = new THREE.SphereGeometry(nodeSize * 2.2, 14, 10);
      const haloMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.14, depthWrite: false });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(node.position);
      halo.userData = { parentNode: node };
      sphereGroup.add(halo);
      builtDimable.push(halo);

      // ── LABEL ──
      const labelText = `${i + 1}. ${layer.name}`;
      const sprite = createTextSprite(labelText, color, i === 0 || i === count - 1);
      const labelOff = 0.3;
      sprite.position.set(nx + labelOff * Math.cos(angle), 0.22, nz + labelOff * Math.sin(angle));
      sprite.visible = showLabels;
      sphereGroup.add(sprite);
      builtLabels.push(sprite);

      // ── LINE center→node ──
      const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0), new THREE.Vector3(nx,ny,nz)]);
      sphereGroup.add(new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.1 })));
    });
    return { nodes: builtNodes, labels: builtLabels, dimable: builtDimable };
  }

  function setFramework(fw) {
    currentFramework = fw;
    clearSpheres();
    if (!fw) return;
    const result = buildFrameworkVisuals(fw, 0);
    nodeObjects = result.nodes;
    labelSprites = result.labels;
    dimableObjects = result.dimable;
    spotlightActive = false;

    // Animate in
    sphereGroup.scale.set(0.01, 0.01, 0.01);
    animateScale(sphereGroup, 1.0, 600);
    updateLegend(fw);
  }


  function createTextSprite(text, color, emphasis) {
    const canvas2 = document.createElement('canvas');
    const ctx = canvas2.getContext('2d');
    const fontSize = emphasis ? 56 : 48;
    canvas2.width = 600;
    canvas2.height = 80;
    ctx.clearRect(0, 0, canvas2.width, canvas2.height);

    // Dark background pill for readability
    const metrics = (() => { ctx.font = `600 ${fontSize}px Inter, sans-serif`; return ctx.measureText(text); })();
    const textWidth = metrics.width;
    const pillPad = 14;
    ctx.fillStyle = 'rgba(6, 6, 18, 0.75)';
    ctx.beginPath();
    ctx.roundRect(4, 6, textWidth + pillPad * 2, canvas2.height - 12, 8);
    ctx.fill();

    ctx.font = `${emphasis ? '700' : '600'} ${fontSize}px Inter, sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.95)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = '#' + (color.getHexString ? color.getHexString() : 'e8d48b');
    ctx.fillText(text, 4 + pillPad, canvas2.height / 2);
    const texture = new THREE.CanvasTexture(canvas2);
    texture.minFilter = THREE.LinearFilter;
    const mat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, depthTest: false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(2.0, 0.27, 1);
    return sprite;
  }

  function clearSpheres() {
    while (sphereGroup.children.length) {
      const c = sphereGroup.children[0];
      c.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (child.material.map) child.material.map.dispose();
          child.material.dispose();
        }
      });
      sphereGroup.remove(c);
    }
    nodeObjects = [];
    labelSprites = [];
    dimableObjects = [];
    spotlightActive = false;
    if (resonanceGroup) {
      sphereGroup.remove(resonanceGroup);
      resonanceGroup = null;
    }
  }

  function animateScale(obj, target, duration) {
    const start = performance.now();
    const startScale = obj.scale.x;
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const s = startScale + (target - startScale) * eased;
      obj.scale.set(s, s, s);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function updateLegend(fw) {
    const legend = document.getElementById('map-legend');
    if (!legend || !fw) return;
    legend.innerHTML =
      `<div style="font-family:var(--font-display);color:var(--gold-light);font-size:0.85rem;margin-bottom:4px;letter-spacing:0.05em">${fw.name}</div>` +
      `<div style="font-size:0.68rem;color:var(--text-dim);margin-bottom:8px;letter-spacing:0.04em">OUTER → CORE</div>` +
      fw.layers.map((l, i) =>
        `<div class="legend-item" data-idx="${i}"><span class="legend-num">${i+1}</span><span class="legend-dot" style="background:${l.color};color:${l.color}"></span><span class="legend-name">${l.name}</span></div>`
      ).join('');
    legend.querySelectorAll('.legend-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.idx);
        if (nodeObjects[idx]) selectNode(nodeObjects[idx]);
      });
    });
  }

  // ── CAMERA CONTROLS ──
  function updateCameraPosition() {
    camera.position.x = radius * Math.sin(phi) * Math.cos(theta);
    camera.position.y = radius * Math.cos(phi);
    camera.position.z = radius * Math.sin(phi) * Math.sin(theta);
    camera.lookAt(0, 0, 0);
  }

  function resetCamera() {
    targetTheta = 0.5; targetPhi = 1.0; targetRadius = 6;
  }

  let touchStartDist = 0;
  function onTouchStart(e) {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMouse.x = e.touches[0].clientX;
      prevMouse.y = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      touchStartDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    }
    e.preventDefault();
  }
  function onTouchMove(e) {
    if (e.touches.length === 1 && isDragging) {
      const dx = e.touches[0].clientX - prevMouse.x;
      const dy = e.touches[0].clientY - prevMouse.y;
      targetTheta -= dx * 0.005;
      targetPhi = Math.max(0.2, Math.min(Math.PI - 0.2, targetPhi - dy * 0.005));
      prevMouse.x = e.touches[0].clientX;
      prevMouse.y = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      targetRadius = Math.max(2.5, Math.min(15, targetRadius - (dist - touchStartDist) * 0.02));
      touchStartDist = dist;
    }
    e.preventDefault();
  }
  function onTouchEnd() { isDragging = false; }
  function onMouseDown(e) { isDragging = true; prevMouse.x = e.clientX; prevMouse.y = e.clientY; }
  function onMouseUp() { isDragging = false; }
  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    if (isDragging) {
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      targetTheta -= dx * 0.005;
      targetPhi = Math.max(0.2, Math.min(Math.PI - 0.2, targetPhi - dy * 0.005));
      prevMouse.x = e.clientX;
      prevMouse.y = e.clientY;
    }
    checkHover(e);
  }
  function onWheel(e) {
    e.preventDefault();
    targetRadius = Math.max(2.5, Math.min(15, targetRadius + e.deltaY * 0.005));
  }

  function onClick(e) {
    if (!nodeObjects.length) return;
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([...nodeObjects, ...resonanceNodeObjects]);
    if (intersects.length > 0) {
      const obj = intersects[0].object;
      if (obj.userData.frameworkId) {
        // It's a resonance node!
        window.PsycheApp.Sound?.playTransition();
        window.PsycheApp.setFrameworkById(obj.userData.frameworkId, obj.userData.layerIdx);
      } else {
        selectNode(obj);
      }
    }
  }

  function selectNode(node) {
    selectedNode = node;
    const data = node.userData.layer;
    data.framework = node.userData.framework.name;
    data.crossRefs = findCrossRefs(node.userData.framework, node.userData.layerIndex);
    window.PsycheApp.Sidebar.show(data);

    // ── SPOTLIGHT EFFECT — dim everything except selected node ──
    spotlightActive = true;
    document.getElementById('map-view')?.classList.add('spotlight-active');
    nodeObjects.forEach(n => {
      n.material.emissiveIntensity = (n === node) ? 1.2 : 0.15;
      n.material.opacity = (n === node) ? 1.0 : 0.12;
    });
    // Dim rings, shells, halos
    dimableObjects.forEach(obj => {
      if (obj.material) {
        obj.material.opacity = obj.material.opacity * 0.15;
      }
    });
    // Dim labels except the selected one
    const selIdx = node.userData.layerIndex;
    labelSprites.forEach((s, i) => {
      s.material.opacity = (i === selIdx) ? 1.0 : 0.1;
    });

    if (resonanceGroup) {
      sphereGroup.remove(resonanceGroup);
    }
    resonanceGroup = new THREE.Group();
    resonanceObjects = [];
    resonanceNodeObjects = [];
    sphereGroup.add(resonanceGroup);

    document.getElementById('map-view')?.classList.add('spotlight-active');


    data.crossRefs.forEach((ref, idx) => {
      // Improved trajectory mapping
      const angle = (idx / data.crossRefs.length) * Math.PI * 2;
      const refDist = 9 + Math.random() * 2;
      const rx = node.position.x + refDist * Math.cos(angle);
      const ry = (Math.random() - 0.5) * 8;
      const rz = node.position.z + refDist * Math.sin(angle);
      const targetPos = new THREE.Vector3(rx, ry, rz);

      // ── ANIMATED BEZIER LINE ──
      const midPoint = new THREE.Vector3().addVectors(node.position, targetPos).multiplyScalar(0.5);
      midPoint.y += 5; // Arcing path for clarity
      const curve = new THREE.QuadraticBezierCurve3(node.position, midPoint, targetPos);
      
      const linePoints = curve.getPoints(50);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lineMat = new THREE.LineBasicMaterial({ 
        color: 0xc9a84c, 
        transparent: true, 
        opacity: 0, // start invisible for "shoot" animation
        blending: THREE.AdditiveBlending 
      });
      const line = new THREE.Line(lineGeo, lineMat);
      resonanceGroup.add(line);

      // ── CRYSTALLINE MARKER ──
      const crystalGeo = new THREE.OctahedronGeometry(0.38, 0); // Slightly larger for better clicking
      const crystalMat = new THREE.MeshPhongMaterial({ 
        color: 0xffffff, 
        emissive: 0xc9a84c, 
        emissiveIntensity: 2.0, // Brighter
        transparent: true, 
        opacity: 0 // start invisible
      });
      const crystal = new THREE.Mesh(crystalGeo, crystalMat);
      crystal.position.copy(targetPos);
      crystal.userData = { 
        frameworkId: ref.frameworkId, 
        frameworkName: ref.frameworkName,
        layerIdx: ref.layerIdx
      };
      resonanceGroup.add(crystal);
      resonanceNodeObjects.push(crystal);

      // ── LABEL ──
      const sprite = createTextSprite(ref.frameworkName.toUpperCase() + " › " + ref.layerName, new THREE.Color(0xFFFFFF), true);
      sprite.position.copy(targetPos).add(new THREE.Vector3(0, 0.5, 0));
      sprite.visible = false; // logic handles visibility
      resonanceGroup.add(sprite);

      // Tracking for animation
      resonanceObjects.push({ 
        line, 
        crystal, 
        sprite, 
        startTime: performance.now() + (idx * 50), // staggered start
        duration: 800 
      });
    });

    // Sound (Harmonic output for resonance)
    if (window.PsycheApp.Sound) {
      if (data.crossRefs.length > 0) {
        window.PsycheApp.Sound.playResonanceChord(currentAtmosphere);
      } else {
        window.PsycheApp.Sound.playNodeClick(node.userData.layerIndex, node.userData.framework.layers.length);
      }
    }
  }

  function selectNodeByIndex(idx) {
    if (nodeObjects[idx]) selectNode(nodeObjects[idx]);
  }

  function findCrossRefs(fw, layerIdx) {
    if (!window.PsycheApp.allFrameworks) return [];
    const refs = [];
    const normalizedIdx = layerIdx / (fw.layers.length - 1 || 1);
    window.PsycheApp.allFrameworks.forEach(otherFw => {
      if (otherFw.id === fw.id) return;
      const matchIdx = Math.round(normalizedIdx * (otherFw.layers.length - 1));
      if (otherFw.layers[matchIdx]) {
        refs.push({
          frameworkId: otherFw.id,
          frameworkName: otherFw.name,
          layerName: otherFw.layers[matchIdx].name,
          layerIdx: matchIdx
        });
      }
    });
    return refs.slice(0, 6);
  }

  window.PsycheApp.onSidebarClose = function() {
    spotlightActive = false;
    document.getElementById('map-view')?.classList.remove('spotlight-active');
    // Restore all opacities — rebuild is cleanest
    if (currentFramework) {
      clearSpheres();
      const result = buildFrameworkVisuals(currentFramework, 0);
      nodeObjects = result.nodes;
      labelSprites = result.labels;
      dimableObjects = result.dimable;
    }
    selectedNode = null;
    if (resonanceGroup) {
      sphereGroup.remove(resonanceGroup);
      resonanceGroup = null;
      resonanceObjects = [];
      resonanceNodeObjects = [];
    }
  };

  function checkHover(e) {
    if (!nodeObjects.length || isDragging) return;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([...nodeObjects, ...resonanceNodeObjects]);
    const label = document.getElementById('hovered-label');
    
    if (intersects.length > 0 && intersects[0].object !== selectedNode) {
      const newHovered = intersects[0].object;
      if (newHovered !== prevHoveredNode) {
        window.PsycheApp.Sound?.playHoverTick();
        prevHoveredNode = newHovered;
      }
      hoveredNode = newHovered;
      canvas.style.cursor = 'pointer';
      
      if (label) {
        if (hoveredNode.userData.frameworkId) {
          label.textContent = "Jump to " + hoveredNode.userData.frameworkName + " Framework";
        } else {
          const data = hoveredNode.userData.layer;
          label.textContent = data.name + (data.subtitle ? ' — ' + data.subtitle : '');
        }
        label.style.left = (e.clientX + 15) + 'px';
        label.style.top = (e.clientY - 20) + 'px';
        label.classList.remove('hidden');
      }
    } else {
      hoveredNode = null;
      prevHoveredNode = null;
      canvas.style.cursor = 'grab';
      if (label) label.classList.add('hidden');
    }
  }

  function onResize() {
    if (!container || !camera || !renderer) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  function animate() {
    animFrame = requestAnimationFrame(animate);
    // Smooth camera
    theta += (targetTheta - theta) * DAMPING;
    phi += (targetPhi - phi) * DAMPING;
    radius += (targetRadius - radius) * DAMPING;
    updateCameraPosition();
    // Atmosphere adjustments
    let rotSpeed = 0.002;
    if (currentAtmosphere === 'anxiety') rotSpeed = 0.015;
    if (currentAtmosphere === 'depression') rotSpeed = 0.0004;
    
    // Auto-rotate
    if (autoRotate && !isDragging) targetTheta += rotSpeed;
    // Rotate particles
    if (particleSystem) particleSystem.rotation.y += (rotSpeed * 0.1);
    
    // Slight sphere breathing (calming rhythm for flow state, neutral for normal)
    if (sphereGroup && sphereGroup.scale.x > 0.5 && !spotlightActive) {
      const breathSpeed = currentAtmosphere === 'flow' ? 0.0002 : 0.0008;
      const breathIntensity = currentAtmosphere === 'flow' ? 0.03 : 0.01;
      const t = performance.now() * breathSpeed; 
      const s = 1.0 + Math.sin(t) * breathIntensity;
      sphereGroup.scale.set(s, s, s);
    }
    // ── TACTILE / MAGNETIC NODES ──
    nodeObjects.forEach(node => {
      const target = node.userData.targetPos;
      if (hoveredNode === node && !spotlightActive) {
        // Subtle magnetic pull toward camera-space mouse direction
        const pullStrength = 0.5;
        const dir = new THREE.Vector3();
        raycaster.setFromCamera(mouse, camera);
        dir.copy(raycaster.ray.direction).multiplyScalar(1.2);
        const attracted = target.clone().add(dir.multiplyScalar(pullStrength));
        node.position.lerp(attracted, 0.15);
        // Scale pulse
        const pulse = 1.3 + Math.sin(performance.now() * 0.008) * 0.08;
        node.scale.setScalar(pulse);
      } else {
        // Smoothly return to original position
        node.position.lerp(target, 0.08);
        node.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    });
    
    // ── RESONANCE LINE ANIMATION ──
    const now = performance.now();
    resonanceObjects.forEach(obj => {
      const elapsed = now - obj.startTime;
      if (elapsed < 0) return;
      
      const t = Math.min(1.0, elapsed / obj.duration);
      const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic
      
      if (obj.line && obj.line.geometry) {
        obj.line.material.opacity = ease * 0.7;
        obj.line.geometry.setDrawRange(0, Math.floor(t * 51));
      }
      if (obj.crystal) {
        obj.crystal.material.opacity = ease;
        obj.crystal.rotation.y += 0.03;
        obj.crystal.rotation.x += 0.01;
      }
      if (obj.sprite && t > 0.8) {
        obj.sprite.visible = true;
        obj.sprite.material.opacity = (t - 0.8) * 5;
      }
    });

    // Atmosphere Specific overrides during animation
    if (currentAtmosphere === 'anxiety') {
      // Jitter
      if(sphereGroup) {
         sphereGroup.position.x = (Math.random() - 0.5) * 0.05;
         sphereGroup.position.y = (Math.random() - 0.5) * 0.05;
      }
    } else if (sphereGroup) {
      sphereGroup.position.lerp(new THREE.Vector3(0,0,0), 0.1);
    }
    
    renderer.render(scene, camera);
  }

  function destroy() {
    if (animFrame) cancelAnimationFrame(animFrame);
    clearSpheres();
  }

  function setBackground(color) {
    if (scene) {
      scene.background = new THREE.Color(color);
      if (scene.fog) scene.fog.color = new THREE.Color(color);
    }
  }

  function setAtmosphere(state) {
    currentAtmosphere = state;
    if (!scene) return;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    
    let bgDark, bgLight;
    if (state === 'anxiety') {
      bgDark = 0x2a0505; bgLight = 0xffeaea;
    } else if (state === 'flow') {
      bgDark = 0x020818; bgLight = 0xeaf3ff;
    } else if (state === 'depression') {
      bgDark = 0x020202; bgLight = 0xd0d0d0;
    } else if (state === 'mystical') {
      bgDark = 0x180424; bgLight = 0xf5eeff;
    } else {
      bgDark = 0x060612; bgLight = 0xFAF8F0;
    }

    const targetColor = isLight ? bgLight : bgDark;
    scene.background.setHex(targetColor);
    if (scene.fog) {
      scene.fog.color.setHex(targetColor);
      scene.fog.density = state === 'depression' ? 0.08 : 0.035;
    }

    // Modify geometry colors/opacities based on atmosphere
    if (state === 'depression') {
      nodeObjects.forEach(n => {
        n.material.color.setHSL(0, 0, isLight ? 0.4 : 0.2);
        n.material.emissiveIntensity = 0;
      });
      dimableObjects.forEach(o => { if (o.material) o.material.opacity *= 0.2; });
      if (particleSystem) particleSystem.material.opacity = 0.05;
    } else if (state === 'mystical') {
      nodeObjects.forEach((n, i) => {
        n.material.color.set(n.userData.layer.color);
        n.material.emissiveIntensity = 1.0 + (i * 0.1);
      });
      if (particleSystem) particleSystem.material.opacity = 1.0;
    } else {
      nodeObjects.forEach((n, i) => {
        n.material.color.set(n.userData.layer.color);
        n.material.emissiveIntensity = 0.5 + (i * 0.08);
      });
      dimableObjects.forEach(o => {
        // Reset opacity relies on rebuilding, but simple reset works okay
      });
      if (particleSystem) particleSystem.material.opacity = 0.5;
    }
  }

  function updateYearVisibility(year) {
    if (!currentFramework) return;
    const fwYear = currentFramework.year || 2026;
    const isVisible = fwYear <= year;
    
    // We also want to fade specific nodes within the framework if they had individual years,
    // but usually the framework itself has the year.
    // Let's hide the entire framework if it's not yet 'born' in history.
    const opacity = isVisible ? 1.0 : 0.0;
    const pointerEvents = isVisible ? 'auto' : 'none';

    const needsTraverse = sphereGroup && sphereGroup.visible !== isVisible;
    if (sphereGroup) {
      sphereGroup.visible = isVisible;
      if (needsTraverse) {
        sphereGroup.traverse(obj => {
          if (obj.material && obj.material.transparent !== undefined) {
             obj.material.transparent = true;
             obj.material.opacity = opacity;
          }
        });
      }
    }

    // Special handling for labels (CSS2D if we used it, but we use sprites)
    labelSprites.forEach(s => {
       s.visible = isVisible;
       if (s.material) s.material.opacity = opacity;
    });

    if (canvas) canvas.style.pointerEvents = pointerEvents;
  }

  return { init, setFramework, resetCamera, destroy, setBackground, selectNodeByIndex, setAtmosphere, updateYearVisibility, _getRenderer: () => renderer, rebuildVisuals: () => { if(currentFramework) setFramework(currentFramework); } };
})();
