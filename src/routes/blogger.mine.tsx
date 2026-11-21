import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { useMyBlogPosts } from "@/lib/blogger";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/blogger/mine")({
  head: () => ({ meta: [{ title: "My Blogger Posts — Ted's Lab" }] }),
  component: MyBloggerPosts,
});

function MyBloggerPosts() {
  const { user, loading } = useAuth();
  const { data: posts = [], isLoading } = useMyBlogPosts();

  if (loading) return <AppShell><p className="text-sm text-muted-foreground">Loading…</p></AppShell>;
  if (!user) return <AppShell><PageHeader title="Sign in required" description="Sign in to manage your Blogger posts." /></AppShell>;

  return (
    <AppShell>
      <PageHeader title="My Blogger posts" description="Manage your drafts and published writing." />
      <div className="mt-5 flex justify-end"><Link to="/blogger/new" className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Write & publish post</Link></div>
      <div className="mt-4 grid gap-3">
        {isLoading && <p className="text-sm text-muted-foreground">Loading posts…</p>}
        {posts.map(post => (
          <div key={post.id} className="bio-panel flex flex-wrap items-center justify-between gap-3 p-4">
            <div className="min-w-0"><h2 className="font-semibold">{post.title}</h2><p className="mt-1 text-xs text-muted-foreground">{post.status === "published" ? "Published" : "Draft"} · updated {new Date(post.updated_at).toLocaleDateString()}</p></div>
            <div className="flex gap-2">{post.status === "published" && <Link to="/blogger/$slug" params={{slug: post.slug}} className="rounded-md border border-border px-3 py-2 text-xs">View</Link>}<Link to="/blogger/new" className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">Write & publish post</Link></div>
          </div>
        ))}
        {!isLoading && !posts.length && <p className="bio-panel p-5 text-sm text-muted-foreground">You have not written any posts yet.</p>}
      </div>
    </AppShell>
  );
}
