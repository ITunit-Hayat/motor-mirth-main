import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Heart } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { CarCard } from "@/components/CarCard";
import { CarGridSkeleton, ErrorState } from "@/components/StateViews";
import { useDealership } from "@/context/DealershipContext";
import { useLanguage } from "@/context/LanguageContext";
import { useFavorites } from "@/lib/favorites";

export const Route = createFileRoute("/cars/")({
  head: () => ({
    meta: [
      { title: "Browse Inventory — VelocityMotors" },
      { name: "description", content: "Search and filter our inventory of quality vehicles." },
    ],
  }),
  component: CarsPage,
});

type SortKey = "newest" | "price-asc" | "price-desc" | "mileage-asc";

function CarsPage() {
  const { cars, loadingCars, error, refresh } = useDealership();
  const { t } = useLanguage();
  const favs = useFavorites();
  const [make, setMake] = useState<string>("All");
  const [category, setCategory] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(250000);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [favsOnly, setFavsOnly] = useState(false);

  const makes = useMemo(() => ["All", ...Array.from(new Set(cars.map((c) => c.make))).filter(Boolean)], [cars]);
  const categories = useMemo(() => ["All", ...Array.from(new Set(cars.map((c) => c.category))).filter(Boolean)], [cars]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = cars.filter((c) => {
      if (make !== "All" && c.make !== make) return false;
      if (category !== "All" && c.category !== category) return false;
      if (c.price > maxPrice) return false;
      if (favsOnly && !favs.includes(c.id)) return false;
      if (q && ![c.title, c.make, c.model, c.category].join(" ").toLowerCase().includes(q)) return false;
      return true;
    });
    switch (sort) {
      case "price-asc": return [...list].sort((a, b) => a.price - b.price);
      case "price-desc": return [...list].sort((a, b) => b.price - a.price);
      case "mileage-asc": return [...list].sort((a, b) => a.mileage - b.mileage);
      default: return [...list].sort((a, b) => b.year - a.year);
    }
  }, [cars, make, category, maxPrice, query, sort, favsOnly, favs]);

  const selectCls = "mt-1 w-full h-10 px-3 rounded-md bg-background border border-input text-sm";

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">{t("allVehicles")}</h1>
            <p className="mt-2 text-muted-foreground">{filtered.length} {t("resultsCount")}</p>
          </div>
          <button
            onClick={() => setFavsOnly((v) => !v)}
            className={`inline-flex items-center gap-2 h-10 px-4 rounded-md border text-sm font-semibold transition ${
              favsOnly ? "bg-red-500/10 border-red-500/40 text-red-500" : "border-input hover:bg-secondary"
            }`}
          >
            <Heart className={`h-4 w-4 ${favsOnly ? "fill-red-500" : ""}`} /> {t("favsOnly")}
          </button>
        </div>

        {/* Filters */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 bg-card border border-border p-4 rounded-xl shadow-card">
          <div className="lg:col-span-2 relative">
            <label className="text-xs font-semibold text-muted-foreground">{t("searchCars")}</label>
            <div className="mt-1 relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchCars")}
                className="w-full h-10 pl-9 pr-3 rounded-md bg-background border border-input text-sm rtl:pl-3 rtl:pr-9"
              />
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground rtl:left-auto rtl:right-3" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">{t("filterMake")}</label>
            <select value={make} onChange={(e) => setMake(e.target.value)} className={selectCls}>
              {makes.map((m) => (<option key={m} value={m}>{m === "All" ? t("filterAll") : m}</option>))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">{t("filterCategory")}</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectCls}>
              {categories.map((c) => (<option key={c} value={c}>{c === "All" ? t("filterAll") : c}</option>))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">{t("sortBy")}</label>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className={selectCls}>
              <option value="newest">{t("sortNewest")}</option>
              <option value="price-asc">{t("sortPriceLow")}</option>
              <option value="price-desc">{t("sortPriceHigh")}</option>
              <option value="mileage-asc">{t("sortMileageLow")}</option>
            </select>
          </div>
          <div className="sm:col-span-2 lg:col-span-5">
            <div className="flex justify-between text-xs font-semibold text-muted-foreground">
              <span>{t("filterMaxPrice")}</span>
              <span>${maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={20000}
              max={300000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8">
          {error ? (
            <ErrorState message={error} onRetry={() => void refresh()} />
          ) : loadingCars ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"><CarGridSkeleton count={6} /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-xl border border-border">
              <p className="text-muted-foreground">{t("noCarsFound")}</p>
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
    </PublicLayout>
  );
}
