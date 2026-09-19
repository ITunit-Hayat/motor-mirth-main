-- ============================================================
--  MZAB MOTORS — SECURITY FIX (self-contained • idempotent)
--  Run once in: Supabase Dashboard → SQL Editor → New query → Run
--
--  WHAT THIS FIXES
--  ----------------
--  Migration 003 originally built REAL admin security (admin_users table +
--  current_admin_role() + RLS that only let signed-in admins write). But the
--  admin dashboard never actually signed in with Supabase Auth — it just
--  compared a password typed into the browser against a row in
--  `admin_config`, and wrote to the database as the public `anon` role.
--  Because of that, migration 004 ("fix_stats_and_storage") DELETED all of
--  003's protection and opened every table to `anon` with `using (true)`,
--  with the comment "the admin area is gated by the in-app passcode" —
--  which is not real protection, since anyone can call the Supabase API
--  directly with the public anon key and skip the passcode screen entirely.
--
--  This migration:
--   1. Rebuilds `current_admin_role()` / admin-only RLS (same design 003
--      already had — nothing new invented).
--   2. Keeps the member marketplace feature (007) exactly as designed:
--      signed-up members can still post/edit/delete ONLY their own car.
--   3. Adds member approval: a new member can't publish a car until an
--      admin approves their account (`profiles.is_approved`).
--   4. Closes admin_config, site_settings, attributes and orders back down
--      so only real signed-in admins (not every visitor) can write/read them.
--   5. Tightens car-images storage uploads to signed-in users only.
--
--  This does NOT touch or delete any existing car/order/profile rows.
--  After running this, the admin dashboard will show "Access Denied" until
--  you complete the two setup steps at the bottom of this file.
-- ============================================================

-- ---------- 1. ADMIN_USERS + current_admin_role() (rebuild from 003) ----------
create table if not exists public.admin_users (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  name        text,
  role        text not null default 'SalesAgent' check (role in ('SuperAdmin','SalesAgent')),
  created_at  timestamptz not null default now()
);

create or replace function public.current_admin_role()
returns text
language sql stable security definer set search_path = public
as $$
  select role from public.admin_users where id = auth.uid()
$$;

grant select on public.admin_users to authenticated;
grant all on public.admin_users to service_role;

alter table public.admin_users enable row level security;
drop policy if exists "admin_users self read" on public.admin_users;
create policy "admin_users self read" on public.admin_users for select using (auth.uid() = id);

-- ---------- 2. PROFILES: member-approval gate ----------
alter table public.profiles add column if not exists is_approved boolean not null default false;

-- Tighten grants: anon never needs to write a profile directly.
revoke insert, update on public.profiles from anon;
grant select on public.profiles to anon;
grant select, insert, update on public.profiles to authenticated;

drop policy if exists "profiles admin write" on public.profiles;
create policy "profiles admin write" on public.profiles for update
  using (public.current_admin_role() is not null)
  with check (public.current_admin_role() is not null);
-- ("profiles public read" / "profiles self write" from 007 are kept as-is.)

-- IMPORTANT: 007's "profiles self write" policy is `for all` on the member's
-- own row, which — on its own — would let a member set their OWN
-- is_approved to true via a direct API call, completely bypassing admin
-- review. RLS can only allow/deny whole rows, not individual columns, so we
-- close that gap with a trigger instead: any UPDATE coming from someone who
-- is NOT a signed-in admin has is_approved silently forced back to its
-- previous value, no matter what value they tried to send.
create or replace function public.protect_profile_approval()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if public.current_admin_role() is null then
    new.is_approved := old.is_approved;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_protect_approval on public.profiles;
create trigger profiles_protect_approval
  before update on public.profiles
  for each row execute function public.protect_profile_approval();

-- ---------- 3. CARS: real ownership + real admin bypass ----------
-- Wipe every previous cars policy from schema.sql / 003 / 004 / 007 so we
-- start from a known-clean slate (idempotent — safe to re-run).
drop policy if exists "cars public read"        on public.cars;
drop policy if exists "cars public write"       on public.cars;
drop policy if exists "cars visitor read"       on public.cars;
drop policy if exists "cars admin write"        on public.cars;
drop policy if exists "cars anon insert"        on public.cars;
drop policy if exists "cars anon update"        on public.cars;
drop policy if exists "cars anon delete"        on public.cars;
drop policy if exists "cars member insert"      on public.cars;
drop policy if exists "cars member manage own"  on public.cars;
drop policy if exists "cars member delete own"  on public.cars;
drop policy if exists "cars admin all"          on public.cars;

-- anon (never logged in) may only ever READ approved/active listings.
revoke insert, update, delete on public.cars from anon;
grant select on public.cars to anon;
grant select, insert, update, delete on public.cars to authenticated;

create policy "cars public read" on public.cars for select
  using (status <> 'Draft' or public.current_admin_role() is not null);

-- A member may publish a car only for themselves, and only once an admin
-- has approved their account.
create policy "cars member insert" on public.cars for insert to authenticated
  with check (
    seller_id = auth.uid()
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_approved = true
    )
  );

create policy "cars member manage own" on public.cars for update to authenticated
  using (seller_id = auth.uid())
  with check (seller_id = auth.uid());

create policy "cars member delete own" on public.cars for delete to authenticated
  using (seller_id = auth.uid());

-- Any signed-in admin (SuperAdmin or SalesAgent) can manage every listing —
-- this is what powers "Approve / Reject" in the moderation dashboard.
create policy "cars admin all" on public.cars for all to authenticated
  using (public.current_admin_role() is not null)
  with check (public.current_admin_role() is not null);

