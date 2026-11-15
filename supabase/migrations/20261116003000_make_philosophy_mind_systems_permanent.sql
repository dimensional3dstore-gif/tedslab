insert into public.subjects (id, slug, title, description, icon, sort)
values
 ('sub-atlas-philosophy','philosophy','Philosophy','Knowledge, reasoning, ethics, metaphysics and the study of ideas.','Landmark',0),
 ('sub-atlas-mind','mind','Mind & Cognition','Consciousness, cognition, language, perception and behaviour.','Brain',6),
 ('sub-atlas-systems','systems','Systems Science','Complexity, networks, feedback, emergence and systems thinking.','Network',7)
on conflict (slug) do update set
 title = excluded.title,
 description = excluded.description,
 icon = excluded.icon,
 updated_at = now();
