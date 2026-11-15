-- Admin content tools: expert-reviewed article publishing plus video, quiz, and flashcard creation.

alter table public.articles
  add column if not exists expert_reviewed boolean not null default false;

create table if not exists public.quizzes (
  id text primary key,
  slug text not null unique,
  title text not null,
  question text not null,
  options jsonb not null default '[]'::jsonb,
  answer text not null,
  published boolean not null default false,
  sort integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.flashcards (
  id text primary key,
  front text not null,
  back text not null,
  published boolean not null default false,
  sort integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.videos enable row level security;
alter table public.quizzes enable row level security;
alter table public.flashcards enable row level security;

drop policy if exists "public_read_published_videos" on public.videos;
create policy "public_read_published_videos" on public.videos
  for select to anon, authenticated
  using (published = true);

drop policy if exists "admin_write_videos" on public.videos;
create policy "admin_write_videos" on public.videos
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "public_read_published_quizzes" on public.quizzes;
create policy "public_read_published_quizzes" on public.quizzes
  for select to anon, authenticated
  using (published = true);

drop policy if exists "admin_write_quizzes" on public.quizzes;
create policy "admin_write_quizzes" on public.quizzes
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "public_read_published_flashcards" on public.flashcards;
create policy "public_read_published_flashcards" on public.flashcards
  for select to anon, authenticated
  using (published = true);

drop policy if exists "admin_write_flashcards" on public.flashcards;
create policy "admin_write_flashcards" on public.flashcards
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));
