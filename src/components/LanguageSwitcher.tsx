import { Globe } from "lucide-react";
import { useLanguage, type Language } from "@/context/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "ar", label: "العربية", flag: "🇸🇦" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
  ];

  return (
    <div className="relative inline-flex items-center">
      <div className="flex items-center gap-1 bg-secondary/80 hover:bg-secondary border border-border/70 rounded-full p-1 shadow-sm">
        <Globe className="h-3.5 w-3.5 ml-1 mr-0.5 text-muted-foreground" />
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLanguage(l.code)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1 ${
              language === l.code
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <span>{l.flag}</span>
            <span>{l.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
