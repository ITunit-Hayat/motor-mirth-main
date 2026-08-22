import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Car,
  ClipboardList,
  DollarSign,
  Eye,
  Users,
  TrendingUp,
  Trash2,
  Sparkles,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  AlertCircle,
  ArrowUpRight,
  ShieldCheck,
  Layers,
  Settings,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/AdminLayout";
import { useDealership, formatPrice } from "@/context/DealershipContext";
import { useAnalytics, resetAnalytics } from "@/lib/analytics";
import { getActiveRole, ROLE_INFO, hasPermission } from "@/lib/adminAuth";
import { useSiteSettings } from "@/lib/settings";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "مركز القيادة — لوحة التحكم الإدارية" }] }),
  component: AdminDashboardHome,
});

function AdminDashboardHome() {
  const { cars, orders, simulateIncomingLead, markOrderAsRead } = useDealership();
  const a = useAnalytics();
  const site = useSiteSettings();
  const role = getActiveRole();

  // KPIs calculations
  const activeCars = cars.filter((c) => (c.status ?? "Active") === "Active");
  const soldCars = cars.filter((c) => c.status === "Sold");
  const reservedCars = cars.filter((c) => c.status === "Reserved");
  const draftCars = cars.filter((c) => c.status === "Draft");

  const totalInventoryValue = activeCars.reduce((s, c) => s + c.price, 0);
  const totalSoldValue = soldCars.reduce((s, c) => s + c.price, 0);

  const unreadOrders = orders.filter((o) => o.unread || o.status === "New");
  const inProgressOrders = orders.filter((o) => o.status === "In Progress");
  const closedOrders = orders.filter((o) => o.status === "Closed");

  const conversionRate = orders.length > 0
    ? Math.round((closedOrders.length / orders.length) * 100)
    : 0;

  const maxDay = Math.max(1, ...a.viewsLast7Days.map((d) => d.count));

  const topCars = Object.entries(a.carViews)
    .map(([id, count]) => ({ car: cars.find((c) => c.id === id), count }))
    .filter((x) => x.car)
    .sort((x, y) => y.count - x.count)
    .slice(0, 4);

  // Quick WhatsApp helper
  const openWhatsApp = (phone: string, customerName: string, carTitle: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    const msg = encodeURIComponent(
      `مرحباً أستاذ ${customerName}، معك صالة ${site.siteName} بخصوص استفساركم عن سيارة (${carTitle}). يسعدنا تزويدكم بكافة التفاصيل والإجابة على أي استفسار.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, "_blank");
  };

  return (
    <AdminLayout>
      {/* Top Welcome Banner & Actions */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-bold">مركز القيادة (Main Dashboard)</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/15 text-accent font-bold border border-accent/30">
              إحصائيات فورية حية
            </span>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">
            متابعة دقيقة للمخزون، حركة المبيعات، والطلبات الواردة لحظة بلحظة.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              simulateIncomingLead();
              toast.success("تم إرسال تنبيه بوصول طلب جديد!");
            }}
            className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold hover:opacity-90 shadow-sm transition"
          >
            <Sparkles className="h-4 w-4" /> محاكاة طلب عميل جديد
          </button>

          <button
            onClick={() => {
              resetAnalytics();
              toast.success("تم تصفير عدادات الإحصائيات");
            }}
            className="inline-flex items-center gap-1.5 h-10 px-3 rounded-xl border border-input bg-card hover:bg-secondary text-xs text-muted-foreground hover:text-destructive transition"
            title="تصفير عدادات الزيارات"
          >
            <Trash2 className="h-3.5 w-3.5" /> تصفير الزيارات
          </button>
        </div>
      </div>

      {/* 1. KPIs Section: Key Metrics */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Cars */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">إجمالي السيارات المعروضة</span>
            <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Car className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-display font-bold text-foreground">
            {activeCars.length} <span className="text-xs font-normal text-muted-foreground">سيارة متاحة</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
            <span className="font-semibold text-accent">{formatPrice(totalInventoryValue)}</span> قيمة المخزون
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/40" />
        </div>

        {/* Sold Cars */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">السيارات المباعة هذا الشهر</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-display font-bold text-foreground">
            {soldCars.length} <span className="text-xs font-normal text-muted-foreground">صفقة مكتملة</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatPrice(totalSoldValue)}</span> مبيعات محققة
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500/60" />
        </div>

        {/* Unread & New Requests */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">طلبات جديدة غير معالجة</span>
            <div className="h-9 w-9 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ClipboardList className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-display font-bold text-foreground flex items-center gap-2">
            {unreadOrders.length}
            {unreadOrders.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground font-bold animate-pulse">
                تتطلب الرد
              </span>
            )}
          </div>
          <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
            <span>من إجمالي {orders.length} طلب وارد</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
        </div>

        {/* Daily Visits & Traffic */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">حركة الزيارات (اليوم)</span>
            <div className="h-9 w-9 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Eye className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-display font-bold text-foreground">
            {a.viewsToday.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">مشاهدة اليوم</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
            <span className="font-semibold text-foreground">{a.totalViews.toLocaleString()}</span> إجمالي الزيارات
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500/60" />
        </div>
      </div>

      {/* 2. Main Analytics & Live Notifications Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic & Activity Chart (7 Days) */}
        <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-card">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
            <div>
              <h2 className="font-bold text-base sm:text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" /> حركة التفاعل والزيارات — آخر 7 أيام
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                تتبع نشاط المشترين وزوار صالة العرض لاتخاذ قرارات الترويج والعروض.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
              معدل التحويل: {conversionRate}%
            </span>
          </div>

          <div className="flex items-end gap-3 sm:gap-4 h-48 pt-4 pb-2 border-b border-border/80">
            {a.viewsLast7Days.map((d) => {
              const heightPct = Math.max(8, (d.count / maxDay) * 100);
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[11px] font-bold text-foreground group-hover:text-accent transition">
                    {d.count}
                  </div>
                  <div
                    className="w-full max-w-[48px] rounded-t-xl bg-gradient-accent opacity-90 group-hover:opacity-100 transition-all shadow-xs"
                    style={{ height: `${heightPct}%` }}
                  />
                  <div className="text-[11px] text-muted-foreground font-medium truncate">
                    {d.day}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Status Breakdown Bar */}
          <div className="mt-6 pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">منشورة (Active)</div>
              <div className="text-lg font-bold mt-0.5">{activeCars.length}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-xs text-amber-600 dark:text-amber-400 font-bold">محجوزة (Reserved)</div>
              <div className="text-lg font-bold mt-0.5">{reservedCars.length}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="text-xs text-blue-600 dark:text-blue-400 font-bold">مباعة (Sold)</div>
              <div className="text-lg font-bold mt-0.5">{soldCars.length}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-500/10 border border-stone-500/20">
              <div className="text-xs text-muted-foreground font-bold">مسودة (Draft)</div>
              <div className="text-lg font-bold mt-0.5">{draftCars.length}</div>
            </div>
          </div>
        </div>

        {/* Live Incoming Leads Feed */}
        <div className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-card flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <h2 className="font-bold text-base flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-accent" /> تنبيهات الطلبات الواردة
            </h2>
            <Link to="/admin/orders" className="text-xs font-bold text-accent hover:underline">
              الكل ({orders.length}) ←
            </Link>
          </div>

          <div className="mt-4 space-y-3 flex-1 overflow-y-auto max-h-[340px] no-scrollbar">
            {orders.length === 0 ? (
              <div className="py-12 text-center text-xs text-muted-foreground">
                لا توجد طلبات واردة حتى الآن.
              </div>
            ) : (
              orders.slice(0, 4).map((ord) => (
                <div
                  key={ord.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    ord.unread || ord.status === "New"
                      ? "bg-accent/10 border-accent/40 shadow-xs"
                      : "bg-secondary/40 border-border"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-xs">{ord.fullName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary font-semibold border border-border">
                      {ord.type === "Test Drive"
                        ? "تجربة قيادة"
                        : ord.type === "Financing"
                        ? "طلب تمويل"
                        : ord.type === "Price Inquiry"
                        ? "استفسار سعر"
                        : "طلب شراء"}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-primary truncate mt-1">
                    {ord.carTitle}
                  </div>

                  <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">
                    {ord.notes || `هاتف: ${ord.phone}`}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-border/60 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(ord.createdAt).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openWhatsApp(ord.phone, ord.fullName, ord.carTitle)}
                        className="h-7 px-2 rounded-lg bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 text-[11px] font-bold inline-flex items-center gap-1 transition"
                        title="محادثة واتساب فورية"
                      >
                        <MessageCircle className="h-3 w-3" /> واتساب
                      </button>
                      <Link
                        to="/admin/orders"
                        className="h-7 px-2 rounded-lg bg-secondary hover:bg-muted text-[11px] font-bold inline-flex items-center transition"
                      >
                        تفاصيل
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 3. Most Demanded / Viewed Cars Section */}
      <div className="mt-8 bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-card">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div>
            <h2 className="font-bold text-base sm:text-lg">السيارات الأكثر طلباً وتفاعلاً من الزوار</h2>
            <p className="text-xs text-muted-foreground">
              مؤشر اهتمام المشترين لتحديد أولويات التسويق وإعادة التسعير.
            </p>
          </div>
          <Link to="/admin/cars" className="text-xs font-bold text-accent hover:underline">
            إدارة كل السيارات ({cars.length}) ←
          </Link>
        </div>

        {topCars.length === 0 ? (
          <div className="p-8 text-center text-xs text-muted-foreground bg-secondary/30 rounded-2xl">
            لم تسجل زيارات تفصيلية بعد — تصفح سيارات الموقع لتوليد بيانات حقيقية.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topCars.map(({ car, count }) => (
              <div
                key={car!.id}
                className="p-3.5 rounded-2xl bg-secondary/50 border border-border hover:shadow-card transition flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-muted relative">
                    <img
                      src={car!.images[0]}
                      alt={car!.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur text-white text-[10px] font-bold">
                      {count} مشاهدة
                    </div>
                  </div>
                  <div className="mt-2.5 font-bold text-xs sm:text-sm truncate">{car!.title}</div>
                  <div className="text-xs font-semibold text-accent mt-0.5">{formatPrice(car!.price)}</div>
                </div>

                <div className="mt-3 pt-2 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-muted-foreground">{car!.category}</span>
                  <Link
                    to="/cars/$id"
                    params={{ id: car!.id }}
                    className="text-[11px] font-bold text-primary hover:text-accent inline-flex items-center gap-0.5"
                  >
                    معاينة <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Quick Action Shortcuts Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/admin/cars"
          className="bg-card border border-border rounded-2xl p-5 hover:shadow-card hover:border-accent/50 transition group"
        >
          <div className="h-10 w-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center group-hover:scale-110 transition">
            <Car className="h-5 w-5" />
          </div>
          <div className="mt-3 font-bold text-sm">وحدة التحكم في المخزون</div>
          <p className="text-xs text-muted-foreground mt-1">
            إضافة وتعديل السيارات بالتبويبات وتغيير حالة الظهور (منشورة، مسودة، محجوزة، مباعة).
          </p>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-card border border-border rounded-2xl p-5 hover:shadow-card hover:border-accent/50 transition group"
        >
          <div className="h-10 w-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div className="mt-3 font-bold text-sm">وحدة معالجة الطلبات</div>
          <p className="text-xs text-muted-foreground mt-1">
            صندوق الوارد الموحد ومتابعة مسار الطلبات مع ميزة الرد السريع عبر الواتساب.
          </p>
        </Link>

        <Link
          to="/admin/settings"
          className="bg-card border border-border rounded-2xl p-5 hover:shadow-card hover:border-accent/50 transition group"
        >
          <div className="h-10 w-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition">
            <Layers className="h-5 w-5" />
          </div>
          <div className="mt-3 font-bold text-sm">وحدة الثوابت والقوائم المنسدلة</div>
          <p className="text-xs text-muted-foreground mt-1">
            إدارة الماركات والموديلات والفئات والألوان وانعكاسها المباشر على فلاتر البحث.
          </p>
        </Link>

        <Link
          to="/admin/settings"
          className="bg-card border border-border rounded-2xl p-5 hover:shadow-card hover:border-accent/50 transition group"
        >
          <div className="h-10 w-10 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="mt-3 font-bold text-sm">وحدة الأمان وإدارة الصلاحيات</div>
          <p className="text-xs text-muted-foreground mt-1">
            تحديد صلاحيات المدير العام، موظف المبيعات، ومسؤول المخزون ورموز الدخول.
          </p>
        </Link>
      </div>
    </AdminLayout>
  );
}
