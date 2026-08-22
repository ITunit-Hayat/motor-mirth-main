const KEY = "vm_admin_session";

export function isAdminAuthed(): boolean {
  try { return sessionStorage.getItem(KEY) === "1"; } catch { return false; }
}
export function adminLogin(pass: string, expected: string): boolean {
  if (pass === expected) {
    try { sessionStorage.setItem(KEY, "1"); } catch {}
    return true;
  }
  return false;
}
export function adminLogout() {
  try { sessionStorage.removeItem(KEY); } catch {}
}
