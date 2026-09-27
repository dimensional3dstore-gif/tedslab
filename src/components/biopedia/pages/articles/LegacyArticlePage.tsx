import { AppShell } from "@/components/biopedia/AppShell";

export function LegacyArticlePage({
  title,
  subject,
  summary,
  sections,
}: {
  title: string;
  subject: string;
  summary: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <AppShell>
      <article className="mx-auto w-full max-w-4xl space-y-8">
        <header className="border-b border-border pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {subject}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {summary}
          </p>
        </header>
        {sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              {section.heading}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground">{section.body}</p>
          </section>
        ))}
      </article>
    </AppShell>
  );
}
