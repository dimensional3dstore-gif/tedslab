-- App Studio projects: generated app source + deployment metadata.
create table if not exists public.tedslab_app_projects (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  name text not null,
  slug text not null unique,
  prompt text not null default '',
  html text not null default '',
  css text not null default '',
  js text not null default '',
  status text not null default 'draft'
    check (status in ('draft', 'generated', 'deployed', 'failed')),
  deployment_url text,
  custom_domain text,
  vercel_project_id text,
  vercel_deployment_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tedslab_app_projects_user_id_idx
  on public.tedslab_app_projects (user_id);

create index if not exists tedslab_app_projects_status_idx
  on public.tedslab_app_projects (status);

alter table public.tedslab_app_projects enable row level security;
