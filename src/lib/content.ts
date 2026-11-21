import { useQuery, queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { supabaseAuthConfigured } from "@/integrations/supabase/auth";
import {
  SUBJECTS,
  SECTIONS,
  TOPICS,
  ARTICLES,
  HERO_SLIDES,
  VIDEOS,
  PAGES,
  NAV_LINKS,
  SETTINGS,
} from "@/lib/catalog";
import { ARTICLES as ATLAS_ARTICLES } from "@/data/articles/compose";

export type Subject = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  icon: string | null;
  image_key: string | null;
  image_url: string | null;
  sort: number | null;
  published?: boolean | null;
};

export type SectionRow = {
  id: string;
  subject_id: string;
  slug: string;
  label: string;
  title: string;
  description: string | null;
  body: string | null;
  icon: string | null;
  image_key: string | null;
  image_url: string | null;
  sort: number | null;
  published?: boolean | null;
};

export type TopicRow = {
  id: string;
  section_id: string | null;
  subject_id: string;
  subject_slug: string;
  slug: string;
  title: string;
  blurb: string | null;
  body: string | null;
  image_url: string | null;
  sort: number | null;
  published?: boolean | null;
};

export type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  minutes: number | null;
  tone: string | null;
  subject_slug: string | null;
  section_slug: string | null;
  topic_slug: string;
  sector_slug?: string | null;
  image_key: string | null;
  image_url: string | null;
  video_url: string | null;
  published: boolean | null;
  expert_reviewed?: boolean | null;
  status?: "draft" | "review" | "published" | null;
  author_id?: string | null;
  sort: number | null;
  published?: boolean | null;
};

export const fallbackArticles: ArticleRow[] = ARTICLES;

const ATLAS_SUBJECT_MAP: Record<string, string> = {
  philosophy: "philosophy",
  physics: "science",
  mathematics: "mathematics",
  biology: "biology",
  computing: "technology",
  history: "history",
  english: "english",
  mind: "mind",
  systems: "systems",
};

