import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { $t as Bookmark, Kt as ChevronRight } from "../_libs/lucide-react.mjs";
import { r as resolveImage } from "./images-BfzzCxZw.mjs";
import { a as useBookmarks, c as useSections } from "./AppShell-BSLOU_FO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TopicGrid-C0KpyNh9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TopicCard = (0, import_react.forwardRef)(({ topic, sectionSlug, subjectSlug, sectionImageKey, saved = false, onBookmarkClick, showBookmark = true }, ref) => {
	const topicId = `${sectionSlug}/${topic.slug}`;
	const topicLink = subjectSlug ? `/${subjectSlug}/${sectionSlug}/${topic.slug}` : `/${sectionSlug}/${topic.slug}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		ref,
		to: topicLink,
		hash: topic.slug,
		className: "group flex flex-col overflow-hidden bio-panel transition-all duration-200 hover:border-primary/50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden bg-secondary",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: resolveImage(topic.image_url ?? null, sectionImageKey ?? null),
				alt: topic.title,
				loading: "lazy",
				width: 512,
				height: 288,
				className: "h-28 w-full object-cover transition-transform duration-300 group-hover:scale-105"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold text-foreground group-hover:text-primary transition-colors",
					children: topic.title
				}),
				topic.blurb && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2",
					children: topic.blurb
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-center justify-between gap-2 pt-4",
					children: [showBookmark && onBookmarkClick ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: (e) => {
							e.preventDefault();
							e.stopPropagation();
							onBookmarkClick(topicId);
						},
						"aria-pressed": saved,
						"aria-label": saved ? `Remove bookmark` : `Bookmark`,
						className: `text-xs transition-colors ${saved ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: `size-3.5 ${saved ? "fill-current" : ""}` }), saved ? "Saved" : "Save"]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5 text-muted-foreground group-hover:text-primary transition-colors" })]
				})
			]
		})]
	});
});
function TopicGrid({ topics, sectionSlug, subjectSlug }) {
	const { bookmarks, toggleBookmark } = useBookmarks();
	const { data: sections } = useSections();
	const section = (sections ?? []).find((s) => s.slug === sectionSlug);
	const [selectedIndex, setSelectedIndex] = (0, import_react.useState)(0);
	const gridRef = (0, import_react.useRef)(null);
	const itemRefs = (0, import_react.useRef)([]);
	const colsCount = 3;
	(0, import_react.useEffect)(() => {
		itemRefs.current[selectedIndex]?.focus();
	}, [selectedIndex]);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if (!gridRef.current?.contains(document.activeElement)) return;
			switch (e.key) {
				case "ArrowRight":
					e.preventDefault();
					setSelectedIndex((prev) => prev + 1 < topics.length ? prev + 1 : prev);
					break;
				case "ArrowLeft":
					e.preventDefault();
					setSelectedIndex((prev) => prev - 1 >= 0 ? prev - 1 : prev);
					break;
				case "ArrowDown":
					e.preventDefault();
					setSelectedIndex((prev) => {
						const next = prev + colsCount;
						return next < topics.length ? next : prev;
					});
					break;
				case "ArrowUp":
					e.preventDefault();
					setSelectedIndex((prev) => {
						const next = prev - colsCount;
						return next >= 0 ? next : prev;
					});
					break;
				case "Enter":
					e.preventDefault();
					itemRefs.current[selectedIndex]?.click();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [selectedIndex, topics.length]);
	if (topics.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-6 text-sm text-muted-foreground",
		children: "No topics match your search."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: gridRef,
		className: "mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
		children: topics.map((t, index) => {
			const id = `${sectionSlug}/${t.slug}`;
			const saved = bookmarks.includes(id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: selectedIndex === index ? "ring-2 ring-primary rounded-lg" : "",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopicCard, {
					ref: (el) => {
						itemRefs.current[index] = el;
					},
					topic: t,
					sectionSlug,
					subjectSlug,
					sectionImageKey: section?.image_key,
					saved,
					onBookmarkClick: toggleBookmark
				})
			}, t.id);
		})
	});
}
//#endregion
export { TopicGrid as t };
