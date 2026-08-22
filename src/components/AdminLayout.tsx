import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LayoutDashboard, Car, ClipboardList, Settings, LogOut, Lock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { isAdminAuthed, adminLogin, adminLogout } from "@/lib/adminAuth";
import { getSettings } from "@/lib/settings";

export function AdminLayout({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  useEffect(() => { setAuthed(isAdminAuthed()); }, []);

  if (!authed) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-hero p-6">
        <div className="w-full max-w-sm bg-card rounded-2xl shadow-elegant p-8 text-center">
          <div className="mx-auto h-14 w-14 grid place-items-center rounded-2xl bg-accent/15">
            <Lock className="h-7 w-7 text-accent" />
          </div>
          <h1 className="mt-4 font-display text-xl font-bold">Admin access</h1>
          <p className="mt-1 text-sm text-muted-foreground">This area is restricted. Enter the passcode.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const ok = adminLogin(pass, getSettings().adminPasscode);
              if (ok) { setAuthed(true); toast.success("Welcome back"); }
              else { toast.error("Wrong passcode"); setPass(""); }
            }}
            className="mt-5 space-y-3"
          >
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Passcode"
              autoFocus
              className="w-full h-11 px-3 rounded-md bg-background border border-input text-sm text-center tracking-widest"
            />
            <button type="submit" className="w-full h-11 rounded-lg bg-gradient-accent text-accent-foreground font-bold text-sm">
              Sign in
            </button>
          </form>
          <Link to="/" className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to site
          </Link>
        </div>
      </div>
    );
  }

  const nav = [
    { to: "/admin", label: "Dashboard", Icon: LayoutDashboard },
    { to: "/admin/cars", label: "Cars", Icon: Car },
    { to: "/admin/orders", label: "Orders", Icon: ClipboardList },
    { to: "/admin/settings", label: "Settings", Icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center gap-2">
          <Link to="/admin" className="font-display font-bold text-lg shrink-0">
            Velocity<span className="text-accent">Motors</span>
            <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/15 text-accent">Admin</span>
          </Link>
          <nav className="flex items-center gap-1 ml-auto overflow-x-auto no-scrollbar">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="px-3 py-2 rounded-md hover:bg-secondary text-sm font-medium inline-flex items-center gap-1.5" activeProps={{ className: "text-accent" }} activeOptions={{ exact: n.to === "/admin" }}>
                <n.Icon className="h-4 w-4" /> <span className="hidden sm:inline">{n.label}</span>
              </Link>
            ))}
            <button
              onClick={() => { adminLogout(); toast.success("Signed out"); navigate({ to: "/" }); }}
              className="px-3 py-2 rounded-md hover:bg-destructive/10 text-destructive text-sm font-medium inline-flex items-center gap-1.5"
            >
              <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Logout</span>
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
