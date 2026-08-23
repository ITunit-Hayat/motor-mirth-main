-- ============================================================
--  VelocityMotors — Admin Dashboard upgrade
--  Run this whole file once in: Supabase Dashboard → SQL Editor → New query → Run
--  Safe to re-run (idempotent).
--
--  After running this, create your first Super Admin:
--   1) Dashboard → Authentication → Users → Add user (set an email + password)
--   2) Run the snippet at the bottom of this file with that user's email.
-- ============================================================

-- ---------- 1. CARS: lifecycle status + vehicle history fields ----------
alter table public.cars add column if not exists status text not null default 'Active'
  check (status in ('Active','Draft','Reserved','Sold'));
alter table public.cars add column if not exists inspection_report text not null default '';
alter table public.cars add column if not exists previous_owners int not null default 0;

-- ---------- 2. ORDERS: request type + 4-stage workflow ----------
alter table public.orders add column if not exists type text not null default 'Purchase'
  check (type in ('Purchase','TestDrive','Financing','Contact'));

alter table public.orders drop constraint if exists orders_status_check;
alter table public.orders add constraint orders_status_check
  check (status in ('New','Processing','Contacted','Closed'));

-- ---------- 3. ATTRIBUTES: dynamic makes / body types / colors / engine types ----------
create table if not exists public.attributes (
  id          uuid primary key default gen_random_uuid(),
  category    text not null check (category in ('make','category','color','engine_type','transmission')),
  value       text not null,
  created_at  timestamptz not null default now(),
  unique (category, value)
);

-- ---------- 4. ADMIN_USERS: real accounts + role (Super Admin / Sales Agent) ----------
create table if not exists public.admin_users (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  name        text,
  role        text not null default 'SalesAgent' check (role in ('SuperAdmin','SalesAgent')),
  created_at  timestamptz not null default now()
);

-- Helper used by RLS policies below. SECURITY DEFINER so it can read
-- admin_users regardless of that table's own RLS (avoids recursive checks).
create or replace function public.current_admin_role()
returns text
language sql stable security definer set search_path = public
as $$
  select role from public.admin_users where id = auth.uid()
$$;

-- Enforce "Sales Agents can't delete a car or change its price" at the DB
-- level too (not just hidden in the UI).
create or replace function public.enforce_car_edit_permissions()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if public.current_admin_role() = 'SuperAdmin' then
    return new;
  end if;
  if tg_op = 'DELETE' then
    raise exception 'Only a Super Admin can delete a car';
  end if;
  if new.price is distinct from old.price then
    raise exception 'Only a Super Admin can change a car''s price';
  end if;
  return new;
end;
$$;

drop trigger if exists cars_permission_check on public.cars;
create trigger cars_permission_check
  before update or delete on public.cars
  for each row execute function public.enforce_car_edit_permissions();

-- ---------- 5. DATA API GRANTS ----------
grant select, insert, update, delete on public.cars       to anon, authenticated;
grant select, insert                 on public.orders     to anon;
grant select, insert, update, delete on public.orders     to authenticated;
grant select                         on public.attributes to anon, authenticated;
grant insert, delete                 on public.attributes to authenticated;
grant select                         on public.admin_users to authenticated;
grant all on public.cars, public.orders, public.attributes, public.admin_users to service_role;

-- ---------- 6. ROW LEVEL SECURITY ----------
alter table public.cars        enable row level security;
alter table public.orders      enable row level security;
alter table public.attributes  enable row level security;
alter table public.admin_users enable row level security;

-- CARS: visitors see everything except Draft listings; any signed-in admin
-- may write (the trigger above blocks Sales Agents from deleting/re-pricing).
drop policy if exists "cars public read"   on public.cars;
drop policy if exists "cars public write"  on public.cars;
drop policy if exists "cars visitor read"  on public.cars;
drop policy if exists "cars admin write"   on public.cars;
create policy "cars visitor read" on public.cars for select
  using (status <> 'Draft' or public.current_admin_role() is not null);
