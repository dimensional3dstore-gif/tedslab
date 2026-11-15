alter table public.articles
  alter column subject_slug set not null;

alter table public.articles
  add constraint articles_subject_slug_fkey
  foreign key (subject_slug)
  references public.subjects (slug)
  on update cascade
  on delete restrict;

comment on column public.articles.subject_slug is
  'Required subject slug; every article must belong to a valid Ted''s Lab subject.';
