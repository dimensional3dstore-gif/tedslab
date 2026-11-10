import type { ReactNode } from "react";
import { AppShell } from "@/components/biopedia/AppShell";

export function LlmLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <div className="llm-motion-safe min-h-full w-full bg-background text-foreground">
        {children}
      </div>
    </AppShell>
  );
}
