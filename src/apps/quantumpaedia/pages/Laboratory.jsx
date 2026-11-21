import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, Clock, ArrowUpRight, History, BookMarked } from 'lucide-react';
import QuantumVisual from '@/components/quantum/QuantumVisual';
import { PageHeader, Panel, SectionHeading, Chip, EmptyState } from '@/components/common/Kit';
import { simulations, simulationCategories } from '@/data/simulations';
import { useLibrary } from '@/lib/library';

export default function Laboratory() {
  const [category, setCategory] = useState('All');
  const { history } = useLibrary();

  const filtered = category === 'All' ? simulations : simulations.filter((s) => s.category === category);
  const labHistory = history.filter((h) => h.type === 'Simulation').slice(0, 4);

  return (
    <div className="space-y-5">
      <PageHeader
        kicker="Quantum laboratory"
        title="Simulation Centre"
        description="Seven interactive modules that compute real quantum mathematics in your browser: statevectors, amplitudes, transmission coefficients and interference integrals. No quantum hardware is involved."
        meta={
          <>
            <Chip as="span">{simulations.length} modules</Chip>
            <Chip as="span">real-time computation</Chip>
          </>
        }
      />

      <div className="flex flex-wrap gap-1.5">
        {['All', ...simulationCategories].map((c) => (
          <Chip key={c} active={category === c} onClick={() => setCategory(c)}>{c}</Chip>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_290px]">
        <div className="grid gap-3.5 sm:grid-cols-2">
          {filtered.map((s) => (
            <Link key={s.slug} to={s.to} className="qp-panel qp-hover group overflow-hidden">
              <div className="relative h-36">
                <QuantumVisual variant={s.visual} className="h-full w-full opacity-90 transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a2e] via-transparent to-transparent" />
                <span className="absolute left-2.5 top-2.5 rounded-full border border-[var(--qp-accent)]/25 bg-[#061225]/70 px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-[#9fd8ff] backdrop-blur">
                  {s.category}
                </span>
                <div className="absolute right-2.5 top-2 flex items-center gap-1 rounded-full border border-[var(--qp-accent)]/20 bg-[#061225]/70 px-2 py-0.5 text-[9px] text-[#a8bcd3] backdrop-blur">
                  <Clock className="h-2.5 w-2.5" /> {s.minutes} min
                </div>
              </div>
              <div className="p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[13.5px] font-semibold text-[#f0f6ff] group-hover:text-[#bfe6ff]">{s.title}</h3>
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#4f6b88] group-hover:text-[var(--qp-accent)]" />
                </div>
                <p className="mt-0.5 text-[10.5px] uppercase tracking-[0.12em] text-[#6f88a3]">{s.subtitle}</p>
                <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-[#8fa8c2]">{s.description}</p>
                <p className="mono mt-2.5 text-[9px] text-[#5f7893]">{s.difficulty}</p>
              </div>
            </Link>
          ))}
        </div>

        <aside className="space-y-3.5">
          <Panel className="p-3.5">
            <div className="flex items-center gap-2">
              <History className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
              <p className="qp-label">Recently opened</p>
            </div>
            {labHistory.length === 0 ? (
              <p className="mt-2 text-[11px] leading-relaxed text-[#7088a5]">
                Simulations you open are listed here. Each module keeps its parameters while the page is open.
              </p>
            ) : (
              <div className="mt-2 space-y-1">
                {labHistory.map((h) => (
                  <Link key={h.id + h.at} to={h.to} className="block truncate text-[11.5px] text-[#c3d6e8] hover:text-[var(--qp-accent)]">
                    {h.title}
                  </Link>
                ))}
              </div>
            )}
          </Panel>

          <Panel className="p-3.5">
            <div className="flex items-center gap-2">
              <BookMarked className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
              <p className="qp-label">Recommended sequence</p>
            </div>
            <ol className="mt-2 space-y-1.5">
              {['Superposition', 'Bloch Sphere', 'Entanglement', 'Double-Slit', 'Quantum Tunnelling', 'Wavefunction', 'Circuit Builder'].map((t, i) => {
                const sim = simulations.find((s) => s.title.startsWith(t));
                return (
                  <li key={t}>
                    <Link to={sim?.to || '/laboratory'} className="flex items-start gap-2 text-[11px] text-[#a8bcd3] hover:text-[#f0f6ff]">
                      <span className="mono text-[9px] text-[#4f6b88]">{String(i + 1).padStart(2, '0')}</span>
                      {t}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </Panel>

          <Panel className="p-3.5">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
              <p className="qp-label">Model honesty</p>
            </div>
            <p className="mt-1.5 text-[10.5px] leading-relaxed text-[#8fa8c2]">
              Every module evaluates the exact mathematics of the model it displays — analytic transmission
              coefficients, closed-form wavepacket evolution, exact statevector update rules. Results illustrate the
              mathematics, not measurements from a physical quantum device.
            </p>
          </Panel>
        </aside>
      </div>
    </div>
  );
}