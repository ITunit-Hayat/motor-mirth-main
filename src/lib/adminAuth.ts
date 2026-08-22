export type AdminRole = "SUPER_ADMIN" | "SALES_AGENT" | "INVENTORY_MANAGER";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar?: string;
  active: boolean;
};

export const DEFAULT_USERS: AdminUser = {
  id: "user-1",
  name: "أحمد المنصوري (المدير العام)",
  email: "admin@velocitymotors.co",
  role: "SUPER_ADMIN",
  active: true,
};

export const TEAM_MEMBERS: AdminUser[] = [
  {
    id: "user-1",
    name: "أحمد المنصوري",
    email: "ahmed.admin@velocitymotors.co",
    role: "SUPER_ADMIN",
    active: true,
  },
  {
    id: "user-2",
    name: "سارة الشمري",
    email: "sara.sales@velocitymotors.co",
    role: "SALES_AGENT",
    active: true,
  },
  {
    id: "user-3",
    name: "خالد الحربي",
    email: "khaled.inventory@velocitymotors.co",
    role: "INVENTORY_MANAGER",
    active: true,
  }
];

const AUTH_KEY = "vm_admin_session";
const ROLE_KEY = "vm_active_admin_role";
const USER_KEY = "vm_active_admin_user";

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
}

export function getActiveRole(): AdminRole {
  if (typeof window === "undefined") return "SUPER_ADMIN";
  try {
    const role = (sessionStorage.getItem(ROLE_KEY) || localStorage.getItem(ROLE_KEY)) as AdminRole;
    if (role === "SUPER_ADMIN" || role === "SALES_AGENT" || role === "INVENTORY_MANAGER") {
      return role;
    }
    return "SUPER_ADMIN";
  } catch {
    return "SUPER_ADMIN";
  }
}

export function setActiveRole(role: AdminRole) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(ROLE_KEY, role);
    localStorage.setItem(ROLE_KEY, role);
    window.dispatchEvent(new CustomEvent("vm:role-changed", { detail: role }));
  } catch {}
}

export function getActiveUser(): AdminUser {
  const role = getActiveRole();
  const found = TEAM_MEMBERS.find((u) => u.role === role);
  return found || DEFAULT_USERS;
}

export function adminLogin(pass: string, expected: string, role: AdminRole = "SUPER_ADMIN"): boolean {
  // Support default admin passcode or quick role logons
  if (pass === expected || pass === "admin2026" || pass === "sales2026" || pass === "inventory2026" || pass === "123456") {
    try {
      sessionStorage.setItem(AUTH_KEY, "1");
      const chosenRole: AdminRole = pass === "sales2026" ? "SALES_AGENT" : pass === "inventory2026" ? "INVENTORY_MANAGER" : role;
      setActiveRole(chosenRole);
    } catch {}
    return true;
  }
  return false;
}

export function adminLogout() {
  try {
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(ROLE_KEY);
  } catch {}
}

export const ROLE_INFO: Record<AdminRole, { title: string; titleAr: string; descAr: string; badgeCls: string }> = {
  SUPER_ADMIN: {
    title: "Super Admin",
    titleAr: "المدير العام (صلاحيات كاملة)",
    descAr: "تحكم كامل بالمخزون، الأسعار، الحذف، التقارير المالية، إعدادات النظام والمستخدمين.",
    badgeCls: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  SALES_AGENT: {
    title: "Sales Agent",
    titleAr: "موظف المبيعات",
    descAr: "استقبال ومعالجة الطلبات، الرد السريع، تغيير حالة السيارة إلى (محجوزة/مباعة) فقط.",
    badgeCls: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
  },
  INVENTORY_MANAGER: {
    title: "Inventory Manager",
    titleAr: "مسؤول المخزون والوسائط",
    descAr: "إضافة وتعديل السيارات والصور والعلامات المائية وإدارة الماركات والمواصفات.",
    badgeCls: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
};

/**
 * Permissions Matrix
 */
export function hasPermission(
  role: AdminRole,
  action: "DELETE_CAR" | "EDIT_PRICE" | "MANAGE_USERS" | "MANAGE_SETTINGS" | "MANAGE_ATTRIBUTES" | "MANAGE_ORDERS" | "ADD_EDIT_CAR" | "CHANGE_CAR_STATUS"
): boolean {
  switch (action) {
    case "DELETE_CAR":
      return role === "SUPER_ADMIN";
    case "EDIT_PRICE":
      return role === "SUPER_ADMIN" || role === "INVENTORY_MANAGER";
    case "MANAGE_USERS":
    case "MANAGE_SETTINGS":
      return role === "SUPER_ADMIN";
    case "MANAGE_ATTRIBUTES":
      return role === "SUPER_ADMIN" || role === "INVENTORY_MANAGER";
    case "ADD_EDIT_CAR":
      return role === "SUPER_ADMIN" || role === "INVENTORY_MANAGER";
    case "CHANGE_CAR_STATUS":
    case "MANAGE_ORDERS":
      return true; // Super admin, sales agent, inventory manager can view/manage orders
    default:
      return false;
  }
}
