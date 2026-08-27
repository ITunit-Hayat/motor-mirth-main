import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabase";

const CACHE_KEY = "vm_site_settings_cache"; // first-paint cache only — NOT the source of truth
const TABLE = "site_settings";
const ROW_ID = "default";

export type SiteSettings = {
  siteName: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  heroTitle?: string;
  heroSubtitle?: string;
  showDiscountBanner: boolean;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "VelocityMotors",
  phone: "010-2024 (555)",
  email: "hello@velocitymotors.co",
  address: "Grand Ave, Los Angeles, CA 90015",
  whatsapp: "15555550101",
  showDiscountBanner: true,
};

function readCache(): SiteSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const r = localStorage.getItem(CACHE_KEY);
    return r ? { ...DEFAULT_SETTINGS, ...JSON.parse(r) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function writeCache(s: SiteSettings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(s));
  } catch {
    /* private browsing / storage full — cache is best-effort only */
  }
}

/*
 * SINGLETON STORE
 * ----------------
 * Half a dozen components (layout footer, contact page, car detail page,
 * sell page, purchase modal…) all call useSiteSettings() on the very same
 * page. Each one used to open its own Supabase Realtime channel — and
 * because they all shared the identical channel name, the second `.on()`
 * call landed on an already-subscribing channel and Supabase threw
 * ("cannot add postgres_changes callbacks … after subscribe"), crashing
 * the page. Fix: open exactly ONE channel for the whole app, and fan its
 * updates out to every hook instance through a tiny pub/sub.
 */
let current: SiteSettings = readCache();
const listeners = new Set<(s: SiteSettings) => void>();
let started = false;

function emit() {
  writeCache(current);
  listeners.forEach((l) => l(current));
}

function startOnce() {
  if (started || typeof window === "undefined") return;
  started = true;

  void supabase
    .from(TABLE)
    .select("data")
    .eq("id", ROW_ID)
    .maybeSingle()
    .then(({ data, error }) => {
      if (!error && data?.data) {
        current = {
          ...DEFAULT_SETTINGS,
          ...(data.data as Partial<SiteSettings>),
        };
        emit();
      }
      // If the table isn't migrated yet, or the row doesn't exist, keep
      // showing the cached/default values rather than breaking the page.
    });

  supabase
    .channel("site-settings-live")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: TABLE, filter: `id=eq.${ROW_ID}` },
      (payload) => {
        const row = payload.new as { data?: Partial<SiteSettings> } | undefined;
        if (row?.data) {
          current = { ...DEFAULT_SETTINGS, ...row.data };
          emit();
        }
      },
    )
    .subscribe();
}

/**
 * Shared, cross-device site settings. Renders the last-known cached value
 * instantly (no flash of defaults), then loads the real value from Supabase
 * and stays live-updated via a single app-wide Realtime channel — so an
 * edit in the admin panel shows up on every open tab/device without a
 * refresh, no matter how many components on the page use this hook.
 */
export function useSiteSettings(): SiteSettings {
  const [s, setS] = useState<SiteSettings>(current);

  useEffect(() => {
    startOnce();
    setS(current); // pick up anything fetched before this component mounted
    listeners.add(setS);
    return () => {
      listeners.delete(setS);
    };
  }, []);

  return s;
}

/**
 * [settings, save]. `save` writes to Supabase (shared with every visitor
 * immediately) and resolves once the write is confirmed — await it to know
 * whether it actually succeeded before showing a success message.
 */
export function useSettings(): [
  SiteSettings,
  (s: SiteSettings) => Promise<void>,
] {
  const settings = useSiteSettings();

  const save = useCallback(async (next: SiteSettings) => {
    const prev = current;
    current = next;
    emit(); // optimistic — every open tab updates instantly

    const { error } = await supabase
      .from(TABLE)
      .upsert({ id: ROW_ID, data: next, updated_at: new Date().toISOString() });

    if (error) {
      current = prev;
      emit(); // roll back everywhere on failure
      throw new Error(error.message);
    }
  }, []);

  return [settings, save];
}
