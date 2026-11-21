import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/biopedia/AppShell";
import { useAddBlogPostComment, useBlogPost, useBlogPostComments, useVoteBlogPost } from "@/lib/blogger";
import { ArrowLeft, Clock3, ArrowBigUp, ArrowBigDown, MessageSquare } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

export const Route = createFileRoute("/blogger/$slug")({
  head: () => ({ meta: [{ title: "Blogger — Ted's Lab" }] }),
  component: BloggerPostPage,
});

function BloggerPostPage() {
  const { slug } = Route.useParams();
  const { data: post, isLoading, error } = useBlogPost(slug);
  const { data: comments = [] } = useBlogPostComments(post?.id ?? "");
  const { user } = useAuth();
  const vote = useVoteBlogPost();
  const addComment = useAddBlogPostComment();
  const [comment, setComment] = useState("");

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl">
        <Link to="/blogger" className="inline-flex items-center gap-2 text-sm text-primary hover:underline"><ArrowLeft className="size-4" />Back to Blogger</Link>
        {isLoading && <div className="mt-6 bio-panel h-96 animate-pulse" />}
        {error && <p className="mt-6 text-sm text-destructive">Unable to load this post.</p>}
        {!isLoading && !error && !post && <p className="mt-6 text-sm text-muted-foreground">This post does not exist or is not published.</p>}
        {post && (
          <article className="mt-6">
            {post.cover_image_url && <img src={post.cover_image_url} alt="" className="mb-6 max-h-[420px] w-full rounded-xl object-cover" />}
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"><Clock3 className="size-3.5" />{post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}{post.tags.map(tag => <span key={tag} className="rounded-full bg-secondary px-2 py-1">#{tag}</span>)}</div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">{post.title}</h1>
            {post.excerpt && <p className="mt-4 text-lg leading-8 text-muted-foreground">{post.excerpt}</p>}
            <div className="mt-8 whitespace-pre-wrap text-[16px] leading-8 text-foreground/90">{post.body}</div>

            <section className="mt-12 border-t border-border pt-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold"><MessageSquare className="size-4 text-primary" />Discussion</div>
                <div className="flex items-center gap-2">
                  <button disabled={!user || vote.isPending} onClick={() => void vote.mutateAsync({ postId: post.id, value: 1 })} className="rounded-lg border border-border p-2 hover:border-primary/40 disabled:opacity-40" aria-label="Upvote"><ArrowBigUp className="size-5" /></button>
                  <button disabled={!user || vote.isPending} onClick={() => void vote.mutateAsync({ postId: post.id, value: -1 })} className="rounded-lg border border-border p-2 hover:border-primary/40 disabled:opacity-40" aria-label="Downvote"><ArrowBigDown className="size-5" /></button>
                </div>
              </div>

              {user ? (
                <form className="mt-4" onSubmit={async (event) => {
                  event.preventDefault();
                  if (!comment.trim()) return;
                  await addComment.mutateAsync({ postId: post.id, body: comment });
                  setComment("");
                }}>
                  <textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Join the discussion…" className="min-h-24 w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary/50" />
                  <button disabled={addComment.isPending || !comment.trim()} className="mt-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-50">{addComment.isPending ? "Posting…" : "Comment"}</button>
                </form>
              ) : (
                <p className="mt-4 rounded-lg bg-secondary/50 p-3 text-xs text-muted-foreground">Sign in to vote and join the discussion.</p>
              )}

              <div className="mt-5 space-y-3">
                {comments.map((item) => (
                  <div key={item.id} className="rounded-xl border border-border bg-card p-4">
                    <div className="text-[11px] text-muted-foreground">Community member · {new Date(item.created_at).toLocaleString()}</div>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6">{item.body}</p>
                  </div>
                ))}
                {!comments.length && <p className="py-5 text-sm text-muted-foreground">No comments yet. Start the discussion.</p>}
              </div>
            </section>
          </article>
        )}
      </div>
    </AppShell>
  );
}
