import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/AdminLayout";
import { ErrorState } from "@/components/StateViews";

import { useDealership, formatPrice } from "@/context/DealershipContext";
import type { Car } from "@/data/initialCars";

export const Route = createFileRoute("/admin/cars")({
  head: () => ({
    meta: [
      { title: "Manage Inventory — Admin" },
      { name: "description", content: "Add, edit, and remove cars from your inventory." },
      { property: "og:title", content: "Manage Inventory — Admin" },
      { property: "og:description", content: "Add, edit, and remove cars from your inventory." },
    ],
  }),
  component: ManageCars,
});

type FormState = Omit<Car, "id">;

const empty: FormState = {
  title: "", make: "", model: "", year: new Date().getFullYear(), price: 0, mileage: 0,
  category: "Sedan", engine: "", transmission: "Automatic", condition: "Used - Excellent",
  description: "", images: [], featured: false,
};

function ManageCars() {
  const { cars, addCar, updateCar, deleteCar, loadingCars, error, refresh } = useDealership();
  const [modal, setModal] = useState<null | { mode: "add" } | { mode: "edit"; id: string }>(null);
  const [saving, setSaving] = useState(false);
  const editing = modal?.mode === "edit" ? cars.find((c) => c.id === modal.id) : null;



  return (
    <AdminLayout>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Inventory</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {loadingCars ? "Loading…" : `${cars.length} vehicles in stock`}
          </p>

        </div>
        <button
          onClick={() => setModal({ mode: "add" })}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Add New Car
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
              <thead className="bg-muted/50 text-left text-muted-foreground">
                <tr>
                  <th className="p-3 font-semibold">Car</th>
                  <th className="p-3 font-semibold">Year</th>
                  <th className="p-3 font-semibold">Price</th>
                  <th className="p-3 font-semibold">Mileage</th>
                  <th className="p-3 font-semibold">Category</th>
                  <th className="p-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingCars && (
                  <tr><td colSpan={6} className="p-10 text-center text-muted-foreground">Loading inventory…</td></tr>
                )}
                {!loadingCars && cars.length === 0 && (
                  <tr><td colSpan={6} className="p-10 text-center text-muted-foreground">No cars yet — add your first vehicle.</td></tr>
                )}
                {cars.map((c) => (
                  <tr key={c.id} className="border-t border-border">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img src={c.images[0]} alt="" className="h-12 w-16 rounded-md object-cover bg-muted" />
                        <div className="font-medium">{c.title}</div>
                      </div>
                    </td>
                    <td className="p-3">{c.year}</td>
                    <td className="p-3 font-semibold text-accent">{formatPrice(c.price)}</td>
                    <td className="p-3">{c.mileage.toLocaleString()} mi</td>
                    <td className="p-3">{c.category}</td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setModal({ mode: "edit", id: c.id })}
                          className="p-2 rounded-md hover:bg-secondary"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={async () => {
                            if (!confirm(`Delete ${c.title}?`)) return;
                            try {
                              await deleteCar(c.id);
                              toast.success("Car deleted");
                            } catch (err) {
                              toast.error(err instanceof Error ? err.message : "Delete failed");
                            }
                          }}
                          className="p-2 rounded-md hover:bg-destructive/10 text-destructive"
                          aria-label="Delete"
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
                toast.success("Car updated");
              } else {
                await addCar(data);
                toast.success("Car added — it's live on the site");
              }
              setModal(null);
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Save failed");
            } finally {
              setSaving(false);
            }
          }}
          title={modal.mode === "edit" ? "Edit Car" : "Add New Car"}
        />
      )}

    </AdminLayout>
  );
}

function CarModal({ initial, onClose, onSubmit, title, saving }: { initial: FormState; onClose: () => void; onSubmit: (d: FormState) => void; title: string; saving?: boolean }) {
  const [f, setF] = useState<FormState>(initial);
  const [imageInput, setImageInput] = useState(initial.images.join("\n"));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const images = imageInput.split(/\n+/).map((s) => s.trim()).filter(Boolean);
    if (!f.title || !f.make || images.length === 0) {
      toast.error("Title, make and at least one image are required.");
      return;
    }
    onSubmit({ ...f, images });
  };

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((s) => ({ ...s, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto">
      <form onSubmit={submit} className="bg-card w-full max-w-2xl rounded-2xl shadow-elegant my-8">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-xl font-bold">{title}</h2>
          <button type="button" onClick={onClose} className="p-2 rounded-md hover:bg-secondary" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5 grid gap-4 sm:grid-cols-2">
          <Field label="Title" value={f.title} onChange={(v) => set("title", v)} />
          <Field label="Category" value={f.category} onChange={(v) => set("category", v)} />
          <Field label="Make" value={f.make} onChange={(v) => set("make", v)} />
          <Field label="Model" value={f.model} onChange={(v) => set("model", v)} />
          <Field label="Year" type="number" value={String(f.year)} onChange={(v) => set("year", Number(v))} />
          <Field label="Price (USD)" type="number" value={String(f.price)} onChange={(v) => set("price", Number(v))} />
          <Field label="Mileage" type="number" value={String(f.mileage)} onChange={(v) => set("mileage", Number(v))} />
          <Field label="Engine" value={f.engine} onChange={(v) => set("engine", v)} />
          <Field label="Transmission" value={f.transmission} onChange={(v) => set("transmission", v)} />
          <Field label="Condition" value={f.condition} onChange={(v) => set("condition", v)} />
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-muted-foreground">Description</label>
            <textarea
              rows={3}
              value={f.description}
              onChange={(e) => set("description", e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md bg-background border border-input text-sm resize-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-muted-foreground">Image URLs (one per line)</label>
            <textarea
              rows={4}
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="mt-1 w-full px-3 py-2 rounded-md bg-background border border-input text-sm resize-none font-mono"
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!f.featured} onChange={(e) => set("featured", e.target.checked)} />
            Featured on homepage
          </label>
        </div>
        <div className="flex justify-end gap-2 p-5 border-t border-border">
          <button type="button" onClick={onClose} className="h-10 px-4 rounded-md border border-input text-sm font-medium hover:bg-secondary">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 disabled:opacity-60">
            {saving ? "Saving…" : "Save"}
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
