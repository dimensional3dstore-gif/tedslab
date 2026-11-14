import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { useUserCollection } from "@/lib/user-data";

const title = "Notebook — Ted's Lab";
const description =
  "Keep your own biology study notes, synced to your account.";

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
  const {
    value: notes,
    save,
    user,
    isLoading,
    error,
  } = useUserCollection<Note[]>("notebook", "notes", []);
  const [draft, setDraft] = useState("");

  return (
    <AppShell>
      <PageHeader title="Notebook" description={description} />
      {!user && (
        <p className="mt-4 text-sm text-muted-foreground">
          Sign in to save notes across your devices.{" "}
          <Link
            to="/auth"
            className="text-primary underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      )}
      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          Your notes could not be saved.
        </p>
      )}
      {isLoading && (
        <p role="status" className="mt-4 text-sm text-muted-foreground">
          Loading your notes…
        </p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const text = draft.trim();
          if (!text) return;
          save([
            {
              id: crypto.randomUUID(),
              text,
              created: new Date().toLocaleString(),
            },
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
          disabled={!user}
        />
        <button
          type="submit"
          disabled={!user}
          className="mt-3 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
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
                <p className="mt-2 text-xs text-muted-foreground">
                  {n.created}
                </p>
              </div>
              <button
                type="button"
                aria-label="Delete note"
                disabled={!user}
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
