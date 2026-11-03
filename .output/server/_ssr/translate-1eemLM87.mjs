import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { Ft as Copy, ht as Languages } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/translate-1eemLM87.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TranslateButton({ className = "", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		...props,
		type: props.type ?? "button",
		className: `inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 ${className}`
	});
}
function TranslateBreadcrumb({ steps }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Translation steps",
		className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
		children: steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-2",
			children: [index > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				children: "/"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-current": index === steps.length - 1 ? "step" : void 0,
				children: step
			})]
		}, `${step}-${index}`))
	});
}
function TranslateLayout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto w-full max-w-5xl space-y-6 p-6",
		children
	});
}
var languages = [
	"en",
	"es",
	"fr",
	"de",
	"it",
	"ja",
	"ko",
	"pt",
	"zh"
];
function TranslatePage() {
	const [text, setText] = (0, import_react.useState)("");
	const [source, setSource] = (0, import_react.useState)("en");
	const [target, setTarget] = (0, import_react.useState)("es");
	const [translation, setTranslation] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const translate = async (event) => {
		event.preventDefault();
		const endpoint = {
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SSR": true,
			"TSS_DEV_SERVER": "false",
			"TSS_DEV_SSR_STYLES_BASEPATH": "/",
			"TSS_DEV_SSR_STYLES_ENABLED": "true",
			"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
			"TSS_INLINE_CSS_ENABLED": "false",
			"TSS_ROUTER_BASEPATH": "",
			"TSS_SERVER_FN_BASE": "/_serverFn/"
		}["VITE_TRANSLATE_API_URL"];
		if (!endpoint) {
			setMessage("Translation is not configured. Set VITE_TRANSLATE_API_URL to a compatible provider endpoint.");
			return;
		}
		setBusy(true);
		setMessage("");
		try {
			const response = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					q: text,
					source,
					target,
					format: "text"
				})
			});
			const result = await response.json();
			if (!response.ok || !result || typeof result !== "object" || !("translatedText" in result) || typeof result.translatedText !== "string") throw new Error("The translation provider returned an invalid response.");
			setTranslation(result.translatedText);
			setMessage("Translation complete.");
		} catch (error) {
			setMessage(error instanceof Error ? error.message : "Translation failed.");
		} finally {
			setBusy(false);
		}
	};
	const copyTranslation = async () => {
		try {
			await navigator.clipboard.writeText(translation);
			setMessage("Translation copied.");
		} catch {
			setMessage("Clipboard access is unavailable in this browser context.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TranslateLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranslateBreadcrumb, { steps: ["Language tools", "Translator"] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold text-foreground",
			children: "Translator"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Translate text with the provider configured for this deployment."
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: translate,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-2 text-sm text-foreground",
						children: ["From", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: source,
							onChange: (event) => setSource(event.target.value),
							className: "rounded-md border border-input bg-background px-3 py-2",
							children: languages.map((language) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: language,
								children: language.toUpperCase()
							}, language))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-2 text-sm text-foreground",
						children: ["To", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: target,
							onChange: (event) => setTarget(event.target.value),
							className: "rounded-md border border-input bg-background px-3 py-2",
							children: languages.map((language) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: language,
								children: language.toUpperCase()
							}, language))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: text,
					onChange: (event) => setText(event.target.value),
					maxLength: 1e4,
					required: true,
					"aria-label": "Text to translate",
					placeholder: "Enter up to 10,000 characters",
					className: "min-h-40 w-full rounded-md border border-input bg-background p-3 text-sm text-foreground"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TranslateButton, {
					disabled: busy || !text.trim(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "mr-2 size-4" }), busy ? "Translating…" : "Translate"]
				})
			]
		}),
		translation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-3 border-t border-border pt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold text-foreground",
					children: "Translation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: copyTranslation,
					"aria-label": "Copy translation",
					title: "Copy translation",
					className: "rounded-md border border-border p-2 hover:bg-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-wrap text-sm leading-relaxed text-foreground",
				children: translation
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			role: "status",
			"aria-live": "polite",
			className: "text-sm text-muted-foreground",
			children: message
		})
	] });
}
var SplitComponent = TranslatePage;
//#endregion
export { SplitComponent as component };
