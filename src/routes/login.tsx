import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn, UserPlus, Mail, Lock, User, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/PublicLayout";
import { useUserAuth } from "@/context/UserAuthContext";
import { PhoneInput } from "@/components/PhoneInput";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول — MZAB MOTORS" },
      {
        name: "description",
        content: "سجّل دخولك أو أنشئ حساباً جديداً لنشر إعلان سيارتك في منصة مزاب موتورز.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn, signUp } = useUserAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        if (!fullName.trim()) {
          toast.error("يرجى إدخال الاسم الكامل");
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
          toast.success(
            "تم إنشاء الحساب! إذا طُلب منك تأكيد البريد الإلكتروني، تحقق من بريدك ثم سجّل الدخول.",
          );
          setMode("signin");
        }
      } else {
        const res = await signIn(email.trim(), password);
        if (!res.ok) {
          toast.error(res.error ?? "تعذّر تسجيل الدخول");
        } else {
          toast.success("مرحباً بعودتك!");
          navigate({ to: "/post-car" });
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
      <div className="mx-auto max-w-md px-4 sm:px-6 py-16">
        <div className="bg-card border border-border rounded-2xl shadow-elegant p-8">
          <div className="mx-auto h-14 w-14 grid place-items-center rounded-2xl bg-accent/15">
            {mode === "signin" ? (
              <LogIn className="h-7 w-7 text-accent" />
            ) : (
              <UserPlus className="h-7 w-7 text-accent" />
            )}
          </div>
          <h1 className="mt-4 text-center font-display text-xl font-bold">
            {mode === "signin" ? "تسجيل الدخول" : "إنشاء حساب جديد"}
          </h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            {mode === "signin"
              ? "سجّل دخولك عشان تنشر وتدير إعلاناتك"
              : "أنشئ حساباً مجانياً لنشر إعلان سيارتك"}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-3">
            {mode === "signup" && (
              <div>
                <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                  <User className="h-3.5 w-3.5" /> الاسم الكامل
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className={input}
                />
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                <Mail className="h-3.5 w-3.5" /> البريد الإلكتروني
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={input}
                dir="ltr"
              />
            </div>
            {mode === "signup" && (
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                  رقم الهاتف
                </label>
                <PhoneInput value={phone} onChange={setPhone} />
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                <Lock className="h-3.5 w-3.5" /> كلمة المرور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className={input}
                dir="ltr"
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full h-11 rounded-xl bg-gradient-accent text-accent-foreground font-bold flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : mode === "signin" ? (
                "دخول"
              ) : (
                "إنشاء الحساب"
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            {mode === "signin" ? (
              <>
                ما عندك حساب؟{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="font-semibold text-accent hover:underline"
                >
                  أنشئ حساب جديد
                </button>
              </>
            ) : (
              <>
                عندك حساب أصلاً؟{" "}
                <button
                  onClick={() => setMode("signin")}
                  className="font-semibold text-accent hover:underline"
                >
                  سجّل الدخول
                </button>
              </>
            )}
          </p>

          <Link
            to="/"
            className="mt-4 block text-center text-xs text-muted-foreground hover:text-foreground"
          >
            الرجوع للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
