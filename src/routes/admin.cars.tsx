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

function ManageCars() {
  const { cars, addCar, updateCar, deleteCar, loadingCars, error, refresh } = useDealership();
  const { isSuperAdmin } = useAdminAuth();
  const [modal, setModal] = useState<null | { mode: "add" } | { mode: "edit"; id: string }>(null);
  const [saving, setSaving] = useState(false);
  const editing = modal?.mode === "edit" ? cars.find((c) => c.id === modal.id) : null;

  const setReserved = async (c: Car, reserved: boolean) => {
    try {
      await updateCar(c.id, { status: reserved ? "Reserved" : "Active" });
      toast.success(reserved ? "Marked as Reserved" : "Reservation cleared");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Inventory</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {loadingCars ? "Loading…" : `${cars.length} vehicles in stock`}
            {!isSuperAdmin && " · Sales Agent view — you can mark cars Reserved"}
          </p>
        </div>
        {isSuperAdmin && (
          <button
            onClick={() => setModal({ mode: "add" })}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Add New Car
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
              <thead className="bg-muted/50 text-left text-muted-foreground">
                <tr>
                  <th className="p-3 font-semibold">Car</th>
                  <th className="p-3 font-semibold">Year</th>
                  <th className="p-3 font-semibold">Price</th>
                  <th className="p-3 font-semibold">Mileage</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingCars && (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-muted-foreground">
                      Loading inventory…
                    </td>
                  </tr>
                )}
                {!loadingCars && cars.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-muted-foreground">
                      No cars yet — add your first vehicle.
                    </td>
                  </tr>
                )}
                {cars.map((c) => {
                  const status = c.status ?? "Active";
                  return (
                    <tr key={c.id} className="border-t border-border">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={c.images[0]}
                            alt=""
                            className="h-12 w-16 rounded-md object-cover bg-muted"
                          />
                          <div className="font-medium">{c.title}</div>
                        </div>
                      </td>
                      <td className="p-3">{c.year}</td>
                      <td className="p-3 font-semibold text-accent">{formatPrice(c.price)}</td>
                      <td className="p-3">{c.mileage.toLocaleString()} mi</td>
                      <td className="p-3">
                        {isSuperAdmin ? (
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${STATUS_STYLES[status]}`}
                          >
                            {status}
                          </span>
                        ) : (
                          <label className="inline-flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={status === "Reserved"}
                              disabled={status === "Sold"}
                              onChange={(e) => void setReserved(c, e.target.checked)}
                            />
                            <span
                              className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${STATUS_STYLES[status]}`}
                            >
                              {status}
                            </span>
                          </label>
                        )}
                      </td>
                      <td className="p-3">
                        {isSuperAdmin ? (
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
                        ) : (
                          <div
                            className="flex items-center justify-end text-muted-foreground"
                            title="Only Super Admins can edit or delete cars"
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

const STATUS_OPTIONS: { value: CarStatus; label: string; hint: string }[] = [
  { value: "Active", label: "Active", hint: "Visible to visitors" },
  { value: "Draft", label: "Draft", hint: "Hidden while you prep it" },
  { value: "Reserved", label: "Reserved", hint: "Visible, marked Reserved" },
  { value: "Sold", label: "Sold", hint: "Visible with a Sold badge" },
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
      toast.error("Title, make and at least one photo are required.");
      return;
    }
    onSubmit(f);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto">
      <form onSubmit={submit} className="bg-card w-full max-w-2xl rounded-2xl shadow-elegant my-8">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-md hover:bg-secondary"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5">
          <Tabs defaultValue="basic">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="specs">Specs</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="media">Photos</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="grid gap-4 sm:grid-cols-2 pt-4">
              <Field label="Title" value={f.title} onChange={(v) => set("title", v)} />
              <DatalistField
                label="Body type"
                value={f.category}
                onChange={(v) => set("category", v)}
                options={categories.values}
              />
              <DatalistField
                label="Make"
                value={f.make}
                onChange={(v) => set("make", v)}
                options={makes.values}
              />
              <Field label="Model" value={f.model} onChange={(v) => set("model", v)} />
              <Field
                label="Year"
                type="number"
                value={String(f.year)}
                onChange={(v) => set("year", Number(v))}
              />
              <Field
                label="Price (USD)"
                type="number"
                value={String(f.price)}
                onChange={(v) => set("price", Number(v))}
              />
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground">Status</label>
                <div className="mt-1 grid grid-cols-4 gap-1.5">
                  {STATUS_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => set("status", o.value)}
                      title={o.hint}
                      className={`h-10 rounded-md border text-xs font-semibold transition ${
                        (f.status ?? "Active") === o.value
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-input hover:bg-secondary"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground">Description</label>
                <textarea
                  rows={3}
                  value={f.description}
                  onChange={(e) => set("description", e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-md bg-background border border-input text-sm resize-none"
                />
              </div>
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <input
                  type="checkbox"
                  checked={!!f.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                />
                Featured on homepage
              </label>
            </TabsContent>

            <TabsContent value="specs" className="grid gap-4 sm:grid-cols-2 pt-4">
              <Field
                label="Engine (e.g. 3.0L Twin-Turbo I6)"
                value={f.engine}
                onChange={(v) => set("engine", v)}
              />
              <DatalistField
                label="Fuel / Engine type"
                value={f.fuel ?? ""}
                onChange={(v) => set("fuel", v)}
                options={engineTypes.values}
              />
              <DatalistField
                label="Transmission"
                value={f.transmission}
                onChange={(v) => set("transmission", v)}
                options={transmissions.values}
              />
              <DatalistField
                label="Color"
                value={f.color ?? ""}
                onChange={(v) => set("color", v)}
                options={colors.values}
              />
              <Field
                label="Cylinders"
                type="number"
                value={String(f.cylinders ?? 0)}
                onChange={(v) => set("cylinders", Number(v))}
              />
              <Field
                label="Discount %"
                type="number"
                value={String(f.discount ?? 0)}
                onChange={(v) => set("discount", Number(v))}
              />
            </TabsContent>

            <TabsContent value="history" className="grid gap-4 sm:grid-cols-2 pt-4">
              <Field
                label="Mileage"
                type="number"
                value={String(f.mileage)}
                onChange={(v) => set("mileage", Number(v))}
              />
              <Field label="Condition" value={f.condition} onChange={(v) => set("condition", v)} />
              <Field
                label="Previous owners"
                type="number"
                value={String(f.previousOwners ?? 0)}
                onChange={(v) => set("previousOwners", Number(v))}
              />
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  Inspection report notes
                </label>
                <textarea
                  rows={4}
                  value={f.inspectionReport ?? ""}
                  onChange={(e) => set("inspectionReport", e.target.value)}
                  placeholder="Passed 150-point inspection on 2026-05-12. No accidents on record…"
                  className="mt-1 w-full px-3 py-2 rounded-md bg-background border border-input text-sm resize-none"
                />
              </div>
            </TabsContent>

            <TabsContent value="media" className="pt-4">
              <MediaUploader images={f.images} onChange={(images) => set("images", images)} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-2 p-5 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-4 rounded-md border border-input text-sm font-medium hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
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
        className="mt-1 w-full h-10 px-3 rounded-md bg-background border border-input text-sm"
      />
      <datalist id={listId}>
        {options.map((o) => (
          <option key={o} value={o} />
        ))}
      </datalist>
    </div>
  );
}
