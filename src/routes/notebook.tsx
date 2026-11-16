import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bot, LoaderCircle, Save, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { chatWithOmlx } from "@/lib/omlx";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { useUserCollection } from "@/lib/user-data";

const title = "Notebook — Ted's Lab";
const description =
  "Keep your own biology study notes, synced to your account.";

type Note = { id: string; text: string; created: string };
type TutorTurn = { role: "user" | "assistant"; content: string };
type NexiumConfig = { baseUrl: string; model: string };
const EMPTY_NOTES: Note[] = [];

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
    saveAsync,
    user,
    isLoading,
    error,
  } = useUserCollection<Note[]>("notebook", "notes", EMPTY_NOTES);
  const [draft, setDraft] = useState("");
  const [nexium, setNexium] = useState<NexiumConfig | null>(null);
  const [tutorPrompt, setTutorPrompt] = useState("");
  const [tutorTurns, setTutorTurns] = useState<TutorTurn[]>([]);
  const [tutorBusy, setTutorBusy] = useState(false);
  const [tutorError, setTutorError] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState("");

  useEffect(() => {
    let active = true;
    void supabase.from("site_settings").select("key,value").in("key", ["nexium_omlx_url", "nexium_omlx_model"]).then(({data,error}) => {
      if (!active) return;
      if (error) { setTutorError("Nexium settings could not be loaded."); return; }
      const values = Object.fromEntries((data ?? []).map((row) => [row.key,row.value]));
      if (values.nexium_omlx_url && values.nexium_omlx_model) setNexium({baseUrl:values.nexium_omlx_url,model:values.nexium_omlx_model});
    });
    return () => { active = false; };
  }, []);

  const saveNotebook = async () => {
    if (!user) return;
    setSaving(true);
    try { await saveAsync(notes); setSavedAt(new Date().toLocaleTimeString()); }
    catch { setTutorError("Notebook could not be saved. Please try again."); }
    finally { setSaving(false); }
  };

  const askNexium = async () => {
    const prompt = tutorPrompt.trim();
    if (!prompt || !nexium || tutorBusy) return;
    const next = [...tutorTurns, {role:"user" as const,content:prompt}];
    setTutorTurns(next); setTutorPrompt(""); setTutorBusy(true); setTutorError("");
    try {
      const context = notes.map((note) => note.text).join("\n\n");
      const answer = await chatWithOmlx(nexium,[{role:"system",content:"You are Nexium, the Ted Lab study tutor. Help the learner understand their notes. Explain accurately, use clear headings, examples and step-by-step reasoning. Never invent details absent from the notes."},{role:"user",content:"Notebook notes:\n"+context+"\n\nQuestion: "+prompt},...next.slice(1)]);
      setTutorTurns((current)=>[...current,{role:"assistant",content:answer}]);
    } catch (error) { setTutorError(error instanceof Error ? error.message : "Nexium could not respond."); }
    finally { setTutorBusy(false); }
  };

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

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button type="button" onClick={() => void saveNotebook()} disabled={!user || saving}><Save className="mr-2 size-4"/>{saving ? "Saving…" : "Save notebook"}</Button>
        <span className="text-xs text-muted-foreground">{savedAt ? "Saved at " + savedAt : "Save your notes to your account."}</span>
      </div>
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
          Save note
        </button>
      </form>

      <section className="mt-8 bio-panel p-4">
        <div className="mb-3 flex items-center gap-2"><Bot className="size-5 text-primary"/><h2 className="font-semibold">Ask Nexium about your notes</h2></div>
        <p className="mb-3 text-sm text-muted-foreground">Nexium uses the administrator-loaded shared model and your notebook as context.</p>
        <div className="space-y-3">{tutorTurns.map((turn,index)=><article key={index} className={"rounded-lg p-3 text-sm leading-7 " + (turn.role==="user"?"ml-8 bg-primary/10":"mr-4 bg-secondary/60")}><p className="mb-1 text-[10px] font-semibold uppercase text-muted-foreground">{turn.role==="user"?"You":"Nexium"}</p><div className="whitespace-pre-wrap">{turn.content}</div></article>)}</div>
        <form onSubmit={(event)=>{event.preventDefault();void askNexium();}} className="mt-3 flex gap-2"><textarea value={tutorPrompt} onChange={(event)=>setTutorPrompt(event.target.value)} rows={2} disabled={!nexium || tutorBusy} placeholder={nexium ? "Ask for an explanation, summary, quiz or revision plan…" : "Nexium has not been configured by an administrator yet."} className="min-w-0 flex-1 rounded-lg border border-border bg-background p-3 text-sm" /><Button type="submit" disabled={!nexium || tutorBusy || !tutorPrompt.trim()}>{tutorBusy?<LoaderCircle className="size-4 animate-spin"/>:<Send className="size-4"/>}</Button></form>
        {tutorError && <p role="alert" className="mt-2 text-sm text-destructive">{tutorError}</p>}
      </section>

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
