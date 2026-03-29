// ============================================================
// SUPPLEMENTARY DATA
// Archetypes, Dark Night stages, Trauma types, Relationship dynamics, Resources
// ============================================================
window.PsycheData = window.PsycheData || {};

// ── JUNGIAN ARCHETYPES ──
window.PsycheData.archetypes = [
  {
    name: 'The Hero',
    subtitle: 'The Dragon Slayer',
    description: 'The archetype of courage, self-sacrifice, and the journey into the unknown. The Hero ventures into darkness and returns transformed. Every culture has hero myths because this pattern is hardwired into the psyche.',
    shadowAspect: 'The Hero\'s shadow is the Tyrant — power without wisdom. Or the Coward — avoiding the call entirely. The hero who never stops conquering becomes a destroyer.',
    culturalExamples: ['Odysseus (Greek)', 'Arjuna (Hindu)', 'Luke Skywalker (Modern)', 'Moses (Jewish)', 'Sundiata (West African)'],
    frameworkConnections: { jungian: 'Ego development', freudian: 'Ego strength', buddhist: 'Right Effort', greek: 'Thymos' },
    reflections: ['What is your hero\'s journey right now?', 'What dragon are you avoiding?', 'When has your heroism become tyranny?'],
    books: ['The Hero with a Thousand Faces — Joseph Campbell', 'King, Warrior, Magician, Lover — Robert Moore']
  },
  {
    name: 'The Shadow',
    subtitle: 'The Dark Double',
    description: 'Everything the conscious personality rejects, ignores, or cannot see about itself. The Shadow is not evil — it is everything unlived. It contains both destructive AND creative potential.',
    shadowAspect: 'The Shadow\'s shadow is gold — repressed vitality, creativity, and power. "The shadow is 90% gold" — Jung. What you reject may be what you most need.',
    culturalExamples: ['Mr. Hyde (Western)', 'Set (Egyptian)', 'Loki (Norse)', 'The Doppelgänger (Gothic)', 'Mara (Buddhist)'],
    frameworkConnections: { jungian: 'Shadow archetype', freudian: 'The Repressed/Id', yoruba: 'Ojiji', aztec: 'Ihíyotl' },
    reflections: ['What do you most condemn in others?', 'What would your shadow say if it could speak?', 'What gold lies buried in your darkness?'],
    books: ['Owning Your Own Shadow — Robert Johnson', 'Meeting the Shadow — Connie Zweig']
  },
  {
    name: 'The Trickster',
    subtitle: 'The Sacred Fool',
    description: 'The archetype that breaks rules, crosses boundaries, and introduces chaos into rigid systems. The Trickster is amoral, creative, and transformative. Without the Trickster, cultures stagnate. With too much, they collapse.',
    shadowAspect: 'The Trickster\'s shadow is the Con Artist — deception without purpose. Or the Nihilist — destruction without creation. Trickster energy uncontained becomes sociopathy.',
    culturalExamples: ['Coyote (Native American)', 'Anansi (West African)', 'Hermes (Greek)', 'Loki (Norse)', 'The Joker (Modern)'],
    frameworkConnections: { jungian: 'Trickster archetype', functional: 'System 1 shortcuts', daoist: 'Wu Wei as play' },
    reflections: ['Where do you need more trickster energy?', 'When does your humor become cruelty?', 'What rules need breaking in your life?'],
    books: ['Trickster Makes This World — Lewis Hyde', 'The Trickster and the Paranormal — George Hansen']
  },
  {
    name: 'Anima / Animus',
    subtitle: 'The Soul Guide',
    description: 'The contrasexual archetype — the inner feminine in men (Anima) and inner masculine in women (Animus). Serves as a bridge to the unconscious and appears as the fascinating, alluring "other."',
    shadowAspect: 'Negative Anima: moodiness, sentimentality, passive-aggression, "siren" seduction. Negative Animus: rigid opinions, cutting criticism, "possession" by ideas.',
    culturalExamples: ['Beatrice for Dante', 'Sophia/Wisdom tradition', 'Shakti/Shiva (Hindu)', 'Romeo/Juliet as mutual projection'],
    frameworkConnections: { jungian: 'Anima/Animus', vedantic: 'Manomaya (desire mind)', sufi: 'The Beloved' },
    reflections: ['Who do you fall in love with? That\'s your anima/animus projection.', 'What qualities of the opposite sex do you reject in yourself?'],
    books: ['He/She/We — Robert Johnson', 'The Invisible Partners — John Sanford']
  },
  {
    name: 'The Wise Old Man',
    subtitle: 'The Sage / Senex',
    description: 'The archetype of wisdom, guidance, and meaning. Appears as the mentor, guru, or wise elder offering crucial guidance at moments of crisis. Represents accumulated knowledge and the capacity for deep understanding.',
    shadowAspect: 'The shadow of the Wise Old Man is the Authoritarian or Dogmatist — wisdom that has ossified into rigid doctrine. Also the helpless old fool — wisdom without power.',
    culturalExamples: ['Gandalf (Western)', 'Obi-Wan Kenobi (Modern)', 'Merlin (Arthurian)', 'Confucius', 'Tiresias (Greek)'],
    frameworkConnections: { jungian: 'Self approaching ego', erikson: 'Integrity stage', greek: 'Nous', kabbalistic: 'Chokmah' },
    reflections: ['Who has been your wise elder?', 'Where has wisdom become rigidity?', 'What wisdom do you need to share?'],
    books: ['Puer Aeternus — Marie-Louise von Franz', 'The Fisher King and the Handless Maiden — Robert Johnson']
  },
  {
    name: 'The Great Mother',
    subtitle: 'The Source & Devourer',
    description: 'The archetype of nurturing, fertility, creation — and also destruction, devouring, and death. The Great Mother gives life and takes it back. She is the womb and the tomb. Every creation myth begins with her.',
    shadowAspect: 'The Devouring Mother — overprotection that prevents growth. Smothering love that creates dependency. The child who never leaves the mother never becomes themselves.',
    culturalExamples: ['Kali (Hindu)', 'Demeter/Persephone (Greek)', 'Pachamama (Andean)', 'Virgin Mary (Christian)', 'Yemoja (Yoruba)'],
    frameworkConnections: { jungian: 'Great Mother archetype', erikson: 'Trust stage', bantu: 'NTU as source', vedantic: 'Prakriti' },
    reflections: ['What is your relationship with the maternal?', 'Where have you been overprotected? Under-nurtured?', 'How do you nurture and devour?'],
    books: ['The Great Mother — Erich Neumann', 'Women Who Run With the Wolves — Clarissa Pinkola Estés']
  },
  {
    name: 'The Child',
    subtitle: 'The Divine Child / Puer',
    description: 'The archetype of new beginnings, innocence, potential, and futurity. The divine child carries the promise of renewal. Spontaneous, creative, full of wonder — but also vulnerable and dependent.',
    shadowAspect: 'The Eternal Child (Puer Aeternus) — refusal to grow up. Peter Pan syndrome. Charming but irresponsible, creative but unable to commit. Endless potential never actualized.',
    culturalExamples: ['Christ child', 'Krishna as child', 'Horus child (Egyptian)', 'Moses in the bulrushes', 'The Little Prince'],
    frameworkConnections: { jungian: 'Puer/Puella', erikson: 'Trust/Initiative stages', nativeamerican: 'South direction', daoist: 'Return to simplicity' },
    reflections: ['Where is the divine child alive in you?', 'Where have you refused to grow up?', 'What wonder have you lost?'],
    books: ['The Problem of the Puer Aeternus — Marie-Louise von Franz', 'The Little Prince — Antoine de Saint-Exupéry']
  },
  {
    name: 'The Self',
    subtitle: 'The God-Image / Wholeness',
    description: 'The central archetype — the organizing principle of the entire psyche. Not the ego but the totality. Manifests in mandala symbols, divine figures, and experiences of profound wholeness. The goal and the ground of individuation.',
    shadowAspect: 'Inflation — the ego identifies with the Self and becomes grandiose, messianic. The shadow of wholeness is the belief that one has achieved it.',
    culturalExamples: ['The Mandala (universal)', 'The Philosopher\'s Stone (Alchemy)', 'Christ/Buddha as Self symbol', 'The Cosmic Egg'],
    frameworkConnections: { jungian: 'Self archetype', vedantic: 'Atman', kabbalistic: 'Keter/Tiferet axis', sufi: 'Nafs al-Safiya' },
    books: ['Aion — Carl Jung', 'The Self in Jungian Psychology — Edward Edinger']
  },
  {
    name: 'The Persona',
    subtitle: 'The Mask / Social Interface',
    description: 'The "Social Mask" we wear to navigate the world. It is the compromise between the individual and society. A necessary tool for social functioning, but dangerous if the ego identifies too strongly with it, losing touch with the genuine inner self.',
    shadowAspect: 'The "Hollow Man" or "Imposter Syndrome": When the mask is all that remains, and the individual feels like a fraud with no solid core beneath the social performance.',
    culturalExamples: ['The Uniform (Universal)', 'Social Media Profiles', 'The Courtier', 'The Professional Identity'],
    frameworkConnections: { jungian: 'Persona / Mask', sociology: 'Impression Management', sufism: 'The Mirrored Nafs' },
    reflections: ['Which mask are you wearing right now?', 'Who are you when no one is watching?', 'Where has your mask become a cage?'],
    books: ['The Presentation of Self in Everyday Life — Erving Goffman', 'Two Essays on Analytical Psychology — Jung']
  },
  {
    name: 'The Outcast',
    subtitle: 'The Scapegoat / Wanderer',
    description: 'The archetype of the one who does not fit in, carrying the rejected qualities of the group. The Outcast represents the necessity of leaving the familiar to find a deeper truth. Often carries the "Prophetic Voice" that the collective refuses to hear.',
    shadowAspect: 'The "Eternal Victim" or the "Bitter Hermit": Turning the pain of exclusion into a permanent identity of resentment, or attacking the group that one secretly longs to join.',
    culturalExamples: ['The Scapegoat (Biblical)', 'Cain', 'Frankenstein\'s Monster', 'The Ronin (Japanese)', 'The Leper'],
    frameworkConnections: { jungian: 'Group Shadow career', sociology: 'Social Deviance', biblical: 'The Wilderness' },
    reflections: ['What part of you has been cast out?', 'What truth does the group refuse to hear from you?', 'Is your solitude a choice or a defense?'],
    books: ['The Scapegoat — René Girard', 'The Outsider — Colin Wilson']
  }
];

