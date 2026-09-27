import { Download, MonitorDown } from "lucide-react";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";

export default function DownloadableSoftwarePage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <PageHeader
          title="Software downloads"
          description="Current desktop software distributed by Ted's Lab."
        />
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Desktop software
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground">ChronosOS</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            A native macOS window for the login-only ChronosOS experience.
          </p>
        </header>
        <section className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <MonitorDown className="mt-0.5 size-5 text-primary" />
            <div>
              <h2 className="font-semibold text-foreground">macOS disk image</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Apple Silicon build. Internet access is required to reach the hosted sign-in page.
              </p>
            </div>
          </div>
          <a
            href="/downloads/ChronosOS.dmg"
            download
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <Download className="size-4" />
            Download DMG
          </a>
        </section>
      </div>
    </AppShell>
  );
}
