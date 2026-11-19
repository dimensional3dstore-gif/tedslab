create table if not exists public.premium_entitlements (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan text not null default 'pro' check (plan in ('free','pro','research')),
  active boolean not null default true,
  active_until timestamptz,
  features jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.premium_entitlements enable row level security;

drop policy if exists premium_read_own on public.premium_entitlements;
create policy premium_read_own on public.premium_entitlements
  for select to authenticated
  using ((select auth.uid()) = user_id or (select public.is_admin()));

drop policy if exists premium_admin_insert on public.premium_entitlements;
create policy premium_admin_insert on public.premium_entitlements
  for insert to authenticated
  with check ((select public.is_admin()));

drop policy if exists premium_admin_update on public.premium_entitlements;
create policy premium_admin_update on public.premium_entitlements
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists premium_admin_delete on public.premium_entitlements;
create policy premium_admin_delete on public.premium_entitlements
  for delete to authenticated
  using ((select public.is_admin()));

create index if not exists premium_entitlements_active_until_idx on public.premium_entitlements(active_until);

create or replace function public.touch_premium_entitlement_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists premium_entitlements_updated_at on public.premium_entitlements;
create trigger premium_entitlements_updated_at
before update on public.premium_entitlements
for each row execute function public.touch_premium_entitlement_updated_at();
