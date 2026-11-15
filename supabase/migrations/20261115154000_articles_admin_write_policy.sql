-- Ensure the admin article editor is backed by Supabase RLS.
-- Public readers only see published articles; authenticated Ted's Lab admins
-- can create, update, publish, and delete articles.

alter table public.articles enable row level security;

drop policy if exists "public_read_published" on public.articles;
create policy "public_read_published" on public.articles
  for select to anon, authenticated
  using (published = true and status = 'published');

drop policy if exists "admin_write_articles" on public.articles;
create policy "admin_write_articles" on public.articles
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));
