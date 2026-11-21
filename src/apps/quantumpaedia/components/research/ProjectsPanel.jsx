import React, { useState } from 'react';
import { Plus, Trash2, FolderOpen } from 'lucide-react';
import { Panel, EmptyState, Chip } from '@/components/common/Kit';
import { papers } from '@/data/papers';
import { useLibrary } from '@/lib/library';

const STATUSES = ['planning', 'active', 'review', 'complete'];

export default function ProjectsPanel() {
  const { projects, library } = useLibrary();
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');

  const create = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    library.createProject({ name: name.trim(), topic: topic.trim() || 'Unassigned', description: description.trim() });
    setName('');
    setTopic('');
    setDescription('');
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
      <Panel className="p-3.5">
        <p className="qp-label mb-2.5">New research project</p>
        <form onSubmit={create} className="space-y-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
            className="w-full rounded-md border border-[var(--qp-accent)]/15 bg-[#071729] px-2.5 py-1.5 text-[11.5px] text-[#f0f6ff] placeholder:text-[#5f7893] focus:outline-none"
          />
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Research topic"
            className="w-full rounded-md border border-[var(--qp-accent)]/15 bg-[#071729] px-2.5 py-1.5 text-[11.5px] text-[#f0f6ff] placeholder:text-[#5f7893] focus:outline-none"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Objective or notes"
            rows={3}
            className="w-full resize-none rounded-md border border-[var(--qp-accent)]/15 bg-[#071729] px-2.5 py-1.5 text-[11.5px] text-[#f0f6ff] placeholder:text-[#5f7893] focus:outline-none"
          />
          <button type="submit" className="flex w-full items-center justify-center gap-1.5 rounded-md bg-[var(--qp-accent)] py-1.5 text-[11px] font-medium text-[#04121f] hover:bg-[#5ad8ff]">
            <Plus className="h-3 w-3" /> Create project
          </button>
        </form>
        <p className="mt-2 text-[9.5px] leading-relaxed text-[#5f7893]">
          Projects are stored on this device and can be exported from the citation panel.
        </p>
      </Panel>

      <div className="space-y-2.5">
        {projects.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            title="No projects yet"
            description="Create a project, then attach publications from the explorer using the project selector on each paper."
          />
        ) : (
          projects.map((p) => {
            const attached = p.paperIds.map((id) => papers.find((x) => x.id === id)).filter(Boolean);
            return (
              <Panel key={p.id} soft className="p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-medium text-[#eaf4ff]">{p.name}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-[#6f88a3]">{p.topic}</p>
                    {p.description && <p className="mt-1.5 text-[11px] leading-relaxed text-[#8fa8c2]">{p.description}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => library.deleteProject(p.id)}
                    className="rounded p-1 text-[#6f88a3] transition-colors hover:text-[#ff8fa3]"
                    aria-label="Delete project"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {STATUSES.map((s) => (
                    <Chip key={s} active={p.status === s} onClick={() => library.updateProject(p.id, { status: s })}>
                      {s}
                    </Chip>
                  ))}
                </div>

                <div className="mt-2.5">
                  <p className="qp-label mb-1.5">Attached publications ({attached.length})</p>
                  {attached.length === 0 ? (
                    <p className="text-[10.5px] text-[#5f7893]">Attach papers from the explorer tab.</p>
                  ) : (
                    <div className="space-y-1">
                      {attached.map((paper) => (
                        <div key={paper.id} className="flex items-start justify-between gap-2">
                          <p className="min-w-0 truncate text-[10.5px] text-[#c3d6e8]">
                            {paper.authors[0]}{paper.authors.length > 1 ? ' et al.' : ''} ({paper.year}) — {paper.title}
                          </p>
                          <button
                            type="button"
                            onClick={() => library.togglePaperInProject(p.id, paper.id)}
                            className="shrink-0 text-[9px] text-[#6f88a3] hover:text-[#ff8fa3]"
                          >
                            remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Panel>
            );
          })
        )}
      </div>
    </div>
  );
}