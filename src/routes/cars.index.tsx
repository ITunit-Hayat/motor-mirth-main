import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { CarCard } from "@/components/CarCard";
import { CarGridSkeleton, ErrorState } from "@/components/StateViews";
import { useDealership } from "@/context/DealershipContext";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/cars/")({
  head: () => ({
    meta: [
      { title: "Browse Inventory — VelocityMotors" },
      { name: "description", content: "Search and filter our inventory of quality vehicles." },
    ],
  }),
  component: CarsPage,
});

function CarsPage() {
  const { cars, loadingCars, error, refresh } = useDealership();
  const { t } = useLanguage();
  const [make, setMake] = useState<string>("All");
  const [category, setCategory] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(250000);

  const makes = useMemo(() => ["All", ...Array.from(new Set(cars.map((c) => c.make))).filter(Boolean)], [cars]);
  const categories = useMemo(() => ["All", ...Array.from(new Set(cars.map((c) => c.category))).filter(Boolean)], [cars]);

  const filtered = useMemo(() => {
    return cars.filter((c) => {
      if (make !== "All" && c.make !== make) return false;
      if (category !== "All" && c.category !== category) return false;
      if (c.price > maxPrice) return false;
      return true;
    });
  }, [cars, make, category, maxPrice]);

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">{t("allVehicles")}</h1>
          <p className="mt-2 text-muted-foreground">{filtered.length} vehicles available</p>
        </div>

        {/* Filters */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3 bg-card border border-border p-4 rounded-xl shadow-card">
          <div>
            <label className="text-xs font-semibold text-muted-foreground">{t("filterMake")}</label>
            <select
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="mt-1 w-full h-10 px-3 rounded-md bg-background border border-input text-sm"
            >
              {makes.map((m) => (
                <option key={m} value={m}>{m === "All" ? t("filterAll") : m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">{t("filterCategory")}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full h-10 px-3 rounded-md bg-background border border-input text-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === "All" ? t("filterAll") : c}</option>
              ))}
            </select>
          </div>
          <div>
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
              className="mt-3 w-full accent-primary"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8">
          {error ? (
            <ErrorState message={error} onRetry={() => void refresh()} />
          ) : loadingCars ? (
            <CarGridSkeleton count={6} />
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
