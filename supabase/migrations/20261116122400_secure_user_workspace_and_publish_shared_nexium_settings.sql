alter table public.user_data enable row level security;
revoke all on public.user_data from anon;
grant select, insert, update, delete on public.user_data to authenticated;
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='user_data' and policyname='user_data_owner_access') then
    create policy user_data_owner_access on public.user_data
      for all to authenticated
      using (user_id = (select auth.uid()))
      with check (user_id = (select auth.uid()));
  end if;
end $$;

alter table public.site_settings enable row level security;
revoke insert, update, delete on public.site_settings from anon;
grant select on public.site_settings to anon, authenticated;
grant insert, update, delete on public.site_settings to authenticated;
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='site_settings' and policyname='public_read_published') then
    create policy public_read_published on public.site_settings
      for select to anon, authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='site_settings' and policyname='admin_write') then
    create policy admin_write on public.site_settings
      for all to authenticated
      using ((select public.is_admin()))
      with check ((select public.is_admin()));
  end if;
end $$;