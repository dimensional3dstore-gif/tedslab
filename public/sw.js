const VERSION = "tedslab-offline-v3";
const STATIC_CACHE = VERSION + "-static";
const PAGE_CACHE = VERSION + "-pages";
const API_CACHE = VERSION + "-public-api";
const MAX_PAGE_CACHE = 1000;
const PRECACHE_URLS = [];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(["/", "/offline.html", "/manifest.webmanifest", "/favicon.png", ...PRECACHE_URLS]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => !key.startsWith(VERSION)).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function storePage(request, response) {
  if (!response || !response.ok || response.type === "opaque") return;
  const cache = await caches.open(PAGE_CACHE);
  await cache.put(request, response.clone());
  const keys = await cache.keys();
  if (keys.length > MAX_PAGE_CACHE) {
    await cache.delete(keys[0]);
  }
}

async function cacheArticlePages(urls) {
  const unique = [...new Set(urls)].filter((path) => typeof path === "string" && path.startsWith("/articles/"));
  let cursor = 0;
  const worker = async () => {
    while (cursor < unique.length) {
      const path = unique[cursor++];
      try {
        const request = new Request(new URL(path, self.location.origin), { credentials: "same-origin" });
        const response = await fetch(request);
        if (response.ok) await storePage(request, response);
      } catch {
        // A failed pre-cache is retried the next time the app is online.
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(3, unique.length) }, worker));
}

self.addEventListener("message", (event) => {
  if (event.data?.type === "CACHE_ARTICLE_PAGES" && Array.isArray(event.data.urls)) {
    event.waitUntil(cacheArticlePages(event.data.urls));
  }
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isSupabasePublicRead = url.hostname.endsWith(".supabase.co") &&
    url.pathname.startsWith("/rest/v1/") &&
    /^(subjects|sections|topics|hero_slides|videos|pages|nav_links|site_settings|articles)$/.test(url.pathname.split("/").pop() || "") &&
    (url.pathname.endsWith("/articles") ? url.searchParams.get("published") === "eq.true" && url.searchParams.get("status") === "eq.published" : true);

  if (!isSameOrigin && !isSupabasePublicRead) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          await storePage(request, response);
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          return (await caches.match("/offline.html")) || (await caches.match("/"));
        })
    );
    return;
  }

  if (isSupabasePublicRead) {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          if (response.ok && response.status !== 206) {
            const cache = await caches.open(API_CACHE);
            await cache.put(request, response.clone());
          }
          return response;
        })
        .catch(async () => (await caches.match(request)) || Response.error())
    );
    return;
  }

  if (
    isSameOrigin &&
    (url.pathname.startsWith("/assets/") ||
      /\.(js|css|woff2?|png|jpg|jpeg|webp|svg|ico)$/i.test(url.pathname))
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            void caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        }).catch(() => cached || Response.error());
        return cached || network;
      })
    );
  }
});
