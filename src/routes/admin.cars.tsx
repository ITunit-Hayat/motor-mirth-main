import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  SlidersHorizontal,
  Car as CarIcon,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Star,
  Layers,
  Fuel,
  Gauge,
  Calendar,
  DollarSign,
  Shield,
  FileText,
  Image as ImageIcon,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/AdminLayout";
import { ErrorState } from "@/components/StateViews";
import { MediaManagerModal } from "@/components/MediaManagerModal";
import { useDealership, formatPrice, formatMiles } from "@/context/DealershipContext";
import { useDynamicAttributes } from "@/lib/dynamicAttributes";
import { getActiveRole, hasPermission, ROLE_INFO } from "@/lib/adminAuth";
import type { Car, CarStatus } from "@/data/initialCars";

export const Route = createFileRoute("/admin/cars")({
  head: () => ({
    meta: [
      { title: "وحدة التحكم في المخزون — لوحة الإدارة" },
      { name: "description", content: "إدارة متقدمة لجدول سيارات المعرض وحالات الظهور." },
    ],
  }),
  component: ManageCarsPage,
});

type FormState = Omit<Car, "id">;

const emptyCar: FormState = {
  title: "",
  make: "Toyota",
  model: "Camry",
  year: new Date().getFullYear(),
  price: 50000,
  mileage: 0,
  category: "Sedan",
  engine: "2.5L 4-Cylinder",
  transmission: "Automatic",
  condition: "Brand New (0 km)",
  description: "سيارة فاخرة بحالة ممتازة وفحص شامل جاهزة للتسليم الفوري.",
  images: [
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80"
  ],
  featured: false,
  status: "Active",
  vin: "",
  drivetrain: "AWD (All-Wheel Drive)",
  fuelTankCapacity: "65 Liters",
  horsepower: 250,
  previousOwners: 0,
  inspectionReport: "اجتاز فحص 200 نقطة الشامل بنجاح",
  warranty: "ضمان المصنع ساري",
  discount: 0,
  color: "Pearl White",
  fuel: "Petrol",
  cylinders: 4,
};

