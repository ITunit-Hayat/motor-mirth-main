-- ============================================================
--  VelocityMotors — FIX PACK v3 (self-contained • idempotent)
--  Run once in: Supabase Dashboard → SQL Editor → New query → Run
--  Safe to re-run any number of times. Works whether or not 003/004 ran.
--
--  Fixes:
--   1) Site settings (name, phone, address, WhatsApp, discount banner…)
--      were only ever saved to the browser's localStorage, so every
--      visitor/device/browser saw different values, and the admin's own
--      changes "disappeared" when they switched devices. Now stored in
--      Supabase and shared instantly with every visitor.
--   2) "Reset analytics" couldn't actually clear the shared page view
--      counter because the database only allowed INSERT/SELECT on it,
--      not DELETE.
-- ============================================================

-- ---------- 1. SITE_SETTINGS: one shared row, live for every visitor ----------
create table if not exists public.site_settings (
  id          text primary key default 'default',
  data        jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

grant select, insert, update on public.site_settings to anon, authenticated;
grant all on public.site_settings to service_role;

alter table public.site_settings enable row level security;
drop policy if exists "site_settings public read"  on public.site_settings;
drop policy if exists "site_settings public write" on public.site_settings;
-- Matches this app's model: the admin area is gated by the in-app passcode,
-- not per-database-user auth, so writes are open at the DB level (same as
-- cars/orders/attributes already are).
create policy "site_settings public read"  on public.site_settings for select using (true);
create policy "site_settings public write" on public.site_settings for all using (true) with check (true);

insert into public.site_settings (id, data)
values ('default', '{}'::jsonb)
on conflict (id) do nothing;

-- ---------- 2. PAGE_VIEWS: allow the dashboard's "Reset analytics" to actually clear it ----------
grant delete on public.page_views to anon, authenticated;
drop policy if exists "page_views public delete" on public.page_views;
create policy "page_views public delete" on public.page_views for delete using (true);

notify pgrst, 'reload schema';
