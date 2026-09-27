export type GeneratedArticle = {
  id: string;
  subject: string;
  title: string;
  summary: string;
  body: string;
  createdAt: string;
};

const STORAGE_KEY = "biopedia-atlas-ai-articles-v1";

const TOPIC_SEEDS: Record<string, string[]> = {
  philosophy: ["Virtue ethics in modern life","The hard problem of consciousness","Free will and determinism","Language games and meaning","Justice as fairness","Phenomenology of everyday experience","The examined life","Moral luck","Epistemic humility","Political legitimacy","Aesthetic judgment","Personal identity over time"],
  physics: ["Entropy and the arrow of time","Quantum entanglement basics","Spacetime curvature","Symmetry in nature","Black hole information","Wave-particle duality","The standard model overview","Cosmic microwave background","Noether's theorem","Thermodynamic equilibrium","Field theory intuition","Measurement problem"],
  mathematics: ["Proof by induction","Group theory in a nutshell","Limits and continuity","Topology of surfaces","Prime number distribution","Linear transformations","Gödel incompleteness","Category theory ideas","Complex numbers geometry","Probability axioms","Fractals and dimension","Combinatorial counting"],
  biology: ["Cell membrane dynamics","Gene regulatory networks","Natural selection mechanisms","Photosynthetic pathways","Neural plasticity","Microbiome ecology","Protein folding basics","Speciation patterns","Immune memory","Developmental signaling","Metabolic flux","Symbiosis strategies"],
  computing: ["Computational complexity","Distributed consensus","Type systems","Graph algorithms","Memory hierarchy","Cryptographic hashes","Neural net training","Operating system kernels","Compilers pipeline","Concurrency models","Information theory bits","Database indexing"],
  history: ["Agricultural revolution","Axial age thinkers","Silk road exchanges","Scientific revolution","Industrial transformation","Decolonization waves","Printing press impact","Maritime empires","Cold war science","Urbanization trends","Writing systems origin","Public health milestones"],
  mind: ["Working memory limits","Attention as selection","Language acquisition","Decision heuristics","Emotion and cognition","Sleep and consolidation","Social cognition","Perception binding","Motivation systems","Concept formation","Metacognition","Cognitive biases catalog"],
  systems: ["Feedback loops","Emergence in networks","Resilience engineering","Stock and flow models","Self-organization","Cascade failures","Scale-free networks","Homeostasis principles","Multi-agent coordination","Information bottlenecks","Adaptive cycles","Boundary conditions"],
  atlas: ["How knowledge graphs work","Linking concepts across fields","Curating a learning path","Measuring conceptual distance","Atlas navigation patterns","Cross-domain analogies","Knowledge compression","Serendipitous discovery","Annotation practices","Versioning ideas"],
};

function hashDay(subject: string, day: string): number {
  let h = 0;
  const s = `${subject}:${day}`;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function pickTopics(subject: string, day: string, count: number): string[] {
  const pool = TOPIC_SEEDS[subject] ?? TOPIC_SEEDS.atlas;
  const seed = hashDay(subject, day);
  const picks: string[] = [];
  const used = new Set<number>();
  for (let i = 0; i < count; i++) {
    let idx = (seed + i * 17) % pool.length;
    let guard = 0;
    while (used.has(idx) && guard < pool.length) {
      idx = (idx + 1) % pool.length;
      guard++;
    }
    used.add(idx);
    picks.push(pool[idx]!);
  }
  return picks;
}

function makeArticle(subject: string, title: string, day: string, index: number): GeneratedArticle {
  const summary = `A locally generated overview of “${title}” for the ${subject} cluster. Written for daily study without external model calls.`;
  const body = [`# ${title}`,"",summary,"","## Key ideas",`- Core claim: ${title} connects structure, process, and evidence within ${subject}.`,` - Practice: relate this topic to two neighboring nodes in the Knowledge Atlas.`,` - Check: write one question this article does not yet answer.`,"","## Why it matters today",`Generated on ${day} as item ${index + 1} of the daily batch for ${subject}. This content is deterministic template output so the Assist panel works offline and without API keys.`].join("\n");
  return { id: `${subject}-${day}-${index}`, subject, title, summary, body, createdAt: day };
}

export function generateDailyArticles(subjects: string[], perSubject = 10): { articles: GeneratedArticle[]; date: string } {
  const date = new Date().toISOString().slice(0, 10);
  const articles: GeneratedArticle[] = [];
  for (const subject of subjects) {
    const topics = pickTopics(subject, date, perSubject);
    topics.forEach((title, i) => articles.push(makeArticle(subject, title, date, i)));
  }
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ date, articles })); } catch { /* ignore */ }
  return { articles, date };
}

export function getStoredArticles(): { articles: GeneratedArticle[]; date: string | null } {
  if (typeof localStorage === "undefined") return { articles: [], date: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { articles: [], date: null };
    const parsed = JSON.parse(raw) as { date?: string; articles?: GeneratedArticle[] };
    return { articles: parsed.articles ?? [], date: parsed.date ?? null };
  } catch { return { articles: [], date: null }; }
}
