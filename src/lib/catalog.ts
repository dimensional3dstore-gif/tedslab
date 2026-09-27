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
    description: "Life, cells, organisms, genetics and the living systems of Earth.",
    icon: "Sprout",
    image_key: "hero-cell",
    image_url: null,
    sort: 0,
  },
  {
    id: "sub-mathematics",
    slug: "mathematics",
    title: "Mathematics",
    description: "Number, structure, space and change — from algebra to proof.",
    icon: "Sigma",
    image_key: "math-algebra",
    image_url: null,
    sort: 1,
  },
  {
    id: "sub-science",
    slug: "science",
    title: "Science",
    description: "Physics, chemistry, earth systems and the scientific method.",
    icon: "Atom",
    image_key: "sci-physics",
    image_url: null,
    sort: 2,
  },
  {
    id: "sub-history",
    slug: "history",
    title: "History",
    description: "Civilizations, revolutions and the long arc of human events.",
    icon: "Landmark",
    image_key: "his-ancient",
    image_url: null,
    sort: 3,
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
];

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
      { title: "Linear Equations", blurb: "Solving for unknowns with balance and substitution." },
      { title: "Functions", blurb: "Inputs, outputs and mapping one world onto another." },
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
      { title: "Euclidean Proof", blurb: "Axioms, theorems and the logic of diagrams." },
      { title: "Trigonometry", blurb: "Sine, cosine and the circle of ratios." },
      { title: "Coordinate Geometry", blurb: "Points, lines and distance on the plane." },
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
      { title: "Limits", blurb: "Approaching a value without having to arrive." },
      { title: "Derivatives", blurb: "Instantaneous rate of change." },
      { title: "Integrals", blurb: "Area, accumulation and the antiderivative." },
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
      { title: "Distributions", blurb: "How values spread around a typical case." },
      { title: "Sampling", blurb: "Learning about a whole from a part." },
      { title: "Hypothesis Tests", blurb: "Asking whether a difference is noise." },
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
      { title: "Newtonian Mechanics", blurb: "Force, mass and the laws of motion." },
      { title: "Energy", blurb: "Work, conservation and transformation." },
      { title: "Waves & Light", blurb: "Oscillation, interference and spectra." },
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
      { title: "Periodic Table", blurb: "Patterns of elements and their properties." },
      { title: "Chemical Bonds", blurb: "Ionic, covalent and metallic attraction." },
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
      { title: "Plate Tectonics", blurb: "Moving crust and the making of mountains." },
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
      { title: "Hypothesis", blurb: "A testable guess about how the world works." },
      { title: "Experiment", blurb: "Controls, variables and honest measurement." },
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
      { title: "Mesopotamia", blurb: "Rivers, cuneiform and the first cities." },
      { title: "Classical Greece", blurb: "City-states, philosophy and democracy." },
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
      { title: "Faith and Learning", blurb: "Monasteries, universities and books." },
      { title: "Trade Routes", blurb: "Silk, spice and the movement of ideas." },
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
      { title: "Scientific Revolution", blurb: "A new way of asking nature questions." },
      { title: "Atlantic Revolutions", blurb: "Rights, republics and written constitutions." },
      { title: "Industrial Revolution", blurb: "Machines, cities and a new clock of work." },
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
      { title: "Causes of War", blurb: "Fear, interest, honour and miscalculation." },
      { title: "World Wars", blurb: "Total war and a remade twentieth century." },
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
      { title: "Narrative Form", blurb: "Plot, voice and the architecture of stories." },
      { title: "Character", blurb: "Desire, change and the person on the page." },
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
      { title: "Meter & Sound", blurb: "Rhythm, rhyme and the music of lines." },
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
      { title: "Parts of Speech", blurb: "Nouns, verbs and the company they keep." },
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
      { title: "Data Structures", blurb: "How information is arranged for speed." },
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
      { title: "Variables & Types", blurb: "Names for values the machine can trust." },
      { title: "Control Flow", blurb: "Branches, loops and the path of execution." },
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
      { title: "Neural Networks", blurb: "Layers that transform representation." },
      { title: "Language Models", blurb: "Predicting the next token, at scale." },
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
      { title: "Cryptography", blurb: "Secrets, integrity and authentic identity." },
      { title: "Defence in Depth", blurb: "Layers so one failure is not the end." },
    ],
  },
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
        slug: slugify(t.title),
        title: t.title,
        blurb: t.blurb,
        body: t.blurb,
        image_url: null,
        sort: ti,
      });
    });
  });

  return { sectionRows, topicRows };
}

const built = buildSectionsAndTopics();
export const SECTIONS: SectionRow[] = built.sectionRows;
export const TOPICS: TopicRow[] = built.topicRows;

export const ARTICLES: ArticleRow[] = TOPICS.map((t, i) => {
  const section = SECTIONS.find((s) => s.id === t.section_id);
  const subject = SUBJECTS.find((s) => s.id === section?.subject_id);
  const layout = buildTopicLayout({
    title: t.title,
    blurb: t.blurb ?? "",
    subject: subject?.title ?? "Ted's Lab",
    section: section?.title ?? "Encyclopedia",
  });
  return {
    id: `art-${t.id}`,
    slug: `${section?.slug ?? "topic"}-${t.slug}`,
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
    description: "A learning encyclopedia with a knowledge graph and daily study assist.",
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
  site_settings: Object.entries(SETTINGS).map(([key, value]) => ({ key, value })),
  extinct_species: EXTINCT_SPECIES,
  user_roles: [],
};
