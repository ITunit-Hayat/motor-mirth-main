import { useCallback, useEffect, useState } from "react";

const KEY = "velocity_favorites";
const EVT = "velocity:favorites-changed";

export function readFavorites(): string[] {
  try { const r = localStorage.getItem(KEY); const a = r ? JSON.parse(r) : []; return Array.isArray(a) ? a.map(String) : []; }
  catch { return []; }
}
function write(ids: string[]) {
  try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch {}
  window.dispatchEvent(new CustomEvent(EVT));
}
export function toggleFavorite(id: string): boolean {
  const ids = readFavorites();
  const has = ids.includes(id);
  write(has ? ids.filter(x => x !== id) : [...ids, id]);
  return !has;
}
export function isFavorite(id: string) { return readFavorites().includes(id); }
export function clearFavorites() { write([]); }
export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);
  const sync = useCallback(() => setIds(readFavorites()), []);
  useEffect(() => {
    sync();
    const h = () => sync();
    window.addEventListener(EVT, h);
    window.addEventListener("storage", h);
    return () => { window.removeEventListener(EVT, h); window.removeEventListener("storage", h); };
  }, [sync]);
  return ids;
}
