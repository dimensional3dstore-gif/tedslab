create table public.chronosos_download_events (
  id uuid primary key default gen_random_uuid(),
  release_tag text not null
    check (release_tag ~ '^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$'),
  platform text not null check (platform = 'macos-arm64'),
  created_at timestamptz not null default now()
);

alter table public.chronosos_download_events enable row level security;

revoke all on table public.chronosos_download_events from anon, authenticated;
grant insert (release_tag, platform)
  on table public.chronosos_download_events to anon, authenticated;

create policy "Allow anonymous ChronosOS download tracking"
  on public.chronosos_download_events
  for insert
  to anon, authenticated
  with check (true);
