import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2, X, Lock } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/AdminLayout";
import { ErrorState } from "@/components/StateViews";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MediaUploader } from "@/components/MediaUploader";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useAttributes } from "@/lib/attributes";

import { useDealership, formatPrice } from "@/context/DealershipContext";
import type { Car, CarStatus } from "@/data/initialCars";

export const Route = createFileRoute("/admin/cars")({
  head: () => ({
    meta: [
      { title: "إدارة المخزون والسيارات — لوحة الإدارة" },
      { name: "description", content: "إضافة وتعديل وحذف السيارات في المعرض." },
    ],
  }),
  component: ManageCars,
});

type FormState = Omit<Car, "id">;

const empty: FormState = {
  title: "",
  make: "",
  model: "",
  year: new Date().getFullYear(),
  price: 0,
  mileage: 0,
  category: "Sedan",
  engine: "",
  transmission: "Automatic",
  condition: "Used - Excellent",
  description: "",
  images: [],
  featured: false,
  status: "Draft",
  inspectionReport: "",
  previousOwners: 0,
};

const STATUS_STYLES: Record<CarStatus, string> = {
  Active: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  Draft: "bg-muted text-muted-foreground border-border",
  Reserved: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  Sold: "bg-slate-500/15 text-slate-600 dark:text-slate-300 border-slate-500/30",
};

const STATUS_NAMES_AR: Record<CarStatus, string> = {
  Active: "نشط / معروض",
  Draft: "مسودة",
  Reserved: "محجوز",
  Sold: "تم البيع",
};

