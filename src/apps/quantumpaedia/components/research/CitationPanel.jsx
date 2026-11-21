import React, { useMemo, useState } from 'react';
import { Copy, Download, Check, BookMarked } from 'lucide-react';
import { Panel, Chip, EmptyState } from '@/components/common/Kit';
import { papers } from '@/data/papers';
import { useLibrary } from '@/lib/library';

const FORMATS = ['APA', 'BibTeX', 'RIS', 'Plain'];

const formatPaper = (p, format) => {
  const authors = p.authors.join(', ');
  if (format === 'APA') {
    return `${authors} (${p.year}). ${p.title}. ${p.journal}.${p.doi ? ` https://doi.org/${p.doi}` : ''}`;
  }
  if (format === 'BibTeX') {
    const key = p.id.replace(/-/g, '_');
    return `@article{${key},
  author  = {${p.authors.join(' and ')}},
  title   = {${p.title}},
  journal = {${p.journal}},
  year    = {${p.year}},${p.doi ? `\n  doi     = {${p.doi}},` : ''}
}`;
  }
  if (format === 'RIS') {
    return `TY  - JOUR\n${p.authors.map((a) => `AU  - ${a}`).join('\n')}\nTI  - ${p.title}\nJO  - ${p.journal}\nPY  - ${p.year}${p.doi ? `\nDO  - ${p.doi}` : ''}\nER  - `;
  }
  return `${authors} — ${p.title}. ${p.journal}, ${p.year}.${p.doi ? ` doi:${p.doi}` : ''}`;
};

export default function CitationPanel() {
  const [format, setFormat] = useState('APA');
  const [copied, setCopied] = useState(false);
  const { saved, projects } = useLibrary();

  const savedPapers = useMemo(() => {
    const ids = saved.filter((s) => s.type === 'Publication').map((s) => s.id.replace('paper:', ''));
    return papers.filter((p) => ids.includes(p.id));
  }, [saved]);

  const projectPapers = useMemo(() => {
    const ids = projects.flatMap((p) => p.paperIds);
    return papers.filter((p) => ids.includes(p.id));
  }, [projects]);

  const list = savedPapers.length > 0 ? savedPapers : projectPapers;
  const text = list.map((p) => formatPaper(p, format)).join(format === 'BibTeX' ? '\n\n' : format === 'RIS' ? '\n\n' : '\n\n');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const download = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quantumpaedia-references.${format === 'BibTeX' ? 'bib' : format === 'RIS' ? 'ris' : 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
      <Panel className="p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BookMarked className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
            <p className="qp-label">Reference list</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {FORMATS.map((f) => (
              <Chip key={f} active={format === f} onClick={() => setFormat(f)}>{f}</Chip>
            ))}
          </div>
        </div>

        {list.length === 0 ? (
          <div className="mt-3">
            <EmptyState
              icon={BookMarked}
              title="No sources selected"
              description="Save publications from the explorer, or attach them to a project. They will be collected here for export."
            />
          </div>
        ) : (
          <>
            <pre className="mono mt-3 max-h-[420px] overflow-auto qp-scroll whitespace-pre-wrap rounded-lg border border-[var(--qp-accent)]/10 bg-[#071729]/70 p-3 text-[10.5px] leading-relaxed text-[#c3d6e8]">
              {text}
            </pre>
            <div className="mt-2.5 flex flex-wrap gap-2">
              <button type="button" onClick={copy} className="flex items-center gap-1.5 rounded-md bg-[var(--qp-accent)] px-3 py-1.5 text-[10.5px] font-medium text-[#04121f] hover:bg-[#5ad8ff]">
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />} {copied ? 'Copied' : 'Copy list'}
              </button>
              <button type="button" onClick={download} className="flex items-center gap-1.5 rounded-md border border-[var(--qp-accent)]/25 px-3 py-1.5 text-[10.5px] text-[#c3d6e8] hover:border-[var(--qp-accent)]/60">
                <Download className="h-3 w-3" /> Export file
              </button>
            </div>
          </>
        )}
      </Panel>

      <Panel className="p-3.5">
        <p className="qp-label mb-2">Citation statistics</p>
        <dl className="space-y-2 text-[11px]">
          {[
            ['Publications indexed', papers.length],
            ['Saved publications', savedPapers.length],
            ['In project libraries', projectPapers.length],
            ['Projects', projects.length]
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between">
              <dt className="text-[#8fa8c2]">{label}</dt>
              <dd className="mono text-[#d6e9f8]">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="qp-hairline my-3" />
        <p className="text-[10px] leading-relaxed text-[#7088a5]">
          Every entry in the index carries a verifiable DOI or full publication details. Entries without a registered
          DOI are marked explicitly rather than given a fabricated identifier.
        </p>
      </Panel>
    </div>
  );
}