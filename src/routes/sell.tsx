import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Car as CarIcon,
  Calculator,
  ShieldCheck,
  Zap,
  CheckCircle2,
  DollarSign,
  Upload,
  Clock,
  Sparkles,
  ArrowRight,
  Info,
  X,
  FileText,
  Phone,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/PublicLayout";
import { useDealership, formatPrice } from "@/context/DealershipContext";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteSettings } from "@/lib/settings";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell Your Car — Instant Cash Offer | VelocityMotors" },
      {
        name: "description",
        content:
          "Sell your luxury or certified vehicle quickly with transparent valuation, free 200-point inspection, and instant payout.",
      },
    ],
  }),
  component: SellCarPage,
});

const MAKES = [
  "Porsche",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Tesla",
  "Ferrari",
  "Lamborghini",
  "Aston Martin",
  "Land Rover",
  "Bentley",
  "Rolls-Royce",
  "Lexus",
  "Toyota",
  "Ford",
  "Other",
];

const CONDITIONS = [
  { id: "Like New", labelEn: "Like New (Flawless)", labelAr: "شبه جديدة (وكالة)", factor: 1.1 },
  { id: "Excellent", labelEn: "Excellent (Minor wear)", labelAr: "ممتازة جداً (استخدام نظيف)", factor: 1.0 },
  { id: "Good", labelEn: "Good (Normal wear & tear)", labelAr: "جيدة (استخدام عادي)", factor: 0.88 },
  { id: "Fair", labelEn: "Fair (Needs minor servicing)", labelAr: "مقبولة (تحتاج صيانة خفيفة)", factor: 0.75 },
];

