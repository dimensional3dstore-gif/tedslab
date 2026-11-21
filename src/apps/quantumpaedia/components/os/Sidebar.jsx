import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { X, Atom, BookOpen, ArrowUpRight } from 'lucide-react';
import { sidebarSections } from '@/nav';
import { cn } from '@/lib/utils';

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-[#03101f]/70 backdrop-blur-sm lg:hidden" onClick={onClose} />}
      <aside
        className={cn(
          'fixed bottom-0 left-0 top-14 z-40 w-[248px] border-r border-[var(--qp-accent)]/10 bg-[#061225]/92 backdrop-blur-xl transition-transform duration-300',
          'lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="qp-scroll flex-1 overflow-y-auto px-3 pb-4 pt-4">
          <div className="mb-3 flex items-center justify-between lg:hidden">
            <span className="qp-label">Navigation</span>
            <button type="button" onClick={onClose} className="rounded p-1 text-[#a8bcd3] hover:text-[#f0f6ff]" aria-label="Close navigation">
              <X className="h-4 w-4" />
            </button>
          </div>

          {sidebarSections.map((section) => (
            <div key={section.title} className="mb-5">
              <p className="qp-label px-2 pb-2">{section.title}</p>
              <nav className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={onClose}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'group flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[12.5px] transition-colors',
                          isActive
                            ? 'bg-[var(--qp-accent)]/12 text-[#e8f6ff] shadow-[inset_0_0_0_1px_rgba(35,200,255,0.18)]'
                            : 'text-[#a8bcd3] hover:bg-[#102b4b]/50 hover:text-[#f0f6ff]'
                        )
                      }
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" strokeWidth={1.7} />
                      <span className="truncate">{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
          </div>

          <div className="shrink-0 border-t border-[var(--qp-accent)]/10 px-3 pb-16 pt-3">
            <div className="relative overflow-hidden rounded-xl border border-[var(--qp-accent)]/25 bg-[linear-gradient(150deg,rgba(154,101,255,0.18),rgba(35,200,255,0.08))] p-3.5">
              <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[var(--qp-accent)]/20 blur-2xl" />
              <BookOpen className="h-4 w-4 text-[#c9b2ff]" strokeWidth={1.6} />
              <p className="mt-2 text-[12px] font-medium leading-snug text-[#eae4ff]">Explore the Quantum World</p>
              <p className="mt-1 text-[10.5px] leading-relaxed text-[#a8bcd3]">
                Seven interactive simulations, 12 disciplines and a curated research index.
              </p>
              <Link
                to="/laboratory"
                onClick={onClose}
                className="mt-2.5 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-[#c9b2ff] hover:text-[#e9e1ff]"
              >
                Enter laboratory <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="mt-3 flex items-center gap-2 px-1 text-[9.5px] uppercase tracking-[0.18em] text-[#4f6b88]">
              <Atom className="h-3 w-3" /> Quantum Knowledge System
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}