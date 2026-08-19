import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, ClipboardList, DollarSign, TrendingUp } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { useDealership, formatPrice } from "@/context/DealershipContext";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin — VelocityMotors" },
      { name: "description", content: "Admin dashboard overview." },
      { property: "og:title", content: "Admin — VelocityMotors" },
      { property: "og:description", content: "Admin dashboard overview." },
    ],
  }),
  component: AdminHome,
});

function AdminHome() {
  const { cars, orders } = useDealership();
  const inventoryValue = cars.reduce((s, c) => s + c.price, 0);
  const newOrders = orders.filter((o) => o.status === "New").length;

  const stats = [
    { label: "Total Cars", value: cars.length, icon: Car },
    { label: "Total Orders", value: orders.length, icon: ClipboardList },
    { label: "New Leads", value: newOrders, icon: TrendingUp },
    { label: "Inventory Value", value: formatPrice(inventoryValue), icon: DollarSign },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground text-sm mt-1">Overview of your dealership at a glance.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{s.label}</div>
              <s.icon className="h-4 w-4 text-accent" />
            </div>
            <div className="mt-2 text-2xl font-display font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-xl">
        <Link to="/admin/cars" className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition">
          <Car className="h-5 w-5 text-accent" />
          <div className="mt-2 font-semibold">Manage Inventory →</div>
        </Link>
        <Link to="/admin/orders" className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition">
          <ClipboardList className="h-5 w-5 text-accent" />
          <div className="mt-2 font-semibold">Manage Orders →</div>
        </Link>
      </div>
    </AdminLayout>
  );
}
