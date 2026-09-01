import { Link } from "@tanstack/react-router";
import { Heart, GitCompare, Eye, Calendar, Gauge } from "lucide-react";
import { toast } from "sonner";
import type { Car } from "@/data/initialCars";
import { formatMiles, formatPrice } from "@/context/DealershipContext";
import { useLanguage } from "@/context/LanguageContext";
import { toggleFavorite, useFavorites } from "@/lib/favorites";
import { toggleCompare, useCompareList, COMPARE_LIMIT } from "@/lib/compare";
import { cn } from "@/lib/utils";

export function CarCard({ car }: { car: Car }) {
  const { t } = useLanguage();
  const favs = useFavorites();
  const cmp = useCompareList();
  const isFav = favs.includes(car.id);
  const isCmp = cmp.includes(car.id);
  const canCmp = cmp.length < COMPARE_LIMIT;

  const discounted = car.discount && car.discount > 0
    ? Math.round((car.price * (100 - car.discount)) / 100)
    : null;

  return (
    <article className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border/60 hover:shadow-elegant hover-zoom transition-all duration-300">
      <div className="aspect-[16/10] overflow-hidden bg-muted relative">
        <img
          src={car.images[0]}
          alt={car.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {car.featured && (
            <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-accent text-accent-foreground shadow-sm">
              ★ {t("featuredTitle").split(" ")[0]}
            </span>
          )}
          {discounted && (
            <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-destructive text-destructive-foreground shadow-sm">
              -{car.discount}%
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); const a = toggleFavorite(car.id); toast.success(a ? t("favSaved") : t("favRemovedMsg")); }}
            aria-label={isFav ? t("favRemove") : t("favAdd")}
            title={isFav ? t("favRemove") : t("favAdd")}
            className="h-9 w-9 grid place-items-center rounded-full bg-background/90 backdrop-blur shadow-card hover:scale-110 transition"
          >
            <Heart className={cn("h-4 w-4 transition", isFav ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault(); e.stopPropagation();
              if (!isCmp && !canCmp) { toast.error(t("compareEmpty")); return; }
              const a = toggleCompare(car.id);
              toast.success(a ? `+ ${t("compareAdd")}` : t("compareRemove"));
            }}
            aria-label={isCmp ? t("compareRemove") : t("compareAdd")}
            title={isCmp ? t("compareRemove") : t("compareAdd")}
            className="h-9 w-9 grid place-items-center rounded-full bg-background/90 backdrop-blur shadow-card hover:scale-110 transition"
          >
            <GitCompare className={cn("h-4 w-4 transition", isCmp ? "text-accent" : "text-muted-foreground")} />
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-accent">{car.category}</div>
            <h3 className="font-display font-bold text-lg leading-tight mt-0.5 truncate">{car.title}</h3>
          </div>
          <div className="text-right shrink-0">
            {discounted ? (
              <>
                <div className="text-xs line-through text-muted-foreground">{formatPrice(car.price)}</div>
                <div className="text-accent font-bold whitespace-nowrap">{formatPrice(discounted)}</div>
              </>
            ) : (
              <div className="text-accent font-bold whitespace-nowrap">{formatPrice(car.price)}</div>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{car.year}</span>
          <span className="flex items-center gap-1.5"><Gauge className="h-4 w-4" />{formatMiles(car.mileage)}</span>
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
            {car.transmission}
          </span>
        </div>

        <Link
          to="/cars/$id"
          params={{ id: car.id }}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors"
        >
          <Eye className="h-4 w-4" /> {t("viewDetails")}
        </Link>
      </div>
    </article>
  );
}
