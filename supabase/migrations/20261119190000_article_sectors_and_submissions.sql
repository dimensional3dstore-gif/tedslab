-- Add top-level article sectors and a dedicated community submission workflow.

create table if not exists public.sectors (
  id text primary key,
  slug text not null unique,
  title text not null,
  description text,
  subject_slug text,
  sort integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.articles add column if not exists sector_slug text;

create index if not exists articles_sector_idx on public.articles(sector_slug,published,status,sort);
create index if not exists sectors_sort_idx on public.sectors(active,sort);

create table if not exists public.article_submissions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  body text not null,
  source_references jsonb not null default '[]'::jsonb,
  subject_slug text not null,
  sector_slug text not null,
  topic_slug text not null,
  submitted_by uuid not null references auth.users(id) on delete cascade,
  status text not null default 'submitted' check (status in ('submitted','review','approved','rejected')),
  review_notes text,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.sectors (id,slug,title,description,subject_slug,sort) values
('sector-life-sciences','life-sciences','Life Sciences','Biology, organisms, genetics, evolution and ecosystems.','biology',1),
('sector-physical-sciences','physical-sciences','Physical Sciences','Physics, chemistry, matter, energy and fundamental processes.','science',2),
('sector-earth-and-planetary','earth-and-planetary','Earth & Planetary Sciences','Earth systems, geology, climate, oceans, atmosphere and planetary change.','science',3),
('sector-mathematics-and-logic','mathematics-and-logic','Mathematics & Logic','Mathematics, statistics, probability, formal logic and proof.','mathematics',4),
('sector-computing-and-technology','computing-and-technology','Computing & Technology','Computing, software, AI, networks, security and digital systems.','technology',5),
('sector-humanities-and-history','humanities-and-history','Humanities & History','History, philosophy, society, culture and human knowledge.','history',6),
('sector-language-and-literature','language-and-literature','Language & Literature','Language, linguistics, writing, rhetoric and literature.','english',7),
('sector-mind-and-behaviour','mind-and-behaviour','Mind & Behaviour','Cognition, perception, learning, memory, emotion and behaviour.','mind',8),
('sector-systems-and-complexity','systems-and-complexity','Systems & Complexity','Systems thinking, networks, feedback, emergence and resilience.','systems',9),
('sector-planetary-change','planetary-change','Planetary Change','Changes Earth and Earth-like worlds can undergo.','change-encyclopaedia',10),
('sector-quantum-science','quantum-science','Quantum Science','Quantum concepts, foundations, computation and experiment.','quantumpedia',11)
on conflict (slug) do update set title=excluded.title,description=excluded.description,subject_slug=excluded.subject_slug,sort=excluded.sort,active=true;

update public.articles set sector_slug = case
  when subject_slug='biology' then 'life-sciences'
  when subject_slug='science' and (topic_slug like '%earth%' or topic_slug like '%climate%' or topic_slug like '%ocean%' or topic_slug like '%atmosphere%') then 'earth-and-planetary'
  when subject_slug='science' then 'physical-sciences'
  when subject_slug='mathematics' then 'mathematics-and-logic'
  when subject_slug='technology' then 'computing-and-technology'
  when subject_slug in ('history','philosophy') then 'humanities-and-history'
  when subject_slug='english' then 'language-and-literature'
  when subject_slug='mind' then 'mind-and-behaviour'
  when subject_slug='systems' then 'systems-and-complexity'
  when subject_slug='change-encyclopaedia' then 'planetary-change'
  when subject_slug='quantumpedia' then 'quantum-science'
  else 'humanities-and-history' end
where sector_slug is null;

create index if not exists article_submissions_status_idx on public.article_submissions(status,created_at desc);
create index if not exists article_submissions_submitter_idx on public.article_submissions(submitted_by,created_at desc);
create index if not exists article_submissions_sector_idx on public.article_submissions(sector_slug,status);

alter table public.sectors enable row level security;
alter table public.article_submissions enable row level security;
grant select on public.sectors to anon,authenticated;
grant select,insert on public.article_submissions to authenticated;

drop policy if exists public_read_active_sectors on public.sectors;
create policy public_read_active_sectors on public.sectors for select to anon,authenticated using (active=true);
drop policy if exists submit_own_article on public.article_submissions;
create policy submit_own_article on public.article_submissions for insert to authenticated with check ((select auth.uid())=submitted_by);
drop policy if exists read_own_article_submissions on public.article_submissions;
create policy read_own_article_submissions on public.article_submissions for select to authenticated using ((select auth.uid())=submitted_by or (select public.is_admin()));
drop policy if exists admin_manage_article_submissions on public.article_submissions;
create policy admin_manage_article_submissions on public.article_submissions for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists admin_delete_article_submissions on public.article_submissions;
create policy admin_delete_article_submissions on public.article_submissions for delete to authenticated using ((select public.is_admin()));

create or replace function public.touch_article_submission_updated_at()
returns trigger language plpgsql as $$ begin new.updated_at=now(); return new; end; $$;
drop trigger if exists article_submissions_touch_updated_at on public.article_submissions;
create trigger article_submissions_touch_updated_at before update on public.article_submissions for each row execute function public.touch_article_submission_updated_at();
