import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/biopedia/AppShell";
import { ArrowLeft, BookOpenText, CheckCircle2, ChevronRight, Headphones, Search, Sparkles } from "lucide-react";

type Phonetic = { text?: string; audio?: string };
type Definition = { definition: string; example?: string; synonyms?: string[]; antonyms?: string[] };
type Meaning = { partOfSpeech: string; definitions: Definition[] };
type DictionaryEntry = { word: string; phonetic?: string; phonetics?: Phonetic[]; origin?: string; meanings: Meaning[]; sourceUrls?: string[] };
type DictionaryError = { title?: string; message?: string; resolution?: string };

export const Route = createFileRoute("/dictionary/$word")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.word} — Dictionary — Ted's Lab` },
      { name: "description", content: `Dictionary entry for ${params.word} in Ted's Lab.` },
    ],
  }),
  component: DictionaryArticlePage,
});

function DictionaryArticlePage() {
  const { word } = Route.useParams();
  const decodedWord = decodeURIComponent(word);
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [error, setError] = useState<DictionaryError | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchWord, setSearchWord] = useState(decodedWord);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setEntry(null);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(decodedWord)}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw data as DictionaryError;
        return data as DictionaryEntry[];
      })
      .then((data) => { if (!cancelled) setEntry(data[0] ?? null); })
      .catch((reason: DictionaryError) => { if (!cancelled) setError(reason); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [decodedWord]);

  const audio = useMemo(() => entry?.phonetics?.find((phonetic) => phonetic.audio)?.audio, [entry]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const value = searchWord.trim();
    if (!value) return;
    window.location.href = `/dictionary/${encodeURIComponent(value)}`;
  };

  return (
    <AppShell>
      <div className="max-w-5xl">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Link to="/dictionary" className="inline-flex items-center gap-2 hover:text-foreground"><ArrowLeft className="size-3.5" />Dictionary</Link>
          <span>›</span>
          <span className="font-medium text-primary">{decodedWord}</span>
        </nav>

        <header className="mt-6 overflow-hidden rounded-2xl border border-border bg-card/80">
          <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/15 via-card to-secondary/70">
            <div className="relative p-6 md:p-9">
              <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Ted's Lab · Dictionary reference</span>
              <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Word entry</p>
                  <h1 className="mt-2 font-display text-5xl font-black tracking-tight text-foreground">{decodedWord}</h1>
                  {entry?.phonetic && <p className="mt-2 text-base text-muted-foreground">{entry.phonetic}</p>}
                </div>
                {audio && (
                  <button type="button" onClick={() => new Audio(audio).play()} className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5">
                    <Headphones className="size-4" />Hear pronunciation
                  </button>
                )}
              </div>
              <form onSubmit={submitSearch} className="mt-6 flex flex-col gap-2 sm:flex-row">
                <label htmlFor="dictionary-entry-search" className="sr-only">Search another word</label>
                <input id="dictionary-entry-search" value={searchWord} onChange={(event) => setSearchWord(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder="Search another word" />
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"><Search className="size-4" />Search</button>
              </form>
            </div>
          </div>

          {entry && (
            <div className="flex flex-wrap gap-2 p-6 md:p-8">
              <span className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"><CheckCircle2 className="size-3.5" />Dictionary entry</span>
              <span className="inline-flex items-center rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">{entry.meanings.length} part{entry.meanings.length === 1 ? " of speech" : "s of speech"}</span>
              <span className="inline-flex items-center rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">Free Dictionary API</span>
            </div>
          )}
        </header>

        {loading && <div className="mt-8 bio-panel p-8"><div className="h-5 w-40 animate-pulse rounded bg-secondary" /><div className="mt-5 h-4 w-full animate-pulse rounded bg-secondary" /><div className="mt-3 h-4 w-5/6 animate-pulse rounded bg-secondary" /><div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-secondary" /></div>}

        {error && !loading && (
          <section className="mt-8 bio-panel p-8 text-center">
            <BookOpenText className="mx-auto size-8 text-muted-foreground" />
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground">No definition found</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{error.message ?? "The Dictionary API could not find an entry for this word."}</p>
            {error.resolution && <p className="mx-auto mt-2 max-w-xl text-xs text-muted-foreground">{error.resolution}</p>}
            <Link to="/dictionary" className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"><ArrowLeft className="size-4" />Back to Dictionary</Link>
          </section>
        )}

        {entry && !loading && (
          <>
            <div className="mt-6 flex flex-wrap gap-2 rounded-2xl border border-border bg-card/80 p-2">
              <a href="#overview" className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary shadow-sm">Overview</a>
              {entry.meanings.map((meaning, index) => <a key={`${meaning.partOfSpeech}-${index}`} href={`#meaning-${index}`} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">{meaning.partOfSpeech}</a>)}
              {entry.origin && <a href="#origin" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">Origin</a>}
            </div>

            <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem]">
              <main className="min-w-0">
                <section id="overview" className="rounded-2xl border border-border bg-card/80 p-6 md:p-8">
                  <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-sm font-bold text-primary">1</span><h2 className="font-display text-3xl font-bold tracking-tight text-foreground">Overview</h2></div>
                  <p className="mt-6 max-w-4xl text-[15px] leading-8 text-muted-foreground">The Dictionary API entry for <strong className="font-semibold text-foreground">{entry.word}</strong> contains {entry.meanings.reduce((count, meaning) => count + meaning.definitions.length, 0)} definition{entry.meanings.reduce((count, meaning) => count + meaning.definitions.length, 0) === 1 ? "" : "s"} across {entry.meanings.length} part{entry.meanings.length === 1 ? "" : "s"} of speech.</p>
                </section>

                {entry.meanings.map((meaning, meaningIndex) => (
                  <section key={`${meaning.partOfSpeech}-${meaningIndex}`} id={`meaning-${meaningIndex}`} className="mt-8 rounded-2xl border border-border bg-card/80 p-6 md:p-8">
                    <div className="mb-5 flex items-center gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-sm font-bold text-primary">{meaningIndex + 2}</span><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Part of speech</p><h2 className="font-display text-2xl font-bold capitalize tracking-tight text-foreground md:text-3xl">{meaning.partOfSpeech}</h2></div></div>
                    <div className="space-y-5">
                      {meaning.definitions.map((definition, definitionIndex) => (
                        <article key={`${definition.definition}-${definitionIndex}`} className="rounded-xl border border-border bg-secondary/35 p-5">
                          <p className="text-base font-medium leading-7 text-foreground">{definitionIndex + 1}. {definition.definition}</p>
                          {definition.example && <div className="mt-4 border-l-2 border-primary/30 pl-4"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Example</p><p className="mt-1 text-sm italic leading-7 text-muted-foreground">“{definition.example}”</p></div>}
                          {(definition.synonyms?.length || definition.antonyms?.length) ? (
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                              {definition.synonyms?.length ? <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Synonyms</p><p className="mt-1 text-sm text-muted-foreground">{definition.synonyms.join(", ")}</p></div> : null}
                              {definition.antonyms?.length ? <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Antonyms</p><p className="mt-1 text-sm text-muted-foreground">{definition.antonyms.join(", ")}</p></div> : null}
                            </div>
                          ) : null}
                        </article>
                      ))}
                    </div>
                  </section>
                ))}

                {entry.origin && <section id="origin" className="mt-8 rounded-2xl border border-border bg-card/80 p-6 md:p-8"><div className="mb-5 flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-sm font-bold text-primary">+</span><h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">Word origin</h2></div><p className="max-w-4xl text-[15px] leading-8 text-muted-foreground">{entry.origin}</p></section>}

                {entry.sourceUrls?.length ? <section className="mt-8 rounded-2xl border border-border bg-card/80 p-6 md:p-8"><div className="flex items-center gap-2"><Sparkles className="size-4 text-primary" /><p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Source</p></div><p className="mt-3 text-sm leading-7 text-muted-foreground">Dictionary data is supplied by the Free Dictionary API. Source links are provided by the API entry when available.</p><div className="mt-4 space-y-2">{entry.sourceUrls.map((source) => <a key={source} href={source} target="_blank" rel="noreferrer" className="block truncate text-sm font-medium text-primary hover:underline">{source}</a>)}</div></section> : null}
              </main>

              <aside className="w-full shrink-0 space-y-4 xl:w-80">
                <section className="bio-panel">
                  <div className="border-b border-border px-4 py-3"><h2 className="flex items-center gap-2 text-sm font-semibold text-foreground"><BookOpenText className="size-4 text-primary" />Entry contents</h2></div>
                  <nav className="space-y-1 p-2 text-sm">
                    <a href="#overview" className="flex items-center justify-between rounded-md bg-primary/10 px-3 py-2 text-primary"><span>Overview</span></a>
                    {entry.meanings.map((meaning, index) => <a key={`${meaning.partOfSpeech}-rail-${index}`} href={`#meaning-${index}`} className="flex items-center justify-between rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground"><span className="capitalize">{meaning.partOfSpeech}</span><ChevronRight className="size-3.5" /></a>)}
                    {entry.origin && <a href="#origin" className="flex items-center justify-between rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground"><span>Origin</span><ChevronRight className="size-3.5" /></a>}
                  </nav>
                </section>

                <section className="bio-panel">
                  <div className="border-b border-border px-4 py-3"><h2 className="flex items-center gap-2 text-sm font-semibold text-foreground"><Sparkles className="size-4 text-primary" />Entry metadata</h2></div>
                  <div className="grid grid-cols-2 gap-3 p-4 text-sm">
                    <div className="rounded-lg border border-border bg-secondary/50 p-3"><p className="text-xs text-muted-foreground">Word</p><p className="mt-1 text-xs font-medium text-foreground">{entry.word}</p></div>
                    <div className="rounded-lg border border-border bg-secondary/50 p-3"><p className="text-xs text-muted-foreground">Meanings</p><p className="mt-1 text-xs font-medium text-foreground">{entry.meanings.length}</p></div>
                    <div className="rounded-lg border border-border bg-secondary/50 p-3"><p className="text-xs text-muted-foreground">Pronunciation</p><p className="mt-1 text-xs font-medium text-foreground">{entry.phonetic ?? "Not supplied"}</p></div>
                    <div className="rounded-lg border border-border bg-secondary/50 p-3"><p className="text-xs text-muted-foreground">Source</p><p className="mt-1 text-xs font-medium text-foreground">Dictionary API</p></div>
                  </div>
                </section>
              </aside>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
