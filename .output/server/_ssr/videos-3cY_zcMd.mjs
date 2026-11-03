import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as description } from "./router-Dgs_r0rK2.mjs";
import { i as subjectImageKey, r as resolveImage } from "./images-BfzzCxZw.mjs";
import { f as useVideos, n as PageHeader, t as AppShell } from "./AppShell-CxslfhoC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/videos-3cY_zcMd.js
var import_jsx_runtime = require_jsx_runtime();
function VideosPage() {
	const { data: videos = [], isLoading } = useVideos();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: (q) => {
		const filtered = videos.filter((v) => !q || `${v.title} ${v.description ?? ""}`.toLowerCase().includes(q));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Videos",
				description
			}),
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted-foreground",
				children: "Loading videos…"
			}),
			!isLoading && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted-foreground",
				children: "No videos match your search."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
				children: filtered.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/videos/$slug",
					params: { slug: v.slug },
					className: "flex flex-col overflow-hidden bio-panel transition-colors hover:border-primary/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: resolveImage(v.poster_url, v.subject_slug ? subjectImageKey[v.subject_slug] ?? null : null),
						alt: v.title,
						loading: "lazy",
						className: "aspect-video w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold",
							children: v.title
						}), v.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs leading-relaxed text-muted-foreground",
							children: v.description
						})]
					})]
				}, v.id))
			})
		] });
	} });
}
//#endregion
export { VideosPage as component };
