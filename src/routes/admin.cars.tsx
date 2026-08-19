import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/AdminLayout";
import { ErrorState } from "@/components/StateViews";
import { useDealership, formatPrice } from "@/context/DealershipContext";
import { useLanguage } from "@/context/LanguageContext";
import type { Car } from "@/data/initialCars";

export const Route = createFileRoute("/admin/cars")({
  component: ManageCars,
});

type FormState = Omit<Car, "id">;

const empty: FormState = {
  title: "", make: "", model: "", year: new Date().getFullYear(), price: 0, mileage: 0,
  category: "Sedan", engine: "", transmission: "Automatic", condition: "Used - Excellent",
  description: "", images: [], featured: false,
};

function ManageCars() {
  const { t } = useLanguage();
  const { cars, addCar, updateCar, deleteCar, loadingCars, error, refresh } = useDealership();
  const [modal, setModal] = useState<null | { mode: "add" } | { mode: "edit"; id: string }>(null);
  const [saving, setSaving] = useState(false);
  const editing = modal?.mode === "edit" ? cars.find((c) => c.id === modal.id) : null;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{t("adminInventory")}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {loadingCars ? t("adminCarsLoading") : `${cars.length} ${t("adminCarsInStock")}`}
          </p>
        </div>
        <button
          onClick={() => setModal({ mode: "add" })}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
        >
          <Plus className="h-4 w-4" /> {t("addNewCar")}
        </button>
      </div>

      {error ? (
        <div className="mt-6">
          <ErrorState message={error} onRetry={() => void refresh()} />
        </div>
      ) : (
        <div className="mt-6 bg-card border border-border rounded-2xl overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-start text-muted-foreground">
                <tr>
                  <th className="p-3 font-semibold text-start">{t("adminThCar")}</th>
                  <th className="p-3 font-semibold text-start">{t("adminThYear")}</th>
                  <th className="p-3 font-semibold text-start">{t("adminThPrice")}</th>
                  <th className="p-3 font-semibold text-start">{t("adminThMileage")}</th>
                  <th className="p-3 font-semibold text-start">{t("adminThCategory")}</th>
                  <th className="p-3 font-semibold text-end">{t("adminThActions")}</th>
                </tr>
              </thead>
              <tbody>
                {loadingCars && (
                  <tr><td colSpan={6} className="p-10 text-center text-muted-foreground">{t("adminCarsLoading")}</td></tr>
                )}
                {!loadingCars && cars.length === 0 && (
                  <tr><td colSpan={6} className="p-10 text-center text-muted-foreground">{t("adminNoCars")}</td></tr>
                )}
                {cars.map((c) => (
                  <tr key={c.id} className="border-t border-border">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img src={c.images[0]} alt="" className="h-12 w-16 rounded-md object-cover bg-muted shrink-0" />
                        <div className="font-medium">{c.title}</div>
                      </div>
                    </td>
                    <td className="p-3">{c.year}</td>
                    <td className="p-3 font-semibold text-accent">{formatPrice(c.price)}</td>
                    <td className="p-3">{c.mileage.toLocaleString()} mi</td>
                    <td className="p-3">{c.category}</td>
                    <td className="p-3 text-end">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setModal({ mode: "edit", id: c.id })}
                          className="p-2 rounded-md hover:bg-secondary"
                          aria-label={t("editCar")}
                          title={t("editCar")}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={async () => {
                            if (!confirm(t("adminConfirmDelete"))) return;
                            try {
                              await deleteCar(c.id);
                              toast.success(t("adminDeletedSuccess"));
                            } catch (err) {
                              toast.error(err instanceof Error ? err.message : "Delete failed");
                            }
                          }}
                          className="p-2 rounded-md hover:bg-destructive/10 text-destructive"
                          aria-label={t("deleteCar")}
                          title={t("deleteCar")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modal && (
        <CarModal
          initial={editing ? { ...editing } : empty}
          saving={saving}
          onClose={() => setModal(null)}
          onSubmit={async (data) => {
            setSaving(true);
            try {
              if (modal.mode === "edit") {
                await updateCar(modal.id, data);
                toast.success(t("adminSavedSuccess"));
              } else {
                await addCar(data);
                toast.success(t("adminSavedSuccess"));
              }
              setModal(null);
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Save failed");
            } finally {
              setSaving(false);
            }
          }}
          title={modal.mode === "edit" ? t("adminModalEdit") : t("adminModalAdd")}
        />
      )}
    </AdminLayout>
  );
}

function CarModal({ initial, onClose, onSubmit, title, saving }: { initial: FormState; onClose: () => void; onSubmit: (d: FormState) => void; title: string; saving?: boolean }) {
  const { t } = useLanguage();
  const [f, setF] = useState<FormState>(initial);
  const [imageInput, setImageInput] = useState(initial.images.join("\n"));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const images = imageInput.split(/\n+/).map((s) => s.trim()).filter(Boolean);
    if (!f.title || !f.make || images.length === 0) {
      toast.error(t("contactFillAll"));
      return;
    }
    onSubmit({ ...f, images });
  };

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((s) => ({ ...s, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto">
      <form onSubmit={submit} className="bg-card w-full max-w-2xl rounded-2xl shadow-elegant my-8 border border-border">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-xl font-bold">{title}</h2>
          <button type="button" onClick={onClose} className="p-2 rounded-md hover:bg-secondary" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5 grid gap-4 sm:grid-cols-2">
          <Field label={t("adminFieldTitle")} value={f.title} onChange={(v) => set("title", v)} />
          <Field label={t("adminFieldCat")} value={f.category} onChange={(v) => set("category", v)} />
          <Field label={t("adminFieldMake")} value={f.make} onChange={(v) => set("make", v)} />
          <Field label={t("adminFieldModel")} value={f.model} onChange={(v) => set("model", v)} />
          <Field label={t("adminFieldYear")} type="number" value={String(f.year)} onChange={(v) => set("year", Number(v))} />
          <Field label={t("adminFieldPrice")} type="number" value={String(f.price)} onChange={(v) => set("price", Number(v))} />
          <Field label={t("adminFieldMileage")} type="number" value={String(f.mileage)} onChange={(v) => set("mileage", Number(v))} />
          <Field label={t("adminFieldEngine")} value={f.engine} onChange={(v) => set("engine", v)} />
          <Field label={t("adminFieldTrans")} value={f.transmission} onChange={(v) => set("transmission", v)} />
          <Field label={t("adminFieldCond")} value={f.condition} onChange={(v) => set("condition", v)} />
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-muted-foreground">{t("adminFieldDesc")}</label>
            <textarea
              rows={3}
              value={f.description}
              onChange={(e) => set("description", e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md bg-background border border-input text-sm resize-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-muted-foreground">{t("adminFieldImgs")}</label>
            <textarea
              rows={4}
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="mt-1 w-full px-3 py-2 rounded-md bg-background border border-input text-sm resize-none font-mono"
            />
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input type="checkbox" checked={!!f.featured} onChange={(e) => set("featured", e.target.checked)} className="rounded" />
            {t("adminFieldFeatured")}
          </label>
        </div>
        <div className="flex justify-end gap-2 p-5 border-t border-border">
          <button type="button" onClick={onClose} className="h-10 px-4 rounded-md border border-input text-sm font-medium hover:bg-secondary transition">
            {t("adminBtnCancel")}
          </button>
          <button type="submit" disabled={saving} className="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition">
            {saving ? t("adminBtnSaving") : t("adminBtnSave")}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full h-10 px-3 rounded-md bg-background border border-input text-sm"
      />
    </div>
  );
}
