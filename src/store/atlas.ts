import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NODE_BY_ID } from "@/data/catalog";

export type ViewMode = "graph" | "article" | "split";
export type RailTab = "files" | "search" | "graph" | "tags" | "starred";

export type GraphSettings = {
  showLabels: boolean;
  colorGroups: boolean;
  dimUnrelated: boolean;
  localMode: boolean;
  physics: boolean;
  showArrows: boolean;
};

type AtlasState = {
  selectedId: string | null;
  hoveredId: string | null;
  openArticleId: string | null;
  view: ViewMode;
  rail: RailTab;
  explorerOpen: boolean;
  inspectorOpen: boolean;
  searchOpen: boolean;
  searchQuery: string;
  explorerFilter: string;
  expandedFolders: string[];
  bookmarks: string[];
  recent: string[];
  settings: GraphSettings;
  select: (id: string | null) => void;
  hover: (id: string | null) => void;
  openArticle: (id: string) => void;
  closeArticle: () => void;
  setView: (view: ViewMode) => void;
  setRail: (rail: RailTab) => void;
  toggleExplorer: () => void;
  toggleInspector: () => void;
  setSearchOpen: (open: boolean) => void;
  setSearchQuery: (q: string) => void;
  setExplorerFilter: (q: string) => void;
  toggleFolder: (id: string) => void;
  toggleBookmark: (id: string) => void;
  patchSettings: (patch: Partial<GraphSettings>) => void;
};

const DEFAULT_FOLDERS = [
  "atlas",
  "philosophy",
  "physics",
  "mathematics",
  "biology",
  "computing",
  "history",
  "mind",
  "systems",
  "geography", 
  "etymology",
];

export const useAtlas = create<AtlasState>()(
  persist(
    (set, get) => ({
      selectedId: "knowledge-atlas",
      hoveredId: null,
      openArticleId: null,
      view: "graph",
      rail: "graph",
      explorerOpen: true,
      inspectorOpen: true,
      searchOpen: false,
      searchQuery: "",
      explorerFilter: "",
      expandedFolders: DEFAULT_FOLDERS,
      bookmarks: ["knowledge-atlas", "consciousness", "entropy", "evolution"],
      recent: ["knowledge-atlas"],
      settings: {
        showLabels: true,
        colorGroups: false,
        dimUnrelated: true,
        localMode: false,
        physics: false,
        showArrows: false,
      },
      select: (id) => {
        if (!id || !NODE_BY_ID[id]) {
          set({ selectedId: id });
          return;
        }
        const recent = [id, ...get().recent.filter((x) => x !== id)].slice(0, 24);
        set({ selectedId: id, recent });
      },
      hover: (id) => set({ hoveredId: id }),
      openArticle: (id) => {
        if (!NODE_BY_ID[id]) return;
        const recent = [id, ...get().recent.filter((x) => x !== id)].slice(0, 24);
        set({
          selectedId: id,
          openArticleId: id,
          view: get().view === "graph" ? "article" : get().view,
          recent,
        });
      },
      closeArticle: () => set({ openArticleId: null, view: "graph" }),
      setView: (view) => set({ view }),
      setRail: (rail) => set({ rail, explorerOpen: true }),
      toggleExplorer: () => set({ explorerOpen: !get().explorerOpen }),
      toggleInspector: () => set({ inspectorOpen: !get().inspectorOpen }),
      setSearchOpen: (searchOpen) => set({ searchOpen }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setExplorerFilter: (explorerFilter) => set({ explorerFilter }),
      toggleFolder: (id) => {
        const cur = get().expandedFolders;
        set({
          expandedFolders: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
        });
      },
      toggleBookmark: (id) => {
        const cur = get().bookmarks;
        set({
          bookmarks: cur.includes(id) ? cur.filter((x) => x !== id) : [id, ...cur],
        });
      },
      patchSettings: (patch) => set({ settings: { ...get().settings, ...patch } }),
    }),
    {
      name: "knowledge-atlas-v1",
      partialize: (s) => ({
        bookmarks: s.bookmarks,
        recent: s.recent,
        settings: s.settings,
        expandedFolders: s.expandedFolders,
        explorerOpen: s.explorerOpen,
        inspectorOpen: s.inspectorOpen,
      }),
    },
  ),
);
