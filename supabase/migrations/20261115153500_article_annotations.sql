-- Article annotations for Ted's Lab editorial and scientific review workflow.
create table if not exists public.article_annotations (
  id uuid primary key default gen_random_uuid(),
  article_id text not null references public.articles(id) on delete cascade,
  title text not null,
  note text not null,
  kind text not null default 'editorial' check (kind in ('editorial','scientific','citation','fact_check')),
  author_id uuid references auth.users(id) on delete set null,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists article_annotations_article_idx on public.article_annotations(article_id, created_at desc);
alter table public.article_annotations enable row level security;
drop policy if exists "public_read_published_annotations" on public.article_annotations;
create policy "public_read_published_annotations" on public.article_annotations
for select to anon, authenticated using (published = true);
drop policy if exists "admin_write_annotations" on public.article_annotations;
create policy "admin_write_annotations" on public.article_annotations
for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
drop trigger if exists article_annotations_touch_updated_at on public.article_annotations;
create trigger article_annotations_touch_updated_at before update on public.article_annotations
for each row execute function public.touch_content_updated_at();