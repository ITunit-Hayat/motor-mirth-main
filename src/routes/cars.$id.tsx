import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft, Gauge, Calendar, Cog, Fuel, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/PublicLayout";
import { useDealership, formatMiles, formatPrice } from "@/context/DealershipContext";
import { supabase, type CarRow } from "@/lib/supabase";
import type { Car } from "@/data/initialCars";

export const Route = createFileRoute("/cars/$id")({
  component: CarDetails,
});

const rowToCar = (r: CarRow): Car => ({
  id: String(r.id),
  title: r.name,
  make: r.make,
  model: r.model ?? "",
  year: r.year,
  price: Number(r.price),
  mileage: Number(r.mileage ?? 0),
  category: r.category ?? "Other",
  engine: r.engine ?? "—",
  transmission: r.transmission ?? "—",
  condition: r.condition ?? "—",
  description: r.description ?? "",
  images: r.images?.length ? r.images : ["/placeholder.svg"],
  featured: !!r.featured,
});

function CarDetails() {
  const { id } = Route.useParams();
  const { cars, addOrder } = useDealership();
  const fromContext = cars.find((c) => String(c.id) === String(id));

  const [car, setCar] = useState<Car | null>(fromContext ?? null);
  const [loading, setLoading] = useState(!fromContext);
  const [idx, setIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (fromContext) {
      setCar(fromContext);
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      // `id` column may be BIGINT — match numerically when the param is numeric.
      const value: string | number = /^\d+$/.test(id) ? Number(id) : id;
      const { data, error } = await supabase.from("cars").select("*").eq("id", value).maybeSingle();
      if (cancelled) return;
      if (error) console.error("Supabase fetch error:", error);
      setCar(data ? rowToCar(data as CarRow) : null);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [id, fromContext]);

  useEffect(() => setIdx(0), [id]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="aspect-[16/10] max-w-3xl rounded-2xl bg-muted animate-pulse" />
          <div className="mt-6 h-8 w-2/3 max-w-md bg-muted rounded animate-pulse" />
          <div className="mt-3 h-6 w-40 bg-muted rounded animate-pulse" />
        </div>
      </PublicLayout>
    );
  }

  if (!car) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="text-3xl font-bold">Car not found</h1>
          <p className="mt-2 text-muted-foreground">This vehicle may have been sold or removed.</p>
          <Link to="/cars" className="mt-6 inline-flex items-center gap-2 text-primary font-semibold">
            <ArrowLeft className="h-4 w-4" /> Back to inventory
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const next = () => setIdx((i) => (i + 1) % car.images.length);
  const prev = () => setIdx((i) => (i - 1 + car.images.length) % car.images.length);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const fullName = String(fd.get("fullName") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const city = String(fd.get("city") || "").trim();
    const notes = String(fd.get("notes") || "").trim();

    if (fullName.length < 2) return toast.error("Please enter your full name.");
    if (!/^[\d\s+()-]{7,20}$/.test(phone)) return toast.error("Please enter a valid phone number.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("Please enter a valid email address.");
    if (notes.length > 1000) return toast.error("Notes must be under 1000 characters.");

    setSubmitting(true);
    try {
      await addOrder({ fullName, phone, email, city, notes, carId: car.id, carTitle: car.title });
      setSubmitted(true);
      toast.success("Inquiry sent! We'll be in touch shortly.");
      form.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send your inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  const specs = [
    { icon: Calendar, label: "Year", value: car.year },
    { icon: Gauge, label: "Mileage", value: formatMiles(car.mileage) },
    { icon: Fuel, label: "Engine", value: car.engine },
    { icon: Cog, label: "Transmission", value: car.transmission },
    { icon: ShieldCheck, label: "Condition", value: car.condition },
    { icon: CheckCircle2, label: "Category", value: car.category },
  ];

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <Link to="/cars" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to inventory
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Gallery */}
          <div>
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted shadow-elegant">
              <img src={car.images[idx]} alt={car.title} className="h-full w-full object-cover" />
              {car.images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-background/90 backdrop-blur shadow-card hover:bg-background transition"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-background/90 backdrop-blur shadow-card hover:bg-background transition"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs bg-background/90 backdrop-blur font-medium">
                {idx + 1} / {car.images.length}
              </div>
            </div>
            {car.images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
                {car.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                      i === idx ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-8">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary">{car.category}</span>
              <h1 className="mt-3 text-3xl md:text-4xl font-bold">{car.title}</h1>
              <div className="mt-2 text-3xl font-bold text-accent">{formatPrice(car.price)}</div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {specs.map((s) => (
                  <div key={s.label} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <s.icon className="h-4 w-4" /> {s.label}
                    </div>
                    <div className="mt-1 font-semibold">{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold">Description</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{car.description}</p>
              </div>
            </div>
          </div>

          {/* Inquiry */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-elegant">
              <h2 className="font-display text-xl font-bold">Interested? Reserve a viewing.</h2>
              <p className="mt-1 text-sm text-muted-foreground">A specialist will reach out within 1 business day.</p>
              {submitted ? (
                <div className="mt-6 rounded-xl bg-secondary p-5 text-center">
                  <CheckCircle2 className="h-10 w-10 mx-auto text-accent" />
                  <div className="mt-2 font-semibold">Thanks — we got your request!</div>
                  <p className="mt-1 text-sm text-muted-foreground">We'll be in touch about the {car.title}.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-4 text-sm font-medium text-primary hover:text-accent">
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                  <Field name="fullName" label="Full Name" required />
                  <Field name="phone" label="Phone Number" type="tel" required />
                  <Field name="email" label="Email" type="email" required />
                  <Field name="city" label="City" />
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Additional Notes</label>
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder="Trade-in? Financing? Preferred time?"
                      className="mt-1 w-full px-3 py-2 rounded-md bg-background border border-input text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-11 rounded-md bg-gradient-accent text-accent-foreground font-semibold shadow-card hover:opacity-95 transition disabled:opacity-60 inline-flex items-center justify-center gap-2"
                  >
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {submitting ? "Sending…" : "Submit Inquiry"}
                  </button>

                </form>
              )}
            </div>
          </aside>
        </div>
      </div>
    </PublicLayout>
  );
}

function Field({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full h-10 px-3 rounded-md bg-background border border-input text-sm"
      />
    </div>
  );
}