function ManageCarsPage() {
  const { cars, addCar, updateCar, deleteCar, loadingCars, error, refresh } = useDealership();
  const [attrs] = useDynamicAttributes();
  const [modal, setModal] = useState<null | { mode: "add" } | { mode: "edit"; id: string }>(null);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | CarStatus>("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc" | "mileage-asc">("newest");

  const role = getActiveRole();
  const canDelete = hasPermission(role, "DELETE_CAR");
  const canEditPrice = hasPermission(role, "EDIT_PRICE");
  const canAddEdit = hasPermission(role, "ADD_EDIT_CAR");

  const editingCar = modal?.mode === "edit" ? cars.find((c) => c.id === modal.id) : null;

  // Filtered & Sorted Cars list
  const filteredCars = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const list = cars.filter((c) => {
      const carStatus = c.status ?? "Active";
      if (statusFilter !== "All" && carStatus !== statusFilter) return false;
      if (categoryFilter !== "All" && c.category !== categoryFilter) return false;
      if (q) {
        const text = [c.title, c.make, c.model, c.vin || "", c.category, c.condition]
          .join(" ")
          .toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });

    switch (sortBy) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "mileage-asc":
        return [...list].sort((a, b) => a.mileage - b.mileage);
      default:
        return [...list].sort((a, b) => b.year - a.year);
    }
  }, [cars, statusFilter, categoryFilter, searchTerm, sortBy]);

  // Quick Status Toggle directly from table
  const handleQuickStatusChange = async (carId: string, newStatus: CarStatus) => {
    try {
      await updateCar(carId, { status: newStatus });
      toast.success(`تم تحديث حالة السيارة إلى: ${getStatusLabel(newStatus)}`);
    } catch {
      toast.error("فشل تحديث الحالة");
    }
  };

  const getStatusBadge = (status: CarStatus = "Active") => {
    switch (status) {
      case "Active":
        return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
      case "Draft":
        return "bg-stone-500/15 text-stone-700 dark:text-stone-300 border-stone-500/30";
      case "Reserved":
        return "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30";
      case "Sold":
        return "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30";
    }
  };

  const getStatusLabel = (status: CarStatus = "Active") => {
    switch (status) {
      case "Active":
        return "منشورة (Active)";
      case "Draft":
        return "مسودة (Draft)";
      case "Reserved":
        return "محجوزة (Reserved)";
      case "Sold":
        return "مباعة (Sold)";
    }
  };

  return (
    <AdminLayout>
      {/* Header and Add Button */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-bold">وحدة التحكم في المخزون (Inventory)</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary font-bold border border-border">
              {cars.length} سيارة في النظام
            </span>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">
            إدارة شاملة لبيانات السيارات، المواصفات الفنية، والتحكم في حالة الظهور أمام الزوار.
          </p>
        </div>

        {canAddEdit && (
          <button
            onClick={() => setModal({ mode: "add" })}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-gradient-accent text-accent-foreground font-bold text-sm hover:opacity-90 shadow-md transition"
          >
            <Plus className="h-4 w-4" /> إضافة سيارة جديدة
          </button>
        )}
      </div>

      {/* Role Notice for Sales Agent */}
      {role === "SALES_AGENT" && (
        <div className="mt-4 p-3.5 bg-blue-500/10 border border-blue-500/30 rounded-2xl text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
          <Shield className="h-4 w-4 shrink-0" />
          <span>
            <strong>تنبيه الصلاحية (موظف مبيعات):</strong> يمكنك تعديل حالة السيارات إلى "محجوزة" أو "مباعة" وتحديثها، بينما تعديل الأسعار وحذف السيارات مقصور على المدير العام.
          </span>
        </div>
      )}

      {/* Filters and Search Bar */}
      <div className="mt-6 bg-card border border-border rounded-2xl p-4 shadow-card space-y-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {(["All", "Active", "Reserved", "Sold", "Draft"] as const).map((st) => {
            const count = st === "All" ? cars.length : cars.filter((c) => (c.status ?? "Active") === st).length;
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
                <span>
                  {st === "All"
                    ? "جميع السيارات"
                    : st === "Active"
                    ? "منشورة (Active)"
                    : st === "Reserved"
                    ? "محجوزة (Reserved)"
                    : st === "Sold"
                    ? "مباعة (Sold)"
                    : "مسودة (Draft)"}
                </span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-black/20 text-white" : "bg-muted text-muted-foreground"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Select dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/80">
          <div className="relative sm:col-span-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="بحث بالاسم، الموديل، أو رقم الهيكل (VIN)..."
              className="w-full h-10 pr-9 pl-3 rounded-xl bg-background border border-input text-xs"
            />
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-background border border-input text-xs font-medium"
            >
              <option value="All">جميع الفئات</option>
              {attrs.categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full h-10 px-3 rounded-xl bg-background border border-input text-xs font-medium"
            >
              <option value="newest">الترتيب: الأحدث موديلاً</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
              <option value="mileage-asc">الممشى: الأقل ممشى</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Main Data Table */}
      {error ? (
        <div className="mt-6">
          <ErrorState message={error} onRetry={() => void refresh()} />
        </div>
      ) : (
        <div className="mt-6 bg-card border border-border rounded-3xl overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-muted/60 text-right text-muted-foreground border-b border-border">
                <tr>
                  <th className="p-4 font-bold">المركبة</th>
                  <th className="p-4 font-bold">رقم الهيكل (VIN)</th>
                  <th className="p-4 font-bold">السعر</th>
                  <th className="p-4 font-bold">الممشى والمحرك</th>
                  <th className="p-4 font-bold">حالة الظهور (Status)</th>
                  <th className="p-4 font-bold text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loadingCars && (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-muted-foreground">
                      جاري تحميل بيانات المخزون...
                    </td>
                  </tr>
                )}

                {!loadingCars && filteredCars.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-muted-foreground">
                      لا توجد سيارات مطابقة لمعايير البحث أو التصفية الحالية.
                    </td>
                  </tr>
                )}

                {filteredCars.map((c) => {
                  const carStatus = c.status ?? "Active";
                  return (
                    <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                      {/* Car Details & Image */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-14 w-20 rounded-xl overflow-hidden bg-muted shrink-0 relative">
                            <img
                              src={c.images[0]}
                              alt={c.title}
                              className="h-full w-full object-cover"
                            />
                            {c.featured && (
                              <span className="absolute top-1 left-1 bg-accent text-accent-foreground text-[8px] font-bold px-1 rounded">
                                ★
                              </span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-foreground truncate">{c.title}</div>
                            <div className="text-[11px] text-muted-foreground flex items-center gap-2 mt-0.5">
                              <span>{c.year}</span> • <span>{c.category}</span> • <span>{c.transmission}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* VIN */}
                      <td className="p-4 font-mono text-[11px] text-muted-foreground">
                        {c.vin || "—"}
                      </td>

                      {/* Price */}
                      <td className="p-4 font-bold text-accent whitespace-nowrap">
                        {formatPrice(c.price)}
                        {c.discount && c.discount > 0 ? (
                          <span className="block text-[10px] text-destructive font-normal">
                            خصم {c.discount}% ({formatPrice(Math.round((c.price * (100 - c.discount)) / 100))})
                          </span>
                        ) : null}
                      </td>

                      {/* Mileage & Engine */}
                      <td className="p-4 text-xs">
                        <div className="font-semibold">{formatMiles(c.mileage)}</div>
                        <div className="text-[11px] text-muted-foreground truncate max-w-[140px]">{c.engine}</div>
                      </td>

                      {/* Status Control Selector */}
                      <td className="p-4">
                        <select
                          value={carStatus}
                          onChange={(e) => handleQuickStatusChange(c.id, e.target.value as CarStatus)}
                          className={`h-8 px-2.5 rounded-lg border text-xs font-bold cursor-pointer transition ${getStatusBadge(carStatus)}`}
                        >
                          <option value="Active">منشورة (Active)</option>
                          <option value="Reserved">محجوزة (Reserved)</option>
                          <option value="Sold">مباعة (Sold)</option>
                          <option value="Draft">مسودة (Draft)</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-left">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setModal({ mode: "edit", id: c.id })}
                            className="p-2 rounded-xl bg-secondary hover:bg-muted text-foreground transition"
                            title="تعديل بيانات ومواصفات السيارة"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          {canDelete && (
                            <button
                              onClick={async () => {
                                if (!confirm(`هل أنت متأكد من حذف ${c.title} من المخزون؟`)) return;
                                try {
                                  await deleteCar(c.id);
                                  toast.success("تم حذف السيارة من المخزون");
                                } catch (err) {
                                  toast.error(err instanceof Error ? err.message : "فشل الحذف");
                                }
                              }}
                              className="p-2 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive transition"
                              title="حذف السيارة نهائياً (خاص بالمدير)"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Advanced Tabbed Add / Edit Modal */}
      {modal && (
        <AdvancedCarModal
          initial={editingCar ? { ...editingCar } : emptyCar}
          mode={modal.mode}
          saving={saving}
          role={role}
          attrs={attrs}
          onClose={() => setModal(null)}
          onSubmit={async (data) => {
            setSaving(true);
            try {
              if (modal.mode === "edit") {
                await updateCar(modal.id, data);
                toast.success("تم تحديث بيانات السيارة بنجاح");
              } else {
                await addCar(data);
                toast.success("تمت إضافة السيارة الجديدة بنجاح للمخزون");
              }
              setModal(null);
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "فشل حفظ البيانات");
            } finally {
              setSaving(false);
            }
          }}
        />
      )}
    </AdminLayout>
  );
}

/**
 * Tabbed Advanced Modal Component
 */
function AdvancedCarModal({
  initial,
  mode,
  saving,
  role,
  attrs,
  onClose,
  onSubmit,
}: {
  initial: FormState;
  mode: "add" | "edit";
  saving: boolean;
  role: string;
  attrs: any;
  onClose: () => void;
  onSubmit: (data: FormState) => Promise<void>;
}) {
  const [f, setF] = useState<FormState>(initial);
  const [activeTab, setActiveTab] = useState<"basic" | "specs" | "history" | "media">("basic");

  const canEditPrice = hasPermission(role as any, "EDIT_PRICE");

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((s) => ({ ...s, [k]: v }));

  // Helper when make changes to update models list
  const currentMakeObj = attrs.makes.find((m: any) => m.name.toLowerCase() === f.make.toLowerCase());
  const availableModels = currentMakeObj?.models || [];

  const handleMakeChange = (newMake: string) => {
    const makeObj = attrs.makes.find((m: any) => m.name === newMake);
    const firstModel = makeObj?.models?.[0] || "";
    setF((prev) => ({
      ...prev,
      make: newMake,
      model: firstModel,
      title: `${prev.year} ${newMake} ${firstModel}`.trim(),
    }));
  };

  const handleModelChange = (newModel: string) => {
    setF((prev) => ({
      ...prev,
      model: newModel,
      title: `${prev.year} ${prev.make} ${newModel}`.trim(),
    }));
  };

  const handleYearChange = (newYear: number) => {
    setF((prev) => ({
      ...prev,
      year: newYear,
      title: `${newYear} ${prev.make} ${prev.model}`.trim(),
    }));
  };

  const inputCls = "w-full h-11 px-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm focus:ring-2 focus:ring-accent outline-none";
  const labelCls = "text-xs font-bold text-muted-foreground block mb-1.5";

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs grid place-items-center p-3 sm:p-6 overflow-y-auto">
      <div
        className="w-full max-w-4xl bg-card rounded-3xl shadow-elegant border border-border overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-muted/20">
          <div>
            <h2 className="font-display text-lg sm:text-xl font-bold flex items-center gap-2">
              <CarIcon className="h-5 w-5 text-accent" />
              {mode === "edit" ? `تعديل سيارة: ${f.title}` : "إضافة سيارة جديدة للمخزون"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              نموذج إدخال متقدم مقسم إلى تبويبات لسهولة ودقة إدخال المواصفات.
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="px-6 border-b border-border bg-card flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("basic")}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
              activeTab === "basic"
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <CarIcon className="h-4 w-4" /> 1. البيانات الأساسية
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("specs")}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
              activeTab === "specs"
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Gauge className="h-4 w-4" /> 2. المواصفات الفنية
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("history")}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
              activeTab === "history"
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Shield className="h-4 w-4" /> 3. تاريخ وحالة المركبة
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("media")}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
              activeTab === "media"
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <ImageIcon className="h-4 w-4" /> 4. الوسائط والعلامة المائية ({f.images.length})
          </button>
        </div>

        {/* Modal Body: Tab Contents */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!f.title.trim()) {
              toast.error("يرجى ملء عنوان السيارة");
              return;
            }
            if (f.price <= 0) {
              toast.error("يرجى إدخال سعر صحيح للسيارة");
              return;
            }
            onSubmit(f);
          }}
          className="p-6 overflow-y-auto flex-1 space-y-6"
        >
          {/* TAB 1: BASIC DATA */}
          {activeTab === "basic" && (
            <div className="space-y-5 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Make */}
                <div>
                  <label className={labelCls}>الماركة (Make)</label>
                  <select
                    value={f.make}
                    onChange={(e) => handleMakeChange(e.target.value)}
                    className={inputCls}
                  >
                    {attrs.makes.map((m: any) => (
                      <option key={m.id} value={m.name}>
                        {m.name} ({m.country || "General"})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Model */}
                <div>
                  <label className={labelCls}>الموديل (Model)</label>
                  {availableModels.length > 0 ? (
                    <select
                      value={f.model}
                      onChange={(e) => handleModelChange(e.target.value)}
                      className={inputCls}
                    >
                      {availableModels.map((mod: string) => (
                        <option key={mod} value={mod}>
                          {mod}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={f.model}
                      onChange={(e) => handleModelChange(e.target.value)}
                      className={inputCls}
                      placeholder="أدخل الموديل يدوي..."
                    />
                  )}
                </div>

                {/* Year */}
                <div>
                  <label className={labelCls}>سنة الصنع (Year)</label>
                  <input
                    type="number"
                    min="1990"
                    max="2030"
                    value={f.year}
                    onChange={(e) => handleYearChange(Number(e.target.value))}
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Title Auto Generated */}
              <div>
                <label className={labelCls}>عنوان الإعلان الكامل (Car Title)</label>
                <input
                  type="text"
                  value={f.title}
                  onChange={(e) => set("title", e.target.value)}
                  className={inputCls}
                  placeholder="2024 Porsche 911 Carrera S..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Price */}
                <div>
                  <label className={labelCls}>السعر الأساسي ($ USD)</label>
                  <input
                    type="number"
                    disabled={!canEditPrice}
                    value={f.price}
                    onChange={(e) => set("price", Number(e.target.value))}
                    className={`${inputCls} ${!canEditPrice ? "opacity-60 cursor-not-allowed" : ""}`}
                  />
                  {!canEditPrice && (
                    <span className="text-[10px] text-muted-foreground mt-1 block">
                      تعديل السعر مقيد للمدير العام فقط
                    </span>
                  )}
                </div>

                {/* Discount */}
                <div>
                  <label className={labelCls}>نسبة الخصم / العرض الخاص (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="90"
                    value={f.discount || 0}
                    onChange={(e) => set("discount", Number(e.target.value))}
                    className={inputCls}
                  />
                </div>

                {/* VIN */}
                <div>
                  <label className={labelCls}>رقم الهيكل (VIN Number)</label>
                  <input
                    type="text"
                    value={f.vin || ""}
                    onChange={(e) => set("vin", e.target.value.toUpperCase())}
                    className={`${inputCls} font-mono uppercase`}
                    placeholder="WBA33AY08NFP12948"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
                {/* Category */}
                <div>
                  <label className={labelCls}>الفئة (Category)</label>
                  <select
                    value={f.category}
                    onChange={(e) => set("category", e.target.value)}
                    className={inputCls}
                  >
                    {attrs.categories.map((c: string) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Selector */}
                <div>
                  <label className={labelCls}>حالة الظهور (Status Control)</label>
                  <select
                    value={f.status || "Active"}
                    onChange={(e) => set("status", e.target.value as CarStatus)}
                    className={inputCls}
                  >
                    <option value="Active">منشورة (Active) — تظهر للزوار في المعرض</option>
                    <option value="Draft">مسودة (Draft) — قيد التجهيز ومخفية عن الزوار</option>
                    <option value="Reserved">محجوزة (Reserved) — تظهر مع علامة محجوزة</option>
                    <option value="Sold">مباعة (Sold) — تظهر بشارة مباعة لتعزيز الثقة</option>
                  </select>
                </div>
              </div>

              {/* Featured toggle */}
              <label className="flex items-center gap-2 p-3 bg-secondary/50 rounded-2xl cursor-pointer text-xs font-semibold">
                <input
                  type="checkbox"
                  checked={!!f.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                  className="rounded text-accent focus:ring-accent h-4 w-4"
                />
                <span>تمييز السيارة (Featured Badge) لتظهر في واجهة المعرض والصفحة الأولى</span>
              </label>
            </div>
          )}

          {/* TAB 2: TECHNICAL SPECS */}
          {activeTab === "specs" && (
            <div className="space-y-5 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Engine */}
                <div>
                  <label className={labelCls}>المحرك وسعة اللترات (Engine)</label>
                  <input
                    type="text"
                    value={f.engine}
                    onChange={(e) => set("engine", e.target.value)}
                    className={inputCls}
                    placeholder="3.0L Twin-Turbo Inline-6 / Tri-Motor Electric"
                  />
                </div>

                {/* Horsepower */}
                <div>
                  <label className={labelCls}>القوة الحصانية (Horsepower HP)</label>
                  <input
                    type="number"
                    value={f.horsepower || 0}
                    onChange={(e) => set("horsepower", Number(e.target.value))}
                    className={inputCls}
                    placeholder="503"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Transmission */}
                <div>
                  <label className={labelCls}>ناقل الحركة (Transmission)</label>
                  <select
                    value={f.transmission}
                    onChange={(e) => set("transmission", e.target.value)}
                    className={inputCls}
                  >
                    {attrs.transmissions.map((tr: string) => (
                      <option key={tr} value={tr}>
                        {tr}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className={labelCls}>نوع الوقود (Fuel Type)</label>
                  <select
                    value={f.fuel || "Petrol"}
                    onChange={(e) => set("fuel", e.target.value)}
                    className={inputCls}
                  >
                    {attrs.fuelTypes.map((ft: string) => (
                      <option key={ft} value={ft}>
                        {ft}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Drivetrain */}
                <div>
                  <label className={labelCls}>نوع الدفع (Drivetrain)</label>
                  <select
                    value={f.drivetrain || "AWD (All-Wheel Drive)"}
                    onChange={(e) => set("drivetrain", e.target.value)}
                    className={inputCls}
                  >
                    {attrs.drivetrains.map((dt: string) => (
                      <option key={dt} value={dt}>
                        {dt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border">
                {/* Fuel Tank / Range */}
                <div>
                  <label className={labelCls}>سعة الخزان / المدى (Fuel Tank / Range)</label>
                  <input
                    type="text"
                    value={f.fuelTankCapacity || ""}
                    onChange={(e) => set("fuelTankCapacity", e.target.value)}
                    className={inputCls}
                    placeholder="65 Liters / 580 km Range"
                  />
                </div>

                {/* Cylinders */}
                <div>
                  <label className={labelCls}>عدد السلندرات (Cylinders)</label>
                  <input
                    type="number"
                    value={f.cylinders || 0}
                    onChange={(e) => set("cylinders", Number(e.target.value))}
                    className={inputCls}
                    placeholder="6"
                  />
                </div>

                {/* Color */}
                <div>
                  <label className={labelCls}>اللون الخارجي (Color)</label>
                  <input
                    type="text"
                    value={f.color || ""}
                    onChange={(e) => set("color", e.target.value)}
                    className={inputCls}
                    placeholder="Alpine White / Guards Red"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VEHICLE HISTORY & CONDITION */}
          {activeTab === "history" && (
            <div className="space-y-5 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Mileage */}
                <div>
                  <label className={labelCls}>الممشى (Mileage - Miles / KM)</label>
                  <input
                    type="number"
                    value={f.mileage}
                    onChange={(e) => set("mileage", Number(e.target.value))}
                    className={inputCls}
                  />
                </div>

                {/* Condition */}
                <div>
                  <label className={labelCls}>حالة البودي والمركبة (Condition)</label>
                  <select
                    value={f.condition}
                    onChange={(e) => set("condition", e.target.value)}
                    className={inputCls}
                  >
                    {attrs.conditions.map((cd: string) => (
                      <option key={cd} value={cd}>
                        {cd}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Previous Owners */}
                <div>
                  <label className={labelCls}>عدد الملاك السابقين (Previous Owners)</label>
                  <input
                    type="number"
                    min="0"
                    value={f.previousOwners ?? 1}
                    onChange={(e) => set("previousOwners", Number(e.target.value))}
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Inspection Report */}
                <div>
                  <label className={labelCls}>تقرير الفحص المعتمد (Inspection Report)</label>
                  <input
                    type="text"
                    value={f.inspectionReport || ""}
                    onChange={(e) => set("inspectionReport", e.target.value)}
                    className={inputCls}
                    placeholder="اجتاز فحص 200 نقطة الشامل - خالي من الحوادث"
                  />
                </div>

                {/* Warranty */}
                <div>
                  <label className={labelCls}>حالة الضمان (Warranty Status)</label>
                  <input
                    type="text"
                    value={f.warranty || ""}
                    onChange={(e) => set("warranty", e.target.value)}
                    className={inputCls}
                    placeholder="ضمان الوكالة حتى 2027 / ضمان شامل سنة"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className={labelCls}>الوصف التسويقي والتفاصيل (Full Description)</label>
                <textarea
                  rows={4}
                  value={f.description}
                  onChange={(e) => set("description", e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-background border border-input text-xs sm:text-sm focus:ring-2 focus:ring-accent outline-none"
                  placeholder="اكتب مواصفات السيارة، البكجات الإضافية، التجهيزات الداخلية، وتفاصيل الصيانة..."
                />
              </div>
            </div>
          )}

          {/* TAB 4: MEDIA MANAGER & WATERMARK */}
          {activeTab === "media" && (
            <div className="animate-in fade-in">
              <MediaManagerModal
                images={f.images}
                onChange={(imgs) => set("images", imgs)}
                carTitle={f.title}
              />
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-border flex items-center justify-between gap-3 flex-wrap">
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span>الحالة الحالية:</span>
              <strong className="text-foreground">{f.status || "Active"}</strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="h-11 px-5 rounded-xl border border-input bg-card hover:bg-secondary text-xs font-bold transition"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={saving}
                className="h-11 px-6 rounded-xl bg-gradient-accent text-accent-foreground font-bold text-xs sm:text-sm hover:opacity-90 shadow-md transition disabled:opacity-50"
              >
                {saving ? "جاري الحفظ..." : mode === "edit" ? "حفظ التعديلات" : "إضافة السيارة الآن"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
