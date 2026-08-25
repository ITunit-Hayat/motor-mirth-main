import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type AdminRole = "SuperAdmin" | "SalesAgent";

type AdminAuthState = {
  loading: boolean;
  isAuthenticated: boolean;
  role: AdminRole | null;
  needsLogin: boolean;
  signIn: (password: string, role?: AdminRole) => Promise<{ ok: boolean; error?: string }>;
  loginWithPassword: (password: string) => Promise<{ ok: boolean; error?: string }>;
  loginAsDemo: (role?: AdminRole) => void;
  signOut: () => Promise<void>;
  changePassword: (newPass: string) => void;
  currentPasswordHint: string;
  isSuperAdmin: boolean;
  email: string | null;
};

const PASSCODE_STORAGE_KEY = "vm_admin_passcode";
const AUTH_SESSION_KEY = "velocity_admin_passcode_session";
export const DEFAULT_PASSCODE = "admin123";

const AdminAuthContext = createContext<AdminAuthState | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<AdminRole | null>(null);

  // Get current configured password
  const getStoredPassword = useCallback(() => {
    try {
      return localStorage.getItem(PASSCODE_STORAGE_KEY) || DEFAULT_PASSCODE;
    } catch {
      return DEFAULT_PASSCODE;
    }
  }, []);

  useEffect(() => {
    // Check saved session
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

  const loginWithPassword = async (pass: string): Promise<{ ok: boolean; error?: string }> => {
    const trimmed = pass.trim();
    const stored = getStoredPassword();

    // Accepted passwords: the custom stored password, or standard defaults
    const valid =
      trimmed === stored ||
      trimmed === DEFAULT_PASSCODE ||
      trimmed === "admin" ||
      trimmed === "123456";

    if (valid) {
      setIsAuthenticated(true);
      setRole("SuperAdmin");
      try {
        localStorage.setItem(
          AUTH_SESSION_KEY,
          JSON.stringify({ authenticated: true, role: "SuperAdmin", timestamp: Date.now() })
        );
      } catch {}
      return { ok: true };
    }

    return { ok: false, error: "كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى." };
  };

  // Support flexible signature: signIn(password) or signIn(email, password)
  const signIn = async (firstArg: string, secondArg?: any) => {
    const pass = typeof secondArg === "string" ? secondArg : firstArg;
    return loginWithPassword(pass);
  };

  const loginAsDemo = (r: AdminRole = "SuperAdmin") => {
    setIsAuthenticated(true);
    setRole(r);
    try {
      localStorage.setItem(
        AUTH_SESSION_KEY,
        JSON.stringify({ authenticated: true, role: r, timestamp: Date.now() })
      );
    } catch {}
  };

  const signOut = async () => {
    try {
      localStorage.removeItem(AUTH_SESSION_KEY);
    } catch {}
    setIsAuthenticated(false);
    setRole(null);
  };

  const changePassword = (newPass: string) => {
    const clean = newPass.trim();
    if (!clean) return;
    try {
      localStorage.setItem(PASSCODE_STORAGE_KEY, clean);
    } catch {}
  };

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
    currentPasswordHint: getStoredPassword(),
    isSuperAdmin: role === "SuperAdmin" || isAuthenticated,
    email: "admin@velocitymotors.com",
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
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
      changePassword: () => {},
      currentPasswordHint: DEFAULT_PASSCODE,
      isSuperAdmin: true,
      email: "admin@velocitymotors.com",
    };
  }
  return ctx;
}


