import { EDGES, NODES, NODE_BY_ID } from "@/data/catalog";
import { ARTICLES } from "@/data/articles/compose";
import { useAtlas } from "@/store/atlas";
import { useMemo } from "react";
import { useArticles } from "@/lib/content";
import { toCMSGraphNodes } from "@/lib/atlas-cms";

export function StatusBar() {
  const { data: articles = [] } = useArticles();
  const cmsNodes = useMemo(() => toCMSGraphNodes(articles), [articles]);
  const selectedId = useAtlas((s) => s.selectedId);
  const view = useAtlas((s) => s.view);
  const node = selectedId ? NODE_BY_ID[selectedId] ?? cmsNodes.find((item) => item.id === selectedId) : undefined;
  const words = selectedId ? ARTICLES[selectedId]?.wordCount : undefined;
  return (
    <footer className="flex h-7 shrink-0 items-center gap-3 border-t border-border bg-bg px-3 font-mono text-[10px] tabular-nums text-fg-subtle">
      <span>{NODES.length + cmsNodes.length} notes</span>
      <span>{EDGES.length + cmsNodes.length} links</span>
      <span className="hidden sm:inline">{view}</span>
      <span className="ml-auto truncate">
        {node
          ? `${node.title}${words ? ` · ${words.toLocaleString()} w` : ""}`
          : "click a node · double-click to read"}
      </span>
    </footer>
  );
}
