import { MessageSquare, Quote, Share2, Sprout } from "lucide-react";

export function QuoteBar() {
  return (
    <footer className="mt-8 flex flex-wrap items-center gap-4 bio-panel px-5 py-4">
      <Sprout className="size-5 text-primary" />
      <p className="flex-1 text-sm italic text-foreground">
        When observing nature, observe it at a snail's pace.”
        <span className="ml-3 text-[xm] not-italic text-muted-foreground">
          – Edwin Way Teale, American naturalist and author (1899-1980)
        </span>
      </p>

      <div className="flex items-center gap-5 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <Quote className="size-4" /> Cite
        </span>
        <span className="flex items-center gap-2">
          <Share2 className="size-4" /> Share
        </span>
        <span className="flex items-center gap-2">
          <MessageSquare className="size-4" /> Feedback
        </span>
        <span className="flex items-center gap-2">
          <MessageSquare className="size-4" /> Copyright 2026. All rights
          reserved.
        </span>
        <span className="flex items-center gap-2">
          <MessageSquare className="size-4" /> Developed by {"Exolab Developers and IIS Computer Science Divison"}.
        </span>
      </div>
    </footer>
  );
}
