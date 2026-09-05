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
  siteName: "MZAB MOTORS",
  phone: "+213555000000",
  email: "contact@mzabmotors.dz",
  address: "القرارة، ولاية غرداية، الجزائر",
  whatsapp: "+213555000000",
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
 * SINGLETON STORE — only ever open ONE Realtime channel for the whole app,
 * no matter how many components call useSiteSettings() on the same page, to
 * avoid Supabase's "cannot add postgres_changes callbacks … after subscribe"
 * crash when two channels share a name.
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
 * and stays live-updated via a single app-wide Realtime channel.
 */
export function useSiteSettings(): SiteSettings {
  const [s, setS] = useState<SiteSettings>(current);

  useEffect(() => {
    startOnce();
    setS(current);
    listeners.add(setS);
    return () => {
      listeners.delete(setS);
    };
  }, []);

  return s;
}

/**
 * [settings, save]. `save` writes to Supabase (shared with every visitor
 * immediately) and resolves once the write is confirmed.
 */
export function useSettings(): [
  SiteSettings,
  (s: SiteSettings) => Promise<void>,
] {
  const settings = useSiteSettings();
  const latest = useRef(settings);
  latest.current = settings;

  const save = useCallback(async (next: SiteSettings) => {
    const prev = current;
    current = next;
    emit();

    const { error } = await supabase
      .from(TABLE)
      .upsert({ id: ROW_ID, data: next, updated_at: new Date().toISOString() });

    if (error) {
      current = prev;
      emit();
      throw new Error(error.message);
    }
  }, []);

  return [settings, save];
}
