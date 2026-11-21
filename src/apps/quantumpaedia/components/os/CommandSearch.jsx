import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CornerDownLeft, X, Clock } from 'lucide-react';
import { searchAll, SEARCH_TYPES } from '@/lib/search';
import { library, useLibrary } from '@/lib/library';
import { cn } from '@/lib/utils';

export default function CommandSearch({ open, onClose, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState('All');
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { searches } = useLibrary();

  const results = useMemo(() => searchAll(query, type).slice(0, 9), [query, type]);

  useEffect(() => {
    if (open) {
      setQuery(initialQuery);
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open, initialQuery]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && results[active]) {
        library.addSearch(query || results[active].title);
        navigate(results[active].to);
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, results, active, navigate, onClose, query]);

  if (!open) return null;

  const go = (to, label) => {
    library.addSearch(query || label);
    navigate(to);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-[#03101f]/75 px-4 pt-[12vh] backdrop-blur-sm" onClick={onClose}>
      <div
        className="qp-panel w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Universal search"
      >
        <div className="flex items-center gap-3 border-b border-[var(--qp-accent)]/12 px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-[var(--qp-accent)]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            placeholder="Search the quantum knowledge system…"
            className="w-full bg-transparent text-[13px] text-[#f0f6ff] placeholder:text-[#5f7893] focus:outline-none"
          />
          <button type="button" onClick={onClose} className="rounded p-1 text-[#7088a5] hover:text-[#f0f6ff]" aria-label="Close search">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 border-b border-[var(--qp-accent)]/10 px-3 py-2">
          {['All', ...SEARCH_TYPES].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setType(t); setActive(0); }}
              className={cn(
                'rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] transition-colors',
                type === t
                  ? 'border-[var(--qp-accent)]/60 bg-[var(--qp-accent)]/12 text-[#d6f3ff]'
                  : 'border-transparent text-[#7088a5] hover:text-[#c3d6e8]'
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="max-h-[52vh] overflow-y-auto qp-scroll p-2">
          {results.length === 0 && (
            <p className="px-3 py-6 text-center text-[12px] text-[#7088a5]">
              No indexed records match that query. Try a concept, equation or surname.
            </p>
          )}
          {results.map((r, i) => (
            <button
              key={r.id}
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => go(r.to, r.title)}
              className={cn(
                'flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left transition-colors',
                i === active ? 'bg-[var(--qp-accent)]/10' : 'hover:bg-[#102b4b]/50'
              )}
            >
              <span className="mt-0.5 rounded border border-[var(--qp-accent)]/20 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.12em] text-[#8fb8d4]">
                {r.type.slice(0, 4)}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[12.5px] text-[#eef6ff]">{r.title}</span>
                <span className="mt-0.5 block truncate text-[10.5px] text-[#7088a5]">{r.subtitle}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--qp-accent)]/10 px-4 py-2">
          <div className="flex flex-wrap items-center gap-2">
            {searches.length > 0 && (
              <>
                <Clock className="h-3 w-3 text-[#4f6b88]" />
                {searches.slice(0, 3).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => { setQuery(s); setActive(0); }}
                    className="rounded-full bg-[#102b4b]/60 px-2 py-0.5 text-[10px] text-[#a8bcd3] hover:text-[#f0f6ff]"
                  >
                    {s}
                  </button>
                ))}
              </>
            )}
          </div>
          <span className="flex items-center gap-1.5 text-[10px] text-[#4f6b88]">
            <CornerDownLeft className="h-3 w-3" /> open first result
          </span>
        </div>
      </div>
    </div>
  );
}