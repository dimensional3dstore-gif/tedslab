import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ArticleTemplate } from "@/components/biopedia/ArticleTemplate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DEFAULT_ARTICLE_LAYOUT,
  layoutFromArticleBody,
  type ArticleLayout,
} from "@/lib/article-layout";
import { slugifyTitle, upsertCustomArticle } from "@/lib/article-store";
import { imageKeys } from "@/lib/images";
import { useSections, useSubjects, useTopics } from "@/lib/content";
import type { ArticleRow } from "@/lib/content";

function cloneDefault(): ArticleLayout {
  return structuredClone(DEFAULT_ARTICLE_LAYOUT);
}

export function ArticleCreator({ existing }: { existing?: ArticleRow }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const initialLayout = existing ? undefined : cloneDefault();
  const { data: subjects = [] } = useSubjects();
  const { data: allSections = [] } = useSections();
  const { data: allTopics = [] } = useTopics();
  const [title, setTitle] = useState(existing?.title ?? "Untitled article");
  const [excerpt, setExcerpt] = useState(
    existing?.excerpt ?? DEFAULT_ARTICLE_LAYOUT.overview[0] ?? "",
  );
  const [subject, setSubject] = useState(existing?.subject_slug ?? "biology");
  const [section, setSection] = useState(existing?.section_slug ?? "organisms");
  const [topic, setTopic] = useState(existing?.topic_slug ?? "");
  const [imageKey, setImageKey] = useState(existing?.image_key ?? "hero-cell");
  const availableSections = allSections.filter((item) => item.subject_id === subjects.find((subjectItem) => subjectItem.slug === subject)?.id);
  const selectedSection = allSections.find((item) => item.slug === section);
  const availableTopics = allTopics.filter((item) => item.section_id === selectedSection?.id);
  const [layout, setLayout] = useState<ArticleLayout>(
    existing
      ? (layoutFromArticleBody(existing.body) ?? cloneDefault())
      : cloneDefault(),
  );
  const [status, setStatus] = useState<"draft" | "published">(
    existing?.published ? "published" : "draft",
  );
  const evidenceSection = layout.sections.find((section) =>
    /evidence|reference/i.test(section.heading),
  );
  const evidenceText = evidenceSection?.paragraphs?.join("\n") ?? "";
  const updateEvidence = (value: string) => {
    const nextSections = layout.sections.filter(
      (section) => !/evidence|reference/i.test(section.heading),
    );
    nextSections.push({
      heading: "Evidence, limitations, and references",
      paragraphs: value.split("\n").filter((line) => line.trim().length > 0),
    });
    setLayout({ ...layout, sections: nextSections });
  };
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  void initialLayout;

  const previewArticle: ArticleRow = useMemo(
    () => ({
      id: existing?.id ?? "preview",
      slug: slugifyTitle(title),
      title,
      excerpt,
      body: JSON.stringify(layout),
      minutes: 8,
      tone: "scientific",
      subject_slug: subject,
      section_slug: section,
      topic_slug: topic || null,
      image_key: imageKey,
      image_url: null,
      video_url: null,
      published: status === "published",
      status,
      sort: 0,
    }),
    [existing?.id, title, excerpt, layout, subject, section, topic, imageKey, status],
  );

  const save = async (publish: boolean) => {
    setSaving(true);
    setSaveError("");
    const row: ArticleRow = {
      ...previewArticle,
      id: existing?.id ?? `custom-${Date.now()}`,
      published: publish,
      status: publish ? "published" : "draft",
    };
    try {
      await upsertCustomArticle(row);
      await queryClient.invalidateQueries({ queryKey: ["articles"] });
      await navigate({ to: "/admin/articles" });
    } catch {
      setSaveError(
        "Unable to save this article. Confirm your admin access and try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,22rem)_1fr]">
      <form
        className="bio-panel space-y-4 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          void save(true);
        }}
      >
        <h2 className="font-display text-lg font-semibold">Create article</h2>
        <p className="text-xs text-muted-foreground">
          A structured scientific-reference layout is loaded. Use precise terminology, distinguish evidence from interpretation, and include relevant sources in the final section.
        </p>
        <label className="block space-y-1 text-xs text-muted-foreground">
          Title
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label className="block space-y-1 text-xs text-muted-foreground">
          Excerpt
          <textarea
            className="min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </label>
        <label className="block space-y-1 text-xs text-muted-foreground">
          Subject
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            {subjects.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-1 text-xs text-muted-foreground">
          Section
          <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={section} onChange={(e) => { setSection(e.target.value); setTopic(""); }}>
            {availableSections.map((item) => <option key={item.id} value={item.slug}>{item.title}</option>)}
            {!availableSections.length && <option value={section}>{section}</option>}
          </select>
        </label>
        <label className="block space-y-1 text-xs text-muted-foreground">
          Topic (optional)
          <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="">No topic</option>
            {availableTopics.map((item) => <option key={item.id} value={item.slug}>{item.title}</option>)}
          </select>
        </label>
        <label className="block space-y-1 text-xs text-muted-foreground">
          Banner image
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={imageKey}
            onChange={(e) => setImageKey(e.target.value)}
          >
            {imageKeys.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-1 text-xs text-muted-foreground">
          Overview (one paragraph per line)
          <textarea
            className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            value={layout.overview.join("\n")}
            onChange={(e) =>
              setLayout({
                ...layout,
                overview: e.target.value.split("\n").filter(Boolean),
              })
            }
          />
        </label>
        <label className="block space-y-1 text-xs text-muted-foreground">
          Evidence and references (one source or limitation per line)
          <textarea
            className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            value={evidenceText}
            onChange={(event) => updateEvidence(event.target.value)}
            placeholder="Author or organisation — publication title — year — DOI or URL"
          />
        </label>
        <label className="block space-y-1 text-xs text-muted-foreground">
          Tags (comma separated)
          <Input
            value={layout.tags.join(", ")}
            onChange={(e) =>
              setLayout({
                ...layout,
                tags: e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
              })
            }
          />
        </label>
        {saveError && (
          <p role="alert" className="text-sm text-destructive">
            {saveError}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => void save(false)}
            disabled={saving}
          >
            {saving ? "Saving…" : "Save draft"}
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Publish"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setLayout(cloneDefault())}
          >
            Reset layout
          </Button>
        </div>
      </form>

      <div className="min-w-0 overflow-auto rounded-2xl border border-border bg-background p-4">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">
          Default layout preview
        </p>
        <ArticleTemplate
          article={previewArticle}
          layoutOverride={layout}
          preview
        />
      </div>
    </div>
  );
}
