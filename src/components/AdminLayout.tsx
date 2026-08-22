import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Car,
  ClipboardList,
  Settings,
  LogOut,
  Lock,
  ArrowLeft,
  Tags,
  ShieldCheck,
  Bell,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { AdminAuthProvider, useAdminAuth } from "@/context/AdminAuthContext";
import { useDealership } from "@/context/DealershipContext";

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminGate>{children}</AdminGate>
    </AdminAuthProvider>
  );
}

function AdminGate({ children }: { children: ReactNode }) {
  const { loading, needsLogin, signIn } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-hero text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (needsLogin) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-hero p-6">
        <div className="w-full max-w-sm bg-card rounded-2xl shadow-elegant p-8 text-center">
          <div className="mx-auto h-14 w-14 grid place-items-center rounded-2xl bg-accent/15">
            <Lock className="h-7 w-7 text-accent" />
          </div>
          <h1 className="mt-4 font-display text-xl font-bold">Admin access</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in with your admin account.</p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setSubmitting(true);
              const res = await signIn(email.trim(), pass);
              setSubmitting(false);
              if (res.ok) toast.success("Welcome back");
              else {
                toast.error(res.error ?? "Sign-in failed");
                setPass("");
              }
            }}
            className="mt-5 space-y-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoFocus
              className="w-full h-11 px-3 rounded-md bg-background border border-input text-sm"
            />
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Password"
              className="w-full h-11 px-3 rounded-md bg-background border border-input text-sm"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full h-11 rounded-lg bg-gradient-accent text-accent-foreground font-bold text-sm disabled:opacity-60"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            New admin accounts are added by a Super Admin — see Settings for instructions.
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to site
          </Link>
        </div>
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}

function AdminShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { role, email, signOut } = useAdminAuth();
  const { orders } = useDealership();
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    setNewCount(orders.filter((o) => o.status === "New").length);
  }, [orders]);

  // Live notification: toast immediately when a new order/lead row is inserted.
  useEffect(() => {
    const channel = supabase
      .channel("admin-orders-live")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, (payload) => {
        const name = (payload.new as { customer_name?: string })?.customer_name ?? "A customer";
        toast.message("New request received", { description: `${name} just submitted a request.` });
        setNewCount((n) => n + 1);
      })
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  const nav = [
    { to: "/admin", label: "Dashboard", Icon: LayoutDashboard },
    { to: "/admin/cars", label: "Inventory", Icon: Car },
    { to: "/admin/orders", label: "Orders", Icon: ClipboardList, badge: newCount },
    { to: "/admin/attributes", label: "Attributes", Icon: Tags },
    { to: "/admin/settings", label: "Settings", Icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center gap-2">
          <Link to="/admin" className="font-display font-bold text-lg shrink-0">
            Velocity<span className="text-accent">Motors</span>
            <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/15 text-accent">
              Admin
            </span>
          </Link>
          <nav className="flex items-center gap-1 ml-auto overflow-x-auto no-scrollbar">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="relative px-3 py-2 rounded-md hover:bg-secondary text-sm font-medium inline-flex items-center gap-1.5"
                activeProps={{ className: "text-accent" }}
                activeOptions={{ exact: n.to === "/admin" }}
              >
                <n.Icon className="h-4 w-4" /> <span className="hidden sm:inline">{n.label}</span>
                {!!n.badge && (
                  <span className="absolute -top-0.5 -right-0.5 sm:static sm:ml-0.5 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                    {n.badge}
                  </span>
                )}
              </Link>
            ))}
            <div className="flex items-center gap-1.5 pl-2 ml-1 border-l border-border">
              <span
                className="hidden md:inline-flex items-center gap-1 text-xs text-muted-foreground pr-1"
                title={email ?? ""}
              >
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                {role === "SuperAdmin" ? "Super Admin" : "Sales Agent"}
              </span>
              <button
                onClick={async () => {
                  await signOut();
                  toast.success("Signed out");
                  navigate({ to: "/" });
                }}
                className="px-3 py-2 rounded-md hover:bg-destructive/10 text-destructive text-sm font-medium inline-flex items-center gap-1.5"
              >
                <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}

/** Small helper for pages to show a "New!" bell inline (e.g. dashboard header). */
export function LiveBadge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-destructive/10 text-destructive">
      <Bell className="h-3 w-3" /> {count} new
    </span>
  );
}
