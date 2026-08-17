import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Tag, Wrench, Users } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { CarCard } from "@/components/CarCard";
import { CarGridSkeleton, ErrorState } from "@/components/StateViews";
import { useDealership } from "@/context/DealershipContext";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VelocityMotors — Find Your Next Car" },
      { name: "description", content: "Browse a hand-picked selection of premium new and pre-owned cars at VelocityMotors." },
      { property: "og:title", content: "VelocityMotors — Find Your Next Car" },
      { property: "og:description", content: "Browse a hand-picked selection of premium new and pre-owned cars." },
    ],
  }),
  component: Home,
});

function Home() {
  const { cars, loadingCars, error, refresh } = useDealership();
  const { t } = useLanguage();

  const features = [
    { icon: ShieldCheck, title: t("featInspectTitle"), body: t("featInspectDesc") },
    { icon: Tag, title: t("featPriceTitle"), body: t("featPriceDesc") },
    { icon: Wrench, title: t("featSupportTitle"), body: t("featSupportDesc") },
    { icon: Users, title: t("featTrustTitle"), body: t("featTrustDesc") },
  ];

  const featured = (cars.filter((c) => c.featured).length ? cars.filter((c) => c.featured) : cars).slice(0, 4);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 md:py-32">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold tracking-wider uppercase">
            {t("heroBadge")}
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
            {t("heroTitle1")} <span className="text-accent">{t("heroTitle2")}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
            {t("heroDesc")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/cars"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-accent text-accent-foreground font-semibold shadow-elegant hover:opacity-95 transition"
            >
              {t("btnBrowse")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-white/20 text-primary-foreground font-medium hover:bg-white/10 transition"
            >
              {t("btnTalkSpecialist")}
            </Link>
          </div>
          <div className="mt-14 grid grid-cols-3 max-w-lg gap-6">
            {[["500+", t("statCars")], ["10k+", t("statDrivers")], ["4.9★", t("statRating")]].map(([k, v]) => (
              <div key={v}>
                <div className="text-2xl md:text-3xl font-display font-bold text-accent">{k}</div>
                <div className="text-xs md:text-sm opacity-80">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">{t("featuredTitle")}</h2>
            <p className="mt-2 text-muted-foreground">{t("featuredSubtitle")}</p>
          </div>
          <Link to="/cars" className="text-sm font-semibold text-primary hover:text-accent inline-flex items-center gap-1.5">
            {t("seeAllCars")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
        {error ? (
          <ErrorState message={error} onRetry={() => void refresh()} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {loadingCars ? <CarGridSkeleton count={4} /> : featured.map((c) => <CarCard key={c.id} car={c} />)}
          </div>
        )}
        {!loadingCars && !error && featured.length === 0 && (
          <p className="text-muted-foreground">No vehicles listed yet.</p>
        )}
      </section>

      {/* Why us */}
      <section className="bg-secondary/50 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold">{t("whyChooseUs")}</h2>
            <p className="mt-2 text-muted-foreground">{t("whySubtitle")}</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <div className="h-11 w-11 grid place-items-center rounded-xl bg-gradient-accent text-accent-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-bold text-lg">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
