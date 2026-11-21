create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  slug text not null unique,
  title text not null,
  excerpt text,
  body text not null default '',
  cover_image_url text,
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_at_idx on public.blog_posts (published_at desc) where status = 'published';

alter table public.blog_posts enable row level security;

drop policy if exists "Published blog posts are public" on public.blog_posts;
create policy "Published blog posts are public" on public.blog_posts for select to anon, authenticated using (status = 'published');

drop policy if exists "Authors can read their blog posts" on public.blog_posts;
create policy "Authors can read their blog posts" on public.blog_posts for select to authenticated using ((select auth.uid()) = author_id);

drop policy if exists "Authors can create blog posts" on public.blog_posts;
create policy "Authors can create blog posts" on public.blog_posts for insert to authenticated with check ((select auth.uid()) = author_id);

drop policy if exists "Authors can update blog posts" on public.blog_posts;
create policy "Authors can update blog posts" on public.blog_posts for update to authenticated using ((select auth.uid()) = author_id) with check ((select auth.uid()) = author_id);

drop policy if exists "Authors can delete blog posts" on public.blog_posts;
create policy "Authors can delete blog posts" on public.blog_posts for delete to authenticated using ((select auth.uid()) = author_id);

drop policy if exists "Admins can manage all blog posts" on public.blog_posts;
create policy "Admins can manage all blog posts" on public.blog_posts for all to authenticated
using (exists (select 1 from public.user_roles where user_roles.user_id = (select auth.uid()) and user_roles.role = 'admin'))
with check (exists (select 1 from public.user_roles where user_roles.user_id = (select auth.uid()) and user_roles.role = 'admin'));

create or replace function public.touch_blog_posts_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  if new.status = 'published' and old.status <> 'published' and new.published_at is null then
    new.published_at = now();
  elsif new.status <> 'published' then
    new.published_at = null;
  end if;
  return new;
end;
$$;

drop trigger if exists blog_posts_touch_updated_at on public.blog_posts;
create trigger blog_posts_touch_updated_at before update on public.blog_posts for each row execute function public.touch_blog_posts_updated_at();

grant select on public.blog_posts to anon, authenticated;
grant insert, update, delete on public.blog_posts to authenticated;


create table if not exists public.blog_post_votes (
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  value smallint not null check (value in (-1, 1)),
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create index if not exists blog_post_votes_post_idx on public.blog_post_votes(post_id);

alter table public.blog_post_votes enable row level security;
drop policy if exists "Blog post votes are public" on public.blog_post_votes;
create policy "Blog post votes are public" on public.blog_post_votes for select to anon, authenticated using (true);
drop policy if exists "Users can vote on blog posts" on public.blog_post_votes;
create policy "Users can vote on blog posts" on public.blog_post_votes for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "Users can change their blog post votes" on public.blog_post_votes;
create policy "Users can change their blog post votes" on public.blog_post_votes for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists "Users can remove their blog post votes" on public.blog_post_votes;
create policy "Users can remove their blog post votes" on public.blog_post_votes for delete to authenticated using ((select auth.uid()) = user_id);

create table if not exists public.blog_post_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists blog_post_comments_post_idx on public.blog_post_comments(post_id, created_at asc);

alter table public.blog_post_comments enable row level security;
drop policy if exists "Published post comments are public" on public.blog_post_comments;
create policy "Published post comments are public" on public.blog_post_comments for select to anon, authenticated
using (exists (select 1 from public.blog_posts p where p.id = post_id and p.status = 'published'));
drop policy if exists "Users can create blog post comments" on public.blog_post_comments;
create policy "Users can create blog post comments" on public.blog_post_comments for insert to authenticated
with check ((select auth.uid()) = author_id and exists (select 1 from public.blog_posts p where p.id = post_id and p.status = 'published'));
drop policy if exists "Users can delete their blog post comments" on public.blog_post_comments;
create policy "Users can delete their blog post comments" on public.blog_post_comments for delete to authenticated using ((select auth.uid()) = author_id);

grant select on public.blog_post_votes, public.blog_post_comments to anon, authenticated;
grant insert, update, delete on public.blog_post_votes to authenticated;
grant insert, delete on public.blog_post_comments to authenticated;
