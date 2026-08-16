import { Link } from "@tanstack/react-router";
import { Car, Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/cars", label: "Inventory" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function PublicLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <span className="grid place-items-center h-9 w-9 rounded-lg bg-gradient-accent text-accent-foreground">
              <Car className="h-5 w-5" />
            </span>
            <span>Velocity<span className="text-accent">Motors</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors"
                activeProps={{ className: "text-foreground bg-secondary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <button
            className="md:hidden p-2 rounded-md hover:bg-secondary"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-4 py-3 flex flex-col gap-1">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary"
                  activeProps={{ className: "bg-secondary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-16 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-lg">
              <Car className="h-5 w-5 text-accent" /> VelocityMotors
            </div>
            <p className="mt-3 text-sm opacity-80">
              Premium pre-owned & new vehicles. Curated inventory, transparent pricing.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm opacity-80">
              {nav.map((n) => (
                <li key={n.to}><Link to={n.to} className="hover:text-accent">{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> (555) 010-2024</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@velocitymotors.co</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 88 Grand Ave, LA</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Hours</h4>
            <ul className="space-y-1 text-sm opacity-80">
              <li>Mon–Fri: 9am – 8pm</li>
              <li>Sat: 10am – 6pm</li>
              <li>Sun: Closed</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs opacity-60">
          © {new Date().getFullYear()} VelocityMotors. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
