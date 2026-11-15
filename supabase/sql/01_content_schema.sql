-- Ted's Lab content schema source of truth.
-- Safe to run repeatedly: all objects are created conditionally.

create table if not exists public.subjects (
  id text primary key,
  slug text not null unique,
  title text not null,
  description text,
  icon text,
  image_key text,
  image_url text,
  sort integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sections (
  id text primary key,
  subject_id text not null references public.subjects(id) on delete cascade,
  slug text not null,
  label text not null,
  title text not null,
  description text,
  body text,
  icon text,
  image_key text,
  image_url text,
  sort integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(subject_id, slug)
);

create table if not exists public.topics (
  id text primary key,
  section_id text not null references public.sections(id) on delete cascade,
  slug text not null,
  title text not null,
  blurb text,
  body text,
  image_url text,
  sort integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(section_id, slug)
);

create table if not exists public.articles (
  id text primary key,
  slug text not null unique,
  title text not null,
  excerpt text,
  body text,
  minutes integer,
  tone text,
  subject_slug text,
  section_slug text,
  topic_slug text,
  image_key text,
  image_url text,
  video_url text,
  published boolean not null default false,
  status text not null default 'draft' check (status in ('draft','review','published')),
  sort integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pages (
  id text primary key,
  slug text not null unique,
  title text not null,
  description text,
  body text,
  image_url text,
  published boolean not null default false,
  status text not null default 'draft' check (status in ('draft','review','published')),
  show_in_nav boolean not null default false,
  sort integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hero_slides (
  id text primary key,
  subject_slug text,
  title text not null,
  subtitle text,
  body text,
  image_key text,
  image_url text,
  link_to text,
  video_url text,
  sort integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.videos (
  id text primary key,
  slug text not null unique,
  title text not null,
  description text,
  url text not null,
  poster_url text,
  subject_slug text,
  sort integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nav_links (
  id text primary key,
  label text not null,
  href text not null,
  icon text,
  group_name text,
  sort integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

create index if not exists sections_subject_sort_idx on public.sections(subject_id, sort);
create index if not exists topics_section_sort_idx on public.topics(section_id, sort);
create index if not exists articles_public_idx on public.articles(published, status, sort);
create index if not exists articles_taxonomy_idx on public.articles(subject_slug, section_slug, topic_slug);
create index if not exists pages_public_idx on public.pages(published, status, sort);
create index if not exists videos_public_idx on public.videos(published, sort);
create index if not exists nav_links_sort_idx on public.nav_links(group_name, sort);
