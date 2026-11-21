import React from 'react';
import { Quote, Lightbulb } from 'lucide-react';
import QuantumVisual from '@/components/quantum/QuantumVisual';
import EquationBlock from '@/components/article/EquationBlock';
import { equationById } from '@/data/equations';

export default function ArticleBody({ article, group, learningMode }) {
  const sections = article.sections.filter((s) => s.group === group);
  const equations = (article.equations || []).map(equationById).filter(Boolean);

  if (sections.length === 0 && !(group === 'mathematics' && equations.length)) {
    return (
      <p className="rounded-lg border border-dashed border-[var(--qp-accent)]/15 px-4 py-8 text-center text-[12px] text-[#7088a5]">
        This article does not contain a {group} section. Additional material is listed under the available tabs.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <section key={section.id} id={section.id} className="scroll-mt-24">
          <div className="mb-2 flex items-baseline gap-2.5">
            <span className="mono text-[10px] text-[var(--qp-accent)]/60">{String(index + 1).padStart(2, '0')}</span>
            <h2 className="text-[17px] font-semibold leading-snug text-[#f0f6ff] sm:text-[19px]">{section.title}</h2>
          </div>

          {section.paragraphs?.map((p, i) => (
            <p key={i} className="mt-2.5 text-[13px] leading-[1.85] text-[#b6c8dc]">
              {p}
            </p>
          ))}

          {section.visual && (
            <figure className="mt-4 overflow-hidden rounded-xl border border-[var(--qp-accent)]/12">
              <QuantumVisual variant={section.visual.variant} className="h-44 w-full sm:h-52" />
              <figcaption className="border-t border-[var(--qp-accent)]/10 bg-[#091b32]/60 px-3.5 py-2 text-[10.5px] leading-relaxed text-[#8fa8c2]">
                <span className="text-[var(--qp-accent)]">Figure · </span>
                {section.visual.caption}
              </figcaption>
            </figure>
          )}

          {section.keyIdea && learningMode && (
            <div className="mt-3.5 flex gap-2.5 rounded-lg border border-[var(--qp-accent)]/25 bg-[var(--qp-accent)]/8 px-3.5 py-2.5">
              <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c9b2ff]" />
              <div>
                <p className="qp-label mb-0.5 text-[#b79bff]">Key idea</p>
                <p className="text-[11.5px] leading-relaxed text-[#dcd2f7]">{section.keyIdea}</p>
              </div>
            </div>
          )}

          {section.timeline && (
            <ol className="mt-4 space-y-0 border-l border-[var(--qp-accent)]/20 pl-4">
              {section.timeline.map((t) => (
                <li key={t.year + t.text} className="relative pb-3.5 last:pb-0">
                  <span className="absolute -left-[21px] top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--qp-accent)]" />
                  <span className="mono text-[10px] text-[var(--qp-accent)]">{t.year}</span>
                  <p className="mt-0.5 text-[11.5px] leading-relaxed text-[#a8bcd3]">{t.text}</p>
                </li>
              ))}
            </ol>
          )}

          {section.equations && group !== 'mathematics' && (
            <div className="mt-3.5 space-y-2">
              {section.equations
                .map(equationById)
                .filter(Boolean)
                .map((eq) => (
                  <EquationBlock key={eq.id} equation={eq} compact />
                ))}
            </div>
          )}
        </section>
      ))}

      {group === 'mathematics' && equations.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <Quote className="h-3.5 w-3.5 text-[var(--qp-accent)]" />
            <h2 className="text-[15px] font-semibold text-[#f0f6ff]">Mathematical formulation</h2>
          </div>
          <p className="text-[11.5px] leading-relaxed text-[#8fa8c2]">
            Each expression below is rendered with KaTeX. Expand an entry to read the symbol definitions, physical
            interpretation and the conditions under which the relation holds.
          </p>
          {equations.map((eq) => (
            <EquationBlock key={eq.id} equation={eq} compact />
          ))}
        </div>
      )}
    </div>
  );
}