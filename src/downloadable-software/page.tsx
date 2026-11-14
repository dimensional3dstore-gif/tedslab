import { useEffect, useState } from "react";
import {
  Apple,
  ArrowDownToLine,
  Check,
  ExternalLink,
  Github,
  HardDriveDownload,
  PackageCheck,
} from "lucide-react";
import { AppShell } from "@/components/biopedia/AppShell";
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
  const releaseName = release?.name || release?.tag_name;

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Ted&apos;s Lab / Desktop
          </p>
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            ChronosOS releases
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Get the latest ChronosOS installer for Mac, see what&apos;s
            included, and follow the quick setup guide.
          </p>
        </header>

        <section
          aria-labelledby="chronosos-release-title"
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-secondary/40 shadow-sm"
        >
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center lg:p-10">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                  <Check className="size-3.5" />
                  {status === "available" ? "Latest release" : "Mac app"}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted-foreground">
                  <Apple className="size-3.5" />
                  macOS · Apple Silicon
                </span>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <img
                  src="/logo.png"
                  alt=""
                  width={64}
                  height={64}
                  className="size-16 rounded-2xl border border-border/70 shadow-sm"
                />
                <div>
                  <h2
                    id="chronosos-release-title"
                    className="font-display text-3xl font-bold text-foreground sm:text-5xl"
                  >
                    ChronosOS
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                    Your Ted&apos;s Lab sign-in, on desktop.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
                {releaseName && (
                  <span className="font-medium text-foreground">
                    {releaseName}
                  </span>
                )}
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

              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
                A native macOS app for the ChronosOS sign-in experience. An
                internet connection is required to sign in.
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

            <div className="rounded-2xl border border-border/80 bg-background/65 p-5 shadow-sm backdrop-blur-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <PackageCheck className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {dmg ? "Ready to install" : "Latest build"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {dmg ? "Official macOS installer" : "From GitHub Releases"}
                  </p>
                </div>
              </div>
              {dmg ? (
                <a
                  href={dmg.browser_download_url}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <ArrowDownToLine className="size-4" />
                  Download for Mac
                </a>
              ) : (
                <p className="rounded-xl border border-border bg-card/70 px-4 py-3 text-center text-sm text-muted-foreground">
                  {status === "loading"
                    ? "Looking for the latest installer…"
                    : "Installer not available"}
                </p>
              )}
              {dmg && (
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  DMG installer
                  {dmg.size > 0 &&
                    ` · ${(dmg.size / 1024 / 1024).toFixed(1)} MB`}
                </p>
              )}
              <a
                href={release?.html_url ?? CHRONOSOS_GITHUB_RELEASES_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/70 px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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

        {release?.body?.trim() && (
          <section
            aria-labelledby="release-notes-title"
            className="rounded-2xl border border-border bg-card/80 p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  What&apos;s new
                </p>
                <h2
                  id="release-notes-title"
                  className="mt-2 font-display text-xl font-semibold text-foreground"
                >
                  {releaseName ?? "Release notes"}
                </h2>
              </div>
              {release.html_url && (
                <a
                  href={release.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Full release details <ExternalLink className="size-3.5" />
                </a>
              )}
            </div>
            <p className="mt-5 max-h-80 overflow-y-auto whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground">
              {release.body}
            </p>
          </section>
        )}

        <section
          aria-labelledby="install-chronosos-title"
          className="grid gap-8 rounded-2xl border border-border bg-card/80 p-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:p-8"
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
              <li className="flex items-start gap-2">
                <Apple className="mt-0.5 size-4 shrink-0 text-primary" />
                macOS on Apple Silicon (arm64)
              </li>
              <li className="flex items-start gap-2">
                <HardDriveDownload className="mt-0.5 size-4 shrink-0 text-primary" />
                Internet connection required for sign-in
              </li>
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
