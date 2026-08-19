import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client.
 * The URL + anon (publishable) key are safe to ship to the browser — access is
 * controlled by Row Level Security policies defined in supabase/schema.sql.
 */
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ?? "https://yzmbqexfzcksihphhqvr.supabase.co";
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  "sb_publishable_Mo3CwdET8kpip01OfGsibw_fvp5yC0r";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/** Row shapes as stored in Postgres (snake_case). */
export type CarRow = {
  id: string | number;
  name: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  category: string | null;
  engine: string | null;
  transmission: string | null;
  condition: string | null;
  description: string | null;
  images: string[] | null;
  featured: boolean | null;
  created_at: string;
};

export type OrderRow = {
  id: string;
  car_id: string | null;
  car_name: string;
  customer_name: string;
  phone: string;
  email: string;
  city: string | null;
  notes: string | null;
  status: "New" | "Contacted" | "Closed";
  created_at: string;
};
