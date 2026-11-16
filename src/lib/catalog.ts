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
    title: "Biology",
    description:
      "Life, cells, organisms, genetics and the living systems of Earth.",
    icon: "Sprout",
    image_key: "hero-cell",
    image_url: null,
    sort: 3,
  },
  {
    id: "sub-mathematics",
    slug: "mathematics",
    title: "Mathematics",
    description: "Number, structure, space and change — from algebra to proof.",
    icon: "Sigma",
    image_key: "math-algebra",
    image_url: null,
    sort: 2,
  },
  {
    id: "sub-science",
    slug: "science",
    title: "Science",
    description: "Physics, chemistry, earth systems and the scientific method.",
    icon: "Atom",
    image_key: "sci-physics",
    image_url: null,
    sort: 1,
  },
  {
    id: "sub-history",
    slug: "history",
    title: "History",
    description: "Civilizations, revolutions and the long arc of human events.",
    icon: "Landmark",
    image_key: "his-ancient",
    image_url: null,
    sort: 6,
  },
  {
    id: "sub-english",
    slug: "english",
    title: "English",
    description: "Literature, poetry, grammar and the craft of writing.",
    icon: "BookOpen",
    image_key: "eng-literature",
    image_url: null,
    sort: 4,
  },
  {
    id: "sub-technology",
    slug: "technology",
    title: "Technology",
    description: "Computing, programming, AI and digital systems.",
    icon: "Cpu",
    image_key: "tech-computing",
    image_url: null,
    sort: 5,
  },
  {
    id: "sub-atlas-philosophy",
    slug: "philosophy",
    title: "Philosophy",
    description: "Knowledge, reasoning, ethics, metaphysics and the study of ideas.",
    icon: "Landmark",
    image_key: null,
    image_url: null,
    sort: 0,
  },
  {
    id: "sub-atlas-mind",
    slug: "mind",
    title: "Mind & Cognition",
    description: "Consciousness, cognition, language, perception and behaviour.",
    icon: "Brain",
    image_key: null,
    image_url: null,
    sort: 7,
  },
  {
    id: "sub-atlas-systems",
    slug: "systems",
    title: "Systems Science",
    description: "Complexity, networks, feedback, emergence and systems thinking.",
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
  // Philosophy: open-ended areas for arguments, knowledge, reality and values.
  { id: "topic-philosophy-logic", section_id: null, subject_id: "sub-atlas-philosophy", subject_slug: "philosophy", slug: "logic", title: "Logic and Critical Reasoning", blurb: "Formal reasoning, valid inference, proof and the structure of arguments.", body: "Explore deductive and inductive reasoning, formal systems, proof, fallacies and argument analysis.", image_url: null, sort: 1 },
  { id: "topic-philosophy-epistemology", section_id: null, subject_id: "sub-atlas-philosophy", subject_slug: "philosophy", slug: "epistemology", title: "Knowledge and Epistemology", blurb: "Knowledge, evidence, belief, justification and uncertainty.", body: "Explore theories of knowledge, scepticism, evidence, rationality and scientific knowledge.", image_url: null, sort: 2 },
  { id: "topic-philosophy-metaphysics", section_id: null, subject_id: "sub-atlas-philosophy", subject_slug: "philosophy", slug: "metaphysics", title: "Metaphysics and Reality", blurb: "Existence, identity, causation, time and possibility.", body: "Explore what exists, personal identity, causation, time, modality and the nature of reality.", image_url: null, sort: 3 },
  { id: "topic-philosophy-ethics", section_id: null, subject_id: "sub-atlas-philosophy", subject_slug: "philosophy", slug: "ethics", title: "Ethics and Moral Philosophy", blurb: "Moral reasoning, values, duties, rights and the good life.", body: "Explore normative ethics, applied ethics, virtue, duties, consequences and moral dilemmas.", image_url: null, sort: 4 },
  { id: "topic-philosophy-political-philosophy", section_id: null, subject_id: "sub-atlas-philosophy", subject_slug: "philosophy", slug: "political-philosophy", title: "Political Philosophy", blurb: "Justice, authority, liberty, rights and political institutions.", body: "Explore justice, democracy, sovereignty, equality, freedom and social contracts.", image_url: null, sort: 5 },
  { id: "topic-philosophy-philosophy-of-mind", section_id: null, subject_id: "sub-atlas-philosophy", subject_slug: "philosophy", slug: "philosophy-of-mind", title: "Philosophy of Mind", blurb: "Mind, consciousness, identity and the relationship between thought and matter.", body: "Explore dualism, physicalism, intentionality, personal identity and mental causation.", image_url: null, sort: 6 },
  { id: "topic-philosophy-aesthetics", section_id: null, subject_id: "sub-atlas-philosophy", subject_slug: "philosophy", slug: "aesthetics", title: "Aesthetics and Philosophy of Art", blurb: "Beauty, interpretation, creativity and the nature of art.", body: "Explore aesthetic value, artistic meaning, taste, interpretation and creativity.", image_url: null, sort: 7 },
  // Mind & Cognition: broad scientific and philosophical study of mental life.
  { id: "topic-mind-cognition", section_id: null, subject_id: "sub-atlas-mind", subject_slug: "mind", slug: "cognition", title: "Cognition and Thinking", blurb: "How minds process information, learn, reason and solve problems.", body: "Explore attention, memory, learning, decision-making, intelligence and cognitive architectures.", image_url: null, sort: 1 },
  { id: "topic-mind-perception", section_id: null, subject_id: "sub-atlas-mind", subject_slug: "mind", slug: "perception", title: "Perception and Consciousness", blurb: "How sensory systems construct experience and awareness.", body: "Explore vision, hearing, multisensory integration, consciousness and perceptual illusions.", image_url: null, sort: 2 },
  { id: "topic-mind-learning-memory", section_id: null, subject_id: "sub-atlas-mind", subject_slug: "mind", slug: "learning-memory", title: "Learning and Memory", blurb: "Encoding, storing, retrieving and changing knowledge.", body: "Explore working memory, long-term memory, forgetting, skill acquisition and learning science.", image_url: null, sort: 3 },
  { id: "topic-mind-language-mind", section_id: null, subject_id: "sub-atlas-mind", subject_slug: "mind", slug: "language-mind", title: "Language and Thought", blurb: "Language acquisition, meaning, grammar and communication.", body: "Explore linguistics, semantics, syntax, pragmatics, language development and communication.", image_url: null, sort: 4 },
  { id: "topic-mind-development", section_id: null, subject_id: "sub-atlas-mind", subject_slug: "mind", slug: "development", title: "Development Across the Lifespan", blurb: "How cognition, emotion and behaviour change throughout life.", body: "Explore developmental psychology, childhood, adolescence, ageing and lifespan change.", image_url: null, sort: 5 },
  { id: "topic-mind-emotion-motivation", section_id: null, subject_id: "sub-atlas-mind", subject_slug: "mind", slug: "emotion-motivation", title: "Emotion and Motivation", blurb: "The forces that shape feeling, goals and action.", body: "Explore emotion, motivation, reward, drives, self-regulation and behaviour.", image_url: null, sort: 6 },
  { id: "topic-mind-social-behaviour", section_id: null, subject_id: "sub-atlas-mind", subject_slug: "mind", slug: "social-behaviour", title: "Social Behaviour and Individual Differences", blurb: "How people differ and influence one another.", body: "Explore personality, social cognition, group behaviour, culture and individual differences.", image_url: null, sort: 7 },
  // Systems Science: frameworks that apply across natural, social and engineered systems.
  { id: "topic-systems-systems-thinking", section_id: null, subject_id: "sub-atlas-systems", subject_slug: "systems", slug: "systems-thinking", title: "Systems Thinking and Modelling", blurb: "Whole-system behaviour, feedback, stocks, flows and leverage points.", body: "Explore causal loops, stocks and flows, system dynamics and intervention design.", image_url: null, sort: 1 },
  { id: "topic-systems-complexity", section_id: null, subject_id: "sub-atlas-systems", subject_slug: "systems", slug: "complexity", title: "Complexity and Emergence", blurb: "Emergence, adaptation and behaviour in complex systems.", body: "Explore self-organisation, emergence, nonlinear dynamics, resilience and complex adaptive systems.", image_url: null, sort: 2 },
  { id: "topic-systems-feedback-control", section_id: null, subject_id: "sub-atlas-systems", subject_slug: "systems", slug: "feedback-control", title: "Feedback and Control", blurb: "Control, communication, feedback and regulation.", body: "Explore feedback loops, control theory, regulation, information flow and autonomous systems.", image_url: null, sort: 3 },
  { id: "topic-systems-networks", section_id: null, subject_id: "sub-atlas-systems", subject_slug: "systems", slug: "networks", title: "Networks and Connectivity", blurb: "Nodes, connections, graph structure and network dynamics.", body: "Explore graph theory, social networks, infrastructure, network science and connectivity.", image_url: null, sort: 4 },
  { id: "topic-systems-dynamics", section_id: null, subject_id: "sub-atlas-systems", subject_slug: "systems", slug: "dynamics", title: "System Dynamics and Change", blurb: "How systems evolve over time through interacting processes.", body: "Explore dynamic models, delays, nonlinear behaviour, stability and change.", image_url: null, sort: 5 },
  { id: "topic-systems-information", section_id: null, subject_id: "sub-atlas-systems", subject_slug: "systems", slug: "information", title: "Information and Communication Systems", blurb: "Information, entropy, signals, communication and uncertainty.", body: "Explore information theory, coding, communication channels, signals and information measures.", image_url: null, sort: 6 },
  { id: "topic-systems-resilience", section_id: null, subject_id: "sub-atlas-systems", subject_slug: "systems", slug: "resilience", title: "Resilience, Risk and Sustainability", blurb: "How systems absorb shocks, adapt and remain viable.", body: "Explore resilience, risk, sustainability, robustness and recovery in complex systems.", image_url: null, sort: 7 },
];

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

const built = buildSectionsAndTopics();
export const SECTIONS: SectionRow[] = built.sectionRows;
export const TOPICS: TopicRow[] = built.topicRows;

export const ARTICLES: ArticleRow[] = TOPICS.map((t, i) => {
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
    topic_slug: t.slug,
    image_key: section?.image_key ?? "hero-cell",
    image_url: null,
    video_url: null,
    published: true,
    status: "published" as const,
    sort: i,
  };
});

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
