import { useState } from "react";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Building2,
  Banknote,
  Truck,
  Store,
  Printer,
  MessageCircle,
  FileText,
  Lock,
  ArrowRight,
  Sparkles,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import type { Car } from "@/data/initialCars";
import { useDealership, formatPrice } from "@/context/DealershipContext";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteSettings } from "@/lib/settings";
import { PhoneInput } from "@/components/PhoneInput";
import { cn } from "@/lib/utils";

type Step = "options" | "details" | "payment" | "confirmed";

interface CarPurchaseModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "reserve" | "buy";
}

export function CarPurchaseModal({
  car,
  isOpen,
  onClose,
  initialMode = "reserve",
}: CarPurchaseModalProps) {
  const { t, locale } = useLanguage();
  const { addOrder, updateCar } = useDealership();
  const site = useSiteSettings();

  const [step, setStep] = useState<Step>("options");
  const [depositType, setDepositType] = useState<
    "standard" | "tenPercent" | "full" | "custom"
  >(initialMode === "buy" ? "full" : "standard");
  const [customDeposit, setCustomDeposit] = useState<number>(1000);
  const [deliveryMethod, setDeliveryMethod] = useState<"showroom" | "delivery">(
    "showroom",
  );
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "transfer" | "cash"
  >("card");
  const [submitting, setSubmitting] = useState(false);
  const [hasTradeIn, setHasTradeIn] = useState(false);
  const [tradeInDetails, setTradeInDetails] = useState("");

  // Customer details form
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");

  // Card details (simulated safe mock entry)
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");

  // Confirmed booking state
  const [orderRef, setOrderRef] = useState<string>("");

  if (!isOpen) return null;

  const standardDeposit = 500;
  const tenPercentDeposit = Math.round(car.price * 0.1);
  const fullPrice = car.price;

  const currentDeposit =
    depositType === "standard"
      ? standardDeposit
      : depositType === "tenPercent"
        ? tenPercentDeposit
        : depositType === "full"
          ? fullPrice
          : Math.max(100, customDeposit || 500);

  const remainingBalance = Math.max(0, car.price - currentDeposit);

  const handleProceedToDetails = () => {
    setStep("details");
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim().length < 2) return toast.error(t("fullName"));
    if (!/^[\d\s+()-]{7,20}$/.test(phone)) return toast.error(t("phoneNumber"));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return toast.error(t("emailAddress"));
    setStep("payment");
  };

  const handleCompleteOrder = async () => {
    if (paymentMethod === "card") {
      if (cardNumber.replace(/\s/g, "").length < 15) {
        return toast.error(
          locale === "ar"
            ? "يرجى إدخال رقم بطاقة صحيح"
            : "Please enter a valid 16-digit card number.",
        );
      }
    }

    setSubmitting(true);
    const generatedRef = `VEL-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      const orderNotes = JSON.stringify({
        bookingRef: generatedRef,
        depositPaid: currentDeposit,
        depositType,
        remainingBalance,
        deliveryMethod,
        paymentMethod,
        nationalId,
        deliveryAddress: address,
        preferredDate,
        hasTradeIn,
        tradeInDetails: hasTradeIn ? tradeInDetails : undefined,
        customNotes: notes,
      });

      await addOrder({
        carId: car.id,
        carTitle: `${car.year} ${car.make} ${car.model}`,
        fullName,
        phone,
        email,
        city: city || address || "Showroom",
        notes: orderNotes,
        type: depositType === "full" ? "Purchase" : "Reservation",
      });

      // Mark car as Reserved in local/cloud context
      try {
        await updateCar(car.id, { status: "Reserved" });
      } catch (e) {
        console.warn("Status update fallback:", e);
      }

      setOrderRef(generatedRef);
      setStep("confirmed");
      toast.success(t("orderConfirmed"));
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Error completing reservation.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const waConfirmationText = encodeURIComponent(
    `Hello Velocity Motors, I have reserved ${car.year} ${car.title} (Booking Ref: ${orderRef}). My name is ${fullName}, Phone: ${phone}. Deposit: ${formatPrice(currentDeposit)}.`,
  );
  const waHref = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${waConfirmationText}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div
        id="reservation-modal-container"
        className="relative w-full max-w-2xl bg-card border border-border rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-muted/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-accent/15 text-accent grid place-items-center font-bold">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-display leading-tight">
                {step === "confirmed"
                  ? t("orderConfirmed")
                  : initialMode === "buy"
                    ? t("buyOnline")
                    : t("reserveNow")}
              </h2>
              <p className="text-xs text-muted-foreground">
                {car.year} {car.title} ·{" "}
                <span className="font-semibold text-accent">
                  {formatPrice(car.price)}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted text-muted-foreground transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        {step !== "confirmed" && (
          <div className="grid grid-cols-3 border-b border-border bg-muted/20 text-xs font-semibold shrink-0">
            <div
              className={cn(
                "py-2.5 text-center border-b-2 transition",
                step === "options"
                  ? "border-accent text-accent bg-accent/5 font-bold"
                  : "border-transparent text-muted-foreground",
              )}
            >
              1. {locale === "ar" ? "خيارات الحجز" : "Deposit"}
            </div>
            <div
              className={cn(
                "py-2.5 text-center border-b-2 transition",
                step === "details"
                  ? "border-accent text-accent bg-accent/5 font-bold"
                  : "border-transparent text-muted-foreground",
              )}
            >
              2. {locale === "ar" ? "بيانات المشتري" : "Buyer Info"}
            </div>
            <div
              className={cn(
                "py-2.5 text-center border-b-2 transition",
                step === "payment"
                  ? "border-accent text-accent bg-accent/5 font-bold"
                  : "border-transparent text-muted-foreground",
              )}
            >
              3. {locale === "ar" ? "تأكيد الدفع" : "Payment"}
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: OPTIONS */}
          {step === "options" && (
            <div className="space-y-6">
              {/* Car Snapshot */}
              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-secondary/40 border border-border">
                <img
                  src={car.images[0]}
                  alt={car.title}
                  className="h-16 w-24 object-cover rounded-xl bg-muted shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-muted-foreground">
                    {car.category} · {car.transmission} ·{" "}
                    {car.mileage.toLocaleString()} mi
                  </div>
                  <h3 className="font-bold text-sm sm:text-base truncate">
                    {car.title}
                  </h3>
                  <div className="font-bold text-accent text-base sm:text-lg">
                    {formatPrice(car.price)}
                  </div>
                </div>
              </div>

              {/* Deposit Plan Selection */}
              <div>
                <label className="block text-sm font-bold mb-2">
                  {locale === "ar"
                    ? "اختر مبلغ الحجز / الدفعة"
                    : "Select Reservation Deposit"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Standard Hold */}
                  <button
                    type="button"
                    onClick={() => setDepositType("standard")}
                    className={cn(
                      "p-4 rounded-xl border text-left rtl:text-right transition relative flex flex-col justify-between",
                      depositType === "standard"
                        ? "border-accent bg-accent/10 ring-2 ring-accent/30"
                        : "border-border bg-card hover:bg-muted/50",
                    )}
                  >
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase">
                        {locale === "ar" ? "عربون حجز فوري" : "Standard Hold"}
                      </div>
                      <div className="text-xl font-bold mt-1 text-accent">
                        $500
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-2">
                      {locale === "ar"
                        ? "حجز السيارة لك حصرياً ٧ أيام"
                        : "Holds car for 7 days"}
                    </p>
                  </button>

                  {/* 10% Down */}
                  <button
                    type="button"
                    onClick={() => setDepositType("tenPercent")}
                    className={cn(
                      "p-4 rounded-xl border text-left rtl:text-right transition relative flex flex-col justify-between",
                      depositType === "tenPercent"
                        ? "border-accent bg-accent/10 ring-2 ring-accent/30"
                        : "border-border bg-card hover:bg-muted/50",
                    )}
                  >
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase">
                        {locale === "ar" ? "دفعة أولى 10%" : "10% Down Payment"}
                      </div>
                      <div className="text-xl font-bold mt-1 text-accent">
                        {formatPrice(tenPercentDeposit)}
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-2">
                      {locale === "ar"
                        ? "تسريع إجراءات الملكية"
                        : "Fast-tracks paperwork"}
                    </p>
                  </button>

                  {/* Full Purchase */}
                  <button
                    type="button"
                    onClick={() => setDepositType("full")}
                    className={cn(
                      "p-4 rounded-xl border text-left rtl:text-right transition relative flex flex-col justify-between",
                      depositType === "full"
                        ? "border-accent bg-accent/10 ring-2 ring-accent/30"
                        : "border-border bg-card hover:bg-muted/50",
                    )}
                  >
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase">
                        {locale === "ar" ? "شراء كامل فوري" : "Full Buyout"}
                      </div>
                      <div className="text-xl font-bold mt-1 text-accent">
                        {formatPrice(fullPrice)}
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-2">
                      {locale === "ar"
                        ? "امتلاك كامل وتسليم فوري"
                        : "Immediate vehicle ownership"}
                    </p>
                  </button>
                </div>
              </div>

              {/* Handover & Delivery Options */}
              <div>
                <label className="block text-sm font-bold mb-2">
                  {t("deliveryMethod")}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("showroom")}
                    className={cn(
                      "p-3.5 rounded-xl border flex items-center gap-3 text-left rtl:text-right transition",
                      deliveryMethod === "showroom"
                        ? "border-accent bg-accent/10 font-semibold"
                        : "border-border hover:bg-muted/50",
                    )}
                  >
                    <Store className="h-5 w-5 text-accent shrink-0" />
                    <div>
                      <div className="text-sm font-bold">
                        {t("showroomPickup")}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {locale === "ar"
                          ? "استلام من المعرض مع هدية VIP"
                          : "Free VIP handover & unveiling"}
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("delivery")}
                    className={cn(
                      "p-3.5 rounded-xl border flex items-center gap-3 text-left rtl:text-right transition",
                      deliveryMethod === "delivery"
                        ? "border-accent bg-accent/10 font-semibold"
                        : "border-border hover:bg-muted/50",
                    )}
                  >
                    <Truck className="h-5 w-5 text-accent shrink-0" />
                    <div>
                      <div className="text-sm font-bold">
                        {t("homeDelivery")}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {locale === "ar"
                          ? "شحن مغلق ومؤمن لباب منزلك"
                          : "Insured enclosed transporter"}
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Trade-in Checkbox */}
              <div className="p-3.5 rounded-xl border border-border bg-card">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasTradeIn}
                    onChange={(e) => setHasTradeIn(e.target.checked)}
                    className="h-4 w-4 rounded text-accent focus:ring-accent"
                  />
                  <span className="text-sm font-semibold">
                    {locale === "ar"
                      ? "لدي سيارة أرغب باستبدالها وخصم قيمتها من هذا الشراء"
                      : "I want to trade in my current vehicle towards this purchase"}
                  </span>
                </label>

                {hasTradeIn && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <input
                      value={tradeInDetails}
                      onChange={(e) => setTradeInDetails(e.target.value)}
                      placeholder={
                        locale === "ar"
                          ? "مثال: تويوتا كامري 2021 ممشى 45,000 كم، بحالة ممتازة"
                          : "e.g. 2021 Toyota Camry, 45k miles, excellent condition"
                      }
                      className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                )}
              </div>

              {/* Price Breakdown Banner */}
              <div className="p-4 rounded-2xl bg-secondary border border-border space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {locale === "ar" ? "سعر السيارة" : "Vehicle Price"}:
                  </span>
                  <span className="font-semibold">
                    {formatPrice(car.price)}
                  </span>
                </div>
                <div className="flex justify-between text-accent font-bold">
                  <span>{t("depositAmount")}:</span>
                  <span>{formatPrice(currentDeposit)}</span>
                </div>
                <div className="flex justify-between border-t border-border/70 pt-2 font-bold">
                  <span>{t("remainingBalance")}:</span>
                  <span>{formatPrice(remainingBalance)}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: BUYER DETAILS */}
          {step === "details" && (
            <form
              id="buyer-details-form"
              onSubmit={handleProceedToPayment}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                    {t("inquiryFullName")} *
                  </label>
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={locale === "ar" ? "الاسم الثلاثي" : "John Doe"}
                    className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                    {t("inquiryPhone")} *
                  </label>
                  <PhoneInput required value={phone} onChange={setPhone} />
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
                    placeholder="john@example.com"
                    className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                    {locale === "ar"
                      ? "رقم الهوية / رخصة القيادة"
                      : "Driver License / ID #"}
                  </label>
                  <input
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    placeholder={
                      locale === "ar"
                        ? "لإعداد عقد المبايعة"
                        : "For sales deed registration"
                    }
                    className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
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
                    placeholder={
                      locale === "ar"
                        ? "الرياض / دبي / Los Angeles"
                        : "Los Angeles"
                    }
                    className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                    {locale === "ar"
                      ? "التاريخ المفضل للاستلام"
                      : "Preferred Pickup Date"}
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              {deliveryMethod === "delivery" && (
                <div>
                  <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                    {locale === "ar"
                      ? "عنوان التوصيل بالتفصيل"
                      : "Delivery Address"}{" "}
                    *
                  </label>
                  <input
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={
                      locale === "ar"
                        ? "الشارع، الحي، الرمز البريدي"
                        : "Street, Suite, ZIP Code"
                    }
                    className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                  {t("inquiryNotes")}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    locale === "ar"
                      ? "أي متطلبات خاصة باللوحات، الفحص، أو التجهيزات..."
                      : "Special requests, registration preferences..."
                  }
                  className="w-full p-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-accent"
                />
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT & CONFIRM */}
          {step === "payment" && (
            <div className="space-y-6">
              {/* Payment Methods */}
              <div>
                <label className="block text-sm font-bold mb-3">
                  {t("paymentMethod")}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={cn(
                      "p-3.5 rounded-xl border flex flex-col items-center gap-2 text-center transition",
                      paymentMethod === "card"
                        ? "border-accent bg-accent/10 ring-2 ring-accent/20"
                        : "border-border hover:bg-muted/50",
                    )}
                  >
                    <CreditCard className="h-6 w-6 text-accent" />
                    <span className="text-xs font-bold">
                      {t("cardPayment")}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("transfer")}
                    className={cn(
                      "p-3.5 rounded-xl border flex flex-col items-center gap-2 text-center transition",
                      paymentMethod === "transfer"
                        ? "border-accent bg-accent/10 ring-2 ring-accent/20"
                        : "border-border hover:bg-muted/50",
                    )}
                  >
                    <Building2 className="h-6 w-6 text-accent" />
                    <span className="text-xs font-bold">
                      {t("bankTransfer")}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={cn(
                      "p-3.5 rounded-xl border flex flex-col items-center gap-2 text-center transition",
                      paymentMethod === "cash"
                        ? "border-accent bg-accent/10 ring-2 ring-accent/20"
                        : "border-border hover:bg-muted/50",
                    )}
                  >
                    <Banknote className="h-6 w-6 text-accent" />
                    <span className="text-xs font-bold">
                      {t("cashOnDelivery")}
                    </span>
                  </button>
                </div>
              </div>

              {/* Simulated Card Form */}
              {paymentMethod === "card" && (
                <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border space-y-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span className="font-semibold">
                      {locale === "ar"
                        ? "بيانات الدفع الآمن"
                        : "Secure Payment Simulation"}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <Lock className="h-3.5 w-3.5" /> 256-bit SSL
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-muted-foreground mb-1">
                      {locale === "ar" ? "رقم البطاقة" : "Card Number"}
                    </label>
                    <div className="relative">
                      <input
                        value={cardNumber}
                        onChange={(e) => {
                          const val = e.target.value
                            .replace(/\D/g, "")
                            .replace(/(.{4})/g, "$1 ")
                            .trim()
                            .slice(0, 19);
                          setCardNumber(val);
                        }}
                        placeholder="4532 •••• •••• 8892"
                        className="w-full h-11 ltr:pl-10 rtl:pr-10 ltr:pr-3 rtl:pl-3 rounded-xl border border-input bg-background text-sm font-mono focus:ring-2 focus:ring-accent"
                      />
                      <CreditCard className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-muted-foreground mb-1">
                        {locale === "ar" ? "تاريخ الانتهاء" : "Expiry"}
                      </label>
                      <input
                        value={cardExp}
                        onChange={(e) => {
                          const val = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 4);
                          if (val.length >= 2)
                            setCardExp(`${val.slice(0, 2)}/${val.slice(2)}`);
                          else setCardExp(val);
                        }}
                        placeholder="MM/YY"
                        className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm font-mono focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-muted-foreground mb-1">
                        CVC / CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) =>
                          setCardCvc(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="123"
                        className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm font-mono focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-muted-foreground mb-1">
                      {locale === "ar" ? "اسم حامل البطاقة" : "Cardholder Name"}
                    </label>
                    <input
                      value={cardName || fullName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="JOHN DOE"
                      className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm uppercase focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
              )}

              {/* Wire Transfer Details */}
              {paymentMethod === "transfer" && (
                <div className="p-4 sm:p-5 rounded-2xl bg-secondary/50 border border-border text-sm space-y-2">
                  <div className="font-bold">
                    {locale === "ar"
                      ? "بيانات الحساب البنكي للمعرض:"
                      : "Dealership Bank Coordinates:"}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <span className="text-muted-foreground">Bank:</span>
                    <span className="font-semibold">
                      JPMorgan Chase Bank, N.A.
                    </span>
                    <span className="text-muted-foreground">Account Name:</span>
                    <span className="font-semibold">Velocity Motors LLC</span>
                    <span className="text-muted-foreground">
                      IBAN / Account #:
                    </span>
                    <span className="font-mono font-bold">
                      US89 0210 0002 1234 5678 90
                    </span>
                    <span className="text-muted-foreground">SWIFT / BIC:</span>
                    <span className="font-mono font-bold">CHASUS33XXX</span>
                  </div>
                  <p className="text-xs text-muted-foreground pt-2">
                    {locale === "ar"
                      ? "سيتم تفعيل الحجز فور إتمام التحويل وتأكيد المرجع."
                      : "Your hold is reserved upon submitting this form while awaiting the transfer confirmation."}
                  </p>
                </div>
              )}

              {/* Cash Upon Delivery / Inspection */}
              {paymentMethod === "cash" && (
                <div className="p-4 sm:p-5 rounded-2xl bg-secondary/50 border border-border text-sm">
                  <div className="font-bold mb-1">
                    {locale === "ar"
                      ? "الدفع عند الاستلام والمعاينة"
                      : "Pay upon inspection & handover"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {locale === "ar"
                      ? "يمكنك دفع العربون نقداً أو بشيك مصدق عند الحضور إلى المعرض لتجربة السيارة واستلام المفاتيح."
                      : "You can settle the deposit or full amount via cash or cashier's cheque directly at our showroom during vehicle handover."}
                  </p>
                </div>
              )}

              {/* Final Summary Card */}
              <div className="p-4 rounded-2xl bg-muted/60 border border-border space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {locale === "ar" ? "المشتري" : "Buyer"}:
                  </span>
                  <span className="font-bold">
                    {fullName} ({phone})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {locale === "ar" ? "السيارة" : "Vehicle"}:
                  </span>
                  <span className="font-bold">
                    {car.year} {car.title}
                  </span>
                </div>
                <div className="flex justify-between text-accent text-base font-bold border-t border-border/80 pt-2">
                  <span>
                    {locale === "ar" ? "المبلغ المستحق الآن" : "Due Now"}:
                  </span>
                  <span>{formatPrice(currentDeposit)}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMED ORDER CERTIFICATE */}
          {step === "confirmed" && (
            <div id="printable-certificate" className="space-y-6 text-center">
              <div className="inline-grid place-items-center h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-accent px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                  {t("orderConfirmed")}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold mt-3">
                  {car.year} {car.title}
                </h2>
                <div className="mt-2 text-sm text-muted-foreground">
                  {t("orderRefNumber")}:{" "}
                  <span className="font-mono font-bold text-foreground">
                    {orderRef}
                  </span>
                </div>
              </div>

              {/* Official Certificate Card */}
              <div className="p-6 rounded-2xl bg-card border border-border text-left rtl:text-right shadow-card space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <div className="font-display font-bold text-lg">
                      Velocity Motors
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Official Reservation Certificate
                    </div>
                  </div>
                  <div className="text-right rtl:text-left">
                    <div className="text-xs text-muted-foreground">
                      {new Date().toLocaleDateString()}
                    </div>
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      STATUS: RESERVED
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground block">
                      {locale === "ar" ? "اسم العميل" : "Customer"}:
                    </span>
                    <span className="font-bold text-sm">{fullName}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">
                      {locale === "ar" ? "رقم الهاتف" : "Phone"}:
                    </span>
                    <span className="font-bold text-sm">{phone}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">
                      {locale === "ar" ? "البريد الإلكتروني" : "Email"}:
                    </span>
                    <span className="font-bold">{email}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">
                      {locale === "ar"
                        ? "المدينة / طريقة الاستلام"
                        : "Delivery"}
                      :
                    </span>
                    <span className="font-bold">
                      {deliveryMethod === "showroom"
                        ? t("showroomPickup")
                        : `${t("homeDelivery")} (${city})`}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>
                      {locale === "ar"
                        ? "سعر المركبة الإجمالي"
                        : "Total Vehicle Price"}
                      :
                    </span>
                    <span className="font-semibold">
                      {formatPrice(car.price)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-accent">
                    <span>
                      {locale === "ar" ? "العربون المدفوع" : "Deposit Paid"}:
                    </span>
                    <span>{formatPrice(currentDeposit)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm border-t border-border pt-2">
                    <span>{t("remainingBalance")}:</span>
                    <span>{formatPrice(remainingBalance)}</span>
                  </div>
                </div>

                <div className="text-[11px] text-muted-foreground border-t border-border/60 pt-3">
                  ✓ {t("depositHold7Days")}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-input bg-card hover:bg-secondary text-sm font-semibold shadow-sm"
                >
                  <Printer className="h-4 w-4" /> {t("downloadInvoice")}
                </button>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  {locale === "ar"
                    ? "إرسال تأكيد بالواتساب"
                    : "Confirm via WhatsApp"}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {step !== "confirmed" && (
          <div className="p-4 sm:p-6 border-t border-border bg-muted/40 flex items-center justify-between gap-3 shrink-0">
            {step === "options" && (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="h-11 px-4 rounded-xl text-sm font-semibold hover:bg-muted"
                >
                  {locale === "ar" ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="button"
                  onClick={handleProceedToDetails}
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 shadow-md"
                >
                  {locale === "ar"
                    ? "متابعة بيانات المشتري"
                    : "Continue to Details"}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              </>
            )}

            {step === "details" && (
              <>
                <button
                  type="button"
                  onClick={() => setStep("options")}
                  className="h-11 px-4 rounded-xl text-sm font-semibold hover:bg-muted"
                >
                  {locale === "ar" ? "السابق" : "Back"}
                </button>
                <button
                  type="submit"
                  form="buyer-details-form"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 shadow-md"
                >
                  {locale === "ar" ? "متابعة للدفع" : "Proceed to Payment"}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              </>
            )}

            {step === "payment" && (
              <>
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  disabled={submitting}
                  className="h-11 px-4 rounded-xl text-sm font-semibold hover:bg-muted"
                >
                  {locale === "ar" ? "السابق" : "Back"}
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleCompleteOrder}
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 shadow-md disabled:opacity-50"
                >
                  {submitting ? (
                    locale === "ar" ? (
                      "جاري التأكيد..."
                    ) : (
                      "Processing..."
                    )
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      {locale === "ar"
                        ? `تأكيد ودفع ${formatPrice(currentDeposit)}`
                        : `Confirm & Pay ${formatPrice(currentDeposit)}`}
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
