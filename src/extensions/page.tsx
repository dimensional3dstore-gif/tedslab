import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
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
    title: "Species scan",
    description: "Open the species scanner and prepare an observation report.",
    path: "/species-scan" as const,
  },
];

export default function ExtensionsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 p-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-foreground">Extensions</h1>
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
              <span className="block font-semibold text-foreground">{extension.title}</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {extension.description}
              </span>
            </span>
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
      <a
        href="/downloads/ChronosOS.dmg"
        download
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        <Download className="size-4" /> Download ChronosOS for Mac
      </a>
    </main>
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
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "notes.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="mx-auto w-full max-w-4xl space-y-5 p-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-foreground">Noter</h1>
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
    </main>
  );
}
