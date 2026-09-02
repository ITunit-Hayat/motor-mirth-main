import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  User,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/AdminLayout";
import {
  useDealership,
  formatPrice,
  formatMiles,
} from "@/context/DealershipContext";

export const Route = createFileRoute("/admin/listings")({
  head: () => ({ meta: [{ title: "مراجعة إعلانات الأعضاء — الإدارة" }] }),
  component: ListingsReview,
});

function ListingsReview() {
  const { cars, updateCar, deleteCar, loadingCars } = useDealership();
  const pending = cars.filter((c) => c.status === "PendingReview");

  const approve = async (id: string) => {
    try {
      await updateCar(id, { status: "Active" });
      toast.success("تم قبول الإعلان — راح يظهر للجميع الآن");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّرت الموافقة");
    }
  };

  const reject = async (id: string, title: string) => {
    if (!confirm(`رفض وحذف إعلان "${title}"؟ لا يمكن التراجع.`)) return;
    try {
      await deleteCar(id);
      toast.success("تم رفض الإعلان وحذفه");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّر الحذف");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
        <Clock className="h-6 w-6 text-accent" /> مراجعة إعلانات الأعضاء
      </h1>
      <p className="text-muted-foreground text-sm mt-1">
        {loadingCars
          ? "جارٍ التحميل…"
          : `${pending.length} إعلان بانتظار المراجعة`}
      </p>

      {!loadingCars && pending.length === 0 ? (
        <div className="mt-10 bg-card border border-border rounded-2xl p-16 text-center shadow-card">
          <CheckCircle2 className="h-10 w-10 mx-auto text-accent" />
          <div className="mt-3 font-semibold">
            لا توجد إعلانات بانتظار المراجعة
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            كل إعلانات الأعضاء تمت مراجعتها.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {pending.map((c) => (
            <div
              key={c.id}
              className="bg-card border border-border rounded-2xl p-5 shadow-card"
            >
              <div className="flex gap-4 flex-wrap">
                <img
                  src={c.images[0]}
                  alt=""
                  className="h-28 w-40 rounded-lg object-cover bg-muted shrink-0"
                />
                <div className="flex-1 min-w-[240px]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-lg">{c.title}</h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full border font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30">
                      بانتظار المراجعة
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    {c.year} · {formatPrice(c.price)} · {formatMiles(c.mileage)}
                  </div>
                  <div className="mt-2 grid gap-1.5 sm:grid-cols-3 text-sm">
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />{" "}
                      {c.sellerName || "—"}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />{" "}
                      {c.sellerPhone || "—"}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />{" "}
                      {c.wilaya}
                      {c.commune ? ` — ${c.commune}` : ""}
                    </div>
                  </div>
                  {c.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {c.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => void approve(c.id)}
                  className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
                >
                  <CheckCircle2 className="h-4 w-4" /> قبول ونشر
                </button>
                <button
                  onClick={() => void reject(c.id, c.title)}
                  className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md border border-destructive/40 text-destructive text-sm font-semibold hover:bg-destructive/10"
                >
                  <XCircle className="h-4 w-4" /> رفض وحذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
