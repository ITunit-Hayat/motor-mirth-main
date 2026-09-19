-- ============================================================
--  MZAB MOTORS — Seller declaration timestamp
--  Run once in: Supabase Dashboard → SQL Editor → New query → Run
--
--  Stores the exact moment a member ticked the "I own this car / it is not
--  stolen / I accept full legal responsibility" declaration before posting.
--  This is evidence that a real, timestamped acceptance happened — not just
--  text that was visible on a page.
-- ============================================================

alter table public.cars
  add column if not exists terms_accepted_at timestamptz;

notify pgrst, 'reload schema';
