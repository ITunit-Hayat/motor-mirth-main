-- =============================================================================
--  MZAB MOTORS — Complete Supabase Database & Storage Setup (Idempotent)
-- =============================================================================
--  Run this in: Supabase Dashboard -> SQL Editor -> New Query -> Run
--  Safe to execute any number of times on an existing or fresh project.
-- =============================================================================

-- 1. STORAGE BUCKET: car-images
insert into storage.buckets (id, name, public)
values ('car-images', 'car-images', true)
on conflict (id) do update set public = true;

drop policy if exists "car-images public read"   on storage.objects;
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

-- 2. CARS TABLE & COLUMNS
create table if not exists public.cars (
  id serial primary key,
  name text,
  make text not null,
  model text not null,
  year int not null,
  price numeric not null,
  mileage text,
  engine text,
  transmission text,
  condition text,
  description text,
  images text[],
  featured boolean default false,
  status text not null default 'Active',
  inspection_report text not null default '',
  previous_owners int not null default 0,
  category text,
  seller_id uuid references auth.users(id) on delete cascade,
  seller_name text default '',
  seller_phone text default '',
  wilaya text default '',
  commune text default '',
  created_at timestamptz not null default now()
);

alter table public.cars add column if not exists status text not null default 'Active';
alter table public.cars add column if not exists inspection_report text not null default '';
alter table public.cars add column if not exists previous_owners int not null default 0;
alter table public.cars add column if not exists seller_id uuid references auth.users(id) on delete cascade;
alter table public.cars add column if not exists seller_name text default '';
alter table public.cars add column if not exists seller_phone text default '';
alter table public.cars add column if not exists wilaya text default '';
alter table public.cars add column if not exists commune text default '';

-- 3. ORDERS TABLE
create table if not exists public.orders (
  id serial primary key,
  car_id text,
  car_name text not null,
  customer_name text not null,
  phone text not null,
  email text,
  city text,
  notes text,
  type text not null default 'Purchase',
  status text not null default 'New',
  created_at timestamptz not null default now()
);

alter table public.orders add column if not exists type text not null default 'Purchase';

-- 4. ATTRIBUTES TABLE (Makes, Body types, Transmissions, etc.)
create table if not exists public.attributes (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('make','category','color','engine_type','transmission')),
  value text not null,
  created_at timestamptz not null default now(),
  unique (category, value)
);

-- 5. ADMIN CONFIG (Passcode)
create table if not exists public.admin_config (
  id text primary key default 'default',
  passcode text not null default 'admin123',
  updated_at timestamptz not null default now()
);

insert into public.admin_config (id, passcode)
values ('default', 'admin123')
on conflict (id) do nothing;

-- 6. SITE SETTINGS (Phone, Address, Banner, etc.)
create table if not exists public.site_settings (
  id text primary key default 'default',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id, data)
values ('default', '{
  "siteName": "MZAB MOTORS",
  "phone": "+213555000000",
  "email": "contact@mzabmotors.dz",
  "address": "القرارة، ولاية غرداية، الجزائر",
  "whatsapp": "+213555000000",
  "showDiscountBanner": true
}'::jsonb)
on conflict (id) do nothing;

-- 7. PAGE VIEWS (Analytics)
create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  created_at timestamptz not null default now()
);

-- 8. PROFILES (Member accounts)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text default '',
  phone text default '',
  wilaya text default '',
  commune text default '',
  created_at timestamptz not null default now()
);

-- 9. PERMISSIONS & GRANTS
grant select, insert, update, delete on public.cars to anon, authenticated;
grant select, insert, update, delete on public.orders to anon, authenticated;
grant select, insert, update, delete on public.attributes to anon, authenticated;
grant select, insert, update on public.admin_config to anon, authenticated;
grant select, insert, update on public.site_settings to anon, authenticated;
grant select, insert on public.page_views to anon, authenticated;
grant select, insert, update on public.profiles to anon, authenticated;

