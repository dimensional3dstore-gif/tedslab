-- Article editor/publishing infrastructure.
-- Applied to the Ted's Lab Supabase production project.

create index if not exists articles_slug_idx on public.articles(slug);
create index if not exists articles_status_updated_idx on public.articles(status, updated_at desc);

create or replace function public.touch_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_touch_updated_at on public.articles;
create trigger articles_touch_updated_at
before update on public.articles
for each row execute function public.touch_content_updated_at();

comment on column public.articles.body is
  'Structured Ted''s Lab article layout JSON used by the admin editor and public ArticleTemplate.';

comment on column public.articles.status is
  'draft = private working copy; review = editorial review; published = public article.';
