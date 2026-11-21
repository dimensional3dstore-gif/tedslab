import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, X, Clock, Sparkles, ArrowUpRight } from 'lucide-react';
import { PageHeader, Chip, Panel, EmptyState } from '@/components/common/Kit';
import { searchAll, SEARCH_TYPES } from '@/lib/search';
import { library, useLibrary } from '@/lib/library';

const SUGGESTED = ['entanglement', 'Schrödinger equation', 'Bell', 'tunnelling', 'qubit', 'photon', 'decoherence'];

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [submitted, setSubmitted] = useState(params.get('q') || '');
  const [type, setType] = useState('All');
  const { searches } = useLibrary();

  useEffect(() => {
    const q = params.get('q') || '';
    setQuery(q);
    setSubmitted(q);
  }, [params]);

  const results = useMemo(() => (submitted ? searchAll(submitted, type) : []), [submitted, type]);

  const grouped = useMemo(() => {
    const map = {};
    results.forEach((r) => {
      map[r.type] = map[r.type] || [];
      map[r.type].push(r);
    });
    return map;
  }, [results]);

  const run = (value) => {
    const clean = value.trim();
    setSubmitted(clean);
    setQuery(clean);
    if (clean) {
      library.addSearch(clean);
      setParams({ q: clean });
    } else {
      setParams({});
    }
  };

  return (
    <div className="space-y-5">
      <PageHeader
        kicker="Universal search"
        title="Search the knowledge system"
        description="One index across articles, disciplines, scientists, experiments, equations, publications, applications and discovery entries."
        meta={<Chip as="span">{results.length} results</Chip>}
      />

      <form
        onSubmit={(e) => { e.preventDefault(); run(query); }}
        className="rounded-xl border border-[var(--qp-accent)]/20 bg-[#091b32]/75 p-2.5"
      >
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg bg-[#071729] px-3 py-2">
            <SearchIcon className="h-4 w-4 text-[var(--qp-accent)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Exact phrases work too — try “Bell inequality”"
              className="w-full bg-transparent text-[13px] text-[#f0f6ff] placeholder:text-[#5f7893] focus:outline-none"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} className="rounded p-0.5 text-[#7088a5] hover:text-[#f0f6ff]" aria-label="Clear">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <button type="submit" className="rounded-lg bg-[var(--qp-accent)] px-4 py-2 text-[12px] font-medium text-[#04121f] transition-colors hover:bg-[#5ad8ff]">
            Search
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5 px-1">
          {['All', ...SEARCH_TYPES].map((t) => (
            <Chip key={t} active={type === t} onClick={() => setType(t)}>{t}</Chip>
          ))}
        </div>
      </form>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_270px]">
        <div className="space-y-4">
          {!submitted && (
            <Panel className="p-4">
              <p className="qp-label mb-2">Suggested queries</p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => run(s)}
                    className="rounded-full border border-[var(--qp-accent)]/15 px-2.5 py-1 text-[11px] text-[#a8bcd3] transition-colors hover:border-[var(--qp-accent)]/45 hover:text-[#f0f6ff]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Panel>
          )}

          {submitted && results.length === 0 && (
            <EmptyState
              icon={SearchIcon}
              title={`No records for “${submitted}”`}
              description="The index covers titles, abstracts, tags and reference metadata. Try a shorter term or a surname."
            />
          )}

          {Object.entries(grouped).map(([group, items]) => (
            <section key={group}>
              <div className="mb-2 flex items-center gap-2">
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8fb8d4]">{group}</h2>
                <span className="mono text-[10px] text-[#4f6b88]">{items.length}</span>
                <div className="qp-hairline flex-1" />
              </div>
              <div className="space-y-2">
                {items.map((r) => (
                  <Link key={r.id} to={r.to} className="qp-panel-soft qp-hover group block p-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[12.5px] font-medium text-[#eaf4ff] group-hover:text-[#bfe6ff]">{r.title}</p>
                        <p className="mt-0.5 text-[10.5px] text-[#7088a5]">{r.subtitle}</p>
                        <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-[#8fa8c2]">{r.body}</p>
                        {r.tags?.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {r.tags.slice(0, 4).map((t) => (
                              <span key={t} className="rounded border border-[var(--qp-accent)]/10 px-1.5 py-0.5 text-[9px] text-[#6f88a3]">{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#4f6b88] group-hover:text-[var(--qp-accent)]" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="space-y-3.5 xl:sticky xl:top-[72px] xl:self-start">
          <Panel className="p-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
                <p className="qp-label">Recent searches</p>
              </div>
              {searches.length > 0 && (
                <button type="button" onClick={() => library.clearSearches()} className="text-[9px] uppercase tracking-[0.14em] text-[#7088a5] hover:text-[var(--qp-accent)]">
                  Clear
                </button>
              )}
            </div>
            {searches.length === 0 ? (
              <p className="mt-2 text-[11px] text-[#7088a5]">Searches you run are listed here for quick recall.</p>
            ) : (
              <div className="mt-2 space-y-1">
                {searches.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => run(s)}
                    className="block w-full truncate rounded-md px-2 py-1 text-left text-[11px] text-[#a8bcd3] hover:bg-[#102b4b]/60 hover:text-[#f0f6ff]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </Panel>

          <Panel className="p-3.5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
              <p className="qp-label">Related-term suggestions</p>
            </div>
            <p className="mt-1.5 text-[10.5px] leading-relaxed text-[#8fa8c2]">
              Searching a concept also surfaces its experimental tests, mathematical tools and the scientists who
              developed it, because the index carries cross-references rather than isolated pages.
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {['Bell inequality', 'Density matrix', 'Hamiltonian', 'Decoherence', 'Bloch sphere'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => run(t)}
                  className="rounded-full border border-[var(--qp-accent)]/25 px-2 py-0.5 text-[10px] text-[#c9b2ff] hover:border-[var(--qp-accent)]/60"
                >
                  {t}
                </button>
              ))}
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}