grant all on public.cars, public.orders, public.attributes, public.admin_config,
  public.site_settings, public.page_views, public.profiles to service_role;

-- 10. ROW LEVEL SECURITY (RLS)
alter table public.cars enable row level security;
alter table public.orders enable row level security;
alter table public.attributes enable row level security;
alter table public.admin_config enable row level security;
alter table public.site_settings enable row level security;
alter table public.page_views enable row level security;
alter table public.profiles enable row level security;

-- Cars Policies
drop policy if exists "cars public read" on public.cars;
drop policy if exists "cars public write" on public.cars;
drop policy if exists "cars anon insert" on public.cars;
drop policy if exists "cars anon update" on public.cars;
drop policy if exists "cars anon delete" on public.cars;
create policy "cars public read" on public.cars for select using (true);
create policy "cars anon insert" on public.cars for insert to anon, authenticated with check (true);
create policy "cars anon update" on public.cars for update to anon, authenticated using (true) with check (true);
create policy "cars anon delete" on public.cars for delete to anon, authenticated using (true);

-- Orders Policies
drop policy if exists "orders public insert" on public.orders;
drop policy if exists "orders public read" on public.orders;
drop policy if exists "orders public update" on public.orders;
create policy "orders public insert" on public.orders for insert with check (true);
create policy "orders public read" on public.orders for select using (true);
create policy "orders public update" on public.orders for update using (true) with check (true);

-- Attributes Policies
drop policy if exists "attributes public read" on public.attributes;
drop policy if exists "attributes public write" on public.attributes;
create policy "attributes public read" on public.attributes for select using (true);
create policy "attributes public write" on public.attributes for all using (true) with check (true);

-- Admin Config Policies
drop policy if exists "admin_config read" on public.admin_config;
drop policy if exists "admin_config write" on public.admin_config;
create policy "admin_config read" on public.admin_config for select using (true);
create policy "admin_config write" on public.admin_config for all using (true) with check (true);

-- Site Settings Policies
drop policy if exists "site_settings read" on public.site_settings;
drop policy if exists "site_settings write" on public.site_settings;
create policy "site_settings read" on public.site_settings for select using (true);
create policy "site_settings write" on public.site_settings for all using (true) with check (true);

-- Page Views Policies
drop policy if exists "page_views public insert" on public.page_views;
drop policy if exists "page_views public read" on public.page_views;
create policy "page_views public insert" on public.page_views for insert with check (true);
create policy "page_views public read" on public.page_views for select using (true);

-- Profiles Policies
drop policy if exists "profiles public read" on public.profiles;
drop policy if exists "profiles self write" on public.profiles;
create policy "profiles public read" on public.profiles for select using (true);
create policy "profiles self write" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);

-- 11. SEED STARTER ATTRIBUTES
insert into public.attributes (category, value) values
  ('make','Tesla'), ('make','BMW'), ('make','Porsche'), ('make','Mercedes-Benz'),
  ('make','Audi'), ('make','Land Rover'), ('make','Toyota'), ('make','Hyundai'),
  ('make','Volkswagen'), ('make','Peugeot'), ('make','Renault'), ('make','Kia'),
  ('category','Sedan'), ('category','SUV'), ('category','Coupe'), ('category','Sports'),
  ('category','Electric'), ('category','Hatchback'), ('category','Commercial'),
  ('color','Pearl White'), ('color','Alpine White'), ('color','Obsidian Black'),
  ('color','Nardo Grey'), ('color','Guards Red'), ('color','Silver Metallic'),
  ('engine_type','Petrol'), ('engine_type','Diesel'), ('engine_type','Electric'), ('engine_type','Hybrid'),
  ('transmission','Automatic'), ('transmission','Manual'), ('transmission','PDK')
on conflict do nothing;

-- 12. RELOAD SCHEMA CACHE
notify pgrst, 'reload schema';