// Curated cross-disciplinary placement for Knowledge Atlas articles.
// The source cluster remains intact in the Atlas graph; this mapping controls
// the broad subject shelves shown in the Ted's Lab encyclopedia.
const ATLAS_ARTICLE_SUBJECT_OVERRIDES: Record<string, string> = {
  // Legacy/public Knowledge Atlas paths retained as article slugs.
  "atlas-cell-biology": "biology",
  "genetics-dna-dna-structure": "biology",
  "evolution-natural-selection": "biology",
  "plants-photosynthesis": "biology",
  "human-biology-immune-system": "biology",
  "atlas-microbiome": "biology",
  "biotechnology-crispr": "biology",
  "atlas-darwin": "biology",
  "organisms-taxonomy": "biology",

  "atlas-classical-mechanics": "science",
  "atlas-quantum-mechanics": "science",
  "atlas-relativity": "science",
  "atlas-thermodynamics": "science",
  "chemistry-periodic-table": "science",
  "atlas-cosmology": "science",
  "atlas-higgs-boson": "science",
  "atlas-black-holes": "science",
  "atlas-electromagnetism": "science",
  "atlas-einstein": "science",

  "atlas-calculus": "mathematics",
  "atlas-linear-algebra": "mathematics",
  "atlas-number-theory": "mathematics",
  "atlas-graph-theory": "mathematics",
  "atlas-category-theory": "mathematics",
  "atlas-set-theory": "mathematics",
  "atlas-complex-numbers": "mathematics",
  "geometry-euclidean-proof": "mathematics",
  "atlas-godel": "mathematics",

  "atlas-algorithms": "technology",
  "artificial-intelligence-machine-learning": "technology",
  "artificial-intelligence-neural-networks": "technology",
  "atlas-computation-theory": "technology",
  "cybersecurity-cryptography": "technology",
  "atlas-operating-systems": "technology",
  "artificial-intelligence-language-models": "technology",
  "atlas-turing": "technology",
  "atlas-open-source": "technology",

  "atlas-cognitive-psychology": "mind",
  "atlas-consciousness": "mind",
  "atlas-perception": "mind",
  "atlas-working-memory": "mind",
  "atlas-neuroplasticity": "mind",
  "atlas-cognitive-bias": "mind",
  "atlas-dual-process": "mind",
  "atlas-kahneman": "mind",

  "atlas-epistemology": "philosophy",
  "topic-ethics": "philosophy",
  "atlas-metaphysics": "philosophy",
  "atlas-existentialism": "philosophy",
  "atlas-philosophy-of-mind": "philosophy",
  "atlas-utilitarianism": "philosophy",
  "atlas-kant": "philosophy",
  "atlas-socrates": "philosophy",

  "atlas-systems-thinking": "systems",
  "atlas-chaos-theory": "systems",
  "atlas-emergence": "systems",
  "topic-feedback-control": "systems",
  "atlas-scale-free-networks": "systems",
  "atlas-autopoiesis": "systems",
  "atlas-meadows": "systems",

  "atlas-ancient-civilizations": "history",
  "ancient-world-classical-greece": "history",
  "revolutions-industrial-revolution": "history",
  "atlas-scientific-revolution": "history",
  "atlas-french-revolution": "history",
  "atlas-world-wars": "history",
  "atlas-silk-road": "history",
  "atlas-decolonization": "history",

  "atlas-language-acquisition": "english",
  "grammar-syntax": "english",
  "atlas-information-theory": "english",
  "literature-narrative-form": "english",
  "atlas-poetry": "english",
  "atlas-chomsky": "english",
  "atlas-shannon": "english",

  "abstract-algebra": "biology",
  "cell-biology": "biology",
  "natural-selection": "biology",
  photosynthesis: "biology",
  "immune-system": "biology",
  microbiome: "biology",
  crispr: "biology",
  darwin: "biology",

  "classical-mechanics": "science",
  "quantum-mechanics": "science",
  relativity: "science",
  thermodynamics: "science",
  cosmology: "science",
  "black-holes": "science",
  electromagnetism: "science",
  einstein: "science",
  "higgs-boson": "science",

  calculus: "mathematics",
  "linear-algebra": "mathematics",
  "number-theory": "mathematics",
  "graph-theory": "mathematics",
  "category-theory": "mathematics",
  "set-theory": "mathematics",
  "complex-numbers": "mathematics",
  godel: "mathematics",

  algorithms: "technology",
  "machine-learning": "technology",
  "neural-networks": "technology",
  "computation-theory": "technology",
  cryptography: "technology",
  "operating-systems": "technology",
  turing: "technology",
  "open-source": "technology",

  "cognitive-psychology": "mind",
  consciousness: "mind",
  perception: "mind",
  "working-memory": "mind",
  neuroplasticity: "mind",
  "cognitive-bias": "mind",
  "dual-process": "mind",
  kahneman: "mind",

  epistemology: "philosophy",
  ethics: "philosophy",
  metaphysics: "philosophy",
  existentialism: "philosophy",
  "philosophy-of-mind": "philosophy",
  utilitarianism: "philosophy",
  kant: "philosophy",
  socrates: "philosophy",

  "systems-thinking": "systems",
  "chaos-theory": "systems",
  emergence: "systems",
  "feedback-control": "systems",
  "scale-free-networks": "systems",
  autopoiesis: "systems",
  meadows: "systems",

  "ancient-civilizations": "history",
  "classical-greece": "history",
  "industrial-revolution": "history",
  "scientific-revolution": "history",
  "french-revolution": "history",
  "world-wars": "history",
  "silk-road": "history",
  decolonization: "history",

  "language-acquisition": "english",
  syntax: "english",
  "information-theory": "english",
  "narrative-form": "english",
  poetry: "english",
  chomsky: "english",
  shannon: "english",
};

