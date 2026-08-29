import { useEffect, useState } from "react";
import { supabase } from "./supabase";

const TABLE = "page_views";
const DETAIL_ROW_LIMIT = 5000; // enough for the 7-day chart & top-pages breakdown

export type AnalyticsSummary = {
  totalViews: number;
  viewsToday: number;
  viewsLast7Days: { day: string; count: number }[];
  topPaths: { path: string; count: number }[];
  carViews: Record<string, number>;
  /** "loading" until the real shared numbers arrive — never show guessed data. */
  source: "loading" | "shared" | "unavailable";
};

const EMPTY: AnalyticsSummary = {
  totalViews: 0,
  viewsToday: 0,
  viewsLast7Days: [],
  topPaths: [],
  carViews: {},
  source: "loading",
};

/** Record a page view in the shared Supabase counter. Fire-and-forget. */
export function trackPageView(path: string) {
  void supabase
    .from(TABLE)
    .insert({ path })
    .then(({ error }) => {
      if (error) console.debug("page_views insert skipped:", error.message);
    });
}

export function trackCarView(carId: string) {
  trackPageView(`/cars/${carId}`);
}

/** Midnight UTC for "today", so every admin sees the same boundary regardless of their own timezone. */
function utcDayStart(d: Date): number {
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

async function fetchAnalytics(): Promise<AnalyticsSummary> {
  const now = new Date();
  const todayStart = utcDayStart(now);
  const weekStart = todayStart - 6 * 86_400_000;

  const [{ count: totalViews }, { count: viewsToday }, { data: recent }] =
    await Promise.all([
      supabase.from(TABLE).select("*", { count: "exact", head: true }),
      supabase
        .from(TABLE)
        .select("*", { count: "exact", head: true })
        .gte("created_at", new Date(todayStart).toISOString()),
      supabase
        .from(TABLE)
        .select("path, created_at")
        .gte("created_at", new Date(weekStart).toISOString())
        .order("created_at", { ascending: false })
        .limit(DETAIL_ROW_LIMIT),
    ]);

  const rows = (recent ?? []) as { path: string; created_at: string }[];

  const days: { day: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const dayStart = todayStart - i * 86_400_000;
    const dayEnd = dayStart + 86_400_000;
    days.push({
      day: new Date(dayStart).toLocaleDateString(undefined, {
        weekday: "short",
        timeZone: "UTC",
      }),
      count: rows.filter((r) => {
        const t = new Date(r.created_at).getTime();
        return t >= dayStart && t < dayEnd;
      }).length,
    });
  }

  const byPath = new Map<string, number>();
  rows.forEach((r) => byPath.set(r.path, (byPath.get(r.path) ?? 0) + 1));
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
    totalViews: totalViews ?? 0,
    viewsToday: viewsToday ?? 0,
    viewsLast7Days: days,
    topPaths,
    carViews,
    source: "shared",
  };
}

export function resetAnalytics() {
  void supabase
    .from(TABLE)
    .delete()
    .gte("created_at", "1970-01-01")
    .then(() => {
      window.dispatchEvent(new CustomEvent("vm:analytics-reset"));
    });
}

/** Live hook: real shared stats from every visitor, on every device, in sync. */
export function useAnalytics(): AnalyticsSummary {
  const [summary, setSummary] = useState<AnalyticsSummary>(EMPTY);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      fetchAnalytics()
        .then((s) => {
          if (!cancelled) setSummary(s);
        })
        .catch((err) => {
          console.debug(
            "Analytics unavailable:",
            err instanceof Error ? err.message : err,
          );
          if (!cancelled) setSummary((s) => ({ ...s, source: "unavailable" }));
        });
    };

    load();
    window.addEventListener("vm:analytics-reset", load);
    return () => {
      cancelled = true;
      window.removeEventListener("vm:analytics-reset", load);
    };
  }, []);

  return summary;
}
