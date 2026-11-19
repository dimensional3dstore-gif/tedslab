import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { CHANGE_TOPICS } from "@/data/change-encyclopaedia";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 70) || "change-article";
}

export function ChangeArticleSubmission() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [topic, setTopic] = useState(CHANGE_TOPICS[0]?.slug ?? "");
  const [body, setBody] = useState("");
  const [references, setReferences] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!user) {
      setError("Please sign in before submitting a Change Encyclopaedia article.");
      return;
    }
    if (!title.trim() || !excerpt.trim() || !body.trim()) {
      setError("Add a title, summary, and article body before submitting.");
      return;
    }

    setSaving(true);
    try {
      const baseSlug = slugify(title);
      const slug = `change-encyclopaedia-${baseSlug}-${crypto.randomUUID().slice(0, 8)}`;
      const layout = {
        version: 1,
        tags: ["Change Encyclopaedia", "Community submission", "Earth"],
        facts: [
          { label: "Encyclopaedia", value: "Change Encyclopaedia" },
          { label: "Topic", value: CHANGE_TOPICS.find((item) => item.slug === topic)?.title ?? topic },
          { label: "Submission", value: "Community article" },
        ],
        overview: [excerpt.trim()],
        sections: [
          {
            heading: "Article",
            paragraphs: body.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean),
          },
          ...(references.trim()
            ? [{
                heading: "Sources and references",
                paragraphs: references.split("\n").map((line) => line.trim()).filter(Boolean),
              }]
            : []),
        ],
        source_references: references.split("\n").map((line) => line.trim()).filter(Boolean),
      };

      const { error: insertError } = await supabase.from("article_submissions").insert({
        id: crypto.randomUUID(),
        slug,
        title: title.trim(),
        excerpt: excerpt.trim(),
        body: JSON.stringify(layout),
        source_references: references.split("\n").map((line) => line.trim()).filter(Boolean),
        subject_slug: "change-encyclopaedia",
        sector_slug: "planetary-change",
        topic_slug: topic,
        submitted_by: user.id,
        status: "submitted",
      });

      if (insertError) throw insertError;
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit the article.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="bio-panel p-5 text-sm text-muted-foreground">Checking your account…</div>;
  }

  if (!user) {
    return (
      <div className="bio-panel space-y-4 p-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Community publishing</p>
          <h2 className="mt-1 font-display text-2xl font-semibold">Sign in to add a Change article</h2>
          <p className="mt-2 text-sm text-muted-foreground">Anyone with a Ted's Lab account can propose an article. Submissions are saved for editorial review and are not published automatically.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/login"><Button>Sign in</Button></Link>
          <Link to="/signup"><Button variant="outline">Create account</Button></Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bio-panel space-y-4 p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Submitted</p>
        <h2 className="font-display text-2xl font-semibold">Your Change article is ready for review</h2>
        <p className="text-sm text-muted-foreground">It has been saved as an editorial-review submission. An administrator can edit it and publish it when it meets Ted's Lab standards.</p>
        <Link to="/change-encyclopaedia"><Button>Back to Change Encyclopaedia</Button></Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bio-panel space-y-5 p-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Community publishing</p>
        <h2 className="mt-1 font-display text-2xl font-semibold">Add a Change Encyclopaedia article</h2>
        <p className="mt-2 text-sm text-muted-foreground">Write a scientific reference article about how Earth or an Earth-like world can change. Your submission will be reviewed before publication.</p>
      </div>

      <label className="block space-y-1 text-sm">
        <span className="text-muted-foreground">Title</span>
        <Input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="How Rivers Change Landscapes" />
      </label>

      <label className="block space-y-1 text-sm">
        <span className="text-muted-foreground">Topic</span>
        <select required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={topic} onChange={(event) => setTopic(event.target.value)}>
          {CHANGE_TOPICS.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}
        </select>
      </label>

      <label className="block space-y-1 text-sm">
        <span className="text-muted-foreground">Summary</span>
        <textarea required className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={excerpt} onChange={(event) => setExcerpt(event.target.value)} placeholder="A concise explanation of the change process…" />
      </label>

      <label className="block space-y-1 text-sm">
        <span className="text-muted-foreground">Article body</span>
        <textarea required className="min-h-72 w-full rounded-md border border-input bg-background px-3 py-2 text-sm leading-6" value={body} onChange={(event) => setBody(event.target.value)} placeholder="Explain the process, causes, timescales, evidence, consequences and uncertainties. Separate paragraphs with a blank line." />
      </label>

      <label className="block space-y-1 text-sm">
        <span className="text-muted-foreground">Sources and references</span>
        <textarea className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={references} onChange={(event) => setReferences(event.target.value)} placeholder="One source per line — author or organisation, title, year, DOI or URL" />
      </label>

      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

      <div className="flex flex-wrap items-center gap-2">
        <Button type="submit" disabled={saving}>{saving ? "Submitting…" : "Submit for review"}</Button>
        <Link to="/change-encyclopaedia"><Button type="button" variant="outline">Cancel</Button></Link>
      </div>
    </form>
  );
}
