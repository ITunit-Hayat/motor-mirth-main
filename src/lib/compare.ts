import { useCallback, useEffect, useState } from "react";

const KEY = "velocity_compare";
const EVT = "velocity:compare-changed";
const LIM = 3;

export function readCompare(): string[] {
  try { const r = localStorage.getItem(KEY); const a = r ? JSON.parse(r) : []; return Array.isArray(a) ? a.map(String) : []; }
  catch { return []; }
}
function write(ids: string[]) {
  try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch {}
  window.dispatchEvent(new CustomEvent(EVT));
}
export function inCompare(id: string) { return readCompare().includes(id); }
export function toggleCompare(id: string): boolean {
  const ids = readCompare();
  const has = ids.includes(id);
  write(has ? ids.filter(x => x !== id) : [...ids, id].slice(-LIM));
  return !has;
}
export function clearCompare() { write([]); }
export function useCompareList() {
  const [ids, setIds] = useState<string[]>([]);
  const sync = useCallback(() => setIds(readCompare()), []);
  useEffect(() => {
    sync();
    const h = () => sync();
    window.addEventListener(EVT, h);
    window.addEventListener("storage", h);
    return () => { window.removeEventListener(EVT, h); window.removeEventListener("storage", h); };
  }, [sync]);
  return ids;
}
export const COMPARE_LIMIT = LIM;
