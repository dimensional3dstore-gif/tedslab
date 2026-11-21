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
    const stopWords = new Set(["what","which","when","where","who","why","how","is","are","the","a","an","of","for","to","in","on","with","and","or","does","do","explain","about"]);
    const terms = normalizedQuery.split(" ").filter((term) => term && !stopWords.has(term));
    if (!terms.length) return [];
    function hasTerm(text: string, term: string) {
      const words = new Set(normalize(text).split(" "));
      const alias = SEARCH_ALIASES[term]?.[0];
      return words.has(term) || Boolean(alias && words.has(normalize(alias)));
    }
    function matches(text: string) {
      return terms.filter((term) => hasTerm(text, term)).length;
    }
    function makeResult(id: string, title: string, description: string, href: string, type: Result["type"], body: string): Result {
      const titleHits = matches(title);
      const summaryHits = matches(description);
      const bodyHits = matches(body.slice(0, 1800));
      const matchedTerms = new Set(terms.filter((term) => [title, description, body.slice(0, 1800)].some((field) => hasTerm(field, term)))).size;
      const exactPhrase = normalize(title).includes(normalizedQuery) || normalize(description).includes(normalizedQuery);
      const score = titleHits * 20 + summaryHits * 8 + bodyHits * 2 + (exactPhrase ? 100 : 0);
      return { id, title, description, href, type, score, matchedTerms };
    }
    const all: Result[] = [
      ...(articles ?? []).filter((article) => article.published === true).map((article) => makeResult("article-" + article.id, article.title, article.excerpt ?? "", "/articles/" + article.slug, "Article", [article.subject_slug ?? "", article.topic_slug ?? "", article.body ?? ""].join(" "))),
      ...(subjects ?? []).map((subject) => makeResult("subject-" + subject.id, subject.title, subject.description ?? "", "/" + subject.slug, "Subject", subject.slug ?? "")),
      ...(topics ?? []).map((topic) => makeResult("topic-" + topic.id, topic.title, topic.blurb ?? "", "/" + topic.subject_slug + "/" + topic.slug, "Topic", [topic.subject_slug ?? "", topic.body ?? ""].join(" "))),
      ...(pages ?? []).filter((page) => page.published === true).map((page) => makeResult("page-" + page.id, page.title, page.description ?? "", "/pages/" + page.slug, "Page", [page.slug ?? "", page.body ?? ""].join(" "))),
    ];
    const requiredCoverage = terms.length <= 2 ? 1 : 0.75;
    return all.filter((result) => result.matchedTerms / terms.length >= requiredCoverage)
      .filter((result) => normalize(result.title).includes(normalizedQuery) || normalize(result.description).includes(normalizedQuery) || terms.some((term) => hasTerm(result.title, term)))
      .filter((result) => filter === "All" || result.type === filter)
      .sort((a, b) => b.score - a.score || b.matchedTerms - a.matchedTerms || a.title.localeCompare(b.title)).slice(0, 12);
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

      const context = results.slice(0, 8).map((result, index) =>
        (index + 1) + ". " + result.title + " [" + result.type + "]\nURL: " + result.href + "\nSummary: " + result.description
      ).join("\n\n");

      const prompt = "You are the intelligent answer engine for Ted's Lab Search Lab.\n" +
        "Understand the user's intent and answer the actual question, rather than explaining the search results.\n\n" +
        "Rules:\n- Start with the direct answer.\n" +
        "- Reason over the available evidence and synthesize it into a useful response.\n" +
        "- Treat retrieved results as supporting evidence, not as the user's question.\n" +
        "- Ignore results that are unrelated to the query. Never mention unrelated results just because they were retrieved.\n" +
        "- For math, calculations, definitions, comparisons, explanations, and factual questions, answer those directly.\n" +
        "- If the supplied results are insufficient, use the server's web-grounded model when available; otherwise be transparent about uncertainty.\n" +
        "- Do not invent facts or pretend a result supports something it does not.\n" +
        "- Mention Ted's Lab result titles only when they genuinely help answer the question.\n" +
        "- Keep the answer concise but substantive, normally 2-4 short paragraphs.\n" +
        "- Do not use markdown tables.\n" +
        "- Do not claim web research unless the server reports web grounding.\n\n" +
        "User query: " + submittedQuery + "\n\n" +
        "Potential Ted's Lab evidence:\n" + (context || "(No matching Ted's Lab results were found.)");

      try {
        const response = await fetch("/llm/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, query: submittedQuery, results: results.slice(0, 8) }),
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
                Only closely relevant Ted's Lab matches are shown. AI Overview answers your question directly.
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


function renderAiInline(text: string, keyPrefix: string) {
  const tokens = text.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|\*\*[^*]+\*\*)/g);
  return tokens.map((token, index) => {
    const link = token.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (link) return <a key={keyPrefix + index} href={link[2]} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2 hover:opacity-80">{link[1]}</a>;
    const bold = token.match(/^\*\*(.+)\*\*$/);
    if (bold) return <strong key={keyPrefix + index} className="font-semibold text-foreground">{bold[1]}</strong>;
    return <span key={keyPrefix + index}>{token}</span>;
  });
}

function renderAiAnswer(answer: string) {
  const blocks = answer.trim().split(/\n\s*\n/);
  return (
    <div className="space-y-3">
      {blocks.map((block, index) => {
        const lines = block.split(/\r?\n/).filter(Boolean);
        if (lines.length && lines.every((line) => /^\s*[-*]\s+/.test(line))) {
          return <ul key={index} className="list-disc space-y-1 pl-5">{lines.map((line, lineIndex) => <li key={lineIndex}>{renderAiInline(line.replace(/^\s*[-*]\s+/, ""), index + "-" + lineIndex)}</li>)}</ul>;
        }
        return <div key={index} className="space-y-1">{lines.map((line, lineIndex) => {
          const heading = line.match(/^#{1,3}\s+(.+)$/);
          if (heading) return <h3 key={lineIndex} className="pt-1 text-base font-semibold text-foreground">{renderAiInline(heading[1], index + "-" + lineIndex)}</h3>;
          return <p key={lineIndex}>{renderAiInline(line, index + "-" + lineIndex)}</p>;
        })}</div>;
      })}
    </div>
  );
}
