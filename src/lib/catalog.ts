import type {
  ArticleRow,
  HeroSlideRow,
  NavLinkRow,
  PageRow,
  SectionRow,
  Subject,
  TopicRow,
  VideoRow,
} from "@/lib/content";
import { sections as bioSections } from "@/lib/biopedia-sections";
import { buildTopicLayout } from "@/lib/article-layout";
import { HERO_SLIDES as BANNER_SLIDES } from "@/lib/hero-slides";
import { SECTION_IMAGE_KEY } from "@/lib/section-art";
import { EXTINCT_SPECIES } from "@/data/lost-atlas-species";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const SUBJECTS: Subject[] = [
  {
    id: "sub-biology",
    slug: "biology",
    title: "Life Sciences & Biological Systems",
    description:
      "Cellular biology, genetics, evolutionary theory, physiology and organismal taxonomy.",
    icon: "Sprout",
    image_key: "hero-cell",
    image_url: null,
    sort: 3,
  },
  {
    id: "sub-mathematics",
    slug: "mathematics",
    title: "Mathematics & Formal Logic",
    description: "Pure mathematics, geometry, formal proof systems and mathematical reasoning.",
    icon: "Sigma",
    image_key: "math-algebra",
    image_url: null,
    sort: 2,
  },
  {
    id: "sub-science",
    slug: "science",
    title: "Physical Sciences, Cosmology & Matter",
    description: "Physics, chemistry, cosmology and the fundamental laws governing matter and energy.",
    icon: "Atom",
    image_key: "sci-physics",
    image_url: null,
    sort: 1,
  },
  {
    id: "sub-history",
    slug: "history",
    title: "World History, Revolutions & Human Geography",
    description: "Civilizational development, historical epochs, societal change and global exchange.",
    icon: "Landmark",
    image_key: "his-ancient",
    image_url: null,
    sort: 6,
  },
  {
    id: "sub-english",
    slug: "english",
    title: "Language, Communication & Literature",
    description: "Linguistics, rhetoric, literary analysis, narrative structure and information theory.",
    icon: "BookOpen",
    image_key: "eng-literature",
    image_url: null,
    sort: 4,
  },
  {
    id: "sub-technology",
    slug: "technology",
    title: "Computer Science, AI & Cybernetics",
    description: "Algorithms, software architecture, computation theory, artificial intelligence and digital security.",
    icon: "Cpu",
    image_key: "tech-computing",
    image_url: null,
    sort: 5,
  },
  {
    id: "sub-atlas-philosophy",
    slug: "philosophy",
    title: "Philosophy, Ethics & Epistemology",
    description: "Metaphysics, moral reasoning, existentialism, political philosophy and the nature of knowledge.",
    icon: "Landmark",
    image_key: null,
    image_url: null,
    sort: 0,
  },
  {
    id: "sub-atlas-mind",
    slug: "mind",
    title: "Mind, Cognition & Human Psychology",
    description: "Perception, learning, memory, mental processes, neuroscience and behaviour.",
    icon: "Brain",
    image_key: null,
    image_url: null,
    sort: 7,
  },
  {
    id: "sub-atlas-systems",
    slug: "systems",
    title: "Systems Thinking, Networks & Emergence",
    description: "Complexity science, feedback loops, self-organisation and interconnected dynamics.",
    icon: "Network",
    image_key: null,
    image_url: null,
    sort: 8,
  },
];

/**
 * Permanent top-level subjects are always present in navigation and category views.
 * Database rows may override their metadata, and any additional database subjects are appended.
 */
export function mergeSubjectsWithCatalog(remote: Subject[] | undefined): Subject[] {
  const byId = new Map((remote ?? []).map((subject) => [subject.id, subject]));
  const permanent = SUBJECTS.map((subject) => byId.get(subject.id) ?? subject);
  const permanentIds = new Set(SUBJECTS.map((subject) => subject.id));
  const additional = (remote ?? []).filter((subject) => !permanentIds.has(subject.id));
  return [...permanent, ...additional].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
}

