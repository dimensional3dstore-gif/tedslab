
alter table public.student_profiles drop column if exists date_of_birth;
alter table public.student_profiles alter column grade_level drop not null;

create or replace function public.handle_new_student_profile()
returns trigger language plpgsql security definer set search_path = pg_catalog, public
as $$
declare guardian_email_value text;
begin
  if coalesce(new.raw_user_meta_data->>'account_type', '') <> 'student' then return new; end if;
  guardian_email_value := lower(trim(coalesce(new.raw_user_meta_data->>'guardian_email', '')));
  if guardian_email_value = '' then raise exception 'Student signup requires a parent or guardian email'; end if;
  insert into public.student_profiles (student_id, start_date)
  values (new.id, timezone('Australia/Sydney', now())::date)
  on conflict (student_id) do nothing;
  insert into public.student_guardians (student_id, guardian_email)
  values (new.id, guardian_email_value)
  on conflict (student_id, guardian_email) do nothing;
  update auth.users set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb) - 'guardian_email'
  where id = new.id;
  return new;
end;
$$;
revoke all on function public.handle_new_student_profile() from public, anon, authenticated;

