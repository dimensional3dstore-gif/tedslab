import {
  Bookmark, Download, History, Menu, Search, Sun, Moon, User, ArrowRight,
} from "lucide-react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import * as React from "react";
import { useAuth } from "@/hooks/use-auth";
import { getAquariusDownloadUrl } from "@/lib/chronos-os-download";

type InternalScheme =
  | "tedslab"
  | "articles"
  | "apps"
  | "tools"
  | "blog"
  | "posts"
  | "help"
  | "category"
  | "admin";

function decodeTarget(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function resolveTedUrl(rawValue: string, isAdmin: boolean): string | null {
  const raw = rawValue.trim();
  if (!raw) return "/";

  if (/^https?:\/\//i.test(raw)) {
    try {
      const url = new URL(raw);
      if (url.origin === window.location.origin) {
        return url.pathname + url.search + url.hash;
      }
      window.location.assign(url.href);
      return null;
    } catch {
      return null;
    }
  }

  const schemeMatch = raw.match(/^([a-z][a-z0-9+.-]*):\/\/(.*)$/i);
  if (schemeMatch) {
    const scheme = schemeMatch[1].toLowerCase() as InternalScheme;
    const target = decodeTarget(schemeMatch[2]).replace(/^\/+/, "");

    if (scheme === "admin" && !isAdmin) {
      return "/login?redirect=%2Fadmin";
    }

    const encoded = encodeURIComponent(target);

    switch (scheme) {
      case "tedslab":
        return target ? `/${target}` : "/";
      case "articles":
        return target ? `/articles/${encodeURIComponent(target)}` : "/articles";
      case "apps":
        return target ? `/apps/${encodeURIComponent(target)}` : "/apps";
      case "tools":
        return target ? `/search-lab?q=${encoded}` : "/search-lab";
      case "blog":
        return target ? `/blogger/${encodeURIComponent(target)}` : "/blogger";
      case "posts":
        return target ? `/blogger/${encodeURIComponent(target)}` : "/blogger";
      case "help":
        return target ? `/help-center?q=${encoded}` : "/help-center";
      case "category":
        return target ? `/${encodeURIComponent(target)}` : "/categories";
      case "admin":
        return target ? `/admin/${target}` : "/admin";
      default:
        return null;
    }
  }

  if (/^(www\.)?tedslab\.com(?:\/.*)?$/i.test(raw)) {
    const path = raw.replace(/^(?:www\.)?tedslab\.com/i, "");
    return path || "/";
  }

  if (raw.startsWith("/")) return raw;

  // Google-like address/search behavior: a bare term is a Ted's Lab search.
  return `/search-lab?q=${encodeURIComponent(raw)}`;
}

export function TopBar({
  query, onQueryChange, bookmarkCount, compact, onToggleCompact, onToggleSidebar,
}: {
  query: string; onQueryChange: (value: string) => void; bookmarkCount: number;
  compact: boolean; onToggleCompact: () => void; onToggleSidebar: () => void;
}) {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const search = useRouterState({ select: (state) => state.location.search });
  const aquariusDownloadUrl = getAquariusDownloadUrl();

  const [address, setAddress] = React.useState("tedslab.com");

  React.useEffect(() => {
    const suffix = search
      ? `?${new URLSearchParams(search as Record<string, string>).toString()}`
      : "";
    setAddress(pathname === "/" ? "tedslab.com" : `tedslab.com${pathname}${suffix}`);
  }, [pathname, search]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const value = address.trim();
    const destination = resolveTedUrl(value, Boolean(isAdmin));

    if (destination) {
      navigate({ to: destination as never });
      setAddress(value);
      return;
    }

    // External URL navigation is handled by resolveTedUrl.
    // For normal text, the resolver produces /search-lab?q=...
    onQueryChange(value);
  };

  return (
    <header className="relative sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur md:px-6">
      <button type="button" onClick={onToggleSidebar} aria-label="Toggle navigation menu" title="Toggle navigation menu"
        className="grid size-10 shrink-0 place-items-center rounded-md border border-border text-foreground hover:bg-secondary">
        <Menu className="size-4" />
      </button>

      <form onSubmit={submitSearch} className="relative flex-1 max-w-3xl">
        <span className="sr-only">Ted's Lab URL and search</span>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Search or enter a Ted's Lab URL"
          aria-label="Ted's Lab URL and search"
          autoComplete="off"
          spellCheck={false}
          className="h-11 w-full rounded-full border border-border bg-card pr-12 pl-5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-ring/30"
        />
        <button type="submit" aria-label="Open URL or search Ted's Lab" title="Open URL or search Ted's Lab"
          className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
          {address.includes("://") ? <ArrowRight className="size-4" /> : <Search className="size-4" />}
        </button>
      </form>

      <div className="hidden xl:flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-2 text-[11px] text-muted-foreground">
        <span>tedslab://</span><span>articles://</span><span>apps://</span><span>tools://</span>
      </div>

      <a href={aquariusDownloadUrl} download="Aquarius.dmg" aria-label="Download Aquarius DMG" title="Download Aquarius DMG"
        className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium text-foreground hover:bg-secondary">
        <Download className="size-4" /><span className="hidden sm:inline">Download DMG</span>
      </a>

      <div className="ml-auto hidden items-center gap-5 md:flex">
        <span className="flex items-center gap-2 text-sm text-muted-foreground"><Bookmark className="size-4" />Bookmarks
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-foreground">{bookmarkCount}</span>
        </span>
        <span className="flex items-center gap-2 text-sm text-muted-foreground"><History className="size-4" />History</span>
        <button type="button" onClick={onToggleCompact} aria-pressed={compact} aria-label="Toggle compact reading mode"
          className="flex h-8 w-14 items-center rounded-full border border-border bg-secondary px-1 transition-colors">
          <span className={"flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform " + (compact ? "translate-x-6" : "translate-x-0")}>
            {compact ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
          </span>
        </button>
        {!user && (
          <div className="flex items-center gap-2">
            <Link to="/login" className="inline-flex h-10 items-center justify-center rounded-md border border-border px-3 text-sm font-semibold text-foreground transition hover:bg-secondary">Sign in</Link>
            <Link to="/signup" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">Create account</Link>
          </div>
        )}
        {user && (
          <div className="flex items-center gap-2 border-l border-border pl-4">
            <Link to="/dashboard" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/15"><User className="size-4 text-primary" /></span>
              <div className="leading-tight">
                <p className="text-sm font-medium">My dashboard</p>
                <p className="max-w-[10rem] truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