const extraSections: {
  subjectId: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  image_key: string;
  topics: { title: string; blurb: string }[];
}[] = [
  {
    subjectId: "sub-mathematics",
    slug: "algebra",
    title: "Algebra",
    description: "Equations, functions and the language of unknown quantities.",
    icon: "Variable",
    image_key: "math-algebra",
    topics: [
      {
        title: "Linear Equations",
        blurb: "Solving for unknowns with balance and substitution.",
      },
      {
        title: "Functions",
        blurb: "Inputs, outputs and mapping one world onto another.",
      },
      { title: "Polynomials", blurb: "Sums of powers and how they factor." },
    ],
  },
  {
    subjectId: "sub-mathematics",
    slug: "geometry",
    title: "Geometry",
    description: "Shape, space, proof and measurement.",
    icon: "Triangle",
    image_key: "math-geometry",
    topics: [
      {
        title: "Euclidean Proof",
        blurb: "Axioms, theorems and the logic of diagrams.",
      },
      {
        title: "Trigonometry",
        blurb: "Sine, cosine and the circle of ratios.",
      },
      {
        title: "Coordinate Geometry",
        blurb: "Points, lines and distance on the plane.",
      },
    ],
  },
  {
    subjectId: "sub-mathematics",
    slug: "calculus",
    title: "Calculus",
    description: "Change, accumulation and the mathematics of motion.",
    icon: "LineChart",
    image_key: "math-calculus",
    topics: [
      {
        title: "Limits",
        blurb: "Approaching a value without having to arrive.",
      },
      { title: "Derivatives", blurb: "Instantaneous rate of change." },
      {
        title: "Integrals",
        blurb: "Area, accumulation and the antiderivative.",
      },
    ],
  },
  {
    subjectId: "sub-mathematics",
    slug: "statistics",
    title: "Statistics",
    description: "Data, chance and inference under uncertainty.",
    icon: "ChartBar",
    image_key: "math-statistics",
    topics: [
      {
        title: "Distributions",
        blurb: "How values spread around a typical case.",
      },
      { title: "Sampling", blurb: "Learning about a whole from a part." },
      {
        title: "Hypothesis Tests",
        blurb: "Asking whether a difference is noise.",
      },
    ],
  },
  {
    subjectId: "sub-science",
    slug: "physics",
    title: "Physics",
    description: "Matter, energy, motion and the structure of spacetime.",
    icon: "Atom",
    image_key: "sci-physics",
    topics: [
      {
        title: "Newtonian Mechanics",
        blurb: "Force, mass and the laws of motion.",
      },
      { title: "Energy", blurb: "Work, conservation and transformation." },
      {
        title: "Waves & Light",
        blurb: "Oscillation, interference and spectra.",
      },
    ],
  },
  {
    subjectId: "sub-science",
    slug: "chemistry",
    title: "Chemistry",
    description: "Atoms, bonds, reactions and the table of elements.",
    icon: "FlaskConical",
    image_key: "sci-chemistry",
    topics: [
      {
        title: "Periodic Table",
        blurb: "Patterns of elements and their properties.",
      },
      {
        title: "Chemical Bonds",
        blurb: "Ionic, covalent and metallic attraction.",
      },
      { title: "Reactions", blurb: "Reactants, products and rates." },
    ],
  },
  {
    subjectId: "sub-science",
    slug: "earth-science",
    title: "Earth Science",
    description: "The planet as a system of rock, water, air and life.",
    icon: "Globe",
    image_key: "sci-earth",
    topics: [
      {
        title: "Plate Tectonics",
        blurb: "Moving crust and the making of mountains.",
      },
      { title: "Atmosphere", blurb: "Layers, weather and climate drivers." },
      { title: "Oceans", blurb: "Currents, chemistry and heat storage." },
    ],
  },
  {
    subjectId: "sub-science",
    slug: "scientific-method",
    title: "Scientific Method",
    description: "How claims earn the right to be believed.",
    icon: "Search",
    image_key: "sci-method",
    topics: [
      { title: "Observation", blurb: "Seeing carefully before explaining." },
      {
        title: "Hypothesis",
        blurb: "A testable guess about how the world works.",
      },
      {
        title: "Experiment",
        blurb: "Controls, variables and honest measurement.",
      },
    ],
  },
  {
    subjectId: "sub-history",
    slug: "ancient-world",
    title: "Ancient World",
    description: "Early cities, writing and the first empires.",
    icon: "Landmark",
    image_key: "his-ancient",
    topics: [
      {
        title: "Mesopotamia",
        blurb: "Rivers, cuneiform and the first cities.",
      },
      {
        title: "Classical Greece",
        blurb: "City-states, philosophy and democracy.",
      },
      { title: "Rome", blurb: "Republic, empire and a legal inheritance." },
    ],
  },
  {
    subjectId: "sub-history",
    slug: "medieval-world",
    title: "Medieval World",
    description: "Faith, feudal bonds and long-distance exchange.",
    icon: "Castle",
    image_key: "his-medieval",
    topics: [
      { title: "Feudal Orders", blurb: "Land, loyalty and local power." },
      {
        title: "Faith and Learning",
        blurb: "Monasteries, universities and books.",
      },
      {
        title: "Trade Routes",
        blurb: "Silk, spice and the movement of ideas.",
      },
    ],
  },
  {
    subjectId: "sub-history",
    slug: "revolutions",
    title: "Revolutions",
    description: "When political orders are overturned.",
    icon: "Flag",
    image_key: "his-revolutions",
    topics: [
      {
        title: "Scientific Revolution",
        blurb: "A new way of asking nature questions.",
      },
      {
        title: "Atlantic Revolutions",
        blurb: "Rights, republics and written constitutions.",
      },
      {
        title: "Industrial Revolution",
        blurb: "Machines, cities and a new clock of work.",
      },
    ],
  },
  {
    subjectId: "sub-history",
    slug: "wars",
    title: "Wars",
    description: "Conflict, strategy and the aftermath.",
    icon: "Swords",
    image_key: "his-wars",
    topics: [
      {
        title: "Causes of War",
        blurb: "Fear, interest, honour and miscalculation.",
      },
      {
        title: "World Wars",
        blurb: "Total war and a remade twentieth century.",
      },
      { title: "Aftermath", blurb: "Treaties, memory and reconstruction." },
    ],
  },
  {
    subjectId: "sub-english",
    slug: "literature",
    title: "Literature",
    description: "Stories, drama and the close reading of texts.",
    icon: "BookOpen",
    image_key: "eng-literature",
    topics: [
      {
        title: "Narrative Form",
        blurb: "Plot, voice and the architecture of stories.",
      },
      {
        title: "Character",
        blurb: "Desire, change and the person on the page.",
      },
      { title: "Theme", blurb: "What a work is about beneath the plot." },
    ],
  },
  {
    subjectId: "sub-english",
    slug: "poetry",
    title: "Poetry",
    description: "Compressed language, image and sound.",
    icon: "Feather",
    image_key: "eng-poetry",
    topics: [
      { title: "Imagery", blurb: "Pictures the mind can hold." },
      {
        title: "Meter & Sound",
        blurb: "Rhythm, rhyme and the music of lines.",
      },
      { title: "Form", blurb: "Sonnet, free verse and chosen constraint." },
    ],
  },
  {
    subjectId: "sub-english",
    slug: "grammar",
    title: "Grammar",
    description: "The system that makes sentences mean.",
    icon: "ListTree",
    image_key: "eng-grammar",
    topics: [
      {
        title: "Parts of Speech",
        blurb: "Nouns, verbs and the company they keep.",
      },
      { title: "Syntax", blurb: "How order builds sense." },
      { title: "Punctuation", blurb: "Marks that steer the reader's breath." },
    ],
  },
  {
    subjectId: "sub-english",
    slug: "writing",
    title: "Writing",
    description: "Drafting, revising and saying exactly enough.",
    icon: "PenTool",
    image_key: "eng-writing",
    topics: [
      { title: "Thesis", blurb: "A claim a paragraph can defend." },
      { title: "Paragraphs", blurb: "One idea, evidence, a turn." },
      { title: "Revision", blurb: "Cutting until only the necessary remains." },
    ],
  },
  {
    subjectId: "sub-technology",
    slug: "computing",
    title: "Computing",
    description: "Algorithms, machines and the flow of information.",
    icon: "Cpu",
    image_key: "tech-computing",
    topics: [
      { title: "Algorithms", blurb: "Step-by-step procedures that scale." },
      {
        title: "Data Structures",
        blurb: "How information is arranged for speed.",
      },
      { title: "Complexity", blurb: "Why some problems grow too fast." },
    ],
  },
  {
    subjectId: "sub-technology",
    slug: "programming",
    title: "Programming",
    description: "Languages, types and making software.",
    icon: "Code",
    image_key: "tech-programming",
    topics: [
      {
        title: "Variables & Types",
        blurb: "Names for values the machine can trust.",
      },
      {
        title: "Control Flow",
        blurb: "Branches, loops and the path of execution.",
      },
      { title: "Functions", blurb: "Reusable units of behaviour." },
    ],
  },
  {
    subjectId: "sub-technology",
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    description: "Machines that learn patterns from data.",
    icon: "BrainCircuit",
    image_key: "tech-ai",
    topics: [
      { title: "Machine Learning", blurb: "Fitting models that generalise." },
      {
        title: "Neural Networks",
        blurb: "Layers that transform representation.",
      },
      {
        title: "Language Models",
        blurb: "Predicting the next token, at scale.",
      },
    ],
  },
  {
    subjectId: "sub-technology",
    slug: "cybersecurity",
    title: "Cybersecurity",
    description: "Keeping systems honest under attack.",
    icon: "Shield",
    image_key: "tech-security",
    topics: [
      { title: "Threats", blurb: "What an adversary can try." },
      {
        title: "Cryptography",
        blurb: "Secrets, integrity and authentic identity.",
      },
      {
        title: "Defence in Depth",
        blurb: "Layers so one failure is not the end.",
      },
    ],
  },
];

