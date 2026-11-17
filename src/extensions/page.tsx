import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Download, ShieldCheck, Chrome } from "lucide-react";
import { AppShell } from "@/components/biopedia/AppShell";
import { getChronosOSDownloadUrl } from "@/lib/chronos-os-download";
import { FontBar } from "./components/noter/font-bar";
import { FormatBar } from "./components/noter/format-bar";
import type { NoteFont } from "./components/noter/font-options";

const extensions = [
  {
    title: "Noter",
    description: "Write and format notes locally, then export them as text.",
    path: "/extensions/noter" as const,
  },
  {
    title: "Sentinel",
    description: "Advanced systems monitoring, diagnostics, integrity and security.",
    path: "/sentinel" as const,
  },
  {
    title: "Species scan",
    description: "Open the species scanner and prepare an observation report.",
    path: "/species-scan" as const,
  },
];

export default function ExtensionsPage() {
  const chronosDownloadUrl = getChronosOSDownloadUrl();

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Extensions
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Small tools that extend writing and research.
          </p>
        </header>
        <div className="divide-y divide-border border-y border-border">
          {extensions.map((extension) => (
            <Link
              key={extension.title}
              to={extension.path}
              className="flex flex-wrap items-center justify-between gap-3 py-5 hover:text-primary"
            >
              <span>
                <span className="block font-semibold text-foreground">
                  {extension.title}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {extension.description}
                </span>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
        <section className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <h2 className="font-semibold text-foreground">Sentinel for Chrome</h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                A public Manifest V3 browser extension that pauses suspicious social links and explains risk locally before navigation.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://github.com/dimensional3dstore-gif/sentinel"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary"
                >
                  <Chrome className="size-4" />
                  Public extension source
                </a>
                <a
                  href="https://sentinel-download-dimensional3dstore-gif.vercel.app/sentinel-extension-v1.0.0.zip"
                  download
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  <Download className="size-4" />
                  Download Sentinel
                </a>
                <Link
                  to="/sentinel"
                  className="inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary"
                >
                  Open Sentinel
                </Link>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Download the ZIP, extract it, then open chrome://extensions, enable Developer mode, and choose Load unpacked. The first public Chrome Web Store submission must be completed from a Chrome Web Store developer account.
              </p>
            </div>
          </div>
        </section>
        <a
          href={chronosDownloadUrl}
          download
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          <Download className="size-4" /> Download ChronosOS for Mac
        </a>
      </div>
    </AppShell>
  );
}

export function NoterPage() {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [font, setFont] = useState<NoteFont>("sans");
  const [notice, setNotice] = useState("");

  const applyFormat = (format: "bold" | "italic" | "strike" | "underline") => {
    const editor = editorRef.current;
    if (!editor || editor.selectionStart === editor.selectionEnd) {
      setNotice("Select text in your note before applying a format.");
      return;
    }
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const wrappers = {
      bold: ["**", "**"],
      italic: ["*", "*"],
      strike: ["~~", "~~"],
      underline: ["<u>", "</u>"],
    } as const;
    const [before, after] = wrappers[format];
    const updated = `${text.slice(0, start)}${before}${text.slice(start, end)}${after}${text.slice(end)}`;
    setText(updated);
    setNotice("");
    requestAnimationFrame(() =>
      editor.setSelectionRange(start + before.length, end + before.length),
    );
  };

  const downloadNote = () => {
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "notes.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-4xl space-y-5">
        <header>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Noter
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Notes stay in this browser until you export them.
          </p>
        </header>
        <FormatBar onFormat={applyFormat} />
        <FontBar value={font} onChange={setFont} />
        <textarea
          ref={editorRef}
          value={text}
          onChange={(event) => setText(event.target.value)}
          aria-label="Note text"
          placeholder="Write a note…"
          className={`min-h-80 w-full rounded-md border border-input bg-background p-4 leading-relaxed text-foreground ${font === "serif" ? "font-serif" : font === "mono" ? "font-mono" : "font-sans"}`}
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p role="status" className="text-sm text-muted-foreground">
            {notice || `${text.length.toLocaleString()} characters`}
          </p>
          <button
            type="button"
            disabled={!text}
            onClick={downloadNote}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            <Download className="size-4" /> Download notes
          </button>
        </div>
      </div>
    </AppShell>
  );
}
