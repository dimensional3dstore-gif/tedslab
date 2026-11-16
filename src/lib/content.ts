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
  image_key: string | null;
  image_url: string | null;
  video_url: string | null;
  published: boolean | null;
  expert_reviewed?: boolean | null;
  status?: "draft" | "review" | "published" | null;
  sort: number | null;
};

export const fallbackArticles: ArticleRow[] = ARTICLES;

const ATLAS_SUBJECT_MAP: Record<string, string> = {
  physics: "science",
  computing: "technology",
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
  subject_slug: ATLAS_SUBJECT_MAP[article.cluster] ?? article.cluster,
  section_slug: "knowledge-atlas",
  topic_slug: "knowledge-atlas",
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
      ? "id,slug,title,description,icon,image_key,image_url,sort"
      : table === "topics"
        ? "id,section_id,subject_id,subject_slug,slug,title,blurb,image_url,sort"
        : "*";
    let query = supabase.from(table).select(columns);
    // Keep the public feed deterministic even for signed-in admins, whose RLS
    // policy also permits reading drafts.
    if (table === "articles") {
      query = query.eq("published", true).eq("status", "published");
    }
    const result = await query.order("sort", { ascending: true });
    if (result.error) {
      if (table === "subjects" || table === "topics") throw result.error;
      return fallback;
    }
    data = result.data;
  } catch (error) {
    if (table === "subjects" || table === "topics") throw error;
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
    const publicRows = remoteRows.filter((row) => {
      const article = row as { published?: boolean | null; status?: string | null };
      return article.published === true && article.status === "published";
    });
    const remoteBySlug = new Map(
      publicRows.map((row) => [(row as { slug?: string }).slug, row]),
    );
    // Bundled catalogue and Knowledge Atlas articles are the guaranteed baseline.
    // Supabase may enrich/replace them when a published CMS version exists.
    const merged = fallback.map(
      (row) => remoteBySlug.get((row as { slug?: string }).slug) ?? row,
    );
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
      ? "id,slug,title,description,icon,image_key,image_url,sort"
      : table === "topics"
        ? "id,section_id,subject_id,subject_slug,slug,title,blurb,image_url,sort"
        : "*";
    const { data, error } = await supabase
      .from(table)
      .select(columns)
      .eq(column, value)
      .limit(1);
    if (!error) return data?.length ? data[0] as unknown as T : table === "subjects" ? null : fallback.find((row) => (row as Record<string, unknown>)[column] === value) ?? null;
    if (table === "subjects" || table === "topics") throw error;
  } catch (error) {
    if (table === "subjects" || table === "topics") throw error;
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
          .maybeSingle();
        if (!error) return (data as ArticleRow | null) ?? null;
      } catch {
        return websiteFallbackArticles.find((article) => article.id === id) ?? null;
      }

      return websiteFallbackArticles.find((article) => article.id === id) ?? null;
    },
  });

export function useArticles() {
  return useQuery(articlesQueryOptions);
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
