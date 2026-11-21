import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ArrowUpRight, TrendingUp } from 'lucide-react';
import ArticleCard from '@/components/common/ArticleCard';
import { PageHeader, Chip, Panel, EmptyState } from '@/components/common/Kit';
import { articles } from '@/data/articles';
import { disciplines } from '@/data/disciplines';
import SaveButton from '@/components/common/SaveButton';

const TYPES = ['All', 'Theory', 'Concept', 'Particle', 'Experiment', 'Equation', 'Application'];
const LEVELS = ['All', 'Foundational', 'Intermediate', 'Advanced'];
const SORTS = [
  { key: 'relevance', label: 'Relevance' },
  { key: 'updated', label: 'Recently updated' },
  { key: 'az', label: 'Alphabetical' },
  { key: 'references', label: 'Most referenced' }
];

export default function Explore() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [type, setType] = useState(params.get('type') || 'All');
  const [discipline, setDiscipline] = useState('All');
  const [level, setLevel] = useState('All');
  const [sort, setSort] = useState('relevance');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = articles.filter((a) => {
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.abstract.toLowerCase().includes(q) ||
        a.tags.join(' ').toLowerCase().includes(q);
      const matchesType = type === 'All' || a.type === type;
      const matchesDiscipline = discipline === 'All' || a.category === discipline;
      const matchesLevel = level === 'All' || a.difficulty === level;
      return matchesQuery && matchesType && matchesDiscipline && matchesLevel;
    });

    if (sort === 'updated') list = [...list].sort((a, b) => b.updated.localeCompare(a.updated));
    if (sort === 'az') list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'references') list = [...list].sort((a, b) => b.references.length - a.references.length);
    return list;
  }, [query, type, discipline, level, sort]);

  const trending = useMemo(() => {
    const counts = {};
    articles.forEach((a) => a.tags.forEach((t) => { counts[t] = (counts[t] || 0) + 1; }));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, []);

  const recentlyUpdated = useMemo(() => [...articles].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 4), []);

  const reset = () => {
    setQuery('');
    setType('All');
    setDiscipline('All');
    setLevel('All');
    setParams({});
  };

  return (
    <div className="space-y-5">
      <PageHeader
        kicker="Discover · article explorer"
        title="Quantum Article Explorer"
        description="Filter the encyclopaedia by discipline, entry type, difficulty and recency. Every entry carries an abstract, a category and a reference list."
        meta={<Chip as="span">{articles.length} indexed entries</Chip>}
      />

      <div className="flex items-center gap-2 rounded-xl border border-[var(--qp-accent)]/15 bg-[#091b32]/70 px-3.5 py-2.5">
        <Search className="h-4 w-4 text-[#7088a5]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search titles, abstracts and tags…"
          className="w-full bg-transparent text-[13px] text-[#f0f6ff] placeholder:text-[#5f7893] focus:outline-none"
        />
        {query && (
          <button type="button" onClick={() => setQuery('')} className="rounded p-0.5 text-[#7088a5] hover:text-[#f0f6ff]" aria-label="Clear">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="grid gap-5 xl:grid-cols-[230px_minmax(0,1fr)_260px]">
        <aside className="space-y-3.5">
          <Panel className="p-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
                <p className="qp-label">Filters</p>
              </div>
              <button type="button" onClick={reset} className="text-[9.5px] uppercase tracking-[0.14em] text-[#7088a5] hover:text-[var(--qp-accent)]">
                Reset
              </button>
            </div>

            <p className="qp-label mt-3.5 mb-1.5">Entry type</p>
            <div className="flex flex-wrap gap-1.5">
              {TYPES.map((t) => (
                <Chip key={t} active={type === t} onClick={() => setType(t)}>{t}</Chip>
              ))}
            </div>

            <p className="qp-label mt-3.5 mb-1.5">Discipline</p>
            <select
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
              className="w-full rounded-md border border-[var(--qp-accent)]/15 bg-[#071729] px-2 py-1.5 text-[11px] text-[#d6e9f8] focus:outline-none"
            >
              <option value="All">All disciplines</option>
              {disciplines.map((d) => (
                <option key={d.slug} value={d.name}>{d.name}</option>
              ))}
            </select>

            <p className="qp-label mt-3.5 mb-1.5">Difficulty</p>
            <div className="flex flex-wrap gap-1.5">
              {LEVELS.map((l) => (
                <Chip key={l} active={level === l} onClick={() => setLevel(l)}>{l}</Chip>
              ))}
            </div>

            <p className="qp-label mt-3.5 mb-1.5">Sort</p>
            <div className="space-y-1">
              {SORTS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSort(s.key)}
                  className={`block w-full rounded-md px-2 py-1 text-left text-[11px] transition-colors ${
                    sort === s.key ? 'bg-[var(--qp-accent)]/10 text-[#d6f3ff]' : 'text-[#8fa8c2] hover:bg-[#102b4b]/50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </Panel>
        </aside>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] text-[#7088a5]">
              <span className="mono text-[#d6e9f8]">{results.length}</span> entries
              {type !== 'All' && <> · {type}</>}
              {discipline !== 'All' && <> · {discipline}</>}
            </p>
            <p className="mono text-[10px] text-[#4f6b88]">{SORTS.find((s) => s.key === sort)?.label}</p>
          </div>

          {results.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No entries match those filters"
              description="Try widening the discipline or difficulty selection, or clearing the search field."
              action={<button type="button" onClick={reset} className="rounded-md border border-[var(--qp-accent)]/30 px-3 py-1.5 text-[11px] text-[#d6f3ff] hover:border-[var(--qp-accent)]/60">Reset filters</button>}
            />
          ) : (
            <div className="grid gap-3.5 sm:grid-cols-2">
              {results.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-3.5 xl:sticky xl:top-[72px] xl:self-start">
          <Panel className="p-3.5">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
              <p className="qp-label">Trending topics</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {trending.map(([tag, count]) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className="rounded-full border border-[var(--qp-accent)]/12 px-2 py-0.5 text-[10px] text-[#8fa8c2] transition-colors hover:border-[var(--qp-accent)]/40 hover:text-[#f0f6ff]"
                >
                  {tag} <span className="mono text-[8.5px] text-[#4f6b88]">{count}</span>
                </button>
              ))}
            </div>
          </Panel>

          <Panel className="p-3.5">
            <p className="qp-label mb-2">Recently updated</p>
            <div className="space-y-2.5">
              {recentlyUpdated.map((a) => (
                <div key={a.slug} className="flex items-start justify-between gap-2">
                  <Link to={`/articles/${a.slug}`} className="min-w-0">
                    <p className="line-clamp-2 text-[11px] leading-snug text-[#dbe9f7] hover:text-[var(--qp-accent)]">{a.title}</p>
                    <p className="mono mt-0.5 text-[9px] text-[#5f7893]">{a.updated}</p>
                  </Link>
                  <SaveButton item={{ id: `article:${a.slug}`, type: 'Article', title: a.title, subtitle: a.subtitle, to: `/articles/${a.slug}` }} />
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-3.5">
            <p className="qp-label mb-2">Recommended for you</p>
            <div className="space-y-1.5">
              {articles.slice(3, 7).map((a) => (
                <Link key={a.slug} to={`/articles/${a.slug}`} className="group flex items-center justify-between gap-2 text-[11px] text-[#a8bcd3] hover:text-[#f0f6ff]">
                  <span className="truncate">{a.title}</span>
                  <ArrowUpRight className="h-3 w-3 shrink-0 text-[#4f6b88] group-hover:text-[var(--qp-accent)]" />
                </Link>
              ))}
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}