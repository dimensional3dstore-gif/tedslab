import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { EXTINCT_SPECIES } from "@/data/lost-atlas-species";
import { resolveImage } from "@/lib/images";
import { LostAtlasLayout } from "@/lost-atlas/layout";

export const Route = createFileRoute("/lost-atlas/$slug")({ component: SpeciesRecordPage });

function SpeciesRecordPage() {
  const { slug } = Route.useParams();
  const index = EXTINCT_SPECIES.findIndex((species) => species.slug === slug);
  const species = EXTINCT_SPECIES[index];

  if (!species) {
    return (
      <LostAtlasLayout>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Species record not found
        </h1>
        <Link to="/lost-atlas" className="text-sm font-medium text-primary hover:underline">
          Return to Lost Planet
        </Link>
      </LostAtlasLayout>
    );
  }

  const related = species.related_slugs
    .map((relatedSlug) => EXTINCT_SPECIES.find((item) => item.slug === relatedSlug))
    .filter((item): item is (typeof EXTINCT_SPECIES)[number] => Boolean(item));
  const previous = EXTINCT_SPECIES[index - 1];
  const next = EXTINCT_SPECIES[index + 1];

  return (
    <LostAtlasLayout>
      <Link
        to="/lost-atlas"
        className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> Lost Planet index
      </Link>

      <article className="overflow-hidden rounded-lg border border-border bg-card">
        <header className="grid md:grid-cols-[minmax(0,1fr)_minmax(260px,0.85fr)]">
          <div className="flex flex-col justify-center p-5 sm:p-8">
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
              <span>{species.taxonomic_group}</span>
              <span aria-hidden="true">·</span>
              <span>{species.extinction_period}</span>
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
              {species.common_name}
            </h1>
            <p className="mt-2 font-serif text-lg italic text-muted-foreground">
              {species.scientific_name}
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {species.summary}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="size-3.5 text-primary" /> {species.region}
            </p>
          </div>
          <figure className="relative min-h-56 bg-secondary">
            <img
              src={resolveImage(null, species.image_key)}
              alt={`Illustration representing ${species.common_name}`}
              className="absolute inset-0 size-full object-cover"
            />
          </figure>
        </header>

        <section className="grid border-y border-border sm:grid-cols-2 lg:grid-cols-3">
          <Fact label="Last record" value={species.last_record} />
          <Fact label="Primary pressure" value={species.primary_driver} />
          <Fact label="Range" value={species.region} />
        </section>

        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="space-y-8">
            <ArticleSection number="01" title="Habitat and life" body={species.habitat} />
            <ArticleSection number="02" title="Decline" body={species.decline_story} />
            <ArticleSection number="03" title="Evidence and uncertainty" body={species.evidence} />
            <ArticleSection number="04" title="What remains" body={species.legacy} />
          </div>
          <aside className="h-fit border-l-2 border-primary/40 pl-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              Extinction context
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {species.primary_driver}
            </p>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Dates and causes are presented at the level supported by available records. For
              uncertain cases, the profile identifies what remains unresolved.
            </p>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Related species</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                to="/lost-atlas/$slug"
                params={{ slug: item.slug }}
                className="rounded-md border border-border p-4 hover:border-primary/50"
              >
                <span className="block font-semibold text-foreground">{item.common_name}</span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {item.taxonomic_group} · {item.extinction_period}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <nav
        aria-label="Species record navigation"
        className="flex items-center justify-between gap-4 border-t border-border pt-4"
      >
        {previous ? (
          <Link
            to="/lost-atlas/$slug"
            params={{ slug: previous.slug }}
            className="inline-flex min-w-0 items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4 shrink-0" />
            <span className="truncate">{previous.common_name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to="/lost-atlas/$slug"
            params={{ slug: next.slug }}
            className="inline-flex min-w-0 items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <span className="truncate">{next.common_name}</span>
            <ArrowRight className="size-4 shrink-0" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </LostAtlasLayout>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-b border-border p-4 last:border-b-0 sm:border-r sm:last:border-r-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-foreground">{value}</p>
    </div>
  );
}

function ArticleSection({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <section className="grid gap-3 sm:grid-cols-[44px_1fr]">
      <p className="font-mono text-xs text-primary">{number}</p>
      <div>
        <h2 className="font-display text-xl font-semibold text-foreground">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{body}</p>
      </div>
    </section>
  );
}
