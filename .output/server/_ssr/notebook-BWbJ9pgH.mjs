import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { m as Trash2 } from "../_libs/lucide-react.mjs";
import { y as description$6 } from "./router-BOjcgrMn2.mjs";
import { n as PageHeader, t as AppShell } from "./AppShell-BSLOU_FO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notebook-BWbJ9pgH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "biopedia:notes";
function NotebookPage() {
	const [notes, setNotes] = (0, import_react.useState)([]);
	const [draft, setDraft] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) setNotes(JSON.parse(raw));
		} catch {}
	}, []);
	const save = (next) => {
		setNotes(next);
		try {
			localStorage.setItem(KEY, JSON.stringify(next));
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Notebook",
			description: description$6
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				const text = draft.trim();
				if (!text) return;
				save([{
					id: crypto.randomUUID(),
					text,
					created: (/* @__PURE__ */ new Date()).toLocaleString()
				}, ...notes]);
				setDraft("");
			},
			className: "mt-6 bio-panel p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "note",
					className: "text-sm font-medium",
					children: "New note"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "note",
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					rows: 4,
					placeholder: "Write what you learned today...",
					className: "mt-2 w-full rounded-lg border border-border bg-card p-3 text-sm outline-none focus:border-primary/60"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "mt-3 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
					children: "Add note"
				})
			]
		}),
		notes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted-foreground",
			children: "No notes yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-3",
			children: notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-start gap-3 bio-panel p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm whitespace-pre-wrap",
						children: n.text
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: n.created
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Delete note",
					onClick: () => save(notes.filter((x) => x.id !== n.id)),
					className: "text-muted-foreground hover:text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
				})]
			}, n.id))
		})
	] });
}
//#endregion
export { NotebookPage as component };
