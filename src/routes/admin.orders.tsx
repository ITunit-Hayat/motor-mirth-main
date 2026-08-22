import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Inbox,
  MessageCircle,
  Clock,
  CheckCircle2,
  Calendar,
  DollarSign,
  Search,
  Filter,
  Trash2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  X,
  FileText,
  User,
  Shield,
  Tag
} from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/AdminLayout";
import { useDealership, formatPrice, type Order, type OrderStatus, type OrderType } from "@/context/DealershipContext";
import { useSiteSettings } from "@/lib/settings";
import { getActiveRole, TEAM_MEMBERS } from "@/lib/adminAuth";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title: "وحدة معالجة الطلبات — لوحة الإدارة" },
      { name: "description", content: "صندوق الوارد الموحد وإدارة طلبات وتواصل العملاء." },
    ],
  }),
  component: ManageOrdersPage,
});

const statusBadgeStyles: Record<OrderStatus, string> = {
  New: "bg-destructive/15 text-destructive border-destructive/30",
  "In Progress": "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  Contacted: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
  Closed: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
};

const statusLabels: Record<OrderStatus, string> = {
  New: "جديد (New)",
  "In Progress": "قيد المعالجة (In Progress)",
  Contacted: "تم التواصل (Contacted)",
  Closed: "مغلق / تم البيع (Closed)",
};

const typeLabels: Record<OrderType, { label: string; icon: string }> = {
  Purchase: { label: "طلب شراء", icon: "💰" },
  "Test Drive": { label: "حجز تجربة قيادة", icon: "🏎️" },
  Financing: { label: "طلب تمويل وأقساط", icon: "📊" },
  "Price Inquiry": { label: "استفسار سعر", icon: "💬" },
  Contact: { label: "رسالة تواصل عام", icon: "✉️" },
};

