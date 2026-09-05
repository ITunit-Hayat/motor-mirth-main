import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Heart,
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { CompareTray } from "@/components/CompareTray";
import { CarCard } from "@/components/CarCard";
import { CarGridSkeleton, ErrorState } from "@/components/StateViews";
import { useDealership, formatPrice } from "@/context/DealershipContext";
import { useLanguage } from "@/context/LanguageContext";
import { useFavorites } from "@/lib/favorites";

type Search = { q?: string; category?: string };

export const Route = createFileRoute("/cars/")({
  validateSearch: (raw): Search => {
    const s = raw as Record<string, unknown>;
    return {
      q: typeof s.q === "string" ? s.q : undefined,
      category: typeof s.category === "string" ? s.category : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "معرض السيارات — MZAB MOTORS" },
      {
        name: "description",
        content:
          "تصفح وبحث في أسطول سيارات مزاب موتورز الفاخرة والمستعملة المعتمدة.",
      },
    ],
  }),
  component: CarsPage,
});

type SortKey = "newest" | "price-asc" | "price-desc" | "mileage-asc";

function CarsPage() {
  const { cars, loadingCars, error, refresh } = useDealership();
  const { t, locale } = useLanguage();
  const favs = useFavorites();
  const search = Route.useSearch() as Search;

  const [make, setMake] = useState<string>("All");
  const [category, setCategory] = useState<string>(search.category ?? "All");
  const [transmission, setTransmission] = useState<string>("All");
  const [fuel, setFuel] = useState<string>("All");
  const [year, setYear] = useState<number>(2015);
  const [maxPrice, setMaxPrice] = useState<number>(300000);
  const [maxMileage, setMaxMileage] = useState<number>(80000);
  const [query, setQuery] = useState(search.q ?? "");
  const [sort, setSort] = useState<SortKey>("newest");
  const [favsOnly, setFavsOnly] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Available" | "Featured"
  >("All");
  const [wilaya, setWilaya] = useState("All");

  const makes = useMemo(
    () => ["All", ...Array.from(new Set(cars.map((c) => c.make)))],
    [cars],
  );
  const cats = useMemo(
    () => ["All", ...Array.from(new Set(cars.map((c) => c.category)))],
    [cars],
  );
  const wilayaOptions = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(cars.map((c) => c.wilaya).filter((w): w is string => !!w)),
      ),
    ],
    [cars],
  );
  const trs = useMemo(
    () => [
      "All",
      ...Array.from(new Set(cars.map((c) => c.transmission).filter(Boolean))),
    ],
    [cars],
  );
  const fuels = useMemo(
    () => [
      "All",
      ...Array.from(new Set(cars.map((c) => c.fuel ?? "").filter(Boolean))),
    ],
    [cars],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = cars.filter((c) => {
      // Draft (dealership prep) and PendingReview (member listing awaiting
      // approval) never show to the public, regardless of other filters.
      if (c.status === "Draft" || c.status === "PendingReview") return false;
      if (statusFilter === "Available" && c.status === "Sold") return false;
      if (statusFilter === "Featured" && !c.featured) return false;
      if (make !== "All" && c.make !== make) return false;
      if (category !== "All" && c.category !== category) return false;
      if (wilaya !== "All" && c.wilaya !== wilaya) return false;
      if (transmission !== "All" && c.transmission !== transmission)
        return false;
      if (fuel !== "All" && (c.fuel ?? "") !== fuel) return false;
      if (c.year < year) return false;
      if (c.price > maxPrice) return false;
      if (c.mileage > maxMileage) return false;
      if (favsOnly && !favs.includes(c.id)) return false;
      if (
        q &&
        ![c.title, c.make, c.model, c.category]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    });
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "mileage-asc":
        return [...list].sort((a, b) => a.mileage - b.mileage);
      default:
        return [...list].sort((a, b) => b.year - a.year);
    }
  }, [
    cars,
    statusFilter,
    make,
    category,
    wilaya,
    transmission,
    fuel,
    year,
    maxPrice,
    maxMileage,
    query,
    sort,
    favsOnly,
    favs,
  ]);

  const clearAll = () => {
    setMake("All");
    setCategory("All");
    setTransmission("All");
    setFuel("All");
    setYear(2015);
    setMaxPrice(300000);
    setMaxMileage(80000);
    setQuery("");
    setSort("newest");
    setFavsOnly(false);
    setStatusFilter("All");
  };

  const selectCls =
    "mt-1 w-full h-10 px-3 rounded-md bg-background border border-input text-sm";

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {/* SELL / TRADE IN PROMO BANNER */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-accent/15 via-card to-card border border-accent/30 flex items-center justify-between gap-4 flex-wrap shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-accent text-accent-foreground grid place-items-center font-bold shrink-0">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base">
                {locale === "ar"
                  ? "تريد بيع أو استبدال سيارتك الحالية؟"
                  : "Looking to sell or trade in your current vehicle?"}
              </div>
              <div className="text-xs text-muted-foreground">
                {locale === "ar"
                  ? "احصل على تقييم فوري وعرض نقدي خلال دقائق"
                  : "Get an instant valuation and guaranteed cash offer today."}
              </div>
            </div>
          </div>
          <Link
            to="/sell"
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-accent text-accent-foreground text-xs font-bold shadow hover:opacity-90 transition shrink-0"
          >
            {t("navSellCar")}{" "}
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
        </div>

        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold">
              {t("allVehicles")}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {filtered.length} {t("resultsCount")}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex rounded-full border border-input bg-card p-1 text-xs font-semibold">
              <button
                onClick={() => setStatusFilter("All")}
                className={`px-3 py-1 rounded-full transition ${statusFilter === "All" ? "bg-accent text-accent-foreground font-bold" : "text-muted-foreground"}`}
              >
                {locale === "ar" ? "الكل" : "All"}
              </button>
              <button
                onClick={() => setStatusFilter("Available")}
                className={`px-3 py-1 rounded-full transition ${statusFilter === "Available" ? "bg-accent text-accent-foreground font-bold" : "text-muted-foreground"}`}
              >
                {locale === "ar" ? "المتاح فقط" : "In Stock"}
              </button>
              <button
                onClick={() => setStatusFilter("Featured")}
                className={`px-3 py-1 rounded-full transition ${statusFilter === "Featured" ? "bg-accent text-accent-foreground font-bold" : "text-muted-foreground"}`}
              >
                ★ {locale === "ar" ? "المميزة" : "Featured"}
              </button>
            </div>

            <button
              onClick={() => setFavsOnly((v) => !v)}
              className={`inline-flex items-center gap-2 h-10 px-4 rounded-full border text-sm font-semibold transition ${
                favsOnly
                  ? "bg-red-500/10 border-red-500/40 text-red-500"
                  : "border-input hover:bg-secondary"
              }`}
            >
              <Heart className={`h-4 w-4 ${favsOnly ? "fill-red-500" : ""}`} />{" "}
              {t("favsOnly")}
            </button>
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-input hover:bg-secondary text-sm font-semibold"
            >
              <X className="h-4 w-4" /> {t("clearFilters")}
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-5 bg-card border border-border p-5 rounded-2xl shadow-card">
          <div className="lg:hidden flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" /> {t("filterAll")}
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">
              {t("filterMake")}
            </label>
            <select
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className={selectCls}
            >
              {makes.map((m) => (
                <option key={m} value={m}>
                  {m === "All" ? t("filterAll") : m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">
              {t("filterCategory")}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={selectCls}
            >
              {cats.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? t("filterAll") : c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">
              الولاية
            </label>
            <select
              value={wilaya}
              onChange={(e) => setWilaya(e.target.value)}
              className={selectCls}
            >
              {wilayaOptions.map((w) => (
                <option key={w} value={w}>
                  {w === "All" ? t("filterAll") : w}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">
              {t("filterTransmission")}
            </label>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className={selectCls}
            >
              {trs.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? t("filterAll") : c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">
              {t("filterFuel")}
            </label>
            <select
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              className={selectCls}
            >
              {fuels.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? t("filterAll") : c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">
              {t("sortBy")}
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className={selectCls}
            >
              <option value="newest">{t("sortNewest")}</option>
              <option value="price-asc">{t("sortPriceLow")}</option>
              <option value="price-desc">{t("sortPriceHigh")}</option>
              <option value="mileage-asc">{t("sortMileageLow")}</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">
              {t("filterYear")}
            </label>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className={selectCls}
            >
              {[2015, 2018, 2020, 2022, 2023, 2024].map((y) => (
                <option key={y} value={y}>
                  {y}+
                </option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-2">
            <div className="flex justify-between text-xs font-semibold text-muted-foreground">
              <span>{t("filterMaxPrice")}</span>
              <span>{formatPrice(maxPrice)}</span>
            </div>
            <input
              type="range"
              min={20000}
              max={300000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full mt-3 accent-accent"
            />
          </div>
          <div className="lg:col-span-2">
            <div className="flex justify-between text-xs font-semibold text-muted-foreground">
              <span>{t("filterMaxMileage")}</span>
              <span>{maxMileage.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={5000}
              max={80000}
              step={5000}
              value={maxMileage}
              onChange={(e) => setMaxMileage(Number(e.target.value))}
              className="w-full mt-3 accent-accent"
            />
          </div>
        </div>

        <div className="mt-8">
          {error ? (
            <ErrorState message={error} onRetry={() => void refresh()} />
          ) : loadingCars ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <CarGridSkeleton count={6} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 bg-card rounded-2xl border border-border">
              <p className="text-muted-foreground">{t("noCarsFound")}</p>
              <button
                onClick={clearAll}
                className="mt-3 inline-block text-sm font-semibold text-primary hover:text-accent"
              >
                {t("clearFilters")}
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <CarCard key={c.id} car={c} />
              ))}
            </div>
          )}
        </div>
      </div>
      <CompareTray />
    </PublicLayout>
  );
}
