import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, type ProfileRow } from "@/lib/supabase";

export type Profile = {
  id: string;
  fullName: string;
  phone: string;
  wilaya: string;
  commune: string;
};

type UserAuthState = {
  loading: boolean;
  session: Session | null;
  userId: string | null;
  email: string | null;
  profile: Profile | null;
  isLoggedIn: boolean;
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
};

const UserAuthContext = createContext<UserAuthState | null>(null);

function toProfile(id: string, r: ProfileRow | null): Profile {
  return {
    id,
    fullName: r?.full_name ?? "",
    phone: r?.phone ?? "",
    wilaya: r?.wilaya ?? "",
    commune: r?.commune ?? "",
  };
}

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

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
    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      if (data.session) await loadProfile(data.session.user.id);
      if (mounted) setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
        if (newSession) await loadProfile(newSession.user.id);
        else setProfile(null);
      },
    );
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signUp: UserAuthState["signUp"] = async (
    email,
    password,
    fullName,
    phone,
  ) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { ok: false, error: error.message };
    if (data.user) {
      await supabase
        .from("profiles")
        .upsert({ id: data.user.id, full_name: fullName, phone });
    }
    return { ok: true };
  };

  const signIn: UserAuthState["signIn"] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  };

  const updateProfile: UserAuthState["updateProfile"] = async (data) => {
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

  const value: UserAuthState = {
    loading,
    session,
    userId: session?.user.id ?? null,
    email: session?.user.email ?? null,
    profile,
    isLoggedIn: !!session,
    signUp,
    signIn,
    signOut,
    updateProfile,
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
