import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { usePublishedBlogPosts } from "@/lib/blogger";
import { useAuth } from "@/hooks/use-auth";
import { PenLine, Clock3 } from "lucide-react";

export const Route = createFileRoute("/blogger")({
  head: () => ({
    meta: [
      { title: "Blogger — Ted's Lab" },
      { name: "description", content: "Write, publish and discover community posts on Ted's Lab." },
    ],
  }),
  component: BloggerPage,
});

function BloggerPage() {
  const { data: posts = [], isLoading, error } = usePublishedBlogPosts();
  const { user } = useAuth();

  return (
    <AppShell>
      <PageHeader
        title="Blogger"
        description="A writing space inside Ted's Lab for ideas, experiments, study notes, discoveries and original posts."
      />
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{posts.length} published {posts.length === 1 ? "post" : "posts"}</p>
        <div className="flex gap-2">
          {user && <Link to="/blogger/new" className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"><PenLine className="size-4" />Write a post</Link>}
          {user && <Link to="/blogger/mine" className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-secondary">My posts</Link>}
        </div>
      </div>
      {error && <p className="mt-6 text-sm text-destructive">Blogger is temporarily unavailable. Please try again.</p>}
      {isLoading ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {Array.from({length:4}).map((_, i) => <div key={i} className="bio-panel h-48 animate-pulse" />)}
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {posts.map(post => (
            <Link key={post.id} to="/blogger/$slug" params={{slug: post.slug}} className="bio-panel group overflow-hidden p-5 transition hover:-translate-y-0.5 hover:border-primary/40">
              {post.cover_image_url && <img src={post.cover_image_url} alt="" className="mb-4 h-44 w-full rounded-md object-cover" />}
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock3 className="size-3.5" />{post.published_at ? new Date(post.published_at).toLocaleDateString() : "Draft"}</div>
              <h2 className="mt-2 font-display text-2xl font-bold text-foreground group-hover:text-primary">{post.title}</h2>
              {post.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>}
              {post.tags.length > 0 && <div className="mt-4 flex flex-wrap gap-1.5">{post.tags.slice(0,4).map(tag => <span key={tag} className="rounded-full bg-secondary px-2 py-1 text-[11px] text-muted-foreground">#{tag}</span>)}</div>}
            </Link>
          ))}
          {!posts.length && <div className="bio-panel p-8 text-center text-sm text-muted-foreground md:col-span-2">No posts yet. Be the first to write one.</div>}
        </div>
      )}
    </AppShell>
  );
}
