import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";

export type AdminRole = "SuperAdmin" | "SalesAgent";

type AdminAuthState = {
  loading: boolean;
  isAuthenticated: boolean;
  role: AdminRole | null;
  needsLogin: boolean;
  /** Real Supabase Auth sign-in (email + password), then verifies the
   *  account exists in `admin_users` before granting access. */
  loginWithPassword: (
    email: string,
    password: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => Promise<void>;
  /** Changes the *currently signed-in admin's own* password. */
  changePassword: (newPass: string) => Promise<void>;
  isSuperAdmin: boolean;
  email: string | null;
};

const AdminAuthContext = createContext<AdminAuthState | null>(null);

function translateAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) {
    return "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
  }
  if (m.includes("email not confirmed")) {
    return "يرجى تأكيد البريد الإلكتروني أولاً.";
  }
  return message;
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<AdminRole | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const checkAdmin = useCallback(async (userId: string | undefined, userEmail: string | null) => {
    if (!userId) {
      setIsAuthenticated(false);
      setRole(null);
      setEmail(null);
      return;
    }
    const { data } = await supabase
      .from("admin_users")
      .select("role")
      .eq("id", userId)
      .maybeSingle();

    if (data?.role) {
      setIsAuthenticated(true);
      setRole(data.role as AdminRole);
      setEmail(userEmail);
    } else {
      // Signed in (maybe as a regular member) but not an admin account.
      setIsAuthenticated(false);
      setRole(null);
      setEmail(null);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(async ({ data }) => {
      await checkAdmin(data.session?.user.id, data.session?.user.email ?? null);
      if (mounted) setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      void checkAdmin(session?.user.id, session?.user.email ?? null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [checkAdmin]);

  const loginWithPassword = async (
    email: string,
    password: string,
  ): Promise<{ ok: boolean; error?: string }> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) {
      return { ok: false, error: translateAuthError(error.message) };
    }

    const { data: adminRow } = await supabase
      .from("admin_users")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    if (!adminRow?.role) {
      await supabase.auth.signOut();
      return {
        ok: false,
        error: "هذا الحساب غير مصرّح له بالدخول إلى لوحة الإدارة.",
      };
    }

    setIsAuthenticated(true);
    setRole(adminRow.role as AdminRole);
    setEmail(data.user.email ?? null);
    return { ok: true };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setRole(null);
    setEmail(null);
  };

  const changePassword = useCallback(async (newPass: string) => {
    const clean = newPass.trim();
    if (!clean) return;
    const { error } = await supabase.auth.updateUser({ password: clean });
    if (error) throw new Error(error.message);
  }, []);

  const value: AdminAuthState = {
    loading,
    isAuthenticated,
    role,
    needsLogin: !loading && !isAuthenticated,
    loginWithPassword,
    signOut,
    changePassword,
    isSuperAdmin: role === "SuperAdmin",
    email,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthState {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    // Safe-by-default fallback: NOT authenticated. (Unlike the old fallback,
    // this never grants access just because the provider is missing.)
    return {
      loading: false,
      isAuthenticated: false,
      role: null,
      needsLogin: true,
      loginWithPassword: async () => ({
        ok: false,
        error: "AdminAuthProvider is not mounted.",
      }),
      signOut: async () => {},
      changePassword: async () => {
        throw new Error("AdminAuthProvider is not mounted.");
      },
      isSuperAdmin: false,
      email: null,
    };
  }
  return ctx;
}
