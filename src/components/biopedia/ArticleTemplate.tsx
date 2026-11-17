import {
  BookOpenText,
  CheckCircle2,
  ChevronRight,
  Leaf,
  Microscope,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AppShell } from "@/components/biopedia/AppShell";
import { RelatedArticles } from "@/components/biopedia/RelatedArticles";
import { useSubjects, type ArticleRow } from "@/lib/content";
import {
  layoutFromArticleBody,
  type ArticleLayout,
} from "@/lib/article-layout";
import { articleImageKey, resolveImage } from "@/lib/images";
import { StudyLesson } from "@/components/study/StudyLesson";
import { ArticleConceptExplainer } from "@/components/biopedia/ArticleConceptExplainer";

export function ArticleTemplate({
  article,
  related = [],
  preview = false,
  layoutOverride,
}: {
  article: ArticleRow;
  related?: ArticleRow[];
  preview?: boolean;
  layoutOverride?: ArticleLayout | null;
}) {
  const { data: subjects = [] } = useSubjects();
  const subjectTitle = subjects.find((subject) => subject.slug === article.subject_slug)?.title ?? article.subject_slug ?? "Unassigned subject";
  const layout =
    layoutOverride ??
    layoutFromArticleBody(article.body) ??
    ({
      version: 1 as const,
      tags: [
        article.subject_slug ?? "Article",
        article.section_slug ?? "Encyclopedia",
      ].filter(Boolean),
      facts: [
        { label: "Subject", value: article.subject_slug ?? "General" },
        {
          label: "Read time",
          value: article.minutes ? `${article.minutes} min` : "—",
        },
      ],
      overview: [article.excerpt ?? "", article.body ?? ""].filter(Boolean),
      sections: [],
    } satisfies ArticleLayout);

  const tabs = ["Scientific overview", ...layout.sections.map((section) => section.heading)];
  const image = resolveImage(
    article.image_url,
    articleImageKey[article.slug] ?? article.image_key,
  );
  const crumbs = [
    "Home",
    subjectTitle,
    article.section_slug ?? "Articles",
    article.title,
  ];

  const inner = (
    <div className="max-w-5xl">
      <nav className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        {crumbs.map((c, i) => (
          <span key={`${c}-${i}`} className="flex items-center gap-2">
            {i > 0 && <span>›</span>}
            {i === crumbs.length - 1 ? (
              <span className="font-medium text-primary">{c}</span>
            ) : i === 1 && article.subject_slug ? (
              <Link
                to={`/${article.subject_slug}`}
                className="hover:text-foreground"
              >
                {c}
              </Link>
            ) : (
              <span>{c}</span>
            )}
          </span>
        ))}
      </nav>

      <header className="mt-6 overflow-hidden rounded-2xl border border-border bg-card/80">
        <div className="relative overflow-hidden border-b border-border bg-secondary">
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="h-56 w-full object-cover sm:h-72 md:h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
            <span className="inline-flex items-center rounded-full border border-white/30 bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              Ted's Lab · Scientific reference
            </span>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <h1 className="font-display text-4xl font-black tracking-tight text-foreground">
            {article.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              <CheckCircle2 className="size-3.5" />
              Scientific reference
            </span>
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">
              Subject: {subjectTitle}
            </span>
          </div>
          {article.published && article.expert_reviewed && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="size-3.5" />
              Expert reviewed
            </div>
          )}
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {article.excerpt || layout.overview[0]}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {layout.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="mt-6 flex flex-wrap gap-2 rounded-2xl border border-border bg-card/80 p-2">
        <Link
          to="/articles/$slug"
          params={{ slug: article.slug }}
          className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary shadow-sm"
        >
          Article
        </Link>
        {!preview && (
          <Link
            to="/articles/$slug/annotations"
            params={{ slug: article.slug }}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            Annotations
          </Link>
        )}
        <a href={preview ? undefined : "#study-lesson"} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">Study lesson</a>
        {tabs.map((tab, index) => (
          <a
            key={tab}
            href={preview ? undefined : `#section-${index}`}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              index === 0
                ? "bg-primary/10 text-primary shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {index === 0 && <BookOpenText className="size-4" />}
            {index === 1 && <Leaf className="size-4" />}
            {index === 2 && <Sparkles className="size-4" />}
            {index === 3 && <Microscope className="size-4" />}
            {tab}
          </a>
        ))}
      </div>

      <section
        id="section-0"
        className="mt-8 rounded-2xl border border-border bg-card/80 p-6 md:p-8"
      >
        <h2 className="text-3xl font-bold text-foreground">Scientific overview</h2>
        <div className="prose prose-lg max-w-4xl dark:prose-invert mt-6 space-y-5 text-[15px] leading-8 text-muted-foreground">
          {layout.overview.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
          {layout.equation && (
            <div className="overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-5 text-center">
              <div className="text-sm font-semibold text-foreground">
                {layout.equation.formula}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                {layout.equation.caption}
              </div>
            </div>
          )}
        </div>
      </section>

      {layout.sections.map((sec, si) => (
        <section
          key={sec.heading}
          id={`section-${si + 1}`}
          className="mt-8 rounded-2xl border border-border bg-card/80 p-6 md:p-8"
        >
          <div className="mb-5 flex items-center gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-sm font-bold text-primary">{si + 1}</span><h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">{sec.heading}</h2></div>
          <div className="prose prose-lg dark:prose-invert mt-6 max-w-none space-y-6">
            {sec.paragraphs?.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="max-w-4xl text-[15px] leading-8 text-muted-foreground"
              >
                {p}
              </p>
            ))}
            {sec.cards?.map((card, ci) => (
              <div
                key={card.title}
                className="rounded-xl border border-border bg-secondary/40 p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {card.title.startsWith(String(ci + 1))
                    ? card.title
                    : `${ci + 1}. ${card.title}`}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {!preview && <ArticleConceptExplainer article={article} />}

      {!preview && <StudyLesson article={article} layout={layout} />}

      <div className="mt-8 flex items-center justify-between gap-3 rounded-xl border border-border bg-card/80 p-3 text-sm text-muted-foreground">
        <span>Was this reference useful?</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium hover:bg-accent"
          >
            <ThumbsUp className="size-3.5" />
            Yes
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium hover:bg-accent"
          >
            <ThumbsDown className="size-3.5" />
            No
          </button>
        </div>
      </div>

      {!preview && related.length > 0 && (
        <div className="mt-8">
          <RelatedArticles currentArticle={article} allArticles={related} />
        </div>
      )}
    </div>
  );

  const rail = (
    <aside className="w-full shrink-0 space-y-4 xl:w-80">
      <section className="bio-panel">
        <div className="border-b border-border px-4 py-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <BookOpenText className="size-4 text-primary" />
            Article contents
          </h2>
        </div>
        <nav className="space-y-1 p-2 text-sm">
          {["Overview", ...layout.sections.map((s) => s.heading)].map(
            (item, index) => (
              <a
                key={item}
                href={preview ? undefined : `#section-${index}`}
                className={`flex items-center justify-between rounded-md px-3 py-2 transition-colors ${
                  index === 0
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <span>{item}</span>
                {index !== 0 && <ChevronRight className="size-3.5" />}
              </a>
            ),
          )}
        </nav>
      </section>
      <section className="bio-panel">
        <div className="border-b border-border px-4 py-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Sparkles className="size-4 text-primary" />
            Article metadata
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 p-4 text-sm">
          {layout.facts.map((f) => (
            <div
              key={f.label}
              className="rounded-lg border border-border bg-secondary/50 p-3"
            >
              <p className="text-xs text-muted-foreground">{f.label}</p>
              <p className="mt-1 text-xs font-medium text-foreground">
                {f.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );

  if (preview) {
    return (
      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="min-w-0 flex-1">{inner}</div>
        {rail}
      </div>
    );
  }

  return <AppShell rail={rail}>{inner}</AppShell>;
}
