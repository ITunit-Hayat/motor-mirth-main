import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Settings as SettingsIcon, Save, KeyRound, Phone, Mail, MapPin, MessageCircle, Type } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/AdminLayout";
import { useSettings, type SiteSettings } from "@/lib/settings";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Site Settings — Admin" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [saved, setSaved] = useSettings();
  const [f, setF] = useState<SiteSettings>(saved);
  useEffect(() => setF(saved), [saved]);

  const set = <K extends keyof SiteSettings>(k: K, v: SiteSettings[K]) => setF((s) => ({ ...s, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(f);
    toast.success("Settings saved — applied site-wide instantly");
  };

  const input = "mt-1 w-full h-11 px-3 rounded-md bg-background border border-input text-sm";

  return (
    <AdminLayout>
      <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
        <SettingsIcon className="h-6 w-6 text-accent" /> Site Settings
      </h1>
      <p className="text-muted-foreground text-sm mt-1">
        Control the site's identity, contact info and admin security. Changes apply immediately on the public site.
      </p>

      <form onSubmit={submit} className="mt-8 grid gap-6 lg:grid-cols-2 max-w-4xl">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card space-y-4">
          <h2 className="font-bold">Site identity</h2>
          <div>
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1"><Type className="h-3 w-3" /> Site name</label>
            <input value={f.siteName} onChange={(e) => set("siteName", e.target.value)} className={input} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={f.showDiscountBanner} onChange={(e) => set("showDiscountBanner", e.target.checked)} />
            Show discount badges / hot deals section
          </label>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-card space-y-4">
          <h2 className="font-bold">Contact info (shown to visitors)</h2>
          <div>
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</label>
            <input value={f.phone} onChange={(e) => set("phone", e.target.value)} className={input} />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" /> Email</label>
            <input value={f.email} onChange={(e) => set("email", e.target.value)} className={input} />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> Showroom address</label>
            <input value={f.address} onChange={(e) => set("address", e.target.value)} className={input} />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1"><MessageCircle className="h-3 w-3" /> WhatsApp number (international, digits only)</label>
            <input value={f.whatsapp} onChange={(e) => set("whatsapp", e.target.value.replace(/\D/g, ""))} className={input} placeholder="15555550101" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-card lg:col-span-2">
          <h2 className="font-bold flex items-center gap-2"><KeyRound className="h-4 w-4 text-accent" /> Admin security</h2>
          <p className="text-xs text-muted-foreground mt-1">Change the passcode required to open this dashboard. Default: admin2026</p>
          <div className="mt-4 max-w-sm">
            <label className="text-xs font-semibold text-muted-foreground">New admin passcode</label>
            <input type="password" value={f.adminPasscode} onChange={(e) => set("adminPasscode", e.target.value)} className={input} />
          </div>
        </div>

        <button type="submit" className="lg:col-span-2 h-12 rounded-xl bg-gradient-accent text-accent-foreground font-bold inline-flex items-center justify-center gap-2 max-w-xs">
          <Save className="h-4 w-4" /> Save settings
        </button>
      </form>
    </AdminLayout>
  );
}
