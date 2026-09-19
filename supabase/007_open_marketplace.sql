-- ============================================================
--  VelocityMotors — OPEN CAR MARKETPLACE (self-contained • idempotent)
--  Run once in: Supabase Dashboard → SQL Editor → New query → Run
--
--  Turns the site from "dealership manages its own stock" into "any
--  signed-up member can post their own car for sale", while keeping the
--  dealership's own inventory working exactly as before (seller_id stays
--  NULL for those).
-- ============================================================

-- ---------- 1. PROFILES: one row per signed-up member ----------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text default '',
  phone       text default '',
  wilaya      text default '',
  commune     text default '',
  created_at  timestamptz not null default now()
);

grant select, insert, update on public.profiles to anon, authenticated;
grant all on public.profiles to service_role;

alter table public.profiles enable row level security;
drop policy if exists "profiles public read" on public.profiles;
drop policy if exists "profiles self write" on public.profiles;
-- Public read so a buyer can see the seller's name on a listing.
create policy "profiles public read" on public.profiles for select using (true);
-- Only the member themselves can create/edit their own profile row.
create policy "profiles self write" on public.profiles for all
  using (auth.uid() = id) with check (auth.uid() = id);

-- ---------- 2. CARS: seller identity + location + "pending review" status ----------
alter table public.cars add column if not exists seller_id uuid references auth.users(id) on delete cascade;
alter table public.cars add column if not exists seller_name text default '';
alter table public.cars add column if not exists seller_phone text default '';
alter table public.cars add column if not exists wilaya text default '';
alter table public.cars add column if not exists commune text default '';

alter table public.cars drop constraint if exists cars_status_check;
alter table public.cars add constraint cars_status_check
  check (status in ('Active','Draft','Reserved','Sold','PendingReview'));

create index if not exists cars_seller_id_idx on public.cars (seller_id);

-- ---------- 3. Prevent members from self-publishing without review ----------
-- No matter what `status` a member's browser sends, force it to
-- 'PendingReview' the moment seller_id is set. The dealership's own
-- inventory (seller_id IS NULL) is unaffected and keeps working as before.
create or replace function public.enforce_pending_review()
returns trigger
language plpgsql
as $$
begin
  if new.seller_id is not null then
    new.status := 'PendingReview';
  end if;
  return new;
end;
$$;

drop trigger if exists cars_enforce_pending_review on public.cars;
create trigger cars_enforce_pending_review
  before insert on public.cars
  for each row execute function public.enforce_pending_review();

-- ---------- 4. Split write access: admin (anon key, passcode-gated UI) keeps
--              full access exactly as before; members can only touch their
--              own listings. The old fully-open "cars public write" policy
--              from 004 would otherwise silently allow anyone to edit/delete
--              anyone else's listing, so it's replaced with role-specific ones.
drop policy if exists "cars public write" on public.cars;

grant insert, update, delete on public.cars to authenticated;

create policy "cars anon insert" on public.cars for insert to anon with check (true);
create policy "cars anon update" on public.cars for update to anon using (true) with check (true);
create policy "cars anon delete" on public.cars for delete to anon using (true);

drop policy if exists "cars member insert" on public.cars;
create policy "cars member insert" on public.cars for insert to authenticated
  with check (seller_id = auth.uid());

drop policy if exists "cars member manage own" on public.cars;
create policy "cars member manage own" on public.cars for update to authenticated
  using (seller_id = auth.uid()) with check (seller_id = auth.uid());

drop policy if exists "cars member delete own" on public.cars;
create policy "cars member delete own" on public.cars for delete to authenticated
  using (seller_id = auth.uid());

-- NOTE: admin moderation (Approve/Reject) is done via the passcode-gated
-- dashboard, which writes as the `anon` role and so always has full access —
-- UNLESS the same browser also happens to have an active member login
-- session at that moment (rare, but if you're ever both an admin and a
-- signed-up member in the same browser, log out of the member account
-- before moderating listings).

notify pgrst, 'reload schema';
