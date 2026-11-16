delete from public.topics where slug='knowledge-atlas' and subject_slug in ('philosophy','mind','systems','biology','mathematics','science','technology','history','english');

insert into public.articles (id,slug,title,excerpt,body,minutes,tone,subject_slug,section_slug,topic_slug,published,status,expert_reviewed,sort)
select 'topic-article-'||t.id,'topic-'||t.subject_slug||'-'||t.slug,t.title||': An Introduction',
coalesce(t.blurb,'An introduction to '||t.title||'.'),
jsonb_build_object('overview',jsonb_build_array(coalesce(t.blurb,'An introduction to '||t.title||'.'),'This is an expandable topic article. Add deeper explanations, examples, diagrams, applications and connections as the topic develops.'),'sections',jsonb_build_array(jsonb_build_object('title','Core ideas','body',coalesce(t.body,t.blurb,'Explore the foundational ideas and vocabulary of this topic.')),jsonb_build_object('title','Further directions','body','Develop this topic with explanations, worked examples, historical context, applications and links to related fields.')),'keyTerms',jsonb_build_array(t.title),'questions',jsonb_build_array('What are the central ideas?','What examples show these ideas in practice?','How does this topic connect to other areas of knowledge?'))::text,
8,'educational',t.subject_slug,null,t.slug,true,'published',false,t.sort
from public.topics t
where not exists(select 1 from public.articles a where a.subject_slug=t.subject_slug and a.topic_slug=t.slug)
on conflict(id) do nothing;

alter table public.profiles add column if not exists email text;
update public.profiles p set email=u.email,display_name=coalesce(nullif(p.display_name,''),nullif(u.raw_user_meta_data->>'display_name',''),nullif(u.raw_user_meta_data->>'full_name',''),''),updated_at=now()
from auth.users u where u.id=p.id;

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path='' as $function$
begin
 insert into public.profiles(id,display_name,email) values(new.id,coalesce(nullif(new.raw_user_meta_data->>'display_name',''),nullif(new.raw_user_meta_data->>'full_name',''),''),new.email)
 on conflict(id) do update set email=excluded.email,display_name=coalesce(nullif(public.profiles.display_name,''),excluded.display_name),updated_at=now();
 insert into public.user_roles(user_id,role) values(new.id,'user') on conflict(user_id,role) do nothing;
 return new;
end;$function$;

create or replace function public.sync_auth_user_profile() returns trigger language plpgsql security definer set search_path='' as $function$
begin
 update public.profiles set email=new.email,display_name=coalesce(nullif(new.raw_user_meta_data->>'display_name',''),nullif(new.raw_user_meta_data->>'full_name',''),display_name),updated_at=now() where id=new.id;
 return new;
end;$function$;
drop trigger if exists sync_auth_user_profile on auth.users;
create trigger sync_auth_user_profile after update of email,raw_user_meta_data on auth.users for each row execute function public.sync_auth_user_profile();

do $$ declare tbl text; begin
 foreach tbl in array array['subjects','sections','topics','articles','hero_slides','pages','videos','nav_links','site_settings','article_annotations'] loop
  execute format('alter table public.%I enable row level security',tbl);
  if not exists(select 1 from pg_policies where schemaname='public' and tablename=tbl and policyname='admin_write') then
   execute format('create policy admin_write on public.%I for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()))',tbl);
  end if;
 end loop;
end $$;
grant select on public.profiles to authenticated;
grant update(display_name) on public.profiles to authenticated;
