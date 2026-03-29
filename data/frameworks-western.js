// ============================================================
// WESTERN PSYCHOLOGY FRAMEWORKS
// Jungian, Freudian, Erikson, Functional
// ============================================================
window.PsycheData = window.PsycheData || {};

window.PsycheData.frameworksWestern = [
  // ── JUNGIAN ANALYTICAL PSYCHOLOGY ──
  {
    id: 'jungian',
    name: 'Jungian',
    fullName: 'Analytical Psychology (C.G. Jung)',
    tradition: 'western',
    year: 1920,
    hue: 240,
    description: 'Carl Jung split from Freud by declaring the unconscious was not just a landfill for repressed personal trauma, but a vast, historical reservoir of collective human experience. The psyche naturally strives toward wholeness (Individuation), not just symptom relief. The self must integrate its shadow and contra-sexual elements to fully realize its potential.',
    thinkers: ['Carl Jung', 'Marie-Louise von Franz', 'James Hillman', 'Edward Edinger', 'Marion Woodman'],
    layers: [
      {
        name: 'The Persona',
        subtitle: 'The Social Mask',
        description: 'The "good guy/girl" mask we wear to survive and succeed in society. It is the compromise between the individual and society as to what a person should appear to be.',
        pathology: 'Over-identification with the Persona (living entirely for the resume, the title, the social media feed). Believing you actually ARE the mask you wear.',
        shadow: 'Everything that doesn\'t fit the Persona gets violently shoved into the Shadow.',
        neurology: 'The prefrontal cortex managing social behavior, inhibition, and rule-following governed by mirror neurons assessing peer approval.',
        archetype: 'The Actor, The Diplomat, The Good Citizen.',
        trauma: 'The severe narcissistic wounding of needing to be perfect to earn basic love, resulting in a calcified, impenetrable "False Self."',
        development: 'Dominates the first half of life (ages 0-35) when establishing career and family is biologically paramount.',
        culturalLens: 'Modern society almost entirely rewards the Persona while actively punishing authentic emotional vulnerability.',
        practices: ['Removing the mask in therapy', 'Noticing when you are performing vs. being valid'],
        color: '#3498DB'
      },
      {
        name: 'The Ego',
        subtitle: 'The Conscious "I"',
        description: 'The center of the field of consciousness. The complex of ideas and memories that constitutes your personal identity. It is the fragile captain of the ship.',
        pathology: 'Ego-inflation (believing it is the master of the psyche rather than a servant) or Ego-collapse (psychosis/dissociation).',
        shadow: 'The terror of losing control; the ego hates the unconscious because it cannot manage it.',
        neurology: 'The Default Mode Network creating the autobiographical narrative and the unified sense of subjective identity.',
        archetype: 'The Captain, The Sovereign, The Rationalist.',
        trauma: 'A fragile ego shatters under trauma. Healing is not destroying the ego, but making it flexible enough to bend without breaking.',
        development: 'Consolidates in adolescence, usually requiring rebellion against parents to forge distinct boundaries.',
        culturalLens: 'Western philosophy (Descartes) incorrectly assumed the Ego WAS the entirety of the mind.',
        practices: ['Ego-strengthening (first half of life)', 'Ego-surrender (second half of life)'],
        color: '#E67E22'
      },
      {
        name: 'The Personal Unconscious',
        subtitle: 'Forgotten & Repressed Material',
        description: 'Contains temporarily forgotten information and repressed memories spanning one\'s lifetime. Experiences that were too painful or culturally unacceptable are shoved here.',
        pathology: 'The formation of "Complexes" (e.g., mother complex, inferiority complex)—autonomous splinter-personalities that hijack the ego when triggered.',
        shadow: 'This entire layer is essentially the personal shadow—the dark attic of the mind.',
        neurology: 'Implicit memory networks, amygdala trauma loops, and the hippocampus failing to properly contextualize painful memories.',
        archetype: 'The Attic, The Basement, The Dark Forest.',
        trauma: 'The literal storage vault of all unresolved childhood abuse, neglect, and overwhelming shock.',
        development: 'Accumulates constantly from birth onward based on what the environment punishes or ignores.',
        culturalLens: 'Freud stopped his entire psychological theory at this specific layer, believing it to be the bottom.',
        practices: ['Dream journaling', 'Free association', 'EMDR or somatic experiencing'],
        color: '#2C3E50'
      },
      {
        name: 'The Shadow',
        subtitle: 'The Dark / Hidden Self',
        description: 'The specific elements of the personal unconscious that the ego vehemently rejects. The greedy, lustful, angry, or cowardly parts. BUT, it also contains "gold"—unlived creative potential.',
        pathology: 'Projection. We project our own shadow onto others (scapegoating, demonizing political opponents, paranoiac suspicion).',
        shadow: 'The Shadow IS the Shadow. "That which we do not bring to consciousness appears in our lives as fate." (Jung)',
        neurology: 'Suppressed limbic/hypothalamic drives heavily inhibited by the prefrontal cortex until alcohol or stress lowers the gates.',
        archetype: 'The Monster, The Demon, Mr. Hyde.',
        trauma: 'The Shadow forms precisely around the wounds inflicted by parents and society; it barks to protect the injured child.',
        development: 'Individuation cannot begin until the Shadow is faced and integrated during the mid-life crisis.',
        culturalLens: 'Collective Shadows drive war, genocide, and systemic racism by projecting an entire culture\'s evil onto an out-group.',
        practices: ['Recognizing your own projections', 'Owning your capacity for cruelty', 'Active Imagination'],
        color: '#8E44AD'
      },
      {
        name: 'Anima / Animus',
        subtitle: 'The Soul Image / Contra-Sexual',
        description: 'The unconscious feminine side of a man (Anima) or the masculine side of a woman (Animus). It acts as the bridge/psychopomp to the deeper Collective Unconscious.',
        pathology: 'Anima possession (a man becomes moody, hypersensitive, and resentful) or Animus possession (a woman becomes fiercely dogmatic, rigid, and argumentative).',
        shadow: 'Romantic projection; falling madly "in love" is often just projecting your own Anima/Animus onto a blank human screen.',
        neurology: 'The necessary integration of the right (holistic/feeling) and left (analytic/doing) hemispheres.',
        archetype: 'The Prince/Princess, The Muse, The Witch, The Wise Man.',
        trauma: 'Dysfunctional relationships with the opposite-sex parent that warp the soul-image, leading to toxic romantic patterns (e.g., the Madonna/Whore complex).',
        development: 'Integrated late in life. Requires men to embrace feeling/vulnerability, and women to embrace logos/authority.',
        culturalLens: 'Gender norms severely damage this layer by demanding absolute polarization instead of inner wholeness.',
        practices: ['Dialoguing with the soul figure in dreams', 'Withdrawing romantic projections'],
        color: '#B82A54'
      },
      {
        name: 'The Collective Unconscious',
        subtitle: 'The Objective Psyche / Ancestral Memory',
        description: 'Jung\'s most radical contribution. The deepest layer of the psyche, inherited rather than personally acquired. It contains the Archetypes—universal, primordial patterns of human experience.',
        pathology: 'Psychosis (when the ego is completely swallowed by an archetype, believing it IS Jesus or the Devil).',
        shadow: 'The terrifying, sublime, overwhelming power of mythic forces that operate completely autonomously from human will.',
        neurology: 'The genetically inherited structure of the human brain shaped by millions of years of evolutionary pressure to recognize predators, mothers, and mates.',
        archetype: 'The Ocean, The Underworld, Mount Olympus.',
        trauma: 'Experiencing events that echo deep mythic wounds (e.g., the Flood, the End of the World).',
        development: 'Always present, but the ego usually remains blissfully unaware of it until a major crisis shatters the personal layers.',
        culturalLens: 'Myths, fairy tales, and blockbuster movies are the spontaneous cultural expressions of the Collective Unconscious.',
        practices: ['Studying mythology', 'Deep active imagination', 'Sandplay therapy'],
        color: '#1ABC9C'
      },
      {
        name: 'The Self',
        subtitle: 'The Wholeness / God-Image',
        description: 'The organizing center and totality of the entire psyche (conscious and unconscious). The ultimate goal of Individuation. It is the transcendent "God-image" within.',
        pathology: 'Inflation (the ego mistakenly believes IT is the Self, creating gurus and tyrants).',
        shadow: 'The realization that the Self includes radical evil just as much as profound good.',
        neurology: 'Global brain synchrony and transcendent states of unified consciousness where the Default Mode Network dissolves.',
        archetype: 'The Mandala, The Sun, Christ/Buddha.',
        trauma: 'The Self is the unbreakable diamond core that remains intact beneath all trauma, orchestrating the healing process through dreams.',
        development: 'The lifelong, never-fully-completed process of Individuation.',
        culturalLens: 'Corresponds exactly to the Atman in Hinduism or the Buddha-Nature.',
        practices: ['Following the guidance of dreams', 'Mandala drawing', 'Surrendering the Ego to the Self'],
        color: '#E74C3C'
      }
    ]
  },

  // ── FREUDIAN PSYCHOANALYSIS ──
  {
    id: 'freud',
    name: 'Freudian',
    fullName: 'Classical Psychoanalysis (Sigmund Freud)',
    tradition: 'western',
    year: 1900,
    hue: 0,
    description: 'The foundational model of modern Western therapy. Freud shocked the Victorian world by positing that humans are not rational creatures, but animals driven by powerful, unconscious sexual (Eros) and destructive (Thanatos) instincts. Civilized behavior is merely a fragile lid kept tightly on this boiling cauldron of repressed drives.',
    thinkers: ['Sigmund Freud', 'Anna Freud', 'Jacques Lacan', 'Melanie Klein'],
    layers: [
      {
        name: 'The Id (Es)',
        subtitle: 'Primal Drives / Pleasure Principle',
        description: 'The oldest, entirely unconscious part of the mind. It contains the libido (sexual/life drive) and the death drive (Thanatos/aggression). It wants immediate gratification right now, with zero regard for reality or morality.',
        pathology: 'Pschopathy, severe addiction, and acts of explosive, uninhibited violence or sexual deviance.',
        shadow: 'The Id is essentially pure shadow; the chaotic, terrifying core of human biology.',
        neurology: 'The brainstem, hypothalamus, and the most primitive dopaminergic reward pathways.',
        archetype: 'The Beast, The Infant, The Devourer.',
        trauma: 'The Id knows no trauma, only frustration. Trauma occurs when the Ego cannot bind the massive energy the Id releases during shock.',
        development: 'The only part of the psyche present at birth. The infant is pure Id.',
        culturalLens: 'Capitalism thrives by directly stimulating the Id while systematically bypassing the Superego\'s restraint.',
        practices: ['Deep psychoanalysis to bring the unconscious to light', 'Catharsis (releasing bound energy)'],
        color: '#C0392B'
      },
      {
        name: 'The Ego (Ich)',
        subtitle: 'Reality Principle / The Executor',
        description: 'Develops out of the Id to interact with the real world. The Ego tries to satisfy the Id\'s insane demands in a safe, socially acceptable, realistic way. It is the anxious manager trapped between the Id, the Superego, and external reality.',
        pathology: 'Neurosis. The Ego expends so much energy holding down the Id (repression) that it develops hysterical symptoms, anxiety, or depression.',
        shadow: 'Defense mechanisms: Denial, Projection, Sublimation, Reaction Formation. The Ego lies to itself constantly to survive the tension.',
        neurology: 'The prefrontal cortex navigating complex, delayed-reward environments.',
        archetype: 'The Juggler, The Mediator, The Diplomat.',
        trauma: 'Trauma overwhelms the Ego\'s defenses, causing Regression (reverting to an earlier, safer developmental stage).',
        development: 'Develops between ages 1-3 (the Anal stage) as the child learns bowel control and interaction with reality.',
        culturalLens: 'The Ego is the "civilized" citizen who goes to work instead of acting out sexual or violent urges.',
        practices: ['Strengthening the Ego through analysis ("Where Id was, there Ego shall be")'],
        color: '#E67E22'
      },
      {
        name: 'The Superego (Über-Ich)',
        subtitle: 'Morality / The Inner Critic',
        description: 'The internalized voice of parents, society, and authority figures. It enforces moral rules through the brutal mechanism of Guilt. It is just as irrational and demanding as the Id, but drives toward absolute, impossible perfection rather than pleasure.',
        pathology: 'Severe, crippling depression (melancholia), OCD, and religious flagellation. A tyrannical Superego will literally torture the Ego to death through suicide as punishment for "sin."',
        shadow: 'The Superego often disguises pure sadism (Thanatos) as "high morality," punishing oneself and others under the banner of righteousness.',
        neurology: 'The medial prefrontal cortex integrating social norms, shame, and right-hemisphere inhibitory controls.',
        archetype: 'The Punishing Father, The Judge, The Inquisitor.',
        trauma: 'Authoritarian parenting internalizes as a vicious, unrelenting inner critic that traumatizes the individual from the inside out.',
        development: 'Develops around ages 3-6 (Phallic stage), resolving the Oedipus complex by identifying with the same-sex parent.',
        culturalLens: 'Religious fundamentalism and severe puritanical cultures are collective Superego structures.',
        practices: ['Analyzing and softening the punitive inner critic', 'Tracing guilt back to its childhood origins'],
        color: '#3498DB'
      }
    ]
  },

  // ── ERIKSON'S PSYCHOSOCIAL STAGES ──
  {
    id: 'erikson',
    name: 'Erikson',
    fullName: 'Psychosocial Development (Erik Erikson)',
    tradition: 'western',
    year: 1950,
    hue: 200,
    description: 'Erikson revolutionized psychology by stating that development does not end at puberty (as Freud thought), but continues across the entire lifespan. Each of his eight stages centers on a specific psychosocial crisis that must be resolved. Successful resolution results in a specific "virtue" or strength.',
    thinkers: ['Erik Erikson', 'Joan Erikson', 'James Marcia'],
    layers: [
      {
        name: 'Trust vs. Mistrust',
        subtitle: 'Infancy (0-1.5 yrs) | Virtue: Hope',
        description: 'The infant depends entirely on caregivers. Consistent, loving care builds basic trust in the world. Inconsistent care builds fearful mistrust.',
        pathology: 'Severe attachment disorders, paranoia, and the inability to form relationships in adulthood.',
        shadow: 'The deep, existential terror of the void; the feeling that the universe is fundamentally hostile.',
        neurology: 'The development of the vagus nerve and oxytocin receptor density based on early skin-to-skin contact.',
        archetype: 'The Nursling, The Mother.',
        trauma: 'Early childhood neglect completely wires the brain for chronic hypervigilance (Mistrust).',
        development: 'The foundational stage; without Trust, all higher stages are built on sand.',
        culturalLens: 'Societies with high maternal support/leave policy structurally facilitate Trust.',
        practices: ['Reparenting the inner child', 'Somatic attachment therapy'],
        color: '#E74C3C'
      },
      {
        name: 'Autonomy vs. Shame',
        subtitle: 'Early Childhood (1.5-3 yrs) | Virtue: Will',
        description: 'The child learns to control their body (potty training) and exert their will ("No!"). Success leads to self-confidence; harsh restriction leads to shame and self-doubt.',
        pathology: 'Compulsive perfectionism, chronic self-doubt, eating disorders, and deep-seated toxic shame.',
        shadow: 'The terrified child trying desperately to hide their perceived flaws from a judging world.',
        neurology: 'Maturation of the motor cortex and early inhibitory circuits (sphincter control translating into psychic control).',
        archetype: 'The Toddler, The Rebel.',
        trauma: 'Shaming a child for natural bodily functions deeply embeds trauma into the somatic layers.',
        development: 'The birth of the independent "Will."',
        culturalLens: 'Cultures that use shame as the primary socializing tool create highly compliant but anxious populations.',
        practices: ['Boundary setting', 'Shame resilience work (Brené Brown)'],
        color: '#E67E22'
      },
      {
        name: 'Initiative vs. Guilt',
        subtitle: 'Play Age (3-5 yrs) | Virtue: Purpose',
        description: 'Children begin directing play and social interactions. If encouraged, they develop a sense of purpose. If punished or overly controlled, they develop paralyzing guilt.',
        pathology: 'Inhibition, impotence, and the inability to start projects or take risks in life due to fear of doing it "wrong."',
        shadow: 'The tyrannical inner critic (Superego) emerges here, shutting down all spontaneous joy to maintain safety.',
        neurology: 'Prefrontal cortex expansion allowing for imaginative play, foresight, and complex goal-setting.',
        archetype: 'The Explorer, The Emperor.',
        trauma: 'Punishing innocent exploration as "naughty" wires the brain to associate taking action with punishment.',
        development: 'The shift from physical control to social/creative control.',
        culturalLens: 'Authoritarian schooling systems actively crush Initiative and replace it with Guilt and compliance.',
        practices: ['Encouraging safe risk-taking', 'Inner child play therapy'],
        color: '#F1C40F'
      },
      {
        name: 'Industry vs. Inferiority',
        subtitle: 'School Age (5-12 yrs) | Virtue: Competence',
        description: 'Children learn to read, write, and do complex tasks. They compare themselves to peers. Success brings a sense of industry (competence); failure brings deep inferiority.',
        pathology: 'Imposter syndrome, chronic underachieving, or becoming a hyper-competitive workaholic to mask worthlessness.',
        shadow: 'The deep-seated belief that "I am permanently broken or stupider than everyone else."',
        neurology: 'Myelination of nerve pathways allowing for sustained focus on complex cognitive tasks (reading/math).',
        archetype: 'The Apprentice, The Student.',
        trauma: 'Bullying from peers or teachers can permanently devastate self-esteem at this vulnerable stage.',
        development: 'The acquisition of culturally valued skills.',
        culturalLens: 'Capitalism equates human worth entirely with Industry, abandoning those who learn differently to Inferiority.',
        practices: ['Skill building', 'Finding your unique area of competence rather than competing where you are weak'],
        color: '#2ECC71'
      },
      {
        name: 'Identity vs. Role Confusion',
        subtitle: 'Adolescence (12-18 yrs) | Virtue: Fidelity',
        description: 'The classic "Who am I?" crisis. The teen must synthesize past identities into a coherent adult self. Failure leads to role confusion, constantly adopting new personas, or joining cults/gangs to find an identity.',
        pathology: 'Borderline personality traits (unstable self-image), chronic chameleon-behavior, or adopting a "negative identity" (deliberately becoming what society hates).',
        shadow: 'The terrifying abyss of having no center. "If I am not my parents\' child, who am I?"',
        neurology: 'Massive synaptic pruning and prefrontal remodeling; the brain is literally physically rebuilding its identity circuits.',
        archetype: 'The Seeker, The Hero preparing for the journey.',
        trauma: 'Abuse here splinters the identity into fragments (Dissociative Identity Disorder in extreme cases).',
        development: 'The necessary "moratorium"—a timeout to explore identities without committing.',
        culturalLens: 'Modernity provides infinite choices but very few solid initiation rites, massively increasing Role Confusion.',
        practices: ['Identity exploration safely without judgment', 'Values clarification'],
        color: '#3498DB'
      },
      {
        name: 'Intimacy vs. Isolation',
        subtitle: 'Young Adult (18-40 yrs) | Virtue: Love',
        description: 'Once identity is somewhat stable, the challenge is merging it with another person in deep intimacy. Failure leads to profound loneliness and emotional isolation.',
        pathology: 'Avoidant or anxious attachment styles, serial shallow relationships, or extreme, bitter isolation (incel culture).',
        shadow: 'The fear that if anyone truly sees the raw, unmasked self, they will flee in horror.',
        neurology: 'Oxytocin networks bonding long-term romantic and platonic pair-bonds.',
        archetype: 'The Lover, The Partner.',
        trauma: 'Betrayal or heartbreak here can cause the Ego to permanently build walls, choosing safe Isolation over dangerous Love.',
        development: 'Requires a strong prior Identity, otherwise Intimacy just becomes codependent merging.',
        culturalLens: 'The digital age has paradoxically created the most connected, yet deeply isolated generation in human history.',
        practices: ['Vulnerability practice', 'Couples therapy', 'Learning to be alone without being lonely'],
        color: '#8E44AD'
      },
      {
        name: 'Generativity vs. Stagnation',
        subtitle: 'Middle Adulthood (40-65 yrs) | Virtue: Care',
        description: 'The need to create or nurture things that will outlast you (children, art, companies, mentoring). Failure leads to stagnation, mid-life crises, and self-absorption.',
        pathology: 'The pathetic attempt to infinitely prolong youth (sports cars, affairs) due to the terror of moving into elderhood.',
        shadow: 'The bitter realization that one\'s life has been trivial, leading to resentment of the young.',
        neurology: 'A shift in dopamine rewards from personal acquisition to pro-social, protective behaviors for the next generation.',
        archetype: 'The King/Queen, The Mentor, The Mother/Father.',
        trauma: 'Infertility or the loss of a child/legacy project can severely stunt Generativity.',
        development: 'The shift from "What can I get?" to "What can I give back?"',
        culturalLens: 'A society run by stagnant, power-hoarding leaders destroys the future out of narcissistic greed.',
        practices: ['Mentorship', 'Parenting', 'Creating enduring legacy work'],
        color: '#9B59B6'
      },
      {
        name: 'Integrity vs. Despair',
        subtitle: 'Late Adulthood (65+ yrs) | Virtue: Wisdom',
        description: 'Looking back on life. If one feels they lived a fully authentic life, they achieve Integrity (wholeness) and face death without fear. If they live in regret for what wasn\'t done, they fall into deep Despair.',
        pathology: 'Bitter, sour old age. The absolute terror of death because the life wasn\'t fully lived. "It is not death that a man should fear, but he should fear never beginning to live" (Marcus Aurelius).',
        shadow: 'The unlived life rising up as ghosts of missed opportunity at the end of the road.',
        neurology: 'Cognitive decline is mitigated by a strong sense of purpose; wisdom is neurologically mapped as high integration and low reactivity.',
        archetype: 'The Wise Elder, The Crone, The Senex.',
        trauma: 'The realization that time is up, and there is no way to go back and fix the mistakes.',
        development: 'The final integration of the entire ego before its dissolution in death.',
        culturalLens: 'Western cultures hide death and warehouse the elderly, robbing them of their role as Wisdom-keepers.',
        practices: ['Life review therapy', 'Making peace with enemies', 'Accepting mortality'],
        color: '#BDC3C7'
      }
    ]
  },

  // ── FUNCTIONAL ARCHITECTURE (SYSTEM 1 / SYSTEM 2) ──
  {
    id: 'functional',
    name: 'Functional',
    fullName: 'Functional Architecture (Kahneman / Triune)',
    tradition: 'western',
    year: 2011,
    hue: 150,
    description: 'A synthesis of modern neuroscience, evolutionary biology, and Daniel Kahneman\'s cognitive psychology ("Thinking, Fast and Slow"). This framework strips away all mysticism and analyzes the mind purely as a biological, information-processing survival machine shaped by millions of years of natural selection.',
    thinkers: ['Daniel Kahneman', 'Amos Tversky', 'Paul MacLean', 'Jonathan Haidt', 'Antonio Damasio'],
    layers: [
      {
        name: 'The Reptilian Brain',
        subtitle: 'Brainstem & Basal Ganglia',
        description: 'The oldest hardware. It manages autonomic functions (heart rate, breathing), territoriality, aggression, and strict routines. It is cold, incredibly fast, and operates entirely outside conscious awareness.',
        pathology: 'Pure, compulsive survival behavior. Territorial violence, hoarding, and extreme physiological panic attacks.',
        shadow: 'The cold, reptilian indifference to suffering that overrides all higher morality when starvation or extreme threat is present.',
        neurology: 'The literal Brainstem and Basal ganglia.',
        archetype: 'The Crocodile, The Machine, The Foundation.',
        trauma: 'The "Freeze" response; the deepest, oldest trauma reflex when fight or flight have failed.',
        development: 'The very first neural structures to form in utero.',
        culturalLens: 'A culture operating purely on fear and resource-scarcity drops immediately back to this reptilian baseline.',
        practices: ['Somatic tracking', 'Diaphragmatic breathing to signal safety to the brainstem'],
        color: '#27AE60'
      },
      {
        name: 'The Mammalian Brain',
        subtitle: 'The Limbic System',
        description: 'The emotional center. It generated the capacity for mammalian attachment, play, maternal care, anxiety, and social hierarchy. It remembers everything emotionally charged.',
        pathology: 'Severe emotional dysregulation, borderline personality disorder, severe attachment anxiety, and rage.',
        shadow: 'The uncontrollable, crying inner child or the shrieking monkey that ruins the rational plans of the neocortex.',
        neurology: 'The Amygdala (fear/salience), Hippocampus (memory), and Hypothalamus (hormones).',
        archetype: 'The Wolf Pack, The Inner Child, The Mother.',
        trauma: 'The primary storage vault for PTSD. It does not know time; to the amygdala, the past trauma is happening *right now*.',
        development: 'The dominant operating system of the infant and toddler.',
        culturalLens: 'Social media algorithms specifically hack the mammalian limbic system to generate addiction via outrage and social-status validation.',
        practices: ['Emotional regulation techniques', 'Attachment-based therapy (EFT)'],
        color: '#F39C12'
      },
      {
        name: 'System 1',
        subtitle: 'Fast, Automatic, Intuitive',
        description: 'Kahneman\'s concept. System 1 operates automatically and quickly, with little or no effort and no sense of voluntary control. It relies heavily on heuristics (shortcuts) and biases. Jonathan Haidt calls it the "Elephant."',
        pathology: 'Cognitive biases (Confirmation bias, availability heuristic). System 1 jumps jump to conclusions, stereotypes instantly, and frequently miscalculates statistics.',
        shadow: 'The illusion that our intuition is always right. The "gut feeling" is often just a stored prejudice or a statistical error.',
        neurology: 'Procedural memory networks and heavily myelinated pathways executing pre-programmed behavioral scripts.',
        archetype: 'The Elephant, The Autopilot.',
        trauma: 'System 1 executes trauma responses automatically before System 2 even realizes a threat was present (e.g., ducking at a loud noise).',
        development: 'Built over time as System 2 slowly masters tasks (like driving) and pushes them down into System 1 automaticity.',
        culturalLens: 'Marketing and propaganda almost exclusively target System 1, bypassing critical thought entirely.',
        practices: ['Noticing your own cognitive biases', 'Slowing down before making major decisions', 'De-conditioning implicit bias'],
        color: '#E67E22'
      },
      {
        name: 'System 2',
        subtitle: 'Slow, Deliberate, Logical',
        description: 'The conscious, reasoning self. System 2 allocates attention to the effortful mental activities that demand it, including complex computations. It is the "Rider" on the Elephant. However, it is fundamentally lazy and easily depleted (ego depletion).',
        pathology: 'Analysis paralysis. Overthinking. Or conversely, the failure of System 2 to ever engage, leaving the person entirely at the mercy of System 1 impulses and fake news.',
        shadow: 'System 2 often acts not as an objective scientist, but as a PR lawyer—inventing rational explanations (rationalizations) for emotional decisions already made by System 1.',
        neurology: 'The Prefrontal Cortex and executive function networks. It requires massive amounts of glucose to operate.',
        archetype: 'The Rider, The Analyst, The Auditor.',
        trauma: 'System 2 completely shuts down during traumatic events (the speech center goes offline), which is why trauma cannot be simply "thought" through rationally.',
        development: 'Matures completely around age 25 when the prefrontal cortex finishes myelination.',
        culturalLens: 'The Enlightenment was the attempt to build a civilization entirely around System 2, severely underestimating the power of System 1.',
        practices: ['Critical thinking exercises', 'Math and logic', 'Mindfulness to strengthen the capacity to pause the Elephant'],
        color: '#3498DB'
      }
    ]
  }
];
