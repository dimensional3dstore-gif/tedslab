import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { BookText, FolderKanban, Quote, StickyNote, Compass, Clock } from 'lucide-react';
import { PageHeader, Panel, Chip } from '@/components/common/Kit';
import PaperList from '@/components/research/PaperList';
import ProjectsPanel from '@/components/research/ProjectsPanel';
import NotesPanel from '@/components/research/NotesPanel';
import CitationPanel from '@/components/research/CitationPanel';
import { papers } from '@/data/papers';
import { useLibrary } from '@/lib/library';

const TABS = [
  { key: 'explorer', label: 'Research Explorer', icon: Compass },
  { key: 'publications', label: 'Publications', icon: BookText },
  { key: 'projects', label: 'Projects', icon: FolderKanban },
  { key: 'citations', label: 'Citation Manager', icon: Quote },
  { key: 'notes', label: 'Research Notes', icon: StickyNote }
];

export default function Research() {
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') || 'explorer';
  const { saved, projects, notes } = useLibrary();

  const savedPapers = saved.filter((s) => s.type === 'Publication').length;

  return (
    <div className="space-y-4">
      <PageHeader
        kicker="Research centre"
        title="Quantum Research Environment"
        description="A structured index of primary literature with project workspaces, citation export and note-taking. Sources are verifiable publications — abstracts are editorial summaries, not fabricated findings."
        meta={
          <>
            <Chip as="span">{papers.length} publications</Chip>
            <Chip as="span">{savedPapers} saved</Chip>
            <Chip as="span">{projects.length} projects</Chip>
            <Chip as="span">{notes.length} notes</Chip>
          </>
        }
        actions={
          <Link to="/timeline" className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--qp-accent)]/25 px-3 py-1.5 text-[11px] text-[#c3d6e8] hover:border-[var(--qp-accent)]/60">
            <Clock className="h-3 w-3" /> Discovery timeline
          </Link>
        }
      />

      <div className="flex flex-wrap gap-1.5 border-b border-[var(--qp-accent)]/10 pb-2">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setParams({ tab: t.key })}
              className={`flex items-center gap-1.5 rounded-t-md px-3 py-1.5 text-[11.5px] transition-colors ${
                tab === t.key
                  ? 'bg-[var(--qp-accent)]/10 text-[#d6f3ff] shadow-[inset_0_-2px_0_0_var(--qp-accent)]'
                  : 'text-[#8fa8c2] hover:text-[#f0f6ff]'
              }`}
            >
              <Icon className="h-3.5 w-3.5" /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          {(tab === 'explorer' || tab === 'publications') && <PaperList />}
          {tab === 'projects' && <ProjectsPanel />}
          {tab === 'citations' && <CitationPanel />}
          {tab === 'notes' && <NotesPanel />}
        </div>

        <aside className="space-y-3.5 xl:sticky xl:top-[72px] xl:self-start">
          <Panel className="p-3.5">
            <p className="qp-label mb-2">Research overview</p>
            <dl className="space-y-2 text-[11px]">
              {[
                ['Indexed publications', papers.length],
                ['Earliest source', Math.min(...papers.map((p) => p.year))],
                ['Most recent source', Math.max(...papers.map((p) => p.year))],
                ['With DOI', papers.filter((p) => p.doi).length]
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between">
                  <dt className="text-[#8fa8c2]">{label}</dt>
                  <dd className="mono text-[#d6e9f8]">{value}</dd>
                </div>
              ))}
            </dl>
          </Panel>

          <Panel className="p-3.5">
            <p className="qp-label mb-2">Research topics</p>
            <div className="flex flex-wrap gap-1.5">
              {Array.from(new Set(papers.map((p) => p.topic))).map((t) => (
                <Chip key={t} as="span" className="text-[9.5px]">{t}</Chip>
              ))}
            </div>
          </Panel>

          <Panel className="p-3.5">
            <p className="qp-label mb-1.5">Method note</p>
            <p className="text-[10.5px] leading-relaxed text-[#8fa8c2]">
              This environment does not query an external database. It indexes a curated list of real publications with
              their DOI identifiers; anything not in that list is reported as unavailable rather than invented.
            </p>
          </Panel>
        </aside>
      </div>
    </div>
  );
}