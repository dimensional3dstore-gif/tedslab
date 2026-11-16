alter table public.user_roles add column if not exists email text, add column if not exists profile_name text;
update public.user_roles ur set email=p.email,profile_name=p.display_name from public.profiles p where p.id=ur.user_id;

create or replace function public.sync_profile_directory_fields() returns trigger language plpgsql security definer set search_path='' as $function$
begin
 select u.email into new.email from auth.users u where u.id=new.id;
 update public.user_roles set email=new.email,profile_name=new.display_name where user_id=new.id;
 return new;
end;$function$;
drop trigger if exists sync_profile_directory_fields on public.profiles;
create trigger sync_profile_directory_fields before insert or update of display_name,email on public.profiles for each row execute function public.sync_profile_directory_fields();

create or replace function public.sync_new_role_directory_fields() returns trigger language plpgsql security definer set search_path='' as $function$
begin
 select p.email,p.display_name into new.email,new.profile_name from public.profiles p where p.id=new.user_id;
 return new;
end;$function$;
drop trigger if exists sync_new_role_directory_fields on public.user_roles;
create trigger sync_new_role_directory_fields before insert or update of user_id on public.user_roles for each row execute function public.sync_new_role_directory_fields();
grant select on public.user_roles to authenticated;
