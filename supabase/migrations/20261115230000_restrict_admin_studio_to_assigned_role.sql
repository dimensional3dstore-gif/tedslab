-- Restrict Admin Studio to accounts explicitly assigned the admin role.
-- The designated owner account is admin@tedslab.com.
update public.user_roles ur
set role = 'admin'
from auth.users u
where u.id = ur.user_id
  and lower(u.email) = 'admin@tedslab.com';

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $function$
  select exists (
    select 1
    from public.user_roles ur
    where ur.user_id = (select auth.uid())
      and ur.role = 'admin'
  );
$function$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;
