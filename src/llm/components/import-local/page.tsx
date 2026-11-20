import { useEffect, useState } from "react";
import {
  Bot,
  LoaderCircle,
  MessageSquarePlus,
  Save,
  Send,
  Wifi,
} from "lucide-react";
import { AppShell } from "@/components/biopedia/AppShell";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useUserCollection } from "@/lib/user-data";

const CHAT_KEY = "nexium-ai:conversation:v2";
const STARTER_PROMPTS = [
  "Explain photosynthesis in simple steps.",
  "Make me a 20-minute revision plan.",
  "What is the difference between mitosis and meiosis?",
];

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: "openrouter";
};

const initialMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Nexium is ready. Ask a question and I’ll answer using OpenRouter.",
};

const initialChatMessages: ChatMessage[] = [initialMessage];

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function NexiumAIPage() {
  const { loading: authLoading } = useAuth();
  const { value: cloudChat, saveAsync: saveCloudChat, user } =
    useUserCollection<ChatMessage[]>("chats", "nexium-main", initialChatMessages);
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    readStored(CHAT_KEY, [initialMessage]),
  );
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [chatSaveStatus, setChatSaveStatus] = useState("");

  useEffect(() => {
    if (user && cloudChat.length) setMessages(cloudChat);
  }, [user?.id, cloudChat]);

  useEffect(() => {
    try {
      localStorage.setItem(CHAT_KEY, JSON.stringify(messages));
    } catch {
      setError("Conversation storage is unavailable in this browser.");
    }
  }, [messages]);

  const saveConversation = async () => {
    if (!user) {
      setChatSaveStatus("Sign in to save chats.");
      return;
    }
    try {
      await saveCloudChat(messages);
      setChatSaveStatus("Chat saved to your account.");
    } catch {
      setChatSaveStatus("Chat could not be saved. Try again.");
    }
  };

  const sendMessage = async (text = draft) => {
    const question = text.trim();
    if (!question || busy) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
    };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setDraft("");
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/llm/api/nexium", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .slice(-16)
            .map(({ role, content }) => ({ role, content })),
        }),
      });
      const payload = await response.json();
      if (!response.ok || typeof payload.answer !== "string") {
        throw new Error(payload.error ?? "Nexium could not respond.");
      }
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: payload.answer,
          source: "openrouter",
        },
      ]);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Nexium could not respond.",
      );
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
                Ted's Lab · AI Tutor
              </p>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Nexium
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1.5 text-xs text-green-700">
              <Wifi className="size-3.5" />
              OpenRouter connected
            </span>
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

        <main className="flex min-h-[28rem] flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card/70">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Study conversation
              </p>
              <p className="text-xs text-muted-foreground">
                Powered by OpenRouter · model configured server-side
              </p>
            </div>
            {busy && (
              <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <LoaderCircle className="size-3.5 animate-spin" />
                Nexium is thinking
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
                  <span>{message.role === "user" ? "You" : "Nexium"}</span>
                  {message.source && (
                    <span className="normal-case tracking-normal">
                      · OpenRouter
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
                <LoaderCircle className="size-4 animate-spin" />
                Preparing a response…
              </div>
            )}
          </div>

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendMessage(prompt)}
                  disabled={busy || authLoading}
                  className="rounded-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <div className="border-t border-border px-4 py-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => void saveConversation()}
              disabled={!user}
            >
              <Save className="mr-2 size-4" />
              Save chat
            </Button>
            <span className="ml-3 text-xs text-muted-foreground">
              {chatSaveStatus}
            </span>
          </div>

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
                disabled={busy}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void sendMessage();
                  }
                }}
                rows={2}
                placeholder="Ask Nexium anything about your studies…"
                className="max-h-40 min-h-12 flex-1 resize-y bg-transparent px-2 py-1 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                size="icon"
                aria-label="Send message"
                disabled={busy || !draft.trim()}
              >
                <Send className="size-4" />
              </Button>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
              <span>Responses are generated by OpenRouter.</span>
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
