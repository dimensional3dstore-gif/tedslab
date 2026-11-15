drop policy if exists "Invited guardian reads student placement" on public.student_profiles;
create policy "Invited guardian reads student placement" on public.student_profiles for select to authenticated
using (exists (select 1 from public.student_guardians g where g.student_id = student_profiles.student_id and lower(g.guardian_email) = lower(coalesce((select auth.jwt()->>'email'), '')) and g.status = 'pending'));
revoke update on public.student_guardians from authenticated;
grant update (guardian_id, status, ai_assistance_allowed, browser_lock_enabled, approved_at) on public.student_guardians to authenticated;
revoke update on public.study_notifications from authenticated;
grant update (read_at) on public.study_notifications to authenticated;
