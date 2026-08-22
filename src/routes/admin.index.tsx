import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, ClipboardList, DollarSign, Eye, Users, TrendingUp, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/AdminLayout";
import { useDealership, formatPrice } from "@/context/DealershipContext";
import { useAnalytics, resetAnalytics } from "@/lib/analytics";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard — VelocityMotors" }] }),
  component: AdminHome,
});

function AdminHome() {
  const { cars, orders } = useDealership();
  const a = useAnalytics();
  const inventoryValue = cars.reduce((s, c) => s + c.price, 0);
  const newOrders = orders.filter((o) => o.status === "New").length;

  const stats = [
    { label: "Total Cars", value: cars.length, Icon: Car },
    { label: "Total Orders", value: orders.length, Icon: ClipboardList },
    { label: "New Leads", value: newOrders, Icon: TrendingUp },
    { label: "Inventory Value", value: formatPrice(inventoryValue), Icon: DollarSign },
    { label: "Page Views (total)", value: a.totalViews.toLocaleString(), Icon: Eye },
    { label: "Page Views (today)", value: a.viewsToday.toLocaleString(), Icon: Users },
  ];

  const maxDay = Math.max(1, ...a.viewsLast7Days.map((d) => d.count));

  const topCars = Object.entries(a.carViews)
    .map(([id, count]) => ({ car: cars.find((c) => c.id === id), count }))
    .filter((x) => x.car)
    .sort((x, y) => y.count - x.count)
    .slice(0, 5);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Real stats from this site's visitors (tracked live in-browser).</p>
        </div>
        <button
          onClick={() => { resetAnalytics(); toast.success("Analytics reset"); }}
          className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-input text-sm text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" /> Reset analytics
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{s.label}</div>
              <s.Icon className="h-4 w-4 text-accent" />
            </div>
            <div className="mt-2 text-2xl font-display font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* 7-day chart */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <h2 className="font-bold">Visitor traffic — last 7 days</h2>
          <div className="mt-5 flex items-end gap-2 h-40">
            {a.viewsLast7Days.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-xs font-bold">{d.count}</div>
                <div
                  className="w-full rounded-t-md bg-gradient-accent transition-all"
                  style={{ height: `${Math.max(4, (d.count / maxDay) * 110)}px` }}
                />
                <div className="text-[11px] text-muted-foreground">{d.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top pages */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <h2 className="font-bold">Top pages</h2>
          {a.topPaths.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No page views tracked yet — browse the public site to generate data.</p>
          ) : (
            <div className="mt-4 space-y-2">
              {a.topPaths.map((p) => (
                <div key={p.path} className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-secondary text-sm">
                  <span className="font-mono text-xs truncate">{p.path}</span>
                  <span className="font-bold text-accent shrink-0">{p.count} views</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Most viewed cars */}
      <div className="mt-6 bg-card border border-border rounded-2xl p-5 shadow-card">
        <h2 className="font-bold">Most viewed cars</h2>
        {topCars.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No car detail views yet.</p>
        ) : (
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {topCars.map(({ car, count }) => (
              <Link key={car!.id} to="/cars/$id" params={{ id: car!.id }} className="p-3 rounded-xl bg-secondary hover:shadow-card transition">
                <img src={car!.images[0]} alt="" className="h-20 w-full object-cover rounded-md" />
                <div className="mt-2 text-xs font-semibold truncate">{car!.title}</div>
                <div className="text-[11px] text-accent font-bold">{count} views</div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl">
        <Link to="/admin/cars" className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition">
          <Car className="h-5 w-5 text-accent" />
          <div className="mt-2 font-semibold">Manage Inventory →</div>
        </Link>
        <Link to="/admin/orders" className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition">
          <ClipboardList className="h-5 w-5 text-accent" />
          <div className="mt-2 font-semibold">Manage Orders →</div>
        </Link>
        <Link to="/admin/settings" className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition">
          <div className="mt-2 font-semibold">Site Settings →</div>
        </Link>
      </div>
    </AdminLayout>
  );
}