create policy "cars admin write" on public.cars for all
  using (public.current_admin_role() is not null)
  with check (public.current_admin_role() is not null);

-- ORDERS: anyone may submit a request; only signed-in admins may read/manage
-- the inbox (protects customer contact details from public access).
drop policy if exists "orders public insert" on public.orders;
drop policy if exists "orders public read"   on public.orders;
drop policy if exists "orders public update" on public.orders;
drop policy if exists "orders admin read"    on public.orders;
drop policy if exists "orders admin update"  on public.orders;
create policy "orders public insert" on public.orders for insert with check (true);
create policy "orders admin read"    on public.orders for select using (public.current_admin_role() is not null);
create policy "orders admin update"  on public.orders for update
  using (public.current_admin_role() is not null) with check (public.current_admin_role() is not null);

-- ATTRIBUTES: dropdown values are public (used by the site's search filters);
-- only Super Admins curate the list.
drop policy if exists "attributes public read"  on public.attributes;
drop policy if exists "attributes admin write"  on public.attributes;
create policy "attributes public read" on public.attributes for select using (true);
create policy "attributes admin write" on public.attributes for all
  using (public.current_admin_role() = 'SuperAdmin')
  with check (public.current_admin_role() = 'SuperAdmin');

-- ADMIN_USERS: everyone can only read their own row (used to resolve role at login).
-- Adding/removing admins is done via the SQL Editor (service role), not the app.
drop policy if exists "admin_users self read" on public.admin_users;
create policy "admin_users self read" on public.admin_users for select using (auth.uid() = id);

-- ---------- 7. STORAGE: car photo uploads (drag & drop → compressed → watermarked) ----------
insert into storage.buckets (id, name, public)
values ('car-images', 'car-images', true)
on conflict (id) do update set public = true;

drop policy if exists "car-images public read"  on storage.objects;
drop policy if exists "car-images admin insert" on storage.objects;
drop policy if exists "car-images admin update" on storage.objects;
drop policy if exists "car-images admin delete" on storage.objects;
create policy "car-images public read" on storage.objects for select
  using (bucket_id = 'car-images');
create policy "car-images admin insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'car-images' and public.current_admin_role() = 'SuperAdmin');
create policy "car-images admin update" on storage.objects for update to authenticated
  using (bucket_id = 'car-images' and public.current_admin_role() = 'SuperAdmin');
create policy "car-images admin delete" on storage.objects for delete to authenticated
  using (bucket_id = 'car-images' and public.current_admin_role() = 'SuperAdmin');

-- ---------- 8. SEED a starter set of dropdown values ----------
insert into public.attributes (category, value) values
 ('make','Tesla'), ('make','BMW'), ('make','Porsche'), ('make','Mercedes-Benz'), ('make','Audi'), ('make','Land Rover'),
 ('category','Sedan'), ('category','SUV'), ('category','Coupe'), ('category','Sports'), ('category','Electric'),
 ('color','Pearl White'), ('color','Alpine White'), ('color','Guards Red'), ('color','Obsidian Black'), ('color','Nardo Grey'),
 ('engine_type','Petrol'), ('engine_type','Diesel'), ('engine_type','Electric'), ('engine_type','Hybrid'),
 ('transmission','Automatic'), ('transmission','Manual'), ('transmission','PDK'), ('transmission','Single-Speed')
on conflict do nothing;

-- Refresh PostgREST's schema cache so everything above is visible immediately.
notify pgrst, 'reload schema';

-- ============================================================
--  Create your first Super Admin (run this part AFTER inviting/creating
--  the user in Authentication → Users):
-- ============================================================
-- insert into public.admin_users (id, email, name, role)
-- select id, email, 'Owner', 'SuperAdmin'
-- from auth.users
-- where email = 'you@yourdealership.com'
-- on conflict (id) do update set role = excluded.role;
