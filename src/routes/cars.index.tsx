import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { CarCard } from "@/components/CarCard";
import { CarGridSkeleton, ErrorState } from "@/components/StateViews";
import { useDealership } from "@/context/DealershipContext";


export const Route = createFileRoute("/cars/")({
  head: () => ({
    meta: [
      { title: "Inventory — VelocityMotors" },
      { name: "description", content: "Browse the full VelocityMotors inventory. Filter by brand, category and price." },
      { property: "og:title", content: "Inventory — VelocityMotors" },
      { property: "og:description", content: "Browse the full VelocityMotors inventory." },
    ],
  }),
  component: CarsListing,
});

function CarsListing() {
  const { cars, loadingCars, error, refresh } = useDealership();
  const [q, setQ] = useState("");
  const [make, setMake] = useState("all");
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(300000);

  const makes = useMemo(() => ["all", ...Array.from(new Set(cars.map((c) => c.make)))], [cars]);
  const cats = useMemo(() => ["all", ...Array.from(new Set(cars.map((c) => c.category)))], [cars]);

  const filtered = cars.filter((c) => {
    if (make !== "all" && c.make !== make) return false;
    if (category !== "all" && c.category !== category) return false;
    if (c.price > maxPrice) return false;
    if (q && !`${c.title} ${c.make} ${c.model}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <PublicLayout>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <h1 className="text-3xl md:text-5xl font-bold">Our Inventory</h1>
          <p className="mt-2 text-primary-foreground/70">Every car, every option. Filter to find your perfect match.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-card grid gap-4 md:grid-cols-[1fr_auto_auto_auto] md:items-end">
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Search</label>
            <div className="mt-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search make, model..."
                className="w-full h-10 pl-9 pr-3 rounded-md bg-background border border-input text-sm"
              />
            </div>
          </div>
          <Select label="Brand" value={make} onChange={setMake} options={makes} />
          <Select label="Category" value={category} onChange={setCategory} options={cats} />
          <div>
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Max ${maxPrice.toLocaleString()}
            </label>
            <input
              type="range"
              min={20000}
              max={300000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full md:w-52 accent-[color:var(--accent)]"
            />
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          {loadingCars ? "Loading inventory…" : `${filtered.length} vehicle${filtered.length !== 1 ? "s" : ""} found`}
        </div>

        {error ? (
          <div className="mt-6">
            <ErrorState message={error} onRetry={() => void refresh()} />
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {loadingCars ? <CarGridSkeleton count={6} /> : filtered.map((c) => <CarCard key={c.id} car={c} />)}
            </div>
            {!loadingCars && filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                {cars.length === 0 ? "No cars in the database yet." : "No cars match your filters. Try adjusting."}
              </div>
            )}
          </>
        )}

      </section>
    </PublicLayout>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full md:w-40 h-10 px-3 rounded-md bg-background border border-input text-sm capitalize"
      >
        {options.map((o) => <option key={o} value={o}>{o === "all" ? `All ${label.toLowerCase()}s` : o}</option>)}
      </select>
    </div>
  );
}
