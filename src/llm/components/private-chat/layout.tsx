import type { ReactNode } from "react";
import { AppShell } from "@/components/biopedia/AppShell";

export function PrivateChatLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <main className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col gap-5">
        {children}
      </main>
    </AppShell>
  );
}
