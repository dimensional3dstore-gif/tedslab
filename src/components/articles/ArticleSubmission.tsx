import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useSubjects, useTopics } from "@/lib/content";
import { ARTICLE_SECTORS, sectorForSubject } from "@/data/article-sectors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 70) || "article";
}

export function ArticleSubmission() {
  const { user, loading } = useAuth();
  const { data: subjects = [] } = useSubjects();
  const { data: topics = [] } = useTopics();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [subject, setSubject] = useState("biology");
  const [sector, setSector] = useState(sectorForSubject("biology").slug);
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");
  const [references, setReferences] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const availableTopics = topics.filter((item) => item.subject_slug === subject).slice(0, 100);

  function changeSubject(value: string) {
    setSubject(value);
    setSector(sectorForSubject(value).slug);
    setTopic("");
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!user) { setError("Please sign in before submitting an article."); return; }
    if (!title.trim() || !excerpt.trim() || !body.trim() || !topic) {
      setError("Add a title, summary, topic, and article body before submitting.");
      return;
    }
    setSaving(true);
    setStep(2);
    try {
      const { error: insertError } = await supabase.from("article_submissions").insert({
        id: crypto.randomUUID(),
        title: title.trim(),
        slug: slugify(title) + "-" + crypto.randomUUID().slice(0, 8),
        excerpt: excerpt.trim(),
        body: body.trim(),
        source_references: references.split("\n").map((line) => line.trim()).filter(Boolean),
        subject_slug: subject,
        sector_slug: sector,
        topic_slug: topic,
        submitted_by: user.id,
        status: "submitted",
      });
      if (insertError) throw insertError;
      setStep(3);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit the article.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="bio-panel p-5 text-sm text-muted-foreground">Checking your account…</div>;
  if (!user) return <div className="bio-panel space-y-4 p-6"><h2 className="font-display text-2xl font-semibold">Sign in to submit an article</h2><p className="text-sm text-muted-foreground">Article submissions are saved for editorial review and are not published automatically.</p><div className="flex gap-2"><Link to="/login"><Button>Sign in</Button></Link><Link to="/signup"><Button variant="outline">Create account</Button></Link></div></div>;
  if (submitted) return <div className="bio-panel space-y-4 p-6"><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Submitted</p><h2 className="font-display text-2xl font-semibold">Article submitted for review</h2><p className="text-sm text-muted-foreground">Your article has been stored as a submission. An editor can review, edit and publish it.</p><Link to="/articles"><Button>Back to articles</Button></Link></div>;

  return <form onSubmit={submit} className="bio-panel space-y-5 p-5">
    <div><div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]"><span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">1. Write</span><span className="text-muted-foreground">→</span><span className={`rounded-full px-2.5 py-1 ${step >= 2 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>2. Create</span><span className="text-muted-foreground">→</span><span className={`rounded-full px-2.5 py-1 ${step >= 3 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>3. Review</span></div><h2 className="mt-3 font-display text-2xl font-semibold">Create an article</h2><p className="mt-2 text-sm text-muted-foreground">Propose a scientific or educational article for Ted's Lab. All submissions go through editorial review.</p></div>
    <label className="block space-y-1 text-sm"><span className="text-muted-foreground">Title</span><Input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="How Coral Reefs Change" /></label>
    <div className="grid gap-4 md:grid-cols-2">
      <label className="block space-y-1 text-sm"><span className="text-muted-foreground">Subject</span><select required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={subject} onChange={e=>changeSubject(e.target.value)}>{subjects.map(s=><option key={s.slug} value={s.slug}>{s.title}</option>)}</select></label>
      <label className="block space-y-1 text-sm"><span className="text-muted-foreground">Sector</span><select required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={sector} onChange={e=>setSector(e.target.value)}>{ARTICLE_SECTORS.map(s=><option key={s.slug} value={s.slug}>{s.title}</option>)}</select></label>
    </div>
    <label className="block space-y-1 text-sm"><span className="text-muted-foreground">Topic</span><select required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={topic} onChange={e=>setTopic(e.target.value)}><option value="">Select a topic</option>{availableTopics.map(t=><option key={t.id} value={t.slug}>{t.title}</option>)}</select></label>
    <label className="block space-y-1 text-sm"><span className="text-muted-foreground">Summary</span><textarea required className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={excerpt} onChange={e=>setExcerpt(e.target.value)} /></label>
    <label className="block space-y-1 text-sm"><span className="text-muted-foreground">Article body</span><textarea required className="min-h-72 w-full rounded-md border border-input bg-background px-3 py-2 text-sm leading-6" value={body} onChange={e=>setBody(e.target.value)} placeholder="Explain the concept, evidence, examples, limits and uncertainties." /></label>
    <label className="block space-y-1 text-sm"><span className="text-muted-foreground">Sources and references</span><textarea className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={references} onChange={e=>setReferences(e.target.value)} placeholder="One source per line" /></label>
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    <div className="flex gap-2"><Button type="submit" disabled={saving}>{saving ? "Creating article…" : "Create article"}</Button><Link to="/articles"><Button type="button" variant="outline">Cancel</Button></Link></div>
  </form>;
}
