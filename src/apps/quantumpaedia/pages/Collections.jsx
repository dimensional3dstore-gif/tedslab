import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Bookmark, Library, Clock, StickyNote, Download, Trash2, Plus, X } from 'lucide-react';
import { PageHeader, Panel, Chip, EmptyState } from '@/components/common/Kit';
import NotesPanel from '@/components/research/NotesPanel';
import { useLibrary } from '@/lib/library';

const TABS = [
  { key: 'saved', label: 'Saved articles', icon: Bookmark },
  { key: 'collections', label: 'Collections', icon: Library },
  { key: 'notes', label: 'Notes', icon: StickyNote },
  { key: 'history', label: 'Reading history', icon: Clock }
];

const TYPE_LABEL = {
  Article: 'Article',
  Publication: 'Publication',
  Equation: 'Equation',
  Experiment: 'Experiment',
  Simulation: 'Simulation',
  Scientist: 'Scientist'
};

export default function Collections() {
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') || 'saved';
  const { saved, collections, notes, history, library } = useLibrary();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [renaming, setRenaming] = useState(null);
  const [renameValue, setRenameValue] = useState('');

  const exportAll = () => {
    const payload = { saved, collections, notes, history, exported: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quantumpaedia-library.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const grouped = saved.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <PageHeader
        kicker="Saved knowledge"
        title="My Library"
        description="Everything you save is stored on this device: articles, publications, equations, experiments and notes, organised into collections."
        meta={
          <>
            <Chip as="span">{saved.length} saved</Chip>
            <Chip as="span">{collections.length} collections</Chip>
            <Chip as="span">{notes.length} notes</Chip>
          </>
        }
        actions={
          <button
            type="button"
            onClick={exportAll}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--qp-accent)]/25 px-3 py-1.5 text-[11px] text-[#c3d6e8] hover:border-[var(--qp-accent)]/60"
          >
            <Download className="h-3 w-3" /> Export library
          </button>
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

      {tab === 'saved' && (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_270px]">
          <div className="space-y-4">
            {saved.length === 0 ? (
              <EmptyState
                icon={Bookmark}
                title="Nothing saved yet"
                description="Use the bookmark control on any article, publication or equation to keep it here."
                action={<Link to="/explore" className="rounded-md border border-[var(--qp-accent)]/30 px-3 py-1.5 text-[11px] text-[#d6f3ff] hover:border-[var(--qp-accent)]/60">Browse articles</Link>}
              />
            ) : (
              Object.entries(grouped).map(([type, items]) => (
                <div key={type}>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="qp-label">{TYPE_LABEL[type] || type}</h3>
                    <span className="mono text-[9.5px] text-[#4f6b88]">{items.length}</span>
                    <div className="qp-hairline flex-1" />
                  </div>
                  <div className="space-y-1.5">
                    {items.map((item) => (
                      <Panel key={item.id} soft className="flex items-start justify-between gap-3 p-2.5">
                        <div className="min-w-0">
                          <Link to={item.to || '#'} className="text-[12px] text-[#eaf4ff] hover:text-[var(--qp-accent)]">{item.title}</Link>
                          {item.subtitle && <p className="mt-0.5 line-clamp-1 text-[10px] text-[#7088a5]">{item.subtitle}</p>}
                          <p className="mono mt-1 text-[8.5px] text-[#4f6b88]">saved {new Date(item.savedAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          {collections.length > 0 && (
                            <select
                              defaultValue=""
                              onChange={(e) => {
                                if (e.target.value) library.toggleInCollection(e.target.value, item.id);
                                e.target.value = '';
                              }}
                              className="max-w-[104px] rounded border border-[var(--qp-accent)]/15 bg-[#071729] px-1 py-0.5 text-[9px] text-[#a8bcd3] focus:outline-none"
                            >
                              <option value="">add to…</option>
                              {collections.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                              ))}
                            </select>
                          )}
                          <button type="button" onClick={() => library.removeSaved(item.id)} className="rounded p-1 text-[#6f88a3] hover:text-[#ff8fa3]" aria-label="Remove">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </Panel>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          <aside>
            <Panel className="p-3.5">
              <p className="qp-label mb-2">Create a collection</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!name.trim()) return;
                  library.createCollection(name.trim(), desc.trim());
                  setName('');
                  setDesc('');
                }}
                className="space-y-2"
              >
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Collection name"
                  className="w-full rounded-md border border-[var(--qp-accent)]/15 bg-[#071729] px-2.5 py-1.5 text-[11.5px] text-[#f0f6ff] placeholder:text-[#5f7893] focus:outline-none"
                />
                <input
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Description (optional)"
                  className="w-full rounded-md border border-[var(--qp-accent)]/15 bg-[#071729] px-2.5 py-1.5 text-[11.5px] text-[#f0f6ff] placeholder:text-[#5f7893] focus:outline-none"
                />
                <button type="submit" className="flex w-full items-center justify-center gap-1.5 rounded-md bg-[var(--qp-accent)] py-1.5 text-[11px] font-medium text-[#04121f] hover:bg-[#5ad8ff]">
                  <Plus className="h-3 w-3" /> Create
                </button>
              </form>
            </Panel>
          </aside>
        </div>
      )}

      {tab === 'collections' && (
        <div className="space-y-2.5">
          {collections.length === 0 ? (
            <EmptyState
              icon={Library}
              title="No collections yet"
              description="Create a collection from the saved tab, then assign any saved item to it with the collection selector."
            />
          ) : (
            collections.map((c) => {
              const items = saved.filter((s) => c.itemIds.includes(s.id));
              return (
                <Panel key={c.id} soft className="p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      {renaming === c.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            className="rounded border border-[var(--qp-accent)]/30 bg-[#071729] px-2 py-1 text-[11.5px] text-[#f0f6ff] focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => { library.updateCollection(c.id, { name: renameValue }); setRenaming(null); }}
                            className="text-[10px] text-[var(--qp-accent)] hover:underline"
                          >
                            save
                          </button>
                          <button type="button" onClick={() => setRenaming(null)} className="text-[#7088a5]"><X className="h-3 w-3" /></button>
                        </div>
                      ) : (
                        <p className="text-[12.5px] font-medium text-[#eaf4ff]">{c.name}</p>
                      )}
                      {c.description && <p className="mt-0.5 text-[10.5px] text-[#8fa8c2]">{c.description}</p>}
                      <p className="mono mt-1 text-[9px] text-[#4f6b88]">{items.length} items · created {new Date(c.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => { setRenaming(c.id); setRenameValue(c.name); }}
                        className="text-[9.5px] uppercase tracking-[0.14em] text-[#7088a5] hover:text-[var(--qp-accent)]"
                      >
                        rename
                      </button>
                      <button type="button" onClick={() => library.deleteCollection(c.id)} className="rounded p-1 text-[#6f88a3] hover:text-[#ff8fa3]" aria-label="Delete collection">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  {items.length > 0 && (
                    <div className="mt-2.5 space-y-1">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-2">
                          <Link to={item.to || '#'} className="truncate text-[11px] text-[#c3d6e8] hover:text-[var(--qp-accent)]">{item.title}</Link>
                          <button type="button" onClick={() => library.toggleInCollection(c.id, item.id)} className="shrink-0 text-[9px] text-[#6f88a3] hover:text-[#ff8fa3]">
                            remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </Panel>
              );
            })
          )}
        </div>
      )}

      {tab === 'notes' && <NotesPanel />}

      {tab === 'history' && (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_270px]">
          <div>
            {history.length === 0 ? (
              <EmptyState icon={Clock} title="No reading history" description="Articles you open are recorded here so you can return to them." />
            ) : (
              <div className="space-y-1.5">
                {history.map((h) => (
                  <Panel key={h.id + h.at} soft className="flex items-center justify-between gap-3 p-2.5">
                    <div className="min-w-0">
                      <Link to={h.to} className="text-[11.5px] text-[#eaf4ff] hover:text-[var(--qp-accent)]">{h.title}</Link>
                      <p className="mono mt-0.5 text-[8.5px] text-[#4f6b88]">{h.type} · {new Date(h.at).toLocaleString()}</p>
                    </div>
                    <Link to={h.to} className="shrink-0 text-[9.5px] uppercase tracking-[0.14em] text-[var(--qp-accent)] hover:underline">open</Link>
                  </Panel>
                ))}
              </div>
            )}
          </div>
          <aside>
            <Panel className="p-3.5">
              <p className="qp-label mb-2">History</p>
              <p className="text-[10.5px] leading-relaxed text-[#8fa8c2]">
                The last 40 records are kept on this device. Clearing history does not remove saved items.
              </p>
              <button
                type="button"
                onClick={() => library.clearHistory()}
                className="mt-2.5 w-full rounded-md border border-[var(--qp-accent)]/20 py-1.5 text-[10.5px] text-[#c3d6e8] hover:border-[var(--qp-accent)]/50"
              >
                Clear history
              </button>
            </Panel>
          </aside>
        </div>
      )}
    </div>
  );
}