import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowRight, Shield, BadgePercent, Sparkles, ChevronRight, Phone, Wrench, Award } from "lucide-react";
import { useMemo, useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { CompareTray } from "@/components/CompareTray";
import { CarCard } from "@/components/CarCard";
import { useDealership } from "@/context/DealershipContext";
import { useLanguage } from "@/context/LanguageContext";
import { CATEGORY_META } from "@/data/initialCars";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "VelocityMotors — Discover your next premium car" },
      { name: "description", content: "Browse certified luxury, sports and SUV vehicles. Transparent pricing, flexible financing, lifetime support." },
    ],
  }),
});

const HERO_BG =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2400&q=85";
const HERO_BG_ALT =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=2400&q=85";

function HomePage() {
  const { t } = useLanguage();
  const { cars } = useDealership();
  const [q, setQ] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const featured = useMemo(() => cars.filter((c) => c.featured).slice(0, 6), [cars]);
  const newArrivals = useMemo(() => [...cars].sort((a, b) => b.year - a.year).slice(0, 8), [cars]);
  const deals = useMemo(() => cars.filter((c) => (c.discount ?? 0) > 0).slice(0, 4), [cars]);

  const handleChange = (v: string) => {
    setQ(v);
    const val = v.trim().toLowerCase();
    if (!val) return setSuggestions([]);
    const uniq = new Set<string>();
    cars.forEach((c) => {
      [c.title, c.make, c.model].forEach((t_) => {
        if (t_ && t_.toLowerCase().includes(val)) uniq.add(t_);
      });
    });
    setSuggestions(Array.from(uniq).slice(0, 6));
  };

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_BG}
            alt=""
            className="h-full w-full object-cover animate-kenburns"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-background" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-24 text-white">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-xs font-semibold border border-white/20">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> {t("heroEyebrow")}
          </span>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] max-w-3xl drop-shadow-lg">
            {t("heroTitle")}
          </h1>
          <p className="mt-4 text-white/80 max-w-xl text-base sm:text-lg">
            {t("heroSubtitle")}
          </p>

          <form
            onSubmit={(e) => { e.preventDefault(); window.location.href = `/cars?q=${encodeURIComponent(q)}`; }}
            className="mt-8 relative max-w-2xl"
          >
            <div className="flex items-center gap-2 bg-white/95 text-foreground rounded-2xl shadow-elegant p-2 sm:p-2.5">
              <div className="relative flex-1">
                <Search className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder={t("heroSearchPlaceholder")}
                  className="w-full h-11 ltr:pl-10 rtl:pr-10 ltr:pr-3 rtl:pl-3 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 h-11 px-4 sm:px-5 rounded-lg bg-gradient-accent text-accent-foreground font-bold text-sm whitespace-nowrap">
                {t("heroSearchBtn")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            </div>
            {suggestions.length > 0 && (
              <div className="search-pop absolute inset-x-0 top-full mt-2 bg-card text-foreground rounded-xl overflow-hidden border border-border z-10">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => { setQ(s); window.location.href = `/cars?q=${encodeURIComponent(s)}`; }}
                    className="w-full text-left ltr:text-left rtl:text-right px-4 py-2.5 hover:bg-secondary text-sm flex items-center gap-2"
                  >
                    <Search className="h-3.5 w-3.5 text-muted-foreground" /> {s}
                  </button>
                ))}
              </div>
            )}
          </form>

          <div className="mt-10 grid grid-cols-3 max-w-lg gap-6">
            {[["500+", t("statCars")], ["10k+", t("statDrivers")], ["4.9★", t("statRating")]].map(([k, v]) => (
              <div key={v}>
                <div className="text-2xl md:text-3xl font-display font-bold text-accent">{k}</div>
                <div className="text-xs md:text-sm text-white/80">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center">{t("browseByCategory")}</h2>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {Object.entries(CATEGORY_META).map(([cat, m]) => (
            <Link
              key={cat}
              to="/cars"
              search={{ category: cat }}
              className={cn(
                "group rounded-2xl p-6 text-center border border-border bg-card hover:shadow-elegant transition bg-gradient-to-br",
                m.tone
              )}
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{m.icon}</div>
              <div className="font-semibold text-sm">{cat}</div>
              <div className="text-xs text-muted-foreground mt-1">{cars.filter(c => c.category === cat).length} {t("resultsCount")}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED CAROUSEL */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">{t("featuredTitle")}</h2>
            <p className="mt-2 text-muted-foreground">{t("featuredSubtitle")}</p>
          </div>
          <Link to="/cars" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent">
            {t("btnBrowse")} <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
        <div className="flex gap-5 overflow-x-auto no-scrollbar scroll-snap-x pb-4 -mx-4 px-4">
          {featured.map((c) => (
            <div key={c.id} className="min-w-[300px] sm:min-w-[340px] snap-start">
              <CarCard car={c} />
            </div>
          ))}
        </div>
      </section>

      {/* DARK BANNER WITH PILLARS */}
      <section className="relative mt-10 overflow-hidden">
        <img src={HERO_BG_ALT} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/70 to-accent/30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 text-white">
          <div className="grid gap-8 lg:grid-cols-4">
            {[
              { Icon: Award, k: "pillarCertified", v: "pillarCertifiedDesc" },
              { Icon: Shield, k: "pillarWarranty", v: "pillarWarrantyDesc" },
              { Icon: BadgePercent, k: "pillarFinance", v: "pillarFinanceDesc" },
              { Icon: Wrench, k: "pillarSupport", v: "pillarSupportDesc" },
            ].map(({ Icon, k, v }) => (
              <div key={k} className="flex items-start gap-3">
                <div className="h-11 w-11 grid place-items-center rounded-xl bg-accent/20 backdrop-blur shrink-0">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="font-display font-bold text-lg">{t(k)}</div>
                  <p className="mt-1 text-white/75 text-sm">{t(v)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-20">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">{t("newArrivalsTitle")}</h2>
            <p className="mt-2 text-muted-foreground">{t("newArrivalsSubtitle")}</p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.slice(0, 8).map((c) => (
            <CarCard key={c.id} car={c} />
          ))}
        </div>
      </section>

      {/* SPECIAL DEALS */}
      {deals.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
          <h2 className="text-3xl md:text-4xl font-bold">{t("specialOffersTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{t("specialOffersSubtitle")}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deals.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display">{t("heroTitle")}</h2>
          <p className="mt-3 text-primary-foreground/80 max-w-2xl mx-auto">{t("heroSubtitle")}</p>
          <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
            <Link to="/cars" className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-gradient-accent text-accent-foreground font-bold shadow-elegant">
              {t("btnBrowse")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 h-12 px-6 rounded-lg border border-white/30 hover:bg-white/10 font-semibold">
              <Phone className="h-4 w-4" /> {t("btnTalkSpecialist")}
            </Link>
          </div>
        </div>
      </section>

      <CompareTray />
    </PublicLayout>
  );
}
