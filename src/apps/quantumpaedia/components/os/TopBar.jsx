import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Atom, Bell, ChevronDown, Menu as MenuIcon, Circle, User, Settings, Bookmark, Sparkles } from 'lucide-react';
import { topMenus } from '@/nav';
import { cn } from '@/lib/utils';
import TopBarSearch from '@/components/os/TopBarSearch';

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function MenuDropdown({ menu, onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md px-2 py-1.5 text-[11.5px] tracking-wide transition-colors',
          open ? 'bg-[var(--qp-accent)]/10 text-[#d9f3ff]' : 'text-[#a8bcd3] hover:text-[#f0f6ff]'
        )}
      >
        {menu.label}
        <ChevronDown className={cn('h-3 w-3 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="qp-panel-solid absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden p-1.5">
          <Link
            to={menu.to}
            onClick={() => { setOpen(false); onNavigate?.(); }}
            className="block rounded-md px-2.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[#7088a5] hover:bg-[#102b4b]/60"
          >
            Overview
          </Link>
          <div className="qp-hairline my-1" />
          <div className="max-h-[52vh] overflow-y-auto qp-scroll">
            {menu.items.map((item) => (
              <Link
                key={item.to + item.label}
                to={item.to}
                onClick={() => { setOpen(false); onNavigate?.(); }}
                className="block rounded-md px-2.5 py-1.5 text-[12px] text-[#c3d6e8] transition-colors hover:bg-[var(--qp-accent)]/10 hover:text-[#f0f6ff]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TopBar({ onSearch, onMenu }) {
  const now = useClock();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-[var(--qp-accent)]/12 bg-[#061225]/92 backdrop-blur-xl">
      <div className="flex h-full items-center gap-2 px-3 sm:px-4">
        <button
          type="button"
          onClick={onMenu}
          className="rounded-md p-1.5 text-[#a8bcd3] transition-colors hover:bg-[#102b4b]/70 hover:text-[#f0f6ff] lg:hidden"
          aria-label="Open navigation"
        >
          <MenuIcon className="h-4 w-4" />
        </button>

        <Link to="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--qp-accent)]/35 bg-[#0b203b]">
            <Atom className="h-4 w-4 text-[var(--qp-accent)] qp-spin-slow" strokeWidth={1.6} />
            <span className="absolute inset-0 rounded-lg bg-[var(--qp-accent)]/10 blur-md" />
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-[13px] font-semibold tracking-[0.14em] text-[#f0f6ff]">QUANTUMPAEDIA</span>
            <span className="mt-1 text-[8px] uppercase tracking-[0.28em] text-[#7088a5]">ChronosOS · OMNI</span>
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-0.5 lg:flex">
          {topMenus.map((menu) => (
            <MenuDropdown key={menu.label} menu={menu} />
          ))}
          <Link
            to="/assistant"
            className="rounded-md px-2.5 py-1.5 text-[12px] text-[#a8bcd3] transition-colors hover:text-[#f0f6ff]"
          >
            AI Assistant
          </Link>
        </nav>

        <div className="flex flex-1 justify-center px-1 sm:px-3">
          <TopBarSearch onSearch={onSearch} />
        </div>

        <div className="flex items-center gap-1">
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen((v) => !v)}
              className="relative rounded-md p-1.5 text-[#a8bcd3] transition-colors hover:bg-[#102b4b]/70 hover:text-[#f0f6ff]"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[var(--qp-accent)] qp-blink" />
            </button>
            {notifOpen && (
              <div className="qp-panel-solid absolute right-0 top-full z-50 mt-2 w-72 p-3">
                <p className="qp-label mb-2">System notices</p>
                <div className="space-y-2">
                  {[
                    { title: 'Library synced', text: 'Saved articles, notes and collections are up to date on this device.' },
                    { title: 'Publication indexed', text: 'Loophole-free Bell inequality violation (2015) is now in the research index.' },
                    { title: 'Laboratory ready', text: 'Seven simulation modules are available in the Simulation Centre.' }
                  ].map((n) => (
                    <div key={n.title} className="rounded-md border border-[var(--qp-accent)]/10 bg-[#091b32]/70 p-2">
                      <p className="text-[11px] font-medium text-[#dbe9f7]">{n.title}</p>
                      <p className="mt-0.5 text-[10px] leading-relaxed text-[#7088a5]">{n.text}</p>
                    </div>
                  ))}
                </div>
                <Link
                  to="/timeline"
                  onClick={() => setNotifOpen(false)}
                  className="mt-2 block text-[10px] uppercase tracking-[0.18em] text-[var(--qp-accent)] hover:underline"
                >
                  Open discovery timeline
                </Link>
              </div>
            )}
          </div>

          <div className="hidden items-center gap-2 pl-2 lg:flex">
            <span className="hidden items-center gap-1.5 text-[10px] text-[#7088a5] xl:flex">
              <Circle className="h-1.5 w-1.5 fill-[#4ade80] text-[#4ade80]" /> Online
            </span>
            <span className="mono text-[10px] text-[#7088a5]">
              {now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} ·{' '}
              {now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div className="group relative pl-1">
            <button
              type="button"
              onClick={() => navigate('/settings')}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--qp-accent)]/30 bg-[#102b4b] text-[#bfe6ff] transition-colors hover:border-[var(--qp-accent)]/60"
              aria-label="Profile and settings"
            >
              <User className="h-3.5 w-3.5" />
            </button>
            <div className="qp-panel-solid invisible absolute right-0 top-full z-50 mt-2 w-44 p-1.5 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
              <Link to="/collections" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-[#a8bcd3] hover:bg-[var(--qp-accent)]/10 hover:text-[#f0f6ff]">
                <Bookmark className="h-3 w-3" /> My library
              </Link>
              <Link to="/assistant" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-[#a8bcd3] hover:bg-[var(--qp-accent)]/10 hover:text-[#f0f6ff]">
                <Sparkles className="h-3 w-3" /> Quantum AI
              </Link>
              <Link to="/settings" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-[#a8bcd3] hover:bg-[var(--qp-accent)]/10 hover:text-[#f0f6ff]">
                <Settings className="h-3 w-3" /> Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
      <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[var(--qp-accent)]/40 to-transparent" />
    </header>
  );
}