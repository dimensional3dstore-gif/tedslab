import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { OfflineSupport } from "@/components/biopedia/OfflineSupport";
import appCss from "../styles.css?url";

const APP_NAME = "Ted's Lab — The Learning Encyclopedia";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          That page is not in the encyclopedia yet.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: APP_NAME },
        {
          name: "description",
          content:
            "An illustrated learning encyclopedia covering biology, history, english, mathematics, science, and technology — with a knowledge atlas and daily AI study assist.",
        },
        { name: "theme-color", content: "#142018" },
      ],
      links: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "stylesheet", href: appCss },
        { rel: "manifest", href: "/manifest.webmanifest" },
        { rel: "apple-touch-icon", href: "/favicon.png" },
      ],
    }),
    notFoundComponent: NotFoundComponent,
    component: RootDocument,
  },
);

function UpdateNotice() {
  const [available, setAvailable] = useState(false);
  const buildId = import.meta.env.VITE_BUILD_ID ?? "dev";

  useEffect(() => {
    if (!buildId || buildId === "dev") return;
    const key = "tedslab:last-seen-build";
    const seen = window.localStorage.getItem(key);
    if (!seen) {
      window.localStorage.setItem(key, buildId);
      return;
    }
    if (seen !== buildId) setAvailable(true);
  }, [buildId]);

  if (!available) return null;
  return (
    <div className="fixed inset-x-0 top-0 z-[100] border-b border-primary/30 bg-primary px-4 py-2 text-primary-foreground shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 text-sm">
        <p className="font-medium">Ted&apos;s Lab has been updated. Refresh to load the latest version.</p>
        <button
          type="button"
          onClick={() => {
            window.localStorage.setItem("tedslab:last-seen-build", buildId);
            window.location.reload();
          }}
          className="shrink-0 rounded-md bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:opacity-90"
        >
          Update Ted&apos;s Lab
        </button>
      </div>
    </div>
  );
}

function RootDocument() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => {
    if (import.meta.env.PROD && "serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <UpdateNotice />
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

void (undefined as unknown as ReactNode);
