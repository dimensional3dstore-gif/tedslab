import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { I as notFound, _ as Link, c as HeadContent, f as createRouter, g as createRootRouteWithContext, h as createFileRoute, m as lazyRouteComponent, p as Outlet, s as Scripts, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as QueryClientProvider, n as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { p as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as unionType, i as stringType, n as numberType, r as objectType, t as literalType } from "../_libs/zod.mjs";
import { n as supabase } from "./router-Do9_DjQ6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Do9_DjQ6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = objectType({
	channel: literalType(PREVIEW_BRIDGE_CHANNEL),
	version: numberType().int().positive(),
	type: stringType().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literalType("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literalType("navigate"),
	path: stringType().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literalType("history"),
	delta: unionType([literalType(-1), literalType(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-CSPOQGpI.css";
var APP_NAME = "Ted's Lab — The Learning Encyclopedia";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "That page is not in the encyclopedia yet."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
						children: "Go home"
					})
				})
			]
		})
	});
}
var Route$82 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "An illustrated learning encyclopedia covering biology, history, english, mathematics, science, and technology — with a knowledge atlas and daily AI study assist."
			},
			{
				name: "theme-color",
				content: "#142018"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap"
			}
		]
	}),
	notFoundComponent: NotFoundComponent,
	component: RootDocument
});
function RootDocument() {
	const { queryClient } = Route$82.useRouteContext();
	(0, import_react.useEffect)(() => {
		if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => void 0);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
				client: queryClient,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$81 = () => import("./routes-iXsNYU-j.mjs");
var defaultTitle = "Ted's Lab — The Learning Encyclopedia";
var defaultDescription = "Explore biology, history, english, mathematics, science, and technology with illustrated articles, videos, quizzes and study tools.";
var Route$81 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: defaultTitle },
		{
			name: "description",
			content: defaultDescription
		},
		{
			property: "og:title",
			content: defaultTitle
		},
		{
			property: "og:description",
			content: defaultDescription
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$81, "component")
});
var db$4 = supabase;
var subjectQueryOptions$2 = (slug) => queryOptions({
	queryKey: ["subject", slug],
	queryFn: async () => {
		const { data, error } = await db$4.from("subjects").select("*").eq("slug", slug).maybeSingle();
		if (error) throw error;
		return data ?? null;
	}
});
var subjectSectionsQueryOptions = (subjectId) => queryOptions({
	queryKey: [
		"sections",
		"by-subject",
		subjectId
	],
	queryFn: async () => {
		const { data, error } = await db$4.from("sections").select("*").eq("subject_id", subjectId).order("sort", { ascending: true });
		if (error) throw error;
		return data ?? [];
	}
});
var $$splitComponentImporter$80 = () => import("../_subject-xjH8zPUR.mjs");
var Route$80 = createFileRoute("/$subject")({
	loader: async ({ context, params }) => {
		const subject = await context.queryClient.ensureQueryData(subjectQueryOptions$2(params.subject));
		if (!subject) throw notFound();
		return {
			subject,
			sections: await context.queryClient.ensureQueryData(subjectSectionsQueryOptions(subject.id))
		};
	},
	head: ({ loaderData }) => {
		const title = loaderData ? `${loaderData.subject.title} — Ted's Lab` : "Ted's Lab";
		const description = loaderData?.subject.description ?? "";
		return { meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter$80, "component")
});
var $$splitComponentImporter$79 = () => import("./add-app-CxBUoL5c.mjs");
var Route$79 = createFileRoute("/add-app")({ component: lazyRouteComponent($$splitComponentImporter$79, "component") });
var $$splitComponentImporter$78 = () => import("./admin-yfGTyCJz.mjs");
var Route$78 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Admin — Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$78, "component")
});
var $$splitComponentImporter$77 = () => import("./ai-CnhGL9Hp.mjs");
var title$13 = "AI Tutor — Ted's Lab";
var description$13 = "Get study guidance from the built-in AI tutor using the project knowledge files.";
var Route$77 = createFileRoute("/ai")({
	head: () => ({ meta: [
		{ title: title$13 },
		{
			name: "description",
			content: description$13
		},
		{
			property: "og:title",
			content: title$13
		},
		{
			property: "og:description",
			content: description$13
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$77, "component")
});
var $$splitComponentImporter$76 = () => import("./anatomy-DfD_ShOg.mjs");
var Route$76 = createFileRoute("/anatomy")({
	head: () => ({ meta: [{ title: "Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$76, "component")
});
var $$splitComponentImporter$75 = () => import("./annotation-sys-CZwPSKSO.mjs");
var Route$75 = createFileRoute("/annotation-sys")({ component: lazyRouteComponent($$splitComponentImporter$75, "component") });
var description$12 = "Browse all articles across every Ted's Lab subject.";
var $$splitComponentImporter$74 = () => import("./articles-Bvkyw-8c.mjs");
var title$12 = "All Articles — Ted's Lab";
var Route$74 = createFileRoute("/articles")({
	head: () => ({ meta: [
		{ title: title$12 },
		{
			name: "description",
			content: description$12
		},
		{
			property: "og:title",
			content: title$12
		},
		{
			property: "og:description",
			content: description$12
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$74, "component")
});
var $$splitComponentImporter$73 = () => import("./articles-debug-DX5TkGVw.mjs");
var Route$73 = createFileRoute("/articles-debug")({ component: lazyRouteComponent($$splitComponentImporter$73, "component") });
var $$splitComponentImporter$72 = () => import("./auth-MRcL_HLk.mjs");
var Route$72 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Sign in — Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$72, "component")
});
var $$splitComponentImporter$71 = () => import("./biological-processes-BtdoG2Fy.mjs");
var Route$71 = createFileRoute("/biological-processes")({
	head: () => ({ meta: [{ title: "Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$71, "component")
});
var $$splitComponentImporter$70 = () => import("./biotechnology-CPKIwoUa.mjs");
var Route$70 = createFileRoute("/biotechnology")({
	head: () => ({ meta: [{ title: "Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$70, "component")
});
var description$11 = "Browse every Ted's Lab category, from organisms and cells to biotechnology and evolution.";
var $$splitComponentImporter$69 = () => import("./categories-Cg76wcmt.mjs");
var title$11 = "All Categories — Ted's Lab";
var Route$69 = createFileRoute("/categories")({
	head: () => ({ meta: [
		{ title: title$11 },
		{
			name: "description",
			content: description$11
		},
		{
			property: "og:title",
			content: title$11
		},
		{
			property: "og:description",
			content: description$11
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$69, "component")
});
var $$splitComponentImporter$68 = () => import("./cells-microscopy-CkJt-yRI.mjs");
var Route$68 = createFileRoute("/cells-microscopy")({
	head: () => ({ meta: [{ title: "Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$68, "component")
});
var $$splitComponentImporter$67 = () => import("./chronos-os-CRCb6rXY.mjs");
var Route$67 = createFileRoute("/chronos-os")({
	head: () => ({ meta: [{ title: "ChronosOS Login — Ted's Lab" }, {
		name: "description",
		content: "Sign in to ChronosOS."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$67, "component")
});
var $$splitComponentImporter$66 = () => import("./communicational-system-D2OluYJh.mjs");
var Route$66 = createFileRoute("/communicational-system")({ component: lazyRouteComponent($$splitComponentImporter$66, "component") });
var description$10 = "Group topics into your own study lists and tick them off as you go.";
var $$splitComponentImporter$65 = () => import("./custom-lists-RwoacZ1c.mjs");
var title$10 = "Custom Lists — Ted's Lab";
var Route$65 = createFileRoute("/custom-lists")({
	head: () => ({ meta: [
		{ title: title$10 },
		{
			name: "description",
			content: description$10
		},
		{
			property: "og:title",
			content: title$10
		},
		{
			property: "og:description",
			content: description$10
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$65, "component")
});
var $$splitComponentImporter$64 = () => import("./dashboard-_uZjEvBr.mjs");
var Route$64 = createFileRoute("/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$64, "component")
});
var $$splitComponentImporter$63 = () => import("./decipher-D5t8bql1.mjs");
var Route$63 = createFileRoute("/decipher")({ component: lazyRouteComponent($$splitComponentImporter$63, "component") });
var $$splitComponentImporter$62 = () => import("./dev-dashboard-D3vuKCSd.mjs");
var Route$62 = createFileRoute("/dev-dashboard")({ component: lazyRouteComponent($$splitComponentImporter$62, "component") });
var $$splitComponentImporter$61 = () => import("./dev-tools-Dy3z2ma2.mjs");
var Route$61 = createFileRoute("/dev-tools")({ component: lazyRouteComponent($$splitComponentImporter$61, "component") });
var $$splitComponentImporter$60 = () => import("./docs-DFv9WbF7.mjs");
var Route$60 = createFileRoute("/docs")({
	head: () => ({ meta: [{ title: "Docs — Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$60, "component")
});
var description$9 = "Install the ChronosOS desktop app for a focused sign-in to Ted's Lab.";
var $$splitComponentImporter$59 = () => import("./download-BOfuWNKa.mjs");
var title$9 = "Download ChronosOS";
var Route$59 = createFileRoute("/download")({
	head: () => ({ meta: [
		{ title: title$9 },
		{
			name: "description",
			content: description$9
		},
		{
			property: "og:title",
			content: title$9
		},
		{
			property: "og:description",
			content: description$9
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$59, "component")
});
var $$splitComponentImporter$58 = () => import("./downloadable-software-Ni7YCAna.mjs");
var Route$58 = createFileRoute("/downloadable-software")({ component: lazyRouteComponent($$splitComponentImporter$58, "component") });
var $$splitComponentImporter$57 = () => import("./ecology-environment-Dah3-tXU.mjs");
var Route$57 = createFileRoute("/ecology-environment")({
	head: () => ({ meta: [{ title: "Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$57, "component")
});
var $$splitComponentImporter$56 = () => import("./evolution-97cko-rg.mjs");
var Route$56 = createFileRoute("/evolution")({
	head: () => ({ meta: [{ title: "Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$56, "component")
});
var $$splitComponentImporter$55 = () => import("./extension-tools-upload-D9xPdidu.mjs");
var Route$55 = createFileRoute("/extension-tools-upload")({ component: lazyRouteComponent($$splitComponentImporter$55, "component") });
var $$splitComponentImporter$54 = () => import("./extensions-BIENVUXG.mjs");
var Route$54 = createFileRoute("/extensions")({ component: lazyRouteComponent($$splitComponentImporter$54, "component") });
var description$8 = "Flip through key biology terms and check yourself before an exam.";
var $$splitComponentImporter$53 = () => import("./flashcards-Bvg2XdpN.mjs");
var title$8 = "Flashcards — Ted's Lab";
var Route$53 = createFileRoute("/flashcards")({
	head: () => ({ meta: [
		{ title: title$8 },
		{
			name: "description",
			content: description$8
		},
		{
			property: "og:title",
			content: title$8
		},
		{
			property: "og:description",
			content: description$8
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$53, "component")
});
var $$splitComponentImporter$52 = () => import("./genetics-dna-DhEpWHI1.mjs");
var Route$52 = createFileRoute("/genetics-dna")({
	head: () => ({ meta: [{ title: "Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$52, "component")
});
var description$7 = "Clear definitions for the biology terms you meet most often, A to Z.";
var $$splitComponentImporter$51 = () => import("./glossary-DD9x--dH.mjs");
var title$7 = "Biology Glossary — Ted's Lab";
var Route$51 = createFileRoute("/glossary")({
	head: () => ({ meta: [
		{ title: title$7 },
		{
			name: "description",
			content: description$7
		},
		{
			property: "og:title",
			content: title$7
		},
		{
			property: "og:description",
			content: description$7
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$51, "component")
});
var $$splitComponentImporter$50 = () => import("./graphication-BxEpXfTb.mjs");
var Route$50 = createFileRoute("/graphication")({ component: lazyRouteComponent($$splitComponentImporter$50, "component") });
var $$splitComponentImporter$49 = () => import("./help-center-DR6Lsfqp.mjs");
var Route$49 = createFileRoute("/help-center")({
	head: () => ({ meta: [{ title: "Help Centre — Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$49, "component")
});
var $$splitComponentImporter$48 = () => import("./human-biology-Cb9zu_l6.mjs");
var Route$48 = createFileRoute("/human-biology")({
	head: () => ({ meta: [{ title: "Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$48, "component")
});
var $$splitComponentImporter$47 = () => import("./ide-system-Bf29M9F1.mjs");
var Route$47 = createFileRoute("/ide-system")({ component: lazyRouteComponent($$splitComponentImporter$47, "component") });
var $$splitComponentImporter$46 = () => import("./information-use-B5xFJCPh.mjs");
var Route$46 = createFileRoute("/information-use")({ component: lazyRouteComponent($$splitComponentImporter$46, "component") });
var $$splitComponentImporter$45 = () => import("./knowledge-atlas-DyWrwXPK.mjs");
var Route$45 = createFileRoute("/knowledge-atlas")({
	component: lazyRouteComponent($$splitComponentImporter$45, "component"),
	head: () => ({ meta: [{ title: "Knowledge Atlas — Ted's Lab" }, {
		name: "description",
		content: "Interactive knowledge graph exploring philosophy, physics, biology, mathematics, and more — integrated with BioPedia."
	}] })
});
var $$splitComponentImporter$44 = () => import("./llm-6dU9Na3o.mjs");
var Route$44 = createFileRoute("/llm")({
	head: () => ({ meta: [{ title: "Local AI — Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$44, "component")
});
var $$splitComponentImporter$43 = () => import("./lost-atlas-CjUc9GAX.mjs");
var Route$43 = createFileRoute("/lost-atlas")({ component: lazyRouteComponent($$splitComponentImporter$43, "component") });
var $$splitComponentImporter$42 = () => import("./maps-DfPhz-PM.mjs");
var Route$42 = createFileRoute("/maps")({ component: lazyRouteComponent($$splitComponentImporter$42, "component") });
var $$splitComponentImporter$41 = () => import("./network-Brs3Fb2w.mjs");
var Route$41 = createFileRoute("/network")({ component: lazyRouteComponent($$splitComponentImporter$41, "component") });
var description$6 = "Keep your own biology study notes, saved right in your browser.";
var $$splitComponentImporter$40 = () => import("./notebook-CY-u47WK.mjs");
var title$6 = "Notebook — Ted's Lab";
var Route$40 = createFileRoute("/notebook")({
	head: () => ({ meta: [
		{ title: title$6 },
		{
			name: "description",
			content: description$6
		},
		{
			property: "og:title",
			content: title$6
		},
		{
			property: "og:description",
			content: description$6
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$40, "component")
});
var $$splitComponentImporter$39 = () => import("./organisms-DDVbs9Xs.mjs");
var Route$39 = createFileRoute("/organisms")({
	head: () => ({ meta: [{ title: "Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$39, "component")
});
var description$5 = "Browse all published pages on Ted's Lab.";
var $$splitComponentImporter$38 = () => import("./pages-BJxGY9Pc.mjs");
var title$5 = "All Pages — Ted's Lab";
var Route$38 = createFileRoute("/pages")({
	head: () => ({ meta: [
		{ title: title$5 },
		{
			name: "description",
			content: description$5
		},
		{
			property: "og:title",
			content: title$5
		},
		{
			property: "og:description",
			content: description$5
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$38, "component")
});
var $$splitComponentImporter$37 = () => import("./photosynthese-AWueGro2.mjs");
var Route$37 = createFileRoute("/photosynthese")({ component: lazyRouteComponent($$splitComponentImporter$37, "component") });
var $$splitComponentImporter$36 = () => import("./photosynthesis-BX6KR9qp.mjs");
var Route$36 = createFileRoute("/photosynthesis")({ component: lazyRouteComponent($$splitComponentImporter$36, "component") });
var $$splitComponentImporter$35 = () => import("./plants-Cb487rE4.mjs");
var Route$35 = createFileRoute("/plants")({
	head: () => ({ meta: [{ title: "Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
var $$splitComponentImporter$34 = () => import("./privacy-BAnLZIQN.mjs");
var Route$34 = createFileRoute("/privacy")({ component: lazyRouteComponent($$splitComponentImporter$34, "component") });
var description$4 = "Test what you know with quick multiple-choice questions across biology.";
var $$splitComponentImporter$33 = () => import("./quizzes-hZpIoyQ-.mjs");
var title$4 = "Biology Quizzes — Ted's Lab";
var Route$33 = createFileRoute("/quizzes")({
	head: () => ({ meta: [
		{ title: title$4 },
		{
			name: "description",
			content: description$4
		},
		{
			property: "og:title",
			content: title$4
		},
		{
			property: "og:description",
			content: description$4
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var description$3 = "Everything you bookmarked across Ted's Lab, in one place.";
var $$splitComponentImporter$32 = () => import("./saved-CiHRcb_A.mjs");
var title$3 = "Saved Content — Ted's Lab";
var Route$32 = createFileRoute("/saved")({
	head: () => ({ meta: [
		{ title: title$3 },
		{
			name: "description",
			content: description$3
		},
		{
			property: "og:title",
			content: title$3
		},
		{
			property: "og:description",
			content: description$3
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./settings-BGz82WDu.mjs");
var Route$31 = createFileRoute("/settings")({
	ssr: false,
	head: () => ({ meta: [{ title: "Settings — Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./signup-e4vcv0Wm.mjs");
var Route$30 = createFileRoute("/signup")({
	head: () => ({ meta: [{ title: "Create account — Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./soft-os-addition-Bnu4VH78.mjs");
var Route$29 = createFileRoute("/soft-os-addition")({ component: lazyRouteComponent($$splitComponentImporter$29, "component") });
var $$splitComponentImporter$28 = () => import("./species-scan-Cags79fz.mjs");
var Route$28 = createFileRoute("/species-scan")({ component: lazyRouteComponent($$splitComponentImporter$28, "component") });
var description$2 = "Four and a half billion years of Earth history, from the first cells to human civilization.";
var $$splitComponentImporter$27 = () => import("./timeline-DXiD2WP0.mjs");
var title$2 = "Timeline of Life — Ted's Lab";
var Route$27 = createFileRoute("/timeline")({
	head: () => ({ meta: [
		{ title: title$2 },
		{
			name: "description",
			content: description$2
		},
		{
			property: "og:title",
			content: title$2
		},
		{
			property: "og:description",
			content: description$2
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./translate-1eemLM87.mjs");
var Route$26 = createFileRoute("/translate")({ component: lazyRouteComponent($$splitComponentImporter$26, "component") });
var description$1 = "Learn the platform with short, step-by-step video guides for studying, notes, and AI-powered learning.";
var $$splitComponentImporter$25 = () => import("./tutorials-CwRI92SZ.mjs");
var title$1 = "Video Tutorials — Ted's Lab";
var Route$25 = createFileRoute("/tutorials")({
	head: () => ({ meta: [
		{ title: title$1 },
		{
			name: "description",
			content: description$1
		},
		{
			property: "og:title",
			content: title$1
		},
		{
			property: "og:description",
			content: description$1
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./update-soft-4bnYdZbR.mjs");
var Route$24 = createFileRoute("/update-soft")({ component: lazyRouteComponent($$splitComponentImporter$24, "component") });
var description = "Watch curated videos covering topics across every Ted's Lab subject.";
var $$splitComponentImporter$23 = () => import("./videos-553L5TUC.mjs");
var title = "Videos — Ted's Lab";
var Route$23 = createFileRoute("/videos")({
	head: () => ({ meta: [
		{ title },
		{
			name: "description",
			content: description
		},
		{
			property: "og:title",
			content: title
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var db$3 = supabase;
var topicQueryOptions$1 = (sectionSlug, topicSlug) => queryOptions({
	queryKey: [
		"topic",
		sectionSlug,
		topicSlug
	],
	queryFn: async () => {
		const { data, error } = await db$3.from("topics").select("*").eq("slug", topicSlug).maybeSingle();
		if (error) throw error;
		return data ?? null;
	}
});
var topicArticlesQueryOptions$1 = (topicSlug) => queryOptions({
	queryKey: [
		"articles",
		"by-topic",
		topicSlug
	],
	queryFn: async () => {
		const { data, error } = await db$3.from("articles").select("*").eq("topic_slug", topicSlug).eq("published", true).order("sort", { ascending: true });
		if (error) throw error;
		return data ?? [];
	}
});
var sectionQueryOptions$2 = (sectionSlug) => queryOptions({
	queryKey: ["section", sectionSlug],
	queryFn: async () => {
		const { data, error } = await db$3.from("sections").select("*").eq("slug", sectionSlug).maybeSingle();
		if (error) throw error;
		return data ?? null;
	}
});
var $$splitComponentImporter$22 = () => import("../_section._topic-D3FAf6y8.mjs");
var Route$22 = createFileRoute("/$section/$topic")({
	loader: async ({ context, params }) => {
		const section = await context.queryClient.ensureQueryData(sectionQueryOptions$2(params.section));
		if (!section) throw notFound();
		const topic = await context.queryClient.ensureQueryData(topicQueryOptions$1(params.section, params.topic));
		if (!topic) throw notFound();
		return {
			section,
			topic,
			articles: await context.queryClient.ensureQueryData(topicArticlesQueryOptions$1(params.topic))
		};
	},
	head: ({ loaderData }) => {
		const title = loaderData ? `${loaderData.topic.title} — Ted's Lab` : "Ted's Lab";
		const description = loaderData?.topic.blurb ?? "";
		return { meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var db$2 = supabase;
var sectionQueryOptions$1 = (subjectSlug, sectionSlug) => queryOptions({
	queryKey: [
		"section",
		subjectSlug,
		sectionSlug
	],
	queryFn: async () => {
		const { data, error } = await db$2.from("sections").select("*").eq("slug", sectionSlug).maybeSingle();
		if (error) throw error;
		return data ?? null;
	}
});
var sectionArticlesQueryOptions = (sectionSlug) => queryOptions({
	queryKey: [
		"articles",
		"by-section",
		sectionSlug
	],
	queryFn: async () => {
		const { data, error } = await db$2.from("articles").select("*").eq("section_slug", sectionSlug).eq("published", true).order("sort", { ascending: true });
		if (error) throw error;
		return data ?? [];
	}
});
var $$splitComponentImporter$21 = () => import("../_subject._section-DwOW8vCZ.mjs");
var subjectQueryOptions$1 = (slug) => queryOptions({
	queryKey: ["subject", slug],
	queryFn: async () => {
		const { data, error } = await db$2.from("subjects").select("*").eq("slug", slug).maybeSingle();
		if (error) throw error;
		return data ?? null;
	}
});
var Route$21 = createFileRoute("/$subject/$section")({
	loader: async ({ context, params }) => {
		const subject = await context.queryClient.ensureQueryData(subjectQueryOptions$1(params.subject));
		if (!subject) throw notFound();
		const section = await context.queryClient.ensureQueryData(sectionQueryOptions$1(params.subject, params.section));
		if (!section) throw notFound();
		return {
			subject,
			section,
			articles: await context.queryClient.ensureQueryData(sectionArticlesQueryOptions(params.section))
		};
	},
	head: ({ loaderData }) => {
		const title = loaderData ? `${loaderData.section.title} — Ted's Lab` : "Ted's Lab";
		const description = loaderData?.section.description ?? "";
		return { meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./admin.articles-BCrstny7.mjs");
var Route$20 = createFileRoute("/admin/articles")({
	head: () => ({ meta: [{ title: "Manage Articles — Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./admin.pages-CheK5-sb.mjs");
var Route$19 = createFileRoute("/admin/pages")({
	head: () => ({ meta: [{ title: "Manage Pages — Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./admin.pages-list-DdAATkc3.mjs");
var Route$18 = createFileRoute("/admin/pages-list")({
	head: () => ({ meta: [{ title: "All Pages — Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./admin.sections-Doxl4KLu.mjs");
var Route$17 = createFileRoute("/admin/sections")({
	head: () => ({ meta: [{ title: "Manage Sections — Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./admin.topics-BVc3yO37.mjs");
var Route$16 = createFileRoute("/admin/topics")({
	head: () => ({ meta: [{ title: "Manage Topics — Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./articles._slug-CN0f_e3R.mjs");
var Route$15 = createFileRoute("/articles/$slug")({
	head: ({ params }) => ({ meta: [{ title: `Article — Ted's Lab` }, {
		name: "description",
		content: `Read article on Ted's Lab`
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./articles.cellular-respiration-B9VjITvp.mjs");
var Route$14 = createFileRoute("/articles/cellular-respiration")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./articles.enzyme-catalysis-DzM1EYTX.mjs");
var Route$13 = createFileRoute("/articles/enzyme-catalysis")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./articles.evolution-natural-selection-DMR3W-6I.mjs");
var Route$12 = createFileRoute("/articles/evolution-natural-selection")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./articles.food-chains-energy-flow-C-QIowP3.mjs");
var Route$11 = createFileRoute("/articles/food-chains-energy-flow")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./articles.human-anatomy-systems-BGIOtqbv.mjs");
var Route$10 = createFileRoute("/articles/human-anatomy-systems")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./articles.meiosis-gamete-formation-CjPlTDfi.mjs");
var Route$9 = createFileRoute("/articles/meiosis-gamete-formation")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./articles.mitosis-cell-division-CNRJepI7.mjs");
var Route$8 = createFileRoute("/articles/mitosis-cell-division")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./articles.photosynthesis-light-reactions-BaWZuY2v.mjs");
var Route$7 = createFileRoute("/articles/photosynthesis-light-reactions")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./extensions.noter-GleHvvTd.mjs");
var Route$6 = createFileRoute("/extensions/noter")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./lost-atlas._slug-CYUFkVPy.mjs");
var Route$5 = createFileRoute("/lost-atlas/$slug")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitNotFoundComponentImporter = () => import("./pages._slug-CZy--yVn.mjs");
var $$splitComponentImporter$4 = () => import("./pages._slug-BFn1pKp_.mjs");
var db$1 = supabase;
var pageQueryOptions = (slug) => queryOptions({
	queryKey: ["page", slug],
	queryFn: async () => {
		const { data, error } = await db$1.from("pages").select("*").eq("slug", slug).eq("published", true).maybeSingle();
		if (error) throw error;
		return data ?? null;
	}
});
var Route$4 = createFileRoute("/pages/$slug")({
	loader: async ({ context, params }) => {
		const page = await context.queryClient.ensureQueryData(pageQueryOptions(params.slug));
		if (!page) throw notFound();
		return { page };
	},
	head: ({ loaderData }) => {
		const page = loaderData?.page;
		return { meta: [
			{ title: page ? `${page.title} — Ted's Lab` : "Ted's Lab" },
			{
				name: "description",
				content: page?.description ?? ""
			},
			{
				property: "og:title",
				content: page?.title
			},
			{
				property: "og:description",
				content: page?.description
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
var $$splitComponentImporter$3 = () => import("./tutorials._slug-zIkik0ND.mjs");
var Route$3 = createFileRoute("/tutorials/$slug")({
	head: () => ({ meta: [{ title: "Tutorial — Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./videos._slug-Ba8ib9W7.mjs");
var Route$2 = createFileRoute("/videos/$slug")({
	head: () => ({ meta: [{ title: "Video — Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var db = supabase;
var sectionQueryOptions = (subjectSlug, sectionSlug) => queryOptions({
	queryKey: [
		"section",
		subjectSlug,
		sectionSlug
	],
	queryFn: async () => {
		const { data, error } = await db.from("sections").select("*").eq("slug", sectionSlug).eq("subject_id", (await db.from("subjects").select("id").eq("slug", subjectSlug).maybeSingle())?.data?.id ?? "").maybeSingle();
		if (error) throw error;
		return data ?? null;
	}
});
var topicQueryOptions = (sectionSlug, topicSlug) => queryOptions({
	queryKey: [
		"topic",
		sectionSlug,
		topicSlug
	],
	queryFn: async () => {
		const { data, error } = await db.from("topics").select("*").eq("slug", topicSlug).maybeSingle();
		if (error) throw error;
		return data ?? null;
	}
});
var topicArticlesQueryOptions = (topicSlug) => queryOptions({
	queryKey: [
		"articles",
		"by-topic",
		topicSlug
	],
	queryFn: async () => {
		const { data, error } = await db.from("articles").select("*").eq("topic_slug", topicSlug).eq("published", true).order("sort", { ascending: true });
		if (error) throw error;
		return data ?? [];
	}
});
var $$splitComponentImporter$1 = () => import("../_subject._section._topic-B62N_-bB.mjs");
var subjectQueryOptions = (slug) => queryOptions({
	queryKey: ["subject", slug],
	queryFn: async () => {
		const { data, error } = await db.from("subjects").select("*").eq("slug", slug).maybeSingle();
		if (error) throw error;
		return data ?? null;
	}
});
var Route$1 = createFileRoute("/$subject/$section/$topic")({
	loader: async ({ context, params }) => {
		const subject = await context.queryClient.ensureQueryData(subjectQueryOptions(params.subject));
		if (!subject) throw notFound();
		const section = await context.queryClient.ensureQueryData(sectionQueryOptions(params.subject, params.section));
		if (!section) throw notFound();
		const topic = await context.queryClient.ensureQueryData(topicQueryOptions(params.section, params.topic));
		if (!topic) throw notFound();
		return {
			subject,
			section,
			topic,
			articles: await context.queryClient.ensureQueryData(topicArticlesQueryOptions(params.topic))
		};
	},
	head: ({ loaderData }) => {
		const title = loaderData ? `${loaderData.topic.title} — Ted's Lab` : "Ted's Lab";
		const description = loaderData?.topic.blurb ?? "";
		return { meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin.articles.new-BClFmnAY.mjs");
var Route = createFileRoute("/admin/articles/new")({
	head: () => ({ meta: [{ title: "New Article — Ted's Lab" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$81.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$82
});
var SubjectRoute = Route$80.update({
	id: "/$subject",
	path: "/$subject",
	getParentRoute: () => Route$82
});
var AddAppRoute = Route$79.update({
	id: "/add-app",
	path: "/add-app",
	getParentRoute: () => Route$82
});
var AdminRoute = Route$78.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$82
});
var AiRoute = Route$77.update({
	id: "/ai",
	path: "/ai",
	getParentRoute: () => Route$82
});
var AnatomyRoute = Route$76.update({
	id: "/anatomy",
	path: "/anatomy",
	getParentRoute: () => Route$82
});
var AnnotationSysRoute = Route$75.update({
	id: "/annotation-sys",
	path: "/annotation-sys",
	getParentRoute: () => Route$82
});
var ArticlesRoute = Route$74.update({
	id: "/articles",
	path: "/articles",
	getParentRoute: () => Route$82
});
var ArticlesDebugRoute = Route$73.update({
	id: "/articles-debug",
	path: "/articles-debug",
	getParentRoute: () => Route$82
});
var AuthRoute = Route$72.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$82
});
var BiologicalProcessesRoute = Route$71.update({
	id: "/biological-processes",
	path: "/biological-processes",
	getParentRoute: () => Route$82
});
var BiotechnologyRoute = Route$70.update({
	id: "/biotechnology",
	path: "/biotechnology",
	getParentRoute: () => Route$82
});
var CategoriesRoute = Route$69.update({
	id: "/categories",
	path: "/categories",
	getParentRoute: () => Route$82
});
var CellsMicroscopyRoute = Route$68.update({
	id: "/cells-microscopy",
	path: "/cells-microscopy",
	getParentRoute: () => Route$82
});
var ChronosOsRoute = Route$67.update({
	id: "/chronos-os",
	path: "/chronos-os",
	getParentRoute: () => Route$82
});
var CommunicationalSystemRoute = Route$66.update({
	id: "/communicational-system",
	path: "/communicational-system",
	getParentRoute: () => Route$82
});
var CustomListsRoute = Route$65.update({
	id: "/custom-lists",
	path: "/custom-lists",
	getParentRoute: () => Route$82
});
var DashboardRoute = Route$64.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$82
});
var DecipherRoute = Route$63.update({
	id: "/decipher",
	path: "/decipher",
	getParentRoute: () => Route$82
});
var DevDashboardRoute = Route$62.update({
	id: "/dev-dashboard",
	path: "/dev-dashboard",
	getParentRoute: () => Route$82
});
var DevToolsRoute = Route$61.update({
	id: "/dev-tools",
	path: "/dev-tools",
	getParentRoute: () => Route$82
});
var DocsRoute = Route$60.update({
	id: "/docs",
	path: "/docs",
	getParentRoute: () => Route$82
});
var DownloadRoute = Route$59.update({
	id: "/download",
	path: "/download",
	getParentRoute: () => Route$82
});
var DownloadableSoftwareRoute = Route$58.update({
	id: "/downloadable-software",
	path: "/downloadable-software",
	getParentRoute: () => Route$82
});
var EcologyEnvironmentRoute = Route$57.update({
	id: "/ecology-environment",
	path: "/ecology-environment",
	getParentRoute: () => Route$82
});
var EvolutionRoute = Route$56.update({
	id: "/evolution",
	path: "/evolution",
	getParentRoute: () => Route$82
});
var ExtensionToolsUploadRoute = Route$55.update({
	id: "/extension-tools-upload",
	path: "/extension-tools-upload",
	getParentRoute: () => Route$82
});
var ExtensionsRoute = Route$54.update({
	id: "/extensions",
	path: "/extensions",
	getParentRoute: () => Route$82
});
var FlashcardsRoute = Route$53.update({
	id: "/flashcards",
	path: "/flashcards",
	getParentRoute: () => Route$82
});
var GeneticsDnaRoute = Route$52.update({
	id: "/genetics-dna",
	path: "/genetics-dna",
	getParentRoute: () => Route$82
});
var GlossaryRoute = Route$51.update({
	id: "/glossary",
	path: "/glossary",
	getParentRoute: () => Route$82
});
var GraphicationRoute = Route$50.update({
	id: "/graphication",
	path: "/graphication",
	getParentRoute: () => Route$82
});
var HelpCenterRoute = Route$49.update({
	id: "/help-center",
	path: "/help-center",
	getParentRoute: () => Route$82
});
var HumanBiologyRoute = Route$48.update({
	id: "/human-biology",
	path: "/human-biology",
	getParentRoute: () => Route$82
});
var IdeSystemRoute = Route$47.update({
	id: "/ide-system",
	path: "/ide-system",
	getParentRoute: () => Route$82
});
var InformationUseRoute = Route$46.update({
	id: "/information-use",
	path: "/information-use",
	getParentRoute: () => Route$82
});
var KnowledgeAtlasRoute = Route$45.update({
	id: "/knowledge-atlas",
	path: "/knowledge-atlas",
	getParentRoute: () => Route$82
});
var LlmRoute = Route$44.update({
	id: "/llm",
	path: "/llm",
	getParentRoute: () => Route$82
});
var LostAtlasRoute = Route$43.update({
	id: "/lost-atlas",
	path: "/lost-atlas",
	getParentRoute: () => Route$82
});
var MapsRoute = Route$42.update({
	id: "/maps",
	path: "/maps",
	getParentRoute: () => Route$82
});
var NetworkRoute = Route$41.update({
	id: "/network",
	path: "/network",
	getParentRoute: () => Route$82
});
var NotebookRoute = Route$40.update({
	id: "/notebook",
	path: "/notebook",
	getParentRoute: () => Route$82
});
var OrganismsRoute = Route$39.update({
	id: "/organisms",
	path: "/organisms",
	getParentRoute: () => Route$82
});
var PagesRoute = Route$38.update({
	id: "/pages",
	path: "/pages",
	getParentRoute: () => Route$82
});
var PhotosyntheseRoute = Route$37.update({
	id: "/photosynthese",
	path: "/photosynthese",
	getParentRoute: () => Route$82
});
var PhotosynthesisRoute = Route$36.update({
	id: "/photosynthesis",
	path: "/photosynthesis",
	getParentRoute: () => Route$82
});
var PlantsRoute = Route$35.update({
	id: "/plants",
	path: "/plants",
	getParentRoute: () => Route$82
});
var PrivacyRoute = Route$34.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$82
});
var QuizzesRoute = Route$33.update({
	id: "/quizzes",
	path: "/quizzes",
	getParentRoute: () => Route$82
});
var SavedRoute = Route$32.update({
	id: "/saved",
	path: "/saved",
	getParentRoute: () => Route$82
});
var SettingsRoute = Route$31.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$82
});
var SignupRoute = Route$30.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$82
});
var SoftOsAdditionRoute = Route$29.update({
	id: "/soft-os-addition",
	path: "/soft-os-addition",
	getParentRoute: () => Route$82
});
var SpeciesScanRoute = Route$28.update({
	id: "/species-scan",
	path: "/species-scan",
	getParentRoute: () => Route$82
});
var TimelineRoute = Route$27.update({
	id: "/timeline",
	path: "/timeline",
	getParentRoute: () => Route$82
});
var TranslateRoute = Route$26.update({
	id: "/translate",
	path: "/translate",
	getParentRoute: () => Route$82
});
var TutorialsRoute = Route$25.update({
	id: "/tutorials",
	path: "/tutorials",
	getParentRoute: () => Route$82
});
var UpdateSoftRoute = Route$24.update({
	id: "/update-soft",
	path: "/update-soft",
	getParentRoute: () => Route$82
});
var VideosRoute = Route$23.update({
	id: "/videos",
	path: "/videos",
	getParentRoute: () => Route$82
});
var SectionTopicRoute = Route$22.update({
	id: "/$section/$topic",
	path: "/$section/$topic",
	getParentRoute: () => Route$82
});
var SubjectSectionRoute = Route$21.update({
	id: "/$section",
	path: "/$section",
	getParentRoute: () => SubjectRoute
});
var AdminArticlesRoute = Route$20.update({
	id: "/articles",
	path: "/articles",
	getParentRoute: () => AdminRoute
});
var AdminPagesRoute = Route$19.update({
	id: "/pages",
	path: "/pages",
	getParentRoute: () => AdminRoute
});
var AdminPagesListRoute = Route$18.update({
	id: "/pages-list",
	path: "/pages-list",
	getParentRoute: () => AdminRoute
});
var AdminSectionsRoute = Route$17.update({
	id: "/sections",
	path: "/sections",
	getParentRoute: () => AdminRoute
});
var AdminTopicsRoute = Route$16.update({
	id: "/topics",
	path: "/topics",
	getParentRoute: () => AdminRoute
});
var ArticlesSlugRoute = Route$15.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => ArticlesRoute
});
var ArticlesCellularRespirationRoute = Route$14.update({
	id: "/cellular-respiration",
	path: "/cellular-respiration",
	getParentRoute: () => ArticlesRoute
});
var ArticlesEnzymeCatalysisRoute = Route$13.update({
	id: "/enzyme-catalysis",
	path: "/enzyme-catalysis",
	getParentRoute: () => ArticlesRoute
});
var ArticlesEvolutionNaturalSelectionRoute = Route$12.update({
	id: "/evolution-natural-selection",
	path: "/evolution-natural-selection",
	getParentRoute: () => ArticlesRoute
});
var ArticlesFoodChainsEnergyFlowRoute = Route$11.update({
	id: "/food-chains-energy-flow",
	path: "/food-chains-energy-flow",
	getParentRoute: () => ArticlesRoute
});
var ArticlesHumanAnatomySystemsRoute = Route$10.update({
	id: "/human-anatomy-systems",
	path: "/human-anatomy-systems",
	getParentRoute: () => ArticlesRoute
});
var ArticlesMeiosisGameteFormationRoute = Route$9.update({
	id: "/meiosis-gamete-formation",
	path: "/meiosis-gamete-formation",
	getParentRoute: () => ArticlesRoute
});
var ArticlesMitosisCellDivisionRoute = Route$8.update({
	id: "/mitosis-cell-division",
	path: "/mitosis-cell-division",
	getParentRoute: () => ArticlesRoute
});
var ArticlesPhotosynthesisLightReactionsRoute = Route$7.update({
	id: "/photosynthesis-light-reactions",
	path: "/photosynthesis-light-reactions",
	getParentRoute: () => ArticlesRoute
});
var ExtensionsNoterRoute = Route$6.update({
	id: "/noter",
	path: "/noter",
	getParentRoute: () => ExtensionsRoute
});
var LostAtlasSlugRoute = Route$5.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => LostAtlasRoute
});
var PagesSlugRoute = Route$4.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => PagesRoute
});
var TutorialsSlugRoute = Route$3.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => TutorialsRoute
});
var VideosSlugRoute = Route$2.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => VideosRoute
});
var SubjectSectionTopicRoute = Route$1.update({
	id: "/$topic",
	path: "/$topic",
	getParentRoute: () => SubjectSectionRoute
});
var AdminArticlesNewRoute = Route.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => AdminArticlesRoute
});
var SubjectSectionRouteChildren = { SubjectSectionTopicRoute };
var SubjectRouteChildren = { SubjectSectionRoute: SubjectSectionRoute._addFileChildren(SubjectSectionRouteChildren) };
var SubjectRouteWithChildren = SubjectRoute._addFileChildren(SubjectRouteChildren);
var AdminArticlesRouteChildren = { AdminArticlesNewRoute };
var AdminRouteChildren = {
	AdminArticlesRoute: AdminArticlesRoute._addFileChildren(AdminArticlesRouteChildren),
	AdminPagesRoute,
	AdminPagesListRoute,
	AdminSectionsRoute,
	AdminTopicsRoute
};
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var ArticlesRouteChildren = {
	ArticlesSlugRoute,
	ArticlesCellularRespirationRoute,
	ArticlesEnzymeCatalysisRoute,
	ArticlesEvolutionNaturalSelectionRoute,
	ArticlesFoodChainsEnergyFlowRoute,
	ArticlesHumanAnatomySystemsRoute,
	ArticlesMeiosisGameteFormationRoute,
	ArticlesMitosisCellDivisionRoute,
	ArticlesPhotosynthesisLightReactionsRoute
};
var ArticlesRouteWithChildren = ArticlesRoute._addFileChildren(ArticlesRouteChildren);
var ExtensionsRouteChildren = { ExtensionsNoterRoute };
var ExtensionsRouteWithChildren = ExtensionsRoute._addFileChildren(ExtensionsRouteChildren);
var LostAtlasRouteChildren = { LostAtlasSlugRoute };
var LostAtlasRouteWithChildren = LostAtlasRoute._addFileChildren(LostAtlasRouteChildren);
var PagesRouteChildren = { PagesSlugRoute };
var PagesRouteWithChildren = PagesRoute._addFileChildren(PagesRouteChildren);
var TutorialsRouteChildren = { TutorialsSlugRoute };
var TutorialsRouteWithChildren = TutorialsRoute._addFileChildren(TutorialsRouteChildren);
var VideosRouteChildren = { VideosSlugRoute };
var rootRouteChildren = {
	IndexRoute,
	SubjectRoute: SubjectRouteWithChildren,
	AddAppRoute,
	AdminRoute: AdminRouteWithChildren,
	AiRoute,
	AnatomyRoute,
	AnnotationSysRoute,
	ArticlesRoute: ArticlesRouteWithChildren,
	ArticlesDebugRoute,
	AuthRoute,
	BiologicalProcessesRoute,
	BiotechnologyRoute,
	CategoriesRoute,
	CellsMicroscopyRoute,
	ChronosOsRoute,
	CommunicationalSystemRoute,
	CustomListsRoute,
	DashboardRoute,
	DecipherRoute,
	DevDashboardRoute,
	DevToolsRoute,
	DocsRoute,
	DownloadRoute,
	DownloadableSoftwareRoute,
	EcologyEnvironmentRoute,
	EvolutionRoute,
	ExtensionToolsUploadRoute,
	ExtensionsRoute: ExtensionsRouteWithChildren,
	FlashcardsRoute,
	GeneticsDnaRoute,
	GlossaryRoute,
	GraphicationRoute,
	HelpCenterRoute,
	HumanBiologyRoute,
	IdeSystemRoute,
	InformationUseRoute,
	KnowledgeAtlasRoute,
	LlmRoute,
	LostAtlasRoute: LostAtlasRouteWithChildren,
	MapsRoute,
	NetworkRoute,
	NotebookRoute,
	OrganismsRoute,
	PagesRoute: PagesRouteWithChildren,
	PhotosyntheseRoute,
	PhotosynthesisRoute,
	PlantsRoute,
	PrivacyRoute,
	QuizzesRoute,
	SavedRoute,
	SettingsRoute,
	SignupRoute,
	SoftOsAdditionRoute,
	SpeciesScanRoute,
	TimelineRoute,
	TranslateRoute,
	TutorialsRoute: TutorialsRouteWithChildren,
	UpdateSoftRoute,
	VideosRoute: VideosRoute._addFileChildren(VideosRouteChildren),
	SectionTopicRoute
};
var routeTree = Route$82._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	const queryClient = new QueryClient({ defaultOptions: { queries: {
		staleTime: 6e4,
		retry: 1
	} } });
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		context: { queryClient }
	});
}
//#endregion
export { subjectSectionsQueryOptions as A, getRouter as C, sectionQueryOptions$1 as D, sectionQueryOptions as E, topicArticlesQueryOptions$1 as M, topicQueryOptions as N, sectionQueryOptions$2 as O, topicQueryOptions$1 as P, description$9 as S, sectionArticlesQueryOptions as T, description$4 as _, Route$22 as a, description$7 as b, Route$5 as c, description$1 as d, description$10 as f, description$3 as g, description$2 as h, Route$21 as i, topicArticlesQueryOptions as j, subjectQueryOptions$2 as k, Route$80 as l, description$12 as m, Route$15 as n, Route$3 as o, description$11 as p, Route$2 as r, Route$4 as s, Route$1 as t, description as u, description$5 as v, router_exports as w, description$8 as x, description$6 as y };
