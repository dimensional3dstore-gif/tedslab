import React from 'react';
import { NavLink } from 'react-router-dom';
import { dockItems } from '@/nav';
import { cn } from '@/lib/utils';

export default function Dock() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-30 flex justify-center px-3">
      <div className="pointer-events-auto flex items-end gap-1 rounded-2xl border border-[var(--qp-accent)]/18 bg-[#071527]/80 px-2.5 py-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
        {dockItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'group relative flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200',
                  isActive
                    ? 'border-[var(--qp-accent)]/60 bg-[var(--qp-accent)]/15 text-[#dff4ff]'
                    : 'border-transparent text-[#8fa8c2] hover:-translate-y-1 hover:border-[var(--qp-accent)]/30 hover:bg-[#102b4b]/70 hover:text-[#f0f6ff]'
                )
              }
              aria-label={item.label}
            >
              <Icon className="h-4 w-4" strokeWidth={1.7} />
              <span className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md border border-[var(--qp-accent)]/20 bg-[#0b203b] px-2 py-1 text-[10px] text-[#dbe9f7] opacity-0 transition-opacity group-hover:opacity-100">
                {item.label}
              </span>
              <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-[var(--qp-accent)] opacity-0 transition-opacity group-[.active]:opacity-100" />
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}