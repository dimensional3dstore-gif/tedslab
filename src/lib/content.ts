import { useQuery, queryOptions } from "@tanstack/react-query";
import { TABLES, SUBJECTS, SECTIONS, TOPICS, ARTICLES, HERO_SLIDES, VIDEOS, PAGES, NAV_LINKS, SETTINGS } from "@/lib/catalog";

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

void TABLES;

export const subjectsQueryOptions = queryOptions({
  queryKey: ["subjects"],
  queryFn: async () => SUBJECTS,
});

export const sectionsQueryOptions = queryOptions({
  queryKey: ["sections"],
  queryFn: async () => SECTIONS,
});

export const topicsQueryOptions = queryOptions({
  queryKey: ["topics"],
  queryFn: async () => TOPICS,
});

export const articlesQueryOptions = queryOptions({
  queryKey: ["articles"],
  queryFn: async () => ARTICLES,
});

export const heroSlidesQueryOptions = queryOptions({
  queryKey: ["hero_slides"],
  queryFn: async () => HERO_SLIDES,
});

export const videosQueryOptions = queryOptions({
  queryKey: ["videos"],
  queryFn: async () => VIDEOS,
});

export const pagesQueryOptions = queryOptions({
  queryKey: ["pages"],
  queryFn: async () => PAGES,
});

export const navLinksQueryOptions = queryOptions({
  queryKey: ["nav_links"],
  queryFn: async () => NAV_LINKS,
});

export const settingsQueryOptions = queryOptions({
  queryKey: ["site_settings"],
  queryFn: async () => SETTINGS,
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
