import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { CompareTray } from "@/components/CompareTray";
import { CarCard } from "@/components/CarCard";
import { useDealership } from "@/context/DealershipContext";
import { useLanguage } from "@/context/LanguageContext";
import { useFavorites } from "@/lib/favorites";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — VelocityMotors" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { t } = useLanguage();
  const { cars } = useDealership();
  const favs = useFavorites();
  const list = favs.map((id) => cars.find((c) => c.id === id)).filter(Boolean);

  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
        <div className="flex items-center gap-3">
          <Heart className="h-8 w-8 text-red-500 fill-red-500" />
          <h1 className="text-3xl sm:text-4xl font-bold">{t("navWishlist")}</h1>
          <span className="ml-2 px-2.5 py-0.5 rounded-full bg-secondary text-sm font-semibold">{list.length}</span>
        </div>

        {list.length === 0 ? (
          <div className="mt-12 text-center py-20 bg-card rounded-2xl border border-border">
            <Heart className="h-10 w-10 mx-auto text-muted-foreground" />
            <p className="mt-5 text-muted-foreground">{t("favsOnly")}.</p>
            <Link to="/cars" className="mt-5 inline-block text-sm font-semibold text-primary hover:text-accent">{t("btnBrowse")} →</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c) => (<CarCard key={c!.id} car={c!} />))}
          </div>
        )}
      </section>
      <CompareTray />
    </PublicLayout>
  );
}
