import { useEffect, useState } from "react";

const KEY_VIEWS = "vm_page_views";
const KEY_CAR_VIEWS = "vm_car_views";
const KEY_UNIQUE = "vm_unique_visitors";
const KEY_TODAY = "vm_visits_today";
const EVT = "vm:analytics";

type ViewEntry = { path: string; at: number };

function read<T>(k: string, fb: T): T {
  try { const r = localStorage.getItem(k); return r ? (JSON.parse(r) as T) : fb; } catch { return fb; }
}
function write(k: string, v: unknown) {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
  window.dispatchEvent(new CustomEvent(EVT));
}

export function trackPageView(path: string) {
  const views = read<ViewEntry[]>(KEY_VIEWS, []);
  views.push({ path, at: Date.now() });
  write(KEY_VIEWS, views.slice(-2000)); // keep last 2000

  // unique visitor (once per browser)
  if (!read<boolean>(KEY_UNIQUE, false)) write(KEY_UNIQUE, true);

  // today's counter
  const today = new Date().toDateString();
  const t = read<{ date: string; count: number }>(KEY_TODAY, { date: today, count: 0 });
  write(KEY_TODAY, t.date === today ? { date: today, count: t.count + 1 } : { date: today, count: 1 });
}

export function trackCarView(carId: string) {
  const cv = read<Record<string, number>>(KEY_CAR_VIEWS, {});
  cv[carId] = (cv[carId] ?? 0) + 1;
  write(KEY_CAR_VIEWS, cv);
}

export type AnalyticsSummary = {
  totalViews: number;
  viewsToday: number;
  uniqueVisitor: boolean;
  viewsLast7Days: { day: string; count: number }[];
  topPaths: { path: string; count: number }[];
  carViews: Record<string, number>;
};

export function getAnalytics(): AnalyticsSummary {
  const views = read<ViewEntry[]>(KEY_VIEWS, []);
  const today = new Date().toDateString();
  const t = read<{ date: string; count: number }>(KEY_TODAY, { date: today, count: 0 });
  const cv = read<Record<string, number>>(KEY_CAR_VIEWS, {});

  const days: { day: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const start = new Date(d.toDateString()).getTime();
    const end = start + 86400000;
    const count = views.filter((v) => v.at >= start && v.at < end).length;
    days.push({
      day: d.toLocaleDateString(undefined, { weekday: "short" }),
      count,
    });
  }

  const byPath = new Map<string, number>();
  views.forEach((v) => byPath.set(v.path, (byPath.get(v.path) ?? 0) + 1));
  const topPaths = [...byPath.entries()]
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return {
    totalViews: views.length,
    viewsToday: t.date === today ? t.count : 0,
    uniqueVisitor: read<boolean>(KEY_UNIQUE, false),
    viewsLast7Days: days,
    topPaths,
    carViews: cv,
  };
}

export function resetAnalytics() {
  write(KEY_VIEWS, []);
  write(KEY_CAR_VIEWS, {});
  write(KEY_TODAY, { date: new Date().toDateString(), count: 0 });
}

/** Re-render hook so admin dashboard updates live. */
export function useAnalytics(): AnalyticsSummary {
  const [, setTick] = useState(0);
  useEffect(() => {
    const h = () => setTick((t) => t + 1);
    window.addEventListener(EVT, h);
    window.addEventListener("storage", h);
    return () => { window.removeEventListener(EVT, h); window.removeEventListener("storage", h); };
  }, []);
  return getAnalytics();
}
