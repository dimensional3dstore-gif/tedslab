import { useState, type FormEvent } from "react";
import { Copy, Languages } from "lucide-react";
import { TranslateButton } from "./components/ui/button";
import { TranslateBreadcrumb } from "./components/ui/breadcrumb";
import { TranslateLayout } from "./layout";

const languages = ["en", "es", "fr", "de", "it", "ja", "ko", "pt", "zh"];

export default function TranslatePage() {
  const [text, setText] = useState("");
  const [source, setSource] = useState("en");
  const [target, setTarget] = useState("es");
  const [translation, setTranslation] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const translate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const endpoint = import.meta.env["VITE_TRANSLATE_API_URL"];
    if (!endpoint) {
      setMessage(
        "Translation is not configured. Set VITE_TRANSLATE_API_URL to a compatible provider endpoint.",
      );
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text, source, target, format: "text" }),
      });
      const result: unknown = await response.json();
      if (
        !response.ok ||
        !result ||
        typeof result !== "object" ||
        !("translatedText" in result) ||
        typeof result.translatedText !== "string"
      )
        throw new Error("The translation provider returned an invalid response.");
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

  return (
    <TranslateLayout>
      <TranslateBreadcrumb steps={["Language tools", "Translator"]} />
      <header>
        <h1 className="font-display text-3xl font-bold text-foreground">Translator</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Translate text with the provider configured for this deployment.
        </p>
      </header>
      <form onSubmit={translate} className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2 text-sm text-foreground">
            From
            <select
              value={source}
              onChange={(event) => setSource(event.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2"
            >
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language.toUpperCase()}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-foreground">
            To
            <select
              value={target}
              onChange={(event) => setTarget(event.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2"
            >
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language.toUpperCase()}
                </option>
              ))}
            </select>
          </label>
        </div>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={10_000}
          required
          aria-label="Text to translate"
          placeholder="Enter up to 10,000 characters"
          className="min-h-40 w-full rounded-md border border-input bg-background p-3 text-sm text-foreground"
        />
        <TranslateButton disabled={busy || !text.trim()}>
          <Languages className="mr-2 size-4" />
          {busy ? "Translating…" : "Translate"}
        </TranslateButton>
      </form>
      {translation && (
        <section className="space-y-3 border-t border-border pt-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold text-foreground">Translation</h2>
            <button
              type="button"
              onClick={copyTranslation}
              aria-label="Copy translation"
              title="Copy translation"
              className="rounded-md border border-border p-2 hover:bg-secondary"
            >
              <Copy className="size-4" />
            </button>
          </div>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {translation}
          </p>
        </section>
      )}
      <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
        {message}
      </p>
    </TranslateLayout>
  );
}