-- Keep the original 003 rule: only a SuperAdmin can delete a car or change
-- its price — a SalesAgent cannot, even though they can edit/approve.
create or replace function public.enforce_car_edit_permissions()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if public.current_admin_role() = 'SuperAdmin' then
    return new;
  end if;
  -- Members editing/deleting their own car are unaffected by this check.
  if tg_op = 'DELETE' then
    if old.seller_id is not null and old.seller_id = auth.uid() then
      return old;
    end if;
    if public.current_admin_role() is not null then
      raise exception 'Only a Super Admin can delete a car';
    end if;
    return old;
  end if;
  if new.seller_id is not null and new.seller_id = auth.uid() then
    return new;
  end if;
  if public.current_admin_role() is not null and new.price is distinct from old.price then
    raise exception 'Only a Super Admin can change a car''s price';
  end if;
  return new;
end;
$$;

drop trigger if exists cars_permission_check on public.cars;
create trigger cars_permission_check
  before update or delete on public.cars
  for each row execute function public.enforce_car_edit_permissions();

-- ---------- 4. ORDERS: hide customer data from the public ----------
drop policy if exists "orders public insert" on public.orders;
drop policy if exists "orders public read"   on public.orders;
drop policy if exists "orders public update" on public.orders;
drop policy if exists "orders admin read"    on public.orders;
drop policy if exists "orders admin update"  on public.orders;

revoke select, update, delete on public.orders from anon;
grant insert on public.orders to anon;
grant select, insert, update on public.orders to authenticated;

-- Anyone (including a not-logged-in visitor) can still submit an inquiry —
-- that's the public "contact us about this car" form.
create policy "orders public insert" on public.orders for insert with check (true);
-- Only signed-in admins can read the inbox or change a request's status.
create policy "orders admin read" on public.orders for select
  using (public.current_admin_role() is not null);
create policy "orders admin update" on public.orders for update
  using (public.current_admin_role() is not null)
  with check (public.current_admin_role() is not null);

-- ---------- 5. ADMIN_CONFIG: retire it (no longer used by the app) ----------
-- The passcode system is fully replaced by real Supabase Auth logins, so
-- nothing in the app should read/write this table anymore. Lock it down
-- completely rather than deleting it, in case you want the old value for
-- reference.
drop policy if exists "admin_config read"  on public.admin_config;
drop policy if exists "admin_config write" on public.admin_config;
revoke all on public.admin_config from anon, authenticated;

-- ---------- 6. SITE_SETTINGS: public read, admin-only write ----------
drop policy if exists "site_settings public read"  on public.site_settings;
drop policy if exists "site_settings public write" on public.site_settings;

revoke insert, update, delete on public.site_settings from anon;
grant select on public.site_settings to anon;
grant select, insert, update on public.site_settings to authenticated;

create policy "site_settings public read" on public.site_settings for select using (true);
create policy "site_settings admin write" on public.site_settings for all
  using (public.current_admin_role() is not null)
  with check (public.current_admin_role() is not null);

-- ---------- 7. ATTRIBUTES: public read, SuperAdmin-only write ----------
drop policy if exists "attributes public read"  on public.attributes;
drop policy if exists "attributes admin write"  on public.attributes;
drop policy if exists "attributes public write" on public.attributes;

revoke insert, update, delete on public.attributes from anon;
grant select on public.attributes to anon;
grant select, insert, update, delete on public.attributes to authenticated;

create policy "attributes public read" on public.attributes for select using (true);
create policy "attributes admin write" on public.attributes for all
  using (public.current_admin_role() = 'SuperAdmin')
  with check (public.current_admin_role() = 'SuperAdmin');

-- ---------- 8. STORAGE: car photo uploads require a signed-in account ----------
drop policy if exists "car-images public read"  on storage.objects;
drop policy if exists "car-images open insert"  on storage.objects;
drop policy if exists "car-images open update"  on storage.objects;
drop policy if exists "car-images open delete"  on storage.objects;
drop policy if exists "car-images admin insert" on storage.objects;
drop policy if exists "car-images admin update" on storage.objects;
drop policy if exists "car-images admin delete" on storage.objects;

create policy "car-images public read" on storage.objects for select
  using (bucket_id = 'car-images');
create policy "car-images auth insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'car-images');
create policy "car-images auth update" on storage.objects for update to authenticated
  using (bucket_id = 'car-images');
create policy "car-images auth delete" on storage.objects for delete to authenticated
  using (bucket_id = 'car-images');

-- Refresh PostgREST's schema cache so everything above is live immediately.
notify pgrst, 'reload schema';

-- ============================================================
--  ⚠️  REQUIRED SETUP — do this right after running the file above:
-- ============================================================
--
--  STEP A — Create a login for each admin (repeat per person):
--    Dashboard → Authentication → Users → Add user
--    Set their email + a strong password, then run:
--
--      insert into public.admin_users (id, email, name, role)
--      select id, email, 'Owner', 'SuperAdmin'
--      from auth.users
--      where email = 'REPLACE_WITH_ADMIN_EMAIL@example.com'
--      on conflict (id) do update set role = excluded.role;
--
--    Use role 'SalesAgent' instead of 'SuperAdmin' for an admin who should
--    NOT be able to delete cars or change prices.
--
--  STEP B — Approve any existing members so they can keep posting cars
--  (new signups will need approval going forward; this just grandfathers
--  in whoever already signed up before this fix):
--
--      update public.profiles set is_approved = true;
--
--  (Skip Step B, or approve people one at a time, if you'd rather review
--  your existing members individually from the new "Members" admin page.)
-- ============================================================
