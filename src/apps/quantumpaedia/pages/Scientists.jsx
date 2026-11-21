import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight, Award } from 'lucide-react';
import { PageHeader, Panel, Chip, EmptyState } from '@/components/common/Kit';
import { scientists } from '@/data/scientists';

export default function Scientists() {
  const [query, setQuery] = useState('');
  const [field, setField] = useState('All');
  const [period, setPeriod] = useState('All');

  const fields = useMemo(() => ['All', ...Array.from(new Set(scientists.map((s) => s.field)))], []);
  const periods = useMemo(() => ['All', ...Array.from(new Set(scientists.map((s) => s.period)))], []);

  const filtered = scientists.filter((s) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || s.name.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q) || s.contributions.join(' ').toLowerCase().includes(q);
    return matchesQuery && (field === 'All' || s.field === field) && (period === 'All' || s.period === period);
  });

  return (
    <div className="space-y-4">
      <PageHeader
        kicker="Scientific directory"
        title="Quantum Scientists"
        description="The physicists and mathematicians whose work built quantum theory. Profiles include biographies, contributions, publications and awards, with links to related researchers."
        meta={<Chip as="span">{scientists.length} profiles</Chip>}
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-[var(--qp-accent)]/15 bg-[#091b32]/70 px-3 py-2 sm:max-w-sm">
          <Search className="h-3.5 w-3.5 text-[#7088a5]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search names or contributions…"
            className="w-full bg-transparent text-[12px] text-[#f0f6ff] placeholder:text-[#5f7893] focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {fields.slice(0, 4).map((f) => (
            <Chip key={f} active={field === f} onClick={() => setField(f)}>{f}</Chip>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {periods.map((p) => (
            <Chip key={p} active={period === p} onClick={() => setPeriod(p)}>{p}</Chip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Search} title="No profiles match" description="Try a different field or historical period." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((s) => (
            <Link key={s.slug} to={`/scientists/${s.slug}`} className="qp-panel qp-hover group p-3.5">
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--qp-accent)]/30 bg-[linear-gradient(140deg,rgba(154,101,255,0.22),rgba(35,200,255,0.1))] text-[13px] font-medium text-[#e2d5ff]">
                  {s.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#4f6b88] transition-colors group-hover:text-[var(--qp-accent)]" />
              </div>
              <h3 className="mt-2.5 text-[13px] font-semibold text-[#f0f6ff] group-hover:text-[#bfe6ff]">{s.name}</h3>
              <p className="mono mt-0.5 text-[9.5px] text-[#7088a5]">{s.years} · {s.nationality}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#6f88a3]">{s.field}</p>
              <p className="mt-2 line-clamp-3 text-[11px] leading-relaxed text-[#8fa8c2]">{s.summary}</p>
              {s.awards.length > 0 && (
                <p className="mt-2 flex items-center gap-1 text-[9.5px] text-[#c9b2ff]">
                  <Award className="h-2.5 w-2.5" /> {s.awards[0]}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}

      <Panel className="p-3.5">
        <p className="qp-label mb-1.5">On portraits</p>
        <p className="text-[10.5px] leading-relaxed text-[#7088a5]">
          This directory uses monogram identifiers rather than photographs. Historical portraits have differing rights
          status and licensing terms, so no image is shown unless its licence is documented.
        </p>
      </Panel>
    </div>
  );
}