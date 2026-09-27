import type { ReactNode } from "react";

export function LlmOutput({ children, label }: { children: ReactNode; label: string }) {
  return (
    <section
      aria-label={label}
      className="llm-prose rounded-md border border-border bg-card p-4 text-sm"
    >
      {children}
    </section>
  );
}
