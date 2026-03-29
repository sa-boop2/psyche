// ============================================================
// FRAMEWORK LINEAGE DATA — Historical relationships
// ============================================================
window.PsycheData = window.PsycheData || {};

window.PsycheData.lineage = [
  // Western internal
  { from: 'freudian', to: 'jungian', type: 'broke_from', label: 'Jung broke from Freud (1913)', year: 1913 },
  { from: 'freudian', to: 'erikson', type: 'evolved_from', label: 'Erikson expanded Freud\'s stages', year: 1950 },
  { from: 'jungian', to: 'functional', type: 'influenced', label: 'Archetypes → cognitive patterns', year: 1970 },

  // Eastern internal
  { from: 'buddhist', to: 'vedantic', type: 'parallel', label: 'Shared Indian philosophical roots', year: -500 },
  { from: 'daoist', to: 'buddhist', type: 'synthesized', label: 'Chan/Zen Buddhism synthesis', year: 500 },
  { from: 'sufi', to: 'buddhist', type: 'parallel', label: 'Parallel contemplative methods', year: 800 },

  // Cross-tradition
  { from: 'buddhist', to: 'jungian', type: 'influenced', label: 'Eastern thought influenced Jung', year: 1920 },
  { from: 'buddhist', to: 'functional', type: 'influenced', label: 'Mindfulness → cognitive science', year: 1990 },
  { from: 'vedantic', to: 'jungian', type: 'influenced', label: 'Jung studied Upanishads', year: 1930 },
  { from: 'hermetic', to: 'jungian', type: 'influenced', label: 'Alchemy → individuation', year: 1944 },
  { from: 'kabbalistic', to: 'hermetic', type: 'influenced', label: 'Kabbalah shaped Hermeticism', year: 1200 },
  { from: 'kabbalistic', to: 'sufi', type: 'parallel', label: 'Shared Abrahamic mysticism', year: 1000 },
  { from: 'greek', to: 'freudian', type: 'influenced', label: 'Greek tragedy → Oedipus complex', year: 1900 },
  { from: 'greek', to: 'jungian', type: 'influenced', label: 'Greek myths → archetypes', year: 1912 },
  { from: 'greek', to: 'hermetic', type: 'evolved_from', label: 'Hermes Trismegistus tradition', year: -200 },

  // Indigenous connections
  { from: 'yoruba', to: 'jungian', type: 'parallel', label: 'Orisha ↔ Archetypes parallel', year: 1960 },
  { from: 'aboriginal', to: 'jungian', type: 'parallel', label: 'Dreamtime ↔ Collective Unconscious', year: 1950 },
  { from: 'native_american', to: 'daoist', type: 'parallel', label: 'Nature-based harmony concepts', year: 0 },
  { from: 'ubuntu', to: 'erikson', type: 'parallel', label: 'Community identity development', year: 1970 },
  { from: 'aztec', to: 'kabbalistic', type: 'parallel', label: 'Layered cosmic structures', year: 0 },

  // Esoteric internal
  { from: 'hermetic', to: 'kabbalistic', type: 'synthesized', label: 'Western esoteric synthesis', year: 1500 },
  { from: 'greek', to: 'kabbalistic', type: 'influenced', label: 'Neoplatonism → Kabbalah', year: 200 },
];

// Framework positions for graph layout (x, y as 0-1 normalized)
window.PsycheData.lineagePositions = {
  // --- ANCIENT FOUNDER ROOTS (Extreme Left) ---
  aboriginal:     { x: 0.08, y: 0.82 },
  native_american:{ x: 0.12, y: 0.62 },
  vedantic:       { x: 0.15, y: 0.15 },
  greek:          { x: 0.18, y: 0.40 },
  yoruba:         { x: 0.22, y: 0.58 },

  // --- CLASSICAL EVOLUTION (Inner Left / Center) ---
  buddhist:       { x: 0.38, y: 0.22 },
  daoist:         { x: 0.42, y: 0.48 },
  aztec:          { x: 0.45, y: 0.78 },

  // --- MEDIEVAL & ESOTERIC (Middle Right) ---
  sufi:           { x: 0.60, y: 0.28 },
  kabbalistic:    { x: 0.65, y: 0.45 },
  hermetic:       { x: 0.68, y: 0.62 },
  ubuntu:         { x: 0.72, y: 0.85 },

  // --- MODERN PSYCHOLOGICAL ERA (Extreme Right) ---
  freudian:       { x: 0.82, y: 0.50 },
  jungian:        { x: 0.86, y: 0.32 },
  functional:     { x: 0.90, y: 0.18 },
  erikson:        { x: 0.92, y: 0.65 }
};
