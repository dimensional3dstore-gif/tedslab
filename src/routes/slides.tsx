import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/biopedia/AppShell";
import { useHeroSlides } from "@/lib/content";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/slides")({
  head: () => ({ meta: [{ title: "Slides — Ted's Lab" }] }),
  component: SlidesPage,
});

function SlidesPage() {
  const { data: slides = [], isLoading } = useHeroSlides();
  const { isAdmin } = useAuth();
  const active = [...slides].filter((slide) => slide.active).sort((a, b) => a.sort - b.sort);

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <PageHeader title="Slides" description="Explore the current Ted's Lab homepage slides." />
          {isAdmin && <Link to="/admin/slides" className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Manage slides</Link>}
        </div>

        {isLoading ? (
          <p className="mt-6 text-sm text-muted-foreground">Loading slides…</p>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {active.map((slide) => (
              <article key={slide.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                {slide.image_url ? <img src={slide.image_url} alt="" className="aspect-[16/7] w-full object-cover" /> : <div className="flex aspect-[16/7] items-center justify-center bg-secondary text-sm text-muted-foreground">{slide.image_key || "Ted's Lab"}</div>}
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">{slide.subject_slug || "Ted's Lab"}</p>
                  <h2 className="mt-2 text-2xl font-bold">{slide.title}</h2>
                  {slide.subtitle && <p className="mt-2 text-base text-muted-foreground">{slide.subtitle}</p>}
                  {slide.body && <p className="mt-3 text-sm leading-6 text-muted-foreground">{slide.body}</p>}
                  {slide.link_to && <Link to={slide.link_to as never} className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">Open slide →</Link>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