// ── DARK NIGHT OF THE SOUL STAGES ──
window.PsycheData.darkNight = {
  description: 'The "Dark Night of the Soul" is a transformative crisis where everything familiar dissolves. Described across traditions — it is not pathology but a necessary death-rebirth in the journey toward wholeness.',
  stages: [
    { name: 'The Call', description: 'Something shatters the old way of being. Loss, trauma, disillusionment, or spiritual awakening. The comfortable self-structure begins to crack. You can no longer live the way you lived before.', traditions: { jungian: 'Encounter with the Shadow', sufi: 'Nafs al-Lawwama awakening', buddhist: 'Seeing the First Noble Truth', greek: 'Leaving the Cave' } },
    { name: 'The Descent', description: 'Entering the underworld. Depression, confusion, loss of meaning. Old identities, beliefs, and relationships dissolve. The ego fights against this dissolution. Everything feels heavy, dark, meaningless.', traditions: { jungian: 'Nekyia (night sea journey)', sufi: 'Fana (annihilation)', buddhist: 'Dukkha nanas (insight knowledges)', aztec: 'Tonalli loss' } },
    { name: 'The Ordeal', description: 'The deepest point of the crisis. Confrontation with the worst fears, the deepest wounds. Ego death — the old self must die for the new to be born. This can feel like actual dying.', traditions: { jungian: 'Coniunctio/Nigredo', sufi: 'Night of the Heart', buddhist: 'Dissolution of self', esoteric: 'Dweller on the Threshold' } },
    { name: 'The Surrender', description: 'The turning point. Fighting stops. Acceptance of what is, including the darkness. Not resignation but genuine surrender — letting go of the need to control. Grace can enter through the crack.', traditions: { jungian: 'Submission to the Self', sufi: 'Tawakkul (trust in God)', buddhist: 'Letting go', daoist: 'Wu Wei' } },
    { name: 'The Dawn', description: 'New light begins. Not a return to the old but emergence of something genuinely new. Tentative, fragile, like a new shoot. The world looks different — same circumstances but completely transformed perception.', traditions: { jungian: 'Albedo/Rubedo', sufi: 'Nafs al-Mutma\'inna', buddhist: 'Arising and Passing', esoteric: 'Illumination' } },
    { name: 'Integration', description: 'The long work of integrating the transformed self into daily life. The dark night is not over until its gifts are embodied. Many cycle through multiple dark nights, each deeper. The spiral of growth.', traditions: { jungian: 'Individuation continues', sufi: 'Each stage deeper', buddhist: 'Ongoing practice', erikson: 'Generativity' } }
  ]
};

