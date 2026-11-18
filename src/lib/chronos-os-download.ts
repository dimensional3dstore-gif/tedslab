export const AQUARIUS_GITHUB_RELEASES_URL =
  "https://github.com/dimensional3dstore-gif/tedslab/releases";

export const AQUARIUS_LATEST_RELEASE_API_URL =
  "https://api.github.com/repos/dimensional3dstore-gif/tedslab/releases/latest";

export const AQUARIUS_DOWNLOAD_URL =
  "https://github.com/dimensional3dstore-gif/tedslab/releases/latest/download/Aquarius.dmg";

export const AQUARIUS_LOCAL_DOWNLOAD_URL = "/downloads/Aquarius.dmg";

export function getAquariusDownloadUrl() {
  if (typeof window === "undefined") {
    return AQUARIUS_DOWNLOAD_URL;
  }

  const host = window.location.hostname;
  const isLocalPreview =
    host === "localhost" || host === "127.0.0.1" || host.endsWith(".local");

  return isLocalPreview ? AQUARIUS_LOCAL_DOWNLOAD_URL : AQUARIUS_DOWNLOAD_URL;
}
