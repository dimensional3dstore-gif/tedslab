-- Allow public catalog reads and Ted's Lab admins to manage subjects.
alter table public.subjects enable row level security;

drop policy if exists "public_read_subjects" on public.subjects;
create policy "public_read_subjects" on public.subjects
  for select to anon, authenticated
  using (true);

drop policy if exists "admin_write_subjects" on public.subjects;
create policy "admin_write_subjects" on public.subjects
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));
