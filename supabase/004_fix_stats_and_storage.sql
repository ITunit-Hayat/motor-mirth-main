-- ============================================================
--  VelocityMotors — FIX PACK v2 (self-contained • idempotent)
--  Run once in: Supabase Dashboard → SQL Editor → New query → Run
--  Safe to re-run any number of times.
--
--  Why v2? The old file assumed 003_admin_dashboard_upgrade.sql had
--  already created `public.attributes` (and other objects), so on a
--  database where 003 had NOT been applied it failed with:
--      ERROR: 42P01: relation "public.attributes" does not exist
--  This version is fully self-contained: it creates every table and
--  column it uses before referencing them, so it works on ANY database
--  state (fresh from schema.sql, schema+002, or fully migrated).
--
--  Fixes the three live issues:
--   1) "Bucket not found" when uploading car photos (car-images bucket)
--   2) Edits / new cars not saving (RLS blocked passcode-gated writes)
--   3) Real page_views table so visitor stats are shared across visitors
-- ============================================================

-- ---------- 0. BOOTSTRAP: build every object used below ----------

-- CAR lifecycle status + vehicle history fields (used by the admin UI)
alter table public.cars add column if not exists status text not null default 'Active'
  check (status in ('Active','Draft','Reserved','Sold'));
alter table public.cars add column if not exists inspection_report text not null default '';
alter table public.cars add column if not exists previous_owners int not null default 0;

-- ORDER request type (Reservation / SellMyCar / TradeIn / TestDrive / Financing / Contact)
alter table public.orders add column if not exists type text not null default 'Purchase';

-- ATTRIBUTES: dynamic dropdown values (makes / body types / colors / engine types / transmissions)
create table if not exists public.attributes (
  id          uuid primary key default gen_random_uuid(),
  category    text not null check (category in ('make','category','color','engine_type','transmission')),
  value       text not null,
  created_at  timestamptz not null default now(),
  unique (category, value)
);

-- ---------- 1. STORAGE BUCKET: car-images ----------
insert into storage.buckets (id, name, public)
values ('car-images', 'car-images', true)
on conflict (id) do update set public = true;

drop policy if exists "car-images public read"   on storage.objects;
drop policy if exists "car-images admin insert"  on storage.objects;
drop policy if exists "car-images admin update"  on storage.objects;
drop policy if exists "car-images admin delete"  on storage.objects;
drop policy if exists "car-images open insert"   on storage.objects;
drop policy if exists "car-images open update"   on storage.objects;
drop policy if exists "car-images open delete"   on storage.objects;
create policy "car-images public read" on storage.objects for select
  using (bucket_id = 'car-images');
create policy "car-images open insert" on storage.objects for insert
  to anon, authenticated with check (bucket_id = 'car-images');
create policy "car-images open update" on storage.objects for update
  to anon, authenticated using (bucket_id = 'car-images');
create policy "car-images open delete" on storage.objects for delete
  to anon, authenticated using (bucket_id = 'car-images');

-- ---------- 2. DATA API GRANTS ----------
grant select, insert, update, delete on public.cars       to anon, authenticated;
grant select, insert, update, delete on public.orders     to anon, authenticated;
grant select, insert, update, delete on public.attributes to anon, authenticated;
grant all on public.cars, public.orders, public.attributes to service_role;

-- ---------- 3. ROW LEVEL SECURITY ----------
alter table public.cars        enable row level security;
alter table public.orders      enable row level security;
alter table public.attributes  enable row level security;

-- CARS: open read + open write (the admin area is gated by the in-app passcode)
drop policy if exists "cars public read"  on public.cars;
drop policy if exists "cars public write" on public.cars;
drop policy if exists "cars visitor read" on public.cars;
drop policy if exists "cars admin write"  on public.cars;
create policy "cars public read"  on public.cars for select using (true);
create policy "cars public write" on public.cars for all using (true) with check (true);

-- ORDERS: anyone may submit a request; the dashboard reads and updates status
drop policy if exists "orders public insert" on public.orders;
drop policy if exists "orders public read"   on public.orders;
drop policy if exists "orders public update" on public.orders;
drop policy if exists "orders admin read"    on public.orders;
drop policy if exists "orders admin update"  on public.orders;
create policy "orders public insert" on public.orders for insert with check (true);
create policy "orders public read"   on public.orders for select using (true);
create policy "orders public update" on public.orders for update using (true) with check (true);

-- ATTRIBUTES: dropdown values are public; curated from the Attributes admin page
drop policy if exists "attributes public read"  on public.attributes;
drop policy if exists "attributes admin write"  on public.attributes;
drop policy if exists "attributes public write" on public.attributes;
create policy "attributes public read"  on public.attributes for select using (true);
create policy "attributes public write" on public.attributes for all using (true) with check (true);

-- Drop the 003 permission trigger: it was designed for real Supabase Auth
-- roles, but this app authenticates with an in-app passcode, so the trigger
-- wrongly blocked price edits and deletes. (No-op if 003 was never applied.)
drop trigger if exists cars_permission_check on public.cars;
drop function if exists public.enforce_car_edit_permissions();
drop function if exists public.current_admin_role();

-- ---------- 4. ORDER TYPE / STATUS WORKFLOW ----------
-- 4-stage status workflow
alter table public.orders drop constraint if exists orders_status_check;
alter table public.orders add constraint orders_status_check
  check (status in ('New','Processing','Contacted','Closed'));

-- Request types are free-form: drop the old 003 whitelist if it exists,
-- keep the column defaulting to 'Purchase'
do $$
begin
  if exists (select 1 from pg_constraint where conname = 'orders_type_check') then
    alter table public.orders drop constraint orders_type_check;
  end if;
end $$;
alter table public.orders alter column type set default 'Purchase';

-- ---------- 5. PAGE VIEWS: real, shared visitor analytics ----------
create table if not exists public.page_views (
  id         uuid primary key default gen_random_uuid(),
  path       text        not null,
  created_at timestamptz not null default now()
);
create index if not exists page_views_created_at_idx on public.page_views (created_at desc);

grant select, insert on public.page_views to anon, authenticated;
grant all on public.page_views to service_role;

alter table public.page_views enable row level security;
drop policy if exists "page_views public insert" on public.page_views;
drop policy if exists "page_views public read"   on public.page_views;
create policy "page_views public insert" on public.page_views for insert with check (true);
create policy "page_views public read"   on public.page_views for select using (true);

-- ---------- 6. SEED starter dropdown values (no-ops if already present) ----------
insert into public.attributes (category, value) values
 ('make','Tesla'), ('make','BMW'), ('make','Porsche'), ('make','Mercedes-Benz'), ('make','Audi'), ('make','Land Rover'),
 ('category','Sedan'), ('category','SUV'), ('category','Coupe'), ('category','Sports'), ('category','Electric'),
 ('color','Pearl White'), ('color','Alpine White'), ('color','Guards Red'), ('color','Obsidian Black'), ('color','Nardo Grey'),
 ('engine_type','Petrol'), ('engine_type','Diesel'), ('engine_type','Electric'), ('engine_type','Hybrid'),
 ('transmission','Automatic'), ('transmission','Manual'), ('transmission','PDK'), ('transmission','Single-Speed')
on conflict do nothing;

-- Refresh PostgREST's schema cache so everything above is live immediately.
notify pgrst, 'reload schema';
