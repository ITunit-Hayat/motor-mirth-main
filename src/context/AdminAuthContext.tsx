import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export type AdminRole = "SuperAdmin" | "SalesAgent";

type AdminAuthState = {
  loading: boolean;
  isAuthenticated: boolean;
  role: AdminRole | null;
  needsLogin: boolean;
  signIn: (
    password: string,
    role?: AdminRole,
  ) => Promise<{ ok: boolean; error?: string }>;
  loginWithPassword: (
    password: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  loginAsDemo: (role?: AdminRole) => void;
  signOut: () => Promise<void>;
  changePassword: (newPass: string) => Promise<void>;
  currentPasswordHint: string;
  isSuperAdmin: boolean;
  email: string | null;
};

const AUTH_SESSION_KEY = "velocity_admin_passcode_session";
export const DEFAULT_PASSCODE = "admin123";
const TABLE = "admin_config";
const ROW_ID = "default";

const AdminAuthContext = createContext<AdminAuthState | null>(null);

/* SINGLETON STORE — same reasoning as src/lib/settings.ts: only ever open
   ONE Realtime channel for the whole app. */
let currentPasscode = DEFAULT_PASSCODE;
const listeners = new Set<(p: string) => void>();
let started = false;

function emit() {
  listeners.forEach((l) => l(currentPasscode));
}

function startOnce() {
  if (started || typeof window === "undefined" || !isSupabaseConfigured) return;
  started = true;

  void supabase
    .from(TABLE)
    .select("passcode")
    .eq("id", ROW_ID)
    .maybeSingle()
    .then(({ data, error }) => {
      if (!error && data?.passcode) {
        currentPasscode = data.passcode;
        emit();
      }
    })
    .catch((err) => {
      console.warn("Failed to load admin passcode:", err);
    });

  try {
    supabase
      .channel("admin-config-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: TABLE, filter: `id=eq.${ROW_ID}` },
        (payload) => {
          const row = payload.new as { passcode?: string } | undefined;
          if (row?.passcode) {
            currentPasscode = row.passcode;
            emit();
          }
        },
      )
      .subscribe();
  } catch (err) {
    console.warn("Admin realtime channel subscription failed:", err);
  }
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<AdminRole | null>(null);
  const [passcode, setPasscode] = useState(currentPasscode);

  useEffect(() => {
    startOnce();
    setPasscode(currentPasscode);
    listeners.add(setPasscode);
    return () => {
      listeners.delete(setPasscode);
    };
  }, []);

  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(AUTH_SESSION_KEY);
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (parsed?.authenticated) {
          setIsAuthenticated(true);
          setRole(parsed.role || "SuperAdmin");
        }
      }
    } catch {
      setIsAuthenticated(false);
      setRole(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithPassword = async (
    pass: string,
  ): Promise<{ ok: boolean; error?: string }> => {
    if (pass.trim() === passcode) {
      setIsAuthenticated(true);
      setRole("SuperAdmin");
      try {
        localStorage.setItem(
          AUTH_SESSION_KEY,
          JSON.stringify({
            authenticated: true,
            role: "SuperAdmin",
            timestamp: Date.now(),
          }),
        );
      } catch {
        /* private browsing — session just won't survive a refresh */
      }
      return { ok: true };
    }
    return {
      ok: false,
      error: "كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى.",
    };
  };

  const signIn = async (firstArg: string, secondArg?: unknown) => {
    const pass = typeof secondArg === "string" ? secondArg : firstArg;
    return loginWithPassword(pass);
  };

  const loginAsDemo = (r: AdminRole = "SuperAdmin") => {
    setIsAuthenticated(true);
    setRole(r);
    try {
      localStorage.setItem(
        AUTH_SESSION_KEY,
        JSON.stringify({ authenticated: true, role: r, timestamp: Date.now() }),
      );
    } catch {
      /* private browsing — session just won't survive a refresh */
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem(AUTH_SESSION_KEY);
    } catch {
      /* nothing to clean up */
    }
    setIsAuthenticated(false);
    setRole(null);
  };

  const changePassword = useCallback(async (newPass: string) => {
    const clean = newPass.trim();
    if (!clean) return;
    const prev = currentPasscode;
    currentPasscode = clean;
    emit();

    const { error } = await supabase.from(TABLE).upsert({
      id: ROW_ID,
      passcode: clean,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      currentPasscode = prev;
      emit();
      throw new Error(error.message);
    }
  }, []);

  const value: AdminAuthState = {
    loading,
    isAuthenticated,
    role,
    needsLogin: !loading && !isAuthenticated,
    signIn,
    loginWithPassword,
    loginAsDemo,
    signOut,
    changePassword,
    currentPasswordHint: passcode,
    isSuperAdmin: role === "SuperAdmin" || isAuthenticated,
    email: "admin@velocitymotors.com",
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
    return {
      loading: false,
      isAuthenticated: true,
      role: "SuperAdmin" as AdminRole,
      needsLogin: false,
      signIn: async () => ({ ok: true }),
      loginWithPassword: async () => ({ ok: true }),
      loginAsDemo: () => {},
      signOut: async () => {},
      changePassword: async () => {},
      currentPasswordHint: DEFAULT_PASSCODE,
      isSuperAdmin: true,
      email: "admin@velocitymotors.com",
    };
  }
  return ctx;
}
