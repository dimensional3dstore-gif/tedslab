import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight } from 'lucide-react';
import QuantumVisual from '@/components/quantum/QuantumVisual';
import SaveButton from '@/components/common/SaveButton';
import { cn } from '@/lib/utils';

export default function ArticleCard({ article, compact = false, className }) {
  const item = {
    id: `article:${article.slug}`,
    type: 'Article',
    title: article.title,
    subtitle: article.subtitle,
    to: `/articles/${article.slug}`
  };

  return (
    <Link
      to={`/articles/${article.slug}`}
      className={cn('qp-panel qp-hover group flex flex-col overflow-hidden', className)}
    >
      <div className={cn('relative overflow-hidden border-b border-[var(--qp-accent)]/10', compact ? 'h-24' : 'h-32')}>
        <QuantumVisual variant={article.hero} className="h-full w-full opacity-90 transition-transform duration-700 group-hover:scale-[1.04]" />
        <span className="absolute left-2.5 top-2.5 rounded-full border border-[var(--qp-accent)]/25 bg-[#061225]/75 px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-[#9fd8ff] backdrop-blur">
          {article.type}
        </span>
        <div className="absolute right-2.5 top-2">
          <SaveButton item={item} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <p className="qp-label">{article.category}</p>
        <h3 className="mt-1.5 text-[13.5px] font-semibold leading-snug text-[#f0f6ff] transition-colors group-hover:text-[#bfe6ff]">
          {article.title}
        </h3>
        {!compact && <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-relaxed text-[#8fa8c2]">{article.subtitle}</p>}
        <div className="mt-auto flex items-center justify-between pt-3 text-[10px] text-[#6f88a3]">
          <span className="flex items-center gap-1">
            <Clock className="h-2.5 w-2.5" /> {article.readingTime} min · {article.difficulty}
          </span>
          <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </div>
    </Link>
  );
}