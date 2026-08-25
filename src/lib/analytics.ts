import { useEffect, useState } from "react";
import { supabase } from "./supabase";

const KEY_VIEWS = "vm_page_views";
const KEY_UNIQUE = "vm_unique_visitors";
const EVT = "vm:analytics";

type ViewEntry = { path: string; at: number };

function read<T>(k: string, fb: T): T {
  try { const r = localStorage.getItem(k); return r ? (JSON.parse(r) as T) : fb; } catch { return fb; }
}
function write(k: string, v: unknown) {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
  window.dispatchEvent(new CustomEvent(EVT));
}

/** Record a page view locally (instant) AND in Supabase (shared across all visitors). */
export function trackPageView(path: string) {
  const views = read<ViewEntry[]>(KEY_VIEWS, []);
  views.push({ path, at: Date.now() });
  write(KEY_VIEWS, views.slice(-2000));
  if (!read<boolean>(KEY_UNIQUE, false)) write(KEY_UNIQUE, true);

  // Shared counter — fire and forget; silently ignored if the table isn't migrated yet.
  void supabase.from("page_views").insert({ path }).then(({ error }) => {
    if (error) console.debug("page_views insert skipped:", error.message);
  });
}

export function trackCarView(carId: string) {
  trackPageView(`/cars/${carId}`);
}

export type AnalyticsSummary = {
  totalViews: number;
  viewsToday: number;
  uniqueVisitor: boolean;
  viewsLast7Days: { day: string; count: number }[];
  topPaths: { path: string; count: number }[];
  carViews: Record<string, number>;
  source: "local" | "shared";
};

function summarize(views: ViewEntry[], source: "local" | "shared"): AnalyticsSummary {
  const now = new Date();
  const todayStart = new Date(now.toDateString()).getTime();
  const days: { day: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const start = new Date(d.toDateString()).getTime();
    const end = start + 86400000;
    days.push({
      day: d.toLocaleDateString(undefined, { weekday: "short" }),
      count: views.filter((v) => v.at >= start && v.at < end).length,
    });
  }
  const byPath = new Map<string, number>();
  views.forEach((v) => byPath.set(v.path, (byPath.get(v.path) ?? 0) + 1));
  const topPaths = [...byPath.entries()]
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
  const carViews: Record<string, number> = {};
  byPath.forEach((count, path) => {
    const m = path.match(/^\/cars\/(.+)$/);
    if (m) carViews[m[1]] = count;
  });
  return {
    totalViews: views.length,
    viewsToday: views.filter((v) => v.at >= todayStart).length,
    uniqueVisitor: read<boolean>(KEY_UNIQUE, false),
    viewsLast7Days: days,
    topPaths,
    carViews,
    source,
  };
}

export function getAnalytics(): AnalyticsSummary {
  return summarize(read<ViewEntry[]>(KEY_VIEWS, []), "local");
}

export function resetAnalytics() {
  write(KEY_VIEWS, []);
  // Also clear the shared counter so the dashboard zeros out for everyone.
  void supabase.from("page_views").delete().gte("created_at", "1970-01-01").then(() => {
    window.dispatchEvent(new CustomEvent(EVT));
  });
}

/** Live hook: local stats instantly, then upgraded to shared Supabase stats for ALL visitors. */
export function useAnalytics(): AnalyticsSummary {
  const [summary, setSummary] = useState<AnalyticsSummary>(() => getAnalytics());
  useEffect(() => {
    const syncLocal = () => setSummary((s) => (s.source === "shared" ? s : getAnalytics()));
    window.addEventListener(EVT, syncLocal);
    window.addEventListener("storage", syncLocal);

    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("page_views")
          .select("path, created_at")
          .order("created_at", { ascending: false })
          .limit(5000);
        if (cancelled || error || !data) return;
        const views: ViewEntry[] = data.map((r: any) => ({
          path: String(r.path),
          at: new Date(r.created_at).getTime(),
        }));
        setSummary(summarize(views, "shared"));
      } catch { /* table not migrated yet — local stats stay */ }
    })();

    return () => {
      cancelled = true;
      window.removeEventListener(EVT, syncLocal);
      window.removeEventListener("storage", syncLocal);
    };
  }, []);
  return summary;
}
