import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured, type ProfileRow } from "@/lib/supabase";

export type Profile = {
  id: string;
  fullName: string;
  phone: string;
  wilaya: string;
  commune: string;
  isApproved: boolean;
};

type UserAuthState = {
  loading: boolean;
  session: Session | null;
  userId: string | null;
  email: string | null;
  profile: Profile | null;
  isLoggedIn: boolean;
  isPasswordRecovery: boolean;
  setIsPasswordRecovery: (val: boolean) => void;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    phone: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (
    data: Partial<Profile>,
  ) => Promise<{ ok: boolean; error?: string }>;
  changePassword: (
    oldPassword: string,
    newPassword: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  resetPasswordForEmail: (
    email: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  updatePassword: (
    newPassword: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  resendConfirmationEmail: (
    email: string,
  ) => Promise<{ ok: boolean; error?: string }>;
};

const UserAuthContext = createContext<UserAuthState | null>(null);

function translateAuthError(msg?: string): string {
  if (!msg) return "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.";
  const lower = msg.toLowerCase();

  // Auth session missing / expired tokens
  if (
    lower.includes("auth session missing") ||
    lower.includes("session missing") ||
    lower.includes("no session") ||
    lower.includes("session_not_found")
  ) {
    return "انتهت صلاحية جلسة التحقق أو تم فتح الصفحة دون رابط صالح. يرجى الضغط على الرابط الأخير الذي وصلك في بريدك الإلكتروني، أو طلب رابط استعادة جديد أدناه.";
  }
  if (
    lower.includes("email link is invalid or has expired") ||
    lower.includes("token has expired") ||
    lower.includes("token is expired") ||
    lower.includes("otp_expired") ||
    lower.includes("invalid token")
  ) {
    return "انتهت صلاحية رابط التحقق هذا (الروابط صالحة للاستخدام لمرة واحدة فقط). يرجى طلب رابط جديد أدناه.";
  }
  if (
    lower.includes("code_challenge") ||
    lower.includes("flow state not found") ||
    lower.includes("bad_code_verifier")
  ) {
    return "انتهت صلاحية رمز التحقق أو تم استخدام الرابط مسبقاً. يرجى طلب رابط جديد لتعيين كلمة المرور.";
  }

  // Credentials & Login
  if (
    lower.includes("invalid login credentials") ||
    lower.includes("invalid_credentials") ||
    lower.includes("invalid username or password")
  ) {
    return "البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التأكد وإعادة المحاولة.";
  }
  if (lower.includes("email not confirmed")) {
    return "لم يتم تأكيد البريد الإلكتروني بعد. يرجى فحص صندوق الوارد (أو الرسائل غير المرغوب فيها Spam) والضغط على رابط التفعيل.";
  }
  if (
    lower.includes("user already registered") ||
    lower.includes("already registered") ||
    lower.includes("email already in use")
  ) {
    return "هذا البريد الإلكتروني مسجل بالفعل. يمكنك تسجيل الدخول مباشرة أو استعادة كلمة المرور.";
  }
  if (
    lower.includes("password should be at least") ||
    lower.includes("password is too short")
  ) {
    return "كلمة المرور يجب أن لا تقل عن 6 أحرف أو أرقام.";
  }
  if (
    lower.includes("rate limit") ||
    lower.includes("too many requests") ||
    lower.includes("over_email_send_rate_limit")
  ) {
    return "تم تجاوز عدد المحاولات المسموح به مؤقتاً. يرجى الانتظار بضع دقائق ثم إعادة المحاولة.";
  }
  if (lower.includes("user not found")) {
    return "لا يوجد حساب مسجل بهذا البريد الإلكتروني. يمكنك إنشاء حساب جديد.";
  }
  if (
    lower.includes("requires a secure password") ||
    lower.includes("weak_password")
  ) {
    return "يرجى اختيار كلمة مرور أكثر أماناً (تحتوي على أحرف وأرقام).";
  }
  if (lower.includes("signup disabled")) {
    return "تسجيل الحسابات الجديدة غير متاح حالياً.";
  }
  return msg;
}

function toProfile(id: string, r: ProfileRow | null): Profile {
  return {
    id,
    fullName: r?.full_name ?? "",
    phone: r?.phone ?? "",
    wilaya: r?.wilaya ?? "",
    commune: r?.commune ?? "",
    isApproved: r?.is_approved ?? false,
  };
}

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);

  const loadProfile = useCallback(async (uid: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", uid)
      .maybeSingle();
    setProfile(toProfile(uid, data as ProfileRow | null));
  }, []);

  useEffect(() => {
    let mounted = true;
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const initAuth = async () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash || "";
        const search = window.location.search || "";
        const pathname = window.location.pathname || "";

        if (
          pathname.includes("reset-password") ||
          hash.includes("type=recovery") ||
          search.includes("type=recovery") ||
          search.includes("reset=true")
        ) {
          setIsPasswordRecovery(true);
        }

        // 1. Handle PKCE code exchange in query params
        const urlParams = new URLSearchParams(search);
        const code = urlParams.get("code");
        const tokenHash = urlParams.get("token_hash");
        const type = urlParams.get("type");

        if (code) {
          try {
            const { data, error } = await supabase.auth.exchangeCodeForSession(code);
            if (!error && data.session && mounted) {
              setSession(data.session);
              await loadProfile(data.session.user.id);
              if (type === "recovery" || pathname.includes("reset-password")) {
                setIsPasswordRecovery(true);
              }
            }
          } catch (e) {
            console.warn("exchangeCodeForSession notice:", e);
          }
        } else if (tokenHash && type === "recovery") {
          try {
            const { data, error } = await supabase.auth.verifyOtp({
              token_hash: tokenHash,
              type: "recovery",
            });
            if (!error && data.session && mounted) {
              setSession(data.session);
              await loadProfile(data.session.user.id);
              setIsPasswordRecovery(true);
            }
          } catch (e) {
            console.warn("verifyOtp notice:", e);
          }
        }

        // 2. Handle token fragment in hash (#access_token=...&refresh_token=...)
        if (hash.startsWith("#")) {
          const hashParams = new URLSearchParams(hash.slice(1));
          const accessToken = hashParams.get("access_token");
          const refreshToken = hashParams.get("refresh_token");
          if (accessToken && refreshToken) {
            try {
              const { data, error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              });
              if (!error && data.session && mounted) {
                setSession(data.session);
                await loadProfile(data.session.user.id);
                if (
                  hashParams.get("type") === "recovery" ||
                  pathname.includes("reset-password")
                ) {
                  setIsPasswordRecovery(true);
                }
              }
            } catch (e) {
              console.warn("setSession notice:", e);
            }
          }
        }
      }

      // Check current active session
      try {
        const { data } = await supabase.auth.getSession();
        if (mounted) {
          if (data.session) {
            setSession(data.session);
            await loadProfile(data.session.user.id);
          }
        }
      } catch (err) {
        console.warn("Auth getSession error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initAuth();

    const { data: sub } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (!mounted) return;
        if (event === "PASSWORD_RECOVERY") {
          setIsPasswordRecovery(true);
        }
        setSession(newSession);
        if (newSession) await loadProfile(newSession.user.id);
        else setProfile(null);
      },
    );
    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe();
    };
  }, [loadProfile]);

  const signUp: UserAuthState["signUp"] = async (
    email,
    password,
    fullName,
    phone,
  ) => {
    if (!isSupabaseConfigured) {
      return {
        ok: false,
        error:
          "خدمة تسجيل الحساب غير متصلة بقاعدة البيانات (يرجى إدخال مفاتيح Supabase في Vercel).",
      };
    }
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          phone: phone.trim(),
        },
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/account`
            : undefined,
      },
    });
    if (error) return { ok: false, error: translateAuthError(error.message) };
    if (data.user) {
      await supabase
        .from("profiles")
        .upsert({ id: data.user.id, full_name: fullName.trim(), phone: phone.trim() });
    }
    return { ok: true };
  };

  const signIn: UserAuthState["signIn"] = async (email, password) => {
    if (!isSupabaseConfigured) {
      return {
        ok: false,
        error:
          "خدمة تسجيل الدخول غير متصلة بقاعدة البيانات (يرجى إدخال مفاتيح Supabase في Vercel).",
      };
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { ok: false, error: translateAuthError(error.message) };
    return { ok: true };
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut().catch(() => {});
    }
    setSession(null);
    setProfile(null);
  };

  const updateProfile: UserAuthState["updateProfile"] = async (data) => {
    if (!isSupabaseConfigured) {
      return {
        ok: false,
        error: "يرجى ربط Supabase لتعديل الملف الشخصي.",
      };
    }
    if (!session) return { ok: false, error: "Not logged in" };
    const row: Record<string, unknown> = {};
    if (data.fullName !== undefined) row.full_name = data.fullName;
    if (data.phone !== undefined) row.phone = data.phone;
    if (data.wilaya !== undefined) row.wilaya = data.wilaya;
    if (data.commune !== undefined) row.commune = data.commune;
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: session.user.id, ...row });
    if (error) return { ok: false, error: error.message };
    setProfile((p) => (p ? { ...p, ...data } : p));
    return { ok: true };
  };

  const changePassword: UserAuthState["changePassword"] = async (
    oldPassword,
    newPassword,
  ) => {
    if (!isSupabaseConfigured) {
      return { ok: false, error: "قاعدة بيانات Supabase غير متصلة." };
    }
    const userEmail = session?.user?.email;
    if (!userEmail) {
      return { ok: false, error: "يجب تسجيل الدخول أولاً لتغيير كلمة المرور." };
    }
    if (!oldPassword.trim()) {
      return {
        ok: false,
        error: "يرجى إدخال كلمة المرور الحالية أولاً للتحقق من هويتك.",
      };
    }
    if (!newPassword || newPassword.length < 6) {
      return {
        ok: false,
        error: "كلمة المرور الجديدة يجب أن لا تقل عن 6 أحرف أو أرقام.",
      };
    }
    if (oldPassword === newPassword) {
      return {
        ok: false,
        error: "كلمة المرور الجديدة مطابقة لكلمة المرور القديمة. يرجى اختيار كلمة مرور جديدة.",
      };
    }

    // 1. First verify the old password by re-authenticating with Supabase
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: oldPassword,
    });

    if (verifyError) {
      return {
        ok: false,
        error: "كلمة المرور الحالية غير صحيحة. يرجى التأكد وإعادة المحاولة.",
      };
    }

    // 2. Old password verified successfully! Now update to new password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      return {
        ok: false,
        error: translateAuthError(updateError.message),
      };
    }

    return { ok: true };
  };

  const resetPasswordForEmail: UserAuthState["resetPasswordForEmail"] = async (
    email,
  ) => {
    if (!isSupabaseConfigured) {
      return { ok: false, error: "قاعدة بيانات Supabase غير متصلة." };
    }
    const cleanEmail = email.trim();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return { ok: false, error: "يرجى إدخال عنوان بريد إلكتروني صحيح." };
    }

    const redirectUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/reset-password`
        : undefined;

    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: redirectUrl,
    });

    if (error) {
      return {
        ok: false,
        error: translateAuthError(error.message),
      };
    }

    return { ok: true };
  };

  const updatePassword: UserAuthState["updatePassword"] = async (
    newPassword,
  ) => {
    if (!isSupabaseConfigured) {
      return { ok: false, error: "قاعدة بيانات Supabase غير متصلة." };
    }
    if (!newPassword || newPassword.length < 6) {
      return {
        ok: false,
        error: "كلمة المرور يجب أن لا تقل عن 6 أحرف أو أرقام.",
      };
    }

    // Verify session before calling updateUser to prevent raw 'Auth session missing!' error
    let activeSession = session;
    if (!activeSession) {
      const { data } = await supabase.auth.getSession();
      activeSession = data.session;
      if (activeSession) setSession(activeSession);
    }

    if (!activeSession) {
      return {
        ok: false,
        error:
          "انتهت صلاحية جلسة التحقق أو لم يتم العثور على جلسة مفعلة. يرجى الضغط على الرابط الأخير في بريدك الإلكتروني، أو إدخال بريدك أدناه لإرسال رابط جديد.",
      };
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      return {
        ok: false,
        error: translateAuthError(error.message),
      };
    }
    setIsPasswordRecovery(false);
    return { ok: true };
  };

  const resendConfirmationEmail: UserAuthState["resendConfirmationEmail"] =
    async (email) => {
      if (!isSupabaseConfigured) {
        return { ok: false, error: "قاعدة بيانات Supabase غير متصلة." };
      }
      const cleanEmail = email.trim();
      if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        return { ok: false, error: "يرجى إدخال عنوان بريد إلكتروني صحيح." };
      }
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: cleanEmail,
        options: {
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/account`
              : undefined,
        },
      });
      if (error) {
        return { ok: false, error: translateAuthError(error.message) };
      }
      return { ok: true };
    };

  const value: UserAuthState = {
    loading,
    session,
    userId: session?.user.id ?? null,
    email: session?.user.email ?? null,
    profile,
    isLoggedIn: !!session,
    isPasswordRecovery,
    setIsPasswordRecovery,
    signUp,
    signIn,
    signOut,
    updateProfile,
    changePassword,
    resetPasswordForEmail,
    updatePassword,
    resendConfirmationEmail,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const ctx = useContext(UserAuthContext);
  if (!ctx) throw new Error("useUserAuth must be used within UserAuthProvider");
  return ctx;
}
