import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Sun, Moon, Heart, GitCompare, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useFavorites } from "@/lib/favorites";
import { useCompareList, COMPARE_LIMIT } from "@/lib/compare";
import { cn } from "@/lib/utils";

export function PublicLayout({ children }: { children: ReactNode }) {
  const { t, locale, setLocale } = useLanguage();
  const { theme, toggle } = useTheme();
  const favs = useFavorites();
  const cmp = useCompareList();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [router.location.pathname]);

  const nav = [
    { to: "/", label: t("navHome") },
    { to: "/cars", label: t("navInventory") },
    { to: "/about", label: t("navAbout") },
    { to: "/contact", label: t("navContact") },
    { to: "/compare", label: t("navCompare") },
    { to: "/wishlist", label: t("navWishlist") },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className={cn("sticky top-0 z-40 transition-all", scrolled || open ? "glass shadow-card" : "bg-transparent")}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg shrink-0">
            <span className="inline-grid place-items-center h-9 w-9 rounded-lg bg-gradient-accent text-white">V</span>
            <span className="hidden sm:inline">Velocity<span className="text-accent">Motors</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 mx-auto">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary hover:text-foreground/90 text-foreground/80 transition" activeProps={{ className: "text-accent" }}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <Link to="/wishlist" className="relative h-10 w-10 grid place-items-center rounded-full hover:bg-secondary" aria-label={t("navWishlist")}>
              <Heart className="h-4 w-4" />
              {favs.length > 0 && <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 grid place-items-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold">{favs.length}</span>}
            </Link>
            <Link to="/compare" className="relative h-10 w-10 grid place-items-center rounded-full hover:bg-secondary" aria-label={t("navCompare")}>
              <GitCompare className="h-4 w-4" />
              {cmp.length > 0 && <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 grid place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">{cmp.length}/{COMPARE_LIMIT}</span>}
            </Link>

            <div className="relative">
              <button
                onClick={() => {
                  const order: typeof locale[] = ["en", "ar", "fr"];
                  setLocale(order[(order.indexOf(locale) + 1) % order.length]);
                }}
                className="h-10 px-2.5 rounded-full hover:bg-secondary text-sm font-semibold flex items-center gap-1"
                aria-label="Language"
                title="Language"
              >
                <Globe className="h-4 w-4" />
                <span className="uppercase">{locale}</span>
              </button>
            </div>

            <button onClick={toggle} className="h-10 w-10 grid place-items-center rounded-full hover:bg-secondary" aria-label={t("toggleDark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button onClick={() => setOpen(v => !v)} className="lg:hidden h-10 w-10 grid place-items-center rounded-full hover:bg-secondary" aria-label={open ? t("closeMenu") : t("openMenu")}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 py-3 grid gap-1">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} className="px-3 py-3 rounded-md text-sm font-medium hover:bg-secondary">
                  {n.label}
                </Link>
              ))}
              <Link to="/admin" className="px-3 py-3 rounded-md text-sm font-medium hover:bg-secondary text-muted-foreground">{t("navAdmin")}</Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 fade-in">{children}</main>

      <footer className="border-t border-border bg-card mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-lg">
              <span className="inline-grid place-items-center h-9 w-9 rounded-lg bg-gradient-accent text-white">V</span>
              <span>VelocityMotors</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{t("footerTagline")}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("navInventory")}</h4>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li><Link to="/cars" className="hover:text-accent">{t("navInventory")}</Link></li>
              <li><Link to="/about" className="hover:text-accent">{t("navAbout")}</Link></li>
              <li><Link to="/contact" className="hover:text-accent">{t("navContact")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("navHome")}</h4>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li><Link to="/wishlist" className="hover:text-accent">{t("navWishlist")}</Link></li>
              <li><Link to="/compare" className="hover:text-accent">{t("navCompare")}</Link></li>
              <li><Link to="/admin" className="hover:text-accent">{t("navAdmin")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("contactShowroom")}</h4>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>{t("contactPhoneVal")}</li>
              <li>{t("contactEmailVal")}</li>
              <li>{t("contactLocationVal")}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} VelocityMotors. {t("rightsReserved")}
          </div>
        </div>
      </footer>
    </div>
  );
}
