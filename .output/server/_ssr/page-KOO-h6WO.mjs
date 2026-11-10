import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { Mt as Download, d as Underline, gt as Italic, rn as Bold, w as Strikethrough } from "../_libs/lucide-react.mjs";
import { t as getChronosOSDownloadUrl } from "./chronos-os-download-B3pWPTg4.mjs";
import { t as AppShell } from "./AppShell-BSLOU_FO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-KOO-h6WO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FontOptions({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "inline-flex items-center gap-2 text-xs text-muted-foreground",
		children: ["Font", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			"aria-label": "Note font",
			value,
			onChange: (event) => onChange(event.target.value),
			className: "rounded-md border border-input bg-background px-2 py-1 text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "sans",
					children: "Sans"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "serif",
					children: "Serif"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "mono",
					children: "Mono"
				})
			]
		})]
	});
}
function FontBar({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center border-y border-border py-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontOptions, {
			value,
			onChange
		})
	});
}
function NoterButton({ icon, label, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		...props,
		type: props.type ?? "button",
		title: label,
		"aria-label": label,
		className: `inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground hover:bg-secondary disabled:opacity-50 ${props.className ?? ""}`,
		children: icon
	});
}
function BoldButton({ onFormat }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoterButton, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bold, { className: "size-4" }),
		label: "Bold",
		onClick: () => onFormat("bold")
	});
}
function ItalicButton({ onFormat }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoterButton, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Italic, { className: "size-4" }),
		label: "Italic",
		onClick: () => onFormat("italic")
	});
}
function StrikethroughButton({ onFormat }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoterButton, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strikethrough, { className: "size-4" }),
		label: "Strikethrough",
		onClick: () => onFormat("strike")
	});
}
function FormatBar({ onFormat }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "toolbar",
		"aria-label": "Text formatting",
		className: "flex flex-wrap gap-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoldButton, { onFormat }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItalicButton, { onFormat }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StrikethroughButton, { onFormat }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoterButton, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Underline, { className: "size-4" }),
				label: "Underline",
				onClick: () => onFormat("underline")
			})
		]
	});
}
var extensions = [{
	title: "Noter",
	description: "Write and format notes locally, then export them as text.",
	path: "/extensions/noter"
}, {
	title: "Species scan",
	description: "Open the species scanner and prepare an observation report.",
	path: "/species-scan"
}];
function ExtensionsPage() {
	const chronosDownloadUrl = getChronosOSDownloadUrl();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-5xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold text-foreground",
				children: "Extensions"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Small tools that extend writing and research."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y divide-border border-y border-border",
				children: extensions.map((extension) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: extension.path,
					className: "flex flex-wrap items-center justify-between gap-3 py-5 hover:text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-semibold text-foreground",
						children: extension.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-sm text-muted-foreground",
						children: extension.description
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: "→"
					})]
				}, extension.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: chronosDownloadUrl,
				download: true,
				className: "inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Download ChronosOS for Mac"]
			})
		]
	}) });
}
function NoterPage() {
	const editorRef = (0, import_react.useRef)(null);
	const [text, setText] = (0, import_react.useState)("");
	const [font, setFont] = (0, import_react.useState)("sans");
	const [notice, setNotice] = (0, import_react.useState)("");
	const applyFormat = (format) => {
		const editor = editorRef.current;
		if (!editor || editor.selectionStart === editor.selectionEnd) {
			setNotice("Select text in your note before applying a format.");
			return;
		}
		const start = editor.selectionStart;
		const end = editor.selectionEnd;
		const [before, after] = {
			bold: ["**", "**"],
			italic: ["*", "*"],
			strike: ["~~", "~~"],
			underline: ["<u>", "</u>"]
		}[format];
		const updated = `${text.slice(0, start)}${before}${text.slice(start, end)}${after}${text.slice(end)}`;
		setText(updated);
		setNotice("");
		requestAnimationFrame(() => editor.setSelectionRange(start + before.length, end + before.length));
	};
	const downloadNote = () => {
		const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = "notes.txt";
		anchor.click();
		URL.revokeObjectURL(url);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-4xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold text-foreground",
				children: "Noter"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Notes stay in this browser until you export them."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormatBar, { onFormat: applyFormat }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontBar, {
				value: font,
				onChange: setFont
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				ref: editorRef,
				value: text,
				onChange: (event) => setText(event.target.value),
				"aria-label": "Note text",
				placeholder: "Write a note…",
				className: `min-h-80 w-full rounded-md border border-input bg-background p-4 leading-relaxed text-foreground ${font === "serif" ? "font-serif" : font === "mono" ? "font-mono" : "font-sans"}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "status",
					className: "text-sm text-muted-foreground",
					children: notice || `${text.length.toLocaleString()} characters`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: !text,
					onClick: downloadNote,
					className: "inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Download notes"]
				})]
			})
		]
	}) });
}
//#endregion
export { NoterPage as n, ExtensionsPage as t };
