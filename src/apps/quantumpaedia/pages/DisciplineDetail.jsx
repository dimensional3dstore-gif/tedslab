import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Users, FlaskConical, BookOpen, Sigma, ArrowUpRight } from 'lucide-react';
import QuantumVisual from '@/components/quantum/QuantumVisual';
import ArticleCard from '@/components/common/ArticleCard';
import { Panel, SectionHeading, Chip } from '@/components/common/Kit';
import { disciplineBySlug, disciplines } from '@/data/disciplines';
import { articleBySlug, articles } from '@/data/articles';
import { scientists } from '@/data/scientists';
import { library } from '@/lib/library';

const Blocks = ({ title, items, icon: Icon }) => (
  <div>
    <div className="mb-2.5 flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
      <h3 className="qp-label">{title}</h3>
    </div>
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="qp-panel-soft p-3">
          <p className="text-[12px] font-medium text-[#eaf4ff]">{item.title}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-[#8fa8c2]">{item.text}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function DisciplineDetail() {
  const { slug } = useParams();
  const discipline = disciplineBySlug(slug);

  useEffect(() => {
    if (discipline) {
      library.recordView({
        id: `discipline:${discipline.slug}`,
        title: discipline.name,
        type: 'Discipline',
        to: `/knowledge/${discipline.slug}`
      });
    }
  }, [discipline]);

  useEffect(() => {
    if (!discipline) {
      const meta = document.createElement('meta');
      meta.name = 'prerender-status-code';
      meta.content = '404';
      document.head.appendChild(meta);
      return () => meta.remove();
    }
  }, [discipline]);

  const [tab, setTab] = useState('overview');

  if (!discipline) {
    return (
      <Panel className="p-10 text-center">
        <p className="text-[13px] text-[#a8bcd3]">That discipline is not in the index.</p>
        <Link to="/knowledge" className="mt-3 inline-block text-[11px] text-[var(--qp-accent)] hover:underline">
          Return to the discipline index
        </Link>
      </Panel>
    );
  }

  const relatedArticles = articles.filter((a) => a.categorySlug === discipline.slug);
  const recommended = discipline.recommended.map(articleBySlug).filter(Boolean);
  const people = scientists.filter((s) => discipline.researchers.some((r) => r === s.name));
  const relatedDisciplines = discipline.related.map(disciplineBySlug).filter(Boolean);

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'research', label: 'Research areas' },
    { key: 'theory', label: 'Theory' },
    { key: 'mathematics', label: 'Mathematics' },
    { key: 'experiments', label: 'Experiments' },
    { key: 'applications', label: 'Applications' }
  ];

  return (
    <div className="space-y-5">
      <Link to="/knowledge" className="inline-flex items-center gap-1.5 text-[11px] text-[#8fa8c2] hover:text-[var(--qp-accent)]">
        <ArrowLeft className="h-3 w-3" /> All disciplines
      </Link>

      <section className="qp-fade-up relative overflow-hidden rounded-2xl border border-[var(--qp-accent)]/15">
        <div className="absolute inset-0">
          <QuantumVisual variant={discipline.visual} className="h-full w-full" animate={false} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061225] via-[#061225]/92 to-[#061225]/55" />
        </div>
        <div className="relative px-5 py-7 sm:px-8 sm:py-9">
          <p className="qp-label">{discipline.tagline}</p>
          <h1 className="mt-2 text-[26px] font-semibold tracking-tight text-[#f0f6ff] sm:text-[34px]">{discipline.name}</h1>
          <p className="mt-2 max-w-2xl text-[12.5px] leading-relaxed text-[#a8bcd3]">{discipline.summary}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <Chip as="span">{discipline.researchAreas.length} research areas</Chip>
            <Chip as="span">{discipline.theories.length} core theories</Chip>
            <Chip as="span">{discipline.experiments.length} experiments</Chip>
            <Chip as="span">{relatedArticles.length} articles</Chip>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-1.5">
        {tabs.map((t) => (
          <Chip key={t.key} active={tab === t.key} onClick={() => setTab(t.key)}>
            {t.label}
          </Chip>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-6">
          {tab === 'overview' && (
            <>
              <Panel className="p-5">
                <h2 className="text-[16px] font-semibold text-[#f0f6ff]">Scientific introduction</h2>
                {discipline.overview.map((p, i) => (
                  <p key={i} className="mt-2.5 text-[12.5px] leading-[1.75] text-[#b6c8dc]">{p}</p>
                ))}
              </Panel>
              <Blocks title="Major research areas" items={discipline.researchAreas} icon={BookOpen} />
              <div>
                <SectionHeading eyebrow="Recommended" title="Articles from this field" />
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {(relatedArticles.length ? relatedArticles : recommended).map((a) => (
                    <ArticleCard key={a.slug} article={a} compact />
                  ))}
                </div>
              </div>
            </>
          )}

          {tab === 'research' && <Blocks title="Research areas" items={discipline.researchAreas} icon={BookOpen} />}
          {tab === 'theory' && <Blocks title="Fundamental theories" items={discipline.theories} icon={FlaskConical} />}
          {tab === 'mathematics' && <Blocks title="Mathematical concepts" items={discipline.mathematics} icon={Sigma} />}
          {tab === 'experiments' && <Blocks title="Major experiments" items={discipline.experiments} icon={FlaskConical} />}
          {tab === 'applications' && <Blocks title="Applications" items={discipline.applications} icon={ArrowUpRight} />}

          <div>
            <SectionHeading eyebrow="Leading researchers" title="Who works in this field" />
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {people.map((s) => (
                <Link key={s.slug} to={`/scientists/${s.slug}`} className="qp-panel-soft qp-hover flex items-center gap-2.5 p-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--qp-accent)]/25 bg-[var(--qp-accent)]/8 text-[11px] text-[#bfe6ff]">
                    {s.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[11.5px] text-[#eaf4ff]">{s.name}</span>
                    <span className="mono block text-[9px] text-[#7088a5]">{s.years}</span>
                  </span>
                </Link>
              ))}
              {people.length === 0 && (
                <p className="text-[11.5px] text-[#7088a5]">No scientist profiles are indexed for this field yet.</p>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-3.5 xl:sticky xl:top-[72px] xl:self-start">
          <Panel className="p-3.5">
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
              <p className="qp-label">At a glance</p>
            </div>
            <dl className="mt-2.5 space-y-2 text-[11px]">
              {[
                ['Research areas', discipline.researchAreas.length],
                ['Core theories', discipline.theories.length],
                ['Mathematical tools', discipline.mathematics.length],
                ['Experiments', discipline.experiments.length],
                ['Applications', discipline.applications.length]
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between">
                  <dt className="text-[#8fa8c2]">{label}</dt>
                  <dd className="mono text-[#d6e9f8]">{value}</dd>
                </div>
              ))}
            </dl>
          </Panel>

          <Panel className="p-3.5">
            <p className="qp-label">Related disciplines</p>
            <div className="mt-2 space-y-1.5">
              {relatedDisciplines.map((d) => (
                <Link key={d.slug} to={`/knowledge/${d.slug}`} className="flex items-center justify-between rounded-md px-2 py-1.5 text-[11.5px] text-[#c3d6e8] transition-colors hover:bg-[#102b4b]/60 hover:text-[#f0f6ff]">
                  {d.name}
                  <ArrowUpRight className="h-3 w-3 text-[#4f6b88]" />
                </Link>
              ))}
            </div>
          </Panel>

          <Panel className="p-3.5">
            <p className="qp-label">Other disciplines</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {disciplines.filter((d) => d.slug !== discipline.slug).slice(0, 8).map((d) => (
                <Link key={d.slug} to={`/knowledge/${d.slug}`} className="rounded-full border border-[var(--qp-accent)]/12 px-2 py-0.5 text-[10px] text-[#8fa8c2] hover:border-[var(--qp-accent)]/40 hover:text-[#f0f6ff]">
                  {d.name.replace('Quantum ', '')}
                </Link>
              ))}
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}