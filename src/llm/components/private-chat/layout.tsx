import type { ReactNode } from "react";

export function PrivateChatLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col gap-5 p-5">
      {children}
    </main>
  );
}