// ── TRAUMA CARTOGRAPHY ──
window.PsycheData.trauma = {
  description: 'Trauma maps onto the psyche\'s layers — different types of trauma affect different levels. Understanding where trauma lodges helps identify appropriate healing modalities.',
  types: [
    { name: 'Shock Trauma', layers: ['Physical Body', 'System 1', 'Ara'], description: 'Single overwhelming events — accidents, violence, disasters. Lodges in the body and nervous system. The body remembers what the mind may forget.', healing: ['Somatic Experiencing (Peter Levine)', 'EMDR', 'Breathwork', 'Vagal tone exercises'] },
    { name: 'Developmental Trauma', layers: ['Trust vs. Mistrust', 'Ego', 'Attachment'], description: 'Chronic early childhood relational failures — neglect, inconsistency, abuse. Shapes the architecture of personality itself. Not what happened but what didn\'t happen.', healing: ['Attachment-based therapy', 'Internal Family Systems', 'Reparenting work', 'Long-term relational therapy'] },
    { name: 'Complex/Relational Trauma', layers: ['Personal Unconscious', 'Shadow', 'Anima/Animus'], description: 'Prolonged relational trauma — ongoing abuse, captivity, domestic violence. Creates complex adaptations: dissociation, chronic shame, relational patterns.', healing: ['Phase-based trauma therapy', 'IFS', 'Schema Therapy', 'NARM (NeuroAffective Relational Model)'] },
    { name: 'Intergenerational Trauma', layers: ['Collective Unconscious', 'Ancestral Self', 'Ipọnrí'], description: 'Trauma transmitted across generations — epigenetically, culturally, and psychologically. Holocaust survivors\' grandchildren, slavery\'s legacy, indigenous dispossession.', healing: ['Family systems therapy', 'Ancestral healing rituals', 'Cultural reclamation', 'Narrative therapy'] },
    { name: 'Spiritual/Existential Trauma', layers: ['Self', 'Anandamaya Kosha', 'Pneuma'], description: 'The shattering of meaning systems — religious disillusionment, confrontation with evil, existential crisis. The Dark Night of the Soul as trauma response.', healing: ['Existential therapy', 'Spiritual direction', 'Logotherapy (Viktor Frankl)', 'Contemplative practice'] },
    { name: 'Collective/Cultural Trauma', layers: ['Collective Unconscious', 'Country', 'NTU'], description: 'Trauma affecting entire peoples — genocide, colonization, slavery, war. Creates cultural wounds that persist for centuries and shape collective identity.', healing: ['Truth and reconciliation processes', 'Cultural healing ceremonies', 'Collective narrative repair', 'Ubuntu-based justice'] }
  ]
};

