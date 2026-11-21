import React, { useMemo, useState } from 'react';
import { Search, ExternalLink, FolderPlus, ChevronDown } from 'lucide-react';
import SaveButton from '@/components/common/SaveButton';
import { Panel, Chip, EmptyState } from '@/components/common/Kit';
import { papers } from '@/data/papers';
import { useLibrary } from '@/lib/library';
import { cn } from '@/lib/utils';

export default function PaperList() {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('All');
  const [openId, setOpenId] = useState(null);
  const { projects, library } = useLibrary();

  const topics = useMemo(() => ['All', ...Array.from(new Set(papers.map((p) => p.topic)))], []);

  const filtered = papers
    .filter((p) => (topic === 'All' ? true : p.topic === topic))
    .filter((p) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.authors.join(' ').toLowerCase().includes(q) ||
        p.keywords.join(' ').toLowerCase().includes(q)
      );
    })
    .sort((a, b) => b.year - a.year);

  return (
    <div className="space-y-3.5">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-[var(--qp-accent)]/15 bg-[#091b32]/70 px-3 py-2">
          <Search className="h-3.5 w-3.5 text-[#7088a5]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, authors, keywords…"
            className="w-full bg-transparent text-[12px] text-[#f0f6ff] placeholder:text-[#5f7893] focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {topics.slice(0, 5).map((t) => (
            <Chip key={t} active={topic === t} onClick={() => setTopic(t)}>{t}</Chip>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <EmptyState icon={Search} title="No publications match" description="Adjust the topic filter or search terms." />
      )}

      <div className="space-y-2.5">
        {filtered.map((p) => {
          const open = openId === p.id;
          return (
            <Panel key={p.id} soft className="p-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[12.5px] font-medium leading-snug text-[#eaf4ff]">{p.title}</p>
                  <p className="mt-1 text-[10.5px] text-[#8fa8c2]">
                    {p.authors.join(', ')} · <span className="italic">{p.journal}</span> · <span className="mono">{p.year}</span>
                  </p>
                </div>
                <SaveButton item={{ id: `paper:${p.id}`, type: 'Publication', title: p.title, subtitle: `${p.authors[0]} · ${p.year}`, to: `/research?tab=publications&paper=${p.id}` }} />
              </div>

              <div className={cn('mt-2 text-[11px] leading-relaxed text-[#a8bcd3]', !open && 'line-clamp-2')}>{p.abstract}</div>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : p.id)}
                  className="flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-[var(--qp-accent)] hover:underline"
                >
                  {open ? 'Less' : 'Abstract'} <ChevronDown className={cn('h-3 w-3 transition-transform', open && 'rotate-180')} />
                </button>
                {p.doi && (
                  <a
                    href={`https://doi.org/${p.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] text-[var(--qp-accent)] hover:underline"
                  >
                    DOI <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                )}
                {p.keywords.slice(0, 3).map((k) => (
                  <span key={k} className="rounded border border-[var(--qp-accent)]/10 px-1.5 py-0.5 text-[9px] text-[#6f88a3]">{k}</span>
                ))}
                {projects.length > 0 && (
                  <div className="ml-auto flex items-center gap-1">
                    <FolderPlus className="h-3 w-3 text-[#4f6b88]" />
                    <select
                      onChange={(e) => {
                        if (e.target.value) library.togglePaperInProject(e.target.value, p.id);
                        e.target.value = '';
                      }}
                      defaultValue=""
                      className="rounded border border-[var(--qp-accent)]/15 bg-[#071729] px-1.5 py-0.5 text-[9.5px] text-[#a8bcd3] focus:outline-none"
                    >
                      <option value="">attach to project…</option>
                      {projects.map((proj) => (
                        <option key={proj.id} value={proj.id}>{proj.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}