function ManageOrdersPage() {
  const { orders, updateOrderStatus, deleteOrder, loadingOrders, simulateIncomingLead, markOrderAsRead } = useDealership();
  const site = useSiteSettings();
  const role = getActiveRole();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [internalNoteInput, setInternalNoteInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | OrderStatus>("All");
  const [typeFilter, setTypeFilter] = useState<"All" | OrderType>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return orders.filter((o) => {
      if (statusFilter !== "All" && o.status !== statusFilter) return false;
      if (typeFilter !== "All" && (o.type || "Purchase") !== typeFilter) return false;
      if (q) {
        const text = [o.fullName, o.phone, o.email, o.city, o.carTitle, o.notes, o.internalNotes || ""]
          .join(" ")
          .toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [orders, statusFilter, typeFilter, searchQuery]);

  const handleOpenOrder = (o: Order) => {
    markOrderAsRead(o.id);
    setSelectedOrder(o);
    setInternalNoteInput(o.internalNotes || "");
  };

  const handleSaveInternalNote = async () => {
    if (!selectedOrder) return;
    try {
      await updateOrderStatus(selectedOrder.id, selectedOrder.status, internalNoteInput);
      setSelectedOrder((prev) => (prev ? { ...prev, internalNotes: internalNoteInput } : null));
      toast.success("تم حفظ الملاحظة الداخلية للموظف بنجاح");
    } catch {
      toast.error("فشل حفظ الملاحظة");
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      toast.success(`تم تحديث مسار الطلب إلى: ${statusLabels[newStatus]}`);
    } catch {
      toast.error("فشل تحديث الحالة");
    }
  };

  // 1-Click WhatsApp Quick Action
  const triggerWhatsApp = (o: Order) => {
    const cleanPhone = o.phone.replace(/\D/g, "");
    let arabicMsg = `مرحباً أستاذ ${o.fullName}،\n\nمعك فريق المبيعات في صالة *${site.siteName}*.\n`;
    if (o.type === "Test Drive") {
      arabicMsg += `تلقينا طلبكم الكريم لحجز موعد تجربة قيادة لسيارة: *${o.carTitle}*.\nيسعدنا تأكيد الموعد المناسب لزيارتكم في صالة العرض.`;
    } else if (o.type === "Financing") {
      arabicMsg += `تلقينا طلبكم بخصوص حساب خطة التمويل والأقساط لسيارة: *${o.carTitle}*.\nيسعدنا تزويدكم بجدول الدفعات المعتمد مع البنوك والشركات التمويلية.`;
    } else {
      arabicMsg += `تلقينا استفساركم الكريم بخصوص سيارة: *${o.carTitle}*.\nيسعدنا الإجابة على أي استفسار وتزويدكم بفيديو فحص تفصيلي.`;
    }

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(arabicMsg)}`, "_blank");
  };

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-bold">وحدة معالجة الطلبات (Requests & Leads)</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/15 text-accent font-bold border border-accent/30">
              صندوق الوارد الموحد
            </span>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">
            استقبال طلبات الشراء، حجوزات تجربة القيادة، التمويل، والرد السريع بنقرة واحدة عبر الواتساب.
          </p>
        </div>

        <button
          onClick={() => {
            simulateIncomingLead();
            toast.success("تم إرسال إشعار بطلب عميل جديد!");
          }}
          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-accent text-accent-foreground text-xs sm:text-sm font-bold hover:opacity-90 shadow-sm transition"
        >
          <Sparkles className="h-4 w-4" /> محاكاة طلب تجريبي جديد
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="mt-6 bg-card border border-border rounded-2xl p-4 shadow-card space-y-4">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {(["All", "New", "In Progress", "Contacted", "Closed"] as const).map((st) => {
            const count = st === "All" ? orders.length : orders.filter((o) => o.status === st).length;
            const isSelected = statusFilter === st;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-accent text-accent-foreground shadow-xs"
                    : "bg-secondary hover:bg-muted text-foreground"
                }`}
              >
                <span>{st === "All" ? "جميع الحالات" : statusLabels[st]}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-black/20 text-white" : "bg-muted text-muted-foreground"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Type & Search bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/80">
          <div className="relative sm:col-span-2">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث باسم العميل، رقم الهاتف، أو اسم السيارة..."
              className="w-full h-10 pr-9 pl-3 rounded-xl bg-background border border-input text-xs"
            />
          </div>

          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-full h-10 px-3 rounded-xl bg-background border border-input text-xs font-medium"
            >
              <option value="All">جميع أنواع الطلبات</option>
              <option value="Purchase">طلب شراء 💰</option>
              <option value="Test Drive">حجز تجربة قيادة 🏎️</option>
              <option value="Financing">طلب تمويل وأقساط 📊</option>
              <option value="Price Inquiry">استفسار سعر 💬</option>
              <option value="Contact">رسالة تواصل ✉️</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Inbox List */}
      {loadingOrders ? (
        <div className="mt-6 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 rounded-2xl border border-border bg-card animate-pulse" />
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="mt-10 bg-card border border-border rounded-3xl p-16 text-center shadow-card">
          <Inbox className="h-12 w-12 mx-auto text-muted-foreground" />
          <div className="mt-3 font-bold text-lg">صندوق الوارد فارغ</div>
          <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
            طلبات الشراء، حجوزات تجربة القيادة، واستفسارات الزوار ستصل مباشرة إلى هنا.
          </p>
          <button
            onClick={simulateIncomingLead}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold"
          >
            <Sparkles className="h-4 w-4" /> إنشاء طلب تجريبي للتجربة
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {filteredOrders.map((o) => {
            const typeInfo = typeLabels[o.type || "Purchase"];
            const isUnread = o.unread || o.status === "New";

            return (
              <div
                key={o.id}
                onClick={() => handleOpenOrder(o)}
                className={`bg-card border rounded-2xl p-4 sm:p-5 shadow-card hover:border-accent/50 transition-all cursor-pointer group ${
                  isUnread ? "border-accent/40 bg-accent/5" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  {/* Customer and Car Title */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="h-11 w-11 rounded-2xl bg-secondary flex items-center justify-center text-lg shrink-0 border border-border">
                      {typeInfo?.icon || "🚗"}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-sm sm:text-base text-foreground truncate">
                          {o.fullName}
                        </h3>
                        <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-bold ${statusBadgeStyles[o.status]}`}>
                          {statusLabels[o.status]}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary font-semibold border border-border">
                          {typeInfo?.label}
                        </span>
                      </div>

                      <div className="text-xs text-primary font-semibold truncate mt-1 flex items-center gap-1.5">
                        <span>السيارة المهتم بها:</span>
                        <strong className="text-foreground">{o.carTitle}</strong>
                        {o.carPrice ? <span className="text-accent">({formatPrice(o.carPrice)})</span> : null}
                      </div>
                    </div>
                  </div>

                  {/* Timestamp & Workflow Selector */}
                  <div className="text-right shrink-0 flex flex-col items-end gap-2">
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(o.createdAt).toLocaleString("ar-SA", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                {/* Contact Quick Details */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-muted-foreground pt-3 border-t border-border/60">
                  <div className="flex items-center gap-1.5 truncate">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    <span dir="ltr" className="font-mono">{o.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="truncate">{o.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{o.city || "صالة المعرض"}</span>
                  </div>
                </div>

                {/* Notes Preview */}
                {o.notes && (
                  <div className="mt-2.5 p-2.5 rounded-xl bg-secondary/50 text-xs text-foreground line-clamp-2">
                    <strong className="text-muted-foreground ml-1">ملاحظة العميل:</strong>
                    {o.notes}
                  </div>
                )}

                {/* Footer Controls & Quick Actions */}
                <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <label className="text-[11px] font-bold text-muted-foreground">تغيير المسار:</label>
                    <select
                      value={o.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleStatusChange(o.id, e.target.value as OrderStatus)}
                      className={`h-8 px-2 rounded-lg border text-xs font-bold ${statusBadgeStyles[o.status]}`}
                    >
                      <option value="New">جديد (New)</option>
                      <option value="In Progress">قيد المعالجة (In Progress)</option>
                      <option value="Contacted">تم التواصل (Contacted)</option>
                      <option value="Closed">مغلق / تم البيع (Closed)</option>
                    </select>
                  </div>

                  {/* 1-Click Fast Actions */}
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => triggerWhatsApp(o)}
                      className="h-8 px-3 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 text-xs font-bold inline-flex items-center gap-1 shadow-xs transition"
                      title="فتح محادثة واتساب فورية مع رسالة جاهزة"
                    >
                      <MessageCircle className="h-3.5 w-3.5" /> واتساب سريع
                    </button>

                    <a
                      href={`tel:${o.phone}`}
                      className="h-8 px-2.5 rounded-lg border border-input bg-card hover:bg-secondary text-xs font-bold inline-flex items-center gap-1 transition"
                      title="اتصال هاتفي"
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </a>

                    <a
                      href={`mailto:${o.email}?subject=${encodeURIComponent(`بخصوص طلبكم لسيارة ${o.carTitle}`)}`}
                      className="h-8 px-2.5 rounded-lg border border-input bg-card hover:bg-secondary text-xs font-bold inline-flex items-center gap-1 transition"
                      title="إرسال بريد إلكتروني"
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleOpenOrder(o)}
                      className="h-8 px-3 rounded-lg bg-secondary hover:bg-muted text-xs font-bold inline-flex items-center gap-1 transition"
                    >
                      التفاصيل والملاحظات ←
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Request Details Drawer / Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="w-full max-w-2xl bg-card rounded-3xl shadow-elegant border border-border overflow-hidden my-6 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-border flex items-center justify-between bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center text-xl">
                  {typeLabels[selectedOrder.type || "Purchase"]?.icon || "🚗"}
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold">{selectedOrder.fullName}</h2>
                  <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                    <span>{typeLabels[selectedOrder.type || "Purchase"]?.label}</span>
                    <span>•</span>
                    <span>{new Date(selectedOrder.createdAt).toLocaleString("ar-SA")}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="h-9 w-9 rounded-full bg-secondary hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1 text-xs sm:text-sm">
              {/* Linked Car Box */}
              <div className="p-4 rounded-2xl bg-secondary/50 border border-border flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {selectedOrder.carImage ? (
                    <img
                      src={selectedOrder.carImage}
                      alt={selectedOrder.carTitle}
                      className="h-14 w-20 rounded-xl object-cover bg-muted shrink-0"
                    />
                  ) : null}
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">السيارة المرتبطة بالطلب</div>
                    <div className="font-bold text-foreground truncate">{selectedOrder.carTitle}</div>
                    {selectedOrder.carPrice ? (
                      <div className="text-xs text-accent font-bold mt-0.5">
                        {formatPrice(selectedOrder.carPrice)}
                      </div>
                    ) : null}
                  </div>
                </div>

                <Link
                  to="/cars/$id"
                  params={{ id: selectedOrder.carId || "1" }}
                  className="px-3 py-1.5 rounded-xl bg-card border border-input hover:bg-secondary text-xs font-bold inline-flex items-center gap-1 shrink-0"
                >
                  صفحة السيارة <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Customer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-card border border-border">
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">رقم الهاتف</div>
                  <div className="font-bold font-mono" dir="ltr">{selectedOrder.phone}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">البريد الإلكتروني</div>
                  <div className="font-bold truncate">{selectedOrder.email}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">المدينة</div>
                  <div className="font-bold">{selectedOrder.city || "صالة العرض الرئيسية"}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">الموظف المسؤول</div>
                  <div className="font-bold text-primary">{selectedOrder.assignedAgent || "أحمد المنصوري"}</div>
                </div>
              </div>

              {/* Custom Request Fields (Test Drive Date / Down Payment) */}
              {selectedOrder.preferredDate && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs flex items-center justify-between">
                  <span className="font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" /> الموعد المفضل لتجربة القيادة:
                  </span>
                  <strong className="text-foreground">{selectedOrder.preferredDate}</strong>
                </div>
              )}

              {selectedOrder.downPayment && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs flex items-center justify-between">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4" /> الدفعة الأولى المقترحة:
                  </span>
                  <strong className="text-foreground">{formatPrice(selectedOrder.downPayment)}</strong>
                </div>
              )}

              {/* Customer Notes */}
              {selectedOrder.notes && (
                <div>
                  <label className="text-xs font-bold text-muted-foreground block mb-1">
                    رسالة / استفسار العميل:
                  </label>
                  <div className="p-3.5 rounded-xl bg-muted/50 border border-border text-xs sm:text-sm">
                    {selectedOrder.notes}
                  </div>
                </div>
              )}

              {/* Internal Staff Notes (الملاحظات الداخلية للموظف) */}
              <div className="pt-2 border-t border-border">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5 mb-1.5">
                  <FileText className="h-4 w-4 text-accent" />
                  الملاحظات الداخلية للموظف ومسار التواصل:
                </label>
                <textarea
                  rows={3}
                  value={internalNoteInput}
                  onChange={(e) => setInternalNoteInput(e.target.value)}
                  placeholder="سجل تفاصيل المكالمة الهاتفية، عروض الأسعار المقدمة، موعد المعاينة، أو سبب الإغلاق..."
                  className="w-full p-3 rounded-xl bg-background border border-input text-xs focus:ring-2 focus:ring-accent outline-none"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSaveInternalNote}
                    className="h-8 px-4 rounded-lg bg-accent text-accent-foreground text-xs font-bold hover:opacity-90 transition"
                  >
                    حفظ الملاحظة الداخلية
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-border bg-muted/20 flex items-center justify-between flex-wrap gap-2">
              <button
                type="button"
                onClick={() => triggerWhatsApp(selectedOrder)}
                className="h-10 px-4 rounded-xl bg-emerald-500 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 hover:bg-emerald-600 shadow-sm transition"
              >
                <MessageCircle className="h-4 w-4" /> مراسلة عبر الواتساب
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    if (!confirm("هل أنت متأكد من حذف هذا الطلب؟")) return;
                    await deleteOrder(selectedOrder.id);
                    setSelectedOrder(null);
                    toast.success("تم حذف الطلب");
                  }}
                  className="h-10 px-3 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 text-xs font-bold inline-flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" /> حذف الطلب
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="h-10 px-4 rounded-xl bg-secondary text-foreground hover:bg-muted text-xs font-bold"
                >
                  إغلاق النافذة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
