import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { sn as ArrowLeft } from "../_libs/lucide-react.mjs";
import { o as Route$3 } from "./router-uL0v7Ugr2.mjs";
import { n as PageHeader, t as AppShell } from "./AppShell-C9zRSJym.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutorials._slug-D5bdN_6t.js
var import_jsx_runtime = require_jsx_runtime();
var tutorialMap = {
	"getting-started": {
		title: "Getting Started with Ted's Lab",
		description: "Learn how to browse subjects, save study material, and build a routine with the library and dashboard.",
		videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
		duration: "4 min"
	},
	"using-notes": {
		title: "How to Use the Notes Tool",
		description: "Use the notebook to record key ideas, chapter summaries, and quick revision reminders.",
		videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		duration: "3 min"
	},
	"using-ai-tutor": {
		title: "Using the AI Tutor",
		description: "Ask effective questions and use AI to turn content into study prompts and deeper explanations.",
		videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
		duration: "5 min"
	},
	"saving-content": {
		title: "Saving and Organizing Study Content",
		description: "Bookmark the articles and materials you want to revisit, so your learning stays focused and organized.",
		videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
		duration: "4 min"
	}
};
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
function TutorialPage() {
	const { slug } = Route$3.useParams();
	const tutorial = tutorialMap[slug];
	if (!tutorial) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bio-panel p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Tutorial not found."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/tutorials",
			className: "mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back to tutorials"]
		})]
	}) });
	const embedUrl = getEmbedUrl(tutorial.videoUrl);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/tutorials",
		className: "inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), "Back to tutorials"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: tutorial.title,
			description: `${tutorial.description} Duration: ${tutorial.duration}`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 overflow-hidden rounded-lg bio-panel",
			children: embedUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				src: embedUrl,
				title: tutorial.title,
				className: "aspect-video w-full",
				allow: "accelerate-compressor; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
				allowFullScreen: true
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex aspect-video items-center justify-center bg-secondary text-sm text-muted-foreground",
				children: "Video preview unavailable."
			})
		})]
	})] }) });
}
//#endregion
export { TutorialPage as component };
