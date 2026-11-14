-- Allow the verified Ted's Lab owner email to administer articles.
-- Authentication still requires a valid Supabase Auth session and verified email.
-- No password or credential material is stored in this migration.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $function$
  select
    exists (
      select 1
      from public.user_roles ur
      where ur.user_id = (select auth.uid())
        and ur.role = 'admin'
    )
    or exists (
      select 1
      from auth.users u
      where u.id = (select auth.uid())
        and lower(u.email) = 'admin@tedslab.com'
        and u.email_confirmed_at is not null
    );
$function$;
