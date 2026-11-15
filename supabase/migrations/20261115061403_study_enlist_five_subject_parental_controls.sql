create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists public.student_profiles (
  student_id uuid primary key references auth.users(id) on delete cascade,
  date_of_birth date not null,
  grade_level smallint not null check (grade_level between 1 and 13),
  timezone text not null default 'Australia/Sydney',
  start_date date not null default current_date,
  onboarding_complete boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.student_guardians (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  guardian_id uuid references auth.users(id) on delete set null,
  guardian_email text not null,
  status text not null default 'pending' check (status in ('pending','approved','declined')),
  ai_assistance_allowed boolean,
  browser_lock_enabled boolean,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  unique (student_id, guardian_email)
);
create index if not exists student_guardians_guardian_idx on public.student_guardians (guardian_id, status);
create index if not exists student_guardians_email_idx on public.student_guardians (lower(guardian_email), status);
create table if not exists public.study_progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  grade_level smallint not null check (grade_level between 1 and 13),
  curriculum_day smallint not null check (curriculum_day between 1 and 365),
  subject text not null,
  status text not null default 'not_started' check (status in ('not_started','in_progress','completed')),
  quiz_score numeric(5,2) check (quiz_score between 0 and 100),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (student_id, grade_level, curriculum_day, subject)
);
create index if not exists study_progress_student_day_idx on public.study_progress (student_id, grade_level, curriculum_day);
create table if not exists public.study_notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references auth.users(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  curriculum_day smallint not null check (curriculum_day between 1 and 365),
  notification_type text not null check (notification_type in ('missed_daily_work','parent_approval','study_reminder')),
  title text not null,
  message text not null,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  unique (recipient_id, student_id, curriculum_day, notification_type)
);
create index if not exists study_notifications_recipient_idx on public.study_notifications (recipient_id, read_at, created_at desc);

alter table public.student_profiles enable row level security;
alter table public.student_guardians enable row level security;
alter table public.study_progress enable row level security;
alter table public.study_notifications enable row level security;

create policy "Students read own learning profile" on public.student_profiles for select to authenticated
using (student_id = (select auth.uid()) or exists (
  select 1 from public.student_guardians g where g.student_id = student_profiles.student_id and g.guardian_id = (select auth.uid()) and g.status = 'approved'
));
create policy "Students create own learning profile" on public.student_profiles for insert to authenticated with check (student_id = (select auth.uid()));
create policy "Student and invited guardian read relationship" on public.student_guardians for select to authenticated
using (student_id = (select auth.uid()) or guardian_id = (select auth.uid()) or lower(guardian_email) = lower(coalesce((select auth.jwt()->>'email'), '')));
create policy "Student creates guardian invitation" on public.student_guardians for insert to authenticated
with check (student_id = (select auth.uid()) and status = 'pending' and guardian_id is null);
create policy "Verified invited guardian records consent" on public.student_guardians for update to authenticated
using (status = 'pending' and guardian_id is null and lower(guardian_email) = lower(coalesce((select auth.jwt()->>'email'), '')))
with check (guardian_id = (select auth.uid()) and status = 'approved' and approved_at is not null and ai_assistance_allowed is not null and browser_lock_enabled is not null);
create policy "Students and guardians read progress" on public.study_progress for select to authenticated
using (student_id = (select auth.uid()) or exists (
  select 1 from public.student_guardians g where g.student_id = study_progress.student_id and g.guardian_id = (select auth.uid()) and g.status = 'approved'
));
create policy "Students insert own progress" on public.study_progress for insert to authenticated with check (student_id = (select auth.uid()));
create policy "Students update own progress" on public.study_progress for update to authenticated using (student_id = (select auth.uid())) with check (student_id = (select auth.uid()));
create policy "Recipients read their notifications" on public.study_notifications for select to authenticated using (recipient_id = (select auth.uid()));
create policy "Recipients mark notifications read" on public.study_notifications for update to authenticated using (recipient_id = (select auth.uid())) with check (recipient_id = (select auth.uid()));

create or replace function public.handle_new_student_profile()
returns trigger language plpgsql security definer set search_path = pg_catalog, public
as $$
declare dob date; guardian_email_value text; recommended_grade integer;
begin
  if coalesce(new.raw_user_meta_data->>'account_type', '') <> 'student' then return new; end if;
  dob := nullif(new.raw_user_meta_data->>'date_of_birth', '')::date;
  guardian_email_value := lower(trim(coalesce(new.raw_user_meta_data->>'guardian_email', '')));
  if dob is null or guardian_email_value = '' then raise exception 'Student signup requires date of birth and parent email'; end if;
  recommended_grade := extract(year from current_date)::integer - extract(year from dob)::integer
    - case when (extract(month from dob)::integer, extract(day from dob)::integer) > (7, 31) then 1 else 0 end - 5;
  recommended_grade := greatest(1, least(13, recommended_grade));
  insert into public.student_profiles (student_id, date_of_birth, grade_level)
  values (new.id, dob, recommended_grade) on conflict (student_id) do nothing;
  insert into public.student_guardians (student_id, guardian_email)
  values (new.id, guardian_email_value) on conflict (student_id, guardian_email) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_student_created on auth.users;
create trigger on_auth_student_created after insert on auth.users for each row execute function public.handle_new_student_profile();

create or replace function private.generate_study_compliance_notifications()
returns void language plpgsql security definer set search_path = pg_catalog, public
as $$
declare student record; due_day integer; completed_count integer;
begin
  for student in select sp.student_id, sp.grade_level, sp.start_date, sp.timezone from public.student_profiles sp where sp.onboarding_complete = true
  loop
    due_day := timezone(student.timezone, now())::date - student.start_date;
    if due_day < 1 or due_day > 365 then continue; end if;
    select count(*) into completed_count from public.study_progress p
      where p.student_id = student.student_id and p.grade_level = student.grade_level and p.curriculum_day = due_day and p.status = 'completed';
    if completed_count < 5 then
      insert into public.study_notifications (recipient_id, student_id, curriculum_day, notification_type, title, message)
      values (student.student_id, student.student_id, due_day, 'missed_daily_work', 'Daily learning not completed',
        format('Day %s is incomplete. Complete all five subject lessons or review your learning plan.', due_day))
      on conflict (recipient_id, student_id, curriculum_day, notification_type) do nothing;
      insert into public.study_notifications (recipient_id, student_id, curriculum_day, notification_type, title, message)
      select g.guardian_id, student.student_id, due_day, 'missed_daily_work', 'Learning progress needs attention',
        format('The five lessons scheduled for Day %s were not all completed.', due_day)
      from public.student_guardians g where g.student_id = student.student_id and g.status = 'approved' and g.guardian_id is not null
      on conflict (recipient_id, student_id, curriculum_day, notification_type) do nothing;
    end if;
  end loop;
end;
$$;
grant usage on schema private to postgres;
grant execute on function private.generate_study_compliance_notifications() to postgres;
do $$
begin
  if not exists (select 1 from cron.job where jobname = 'study-progress-compliance-hourly') then
    perform cron.schedule('study-progress-compliance-hourly', '15 * * * *', 'select private.generate_study_compliance_notifications();');
  end if;
end
$$;
