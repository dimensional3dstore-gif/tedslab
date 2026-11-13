import { useEffect, useState } from "react";
import {
  Apple,
  ArrowDownToLine,
  Check,
  ExternalLink,
  Github,
  HardDriveDownload,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import {
  CHRONOSOS_GITHUB_RELEASES_URL,
  CHRONOSOS_LATEST_RELEASE_API_URL,
} from "@/lib/chronos-os-download";

type GitHubRelease = {
  html_url: string;
  name: string | null;
  tag_name: string;
  published_at: string | null;
  assets: {
    name: string;
    browser_download_url: string;
    size: number;
  }[];
  body: string | null;
};

type ReleaseStatus = "loading" | "available" | "empty" | "error";

export default function DownloadableSoftwarePage() {
  const [release, setRelease] = useState<GitHubRelease | null>(null);
  const [status, setStatus] = useState<ReleaseStatus>("loading");

  useEffect(() => {
    const controller = new AbortController();

    async function loadLatestRelease() {
      try {
        const response = await fetch(CHRONOSOS_LATEST_RELEASE_API_URL, {
          headers: { Accept: "application/vnd.github+json" },
          signal: controller.signal,
        });

        if (response.status === 404) {
          setStatus("empty");
          return;
        }
        if (!response.ok) throw new Error("GitHub release lookup failed");

        const latestRelease = (await response.json()) as GitHubRelease;
        setRelease(latestRelease);
        setStatus("available");
      } catch {
        if (!controller.signal.aborted) setStatus("error");
      }
    }

    void loadLatestRelease();
    return () => controller.abort();
  }, []);

  const dmg =
    release?.assets.find((asset) => asset.name === "Chronos.dmg") ??
    release?.assets.find((asset) => /^ChronosOS.*\.dmg$/i.test(asset.name));
  const releaseDate = release?.published_at
    ? new Date(release.published_at)
    : null;

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <PageHeader
          title="ChronosOS releases"
          description="Download the latest macOS build, review release details, and find installation guidance."
        />
        <section
          aria-labelledby="chronosos-release-title"
          className="overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-secondary/40 shadow-sm"
        >
          <div className="flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                  <Check className="size-3.5" /> Latest release
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted-foreground">
                  <Apple className="size-3.5" /> macOS · Apple Silicon
                </span>
              </div>

              <div className="mt-5 flex items-center gap-4">
                <img
                  src="/logo.png"
                  alt=""
                  width={64}
                  height={64}
                  className="size-14 rounded-2xl shadow-sm"
                />
                <div>
                  <h2
                    id="chronosos-release-title"
                    className="font-display text-3xl font-bold text-foreground sm:text-4xl"
                  >
                    ChronosOS
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    The focused desktop sign-in experience for Ted&apos;s Lab.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {status === "available"
                    ? release?.name || release?.tag_name
                    : "Current stable release"}
                </span>
                {releaseDate && !Number.isNaN(releaseDate.getTime()) && (
                  <time dateTime={releaseDate.toISOString()}>
                    Released{" "}
                    {releaseDate.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                )}
                {dmg && (
                  <span className="inline-flex items-center gap-1.5">
                    <HardDriveDownload className="size-4" />
                    {(dmg.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                )}
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Native macOS app for the ChronosOS sign-in experience. Internet
                access is required to sign in.
              </p>

              <p
                className="mt-4 text-sm text-muted-foreground"
                aria-live="polite"
              >
                {status === "loading" &&
                  "Checking GitHub for the latest release…"}
                {status === "empty" &&
                  "No published release yet. The installer will appear here when the first release is published."}
                {status === "error" &&
                  "Could not load release details. You can still browse GitHub Releases."}
                {status === "available" &&
                  !dmg &&
                  "The latest release is published, but Chronos.dmg is not attached yet."}
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              {dmg && (
                <a
                  href={dmg.browser_download_url}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                >
                  <ArrowDownToLine className="size-4" /> Download for Mac
                </a>
              )}
              <a
                href={release?.html_url ?? CHRONOSOS_GITHUB_RELEASES_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background/70 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
              >
                {release ? "View release notes" : "Browse all releases"}
                {release ? (
                  <ExternalLink className="size-4" />
                ) : (
                  <Github className="size-4" />
                )}
              </a>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="install-chronosos-title"
          className="grid gap-6 rounded-2xl border border-border bg-card/80 p-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:p-8"
        >
          <div>
            <h2
              id="install-chronosos-title"
              className="font-display text-xl font-semibold text-foreground"
            >
              Install ChronosOS
            </h2>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  1
                </span>
                Download and open the DMG file.
              </li>
              <li className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  2
                </span>
                Drag ChronosOS into Applications.
              </li>
              <li className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  3
                </span>
                Launch the app and sign in with your Ted&apos;s Lab account.
              </li>
            </ol>
          </div>
          <div className="rounded-xl border border-border bg-background/60 p-5">
            <h3 className="text-sm font-semibold text-foreground">
              Compatibility
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li>macOS on Apple Silicon (arm64)</li>
              <li>Internet connection required for sign-in</li>
              <li>
                The app is currently unsigned; macOS may show a security warning
                on first launch.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
