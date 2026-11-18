import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArticleTemplate } from "@/components/biopedia/ArticleTemplate";
import type { ArticleRow } from "@/lib/content";

type DictionaryEntry = {
  word?: string;
  phonetic?: string;
  phonetics?: { text?: string; audio?: string }[];
  origin?: string;
  meanings?: {
    partOfSpeech?: string;
    definitions?: {
      definition?: string;
      example?: string;
      synonyms?: string[];
      antonyms?: string[];
    }[];
  }[];
};

export const Route = createFileRoute("/dictionary/$word")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.word} — Dictionary — Ted's Lab` },
      { name: "description", content: `Dictionary article for ${params.word} on Ted's Lab.` },
    ],
  }),
  component: DictionaryArticlePage,
});

function DictionaryArticlePage() {
  const { word } = Route.useParams();
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    setEntry(null);

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.message || "The dictionary could not find that word.");
        }
        return data[0] as DictionaryEntry;
      })
      .then((data) => {
        if (!cancelled) setEntry(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Dictionary lookup failed.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [word]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background px-4 py-8 sm:px-6" aria-label="Loading dictionary article" aria-busy="true">
        <div className="mx-auto max-w-5xl animate-pulse space-y-6">
          <div className="h-3 w-32 rounded bg-muted" />
          <div className="h-10 w-2/3 rounded bg-muted" />
          <div className="h-4 w-1/3 rounded bg-muted" />
          <div className="h-56 rounded-2xl bg-muted sm:h-80" />
          <div className="space-y-3">
            <div className="h-5 w-40 rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-5/6 rounded bg-muted" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !entry) {
    return (
      <main className="min-h-screen bg-background px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-card p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Dictionary</p>
          <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-foreground">{word}</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{error || "No dictionary entry was returned."}</p>
        </div>
      </main>
    );
  }

  const meanings = entry.meanings ?? [];
  const sections = meanings.map((meaning, index) => ({
    heading: meaning.partOfSpeech || `Meaning ${index + 1}`,
    paragraphs: (meaning.definitions ?? [])
      .map((definition) => definition.definition || "")
      .filter(Boolean),
    cards: (meaning.definitions ?? [])
      .filter((definition) =>
        definition.example ||
        (definition.synonyms?.length ?? 0) > 0 ||
        (definition.antonyms?.length ?? 0) > 0,
      )
      .slice(0, 4)
      .map((definition) => ({
        title: definition.example ? "Example and usage" : "Related words",
        text: [
          definition.example ? `“${definition.example}”` : "",
          definition.synonyms?.length ? `Synonyms: ${definition.synonyms.join(", ")}.` : "",
          definition.antonyms?.length ? `Antonyms: ${definition.antonyms.join(", ")}.` : "",
        ].filter(Boolean).join(" "),
      })),
  }));

  const overview = [
    `The word “${entry.word ?? word}” is presented as a Ted's Lab dictionary article using live data from the Free Dictionary API.`,
    entry.origin ? `Origin: ${entry.origin}` : "",
  ].filter(Boolean);

  const article: ArticleRow = {
    id: `dictionary-${(entry.word ?? word).toLowerCase()}`,
    slug: word.toLowerCase(),
    title: entry.word ?? word,
    excerpt: entry.phonetic || "Dictionary reference",
    body: JSON.stringify({
      version: 1,
      tags: ["Dictionary", "Ted's Lab"],
      facts: [
        { label: "Word", value: entry.word ?? word },
        {
          label: "Part of speech",
          value: meanings.map((meaning) => meaning.partOfSpeech).filter(Boolean).join(", ") || "—",
        },
        { label: "Source", value: "Free Dictionary API" },
      ],
      overview,
      sections,
    }),
    minutes: 2,
    tone: "reference",
    subject_slug: "dictionary",
    section_slug: "dictionary",
    topic_slug: "words",
    image_key: "sci-physics",
    image_url: null,
    video_url: null,
    published: true,
    status: "published",
    sort: 0,
    expert_reviewed: false,
  };

  return <ArticleTemplate article={article} related={[]} />;
}
