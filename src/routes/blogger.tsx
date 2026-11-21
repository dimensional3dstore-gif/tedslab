import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { usePublishedBlogPosts, useVoteBlogPost } from "@/lib/blogger";
import { useAuth } from "@/hooks/use-auth";
import { PenLine, MessageSquare, ArrowBigUp, ArrowBigDown, Flame, Clock3, Trophy } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/blogger")({
  head: () => ({
    meta: [
      { title: "Blogger — Ted's Lab" },
      { name: "description", content: "A community feed for ideas, discussions, discoveries and original posts on Ted's Lab." },
    ],
  }),
  component: BloggerPage,
});

function BloggerPage() {
  const { data: posts = [], isLoading, error } = usePublishedBlogPosts();
  const { user } = useAuth();
  const [sort, setSort] = useState<"hot" | "new" | "top">("hot");
  const vote = useVoteBlogPost();

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      if (sort === "new") return new Date(b.published_at ?? b.created_at).getTime() - new Date(a.published_at ?? a.created_at).getTime();
      if (sort === "top") return (b.vote_score ?? 0) - (a.vote_score ?? 0);
      const hot = (post: typeof a) => (post.vote_score ?? 0) * 2 + Math.log10(Math.max(1, Date.now() - new Date(post.published_at ?? post.created_at).getTime()) / 3600000 + 1) * -1;
      return hot(b) - hot(a);
    });
  }, [posts, sort]);

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl">
        <PageHeader title="Blogger" description="A Reddit-style community for Ted's Lab — share ideas, discoveries, questions, study notes and original writing." />

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px]">
          <main className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-2">
              <div className="flex gap-1">
                {[
                  ["hot", "Hot", Flame],
                  ["new", "New", Clock3],
                  ["top", "Top", Trophy],
                ].map(([key, label, Icon]) => (
                  <button key={key} onClick={() => setSort(key as typeof sort)} className={sort === key ? "inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground" : "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary"}>
                    <Icon className="size-3.5" />{label}
                  </button>
                ))}
              </div>
              {user ? (
                <div className="flex flex-wrap items-center gap-2">
                  <Link to="/blogger/mine" className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:border-primary/40">My blogs</Link>
                  <Link to="/blogger/new" className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"><PenLine className="size-3.5" />Create post</Link>
                </div>
              ) : (
                <span className="text-xs text-muted-foreground">Sign in to post, vote and comment</span>
              )}
            </div>

            {error && <p className="mb-4 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">Blogger is temporarily unavailable. Please try again.</p>}

            {isLoading ? (
              <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-32 animate-pulse rounded-xl bg-secondary/60" />)}</div>
            ) : (
              <div className="space-y-3">
                {sortedPosts.map((post) => (
                  <article key={post.id} className="overflow-hidden rounded-xl border border-border bg-card transition hover:border-primary/30">
                    <div className="flex">
                      <div className="flex w-14 shrink-0 flex-col items-center bg-secondary/30 py-4">
                        <button disabled={!user || vote.isPending} onClick={() => void vote.mutateAsync({ postId: post.id, value: 1 })} className={`rounded-md p-1.5 hover:bg-background disabled:opacity-40 ${post.my_vote === 1 ? "text-primary" : "text-muted-foreground hover:text-primary"}`} aria-label="Upvote"><ArrowBigUp className="size-5" /></button>
                        <span className="text-sm font-bold tabular-nums">{post.vote_score ?? 0}</span>
                        <button disabled={!user || vote.isPending} onClick={() => void vote.mutateAsync({ postId: post.id, value: -1 })} className={`rounded-md p-1.5 hover:bg-background disabled:opacity-40 ${post.my_vote === -1 ? "text-destructive" : "text-muted-foreground hover:text-destructive"}`} aria-label="Downvote"><ArrowBigDown className="size-5" /></button>
                      </div>
                      <div className="min-w-0 flex-1 p-4">
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                          <span className="font-semibold text-foreground">Ted's Lab community</span>
                          <span>•</span>
                          <span>{post.published_at ? new Date(post.published_at).toLocaleDateString() : "Recently"}</span>
                          {post.tags.slice(0, 2).map(tag => <span key={tag} className="rounded-full bg-secondary px-2 py-0.5">#{tag}</span>)}
                        </div>
                        <Link to="/blogger/$slug" params={{ slug: post.slug }} className="group block">
                          <h2 className="mt-2 text-xl font-bold tracking-tight group-hover:text-primary">{post.title}</h2>
                          {post.excerpt && <p className="mt-1 line-clamp-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>}
                          {post.cover_image_url && <img src={post.cover_image_url} alt="" className="mt-3 max-h-72 w-full rounded-lg object-cover" />}
                        </Link>
                        <div className="mt-4 flex items-center gap-4 text-xs font-medium text-muted-foreground">
                          <Link to="/blogger/$slug" params={{ slug: post.slug }} className="inline-flex items-center gap-1.5 hover:text-primary"><MessageSquare className="size-4" />Discuss</Link>
                          <span>{post.body.trim().split(/\s+/).filter(Boolean).length} words</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
                {!sortedPosts.length && <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No posts yet. Start the first discussion.</div>}
              </div>
            )}
          </main>

          <aside className="hidden space-y-3 lg:block">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">About Blogger</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">A community feed for publishing ideas, asking questions, sharing discoveries and discussing learning.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Community rules</p>
              <ul className="mt-2 space-y-2 text-xs leading-5 text-muted-foreground">
                <li>• Be constructive and respectful.</li>
                <li>• Share useful knowledge and original ideas.</li>
                <li>• Keep titles clear and discussions on-topic.</li>
              </ul>
            </div>
            {user && <Link to="/blogger/mine" className="block rounded-xl border border-border bg-card p-4 text-sm font-semibold hover:border-primary/40">My posts →</Link>}
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
