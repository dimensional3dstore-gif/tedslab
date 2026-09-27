import type { HTMLAttributes } from "react";

export function AboutBox({ className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section {...props} className={`rounded-lg border border-border bg-card p-5 ${className}`} />
  );
}
