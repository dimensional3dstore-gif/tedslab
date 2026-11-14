import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { usePages, useSections, useSubjects, useTopics } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Mode = "pages" | "sections" | "topics";
type Row = Record<string, any>;

const db = supabase as unknown as { from: (table: string) => any };
const slugify = (value: string) => value.toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "untitled";

export function ContentManager({ mode }: { mode: Mode }) {
  const queryClient = useQueryClient();
  const { data: pages = [] } = usePages();
  const { data: sections = [] } = useSections();
  const { data: topics = [] } = useTopics();
  const { data: subjects = [] } = useSubjects();
  const [editing, setEditing] = useState<Row | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [parentId, setParentId] = useState("");
  const [published, setPublished] = useState(false);
  const [showInNav, setShowInNav] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const config = {
    pages: { table: "pages", title: "Pages", rows: pages as Row[] },
    sections: { table: "sections", title: "Sections", rows: sections as Row[] },
    topics: { table: "topics", title: "Topics", rows: topics as Row[] },
  }[mode];

  const parentOptions = mode === "sections" ? subjects : sections;
  const parentLabel = mode === "sections" ? "Subject" : "Section";
  const parentValue = parentId || (mode === "sections" ? subjects[0]?.id : sections[0]?.id) || "";

  const reset = () => {
    setEditing(null); setTitle(""); setSlug(""); setDescription(""); setBody("");
    setParentId(""); setPublished(false); setShowInNav(false); setError("");
  };

  const startEdit = (row: Row) => {
    setEditing(row); setTitle(row.title ?? ""); setSlug(row.slug ?? "");
    setDescription(row.description ?? row.blurb ?? "");
    setBody(row.body ?? ""); setParentId(row.subject_id ?? row.section_id ?? "");
    setPublished(Boolean(row.published)); setShowInNav(Boolean(row.show_in_nav)); setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setError("");
    const base: Row = { id: editing?.id ?? `${mode.slice(0, -1)}-${crypto.randomUUID()}`, slug: slugify(slug || title), title, sort: editing?.sort ?? config.rows.length };
    if (mode === "pages") Object.assign(base, { description, body, published, status: published ? "published" : "draft", show_in_nav: showInNav, image_url: editing?.image_url ?? null });
    if (mode === "sections") Object.assign(base, { subject_id: parentValue, label: title, description, body, icon: editing?.icon ?? null, image_key: editing?.image_key ?? null, image_url: editing?.image_url ?? null });
    if (mode === "topics") Object.assign(base, { section_id: parentValue, blurb: description, body, image_url: editing?.image_url ?? null });
    if (!title.trim() || !base.slug || (mode !== "pages" && !parentValue)) { setError("Complete the title, slug and parent selection."); setBusy(false); return; }
    try {
      const { error: saveError } = await db.from(config.table).upsert(base, { onConflict: "id" });
      if (saveError) throw saveError;
      await queryClient.invalidateQueries();
      reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to save this item. Check admin permissions and database access.");
    } finally { setBusy(false); }
  };

  const remove = async (row: Row) => {
    if (!window.confirm(`Delete "${row.title}"? This cannot be undone.`)) return;
    setError("");
    const { error: deleteError } = await db.from(config.table).delete().eq("id", row.id);
    if (deleteError) setError(deleteError.message);
    else { await queryClient.invalidateQueries(); if (editing?.id === row.id) reset(); }
  };

  const parentName = (row: Row) => {
    if (mode === "sections") return subjects.find((item) => item.id === row.subject_id)?.title ?? "Unknown subject";
    if (mode === "topics") return sections.find((item) => item.id === row.section_id)?.title ?? "Unknown section";
    return row.show_in_nav ? "Navigation page" : "Standalone page";
  };

  const list = useMemo(() => [...config.rows].sort((a,b) => (a.sort ?? 0) - (b.sort ?? 0)), [config.rows]);

  return <div className="grid gap-6 xl:grid-cols-[minmax(0,25rem)_1fr]">
    <form onSubmit={save} className="bio-panel space-y-4 p-5">
      <div className="flex items-center justify-between gap-2"><h2 className="font-semibold">{editing ? "Edit" : "Create"} {mode.slice(0,-1)}</h2>{editing && <Button type="button" size="sm" variant="ghost" onClick={reset}>New</Button>}</div>
      <label className="block space-y-1 text-xs text-muted-foreground">Title<Input value={title} onChange={e=>{setTitle(e.target.value);if(!editing)setSlug(slugify(e.target.value));}} required /></label>
      <label className="block space-y-1 text-xs text-muted-foreground">URL slug<Input value={slug} onChange={e=>setSlug(e.target.value)} required /></label>
      {mode !== "pages" && <label className="block space-y-1 text-xs text-muted-foreground">{parentLabel}<select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={parentValue} onChange={e=>setParentId(e.target.value)} required><option value="">Select {parentLabel.toLowerCase()}</option>{parentOptions.map((item:any)=><option key={item.id} value={item.id}>{item.title}</option>)}</select></label>}
      {mode !== "topics" && <label className="block space-y-1 text-xs text-muted-foreground">Description<Input value={description} onChange={e=>setDescription(e.target.value)} /></label>}
      {mode === "topics" && <label className="block space-y-1 text-xs text-muted-foreground">Summary / blurb<Input value={description} onChange={e=>setDescription(e.target.value)} /></label>}
      <label className="block space-y-1 text-xs text-muted-foreground">Content<textarea className="min-h-48 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground" value={body} onChange={e=>setBody(e.target.value)} placeholder="Write the page content or detailed topic notes…" /></label>
      {mode === "pages" && <div className="flex flex-wrap gap-4 text-sm"><label className="flex items-center gap-2"><input type="checkbox" checked={published} onChange={e=>setPublished(e.target.checked)} /> Published</label><label className="flex items-center gap-2"><input type="checkbox" checked={showInNav} onChange={e=>setShowInNav(e.target.checked)} /> Show in navigation</label></div>}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={busy}>{busy ? "Saving…" : editing ? "Save changes" : `Create ${mode.slice(0,-1)}`}</Button>
    </form>
    <div className="space-y-3">
      <div><h2 className="font-semibold">{config.title}</h2><p className="text-xs text-muted-foreground">{list.length} records</p></div>
      {list.map(row=><div key={row.id} className="bio-panel flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="min-w-0"><h3 className="font-medium">{row.title}</h3><p className="text-xs text-muted-foreground">{row.slug} · {parentName(row)}{mode === "pages" ? ` · ${row.published ? "Published" : "Draft"}` : ""}</p></div>
        <div className="flex gap-2"><Button size="sm" variant="outline" onClick={()=>startEdit(row)}>Edit</Button><Button size="sm" variant="ghost" onClick={()=>void remove(row)}>Delete</Button></div>
      </div>)}
      {!list.length && <p className="bio-panel p-5 text-sm text-muted-foreground">No {mode} have been created yet.</p>}
    </div>
  </div>;
}
