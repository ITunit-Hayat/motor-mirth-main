import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center gap-3">
          <Link to="/" className="font-display font-bold text-lg">Velocity<span className="text-accent">Motors</span> Admin</Link>
          <nav className="flex items-center gap-2 ml-auto text-sm">
            <Link to="/admin" className="px-3 py-2 rounded-md hover:bg-secondary" activeProps={{ className: "text-accent" }}>Overview</Link>
            <Link to="/admin/cars" className="px-3 py-2 rounded-md hover:bg-secondary" activeProps={{ className: "text-accent" }}>Cars</Link>
            <Link to="/admin/orders" className="px-3 py-2 rounded-md hover:bg-secondary" activeProps={{ className: "text-accent" }}>Orders</Link>
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-secondary text-muted-foreground">↗ Site</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
