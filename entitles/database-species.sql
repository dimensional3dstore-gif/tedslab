create table if not exists public.extinct_species (
	slug text primary key,
	common_name text not null,
	scientific_name text not null,
	taxonomic_group text not null,
	extinction_period text not null,
	region text not null,
	last_record text not null default '',
	primary_driver text not null default '',
	summary text not null default '',
	habitat text not null default '',
	decline_story text not null default '',
	evidence text not null default '',
	legacy text not null default '',
	image_key text not null default 'cat-evolution',
	related_slugs text[] not null default '{}',
	sort_order integer not null default 0,
	published boolean not null default true,
	updated_at timestamptz not null default now()
);

create index if not exists extinct_species_published_sort_idx
	on public.extinct_species (published, sort_order);

alter table public.extinct_species enable row level security;

drop policy if exists "Public can read published extinct species"
	on public.extinct_species;

create policy "Public can read published extinct species"
	on public.extinct_species for select to anon, authenticated
	using (published = true);

grant select on public.extinct_species to anon, authenticated;
