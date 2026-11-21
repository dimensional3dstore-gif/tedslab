import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { useAuth } from "@/hooks/use-auth";
import { useSaveBlogPost } from "@/lib/blogger";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blogger/new")({
  head: () => ({ meta: [{ title: "Write — Blogger — Ted's Lab" }] }),
  component: BloggerEditor,
});

function BloggerEditor() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const save = useSaveBlogPost();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [cover, setCover] = useState("");
  const [tags, setTags] = useState("");

  if (loading) return <AppShell><p className="text-sm text-muted-foreground">Loading…</p></AppShell>;
  if (!user) return <AppShell><PageHeader title="Sign in to write" description="Blogger is available to signed-in Ted's Lab users." /></AppShell>;

  const submit = async (status: "draft" | "published") => {
    try {
      const post = await save.mutateAsync({ title, excerpt, body, cover_image_url: cover, tags: tags.split(",").map(t => t.trim()).filter(Boolean), status });
      await navigate({ to: "/blogger/$slug", params: { slug: post.slug } });
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Unable to save the post.");
    }
  };

  return (
    <AppShell>
      <PageHeader title="Write a Blogger post" description="Create a draft or publish a post to the Ted's Lab Blogger." />
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px]">
        <section className="bio-panel p-5">
          <label className="text-sm font-medium">Title</label>
          <Input className="mt-2" value={title} onChange={e => setTitle(e.target.value)} placeholder="What are you thinking about?" />
          <label className="mt-5 block text-sm font-medium">Excerpt</label>
          <Textarea className="mt-2 min-h-24" value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="A short introduction…" />
          <label className="mt-5 block text-sm font-medium">Post</label>
          <Textarea className="mt-2 min-h-[360px] font-mono text-sm" value={body} onChange={e => setBody(e.target.value)} placeholder="Write your post here…" />
        </section>
        <aside className="bio-panel h-fit p-5">
          <label className="text-sm font-medium">Cover image URL</label>
          <Input className="mt-2" value={cover} onChange={e => setCover(e.target.value)} placeholder="https://…" />
          <label className="mt-5 block text-sm font-medium">Tags</label>
          <Input className="mt-2" value={tags} onChange={e => setTags(e.target.value)} placeholder="science, study, ideas" />
          <div className="mt-6 grid gap-2">
            <Button disabled={save.isPending || !title.trim() || !body.trim()} onClick={() => void submit("published")}>Publish</Button>
            <Button variant="outline" disabled={save.isPending || !title.trim()} onClick={() => void submit("draft")}>Save draft</Button>
            <Link to="/blogger" className="rounded-md px-3 py-2 text-center text-sm text-muted-foreground hover:bg-secondary">Cancel</Link>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
