import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Microscope, Beaker, Eye, Gauge, Lightbulb, AlertTriangle, BookOpen } from 'lucide-react';
import QuantumVisual from '@/components/quantum/QuantumVisual';
import SaveButton from '@/components/common/SaveButton';
import { Panel, Chip } from '@/components/common/Kit';
import { experimentBySlug, experiments } from '@/data/experiments';
import { articleBySlug } from '@/data/articles';
import { library } from '@/lib/library';

const BLOCKS = [
  { key: 'question', label: 'Scientific question', icon: HelpCircle },
  { key: 'background', label: 'Historical background', icon: BookOpen },
  { key: 'apparatus', label: 'Apparatus', icon: Beaker },
  { key: 'procedure', label: 'Experimental procedure', icon: Microscope },
  { key: 'observations', label: 'Observations', icon: Eye },
  { key: 'results', label: 'Results', icon: Gauge },
  { key: 'interpretation', label: 'Scientific interpretation', icon: Lightbulb },
  { key: 'significance', label: 'Modern significance', icon: Lightbulb },
  { key: 'limitations', label: 'Limitations', icon: AlertTriangle }
];

export default function ExperimentDetail() {
  const { slug } = useParams();
  const experiment = experimentBySlug(slug);

  useEffect(() => {
    if (experiment) {
      library.recordView({ id: `experiment:${experiment.slug}`, title: experiment.title, type: 'Experiment', to: `/experiments/${experiment.slug}` });
    }
  }, [experiment]);

  useEffect(() => {
    if (!experiment) {
      const meta = document.createElement('meta');
      meta.name = 'prerender-status-code';
      meta.content = '404';
      document.head.appendChild(meta);
      return () => meta.remove();
    }
  }, [experiment]);

  if (!experiment) {
    return (
      <Panel className="p-10 text-center">
        <p className="text-[13px] text-[#a8bcd3]">That experiment is not in the library.</p>
        <Link to="/experiments" className="mt-3 inline-block text-[11px] text-[var(--qp-accent)] hover:underline">Back to the library</Link>
      </Panel>
    );
  }

  const relatedArticles = experiment.relatedArticles.map(articleBySlug).filter(Boolean);
  const relatedExperiments = experiment.relatedExperiments.map(experimentBySlug).filter(Boolean);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link to="/experiments" className="inline-flex items-center gap-1.5 text-[11px] text-[#8fa8c2] hover:text-[var(--qp-accent)]">
          <ArrowLeft className="h-3 w-3" /> Experimental library
        </Link>
        <SaveButton
          item={{ id: `experiment:${experiment.slug}`, type: 'Experiment', title: experiment.title, subtitle: experiment.field, to: `/experiments/${experiment.slug}` }}
          label
        />
      </div>

      <header className="relative overflow-hidden rounded-2xl border border-[var(--qp-accent)]/15">
        <div className="absolute inset-0">
          <QuantumVisual variant={experiment.visual} className="h-full w-full" animate={false} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061225] via-[#061225]/92 to-[#061225]/50" />
        </div>
        <div className="relative px-5 py-6 sm:px-8 sm:py-8">
          <p className="qp-label">{experiment.field} · {experiment.year}</p>
          <h1 className="mt-2 text-[26px] font-semibold tracking-tight text-[#f0f6ff] sm:text-[32px]">{experiment.title}</h1>
          <p className="mt-2 max-w-2xl text-[12.5px] leading-relaxed text-[#a8bcd3]">{experiment.summary}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {experiment.people.map((p) => (
              <Chip key={p} as="span" className="text-[9.5px]">{p}</Chip>
            ))}
          </div>
        </div>
      </header>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_290px]">
        <div className="space-y-3">
          {BLOCKS.map(({ key, label, icon: Icon }) => (
            <Panel key={key} className="p-4">
              <div className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
                <h2 className="qp-label">{label}</h2>
              </div>
              <p className="mt-2 text-[12.5px] leading-[1.8] text-[#b6c8dc]">{experiment[key]}</p>
            </Panel>
          ))}

          <Panel className="p-4">
            <p className="qp-label mb-2">Related articles</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {relatedArticles.map((a) => (
                <Link key={a.slug} to={`/articles/${a.slug}`} className="qp-panel-soft qp-hover p-2.5">
                  <p className="qp-label">{a.category}</p>
                  <p className="mt-1 text-[11.5px] font-medium text-[#eaf4ff]">{a.title}</p>
                </Link>
              ))}
            </div>
          </Panel>
        </div>

        <aside className="space-y-3.5 xl:sticky xl:top-[72px] xl:self-start">
          <Panel className="p-3.5">
            <p className="qp-label mb-2">Experiment data</p>
            <dl className="space-y-2 text-[11px]">
              {[
                ['Field', experiment.field],
                ['Period', experiment.year],
                ['Investigators', experiment.people.length],
                ['Reading', '6 min']
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-3">
                  <dt className="text-[#8fa8c2]">{label}</dt>
                  <dd className="mono text-right text-[#d6e9f8]">{value}</dd>
                </div>
              ))}
            </dl>
          </Panel>

          <Panel className="p-3.5">
            <p className="qp-label mb-2">Related experiments</p>
            <div className="space-y-1.5">
              {relatedExperiments.map((e) => (
                <Link key={e.slug} to={`/experiments/${e.slug}`} className="block text-[11.5px] text-[#c3d6e8] hover:text-[var(--qp-accent)]">
                  {e.title}
                </Link>
              ))}
            </div>
          </Panel>

          <Panel className="p-3.5">
            <p className="qp-label mb-1.5">Evidence status</p>
            <p className="text-[10.5px] leading-relaxed text-[#8fa8c2]">
              Observations and results summarise published measurements. Interpretation states what the community takes the
              data to establish; theoretical extensions are identified separately.
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {experiments.slice(0, 4).map((e) => (
                <Link key={e.slug} to={`/experiments/${e.slug}`} className="rounded-full border border-[var(--qp-accent)]/12 px-2 py-0.5 text-[9.5px] text-[#8fa8c2] hover:border-[var(--qp-accent)]/40">
                  {e.title.split(' ')[0]}
                </Link>
              ))}
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}