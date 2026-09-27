import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { supabase } from "@/integrations/supabase/client";
import type { SectionRow, Subject } from "@/lib/content";
import { resolveImage } from "@/lib/images";

const db = supabase as unknown as { from: (table: string) => any };

const subjectQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["subject", slug],
    queryFn: async () => {
      const { data, error } = await db.from("subjects").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      return (data ?? null) as Subject | null;
    },
  });

const subjectSectionsQueryOptions = (subjectId: string) =>
  queryOptions({
    queryKey: ["sections", "by-subject", subjectId],
    queryFn: async () => {
      const { data, error } = await db
        .from("sections")
        .select("*")
        .eq("subject_id", subjectId)
        .order("sort", { ascending: true });
      if (error) throw error;
      return (data ?? []) as SectionRow[];
    },
  });

export const Route = createFileRoute("/$subject")({
  loader: async ({ context, params }) => {
    const subject = await context.queryClient.ensureQueryData(subjectQueryOptions(params.subject));
    if (!subject) throw notFound();
    const sections = await context.queryClient.ensureQueryData(
      subjectSectionsQueryOptions(subject.id),
    );
    return { subject, sections };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.subject.title} — Ted's Lab` : "Ted's Lab";
    const description = loaderData?.subject.description ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: SubjectPage,
});

function SubjectPage() {
  const { subject: initialSubject } = Route.useLoaderData();
  const { data: subject } = useQuery({
    ...subjectQueryOptions(initialSubject.slug),
    initialData: initialSubject,
  });
  const { data: sections } = useQuery({
    ...subjectSectionsQueryOptions(subject!.id),
    initialData: Route.useLoaderData().sections,
  });

  return (
    <AppShell>
      {(q) => (
        <>
          <PageHeader
            title={subject!.title}
            description={subject!.description ?? ""}
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {(sections ?? [])
              .filter((s) => !q || `${s.title} ${s.description ?? ""}`.toLowerCase().includes(q))
              .map((s) => (
                <Link
                  key={s.id}
                  to={`/${subject!.slug}/${s.slug}`}
                  className="block overflow-hidden bio-panel transition-colors hover:border-primary/50"
                >
                  <img
                    src={resolveImage(s.image_url, s.image_key)}
                    alt={s.title}
                    loading="lazy"
                    width={512}
                    height={288}
                    className="h-28 w-full object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-sm font-semibold">{s.title}</h2>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </>
      )}
    </AppShell>
  );
}
