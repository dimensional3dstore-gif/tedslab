import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import { AppShell } from "@/components/biopedia/AppShell";
import { QuantumPediaShell, QPPanel } from "@/components/quantumpedia/QuantumPediaShell";
import { QUANTUMPEDIA_ARTICLES } from "@/data/quantumpedia";

export const Route = createFileRoute("/quantumpedia/articles/$slug")({
  component: QuantumPediaArticlePage,
});

function QuantumPediaArticlePage() {
  const { slug } = Route.useParams();
  const article = QUANTUMPEDIA_ARTICLES.find((item) => item.slug === slug);
  if (!article) throw notFound();

  let body: {
    facts?: { label: string; value: string }[];
    overview?: string[];
    sections?: { heading: string; paragraphs?: string[]; cards?: { title: string; text: string }[] }[];
    references?: string[];
  } = {};
  try {
    body = JSON.parse(article.body ?? "{}");
  } catch {
    body = {};
  }

  return (
    <AppShell>
      <QuantumPediaShell section="concepts" onSectionChange={() => undefined}>
        <div className="mx-auto max-w-5xl space-y-5">
          <Link to="/quantumpedia" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#7088a5] hover:text-[#39d98a]">
            <ArrowLeft className="h-3 w-3" /> QuantumPedia
          </Link>

          <header className="relative overflow-hidden rounded-2xl border bg-[linear-gradient(140deg,rgba(16,43,75,.78),rgba(8,22,40,.95))] px-5 py-7 sm:px-8" style={{ borderColor: "#39d98a22" }}>
            <div className="pointer-events-none absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(#39d98a0b 1px,transparent 1px),linear-gradient(90deg,#39d98a0b 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
            <div className="relative">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#39d98a" }}>QuantumPedia · {article.topic_slug?.replaceAll("-", " ")}</p>
              <h1 className="mt-3 max-w-4xl text-[25px] font-semibold leading-tight tracking-tight text-[#f0f6ff] sm:text-[34px]">{article.title}</h1>
              <p className="mt-3 max-w-3xl text-[13px] leading-7 text-[#a8bcd3]">{article.excerpt}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-[#a8bcd3]" style={{ borderColor: "#39d98a25" }}>{article.minutes} min read</span>
                <span className="rounded-full border px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-[#a8bcd3]" style={{ borderColor: "#39d98a25" }}>QuantumPedia source context</span>
                <Link to="/articles/$slug" params={{ slug: article.slug }} className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] hover:text-[#f0f6ff]" style={{ borderColor: "#39d98a25", color: "#39d98a" }}>
                  Open in Ted's Lab <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </header>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px]">
            <article className="space-y-5">
              <QPPanel className="p-5 sm:p-7">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" style={{ color: "#39d98a" }} />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#39d98a" }}>Overview</p>
                </div>
                {(body.overview ?? [article.excerpt]).map((paragraph, index) => (
                  <p key={index} className="mt-3 text-[13px] leading-[1.9] text-[#b6c8dc]">{paragraph}</p>
                ))}
              </QPPanel>

              {(body.sections ?? []).map((section, index) => (
                <QPPanel key={section.heading} className="p-5 sm:p-7">
                  <div className="mb-3 flex items-baseline gap-2.5">
                    <span className="font-mono text-[10px]" style={{ color: "#39d98a99" }}>{String(index + 1).padStart(2, "0")}</span>
                    <h2 className="text-[17px] font-semibold leading-snug text-[#f0f6ff] sm:text-[20px]">{section.heading}</h2>
                  </div>
                  {(section.paragraphs ?? []).map((paragraph, i) => (
                    <p key={i} className="mt-3 text-[13px] leading-[1.9] text-[#b6c8dc]">{paragraph}</p>
                  ))}
                  {section.cards?.length ? (
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {section.cards.map((card) => (
                        <div key={card.title} className="rounded-lg border bg-[#091b32]/60 p-3.5" style={{ borderColor: "#39d98a18" }}>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#39d98a" }}>{card.title}</p>
                          <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#8fa8c2]">{card.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </QPPanel>
              ))}

              {body.references?.length ? (
                <QPPanel className="p-5 sm:p-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#39d98a" }}>Source context</p>
                  {body.references.map((reference) => (
                    <p key={reference} className="mt-3 text-[11px] leading-relaxed text-[#8fa8c2]">{reference}</p>
                  ))}
                </QPPanel>
              ) : null}
            </article>

            <aside className="space-y-3">
              <QPPanel className="p-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#39d98a" }}>Article details</p>
                <dl className="mt-3 space-y-2 text-[10.5px]">
                  {(body.facts ?? []).map((fact) => (
                    <div key={fact.label} className="border-b border-white/5 pb-2 last:border-0">
                      <dt className="text-[#4f6b88]">{fact.label}</dt>
                      <dd className="mt-0.5 text-[#b6c8dc]">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </QPPanel>
              <QPPanel className="p-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#39d98a" }}>Study path</p>
                <p className="mt-2 text-[10.5px] leading-relaxed text-[#8fa8c2]">Read the source-context article here, then open the same article in Ted's Lab for the standard application article experience.</p>
                <Link to="/articles/$slug" params={{ slug: article.slug }} className="mt-3 inline-flex text-[10px] font-semibold" style={{ color: "#39d98a" }}>Continue in Ted's Lab →</Link>
              </QPPanel>
            </aside>
          </div>
        </div>
      </QuantumPediaShell>
    </AppShell>
  );
}
