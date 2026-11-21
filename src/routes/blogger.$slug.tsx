import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/biopedia/AppShell";
import { useBlogPost } from "@/lib/blogger";
import { ArrowLeft, Clock3 } from "lucide-react";

export const Route = createFileRoute("/blogger/$slug")({
  head: () => ({ meta: [{ title: "Blogger — Ted's Lab" }] }),
  component: BloggerPostPage,
});

function BloggerPostPage() {
  const { slug } = Route.useParams();
  const { data: post, isLoading, error } = useBlogPost(slug);

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
          </article>
        )}
      </div>
    </AppShell>
  );
}
