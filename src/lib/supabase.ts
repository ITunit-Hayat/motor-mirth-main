import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Safely resolves an environment variable from both Vite (import.meta.env)
 * and Node/SSR/Nitro/Vercel Serverless (process.env), cleaning extra whitespace,
 * trailing slashes, or surrounding quotes that frequently cause 500 errors.
 */
function cleanValue(val: unknown): string {
  if (typeof val !== "string") return "";
  let clean = val.trim();
  // Strip outer single/double quotes if copied with quotes
  if (
    (clean.startsWith('"') && clean.endsWith('"')) ||
    (clean.startsWith("'") && clean.endsWith("'"))
  ) {
    clean = clean.slice(1, -1).trim();
  }
  return clean;
}

/**
 * Safely resolves an environment variable from both Vite (import.meta.env)
 * and Node/SSR/Nitro/Vercel Serverless (process.env), cleaning extra whitespace,
 * trailing slashes, or surrounding quotes that frequently cause errors.
 */
function readEnv(key: string): string {
  // 1. Check import.meta.env (Vite client & SSR build-time)
  try {
    if (typeof import.meta !== "undefined" && import.meta.env) {
      const v = import.meta.env[key];
      if (v) return cleanValue(v);
    }
  } catch {
    // ignore
  }

  // 2. Check process.env (Node.js / Nitro SSR / Vercel Serverless Function runtime)
  try {
    if (typeof process !== "undefined" && process.env) {
      const v = process.env[key];
      if (v) return cleanValue(v);
    }
  } catch {
    // ignore
  }

  return "";
}

function resolveSupabaseUrl(): string {
  // Direct static checks for Vite AST inline replacement
  const directVite =
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      (import.meta.env.VITE_SUPABASE_URL ||
        import.meta.env.NEXT_PUBLIC_SUPABASE_URL)) ||
    "";

  const candidate =
    cleanValue(directVite) ||
    readEnv("VITE_SUPABASE_URL") ||
    readEnv("NEXT_PUBLIC_SUPABASE_URL") ||
    readEnv("SUPABASE_URL");

  if (!candidate) return "";
  let url = candidate.replace(/\/+$/, ""); // remove trailing slash
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }
  return url;
}

function resolveSupabaseAnonKey(): string {
  // Direct static checks for Vite AST inline replacement
  const directViteAnon =
    typeof import.meta !== "undefined" && import.meta.env
      ? [
          import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          import.meta.env.VITE_SUPABASE_ANON_KEY,
        ]
      : [];

  const candidates: string[] = [
    ...directViteAnon.map(cleanValue),
    readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    readEnv("VITE_SUPABASE_ANON_KEY"),
    readEnv("SUPABASE_ANON_KEY"),
  ].filter(Boolean);

  // CRITICAL: Supabase Realtime WebSocket connections (@supabase/realtime-js)
  // and Postgres RLS require a standard JWT anon key (starts with 'eyJ').
  // A raw publishable key ('sb_publishable_...') does not contain role/exp claims,
  // causing Realtime WebSocket connection handshakes to close repeatedly.
  // Prioritize the valid JWT key if available:
  const jwtKey = candidates.find((k) => k.startsWith("eyJ"));
  if (jwtKey) return jwtKey;

  return candidates[0] || "";
}

const rawUrl = resolveSupabaseUrl();
const rawKey = resolveSupabaseAnonKey();

function isValidHttpUrl(stringUrl: string): boolean {
  try {
    const parsed = new URL(stringUrl);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * True only when real, valid Supabase credentials are provided.
 * When false, the application gracefully degrades to local data
 * without throwing unhandled exceptions or crashing with HTTP 500.
 */
export const isSupabaseConfigured: boolean = Boolean(
  rawUrl &&
    rawKey &&
    isValidHttpUrl(rawUrl) &&
    !rawUrl.includes("placeholder-project"),
);

// Safe fallback credentials so createClient never throws during SSR or boot
const FALLBACK_URL = "https://placeholder-project.supabase.co";
const FALLBACK_KEY = "placeholder-anon-key";

const effectiveUrl = isSupabaseConfigured ? rawUrl : FALLBACK_URL;
const effectiveKey = isSupabaseConfigured ? rawKey : FALLBACK_KEY;

if (!isSupabaseConfigured && typeof window !== "undefined") {
  console.warn(
    "⚠️ [MZAB MOTORS] Supabase credentials not found or incomplete. Falling back to local data mode. Please configure VITE_SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and VITE_SUPABASE_ANON_KEY in Vercel.",
  );
}

export const supabase: SupabaseClient = createClient(
  effectiveUrl,
  effectiveKey,
  {
    auth: {
      persistSession: typeof window !== "undefined",
      autoRefreshToken: typeof window !== "undefined",
      detectSessionInUrl: typeof window !== "undefined",
      flowType: "pkce",
    },
  },
);

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
  status: "Active" | "Draft" | "Reserved" | "Sold" | "PendingReview" | null;
  inspection_report: string | null;
  previous_owners: number | null;
  seller_id: string | null;
  seller_name: string | null;
  seller_phone: string | null;
  wilaya: string | null;
  commune: string | null;
  terms_accepted_at: string | null;
  created_at: string;
};

export type OrderType =
  | "Purchase"
  | "TestDrive"
  | "Financing"
  | "Contact"
  | "Reservation"
  | "SellMyCar"
  | "TradeIn";
export type OrderStatus = "New" | "Processing" | "Contacted" | "Closed";

export type OrderRow = {
  id: string;
  car_id: string | null;
  car_name: string;
  customer_name: string;
  phone: string;
  email: string;
  city: string | null;
  notes: string | null;
  type: OrderType | null;
  status: OrderStatus;
  created_at: string;
};

/** Row shape for the dynamic dropdown values (makes, colors, engine types…). */
export type AttributeRow = {
  id: string;
  category: "make" | "category" | "color" | "engine_type" | "transmission";
  value: string;
  created_at: string;
};

/** Public seller profile — one row per signed-up member. */
export type ProfileRow = {
  id: string;
  full_name: string | null;
  phone: string | null;
  wilaya: string | null;
  commune: string | null;
  is_approved: boolean | null;
  created_at: string;
};
