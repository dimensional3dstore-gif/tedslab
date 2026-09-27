import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";

const title = "Notebook — Ted's Lab";
const description = "Keep your own biology study notes, saved right in your browser.";
const KEY = "biopedia:notes";

type Note = { id: string; text: string; created: string };

export const Route = createFileRoute("/notebook")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NotebookPage,
});

function NotebookPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setNotes(JSON.parse(raw) as Note[]);
    } catch {
      /* ignore */
    }
  }, []);

  const save = (next: Note[]) => {
    setNotes(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  return (
    <AppShell>
      <PageHeader title="Notebook" description={description} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const text = draft.trim();
          if (!text) return;
          save([
            { id: crypto.randomUUID(), text, created: new Date().toLocaleString() },
            ...notes,
          ]);
          setDraft("");
        }}
        className="mt-6 bio-panel p-4"
      >
        <label htmlFor="note" className="text-sm font-medium">
          New note
        </label>
        <textarea
          id="note"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={4}
          placeholder="Write what you learned today..."
          className="mt-2 w-full rounded-lg border border-border bg-card p-3 text-sm outline-none focus:border-primary/60"
        />
        <button
          type="submit"
          className="mt-3 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Add note
        </button>
      </form>

      {notes.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">No notes yet.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {notes.map((n) => (
            <li key={n.id} className="flex items-start gap-3 bio-panel p-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm whitespace-pre-wrap">{n.text}</p>
                <p className="mt-2 text-xs text-muted-foreground">{n.created}</p>
              </div>
              <button
                type="button"
                aria-label="Delete note"
                onClick={() => save(notes.filter((x) => x.id !== n.id))}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