const atlasSubjectTopics: TopicRow[] = [
  // Broad Knowledge Atlas topics. Each bucket is intentionally wide so many related articles can live together.
  ...[
    ["life-and-biology", "Life & Biology", "Cells, organisms, genetics, evolution, physiology, ecology and biotechnology."],
    ["genes-and-evolution", "Genes & Evolution", "DNA, heredity, natural selection, adaptation and evolutionary change."],
    ["cells-and-organisms", "Cells & Organisms", "Cell biology, microbiology, taxonomy, anatomy and how living systems are organised."],
    ["human-biology", "Human Biology", "The human body, immune systems, neuroscience, health and biological processes."],
    ["ecology-and-biotechnology", "Ecology & Biotechnology", "Ecosystems, microbiomes, conservation and technologies that work with living systems."],
  ].map(([slug, title, blurb], i) => ({
    id: `topic-biology-${slug}`, section_id: null, subject_id: "sub-biology", subject_slug: "biology", slug, title, blurb,
    body: blurb, image_url: null, sort: i + 1,
  })),
  ...[
    ["matter-and-energy", "Matter & Energy", "Matter, energy, chemistry, thermodynamics and the fundamental properties of the physical world."],
    ["motion-and-mechanics", "Motion & Mechanics", "Forces, motion, momentum, gravity and the mathematical description of physical systems."],
    ["fields-waves-and-light", "Fields, Waves & Light", "Electromagnetism, waves, optics, radiation and fields."],
    ["quantum-and-relativity", "Quantum & Relativity", "Quantum mechanics, spacetime, relativity and the foundations of modern physics."],
    ["earth-and-universe", "Earth & Universe", "Earth science, cosmology, stars, galaxies, black holes and the large-scale universe."],
  ].map(([slug, title, blurb], i) => ({
    id: `topic-science-${slug}`, section_id: null, subject_id: "sub-science", subject_slug: "science", slug, title, blurb,
    body: blurb, image_url: null, sort: i + 1,
  })),
  ...[
    ["foundations-and-logic", "Foundations & Logic", "Sets, proof, formal reasoning, structures and the foundations of mathematics."],
    ["algebra-and-number", "Algebra & Number", "Equations, functions, algebraic structures, numbers and patterns."],
    ["geometry-and-space", "Geometry & Space", "Shapes, measurement, coordinates, vectors and mathematical space."],
    ["calculus-and-analysis", "Calculus & Analysis", "Limits, change, derivatives, integrals, sequences and continuous mathematics."],
    ["discrete-and-applied", "Discrete & Applied Mathematics", "Graphs, combinatorics, probability, statistics, optimisation and mathematical applications."],
  ].map(([slug, title, blurb], i) => ({
    id: `topic-mathematics-${slug}`, section_id: null, subject_id: "sub-mathematics", subject_slug: "mathematics", slug, title, blurb,
    body: blurb, image_url: null, sort: i + 1,
  })),
  ...[
    ["computing-foundations", "Computing Foundations", "Computation, programming concepts, data, information and the foundations of computer science."],
    ["algorithms-and-software", "Algorithms & Software", "Algorithms, data structures, programming, software engineering and open-source systems."],
    ["ai-and-data", "AI & Data", "Machine learning, neural networks, language models, data science and intelligent systems."],
    ["systems-and-networks", "Systems & Networks", "Operating systems, networks, distributed computing, hardware and computer architecture."],
    ["security-and-theory", "Security & Computing Theory", "Cybersecurity, cryptography, computation theory, privacy and trustworthy computing."],
  ].map(([slug, title, blurb], i) => ({
    id: `topic-technology-${slug}`, section_id: null, subject_id: "sub-technology", subject_slug: "technology", slug, title, blurb,
    body: blurb, image_url: null, sort: i + 1,
  })),
  ...[
    ["cognition-and-learning", "Cognition & Learning", "Thinking, memory, attention, learning, intelligence and problem solving."],
    ["perception-and-consciousness", "Perception & Consciousness", "Sensation, perception, awareness, consciousness and subjective experience."],
    ["brain-and-behaviour", "Brain & Behaviour", "Neuroscience, behaviour, neuroplasticity and biological foundations of the mind."],
    ["development-and-social-mind", "Development & Social Mind", "Development, language, personality, social behaviour and individual differences."],
    ["emotion-and-decision", "Emotion & Decision-Making", "Emotion, motivation, judgement, cognitive bias and human decision-making."],
  ].map(([slug, title, blurb], i) => ({
    id: `topic-mind-${slug}`, section_id: null, subject_id: "sub-atlas-mind", subject_slug: "mind", slug, title, blurb,
    body: blurb, image_url: null, sort: i + 1,
  })),
  ...[
    ["knowledge-and-reason", "Knowledge & Reason", "Epistemology, logic, evidence, truth, rationality and critical reasoning."],
    ["reality-and-mind", "Reality & Mind", "Metaphysics, existence, identity, consciousness and the nature of reality."],
    ["ethics-and-values", "Ethics & Values", "Moral philosophy, virtue, justice, rights, duties and the good life."],
    ["society-and-politics", "Society & Politics", "Political philosophy, authority, liberty, democracy, equality and institutions."],
    ["meaning-and-existence", "Meaning & Existence", "Existentialism, aesthetics, purpose, meaning, art and human existence."],
  ].map(([slug, title, blurb], i) => ({
    id: `topic-philosophy-${slug}`, section_id: null, subject_id: "sub-atlas-philosophy", subject_slug: "philosophy", slug, title, blurb,
    body: blurb, image_url: null, sort: i + 1,
  })),
  ...[
    ["systems-thinking", "Systems Thinking", "Whole systems, causal relationships, stocks, flows and leverage points."],
    ["complexity-and-emergence", "Complexity & Emergence", "Self-organisation, adaptation, nonlinear behaviour and emergent patterns."],
    ["networks-and-connectivity", "Networks & Connectivity", "Graphs, networks, relationships, connectivity and network dynamics."],
    ["feedback-and-control", "Feedback & Control", "Feedback loops, regulation, control, stability and autonomous behaviour."],
    ["information-and-resilience", "Information & Resilience", "Information flow, communication, robustness, risk, sustainability and recovery."],
  ].map(([slug, title, blurb], i) => ({
    id: `topic-systems-${slug}`, section_id: null, subject_id: "sub-atlas-systems", subject_slug: "systems", slug, title, blurb,
    body: blurb, image_url: null, sort: i + 1,
  })),
  ...[
    ["ancient-and-classical-world", "Ancient & Classical World", "Early civilisations, cities, empires, classical Greece, Rome and the ancient world."],
    ["medieval-and-global-exchange", "Medieval World & Global Exchange", "Medieval societies, religions, trade routes, the Silk Road and cultural exchange."],
    ["revolutions-and-industrialisation", "Revolutions & Industrialisation", "Scientific, political and industrial revolutions and their global consequences."],
    ["wars-and-conflict", "Wars & Conflict", "Major conflicts, military change, causes of war, world wars and their aftermath."],
    ["colonialism-and-global-change", "Colonialism & Global Change", "Imperialism, colonisation, decolonisation, migration and the reshaping of societies."],
  ].map(([slug, title, blurb], i) => ({
    id: `topic-history-${slug}`, section_id: null, subject_id: "sub-history", subject_slug: "history", slug, title, blurb,
    body: blurb, image_url: null, sort: i + 1,
  })),
  ...[
    ["language-and-linguistics", "Language & Linguistics", "Language structure, acquisition, meaning, grammar, communication and linguistic change."],
    ["communication-and-information", "Communication & Information", "Signals, information, rhetoric, communication systems and the transmission of meaning."],
    ["grammar-and-structure", "Grammar & Structure", "Syntax, morphology, semantics and the structures that make language work."],
    ["literature-and-narrative", "Literature & Narrative", "Stories, narrative form, character, themes, genres and literary interpretation."],
    ["poetry-and-expression", "Poetry & Expression", "Poetry, imagery, rhythm, form, rhetoric and creative expression."],
  ].map(([slug, title, blurb], i) => ({
    id: `topic-english-${slug}`, section_id: null, subject_id: "sub-english", subject_slug: "english", slug, title, blurb,
    body: blurb, image_url: null, sort: i + 1,
  })),
] as unknown as TopicRow[];

