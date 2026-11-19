import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ArticleCardBlock } from "@/lib/article-layout";

export function FlashcardDeckInserter({
  onInsert,
}: {
  onInsert: (title: string, cards: ArticleCardBlock[]) => void;
}) {
  const [title, setTitle] = useState("Quick review");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [cards, setCards] = useState<ArticleCardBlock[]>([]);

  function addCard() {
    if (!front.trim() || !back.trim()) return;
    setCards((current) => [...current, { title: front.trim(), text: back.trim() }]);
    setFront("");
    setBack("");
  }

  function insertDeck() {
    if (front.trim() && back.trim()) {
      setCards((current) => [...current, { title: front.trim(), text: back.trim() }]);
      setFront("");
      setBack("");
    }
    const finalCards = front.trim() && back.trim()
      ? [...cards, { title: front.trim(), text: back.trim() }]
      : cards;
    if (!finalCards.length) return;
    onInsert(title.trim() || "Quick review", finalCards);
    setCards([]);
  }

  return (
    <div className="rounded-xl border border-border bg-background/60 p-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Insert flashcard deck</p>
      <InputLike value={title} onChange={setTitle} placeholder="Deck title" />
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <InputLike value={front} onChange={setFront} placeholder="Front / question" />
        <InputLike value={back} onChange={setBack} placeholder="Back / answer" />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <Button type="button" variant="outline" onClick={addCard}>Add card{cards.length ? ` (${cards.length})` : ""}</Button>
        <Button type="button" onClick={insertDeck} disabled={!cards.length && (!front.trim() || !back.trim())}>Insert deck</Button>
      </div>
      {cards.length > 0 && <p className="mt-2 text-[11px] text-muted-foreground">{cards.length} card{cards.length === 1 ? "" : "s"} ready to insert.</p>}
    </div>
  );
}

function InputLike({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground" />;
}