/** Code-structured Knowledge Atlas articles are first-class website articles too. */
export const atlasArticleRows: ArticleRow[] = Object.values(ATLAS_ARTICLES).map((article) => ({
  id: "atlas-" + article.id,
  slug: "atlas-" + article.id,
  title: article.title,
  excerpt: article.summary,
  body: article.body,
  minutes: Math.max(4, Math.round(article.wordCount / 220)),
  tone: "atlas",
  subject_slug: ATLAS_ARTICLE_SUBJECT_OVERRIDES[article.id] ?? ATLAS_SUBJECT_MAP[article.cluster] ?? article.cluster,
  section_slug: "knowledge-atlas",
  topic_slug: (() => {
    const text = (article.title + " " + article.summary).toLowerCase();
    const cluster = article.cluster;
    if (cluster === "biology") {
      if (/gene|dna|crispr|hered|evolution|darwin|natural selection/.test(text)) return "genes-and-evolution";
      if (/cell|microbi|organism|taxonomy|species/.test(text)) return "cells-and-organisms";
      if (/human|immune|body|physiolog|neuro/.test(text)) return "human-biology";
      if (/ecology|ecosystem|biome|conservation|biotechn/.test(text)) return "ecology-and-biotechnology";
      return "life-and-biology";
    }
    if (cluster === "science" || cluster === "physics") {
      if (/quantum|relativ|spacetime/.test(text)) return "quantum-and-relativity";
      if (/mechanic|motion|force|gravity|momentum/.test(text)) return "motion-and-mechanics";
      if (/electromagnet|wave|light|optic|field/.test(text)) return "fields-waves-and-light";
      if (/cosmolog|black hole|galax|universe|planet|earth/.test(text)) return "earth-and-universe";
      return "matter-and-energy";
    }
    if (cluster === "mathematics") {
      if (/calculus|derivative|integral|limit|analysis/.test(text)) return "calculus-and-analysis";
      if (/geometry|euclidean|shape|space|coordinate/.test(text)) return "geometry-and-space";
      if (/algebra|number|complex/.test(text)) return "algebra-and-number";
      if (/graph|set|category|combin|probab|statistic|discrete/.test(text)) return "discrete-and-applied";
      return "foundations-and-logic";
    }
    if (cluster === "technology" || cluster === "computing") {
      if (/machine learning|neural|language model|artificial intelligence|ai|data/.test(text)) return "ai-and-data";
      if (/operating system|network|distributed|hardware|architecture/.test(text)) return "systems-and-networks";
      if (/cryptograph|cyber|security|computation theory|privacy/.test(text)) return "security-and-theory";
      if (/algorithm|program|software|open source|code/.test(text)) return "algorithms-and-software";
      return "computing-foundations";
    }
    if (cluster === "mind") {
      if (/percept|vision|sensory|conscious/.test(text)) return "perception-and-consciousness";
      if (/brain|neuro|behavio|plastic/.test(text)) return "brain-and-behaviour";
      if (/develop|child|social|personality|language/.test(text)) return "development-and-social-mind";
      if (/emotion|motivat|bias|decision|kahneman|judg/.test(text)) return "emotion-and-decision";
      return "cognition-and-learning";
    }
    if (cluster === "philosophy") {
      if (/ethic|moral|virtue|justice|right|duty/.test(text)) return "ethics-and-values";
      if (/politic|state|democra|liberty|authority|society/.test(text)) return "society-and-politics";
      if (/existential|meaning|purpose|art|beauty|aesthetic/.test(text)) return "meaning-and-existence";
      if (/reality|exist|caus|time|identity|mind|conscious/.test(text)) return "reality-and-mind";
      return "knowledge-and-reason";
    }
    if (cluster === "systems") {
      if (/network|graph|connect/.test(text)) return "networks-and-connectivity";
      if (/complex|emerg|adapt|chaos/.test(text)) return "complexity-and-emergence";
      if (/feedback|control|regulat/.test(text)) return "feedback-and-control";
      if (/information|entropy|signal|communicat|resilien|risk|sustain/.test(text)) return "information-and-resilience";
      return "systems-thinking";
    }
    if (cluster === "history") {
      if (/ancient|classical|greece|rome|civilization/.test(text)) return "ancient-and-classical-world";
      if (/medieval|silk road|trade|religion|exchange/.test(text)) return "medieval-and-global-exchange";
      if (/revolution|industrial|scientific revolution/.test(text)) return "revolutions-and-industrialisation";
      if (/war|conflict|world war|military/.test(text)) return "wars-and-conflict";
      return "colonialism-and-global-change";
    }
    if (cluster === "english" || cluster === "language") {
      if (/poetry|poem|meter|rhyme|verse/.test(text)) return "poetry-and-expression";
      if (/literature|narrative|story|character|novel|theme/.test(text)) return "literature-and-narrative";
      if (/syntax|grammar|morpholog|semantic|structure/.test(text)) return "grammar-and-structure";
      if (/information theory|shannon|signal|communication|rhetoric/.test(text)) return "communication-and-information";
      return "language-and-linguistics";
    }
    return "life-and-biology";
  })(),
  image_key: null,
  image_url: null,
  video_url: null,
  published: true,
  expert_reviewed: true,
  status: "published",
  sort: 0,
}));

export const websiteFallbackArticles: ArticleRow[] = [...ARTICLES, ...atlasArticleRows];

export type HeroSlideRow = {
  id: string;
  subject_slug: string | null;
  title: string;
  subtitle: string | null;
  body: string | null;
  image_key: string | null;
  image_url: string | null;
  link_to: string | null;
  video_url: string | null;
  sort: number | null;
  active: boolean | null;
};

export type VideoRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  url: string;
  poster_url: string | null;
  subject_slug: string | null;
  sort: number | null;
};

export type PageRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  body: string | null;
  image_url: string | null;
  published: boolean | null;
  status?: "draft" | "review" | "published" | null;
  show_in_nav: boolean | null;
  sort: number | null;
};

