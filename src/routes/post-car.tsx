import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Megaphone, Loader2, CheckCircle2, LogIn, Clock, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/PublicLayout";
import { MediaUploader } from "@/components/MediaUploader";
import { useDealership } from "@/context/DealershipContext";
import { useUserAuth } from "@/context/UserAuthContext";
import { useAttributes } from "@/lib/attributes";
import { WILAYAS, GHARDAIA_COMMUNES } from "@/data/wilayas";

export const Route = createFileRoute("/post-car")({
  head: () => ({
    meta: [
      { title: "انشر إعلان سيارتك — MZAB MOTORS" },
      {
        name: "description",
        content: "انشر إعلان بيع سيارتك مجاناً وتواصل مع المشترين مباشرة عبر منصة مزاب موتورز.",
      },
    ],
  }),
  component: PostCarPage,
});

function PostCarPage() {
  const { isLoggedIn, loading: authLoading, profile, userId } = useUserAuth();
  const { addCar } = useDealership();
  const navigate = useNavigate();
  const makes = useAttributes("make");
  const categories = useAttributes("category");
  const transmissions = useAttributes("transmission");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [wilaya, setWilaya] = useState("غرداية");
  const [commune, setCommune] = useState("");
  const [phone, setPhone] = useState("");
  const [agreeOwnership, setAgreeOwnership] = useState(false);
  const [agreeAccuracy, setAgreeAccuracy] = useState(false);
  const [agreeLiability, setAgreeLiability] = useState(false);
  const [agreeConsequences, setAgreeConsequences] = useState(false);

  const allAgreed =
    agreeOwnership && agreeAccuracy && agreeLiability && agreeConsequences;

  useEffect(() => {
    if (profile?.phone && !phone) setPhone(profile.phone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.phone]);

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
            تحتاج تسجّل دخول أو تنشئ حساب عشان تنشر إعلان سيارتك.
          </p>
          <Link
            to="/login"
            className="mt-5 inline-block h-11 px-6 leading-[44px] rounded-xl bg-gradient-accent text-accent-foreground font-bold"
          >
            تسجيل الدخول / إنشاء حساب
          </Link>
        </div>
      </PublicLayout>
    );
  }

  if (!profile?.isApproved) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-md px-4 py-20 text-center">
          <div className="mx-auto h-14 w-14 grid place-items-center rounded-2xl bg-amber-500/15">
            <Clock className="h-7 w-7 text-amber-500" />
          </div>
          <h1 className="mt-4 text-xl font-bold">حسابك بانتظار موافقة الإدارة</h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            راجعنا كل حساب جديد قبل السماح له بنشر إعلانات، لمنع الإعلانات
            الوهمية. عادةً ما تأخذ الموافقة وقتاً قصيراً. جرّب مرة أخرى بعد
            قليل.
          </p>
          <Link
            to="/"
            className="mt-5 inline-block h-11 px-6 leading-[44px] rounded-xl bg-secondary font-semibold text-sm"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("أضف صورة واحدة على الأقل للسيارة");
      return;
    }
    if (!phone.trim()) {
      toast.error("رقم الهاتف إجباري حتى يقدر المشتري يتواصل معك");
      return;
    }
    if (!allAgreed) {
      toast.error("يجب الموافقة على جميع الإقرارات قبل نشر الإعلان");
      return;
    }
    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "").trim();

    setSubmitting(true);
    try {
      await addCar({
        title: get("title"),
        make: get("make"),
        model: get("model"),
        year: Number(get("year")),
        price: Number(get("price")),
        mileage: Number(get("mileage")) || 0,
        category: get("category"),
        engine: get("engine"),
        transmission: get("transmission"),
        condition: get("condition"),
        description: get("description"),
        images,
        featured: false,
        status: "PendingReview",
        sellerId: userId ?? undefined,
        sellerName: profile?.fullName || "",
        sellerPhone: phone.trim(),
        wilaya,
        commune,
        termsAcceptedAt: new Date().toISOString(),
      });
      setSubmitted(true);
      toast.success(
        "تم استلام إعلانك! راح يظهر بالموقع بعد مراجعة سريعة من فريقنا.",
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّر نشر الإعلان");
    } finally {
      setSubmitting(false);
    }
  };

  const input =
    "w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent";

  if (submitted) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-md px-4 py-24 text-center">
          <CheckCircle2 className="h-14 w-14 mx-auto text-accent" />
          <h1 className="mt-4 text-xl font-bold">تم استلام إعلانك بنجاح!</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            سيراجع فريقنا الإعلان قريباً، وبمجرد الموافقة راح يظهر للجميع
            بالموقع.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/my-listings"
              className="h-11 px-5 leading-[44px] rounded-xl border border-input font-semibold text-sm"
            >
              إعلاناتي
            </Link>
            <Link
              to="/"
              className="h-11 px-5 leading-[44px] rounded-xl bg-gradient-accent text-accent-foreground font-bold text-sm"
            >
              الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-accent/15 grid place-items-center">
            <Megaphone className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">انشر إعلان سيارتك</h1>
            <p className="text-sm text-muted-foreground">
              مجاناً — إعلانك يظهر بعد مراجعة سريعة من فريقنا لمنع الإعلانات
              الوهمية.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card space-y-4">
            <h2 className="font-bold">صور السيارة</h2>
            <MediaUploader images={images} onChange={setImages} />
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-card grid gap-4 sm:grid-cols-2">
            <h2 className="font-bold sm:col-span-2">بيانات السيارة</h2>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                عنوان الإعلان
              </label>
              <input
                name="title"
                required
                placeholder="مثال: بيجو 208 موديل 2021 حالة ممتازة"
                className={input}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                الماركة
              </label>
              <input
                name="make"
                required
                list="dl-post-make"
                className={input}
              />
              <datalist id="dl-post-make">
                {makes.values.map((v) => (
                  <option key={v} value={v} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                الموديل
              </label>
              <input name="model" required className={input} />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                سنة الصنع
              </label>
              <input
                name="year"
                type="number"
                required
                min={1980}
                max={new Date().getFullYear() + 1}
                className={input}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                السعر (د.ج)
              </label>
              <input
                name="price"
                type="number"
                required
                min={0}
                className={input}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                الممشى (كم)
              </label>
              <input name="mileage" type="number" min={0} className={input} />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                نوع الهيكل
              </label>
              <input
                name="category"
                list="dl-post-category"
                className={input}
              />
              <datalist id="dl-post-category">
                {categories.values.map((v) => (
                  <option key={v} value={v} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                ناقل الحركة
              </label>
              <input
                name="transmission"
                list="dl-post-transmission"
                className={input}
              />
              <datalist id="dl-post-transmission">
                {transmissions.values.map((v) => (
                  <option key={v} value={v} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                المحرك
              </label>
              <input
                name="engine"
                placeholder="مثال: 1.6L بنزين"
                className={input}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                الحالة العامة
              </label>
              <input
                name="condition"
                placeholder="مثال: مستعملة - ممتازة"
                className={input}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                الوصف
              </label>
              <textarea
                name="description"
                rows={4}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm resize-none"
              />
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-card grid gap-4 sm:grid-cols-2">
            <h2 className="font-bold sm:col-span-2">الموقع والتواصل</h2>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                الولاية
              </label>
              <select
                value={wilaya}
                onChange={(e) => setWilaya(e.target.value)}
                className={input}
              >
                {WILAYAS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                البلدية
              </label>
              <input
                value={commune}
                onChange={(e) => setCommune(e.target.value)}
                list="dl-communes"
                placeholder="مثال: القرارة"
                className={input}
              />
              {wilaya === "غرداية" && (
                <datalist id="dl-communes">
                  {GHARDAIA_COMMUNES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                رقم الهاتف <span className="text-destructive">*</span>
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                type="tel"
                placeholder="0555 12 34 56"
                className={input}
                dir="ltr"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                إجباري — هذا الرقم هو وسيلة المشتري الوحيدة للتواصل معك بخصوص
                هذا الإعلان.
              </p>
            </div>
          </div>

          {/* Legal declarations */}
          <div className="bg-card border border-destructive/30 rounded-2xl p-6 shadow-card space-y-4">
            <h2 className="font-bold flex items-center gap-2 text-destructive">
              <ShieldAlert className="h-5 w-5" /> إقرارات إجبارية قبل النشر
            </h2>

            <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/25 text-xs sm:text-sm text-destructive leading-relaxed font-semibold">
              تحذير: نشر إعلان عن سلعة مسروقة أو بدون إثباتات ملكية قانونية
              يُعرّضك للمساءلة القضائية وفق القانون الجزائري. نحتفظ بحق تزويد
              الجهات القضائية والأمنية بكل بياناتك (الاسم، رقم الهاتف، عنوان
              IP) عند الاشتباه أو ورود بلاغ رسمي بخصوص إعلانك.
            </div>

            <label className="flex items-start gap-2.5 text-xs sm:text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={agreeOwnership}
                onChange={(e) => setAgreeOwnership(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-accent shrink-0"
              />
              <span>
                أقرّ أن هذه السيارة ملكي الخاص، وغير مسروقة، وأني أملك جميع
                الأوراق القانونية (بطاقة رمادية وما شابه) التي تثبت ذلك.
              </span>
            </label>

            <label className="flex items-start gap-2.5 text-xs sm:text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={agreeAccuracy}
                onChange={(e) => setAgreeAccuracy(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-accent shrink-0"
              />
              <span>
                أقرّ أن كل المعلومات والصور المدخلة صحيحة وحقيقية ولا تحتوي
                على أي معلومات مضللة.
              </span>
            </label>

            <label className="flex items-start gap-2.5 text-xs sm:text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={agreeLiability}
                onChange={(e) => setAgreeLiability(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-accent shrink-0"
              />
              <span>
                أقرّ وأوافق أن أتحمّل وحدي المسؤولية القانونية الكاملة عن صحة
                وقانونية هذا الإعلان. أفهم أن MZAB MOTORS منصة وسيطة فقط بين
                البائع والمشتري، وليست طرفاً في عملية البيع، ولا تتحمّل أي
                مسؤولية عن صحة الملكية أو مطابقة السلعة للقانون أو أي نزاع
                ينشأ بين البائع والمشتري.
              </span>
            </label>

            <label className="flex items-start gap-2.5 text-xs sm:text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={agreeConsequences}
                onChange={(e) => setAgreeConsequences(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-accent shrink-0"
              />
              <span>
                أفهم أنه في حال مخالفة أي من الإقرارات أعلاه، يحق للموقع حذف
                الإعلان فوراً وتعليق/حذف حسابي دون إشعار مسبق، بالإضافة لحق
                الموقع في إبلاغ الجهات المختصة عند الاقتضاء.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting || !allAgreed}
            className="w-full h-12 rounded-xl bg-gradient-accent text-accent-foreground font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : !allAgreed ? (
              "وافق على الإقرارات أعلاه أولاً"
            ) : (
              "انشر الإعلان"
            )}
          </button>
        </form>
      </div>
    </PublicLayout>
  );
}
