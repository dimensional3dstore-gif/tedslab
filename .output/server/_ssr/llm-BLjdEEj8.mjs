import { r as __toESM } from "../_runtime.mjs";
import { c as performance_default } from "../_libs/d3-force+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { $ as MessageSquarePlus, M as Send, Qt as Bot, a as WifiOff, i as Wifi, j as Settings2, st as LoaderCircle, zt as CircleStop } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-8wnhzt2S.mjs";
import { t as Button } from "./button-D0rYmyz_.mjs";
import { t as Input } from "./input-Ctxrk36z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/llm-BLjdEEj8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function isOmlxDesktopBridgeAvailable() {
	return typeof window !== "undefined" && Boolean(window.chronosOS?.omlx);
}
function apiBase(baseUrl) {
	return baseUrl.trim().replace(/\/+$/, "").replace(/\/v1$/, "");
}
async function readResponse(response) {
	const text = await response.text();
	let payload;
	try {
		payload = text ? JSON.parse(text) : null;
	} catch {
		payload = text;
	}
	if (!response.ok) {
		let message = `oMLX returned HTTP ${response.status}`;
		if (typeof payload === "object" && payload !== null) {
			if ("detail" in payload && typeof payload.detail === "string") message = payload.detail;
			else if ("error" in payload && typeof payload.error === "string") message = payload.error;
			else if ("error" in payload && typeof payload.error === "object" && payload.error !== null && "message" in payload.error && typeof payload.error.message === "string") message = payload.error.message;
		}
		throw new Error(message);
	}
	return payload;
}
function requestHeaders(apiKey, json = false) {
	const headers = new Headers({ Accept: "application/json" });
	if (json) headers.set("Content-Type", "application/json");
	if (apiKey?.trim()) headers.set("Authorization", `Bearer ${apiKey.trim()}`);
	return headers;
}
async function listOmlxModels(baseUrl, apiKey) {
	const bridge = typeof window === "undefined" ? void 0 : window.chronosOS?.omlx;
	const payload = bridge ? await bridge.listModels(baseUrl, apiKey) : await readResponse(await fetch(`${apiBase(baseUrl)}/v1/models`, { headers: requestHeaders(apiKey) }));
	if (!payload || typeof payload !== "object") throw new Error("oMLX returned an invalid model list.");
	const data = "data" in payload ? payload.data : void 0;
	return Array.isArray(data) ? data.filter((model) => typeof model?.id === "string") : [];
}
async function loadOmlxModel(baseUrl, modelId, apiKey) {
	if (!modelId.trim()) throw new Error("Select a local model first.");
	const bridge = typeof window === "undefined" ? void 0 : window.chronosOS?.omlx;
	const payload = bridge ? await bridge.loadModel(baseUrl, modelId, apiKey) : await readResponse(await fetch(`${apiBase(baseUrl)}/v1/models/${encodeURIComponent(modelId)}/load`, {
		method: "POST",
		headers: requestHeaders(apiKey)
	}));
	if (!payload || typeof payload !== "object" || !("status" in payload) || payload.status !== "ok" || !("model_id" in payload) || payload.model_id !== modelId) throw new Error("oMLX did not confirm that the selected model loaded.");
}
async function chatWithOmlx(config, messages) {
	if (!config.model.trim()) throw new Error("Select an oMLX model first.");
	const bridge = typeof window === "undefined" ? void 0 : window.chronosOS?.omlx;
	const payload = bridge ? await bridge.chat(config.baseUrl, config.model, messages, config.apiKey) : await readResponse(await fetch(`${apiBase(config.baseUrl)}/v1/chat/completions`, {
		method: "POST",
		headers: requestHeaders(config.apiKey, true),
		body: JSON.stringify({
			model: config.model,
			messages,
			temperature: .2,
			stream: false
		})
	}));
	if (!payload || typeof payload !== "object") throw new Error("oMLX returned an invalid chat response.");
	const choices = "choices" in payload ? payload.choices : void 0;
	const content = Array.isArray(choices) ? choices[0]?.message?.content : void 0;
	if (typeof content !== "string" || !content.trim()) throw new Error("oMLX returned no assistant content.");
	return content.trim();
}
function defaultOmlxUrl() {
	return "http://127.0.0.1:8000";
}
var CHAT_KEY = "chronium-ai:conversation:v1";
var CONFIG_KEY = "chronium-ai:local-config:v1";
var STARTER_PROMPTS = [
	"Explain photosynthesis in simple steps.",
	"Make me a 20-minute revision plan.",
	"What is the difference between mitosis and meiosis?"
];
function readStored(key, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : fallback;
	} catch {
		return fallback;
	}
}
var initialMessage = {
	id: "welcome",
	role: "assistant",
	content: "Connect to your local oMLX server, choose a model, and load it to start a private chat."
};
function ChroniumAIPage() {
	const [messages, setMessages] = (0, import_react.useState)(() => readStored(CHAT_KEY, [initialMessage]));
	const [config, setConfig] = (0, import_react.useState)(() => (() => {
		const stored = readStored(CONFIG_KEY, {});
		return {
			baseUrl: typeof stored.baseUrl === "string" ? stored.baseUrl : defaultOmlxUrl(),
			model: typeof stored.model === "string" ? stored.model : ""
		};
	})());
	const [baseUrlDraft, setBaseUrlDraft] = (0, import_react.useState)(config.baseUrl);
	const [apiKey, setApiKey] = (0, import_react.useState)("");
	const [models, setModels] = (0, import_react.useState)([]);
	const [loadedModel, setLoadedModel] = (0, import_react.useState)("");
	const [draft, setDraft] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [discovering, setDiscovering] = (0, import_react.useState)(false);
	const [loadingModel, setLoadingModel] = (0, import_react.useState)(false);
	const [showSettings, setShowSettings] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const modelReady = Boolean(config.model) && loadedModel === config.model;
	(0, import_react.useEffect)(() => {
		if (!("serviceWorker" in navigator)) return;
		let cancelled = false;
		navigator.serviceWorker.ready.then((registration) => {
			if (cancelled) return;
			const assets = performance_default.getEntriesByType("resource").map((entry) => new URL(entry.name, window.location.href)).filter((url) => url.origin === window.location.origin && url.pathname.startsWith("/assets/")).map((url) => url.pathname + url.search);
			registration.active?.postMessage({
				type: "CACHE_CHRONIUM",
				assets
			});
		});
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		try {
			localStorage.setItem(CHAT_KEY, JSON.stringify(messages));
		} catch {
			setError("Conversation storage is unavailable in this browser.");
		}
	}, [messages]);
	(0, import_react.useEffect)(() => {
		try {
			localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
		} catch {
			setError("Local settings could not be saved in this browser.");
		}
	}, [config]);
	const discoverModels = (0, import_react.useCallback)(async (baseUrl, key = "") => {
		setDiscovering(true);
		setError("");
		try {
			const available = await listOmlxModels(baseUrl, key);
			setModels(available);
			setLoadedModel("");
			setConfig((current) => ({
				...current,
				baseUrl,
				model: available.some((model) => model.id === current.model) ? current.model : available[0]?.id ?? ""
			}));
			if (available.length === 0) setError("oMLX is reachable, but no local models were found.");
		} catch (cause) {
			const detail = cause instanceof Error ? cause.message : "Could not reach the local model server.";
			const browserHelp = isOmlxDesktopBridgeAvailable() ? "" : " In a browser, configure oMLX CORS to allow this site's origin.";
			setModels([]);
			setLoadedModel("");
			setError(`${detail}${browserHelp}`);
		} finally {
			setDiscovering(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		discoverModels(config.baseUrl);
	}, [config.baseUrl, discoverModels]);
	(0, import_react.useEffect)(() => {
		setBaseUrlDraft(config.baseUrl);
	}, [config.baseUrl]);
	const loadSelectedModel = async () => {
		if (!config.model || !models.some((model) => model.id === config.model) || loadingModel) return;
		setLoadingModel(true);
		setLoadedModel("");
		setError("");
		try {
			await loadOmlxModel(config.baseUrl, config.model, apiKey);
			setLoadedModel(config.model);
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "The local model could not be loaded.");
		} finally {
			setLoadingModel(false);
		}
	};
	const sendMessage = async (text = draft) => {
		const question = text.trim();
		if (!question || busy || !modelReady) return;
		const userMessage = {
			id: crypto.randomUUID(),
			role: "user",
			content: question
		};
		setMessages((current) => [...current, userMessage]);
		setDraft("");
		setBusy(true);
		setError("");
		try {
			const history = [...messages, userMessage].slice(-16).map(({ role, content }) => ({
				role,
				content
			}));
			const response = await chatWithOmlx({
				...config,
				apiKey
			}, [{
				role: "system",
				content: "You are Chronium AI, a concise, accurate study assistant. Explain ideas clearly and support learning."
			}, ...history]);
			setMessages((current) => [...current, {
				id: crypto.randomUUID(),
				role: "assistant",
				content: response,
				source: "omlx"
			}]);
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "The local model request failed.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-5xl flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-11 place-items-center rounded-xl bg-primary/15 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.16em] text-primary",
						children: "Ted's Lab · Local AI"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-bold text-foreground",
						children: "Chronium AI"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs ${modelReady ? "border-green-500/25 bg-green-500/10 text-green-700" : "border-amber-500/30 bg-amber-500/10 text-amber-700"}`,
							children: [modelReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "size-3.5" }), modelReady ? "Local model ready" : discovering ? "Finding models" : "Model not loaded"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "icon",
							"aria-label": "Local AI settings",
							title: "Local AI settings",
							onClick: () => setShowSettings((value) => !value),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "icon",
							"aria-label": "Start a new chat",
							title: "Start a new chat",
							onClick: () => {
								setMessages([initialMessage]);
								setError("");
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquarePlus, { className: "size-4" })
						})
					]
				})]
			}),
			showSettings && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "bio-panel grid gap-4 p-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1 text-xs text-muted-foreground",
						children: ["Local oMLX server", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: baseUrlDraft,
							onChange: (event) => setBaseUrlDraft(event.target.value),
							placeholder: "http://127.0.0.1:8000"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1 text-xs text-muted-foreground",
						children: [
							"API key",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "normal-case",
								children: "(optional, this tab only)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "password",
								autoComplete: "new-password",
								value: apiKey,
								onChange: (event) => setApiKey(event.target.value),
								placeholder: "Required only if oMLX authentication is enabled"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1 text-xs text-muted-foreground",
						children: ["Model", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: config.model,
							onChange: (event) => {
								setLoadedModel("");
								setConfig((current) => ({
									...current,
									model: event.target.value
								}));
							},
							className: "h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "No local model selected"
							}), models.map((model) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: model.id,
								children: model.id
							}, model.id))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => void discoverModels(baseUrlDraft, apiKey),
						disabled: discovering || loadingModel,
						children: [
							discovering ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "size-4" }),
							" ",
							models.length ? "Refresh models" : "Find local models"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3 md:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							onClick: () => void loadSelectedModel(),
							disabled: !config.model || discovering || loadingModel || modelReady,
							children: [loadingModel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, loadingModel ? "Loading model…" : modelReady ? "Model loaded" : "Load selected model"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "status",
							className: "text-xs text-muted-foreground",
							children: modelReady ? `${loadedModel} is loaded. Chat is enabled.` : "Chat stays disabled until oMLX confirms the model has loaded."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground md:col-span-3",
						children: "The desktop app connects to loopback through its native bridge. Browser access requires the oMLX CORS allowlist to include this site's origin."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex min-h-[28rem] flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card/70",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-foreground",
							children: "Study conversation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: modelReady ? `Local model · ${config.model}` : "Load a model to enable chat."
						})] }), busy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }), "Thinking locally"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 space-y-4 overflow-y-auto p-4 sm:p-6",
						children: [messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: `max-w-[88%] rounded-xl border px-4 py-3 ${message.role === "user" ? "ml-auto border-primary/20 bg-primary/10" : "border-border bg-background"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: message.role === "user" ? "You" : "Chronium AI" }), message.source && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "normal-case tracking-normal",
									children: [
										"·",
										" ",
										message.source === "omlx" ? "oMLX local model" : "offline knowledge"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whitespace-pre-wrap text-sm leading-relaxed text-foreground",
								children: message.content
							})]
						}, message.id)), busy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleStop, { className: "size-4 animate-pulse" }), "Preparing a response…"]
						})]
					}),
					messages.length === 1 && modelReady && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2 px-4 pb-3",
						children: STARTER_PROMPTS.map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void sendMessage(prompt),
							className: "rounded-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground",
							children: prompt
						}, prompt))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (event) => {
							event.preventDefault();
							sendMessage();
						},
						className: "border-t border-border p-3 sm:p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end gap-2 rounded-lg border border-input bg-background p-2 focus-within:border-primary/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: draft,
								disabled: !modelReady || busy,
								onChange: (event) => setDraft(event.target.value),
								onKeyDown: (event) => {
									if (event.key === "Enter" && !event.shiftKey) {
										event.preventDefault();
										sendMessage();
									}
								},
								rows: 2,
								placeholder: modelReady ? "Ask your local model…" : "Load a local model to start chatting.",
								className: "max-h-40 min-h-12 flex-1 resize-y bg-transparent px-2 py-1 text-sm text-foreground outline-none placeholder:text-muted-foreground"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "icon",
								"aria-label": "Send message",
								disabled: busy || !modelReady || !draft.trim(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center justify-between gap-2 text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Prompts go to the selected local oMLX server. Chat history stays in this browser." }), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								role: "status",
								className: "text-amber-700",
								children: error
							})]
						})]
					})
				]
			})
		]
	}) });
}
var SplitComponent = ChroniumAIPage;
//#endregion
export { SplitComponent as component };
