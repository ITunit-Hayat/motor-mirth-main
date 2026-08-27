import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Settings as SettingsIcon,
  Save,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Type,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/AdminLayout";
import { useSettings, type SiteSettings } from "@/lib/settings";
import { useAdminAuth } from "@/context/AdminAuthContext";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "إعدادات الموقع والمعرض — لوحة الإدارة" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [saved, setSaved] = useSettings();
  const [f, setF] = useState<SiteSettings>(saved);
  const { changePassword, currentPasswordHint } = useAdminAuth();
  const [newPass, setNewPass] = useState("");
  const [passSaved, setPassSaved] = useState(false);

  const [saving, setSaving] = useState(false);

  useEffect(() => setF(saved), [saved]);

  const set = <K extends keyof SiteSettings>(k: K, v: SiteSettings[K]) =>
    setF((s) => ({ ...s, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setSaved(f);
      toast.success(
        "تم حفظ الإعدادات — راح يشوفها كل الزوار فوراً على أي جهاز أو متصفح",
      );
    } catch (err) {
      toast.error(
        err instanceof Error
          ? `تعذّر الحفظ: ${err.message}`
          : "تعذّر الحفظ. تأكد من تشغيل ملف supabase/005_shared_site_settings.sql في Supabase.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass.trim() || newPass.trim().length < 4) {
      toast.error("يرجى إدخال كلمة مرور لا تقل عن 4 خانات");
      return;
    }
    changePassword(newPass.trim());
    setPassSaved(true);
    setNewPass("");
    toast.success("تم تحديث كلمة مرور لوحة الإدارة بنجاح!");
    setTimeout(() => setPassSaved(false), 3000);
  };

  const input =
    "mt-1 w-full h-11 px-3.5 rounded-xl bg-background border border-input text-sm focus:ring-2 focus:ring-accent outline-none text-foreground";

  return (
    <AdminLayout>
      <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2.5">
        <SettingsIcon className="h-6 w-6 text-accent" /> إعدادات المعرض والموقع
      </h1>
      <p className="text-muted-foreground text-sm mt-1">
        التحكم في هوية المعرض ومعلومات التواصل وكلمة مرور لوحة الإدارة. يتم
        تطبيق أي تعديل فورياً.
      </p>

      <form
        onSubmit={submit}
        className="mt-8 grid gap-6 lg:grid-cols-2 max-w-4xl"
      >
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card space-y-4">
          <h2 className="font-bold text-foreground text-base">
            هوية الموقع والمعرض
          </h2>
          <div>
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Type className="h-3.5 w-3.5" /> اسم المعرض / العلامة التجارية
            </label>
            <input
              value={f.siteName}
              onChange={(e) => set("siteName", e.target.value)}
              className={input}
            />
          </div>
          <label className="flex items-center gap-2.5 text-sm cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={f.showDiscountBanner}
              onChange={(e) => set("showDiscountBanner", e.target.checked)}
              className="rounded border-input text-accent"
            />
            <span className="font-medium">
              تفعيل شريط العروض والخصومات وقسم الصفقات الساخنة
            </span>
          </label>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-card space-y-4">
          <h2 className="font-bold text-foreground text-base">
            معلومات التواصل (المعروضة للعملاء)
          </h2>
          <div>
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> رقم الهاتف الرئيسي
            </label>
            <input
              value={f.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={input}
              dir="ltr"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> البريد الإلكتروني الرسمي
            </label>
            <input
              value={f.email}
              onChange={(e) => set("email", e.target.value)}
              className={input}
              dir="ltr"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> عنوان المقر الرئيسي / المعرض
            </label>
            <input
              value={f.address}
              onChange={(e) => set("address", e.target.value)}
              className={input}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <MessageCircle className="h-3.5 w-3.5" /> رقم الواتساب الرسمي (مع
              رمز الدولة الدولي)
            </label>
            <input
              value={f.whatsapp}
              onChange={(e) =>
                set("whatsapp", e.target.value.replace(/\D/g, ""))
              }
              className={input}
              placeholder="966555550101"
              dir="ltr"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="lg:col-span-2 h-12 rounded-xl bg-accent text-accent-foreground font-bold inline-flex items-center justify-center gap-2 max-w-xs shadow-md hover:opacity-90 transition-opacity cursor-pointer text-sm disabled:opacity-60"
        >
          <Save className="h-4 w-4" />{" "}
          {saving ? "جارٍ الحفظ…" : "حفظ بيانات الموقع"}
        </button>
      </form>

      {/* Admin Passcode Management */}
      <div className="mt-8 max-w-4xl bg-card border border-border rounded-2xl p-6 shadow-card">
        <h2 className="font-bold flex items-center gap-2 text-foreground text-base">
          <KeyRound className="h-5 w-5 text-accent" /> كلمة مرور لوحة الإدارة
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          يتم الدخول للوحة التحكم مباشرة بكلمة المرور دون الحاجة لحساب أو بريد
          إلكتروني.
        </p>

        <form
          onSubmit={handlePasswordChange}
          className="mt-5 max-w-md space-y-3"
        >
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">
              تعيين كلمة مرور جديدة للإدارة
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="أدخل كلمة مرور جديدة..."
                className="flex-1 h-11 px-3.5 rounded-xl bg-background border border-input text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent font-mono"
                dir="ltr"
              />
              <button
                type="submit"
                className="h-11 px-5 rounded-xl bg-accent text-accent-foreground font-bold text-xs shadow-sm hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
              >
                تحديث كلمة المرور
              </button>
            </div>
          </div>

          {passSaved && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
              <CheckCircle2 className="h-4 w-4" /> تم حفظ وتطبيق كلمة المرور
              الجديدة بنجاح!
            </div>
          )}

          <div className="text-xs text-muted-foreground pt-1">
            كلمة المرور الفعالة حالياً:{" "}
            <span className="font-mono font-bold text-foreground" dir="ltr">
              {currentPasswordHint}
            </span>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
