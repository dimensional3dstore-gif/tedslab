import React, { useState } from 'react';
import { Plus, Trash2, StickyNote } from 'lucide-react';
import { Panel, EmptyState } from '@/components/common/Kit';
import { articles } from '@/data/articles';
import { useLibrary } from '@/lib/library';

export default function NotesPanel() {
  const { notes, library } = useLibrary();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [linked, setLinked] = useState('');

  const create = (e) => {
    e.preventDefault();
    if (!title.trim() && !body.trim()) return;
    library.addNote({ title: title.trim() || 'Untitled note', body: body.trim(), linkedTo: linked });
    setTitle('');
    setBody('');
    setLinked('');
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
      <Panel className="p-3.5">
        <p className="qp-label mb-2.5">New research note</p>
        <form onSubmit={create} className="space-y-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full rounded-md border border-[var(--qp-accent)]/15 bg-[#071729] px-2.5 py-1.5 text-[11.5px] text-[#f0f6ff] placeholder:text-[#5f7893] focus:outline-none"
          />
          <select
            value={linked}
            onChange={(e) => setLinked(e.target.value)}
            className="w-full rounded-md border border-[var(--qp-accent)]/15 bg-[#071729] px-2 py-1.5 text-[11px] text-[#d6e9f8] focus:outline-none"
          >
            <option value="">Link to article (optional)</option>
            {articles.map((a) => (
              <option key={a.slug} value={a.slug}>{a.title}</option>
            ))}
          </select>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Derivation steps, questions, observations…"
            rows={5}
            className="w-full resize-none rounded-md border border-[var(--qp-accent)]/15 bg-[#071729] px-2.5 py-1.5 text-[11.5px] leading-relaxed text-[#f0f6ff] placeholder:text-[#5f7893] focus:outline-none"
          />
          <button type="submit" className="flex w-full items-center justify-center gap-1.5 rounded-md bg-[var(--qp-accent)] py-1.5 text-[11px] font-medium text-[#04121f] hover:bg-[#5ad8ff]">
            <Plus className="h-3 w-3" /> Save note
          </button>
        </form>
      </Panel>

      <div className="space-y-2.5">
        {notes.length === 0 ? (
          <EmptyState icon={StickyNote} title="No notes yet" description="Notes can be linked to any article in the encyclopaedia." />
        ) : (
          notes.map((n) => {
            const article = articles.find((a) => a.slug === n.linkedTo);
            return (
              <Panel key={n.id} soft className="p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-medium text-[#eaf4ff]">{n.title}</p>
                    <p className="mono mt-0.5 text-[9px] text-[#5f7893]">{new Date(n.createdAt).toLocaleString()}</p>
                    {article && <p className="mt-1 text-[10px] text-[var(--qp-accent)]">linked to {article.title}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => library.deleteNote(n.id)}
                    className="rounded p-1 text-[#6f88a3] hover:text-[#ff8fa3]"
                    aria-label="Delete note"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <textarea
                  value={n.body}
                  onChange={(e) => library.updateNote(n.id, { body: e.target.value })}
                  rows={3}
                  className="mt-2 w-full resize-none rounded-md border border-transparent bg-transparent text-[11px] leading-relaxed text-[#b6c8dc] hover:border-[var(--qp-accent)]/15 focus:border-[var(--qp-accent)]/30 focus:outline-none"
                />
              </Panel>
            );
          })
        )}
      </div>
    </div>
  );
}