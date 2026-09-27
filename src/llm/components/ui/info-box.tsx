import type { ReactNode } from "react";

export function InfoBox({
  title,
  children,
  tone = "neutral",
}: {
  title: string;
  children: ReactNode;
  tone?: "neutral" | "warning";
}) {
  return (
    <aside
      role={tone === "warning" ? "alert" : undefined}
      className={`rounded-md border p-4 text-sm ${tone === "warning" ? "border-bio-amber/40 bg-bio-amber/10" : "border-border bg-secondary/50"}`}
    >
      <h2 className="font-semibold text-foreground">{title}</h2>
      <div className="mt-2 leading-relaxed text-muted-foreground">{children}</div>
    </aside>
  );
}
