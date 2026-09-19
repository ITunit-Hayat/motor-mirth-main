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
  ArrowRight,
  Tags,
  ShieldCheck,
  Bell,
  Globe,
  Clock,
  Menu,
  X,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useDealership } from "@/context/DealershipContext";
import { useLanguage } from "@/context/LanguageContext";

export function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminGate>{children}</AdminGate>;
}

function AdminGate({ children }: { children: ReactNode }) {
  const { loading, needsLogin, loginWithPassword } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div
        className="min-h-screen grid place-items-center bg-background text-sm text-muted-foreground"
        dir="rtl"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <span>جاري التحميل...</span>
        </div>
      </div>
    );
  }

  if (needsLogin) {
    return (
      <div
        className="min-h-screen grid place-items-center bg-gradient-hero p-6"
        dir="rtl"
      >
        <div className="w-full max-w-md bg-card border border-border rounded-3xl shadow-elegant p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-accent" />

          <div className="mx-auto h-16 w-16 grid place-items-center rounded-2xl bg-accent/15 border border-accent/25 shadow-inner">
            <Lock className="h-8 w-8 text-accent" />
          </div>

          <h1 className="mt-5 font-display text-2xl font-bold text-foreground">
            لوحة تحكم الإدارة
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            سجّل الدخول بحساب الأدمن الخاص بك للوصول إلى لوحة التحكم والمخزون
          </p>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!email.trim() || !pass.trim()) {
                toast.error("يرجى إدخال البريد الإلكتروني وكلمة المرور");
                return;
              }
              setSubmitting(true);
              const res = await loginWithPassword(email, pass);
              setSubmitting(false);
              if (res.ok) {
                toast.success("تم الدخول إلى لوحة الإدارة بنجاح");
              } else {
                toast.error(res.error ?? "بيانات الدخول غير صحيحة");
                setPass("");
              }
            }}
            className="mt-6 space-y-4 text-right"
          >
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1.5">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                autoFocus
                required
                className="w-full h-12 px-4 rounded-xl bg-background border border-input text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                dir="ltr"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1.5">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="أدخل كلمة المرور..."
                  required
                  className="w-full h-12 px-4 pr-4 pl-11 rounded-xl bg-background border border-input text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent font-mono transition-all"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs p-1 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPass ? "إخفاء" : "إظهار"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>
                {submitting ? "جاري التحقق..." : "دخول إلى لوحة التحكم"}
              </span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-border/60">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowRight className="h-3.5 w-3.5" /> العودة إلى الموقع الرئيسي
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}

function AdminShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { role, email, signOut } = useAdminAuth();
  const { orders, cars } = useDealership();
  const { lang, setLang } = useLanguage();
  const [newCount, setNewCount] = useState(0);
  const [pendingMembers, setPendingMembers] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pendingListings = cars.filter(
    (c) => c.status === "PendingReview",
  ).length;

  useEffect(() => {
    setNewCount(orders.filter((o) => o.status === "New").length);
  }, [orders]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let mounted = true;
    supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("is_approved", false)
      .then(({ count }) => {
        if (mounted) setPendingMembers(count ?? 0);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Live notification: toast immediately when a new order/lead row is inserted.
  useEffect(() => {
    if (!isSupabaseConfigured || typeof window === "undefined") return;
    try {
      const channel = supabase
        .channel("admin-orders-live")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "orders" },
          (payload) => {
            const name =
              (payload.new as { customer_name?: string })?.customer_name ??
              "عميل";
            toast.message("طلب جديد وارد", {
              description: `قام ${name} بتقديم طلب جديد للتو.`,
            });
            setNewCount((n) => n + 1);
          },
        )
        .subscribe();
      return () => {
        void supabase.removeChannel(channel);
      };
    } catch (err) {
      console.warn("Orders realtime channel failed:", err);
    }
  }, []);

  const nav = [
    { to: "/admin", label: "لوحة المعلومات", Icon: LayoutDashboard },
    { to: "/admin/cars", label: "المخزون والسيارات", Icon: Car },
    {
      to: "/admin/listings",
      label: "مراجعة إعلانات الأعضاء",
      Icon: Clock,
      badge: pendingListings,
    },
    {
      to: "/admin/orders",
      label: "الطلبات والحجوزات",
      Icon: ClipboardList,
      badge: newCount,
    },
    { to: "/admin/attributes", label: "الماركات والمواصفات", Icon: Tags },
    {
      to: "/admin/members",
      label: "إدارة الأعضاء",
      Icon: Users,
      badge: pendingMembers,
    },
    { to: "/admin/settings", label: "إعدادات المعرض", Icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/admin"
              className="font-display font-bold text-sm sm:text-base shrink-0 flex items-center gap-1.5 sm:gap-2 min-w-0"
            >
              <img
                src="/mzab-logo.jpg"
                alt="MZAB MOTORS Logo"
                className="h-8 w-8 rounded-full object-cover border border-accent/40 shadow-sm shrink-0"
                referrerPolicy="no-referrer"
              />
              <span className="truncate">
                MZAB <span className="text-accent">MOTORS</span>
              </span>
              <span className="hidden sm:inline text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/20 whitespace-nowrap shrink-0">
                لوحة الإدارة
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="relative px-2.5 py-1.5 rounded-lg hover:bg-secondary text-xs lg:text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
                activeProps={{
                  className: "text-accent bg-accent/10 font-bold",
                }}
                activeOptions={{ exact: n.to === "/admin" }}
              >
                <n.Icon className="h-4 w-4" />{" "}
                <span>{n.label}</span>
                {!!n.badge && (
                  <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                    {n.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              to="/"
              className="px-2 py-1.5 rounded-lg border border-border hover:bg-secondary text-xs font-medium inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              title="عرض الموقع العام"
            >
              <Globe className="h-3.5 w-3.5 text-accent" />
              <span className="hidden sm:inline">الموقع</span>
            </Link>

            <span
              className="hidden lg:inline-flex items-center gap-1 text-xs text-muted-foreground px-2 py-1 bg-secondary rounded-md"
              title={email ?? ""}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              {role === "SuperAdmin"
                ? "مسؤول عام"
                : "وكيل مبيعات"}
            </span>

            <button
              onClick={async () => {
                await signOut();
                toast.success("تم تسجيل الخروج بنجاح");
                navigate({ to: "/" });
              }}
              className="hidden sm:inline-flex px-2.5 py-1.5 rounded-lg hover:bg-destructive/10 text-destructive text-xs font-medium items-center gap-1 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />{" "}
              <span>خروج</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden h-9 w-9 grid place-items-center rounded-xl bg-secondary hover:bg-secondary/80 text-foreground transition-colors border border-border/80"
              aria-label="قائمة لوحة الإدارة"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Navigation Drawer */}
        <div
          className={`fixed top-16 right-0 bottom-0 w-72 bg-card border-l border-border shadow-2xl z-50 p-4 flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:hidden ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="space-y-1 overflow-y-auto">
            <div className="text-xs font-bold text-muted-foreground px-2 py-1.5">
              أقسام لوحة التحكم
            </div>
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-secondary text-sm font-medium transition-colors"
                activeProps={{
                  className: "text-accent bg-accent/15 font-bold",
                }}
                activeOptions={{ exact: n.to === "/admin" }}
              >
                <div className="flex items-center gap-2.5">
                  <n.Icon className="h-4 w-4 text-muted-foreground" />
                  <span>{n.label}</span>
                </div>
                {!!n.badge && (
                  <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-destructive text-[11px] font-bold text-destructive-foreground">
                    {n.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-border space-y-2">
            <div className="text-xs text-muted-foreground truncate px-1">
              {email} ({role === "SuperAdmin" ? "مسؤول عام" : "وكيل مبيعات"})
            </div>
            <button
              onClick={async () => {
                setMobileMenuOpen(false);
                await signOut();
                toast.success("تم تسجيل الخروج بنجاح");
                navigate({ to: "/" });
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive text-sm font-semibold transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-3 sm:px-6 py-5 sm:py-8">{children}</main>
    </div>
  );
}

/** Small helper for pages to show a "New!" bell inline (e.g. dashboard header). */
export function LiveBadge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
      <Bell className="h-3 w-3" /> {count} جديد
    </span>
  );
}
