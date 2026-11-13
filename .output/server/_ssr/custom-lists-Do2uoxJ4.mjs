import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { R as Plus, m as Trash2 } from "../_libs/lucide-react.mjs";
import { D as description$10 } from "./router-BZHCnLnl.mjs";
import { n as PageHeader, t as AppShell } from "./AppShell-6_41dtv3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/custom-lists-Do2uoxJ4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "biopedia:lists";
function CustomListsPage() {
	const [lists, setLists] = (0, import_react.useState)([]);
	const [name, setName] = (0, import_react.useState)("");
	const [drafts, setDrafts] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) setLists(JSON.parse(raw));
		} catch {}
	}, []);
	const save = (next) => {
		setLists(next);
		try {
			localStorage.setItem(KEY, JSON.stringify(next));
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Create Custom List",
			description: description$10
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				const n = name.trim();
				if (!n) return;
				save([{
					id: crypto.randomUUID(),
					name: n,
					items: []
				}, ...lists]);
				setName("");
			},
			className: "mt-6 flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: name,
				onChange: (e) => setName(e.target.value),
				placeholder: "List name, e.g. Exam revision",
				"aria-label": "List name",
				className: "h-11 flex-1 rounded-lg border border-border bg-card px-4 text-sm outline-none focus:border-primary/60"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "submit",
				className: "flex items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Create"]
			})]
		}),
		lists.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted-foreground",
			children: "No lists yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-4 sm:grid-cols-2",
			children: lists.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "bio-panel p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "flex-1 text-sm font-semibold",
							children: l.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Delete ${l.name}`,
							onClick: () => save(lists.filter((x) => x.id !== l.id)),
							className: "text-muted-foreground hover:text-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-1.5",
						children: l.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1",
									children: item
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": `Remove ${item}`,
									onClick: () => save(lists.map((x) => x.id === l.id ? {
										...x,
										items: x.items.filter((i) => i !== item)
									} : x)),
									className: "text-xs text-muted-foreground hover:text-destructive",
									children: "Remove"
								})
							]
						}, item))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							const v = (drafts[l.id] ?? "").trim();
							if (!v) return;
							save(lists.map((x) => x.id === l.id ? {
								...x,
								items: [...x.items, v]
							} : x));
							setDrafts({
								...drafts,
								[l.id]: ""
							});
						},
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: drafts[l.id] ?? "",
							onChange: (e) => setDrafts({
								...drafts,
								[l.id]: e.target.value
							}),
							placeholder: "Add a topic",
							"aria-label": `Add a topic to ${l.name}`,
							className: "h-9 flex-1 rounded-md border border-border bg-card px-3 text-xs outline-none focus:border-primary/60"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-md border border-border bg-secondary px-3 text-xs font-medium",
							children: "Add"
						})]
					})
				]
			}, l.id))
		})
	] });
}
//#endregion
export { CustomListsPage as component };
