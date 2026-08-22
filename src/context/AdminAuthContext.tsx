import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, type AdminUserRow } from "@/lib/supabase";

export type AdminRole = "SuperAdmin" | "SalesAgent";

type AdminAuthState = {
  /** null while the initial session/role check is still running. */
  loading: boolean;
  session: Session | null;
  email: string | null;
  role: AdminRole | null;
  /** True once we know there is no valid, authorized admin session. */
  needsLogin: boolean;
  signIn: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => Promise<void>;
  isSuperAdmin: boolean;
};

const AdminAuthContext = createContext<AdminAuthState | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AdminRole | null>(null);

  const resolveRole = useCallback(async (s: Session | null) => {
    if (!s) {
      setRole(null);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("id", s.user.id)
        .maybeSingle();
      if (error || !data) {
        // Signed in with Supabase Auth but not registered as an admin — deny.
        setRole(null);
        return;
      }
      setRole((data as AdminUserRow).role);
    } catch {
      setRole(null);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      await resolveRole(data.session);
      if (mounted) setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      await resolveRole(newSession);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [resolveRole]);

  const signIn: AdminAuthState["signIn"] = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, error: error.message };
    await resolveRole(data.session);
    // Re-check role synchronously since state updates are async.
    const { data: roleRow } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", data.user.id)
      .maybeSingle();
    if (!roleRow) {
      await supabase.auth.signOut();
      return {
        ok: false,
        error: "This account isn't registered as an admin. Ask a Super Admin to add you.",
      };
    }
    return { ok: true };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setRole(null);
  };

  const value: AdminAuthState = {
    loading,
    session,
    email: session?.user.email ?? null,
    role,
    needsLogin: !loading && (!session || !role),
    signIn,
    signOut,
    isSuperAdmin: role === "SuperAdmin",
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
