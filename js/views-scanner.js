// ============================================================
// VIEWS — Shadow Scanner (Interactive Self-Inquiry)
// ============================================================
window.PsycheApp = window.PsycheApp || {};

window.PsycheApp.ViewsScanner = (function() {
  
  const questions = [
    {
      q: "When placed under sudden, intense stress, what is your immediate biological response?",
      options: [
        { text: "My chest tightens, and I feel a surge of heat and anger.", result: { fw: "greek", layer: 1 } }, // Thymos
        { text: "I completely numb out, freeze, and detach from my body.", result: { fw: "aztec", layer: 0 } }, // Tonalli leaving
        { text: "My mind races endlessly, calculating worst-case scenarios.", result: { fw: "buddhist", layer: 2 } }, // Saññā/Perception
        { text: "I try to immediately appease others and fix the situation.", result: { fw: "ifs", layer: 1 } } // Managers
      ]
    },
    {
      q: "What trait instantly triggers profound frustration or disgust in you when you see it in other people?",
      options: [
        { text: "Arrogance and people taking up too much space.", result: { fw: "jungian", layer: 3 } }, // Shadow (projected pride)
        { text: "Weakness, victimhood, and failure to take responsibility.", result: { fw: "freud", layer: 0 } }, // Id rejection
        { text: "Superficiality and obsession with physical appearances.", result: { fw: "esoteric", layer: 0 } }, // Physical Body over-identification
        { text: "Rigid, dogmatic rule-following without heart.", result: { fw: "kabbalistic", layer: 2 } } // Hod without Netzach
      ]
    },
    {
      q: "If you sit perfectly still in silence for 5 minutes, what is the loudest voice in your head?",
      options: [
        { text: "A harsh inner critic telling me I haven't done enough.", result: { fw: "freud", layer: 2 } }, // Superego
        { text: "A deep, aching sense of separation or loneliness.", result: { fw: "erikson", layer: 5 } }, // Intimacy vs Isolation
        { text: "A whirlwind of random, vivid fantasies and desires.", result: { fw: "kabbalistic", layer: 1 } }, // Yesod
        { text: "A quiet, terrifying vastness that feels like nothingness.", result: { fw: "buddhist", layer: 4 } } // Nirvana / Sunyata
      ]
    },
    {
      q: "When you achieve a major goal, how do you feel exactly 48 hours later?",
      options: [
        { text: "Empty. I immediately need the next goal to feel alive.", result: { fw: "lacanian", layer: 0 } }, // The Real / lack
        { text: "Guilty. I feel like I don't deserve it or I cheated.", result: { fw: "freud", layer: 2 } }, // Superego
        { text: "Relieved, but exhausted by the mask I had to wear.", result: { fw: "jungian", layer: 0 } }, // Persona
        { text: "Deeply aligned. I feel I fulfilled my destiny or purpose.", result: { fw: "yoruba", layer: 4 } } // Orí
      ]
    },
    {
      q: "How do you internally relate to the concept of 'God' or 'The Universe'?",
      options: [
        { text: "It's an illusion created by the brain to manage death anxiety.", result: { fw: "functional", layer: 3 } }, // System 2 / Neocortex
        { text: "It is a terrifying, overwhelming force that dictates fate.", result: { fw: "gnostic", layer: 4 } }, // Archons / Fate
        { text: "It is the unified ground of being that I am slowly remembering.", result: { fw: "vedantic", layer: 4 } }, // Anandamaya Kosha
        { text: "It's a web of living relationships between all living things.", result: { fw: "nativeamerican", layer: 2 } } // Medicine Wheel Center
      ]
    },
    {
      q: "What is your primary mechanism for avoiding deep emotional pain?",
      options: [
        { text: "Intellectualizing it into abstract theories and philosophies.", result: { fw: "enneagram", layer: 4 } }, // Type 5 / Head Center
        { text: "Working obsessively until I drop from exhaustion.", result: { fw: "erikson", layer: 3 } }, // Industry vs Inferiority
        { text: "Escaping into mystical states or 'spiritual bypassing'.", result: { fw: "wilber", layer: 5 } }, // Subtle/Causal avoidance
        { text: "Creating a completely false persona to interact with the world.", result: { fw: "jungian", layer: 0 } } // Persona
      ]
    },
    {
      q: "If true healing requires 'Ego Death', what does that phrase actually make you feel?",
      options: [
        { text: "Absolute terror. If I lose control, I will cease to exist.", result: { fw: "jungian", layer: 1 } }, // The Ego
        { text: "Curiosity. I want to transcend this heavy meat-suit.", result: { fw: "egyptian", layer: 2 } }, // The Ba (Soul)
        { text: "A sense of homecoming to a state of pure emptiness.", result: { fw: "daoist", layer: 2 } }, // Shen / Emptiness
        { text: "Skepticism. Life is about managing practical reality, not escaping it.", result: { fw: "functional", layer: 3 } } // System 2
      ]
    },
    {
      q: "What is your deepest, unspoken fear?",
      options: [
        { text: "That I am fundamentally broken or inherently evil.", result: { fw: "jungian", layer: 3 } }, // The Shadow
        { text: "That my entire life has been meaningless and trivial.", result: { fw: "frankl", layer: 2 } }, // Will to Meaning
        { text: "That I will be trapped in this painful reality forever.", result: { fw: "gnostic", layer: 0 } }, // Hylic (Material flesh trap)
        { text: "That I will be completely abandoned and forgotten by others.", result: { fw: "bantu", layer: 1 } } // Ubuntu disconnection
      ]
    }
  ];

  let currentStep = -1;
  let answers = [];

  function render(container) {
    currentStep = -1;
    answers = [];
    
    container.innerHTML = `
      <div class="scanner-view" style="padding: 60px 20px;">
        <div class="scanline"></div>
        <div style="max-width: 600px; margin: 40px auto; text-align: center; position: relative; z-index: 10;">
          <h2 style="font-family:var(--font-display);color:var(--gold);font-size:2.8rem;margin-bottom:16px;letter-spacing:-0.02em;">Shadow Scanner</h2>
          <div style="height: 1px; width: 60px; background: var(--gold); margin: 0 auto 24px; opacity: 0.4;"></div>
          <p style="color:var(--text-dim);font-size:1.05rem;line-height:1.7;margin-bottom:32px;font-weight:300;">
            The Psyche Map is not a passive tool. By answering a series of diagnostic inquiries, the engine will map your internal friction point directly onto the 3D void.
          </p>
          <button id="btn-start-scanner" style="padding: 14px 40px; font-size:1rem; text-transform:uppercase; letter-spacing:0.1em; background:rgba(201,168,76,0.1); border:1px solid var(--gold); color:var(--gold); border-radius:30px; cursor:pointer; transition: all 0.3s ease;">Initiate Diagnostic</button>
        </div>
      </div>
    `;

    const btn = document.getElementById('btn-start-scanner');
    btn.addEventListener('mouseenter', () => { btn.style.background = 'rgba(201,168,76,0.2)'; btn.style.boxShadow = '0 0 20px rgba(201,168,76,0.3)'; });
    btn.addEventListener('mouseleave', () => { btn.style.background = 'rgba(201,168,76,0.1)'; btn.style.boxShadow = 'none'; });
    
    btn.addEventListener('click', () => {
      window.PsycheApp.Sound?.playTransition();
      currentStep = 0;
      renderQuestion(container);
    });
  }

  function renderQuestion(container) {
    if (currentStep >= questions.length) {
      calculateResult(container);
      return;
    }

    const q = questions[currentStep];
    container.innerHTML = `
      <div class="scanner-view" style="padding: 60px 20px;">
        <div class="scanline"></div>
        <div style="max-width: 700px; margin: 40px auto; text-align: left; position: relative; z-index: 10;">
          <div style="font-family:var(--font-display);color:var(--gold);margin-bottom:16px;font-size:0.75rem;letter-spacing:0.2em;font-weight:700;opacity:0.6;">DIAGNOSTIC PROBE ${currentStep + 1} OF ${questions.length}</div>
          <div class="quiz-question" style="font-size:1.6rem; line-height:1.4; margin-bottom:32px;">${q.q}</div>
          <div class="quiz-options">
            ${q.options.map((opt, i) => `
              <button class="quiz-option" data-idx="${i}" style="margin-bottom:12px; font-size:1.05rem; padding: 20px;">
                ${opt.text}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        window.PsycheApp.Sound?.playUIClick();
        const idx = parseInt(e.target.dataset.idx);
        answers.push(q.options[idx].result);
        currentStep++;
        renderQuestion(container);
      });
    });
  }

  function calculateResult(container) {
    container.innerHTML = `
      <div class="scanner-view" style="padding: 100px 20px; text-align: center;">
        <div class="scanline"></div>
        <div style="position: relative; z-index: 10;">
          <h2 style="font-family:var(--font-display);color:var(--gold);font-size:1.6rem;margin-bottom:20px;letter-spacing:0.1em;animation: pulse 2s infinite;">Triangulating Localized Shadow Vector...</h2>
          <div class="loading-bar" style="max-width:300px; margin: 0 auto; height:2px; background:rgba(255,255,255,0.1);">
            <div class="loading-fill" style="width:0%; height:100%; background:var(--gold); animation: loadWide 2.5s ease-out forwards;"></div>
          </div>
        </div>
      </div>
    `;

    window.PsycheApp.Sound?.playSearchOpen();

    setTimeout(() => {
      // Pick the most profound result based on the last question, or a random one from their answers
      const finalResult = answers[answers.length - 1]; // or you could tally
      
      // Auto-navigate to the map and select the node
      window.PsycheApp.goToView('map');
      
      setTimeout(() => {
        window.PsycheApp.setFrameworkById(finalResult.fw);
        setTimeout(() => {
          window.PsycheApp.selectLayer(finalResult.layer);
        }, 800);
      }, 300);

    }, 1500);
  }

  return { render };
})();
