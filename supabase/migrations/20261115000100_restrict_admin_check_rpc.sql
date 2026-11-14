-- The admin helper is used by authenticated RLS policies; do not expose it to anon RPC callers.
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;
