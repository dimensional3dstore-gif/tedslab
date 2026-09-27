import { Mail } from "lucide-react";

export function ContactButton({ email = "hello@teds-lab.com" }: { email?: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="inline-flex min-h-10 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
    >
      <Mail className="size-4" /> Contact the team
    </a>
  );
}
