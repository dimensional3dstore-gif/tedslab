import { createFileRoute, notFound } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { supabase } from "@/integrations/supabase/client";

const db = supabase as unknown as { from: (table: string) => any };

const pageQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["page", slug],
    queryFn: async () => {
      const { data, error } = await db
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data ?? null;
    },
  });

export const Route = createFileRoute("/pages/$slug")({
  loader: async ({ context, params }) => {
    const page = await context.queryClient.ensureQueryData(pageQueryOptions(params.slug));
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => {
    const page = loaderData?.page;
    return {
      meta: [
        { title: page ? `${page.title} — Ted's Lab` : "Ted's Lab" },
        { name: "description", content: page?.description ?? "" },
        { property: "og:title", content: page?.title },
        { property: "og:description", content: page?.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PageComponent,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
    </div>
  ),
});

function PageComponent() {
  const { page: initialPage } = Route.useLoaderData();

  return (
    <AppShell>
      <article className="max-w-4xl mx-auto">
        <PageHeader title={initialPage.title} description={initialPage.description ?? ""} />
        {initialPage.image_url && (
          <img
            src={initialPage.image_url}
            alt={initialPage.title}
            loading="lazy"
            className="mt-6 w-full rounded-lg border border-border object-cover max-h-96"
          />
        )}
        <div className="mt-6 prose prose-sm max-w-none text-foreground">
          <div 
            className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: initialPage.body ?? "" }}
          />
        </div>
      </article>
    </AppShell>
  );
}
