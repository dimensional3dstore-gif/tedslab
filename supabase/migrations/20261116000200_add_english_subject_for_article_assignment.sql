insert into public.subjects (id, slug, title, description, icon, image_key, image_url, sort)
values (
  'sub-english',
  'english',
  'English',
  'Literature, poetry, grammar and the craft of writing.',
  'BookOpen',
  'eng-literature',
  null,
  4
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  icon = excluded.icon,
  image_key = excluded.image_key,
  sort = excluded.sort;