function buildSectionsAndTopics() {
  const sectionRows: SectionRow[] = [];
  const topicRows: TopicRow[] = [];

  bioSections.forEach((sec, i) => {
    const id = `sec-${sec.slug}`;
    sectionRows.push({
      id,
      subject_id: "sub-biology",
      slug: sec.slug,
      label: sec.label,
      title: sec.title,
      description: sec.description,
      body: sec.description,
      icon: "Sprout",
      image_key: SECTION_IMAGE_KEY[sec.slug] ?? "hero-cell",
      image_url: null,
      sort: i,
    });
    sec.topics.forEach((t, ti) => {
      topicRows.push({
        id: `top-${sec.slug}-${slugify(t.title)}`,
        section_id: id,
        subject_id: "sub-biology",
        subject_slug: "biology",
        slug: slugify(t.title),
        title: t.title,
        blurb: t.blurb,
        body: t.blurb,
        image_url: null,
        sort: ti,
      });
    });
  });

  extraSections.forEach((sec, i) => {
    const id = `sec-${sec.slug}`;
    sectionRows.push({
      id,
      subject_id: sec.subjectId,
      slug: sec.slug,
      label: sec.title,
      title: sec.title,
      description: sec.description,
      body: sec.description,
      icon: sec.icon,
      image_key: sec.image_key,
      image_url: null,
      sort: 100 + i,
    });
    sec.topics.forEach((t, ti) => {
      topicRows.push({
        id: `top-${sec.slug}-${slugify(t.title)}`,
        section_id: id,
        subject_id: sec.subjectId,
        subject_slug: SUBJECTS.find((subject) => subject.id === sec.subjectId)?.slug ?? "biology",
        slug: slugify(t.title),
        title: t.title,
        blurb: t.blurb,
        body: t.blurb,
        image_url: null,
        sort: ti,
      });
    });
  });

  return { sectionRows, topicRows: [...topicRows, ...atlasSubjectTopics] };
}


