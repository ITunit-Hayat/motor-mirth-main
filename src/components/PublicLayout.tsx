import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Heart,
  GitCompare,
  Globe,
  ChevronDown,
  User,
  LogIn,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useUserAuth } from "@/context/UserAuthContext";
import { useFavorites } from "@/lib/favorites";
import { useCompareList, COMPARE_LIMIT } from "@/lib/compare";
import { trackPageView } from "@/lib/analytics";
import { useSiteSettings } from "@/lib/settings";
import { cn } from "@/lib/utils";

export function PublicLayout({ children }: { children: ReactNode }) {
  const { t, locale, setLocale } = useLanguage();
  const { theme, toggle } = useTheme();
  const favs = useFavorites();
  const cmp = useCompareList();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouterState();
  const site = useSiteSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    trackPageView(router.location.pathname);
  }, [router.location.pathname]);

  const nav = [
    { to: "/", label: t("navHome") },
    { to: "/cars", label: t("navInventory") },
    { to: "/post-car", label: "انشر إعلانك" },
    { to: "/sell", label: t("navSellCar") },
    { to: "/about", label: t("navAbout") },
    { to: "/contact", label: t("navContact") },
    { to: "/compare", label: t("navCompare") },
    { to: "/wishlist", label: t("navWishlist") },
    { to: "/admin", label: t("navAdmin") },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header
        className={cn(
          "sticky top-0 z-40 transition-all",
          scrolled || open ? "glass shadow-card" : "bg-transparent",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-display font-bold text-lg shrink-0 group"
          >
            <img
              src="/mzab-logo.jpg"
              alt="M'ZAB MOTORS Logo"
              className="h-10 w-10 rounded-full object-cover border border-accent/40 shadow-sm group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <span className="inline">
              MZAB <span className="text-accent">MOTORS</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 mx-auto">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary hover:text-foreground/90 text-foreground/80 transition"
                activeProps={{ className: "text-accent" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <AccountButton />
            <Link
              to="/wishlist"
              className="relative h-10 w-10 grid place-items-center rounded-full hover:bg-secondary"
              aria-label={t("navWishlist")}
            >
              <Heart className="h-4 w-4" />
              {favs.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 grid place-items-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold">
                  {favs.length}
                </span>
              )}
            </Link>
            <Link
              to="/compare"
              className="relative h-10 w-10 grid place-items-center rounded-full hover:bg-secondary"
              aria-label={t("navCompare")}
            >
              <GitCompare className="h-4 w-4" />
              {cmp.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 grid place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                  {cmp.length}/{COMPARE_LIMIT}
                </span>
              )}
            </Link>

            <div className="relative">
              <button
                onClick={() => {
                  const order: (typeof locale)[] = ["en", "ar", "fr"];
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

            <button
              onClick={toggle}
              className="h-10 w-10 grid place-items-center rounded-full hover:bg-secondary"
              aria-label={t("toggleDark")}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden h-10 w-10 grid place-items-center rounded-full hover:bg-secondary"
              aria-label={open ? t("closeMenu") : t("openMenu")}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 py-3 grid gap-1">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="px-3 py-3 rounded-md text-sm font-medium hover:bg-secondary"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 fade-in">{children}</main>

      <footer className="border-t border-border bg-card mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 font-display font-bold text-lg">
              <img
                src="/mzab-logo.jpg"
                alt="MZAB MOTORS Logo"
                className="h-9 w-9 rounded-full object-cover border border-accent/40 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <span>MZAB <span className="text-accent">MOTORS</span></span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("footerTagline")}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("navInventory")}
            </h4>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <Link to="/cars" className="hover:text-accent">
                  {t("navInventory")}
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-accent">
                  {t("navSellCar")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent">
                  {t("navAbout")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent">
                  {t("navContact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("navHome")}
            </h4>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <Link to="/wishlist" className="hover:text-accent">
                  {t("navWishlist")}
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-accent">
                  {t("navCompare")}
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="hover:text-accent font-semibold text-accent"
                >
                  {t("navAdmin")} / لوحة الإدارة
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("contactShowroom")}
            </h4>
            <ul className="mt-3 space-y-1.5 text-sm" suppressHydrationWarning>
              <li suppressHydrationWarning>{site.phone}</li>
              <li suppressHydrationWarning>{site.email}</li>
              <li suppressHydrationWarning>{site.address}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} MZAB MOTORS. {t("rightsReserved")}
          </div>
        </div>
      </footer>
    </div>
  );
}

function AccountButton() {
  const { isLoggedIn, profile, signOut } = useUserAuth();
  const [open, setOpen] = useState(false);

  if (!isLoggedIn) {
    return (
      <Link
        to="/login"
        className="h-10 px-3 rounded-full hover:bg-secondary text-sm font-semibold flex items-center gap-1.5"
      >
        <LogIn className="h-4 w-4" />{" "}
        <span className="hidden sm:inline">دخول</span>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-10 px-3 rounded-full hover:bg-secondary text-sm font-semibold flex items-center gap-1.5"
      >
        <User className="h-4 w-4" />{" "}
        <span className="hidden sm:inline max-w-[100px] truncate">
          {profile?.fullName || "حسابي"}
        </span>
      </button>
      {open && (
        <div className="absolute end-0 mt-1 w-48 bg-card border border-border rounded-xl shadow-elegant py-1.5 z-50">
          <Link
            to="/my-listings"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-secondary"
          >
            إعلاناتي
          </Link>
          <Link
            to="/post-car"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-secondary"
          >
            انشر إعلان جديد
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              void signOut();
            }}
            className="block w-full text-start px-4 py-2 text-sm text-destructive hover:bg-destructive/10"
          >
            تسجيل الخروج
          </button>
        </div>
      )}
    </div>
  );
}
