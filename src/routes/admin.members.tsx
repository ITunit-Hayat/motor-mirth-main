import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  MapPin,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";
import type { ProfileRow } from "@/lib/supabase";

export const Route = createFileRoute("/admin/members")({
  head: () => ({ meta: [{ title: "إدارة الأعضاء — لوحة الإدارة" }] }),
  component: MembersPage,
});

function MembersPage() {
  const [rows, setRows] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("تعذّر تحميل قائمة الأعضاء: " + error.message);
    } else {
      setRows((data ?? []) as ProfileRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const setApproval = async (id: string, approved: boolean) => {
    setBusyId(id);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_approved: approved })
        .eq("id", id);
      if (error) throw error;
      setRows((prev) =>
        prev.map((r) => (r.id === id ? { ...r, is_approved: approved } : r)),
      );
      toast.success(approved ? "تمت الموافقة على العضو" : "تم إلغاء صلاحية العضو");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّر تنفيذ الإجراء");
    } finally {
      setBusyId(null);
    }
  };

  const pending = rows.filter((r) => !r.is_approved);
  const approved = rows.filter((r) => r.is_approved);

  return (
    <AdminLayout>
      <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2.5">
        <Users className="h-6 w-6 text-accent" /> إدارة الأعضاء
      </h1>
      <p className="text-muted-foreground text-sm mt-1">
        العضو الجديد لا يقدر ينشر أي سيارة قبل ما توافق على حسابه هنا.
      </p>

      {/* Pending */}
      <div className="mt-6">
        <h2 className="text-sm font-bold text-muted-foreground flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-amber-500" /> بانتظار الموافقة (
          {loading ? "…" : pending.length})
        </h2>

        {!loading && pending.length === 0 ? (
          <div className="mt-3 bg-card border border-border rounded-2xl p-8 text-center shadow-card text-sm text-muted-foreground">
            لا يوجد أعضاء جدد بانتظار الموافقة حالياً.
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            {pending.map((m) => (
              <div
                key={m.id}
                className="bg-card border border-border rounded-2xl p-4 shadow-card flex flex-wrap items-center gap-4"
              >
                <div className="flex-1 min-w-[200px]">
                  <div className="font-bold">{m.full_name || "بدون اسم"}</div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" /> {m.phone || "—"}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {m.wilaya || "—"}
                      {m.commune ? ` — ${m.commune}` : ""}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={busyId === m.id}
                    onClick={() => void setApproval(m.id, true)}
                    className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 disabled:opacity-60"
                  >
                    <CheckCircle2 className="h-4 w-4" /> موافقة
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved */}
      <div className="mt-8">
        <h2 className="text-sm font-bold text-muted-foreground flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" /> أعضاء موافَق
          عليهم ({loading ? "…" : approved.length})
        </h2>

        {!loading && approved.length === 0 ? (
          <div className="mt-3 bg-card border border-border rounded-2xl p-8 text-center shadow-card text-sm text-muted-foreground">
            لا يوجد أعضاء موافَق عليهم بعد.
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            {approved.map((m) => (
              <div
                key={m.id}
                className="bg-card border border-border rounded-2xl p-4 shadow-card flex flex-wrap items-center gap-4"
              >
                <div className="flex-1 min-w-[200px]">
                  <div className="font-bold">{m.full_name || "بدون اسم"}</div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" /> {m.phone || "—"}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {m.wilaya || "—"}
                      {m.commune ? ` — ${m.commune}` : ""}
                    </span>
                  </div>
                </div>
                <button
                  disabled={busyId === m.id}
                  onClick={() => void setApproval(m.id, false)}
                  title="إلغاء صلاحية النشر عن هذا العضو"
                  className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md border border-destructive/40 text-destructive text-sm font-semibold hover:bg-destructive/10 disabled:opacity-60"
                >
                  <XCircle className="h-4 w-4" /> إلغاء الموافقة
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 text-xs text-muted-foreground flex items-center gap-1.5">
        <RotateCcw className="h-3.5 w-3.5" /> يتحدّث هنا فقط عند فتح الصفحة —
        أعد التحميل لرؤية أعضاء جدد سجّلوا للتو.
      </div>
    </AdminLayout>
  );
}