// ── RELATIONSHIP DYNAMICS ──
window.PsycheData.relationships = {
  description: 'How different psyche layers interact between people. Relationships activate and reveal layers of the psyche that are otherwise invisible.',
  dynamics: [
    { name: 'Projection', description: 'Attributing your own unconscious qualities to another. The shadow and anima/animus are the primary projection carriers. "If you spot it, you\'ve got it."', layers: ['Shadow', 'Anima/Animus', 'Personal Unconscious'], example: 'Falling madly in love is often anima/animus projection. Intense hatred is often shadow projection.' },
    { name: 'Transference', description: 'Displacing feelings from past relationships onto present ones. The template created by early caregivers shapes all subsequent relationships.', layers: ['Personal Unconscious', 'Trust vs. Mistrust', 'Ego'], example: 'Treating a boss like a parent, a therapist like a lover — the past bleeds into the present.' },
    { name: 'Mirroring', description: 'Others reflect aspects of ourselves we cannot see directly. Healthy mirroring validates; distorted mirroring creates false self.', layers: ['Persona', 'Ego', 'Self'], example: 'A good friend mirrors your strengths and blind spots. A narcissistic parent mirrors only their own needs.' },
    { name: 'Merging', description: 'Loss of boundaries between self and other. Healthy: temporary merger in intimacy, empathy. Unhealthy: codependency, loss of self.', layers: ['Intimacy vs. Isolation', 'Anandamaya Kosha', 'Nafs al-Ammara'], example: 'New love often involves merging — feeling "we are one." Healthy development requires re-differentiation.' },
    { name: 'Individuation Through Relationship', description: 'Relationships as the primary vehicle for psychological growth. The other provides the friction and mirror necessary for becoming yourself.', layers: ['Self', 'Anima/Animus', 'Tiferet'], example: 'Marriage as "the container for individuation" — the relationship holds the difficult transformation.' },
    { name: 'Archetypal Dynamics', description: 'Partners often unconsciously enact archetypal patterns: King/Queen, Parent/Child, Hero/Damsel, Pursuer/Distancer.', layers: ['Collective Unconscious', 'Archetypes', 'Persona'], example: 'A couple stuck in Parent/Child dynamic needs to access the equal partnership archetype.' }
  ]
};

