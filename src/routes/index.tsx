import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  ArrowRight,
  Shield,
  BadgePercent,
  Sparkles,
  ChevronRight,
  Phone,
  Wrench,
  Award,
} from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
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
      { title: "MZAB MOTORS — اكتشف سيارتك الفاخرة القادمة" },
      {
        name: "description",
        content:
          "تصفح أسطول سيارات مزاب موتورز الفاخرة والرياضية والمستعملة المعتمدة. أسعار شفافة بالدينار الجزائري وضمان شامل.",
      },
    ],
  }),
});

const HERO_BG = "/mzab-valley-hero.jpg";
const HERO_BG_ALT = "/mzab-valley-hero.jpg";

function HomePage() {
  const { t } = useLanguage();
  const { cars } = useDealership();
  const [q, setQ] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const featured = useMemo(
    () =>
      cars
        .filter(
          (c) =>
            c.featured && c.status !== "Draft" && c.status !== "PendingReview",
        )
        .slice(0, 6),
    [cars],
  );
  const newArrivals = useMemo(
    () => [...cars].sort((a, b) => b.year - a.year).slice(0, 8),
    [cars],
  );
  const deals = useMemo(
    () => cars.filter((c) => (c.discount ?? 0) > 0).slice(0, 4),
    [cars],
  );

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
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/65 to-background" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-24 text-white">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 backdrop-blur-md text-xs font-semibold border border-accent/40 text-accent">
              <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" /> {t("heroEyebrow")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] max-w-3xl drop-shadow-xl text-white"
          >
            {t("heroTitle")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-4 text-white/90 max-w-xl text-base sm:text-lg leading-relaxed"
          >
            {t("heroSubtitle")}
          </motion.p>

          <motion.form
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `/cars?q=${encodeURIComponent(q)}`;
            }}
            className="mt-8 relative max-w-2xl"
          >
            <div className="flex items-center gap-2 bg-card/95 backdrop-blur-md border border-accent/30 text-foreground rounded-2xl shadow-elegant p-2 sm:p-2.5">
              <div className="relative flex-1">
                <Search className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-accent" />
                <input
                  value={q}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder={t("heroSearchPlaceholder")}
                  className="w-full h-11 ltr:pl-10 rtl:pr-10 ltr:pr-3 rtl:pl-3 rounded-lg bg-background/90 border border-border text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="inline-flex items-center gap-2 h-11 px-4 sm:px-6 rounded-lg bg-gradient-accent text-accent-foreground font-bold text-sm whitespace-nowrap shadow-md cursor-pointer"
              >
                {t("heroSearchBtn")}{" "}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </motion.button>
            </div>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="search-pop absolute inset-x-0 top-full mt-2 bg-card text-foreground rounded-xl overflow-hidden border border-border/80 shadow-elegant z-20"
              >
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setQ(s);
                      window.location.href = `/cars?q=${encodeURIComponent(s)}`;
                    }}
                    className="w-full text-left ltr:text-left rtl:text-right px-4 py-2.5 hover:bg-secondary text-sm flex items-center gap-2 text-white transition-colors"
                  >
                    <Search className="h-3.5 w-3.5 text-muted-foreground" /> {s}
                  </button>
                ))}
              </motion.div>
            )}
          </motion.form>

          {/* STATS RESET TO ZERO AS REQUESTED */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 grid grid-cols-3 max-w-lg gap-6"
          >
            {[
              ["0", t("statCars")],
              ["0%", t("statDrivers")],
              ["0.0★", t("statRating")],
            ].map(([k, v], idx) => (
              <motion.div
                key={v}
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 350 }}
                className="p-3.5 rounded-xl bg-card/60 border border-border/60 backdrop-blur-sm shadow-card"
              >
                <div className="text-2xl md:text-3xl font-display font-bold text-accent">
                  {k}
                </div>
                <div className="text-xs md:text-sm text-white/90 font-medium mt-0.5">{v}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t("browseByCategory")}
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {Object.entries(CATEGORY_META).map(([cat, m], index) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/cars"
                search={{ category: cat }}
                className={cn(
                  "group block h-full rounded-2xl p-6 text-center border border-border bg-card hover:border-accent/50 hover:shadow-elegant transition-all duration-300 bg-gradient-to-br",
                  m.tone,
                )}
              >
                <div className="text-4xl mb-2 group-hover:scale-115 transition-transform duration-300">
                  {m.icon}
                </div>
                <div className="font-semibold text-sm text-white">{cat}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {cars.filter((c) => c.category === cat).length}{" "}
                  {t("resultsCount")}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED CAROUSEL */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between flex-wrap gap-3 mb-6"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t("featuredTitle")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("featuredSubtitle")}
            </p>
          </div>
          <Link
            to="/cars"
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
          >
            {t("btnBrowse")} <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </motion.div>
        <div className="flex gap-5 overflow-x-auto no-scrollbar scroll-snap-x pb-4 -mx-4 px-4">
          {featured.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="min-w-[300px] sm:min-w-[340px] snap-start"
            >
              <CarCard car={c} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* DARK BANNER WITH PILLARS */}
      <section className="relative mt-10 overflow-hidden border-y border-border">
        <img
          src={HERO_BG_ALT}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/80 to-accent/30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 text-white">
          <div className="grid gap-8 lg:grid-cols-4">
            {[
              { Icon: Award, k: "pillarCertified", v: "pillarCertifiedDesc" },
              { Icon: Shield, k: "pillarWarranty", v: "pillarWarrantyDesc" },
              {
                Icon: BadgePercent,
                k: "pillarFinance",
                v: "pillarFinanceDesc",
              },
              { Icon: Wrench, k: "pillarSupport", v: "pillarSupportDesc" },
            ].map(({ Icon, k, v }, idx) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-card/40 border border-white/10 backdrop-blur-sm transition-shadow hover:shadow-card"
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="h-11 w-11 grid place-items-center rounded-xl bg-accent/20 border border-accent/40 backdrop-blur shrink-0"
                >
                  <Icon className="h-5 w-5 text-accent" />
                </motion.div>
                <div>
                  <div className="font-display font-bold text-lg text-white">{t(k)}</div>
                  <p className="mt-1 text-white/80 text-sm leading-relaxed">{t(v)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between flex-wrap gap-3 mb-6"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t("newArrivalsTitle")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("newArrivalsSubtitle")}
            </p>
          </div>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.slice(0, 8).map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
            >
              <CarCard car={c} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* SPECIAL DEALS */}
      {deals.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t("specialOffersTitle")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("specialOffersSubtitle")}
            </p>
          </motion.div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deals.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <CarCard car={c} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground border-t border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
            {t("heroTitle")}
          </h2>
          <p className="mt-3 text-white/85 max-w-2xl mx-auto leading-relaxed">
            {t("heroSubtitle")}
          </p>
          <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/cars"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-gradient-accent text-accent-foreground font-bold shadow-elegant"
              >
                {t("btnBrowse")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-lg border border-accent/40 bg-card/60 backdrop-blur-sm hover:bg-card text-white font-semibold"
              >
                <Phone className="h-4 w-4 text-accent" /> {t("btnTalkSpecialist")}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <CompareTray />
    </PublicLayout>
  );
}
