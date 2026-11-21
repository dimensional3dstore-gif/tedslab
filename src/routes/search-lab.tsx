import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Globe2,
  Search,
  Sparkles,
  Atom,
  Layers3,
  FileText,
  X,
} from "lucide-react";
import { AppShell } from "@/components/biopedia/AppShell";
import { useArticles, usePages, useSubjects, useTopics } from "@/lib/content";

export const Route = createFileRoute("/search-lab")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({
    meta: [
      { title: "Search Lab — Ted's Lab" },
      {
        name: "description",
        content: "Search Ted's Lab articles, subjects, topics and pages with Search Lab.",
      },
    ],
  }),
  component: SearchLab,
});

type Result = {
  id: string;
  title: string;
  description: string;
  href: string;
  type: "Article" | "Subject" | "Topic" | "Page";
  score: number;
  matchedTerms: number;
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const SEARCH_ALIASES: Record<string, string[]> = {
  ai: ["artificial", "intelligence"],
  artificial: ["ai"],
  intelligence: ["ai"],
  ml: ["machine", "learning"],
  machine: ["ml"],
  biology: ["life", "science"],
  physics: ["physical", "science"],
  chemistry: ["chemical", "science"],
  maths: ["mathematics"],
  math: ["mathematics"],
  computing: ["computer", "science"],
  computers: ["computer", "science"],
};

function SearchLab() {
  const navigate = useNavigate();
  const { q: urlQuery } = Route.useSearch();
  const { data: articles, isLoading: articlesLoading } = useArticles();
  const { data: subjects, isLoading: subjectsLoading } = useSubjects();
  const { data: topics, isLoading: topicsLoading } = useTopics();
  const { data: pages, isLoading: pagesLoading } = usePages();
  const [query, setQuery] = useState(urlQuery);
  const [submittedQuery, setSubmittedQuery] = useState(urlQuery);
  const [filter, setFilter] = useState<"All" | Result["type"]>("All");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(false);
  const [aiGrounded, setAiGrounded] = useState(false);
  const [spellingSuggestion, setSpellingSuggestion] = useState<string | null>(null);
  const [calculatorValue, setCalculatorValue] = useState("0");

  const contentLoading =
    articlesLoading || subjectsLoading || topicsLoading || pagesLoading;

  useEffect(() => {
    setQuery(urlQuery);
    setSubmittedQuery(urlQuery);
  }, [urlQuery]);



  const results = useMemo(() => {
    const normalizedQuery = normalize(submittedQuery);
    if (!normalizedQuery) return [];

    const rawTerms = normalizedQuery.split(" ").filter(Boolean);
    const terms = Array.from(
      new Set([
        ...rawTerms,
        ...rawTerms.flatMap((term) => SEARCH_ALIASES[term] ?? []),
      ]),
    );

    function scoreField(text: string, weight: number) {
      const value = normalize(text);
      if (!value) return { score: 0, matchedTerms: 0 };

      let score = 0;
      let matchedTerms = 0;

      if (value === normalizedQuery) score += 120 * weight;
      if (value.includes(normalizedQuery)) score += 70 * weight;

      for (const term of terms) {
        if (value === term) {
          score += 45 * weight;
          matchedTerms += 1;
        } else if (value.startsWith(term)) {
          score += 25 * weight;
          matchedTerms += 1;
        } else if (value.includes(" " + term + " ")) {
          score += 20 * weight;
          matchedTerms += 1;
        } else if (value.includes(term)) {
          score += 8 * weight;
          matchedTerms += 1;
        }
      }

      return { score, matchedTerms };
    }

    function makeResult(
      id: string,
      title: string,
      description: string,
      href: string,
      type: Result["type"],
      fields: Array<[string, number]>,
    ): Result {
      const titleMatch = scoreField(title, 4);
      const bodyMatch = fields.reduce(
        (acc, [text, weight]) => {
          const result = scoreField(text, weight);
          return {
            score: acc.score + result.score,
            matchedTerms: acc.matchedTerms + result.matchedTerms,
          };
        },
        { score: 0, matchedTerms: 0 },
      );

      let score = titleMatch.score + bodyMatch.score;

      // Prefer results that match every meaningful query term.
      const totalMatchedTerms = titleMatch.matchedTerms + bodyMatch.matchedTerms;
      const coverage = Math.min(totalMatchedTerms, terms.length) / Math.max(terms.length, 1);
      score += coverage * 60;

      // A title match should beat a weak body-only match.
      if (titleMatch.matchedTerms > 0) score += 35;
      if (titleMatch.matchedTerms >= rawTerms.length) score += 45;

      return {
        id,
        title,
        description,
        href,
        type,
        score,
        matchedTerms: Math.min(
          terms.length,
          titleMatch.matchedTerms + bodyMatch.matchedTerms,
        ),
      };
    }

    const all: Result[] = [
      ...(articles ?? [])
        .filter((article) => article.published === true)
        .map((article) =>
          makeResult(
            "article-" + article.id,
            article.title,
            article.excerpt ??
              article.body
                ?.replace(/<[^>]+>/g, " ")
                .replace(/\s+/g, " ")
                .trim()
                .slice(0, 180) ??
              "",
            "/articles/" + article.slug,
            "Article",
            [
              [article.excerpt ?? "", 2],
              [article.body ?? "", 1],
              [article.subject_slug ?? "", 2],
              [article.topic_slug ?? "", 2],
            ],
          ),
        ),
      ...(subjects ?? []).map((subject) =>
        makeResult(
          "subject-" + subject.id,
          subject.title,
          subject.description ?? "",
          "/" + subject.slug,
          "Subject",
          [[subject.description ?? "", 2], [subject.slug ?? "", 2]],
        ),
      ),
      ...(topics ?? []).map((topic) =>
        makeResult(
          "topic-" + topic.id,
          topic.title,
          topic.blurb ??
            topic.body
              ?.replace(/<[^>]+>/g, " ")
              .replace(/\s+/g, " ")
              .trim()
              .slice(0, 180) ??
            "",
          "/" + topic.subject_slug + "/" + topic.slug,
          "Topic",
          [
            [topic.blurb ?? "", 2],
            [topic.body ?? "", 1],
            [topic.subject_slug ?? "", 2],
            [topic.slug ?? "", 2],
          ],
        ),
      ),
      ...(pages ?? [])
        .filter((page) => page.published === true)
        .map((page) =>
          makeResult(
            "page-" + page.id,
            page.title,
            page.description ?? "",
            "/pages/" + page.slug,
            "Page",
            [
              [page.description ?? "", 2],
              [page.body ?? "", 1],
              [page.slug ?? "", 2],
            ],
          ),
        ),
    ];

    return all
      .filter((result) => result.matchedTerms > 0 && result.score > 0)
      .filter((result) => filter === "All" || result.type === filter)
      .sort(
        (a, b) =>
          b.score - a.score ||
          b.matchedTerms - a.matchedTerms ||
          a.title.localeCompare(b.title),
      )
      .slice(0, 50);
  }, [articles, subjects, topics, pages, submittedQuery, filter]);

  useEffect(() => {
    let cancelled = false;

    async function generateSearchAnswer() {
      if (!submittedQuery.trim() || contentLoading) {
        setAiAnswer("");
        setAiError(false);
        setAiGrounded(false);
        setSpellingSuggestion(null);
        return;
      }

      setAiLoading(true);
      setAiError(false);
      setAiGrounded(false);

      const context = results.slice(0, 12).map((result, index) =>
        (index + 1) + ". " + result.title + " [" + result.type + "]\nURL: " + result.href + "\nSummary: " + result.description
      ).join("\n\n");

      const prompt = "You are the AI answer engine for Ted's Lab Search Lab.\n" +
        "Answer the user's search query using the search results supplied below.\n\n" +
        "Rules:\n- Give a concise, useful answer in 2-4 short paragraphs.\n" +
        "- Start with the direct answer, then add the most useful context.\n" +
        "- Synthesize the results rather than merely listing them.\n" +
        "- Prefer information supported by the supplied Ted's Lab results.\n" +
        "- If the results do not contain enough information, say that clearly and avoid inventing facts.\n" +
        "- Mention relevant result titles naturally when useful.\n" +
        "- Do not use markdown tables.\n" +
        "- Do not claim you browsed the wider web unless the server explicitly reports web grounding.\n\n" +
        "User query: " + submittedQuery + "\n\n" +
        "Search results:\n" + (context || "(No matching Ted's Lab results were found.)");

      try {
        const response = await fetch("/llm/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, query: submittedQuery, results: results.slice(0, 12) }),
        });

        const data = (await response.json()) as {
          answer?: string;
          grounded?: boolean;
          spellingSuggestion?: string | null;
        };

        if (!response.ok) throw new Error(data.answer || "AI request failed");

        if (!cancelled) {
          setAiAnswer(data.answer?.trim() ?? "");
          setAiGrounded(Boolean(data.grounded));
          setSpellingSuggestion(data.spellingSuggestion?.trim() || null);
          setAiError(!data.answer?.trim());
        }
      } catch {
        if (!cancelled) {
          setAiAnswer("");
          setAiGrounded(false);
          setSpellingSuggestion(null);
          setAiError(true);
        }
      } finally {
        if (!cancelled) setAiLoading(false);
      }
    }

    void generateSearchAnswer();
    return () => {
      cancelled = true;
    };
  }, [submittedQuery, results, contentLoading]);

  const isMathQuestion =
    /\b(what is|calculate|compute|solve|evaluate|equals|how much is)\b/i.test(submittedQuery) &&
    /\d/.test(submittedQuery);

  const calculatorButtons = [
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "−"],
    ["0", ".", "=", "+"],
    ["C", "(", ")", "⌫"],
  ];

  const pressCalculator = (button: string) => {
    if (button === "C") {
      setCalculatorValue("0");
      return;
    }
    if (button === "⌫") {
      setCalculatorValue((value) => value.length > 1 ? value.slice(0, -1) : "0");
      return;
    }
    if (button === "=") {
      try {
        const expression = calculatorValue.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
        if (!/^[0-9()+*/.\- ]+$/.test(expression)) return;
        const result = Function("return (" + expression + ")")();
        if (typeof result === "number" && Number.isFinite(result)) {
          setCalculatorValue(String(Number(result.toFixed(10))));
        }
      } catch {
        setCalculatorValue("Error");
      }
      return;
    }
    setCalculatorValue((value) => value === "0" || value === "Error" ? button : value + button);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const value = query.trim();
    setFilter("All");
    navigate({
      to: "/search-lab",
      search: value ? { q: value } : { q: undefined },
    });
  };

  const clear = () => {
    setQuery("");
    setSubmittedQuery("");
    setFilter("All");
    navigate({ to: "/search-lab", search: { q: undefined } });
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl">
        <section
          className={
            submittedQuery
              ? "pt-6 pb-5"
              : "flex min-h-[calc(100vh-9rem)] flex-col items-center justify-center pb-20"
          }
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
              <Search className="size-8 text-primary" />
            </div>
            <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
              Ted's Lab
            </p>
            <h1 className="mt-1 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Search Lab
            </h1>
            {!submittedQuery && (
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Search the knowledge inside Ted's Lab. Find the most relevant
                articles, subjects, topics and pages from one search box.
              </p>
            )}
          </div>

          <form onSubmit={submit} className="mx-auto mt-7 w-full max-w-2xl">
            <div className="group flex items-center rounded-full border border-border bg-background px-5 shadow-sm transition-all focus-within:border-primary/50 focus-within:shadow-md">
              <Search className="mr-3 size-5 shrink-0 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Ted's Lab"
                aria-label="Search Ted's Lab"
                className="h-14 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              {query && (
                <button
                  type="button"
                  onClick={clear}
                  aria-label="Clear search"
                  className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
              <button
                type="submit"
                className="ml-2 hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:block"
              >
                Search
              </button>
            </div>
          </form>

          {!submittedQuery && (
            <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
              {["quantum mechanics", "artificial intelligence", "history", "mathematics"].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() =>
                      navigate({ to: "/search-lab", search: { q: suggestion } })
                    }
                    className="rounded-full border border-border bg-card px-3 py-1.5 hover:border-primary/40 hover:text-primary"
                  >
                    {suggestion}
                  </button>
                ),
              )}
            </div>
          )}
        </section>

        {submittedQuery && (
          <section className="pb-12">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  {contentLoading
                    ? "Searching…"
                    : resultCountLabel(results.length)}
                </p>
                <h2 className="text-xl font-semibold">“{submittedQuery}”</h2>
              </div>
              <a
                href={
                  "https://www.google.com/search?q=" +
                  encodeURIComponent(submittedQuery)
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-medium hover:border-primary/40 hover:text-primary"
              >
                Google
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>

            <section className={isMathQuestion ? "mt-6 grid max-w-5xl gap-5 lg:grid-cols-[minmax(0,1fr)_300px]" : "mt-6 max-w-3xl"}>
              <div>
                {spellingSuggestion && spellingSuggestion.toLowerCase() !== submittedQuery.trim().toLowerCase() && (
                  <button
                    type="button"
                    onClick={() => navigate({ to: "/search-lab", search: { q: spellingSuggestion } })}
                    className="mb-3 flex w-full items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-left text-sm hover:border-primary/40"
                  >
                    <Search className="size-4 text-primary" />
                    <span>
                      Did you mean <strong className="text-primary">{spellingSuggestion}</strong>?
                    </span>
                  </button>
                )}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="size-4 text-primary" />
                  <span>AI Overview</span>
                </div>
                {aiLoading ? (
                  <div className="mt-4 space-y-3" aria-label="Generating AI search result">
                    <div className="h-4 w-11/12 animate-pulse rounded bg-secondary" />
                    <div className="h-4 w-10/12 animate-pulse rounded bg-secondary" />
                    <div className="h-4 w-7/12 animate-pulse rounded bg-secondary" />
                  </div>
                ) : aiAnswer ? (
                  <>
                    <div className="mt-3 text-[15px] leading-7 text-foreground/90">
                      {renderAiAnswer(aiAnswer)}
                    </div>
                    {aiGrounded && (
                      <p className="mt-4 text-xs text-muted-foreground">
                        Generated by OpenRouter and grounded in Ted's Lab results{aiGrounded ? " with live web research when available" : ""}.
                      </p>
                    )}
                  </>
                ) : aiError ? (
                  <p className="mt-3 text-sm text-muted-foreground">
                    AI Overview could not reach OpenRouter right now. Search results are still available below.
                  </p>
                ) : null}
                </div>
              </div>
              {isMathQuestion && (
                <aside className="rounded-2xl border border-border bg-card p-4 shadow-sm lg:sticky lg:top-6 lg:h-fit">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <span className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary">±</span>
                    Calculator
                  </div>
                  <div className="mb-3 rounded-xl bg-secondary px-3 py-4 text-right font-mono text-2xl tabular-nums">
                    {calculatorValue}
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {calculatorButtons.flat().map((button) => (
                      <button
                        key={button}
                        type="button"
                        onClick={() => pressCalculator(button)}
                        className="h-11 rounded-xl border border-border bg-background text-sm font-medium hover:border-primary/40 hover:bg-secondary"
                      >
                        {button}
                      </button>
                    ))}
                  </div>
                </aside>
              )}
            </section>

            <div className="mt-8 max-w-3xl">
              <h2 className="mb-4 text-xl font-semibold">Web Results</h2>

            {contentLoading ? (
              <div
                className="mt-5 space-y-3"
                aria-label="Loading search results"
              >
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-24 animate-pulse rounded-xl bg-secondary/60"
                  />
                ))}
              </div>
            ) : results.length ? (
              <div className="space-y-7">
                {results.map((result) => (
                  <article key={result.id}>
                    <Link to={result.href} className="group block">
                      <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full border border-border bg-background">
                          <Globe2 className="size-3.5" />
                        </span>
                        <span className="truncate">tedslab.app{result.href}</span>
                      </div>
                      <h3 className="text-xl font-medium leading-7 text-primary group-hover:underline">
                        {result.title}
                      </h3>
                      {result.description && (
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                          {result.description}
                        </p>
                      )}
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <Sparkles className="mx-auto size-7 text-primary" />
                <h3 className="mt-3 text-lg font-semibold">
                  No relevant results
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try a broader term, a subject name, a topic, or a different
                  spelling.
                </p>
              </div>
            )}

            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Globe2 className="size-3.5" />
              <span>
                Results from Ted's Lab, with AI Overview grounded in live web research when available.
              </span>
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}

function resultCountLabel(count: number) {
  return count === 1 ? "1 relevant result" : count + " relevant results";
}


function renderAiAnswer(answer: string) {
  const parts = answer.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g);
  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
        if (match) {
          return (
            <a
              key={index}
              href={match[2]}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline underline-offset-2 hover:opacity-80"
            >
              {match[1]}
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
