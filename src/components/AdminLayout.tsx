import { type ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Car,
  ClipboardList,
  Settings,
  LogOut,
  Lock,
  ArrowLeft,
  Bell,
  CheckCircle2,
  Layers,
  Users,
  ShieldAlert,
  Sparkles,
  Phone,
  MessageCircle,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { toast } from "sonner";
import {
  isAdminAuthed,
  adminLogin,
  adminLogout,
  getActiveRole,
  setActiveRole,
  getActiveUser,
  ROLE_INFO,
  type AdminRole,
} from "@/lib/adminAuth";
import { getSettings } from "@/lib/settings";
import { useDealership } from "@/context/DealershipContext";
import { useLanguage } from "@/context/LanguageContext";

export function AdminLayout({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(true);
  const [pass, setPass] = useState("");
  const [role, setRole] = useState<AdminRole>("SUPER_ADMIN");
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const navigate = useNavigate();
  const { orders, markOrderAsRead, markAllOrdersAsRead, simulateIncomingLead } = useDealership();
  const { locale, setLocale, dir } = useLanguage();

  const unreadOrders = orders.filter((o) => o.unread || o.status === "New");

  useEffect(() => {
    setAuthed(isAdminAuthed());
    setRole(getActiveRole());

    const handleRoleChanged = (e: any) => {
      if (e.detail) setRole(e.detail);
    };
    window.addEventListener("vm:role-changed", handleRoleChanged);
    return () => window.removeEventListener("vm:role-changed", handleRoleChanged);
  }, []);

  const handleRoleChange = (newRole: AdminRole) => {
    setActiveRole(newRole);
    setRole(newRole);
    setShowRoleMenu(false);
    toast.success(`تم التبديل إلى دور: ${ROLE_INFO[newRole].titleAr}`);
  };

  if (!authed) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-hero p-4 sm:p-6" dir={dir}>
        <div className="w-full max-w-md bg-card rounded-3xl shadow-elegant p-6 sm:p-8 text-center border border-border">
          <div className="mx-auto h-16 w-16 grid place-items-center rounded-2xl bg-accent/15">
            <Lock className="h-8 w-8 text-accent" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold">لوحة التحكم الإدارية</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            منطقة مخصصة لإدارة المخزون، معالجة الطلبات، وتخصيص الموقع.
          </p>

          <div className="mt-4 p-3 bg-secondary/70 rounded-xl text-xs text-muted-foreground text-right space-y-2">
            <div className="font-semibold text-foreground">دخول فوري بنقرة واحدة (اختر الدور):</div>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  adminLogin("admin2026", "admin2026", "SUPER_ADMIN");
                  setAuthed(true);
                  setRole("SUPER_ADMIN");
                  toast.success("تم الدخول بصلاحية: المدير العام (Super Admin)");
                }}
                className="w-full text-right px-3 py-2 rounded-lg bg-card hover:bg-accent/10 border border-border flex items-center justify-between text-xs font-semibold"
              >
                <span>👑 المدير العام (Super Admin)</span>
                <span className="text-[10px] text-accent font-bold">دخول فوري &larr;</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  adminLogin("sales2026", "admin2026", "SALES_AGENT");
                  setAuthed(true);
                  setRole("SALES_AGENT");
                  toast.success("تم الدخول بصلاحية: موظف المبيعات (Sales Agent)");
                }}
                className="w-full text-right px-3 py-2 rounded-lg bg-card hover:bg-blue-500/10 border border-border flex items-center justify-between text-xs font-semibold"
              >
                <span>💼 موظف المبيعات (Sales Agent)</span>
                <span className="text-[10px] text-blue-500 font-bold">دخول فوري &larr;</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  adminLogin("inventory2026", "admin2026", "INVENTORY_MANAGER");
                  setAuthed(true);
                  setRole("INVENTORY_MANAGER");
                  toast.success("تم الدخول بصلاحية: مسؤول المخزون (Inventory)");
                }}
                className="w-full text-right px-3 py-2 rounded-lg bg-card hover:bg-emerald-500/10 border border-border flex items-center justify-between text-xs font-semibold"
              >
                <span>🚗 مسؤول المخزون (Inventory)</span>
                <span className="text-[10px] text-emerald-500 font-bold">دخول فوري &larr;</span>
              </button>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const ok = adminLogin(pass, getSettings().adminPasscode, "SUPER_ADMIN");
              if (ok) {
                setAuthed(true);
                setRole(getActiveRole());
                toast.success("مرحباً بك في لوحة التحكم");
              } else {
                toast.error("رمز الدخول غير صحيح");
                setPass("");
              }
            }}
            className="mt-5 space-y-3"
          >
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="أدخل رمز الدخول (Passcode)"
              autoFocus
              className="w-full h-12 px-4 rounded-xl bg-background border border-input text-base text-center tracking-widest"
            />
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-accent text-accent-foreground font-bold text-sm hover:opacity-90 shadow-md transition"
            >
              تسجيل الدخول
            </button>
          </form>

          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" /> العودة للموقع العام
          </Link>
        </div>
      </div>
    );
  }

  const nav = [
    { to: "/admin", label: "مركز القيادة", Icon: LayoutDashboard, badge: undefined },
    { to: "/admin/cars", label: "المخزون والسيارات", Icon: Car, badge: undefined },
    { to: "/admin/orders", label: "معالجة الطلبات", Icon: ClipboardList, badge: unreadOrders.length > 0 ? unreadOrders.length : undefined },
    { to: "/admin/settings", label: "الإعدادات والصلاحيات", Icon: Settings, badge: undefined },
  ];

  const activeRoleDetails = ROLE_INFO[role];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col" dir={dir}>
      {/* Top Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-md shadow-xs">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Link to="/admin" className="font-display font-bold text-lg shrink-0 flex items-center gap-1.5">
              <span className="text-foreground">Velocity</span>
              <span className="text-accent">Motors</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30">
                لوحة الإدارة
              </span>
            </Link>

            <Link
              to="/"
              className="hidden lg:inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground px-2 py-1 rounded-md hover:bg-secondary transition"
              title="معاينة الواجهة الأمامية للموقع"
            >
              <ExternalLink className="h-3.5 w-3.5" /> زيارة الموقع
            </Link>
          </div>

          {/* Center / Right Controls */}
          <div className="flex items-center gap-2">
            {/* Live Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowNotifMenu(!showNotifMenu);
                  setShowRoleMenu(false);
                }}
                className="relative h-10 w-10 rounded-xl bg-secondary hover:bg-muted text-foreground flex items-center justify-center transition border border-border"
                title="الإشعارات الحية والطلبات الجديدة"
              >
                <Bell className="h-5 w-5 text-foreground" />
                {unreadOrders.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadOrders.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Menu */}
              {showNotifMenu && (
                <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-80 sm:w-96 bg-card rounded-2xl shadow-elegant border border-border p-4 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div className="font-bold text-sm flex items-center gap-1.5">
                      <Bell className="h-4 w-4 text-accent" />
                      الإشعارات الحية ({unreadOrders.length} طلبات جديدة)
                    </div>
                    {unreadOrders.length > 0 && (
                      <button
                        onClick={() => {
                          markAllOrdersAsRead();
                          toast.success("تم تحديد جميع الطلبات كمقروءة");
                        }}
                        className="text-[11px] text-accent font-semibold hover:underline"
                      >
                        تحديد الكل كمقروء
                      </button>
                    )}
                  </div>

                  <div className="mt-3 max-h-72 overflow-y-auto space-y-2 no-scrollbar">
                    {orders.length === 0 ? (
                      <div className="py-6 text-center text-xs text-muted-foreground">
                        لا توجد طلبات أو تنبيهات حالياً.
                      </div>
                    ) : (
                      orders.slice(0, 5).map((ord) => (
                        <div
                          key={ord.id}
                          onClick={() => {
                            markOrderAsRead(ord.id);
                            setShowNotifMenu(false);
                            navigate({ to: "/admin/orders" });
                          }}
                          className={`p-3 rounded-xl border transition cursor-pointer hover:bg-secondary/70 ${
                            ord.unread || ord.status === "New"
                              ? "bg-accent/10 border-accent/40"
                              : "bg-muted/40 border-border"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-xs truncate">{ord.fullName}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary font-semibold">
                              {ord.type || "طلب شراء"}
                            </span>
                          </div>
                          <div className="text-xs text-primary font-medium truncate mt-0.5">
                            {ord.carTitle}
                          </div>
                          <div className="text-[11px] text-muted-foreground line-clamp-1 mt-1">
                            {ord.notes || "لا توجد ملاحظات إضافية"}
                          </div>
                          <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                            <span>{new Date(ord.createdAt).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}</span>
                            <span className="text-accent font-bold">معالجة الطلب ←</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-3 mt-3 border-t border-border flex items-center justify-between">
                    <button
                      onClick={() => {
                        simulateIncomingLead();
                        toast.success("تم إرسال إشعار بوصول طلب عميل تجريبي جديد!");
                      }}
                      className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="h-3.5 w-3.5" /> محاكاة وصول طلب جديد
                    </button>
                    <Link
                      to="/admin/orders"
                      onClick={() => setShowNotifMenu(false)}
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      عرض صندوق الوارد
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Active Role Switcher Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowRoleMenu(!showRoleMenu);
                  setShowNotifMenu(false);
                }}
                className={`h-10 px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${activeRoleDetails.badgeCls}`}
                title="تغيير صلاحيات الحساب الحالي"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">{activeRoleDetails.titleAr}</span>
                <ChevronDown className="h-3 w-3 opacity-70" />
              </button>

              {showRoleMenu && (
                <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-72 bg-card rounded-2xl shadow-elegant border border-border p-3 z-50 animate-in fade-in zoom-in-95 space-y-1.5">
                  <div className="text-[11px] font-bold text-muted-foreground px-2 py-1">
                    تبديل الصلاحية النشطة (Roles Simulator):
                  </div>
                  {(["SUPER_ADMIN", "SALES_AGENT", "INVENTORY_MANAGER"] as AdminRole[]).map((r) => {
                    const info = ROLE_INFO[r];
                    const isCurrent = role === r;
                    return (
                      <button
                        key={r}
                        onClick={() => handleRoleChange(r)}
                        className={`w-full text-right p-2.5 rounded-xl text-xs transition flex items-start justify-between gap-2 ${
                          isCurrent
                            ? "bg-accent text-accent-foreground font-bold shadow-xs"
                            : "hover:bg-secondary text-foreground"
                        }`}
                      >
                        <div>
                          <div className="font-bold">{info.titleAr}</div>
                          <div className={`text-[10px] mt-0.5 line-clamp-1 ${isCurrent ? "text-accent-foreground/80" : "text-muted-foreground"}`}>
                            {info.descAr}
                          </div>
                        </div>
                        {isCurrent && <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sign Out Button */}
            <button
              onClick={() => {
                adminLogout();
                toast.success("تم تسجيل الخروج بنجاح");
                navigate({ to: "/" });
              }}
              className="h-10 px-3 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive text-xs font-bold inline-flex items-center gap-1.5 transition"
              title="تسجيل الخروج"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">خروج</span>
            </button>
          </div>
        </div>

        {/* Secondary Navigation Bar */}
        <div className="bg-muted/30 border-t border-border/60">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 flex items-center gap-1 overflow-x-auto no-scrollbar py-1.5">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3.5 py-2 rounded-xl hover:bg-secondary text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition shrink-0"
                activeProps={{ className: "bg-accent text-accent-foreground shadow-xs font-bold" }}
                activeOptions={{ exact: n.to === "/admin" }}
              >
                <n.Icon className="h-4 w-4" />
                <span>{n.label}</span>
                {n.badge !== undefined && (
                  <span className="h-4 min-w-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                    {n.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="mx-auto max-w-7xl px-3 sm:px-6 py-6 sm:py-8 flex-1 w-full">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="mt-auto border-t border-border py-4 bg-card/40 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between flex-wrap gap-2">
          <span>نظام الإدارة المتكامل — فيلوسيتي موتورز © 2026</span>
          <span className="text-[11px]">
            الدور الحالي: <strong className="text-foreground">{activeRoleDetails.titleAr}</strong>
          </span>
        </div>
      </footer>
    </div>
  );
}
