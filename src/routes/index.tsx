import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Tag, Wrench, Users } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { CarCard } from "@/components/CarCard";
import { CarGridSkeleton, ErrorState } from "@/components/StateViews";
import { useDealership } from "@/context/DealershipContext";


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

const features = [
  { icon: ShieldCheck, title: "Certified Inspected", body: "Every vehicle passes a rigorous 150-point inspection before it hits our floor." },
  { icon: Tag, title: "Transparent Pricing", body: "No hidden fees. What you see is what you pay — with financing options that fit." },
  { icon: Wrench, title: "Lifetime Support", body: "Complimentary maintenance for the first year, plus 24/7 roadside assistance." },
  { icon: Users, title: "Trusted by 10k+", body: "Ten thousand happy drivers and counting. Read their stories, then write yours." },
];

function Home() {
  const { cars, loadingCars, error, refresh } = useDealership();
  const featured = (cars.filter((c) => c.featured).length ? cars.filter((c) => c.featured) : cars).slice(0, 4);
  return (

    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 md:py-32">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold tracking-wider uppercase">
            New Arrivals · 2024
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
            Drive the car you've been <span className="text-accent">dreaming of.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
            A curated selection of premium new and pre-owned vehicles.
            Transparent pricing. Instant reservations. Zero pressure.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/cars"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-accent text-accent-foreground font-semibold shadow-elegant hover:opacity-95 transition"
            >
              Browse Cars <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-white/20 text-primary-foreground font-medium hover:bg-white/10 transition"
            >
              Talk to a specialist
            </Link>
          </div>
          <div className="mt-14 grid grid-cols-3 max-w-lg gap-6">
            {[["500+", "Cars in stock"], ["10k+", "Happy drivers"], ["4.9★", "Avg. rating"]].map(([k, v]) => (
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
            <h2 className="text-3xl md:text-4xl font-bold">Featured Inventory</h2>
            <p className="mt-2 text-muted-foreground">Hand-picked highlights from our showroom floor.</p>
          </div>
          <Link to="/cars" className="text-sm font-semibold text-primary hover:text-accent inline-flex items-center gap-1.5">
            See all cars <ArrowRight className="h-4 w-4" />
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
          <p className="text-muted-foreground">No vehicles listed yet. Add your first car from the admin dashboard.</p>
        )}

      </section>

      {/* Why us */}
      <section className="bg-secondary/50 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold">Why choose VelocityMotors</h2>
            <p className="mt-2 text-muted-foreground">Buying a car should feel exciting, not exhausting. Here's how we help.</p>
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
