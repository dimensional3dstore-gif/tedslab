import { Mail } from "lucide-react";

export function ContactPill({ email = "hello@teds-lab.com" }: { email?: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground"
    >
      <Mail className="size-3.5" />
      {email}
    </a>
  );
}
