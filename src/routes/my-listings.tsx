import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Megaphone,
  Trash2,
  CheckCircle2,
  Clock,
  LogIn,
  Eye,
  BadgeCheck,
} from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import {
  useDealership,
  formatPrice,
  formatMiles,
} from "@/context/DealershipContext";
import { useUserAuth } from "@/context/UserAuthContext";
import type { CarStatus } from "@/data/initialCars";

export const Route = createFileRoute("/my-listings")({
  head: () => ({ meta: [{ title: "إعلاناتي — VelocityMotors" }] }),
  component: MyListings,
});

const STATUS_LABEL: Record<CarStatus, string> = {
  Active: "منشور",
  Draft: "مسودة",
  Reserved: "محجوز",
  Sold: "مباع",
  PendingReview: "بانتظار المراجعة",
};
const STATUS_STYLE: Record<CarStatus, string> = {
  Active:
    "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  Draft: "bg-muted text-muted-foreground border-border",
  Reserved:
    "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  Sold: "bg-slate-500/15 text-slate-600 dark:text-slate-300 border-slate-500/30",
  PendingReview:
    "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
};

function MyListings() {
  const { isLoggedIn, loading: authLoading, userId } = useUserAuth();
  const { cars, updateCar, deleteCar, loadingCars } = useDealership();

  if (authLoading) {
    return (
      <PublicLayout>
        <div className="py-24 text-center text-muted-foreground">
          جارٍ التحميل…
        </div>
      </PublicLayout>
    );
  }

  if (!isLoggedIn) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-md px-4 py-20 text-center">
          <LogIn className="h-10 w-10 mx-auto text-accent" />
          <h1 className="mt-4 text-xl font-bold">سجّل الدخول أول</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            تحتاج تسجّل دخول عشان تشوف إعلاناتك.
          </p>
          <Link
            to="/login"
            className="mt-5 inline-block h-11 px-6 leading-[44px] rounded-xl bg-gradient-accent text-accent-foreground font-bold"
          >
            تسجيل الدخول
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const mine = cars.filter((c) => c.sellerId === userId);

  const markSold = async (id: string) => {
    try {
      await updateCar(id, { status: "Sold" });
      toast.success("تم تحديد السيارة كمباعة");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّر التحديث");
    }
  };

  const remove = async (id: string, title: string) => {
    if (!confirm(`حذف إعلان "${title}"؟ لا يمكن التراجع.`)) return;
    try {
      await deleteCar(id);
      toast.success("تم حذف الإعلان");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّر الحذف");
    }
  };

  return (
    <PublicLayout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold">إعلاناتي</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {loadingCars ? "جارٍ التحميل…" : `${mine.length} إعلان`}
            </p>
          </div>
          <Link
            to="/post-car"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-primary text-primary-foreground font-semibold text-sm"
          >
            <Megaphone className="h-4 w-4" /> نشر إعلان جديد
          </Link>
        </div>

        {!loadingCars && mine.length === 0 ? (
          <div className="mt-10 bg-card border border-border rounded-2xl p-16 text-center shadow-card">
            <Megaphone className="h-10 w-10 mx-auto text-muted-foreground" />
            <div className="mt-3 font-semibold">ما عندك أي إعلان بعد</div>
            <p className="mt-1 text-sm text-muted-foreground">
              انشر أول سيارة للبيع وابدأ توصل للمشترين.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {mine.map((c) => (
              <div
                key={c.id}
                className="bg-card border border-border rounded-2xl p-4 shadow-card flex gap-4 flex-wrap"
              >
                <img
                  src={c.images[0]}
                  alt=""
                  className="h-24 w-32 rounded-lg object-cover bg-muted shrink-0"
                />
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold">{c.title}</h3>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${STATUS_STYLE[c.status ?? "Active"]}`}
                    >
                      {STATUS_LABEL[c.status ?? "Active"]}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    {c.year} · {formatPrice(c.price)} · {formatMiles(c.mileage)}
                  </div>
                  {c.status === "PendingReview" && (
                    <p className="mt-1.5 text-xs text-blue-700 dark:text-blue-300 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> بانتظار مراجعة فريقنا — عادة
                      يتم خلال وقت قصير
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap self-center">
                  {c.status !== "PendingReview" && (
                    <Link
                      to="/cars/$id"
                      params={{ id: c.id }}
                      className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-input text-sm font-medium hover:bg-secondary"
                    >
                      <Eye className="h-3.5 w-3.5" /> عرض
                    </Link>
                  )}
                  {(c.status === "Active" || c.status === "Reserved") && (
                    <button
                      onClick={() => void markSold(c.id)}
                      className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> تحديد كمباعة
                    </button>
                  )}
                  <button
                    onClick={() => void remove(c.id, c.title)}
                    className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-destructive/40 text-destructive text-sm font-semibold hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex items-start gap-2 text-xs text-muted-foreground bg-secondary/60 rounded-xl p-4">
          <BadgeCheck className="h-4 w-4 shrink-0 mt-0.5" />
          كل إعلان جديد يمر بمراجعة سريعة من فريقنا قبل ما يظهر للجميع، لضمان
          جودة الإعلانات ومنع الإعلانات الوهمية.
        </div>
      </div>
    </PublicLayout>
  );
}
