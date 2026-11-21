import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CornerDownLeft } from 'lucide-react';
import { suggestions } from '@/lib/search';
import { library } from '@/lib/library';
import { cn } from '@/lib/utils';

export default function TopBarSearch({ onSearch }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => (query.trim() ? suggestions(query, 6) : []), [query]);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const openResult = (result) => {
    library.addSearch(query.trim() || result.title);
    navigate(result.to);
    setOpen(false);
    setQuery('');
    inputRef.current?.blur();
  };

  const submit = () => {
    if (results[active]) {
      openResult(results[active]);
      return;
    }
    if (query.trim()) {
      library.addSearch(query.trim());
      onSearch?.(query.trim());
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    } else if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={ref} className="relative w-full max-w-[420px]">
      <div className="flex items-center gap-2 rounded-full border border-[var(--qp-accent)]/15 bg-[#091b32]/80 px-3 py-1.5 transition-colors focus-within:border-[var(--qp-accent)]/45">
        <Search className="h-3.5 w-3.5 shrink-0 text-[var(--qp-accent)]" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search quantum topics, equations, scientists…"
          aria-label="Search QUANTUMPAEDIA"
          className="w-full min-w-0 bg-transparent text-[11.5px] text-[#f0f6ff] placeholder:text-[#5f7893] focus:outline-none"
        />
        {query ? (
          <button
            type="button"
            onClick={() => { setQuery(''); setActive(0); inputRef.current?.focus(); }}
            className="shrink-0 text-[9px] uppercase tracking-[0.12em] text-[#7088a5] hover:text-[#f0f6ff]"
          >
            Clear
          </button>
        ) : (
          <kbd className="mono hidden shrink-0 rounded border border-[var(--qp-accent)]/15 px-1.5 py-0.5 text-[9px] text-[#7088a5] sm:block">
            ⌘K
          </kbd>
        )}
      </div>

      {open && query.trim() && (
        <div className="qp-panel-solid absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden p-1.5">
          <div className="qp-scroll max-h-[46vh] overflow-y-auto">
            {results.length === 0 && (
              <p className="px-3 py-4 text-center text-[11.5px] text-[#8fa8c2]">
                No indexed records match “{query.trim()}”.
              </p>
            )}
            {results.map((r, i) => (
              <button
                key={r.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => openResult(r)}
                className={cn(
                  'flex w-full items-start gap-2.5 rounded-md px-2.5 py-1.5 text-left transition-colors',
                  i === active ? 'bg-[var(--qp-accent)]/12' : 'hover:bg-[#102b4b]/60'
                )}
              >
                <span className="mt-0.5 shrink-0 rounded border border-[var(--qp-accent)]/20 px-1 py-0.5 text-[8px] uppercase tracking-[0.12em] text-[#8fb8d4]">
                  {r.type.slice(0, 4)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[12px] text-[#eef6ff]">{r.title}</span>
                  <span className="block truncate text-[10px] text-[#7088a5]">{r.subtitle}</span>
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => { library.addSearch(query.trim()); onSearch?.(query.trim()); setOpen(false); }}
            className="mt-1 flex w-full items-center justify-between rounded-md border-t border-[var(--qp-accent)]/10 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.14em] text-[#8fa8c2] hover:text-[#d9f3ff]"
          >
            Open full search
            <CornerDownLeft className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}