import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  Save,
  Car,
  FileText,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/PublicLayout";
import { useUserAuth } from "@/context/UserAuthContext";
import { useDealership } from "@/context/DealershipContext";
import { PhoneInput } from "@/components/PhoneInput";
import { WILAYAS, GHARDAIA_COMMUNES } from "@/data/wilayas";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  validateSearch: (search: Record<string, unknown>) => ({
    tab: typeof search.tab === "string" ? search.tab : undefined,
  }),
  head: () => ({
    meta: [
      { title: "معلومات الحساب والأمان — MZAB MOTORS" },
      {
        name: "description",
        content: "إدارة بيانات حسابك، معلومات الاتصال، وتغيير كلمة المرور في منصة مزاب موتورز.",
      },
    ],
  }),
  component: AccountPage,
});

type TabType = "profile" | "security" | "listings";

function AccountPage() {
  const {
    isLoggedIn,
    loading: authLoading,
    email,
    profile,
    updateProfile,
    changePassword,
    updatePassword,
    signOut,
    isPasswordRecovery,
    setIsPasswordRecovery,
    resetPasswordForEmail,
  } = useUserAuth();

  const { cars } = useDealership();
  const navigate = useNavigate();
  const search = Route.useSearch();

  const [activeTab, setActiveTab] = useState<TabType>(() => {
    if (search.tab === "security" || search.tab === "listings" || search.tab === "profile") {
      return search.tab;
    }
    return "profile";
  });

  useEffect(() => {
    if (search.tab === "security" || search.tab === "listings" || search.tab === "profile") {
      setActiveTab(search.tab);
    }
  }, [search.tab]);

  // Profile Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("غرداية");
  const [commune, setCommune] = useState("القرارة");
  const [savingProfile, setSavingProfile] = useState(false);

  // Change Password Form state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // Recovery Password Form state
  const [recoveryPassword, setRecoveryPassword] = useState("");
  const [recoveryConfirm, setRecoveryConfirm] = useState("");
  const [showRecoveryPass, setShowRecoveryPass] = useState(false);
  const [savingRecoveryPass, setSavingRecoveryPass] = useState(false);

  // Populate profile fields when profile loads
  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || "");
      setPhone(profile.phone || "");
      setWilaya(profile.wilaya || "غرداية");
      setCommune(profile.commune || "القرارة");
    }
  }, [profile]);

  // Filter cars for this user
  const currentUid = profile?.id || "";
  const userCars = cars.filter(
    (c) => c.sellerId && (c.sellerId === currentUid || c.sellerPhone === profile?.phone)
  );
  const activeCount = userCars.filter((c) => c.status === "Active").length;
  const pendingCount = userCars.filter((c) => c.status === "PendingReview").length;

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      toast.error("يرجى إدخال الاسم الكامل");
      return;
    }
    setSavingProfile(true);
    try {
      const res = await updateProfile({
        fullName: fullName.trim(),
        phone: phone.trim(),
        wilaya: wilaya.trim(),
        commune: commune.trim(),
      });
      if (!res.ok) {
        toast.error(res.error || "تعذر حفظ معلومات الحساب");
      } else {
        toast.success("تم تحديث معلومات الحساب بنجاح!");
      }
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword.trim()) {
      toast.error("يرجى إدخال كلمة المرور القديمة أولاً للتحقق من هويتك.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("كلمة المرور الجديدة يجب أن لا تقل عن 6 أحرف أو أرقام.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("كلمة المرور الجديدة وتأكيدها غير متطابقين.");
      return;
    }
    if (oldPassword === newPassword) {
      toast.error("كلمة المرور الجديدة مطابقة للقديمة. يرجى اختيار كلمة مرور جديدة.");
      return;
    }

    setUpdatingPassword(true);
    try {
      const res = await changePassword(oldPassword, newPassword);
      if (!res.ok) {
        toast.error(res.error || "تعذر تغيير كلمة المرور.");
      } else {
        toast.success("تم تغيير كلمة المرور بنجاح وبأمان!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (recoveryPassword.length < 6) {
      toast.error("كلمة المرور الجديدة يجب أن لا تقل عن 6 خانات.");
      return;
    }
    if (recoveryPassword !== recoveryConfirm) {
      toast.error("كلمة المرور وتأكيدها غير متطابقين.");
      return;
    }

    setSavingRecoveryPass(true);
    try {
      const res = await updatePassword(recoveryPassword);
      if (!res.ok) {
        toast.error(res.error || "تعذر تحديث كلمة المرور.");
      } else {
        toast.success("تم تعيين كلمة المرور الجديدة بنجاح! تم تسجيل دخولك.");
        setIsPasswordRecovery(false);
        setActiveTab("profile");
      }
    } finally {
      setSavingRecoveryPass(false);
    }
  };

  const handleForgotPasswordEmail = async () => {
    if (!email) {
      toast.error("البريد الإلكتروني غير متوفر.");
      return;
    }
    try {
      toast.loading("جارٍ إرسال رابط الاستعادة إلى بريدك...");
      const res = await resetPasswordForEmail(email);
      toast.dismiss();
      if (!res.ok) {
        toast.error(res.error || "تعذر إرسال الرابط.");
      } else {
        toast.success(`تم إرسال رابط تأكيد وتعيين كلمة المرور إلى ${email}! تفقد بريدك الإلكتروني.`);
      }
    } catch {
      toast.dismiss();
      toast.error("حدث خطأ أثناء إرسال البريد.");
    }
  };

  if (authLoading) {
    return (
      <PublicLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <p className="text-sm text-muted-foreground">جارٍ تحميل معلومات الحساب...</p>
        </div>
      </PublicLayout>
    );
  }

  if (!isLoggedIn && !isPasswordRecovery) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-md px-4 py-16 text-center">
          <div className="p-8 rounded-3xl bg-card border border-border shadow-elegant space-y-4">
            <div className="h-14 w-14 rounded-2xl bg-accent/15 text-accent grid place-items-center mx-auto">
              <User className="h-7 w-7" />
            </div>
            <h1 className="text-xl font-bold font-display">تسجيل الدخول مطلوب</h1>
            <p className="text-sm text-muted-foreground">
              يرجى تسجيل الدخول إلى حسابك لعرض وتعديل معلومات الحساب أو تغيير كلمة المرور.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/login"
                className="h-11 px-6 rounded-xl bg-gradient-accent text-accent-foreground font-bold flex items-center justify-center gap-2 text-sm shadow-md"
              >
                تسجيل الدخول الآن
              </Link>
              <Link
                to="/"
                className="h-10 px-4 rounded-xl hover:bg-secondary text-xs text-muted-foreground flex items-center justify-center"
              >
                العودة للصفحة الرئيسية
              </Link>
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-5xl px-3 sm:px-6 py-8 sm:py-12 space-y-6">
        {/* Recovery Password Banner if arrived via email reset link */}
        {isPasswordRecovery && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-accent/15 to-emerald-500/15 border border-accent/40 shadow-elegant space-y-4">
            <div className="flex items-start gap-3">
              <KeyRound className="h-6 w-6 text-accent shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-bold">تعيين كلمة المرور الجديدة (استعادة الحساب)</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  تم التحقق من رابط بريدك الإلكتروني بنجاح. أدخل كلمة المرور الجديدة لحسابك:
                </p>
              </div>
            </div>

            <form onSubmit={handleRecoverySubmit} className="grid sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs font-semibold mb-1 block">كلمة المرور الجديدة</label>
                <div className="relative">
                  <input
                    type={showRecoveryPass ? "text" : "password"}
                    value={recoveryPassword}
                    onChange={(e) => setRecoveryPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="6 خانات على الأقل"
                    className="w-full h-11 px-3.5 pe-10 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRecoveryPass(!showRecoveryPass)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showRecoveryPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold mb-1 block">تأكيد كلمة المرور الجديدة</label>
                <input
                  type={showRecoveryPass ? "text" : "password"}
                  value={recoveryConfirm}
                  onChange={(e) => setRecoveryConfirm(e.target.value)}
                  required
                  minLength={6}
                  placeholder="أعد إدخال كلمة المرور"
                  className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                  dir="ltr"
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  disabled={savingRecoveryPass}
                  className="h-11 px-6 rounded-xl bg-gradient-accent text-accent-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
                >
                  {savingRecoveryPass ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                  حفظ كلمة المرور والدخول
                </button>
                <button
                  type="button"
                  onClick={() => setIsPasswordRecovery(false)}
                  className="h-11 px-4 rounded-xl border border-border text-sm hover:bg-secondary"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        )}

        {/* HERO PROFILE SUMMARY CARD */}
        <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-5 sm:p-7 shadow-elegant">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 text-accent font-bold text-2xl sm:text-3xl grid place-items-center shrink-0 shadow-sm">
                {profile?.fullName ? (
                  profile.fullName.trim().charAt(0).toUpperCase()
                ) : (
                  <User className="h-8 w-8" />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold font-display truncate">
                    {profile?.fullName || "المستخدم"}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                    <ShieldCheck className="h-3.5 w-3.5" /> حساب موثق
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground mt-1.5 flex-wrap">
                  <span className="flex items-center gap-1" dir="ltr">
                    <Mail className="h-3.5 w-3.5 text-accent" /> {email}
                  </span>
                  {profile?.phone && (
                    <span className="flex items-center gap-1" dir="ltr">
                      <Phone className="h-3.5 w-3.5 text-accent" /> {profile.phone}
                    </span>
                  )}
                  {(profile?.wilaya || profile?.commune) && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-accent" />{" "}
                      {[profile.commune, profile.wilaya].filter(Boolean).join("، ")}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0">
              <Link
                to="/post-car"
                className="flex-1 sm:flex-initial h-10 px-4 rounded-xl bg-gradient-accent text-accent-foreground text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5" /> انشر إعلان
              </Link>
              <button
                onClick={async () => {
                  await signOut();
                  toast.success("تم تسجيل الخروج بنجاح.");
                  navigate({ to: "/" });
                }}
                className="h-10 px-3.5 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="تسجيل الخروج"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden xs:inline">خروج</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 pt-5 border-t border-border/70">
            <Link
              to="/my-listings"
              className="p-3 rounded-2xl bg-secondary/40 hover:bg-secondary/70 border border-border/60 transition group text-center"
            >
              <div className="text-xl sm:text-2xl font-bold font-display text-foreground group-hover:text-accent transition-colors">
                {userCars.length}
              </div>
              <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                إجمالي إعلاناتي
              </div>
            </Link>

            <Link
              to="/my-listings"
              className="p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 transition group text-center"
            >
              <div className="text-xl sm:text-2xl font-bold font-display text-emerald-600 dark:text-emerald-400">
                {activeCount}
              </div>
              <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                إعلانات منشورة
              </div>
            </Link>

            <Link
              to="/my-listings"
              className="p-3 rounded-2xl bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/20 transition group text-center"
            >
              <div className="text-xl sm:text-2xl font-bold font-display text-blue-600 dark:text-blue-400">
                {pendingCount}
              </div>
              <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                قيد المراجعة
              </div>
            </Link>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex items-center gap-2 border-b border-border pb-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("profile")}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 shrink-0",
              activeTab === "profile"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <User className="h-4 w-4" /> معلومات الحساب
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 shrink-0",
              activeTab === "security"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <Lock className="h-4 w-4" /> الأمان وتغيير كلمة السر
          </button>

          <button
            onClick={() => setActiveTab("listings")}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 shrink-0",
              activeTab === "listings"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <Car className="h-4 w-4" /> إعلاناتي ({userCars.length})
          </button>
        </div>

        {/* TAB CONTENT: 1. PROFILE DETAILS */}
        {activeTab === "profile" && (
          <div className="rounded-3xl bg-card border border-border p-5 sm:p-7 shadow-card space-y-6">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <User className="h-5 w-5 text-accent" /> البيانات الشخصية وبيانات الاتصال
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                تظهر هذه البيانات للمشترين عند نشر سياراتك في المنصة، ويمكنك تحديثها في أي وقت.
              </p>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block">الاسم الكامل *</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="مثال: صالح بن يحيى"
                      className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold mb-1.5 block">البريد الإلكتروني (المسجّل)</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email || ""}
                      readOnly
                      disabled
                      className="w-full h-11 px-3.5 rounded-xl border border-input bg-muted/50 text-muted-foreground text-sm cursor-not-allowed"
                      dir="ltr"
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    البريد الإلكتروني مخصص لتسجيل الدخول واستعادة الحساب.
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="text-xs font-semibold mb-1.5 block">رقم الهاتف</label>
                  <PhoneInput value={phone} onChange={setPhone} />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    يُعرض في إعلاناتك ليتواصل معك المشترون مباشرة.
                  </span>
                </div>

                <div className="sm:col-span-1">
                  <label className="text-xs font-semibold mb-1.5 block">الولاية</label>
                  <select
                    value={wilaya}
                    onChange={(e) => setWilaya(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                  >
                    {WILAYAS.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <label className="text-xs font-semibold mb-1.5 block">البلدية / المنطقة</label>
                  {wilaya === "غرداية" ? (
                    <select
                      value={commune}
                      onChange={(e) => setCommune(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                    >
                      {GHARDAIA_COMMUNES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={commune}
                      onChange={(e) => setCommune(e.target.value)}
                      placeholder="اسم البلدية"
                      className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                    />
                  )}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="w-full sm:w-auto h-11 px-6 rounded-xl bg-gradient-accent text-accent-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
                >
                  {savingProfile ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  حفظ معلومات الحساب
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB CONTENT: 2. SECURITY & PASSWORD CHANGE */}
        {activeTab === "security" && (
          <div className="rounded-3xl bg-card border border-border p-5 sm:p-7 shadow-card space-y-6">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Lock className="h-5 w-5 text-accent" /> تغيير كلمة المرور والأمان
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                لحماية حسابك وبيانات إعلاناتك، يُشترط إدخال كلمة المرور الحالية قبل تعيين كلمة المرور الجديدة.
              </p>
            </div>

            {/* Security Notice Box */}
            <div className="p-4 rounded-2xl bg-accent/10 border border-accent/25 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm space-y-1">
                <p className="font-semibold text-foreground">
                  حماية معتمدة للتحقق من المالك:
                </p>
                <p className="text-muted-foreground">
                  يطلب النظام كلمة السر القديمة للتأكد من هويتك ومنع أي تغيير غير مصرح به. إذا نسيت كلمة المرور القديمة، يمكنك الاستعانة بخاصية التحقق عبر البريد الإلكتروني أدناه.
                </p>
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-xl">
              {/* Field 1: Old Password */}
              <div>
                <label className="text-xs font-semibold mb-1.5 flex items-center justify-between">
                  <span>كلمة المرور الحالية (القديمة) *</span>
                  <button
                    type="button"
                    onClick={handleForgotPasswordEmail}
                    className="text-[11px] text-accent hover:underline font-normal"
                  >
                    نسيت كلمة المرور الحالية؟
                  </button>
                </label>
                <div className="relative">
                  <input
                    type={showOldPass ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                    placeholder="أدخل كلمة المرور الحالية للتأكيد"
                    className="w-full h-11 px-3.5 pe-10 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPass(!showOldPass)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="إظهار/إخفاء كلمة المرور"
                  >
                    {showOldPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Field 2: New Password */}
              <div>
                <label className="text-xs font-semibold mb-1.5 block">كلمة المرور الجديدة *</label>
                <div className="relative">
                  <input
                    type={showNewPass ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="6 خانات على الأقل"
                    className="w-full h-11 px-3.5 pe-10 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="إظهار/إخفاء كلمة المرور"
                  >
                    {showNewPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Field 3: Confirm New Password */}
              <div>
                <label className="text-xs font-semibold mb-1.5 block">تأكيد كلمة المرور الجديدة *</label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="أعد إدخال كلمة المرور الجديدة"
                    className="w-full h-11 px-3.5 pe-10 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="إظهار/إخفاء كلمة المرور"
                  >
                    {showConfirmPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={updatingPassword}
                  className="w-full sm:w-auto h-11 px-6 rounded-xl bg-gradient-accent text-accent-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
                >
                  {updatingPassword ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <KeyRound className="h-4 w-4" />
                  )}
                  تحديث كلمة المرور
                </button>

                <button
                  type="button"
                  onClick={handleForgotPasswordEmail}
                  className="w-full sm:w-auto h-11 px-4 rounded-xl border border-border hover:bg-secondary text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Mail className="h-3.5 w-3.5 text-accent" />
                  إرسال رابط تأكيد إلى بريدي الإلكتروني
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB CONTENT: 3. LISTINGS OVERVIEW */}
        {activeTab === "listings" && (
          <div className="rounded-3xl bg-card border border-border p-5 sm:p-7 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Car className="h-5 w-5 text-accent" /> السيارات والإعلانات المعروضة
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  إدارة السيارات التي قمت بنشرها ومتابعة حالة مراجعتها من قِبل إدارة المعرض.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/post-car"
                  className="h-10 px-4 rounded-xl bg-gradient-accent text-accent-foreground text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="h-3.5 w-3.5" /> إضافة سيارة
                </Link>
                <Link
                  to="/my-listings"
                  className="h-10 px-4 rounded-xl border border-border hover:bg-secondary text-xs font-semibold flex items-center gap-1.5"
                >
                  <FileText className="h-3.5 w-3.5 text-accent" /> الصفحة الكاملة لإعلاناتي
                </Link>
              </div>
            </div>

            {userCars.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-secondary/30 border border-border/80 space-y-3">
                <Car className="h-10 w-10 text-muted-foreground mx-auto" />
                <p className="font-semibold text-sm">لا توجد لديك إعلانات بعد</p>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  يمكنك نشر سيارتك للبيع في منصة مزاب موتورز بسهولة ليصل إعلانك إلى آلاف المشترين.
                </p>
                <div className="pt-2">
                  <Link
                    to="/post-car"
                    className="inline-flex items-center gap-1.5 h-10 px-5 rounded-xl bg-gradient-accent text-accent-foreground text-xs font-bold shadow-md"
                  >
                    انشر أول سيارة الآن
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userCars.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm flex flex-col"
                  >
                    <div className="relative aspect-video bg-muted overflow-hidden">
                      <img
                        src={c.images[0] || "/placeholder-car.jpg"}
                        alt={c.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 start-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-sm">
                        {c.status === "Active"
                          ? "منشور"
                          : c.status === "PendingReview"
                          ? "قيد المراجعة"
                          : c.status}
                      </span>
                    </div>
                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-sm truncate">{c.title}</h3>
                        <p className="text-xs text-accent font-semibold mt-1">
                          {c.price.toLocaleString()} د.ج
                        </p>
                      </div>
                      <div className="pt-3 border-t border-border mt-3 flex items-center justify-between text-xs">
                        <Link
                          to="/cars/$id"
                          params={{ id: c.id }}
                          className="text-accent hover:underline font-medium"
                        >
                          معاينة
                        </Link>
                        <Link
                          to="/my-listings"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          إدارة في القائمة
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
