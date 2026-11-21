import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useHeroSlides, type HeroSlideRow } from "@/lib/content";
import { useAuth } from "@/hooks/use-auth";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Save, Trash2, Eye, EyeOff, GripVertical } from "lucide-react";

type DraftSlide = Omit<HeroSlideRow, "id"> & { id?: string };

const emptySlide = (): DraftSlide => ({
  subject_slug: "",
  title: "",
  subtitle: "",
  body: "",
  image_key: "hero-cell",
  image_url: null,
  link_to: "/",
  video_url: null,
  sort: 0,
  active: true,
});

export function SlidesManager() {
  const { isAdmin } = useAuth();
  const { data: slides = [], isLoading, refetch } = useHeroSlides();
  const [selected, setSelected] = useState<string | null>(null);
  const [draft, setDraft] = useState<DraftSlide>(emptySlide());
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const ordered = useMemo(
    () => [...slides].sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title)),
    [slides],
  );

  useEffect(() => {
    if (!selected && ordered[0]) {
      setSelected(ordered[0].id);
      setDraft({ ...ordered[0] });
    }
  }, [ordered, selected]);

  if (!isAdmin) {
    return <div className="bio-panel p-5 text-sm text-muted-foreground">Administrator access is required to manage slides.</div>;
  }

  const choose = (slide: HeroSlideRow) => {
    setSelected(slide.id);
    setDraft({ ...slide });
    setMessage("");
  };

  const startNew = () => {
    setSelected(null);
    setDraft({ ...emptySlide(), sort: ordered.length });
    setMessage("");
  };

  const setField = <K extends keyof DraftSlide>(key: K, value: DraftSlide[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  const save = async () => {
    if (!draft.title?.trim()) {
      setMessage("A slide title is required.");
      return;
    }

    setSaving(true);
    setMessage("");

    const payload = {
      subject_slug: draft.subject_slug || null,
      title: draft.title.trim(),
      subtitle: draft.subtitle?.trim() || null,
      body: draft.body?.trim() || null,
      image_key: draft.image_key || null,
      image_url: draft.image_url?.trim() || null,
      link_to: draft.link_to?.trim() || null,
      video_url: draft.video_url?.trim() || null,
      sort: Number(draft.sort) || 0,
      active: Boolean(draft.active),
      updated_at: new Date().toISOString(),
    };

    const result = selected
      ? await supabase.from("hero_slides").update(payload).eq("id", selected)
      : await supabase.from("hero_slides").insert({
          id: crypto.randomUUID(),
          ...payload,
        });

    setSaving(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setMessage(selected ? "Slide saved." : "Slide created.");
    await refetch();
    if (!selected && result.data?.[0]?.id) setSelected(result.data[0].id);
  };

  const remove = async () => {
    if (!selected || !window.confirm("Delete this slide?")) return;
    setSaving(true);
    const { error } = await supabase.from("hero_slides").delete().eq("id", selected);
    setSaving(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    setSelected(null);
    setDraft(emptySlide());
    setMessage("Slide deleted.");
    await refetch();
  };

  const toggleActive = async (slide: HeroSlideRow) => {
    const { error } = await supabase
      .from("hero_slides")
      .update({ active: !slide.active, updated_at: new Date().toISOString() })
      .eq("id", slide.id);
    if (error) setMessage(error.message);
    else await refetch();
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[20rem_minmax(0,1fr)]">
      <section className="bio-panel p-4">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">Homepage slides</p>
            <p className="mt-1 text-xs text-muted-foreground">{ordered.length} slide{ordered.length === 1 ? "" : "s"}</p>
          </div>
          <Button size="sm" onClick={startNew}><Plus className="mr-1.5 size-4" />New</Button>
        </div>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading slides…</p>
        ) : (
          <div className="space-y-2">
            {ordered.map((slide) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => choose(slide)}
                className={`w-full rounded-lg border p-3 text-left transition ${selected === slide.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
              >
                <div className="flex items-start gap-2">
                  <GripVertical className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{slide.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{slide.subtitle || slide.body || "No subtitle"}</p>
                  </div>
                  {slide.active ? <Eye className="size-4 text-emerald-600" /> : <EyeOff className="size-4 text-muted-foreground" />}
                </div>
              </button>
            ))}
            {!ordered.length && <p className="rounded-lg border border-dashed border-border p-4 text-xs text-muted-foreground">No slides yet.</p>}
          </div>
        )}
      </section>

      <section className="bio-panel p-5">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">Slide editor</p>
            <h2 className="mt-1 font-display text-2xl font-semibold">{selected ? "Edit slide" : "Create slide"}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Changes are written directly to Supabase and appear on the live site without a Vercel deployment.</p>
          </div>
          {selected && (
            <Button variant="outline" size="sm" onClick={remove} disabled={saving}>
              <Trash2 className="mr-1.5 size-4" />Delete
            </Button>
          )}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            <label className="block space-y-1 text-xs text-muted-foreground">Title<Input value={draft.title ?? ""} onChange={(e) => setField("title", e.target.value)} placeholder="A strong slide headline" /></label>
            <label className="block space-y-1 text-xs text-muted-foreground">Subtitle<Input value={draft.subtitle ?? ""} onChange={(e) => setField("subtitle", e.target.value)} placeholder="Short supporting line" /></label>
            <label className="block space-y-1 text-xs text-muted-foreground">Body<Textarea value={draft.body ?? ""} onChange={(e) => setField("body", e.target.value)} placeholder="One or two sentences shown with the slide" /></label>
            <label className="block space-y-1 text-xs text-muted-foreground">Subject slug<Input value={draft.subject_slug ?? ""} onChange={(e) => setField("subject_slug", e.target.value)} placeholder="biology" /></label>
            <label className="block space-y-1 text-xs text-muted-foreground">Link to<Input value={draft.link_to ?? ""} onChange={(e) => setField("link_to", e.target.value)} placeholder="/articles" /></label>
            <label className="block space-y-1 text-xs text-muted-foreground">Image key<Input value={draft.image_key ?? ""} onChange={(e) => setField("image_key", e.target.value)} placeholder="hero-cell" /></label>
            <label className="block space-y-1 text-xs text-muted-foreground">
              Custom image
              <ImageUpload value={draft.image_url ?? ""} onChange={(value) => setField("image_url", value || null)} pathPrefix="hero-slides" />
              <Input value={draft.image_url ?? ""} onChange={(e) => setField("image_url", e.target.value || null)} placeholder="https://…" />
            </label>
            <label className="block space-y-1 text-xs text-muted-foreground">Video URL<Input value={draft.video_url ?? ""} onChange={(e) => setField("video_url", e.target.value || null)} placeholder="Optional video URL" /></label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block space-y-1 text-xs text-muted-foreground">Order<Input type="number" value={draft.sort} onChange={(e) => setField("sort", Number(e.target.value) || 0)} /></label>
              <label className="flex items-end gap-2 pb-2 text-xs text-foreground"><input type="checkbox" checked={Boolean(draft.active)} onChange={(e) => setField("active", e.target.checked)} /> Active</label>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-secondary/20 p-4">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">Preview</p>
            <div className="overflow-hidden rounded-xl border border-border bg-background">
              {(draft.image_url || draft.image_key) && (
                <div className="aspect-[16/7] overflow-hidden bg-secondary">
                  {draft.image_url ? <img src={draft.image_url} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-xs text-muted-foreground">Image key: {draft.image_key}</div>}
                </div>
              )}
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">{draft.subject_slug || "Ted's Lab"}</p>
                <h3 className="mt-2 text-2xl font-bold">{draft.title || "Slide title"}</h3>
                {draft.subtitle && <p className="mt-2 text-base text-muted-foreground">{draft.subtitle}</p>}
                {draft.body && <p className="mt-3 text-sm leading-6 text-muted-foreground">{draft.body}</p>}
              </div>
            </div>
          </div>
        </div>

        {message && <p className="mt-4 rounded-lg border border-border bg-secondary/40 p-3 text-sm">{message}</p>}

        <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
          <Button onClick={() => void save()} disabled={saving || !draft.title?.trim()}><Save className="mr-1.5 size-4" />{saving ? "Saving…" : selected ? "Save changes" : "Create slide"}</Button>
          {selected && <Button variant="outline" onClick={() => void toggleActive({ ...draft, id: selected } as HeroSlideRow)}>{draft.active ? "Disable slide" : "Enable slide"}</Button>}
          <Button variant="ghost" onClick={startNew}>New slide</Button>
        </div>
      </section>
    </div>
  );
}
