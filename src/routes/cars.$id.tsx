import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import {
  ChevronLeft, ChevronRight, ArrowLeft, Gauge, Calendar, Cog, Fuel, ShieldCheck, CheckCircle2, MessageCircle, FileText, Heart, GitCompare, Calculator as CalcIcon, X, Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/PublicLayout";
import { CarCard } from "@/components/CarCard";
import { useDealership, formatMiles, formatPrice } from "@/context/DealershipContext";
import { useLanguage } from "@/context/LanguageContext";
import { toggleFavorite, useFavorites } from "@/lib/favorites";
import { toggleCompare, useCompareList, COMPARE_LIMIT } from "@/lib/compare";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cars/$id")({
  component: CarDetails,
});

function CarDetails() {
  const { id } = Route.useParams();
  const { cars, addOrder } = useDealership();
  const { t } = useLanguage();
  const favs = useFavorites();
  const cmp = useCompareList();
  const fromContext = cars.find((c) => String(c.id) === String(id));
  const car = fromContext;

  const [idx, setIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const isFav = favs.includes(id);
  const isCmp = cmp.includes(id);

  useEffect(() => setIdx(0), [id]);

  if (!car) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-3xl px-4 py-24 text-center fade-in">
          <div className="inline-grid place-items-center h-20 w-20 rounded-full bg-muted">
            <X className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="mt-6 text-3xl font-bold">{t("notFound")}</h1>
          <p className="mt-2 text-muted-foreground">{t("notFoundDesc")}</p>
          <Link to="/cars" className="mt-6 inline-flex items-center gap-2 text-primary font-semibold">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t("backToInventory")}
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const next = () => setIdx((i) => (i + 1) % car.images.length);
  const prev = () => setIdx((i) => (i - 1 + car.images.length) % car.images.length);

  const discounted = car.discount && car.discount > 0 ? Math.round((car.price * (100 - car.discount)) / 100) : null;

  // 360° rotate-by-drag: cycles the list smoothly
  const onDrag = (cx: number) => {
    const el = galleryRef.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = cx - rect.left;
    const delta = Math.round((x / rect.width - 0.5) * 8);
    setRotation(delta);
    setIdx(((Math.floor((rotation + delta) / 3) % car.images.length) + car.images.length) % Math.max(1, car.images.length));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const fullName = String(fd.get("fullName") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const city = String(fd.get("city") || "").trim();
    const notes = String(fd.get("notes") || "").trim();

    if (fullName.length < 2) return toast.error(t("fullName"));
    if (!/^[\d\s+()-]{7,20}$/.test(phone)) return toast.error(t("phoneNumber"));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error(t("emailAddress"));

    setSubmitting(true);
    try {
      await addOrder({ fullName, phone, email, city, notes, carId: car.id, carTitle: car.title });
      setSubmitted(true);
      toast.success(t("inquirySuccessTitle"));
      form.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send your inquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  const specs = [
    { Icon: Calendar, label: t("specYear"), value: car.year },
    { Icon: Gauge, label: t("specMileage"), value: formatMiles(car.mileage) },
    { Icon: Fuel, label: t("specEngine"), value: car.engine },
    { Icon: Cog, label: t("specTransmission"), value: car.transmission },
    { Icon: ShieldCheck, label: t("specCondition"), value: car.condition },
    { Icon: CheckCircle2, label: t("specCategory"), value: car.category },
  ];

  // Sticky CTA tap-target on mobile
  const waText = encodeURIComponent(`Hi, I'm interested in ${car.title} (ID: ${car.id})`);
  const waHref = `https://wa.me/15555550101?text=${waText}`;

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 pb-32 lg:pb-12">
        <Link to="/cars" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t("backToInventory")}
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* GALLERY */}
          <div>
            <div
              ref={galleryRef}
              className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted shadow-elegant select-none"
              onMouseMove={(e) => e.buttons === 1 && onDrag(e.clientX)}
              onTouchMove={(e) => onDrag(e.touches[0].clientX)}
            >
              <img
                src={car.images[idx]}
                alt={car.title}
                className="h-full w-full object-cover transition-transform duration-700"
                style={{ transform: `scale(${1 + Math.abs(rotation) * 0.005})` }}
                loading="eager"
                fetchPriority="high"
              />
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
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold bg-primary text-primary-foreground">
                360° drag
              </div>
            </div>

            {car.images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
                {car.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={cn("aspect-square rounded-lg overflow-hidden border-2 transition",
                      i === idx ? "border-accent" : "border-transparent opacity-70 hover:opacity-100")}
                  >
                    <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-8 flex items-center gap-2 flex-wrap">
              <button
                onClick={() => { const a = toggleFavorite(car.id); toast.success(a ? t("favSaved") : t("favRemovedMsg")); }}
                className={cn("inline-flex items-center gap-2 h-10 px-4 rounded-full border text-sm font-semibold",
                  isFav ? "bg-red-500/10 border-red-500/40 text-red-500" : "border-input hover:bg-secondary")}
              >
                <Heart className={cn("h-4 w-4", isFav && "fill-red-500")} />
                {isFav ? t("favRemove") : t("favAdd")}
              </button>
              <button
                onClick={() => {
                  if (!isCmp && cmp.length >= COMPARE_LIMIT) { toast.error(t("compareEmpty")); return; }
                  toggleCompare(car.id); toast.success(isCmp ? t("compareRemove") : t("compareAdd"));
                }}
                className={cn("inline-flex items-center gap-2 h-10 px-4 rounded-full border text-sm font-semibold",
                  isCmp ? "bg-accent text-accent-foreground border-accent" : "border-input hover:bg-secondary")}
              >
                <GitCompare className="h-4 w-4" />
                {isCmp ? t("compareRemove") : t("compareAdd")}
              </button>
              <button onClick={() => setShowHistory(true)} className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-secondary hover:bg-secondary/80 text-sm font-semibold">
                <FileText className="h-4 w-4" /> {t("historyTitle")}
              </button>
            </div>

            <div className="mt-8">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary">{car.category}</span>
              <h1 className="mt-3 text-3xl md:text-4xl font-bold">{car.title}</h1>
              <div className="mt-2 flex items-baseline gap-3">
                {discounted ? (
                  <>
                    <span className="text-3xl font-bold text-accent">{formatPrice(discounted)}</span>
                    <span className="text-lg line-through text-muted-foreground">{formatPrice(car.price)}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-destructive text-destructive-foreground">-{car.discount}%</span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-accent">{formatPrice(car.price)}</span>
                )}
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {specs.map((s) => (
                  <div key={s.label} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <s.Icon className="h-4 w-4" /> {s.label}
                    </div>
                    <div className="mt-1 font-semibold">{s.value}</div>
                  </div>
                ))}
                {car.color && (
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="text-muted-foreground text-xs">{t("specColor")}</div>
                    <div className="mt-1 font-semibold flex items-center gap-2">
                      <span className="inline-block h-3 w-3 rounded-full" style={{ background: car.color.toLowerCase().includes("black") ? "#111" : car.color.toLowerCase().includes("white") ? "#eee" : car.color.toLowerCase().includes("red") ? "#dc2626" : car.color.toLowerCase().includes("blue") ? "#2563eb" : car.color.toLowerCase().includes("silver") ? "#a3a3a3" : car.color.toLowerCase().includes("green") ? "#16a34a" : "#6b7280" }} />
                      {car.color}
                    </div>
                  </div>
                )}
                {typeof car.cylinders === "number" && car.cylinders > 0 && (
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="text-muted-foreground text-xs">{t("specCylinders")}</div>
                    <div className="mt-1 font-semibold">{car.cylinders}</div>
                  </div>
                )}
                {car.fuel && (
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="text-muted-foreground text-xs">{t("specFuel")}</div>
                    <div className="mt-1 font-semibold">{car.fuel}</div>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold">{t("description")}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{car.description}</p>
              </div>
            </div>
          </div>

          {/* INQUIRY + FINANCE */}
          <aside className="lg:sticky lg:top-24 h-fit space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-elegant">
              <h2 className="font-display text-xl font-bold">{t("inquiryTitle")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t("inquirySubtitle")}</p>
              {submitted ? (
                <div className="mt-6 rounded-xl bg-secondary p-5 text-center">
                  <CheckCircle2 className="h-10 w-10 mx-auto text-accent" />
                  <div className="mt-2 font-semibold">{t("inquirySuccessTitle")}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{t("inquirySuccessMsg")}</p>
                  <button onClick={() => setSubmitted(false)} className="mt-4 text-sm font-medium text-primary hover:text-accent">
                    {t("btnSendAnother")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                  <input name="fullName" placeholder={t("inquiryFullName")} required className="w-full h-11 px-3 rounded-md bg-background border border-input text-sm" />
                  <div className="grid grid-cols-2 gap-3">
                    <input name="phone" placeholder={t("inquiryPhone")} required className="w-full h-11 px-3 rounded-md bg-background border border-input text-sm" />
                    <input name="email" type="email" placeholder={t("inquiryEmail")} required className="w-full h-11 px-3 rounded-md bg-background border border-input text-sm" />
                  </div>
                  <input name="city" placeholder={t("inquiryCity")} className="w-full h-11 px-3 rounded-md bg-background border border-input text-sm" />
                  <textarea name="notes" placeholder={t("inquiryNotes")} rows={3} className="w-full px-3 py-2 rounded-md bg-background border border-input text-sm resize-none" />
                  <button type="submit" disabled={submitting} className="w-full h-11 rounded-lg bg-gradient-accent text-accent-foreground font-bold flex items-center justify-center gap-2 disabled:opacity-60">
                    {submitting ? <><Loader2 className="h-4 w-4 spin" /> {t("inquirySending")}</> : t("inquirySubmit")}
                  </button>
                </form>
              )}

              <a href={waHref} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold">
                <MessageCircle className="h-4 w-4" /> {t("whatsappNow")}
              </a>
            </div>
            <FinanceCalc price={car.price} />
          </aside>
        </div>

        {/* MOBILE STICKY CTAs */}
        <div className="fixed lg:hidden bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur border-t border-border p-3 flex gap-2 shadow-elegant">
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-emerald-500 text-white font-bold text-sm">
            <MessageCircle className="h-4 w-4" /> {t("whatsappNow")}
          </a>
          <Link to="#inquiry" onClick={(e) => { const f = document.querySelector("form"); f?.scrollIntoView({ behavior: "smooth" }); e.preventDefault(); }} className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-gradient-accent text-accent-foreground font-bold text-sm">
            {t("applyFinance")}
          </Link>
        </div>
      </div>

      {/* HISTORY MODAL */}
      {showHistory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4" onClick={() => setShowHistory(false)}>
          <div className="bg-card rounded-2xl max-w-lg w-full p-6 shadow-elegant" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold font-display">{t("historyTitle")}</h2>
                <p className="text-xs text-muted-foreground mt-1">{car.title} • {t("reportsAvailable")}</p>
              </div>
              <button onClick={() => setShowHistory(false)} className="p-2 rounded-md hover:bg-secondary" aria-label="Close"><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start justify-between p-3 rounded-lg bg-secondary">
                <div>
                  <div className="font-semibold">{t("historyOwners")}</div>
                  <div className="text-muted-foreground text-xs">CARFAX-verified</div>
                </div>
                <span className="font-bold text-accent">{t("historyOwnersVal")}</span>
              </div>
              <div className="flex items-start justify-between p-3 rounded-lg bg-secondary">
                <div>
                  <div className="font-semibold">{t("historyAccidents")}</div>
                  <div className="text-muted-foreground text-xs">Police and insurance records</div>
                </div>
                <span className="font-bold text-accent">{t("historyAccidentsVal")}</span>
              </div>
              <div className="flex items-start justify-between p-3 rounded-lg bg-secondary">
                <div>
                  <div className="font-semibold">{t("historyService")}</div>
                  <div className="text-muted-foreground text-xs">23 service records on file</div>
                </div>
                <span className="font-bold text-accent">{t("historyServiceVal")}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}

function FinanceCalc({ price }: { price: number }) {
  const { t } = useLanguage();
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6);
  const [n, setN] = useState(60);
  const principal = Math.max(0, price * (1 - Math.min(90, Math.max(0, downPct)) / 100));
  const months = Math.max(1, Math.min(120, n));
  const r = Math.max(0, rate) / 100 / 12;
  const monthly = r > 0 ? (principal * r) / (1 - Math.pow(1 + r, -months)) : principal / months;
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
      <h2 className="font-display text-lg font-bold flex items-center gap-2">
        <CalcIcon className="h-5 w-5 text-accent" /> {t("calcTitle")}
      </h2>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div><label className="text-xs font-semibold text-muted-foreground">{t("calcDown")}</label><input type="number" min={0} max={90} value={downPct} onChange={(e) => setDownPct(Number(e.target.value))} className="mt-1 w-full h-10 px-3 rounded-md bg-background border border-input text-sm" /></div>
        <div><label className="text-xs font-semibold text-muted-foreground">{t("calcRate")}</label><input type="number" min={0} max={30} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-1 w-full h-10 px-3 rounded-md bg-background border border-input text-sm" /></div>
        <div><label className="text-xs font-semibold text-muted-foreground">{t("calcTerm")}</label><input type="number" min={6} max={120} step={6} value={n} onChange={(e) => setN(Number(e.target.value))} className="mt-1 w-full h-10 px-3 rounded-md bg-background border border-input text-sm" /></div>
      </div>
      <div className="mt-4 rounded-xl bg-secondary p-4 text-center">
        <div className="text-xs text-muted-foreground">{t("calcMonthly")}</div>
        <div className="mt-1 text-2xl font-bold text-accent">{formatPrice(Math.round(monthly))} <span className="text-xs font-normal">/ mo</span></div>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">{t("calcDisclaimer")}</p>
    </div>
  );
}
