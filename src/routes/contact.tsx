import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!fd.get("name") || !fd.get("email") || !fd.get("message")) {
      toast.error(t("contactFillAll"));
      return;
    }
    toast.success(t("contactSuccessToast"));
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <PublicLayout>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">{t("contactHeroTitle")}</h1>
          <p className="mt-3 opacity-85 max-w-xl text-base md:text-lg">{t("contactHeroDesc")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <InfoRow icon={Phone} label={t("contactPhoneLabel")} value="(555) 010-2024" dir="ltr" isPhone />
          <InfoRow icon={Mail} label={t("contactEmailLabel")} value="hello@velocitymotors.co" dir="ltr" />
          <InfoRow icon={MapPin} label={t("contactShowroomLabel")} value={t("contactShowroomAddr")} />

          <div className="rounded-2xl overflow-hidden border border-border shadow-card aspect-[16/10] bg-muted">
            <iframe
              title="Map"
              className="w-full h-full border-0"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-118.267%2C34.045%2C-118.257%2C34.055&layer=mapnik"
            />
          </div>

          <div className="flex items-center gap-3">
            {[Facebook, Instagram, Twitter].map((I, i) => (
              <a key={i} href="#" aria-label="Social Link" className="h-10 w-10 grid place-items-center rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card space-y-4 h-fit">
          <h2 className="text-2xl font-bold">{t("contactFormTitle")}</h2>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">{t("contactNameLabel")}</label>
            <input name="name" required className="mt-1 w-full h-11 px-3 rounded-md bg-background border border-input text-sm" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">{t("contactEmailField")}</label>
            <input name="email" type="email" required className="mt-1 w-full h-11 px-3 rounded-md bg-background border border-input text-sm" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">{t("contactMsgLabel")}</label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder={t("contactMsgPlaceholder")}
              className="mt-1 w-full px-3 py-2 rounded-md bg-background border border-input text-sm resize-none"
            />
          </div>
          <button type="submit" className="w-full h-11 rounded-md bg-gradient-accent text-accent-foreground font-semibold shadow-card hover:opacity-95 transition">
            {sent ? t("contactBtnSent") : t("contactBtnSend")}
          </button>
        </form>
      </section>
    </PublicLayout>
  );
}

function InfoRow({ icon: Icon, label, value, dir, isPhone }: { icon: any; label: string; value: string; dir?: "ltr" | "rtl"; isPhone?: boolean }) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-11 w-11 shrink-0 grid place-items-center rounded-xl bg-gradient-accent text-accent-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</div>
        <div className={`mt-0.5 font-medium ${isPhone ? "text-base" : ""}`} dir={dir}>
          {value}
        </div>
      </div>
    </div>
  );
}
