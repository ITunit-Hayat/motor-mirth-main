import { createFileRoute } from "@tanstack/react-router";
import { Shield, Wrench, Heart, Sparkles } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — VelocityMotors" }] }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLanguage();
  const values = [
    { Icon: Sparkles, k: "valueHonesty", v: "valueHonestyDesc" },
    { Icon: Shield, k: "valueExcellence", v: "valueExcellenceDesc" },
    { Icon: Wrench, k: "valueCare", v: "valueCareDesc" },
  ];
  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center lg:text-start">{t("aboutHeroTitle")}</h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed whitespace-pre-line text-center lg:text-start">{t("aboutHeroBody")}</p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
            <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85" alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>

        <div className="mt-12 rounded-3xl bg-gradient-hero text-primary-foreground p-8 md:p-12 shadow-elegant relative overflow-hidden">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent/30 blur-3xl" />
          <div className="text-center relative">
            <div className="text-xs uppercase tracking-widest font-bold text-accent">{t("aboutMissionTitle")}</div>
            <p className="mt-4 font-display text-2xl md:text-3xl font-semibold max-w-2xl mx-auto leading-snug">{t("aboutMission")}</p>
          </div>
        </div>

        <h2 className="mt-16 text-2xl md:text-3xl font-bold text-center">{t("valueHonesty")} • {t("valueExcellence")} • {t("valueCare")}</h2>
        <p className="mt-2 text-center text-muted-foreground">{t("aboutHeroTitle")}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {values.map(({ Icon, k, v }) => (
            <div key={k} className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elegant transition">
              <div className="h-12 w-12 grid place-items-center rounded-xl bg-accent/15 text-accent"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-4 font-display text-lg font-bold">{t(k)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(v)}</p>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
