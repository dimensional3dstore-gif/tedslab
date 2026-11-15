insert into public.topics (id, subject_id, subject_slug, section_id, slug, title, blurb, body, image_url, sort)
select
  'atlas-topic-' || s.slug,
  s.id,
  s.slug,
  null,
  'knowledge-atlas',
  'Knowledge Atlas',
  'All Knowledge Atlas entries filed under this subject.',
  'A subject-owned collection of Knowledge Atlas articles and concepts.',
  null,
  500
from public.subjects s
where s.slug in ('philosophy','science','mathematics','biology','english','technology','history','mind','systems')
on conflict (id) do update set
 subject_id = excluded.subject_id,
 subject_slug = excluded.subject_slug,
 section_id = null,
 slug = excluded.slug,
 title = excluded.title,
 blurb = excluded.blurb,
 body = excluded.body,
 sort = excluded.sort,
 updated_at = now();
