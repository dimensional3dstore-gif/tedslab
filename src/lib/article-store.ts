import { supabase } from "@/integrations/supabase/client";
import type { ArticleRow } from "@/lib/content";

export async function upsertCustomArticle(article: ArticleRow) {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) throw sessionError;
  if (!sessionData.session?.user) {
    throw new Error("Your admin session has expired. Sign in again before saving an article.");
  }

  const payload = {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    body: article.body,
    minutes: article.minutes,
    tone: article.tone,
    subject_slug: article.subject_slug,
    section_slug: article.section_slug,
    topic_slug: article.topic_slug,
    image_key: article.image_key,
    image_url: article.image_url,
    video_url: article.video_url,
    published: Boolean(article.published),
    status: article.status ?? (article.published ? "published" : "draft"),
    sort: article.sort ?? 0,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("articles")
    .upsert(payload, { onConflict: "id" })
    .select("*")
    .single();

  if (error) {
    throw new Error(
      error.code === "42501"
        ? "You do not have permission to edit articles. Confirm your account has the Ted's Lab admin role."
        : error.message,
    );
  }

  return data as ArticleRow;
}

export async function deleteCustomArticle(id: string) {
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw error;
}

export function slugifyTitle(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 80) || "untitled-article"
  );
}
