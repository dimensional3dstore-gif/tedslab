import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Clock, ArrowUpRight } from 'lucide-react';
import { PageHeader, Panel, Chip } from '@/components/common/Kit';
import { timeline, eras } from '@/data/timeline';
import { scientistBySlug } from '@/data/scientists';

export default function Timeline() {
  const [params] = useSearchParams();
  const [era, setEra] = useState('All');
  const highlight = Number(params.get('year'));

  const entries = useMemo(() => {
    const list = era === 'All' ? timeline : timeline.filter((t) => t.era === era);
    return [...list].sort((a, b) => a.year - b.year);
  }, [era]);

  return (
    <div className="space-y-4">
      <PageHeader
        kicker="History of quantum science"
        title="Discovery Timeline"
        description="From Planck’s radiation law to programmable quantum processors. Each milestone links to the encyclopaedia entry and the researchers responsible."
        meta={<><Chip as="span">{timeline.length} milestones</Chip><Chip as="span">1900 – 2022</Chip></>}
      />

      <div className="flex flex-wrap gap-1.5">
        <Chip active={era === 'All'} onClick={() => setEra('All')}>All eras</Chip>
        {eras.map((e) => (
          <Chip key={e} active={era === e} onClick={() => setEra(e)}>{e}</Chip>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div className="relative">
          <div className="absolute bottom-4 left-[54px] top-4 w-px bg-gradient-to-b from-[var(--qp-accent)]/50 via-[var(--qp-accent)]/30 to-transparent sm:left-[62px]" />
          <div className="space-y-2.5">
            {entries.map((t) => (
              <div key={`${t.year}-${t.title}`} className="relative flex gap-3 sm:gap-4">
                <div className="w-[42px] shrink-0 pt-3 text-right sm:w-[50px]">
                  <span className={`mono text-[11px] ${highlight === t.year ? 'text-[var(--qp-accent)]' : 'text-[#8fa8c2]'}`}>{t.year}</span>
                </div>
                <span className={`relative mt-4 h-2 w-2 shrink-0 rounded-full ${highlight === t.year ? 'bg-[var(--qp-accent)] qp-pulse-soft' : 'bg-[var(--qp-accent)]/70'}`}>
                  <span className="absolute inset-0 rounded-full bg-[var(--qp-accent)]/40 blur-[3px]" />
                </span>
                <Panel soft className={`flex-1 p-3.5 ${highlight === t.year ? 'border-[var(--qp-accent)]/40' : ''}`}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[12.5px] font-medium text-[#eaf4ff]">{t.title}</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-[#8fa8c2]">{t.text}</p>
                    </div>
                    {t.article && (
                      <Link to={`/articles/${t.article}`} className="inline-flex shrink-0 items-center gap-1 text-[10px] text-[var(--qp-accent)] hover:underline">
                        Article <ArrowUpRight className="h-2.5 w-2.5" />
                      </Link>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="qp-label mr-1">{t.era}</span>
                    {t.people.map((p) => {
                      const slug = p.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
                      const match = scientistBySlug(slug);
                      return match ? (
                        <Link key={p} to={`/scientists/${match.slug}`} className="rounded-full border border-[var(--qp-accent)]/12 px-2 py-0.5 text-[9.5px] text-[#8fa8c2] hover:border-[var(--qp-accent)]/40 hover:text-[#f0f6ff]">
                          {p}
                        </Link>
                      ) : (
                        <span key={p} className="rounded-full border border-[var(--qp-accent)]/10 px-2 py-0.5 text-[9.5px] text-[#6f88a3]">{p}</span>
                      );
                    })}
                  </div>
                </Panel>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-3.5 xl:sticky xl:top-[72px] xl:self-start">
          <Panel className="p-3.5">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
              <p className="qp-label">Era overview</p>
            </div>
            <div className="mt-2 space-y-1.5">
              {eras.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEra(e)}
                  className="flex w-full items-center justify-between rounded-md px-2 py-1 text-[11px] text-[#a8bcd3] hover:bg-[#102b4b]/60 hover:text-[#f0f6ff]"
                >
                  {e}
                  <span className="mono text-[9px] text-[#4f6b88]">{timeline.filter((t) => t.era === e).length}</span>
                </button>
              ))}
            </div>
          </Panel>

          <Panel className="p-3.5">
            <p className="qp-label mb-2">Chronology note</p>
            <p className="text-[10.5px] leading-relaxed text-[#8fa8c2]">
              Dates refer to the first publication or first reported observation. Attribution lists the researchers
              conventionally credited in the literature, which is not always the complete author list.
            </p>
          </Panel>
        </aside>
      </div>
    </div>
  );
}