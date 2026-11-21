import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export type BlogPost = {
  id: string;
  author_id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  cover_image_url: string | null;
  tags: string[];
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export function usePublishedBlogPosts() {
  return useQuery({
    queryKey: ["blog-posts", "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as BlogPost[];
    },
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ["blog-post", slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (error) throw error;
      return data as BlogPost | null;
    },
  });
}

export function useBlogPostById(id: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["blog-post", "id", id, user?.id],
    enabled: Boolean(id && user),
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .eq("author_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data as BlogPost | null;
    },
  });
}

export function useMyBlogPosts() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["blog-posts", "mine", user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("author_id", user.id)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as BlogPost[];
    },
  });
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

export function useSaveBlogPost() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (input: {
      id?: string;
      title: string;
      excerpt: string;
      body: string;
      cover_image_url?: string;
      tags: string[];
      status: "draft" | "published";
    }) => {
      if (!user) throw new Error("Sign in to publish a blog post.");
      const baseSlug = slugify(input.title) || "untitled-post";
      let slug = input.id ? baseSlug : baseSlug + "-" + Date.now().toString(36);
      if (input.id) {
        const { data: collision } = await supabase
          .from("blog_posts")
          .select("id")
          .eq("slug", slug)
          .neq("id", input.id)
          .maybeSingle();
        if (collision) slug = baseSlug + "-" + Date.now().toString(36);
      }
      const payload = {
        author_id: user.id,
        slug,
        title: input.title.trim(),
        excerpt: input.excerpt.trim() || null,
        body: input.body.trim(),
        cover_image_url: input.cover_image_url?.trim() || null,
        tags: input.tags,
        status: input.status,
        published_at: input.status === "published" ? new Date().toISOString() : null,
      };

      const query = input.id
        ? supabase.from("blog_posts").update(payload).eq("id", input.id).select().single()
        : supabase.from("blog_posts").insert(payload).select().single();

      const { data, error } = await query;
      if (error) throw error;
      return data as BlogPost;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      void queryClient.invalidateQueries({ queryKey: ["blog-post"] });
    },
  });
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
    },
  });
}
