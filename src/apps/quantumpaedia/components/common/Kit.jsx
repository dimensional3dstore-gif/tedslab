import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Panel({ className, children, soft = false, ...rest }) {
  return (
    <div className={cn(soft ? 'qp-panel-soft' : 'qp-panel', className)} {...rest}>
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, description, action, className }) {
  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-4', className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="qp-label mb-2">{eyebrow}</p>}
        <h2 className="text-xl font-semibold tracking-tight text-[#f0f6ff] sm:text-[22px]">{title}</h2>
        {description && <p className="mt-1.5 text-[13px] leading-relaxed text-[#a8bcd3]">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Chip({ children, active = false, onClick, className, as = 'button', ...rest }) {
  const base = cn(
    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] tracking-wide transition-colors',
    active
      ? 'border-[var(--qp-accent)]/60 bg-[var(--qp-accent)]/12 text-[#d6f3ff]'
      : 'border-[var(--qp-accent)]/15 bg-[#0b203b]/60 text-[#a8bcd3] hover:border-[var(--qp-accent)]/40 hover:text-[#f0f6ff]',
    onClick && 'cursor-pointer',
    className
  );
  if (as === 'span') return <span className={base} {...rest}>{children}</span>;
  return (
    <button type="button" onClick={onClick} className={base} {...rest}>
      {children}
    </button>
  );
}

export function Stat({ label, value, hint }) {
  return (
    <div className="rounded-lg border border-[var(--qp-accent)]/12 bg-[#091b32]/60 px-3 py-2.5">
      <p className="qp-label">{label}</p>
      <p className="mono mt-1.5 text-[15px] text-[#e6f2ff]">{value}</p>
      {hint && <p className="mt-0.5 text-[10px] text-[#7088a5]">{hint}</p>}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--qp-accent)]/18 bg-[#091b32]/40 px-6 py-12 text-center">
      {Icon && <Icon className="mb-3 h-6 w-6 text-[var(--qp-accent)]/60" strokeWidth={1.5} />}
      <p className="text-[13px] font-medium text-[#dbe9f7]">{title}</p>
      {description && <p className="mt-1 max-w-sm text-[12px] leading-relaxed text-[#7088a5]">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function PageHeader({ kicker, title, description, actions, meta }) {
  return (
    <header className="qp-fade-up relative overflow-hidden rounded-2xl border border-[var(--qp-accent)]/12 bg-[linear-gradient(140deg,rgba(16,43,75,0.72),rgba(8,22,40,0.9))] px-5 py-6 sm:px-7 sm:py-7">
      <div className="pointer-events-none absolute inset-0 qp-grid-bg opacity-60" />
      <div className="relative flex flex-wrap items-start justify-between gap-5">
        <div className="max-w-2xl">
          {kicker && <p className="qp-label mb-2.5">{kicker}</p>}
          <h1 className="text-[26px] font-semibold leading-tight tracking-tight text-[#f0f6ff] sm:text-[32px]">{title}</h1>
          {description && <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-[#a8bcd3] sm:text-sm">{description}</p>}
          {meta && <div className="mt-4 flex flex-wrap items-center gap-3">{meta}</div>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}

export function LinkCard({ to, className, children }) {
  return (
    <Link to={to} className={cn('qp-panel qp-hover group block overflow-hidden', className)}>
      {children}
    </Link>
  );
}

export function Divider({ className }) {
  return <div className={cn('qp-hairline my-6', className)} />;
}