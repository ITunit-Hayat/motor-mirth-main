import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/PublicLayout";
import { useLanguage } from "@/context/LanguageContext";
import { useDealership } from "@/context/DealershipContext";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — VelocityMotors" }] }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLanguage();
  const { addOrder } = useDealership();
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget as HTMLFormElement;
    const fd = new FormData(f);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    if (!name || !email || !message) { toast.error("Please complete all fields."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error(t("emailAddress")); return; }
    setBusy(true);
    try {
      await addOrder({
        fullName: name, email, phone: "—", city: "—", notes: message.slice(0, 200),
        carId: "contact", carTitle: "General inquiry",
      });
      setSent(true);
      toast.success(t("contactSent"));
      f.reset();
    } catch {
      toast.error("Send failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          <div className="bg-card border border-border rounded-2xl shadow-elegant p-6 md:p-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-center">{t("contactHeroTitle")}</h1>
            {sent ? (
              <div className="mt-8 text-center rounded-xl bg-secondary p-8">
                <CheckCircle2 className="h-10 w-10 mx-auto text-accent" />
                <div className="mt-3 font-bold">{t("contactSent")}</div>
                <button onClick={() => setSent(false)} className="mt-4 text-sm font-semibold text-primary hover:text-accent">{t("inquirySuccessMsg")}</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground flex justify-between"><span>{t("contactName")}</span><span className="opacity-60">Required</span></label>
                  <input name="name" required className="mt-1 w-full h-11 px-3 rounded-md bg-background border border-input text-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">{t("contactEmail")}</label>
                  <input name="email" type="email" required className="mt-1 w-full h-11 px-3 rounded-md bg-background border border-input text-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">{t("contactMessage")}</label>
                  <textarea name="message" rows={6} required className="mt-1 w-full px-3 py-2 rounded-md bg-background border border-input text-sm resize-none" />
                </div>
                <button type="submit" disabled={busy} className="w-full h-12 rounded-lg bg-gradient-accent text-accent-foreground font-bold flex items-center justify-center gap-2 disabled:opacity-60">
                  {busy ? <span className="spin inline-block h-4 w-4 border-2 border-white/60 border-t-white rounded-full" /> : <Send className="h-4 w-4" />}
                  {t("contactSend")}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-4">
            {[
              { Icon: Phone, label: t("contactPhone"), val: t("contactPhoneVal") },
              { Icon: Mail, label: t("contactEmail2"), val: t("contactEmailVal") },
              { Icon: MapPin, label: t("contactShowroom"), val: t("contactLocationVal") },
            ].map(({ Icon, label, val }) => (
              <div key={label} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 shadow-card">
                <div className="h-12 w-12 grid place-items-center rounded-xl bg-accent/15 text-accent"><Icon className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
                  <div className="font-display font-bold">{val}</div>
                </div>
              </div>
            ))}

            <div className="rounded-2xl overflow-hidden border border-border shadow-card">
              <iframe
                title="Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-118.282%2C34.038%2C-118.252%2C34.058&layer=mapnik&marker=34.048%2C-118.267"
                className="w-full h-72 border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
