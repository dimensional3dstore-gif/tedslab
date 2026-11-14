import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { useUserCollection } from "@/lib/user-data";

const title = "Custom Lists — Ted's Lab";
const description =
  "Group topics into your own study lists and tick them off as you go.";

type List = { id: string; name: string; items: string[] };

export const Route = createFileRoute("/custom-lists")({
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
  component: CustomListsPage,
});

function CustomListsPage() {
  const {
    value: lists,
    save,
    user,
    isLoading,
    error,
  } = useUserCollection<List[]>("custom-lists", "lists", []);
  const [name, setName] = useState("");
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  return (
    <AppShell>
      <PageHeader title="Create Custom List" description={description} />
      {!user && (
        <p className="mt-4 text-sm text-muted-foreground">
          Sign in to save study lists across your devices.{" "}
          <Link
            to="/auth"
            className="text-primary underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      )}
      {isLoading && (
        <p role="status" className="mt-4 text-sm text-muted-foreground">
          Loading your lists…
        </p>
      )}
      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          Your lists could not be saved.
        </p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const n = name.trim();
          if (!n) return;
          save([{ id: crypto.randomUUID(), name: n, items: [] }, ...lists]);
          setName("");
        }}
        className="mt-6 flex gap-2"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!user}
          placeholder="List name, e.g. Exam revision"
          aria-label="List name"
          className="h-11 flex-1 rounded-lg border border-border bg-card px-4 text-sm outline-none focus:border-primary/60"
        />
        <button
          type="submit"
          disabled={!user}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          <Plus className="size-4" /> Create
        </button>
      </form>

      {lists.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">No lists yet.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {lists.map((l) => (
            <section key={l.id} className="bio-panel p-4">
              <div className="flex items-center gap-3">
                <h2 className="flex-1 text-sm font-semibold">{l.name}</h2>
                <button
                  type="button"
                  aria-label={`Delete ${l.name}`}
                  disabled={!user}
                  onClick={() => save(lists.filter((x) => x.id !== l.id))}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <ul className="mt-3 space-y-1.5">
                {l.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span className="size-1.5 rounded-full bg-primary" />
                    <span className="flex-1">{item}</span>
                    <button
                      type="button"
                      disabled={!user}
                      aria-label={`Remove ${item}`}
                      onClick={() =>
                        save(
                          lists.map((x) =>
                            x.id === l.id
                              ? {
                                  ...x,
                                  items: x.items.filter((i) => i !== item),
                                }
                              : x,
                          ),
                        )
                      }
                      className="text-xs text-muted-foreground hover:text-destructive"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const v = (drafts[l.id] ?? "").trim();
                  if (!v) return;
                  save(
                    lists.map((x) =>
                      x.id === l.id ? { ...x, items: [...x.items, v] } : x,
                    ),
                  );
                  setDrafts({ ...drafts, [l.id]: "" });
                }}
                className="mt-3 flex gap-2"
              >
                <input
                  value={drafts[l.id] ?? ""}
                  disabled={!user}
                  onChange={(e) =>
                    setDrafts({ ...drafts, [l.id]: e.target.value })
                  }
                  placeholder="Add a topic"
                  aria-label={`Add a topic to ${l.name}`}
                  className="h-9 flex-1 rounded-md border border-border bg-card px-3 text-xs outline-none focus:border-primary/60"
                />
                <button
                  type="submit"
                  disabled={!user}
                  className="rounded-md border border-border bg-secondary px-3 text-xs font-medium disabled:opacity-50"
                >
                  Add
                </button>
              </form>
            </section>
          ))}
        </div>
      )}
    </AppShell>
  );
}
