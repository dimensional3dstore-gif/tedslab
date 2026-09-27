import LostAtlasPage from "../../page";

export default function AtlasPage() {
  return <LostAtlasPage />;
}
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Volume2, VolumeX } from "lucide-react";
import { LostAtlasLayout } from "../../layout";

export default function LostAtlasPage() {
  const [speaking, setSpeaking] = useState(false);
  const introduction =
    "The knowledge atlas maps relationships between ideas. Open the atlas to explore connections across subjects.";
  const speak = () => {
    if (!("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(introduction);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <LostAtlasLayout>
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Knowledge systems
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-foreground">Lost Atlas</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {introduction}
        </p>
      </header>
      <div className="flex flex-wrap gap-3">
        <Link
          to="/knowledge-atlas"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Open knowledge atlas
        </Link>
        <button
          type="button"
          onClick={speak}
          className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-foreground hover:bg-secondary"
        >
          {speaking ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          {speaking ? "Stop reading" : "Read introduction"}
        </button>
      </div>
    </LostAtlasLayout>
  );
}
