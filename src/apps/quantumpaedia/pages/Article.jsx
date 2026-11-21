import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Share2,
  Quote,
  Clock,
  BadgeCheck,
  BookOpen,
  ListTree,
  Sigma,
  Users,
  Sparkles,
} from 'lucide-react';
import QuantumVisual from '@/components/quantum/QuantumVisual';
import SaveButton from '@/components/common/SaveButton';
import ArticleCard from '@/components/common/ArticleCard';
import ArticleBody from '@/components/article/ArticleBody';
import EquationBlock from '@/components/article/EquationBlock';
import CitationDialog from '@/components/article/CitationDialog';
import { Panel, Chip } from '@/components/common/Kit';
import { articleBySlug, articleGroups } from '@/data/articles';
import { equationById } from '@/data/equations';
import { library, useLibrary } from '@/lib/library';
import { cn } from '@/lib/utils';

export default function Article() {
  const { slug } = useParams();
  const article = articleBySlug(slug);
  const { settings, saved } = useLibrary();
  const [tab, setTab] = useState('overview');
  const [citeOpen, setCiteOpen] = useState(false);
  const [shareMsg, setShareMsg] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTab('overview');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  useEffect(() => {
    if (!article) return;
    library.recordView({
      id: `article:${article.slug}`,
      title: article.title,
      type: 'Article',
      to: `/articles/${article.slug}`
    });
  }, [article]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, Math.round((h.scrollTop / max) * 100)) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  useEffect(() => {
    if (!article) {
      const meta = document.createElement('meta');
      meta.name = 'prerender-status-code';
      meta.content = '404';
      document.head.appendChild(meta);
      return () => meta.remove();
    }
  }, [article]);

  const learningMode = settings.readingMode === 'learning';

  const tabs = useMemo(() => {
    if (!article) return [];
    const groups = articleGroups
      .filter((g) => article.sections.some((s) => s.group === g.key))
      .map((g) => ({ key: g.key, label: g.label }));
    return [...groups, { key: 'references', label: 'References' }, { key: 'related', label: 'Related topics' }];
  }, [article]);

  if (!article) {
    return (
      <Panel className="p-10 text-center">
        <p className="text-[13px] text-[#a8bcd3]">This article is not in the index.</p>
        <Link to="/explore" className="mt-3 inline-block text-[11px] text-[var(--qp-accent)] hover:underline">
          Browse the article explorer
        </Link>
      </Panel>
    );
  }

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: article.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShareMsg('Link copied');
        setTimeout(() => setShareMsg(''), 1800);
      }
    } catch {
      setShareMsg('Copy the address bar link');
      setTimeout(() => setShareMsg(''), 1800);
    }
  };

  const related = article.related.map(articleBySlug).filter(Boolean);
  const equations = (article.equations || []).map(equationById).filter(Boolean);
  const currentSections = article.sections.filter((s) => s.group === tab);

  return (
    <div className="space-y-5">
      <div className="sticky top-14 z-20 -mx-3 h-[2px] bg-transparent sm:-mx-5">
        <div className="h-full bg-gradient-to-r from-[var(--qp-accent)] to-[var(--qp-accent)] transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link to="/explore" className="inline-flex items-center gap-1.5 text-[11px] text-[#8fa8c2] hover:text-[var(--qp-accent)]">
          <ArrowLeft className="h-3 w-3" /> Article explorer
        </Link>
        <div className="flex items-center gap-1.5">
          {shareMsg && <span className="text-[10px] text-[var(--qp-accent)]">{shareMsg}</span>}
          <SaveButton
            item={{ id: `article:${article.slug}`, type: 'Article', title: article.title, subtitle: article.subtitle, to: `/articles/${article.slug}` }}
            label
          />
          <button type="button" onClick={share} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--qp-accent)]/15 px-2.5 py-1 text-[10.5px] text-[#8fa8c2] hover:border-[var(--qp-accent)]/40 hover:text-[#f0f6ff]">
            <Share2 className="h-3 w-3" /> Share
          </button>
          <button type="button" onClick={() => setCiteOpen(true)} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--qp-accent)]/15 px-2.5 py-1 text-[10.5px] text-[#8fa8c2] hover:border-[var(--qp-accent)]/40 hover:text-[#f0f6ff]">
            <Quote className="h-3 w-3" /> Cite
          </button>
        </div>
      </div>

      <header className="relative overflow-hidden rounded-2xl border border-[var(--qp-accent)]/15">
        <div className="absolute inset-0">
          <QuantumVisual variant={article.hero} className="h-full w-full" animate={false} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061225] via-[#061225]/90 to-[#061225]/45" />
        </div>
        <div className="relative px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-wrap items-center gap-2">
            <Link to={`/knowledge/${article.categorySlug}`} className="rounded-full border border-[var(--qp-accent)]/30 bg-[#061225]/70 px-2.5 py-0.5 text-[9.5px] uppercase tracking-[0.16em] text-[#9fd8ff] hover:border-[var(--qp-accent)]/60">
              {article.category}
            </Link>
            <span className="rounded-full border border-[var(--qp-accent)]/30 bg-[var(--qp-accent)]/10 px-2.5 py-0.5 text-[9.5px] uppercase tracking-[0.16em] text-[#d9c8ff]">
              {article.type}
            </span>
            <span className="flex items-center gap-1 text-[9.5px] uppercase tracking-[0.16em] text-[#7f9bb7]">
              <BadgeCheck className="h-3 w-3 text-[#4ade80]" /> {article.status}
            </span>
          </div>
          <h1 className="mt-3 max-w-3xl text-[26px] font-semibold leading-tight tracking-tight text-[#f0f6ff] sm:text-[34px]">
            {article.title}
          </h1>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[#a8bcd3] sm:text-[14px]">{article.subtitle}</p>
          <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10.5px] text-[#7088a5]">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readingTime} min read</span>
            <span className="mono">{article.difficulty}</span>
            <span>{article.author}</span>
            <span className="mono">Updated {article.updated}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {article.tags.map((t) => (
              <Chip key={t} as="span" className="text-[9.5px]">{t}</Chip>
            ))}
          </div>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-1.5 border-b border-[var(--qp-accent)]/10 pb-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              'rounded-t-md px-3 py-1.5 text-[11.5px] transition-colors',
              tab === t.key
                ? 'bg-[var(--qp-accent)]/10 text-[#d6f3ff] shadow-[inset_0_-2px_0_0_var(--qp-accent)]'
                : 'text-[#8fa8c2] hover:text-[#f0f6ff]'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-5">
          {tab === 'references' ? (
            <Panel className="p-4 sm:p-5">
              <h2 className="text-[15px] font-semibold text-[#f0f6ff]">References</h2>
              <p className="mt-1 text-[11px] text-[#7088a5]">
                Primary literature for this entry. DOIs link to the publisher record; no citation is listed without a
                verifiable source.
              </p>
              <ol className="mt-3 space-y-2.5">
                {article.references.map((r, i) => (
                  <li key={r.title} className="flex gap-2.5 rounded-lg border border-[var(--qp-accent)]/10 bg-[#091b32]/50 p-3">
                    <span className="mono text-[10px] text-[var(--qp-accent)]/70">[{i + 1}]</span>
                    <div className="min-w-0">
                      <p className="text-[11.5px] leading-relaxed text-[#dbe9f7]">{r.title}</p>
                      <p className="mt-1 text-[10.5px] text-[#8fa8c2]">{r.authors} · {r.journal} ({r.year})</p>
                      {r.doi ? (
                        <a
                          href={`https://doi.org/${r.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mono mt-1 inline-block text-[10px] text-[var(--qp-accent)] hover:underline"
                        >
                          doi:{r.doi}
                        </a>
                      ) : (
                        <span className="mono mt-1 inline-block text-[10px] text-[#5f7893]">No DOI registered</span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </Panel>
          ) : tab === 'related' ? (
            <div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} compact />
                ))}
              </div>
              <Panel className="mt-4 p-4">
                <p className="qp-label mb-2">Further reading</p>
                <ul className="space-y-1.5">
                  {article.references.slice(0, 3).map((r) => (
                    <li key={r.title} className="text-[11.5px] leading-relaxed text-[#a8bcd3]">
                      {r.authors} — <span className="text-[#dbe9f7]">{r.title}</span>, {r.journal} ({r.year})
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[10px] text-[#5f7893]">
                  Revision history: this entry was last reviewed on {article.updated}. Suggested improvements can be recorded
                  as research notes in the Research Centre.
                </p>
              </Panel>
            </div>
          ) : (
            <Panel className="p-4 sm:p-6">
              {learningMode && tab === 'overview' && article.glossary?.length > 0 && (
                <div className="mb-5 rounded-xl border border-[var(--qp-accent)]/25 bg-[var(--qp-accent)]/8 p-3.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-[#c9b2ff]" />
                    <p className="qp-label text-[#b79bff]">Learning mode · glossary</p>
                  </div>
                  <dl className="mt-2 grid gap-2 sm:grid-cols-2">
                    {article.glossary.map((g) => (
                      <div key={g.term}>
                        <dt className="text-[11.5px] font-medium text-[#e6dcff]">{g.term}</dt>
                        <dd className="text-[10.5px] leading-relaxed text-[#b3a8cf]">{g.definition}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              <ArticleBody article={article} group={tab} learningMode={learningMode} />
            </Panel>
          )}

          {tab !== 'references' && tab !== 'related' && (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--qp-accent)]/10 bg-[#091b32]/50 px-3.5 py-2.5">
              <p className="text-[10.5px] text-[#7088a5]">
                {learningMode ? 'Learning mode is on — key ideas are shown inline.' : 'Standard encyclopaedic mode.'}
              </p>
              <Link to="/settings" className="text-[10px] uppercase tracking-[0.16em] text-[var(--qp-accent)] hover:underline">
                Change reading mode
              </Link>
            </div>
          )}
        </div>

        <aside className="space-y-3.5 xl:sticky xl:top-[76px] xl:self-start">
          <Panel className="p-3.5">
            <div className="flex items-center gap-2">
              <ListTree className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
              <p className="qp-label">Contents</p>
            </div>
            <div className="mt-2 space-y-1">
              {currentSections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex gap-2 rounded-md px-2 py-1 text-[11px] text-[#a8bcd3] transition-colors hover:bg-[#102b4b]/60 hover:text-[#f0f6ff]"
                >
                  <span className="mono text-[9.5px] text-[#4f6b88]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="leading-snug">{s.title}</span>
                </a>
              ))}
              {(tab === 'references' || tab === 'related') && (
                <p className="px-2 text-[11px] text-[#7088a5]">Switch to a content tab for the section list.</p>
              )}
            </div>
          </Panel>

          <Panel className="p-3.5">
            <div className="flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
              <p className="qp-label">Quick facts</p>
            </div>
            <dl className="mt-2.5 space-y-2">
              {article.quickFacts.map((f) => (
                <div key={f.label} className="flex items-start justify-between gap-3">
                  <dt className="text-[10.5px] text-[#7f9bb7]">{f.label}</dt>
                  <dd className="mono text-right text-[10.5px] text-[#d6e9f8]">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="qp-hairline my-2.5" />
            <div className="flex items-center justify-between text-[10.5px]">
              <span className="text-[#7f9bb7]">In your library</span>
              <span className="text-[#d6e9f8]">{saved.some((s) => s.id === `article:${article.slug}`) ? 'Saved' : 'Not saved'}</span>
            </div>
          </Panel>

          {equations.length > 0 && (
            <Panel className="p-3.5">
              <div className="flex items-center gap-2">
                <Sigma className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
                <p className="qp-label">Important equations</p>
              </div>
              <div className="mt-2 space-y-2">
                {equations.slice(0, 2).map((eq) => (
                  <EquationBlock key={eq.id} equation={eq} compact />
                ))}
              </div>
              {equations.length > 2 && (
                <button
                  type="button"
                  onClick={() => setTab('mathematics')}
                  className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[var(--qp-accent)] hover:underline"
                >
                  View all {equations.length} equations
                </button>
              )}
            </Panel>
          )}

          <Panel className="p-3.5">
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
              <p className="qp-label">Related concepts</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {article.tags.map((t) => (
                <Chip key={t} as="span" className="text-[9.5px]">{t}</Chip>
              ))}
            </div>
            <div className="qp-hairline my-2.5" />
            <p className="qp-label mb-1.5">Classification</p>
            <dl className="space-y-1.5 text-[10.5px]">
              <div className="flex justify-between"><dt className="text-[#7f9bb7]">Field</dt><dd className="text-[#d6e9f8]">{article.category}</dd></div>
              <div className="flex justify-between"><dt className="text-[#7f9bb7]">Entry type</dt><dd className="text-[#d6e9f8]">{article.type}</dd></div>
              <div className="flex justify-between"><dt className="text-[#7f9bb7]">Level</dt><dd className="text-[#d6e9f8]">{article.difficulty}</dd></div>
              <div className="flex justify-between"><dt className="text-[#7f9bb7]">Status</dt><dd className="text-[#4ade80]">{article.status}</dd></div>
            </dl>
          </Panel>

          <Panel className="p-3.5">
            <p className="qp-label mb-2">Related articles</p>
            <div className="space-y-1.5">
              {related.map((a) => (
                <Link key={a.slug} to={`/articles/${a.slug}`} className="block truncate text-[11.5px] text-[#c3d6e8] hover:text-[var(--qp-accent)]">
                  {a.title}
                </Link>
              ))}
            </div>
          </Panel>
        </aside>
      </div>

      {citeOpen && <CitationDialog article={article} onClose={() => setCiteOpen(false)} />}
    </div>
  );
}