import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopBar from '@/components/os/TopBar';
import { Sidebar as TedLabSidebar } from "@/components/biopedia/Sidebar";
import Dock from '@/components/os/Dock';
import CommandSearch from '@/components/os/CommandSearch';
import { useLibrary } from '@/lib/library';

export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const { settings } = useLibrary();

  useEffect(() => {
    setNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setQuery('');
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--qp-cyan', settings.accent === 'violet' ? 'var(--qp-accent)' : 'var(--qp-accent)');
  }, [settings.accent]);

  return (
    <div className="quantumpaedia-root min-h-screen">
      <TopBar
        onMenu={() => setNavOpen((v) => !v)}
        onSearch={(q) => { setQuery(q || ''); setSearchOpen(true); }}
      />
      <TedLabSidebar mobileOpen={navOpen} onCloseMobile={() => setNavOpen(false)} />
      <main className="pt-14 lg:pl-[248px]">
        <div className="mx-auto max-w-[1440px] px-3 pb-32 pt-5 sm:px-5 sm:pt-6">
          <Outlet context={{ openSearch: (q) => { setQuery(q || ''); setSearchOpen(true); } }} />
        </div>
      </main>
      <Dock />
      <CommandSearch open={searchOpen} initialQuery={query} onClose={() => setSearchOpen(false)} />
    </div>
  );
}