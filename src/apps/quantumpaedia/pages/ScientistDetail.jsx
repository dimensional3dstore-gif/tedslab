import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Award, BookMarked, Users, Sparkles } from 'lucide-react';
import { Panel, Chip, SectionHeading } from '@/components/common/Kit';
import QuantumVisual from '@/components/quantum/QuantumVisual';
import { scientistBySlug, scientists } from '@/data/scientists';
import { articles } from '@/data/articles';
import { library } from '@/lib/library';

export default function ScientistDetail() {
  const { slug } = useParams();
  const scientist = scientistBySlug(slug);

  useEffect(() => {
    if (scientist) {
      library.recordView({ id: `scientist:${scientist.slug}`, title: scientist.name, type: 'Scientist', to: `/scientists/${scientist.slug}` });
    }
  }, [scientist]);

  useEffect(() => {
    if (!scientist) {
      const meta = document.createElement('meta');
      meta.name = 'prerender-status-code';
      meta.content = '404';
      document.head.appendChild(meta);
      return () => meta.remove();
    }
  }, [scientist]);

  if (!scientist) {
    return (
      <Panel className="p-10 text-center">
        <p className="text-[13px] text-[#a8bcd3]">That profile is not in the directory.</p>
        <Link to="/scientists" className="mt-3 inline-block text-[11px] text-[var(--qp-accent)] hover:underline">Back to the directory</Link>
      </Panel>
    );
  }

  const related = scientist.related.map(scientistBySlug).filter(Boolean);
  const relevantArticles = articles.filter((a) =>
    scientist.contributions.some((c) => a.abstract.toLowerCase().includes(c.split(' ')[0].toLowerCase()))
  ).slice(0, 3);

  return (
    <div className="space-y-4">
      <Link to="/scientists" className="inline-flex items-center gap-1.5 text-[11px] text-[#8fa8c2] hover:text-[var(--qp-accent)]">
        <ArrowLeft className="h-3 w-3" /> Scientist directory
      </Link>

      <header className="qp-panel relative overflow-hidden px-5 py-6">
        <div className="pointer-events-none absolute inset-0 qp-grid-bg opacity-50" />
        <div className="relative flex flex-wrap items-start gap-5">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--qp-accent)]/35 bg-[linear-gradient(140deg,rgba(154,101,255,0.25),rgba(35,200,255,0.12))] text-[20px] font-medium text-[#e6dcff]">
            {scientist.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="qp-label">{scientist.period} · {scientist.nationality}</p>
            <h1 className="mt-1.5 text-[26px] font-semibold tracking-tight text-[#f0f6ff] sm:text-[30px]">{scientist.name}</h1>
            <p className="mono mt-1 text-[11px] text-[#8fa8c2]">{scientist.years} · {scientist.field}</p>
            <p className="mt-2 max-w-2xl text-[12.5px] leading-relaxed text-[#a8bcd3]">{scientist.summary}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {scientist.awards.map((a) => (
                <Chip key={a} as="span" className="border-[var(--qp-accent)]/30 text-[#d9c8ff]"><Award className="h-2.5 w-2.5" /> {a}</Chip>
              ))}
            </div>
          </div>
          <div className="hidden h-24 w-36 overflow-hidden rounded-xl border border-[var(--qp-accent)]/20 lg:block">
            <QuantumVisual variant="orbital" className="h-full w-full" animate={false} />
          </div>
        </div>
      </header>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-4">
          <Panel className="p-4 sm:p-5">
            <h2 className="text-[15px] font-semibold text-[#f0f6ff]">Biography</h2>
            {scientist.biography.map((p, i) => (
              <p key={i} className="mt-2.5 text-[12.5px] leading-[1.8] text-[#b6c8dc]">{p}</p>
            ))}
          </Panel>

          <Panel className="p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
              <h2 className="text-[15px] font-semibold text-[#f0f6ff]">Major contributions</h2>
            </div>
            <ul className="mt-2.5 space-y-1.5">
              {scientist.contributions.map((c) => (
                <li key={c} className="flex gap-2 text-[11.5px] leading-relaxed text-[#b6c8dc]">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--qp-accent)]" />
                  {c}
                </li>
              ))}
            </ul>
            {scientist.theories.length > 0 && (
              <>
                <div className="qp-hairline my-3" />
                <p className="qp-label mb-1.5">Associated theories</p>
                <div className="flex flex-wrap gap-1.5">
                  {scientist.theories.map((t) => (
                    <Chip key={t} as="span" className="text-[9.5px]">{t}</Chip>
                  ))}
                </div>
              </>
            )}
          </Panel>

          <Panel className="p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <BookMarked className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
              <h2 className="text-[15px] font-semibold text-[#f0f6ff]">Important publications</h2>
            </div>
            <ol className="mt-2.5 space-y-2">
              {scientist.publications.map((pub) => (
                <li key={pub.title} className="rounded-lg border border-[var(--qp-accent)]/10 bg-[#071729]/60 p-2.5">
                  <p className="text-[11.5px] leading-relaxed text-[#dbe9f7]">{pub.title}</p>
                  <p className="mono mt-0.5 text-[9.5px] text-[#7088a5]">{pub.journal} · {pub.year}</p>
                </li>
              ))}
            </ol>
          </Panel>

          {relevantArticles.length > 0 && (
            <div>
              <SectionHeading eyebrow="Related reading" title="Articles connected to this work" />
              <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
                {relevantArticles.map((a) => (
                  <Link key={a.slug} to={`/articles/${a.slug}`} className="qp-panel-soft qp-hover p-2.5">
                    <p className="qp-label">{a.category}</p>
                    <p className="mt-1 text-[11.5px] font-medium text-[#eaf4ff]">{a.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-3.5 xl:sticky xl:top-[72px] xl:self-start">
          <Panel className="p-3.5">
            <p className="qp-label mb-2">Profile data</p>
            <dl className="space-y-2 text-[11px]">
              {[
                ['Born', scientist.years.split('–')[0]],
                ['Field', scientist.field],
                ['Period', scientist.period],
                ['Nationality', scientist.nationality],
                ['Awards', scientist.awards.length]
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-3">
                  <dt className="text-[#8fa8c2]">{label}</dt>
                  <dd className="mono text-right text-[#d6e9f8]">{value}</dd>
                </div>
              ))}
            </dl>
          </Panel>

          <Panel className="p-3.5">
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
              <p className="qp-label">Related scientists</p>
            </div>
            <div className="mt-2 space-y-1.5">
              {related.map((s) => (
                <Link key={s.slug} to={`/scientists/${s.slug}`} className="flex items-center justify-between rounded-md px-2 py-1 text-[11.5px] text-[#c3d6e8] hover:bg-[#102b4b]/60 hover:text-[#f0f6ff]">
                  {s.name}
                  <span className="mono text-[9px] text-[#4f6b88]">{s.years.split('–')[0]}</span>
                </Link>
              ))}
            </div>
          </Panel>

          <Panel className="p-3.5">
            <p className="qp-label mb-2">Other profiles</p>
            <div className="flex flex-wrap gap-1.5">
              {scientists.filter((s) => s.slug !== scientist.slug).slice(0, 8).map((s) => (
                <Link key={s.slug} to={`/scientists/${s.slug}`} className="rounded-full border border-[var(--qp-accent)]/12 px-2 py-0.5 text-[10px] text-[#8fa8c2] hover:border-[var(--qp-accent)]/40 hover:text-[#f0f6ff]">
                  {s.name.split(' ').slice(-1)[0]}
                </Link>
              ))}
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}