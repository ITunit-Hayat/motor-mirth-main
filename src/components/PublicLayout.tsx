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
  User,
  LogIn,
  LogOut,
  Home,
  Car,
  Tag,
  Building2,
  PhoneCall,
  PlusCircle,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  FileText,
  MapPin,
  Phone,
  Lock,
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
  const { t, locale, setLocale, dir } = useLanguage();
  const { theme, toggle } = useTheme();
  const { isLoggedIn, profile, email: userEmail, signOut } = useUserAuth();
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

  // Close menu and track page view on navigation
  useEffect(() => {
    setOpen(false);
    trackPageView(router.location.pathname);
  }, [router.location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  // Close drawer on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const nav = [
    { to: "/", label: t("navHome") },
    { to: "/cars", label: t("navInventory") },
    { to: "/post-car", label: t("navPostCar") },
    { to: "/sell", label: t("navSellCar") },
    { to: "/about", label: t("navAbout") },
    { to: "/contact", label: t("navContact") },
    { to: "/compare", label: t("navCompare") },
    { to: "/wishlist", label: t("navWishlist") },
  ];

  const mobileNavLinks = [
    { to: "/", label: t("navHome"), Icon: Home },
    { to: "/cars", label: t("navInventory"), Icon: Car },
    { to: "/sell", label: t("navSellCar"), Icon: Tag },
    {
      to: "/wishlist",
      label: t("navWishlist"),
      Icon: Heart,
      badge: favs.length > 0 ? favs.length : undefined,
    },
    {
      to: "/compare",
      label: t("navCompare"),
      Icon: GitCompare,
      badge: cmp.length > 0 ? `${cmp.length}/${COMPARE_LIMIT}` : undefined,
    },
    { to: "/about", label: t("navAbout"), Icon: Building2 },
    { to: "/contact", label: t("navContact"), Icon: PhoneCall },
  ];

  const Arrow = dir === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Header */}
      <header
        className={cn(
          "sticky top-0 z-40 transition-all",
          scrolled || open ? "glass shadow-card border-b border-border/60" : "bg-transparent",
        )}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
          {/* Logo & Brand Name */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display font-bold text-base sm:text-lg shrink-0 group"
          >
            <img
              src="/mzab-logo.jpg"
              alt="M'ZAB MOTORS Logo"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover border border-accent/40 shadow-sm group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <span className="inline">
              MZAB <span className="text-accent">MOTORS</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 mx-auto">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary hover:text-foreground/90 text-foreground/80 transition"
                activeProps={{ className: "text-accent font-semibold" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Controls */}
          <div className="hidden lg:flex items-center gap-1.5 ml-auto">
            <AccountButton />
            <Link
              to="/wishlist"
              className="relative h-10 w-10 grid place-items-center rounded-full hover:bg-secondary transition-colors"
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
              className="relative h-10 w-10 grid place-items-center rounded-full hover:bg-secondary transition-colors"
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
                className="h-10 px-2.5 rounded-full hover:bg-secondary text-sm font-semibold flex items-center gap-1 transition-colors"
                aria-label="Language"
                title="Language"
              >
                <Globe className="h-4 w-4" />
                <span className="uppercase">{locale}</span>
              </button>
            </div>

            <button
              onClick={toggle}
              className="h-10 w-10 grid place-items-center rounded-full hover:bg-secondary transition-colors"
              aria-label={t("toggleDark")}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Mobile Right Controls: Wishlist Quick Icon + Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-1">
            <Link
              to="/wishlist"
              className="relative h-10 w-10 grid place-items-center rounded-full hover:bg-secondary text-foreground transition-colors"
              aria-label={t("navWishlist")}
            >
              <Heart className="h-5 w-5" />
              {favs.length > 0 && (
                <span className="absolute top-1 -end-0.5 h-4 min-w-4 px-1 grid place-items-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold">
                  {favs.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "h-10 w-10 grid place-items-center rounded-xl transition-all border",
                open
                  ? "bg-accent text-accent-foreground border-accent shadow-sm"
                  : "bg-secondary/80 hover:bg-secondary border-border/80 text-foreground"
              )}
              aria-label={open ? t("closeMenu") : t("openMenu")}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Off-Canvas Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t("menuTitle")}
        className={cn(
          "fixed top-0 bottom-0 z-50 w-[86vw] max-w-sm bg-card border-border shadow-2xl flex flex-col backdrop-blur-xl transition-transform duration-300 ease-out lg:hidden",
          dir === "rtl" ? "right-0 border-l" : "left-0 border-r",
          open
            ? "translate-x-0"
            : dir === "rtl"
            ? "translate-x-full"
            : "-translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 font-display font-bold text-base"
          >
            <img
              src="/mzab-logo.jpg"
              alt="MZAB MOTORS Logo"
              className="h-9 w-9 rounded-full object-cover border border-accent/40 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="leading-tight">
                MZAB <span className="text-accent">MOTORS</span>
              </div>
              <div className="text-[10px] text-muted-foreground font-normal">
                {locale === "ar" ? "غرداية - وادي مزاب" : "Ghardaïa - Algérie"}
              </div>
            </div>
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="h-9 w-9 grid place-items-center rounded-xl bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
            aria-label={t("closeMenu")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm no-scrollbar">
          {/* User Account Card */}
          {isLoggedIn ? (
            <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent/20 border border-accent/30 text-accent font-bold grid place-items-center text-sm">
                  {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm truncate">{profile?.fullName || t("myAccount")}</div>
                  <div className="text-xs text-muted-foreground truncate" dir="ltr">{userEmail || ""}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                <Link
                  to="/account"
                  onClick={() => setOpen(false)}
                  className="px-2 py-2 rounded-xl bg-background text-xs font-medium text-center border border-border/80 hover:border-accent hover:text-accent transition flex flex-col items-center justify-center gap-1"
                >
                  <User className="h-4 w-4 text-accent" />
                  <span>معلومات الحساب</span>
                </Link>
                <Link
                  to="/my-listings"
                  onClick={() => setOpen(false)}
                  className="px-2 py-2 rounded-xl bg-background text-xs font-medium text-center border border-border/80 hover:border-accent hover:text-accent transition flex flex-col items-center justify-center gap-1"
                >
                  <FileText className="h-4 w-4 text-accent" />
                  <span>{t("myListings")}</span>
                </Link>
                <button
                  onClick={async () => {
                    setOpen(false);
                    await signOut();
                  }}
                  className="px-2 py-2 rounded-xl bg-destructive/10 text-destructive text-xs font-medium text-center hover:bg-destructive/20 transition flex flex-col items-center justify-center gap-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t("logout")}</span>
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-accent/15 via-accent/10 to-transparent border border-accent/30 flex items-center justify-between hover:bg-accent/20 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-accent text-accent-foreground grid place-items-center shadow-sm">
                  <LogIn className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">{t("loginOrRegister")}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {locale === "ar" ? "لإدارة ونشر إعلانات السيارات" : "Gérer vos annonces de véhicules"}
                  </div>
                </div>
              </div>
              <Arrow className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-transform" />
            </Link>
          )}

          {/* Quick CTA: Post Your Car */}
          <Link
            to="/post-car"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-accent text-accent-foreground font-bold text-sm shadow-md hover:bg-accent/90 active:scale-[0.98] transition"
          >
            <PlusCircle className="h-4 w-4" />
            <span>{t("navPostCar")}</span>
          </Link>

          {/* Navigation Links with Icons */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-1">
              {t("menuTitle")}
            </div>
            {mobileNavLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-secondary/70 transition"
                activeProps={{ className: "bg-accent/15 text-accent font-semibold" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                <div className="flex items-center gap-3">
                  <item.Icon className="h-4 w-4 text-muted-foreground" />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-accent text-accent-foreground">
                    {item.badge}
                  </span>
                ) : (
                  <Arrow className="h-3.5 w-3.5 text-muted-foreground/50" />
                )}
              </Link>
            ))}
          </div>

          {/* Preferences: Language & Theme */}
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2">
              {t("preferences")}
            </div>

            {/* Language Segmented Switcher */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-secondary/60 rounded-xl border border-border/60">
              {[
                { code: "ar", label: "العربية" },
                { code: "fr", label: "Français" },
                { code: "en", label: "English" },
              ].map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLocale(lang.code as "ar" | "fr" | "en")}
                  className={cn(
                    "py-1.5 text-xs font-semibold rounded-lg transition-all",
                    locale === lang.code
                      ? "bg-card text-foreground shadow-sm font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-secondary/60 rounded-xl border border-border/60">
              <button
                type="button"
                onClick={() => theme === "dark" && toggle()}
                className={cn(
                  "py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all",
                  theme === "light"
                    ? "bg-card text-foreground shadow-sm font-bold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Sun className="h-3.5 w-3.5 text-amber-500" />
                <span>{t("themeLight")}</span>
              </button>
              <button
                type="button"
                onClick={() => theme === "light" && toggle()}
                className={cn(
                  "py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all",
                  theme === "dark"
                    ? "bg-card text-foreground shadow-sm font-bold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Moon className="h-3.5 w-3.5 text-blue-400" />
                <span>{t("themeDark")}</span>
              </button>
            </div>
          </div>

          {/* Quick Showroom Contacts */}
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2">
              {t("showroomInfo")}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${site.phone}`}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-secondary/80 hover:bg-secondary text-foreground text-xs font-semibold border border-border transition active:scale-[0.98]"
              >
                <Phone className="h-3.5 w-3.5 text-accent" />
                <span>{t("directCall")}</span>
              </a>
              <a
                href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
                  "مرحباً مزاب موتورز، أود الاستفسار عن سيارة معروضة."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/30 transition active:scale-[0.98]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>{t("whatsappChat")}</span>
              </a>
            </div>
            <div className="text-[11px] text-muted-foreground px-1 flex items-center gap-1.5">
              <MapPin className="h-3 w-3 shrink-0 text-accent" />
              <span className="truncate" suppressHydrationWarning>{site.address}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content with bottom padding on mobile to accommodate bottom dock */}
      <main className="flex-1 fade-in pb-20 lg:pb-0">{children}</main>

      {/* Mobile Sticky Bottom Navigation Dock */}
      <nav
        aria-label="التنقل السفلي للهاتف"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur-md border-t border-border/80 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] pt-1.5"
      >
        <div className="grid grid-cols-5 max-w-md mx-auto items-center px-1">
          {/* Home Tab */}
          <Link
            to="/"
            className="flex flex-col items-center justify-center py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ className: "text-accent font-bold" }}
            activeOptions={{ exact: true }}
          >
            <Home className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] truncate max-w-[64px]">{t("navHome")}</span>
          </Link>

          {/* Inventory Tab */}
          <Link
            to="/cars"
            className="flex flex-col items-center justify-center py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ className: "text-accent font-bold" }}
          >
            <Car className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] truncate max-w-[64px]">{t("navInventory")}</span>
          </Link>

          {/* Center Elevated Post Car Tab */}
          <Link
            to="/post-car"
            className="flex flex-col items-center justify-center py-0 -mt-3 group"
          >
            <div className="h-11 w-11 rounded-full bg-accent text-accent-foreground grid place-items-center shadow-lg border-2 border-background group-hover:scale-105 active:scale-95 transition-transform">
              <PlusCircle className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-bold text-accent mt-0.5 truncate max-w-[64px]">
              {t("navPostCar")}
            </span>
          </Link>

          {/* Wishlist Tab */}
          <Link
            to="/wishlist"
            className="relative flex flex-col items-center justify-center py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ className: "text-accent font-bold" }}
          >
            <Heart className="h-5 w-5 mb-0.5" />
            {favs.length > 0 && (
              <span className="absolute top-0.5 end-3 h-4 min-w-4 px-1 grid place-items-center rounded-full bg-accent text-accent-foreground text-[9px] font-bold">
                {favs.length}
              </span>
            )}
            <span className="text-[10px] truncate max-w-[64px]">{t("navWishlist")}</span>
          </Link>

          {/* Menu Toggle Tab */}
          <button
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "flex flex-col items-center justify-center py-1 text-xs transition-colors",
              open ? "text-accent font-bold" : "text-muted-foreground hover:text-foreground"
            )}
            aria-label={t("menuTitle")}
          >
            <Menu className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] truncate max-w-[64px]">{t("openMenu")}</span>
          </button>
        </div>
      </nav>

      {/* Desktop & Mobile Footer */}
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
  const { isLoggedIn, profile, email: userEmail, signOut } = useUserAuth();
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
        <div className="absolute end-0 mt-2 w-52 bg-card border border-border rounded-2xl shadow-elegant py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-2 border-b border-border/70 mb-1">
            <div className="text-xs font-bold text-foreground truncate">
              {profile?.fullName || "حسابي"}
            </div>
            <div className="text-[11px] text-muted-foreground truncate" dir="ltr">
              {userEmail || ""}
            </div>
          </div>
          <Link
            to="/account"
            search={{ tab: "profile" }}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-secondary transition-colors"
          >
            <User className="h-3.5 w-3.5 text-accent" />
            معلومات الحساب
          </Link>
          <Link
            to="/account"
            search={{ tab: "security" }}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-secondary transition-colors"
          >
            <Lock className="h-3.5 w-3.5 text-accent" />
            الأمان وتغيير كلمة السر
          </Link>
          <Link
            to="/my-listings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-secondary transition-colors"
          >
            <FileText className="h-3.5 w-3.5 text-accent" />
            إعلاناتي المعروضة
          </Link>
          <Link
            to="/post-car"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-secondary transition-colors"
          >
            <PlusCircle className="h-3.5 w-3.5 text-accent" />
            انشر إعلان جديد
          </Link>
          <div className="my-1 border-t border-border/70" />
          <button
            onClick={() => {
              setOpen(false);
              void signOut();
            }}
            className="flex items-center gap-2 w-full text-start px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            تسجيل الخروج
          </button>
        </div>
      )}
    </div>
  );
}