// Broad subject taxonomy used by both the live database and the offline catalogue.
// These are intentionally high-level containers; specific concepts remain articles.
const BROAD_TOPIC_DEFS: Array<[string,string,string,string]> = [
  ["biology","life-science","Life Science","Living systems, organisms, processes and biological diversity."],
  ["biology","cells-and-molecular-life","Cells & Molecular Life","Cells, molecules, metabolism and the mechanisms that make life work."],
  ["biology","genes-and-evolution","Genes & Evolution","DNA, heredity, variation, natural selection and evolutionary change."],
  ["biology","organisms-and-animal-kingdom","Organisms & Animal Kingdom","Organismal diversity, classification, anatomy and the major animal lineages."],
  ["biology","plants-and-fungi","Plants & Fungi","Plant biology, photosynthesis, fungi, decomposition and symbiosis."],
  ["biology","microbiology-and-microbes","Microbiology & Microbes","Bacteria, archaea, protists, microbes and microbiomes."],
  ["biology","ecology-and-environment","Ecology & Environment","Ecosystems, populations, biodiversity, environmental change and conservation."],
  ["science","matter-and-energy","Matter & Energy","Matter, energy, chemistry and thermodynamics."],
  ["science","forces-and-motion","Forces & Motion","Motion, forces, gravity, momentum and mechanics."],
  ["science","fields-waves-and-light","Fields, Waves & Light","Electromagnetism, waves, optics, radiation and sound."],
  ["science","earth-and-environment","Earth & Environment","Geology, climate, atmosphere, oceans and Earth systems."],
  ["science","space-and-universe","Space & Universe","Astronomy, cosmology, stars, galaxies, planets and black holes."],
  ["science","scientific-practice","Scientific Practice","Scientific methods, evidence, measurement, experiments and models."],
  ["mathematics","numbers-and-quantity","Numbers & Quantity","Numbers, operations, magnitude, ratios and quantitative reasoning."],
  ["mathematics","algebra-and-functions","Algebra & Functions","Equations, inequalities, polynomials, functions and mathematical relationships."],
  ["mathematics","geometry-and-space","Geometry & Space","Shape, measurement, coordinates, transformations and mathematical space."],
  ["mathematics","calculus-and-change","Calculus & Change","Limits, derivatives, integrals and continuous change."],
  ["mathematics","statistics-and-probability","Statistics & Probability","Data, uncertainty, distributions, inference, chance and risk."],
  ["mathematics","discrete-mathematics-and-logic","Discrete Mathematics & Logic","Sets, graphs, combinatorics, algorithms, proofs and formal reasoning."],
  ["philosophy","knowledge-and-reason","Knowledge & Reason","Knowledge, evidence, truth, logic, skepticism and rational thought."],
  ["philosophy","ethics-and-values","Ethics & Values","Moral action, responsibility, justice, virtue and the good life."],
  ["philosophy","reality-and-existence","Reality & Existence","Existence, identity, causation, time, reality and being."],
  ["philosophy","mind-and-consciousness","Mind & Consciousness","Thought, consciousness, perception, identity and the mind."],
  ["philosophy","society-and-politics","Society & Politics","Power, authority, liberty, democracy, rights and social organisation."],
  ["philosophy","art-and-meaning","Art & Meaning","Aesthetics, art, interpretation, purpose and human meaning."],
  ["technology","computing-foundations","Computing Foundations","Computation, information, computer architecture and foundational concepts."],
  ["technology","software-and-programming","Software & Programming","Programming, algorithms, software engineering and development."],
  ["technology","computer-systems-and-networks","Computer Systems & Networks","Hardware, operating systems, networking and distributed computing."],
  ["technology","data-and-artificial-intelligence","Data & Artificial Intelligence","Data, databases, machine learning, neural networks and AI."],
  ["technology","security-and-privacy","Security & Privacy","Cybersecurity, cryptography, privacy, authentication and defence."],
  ["technology","human-technology-and-design","Human Technology & Design","Human-computer interaction, interfaces, usability and accessibility."],
  ["english","language-and-linguistics","Language & Linguistics","Language structure, meaning, acquisition, communication and change."],
  ["english","grammar-and-usage","Grammar & Usage","Grammar, syntax, morphology, punctuation and effective usage."],
  ["english","reading-and-literature","Reading & Literature","Reading, literary analysis, narrative, texts and interpretation."],
  ["english","writing-and-composition","Writing & Composition","Composition, essays, argument, structure, style and revision."],
  ["english","poetry-and-expression","Poetry & Expression","Poetry, rhythm, rhyme, imagery, symbolism and form."],
  ["english","rhetoric-media-and-communication","Rhetoric, Media & Communication","Persuasion, rhetoric, media, information and audience."],
  ["history","ancient-and-classical-world","Ancient & Classical World","Early civilisations, cities, empires, Greece, Rome and antiquity."],
  ["history","medieval-and-global-world","Medieval & Global World","Medieval societies, trade, religion, empires and cultural exchange."],
  ["history","revolutions-and-industrialisation","Revolutions & Industrialisation","Scientific, political and industrial transformations."],
  ["history","wars-and-international-conflict","Wars & International Conflict","Wars, diplomacy, military change and international conflict."],
  ["history","colonialism-and-global-change","Colonialism & Global Change","Imperialism, colonisation, decolonisation and global change."],
  ["history","society-culture-and-memory","Society, Culture & Memory","Everyday life, social change, culture, identity and historical memory."],
  ["mind","cognition-and-thinking","Cognition & Thinking","Thinking, reasoning, judgement, decisions and problem solving."],
  ["mind","perception-and-consciousness","Perception & Consciousness","Sensation, perception, attention, awareness and consciousness."],
  ["mind","learning-and-memory","Learning & Memory","Learning, memory, practice, forgetting and recall."],
  ["mind","language-and-thought","Language & Thought","Language, concepts, communication and thinking."],
  ["mind","emotion-and-motivation","Emotion & Motivation","Emotion, motivation, reward, goals and behaviour."],
  ["mind","development-and-social-behaviour","Development & Social Behaviour","Development, relationships, social behaviour and individual differences."],
  ["systems","systems-thinking-and-modelling","Systems Thinking & Modelling","Whole systems, boundaries, relationships, models and leverage points."],
  ["systems","complexity-and-emergence","Complexity & Emergence","Complexity, adaptation, nonlinear behaviour and emergent patterns."],
  ["systems","feedback-and-control","Feedback & Control","Feedback loops, regulation, control and stability."],
  ["systems","networks-and-connectivity","Networks & Connectivity","Graphs, relationships, connectivity and network dynamics."],
  ["systems","dynamics-and-change","Dynamics & Change","Cycles, delays, stocks, flows and systems changing through time."],
  ["systems","information-resilience-and-sustainability","Information, Resilience & Sustainability","Information flow, communication, resilience, risk and sustainability."]
];

