import type { ReactNode } from "react";
import { AppShell } from "@/components/biopedia/AppShell";

export function LostAtlasLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <main className="mx-auto w-full max-w-5xl space-y-6">{children}</main>
    </AppShell>
  );
}
