import { useCallback, useEffect, useRef, useState } from "react";
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

/**
 * Shared, cross-device site settings. Renders the last-known cached value
 * instantly (no flash of defaults), then loads the real value from Supabase
 * and stays live-updated via Realtime — so an edit in the admin panel shows
 * up on every open tab/device without a refresh.
 */
export function useSiteSettings(): SiteSettings {
  const [s, setS] = useState<SiteSettings>(readCache);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from(TABLE)
        .select("data")
        .eq("id", ROW_ID)
        .maybeSingle();
      if (cancelled) return;
      if (!error && data?.data) {
        const merged = {
          ...DEFAULT_SETTINGS,
          ...(data.data as Partial<SiteSettings>),
        };
        setS(merged);
        writeCache(merged);
      }
      // If the table isn't migrated yet, or the row doesn't exist, keep showing
      // the cached/default values rather than breaking the page.
    })();

    const channel = supabase
      .channel("site-settings-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: TABLE,
          filter: `id=eq.${ROW_ID}`,
        },
        (payload) => {
          const row = payload.new as
            { data?: Partial<SiteSettings> } | undefined;
          if (row?.data) {
            const merged = { ...DEFAULT_SETTINGS, ...row.data };
            setS(merged);
            writeCache(merged);
          }
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      void supabase.removeChannel(channel);
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
  const latest = useRef(settings);
  latest.current = settings;

  const save = useCallback(async (next: SiteSettings) => {
    writeCache(next); // optimistic — feels instant for the person hitting Save
    const { error } = await supabase
      .from(TABLE)
      .upsert({ id: ROW_ID, data: next, updated_at: new Date().toISOString() });
    if (error) {
      writeCache(latest.current); // roll the local cache back on failure
      throw new Error(error.message);
    }
  }, []);

  return [settings, save];
}
