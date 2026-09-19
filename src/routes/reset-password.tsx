import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  KeyRound,
  Lock,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/PublicLayout";
import { useUserAuth } from "@/context/UserAuthContext";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "إعادة تعيين كلمة المرور — MZAB MOTORS" },
      {
        name: "description",
        content: "قم بتعيين كلمة مرور جديدة لحسابك في MZAB MOTORS.",
      },
    ],
  }),
  component: ResetPasswordPage,
});

/**
 * /reset-password
 *
 * How the user lands here: Supabase sends a "reset password" email whose link
 * points at `${origin}/reset-password` (configured via
 * `resetPasswordForEmail(email, { redirectTo })` in UserAuthContext). When the
 * user clicks it, Supabase redirects back here with either a `?code=...`
 * (PKCE) or a `#access_token=...&type=recovery` hash fragment.
 *
 * That link is parsed once, globally, in `UserAuthProvider` (it has to live
 * there, not in this page, because the same parsing logic also protects
 * /login and /account from treating a recovery link as a normal sign-in).
 * By the time this component renders, the provider has already:
 *   1. Exchanged the code / token for a real Supabase session, and
 *   2. Set `isPasswordRecovery = true` if it was a recovery link.
 *
 * This page's only job is the visible part: show a "new password" form while
 * that recovery session is active, call `supabase.auth.updateUser(...)`
 * (via the `updatePassword` helper) to save it, and handle an
 * expired/invalid link gracefully.
 */
