import { useCallback, useEffect, useState } from "react";

const KEY = "vm_site_settings";
const EVT = "vm:settings-changed";

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

export function getSettings(): SiteSettings {
  try {
    const r = localStorage.getItem(KEY);
    return r ? { ...DEFAULT_SETTINGS, ...JSON.parse(r) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(s: SiteSettings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {}
  window.dispatchEvent(new CustomEvent(EVT));
}

export function useSettings(): [SiteSettings, (s: SiteSettings) => void] {
  const [s, setS] = useState<SiteSettings>(getSettings());
  const sync = useCallback(() => setS(getSettings()), []);
  useEffect(() => {
    sync();
    const h = () => sync();
    window.addEventListener(EVT, h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener(EVT, h);
      window.removeEventListener("storage", h);
    };
  }, [sync]);
  return [s, saveSettings];
}

export function useSiteSettings() {
  const [s] = useSettings();
  return s;
}
