-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query → Run).
-- Your existing `cars` table is missing two columns the app uses.
-- This script is idempotent: safe to run more than once.

ALTER TABLE public.cars ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE public.cars ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false;

-- Make sure the Data API can reach both tables.
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cars TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cars TO anon;
GRANT ALL ON public.cars TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT SELECT, INSERT ON public.orders TO anon;
GRANT ALL ON public.orders TO service_role;

-- Refresh PostgREST's schema cache so the new columns are visible immediately.
NOTIFY pgrst, 'reload schema';
