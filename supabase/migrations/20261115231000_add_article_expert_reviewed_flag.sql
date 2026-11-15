alter table public.articles
  add column if not exists expert_reviewed boolean not null default false;

comment on column public.articles.expert_reviewed is
  'Editorial review flag set by the Ted''s Lab article publishing workflow.';
