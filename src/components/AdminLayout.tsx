import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Car as CarIcon, ClipboardList, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

const items = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/cars", label: "Inventory", icon: CarIcon },
  { to: "/admin/orders", label: "Orders", icon: ClipboardList },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen flex bg-muted/40">
      <aside className="hidden md:flex flex-col w-64 bg-sidebar text-sidebar-foreground">
        <div className="h-16 px-6 flex items-center gap-2 font-display font-bold text-lg border-b border-sidebar-border">
          <span className="h-2.5 w-2.5 rounded-full bg-sidebar-primary" />
          Admin Panel
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {items.map((i) => {
            const active = i.exact ? pathname === i.to : pathname.startsWith(i.to);
            return (
              <Link
                key={i.to}
                to={i.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
                }`}
              >
                <i.icon className="h-4 w-4" />
                {i.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-sidebar-accent"
          >
            <ExternalLink className="h-4 w-4" /> View Site
          </Link>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden h-14 border-b bg-background px-4 flex items-center gap-3 overflow-x-auto">
          {items.map((i) => {
            const active = i.exact ? pathname === i.to : pathname.startsWith(i.to);
            return (
              <Link
                key={i.to}
                to={i.to}
                className={`text-sm font-medium whitespace-nowrap px-3 py-1.5 rounded-md ${
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {i.label}
              </Link>
            );
          })}
        </header>
        <main className="flex-1 p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
