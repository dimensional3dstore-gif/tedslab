-- Ted's Lab content security model.
-- All exposed content tables use RLS.
-- Public users can read published content; authenticated admins can write.

alter table public.subjects enable row level security;
alter table public.sections enable row level security;
alter table public.topics enable row level security;
alter table public.articles enable row level security;
alter table public.pages enable row level security;
alter table public.hero_slides enable row level security;
alter table public.videos enable row level security;
alter table public.nav_links enable row level security;
alter table public.site_settings enable row level security;

-- is_admin() is defined by the authentication migrations in supabase/migrations.
-- Policies are recreated so this file remains a complete security reference.

drop policy if exists "public_read_published" on public.articles;
create policy "public_read_published" on public.articles
  for select to anon, authenticated
  using (published = true and status = 'published');

drop policy if exists "admin_write" on public.articles;
create policy "admin_write" on public.articles
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "public_read_published" on public.pages;
create policy "public_read_published" on public.pages
  for select to anon, authenticated
  using (published = true and status = 'published');

drop policy if exists "admin_write" on public.pages;
create policy "admin_write" on public.pages
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "public_read_published" on public.hero_slides;
create policy "public_read_published" on public.hero_slides
  for select to anon, authenticated
  using (active = true);

drop policy if exists "admin_write" on public.hero_slides;
create policy "admin_write" on public.hero_slides
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "public_read_published" on public.videos;
create policy "public_read_published" on public.videos
  for select to anon, authenticated
  using (published = true);

drop policy if exists "admin_write" on public.videos;
create policy "admin_write" on public.videos
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "public_read_published" on public.subjects;
create policy "public_read_published" on public.subjects
  for select to anon, authenticated
  using (true);

drop policy if exists "admin_write" on public.subjects;
create policy "admin_write" on public.subjects
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "public_read_published" on public.sections;
create policy "public_read_published" on public.sections
  for select to anon, authenticated
  using (true);

drop policy if exists "admin_write" on public.sections;
create policy "admin_write" on public.sections
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "public_read_published" on public.topics;
create policy "public_read_published" on public.topics
  for select to anon, authenticated
  using (true);

drop policy if exists "admin_write" on public.topics;
create policy "admin_write" on public.topics
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "public_read_published" on public.nav_links;
create policy "public_read_published" on public.nav_links
  for select to anon, authenticated
  using (true);

drop policy if exists "admin_write" on public.nav_links;
create policy "admin_write" on public.nav_links
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "public_read_published" on public.site_settings;
create policy "public_read_published" on public.site_settings
  for select to anon, authenticated
  using (true);

drop policy if exists "admin_write" on public.site_settings;
create policy "admin_write" on public.site_settings
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));
