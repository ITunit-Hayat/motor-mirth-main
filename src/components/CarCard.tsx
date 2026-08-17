import { Link } from "@tanstack/react-router";
import { Gauge, Calendar, ArrowRight } from "lucide-react";
import type { Car } from "@/data/initialCars";
import { formatMiles, formatPrice } from "@/context/DealershipContext";
import { useLanguage } from "@/context/LanguageContext";

export function CarCard({ car }: { car: Car }) {
  const { t } = useLanguage();
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border/60 hover:shadow-elegant transition-all duration-300">
      <div className="aspect-[16/10] overflow-hidden bg-muted relative">
        <img
          src={car.images[0]}
          alt={car.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-background/90 backdrop-blur">
          {car.category}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display font-bold text-lg leading-tight">{car.title}</h3>
          <div className="text-accent font-bold whitespace-nowrap">{formatPrice(car.price)}</div>
        </div>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{car.year}</span>
          <span className="flex items-center gap-1.5"><Gauge className="h-4 w-4" />{formatMiles(car.mileage)}</span>
        </div>
        <Link
          to="/cars/$id"
          params={{ id: car.id }}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors"
        >
          {t("viewDetails")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}