function ManageCars() {
  const { cars, addCar, updateCar, deleteCar, loadingCars, error, refresh } = useDealership();
  const { isSuperAdmin } = useAdminAuth();
  const [modal, setModal] = useState<null | { mode: "add" } | { mode: "edit"; id: string }>(null);
  const [saving, setSaving] = useState(false);
  const editing = modal?.mode === "edit" ? cars.find((c) => c.id === modal.id) : null;

  const setReserved = async (c: Car, reserved: boolean) => {
    try {
      await updateCar(c.id, { status: reserved ? "Reserved" : "Active" });
      toast.success(reserved ? "تم تعليم السيارة كمحجوزة" : "تم إلغاء حالة الحجز");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "فشل التحديث");
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">المخزون والسيارات</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {loadingCars ? "جاري التحميل..." : `${cars.length} سيارة في المعرض`}
            {!isSuperAdmin && " · وضع وكيل المبيعات — يمكنك تحديد السيارات كمحجوزة"}
          </p>
        </div>
        {isSuperAdmin && (
          <button
            onClick={() => setModal({ mode: "add" })}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 shadow-md cursor-pointer text-sm"
          >
            <Plus className="h-4 w-4" /> إضافة سيارة جديدة
          </button>
        )}
      </div>

      {error ? (
        <div className="mt-6">
          <ErrorState message={error} onRetry={() => void refresh()} />
        </div>
      ) : (
        <div className="mt-6 bg-card border border-border rounded-2xl overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-right text-muted-foreground">
                <tr>
                  <th className="p-3.5 font-semibold">السيارة</th>
                  <th className="p-3.5 font-semibold">السنة</th>
                  <th className="p-3.5 font-semibold">السعر</th>
                  <th className="p-3.5 font-semibold">المسافة</th>
                  <th className="p-3.5 font-semibold">الحالة</th>
                  <th className="p-3.5 font-semibold text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {loadingCars && (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-muted-foreground">
                      جاري تحميل بيانات السيارات...
                    </td>
                  </tr>
                )}
                {!loadingCars && cars.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-muted-foreground">
                      لا توجد سيارات مسجلة بعد — أضف أول سيارة للمعرض.
                    </td>
                  </tr>
                )}
                {cars.map((c) => {
                  const status = c.status ?? "Active";
                  return (
                    <tr key={c.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={c.images[0]}
                            alt=""
                            className="h-12 w-16 rounded-lg object-cover bg-muted shrink-0"
                          />
                          <div>
                            <div className="font-semibold text-foreground">{c.title}</div>
                            <div className="text-xs text-muted-foreground">{c.make} · {c.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5">{c.year}</td>
                      <td className="p-3.5 font-bold text-accent">{formatPrice(c.price)}</td>
                      <td className="p-3.5 font-mono text-xs">{c.mileage.toLocaleString()} كم/ميل</td>
                      <td className="p-3.5">
                        {isSuperAdmin ? (
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold inline-block ${STATUS_STYLES[status]}`}
                          >
                            {STATUS_NAMES_AR[status] || status}
                          </span>
                        ) : (
                          <label className="inline-flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={status === "Reserved"}
                              disabled={status === "Sold"}
                              onChange={(e) => void setReserved(c, e.target.checked)}
                              className="rounded border-input text-accent"
                            />
                            <span
                              className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${STATUS_STYLES[status]}`}
                            >
                              {STATUS_NAMES_AR[status] || status}
                            </span>
                          </label>
                        )}
                      </td>
                      <td className="p-3.5">
                        {isSuperAdmin ? (
                          <div className="flex items-center justify-start gap-1">
                            <button
                              onClick={() => setModal({ mode: "edit", id: c.id })}
                              className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground"
                              title="تعديل"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={async () => {
                                if (!confirm(`هل أنت متأكد من حذف ${c.title}؟`)) return;
                                try {
                                  await deleteCar(c.id);
                                  toast.success("تم حذف السيارة بنجاح");
                                } catch (err) {
                                  toast.error(err instanceof Error ? err.message : "فشل الحذف");
                                }
                              }}
                              className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"
                              title="حذف"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div
                            className="flex items-center justify-start text-muted-foreground"
                            title="المسؤول العام فقط يمكنه تعديل وحذف السيارات"
                          >
                            <Lock className="h-3.5 w-3.5" />
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modal && isSuperAdmin && (
        <CarModal
          initial={editing ? { ...editing, status: editing.status ?? "Active" } : empty}
          saving={saving}
          onClose={() => setModal(null)}
          onSubmit={async (data) => {
            setSaving(true);
            try {
              if (modal.mode === "edit") {
                await updateCar(modal.id, data);
                toast.success("تم تحديث بيانات السيارة بنجاح");
              } else {
                await addCar(data);
                toast.success("تمت إضافة السيارة ونشرها في المعرض");
              }
              setModal(null);
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "فشل الحفظ");
            } finally {
              setSaving(false);
            }
          }}
          title={modal.mode === "edit" ? "تعديل بيانات السيارة" : "إضافة سيارة جديدة للمخزون"}
        />
      )}
    </AdminLayout>
  );
}

const STATUS_OPTIONS: { value: CarStatus; label: string; hint: string }[] = [
  { value: "Active", label: "نشط / معروض", hint: "مرئية لجميع زوار الموقع" },
  { value: "Draft", label: "مسودة", hint: "مخفية أثناء التحضير والتجهيز" },
  { value: "Reserved", label: "محجوز", hint: "معروضة مع إشعار الحجز" },
  { value: "Sold", label: "تم البيع", hint: "معروضة بشارة تم البيع" },
];

function CarModal({
  initial,
  onClose,
  onSubmit,
  title,
  saving,
}: {
  initial: FormState;
  onClose: () => void;
  onSubmit: (d: FormState) => void;
  title: string;
  saving?: boolean;
}) {
  const [f, setF] = useState<FormState>(initial);
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((s) => ({ ...s, [k]: v }));

  const makes = useAttributes("make");
  const categories = useAttributes("category");
  const colors = useAttributes("color");
  const engineTypes = useAttributes("engine_type");
  const transmissions = useAttributes("transmission");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.title || !f.make || f.images.length === 0) {
      toast.error("يرجى إدخال اسم السيارة والماركة وصورة واحدة على الأقل.");
      return;
    }
    onSubmit(f);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto" dir="rtl">
      <form onSubmit={submit} className="bg-card w-full max-w-2xl rounded-2xl border border-border shadow-elegant my-8">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          <Tabs defaultValue="basic">
            <TabsList className="grid grid-cols-4 w-full bg-secondary/80">
              <TabsTrigger value="basic">البيانات الأساسية</TabsTrigger>
              <TabsTrigger value="specs">المواصفات</TabsTrigger>
              <TabsTrigger value="history">الحالة والفحص</TabsTrigger>
              <TabsTrigger value="media">الصور والفيديو</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="grid gap-4 sm:grid-cols-2 pt-4">
              <Field label="عنوان / اسم السيارة" value={f.title} onChange={(v) => set("title", v)} placeholder="مثال: Mercedes-Benz C300 AMG" />
              <DatalistField
                label="نوع الهيكل"
                value={f.category}
                onChange={(v) => set("category", v)}
                options={categories.values}
              />
              <DatalistField
                label="الشركة المصنعة / الماركة"
                value={f.make}
                onChange={(v) => set("make", v)}
                options={makes.values}
              />
              <Field label="الموديل / الفئة" value={f.model} onChange={(v) => set("model", v)} placeholder="مثال: C-Class" />
              <Field
                label="سنة الصنع"
                type="number"
                value={String(f.year)}
                onChange={(v) => set("year", Number(v))}
              />
              <Field
                label="السعر ($ USD)"
                type="number"
                value={String(f.price)}
                onChange={(v) => set("price", Number(v))}
              />
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground">حالة العرض في المعرض</label>
                <div className="mt-1.5 grid grid-cols-4 gap-2">
                  {STATUS_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => set("status", o.value)}
                      title={o.hint}
                      className={`h-10 rounded-xl border text-xs font-semibold transition ${
                        (f.status ?? "Active") === o.value
                          ? "bg-accent text-accent-foreground border-accent shadow-sm"
                          : "border-input bg-card hover:bg-secondary text-muted-foreground"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground">وصف السيارة</label>
                <textarea
                  rows={3}
                  value={f.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="اكتب وصفاً تفصيلياً لمميزات السيارة وحالتها..."
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-background border border-input text-sm resize-none focus:ring-2 focus:ring-accent outline-none"
                />
              </div>
              <label className="flex items-center gap-2 text-sm sm:col-span-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!f.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                  className="rounded border-input text-accent"
                />
                <span className="font-medium">تمييز السيارة في الصفحة الرئيسية (Featured)</span>
              </label>
            </TabsContent>

            <TabsContent value="specs" className="grid gap-4 sm:grid-cols-2 pt-4">
              <Field
                label="المحرك (مثال: 3.0L Twin-Turbo V6)"
                value={f.engine}
                onChange={(v) => set("engine", v)}
              />
              <DatalistField
                label="نوع الوقود والمحرك"
                value={f.fuel ?? ""}
                onChange={(v) => set("fuel", v)}
                options={engineTypes.values}
              />
              <DatalistField
                label="ناقل الحركة"
                value={f.transmission}
                onChange={(v) => set("transmission", v)}
                options={transmissions.values}
              />
              <DatalistField
                label="اللون الخارجي"
                value={f.color ?? ""}
                onChange={(v) => set("color", v)}
                options={colors.values}
              />
              <Field
                label="عدد الأسطوانات"
                type="number"
                value={String(f.cylinders ?? 0)}
                onChange={(v) => set("cylinders", Number(v))}
              />
              <Field
                label="نسبة الخصم % (إن وجد)"
                type="number"
                value={String(f.discount ?? 0)}
                onChange={(v) => set("discount", Number(v))}
              />
            </TabsContent>

            <TabsContent value="history" className="grid gap-4 sm:grid-cols-2 pt-4">
              <Field
                label="المسافة المقطوعة (كم أو ميل)"
                type="number"
                value={String(f.mileage)}
                onChange={(v) => set("mileage", Number(v))}
              />
              <Field label="الحالة العامة" value={f.condition} onChange={(v) => set("condition", v)} placeholder="مثال: مستعمل - ممتاز" />
              <Field
                label="عدد الملاك السابقين"
                type="number"
                value={String(f.previousOwners ?? 0)}
                onChange={(v) => set("previousOwners", Number(v))}
              />
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  ملاحظات تقرير الفحص الفني
                </label>
                <textarea
                  rows={4}
                  value={f.inspectionReport ?? ""}
                  onChange={(e) => set("inspectionReport", e.target.value)}
                  placeholder="اجتازت فحصاً شاملاً لـ 150 نقطة. سجل نظيف خالٍ من الحوادث..."
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-background border border-input text-sm resize-none focus:ring-2 focus:ring-accent outline-none"
                />
              </div>
            </TabsContent>

            <TabsContent value="media" className="pt-4">
              <MediaUploader images={f.images} onChange={(images) => set("images", images)} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-2.5 p-5 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-4 rounded-xl border border-input text-sm font-medium hover:bg-secondary transition-colors"
          >
            إلغاء
          </button>
          <button
            type="submit"
            disabled={saving}
            className="h-10 px-5 rounded-xl bg-accent text-accent-foreground text-sm font-bold shadow-md hover:opacity-90 disabled:opacity-60 transition-opacity"
          >
            {saving ? "جاري الحفظ..." : "حفظ السيارة"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full h-10 px-3 rounded-xl bg-background border border-input text-sm focus:ring-2 focus:ring-accent outline-none text-foreground"
      />
    </div>
  );
}

/** Text input with a native <datalist> of suggestions sourced from the Attributes admin page. */
function DatalistField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const listId = `dl-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <input
        list={listId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full h-10 px-3 rounded-xl bg-background border border-input text-sm focus:ring-2 focus:ring-accent outline-none text-foreground"
      />
      <datalist id={listId}>
        {options.map((o) => (
          <option key={o} value={o} />
        ))}
      </datalist>
    </div>
  );
}
