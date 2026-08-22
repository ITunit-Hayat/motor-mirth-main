import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Tags, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/AdminLayout";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { ATTRIBUTE_LABELS, useAttributes, type AttributeCategory } from "@/lib/attributes";

export const Route = createFileRoute("/admin/attributes")({
  head: () => ({ meta: [{ title: "Makes, Colors & Attributes — Admin" }] }),
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
      <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
        <Tags className="h-6 w-6 text-accent" /> Makes, Colors & Attributes
      </h1>
      <p className="text-muted-foreground text-sm mt-1">
        Manage the dropdown values used across the inventory form and the public site's search
        filters. Add a new brand or color here — no developer needed.
      </p>
      {!isSuperAdmin && (
        <p className="mt-2 text-xs text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2 inline-block">
          Sales Agents can view attributes but only Super Admins can add or remove them.
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
      toast.success(`Added to ${ATTRIBUTE_LABELS[category]}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Couldn't add — run the attributes migration first.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
      <h2 className="font-bold">{ATTRIBUTE_LABELS[category]}</h2>

      {editable && (
        <form onSubmit={submit} className="mt-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Add a new ${ATTRIBUTE_LABELS[category].toLowerCase().replace(/s$/, "")}…`}
            className="flex-1 h-10 px-3 rounded-md bg-background border border-input text-sm"
          />
          <button
            type="submit"
            disabled={busy}
            className="h-10 px-3 rounded-md bg-primary text-primary-foreground disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
          </button>
        </form>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {loading ? (
          <span className="text-xs text-muted-foreground">Loading…</span>
        ) : values.length === 0 ? (
          <span className="text-xs text-muted-foreground">Nothing here yet.</span>
        ) : (
          values.map((v) => {
            const row = rows.find((r) => r.value === v);
            return (
              <span
                key={v}
                className="inline-flex items-center gap-1 text-xs font-medium pl-2.5 pr-1 py-1 rounded-full bg-secondary border border-border"
              >
                {v}
                {editable && row && (
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await remove(row.id);
                      } catch (err) {
                        toast.error(err instanceof Error ? err.message : "Delete failed");
                      }
                    }}
                    className="p-0.5 rounded-full hover:bg-destructive/15 hover:text-destructive"
                    aria-label={`Remove ${v}`}
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
          <Trash2 className="h-3 w-3" /> Showing built-in defaults — run the attributes migration to
          make this list editable and site-wide.
        </p>
      )}
    </div>
  );
}
