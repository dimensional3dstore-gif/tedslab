import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EXTINCT_SPECIES } from "@/data/lost-atlas-species";
import { resolveImage } from "@/lib/images";
import { LostAtlasLayout } from "./layout";

export default function LostAtlasPage() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const groups = [...new Set(EXTINCT_SPECIES.map((species) => species.taxonomic_group))].sort();
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = EXTINCT_SPECIES.filter((species) => {
    const matchesGroup = group === "all" || species.taxonomic_group === group;
    const searchable = [
      species.common_name,
      species.scientific_name,
      species.region,
      species.primary_driver,
    ]
      .join(" ")
      .toLowerCase();
    return matchesGroup && (!normalizedQuery || searchable.includes(normalizedQuery));
  });
  const featured = EXTINCT_SPECIES[0];

  return (
    <LostAtlasLayout>
      <header className="grid gap-6 border-b border-border pb-7 md:grid-cols-[1fr_280px] md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Natural history · extinction records
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground">Lost Planet</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            A field atlas of extinct species: where they lived, what changed, and what the surviving
            evidence can still tell us.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="border-l-2 border-primary pl-3">
            <p className="font-display text-2xl font-bold text-foreground">
              {EXTINCT_SPECIES.length}
            </p>
            <p className="text-xs text-muted-foreground">species profiles</p>
          </div>
          <div className="border-l-2 border-bio-cyan pl-3">
            <p className="font-display text-2xl font-bold text-foreground">{groups.length}</p>
            <p className="text-xs text-muted-foreground">taxonomic groups</p>
          </div>
        </div>
      </header>

      {featured && (
        <section className="grid overflow-hidden rounded-lg border border-border bg-card md:grid-cols-[1.1fr_0.9fr]">
          <div className="p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Field note · first profile
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground">
              {featured.common_name}
            </h2>
            <p className="mt-1 font-serif italic text-sm text-muted-foreground">
              {featured.scientific_name}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {featured.summary}
            </p>
            <Link
              to="/lost-atlas/$slug"
              params={{ slug: featured.slug }}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Open species record <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <img
            src={resolveImage(null, featured.image_key)}
            alt={`Illustration representing ${featured.common_name}`}
            className="aspect-[16/9] h-full min-h-48 w-full object-cover md:aspect-auto"
          />
        </section>
      )}

      <section aria-label="Find a species" className="grid gap-3 sm:grid-cols-[1fr_240px]">
        <label className="relative">
          <span className="sr-only">Search species, regions, or causes</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search species, regions, or causes"
            className="pl-9"
          />
        </label>
        <label className="grid gap-1 text-xs text-muted-foreground">
          Taxonomic group
          <select
            value={group}
            onChange={(event) => setGroup(event.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
          >
            <option value="all">All groups</option>
            {groups.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section aria-label="Extinct species records" className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 border-b border-border pb-2">
          <h2 className="font-display text-xl font-semibold text-foreground">Species records</h2>
          <p className="text-xs text-muted-foreground">{filtered.length} shown</p>
        </div>
        {filtered.length === 0 ? (
          <p className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No species match those filters.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {filtered.map((species) => (
              <Link
                key={species.slug}
                to="/lost-atlas/$slug"
                params={{ slug: species.slug }}
                className="group grid min-w-0 grid-cols-[88px_1fr] overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-primary/50"
              >
                <img
                  src={resolveImage(null, species.image_key)}
                  alt=""
                  loading="lazy"
                  className="h-full min-h-28 w-full object-cover"
                />
                <span className="min-w-0 p-4">
                  <span className="flex items-start justify-between gap-2">
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-foreground">
                        {species.common_name}
                      </span>
                      <span className="mt-0.5 block truncate font-serif text-xs italic text-muted-foreground">
                        {species.scientific_name}
                      </span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                  </span>
                  <span className="mt-2 block truncate text-xs text-primary">{species.region}</span>
                  <span className="mt-1 block line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {species.summary}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </LostAtlasLayout>
  );
}
