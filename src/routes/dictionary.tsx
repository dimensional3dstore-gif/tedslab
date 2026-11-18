import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useMemo, useState } from "react";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { BookOpen, Search, ArrowRight, Sparkles } from "lucide-react";

const featuredWords = ["quantum", "algorithm", "energy", "evolution", "gravity", "hypothesis"];

export const Route = createFileRoute("/dictionary")({
  head: () => ({
    meta: [
      { title: "Dictionary — Ted's Lab" },
      {
        name: "description",
        content: "Look up scientific and academic words using the Free Dictionary API.",
      },
    ],
  }),
  component: DictionaryPage,
});

function DictionaryPage() {
  const navigate = useNavigate();
  const [word, setWord] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const value = word.trim();
    if (!value) return;
    navigate({ to: "/dictionary/$word", params: { word: value } });
  };

  const popular = useMemo(() => featuredWords, []);

  return (
    <AppShell>
      <PageHeader
        title="Dictionary"
        description="A live reference for words and concepts used throughout Ted's Lab, powered by the Free Dictionary API."
      />

      <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="relative border-b border-border bg-gradient-to-br from-primary/15 via-card to-secondary/70 p-6 md:p-9">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpen className="size-5" />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Dictionary lookup
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Find a word, then read it like a Ted's Lab article.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Definitions, pronunciation, parts of speech, examples, synonyms, antonyms and word origins are shown when the API provides them.
          </p>

          <form onSubmit={submit} className="mt-6 flex flex-col gap-2 sm:flex-row">
            <label htmlFor="dictionary-word" className="sr-only">Word to define</label>
            <input
              id="dictionary-word"
              value={word}
              onChange={(event) => setWord(event.target.value)}
              placeholder="Enter a word, e.g. serendipity"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Search className="size-4" />
              Look up word
            </button>
          </form>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Explore common terms
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {popular.map((term) => (
              <Link
                key={term}
                to="/dictionary/$word"
                params={{ word: term }}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                {term}
                <ArrowRight className="size-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Definitions", "Multiple meanings grouped by part of speech."],
          ["Pronunciation", "Phonetic spellings and audio when available."],
          ["Usage", "Examples, synonyms and antonyms when supplied."],
        ].map(([title, description]) => (
          <div key={title} className="bio-panel p-5">
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
