import type { ArticleRow, Subject, TopicRow } from "@/lib/content";

export const QUANTUM_SUBJECT: Subject = {
  id: "sub-quantum",
  slug: "quantum",
  title: "Quantum",
  description:
    "Quantum science, physics, mechanics, computing, biology and the theories that describe quantum systems.",
  icon: "Atom",
  image_key: "sci-physics",
  image_url: null,
  sort: 9,
};

export const QUANTUM_TOPICS: TopicRow[] = [
  {
    id: "broad-topic-quantum-science-and-theory",
    section_id: null,
    subject_id: "sub-quantum",
    subject_slug: "quantum",
    slug: "quantum-science-and-theory",
    title: "Quantum Science & Theory",
    blurb: "The broad scientific and theoretical foundations of quantum phenomena, information and technology.",
    body: "The broad scientific and theoretical foundations of quantum phenomena, information and technology.",
    image_url: null,
    sort: 1,
  },
  {
    id: "broad-topic-quantum-physics",
    section_id: null,
    subject_id: "sub-quantum",
    subject_slug: "quantum",
    slug: "quantum-physics",
    title: "Quantum Physics",
    blurb: "Physical phenomena governed by quantisation, superposition, uncertainty, measurement and quantum fields.",
    body: "Physical phenomena governed by quantisation, superposition, uncertainty, measurement and quantum fields.",
    image_url: null,
    sort: 2,
  },
  {
    id: "broad-topic-quantum-computing",
    section_id: null,
    subject_id: "sub-quantum",
    subject_slug: "quantum",
    slug: "quantum-computing",
    title: "Quantum Computing",
    blurb: "Qubits, quantum circuits, algorithms, hardware, benchmarking and applications of quantum information processing.",
    body: "Qubits, quantum circuits, algorithms, hardware, benchmarking and applications of quantum information processing.",
    image_url: null,
    sort: 3,
  },
  {
    id: "broad-topic-quantum-mechanics",
    section_id: null,
    subject_id: "sub-quantum",
    subject_slug: "quantum",
    slug: "quantum-mechanics",
    title: "Quantum Mechanics",
    blurb: "The mathematical framework used to describe states, observables, dynamics, measurement and microscopic systems.",
    body: "The mathematical framework used to describe states, observables, dynamics, measurement and microscopic systems.",
    image_url: null,
    sort: 4,
  },
  {
    id: "broad-topic-quantum-biology",
    section_id: null,
    subject_id: "sub-quantum",
    subject_slug: "quantum",
    slug: "quantum-biology",
    title: "Quantum Biology",
    blurb: "Research into quantum effects and mechanisms in biological systems, including photosynthesis, sensing and molecular processes.",
    body: "Research into quantum effects and mechanisms in biological systems, including photosynthesis, sensing and molecular processes.",
    image_url: null,
    sort: 5,
  },
];

const qp = (title: string, summary: string, topic: string, sourceUrl: string, minutes: number): ArticleRow => ({
  id: `quantumpedia-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
  slug: `quantumpedia-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
  title,
  excerpt: summary,
  body: JSON.stringify({
    version: 1,
    tags: ["QuantumPedia", "Quantum", "Ted's Lab"],
    facts: [
      { label: "Subject", value: "Quantum" },
      { label: "Topic", value: QUANTUM_TOPICS.find((t) => t.slug === topic)?.title ?? topic },
      { label: "Source", value: "QuantumPedia" },
      { label: "Editorial status", value: "Imported reference" },
    ],
    overview: [
      summary,
      "This Ted's Lab edition presents the source topic in Ted's Lab's structured scientific-reference format.",
    ],
    sections: [
      {
        heading: "What the source covers",
        paragraphs: [summary],
        cards: [
          { title: "Key idea", text: "The article is presented as a learning reference within Ted's Lab's Quantum subject." },
          { title: "Quantum context", text: "Use it with the related Quantum topics to connect theory, physical phenomena, computation and applications." },
          { title: "Study approach", text: "Start with the definitions, trace the mechanism or algorithm, then compare the claims with the cited research." },
        ],
      },
      {
        heading: "Key concepts to study",
        paragraphs: [
          "Identify the central quantum concepts introduced by the source, define each precisely, and connect it to the mathematical or physical model used to describe it.",
          "Where an algorithm, benchmark or application is discussed, distinguish the underlying quantum principle from practical engineering or computational claims.",
        ],
      },
      {
        heading: "Evidence, limitations, and references",
        paragraphs: [
          `Source: QuantumPedia — ${title} — ${sourceUrl}`,
          "This is an original Ted's Lab educational presentation of the source topic, not a reproduction of the source article. Consult the original publication and its cited references for the complete discussion, figures and evidence.",
        ],
      },
    ],
  }),
  minutes,
  tone: "scientific",
  subject_slug: "quantum",
  section_slug: null,
  topic_slug: topic,
  image_key: "sci-physics",
  image_url: null,
  video_url: null,
  published: true,
  status: "published",
  sort: 200,
});

