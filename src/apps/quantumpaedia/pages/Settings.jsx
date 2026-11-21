import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Palette, Database, Info, Trash2, Download, Check } from 'lucide-react';
import { PageHeader, Panel, Chip, SectionHeading } from '@/components/common/Kit';
import { useLibrary } from '@/lib/library';
import { articles } from '@/data/articles';
import { papers } from '@/data/papers';
import { simulations } from '@/data/simulations';
import { disciplines } from '@/data/disciplines';

export default function Settings() {
  const { settings, saved, collections, notes, history, library } = useLibrary();

  const exportAll = () => {
    const payload = { saved, collections, notes, history, settings, exported: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quantumpaedia-library.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        kicker="Application settings"
        title="Preferences"
        description="Reading mode, accent and local data management for this Quantumpaedia installation."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel className="p-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
            <p className="qp-label">Reading mode</p>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-[#8fa8c2]">
            Standard mode presents the full encyclopaedic text. Learning mode adds a glossary and inline key-idea callouts
            while keeping every mathematical section available.
          </p>
          <div className="mt-2.5 flex gap-1.5">
            {[
              { key: 'standard', label: 'Standard' },
              { key: 'learning', label: 'Learning' }
            ].map((m) => (
              <Chip key={m.key} active={settings.readingMode === m.key} onClick={() => library.setSettings({ readingMode: m.key })}>
                {m.label}
              </Chip>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-[var(--qp-accent)]/10 bg-[#071729]/60 p-2.5">
            <p className="qp-label mb-1">Active mode</p>
            <p className="text-[11px] text-[#d6e9f8]">{settings.readingMode === 'learning' ? 'Learning — callouts and glossary enabled' : 'Standard — encyclopaedic presentation'}</p>
          </div>
        </Panel>

        <Panel className="p-4">
          <div className="flex items-center gap-2">
            <Palette className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
            <p className="qp-label">Accent</p>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-[#8fa8c2]">
            The interface uses the deep-surface palette with a luminous accent. Choose the primary accent used for
            interactive elements.
          </p>
          <div className="mt-2.5 flex gap-2">
            {[
              { key: 'cyan', label: 'Electric cyan', color: 'var(--qp-accent)' },
              { key: 'violet', label: 'Quantum violet', color: 'var(--qp-accent)' }
            ].map((a) => (
              <button
                key={a.key}
                type="button"
                onClick={() => library.setSettings({ accent: a.key })}
                className={`flex flex-1 items-center gap-2 rounded-lg border px-2.5 py-2 text-[10.5px] transition-colors ${
                  settings.accent === a.key ? 'border-[var(--qp-accent)]/60 bg-[var(--qp-accent)]/8 text-[#e6f2ff]' : 'border-[var(--qp-accent)]/12 text-[#8fa8c2] hover:border-[var(--qp-accent)]/35'
                }`}
              >
                <span className="h-3 w-3 rounded-full" style={{ background: a.color }} />
                {a.label}
                {settings.accent === a.key && <Check className="ml-auto h-3 w-3 text-[var(--qp-accent)]" />}
              </button>
            ))}
          </div>
        </Panel>

        <Panel className="p-4">
          <div className="flex items-center gap-2">
            <Database className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
            <p className="qp-label">Local data</p>
          </div>
          <dl className="mt-2 space-y-2 text-[11px]">
            {[
              ['Saved items', saved.length],
              ['Collections', collections.length],
              ['Notes', notes.length],
              ['History records', history.length]
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <dt className="text-[#8fa8c2]">{label}</dt>
                <dd className="mono text-[#d6e9f8]">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={exportAll} className="flex items-center gap-1.5 rounded-md border border-[var(--qp-accent)]/25 px-2.5 py-1.5 text-[10.5px] text-[#c3d6e8] hover:border-[var(--qp-accent)]/60">
              <Download className="h-3 w-3" /> Export
            </button>
            <button
              type="button"
              onClick={() => library.resetAll()}
              className="flex items-center gap-1.5 rounded-md border border-[#ff8fa3]/30 px-2.5 py-1.5 text-[10.5px] text-[#ffb3c0] hover:border-[#ff8fa3]/60"
            >
              <Trash2 className="h-3 w-3" /> Clear saved data
            </button>
          </div>
          <p className="mt-2 text-[9.5px] leading-relaxed text-[#5f7893]">
            Saved items and notes are stored in this browser only. Clearing them cannot be undone.
          </p>
        </Panel>

        <Panel className="p-4">
          <div className="flex items-center gap-2">
            <Info className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
            <p className="qp-label">About this installation</p>
          </div>
          <dl className="mt-2 space-y-2 text-[11px]">
            {[
              ['Application', 'Quantumpaedia'],
              ['Host', 'ChronosOS · OMNI OS'],
              ['Build', '2026.11'],
              ['Articles', articles.length],
              ['Disciplines', disciplines.length],
              ['Publications', papers.length],
              ['Simulations', simulations.length]
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <dt className="text-[#8fa8c2]">{label}</dt>
                <dd className="mono text-[#d6e9f8]">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="qp-hairline my-3" />
          <p className="text-[9.5px] leading-relaxed text-[#5f7893]">
            Quantumpaedia is an editorial scientific reference. Articles are written summaries of established physics;
            primary literature is listed with DOI identifiers where available.
          </p>
        </Panel>
      </div>

      <div>
        <SectionHeading eyebrow="Shortcuts" title="Where to go next" />
        <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
          {[
            { to: '/knowledge', label: 'Discipline index', note: 'Twelve research fields' },
            { to: '/laboratory', label: 'Simulation centre', note: 'Seven working modules' },
            { to: '/graph', label: 'Knowledge graph', note: 'Connected concepts' }
          ].map((l) => (
            <Link key={l.to} to={l.to} className="qp-panel-soft qp-hover p-3">
              <p className="text-[12px] font-medium text-[#eaf4ff]">{l.label}</p>
              <p className="mt-0.5 text-[10.5px] text-[#7088a5]">{l.note}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}