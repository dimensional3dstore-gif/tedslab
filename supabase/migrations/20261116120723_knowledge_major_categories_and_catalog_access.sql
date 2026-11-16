-- Keep the public knowledge catalogue readable through the Data API while
-- retaining RLS as the row-level security boundary.
alter table public.subjects enable row level security;
alter table public.sections enable row level security;
alter table public.topics enable row level security;
alter table public.articles enable row level security;

grant select on table public.subjects, public.sections, public.topics to anon, authenticated;
grant select, insert, update, delete on table public.subjects, public.sections, public.topics, public.articles to authenticated;
grant select on table public.articles to anon;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='subjects' and policyname='public_read_published') then
    create policy public_read_published on public.subjects for select to anon, authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='sections' and policyname='public_read_published') then
    create policy public_read_published on public.sections for select to anon, authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='topics' and policyname='public_read_published') then
    create policy public_read_published on public.topics for select to anon, authenticated using (true);
  end if;
end $$;

create index if not exists topics_subject_sort_idx on public.topics(subject_slug, sort, title);
create index if not exists sections_subject_sort_idx on public.sections(subject_id, sort, title);
create index if not exists articles_subject_topic_public_idx on public.articles(subject_slug, topic_slug, sort) where published = true and status = 'published';

-- Biology needs distinct, broad taxonomic categories rather than one combined
-- Plant and Animal Biology bucket.
insert into public.topics
  (id, section_id, subject_id, subject_slug, slug, title, blurb, body, image_url, sort)
select v.id, null, s.id, s.slug, v.slug, v.title, v.blurb, v.blurb, null, v.sort
from public.subjects s
cross join (values
  ('topic-biology-animalia','animalia','Animalia','The animal kingdom: major lineages, body plans, classification, physiology and behaviour.',9),
  ('topic-biology-plantae','plantae','Plantae','The plant kingdom: plant structure, photosynthesis, reproduction, diversity and ecological roles.',10),
  ('topic-biology-fungi','fungi','Fungi','Fungal diversity, structure, nutrition, reproduction, symbiosis and ecological importance.',11),
  ('topic-biology-bacteria-archaea','bacteria-archaea','Bacteria and Archaea','Prokaryotic life, microbial diversity, metabolism, evolution and interactions with other organisms.',12),
  ('topic-biology-protista','protista','Protista and Microbial Eukaryotes','Diverse microbial eukaryotes, including protists and algae, their cell biology and ecological roles.',13)
) as v(id,slug,title,blurb,sort)
where s.slug='biology'
on conflict (id) do update set
  subject_id=excluded.subject_id,
  subject_slug=excluded.subject_slug,
  section_id=null,
  slug=excluded.slug,
  title=excluded.title,
  blurb=excluded.blurb,
  body=excluded.body,
  sort=excluded.sort,
  updated_at=now();
