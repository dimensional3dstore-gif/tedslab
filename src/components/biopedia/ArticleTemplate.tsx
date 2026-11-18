import {
  BookOpenText,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
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
  const subjectTitle =
    subjects.find((subject) => subject.slug === article.subject_slug)?.title ??
    article.subject_slug ??
    "Unassigned subject";

  const layout =
    layoutOverride ??
    layoutFromArticleBody(article.body) ??
    ({
      version: 1 as const,
      tags: [article.subject_slug ?? "Article", article.section_slug ?? "Encyclopedia"].filter(Boolean),
      facts: [
        { label: "Subject", value: subjectTitle },
        { label: "Read time", value: article.minutes ? `${article.minutes} min` : "—" },
        { label: "Format", value: "Scientific reference" },
      ],
      overview: [article.excerpt ?? "", article.body ?? ""].filter(Boolean),
      sections: [],
    } satisfies ArticleLayout);

  const tabs = ["Overview", ...layout.sections.map((section) => section.heading)];
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
    <div className="mx-auto w-full max-w-6xl">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
      >
        {crumbs.map((crumb, index) => (
          <span key={`${crumb}-${index}`} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="size-3" />}
            {index === crumbs.length - 1 ? (
              <span className="font-medium text-foreground">{crumb}</span>
            ) : index === 1 && article.subject_slug ? (
              <Link
                to={`/${article.subject_slug}`}
                className="transition-colors hover:text-foreground"
              >
                {crumb}
              </Link>
            ) : (
              <span>{crumb}</span>
            )}
          </span>
        ))}
      </nav>

      <header className="mt-5 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="relative min-h-[300px] overflow-hidden bg-secondary sm:min-h-[390px]">
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
                Ted's Lab · Scientific reference
              </span>
              {article.published && article.expert_reviewed && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-400/15 px-3 py-1.5 text-[11px] font-semibold text-emerald-100 backdrop-blur">
                  <CheckCircle2 className="size-3.5" />
                  Expert reviewed
                </span>
              )}
            </div>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/80 sm:text-lg">
              {article.excerpt || layout.overview[0]}
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              <CheckCircle2 className="size-3.5" />
              {subjectTitle}
            </span>
            {article.minutes ? (
              <span className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground">
                {article.minutes} min read
              </span>
            ) : null}
            {layout.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {article.subject_slug === "quantum" && (
            <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  QuantumPedia knowledge
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Explore the wider quantum knowledge collection, concepts, equations,
                  laboratory material and research.
                </p>
              </div>
              <Link
                to="/quantumpedia"
                className="inline-flex shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-background px-3.5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                Open QuantumPedia
              </Link>
            </div>
          )}
        </div>
      </header>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <main className="min-w-0">
          <div className="sticky top-16 z-20 mb-6 overflow-x-auto rounded-2xl border border-border bg-card/95 p-2 shadow-sm backdrop-blur">
            <div className="flex min-w-max gap-1">
              {tabs.map((tab, index) => (
                <a
                  key={tab}
                  href={preview ? undefined : `#section-${index}`}
                  className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                    index === 0
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {index === 0 && <BookOpenText className="size-3.5" />}
                  {index === 1 && <Leaf className="size-3.5" />}
                  {index === 2 && <Sparkles className="size-3.5" />}
                  {index === 3 && <Microscope className="size-3.5" />}
                  {tab}
                </a>
              ))}
            </div>
          </div>

          <section
            id="section-0"
            className="scroll-mt-24 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-9"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                01
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                  Scientific overview
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  The essential idea
                </h2>
              </div>
            </div>

            <div className="mt-7 space-y-5">
              {layout.overview.map((paragraph, index) => (
                <p
                  key={`${paragraph.slice(0, 48)}-${index}`}
                  className="max-w-4xl text-[15px] leading-8 text-muted-foreground sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {layout.equation && (
              <div className="mt-7 overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
                <p className="text-center font-mono text-base font-semibold tracking-tight text-foreground sm:text-lg">
                  {layout.equation.formula}
                </p>
                <p className="mt-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {layout.equation.caption}
                </p>
              </div>
            )}
          </section>

          {layout.sections.map((section, sectionIndex) => (
            <section
              key={section.heading}
              id={`section-${sectionIndex + 1}`}
              className="mt-6 scroll-mt-24 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-9"
            >
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-xs font-bold text-primary">
                  {String(sectionIndex + 2).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                    Section {sectionIndex + 1}
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {section.heading}
                  </h2>
                </div>
              </div>

              {section.paragraphs?.length ? (
                <div className="mt-7 space-y-5">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={`${paragraph.slice(0, 48)}-${paragraphIndex}`}
                      className="max-w-4xl text-[15px] leading-8 text-muted-foreground sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}

              {section.cards?.length ? (
                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  {section.cards.map((card, cardIndex) => (
                    <article
                      key={card.title}
                      className="rounded-2xl border border-border bg-secondary/35 p-5 transition-colors hover:border-primary/30"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                          {cardIndex + 1}
                        </span>
                        <h3 className="text-base font-bold tracking-tight text-foreground">
                          {card.title}
                        </h3>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {card.text}
                      </p>
                    </article>
                  ))}
                </div>
              ) : null}
            </section>
          ))}

          {!preview && <ArticleConceptExplainer article={article} />}

          {!preview && layout.references?.length ? (
            <section className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-9">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <BookOpenText className="size-4" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                    Sources
                  </p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                    References
                  </h2>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {layout.references.map((reference) => (
                  <p
                    key={reference}
                    className="rounded-xl border border-border bg-secondary/30 p-4 text-sm leading-7 text-muted-foreground"
                  >
                    {reference}
                  </p>
                ))}
              </div>
            </section>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Was this reference useful?
              </p>
              <p className="text-xs text-muted-foreground">
                Your feedback helps improve Ted's Lab articles.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium transition-colors hover:bg-accent"
              >
                <ThumbsUp className="size-3.5" />
                Yes
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium transition-colors hover:bg-accent"
              >
                <ThumbsDown className="size-3.5" />
                No
              </button>
            </div>
          </div>

          {!preview && related.length > 0 && (
            <div className="mt-6">
              <RelatedArticles currentArticle={article} allArticles={related} />
            </div>
          )}
        </main>

        <aside className="hidden xl:block">
          <div className="sticky top-20 space-y-4">
            <section className="rounded-2xl border border-border bg-card shadow-sm">
              <div className="border-b border-border px-4 py-3">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <BookOpenText className="size-4 text-primary" />
                  Contents
                </h2>
              </div>
              <nav className="space-y-1 p-2">
                {tabs.map((item, index) => (
                  <a
                    key={item}
                    href={preview ? undefined : `#section-${index}`}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-xs transition-colors ${
                      index === 0
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <span>{item}</span>
                    {index !== 0 && <ChevronRight className="size-3.5" />}
                  </a>
                ))}
              </nav>
            </section>

            <section className="rounded-2xl border border-border bg-card shadow-sm">
              <div className="border-b border-border px-4 py-3">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Sparkles className="size-4 text-primary" />
                  Article details
                </h2>
              </div>
              <div className="grid gap-2 p-3">
                {layout.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-xl border border-border bg-secondary/35 p-3"
                  >
                    <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      {fact.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {article.subject_slug === "quantum" && (
              <Link
                to="/quantumpedia"
                className="group block rounded-2xl border border-primary/20 bg-primary/5 p-4 transition-colors hover:border-primary/40 hover:bg-primary/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                    QuantumPedia
                  </p>
                  <ExternalLink className="size-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Continue through the wider quantum knowledge collection.
                </p>
              </Link>
            )}
          </div>
        </aside>
      </div>
    </div>
  );

  const rail = null;

  if (preview) {
    return <div className="px-4 py-6 sm:px-6">{inner}</div>;
  }

  return <AppShell rail={rail}>{inner}</AppShell>;
}
