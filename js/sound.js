// ============================================================
// SOUND SYSTEM — PS4-Style Navigation Sounds (Web Audio API)
// Clean, resonant, satisfying clicks and sweeps
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.Sound = (function() {
  let ctx = null;
  let enabled = false;
  let initialized = false;
  let reverbNode = null;
  let ambientNodes = []; // oscillators for drone
  let ambientGainNode = null;
  let masterFilter = null; // breathing filter
  let noiseBuffer = null; // white noise
  let brownianBuffer = null; // deep ocean rumble
  let currentAmbientAtmo = 'neutral';

  function init() {
    document.addEventListener('click', ensureContext, { once: true });
    document.addEventListener('keydown', ensureContext, { once: true });
  }

  function ensureContext() {
    if (initialized) return;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      reverbNode = createReverb();
      noiseBuffer = createNoiseBuffer();
      brownianBuffer = createBrownianBuffer();
      
      // Master Breathing Filter for Ambient
      masterFilter = ctx.createBiquadFilter();
      masterFilter.type = 'lowpass';
      masterFilter.frequency.value = 800; // Lower default
      masterFilter.Q.value = 0.8;
      masterFilter.connect(ctx.destination);

      // Ambient Master Gain (starts at 0)
      ambientGainNode = ctx.createGain();
      ambientGainNode.gain.value = 0;
      ambientGainNode.connect(masterFilter);
      if (reverbNode) ambientGainNode.connect(reverbNode);

      initialized = true;
      if (enabled) startAmbient();
    } catch(e) { /* Audio not supported */ }
  }

  function createNoiseBuffer() {
    if (!ctx) return null;
    const size = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, size, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  function createBrownianBuffer() {
    if (!ctx) return null;
    const size = ctx.sampleRate * 4; // 4s loop
    const buffer = ctx.createBuffer(1, size, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < size; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + (0.02 * white)) / 1.02; // Leaky integrator for Brown noise
        data[i] = lastOut * 3.5; // Scale up
    }
    return buffer;
  }

  // Synthetic impulse response for subtle reverb tail
  function createReverb() {
    if (!ctx) return null;
    const len = ctx.sampleRate * 0.6; // 600ms tail
    const impulse = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.8);
      }
    }
    const convolver = ctx.createConvolver();
    convolver.buffer = impulse;
    return convolver;
  }

  function makeOutput(dryGain, wetGain) {
    const dry = ctx.createGain();
    dry.gain.value = dryGain;
    dry.connect(ctx.destination);
    const wet = ctx.createGain();
    wet.gain.value = wetGain;
    if (reverbNode) {
      const rev = createReverb(); // fresh convolver per sound
      wet.connect(rev);
      rev.connect(ctx.destination);
    } else {
      wet.connect(ctx.destination);
    }
    return { dry, wet };
  }

  function toggle() {
    enabled = !enabled;
    if (enabled) {
      if (!initialized) ensureContext();
      else startAmbient();
    } else {
      stopAmbient();
    }
    return enabled;
  }

  function isEnabled() { return enabled; }

  // ── PREMIUM HYBRID CLICK — Definitive Zen tap ──
  function playUIClick() {
    if (!enabled || !ctx) return;
    const t = ctx.currentTime;
    const { dry } = makeOutput(0.7, 0.05);

    // 1. Wood Impact (Filtered Noise)
    const noise = ctx.createBufferSource();
    const nGain = ctx.createGain();
    const nFilter = ctx.createBiquadFilter();
    noise.buffer = noiseBuffer;
    nFilter.type = 'bandpass';
    nFilter.frequency.value = 1000;
    nGain.gain.setValueAtTime(0.018, t);
    nGain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
    noise.connect(nFilter);
    nFilter.connect(nGain);
    nGain.connect(dry);
    noise.start(t);
    noise.stop(t + 0.03);

    // 2. Warm Body
    const body = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    body.type = 'sine';
    body.frequency.setValueAtTime(220, t);
    body.frequency.exponentialRampToValueAtTime(110, t + 0.07);
    bodyGain.gain.setValueAtTime(0.08, t);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    body.connect(bodyGain);
    bodyGain.connect(dry);
    body.start(t);
    body.stop(t + 0.12);

    // 3. Subtle Chime Shimmer (The 'PS4' detail)
    const chime = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    chime.type = 'triangle';
    chime.frequency.value = 1500;
    chimeGain.gain.setValueAtTime(0, t);
    chimeGain.gain.linearRampToValueAtTime(0.01, t + 0.005);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    chime.connect(chimeGain);
    chimeGain.connect(dry);
    chime.start(t);
    chime.stop(t + 0.07);
  }

  // ── PREMIUM NODE SELECT — Warm organic chord ──
  function playNodeClick(layerIndex, totalLayers) {
    if (!enabled || !ctx) return;
    const t = ctx.currentTime;
    const { dry, wet } = makeOutput(0.6, 0.3);

    const normalised = layerIndex / (totalLayers - 1 || 1);
    const baseFreq = 440 - normalised * 220; // Lower, warmer range

    // 1. Tactile Transient
    const noise = ctx.createBufferSource();
    const nGain = ctx.createGain();
    const nFilter = ctx.createBiquadFilter();
    noise.buffer = noiseBuffer;
    nFilter.type = 'lowpass';
    nFilter.frequency.value = 1500;
    nGain.gain.setValueAtTime(0.02, t);
    nGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    noise.connect(nFilter);
    nFilter.connect(nGain);
    nGain.connect(dry);
    noise.start(t);
    noise.stop(t + 0.05);

    // 2. Harmonic Body (Detuned pairs)
    [1, 1.5, 2.01].forEach((ratio, i) => {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.value = baseFreq * ratio;
      osc2.frequency.value = baseFreq * ratio + (i * 1.5); // Detune
      
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(i === 0 ? 0.08 : 0.04, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(dry);
      gain.connect(wet);
      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.7);
      osc2.stop(t + 0.7);
    });
  }

  // ── PS4-Style Framework Transition — ascending shimmer ──
  function playTransition() {
    if (!enabled || !ctx) return;
    const t = ctx.currentTime;
    const { dry, wet } = makeOutput(0.7, 0.25);

    // 4-note ascending arpeggio with slight detuning
    const notes = [330, 415, 523, 660];
    notes.forEach((freq, i) => {
      const delay = i * 0.05;
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator(); // detuned for width
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc2.type = 'sine';
      osc.frequency.value = freq;
      osc2.frequency.value = freq * 1.003; // slight detune
      gain.gain.setValueAtTime(0, t + delay);
      gain.gain.linearRampToValueAtTime(0.04, t + delay + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.25);
      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(dry);
      gain.connect(wet);
      osc.start(t + delay);
      osc2.start(t + delay);
      osc.stop(t + delay + 0.28);
      osc2.stop(t + delay + 0.28);
    });
  }

  // ── PS4-Style Search Open — two-tone chime ──
  function playSearchOpen() {
    if (!enabled || !ctx) return;
    const t = ctx.currentTime;
    const { dry, wet } = makeOutput(0.8, 0.2);

    [523.25, 659.25].forEach((freq, i) => {
      const delay = i * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, t + delay);
      gain.gain.linearRampToValueAtTime(0.06, t + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.3);
      osc.connect(gain);
      gain.connect(dry);
      gain.connect(wet);
      osc.start(t + delay);
      osc.stop(t + delay + 0.35);
    });
  }

  // ── Hover tick — ultra-subtle ──
  function playHoverTick() {
    if (!enabled || !ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 2000;
    gain.gain.setValueAtTime(0.012, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.04);
  }

  // ── Resonance Chord ──
  function playResonanceChord(atmosphere) {
    if (!enabled || !ctx) return;
    const t = ctx.currentTime;
    const { dry, wet } = makeOutput(0.8, 0.4); // Wetter than usual for "resonance"

    let frequencies = [];
    if (atmosphere === 'anxiety') {
      frequencies = [261.63, 311.13, 369.99]; // C min b5 (dissonant/tension)
    } else if (atmosphere === 'depression') {
      frequencies = [130.81, 155.56, 196.00]; // Low C min (heavy)
    } else if (atmosphere === 'mystical') {
      frequencies = [261.63, 392.00, 523.25, 783.99]; // Open 5ths (ethereal)
    } else {
      // Flow or Neutral
      frequencies = [261.63, 329.63, 392.00, 523.25]; // C Major (harmonious)
    }

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      // Slight chorus effect
      osc.frequency.exponentialRampToValueAtTime(freq * 0.995, t + 1.0);
      
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.1); 
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2); 
      
      osc.connect(gain);
      gain.connect(dry);
      gain.connect(wet);
      osc.start(t);
      osc.stop(t + 1.3);
    });
  }

  // ── PREMIUM HYBRID ENGINE — Clean pads + Subtle organic shimmer ──
  function startAmbient() {
    if (!enabled || !ctx || ambientNodes.length) return;
    const t = ctx.currentTime;
    
    // 1. GROUNDING TEXTURE (Subtle Brownian Noise)
    const rumble = ctx.createBufferSource();
    const rGain = ctx.createGain();
    rumble.buffer = brownianBuffer;
    rumble.loop = true;
    rGain.gain.value = 0.008; // Very subtle, grounding rumble
    rumble.connect(rGain);
    rGain.connect(ambientGainNode);
    rumble.start(t);
    ambientNodes.push({ type: 'rumble', src: rumble });

    // 2. CLEAN CORE PADS (Detuned Super-Oscillators)
    const freqBase = 110; 
    [1, 1.5, 2.25].forEach((mult, i) => {
      const v1 = ctx.createOscillator();
      const v2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const panner = ctx.createStereoPanner();
      v1.type = 'sine';
      v2.type = 'sine';
      v1.frequency.value = freqBase * mult;
      v2.frequency.value = freqBase * mult + 0.3; // fine detune
      panner.pan.value = (i - 1) * 0.4;
      gain.gain.value = 0.04; 
      v1.connect(panner);
      v2.connect(panner);
      panner.connect(gain);
      gain.connect(ambientGainNode);
      v1.start(t);
      v2.start(t);
      ambientNodes.push({ type: 'pad', v1, v2, gain });
    });

    // 3. SINGING BOWL SHIMMER (High Harmonics)
    [3.2, 5.7, 7.1].forEach((mult, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const lfo = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freqBase * mult;
      lfo.frequency.value = 0.04 + (i * 0.02);
      lfo.connect(gain.gain);
      gain.gain.value = 0.01; // Tiny shimmer
      osc.connect(gain);
      gain.connect(ambientGainNode);
      osc.start(t);
      lfo.start(t);
      ambientNodes.push({ type: 'shimmer', osc, lfo, gain });
    });

    ambientGainNode.gain.setTargetAtTime(0.5, t, 3.0);
  }

  function stopAmbient() {
    if (!ctx || !ambientGainNode) return;
    const t = ctx.currentTime;
    ambientGainNode.gain.setTargetAtTime(0, t, 1.5);
    setTimeout(() => {
      ambientNodes.forEach(n => {
        if (n.type === 'rumble') n.src.stop();
        if (n.type === 'pad') { n.v1.stop(); n.v2.stop(); }
        if (n.type === 'shimmer') { n.osc.stop(); n.lfo.stop(); }
      });
      ambientNodes = [];
    }, 2000);
  }

  function updateAmbientAtmo(atmo) {
    if (!enabled || !ctx || !ambientNodes.length) return;
    const t = ctx.currentTime;
    currentAmbientAtmo = atmo;
    
    ambientNodes.forEach((n, i) => {
      if (n.type === 'pad') {
        let freq, g, type = 'sine';
        const mults = [1, 1.5, 2.25];
        if (atmo === 'anxiety') {
          freq = 110 * mults[i % 3] * 1.05; // slightly sharp
          g = 0.05;
        } else if (atmo === 'depression') {
          freq = 110 * mults[i % 3] * 0.5; // low and heavy
          g = 0.07;
        } else if (atmo === 'mystical') {
          freq = 110 * mults[i % 3] * 2.0; // ethereal height
          g = 0.03;
        } else {
          freq = 110 * mults[i % 3];
          g = 0.04;
        }
        n.v1.frequency.exponentialRampToValueAtTime(freq, t + 4);
        n.v2.frequency.exponentialRampToValueAtTime(freq + 0.3, t + 4);
        n.gain.gain.setTargetAtTime(g, t, 2.0);
      }
      
      if (n.type === 'shimmer') {
        let g = 0.01;
        if (atmo === 'mystical') g = 0.025;
        else if (atmo === 'depression') g = 0.002;
        n.gain.gain.setTargetAtTime(g, t, 3.0);
      }

      if (n.type === 'rumble') {
        let g = 0.008;
        if (atmo === 'depression') g = 0.015;
        n.src.playbackRate.setTargetAtTime(atmo === 'depression' ? 0.8 : 1.0, t, 4.0);
      }
    });

    if (masterFilter) {
      if (atmo === 'depression') masterFilter.frequency.setTargetAtTime(400, t, 3.5);
      else if (atmo === 'mystical') masterFilter.frequency.setTargetAtTime(3200, t, 3.5);
      else if (atmo === 'anxiety') {
        masterFilter.frequency.setTargetAtTime(1800, t, 2.0);
        masterFilter.Q.setTargetAtTime(3.0, t, 2.0); // Resonant tension
      } else {
        masterFilter.frequency.setTargetAtTime(1200, t, 3.0);
        masterFilter.Q.setTargetAtTime(0.8, t, 3.0);
      }
    }
  }

  return { init, toggle, isEnabled, playNodeClick, playTransition, playUIClick, playSearchOpen, playHoverTick, playResonanceChord, updateAmbientAtmo };
})();
