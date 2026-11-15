alter table public.student_profiles
  drop constraint if exists student_profiles_active_grade_required;
alter table public.student_profiles
  add constraint student_profiles_active_grade_required
  check (onboarding_complete = false or grade_level is not null);
