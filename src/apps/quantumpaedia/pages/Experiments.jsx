import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight, FlaskConical } from 'lucide-react';
import QuantumVisual from '@/components/quantum/QuantumVisual';
import { PageHeader, Panel, Chip, EmptyState } from '@/components/common/Kit';
import { experiments } from '@/data/experiments';

export default function Experiments() {
  const [query, setQuery] = useState('');
  const [field, setField] = useState('All');
  const fields = ['All', ...Array.from(new Set(experiments.map((e) => e.field)))];

  const filtered = experiments.filter((e) => {
    const q = query.trim().toLowerCase();
    const matches = !q || e.title.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q) || e.people.join(' ').toLowerCase().includes(q);
    return matches && (field === 'All' || e.field === field);
  });

  return (
    <div className="space-y-4">
      <PageHeader
        kicker="Experimental library"
        title="Quantum Experiments"
        description="Ten foundational experiments with apparatus, procedure, observations and interpretation. Each entry distinguishes measured results from theoretical reading."
        meta={<Chip as="span">{experiments.length} experiments</Chip>}
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-[var(--qp-accent)]/15 bg-[#091b32]/70 px-3 py-2 sm:max-w-sm">
          <Search className="h-3.5 w-3.5 text-[#7088a5]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search experiments or researchers…"
            className="w-full bg-transparent text-[12px] text-[#f0f6ff] placeholder:text-[#5f7893] focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {fields.map((f) => (
            <Chip key={f} active={field === f} onClick={() => setField(f)}>{f}</Chip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={FlaskConical} title="No experiments match" description="Try a broader field or different keyword." />
      ) : (
        <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((e) => (
            <Link key={e.slug} to={`/experiments/${e.slug}`} className="qp-panel qp-hover group overflow-hidden">
              <div className="relative h-32">
                <QuantumVisual variant={e.visual} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a2e] via-transparent to-transparent" />
                <span className="absolute left-2.5 top-2.5 rounded-full border border-[var(--qp-accent)]/25 bg-[#061225]/70 px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-[#9fd8ff] backdrop-blur">
                  {e.field}
                </span>
              </div>
              <div className="p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[13.5px] font-semibold text-[#f0f6ff] group-hover:text-[#bfe6ff]">{e.title}</h3>
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#4f6b88] group-hover:text-[var(--qp-accent)]" />
                </div>
                <p className="mono mt-0.5 text-[9.5px] text-[#7088a5]">{e.year}</p>
                <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-[#8fa8c2]">{e.summary}</p>
                <p className="mt-2 truncate text-[9.5px] text-[#5f7893]">{e.people.join(' · ')}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Panel className="p-3.5">
        <p className="text-[10.5px] leading-relaxed text-[#7088a5]">
          Where an experiment has a full encyclopaedia entry, the detail page links directly to it. Experimental data are
          quoted from the published literature; illustrations are schematic reconstructions of the apparatus.
        </p>
      </Panel>
    </div>
  );
}