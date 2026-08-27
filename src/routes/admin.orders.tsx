import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Inbox,
  MessageCircle,
  Send,
  Printer,
  Download,
  CheckCircle2,
  FileText,
  DollarSign,
  Truck,
  Car,
  Clock,
  Sparkles,
  ShieldCheck,
  Building2,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/AdminLayout";
import {
  useDealership,
  formatPrice,
  type Order,
  type OrderStatus,
  type OrderType,
} from "@/context/DealershipContext";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title: "الطلبات والحجوزات — لوحة الإدارة" },
      {
        name: "description",
        content:
          "إدارة حجوزات السيارات وطلبات الشراء والاستبدال وعروض العملاء.",
      },
    ],
  }),
  component: ManageOrders,
});

const statusColors: Record<OrderStatus, string> = {
  New: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  Processing:
    "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
  Contacted:
    "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30",
  Closed:
    "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
};

const STATUS_NAMES_AR: Record<OrderStatus, string> = {
  New: "🟡 طلب جديد",
  Processing: "🔵 قيد المراجعة والمعالجة",
  Contacted: "🟣 تم التواصل / محدد موعد",
  Closed: "🟢 تم إتمام الصفقة بنجاح",
};

const TYPE_CONFIG: Record<
  OrderType,
  { label: string; bg: string; text: string; icon: any }
> = {
  Reservation: {
    label: "حجز سيارة",
    bg: "bg-accent/15 border-accent/40",
    text: "text-accent",
    icon: Lock,
  },
  Purchase: {
    label: "شراء مباشر",
    bg: "bg-emerald-500/15 border-emerald-500/30",
    text: "text-emerald-600 dark:text-emerald-400",
    icon: DollarSign,
  },
  SellMyCar: {
    label: "عرض بيع سيارة",
    bg: "bg-sky-500/15 border-sky-500/30",
    text: "text-sky-600 dark:text-sky-400",
    icon: Car,
  },
  TradeIn: {
    label: "استبدال سيارة",
    bg: "bg-indigo-500/15 border-indigo-500/30",
    text: "text-indigo-600 dark:text-indigo-400",
    icon: Sparkles,
  },
  TestDrive: {
    label: "طلب تجربة قيادة",
    bg: "bg-violet-500/15 border-violet-500/30",
    text: "text-violet-600 dark:text-violet-400",
    icon: Car,
  },
  Financing: {
    label: "طلب تقسيط وتمويل",
    bg: "bg-orange-500/15 border-orange-500/30",
    text: "text-orange-600 dark:text-orange-400",
    icon: Building2,
  },
  Contact: {
    label: "استفسار عام",
    bg: "bg-muted border-border",
    text: "text-muted-foreground",
    icon: Mail,
  },
};

const TYPE_FILTERS: Array<{ value: OrderType | "All"; label: string }> = [
  { value: "All", label: "جميع الطلبات" },
  { value: "Reservation", label: "الحجوزات" },
  { value: "Purchase", label: "الشراء المباشر" },
  { value: "SellMyCar", label: "عروض البيع" },
  { value: "TradeIn", label: "الاستبدال" },
  { value: "TestDrive", label: "تجارب القيادة" },
  { value: "Financing", label: "التمويل" },
  { value: "Contact", label: "استفسارات عامة" },
];

