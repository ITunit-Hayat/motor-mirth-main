import { useMemo, useState } from "react";

/** Common dial codes, Gulf/Arab countries first since that's this shop's main audience. */
const COUNTRIES: { code: string; dial: string; flag: string; name: string }[] =
  [
    { code: "SA", dial: "966", flag: "🇸🇦", name: "السعودية" },
    { code: "AE", dial: "971", flag: "🇦🇪", name: "الإمارات" },
    { code: "KW", dial: "965", flag: "🇰🇼", name: "الكويت" },
    { code: "QA", dial: "974", flag: "🇶🇦", name: "قطر" },
    { code: "BH", dial: "973", flag: "🇧🇭", name: "البحرين" },
    { code: "OM", dial: "968", flag: "🇴🇲", name: "عُمان" },
    { code: "EG", dial: "20", flag: "🇪🇬", name: "مصر" },
    { code: "JO", dial: "962", flag: "🇯🇴", name: "الأردن" },
    { code: "IQ", dial: "964", flag: "🇮🇶", name: "العراق" },
    { code: "LB", dial: "961", flag: "🇱🇧", name: "لبنان" },
    { code: "SY", dial: "963", flag: "🇸🇾", name: "سوريا" },
    { code: "YE", dial: "967", flag: "🇾🇪", name: "اليمن" },
    { code: "MA", dial: "212", flag: "🇲🇦", name: "المغرب" },
    { code: "DZ", dial: "213", flag: "🇩🇿", name: "الجزائر" },
    { code: "TN", dial: "216", flag: "🇹🇳", name: "تونس" },
    { code: "LY", dial: "218", flag: "🇱🇾", name: "ليبيا" },
    { code: "SD", dial: "249", flag: "🇸🇩", name: "السودان" },
    { code: "PS", dial: "970", flag: "🇵🇸", name: "فلسطين" },
    { code: "US", dial: "1", flag: "🇺🇸", name: "أمريكا" },
    { code: "GB", dial: "44", flag: "🇬🇧", name: "بريطانيا" },
    { code: "CA", dial: "1", flag: "🇨🇦", name: "كندا" },
    { code: "FR", dial: "33", flag: "🇫🇷", name: "فرنسا" },
    { code: "DE", dial: "49", flag: "🇩🇪", name: "ألمانيا" },
    { code: "TR", dial: "90", flag: "🇹🇷", name: "تركيا" },
    { code: "IN", dial: "91", flag: "🇮🇳", name: "الهند" },
    { code: "PK", dial: "92", flag: "🇵🇰", name: "باكستان" },
    { code: "PH", dial: "63", flag: "🇵🇭", name: "الفلبين" },
  ];

const DEFAULT_DIAL = "966";

/** Splits a stored "+<dial><local>" value into its dial-code and local parts. */
function splitValue(value: string): { dial: string; local: string } {
  const digits = value.replace(/\D/g, "");
  if (!digits) return { dial: DEFAULT_DIAL, local: "" };
  const sortedByLength = [...COUNTRIES].sort(
    (a, b) => b.dial.length - a.dial.length,
  );
  const match = sortedByLength.find((c) => digits.startsWith(c.dial));
  if (match)
    return { dial: match.dial, local: digits.slice(match.dial.length) };
  return { dial: DEFAULT_DIAL, local: digits };
}

type PhoneInputProps = {
  /** Controlled mode: current full value as "+<dial><local>" digits. */
  value?: string;
  onChange?: (fullPhone: string) => void;
  /** Uncontrolled mode: renders a hidden input with this name for FormData-based forms. */
  name?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
};

/**
 * Phone number field with a country dial-code selector. Outputs (and accepts)
 * a canonical "+<countrycode><localnumber>" digit string — e.g. "+966501234567" —
 * so every consumer (tel: links, wa.me links, stored orders) gets a correctly
 * internationalized number instead of whatever format the visitor happened to type.
 */
export function PhoneInput({
  value,
  onChange,
  name,
  defaultValue,
  required,
  placeholder,
  className,
}: PhoneInputProps) {
  const isControlled = value !== undefined;
  const initial = useMemo(() => splitValue(value ?? defaultValue ?? ""), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [uncontrolledDial, setUncontrolledDial] = useState(initial.dial);
  const [uncontrolledLocal, setUncontrolledLocal] = useState(initial.local);

  const { dial, local } = isControlled
    ? splitValue(value ?? "")
    : { dial: uncontrolledDial, local: uncontrolledLocal };

  const emit = (nextDial: string, nextLocal: string) => {
    const cleanLocal = nextLocal.replace(/\D/g, "");
    if (isControlled) {
      onChange?.(`+${nextDial}${cleanLocal}`);
    } else {
      setUncontrolledDial(nextDial);
      setUncontrolledLocal(cleanLocal);
    }
  };

  const fullValue = `+${dial}${local}`;
  const inputCls =
    className ??
    "flex-1 h-11 px-3.5 rounded-xl bg-background border border-input text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent";

  return (
    <div className="flex gap-2" dir="ltr">
      <select
        value={dial}
        onChange={(e) => emit(e.target.value, local)}
        aria-label="رمز الدولة"
        className="w-[104px] h-11 px-2 rounded-xl bg-background border border-input text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
      >
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.dial}>
            {c.flag} +{c.dial}
          </option>
        ))}
      </select>
      <input
        type="tel"
        inputMode="numeric"
        value={local}
        onChange={(e) => emit(dial, e.target.value)}
        required={required}
        placeholder={placeholder ?? "5xxxxxxxx"}
        className={inputCls}
      />
      {name && <input type="hidden" name={name} value={fullValue} readOnly />}
    </div>
  );
}
