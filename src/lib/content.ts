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
  section_id: string;
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
  topic_slug: string | null;
  image_key: string | null;
  image_url: string | null;
  video_url: string | null;
  published: boolean | null;
  status?: "draft" | "review" | "published" | null;
  sort: number | null;
};

export const fallbackArticles: ArticleRow[] = ARTICLES;

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
    const result = await supabase
      .from(table)
      .select("*")
      .order("sort", { ascending: true });
    if (result.error) return fallback;
    data = result.data;
  } catch {
    return fallback;
  }
  if (!data?.length) return fallback;

  const remoteRows = data as unknown as T[];
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
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq(column, value);
    if (!error && data?.length) return data[0] as unknown as T;
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
});

export const articlesQueryOptions = queryOptions({
  queryKey: ["articles"],
  queryFn: () => fetchCatalogRows("articles", ARTICLES),
  initialData: ARTICLES,
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

export function useArticles() {
  return useQuery(articlesQueryOptions);
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
