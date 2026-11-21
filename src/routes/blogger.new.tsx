import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { useAuth } from "@/hooks/use-auth";
import { BlogPostCreator } from "@/components/blogger/BlogPostCreator";

export const Route = createFileRoute("/blogger/new")({
  head: () => ({ meta: [{ title: "Write & Publish — Blogger — Ted's Lab" }] }),
  component: BloggerEditorPage,
});

function BloggerEditorPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <AppShell><p className="text-sm text-muted-foreground">Loading…</p></AppShell>;
  }

  if (!user) {
    return (
      <AppShell>
        <PageHeader
          title="Sign in to write"
          description="Blogger is available to signed-in Ted's Lab users."
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader
        title="Write & publish"
        description="Create a Blogger post, preview it live, save a draft, or publish it to Ted's Lab."
      />
      <div className="mt-5">
        <BlogPostCreator />
      </div>
    </AppShell>
  );
}
