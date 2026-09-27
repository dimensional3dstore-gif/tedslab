import type { ReactNode } from "react";

export function LlmLayout({ children }: { children: ReactNode }) {
  return (
    <div className="llm-motion-safe min-h-screen bg-background text-foreground">{children}</div>
  );
}
