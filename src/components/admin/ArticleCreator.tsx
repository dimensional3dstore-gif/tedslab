import { useMemo, useState } from "react";
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
import { SUBJECTS } from "@/lib/catalog";
import type { ArticleRow } from "@/lib/content";

function cloneDefault(): ArticleLayout {
  return structuredClone(DEFAULT_ARTICLE_LAYOUT);
}

export function ArticleCreator({ existing }: { existing?: ArticleRow }) {
  const navigate = useNavigate();
  const initialLayout = existing ? undefined : cloneDefault();
  const [title, setTitle] = useState(existing?.title ?? "Untitled article");
  const [excerpt, setExcerpt] = useState(
    existing?.excerpt ?? DEFAULT_ARTICLE_LAYOUT.overview[0] ?? "",
  );
  const [subject, setSubject] = useState(existing?.subject_slug ?? "biology");
  const [section, setSection] = useState(existing?.section_slug ?? "organisms");
  const [imageKey, setImageKey] = useState(existing?.image_key ?? "hero-cell");
  const [layout, setLayout] = useState<ArticleLayout>(
    existing ? (layoutFromArticleBody(existing.body) ?? cloneDefault()) : cloneDefault(),
  );
  const [status, setStatus] = useState<"draft" | "published">(
    existing?.published ? "published" : "draft",
  );

  void initialLayout;

  const previewArticle: ArticleRow = useMemo(
    () => ({
      id: existing?.id ?? "preview",
      slug: slugifyTitle(title),
      title,
      excerpt,
      body: JSON.stringify(layout),
      minutes: 8,
      tone: "educational",
      subject_slug: subject,
      section_slug: section,
      topic_slug: slugifyTitle(title),
      image_key: imageKey,
      image_url: null,
      video_url: null,
      published: status === "published",
      status,
      sort: 0,
    }),
    [existing?.id, title, excerpt, layout, subject, section, imageKey, status],
  );

  const save = (publish: boolean) => {
    const row: ArticleRow = {
      ...previewArticle,
      id: existing?.id ?? `custom-${Date.now()}`,
      published: publish,
      status: publish ? "published" : "draft",
    };
    upsertCustomArticle(row);
    navigate({ to: "/admin/articles" });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,22rem)_1fr]">
      <form
        className="bio-panel space-y-4 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          save(true);
        }}
      >
        <h2 className="font-display text-lg font-semibold">Create article</h2>
        <p className="text-xs text-muted-foreground">
          The default encyclopedia layout is already loaded. Edit fields and watch the live preview.
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
            {SUBJECTS.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-1 text-xs text-muted-foreground">
          Section slug
          <Input value={section} onChange={(e) => setSection(e.target.value)} />
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
              setLayout({ ...layout, overview: e.target.value.split("\n").filter(Boolean) })
            }
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
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={() => save(false)}>
            Save draft
          </Button>
          <Button type="submit">Publish</Button>
          <Button type="button" variant="ghost" onClick={() => setLayout(cloneDefault())}>
            Reset layout
          </Button>
        </div>
      </form>

      <div className="min-w-0 overflow-auto rounded-2xl border border-border bg-background p-4">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">
          Default layout preview
        </p>
        <ArticleTemplate article={previewArticle} layoutOverride={layout} preview />
      </div>
    </div>
  );
}
