export const CHRONOSOS_GITHUB_RELEASES_URL =
  "https://github.com/dimensional3dstore-gif/tedslab/releases";

export const CHRONOSOS_LATEST_RELEASE_API_URL =
  "https://api.github.com/repos/dimensional3dstore-gif/tedslab/releases/latest";

export const CHRONOSOS_DOWNLOAD_URL =
  "https://github.com/dimensional3dstore-gif/tedslab/releases/latest/download/Chronos.dmg";

export const CHRONOSOS_LOCAL_DOWNLOAD_URL = "/downloads/Chronos.dmg";

export function getChronosOSDownloadUrl() {
  if (typeof window === "undefined") {
    return CHRONOSOS_DOWNLOAD_URL;
  }

  const host = window.location.hostname;
  const isLocalPreview =
    host === "localhost" || host === "127.0.0.1" || host.endsWith(".local");

  return isLocalPreview ? CHRONOSOS_LOCAL_DOWNLOAD_URL : CHRONOSOS_DOWNLOAD_URL;
}
