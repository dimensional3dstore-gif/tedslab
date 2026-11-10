import { useEffect, useState } from "react";
import { Download, ExternalLink, Github } from "lucide-react";
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
    release?.assets.find((asset) => asset.name === "ChronosOS.dmg") ??
    release?.assets.find((asset) => /^ChronosOS.*\.dmg$/i.test(asset.name));

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <PageHeader
          title="Software downloads"
          description="Get the latest ChronosOS installer directly from GitHub Releases."
        />
        <section
          aria-labelledby="chronosos-release-title"
          className="border-y border-border py-6"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase text-primary">
                <Github className="size-4" /> GitHub Releases
              </p>
              <h2
                id="chronosos-release-title"
                className="mt-2 font-display text-2xl font-bold text-foreground"
              >
                ChronosOS for macOS
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Native macOS app for the ChronosOS sign-in experience. Apple
                Silicon build; internet access is required to sign in.
              </p>
              <div
                className="mt-3 text-sm text-muted-foreground"
                aria-live="polite"
              >
                {status === "loading" &&
                  "Checking GitHub for the latest release..."}
                {status === "empty" &&
                  "No published release yet. The installer will appear here after a release is published."}
                {status === "error" &&
                  "Could not check the latest release. Browse GitHub Releases for availability."}
                {status === "available" && dmg && (
                  <span>
                    {release?.name || release?.tag_name}
                    {release?.published_at &&
                      ` · ${release.published_at.slice(0, 10)}`}
                    {` · ${(dmg.size / 1024 / 1024).toFixed(1)} MB`}
                  </span>
                )}
                {status === "available" &&
                  !dmg &&
                  "A release is published, but ChronosOS.dmg is not attached yet."}
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              {dmg && (
                <a
                  href={dmg.browser_download_url}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  <Download className="size-4" /> Download DMG
                </a>
              )}
              <a
                href={release?.html_url ?? CHRONOSOS_GITHUB_RELEASES_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
              >
                {release ? "Release notes" : "Browse releases"}
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
