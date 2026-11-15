import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import type { Subject, TopicRow } from "@/lib/content";
import { fetchCatalogRow, fetchCatalogRows } from "@/lib/content";
import { TOPICS, SUBJECTS } from "@/lib/catalog";
import { resolveImage } from "@/lib/images";

const subjectQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["subject", slug],
    queryFn: () => fetchCatalogRow<Subject>("subjects", "slug", slug, SUBJECTS),
  });

const subjectTopicsQueryOptions = (subjectId: string) =>
  queryOptions({
    queryKey: ["topics", "by-subject", subjectId],
    queryFn: async () => {
      const rows = await fetchCatalogRows<TopicRow>("topics", TOPICS);
      return rows.filter((row) => row.subject_id === subjectId);
    },
  });

export const Route = createFileRoute("/$subject")({
  loader: async ({ context, params }) => {
    const subject = await context.queryClient.ensureQueryData(
      subjectQueryOptions(params.subject),
    );
    if (!subject) throw notFound();
    const topics = await context.queryClient.ensureQueryData(
      subjectTopicsQueryOptions(subject.id),
    );
    return { subject, topics };
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.subject.title} — Ted's Lab`
      : "Ted's Lab";
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
  const { data: topics } = useQuery({
    ...subjectTopicsQueryOptions(subject!.id),
    initialData: Route.useLoaderData().topics,
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
            {(topics ?? [])
              .filter(
                (s) =>
                  !q ||
                  `${s.title} ${s.blurb ?? ""}`.toLowerCase().includes(q),
              )
              .map((s) => (
                <Link
                  key={s.id}
                  to={`/${subject!.slug}/${s.slug}`}
                  className="block overflow-hidden bio-panel transition-colors hover:border-primary/50"
                >
                  <img
                    src={resolveImage(s.image_url, null)}
                    alt={s.title}
                    loading="lazy"
                    width={512}
                    height={288}
                    className="h-28 w-full object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-sm font-semibold">{s.title}</h2>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {s.blurb}
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
