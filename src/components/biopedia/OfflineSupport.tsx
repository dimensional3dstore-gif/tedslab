import { useEffect, useMemo, useState } from "react";
import { WifiOff } from "lucide-react";
import { useArticles, useSubjects } from "@/lib/content";

export function OfflineSupport() {
  const { data: articles = [] } = useArticles();
  const { data: subjects = [] } = useSubjects();
  const [offline, setOffline] = useState(typeof navigator !== "undefined" ? !navigator.onLine : false);

  const articlePaths = useMemo(
    () => [
      "/articles",
      ...articles
        .filter((article) => article.published !== false && article.slug)
        .slice(0, 600)
        .map((article) => `/articles/${encodeURIComponent(article.slug)}`),
      ...subjects.map((subject) => `/${encodeURIComponent(subject.slug)}`),
    ],
    [articles, subjects],
  );

  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  useEffect(() => {
    if (!("serviceWorker" in navigator) || articlePaths.length <= 1) return;
    let cancelled = false;
    void navigator.serviceWorker.ready.then((registration) => {
      if (cancelled) return;
      const worker = navigator.serviceWorker.controller ?? registration.active;
      worker?.postMessage({ type: "CACHE_ARTICLE_PAGES", urls: articlePaths });
    });
    return () => { cancelled = true; };
  }, [articlePaths]);

  if (!offline) return null;

  return (
    <div role="status" aria-live="polite" className="fixed bottom-3 left-3 z-[100] flex max-w-[min(92vw,34rem)] items-start gap-2 rounded-xl border border-amber-500/30 bg-background/95 px-4 py-3 text-sm text-foreground shadow-lg backdrop-blur">
      <WifiOff className="mt-0.5 size-4 shrink-0 text-amber-600" />
      <span><strong>Offline mode.</strong> Cached articles and lessons remain available. Nexium AI and uncached pages need a network connection.</span>
    </div>
  );
}
