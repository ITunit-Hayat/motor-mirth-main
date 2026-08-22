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
  adminPasscode: string;
  dealershipPhone?: string;
  dealershipEmail?: string;
  whatsappNumber?: string;
  currencySymbol?: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "VelocityMotors",
  phone: "+966 11 456 7890",
  email: "contact@velocitymotors.sa",
  address: "طريق الملك فهد، حي الصحافة، الرياض، المملكة العربية السعودية",
  whatsapp: "+966501234567",
  showDiscountBanner: true,
  adminPasscode: "admin2026",
  dealershipPhone: "+966 11 456 7890",
  dealershipEmail: "contact@velocitymotors.sa",
  whatsappNumber: "+966501234567",
  currencySymbol: "$",
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

export function updateSettings(partial: Partial<SiteSettings>) {
  const current = getSettings();
  const updated = {
    ...current,
    ...partial,
    phone: partial.dealershipPhone || partial.phone || current.phone,
    email: partial.dealershipEmail || partial.email || current.email,
    whatsapp: partial.whatsappNumber || partial.whatsapp || current.whatsapp,
  };
  saveSettings(updated);
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