const BROAD_TOPIC_MAP: Record<string, string> = {
  "biology:cell-biology":"cells-and-molecular-life","biology:genetics":"genes-and-evolution","biology:evolution":"genes-and-evolution",
  "biology:animalia":"organisms-and-animal-kingdom","biology:plant-animal-biology":"organisms-and-animal-kingdom",
  "biology:plantae":"plants-and-fungi","biology:fungi":"plants-and-fungi","biology:microbiology":"microbiology-and-microbes",
  "biology:bacteria-archaea":"microbiology-and-microbes","biology:protista":"microbiology-and-microbes","biology:ecology":"ecology-and-environment",
  "biology:human-biology":"ecology-and-environment","biology:atlas-biology":"life-science",
  "science:chemistry":"matter-and-energy","science:energy":"matter-and-energy","science:materials":"matter-and-energy",
  "science:atlas-physics":"forces-and-motion","science:waves":"fields-waves-and-light","science:earth-science":"earth-and-environment",
  "science:astronomy":"space-and-universe","science:scientific-method":"scientific-practice",
  "mathematics:arithmetic-number":"numbers-and-quantity","mathematics:algebra":"algebra-and-functions","mathematics:geometry":"geometry-and-space",
  "mathematics:calculus":"calculus-and-change","mathematics:statistics":"statistics-and-probability","mathematics:probability":"statistics-and-probability",
  "mathematics:discrete-mathematics":"discrete-mathematics-and-logic","mathematics:atlas-mathematics":"numbers-and-quantity",
  "philosophy:logic":"knowledge-and-reason","philosophy:epistemology":"knowledge-and-reason","philosophy:ethics":"ethics-and-values",
  "philosophy:metaphysics":"reality-and-existence","philosophy:philosophy-of-mind":"mind-and-consciousness","philosophy:political-philosophy":"society-and-politics",
  "philosophy:aesthetics":"art-and-meaning","philosophy:atlas-philosophy":"knowledge-and-reason","philosophy:atlas-overview":"knowledge-and-reason",
  "technology:computer-systems":"computing-foundations","technology:programming":"software-and-programming","technology:networks":"computer-systems-and-networks",
  "technology:data":"data-and-artificial-intelligence","technology:ai":"data-and-artificial-intelligence","technology:cybersecurity":"security-and-privacy",
  "technology:human-computer":"human-technology-and-design","technology:atlas-computing":"computing-foundations",
  "english:language-linguistics":"language-and-linguistics","english:grammar-syntax":"grammar-and-usage","english:reading-literature":"reading-and-literature",
  "english:drama":"reading-and-literature","english:writing-composition":"writing-and-composition","english:poetry":"poetry-and-expression",
  "english:rhetoric-media":"rhetoric-media-and-communication","english:research-communication":"rhetoric-media-and-communication",
  "history:ancient-world":"ancient-and-classical-world","history:medieval-world":"medieval-and-global-world","history:modern-history":"revolutions-and-industrialisation",
  "history:world-wars":"wars-and-international-conflict","history:australian-history":"colonialism-and-global-change","history:social-cultural":"society-culture-and-memory",
  "history:historical-method":"society-culture-and-memory","history:atlas-history":"ancient-and-classical-world",
  "mind:cognition":"cognition-and-thinking","mind:perception":"perception-and-consciousness","mind:learning-memory":"learning-and-memory",
  "mind:language-mind":"language-and-thought","mind:emotion-motivation":"emotion-and-motivation","mind:development":"development-and-social-behaviour",
  "mind:social-behaviour":"development-and-social-behaviour","mind:atlas-mind":"cognition-and-thinking",
  "systems:systems-thinking":"systems-thinking-and-modelling","systems:complexity":"complexity-and-emergence","systems:feedback-control":"feedback-and-control",
  "systems:networks":"networks-and-connectivity","systems:dynamics":"dynamics-and-change","systems:information":"information-resilience-and-sustainability",
  "systems:resilience":"information-resilience-and-sustainability","systems:atlas-systems":"systems-thinking-and-modelling"
};

