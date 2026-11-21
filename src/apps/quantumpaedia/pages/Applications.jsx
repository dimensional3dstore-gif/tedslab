import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, FlaskConical, Rocket, CircleDashed, X } from 'lucide-react';
import QuantumVisual from '@/components/quantum/QuantumVisual';
import { PageHeader, Panel, Chip } from '@/components/common/Kit';
import { applications } from '@/data/applications';

const MATURITY_STYLE = {
  'Commercially deployed': { color: 'text-[#4ade80]', border: 'border-[#4ade80]/30', bg: 'bg-[#4ade80]/8', icon: CheckCircle2 },
  Experimental: { color: 'text-[var(--qp-accent)]', border: 'border-[var(--qp-accent)]/30', bg: 'bg-[var(--qp-accent)]/8', icon: FlaskConical },
  Theoretical: { color: 'text-[#ffb15c]', border: 'border-[#ffb15c]/30', bg: 'bg-[#ffb15c]/8', icon: CircleDashed }
};

export default function Applications() {
  const [params, setParams] = useSearchParams();
  const [filter, setFilter] = useState('All');
  const openSlug = params.get('open');
  const open = applications.find((a) => a.slug === openSlug);

  const categories = useMemo(() => ['All', ...Array.from(new Set(applications.map((a) => a.category)))], []);
  const list = filter === 'All' ? applications : applications.filter((a) => a.category === filter);

  return (
    <div className="space-y-4">
      <PageHeader
        kicker="Applications"
        title="Applications of Quantum Science"
        description="Where quantum mechanics is already engineering, where it is experimental, and where it remains theoretical. Maturity labels separate commercially available technology from research and speculation."
        meta={<><Chip as="span">{applications.length} domains</Chip><Chip as="span">maturity labelled</Chip></>}
      />

      {open && (
        <Panel className="relative overflow-hidden p-0">
          <button
            type="button"
            onClick={() => setParams({})}
            className="absolute right-3 top-3 z-10 rounded-md border border-[var(--qp-accent)]/20 p-1 text-[#a8bcd3] hover:border-[var(--qp-accent)]/50 hover:text-white"
            aria-label="Close detail"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <div className="grid gap-0 md:grid-cols-[260px_minmax(0,1fr)]">
            <div className="relative min-h-[160px]">
              <QuantumVisual variant={open.visual} className="h-full w-full" animate={false} />
              <div className="absolute inset-0 bg-gradient-to-r from-[#061225]/40 to-[#061225]" />
            </div>
            <div className="p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="qp-label">{open.category}</p>
                {(() => {
                  const s = MATURITY_STYLE[open.maturity];
                  const Icon = s.icon;
                  return (
                    <span className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9.5px] ${s.border} ${s.bg} ${s.color}`}>
                      <Icon className="h-2.5 w-2.5" /> {open.maturity}
                    </span>
                  );
                })()}
              </div>
              <h2 className="mt-1.5 text-[20px] font-semibold text-[#f0f6ff]">{open.title}</h2>
              <p className="mt-1.5 text-[12px] leading-relaxed text-[#a8bcd3]">{open.summary}</p>

              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                <div className="qp-panel-soft p-2.5">
                  <p className="qp-label mb-1">Scientific principle</p>
                  <p className="text-[11px] leading-relaxed text-[#b6c8dc]">{open.principle}</p>
                </div>
                <div className="qp-panel-soft p-2.5">
                  <p className="qp-label mb-1">How it works</p>
                  <p className="text-[11px] leading-relaxed text-[#b6c8dc]">{open.howItWorks}</p>
                </div>
              </div>

              <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
                <div>
                  <p className="qp-label mb-1">Current capabilities</p>
                  <ul className="space-y-1">
                    {open.capabilities.map((c) => (
                      <li key={c} className="flex gap-1.5 text-[10.5px] leading-relaxed text-[#8fa8c2]">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#4ade80]" /> {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="qp-label mb-1">Limitations</p>
                  <ul className="space-y-1">
                    {open.limitations.map((c) => (
                      <li key={c} className="flex gap-1.5 text-[10.5px] leading-relaxed text-[#8fa8c2]">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#ffb15c]" /> {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="qp-label mb-1">Outlook</p>
                  <p className="text-[10.5px] leading-relaxed text-[#8fa8c2]">{open.outlook}</p>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      )}

      <div className="flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <Chip key={c} active={filter === c} onClick={() => setFilter(c)}>{c}</Chip>
        ))}
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((a) => {
          const style = MATURITY_STYLE[a.maturity];
          const Icon = style.icon;
          return (
            <button
              key={a.slug}
              type="button"
              onClick={() => setParams({ open: a.slug })}
              className="qp-panel qp-hover group overflow-hidden text-left"
            >
              <div className="relative h-28">
                <QuantumVisual variant={a.visual} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a2e] via-transparent to-transparent" />
                <span className={`absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] ${style.border} ${style.bg} ${style.color} backdrop-blur`}>
                  <Icon className="h-2.5 w-2.5" /> {a.maturity}
                </span>
              </div>
              <div className="p-3.5">
                <p className="qp-label">{a.category}</p>
                <h3 className="mt-1 text-[13px] font-semibold text-[#f0f6ff] group-hover:text-[#bfe6ff]">{a.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-[#8fa8c2]">{a.summary}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-[9.5px] uppercase tracking-[0.14em] text-[var(--qp-accent)]">
                  <Rocket className="h-2.5 w-2.5" /> read analysis
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}