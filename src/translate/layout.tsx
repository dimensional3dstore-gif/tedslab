import type { ReactNode } from "react";

export function TranslateLayout({ children }: { children: ReactNode }) {
  return <main className="mx-auto w-full max-w-5xl space-y-6 p-6">{children}</main>;
}
