drop policy if exists "Approved guardians activate student profile" on public.student_profiles;
create policy "Approved guardians activate student profile" on public.student_profiles for update to authenticated
using (exists (select 1 from public.student_guardians g where g.student_id = student_profiles.student_id and g.guardian_id = (select auth.uid()) and g.status = 'approved'))
with check (exists (select 1 from public.student_guardians g where g.student_id = student_profiles.student_id and g.guardian_id = (select auth.uid()) and g.status = 'approved'));
