alter table public.article_submissions
  add column if not exists video_url text;

insert into storage.buckets (id, name, public)
values ('article-media', 'article-media', true)
on conflict (id) do update set public = true;

drop policy if exists "public read article media" on storage.objects;
create policy "public read article media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'article-media');

drop policy if exists "admins upload article media" on storage.objects;
create policy "admins upload article media"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'article-media'
    and (
      (select public.is_admin())
      or (
        (storage.foldername(name))[1] = 'submissions'
        and (storage.foldername(name))[2] = (select auth.uid()::text)
      )
    )
  );

drop policy if exists "admins update article media" on storage.objects;
create policy "admins update article media"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'article-media'
    and (
      (select public.is_admin())
      or (
        (storage.foldername(name))[1] = 'submissions'
        and (storage.foldername(name))[2] = (select auth.uid()::text)
      )
    )
  )
  with check (
    bucket_id = 'article-media'
    and (
      (select public.is_admin())
      or (
        (storage.foldername(name))[1] = 'submissions'
        and (storage.foldername(name))[2] = (select auth.uid()::text)
      )
    )
  );

drop policy if exists "admins delete article media" on storage.objects;
create policy "admins delete article media"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'article-media'
    and (
      (select public.is_admin())
      or (
        (storage.foldername(name))[1] = 'submissions'
        and (storage.foldername(name))[2] = (select auth.uid()::text)
      )
    )
  );