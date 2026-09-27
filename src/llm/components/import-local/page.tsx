import { useCallback, useEffect, useState } from "react";
import {
  Bot,
  CircleStop,
  LoaderCircle,
  MessageSquarePlus,
  Send,
  Settings2,
  Wifi,
  WifiOff,
} from "lucide-react";
import { AppShell } from "@/components/biopedia/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  chatWithOmlx,
  defaultOmlxUrl,
  isOmlxDesktopBridgeAvailable,
  listOmlxModels,
  loadOmlxModel,
  type OmlxModel,
} from "@/lib/omlx";

const CHAT_KEY = "chronium-ai:conversation:v1";
const CONFIG_KEY = "chronium-ai:local-config:v1";
const STARTER_PROMPTS = [
  "Explain photosynthesis in simple steps.",
  "Make me a 20-minute revision plan.",
  "What is the difference between mitosis and meiosis?",
];

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: "offline" | "omlx";
};
type LocalConfig = { baseUrl: string; model: string };

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

const initialMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Connect to your local oMLX server, choose a model, and load it to start a private chat.",
};

export function ChroniumAIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    readStored(CHAT_KEY, [initialMessage]),
  );
  const [config, setConfig] = useState<LocalConfig>(() =>
    (() => {
      const stored = readStored<Partial<LocalConfig>>(CONFIG_KEY, {});
      return {
        baseUrl: typeof stored.baseUrl === "string" ? stored.baseUrl : defaultOmlxUrl(),
        model: typeof stored.model === "string" ? stored.model : "",
      };
    })(),
  );
  const [baseUrlDraft, setBaseUrlDraft] = useState(config.baseUrl);
  const [apiKey, setApiKey] = useState("");
  const [models, setModels] = useState<OmlxModel[]>([]);
  const [loadedModel, setLoadedModel] = useState("");
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [discovering, setDiscovering] = useState(false);
  const [loadingModel, setLoadingModel] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [error, setError] = useState("");
  const modelReady = Boolean(config.model) && loadedModel === config.model;

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    let cancelled = false;
    void navigator.serviceWorker.ready.then((registration) => {
      if (cancelled) return;
      const assets = performance
        .getEntriesByType("resource")
        .map((entry) => new URL(entry.name, window.location.href))
        .filter(
          (url) => url.origin === window.location.origin && url.pathname.startsWith("/assets/"),
        )
        .map((url) => url.pathname + url.search);
      registration.active?.postMessage({ type: "CACHE_CHRONIUM", assets });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CHAT_KEY, JSON.stringify(messages));
    } catch {
      setError("Conversation storage is unavailable in this browser.");
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    } catch {
      setError("Local settings could not be saved in this browser.");
    }
  }, [config]);

  const discoverModels = useCallback(async (baseUrl: string, key = "") => {
    setDiscovering(true);
    setError("");
    try {
      const available = await listOmlxModels(baseUrl, key);
      setModels(available);
      setLoadedModel("");
      setConfig((current) => ({
        ...current,
        baseUrl,
        model: available.some((model) => model.id === current.model)
          ? current.model
          : (available[0]?.id ?? ""),
      }));
      if (available.length === 0) setError("oMLX is reachable, but no local models were found.");
    } catch (cause) {
      const detail =
        cause instanceof Error ? cause.message : "Could not reach the local model server.";
      const browserHelp = isOmlxDesktopBridgeAvailable()
        ? ""
        : " In a browser, configure oMLX CORS to allow this site's origin.";
      setModels([]);
      setLoadedModel("");
      setError(`${detail}${browserHelp}`);
    } finally {
      setDiscovering(false);
    }
  }, []);

  useEffect(() => {
    void discoverModels(config.baseUrl);
  }, [config.baseUrl, discoverModels]);

  useEffect(() => {
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
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: question };
    setMessages((current) => [...current, userMessage]);
    setDraft("");
    setBusy(true);
    setError("");

    try {
      const history = [...messages, userMessage]
        .slice(-16)
        .map(({ role, content }) => ({ role, content }));
      const response = await chatWithOmlx({ ...config, apiKey }, [
        {
          role: "system",
          content:
            "You are Chronium AI, a concise, accurate study assistant. Explain ideas clearly and support learning.",
        },
        ...history,
      ]);
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: "assistant", content: response, source: "omlx" },
      ]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The local model request failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AppShell>
      <div className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-5xl flex-col gap-5">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-primary/15 text-primary">
              <Bot className="size-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Ted's Lab · Local AI
              </p>
              <h1 className="font-display text-2xl font-bold text-foreground">Chronium AI</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs ${modelReady ? "border-green-500/25 bg-green-500/10 text-green-700" : "border-amber-500/30 bg-amber-500/10 text-amber-700"}`}
            >
              {modelReady ? <Wifi className="size-3.5" /> : <WifiOff className="size-3.5" />}
              {modelReady
                ? "Local model ready"
                : discovering
                  ? "Finding models"
                  : "Model not loaded"}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Local AI settings"
              title="Local AI settings"
              onClick={() => setShowSettings((value) => !value)}
            >
              <Settings2 className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Start a new chat"
              title="Start a new chat"
              onClick={() => {
                setMessages([initialMessage]);
                setError("");
              }}
            >
              <MessageSquarePlus className="size-4" />
            </Button>
          </div>
        </header>

        {showSettings && (
          <section className="bio-panel grid gap-4 p-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
            <label className="space-y-1 text-xs text-muted-foreground">
              Local oMLX server
              <Input
                value={baseUrlDraft}
                onChange={(event) => setBaseUrlDraft(event.target.value)}
                placeholder="http://127.0.0.1:8000"
              />
            </label>
            <label className="space-y-1 text-xs text-muted-foreground">
              API key <span className="normal-case">(optional, this tab only)</span>
              <Input
                type="password"
                autoComplete="new-password"
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                placeholder="Required only if oMLX authentication is enabled"
              />
            </label>
            <label className="space-y-1 text-xs text-muted-foreground">
              Model
              <select
                value={config.model}
                onChange={(event) => {
                  setLoadedModel("");
                  setConfig((current) => ({ ...current, model: event.target.value }));
                }}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
              >
                <option value="">No local model selected</option>
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.id}
                  </option>
                ))}
              </select>
            </label>
            <Button
              type="button"
              variant="outline"
              onClick={() => void discoverModels(baseUrlDraft, apiKey)}
              disabled={discovering || loadingModel}
            >
              {discovering ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Wifi className="size-4" />
              )}{" "}
              {models.length ? "Refresh models" : "Find local models"}
            </Button>
            <div className="flex flex-wrap items-center gap-3 md:col-span-3">
              <Button
                type="button"
                onClick={() => void loadSelectedModel()}
                disabled={!config.model || discovering || loadingModel || modelReady}
              >
                {loadingModel ? <LoaderCircle className="size-4 animate-spin" /> : null}
                {loadingModel
                  ? "Loading model…"
                  : modelReady
                    ? "Model loaded"
                    : "Load selected model"}
              </Button>
              <p role="status" className="text-xs text-muted-foreground">
                {modelReady
                  ? `${loadedModel} is loaded. Chat is enabled.`
                  : "Chat stays disabled until oMLX confirms the model has loaded."}
              </p>
            </div>
            <p className="text-xs text-muted-foreground md:col-span-3">
              The desktop app connects to loopback through its native bridge. Browser access
              requires the oMLX CORS allowlist to include this site's origin.
            </p>
          </section>
        )}

        <main className="flex min-h-[28rem] flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card/70">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Study conversation</p>
              <p className="text-xs text-muted-foreground">
                {modelReady ? `Local model · ${config.model}` : "Load a model to enable chat."}
              </p>
            </div>
            {busy && (
              <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <LoaderCircle className="size-3.5 animate-spin" />
                Thinking locally
              </span>
            )}
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
            {messages.map((message) => (
              <article
                key={message.id}
                className={`max-w-[88%] rounded-xl border px-4 py-3 ${message.role === "user" ? "ml-auto border-primary/20 bg-primary/10" : "border-border bg-background"}`}
              >
                <div className="mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <span>{message.role === "user" ? "You" : "Chronium AI"}</span>
                  {message.source && (
                    <span className="normal-case tracking-normal">
                      · {message.source === "omlx" ? "oMLX local model" : "offline knowledge"}
                    </span>
                  )}
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                  {message.content}
                </p>
              </article>
            ))}
            {busy && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CircleStop className="size-4 animate-pulse" />
                Preparing a response…
              </div>
            )}
          </div>
          {messages.length === 1 && modelReady && (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendMessage(prompt)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage();
            }}
            className="border-t border-border p-3 sm:p-4"
          >
            <div className="flex items-end gap-2 rounded-lg border border-input bg-background p-2 focus-within:border-primary/60">
              <textarea
                value={draft}
                disabled={!modelReady || busy}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void sendMessage();
                  }
                }}
                rows={2}
                placeholder={
                  modelReady ? "Ask your local model…" : "Load a local model to start chatting."
                }
                className="max-h-40 min-h-12 flex-1 resize-y bg-transparent px-2 py-1 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                size="icon"
                aria-label="Send message"
                disabled={busy || !modelReady || !draft.trim()}
              >
                <Send className="size-4" />
              </Button>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
              <span>
                Prompts go to the selected local oMLX server. Chat history stays in this browser.
              </span>
              {error && (
                <span role="status" className="text-amber-700">
                  {error}
                </span>
              )}
            </div>
          </form>
        </main>
      </div>
    </AppShell>
  );
}
