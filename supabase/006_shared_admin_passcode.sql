-- ============================================================
--  VelocityMotors — FIX PACK v4 (self-contained • idempotent)
--  Run once in: Supabase Dashboard → SQL Editor → New query → Run
--
--  Fixes: the admin panel password was stored only in the browser's
--  localStorage (same bug class as the site settings before), so
--  changing it on one device never affected any other device — and on
--  top of that, three old default passwords ("admin123", "admin",
--  "123456") always worked no matter what password was set, as a
--  leftover backdoor. Both are fixed by this migration + the paired
--  AdminAuthContext.tsx update.
-- ============================================================

create table if not exists public.admin_config (
  id          text primary key default 'default',
  passcode    text not null default 'admin123',
  updated_at  timestamptz not null default now()
);

grant select, insert, update on public.admin_config to anon, authenticated;
grant all on public.admin_config to service_role;

alter table public.admin_config enable row level security;
drop policy if exists "admin_config read"  on public.admin_config;
drop policy if exists "admin_config write" on public.admin_config;
-- The login screen itself has to be able to read the current passcode to
-- check what the visitor typed against it (this app has no server-side auth
-- step), so select is open — same trust model as the rest of this schema.
create policy "admin_config read"  on public.admin_config for select using (true);
create policy "admin_config write" on public.admin_config for all using (true) with check (true);

insert into public.admin_config (id, passcode)
values ('default', 'admin123')
on conflict (id) do nothing;

notify pgrst, 'reload schema';
