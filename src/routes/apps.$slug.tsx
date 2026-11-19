import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getPublishedApp } from "@/lib/app-studio";

export const Route = createFileRoute("/apps/$slug")({
  head: () => ({ meta: [{ title: "Ted's Lab App" }] }),
  component: PublishedAppPage,
});

function PublishedAppPage() {
  const { slug } = Route.useParams();
  const query = useQuery({
    queryKey: ["published-app", slug],
    queryFn: () => getPublishedApp({ data: { slug } }),
  });

  if (query.isLoading) {
    return <main className="min-h-screen grid place-items-center bg-background"><p className="text-sm text-muted-foreground">Loading app…</p></main>;
  }

  if (query.error || !query.data) {
    return <main className="min-h-screen grid place-items-center bg-background px-6 text-center"><div><h1 className="text-2xl font-bold">App unavailable</h1><p className="mt-2 text-sm text-muted-foreground">This Ted's Lab app has not been published or could not be loaded.</p></div></main>;
  }

  const app = query.data;
  const srcDoc =
    "<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><style>" +
    app.css +
    "</style></head><body>" +
    app.html +
    "<script>" +
    app.js.split("</script").join("<\\/script") +
    "<\\/script></body></html>";

  return (
    <main className="h-screen w-screen overflow-hidden bg-white">
      <iframe
        title={app.name}
        className="h-full w-full border-0"
        sandbox="allow-scripts allow-forms allow-modals"
        srcDoc={srcDoc}
      />
    </main>
  );
}
