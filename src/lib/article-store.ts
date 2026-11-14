import { supabase } from "@/integrations/supabase/client";
import type { ArticleRow } from "@/lib/content";

export async function upsertCustomArticle(article: ArticleRow) {
  const { data, error } = await supabase
    .from("articles")
    .upsert({ ...article, updated_at: new Date().toISOString() }, { onConflict: "id" })
    .select("*")
    .single();
  if (error) throw error;
  return data as unknown as ArticleRow;
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
