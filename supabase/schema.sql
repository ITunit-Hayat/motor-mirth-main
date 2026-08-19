-- ============================================================
--  VelocityMotors — Supabase schema
--  Run this whole file once in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- CARS ----------
create table if not exists public.cars (
  id            uuid primary key default gen_random_uuid(),
  name          text        not null,          -- display title, e.g. "2023 Tesla Model S Plaid"
  make          text        not null,
  model         text        not null default '',
  year          int         not null,
  price         numeric     not null default 0,
  mileage       int         not null default 0,
  category      text        not null default 'Sedan',
  engine        text        not null default '',
  transmission  text        not null default '',
  condition     text        not null default '',
  description   text        not null default '',
  images        text[]      not null default '{}',
  featured      boolean     not null default false,
  created_at    timestamptz not null default now()
);

-- ---------- ORDERS ----------
create table if not exists public.orders (
  id            uuid primary key default gen_random_uuid(),
  car_id        uuid references public.cars(id) on delete set null,
  car_name      text        not null,
  customer_name text        not null,
  phone         text        not null,
  email         text        not null,
  city          text        not null default '',
  notes         text        not null default '',
  status        text        not null default 'New'
                check (status in ('New','Contacted','Closed')),
  created_at    timestamptz not null default now()
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists cars_created_at_idx   on public.cars   (created_at desc);

-- ---------- DATA API GRANTS (required by PostgREST) ----------
grant select, insert, update, delete on public.cars   to anon, authenticated;
grant select, insert, update, delete on public.orders to anon, authenticated;
grant all on public.cars   to service_role;
grant all on public.orders to service_role;

-- ---------- ROW LEVEL SECURITY ----------
alter table public.cars   enable row level security;
alter table public.orders enable row level security;

-- CARS: public catalogue, admin dashboard is unauthenticated in this demo,
-- so writes are open. Lock these down to `authenticated` once you add login.
drop policy if exists "cars public read"   on public.cars;
drop policy if exists "cars public write"  on public.cars;
create policy "cars public read"  on public.cars for select using (true);
create policy "cars public write" on public.cars for all    using (true) with check (true);

-- ORDERS: anyone may submit an inquiry; the dashboard reads and updates status.
drop policy if exists "orders public insert" on public.orders;
drop policy if exists "orders public read"   on public.orders;
drop policy if exists "orders public update" on public.orders;
create policy "orders public insert" on public.orders for insert with check (true);
create policy "orders public read"   on public.orders for select using (true);
create policy "orders public update" on public.orders for update using (true) with check (true);

-- ---------- OPTIONAL SEED DATA ----------
insert into public.cars (name, make, model, year, price, mileage, category, engine, transmission, condition, description, images, featured)
values
 ('2023 Tesla Model S Plaid','Tesla','Model S',2023,89990,8500,'Electric','Tri-Motor Electric','Single-Speed','Used - Excellent',
  'Fully loaded Model S Plaid with autopilot, premium interior, and glass roof. 0-60 in under 2 seconds.',
  array['https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1600&q=80','https://images.unsplash.com/photo-1553260168-69b041873e65?w=1600&q=80'], true),
 ('2022 BMW M4 Competition','BMW','M4',2022,78500,12400,'Coupe','3.0L Twin-Turbo I6','8-Speed Automatic','Used - Like New',
  'Stunning M4 Competition in Alpine White with carbon fiber accents. Track-ready with 503 HP.',
  array['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80','https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80'], true),
 ('2024 Porsche 911 Carrera','Porsche','911',2024,124500,2100,'Sports','3.0L Twin-Turbo Flat-6','8-Speed PDK','New',
  'Iconic 911 Carrera with Sport Chrono package. Guards Red exterior, black leather interior.',
  array['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80','https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=1600&q=80'], true),
 ('2021 Range Rover Sport','Land Rover','Range Rover Sport',2021,62000,24800,'SUV','3.0L Supercharged V6','8-Speed Automatic','Used - Excellent',
  'Luxurious Range Rover Sport with panoramic roof, meridian sound, and adaptive suspension.',
  array['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1600&q=80','https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&q=80'], true),
 ('2023 Audi RS7 Sportback','Audi','RS7',2023,118000,5600,'Sedan','4.0L Twin-Turbo V8','8-Speed Tiptronic','Used - Like New',
  'RS7 Sportback in Nardo Grey. 591 HP, quattro AWD, carbon ceramic brakes.',
  array['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&q=80'], false),
 ('2022 Mercedes-Benz G63 AMG','Mercedes-Benz','G63',2022,189500,9800,'SUV','4.0L Twin-Turbo V8','9-Speed Automatic','Used - Excellent',
  'Iconic G-Wagon AMG. Obsidian Black, red interior, all the toys. A true statement piece.',
  array['https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=1600&q=80'], false)
on conflict do nothing;
