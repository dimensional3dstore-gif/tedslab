import type { ArticleRow } from "@/lib/content";

const KEY = "tedslab-custom-articles-v1";

export function loadCustomArticles(): ArticleRow[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ArticleRow[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomArticles(articles: ArticleRow[]) {
  localStorage.setItem(KEY, JSON.stringify(articles));
}

export function upsertCustomArticle(article: ArticleRow) {
  const all = loadCustomArticles();
  const idx = all.findIndex((a) => a.id === article.id || a.slug === article.slug);
  if (idx >= 0) all[idx] = article;
  else all.unshift(article);
  saveCustomArticles(all);
  return article;
}

export function deleteCustomArticle(id: string) {
  saveCustomArticles(loadCustomArticles().filter((a) => a.id !== id));
}

export function slugifyTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80) || "untitled-article";
}