// ── CURATED RESOURCES ──
window.PsycheData.resources = {
  byTopic: [
    { topic: 'Shadow Work', books: ['Owning Your Own Shadow — Robert Johnson', 'Meeting the Shadow — Zweig & Abrams', 'A Little Book on the Human Shadow — Robert Bly'], practices: ['Shadow journaling', 'Projection tracking', '3-2-1 shadow process (Ken Wilber)'], thinkers: ['Carl Jung', 'Robert Johnson', 'Connie Zweig'] },
    { topic: 'Dream Work', books: ['Inner Work — Robert Johnson', 'The Interpretation of Dreams — Freud', 'Where People Fly and Water Runs Uphill — Jeremy Taylor'], practices: ['Dream journaling', 'Active imagination', 'Amplification method'], thinkers: ['Carl Jung', 'Sigmund Freud', 'James Hillman'] },
    { topic: 'Mindfulness & Meditation', books: ['The Mind Illuminated — Culadasa', 'Wherever You Go There You Are — Jon Kabat-Zinn', 'Seeing That Frees — Rob Burbea'], practices: ['Vipassana', 'Zazen', 'Loving-kindness', 'Body scan'], thinkers: ['Thich Nhat Hanh', 'Jack Kornfield', 'Pema Chödrön'] },
    { topic: 'Trauma Healing', books: ['The Body Keeps the Score — Bessel van der Kolk', 'Waking the Tiger — Peter Levine', 'Complex PTSD: From Surviving to Thriving — Pete Walker'], practices: ['Somatic experiencing', 'EMDR', 'IFS', 'Polyvagal exercises'], thinkers: ['Bessel van der Kolk', 'Peter Levine', 'Gabor Maté'] },
    { topic: 'Individuation', books: ['Man and His Symbols — Carl Jung', 'The Undiscovered Self — Carl Jung', 'Iron John — Robert Bly'], practices: ['Active imagination', 'Dream analysis', 'Creative expression', 'Therapy'], thinkers: ['Carl Jung', 'Marie-Louise von Franz', 'James Hillman'] },
    { topic: 'Cognitive Science', books: ['Thinking Fast and Slow — Daniel Kahneman', 'Predictably Irrational — Dan Ariely', 'Stumbling on Happiness — Daniel Gilbert'], practices: ['Decision journaling', 'Pre-mortem analysis', 'Calibration training'], thinkers: ['Daniel Kahneman', 'Amos Tversky', 'Herbert Simon'] },
    { topic: 'Eastern Philosophy', books: ['Tao Te Ching — Laozi', 'Dhammapada', 'Bhagavad Gita', 'The Book of Chuang Tzu'], practices: ['Meditation', 'Yoga', 'Qigong', 'Contemplative inquiry'], thinkers: ['Laozi', 'Buddha', 'Shankara', 'Ramana Maharshi'] },
    { topic: 'Mystical Traditions', books: ['The Essential Rumi — Coleman Barks', 'The Dark Night of the Soul — St. John of the Cross', 'The Zohar', 'The Cloud of Unknowing'], practices: ['Contemplative prayer', 'Sufi dhikr', 'Kabbalistic meditation', 'Centering prayer'], thinkers: ['Rumi', 'Meister Eckhart', 'Ibn Arabi', 'Teresa of Ávila'] },
    { topic: 'Indigenous Wisdom', books: ['Sand Talk — Tyson Yunkaporta', 'Braiding Sweetgrass — Robin Wall Kimmerer', 'God Is Red — Vine Deloria Jr.'], practices: ['Land-based practices', 'Ceremony', 'Storytelling', 'Community building'], thinkers: ['Tyson Yunkaporta', 'Robin Wall Kimmerer', 'Vine Deloria Jr.'] },
    { topic: 'Developmental Psychology', books: ['Childhood and Society — Erik Erikson', 'In Over Our Heads — Robert Kegan', 'The Evolving Self — Robert Kegan'], practices: ['Stage assessment', 'Growth edge work', 'Mentoring relationships'], thinkers: ['Erik Erikson', 'Robert Kegan', 'Ken Wilber'] }
  ]
};
