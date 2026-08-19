import { useCallback, useEffect, useState } from "react";

const KEY = "velocity_favorites";
const EVT = "velocity:favorites-changed";

export function readFavorites(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.map(String) : [];
  } catch {
    return [];
  }
}

function writeFavorites(ids: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch { /* storage unavailable */ }
  window.dispatchEvent(new CustomEvent(EVT));
}

export function toggleFavorite(id: string): boolean {
  const ids = readFavorites();
  const has = ids.includes(id);
  writeFavorites(has ? ids.filter((x) => x !== id) : [...ids, id]);
  return !has;
}

/** Reactive favorites list — re-renders on any toggle across the app. */
export function useFavorites(): string[] {
  const [ids, setIds] = useState<string[]>([]);
  const sync = useCallback(() => setIds(readFavorites()), []);
  useEffect(() => {
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);
  return ids;
}
