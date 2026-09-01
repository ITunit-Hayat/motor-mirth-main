import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Car,
  ClipboardList,
  DollarSign,
  Eye,
  Users,
  TrendingUp,
  Trash2,
  Lock,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { AdminLayout, LiveBadge } from "@/components/AdminLayout";
import { useDealership, formatPrice } from "@/context/DealershipContext";
import { useAnalytics, resetAnalytics } from "@/lib/analytics";
import { useAdminAuth } from "@/context/AdminAuthContext";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "لوحة التحكم — VelocityMotors" }] }),
  component: AdminHome,
});

const STATUS_ARABIC: Record<string, string> = {
  Active: "نشط ومعروض",
  Draft: "مسودة",
  Reserved: "محجوز",
  Sold: "تم البيع",
};

function AdminHome() {
  const { cars, orders } = useDealership();
  const { isSuperAdmin } = useAdminAuth();
  const a = useAnalytics();
  const inventoryValue = cars.reduce((s, c) => s + c.price, 0);
  const newOrders = orders.filter((o) => o.status === "New").length;
  const reservationsCount = orders.filter((o) => o.type === "Reservation").length;
  const purchasesCount = orders.filter((o) => o.type === "Purchase").length;
  const sellInquiriesCount = orders.filter((o) => o.type === "SellMyCar" || o.type === "TradeIn").length;
  const soldCount = cars.filter((c) => c.status === "Sold").length;
  const reservedCarsCount = cars.filter((c) => c.status === "Reserved").length;

  const stats = [
    { label: "إجمالي المخزون", value: `${cars.length} سيارة`, Icon: Car },
    { label: "السيارات المباعة", value: `${soldCount} سيارة`, Icon: TrendingUp },
    { label: "الحجوزات النشطة", value: `${reservedCarsCount} سيارات (${reservationsCount} طلب)`, Icon: Lock },
    { label: "الطلبات الجديدة الواردة", value: `${newOrders} طلب جديد`, Icon: ClipboardList },
    { label: "عروض البيع والاستبدال", value: `${sellInquiriesCount} عرض`, Icon: Sparkles },
    ...(isSuperAdmin
      ? [{ label: "القيمة الإجمالية للمخزون", value: formatPrice(inventoryValue), Icon: DollarSign }]
      : []),
    { label: "مشاهدات الصفحة (اليوم)", value: a.viewsToday.toLocaleString(), Icon: Users },
  ];

  const statusCounts = (["Active", "Draft", "Reserved", "Sold"] as const).map((s) => ({
    status: s,
    label: STATUS_ARABIC[s] || s,
    count: cars.filter((c) => (c.status ?? "Active") === s).length,
  }));

  const maxDay = Math.max(1, ...a.viewsLast7Days.map((d) => d.count));

  const topCars = Object.entries(a.carViews)
    .map(([id, count]) => ({ car: cars.find((c) => c.id === id), count }))
    .filter((x) => x.car)
    .sort((x, y) => y.count - x.count)
    .slice(0, 5);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            لوحة المعلومات والتحليلات <LiveBadge count={newOrders} />
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            إحصائيات ومؤشرات فورية لزوار المعرض وحركة المبيعات والمخزون.
          </p>
        </div>
        <button
          onClick={() => {
            resetAnalytics();
            toast.success("تمت إعادة ضبط سجل التحليلات");
          }}
          className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-input text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" /> إعادة ضبط التحليلات
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {statusCounts.map((sc) => (
          <span
            key={sc.status}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-secondary border border-border flex items-center gap-1.5"
          >
            <span>{sc.label}:</span> <span className="text-accent font-bold">{sc.count}</span>
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-muted-foreground">{s.label}</div>
              <s.Icon className="h-4 w-4 text-accent" />
            </div>
            <div className="mt-2 text-2xl font-display font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* 7-day chart */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <h2 className="font-bold text-sm text-foreground">حركة الزيارات — آخر 7 أيام</h2>
          <div className="mt-5 flex items-end gap-2 h-40">
            {a.viewsLast7Days.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-xs font-bold text-foreground">{d.count}</div>
                <div
                  className="w-full rounded-t-md bg-gradient-accent transition-all"
                  style={{ height: `${Math.max(4, (d.count / maxDay) * 110)}px` }}
                />
                <div className="text-[11px] text-muted-foreground">{d.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top pages */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <h2 className="font-bold text-sm text-foreground">الصفحات الأكثر زيارة</h2>
          {a.topPaths.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              لا توجد زيارات مسجلة بعد — تصفح الموقع لإنشاء بيانات حية.
            </p>
          ) : (
            <div className="mt-4 space-y-2">
              {a.topPaths.map((p) => (
                <div
                  key={p.path}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-secondary text-sm"
                >
                  <span className="font-mono text-xs truncate" dir="ltr">{p.path}</span>
                  <span className="font-bold text-accent shrink-0">{p.count} مشاهدة</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Most viewed cars */}
      <div className="mt-6 bg-card border border-border rounded-2xl p-5 shadow-card">
        <h2 className="font-bold text-sm text-foreground">السيارات الأكثر طلباً ومشاهدة</h2>
        {topCars.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">لا توجد مشاهدات للسيارات بعد.</p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {topCars.map(({ car, count }) => (
              <Link
                key={car!.id}
                to="/cars/$id"
                params={{ id: car!.id }}
                className="p-3 rounded-xl bg-secondary hover:shadow-card transition flex flex-col"
              >
                <img src={car!.images[0]} alt="" className="h-24 w-full object-cover rounded-lg" />
                <div className="mt-2 text-xs font-semibold truncate text-foreground">{car!.title}</div>
                <div className="text-[11px] text-accent font-bold mt-1">{count} مشاهدة</div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          to="/admin/cars"
          className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Car className="h-5 w-5 text-accent shrink-0" />
            <div>
              <div className="font-semibold text-sm">إدارة المخزون</div>
              <div className="text-xs text-muted-foreground mt-0.5">إضافة وتعديل السيارات</div>
            </div>
          </div>
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </Link>
        <Link
          to="/admin/orders"
          className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <ClipboardList className="h-5 w-5 text-accent shrink-0" />
            <div>
              <div className="font-semibold text-sm">الطلبات والحجوزات</div>
              <div className="text-xs text-muted-foreground mt-0.5">متابعة العملاء والصفقات</div>
            </div>
          </div>
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </Link>
        <Link
          to="/admin/attributes"
          className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-accent shrink-0" />
            <div>
              <div className="font-semibold text-sm">الماركات والمواصفات</div>
              <div className="text-xs text-muted-foreground mt-0.5">تخصيص الفئات والسمات</div>
            </div>
          </div>
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </Link>
        <Link
          to="/admin/settings"
          className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-accent shrink-0" />
            <div>
              <div className="font-semibold text-sm">إعدادات المعرض</div>
              <div className="text-xs text-muted-foreground mt-0.5">بيانات التواصل والعملة</div>
            </div>
          </div>
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </Link>
      </div>
    </AdminLayout>
  );
}
