import { Link } from "@tanstack/react-router";
import { X, GitCompare } from "lucide-react";
import { useCompareList, clearCompare } from "@/lib/compare";
import { useLanguage } from "@/context/LanguageContext";
import { useDealership } from "@/context/DealershipContext";

export function CompareTray() {
  const { t } = useLanguage();
  const ids = useCompareList();
  const { cars } = useDealership();
  if (ids.length === 0) return null;

  const list = ids.map((id) => cars.find((c) => c.id === id)).filter(Boolean);

  return (
    <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 max-w-2xl mx-auto sm:mx-0 rounded-2xl bg-card/95 backdrop-blur shadow-elegant border border-border overflow-hidden fade-in">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <GitCompare className="h-4 w-4 text-accent" />
          <span className="font-semibold text-sm">{t("compareTrayTitle")} ({ids.length}/3)</span>
        </div>
        <button onClick={clearCompare} className="text-xs text-muted-foreground hover:text-foreground underline">{t("compareRemove")}</button>
      </div>
      <div className="px-3 py-3 flex items-center gap-3 overflow-x-auto no-scrollbar">
        {list.map((c) => (
          <div key={c!.id} className="flex items-center gap-2 shrink-0">
            <img src={c!.images[0]} alt="" className="h-12 w-16 rounded-md object-cover" />
            <div className="text-xs font-medium line-clamp-1 max-w-[10rem]">{c!.title}</div>
          </div>
        ))}
        <Link
          to="/compare"
          className="ml-auto inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-gradient-accent text-accent-foreground text-sm font-bold shrink-0"
        >
          {t("compareNow")}
        </Link>
      </div>
    </div>
  );
}
