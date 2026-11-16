revoke execute on function public.handle_new_user() from public,anon,authenticated;
revoke execute on function public.sync_auth_user_profile() from public,anon,authenticated;
revoke execute on function public.sync_profile_directory_fields() from public,anon,authenticated;
revoke execute on function public.sync_new_role_directory_fields() from public,anon,authenticated;
revoke execute on function public.is_admin() from public,anon;
grant execute on function public.is_admin() to authenticated;
drop policy if exists admin_write on public.article_annotations;
create or replace function public.touch_content_updated_at() returns trigger language plpgsql set search_path='' as $function$
begin new.updated_at=now(); return new; end;$function$;