const broadTopicRows: TopicRow[] = BROAD_TOPIC_DEFS.map(([subjectSlug, slug, title, blurb], i) => ({
  id: `broad-topic-${subjectSlug}-${slug}`,
  section_id: null,
  subject_id: SUBJECTS.find((s) => s.slug === subjectSlug)?.id ?? `sub-${subjectSlug}`,
  subject_slug: subjectSlug,
  slug,
  title,
  blurb,
  body: blurb,
  image_url: null,
  sort: i,
}));

function broadTopicForArticle(article: ArticleRow) {
  return BROAD_TOPIC_MAP[`${article.subject_slug ?? ""}:${article.topic_slug}`] ?? 
    (BROAD_TOPIC_DEFS.find(([subjectSlug]) => subjectSlug === article.subject_slug)?.[1] ?? article.topic_slug);
}

const built = buildSectionsAndTopics();
export const SECTIONS: SectionRow[] = built.sectionRows;
export const TOPICS: TopicRow[] = broadTopicRows;

const LEGACY_ARTICLES: ArticleRow[] = built.topicRows.map((t, i) => {
  const section = SECTIONS.find((s) => s.id === t.section_id);
  const subject = SUBJECTS.find((s) => s.id === t.subject_id);
  const layout = buildTopicLayout({
    title: t.title,
    blurb: t.blurb ?? "",
    subject: subject?.title ?? "Ted's Lab",
    section: section?.title ?? "Encyclopedia",
  });
  return {
    id: `art-${t.id}`,
    slug: `${section?.slug ?? ("topic-" + (subject?.slug ?? "biology"))}-${t.slug}`,
    title: t.title,
    excerpt: layout.overview[0] ?? t.blurb,
    body: JSON.stringify(layout),
    minutes: 6 + (i % 5),
    tone: "educational",
    subject_slug: subject?.slug ?? "biology",
    section_slug: section?.slug ?? null,
    topic_slug: broadTopicForArticle({ topic_slug: t.slug, subject_slug: subject?.slug ?? "biology" } as ArticleRow),
    image_key: section?.image_key ?? "hero-cell",
    image_url: null,
    video_url: null,
    published: true,
    status: "published" as const,
    sort: i + 100,
  };
});