function ManageOrders() {
  const { orders, updateOrderStatus, loadingOrders } = useDealership();
  const [filter, setFilter] = useState<OrderType | "All">("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchType = filter === "All" || o.type === filter;
      const matchSearch =
        search === "" ||
        o.fullName.toLowerCase().includes(search.toLowerCase()) ||
        o.email.toLowerCase().includes(search.toLowerCase()) ||
        o.phone.includes(search) ||
        o.carTitle.toLowerCase().includes(search.toLowerCase()) ||
        o.notes?.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [orders, filter, search]);

  const exportCSV = () => {
    if (orders.length === 0) return toast.info("لا توجد طلبات لتصديرها.");
    const headers = [
      "ID",
      "Type",
      "Status",
      "Customer",
      "Phone",
      "Email",
      "City",
      "Vehicle",
      "Created",
      "Notes",
    ];
    const rows = orders.map((o) => [
      `"${o.id}"`,
      `"${o.type}"`,
      `"${o.status}"`,
      `"${o.fullName}"`,
      `"${o.phone}"`,
      `"${o.email}"`,
      `"${o.city || ""}"`,
      `"${o.carTitle}"`,
      `"${o.createdAt}"`,
      `"${(o.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `velocity_orders_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("تم تصدير سجل الطلبات كملف CSV بنجاح!");
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-border">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold">
            إدارة الطلبات والصفقات
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {loadingOrders
              ? "جاري تحميل الطلبات والحجوزات..."
              : `تم العثور على ${filtered.length} من أصل ${orders.length} طلب`}
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-input bg-card hover:bg-secondary text-xs font-bold shadow-sm transition-colors cursor-pointer"
        >
          <Download className="h-4 w-4 text-accent" /> تصدير ملف CSV
        </button>
      </div>

      {/* Filter Bar */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="البحث باسم العميل، الهاتف، رقم الهيكل أو نوع السيارة..."
          className="h-10 px-3.5 rounded-xl border border-input bg-background text-sm flex-1 focus:ring-2 focus:ring-accent outline-none text-foreground"
        />

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {TYPE_FILTERS.map((tf) => {
            const count =
              tf.value === "All"
                ? orders.length
                : orders.filter((o) => o.type === tf.value).length;
            return (
              <button
                key={tf.value}
                onClick={() => setFilter(tf.value)}
                className={cn(
                  "h-9 px-3.5 rounded-xl text-xs font-bold border transition whitespace-nowrap cursor-pointer",
                  filter === tf.value
                    ? "bg-accent text-accent-foreground border-accent shadow-sm"
                    : "border-input bg-card hover:bg-secondary text-muted-foreground",
                )}
              >
                {tf.label} <span className="opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {loadingOrders ? (
        <div className="mt-6 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-2xl border border-border bg-card animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-10 bg-card border border-border rounded-3xl p-16 text-center shadow-card max-w-xl mx-auto">
          <Inbox className="h-12 w-12 mx-auto text-muted-foreground/60" />
          <div className="mt-4 font-bold text-lg text-foreground">
            لا توجد طلبات تطابق هذا الفلتر
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            ستظهر هنا طلبات الحجز والشراء المباشر واستمارات بيع واستبدال
            السيارات فور إرسالها من العملاء.
          </p>
          <Link
            to="/cars"
            className="mt-5 inline-block px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-bold shadow-md hover:opacity-90 transition-opacity"
          >
            تصفح المعرض وتجربة تقديم طلب
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {filtered.map((o) => (
            <OrderCard
              key={o.id}
              order={o}
              onStatusChange={updateOrderStatus}
            />
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

function esc(v: unknown): string {
  return String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ] as string,
  );
}

/** Builds a self-contained printable receipt for exactly ONE order/deal. */
function buildOrderPrintHtml(
  o: Order,
  parsedNotes: any,
  typeLabel: string,
  statusLabel: string,
): string {
  const rows: string[] = [];
  const row = (label: string, value: string | number | undefined | null) => {
    if (value === undefined || value === null || value === "") return;
    rows.push(
      `<div class="row"><span class="label">${esc(label)}</span><span class="value">${esc(value)}</span></div>`,
    );
  };

  row(
    "رقم الحجز/الصفقة",
    parsedNotes?.bookingRef ? `#${parsedNotes.bookingRef}` : undefined,
  );
  row(
    "مبلغ العربون",
    parsedNotes?.depositPaid !== undefined
      ? formatPrice(parsedNotes.depositPaid)
      : undefined,
  );
  row(
    "المبلغ المتبقي",
    parsedNotes?.remainingBalance !== undefined
      ? formatPrice(parsedNotes.remainingBalance)
      : undefined,
  );
  row(
    "طريقة الدفع",
    parsedNotes?.paymentMethod === "card"
      ? "بطاقة دفع"
      : parsedNotes?.paymentMethod
        ? "تحويل بنكي / نقداً"
        : undefined,
  );
  row(
    "طريقة الاستلام",
    parsedNotes?.deliveryMethod === "delivery"
      ? "توصيل للعنوان"
      : parsedNotes?.deliveryMethod
        ? "استلام من المعرض"
        : undefined,
  );
  row("تاريخ التسليم المفضل", parsedNotes?.preferredDate);
  row("رقم الهوية / الرخصة", parsedNotes?.nationalId);
  if (parsedNotes?.hasTradeIn)
    row("سيارة الاستبدال", parsedNotes.tradeInDetails);
  if (parsedNotes?.carDetails) {
    const cd = parsedNotes.carDetails;
    row(
      "بيانات السيارة المعروضة للبيع",
      `${cd.year ?? ""} ${cd.make ?? ""} ${cd.model ?? ""}`.trim(),
    );
    row(
      "الممشى / الحالة",
      `${cd.mileage?.toLocaleString?.() ?? cd.mileage ?? ""} — ${cd.condition ?? ""}`,
    );
    row(
      "نطاق التقييم / السعر المطلوب",
      `${cd.estimatedRange ?? ""} (${cd.askingPrice !== undefined ? formatPrice(cd.askingPrice) : ""})`,
    );
  }
  if (parsedNotes?.customNotes) row("ملاحظات العميل", parsedNotes.customNotes);
  if (!parsedNotes && o.notes) row("الملاحظات", o.notes);

  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>إشعار الصفقة — ${esc(o.fullName)}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, "Segoe UI", Tahoma, Arial, sans-serif; margin: 0; padding: 32px; color: #1a1a1a; }
  .brand { font-size: 22px; font-weight: 800; }
  .brand span { color: #ea580c; }
  .muted { color: #6b7280; font-size: 12px; }
  h1 { font-size: 18px; margin: 24px 0 4px; }
  .badge { display: inline-block; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 999px; background: #f3f4f6; border: 1px solid #e5e7eb; margin-inline-end: 6px; }
  .section { margin-top: 20px; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; }
  .section h2 { font-size: 13px; margin: 0 0 10px; color: #374151; }
  .row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed #e5e7eb; font-size: 13px; }
  .row:last-child { border-bottom: none; }
  .label { color: #6b7280; }
  .value { font-weight: 700; }
  .footer { margin-top: 28px; text-align: center; font-size: 11px; color: #9ca3af; }
  @media print { body { padding: 12px; } }
</style>
</head>
<body>
  <div class="brand">Velocity<span>Motors</span></div>
  <div class="muted">إشعار صفقة رسمي — طُبع بتاريخ ${esc(new Date().toLocaleString("ar-SA"))}</div>

  <h1>${esc(o.fullName)}</h1>
  <div>
    <span class="badge">${esc(typeLabel)}</span>
    <span class="badge">${esc(statusLabel)}</span>
  </div>

  <div class="section">
    <h2>بيانات العميل</h2>
    <div class="row"><span class="label">الهاتف</span><span class="value">${esc(o.phone)}</span></div>
    <div class="row"><span class="label">البريد الإلكتروني</span><span class="value">${esc(o.email)}</span></div>
    <div class="row"><span class="label">المدينة</span><span class="value">${esc(o.city || "زيارة مباشرة للمعرض")}</span></div>
    <div class="row"><span class="label">السيارة</span><span class="value">${esc(o.carTitle)}</span></div>
    <div class="row"><span class="label">تاريخ الطلب</span><span class="value">${esc(new Date(o.createdAt).toLocaleString("ar-SA"))}</span></div>
  </div>

  ${rows.length ? `<div class="section"><h2>تفاصيل الصفقة والبيانات المالية</h2>${rows.join("")}</div>` : ""}

  <div class="footer">Velocity Motors — تم إنشاء هذا الإشعار تلقائياً من لوحة الإدارة</div>
</body>
</html>`;
}

function OrderCard({
  order: o,
  onStatusChange,
}: {
  order: Order;
  onStatusChange: (id: string, s: OrderStatus) => Promise<void>;
}) {
  const typeConfig = TYPE_CONFIG[o.type] || TYPE_CONFIG.Contact;
  const TypeIcon = typeConfig.icon;

  // Attempt to parse structured JSON notes from our reservation / sell modals
  let parsedNotes: any = null;
  if (o.notes) {
    try {
      parsedNotes = JSON.parse(o.notes);
    } catch {
      parsedNotes = null;
    }
  }

  const waDigits = o.phone.replace(/\D/g, "");
  const waHref = waDigits
    ? `https://wa.me/${waDigits}?text=${encodeURIComponent(
        `مرحباً ${o.fullName}، نتواصل معك من معرض فيلوسيتي موتورز بخصوص ${typeConfig.label} لسيارة ${o.carTitle}. كيف يمكننا خدمتك اليوم؟`,
      )}`
    : undefined;
  const mailHref = `mailto:${o.email}?subject=${encodeURIComponent(
    `Velocity Motors: بخصوص ${typeConfig.label} لسيارة ${o.carTitle}`,
  )}`;

  const handlePrint = () => {
    const html = buildOrderPrintHtml(
      o,
      parsedNotes,
      typeConfig.label,
      STATUS_NAMES_AR[o.status] || o.status,
    );
    const win = window.open("", "_blank", "width=850,height=1000");
    if (!win) {
      toast.error(
        "يرجى السماح بالنوافذ المنبثقة (popups) في المتصفح لطباعة إشعار الصفقة",
      );
      return;
    }
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => {
      try {
        win.print();
      } catch {
        /* user can print manually from the opened tab */
      }
    }, 250);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card hover:border-border/80 transition space-y-4 text-right">
      {/* Header Row */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border font-bold",
                typeConfig.bg,
                typeConfig.text,
              )}
            >
              <TypeIcon className="h-3.5 w-3.5" />
              {typeConfig.label}
            </span>

            <h3 className="font-bold text-lg font-display text-foreground">
              {o.fullName}
            </h3>

            <span
              className={cn(
                "text-xs px-2.5 py-0.5 rounded-full border font-semibold",
                statusColors[o.status],
              )}
            >
              {STATUS_NAMES_AR[o.status] || o.status}
            </span>

            {parsedNotes?.bookingRef && (
              <span
                className="font-mono text-xs font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-md"
                dir="ltr"
              >
                #{parsedNotes.bookingRef}
              </span>
            )}
          </div>

          <div className="text-sm text-muted-foreground mt-1">
            {o.carId ? (
              <>
                السيارة المطلوبة:{" "}
                <Link
                  to="/cars/$id"
                  params={{ id: o.carId }}
                  className="text-foreground font-semibold hover:text-accent underline underline-offset-2"
                >
                  {o.carTitle}
                </Link>
              </>
            ) : (
              <span className="font-semibold text-foreground">
                {o.carTitle}
              </span>
            )}
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-left">
          <div className="flex items-center gap-1 justify-end">
            <Clock className="h-3.5 w-3.5" />
            <span>{new Date(o.createdAt).toLocaleString("ar-SA")}</span>
          </div>
          {parsedNotes?.depositPaid && (
            <div className="font-bold text-accent text-sm mt-1">
              العربون المدفوع: {formatPrice(parsedNotes.depositPaid)}
            </div>
          )}
        </div>
      </div>

      {/* Customer Quick Coordinates */}
      <div className="grid gap-3 sm:grid-cols-3 text-xs bg-muted/40 p-3.5 rounded-xl border border-border">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-accent shrink-0" />
          <a
            href={`tel:${o.phone}`}
            className="font-semibold hover:text-accent font-mono"
            dir="ltr"
          >
            {o.phone}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-accent shrink-0" />
          <a
            href={`mailto:${o.email}`}
            className="font-semibold hover:text-accent truncate"
            dir="ltr"
          >
            {o.email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-accent shrink-0" />
          <span className="font-semibold">
            {o.city || "زيارة مباشرة للمعرض"}
          </span>
        </div>
      </div>

      {/* Structured Booking or Valuation Details */}
      {parsedNotes && (
        <div className="p-4 rounded-xl bg-secondary/50 border border-border text-xs space-y-2">
          <div className="font-bold text-foreground text-sm flex items-center justify-between">
            <span>تفاصيل الصفقة والبيانات المالية</span>
            {parsedNotes.paymentMethod && (
              <span className="font-normal text-muted-foreground">
                طريقة الدفع:{" "}
                {parsedNotes.paymentMethod === "card"
                  ? "بطاقة دفع"
                  : "تحويل بنكي / نقداً"}{" "}
                · الاستلام:{" "}
                {parsedNotes.deliveryMethod === "delivery"
                  ? "توصيل للعنوان"
                  : "استلام من المعرض"}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {parsedNotes.depositPaid !== undefined && (
              <div>
                <span className="text-muted-foreground block">
                  مبلغ العربون:
                </span>
                <span className="font-bold text-accent text-sm">
                  {formatPrice(parsedNotes.depositPaid)}
                </span>
              </div>
            )}

            {parsedNotes.remainingBalance !== undefined && (
              <div>
                <span className="text-muted-foreground block">
                  المبلغ المتبقي:
                </span>
                <span className="font-bold text-sm">
                  {formatPrice(parsedNotes.remainingBalance)}
                </span>
              </div>
            )}

            {parsedNotes.nationalId && (
              <div>
                <span className="text-muted-foreground block">
                  رقم الهوية / الرخصة:
                </span>
                <span className="font-mono font-semibold" dir="ltr">
                  {parsedNotes.nationalId}
                </span>
              </div>
            )}

            {parsedNotes.preferredDate && (
              <div>
                <span className="text-muted-foreground block">
                  تاريخ التسليم المفضل:
                </span>
                <span className="font-semibold">
                  {parsedNotes.preferredDate}
                </span>
              </div>
            )}
          </div>

          {/* Trade-In Vehicle Note */}
          {parsedNotes.hasTradeIn && (
            <div className="pt-2 border-t border-border/80 text-amber-700 dark:text-amber-300 font-medium">
              ★ العميل يرغب باستبدال سيارته: {parsedNotes.tradeInDetails}
            </div>
          )}

          {/* Car Sale Details */}
          {parsedNotes.carDetails && (
            <div className="pt-2 border-t border-border/80 space-y-1">
              <div className="font-bold text-foreground">
                بيانات السيارة المعروضة للبيع:
              </div>
              <div className="text-muted-foreground">
                {parsedNotes.carDetails.year} {parsedNotes.carDetails.make}{" "}
                {parsedNotes.carDetails.model} ·{" "}
                {parsedNotes.carDetails.mileage?.toLocaleString()} كم/ميل ·
                الحالة: {parsedNotes.carDetails.condition}
              </div>
              <div className="text-accent font-bold">
                نطاق التقييم التقديري: {parsedNotes.carDetails.estimatedRange}{" "}
                (السعر المطلوب:{" "}
                {formatPrice(parsedNotes.carDetails.askingPrice)})
              </div>
              {parsedNotes.carDetails.description && (
                <p className="text-muted-foreground italic mt-1">
                  "{parsedNotes.carDetails.description}"
                </p>
              )}
            </div>
          )}

          {parsedNotes.customNotes && (
            <div className="pt-1 text-muted-foreground">
              <span className="font-semibold text-foreground">
                ملاحظة العميل:
              </span>{" "}
              {parsedNotes.customNotes}
            </div>
          )}
        </div>
      )}

      {/* Raw Notes fallback */}
      {!parsedNotes && o.notes && (
        <div className="p-3 rounded-xl bg-muted/60 text-xs text-muted-foreground">
          <span className="font-bold text-foreground">الملاحظات:</span>{" "}
          {o.notes}
        </div>
      )}

      {/* Status Controls & Action Triggers */}
      <div className="flex items-center justify-between gap-3 flex-wrap pt-2 border-t border-border/60">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-muted-foreground">
            مرحلة المتابعة:
          </label>
          <select
            value={o.status}
            onChange={async (e) => {
              try {
                await onStatusChange(o.id, e.target.value as OrderStatus);
                toast.success(`تم تحديث حالة الطلب`);
              } catch (err) {
                toast.error("فشل تحديث الحالة");
              }
            }}
            className="h-9 px-3 rounded-xl bg-background border border-input text-xs font-bold focus:ring-2 focus:ring-accent outline-none"
          >
            <option value="New">🟡 طلب جديد</option>
            <option value="Processing">🔵 قيد المراجعة والمعالجة</option>
            <option value="Contacted">🟣 تم التواصل / تحديد موعد</option>
            <option value="Closed">🟢 تم إتمام الصفقة</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl border border-input bg-card hover:bg-secondary text-xs font-semibold cursor-pointer transition-colors"
          >
            <Printer className="h-3.5 w-3.5" /> طباعة إشعار الصفقة
          </button>

          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" /> تواصل عبر واتساب
            </a>
          )}

          <a
            href={mailHref}
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
          >
            <Send className="h-3.5 w-3.5" /> مراسلة بالبريد
          </a>
        </div>
      </div>
    </div>
  );
}
