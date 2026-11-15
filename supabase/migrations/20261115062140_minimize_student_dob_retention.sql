
alter table public.student_profiles alter column date_of_birth drop not null;

create or replace function public.handle_new_student_profile()
returns trigger language plpgsql security definer set search_path = pg_catalog, public
as $$
declare
  dob date;
  guardian_email_value text;
  recommended_grade integer;
begin
  if coalesce(new.raw_user_meta_data->>'account_type', '') <> 'student' then return new; end if;
  dob := nullif(new.raw_user_meta_data->>'date_of_birth', '')::date;
  guardian_email_value := lower(trim(coalesce(new.raw_user_meta_data->>'guardian_email', '')));
  if dob is null or guardian_email_value = '' then
    raise exception 'Student signup requires date of birth and parent email';
  end if;
  recommended_grade := extract(year from current_date)::integer - extract(year from dob)::integer
    - case when (extract(month from dob)::integer, extract(day from dob)::integer) > (7, 31) then 1 else 0 end - 5;
  recommended_grade := greatest(1, least(13, recommended_grade));
  insert into public.student_profiles (student_id, date_of_birth, grade_level, start_date)
  values (new.id, dob, recommended_grade, timezone('Australia/Sydney', now())::date)
  on conflict (student_id) do nothing;
  insert into public.student_guardians (student_id, guardian_email)
  values (new.id, guardian_email_value)
  on conflict (student_id, guardian_email) do nothing;
  update auth.users
  set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb) - 'date_of_birth' - 'guardian_email'
  where id = new.id;
  return new;
end;
$$;
revoke all on function public.handle_new_student_profile() from public, anon, authenticated;