function ResetPasswordPage() {
  const {
    loading,
    isPasswordRecovery,
    updatePassword,
    resetPasswordForEmail,
  } = useUserAuth();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Shown instead of the password form when the link is missing, invalid,
  // or expired — lets the user request a fresh one without leaving the page.
  const [requestEmail, setRequestEmail] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [requesting, setRequesting] = useState(false);

  // After a successful reset, send the user to /login to sign in with the
  // new password.
  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => navigate({ to: "/login" }), 2000);
    return () => clearTimeout(t);
  }, [success, navigate]);

  const hasMinLen = newPassword.length >= 6;
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;
  const inputClass =
    "w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all";

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!hasMinLen) {
      toast.error("كلمة المرور يجب أن تتكون من 6 خانات على الأقل.");
      return;
    }
    if (!passwordsMatch) {
      toast.error("كلمة المرور وتأكيدها غير متطابقين.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await updatePassword(newPassword);
      if (!res.ok) {
        toast.error(res.error ?? "تعذر تحديث كلمة المرور. حاول مرة أخرى.");
        return;
      }
      setSuccess(true);
      toast.success("تم تحديث كلمة المرور بنجاح!");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRequestNewLink(e: React.FormEvent) {
    e.preventDefault();
    const email = requestEmail.trim();
    if (!email) {
      toast.error("يرجى كتابة بريدك الإلكتروني.");
      return;
    }

    setRequesting(true);
    try {
      const res = await resetPasswordForEmail(email);
      if (!res.ok) {
        toast.error(res.error ?? "تعذر إرسال رابط إعادة التعيين.");
        return;
      }
      setRequestSent(true);
      toast.success("تم إرسال رابط جديد إلى بريدك الإلكتروني.");
    } finally {
      setRequesting(false);
    }
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-md px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-card border border-border rounded-3xl shadow-elegant p-6 sm:p-8">
          {/* ---------- 1. Checking the link ---------- */}
          {loading ? (
            <div className="py-10 text-center space-y-3">
              <Loader2 className="h-8 w-8 animate-spin text-accent mx-auto" />
              <p className="text-xs text-muted-foreground">
                جارٍ التحقق من رابط إعادة التعيين...
              </p>
            </div>
          ) : success ? (
            /* ---------- 2. Success ---------- */
            <div className="text-center space-y-5">
              <div className="mx-auto h-14 w-14 grid place-items-center rounded-2xl bg-emerald-500/15">
                <CheckCircle2 className="h-7 w-7 text-emerald-500" />
              </div>
              <div>
                <h1 className="font-display text-xl sm:text-2xl font-bold">
                  تم تعيين كلمة المرور بنجاح!
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                  يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة. سيتم تحويلك
                  تلقائياً خلال لحظات...
                </p>
              </div>
              <Link
                to="/login"
                className="inline-flex w-full h-11 rounded-xl bg-accent text-accent-foreground font-bold items-center justify-center gap-2 hover:opacity-95 transition-all text-sm"
              >
                الانتقال إلى تسجيل الدخول
              </Link>
            </div>
          ) : isPasswordRecovery ? (
            /* ---------- 3. Valid recovery session: set new password ---------- */
            <>
              <div className="mx-auto h-14 w-14 grid place-items-center rounded-2xl bg-accent/15">
                <KeyRound className="h-7 w-7 text-accent" />
              </div>
              <h1 className="mt-4 text-center font-display text-xl sm:text-2xl font-bold">
                إعادة تعيين كلمة المرور
              </h1>
              <p className="mt-2 text-center text-xs sm:text-sm text-muted-foreground">
                أدخل كلمة المرور الجديدة لحسابك.
              </p>

              <form onSubmit={handleUpdatePassword} className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                    <Lock className="h-3.5 w-3.5" /> كلمة المرور الجديدة
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      autoFocus
                      placeholder="6 خانات على الأقل"
                      className={cn(inputClass, "pe-10")}
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label="إظهار/إخفاء كلمة المرور"
                    >
                      {showPass ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                    <Lock className="h-3.5 w-3.5" /> تأكيد كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                      placeholder="أعد إدخال نفس كلمة المرور"
                      className={cn(inputClass, "pe-10")}
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass((v) => !v)}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label="إظهار/إخفاء تأكيد كلمة المرور"
                    >
                      {showConfirmPass ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && !passwordsMatch && (
                    <p className="mt-1 text-[11px] text-destructive">
                      كلمتا المرور غير متطابقتين.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting || !hasMinLen || !passwordsMatch}
                  className="w-full h-11 rounded-xl bg-gradient-accent text-accent-foreground font-bold flex items-center justify-center gap-2 disabled:opacity-60 shadow-md text-sm mt-2 hover:opacity-95 transition-all"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "حفظ كلمة المرور الجديدة"
                  )}
                </button>
              </form>
            </>
          ) : requestSent ? (
            /* ---------- 4. New link requested successfully ---------- */
            <div className="text-center space-y-4">
              <div className="mx-auto h-14 w-14 grid place-items-center rounded-2xl bg-emerald-500/15">
                <Mail className="h-7 w-7 text-emerald-500" />
              </div>
              <h1 className="font-display text-xl font-bold">تحقق من بريدك</h1>
              <p className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 leading-relaxed">
                تم إرسال رابط جديد لإعادة تعيين كلمة المرور إلى{" "}
                <span className="font-mono font-bold" dir="ltr">
                  {requestEmail}
                </span>
                . افتح بريدك واضغط على الرابط للمتابعة.
              </p>
              <Link
                to="/login"
                className="inline-flex w-full h-10 rounded-xl bg-secondary hover:bg-secondary/80 text-xs font-semibold items-center justify-center transition"
              >
                الرجوع لتسجيل الدخول
              </Link>
            </div>
          ) : (
            /* ---------- 5. No valid recovery session: link is missing/invalid/expired ---------- */
            <>
              <div className="mx-auto h-14 w-14 grid place-items-center rounded-2xl bg-amber-500/15">
                <AlertCircle className="h-7 w-7 text-amber-500" />
              </div>
              <h1 className="mt-4 text-center font-display text-xl sm:text-2xl font-bold">
                الرابط غير صالح أو منتهي الصلاحية
              </h1>
              <p className="mt-2 text-center text-xs sm:text-sm text-muted-foreground leading-relaxed">
                روابط إعادة تعيين كلمة المرور صالحة لمرة واحدة فقط ولفترة
                محدودة. أدخل بريدك الإلكتروني أدناه لطلب رابط جديد.
              </p>

              <form onSubmit={handleRequestNewLink} className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                    <Mail className="h-3.5 w-3.5" /> البريد الإلكتروني المسجل
                  </label>
                  <input
                    type="email"
                    value={requestEmail}
                    onChange={(e) => setRequestEmail(e.target.value)}
                    required
                    autoFocus
                    placeholder="example@domain.com"
                    className={inputClass}
                    dir="ltr"
                  />
                </div>

                <button
                  type="submit"
                  disabled={requesting}
                  className="w-full h-11 rounded-xl bg-gradient-accent text-accent-foreground font-bold flex items-center justify-center gap-2 disabled:opacity-60 shadow-md text-sm"
                >
                  {requesting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "إرسال رابط استعادة كلمة المرور"
                  )}
                </button>
              </form>
            </>
          )}

          {!loading && !success && (
            <div className="mt-6 pt-4 border-t border-border text-center text-xs text-muted-foreground">
              <Link to="/login" className="hover:text-foreground hover:underline">
                الرجوع لتسجيل الدخول
              </Link>
              <span className="mx-2">•</span>
              <Link to="/" className="hover:text-foreground hover:underline">
                الصفحة الرئيسية
              </Link>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
