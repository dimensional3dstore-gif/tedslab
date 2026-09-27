import type { ReactNode } from "react";
import { AppShell } from "@/components/biopedia/AppShell";

export function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl space-y-6">{children}</div>
    </AppShell>
  );
}
