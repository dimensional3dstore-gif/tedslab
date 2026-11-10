import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { sn as ArrowLeft } from "../_libs/lucide-react.mjs";
import { o as Route$2 } from "./router-DQlVO8DL.mjs";
import { f as useVideos, n as PageHeader, t as AppShell } from "./AppShell-8wnhzt2S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/videos._slug-CvLZ1br9.js
var import_jsx_runtime = require_jsx_runtime();
function getEmbedUrl(url) {
	try {
		const u = new URL(url);
		if (u.hostname.includes("youtube.com")) {
			const id = u.searchParams.get("v");
			if (id) return `https://www.youtube.com/embed/${id}`;
			if (u.pathname.startsWith("/embed/")) return url;
		}
		if (u.hostname === "youtu.be") return `https://www.youtube.com/embed/${u.pathname.replace("/", "")}`;
	} catch {}
	return null;
}
function VideoDetailPage() {
	const { slug } = Route$2.useParams();
	const { data: videos = [], isLoading } = useVideos();
	const video = videos.find((v) => v.slug === slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/videos",
			className: "inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), "Back to videos"]
		}),
		isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted-foreground",
			children: "Loading video…"
		}),
		!isLoading && !video && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted-foreground",
			children: "Video not found."
		}),
		video && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: video.title,
				description: video.description ?? ""
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 overflow-hidden rounded-lg bio-panel",
				children: (() => {
					const embedUrl = getEmbedUrl(video.url);
					if (embedUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						src: embedUrl,
						title: video.title,
						className: "aspect-video w-full",
						allow: "accelerate-compressor; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
						allowFullScreen: true
					});
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						src: video.url,
						poster: video.poster_url ?? void 0,
						controls: true,
						className: "aspect-video w-full bg-muted"
					});
				})()
			})]
		})
	] }) });
}
//#endregion
export { VideoDetailPage as component };
