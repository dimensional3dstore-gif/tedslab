import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight, Layers } from 'lucide-react';
import QuantumVisual from '@/components/quantum/QuantumVisual';
import { PageHeader, Chip, Panel } from '@/components/common/Kit';
import { disciplines } from '@/data/disciplines';
import { articles } from '@/data/articles';

export default function Disciplines() {
  const [query, setQuery] = useState('');
  const [field, setField] = useState('All');

  const fields = ['All', 'Foundational', 'Applied', 'Frontier'];
  const classify = (slug) =>
    ['quantum-physics', 'quantum-mechanics', 'quantum-mathematics', 'quantum-field-theory'].includes(slug)
      ? 'Foundational'
      : ['quantum-computing', 'quantum-chemistry', 'quantum-optics', 'quantum-information', 'quantum-materials'].includes(slug)
      ? 'Applied'
      : 'Frontier';

  const filtered = disciplines.filter((d) => {
    const matchesQuery =
      !query.trim() ||
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.summary.toLowerCase().includes(query.toLowerCase());
    const matchesField = field === 'All' || classify(d.slug) === field;
    return matchesQuery && matchesField;
  });

  return (
    <div className="space-y-5">
      <PageHeader
        kicker="Knowledge · disciplines"
        title="Quantum Disciplines"
        description="Twelve scientific fields at the frontier of quantum research. Each landing page collects the field’s introduction, research areas, foundational theories, mathematical apparatus, experiments, applications and leading researchers."
        meta={
          <>
            <Chip as="span">{disciplines.length} disciplines</Chip>
            <Chip as="span">{articles.length} cross-linked articles</Chip>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-[var(--qp-accent)]/15 bg-[#091b32]/70 px-3 py-2 sm:max-w-sm">
          <Search className="h-3.5 w-3.5 text-[#7088a5]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter disciplines…"
            className="w-full bg-transparent text-[12px] text-[#f0f6ff] placeholder:text-[#5f7893] focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {fields.map((f) => (
            <Chip key={f} active={field === f} onClick={() => setField(f)}>
              {f}
            </Chip>
          ))}
        </div>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((d) => (
          <Link key={d.slug} to={`/knowledge/${d.slug}`} className="qp-panel qp-hover group overflow-hidden">
            <div className="relative h-32">
              <QuantumVisual variant={d.visual} className="h-full w-full opacity-90 transition-transform duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a2e] via-transparent to-transparent" />
              <span className="absolute left-2.5 top-2.5 rounded-full border border-[var(--qp-accent)]/25 bg-[#061225]/70 px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-[#9fd8ff] backdrop-blur">
                {classify(d.slug)}
              </span>
            </div>
            <div className="p-3.5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[14px] font-semibold leading-snug text-[#f0f6ff] group-hover:text-[#bfe6ff]">{d.name}</h3>
                <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#4f6b88] transition-colors group-hover:text-[var(--qp-accent)]" />
              </div>
              <p className="mt-0.5 text-[10.5px] uppercase tracking-[0.12em] text-[#6f88a3]">{d.tagline}</p>
              <p className="mt-2 line-clamp-3 text-[11.5px] leading-relaxed text-[#8fa8c2]">{d.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {d.researchAreas.slice(0, 2).map((r) => (
                  <span key={r.title} className="rounded-full border border-[var(--qp-accent)]/12 px-2 py-0.5 text-[9.5px] text-[#7f9bb7]">
                    {r.title}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <Panel className="p-8 text-center">
          <Layers className="mx-auto h-5 w-5 text-[var(--qp-accent)]/50" />
          <p className="mt-2 text-[12px] text-[#a8bcd3]">No discipline matches that filter.</p>
        </Panel>
      )}
    </div>
  );
}