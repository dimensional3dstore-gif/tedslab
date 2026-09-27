import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download, BookOpenText, Sparkles, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/biopedia/AppShell";

const title = "Download ChronosOS";
const description = "Install the ChronosOS desktop app for a focused sign-in to Ted's Lab.";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DownloadPage,
});

function DownloadPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="bio-panel overflow-hidden p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-primary">
                <Download className="size-3.5" />
                ChronosOS for Mac
              </div>
              <h1 className="mt-4 font-display text-3xl font-bold text-foreground md:text-5xl">
                A focused desktop entry to Ted's Lab
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/downloads/ChronosOS.dmg"
                  download="ChronosOS.dmg"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Download for macOS
                  <Download className="size-4" />
                </a>
                <Link
                  to="/chronos-os"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Open web login
                </Link>
              </div>
            </div>

            <div className="grid gap-3 rounded-2xl border border-border bg-card/80 p-4 text-sm text-muted-foreground shadow-sm">
              <div className="rounded-xl bg-secondary p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-primary">Desktop package</p>
                <p className="mt-2 font-medium text-foreground">macOS DMG installer</p>
              </div>
              <div className="rounded-xl bg-secondary p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-primary">Sign-in surface</p>
                <p className="mt-2 font-medium text-foreground">ChronosOS login only</p>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: BookOpenText,
              title: "Curated content",
              description: "Open the ChronosOS login from a native macOS window.",
            },
            {
              icon: Sparkles,
              title: "Smarter revision",
              description: "Use the existing Ted's Lab account and Supabase sign-in flow.",
            },
            {
              icon: ShieldCheck,
              title: "Secure access",
              description:
                "The installer is an unsigned desktop wrapper around the hosted login page.",
            },
          ].map(({ icon: Icon, title: cardTitle, description: cardDescription }) => (
            <div key={cardTitle} className="bio-panel p-5">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-foreground">{cardTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {cardDescription}
              </p>
            </div>
          ))}
        </section>

        <section className="bio-panel p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                ChronosOS login
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                Get the desktop app or sign in on the web.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/downloads/ChronosOS.dmg"
                download="ChronosOS.dmg"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Download DMG
              </a>
              <Link
                to="/chronos-os"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              >
                Open login
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