export const QUANTUMPEDIA_ARTICLES: ArticleRow[] = [
  qp("Quantum Process Unit (QPU) Benchmarking: A Comparative Analysis", "A survey of ways to evaluate quantum processors, including Quantum Volume, randomized benchmarking and application-oriented approaches.", "quantum-computing", "https://quantumpedia.uk/quantum-process-unit-qpu-benchmarking-a-comparative-analysis-89a6e7b1b447", 11),
  qp("Will Quantum Technology Transform the Nature of Warfare?", "A review of potential military applications of quantum technology, including sensing and secure communication, together with ethical and security considerations.", "quantum-science-and-theory", "https://quantumpedia.uk/will-quantum-technology-transform-the-nature-of-warfare-e1d835e5d182", 15),
  qp("A Brief History of Quantum Computing", "A historical overview tracing quantum computing from early quantum theory through the emergence of quantum computers, algorithms and modern hardware research.", "quantum-computing", "https://quantumpedia.uk/a-brief-history-of-quantum-computing-e0bbd05893d0", 14),
  qp("Quantum Algorithm (6): Bernstein-Vazirani Algorithm", "An introduction to the Bernstein-Vazirani algorithm and the role of phase kickback in extracting a hidden bit string with a quantum circuit.", "quantum-computing", "https://quantumpedia.uk/quantum-algorithm-6-bernstein-vazirani-algorithm-f371ea83256e", 7),
  qp("Quantum Algorithm (4): HHL Algorithm for Linear Systems of Equations", "An overview of HHL, a quantum algorithm for linear systems that encodes a problem into quantum states and uses quantum operations to estimate aspects of its solution.", "quantum-computing", "https://quantumpedia.uk/quantum-algorithm-4-hhl-algorithm-for-linear-systems-of-equations-40619daec41d", 8),
  qp("Quantum Algorithm (7): Variational Quantum Eigensolver Algorithm for Quantum Chemistry", "An introduction to VQE as a hybrid quantum-classical approach for estimating molecular energies and exploring quantum chemistry problems.", "quantum-computing", "https://quantumpedia.uk/quantum-algorithm-7-variational-quantum-eigensolver-algorithm-for-quantum-chemistry-23a4f9aa73b3", 9),
  qp("Quantum Algorithm (5): Quantum Optimization Algorithm — Quantum Annealing", "An overview of quantum annealing as an approach to optimization based on finding low-energy states of a physical system.", "quantum-computing", "https://quantumpedia.uk/quantum-algorithm-5-quantum-optimization-algorithm-quantum-annealing-279b64ae3ac9", 8),
  qp("Quantum Algorithm (3): Deutsch-Jozsa Algorithm", "An introduction to the Deutsch-Jozsa problem and how a quantum algorithm can distinguish constant from balanced functions with a small number of oracle queries.", "quantum-computing", "https://quantumpedia.uk/quantum-algorithm-3-deutsch-jozsa-algorithm-f242d3d859bc", 9),
  qp("Quantum Algorithm (2): Grover's Algorithm for Unstructured Search", "An overview of Grover's algorithm and its quadratic query advantage for searching an unstructured space.", "quantum-computing", "https://quantumpedia.uk/quantum-algorithm-2-grovers-algorithm-for-unstructured-search-bd91a7040371", 8),
  qp("Quantum Algorithm (1): Shor's Algorithm for Factorization — Part 2", "A continuation of the Shor algorithm series focusing on the quantum Fourier transform and its role in period finding and factorization.", "quantum-computing", "https://quantumpedia.uk/quantum-algorithm-1-shors-algorithm-for-factorization-part-2-a4f1090d633a", 8),
];
