import type { ReactNode } from "react";

export function LlmSettingsLayout({ children }: { children: ReactNode }) {
  return <section className="mx-auto w-full max-w-3xl space-y-6">{children}</section>;
}