export type NavLinkRow = {
  id: string;
  label: string;
  href: string;
  icon: string | null;
  group_name: string | null;
  sort: number | null;
};

export async function fetchCatalogRows<T extends { id: string }>(
  table: string,
  fallback: T[],
): Promise<T[]> {
  if (!supabaseAuthConfigured) return fallback;
  let data: unknown[] | null = null;
  try {
    const columns = table === "subjects"
      ? "id,slug,title,description,icon,image_key,image_url,sort,published"
      : table === "topics"
        ? "id,section_id,subject_id,subject_slug,slug,title,blurb,image_url,sort,published"
        : "*";
    let query = supabase.from(table).select(columns);
    // Keep the public feed deterministic even for signed-in admins, whose RLS
    // policy also permits reading drafts.
    if (table === "articles") {
      query = query.eq("published", true).eq("status", "published");
    } else if (table === "sections" || table === "subjects" || table === "topics") {
      query = query.eq("published", true);
    } else if (table === "pages") {
      query = query.eq("published", true).eq("status", "published");
    }
    const result = await query.order("sort", { ascending: true });
    if (result.error) return fallback;
    data = result.data;
  } catch {
    return fallback;
  }
  const remoteRows = (data ?? []) as unknown as T[];
  // Prefer cached/bundled rows immediately, then let Supabase update them in the background.
  if (table === "subjects" || table === "topics") {
    const remoteById = new Map(remoteRows.map((row) => [row.id, row]));
    const fallbackIds = new Set(fallback.map((row) => row.id));
    return [
      ...fallback.map((row) => remoteById.get(row.id) ?? row),
      ...remoteRows.filter((row) => !fallbackIds.has(row.id)),
    ];
  }
  if (table === "articles") {
    const publicRows = remoteRows
      .filter((row) => {
        const article = row as { published?: boolean | null; status?: string | null };
        return article.published === true && article.status === "published";
      })
      .map((row) => {
        const article = row as ArticleRow;
        const atlasId = article.slug.startsWith("atlas-")
          ? article.slug.slice("atlas-".length)
          : "";
        const subjectSlug =
          ATLAS_ARTICLE_SUBJECT_OVERRIDES[article.slug] ??
          ATLAS_ARTICLE_SUBJECT_OVERRIDES[atlasId];
        return subjectSlug ? { ...row, subject_slug: subjectSlug } : row;
      });
    const remoteBySlug = new Map(
      publicRows.map((row) => [(row as { slug?: string }).slug, row]),
    );
    // QuantumPedia articles are bundled with their expanded source context.
    // Do not let an older CMS seed overwrite the expanded offline catalogue.
    const merged = fallback.map((row) => {
      const remote = remoteBySlug.get((row as { slug?: string }).slug) as ArticleRow | undefined;
      if (!remote) return row;
      if ((row as ArticleRow).slug.startsWith("quantumpedia-")) {
        try {
          const remoteVersion = JSON.parse(remote.body ?? "{}")?.version ?? 0;
          if (remoteVersion < 2) return row;
        } catch {
          return row;
        }
      }
      return remote;
    });
    const fallbackSlugs = new Set(
      fallback.map((row) => (row as { slug?: string }).slug),
    );
    return [
      ...merged,
      ...publicRows.filter(
        (row) => !fallbackSlugs.has((row as { slug?: string }).slug),
      ),
    ];
  }
  if (!remoteRows.length) return fallback;
  const remoteById = new Map(remoteRows.map((row) => [row.id, row]));
  const fallbackIds = new Set(fallback.map((row) => row.id));
  return [
    ...fallback.map((row) => remoteById.get(row.id) ?? row),
    ...remoteRows.filter((row) => !fallbackIds.has(row.id)),
  ];
}

export async function fetchCatalogRow<T>(
  table: string,
  column: string,
  value: string,
  fallback: T[],
): Promise<T | null> {
  if (!supabaseAuthConfigured) {
    return (
      fallback.find(
        (row) => (row as Record<string, unknown>)[column] === value,
      ) ?? null
    );
  }
  try {
    const columns = table === "subjects"
      ? "id,slug,title,description,icon,image_key,image_url,sort,published"
      : table === "topics"
        ? "id,section_id,subject_id,subject_slug,slug,title,blurb,image_url,sort,published"
        : "*";
    const { data, error } = await supabase
      .from(table)
      .select(columns)
      .eq(column, value)
      .limit(1);
    if (!error) return data?.length
      ? data[0] as unknown as T
      : fallback.find((row) => (row as Record<string, unknown>)[column] === value) ?? null;
    // Keep the bundled catalog available when the backing service is offline.
  } catch {
    // Keep the bundled catalog available when the backing service is offline.
  }
  return (
    fallback.find(
      (row) => (row as Record<string, unknown>)[column] === value,
    ) ?? null
  );
}