const BROAD_OVERVIEW_ARTICLES: ArticleRow[] = broadTopicRows.map((t, i) => {
  const subject = SUBJECTS.find((s) => s.slug === t.subject_slug);
  const layout = buildTopicLayout({
    title: t.title,
    blurb: t.blurb ?? "",
    subject: subject?.title ?? "Ted's Lab",
    section: "Knowledge",
  });
  return {
    id: `broad-overview-${t.subject_slug}-${t.slug}`,
    slug: `topic-${t.subject_slug}-${t.slug}`,
    title: `${t.title}: Overview`,
    excerpt: t.blurb,
    body: JSON.stringify(layout),
    minutes: 5,
    tone: "topic-overview",
    subject_slug: t.subject_slug,
    section_slug: null,
    topic_slug: t.slug,
    image_key: subject?.image_key ?? null,
    image_url: null,
    video_url: null,
    published: true,
    status: "published" as const,
    sort: i,
  };
});

export const ARTICLES: ArticleRow[] = [...BROAD_OVERVIEW_ARTICLES, ...LEGACY_ARTICLES];

export const HERO_SLIDES: HeroSlideRow[] = BANNER_SLIDES;

export const VIDEOS: VideoRow[] = [];

export const PAGES: PageRow[] = [
  {
    id: "page-about",
    slug: "about",
    title: "About Ted's Lab",
    description:
      "A learning encyclopedia with a knowledge graph and daily study assist.",
    body: "<p>Ted's Lab is an illustrated encyclopedia. BioPedia articles sit beside the Knowledge Atlas so you can read deeply and also see how ideas link.</p>",
    image_url: null,
    published: true,
    status: "published",
    show_in_nav: true,
    sort: 0,
  },
];

export const NAV_LINKS: NavLinkRow[] = [
  {
    id: "nav-atlas",
    label: "Knowledge Atlas",
    href: "/knowledge-atlas",
    icon: "Network",
    group_name: "tools",
    sort: 0,
  },
  {
    id: "nav-quantumpedia",
    label: "QuantumPedia",
    href: "/quantumpedia",
    icon: "Atom",
    group_name: "tools",
    sort: 1,
  },
];

export const SETTINGS: Record<string, string> = {
  site_name: "Ted's Lab",
  site_tagline: "The Learning Encyclopedia",
};

export const TABLES: Record<string, unknown[]> = {
  subjects: SUBJECTS,
  sections: SECTIONS,
  topics: TOPICS,
  articles: ARTICLES,
  hero_slides: HERO_SLIDES,
  videos: VIDEOS,
  pages: PAGES,
  nav_links: NAV_LINKS,
  site_settings: Object.entries(SETTINGS).map(([key, value]) => ({
    key,
    value,
  })),
  extinct_species: EXTINCT_SPECIES,
  user_roles: [],
};
