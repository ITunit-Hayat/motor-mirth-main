import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Tags, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/AdminLayout";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { ATTRIBUTE_LABELS, useAttributes, type AttributeCategory } from "@/lib/attributes";

export const Route = createFileRoute("/admin/attributes")({
  head: () => ({ meta: [{ title: "إدارة الخصائص والمواصفات — لوحة الإدارة" }] }),
  component: AttributesPage,
});

const CATEGORIES: AttributeCategory[] = [
  "make",
  "category",
  "color",
  "engine_type",
  "transmission",
];

function AttributesPage() {
  const { isSuperAdmin } = useAdminAuth();

  return (
    <AdminLayout>
      <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2.5">
        <Tags className="h-6 w-6 text-accent" /> إدارة الخصائص، الماركات والألوان
      </h1>
      <p className="text-muted-foreground text-sm mt-1">
        التحكم في القوائم المنسدلة وخيارات الفلترة المستخدمة في إضافة السيارات وفلاتر البحث في المعرض.
        أضف علامات تجارية جديدة أو ألواناً بكل سهولة ودون الحاجة لتعديل الكود.
      </p>
      {!isSuperAdmin && (
        <p className="mt-2 text-xs text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-xl px-3.5 py-2 inline-block font-medium">
          يمكن لممثلي المبيعات معاينة الخصائص فقط، بينما يملك المسؤول العام صلاحية الإضافة والحذف.
        </p>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {CATEGORIES.map((c) => (
          <AttributeCard key={c} category={c} editable={isSuperAdmin} />
        ))}
      </div>
    </AdminLayout>
  );
}

function AttributeCard({ category, editable }: { category: AttributeCategory; editable: boolean }) {
  const { rows, values, loading, add, remove } = useAttributes(category);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setBusy(true);
    try {
      await add(input.trim());
      setInput("");
      toast.success(`تمت الإضافة بنجاح إلى ${ATTRIBUTE_LABELS[category]}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "فشلت الإضافة — يرجى التأكد من اتصال قاعدة البيانات.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
      <h2 className="font-bold text-foreground text-base">{ATTRIBUTE_LABELS[category]}</h2>

      {editable && (
        <form onSubmit={submit} className="mt-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`إضافة قيمة جديدة إلى ${ATTRIBUTE_LABELS[category]}...`}
            className="flex-1 h-10 px-3.5 rounded-xl bg-background border border-input text-sm focus:ring-2 focus:ring-accent outline-none text-foreground"
          />
          <button
            type="submit"
            disabled={busy}
            className="h-10 px-4 rounded-xl bg-accent text-accent-foreground font-bold disabled:opacity-60 hover:opacity-90 shadow-sm transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
          </button>
        </form>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {loading ? (
          <span className="text-xs text-muted-foreground">جاري التحميل...</span>
        ) : values.length === 0 ? (
          <span className="text-xs text-muted-foreground">لا توجد عناصر مضافة بعد.</span>
        ) : (
          values.map((v) => {
            const row = rows.find((r) => r.value === v);
            return (
              <span
                key={v}
                className="inline-flex items-center gap-1.5 text-xs font-semibold pr-3 pl-1.5 py-1 rounded-full bg-secondary border border-border text-foreground"
              >
                {v}
                {editable && row && (
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await remove(row.id);
                        toast.success("تم الحذف بنجاح");
                      } catch (err) {
                        toast.error(err instanceof Error ? err.message : "فشل الحذف");
                      }
                    }}
                    className="p-0.5 rounded-full hover:bg-destructive/15 hover:text-destructive cursor-pointer"
                    aria-label={`حذف ${v}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </span>
            );
          })
        )}
      </div>
      {rows.length === 0 && values.length > 0 && (
        <p className="mt-3 text-[11px] text-muted-foreground flex items-center gap-1">
          <Trash2 className="h-3 w-3" /> يتم عرض القيم الافتراضية النظامية — يمكنك تخصيصها وحفظها بشكل دائم في السحابة.
        </p>
      )}
    </div>
  );
}
