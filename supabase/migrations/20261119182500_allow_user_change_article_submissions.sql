alter table public.articles
  add column if not exists author_id uuid references auth.users(id) on delete set null;

create index if not exists articles_author_id_idx on public.articles(author_id);

grant insert on table public.articles to authenticated;

drop policy if exists "authenticated_submit_change_articles" on public.articles;
create policy "authenticated_submit_change_articles"
  on public.articles
  for insert
  to authenticated
  with check (
    author_id = (select auth.uid())
    and subject_slug = 'change-encyclopaedia'
    and published = false
    and status in ('draft', 'review')
    and expert_reviewed = false
  );