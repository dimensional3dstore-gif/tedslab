alter table public.topics drop constraint if exists topics_subject_slug_fkey;
alter table public.topics add constraint topics_subject_slug_fkey foreign key (subject_slug) references public.subjects(slug) on update cascade on delete cascade;