function SellCarPage() {
  const { t, locale } = useLanguage();
  const { addOrder } = useDealership();
  const site = useSiteSettings();

  // Form State
  const [make, setMake] = useState("Porsche");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2022);
  const [mileage, setMileage] = useState(25000);
  const [condition, setCondition] = useState("Excellent");
  const [askingPrice, setAskingPrice] = useState("");
  const [vin, setVin] = useState("");
  const [transmission, setTransmission] = useState("Automatic");
  const [fuel, setFuel] = useState("Petrol");
  const [color, setColor] = useState("");
  const [requestType, setRequestType] = useState<"SellMyCar" | "TradeIn">("SellMyCar");
  const [tradeInTarget, setTradeInTarget] = useState("");
  const [description, setDescription] = useState("");

  // Photos
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // Seller Details
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [preferredInspection, setPreferredInspection] = useState<"showroom" | "home">("showroom");

  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Algorithmic Valuation Estimator
  const estimatedValue = useMemo(() => {
    const basePrices: Record<string, number> = {
      Porsche: 95000,
      BMW: 68000,
      "Mercedes-Benz": 72000,
      Audi: 62000,
      Tesla: 58000,
      Ferrari: 260000,
      Lamborghini: 280000,
      "Aston Martin": 190000,
      "Land Rover": 75000,
      Bentley: 180000,
      "Rolls-Royce": 320000,
      Lexus: 52000,
      Toyota: 32000,
      Ford: 35000,
      Other: 45000,
    };

    const base = basePrices[make] || 45000;
    const currentYear = new Date().getFullYear();
    const age = Math.max(0, currentYear - year);
    // Depreciation ~7% per year
    const ageFactor = Math.max(0.25, Math.pow(0.93, age));
    // Mileage deduction
    const mileageDeduction = Math.max(0, (mileage - 10000) * 0.12);
    const condObj = CONDITIONS.find((c) => c.id === condition) || CONDITIONS[1];

    const raw = Math.max(8000, (base * ageFactor - mileageDeduction) * condObj.factor);
    const low = Math.round((raw * 0.94) / 100) * 100;
    const high = Math.round((raw * 1.06) / 100) * 100;

    return { low, high, avg: Math.round((low + high) / 2) };
  }, [make, year, mileage, condition]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImages: string[] = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          newImages.push(String(ev.target.result));
          if (newImages.length === files.length) {
            setImages((prev) => [...prev, ...newImages].slice(0, 8));
            setUploading(false);
            toast.success(
              locale === "ar"
                ? `تمت إضافة ${newImages.length} صور بنجاح`
                : `Added ${newImages.length} photos.`
            );
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim().length < 2) return toast.error(t("fullName"));
    if (!/^[\d\s+()-]{7,20}$/.test(phone)) return toast.error(t("phoneNumber"));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error(t("emailAddress"));

    setSubmitting(true);
    const refId = `VEL-SELL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const notesPayload = JSON.stringify({
        reference: refId,
        requestType,
        carDetails: {
          make,
          model: model || "Standard",
          year,
          mileage,
          condition,
          askingPrice: askingPrice ? Number(askingPrice) : estimatedValue.avg,
          estimatedRange: `${formatPrice(estimatedValue.low)} - ${formatPrice(estimatedValue.high)}`,
          vin: vin || undefined,
          transmission,
          fuel,
          color: color || undefined,
          description,
        },
        tradeInTargetCar: requestType === "TradeIn" ? tradeInTarget : undefined,
        preferredInspection,
        photoCount: images.length,
      });

      await addOrder({
        carId: "",
        carTitle: `${year} ${make} ${model || "Vehicle"} [${requestType === "TradeIn" ? "Trade-In" : "Sell Car"}]`,
        fullName,
        phone,
        email,
        city: city || "Not Specified",
        notes: notesPayload,
        type: requestType,
      });

      setSubmittedRef(refId);
      toast.success(t("sellSuccessMsg"));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error submitting your vehicle.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-16">
        {/* HERO BANNER */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-card via-card/90 to-accent/10 border border-border p-6 sm:p-10 md:p-14 shadow-elegant text-center max-w-5xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 text-accent text-xs font-bold uppercase tracking-wider mb-4 border border-accent/20">
            <Sparkles className="h-4 w-4" /> {locale === "ar" ? "خدمة بيع واستبدال السيارات" : "Sell & Trade-In Portal"}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight">
            {t("sellHeroTitle")}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            {t("sellHeroSubtitle")}
          </p>

          {/* Pillars */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left rtl:text-right">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-background/80 backdrop-blur border border-border/80">
              <div className="h-10 w-10 rounded-xl bg-accent/15 text-accent grid place-items-center shrink-0">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-sm">{locale === "ar" ? "تقييم وعرض فوري" : "Instant Valuation"}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {locale === "ar" ? "أعلى سعر سوقي مضمون بناءً على حالة سيارتك" : "Algorithmic market pricing in real time"}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-background/80 backdrop-blur border border-border/80">
              <div className="h-10 w-10 rounded-xl bg-accent/15 text-accent grid place-items-center shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-sm">{locale === "ar" ? "فحص مجاني عند باب منزلك" : "Free Inspection"}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {locale === "ar" ? "فريقنا الهندسي يفحص السيارة عندك بلا أي رسوم" : "We inspect at your home or our showroom"}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-background/80 backdrop-blur border border-border/80">
              <div className="h-10 w-10 rounded-xl bg-accent/15 text-accent grid place-items-center shrink-0">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-sm">{locale === "ar" ? "تحويل بنكي فوري" : "Instant Payout"}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {locale === "ar" ? "تحويل المبلغ إلى حسابك مباشرة فور توقيع العقد" : "Immediate wire transfer on title transfer"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SUBMITTED SUCCESS VIEW */}
        {submittedRef ? (
          <div className="mt-12 max-w-2xl mx-auto p-8 rounded-3xl bg-card border border-border shadow-card text-center space-y-6 animate-fade-in">
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 grid place-items-center mx-auto">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold text-accent px-3 py-1 rounded-full bg-accent/10">
                {locale === "ar" ? "تم تسجيل طلبك بنجاح" : "Submission Received"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mt-3">
                {year} {make} {model || ""}
              </h2>
              <div className="mt-2 text-sm text-muted-foreground">
                {t("orderRefNumber")}: <span className="font-mono font-bold text-foreground">{submittedRef}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-secondary/50 border border-border text-sm space-y-2 text-left rtl:text-right">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("estimatedValue")}:</span>
                <span className="font-bold text-accent">
                  {formatPrice(estimatedValue.low)} – {formatPrice(estimatedValue.high)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{locale === "ar" ? "اسم المالك" : "Seller"}:</span>
                <span className="font-semibold">{fullName} ({phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{locale === "ar" ? "طريقة البيع" : "Request Type"}:</span>
                <span className="font-semibold">{requestType === "TradeIn" ? "استبدال سيارة" : "بيع مباشر كاش"}</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("sellSuccessMsg")}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/cars"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-accent text-accent-foreground font-bold text-sm shadow-md"
              >
                {t("btnBrowse")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <button
                onClick={() => {
                  setSubmittedRef(null);
                  setImages([]);
                }}
                className="h-11 px-5 rounded-xl border border-input text-sm font-semibold hover:bg-secondary"
              >
                {locale === "ar" ? "تقديم سيارة أخرى" : "Submit Another Car"}
              </button>
            </div>
          </div>
        ) : (
          /* FORM & VALUATION GRID */
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-start max-w-6xl mx-auto">
            {/* SUBMISSION FORM */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-card">
              {/* Request Type Selector */}
              <div>
                <label className="block text-sm font-bold mb-2">
                  {locale === "ar" ? "نوع الطلب" : "Transaction Type"}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRequestType("SellMyCar")}
                    className={cn(
                      "p-3.5 rounded-xl border flex items-center justify-center gap-2 font-bold text-sm transition",
                      requestType === "SellMyCar"
                        ? "border-accent bg-accent/15 text-accent shadow-sm"
                        : "border-border hover:bg-muted/50"
                    )}
                  >
                    <DollarSign className="h-4 w-4" />
                    {locale === "ar" ? "بيع مباشر (كاش)" : "Direct Cash Sale"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setRequestType("TradeIn")}
                    className={cn(
                      "p-3.5 rounded-xl border flex items-center justify-center gap-2 font-bold text-sm transition",
                      requestType === "TradeIn"
                        ? "border-accent bg-accent/15 text-accent shadow-sm"
                        : "border-border hover:bg-muted/50"
                    )}
                  >
                    <CarIcon className="h-4 w-4" />
                    {locale === "ar" ? "استبدال بسيارة أخرى" : "Trade-In Car"}
                  </button>
                </div>
              </div>

              {requestType === "TradeIn" && (
                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    {locale === "ar" ? "السيارة المستهدفة للشراء من معرضنا" : "Target Car You Want to Buy"}
                  </label>
                  <input
                    value={tradeInTarget}
                    onChange={(e) => setTradeInTarget(e.target.value)}
                    placeholder={
                      locale === "ar"
                        ? "مثال: بورش 911 كاريرا أو تسلا موديل إس"
                        : "e.g. 2024 Porsche 911 Carrera S from your inventory"
                    }
                    className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                  />
                </div>
              )}

              {/* Vehicle Spec Fields */}
              <div className="border-t border-border pt-5 space-y-4">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <CarIcon className="h-4 w-4 text-accent" />
                  {locale === "ar" ? "مواصفات سيارتك" : "Vehicle Information"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                      {t("carMake")} *
                    </label>
                    <select
                      value={make}
                      onChange={(e) => setMake(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                    >
                      {MAKES.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                      {t("carModel")} *
                    </label>
                    <input
                      required
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder={locale === "ar" ? "مثال: Panamera 4S / M3 Competition" : "e.g. 911 Carrera / M4"}
                      className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                      {t("carYear")} *
                    </label>
                    <select
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                    >
                      {Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                      {t("carMileage")} (mi) *
                    </label>
                    <input
                      required
                      type="number"
                      min={0}
                      value={mileage}
                      onChange={(e) => setMileage(Number(e.target.value))}
                      className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                      {t("carCondition")} *
                    </label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                    >
                      {CONDITIONS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {locale === "ar" ? c.labelAr : c.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                      {t("askingPrice")}
                    </label>
                    <input
                      type="number"
                      value={askingPrice}
                      onChange={(e) => setAskingPrice(e.target.value)}
                      placeholder={String(estimatedValue.avg)}
                      className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                      {t("specTransmission")}
                    </label>
                    <select
                      value={transmission}
                      onChange={(e) => setTransmission(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm"
                    >
                      <option value="Automatic">Automatic / PDK</option>
                      <option value="Manual">Manual</option>
                      <option value="Electric Single-Speed">Electric</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                      VIN / رقم الهيكل (Optional)
                    </label>
                    <input
                      value={vin}
                      onChange={(e) => setVin(e.target.value.toUpperCase())}
                      maxLength={17}
                      placeholder="WP0AB2A92NS123456"
                      className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm font-mono focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                {/* Photos Upload */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-muted-foreground mb-2">
                    {t("uploadPhotos")} (Max 8)
                  </label>

                  <div className="flex items-center gap-3 flex-wrap">
                    <label className="h-24 w-28 rounded-2xl border-2 border-dashed border-border hover:border-accent hover:bg-accent/5 grid place-items-center cursor-pointer transition text-center p-2 text-muted-foreground">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Upload className="h-6 w-6 text-accent" />
                      <span className="text-[10px] font-bold mt-1">
                        {uploading ? "Uploading..." : locale === "ar" ? "اختر صوراً" : "Add Photos"}
                      </span>
                    </label>

                    {images.map((src, i) => (
                      <div key={i} className="relative h-24 w-28 rounded-2xl overflow-hidden border border-border group bg-muted">
                        <img src={src} alt="" className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/70 text-white grid place-items-center hover:bg-destructive transition"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                    {locale === "ar" ? "ملاحظات إضافية عن الصيانة والمواصفات" : "Service History & Notes"}
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={
                      locale === "ar"
                        ? "مثال: صيانة وكالة كاملة، خالية من الرش والحوادث، مفتاحين أصليين..."
                        : "Full dealer service records, clean Carfax, ceramic coated..."
                    }
                    className="w-full p-3.5 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              {/* Seller Contact Info */}
              <div className="border-t border-border pt-5 space-y-4">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Phone className="h-4 w-4 text-accent" />
                  {locale === "ar" ? "بيانات التواصل" : "Contact Information"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                      {t("inquiryFullName")} *
                    </label>
                    <input
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={locale === "ar" ? "اسم المالك" : "Full Name"}
                      className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                      {t("inquiryPhone")} *
                    </label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 555 019 2834"
                      className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                      {t("inquiryEmail")} *
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="owner@example.com"
                      className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                      {t("inquiryCity")} *
                    </label>
                    <input
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={locale === "ar" ? "الرياض / Los Angeles" : "Los Angeles, CA"}
                      className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-muted-foreground mb-2">
                    {locale === "ar" ? "مكان الفحص المفضل" : "Preferred Free Inspection Location"}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPreferredInspection("showroom")}
                      className={cn(
                        "p-3 rounded-xl border text-xs font-bold transition",
                        preferredInspection === "showroom"
                          ? "border-accent bg-accent/15 text-accent"
                          : "border-border hover:bg-muted/50"
                      )}
                    >
                      {locale === "ar" ? "في صالة المعرض" : "At Showroom"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredInspection("home")}
                      className={cn(
                        "p-3 rounded-xl border text-xs font-bold transition",
                        preferredInspection === "home"
                          ? "border-accent bg-accent/15 text-accent"
                          : "border-border hover:bg-muted/50"
                      )}
                    >
                      {locale === "ar" ? "فحص متنقل عند منزلي" : "Mobile at My Home"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-bold text-base shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  locale === "ar" ? "جاري إرسال الطلب..." : "Submitting..."
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    {t("submitForSale")}
                  </>
                )}
              </button>
            </form>

            {/* LIVE VALUATION ESTIMATOR WIDGET (STICKY) */}
            <div className="sticky top-24 space-y-6">
              <div className="rounded-3xl bg-card border border-border p-6 shadow-card space-y-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-accent/15 text-accent grid place-items-center font-bold">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">{t("instantValuation")}</h3>
                    <p className="text-xs text-muted-foreground">{year} {make} {model || ""}</p>
                  </div>
                </div>

                {/* Large Estimated Cash Offer Display */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-accent/10 via-secondary to-secondary/80 border border-accent/20 text-center space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-accent">
                    {t("estimatedValue")}
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                    {formatPrice(estimatedValue.low)} – {formatPrice(estimatedValue.high)}
                  </div>
                  <div className="text-xs text-muted-foreground pt-1">
                    {locale === "ar" ? "متوسط السعر الفوري: " : "Average payout: "}
                    <span className="font-bold text-accent">{formatPrice(estimatedValue.avg)}</span>
                  </div>
                </div>

                {/* Breakdown Specs */}
                <div className="space-y-2 text-xs border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("carMake")}:</span>
                    <span className="font-semibold">{make}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("carYear")}:</span>
                    <span className="font-semibold">{year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("carMileage")}:</span>
                    <span className="font-semibold">{mileage.toLocaleString()} mi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("carCondition")}:</span>
                    <span className="font-semibold">{condition}</span>
                  </div>
                </div>

                {/* Guarantee Banner */}
                <div className="p-4 rounded-2xl bg-secondary/60 text-xs text-muted-foreground space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-foreground">
                    <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                    {locale === "ar" ? "ضمان أفضل عرض شراء" : "Guaranteed Cash Offer"}
                  </div>
                  <p>
                    {locale === "ar"
                      ? "عرضنا النقدي ساري لمدة ٧ أيام بعد فحص السيارة، مع تحويل فوري ودفع الرسوم الإدارية."
                      : "Offer valid for 7 days post-inspection with immediate wire transfer and zero seller fees."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
