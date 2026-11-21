import React, { useEffect, useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { library } from '@/lib/library';
import { cn } from '@/lib/utils';

export default function SaveButton({ item, className, label = false }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(library.isSaved(item.id));
    const sync = () => setSaved(library.isSaved(item.id));
    window.addEventListener('storage', sync);
    const id = setInterval(sync, 1200);
    return () => {
      window.removeEventListener('storage', sync);
      clearInterval(id);
    };
  }, [item.id]);

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nowSaved = library.toggleSave(item);
    setSaved(nowSaved);
  };

  const Icon = saved ? BookmarkCheck : Bookmark;

  return (
    <button
      type="button"
      onClick={toggle}
      title={saved ? 'Remove from library' : 'Save to library'}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] transition-colors',
        saved
          ? 'border-[var(--qp-accent)]/60 bg-[var(--qp-accent)]/12 text-[#d6f3ff]'
          : 'border-[var(--qp-accent)]/15 text-[#8fa8c2] hover:border-[var(--qp-accent)]/40 hover:text-[#f0f6ff]',
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {label && <span>{saved ? 'Saved' : 'Save'}</span>}
    </button>
  );
}