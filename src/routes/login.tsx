import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User,
  Loader2,
  KeyRound,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/PublicLayout";
import { useUserAuth } from "@/context/UserAuthContext";
import { PhoneInput } from "@/components/PhoneInput";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    type: typeof search.type === "string" ? search.type : undefined,
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
    mode: typeof search.mode === "string" ? search.mode : undefined,
  }),
  head: () => ({
    meta: [
      { title: "تسجيل الدخول واستعادة الحساب — MZAB MOTORS" },
      {
        name: "description",
        content:
          "سجّل دخولك أو أنشئ حساباً جديداً أو استعد كلمة المرور لنشر إعلان سيارتك في منصة مزاب موتورز.",
      },
    ],
  }),
  component: LoginPage,
});

type AuthMode = "signin" | "signup" | "forgot" | "recovery";

function LoginPage() {
  const {
    signIn,
    signUp,
    signOut,
    resetPasswordForEmail,
    updatePassword,
    resendConfirmationEmail,
    isPasswordRecovery,
    setIsPasswordRecovery,
    isLoggedIn,
    loading,
    profile,
    email: userEmail,
  } = useUserAuth();
  const navigate = useNavigate();
  const search = Route.useSearch();

  const [mode, setMode] = useState<AuthMode>(() => {
    if (search.mode === "signup") return "signup";
    if (search.mode === "forgot") return "forgot";
    if (search.type === "recovery") return "recovery";
    return "signin";
  });
  const [busy, setBusy] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [resendingEmail, setResendingEmail] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPass, setShowPass] = useState(false);

  // If redirected from email recovery link
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash || "";
      const searchStr = window.location.search || "";
      if (
        isPasswordRecovery ||
        search.type === "recovery" ||
        hash.includes("type=recovery") ||
        searchStr.includes("type=recovery") ||
        searchStr.includes("reset=true") ||
        searchStr.includes("code=")
      ) {
        setMode("recovery");
      }
    }
  }, [isPasswordRecovery, search.type]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const destination = search.redirect || "/account";

    try {
      if (mode === "signup") {
        if (!fullName.trim()) {
          toast.error("يرجى إدخال الاسم الكامل");
          setBusy(false);
          return;
        }
        if (password.length < 6) {
          toast.error("كلمة المرور يجب أن لا تقل عن 6 خانات.");
          setBusy(false);
          return;
        }
        if (password !== signupConfirmPassword) {
          toast.error("كلمتا المرور غير متطابقتين.");
          setBusy(false);
          return;
        }
        const res = await signUp(
          email.trim(),
          password,
          fullName.trim(),
          phone,
        );
        if (!res.ok) {
          toast.error(res.error ?? "تعذّر إنشاء الحساب");
        } else {
          setSignupEmail(email.trim());
          setSignupSuccess(true);
          toast.success("تم إنشاء الحساب بنجاح!");
        }
      } else if (mode === "signin") {
        const res = await signIn(email.trim(), password);
        if (!res.ok) {
          toast.error(res.error ?? "تعذّر تسجيل الدخول");
        } else {
          toast.success("مرحباً بعودتك إلى مزاب موتورز!");
          navigate({ to: destination });
        }
      } else if (mode === "forgot") {
        const res = await resetPasswordForEmail(email.trim());
        if (!res.ok) {
          toast.error(res.error ?? "تعذر إرسال رابط التحقق");
        } else {
          setEmailSent(true);
          toast.success("تم إرسال رابط التحقق وتأكيد كلمة المرور إلى بريدك!");
        }
      } else if (mode === "recovery") {
        if (newPassword.length < 6) {
          toast.error("كلمة المرور يجب أن تتكون من 6 خانات على الأقل.");
          setBusy(false);
          return;
        }
        if (newPassword !== confirmPassword) {
          toast.error("كلمة المرور وتأكيدها غير متطابقين.");
          setBusy(false);
          return;
        }
        const res = await updatePassword(newPassword);
        if (!res.ok) {
          toast.error(res.error ?? "تعذر تحديث كلمة المرور");
        } else {
          toast.success("تم تعيين كلمة المرور الجديدة بنجاح! مرحباً بك.");
          setIsPasswordRecovery(false);
          navigate({ to: destination });
        }
      }
    } finally {
      setBusy(false);
    }
  };

  const input =
    "w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent";

  return (
    <PublicLayout>
      <div className="mx-auto max-w-md px-4 sm:px-6 py-12 sm:py-16">
        {/* If user is already logged in and not in recovery */}
        {isLoggedIn && mode !== "recovery" && (
          <div className="mb-6 p-4 rounded-2xl bg-secondary/80 border border-border text-center space-y-3 shadow-sm">
            <div className="flex items-center justify-center gap-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>أنت مسجل الدخول حالياً بحساب:</span>
            </div>
            <p className="text-xs text-muted-foreground font-mono" dir="ltr">
              {userEmail || profile?.fullName}
            </p>
            <div className="flex items-center justify-center gap-2 text-xs pt-1 flex-wrap">
              <Link
                to="/account"
                className="h-8 px-3 rounded-lg bg-accent text-accent-foreground font-bold flex items-center gap-1 hover:opacity-90 transition"
              >
                الانتقال للحساب
              </Link>
              <Link
                to="/post-car"
                className="h-8 px-3 rounded-lg border border-border hover:bg-background flex items-center gap-1 transition"
              >
                نشر إعلان جديد
              </Link>
              <button
                type="button"
                onClick={async () => {
                  await signOut();
                  toast.success("تم تسجيل الخروج. يمكنك الآن تسجيل الدخول بحساب آخر.");
                }}
                className="h-8 px-2.5 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 flex items-center gap-1 transition"
              >
                <LogOut className="h-3 w-3" />
                تسجيل الخروج
              </button>
            </div>
          </div>
        )}

        <div className="bg-card border border-border rounded-3xl shadow-elegant p-6 sm:p-8">
          <div className="mx-auto h-14 w-14 grid place-items-center rounded-2xl bg-accent/15">
            {mode === "signin" && <LogIn className="h-7 w-7 text-accent" />}
            {mode === "signup" && <UserPlus className="h-7 w-7 text-accent" />}
            {mode === "forgot" && <Mail className="h-7 w-7 text-accent" />}
            {mode === "recovery" && <KeyRound className="h-7 w-7 text-accent" />}
          </div>

          <h1 className="mt-4 text-center font-display text-xl font-bold">
            {mode === "signin" && "تسجيل الدخول"}
            {mode === "signup" && (signupSuccess ? "تم إنشاء الحساب بنجاح!" : "إنشاء حساب جديد")}
            {mode === "forgot" && "استعادة كلمة المرور"}
            {mode === "recovery" && "تعيين كلمة المرور الجديدة"}
          </h1>

          <p className="mt-1 text-center text-xs sm:text-sm text-muted-foreground">
            {mode === "signin" && "سجّل دخولك لإدارة إعلاناتك وتعديل معلومات حسابك"}
            {mode === "signup" && (signupSuccess
              ? "تفقد بريدك الإلكتروني لتأكيد وتفعيل حسابك"
              : "أنشئ حساباً مجانياً للبدء في نشر إعلانات سياراتك")}
            {mode === "forgot" &&
              "أدخل بريدك الإلكتروني المسجّل لإرسال رابط تأكيد وإعادة تعيين كلمة المرور"}
            {mode === "recovery" && "تم التحقق من الرابط بنجاح. أدخل كلمة المرور الجديدة لحسابك"}
          </p>

          {/* Signup Success confirmation card */}
          {mode === "signup" && signupSuccess ? (
            <div className="mt-6 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/20 grid place-items-center">
                <CheckCircle2 className="h-7 w-7 text-emerald-500" />
              </div>
              <div>
                <h2 className="font-bold text-base text-foreground">
                  تم تسجيل حسابك بنجاح!
                </h2>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  أرسلنا رسالة تأكيد وتفعيل إلى بريدك الإلكتروني:
                </p>
                <p className="font-mono font-bold text-sm text-foreground mt-1" dir="ltr">
                  {signupEmail}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-card border border-border text-start text-xs space-y-2 text-muted-foreground">
                <p className="font-semibold text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  خطوات تفعيل حسابك:
                </p>
                <ol className="list-decimal list-inside space-y-1 pe-1 leading-relaxed">
                  <li>افتح صندوق الوارد في بريدك الإلكتروني.</li>
                  <li>اضغط على زر أو رابط <strong>تأكيد البريد الإلكتروني</strong>.</li>
                  <li>إذا لم تجد الرسالة في صندوق الوارد، يرجى فحص مجلد <strong>الرسائل غير المرغوب فيها (Spam / Junk)</strong>.</li>
                </ol>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSignupSuccess(false);
                    setMode("signin");
                  }}
                  className="w-full h-11 rounded-xl bg-gradient-accent text-accent-foreground font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  الذهاب لتسجيل الدخول
                </button>
                <button
                  type="button"
                  disabled={resendingEmail}
                  onClick={async () => {
                    setResendingEmail(true);
                    const res = await resendConfirmationEmail(signupEmail);
                    setResendingEmail(false);
                    if (res.ok) {
                      toast.success("تمت إعادة إرسال رابط التفعيل إلى بريدك!");
                    } else {
                      toast.error(res.error ?? "تعذر إعادة إرسال البريد");
                    }
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground hover:underline py-1 flex items-center justify-center gap-1.5"
                >
                  {resendingEmail ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Mail className="h-3.5 w-3.5" />
                  )}
                  لم تصلك الرسالة؟ إعادة إرسال رابط التفعيل
                </button>
              </div>
            </div>
          ) : mode === "forgot" && emailSent ? (
            /* Forgot Password Success confirmation */
            <div className="mt-6 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-center space-y-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
              <h2 className="font-bold text-sm text-foreground">
                تم إرسال رابط التأكيد بنجاح!
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                أرسلنا رابط التحقق إلى <strong className="text-foreground" dir="ltr">{email}</strong>.
                يرجى فتح بريدك الإلكتروني والضغط على الرابط لتعيين كلمة مرور جديدة.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEmailSent(false);
                    setMode("signin");
                  }}
                  className="w-full h-10 rounded-xl bg-gradient-accent text-accent-foreground font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  العودة لتسجيل الدخول
                </button>
                <button
                  type="button"
                  onClick={() => setEmailSent(false)}
                  className="text-xs text-muted-foreground hover:underline"
                >
                  إعادة إرسال البريد مرة أخرى
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-3.5">
              {/* Recovery session warning if opened without valid session */}
              {mode === "recovery" && !loading && !isLoggedIn && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs leading-relaxed space-y-2">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    جلسة التحقق غير نشطة أو انتهت صلاحية الرابط
                  </div>
                  <p className="text-muted-foreground">
                    روابط استعادة كلمة المرور صالحة لمرة واحدة فقط. إذا انتهت صلاحية الرابط، يمكنك طلب رابط جديد في ثوانٍ.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailSent(false);
                      setMode("forgot");
                    }}
                    className="font-bold text-accent hover:underline block pt-1"
                  >
                    ← طلب رابط استعادة جديد
                  </button>
                </div>
              )}

              {mode === "signup" && (
                <div>
                  <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                    <User className="h-3.5 w-3.5" /> الاسم الكامل
                  </label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="مثال: صالح بن يحيى"
                    className={input}
                  />
                </div>
              )}

              {mode !== "recovery" && (
                <div>
                  <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                    <Mail className="h-3.5 w-3.5" /> البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="yourname@example.com"
                    className={input}
                    dir="ltr"
                  />
                </div>
              )}

              {mode === "signup" && (
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                    رقم الهاتف
                  </label>
                  <PhoneInput value={phone} onChange={setPhone} />
                </div>
              )}

              {(mode === "signin" || mode === "signup") && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5" /> كلمة المرور
                    </label>
                    {mode === "signin" && (
                      <button
                        type="button"
                        onClick={() => {
                          setEmailSent(false);
                          setMode("forgot");
                        }}
                        className="text-[11px] text-accent hover:underline font-medium"
                      >
                        نسيت كلمة المرور؟
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      placeholder="••••••••"
                      className={cn(input, "pe-10")}
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Confirm password field for signup */}
              {mode === "signup" && (
                <div>
                  <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                    <Lock className="h-3.5 w-3.5" /> تأكيد كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                      placeholder="أعد كتابة كلمة المرور"
                      className={cn(input, "pe-10")}
                      dir="ltr"
                    />
                  </div>
                </div>
              )}

              {mode === "recovery" && (
                <>
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
                        placeholder="6 خانات على الأقل"
                        className={cn(input, "pe-10")}
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                      <Lock className="h-3.5 w-3.5" /> تأكيد كلمة المرور الجديدة
                    </label>
                    <input
                      type={showPass ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                      placeholder="أعد كتابة كلمة المرور"
                      className={input}
                      dir="ltr"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={busy}
                className="w-full h-11 rounded-xl bg-gradient-accent text-accent-foreground font-bold flex items-center justify-center gap-2 disabled:opacity-60 shadow-md cursor-pointer text-sm mt-2"
              >
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : mode === "signin" ? (
                  "دخول"
                ) : mode === "signup" ? (
                  "إنشاء الحساب"
                ) : mode === "forgot" ? (
                  "إرسال رابط التأكيد إلى البريد"
                ) : (
                  "حفظ كلمة المرور الجديدة"
                )}
              </button>
            </form>
          )}

          {/* Mode Switchers */}
          <div className="mt-5 text-center text-xs sm:text-sm text-muted-foreground space-y-2 border-t border-border pt-4">
            {mode === "signin" && (
              <p>
                ما عندك حساب؟{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="font-semibold text-accent hover:underline"
                >
                  أنشئ حساب جديد
                </button>
              </p>
            )}

            {mode === "signup" && (
              <p>
                عندك حساب أصلاً؟{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="font-semibold text-accent hover:underline"
                >
                  سجّل الدخول
                </button>
              </p>
            )}

            {(mode === "forgot" || mode === "recovery") && (
              <p>
                تذكرت كلمة المرور؟{" "}
                <button
                  type="button"
                  onClick={() => {
                    setEmailSent(false);
                    setMode("signin");
                  }}
                  className="font-semibold text-accent hover:underline"
                >
                  العودة لتسجيل الدخول
                </button>
              </p>
            )}

            <Link
              to="/"
              className="inline-block text-xs text-muted-foreground hover:text-foreground pt-1"
            >
              الرجوع للصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

