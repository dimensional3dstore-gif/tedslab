//#region node_modules/.nitro/vite/services/ssr/assets/chronos-os-download-B2Z6-JA2.js
var CHRONOSOS_LATEST_RELEASE_API_URL = "https://api.github.com/repos/dimensional3dstore-gif/tedslab/releases/latest";
var CHRONOSOS_DOWNLOAD_URL = "https://github.com/dimensional3dstore-gif/tedslab/releases/latest/download/ChronosOS.dmg";
var CHRONOSOS_LOCAL_DOWNLOAD_URL = "/downloads/ChronosOS.dmg";
function getChronosOSDownloadUrl() {
	if (typeof window === "undefined") return CHRONOSOS_DOWNLOAD_URL;
	const host = window.location.hostname;
	return host === "localhost" || host === "127.0.0.1" || host.endsWith(".local") ? CHRONOSOS_LOCAL_DOWNLOAD_URL : CHRONOSOS_DOWNLOAD_URL;
}
//#endregion
export { getChronosOSDownloadUrl as n, CHRONOSOS_LATEST_RELEASE_API_URL as t };
