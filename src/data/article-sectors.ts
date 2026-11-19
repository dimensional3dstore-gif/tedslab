import type { Subject } from "@/lib/content";

export type ArticleSector = {
  slug: string;
  title: string;
  description: string;
  subject_slug: string;
  sort: number;
};

export const ARTICLE_SECTORS: ArticleSector[] = [
  { slug: "life-sciences", title: "Life Sciences", description: "Biology, organisms, genetics, evolution and ecosystems.", subject_slug: "biology", sort: 1 },
  { slug: "physical-sciences", title: "Physical Sciences", description: "Physics, chemistry, matter, energy and fundamental processes.", subject_slug: "science", sort: 2 },
  { slug: "earth-and-planetary", title: "Earth & Planetary Sciences", description: "Earth systems, geology, climate, oceans, atmosphere and planetary change.", subject_slug: "science", sort: 3 },
  { slug: "mathematics-and-logic", title: "Mathematics & Logic", description: "Mathematics, statistics, probability, formal logic and proof.", subject_slug: "mathematics", sort: 4 },
  { slug: "computing-and-technology", title: "Computing & Technology", description: "Computing, software, AI, networks, security and digital systems.", subject_slug: "technology", sort: 5 },
  { slug: "humanities-and-history", title: "Humanities & History", description: "History, philosophy, society, culture and human knowledge.", subject_slug: "history", sort: 6 },
  { slug: "language-and-literature", title: "Language & Literature", description: "Language, linguistics, writing, rhetoric and literature.", subject_slug: "english", sort: 7 },
  { slug: "mind-and-behaviour", title: "Mind & Behaviour", description: "Cognition, perception, learning, memory, emotion and behaviour.", subject_slug: "mind", sort: 8 },
  { slug: "systems-and-complexity", title: "Systems & Complexity", description: "Systems thinking, networks, feedback, emergence and resilience.", subject_slug: "systems", sort: 9 },
  { slug: "planetary-change", title: "Planetary Change", description: "Changes Earth and Earth-like worlds can undergo.", subject_slug: "change-encyclopaedia", sort: 10 },
  { slug: "quantum-science", title: "Quantum Science", description: "Quantum concepts, foundations, computation and experiment.", subject_slug: "quantumpedia", sort: 11 },
];

export function sectorForSubject(subjectSlug: string | null | undefined): ArticleSector {
  return ARTICLE_SECTORS.find((sector) => sector.subject_slug === subjectSlug) ?? ARTICLE_SECTORS[0];
}
