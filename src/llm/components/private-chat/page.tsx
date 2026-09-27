import { useState, type FormEvent } from "react";
import { buildAiResponse } from "@/ai";
import { PrivateChatLayout } from "./layout";

export default function PrivateChatPage() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = prompt.trim();
    if (!question || busy) return;
    setBusy(true);
    setAnswer("");
    try {
      setAnswer(await buildAiResponse(question));
    } finally {
      setBusy(false);
    }
  };

  return (
    <PrivateChatLayout>
      <header>
        <h1 className="font-display text-3xl font-bold text-foreground">Private study chat</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ask the local learning tutor. This page does not save a conversation history.
        </p>
      </header>
      <form onSubmit={submit} className="grid gap-3">
        <label htmlFor="private-chat-prompt" className="text-sm font-medium text-foreground">
          Question
        </label>
        <textarea
          id="private-chat-prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          maxLength={2000}
          required
          className="min-h-28 rounded-md border border-input bg-background p-3 text-sm text-foreground"
        />
        <button
          type="submit"
          disabled={busy || !prompt.trim()}
          className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {busy ? "Thinking…" : "Ask"}
        </button>
      </form>
      {answer && (
        <section
          aria-live="polite"
          className="llm-prose rounded-md border border-border bg-card p-5 text-sm"
        >
          {answer}
        </section>
      )}
    </PrivateChatLayout>
  );
}
