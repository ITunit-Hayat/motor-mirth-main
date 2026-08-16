import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Car as CarIcon, ClipboardList, ExternalLink, Lock, LogOut, ShieldCheck, KeyRound } from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";

const items = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/cars", label: "Inventory", icon: CarIcon },
  { to: "/admin/orders", label: "Orders", icon: ClipboardList },
];

const ADMIN_PASSCODE_KEY = "velocity_admin_auth";
// The master passcode can be set via VITE_ADMIN_PASSCODE or defaults to "admin2026"
const MASTER_PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || "admin2026";

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const isAuth = localStorage.getItem(ADMIN_PASSCODE_KEY) === "true";
    setIsAuthenticated(isAuth);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === MASTER_PASSCODE) {
      localStorage.setItem(ADMIN_PASSCODE_KEY, "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect Passcode. Access denied.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_PASSCODE_KEY);
    setIsAuthenticated(false);
    setPasscode("");
  };

  // Loading check
  if (isAuthenticated === null) return null;

  // Login Gate for Admin
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
        <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-elegant">
          <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-center">Owner Security Gate</h1>
          <p className="mt-1 text-sm text-center text-muted-foreground">
            This area is restricted to showroom administrators only.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">
                Enter Master Passcode
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••"
                  autoFocus
                  required
                  className="w-full h-11 px-3 pl-10 rounded-lg bg-background border border-input text-sm"
                />
                <KeyRound className="h-4 w-4 absolute left-3 top-3.5 text-muted-foreground" />
              </div>
            </div>

            {error && (
              <div className="p-3 text-xs rounded-lg bg-destructive/10 text-destructive font-medium text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="h-4 w-4" /> Unlock Dashboard
            </button>
          </form>

          <div className="mt-6 text-center border-t border-border/60 pt-4">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="p-3 border-t border-sidebar-border space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-sidebar-accent"
          >
            <ExternalLink className="h-4 w-4" /> View Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition"
          >
            <LogOut className="h-4 w-4" /> Lock & Sign Out
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden h-14 border-b bg-background px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto">
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
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </header>
        <main className="flex-1 p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
