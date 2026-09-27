import type { ReactNode } from "react";
import { AppShell } from "@/components/biopedia/AppShell";

export function PolicyPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <AppShell>
      <article className="mx-auto w-full max-w-3xl space-y-6">
        <header className="border-b border-border pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Policy draft
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-foreground">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Review this draft against the deployed services and applicable law before publishing it
            as a formal policy.
          </p>
        </header>
        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">{children}</div>
      </article>
    </AppShell>
  );
}

export function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