export const subjectsQueryOptions = queryOptions({
  queryKey: ["subjects"],
  queryFn: () => fetchCatalogRows("subjects", SUBJECTS),
  initialData: SUBJECTS,
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  refetchOnWindowFocus: false,
  retry: 1,
});

export const sectionsQueryOptions = queryOptions({
  queryKey: ["sections"],
  queryFn: () => fetchCatalogRows("sections", SECTIONS),
  initialData: SECTIONS,
});

export const topicsQueryOptions = queryOptions({
  queryKey: ["topics"],
  queryFn: () => fetchCatalogRows("topics", TOPICS),
  initialData: TOPICS,
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  refetchOnWindowFocus: false,
  retry: 1,
});

export const articlesQueryOptions = queryOptions({
  queryKey: ["articles"],
  queryFn: () => fetchCatalogRows("articles", websiteFallbackArticles),
  initialData: websiteFallbackArticles,
});

export const heroSlidesQueryOptions = queryOptions({
  queryKey: ["hero_slides"],
  queryFn: () => fetchCatalogRows("hero_slides", HERO_SLIDES),
  initialData: HERO_SLIDES,
});

export const videosQueryOptions = queryOptions({
  queryKey: ["videos"],
  queryFn: () => fetchCatalogRows("videos", VIDEOS),
  initialData: VIDEOS,
});

export const pagesQueryOptions = queryOptions({
  queryKey: ["pages"],
  queryFn: () => fetchCatalogRows("pages", PAGES),
  initialData: PAGES,
});

export const navLinksQueryOptions = queryOptions({
  queryKey: ["nav_links"],
  queryFn: () => fetchCatalogRows("nav_links", NAV_LINKS),
  initialData: NAV_LINKS,
});

export const settingsQueryOptions = queryOptions({
  queryKey: ["site_settings"],
  queryFn: async () => {
    if (!supabaseAuthConfigured) return SETTINGS;
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");
      if (!error && data?.length) {
        return {
          ...SETTINGS,
          ...Object.fromEntries(data.map(({ key, value }) => [key, value])),
        };
      }
    } catch {
      // Keep the bundled settings available when the backing service is offline.
    }
    return SETTINGS;
  },
  initialData: SETTINGS,
});

export function useSubjects() {
  return useQuery(subjectsQueryOptions);
}

export function useSections() {
  return useQuery(sectionsQueryOptions);
}

export function useTopics() {
  return useQuery(topicsQueryOptions);
}

export const articleByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["article", "id", id],
    queryFn: async () => {
      if (!supabaseAuthConfigured) {
        return websiteFallbackArticles.find((article) => article.id === id) ?? null;
      }

      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("id", id)
          .eq("published", true)
          .eq("status", "published")
          .maybeSingle();
        if (!error && data) {
          const remote = data as ArticleRow;
          if (remote.slug?.startsWith("quantumpedia-")) {
            const bundled = websiteFallbackArticles.find((article) => article.id === id);
            try {
              const remoteVersion = JSON.parse(remote.body ?? "{}")?.version ?? 0;
              if (bundled && remoteVersion < 2) return bundled;
            } catch {
              if (bundled) return bundled;
            }
          }
          return remote;
        }
      } catch {
        return websiteFallbackArticles.find((article) => article.id === id) ?? null;
      }

      return websiteFallbackArticles.find((article) => article.id === id) ?? null;
    },
  });

export function useArticles() {
  return useQuery(articlesQueryOptions);
}

export function useAdminArticles() {
  return useQuery({
    queryKey: ["admin", "articles"],
    queryFn: async () => {
      if (!supabaseAuthConfigured) return websiteFallbackArticles;
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ArticleRow[];
    },
    staleTime: 30 * 1000,
  });
}

export function useArticleById(id: string) {
  return useQuery(articleByIdQueryOptions(id));
}

export function useHeroSlides() {
  return useQuery(heroSlidesQueryOptions);
}

export function useVideos() {
  return useQuery(videosQueryOptions);
}

export function usePages() {
  return useQuery(pagesQueryOptions);
}

export function useNavLinks() {
  return useQuery(navLinksQueryOptions);
}

export function useSettings() {
  return useQuery(settingsQueryOptions);
}
