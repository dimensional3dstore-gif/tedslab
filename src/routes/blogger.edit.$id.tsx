import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { useAuth } from "@/hooks/use-auth";
import { useBlogPostById } from "@/lib/blogger";
import { BlogPostCreator } from "@/components/blogger/BlogPostCreator";

export const Route = createFileRoute("/blogger/edit/$id")({
  head: () => ({ meta: [{ title: "Edit Blog — Blogger — Ted's Lab" }] }),
  component: EditBloggerPostPage,
});

function EditBloggerPostPage() {
  const { user, loading } = useAuth();
  const { id } = Route.useParams();
  const { data: post, isLoading, error } = useBlogPostById(id);

  if (loading || isLoading) {
    return <AppShell><p className="text-sm text-muted-foreground">Loading post…</p></AppShell>;
  }

  if (!user) {
    return (
      <AppShell>
        <PageHeader title="Sign in required" description="Sign in to edit your Blogger posts." />
      </AppShell>
    );
  }

  if (error || !post) {
    return (
      <AppShell>
        <PageHeader title="Post not found" description="This post does not exist or you do not have permission to edit it." />
        <Link to="/blogger/mine" className="mt-4 inline-flex text-sm font-medium text-primary hover:underline">← Back to My blogs</Link>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader title="Edit & publish blog" description="Update your post, save a draft, or publish the latest version." />
      <div className="mt-5">
        <Link to="/blogger/mine" className="mb-4 inline-flex text-sm font-medium text-primary hover:underline">← Back to My blogs</Link>
        <BlogPostCreator existing={post} />
      </div>
    </AppShell>
  );
}
