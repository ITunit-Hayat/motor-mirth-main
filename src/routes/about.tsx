import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { Award, Users, Car, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const { t } = useLanguage();

  const stats = [
    { icon: Car, k: t("aboutStat1Val"), v: t("aboutStat1Label") },
    { icon: Users, k: t("aboutStat2Val"), v: t("aboutStat2Label") },
    { icon: Award, k: t("aboutStat3Val"), v: t("aboutStat3Label") },
    { icon: Star, k: t("aboutStat4Val"), v: t("aboutStat4Label") },
  ];

  return (
    <PublicLayout>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold max-w-3xl leading-tight">
            {t("aboutHeroTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg opacity-85 leading-relaxed">
            {t("aboutHeroDesc")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-10 lg:grid-cols-2 items-center">
        <img
          src="https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1400&q=80"
          alt="Our showroom"
          className="rounded-2xl shadow-elegant object-cover w-full h-[380px]"
        />
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">{t("aboutStoryTitle")}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {t("aboutStoryP1")}
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {t("aboutStoryP2")}
          </p>
          <div className="mt-8 p-6 rounded-2xl bg-secondary/70 border-s-4 border-accent">
            <div className="text-xs font-bold uppercase tracking-wider text-accent">{t("aboutMissionBadge")}</div>
            <p className="mt-2 text-lg font-semibold leading-snug">
              {t("aboutMissionText")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.v} className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
              <s.icon className="h-6 w-6 text-accent" />
              <div className="mt-3 text-3xl font-display font-bold">{s.k}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
