import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Language = "ar" | "fr" | "en";

export const translations = {
  // Navigation & General
  navHome: { ar: "الرئيسية", fr: "Accueil", en: "Home" },
  navInventory: { ar: "السيارات", fr: "Véhicules", en: "Inventory" },
  navAbout: { ar: "من نحن", fr: "À propos", en: "About" },
  navContact: { ar: "اتصل بنا", fr: "Contact", en: "Contact" },
  siteTitle: { ar: "فيلوسيتي موتورز", fr: "VelocityMotors", en: "VelocityMotors" },
  copyright: { ar: "جميع الحقوق محفوظة.", fr: "Tous droits réservés.", en: "All rights reserved." },

  // Home Page
  heroBadge: { ar: "وصل حديثاً · 2024", fr: "Nouveautés · 2024", en: "New Arrivals · 2024" },
  heroTitle1: { ar: "قد سيارة", fr: "Conduisez la voiture de", en: "Drive the car you've been" },
  heroTitle2: { ar: "أحلامك اليوم.", fr: "vos rêves.", en: "dreaming of." },
  heroDesc: {
    ar: "تشكيلة مميزة ومختارة من أحدث السيارات الفاخرة والمستعملة بحالة الوكالة. أسعار شفافة وحجز فوري.",
    fr: "Une sélection de véhicules haut de gamme neufs et d'occasion. Prix transparents, réservations instantanées.",
    en: "A curated selection of premium new and pre-owned vehicles. Transparent pricing. Instant reservations."
  },
  btnBrowse: { ar: "تصفح السيارات", fr: "Voir les voitures", en: "Browse Cars" },
  btnTalkSpecialist: { ar: "تحدث مع خبير", fr: "Parler à un expert", en: "Talk to a specialist" },
  statCars: { ar: "سيارة متوفرة", fr: "Voitures en stock", en: "Cars in stock" },
  statDrivers: { ar: "عميل سعيد", fr: "Clients satisfaits", en: "Happy drivers" },
  statRating: { ar: "تقييم عام", fr: "Note moyenne", en: "Avg. rating" },
  featuredTitle: { ar: "السيارات المميزة", fr: "Véhicules en vedette", en: "Featured Inventory" },
  featuredSubtitle: { ar: "أفضل وأحدث العروض من صالة العرض الخاصة بنا.", fr: "Sélection de nos meilleurs véhicules.", en: "Hand-picked highlights from our showroom floor." },
  seeAllCars: { ar: "عرض كل السيارات", fr: "Voir toutes les voitures", en: "See all cars" },

  // Why Us
  whyChooseUs: { ar: "لماذا تختار فيلوسيتي موتورز", fr: "Pourquoi nous choisir", en: "Why choose VelocityMotors" },
  whySubtitle: { ar: "شراء سيارتك تجربة ممتعة وسهلة معنا.", fr: "L'achat d'un véhicule doit être simple et agréable.", en: "Buying a car should feel exciting, not exhausting." },
  featInspectTitle: { ar: "فحص شامل معتمد", fr: "Inspection certifiée", en: "Certified Inspected" },
  featInspectDesc: { ar: "كل سيارة تخضع لفحص دقيق يشمل 150 نقطة قبل عرضها.", fr: "Chaque véhicule subit une inspection rigoureuse en 150 points.", en: "Every vehicle passes a rigorous 150-point inspection." },
  featPriceTitle: { ar: "أسعار شفافة", fr: "Prix transparents", en: "Transparent Pricing" },
  featPriceDesc: { ar: "لا توجد رسوم خفية. ما تراه هو ما تدفعه بالضبط.", fr: "Aucun frais caché. Ce que vous voyez est ce que vous payez.", en: "No hidden fees. What you see is what you pay." },
  featSupportTitle: { ar: "دعم مستمر", fr: "Support continu", en: "Lifetime Support" },
  featSupportDesc: { ar: "صيانة مجانية للسنة الأولى ومساعدة على الطريق 24/7.", fr: "Entretien gratuit la première année et assistance 24/7.", en: "Complimentary maintenance for the first year, plus 24/7 roadside assistance." },
  featTrustTitle: { ar: "ثقة أكثر من 10,000 عميل", fr: "Plus de 10k clients", en: "Trusted by 10k+" },
  featTrustDesc: { ar: "آلاف السائقين يثقون بنا يومياً لخدماتنا المتميزة.", fr: "Des milliers de conducteurs nous font confiance.", en: "Ten thousand happy drivers and counting." },

  // Cars Listing
  allVehicles: { ar: "معرض السيارات المتاحة", fr: "Tous les véhicules", en: "All Vehicles" },
  filterAll: { ar: "الكل", fr: "Tous", en: "All" },
  filterMake: { ar: "الماركة", fr: "Marque", en: "Make" },
  filterCategory: { ar: "الفئة", fr: "Catégorie", en: "Category" },
  filterMaxPrice: { ar: "أقصى سعر", fr: "Prix max", en: "Max Price" },
  viewDetails: { ar: "عرض التفاصيل", fr: "Voir détails", en: "View Details" },
  noCarsFound: { ar: "لم يتم العثور على سيارات تطابق بحثك.", fr: "Aucun véhicule ne correspond à vos critères.", en: "No vehicles match your criteria." },

  // Car Details & Specs
  backToInventory: { ar: "العودة للمعرض", fr: "Retour à l'inventaire", en: "Back to inventory" },
  specYear: { ar: "سنة الصنع", fr: "Année", en: "Year" },
  specMileage: { ar: "الممشى", fr: "Kilométrage", en: "Mileage" },
  specEngine: { ar: "المحرك", fr: "Moteur", en: "Engine" },
  specTransmission: { ar: "ناقل الحركة", fr: "Transmission", en: "Transmission" },
  specCondition: { ar: "الحالة", fr: "État", en: "Condition" },
  specCategory: { ar: "الفئة", fr: "Catégorie", en: "Category" },
  description: { ar: "الوصف والمواصفات", fr: "Description", en: "Description" },

  // Inquiry Form
  inquiryTitle: { ar: "هل أنت مهتم؟ احجز موعداً أو اطلبها الآن", fr: "Intéressé ? Réservez un essai", en: "Interested? Reserve a viewing." },
  inquirySubtitle: { ar: "سيتواصل معك خبيرنا خلال يوم عمل واحد.", fr: "Un conseiller vous contactera dans les 24h.", en: "A specialist will reach out within 1 business day." },
  fullName: { ar: "الاسم الكامل", fr: "Nom complet", en: "Full Name" },
  phoneNumber: { ar: "رقم الهاتف", fr: "Numéro de téléphone", en: "Phone Number" },
  emailAddress: { ar: "البريد الإلكتروني", fr: "Adresse e-mail", en: "Email" },
  city: { ar: "المدينة", fr: "Ville", en: "City" },
  notes: { ar: "ملاحظات إضافية", fr: "Notes additionnelles", en: "Additional Notes" },
  notesPlaceholder: { ar: "هل ترغب في استبدال؟ تمويل؟ وقت مناسب للاتصال؟", fr: "Reprise ? Financement ? Heure préférée ?", en: "Trade-in? Financing? Preferred time?" },
  btnSubmitInquiry: { ar: "إرسال الطلب", fr: "Envoyer la demande", en: "Submit Inquiry" },
  inquirySuccessTitle: { ar: "شكراً لك — تم استلام طلبك بنجاح!", fr: "Merci — demande reçue !", en: "Thanks — we got your request!" },
  inquirySuccessMsg: { ar: "سنتواصل معك قريباً بخصوص هذه السيارة.", fr: "Nous vous contacterons très bientôt.", en: "We'll be in touch shortly." },
  btnSendAnother: { ar: "إرسال طلب آخر", fr: "Envoyer une autre demande", en: "Send another inquiry" },

  // Admin & Security
  adminGateTitle: { ar: "بوابة أمان لوحة الإدارة", fr: "Portail de sécurité Admin", en: "Owner Security Gate" },
  adminGateDesc: { ar: "هذه المنطقة مخصصة لمدير المعرض فقط.", fr: "Cet espace est réservé à l'administrateur.", en: "This area is restricted to showroom administrators only." },
  enterPasscode: { ar: "أدخل رمز المرور السري", fr: "Entrez le mot de passe maître", en: "Enter Master Passcode" },
  unlockDashboard: { ar: "فتح لوحة التحكم", fr: "Déverrouiller le panneau", en: "Unlock Dashboard" },
  returnToPublic: { ar: "← العودة إلى الموقع الرئيسي", fr: "← Retour au site public", en: "← Return to public website" },
  incorrectPasscode: { ar: "رمز المرور غير صحيح. تم رفض الوصول.", fr: "Mot de passe incorrect. Accès refusé.", en: "Incorrect Passcode. Access denied." },
  lockSignOut: { ar: "قفل وتسجيل الخروج", fr: "Verrouiller et déconnecter", en: "Lock & Sign Out" },
  adminOverview: { ar: "نظرة عامة", fr: "Vue d'ensemble", en: "Overview" },
  adminInventory: { ar: "إدارة السيارات", fr: "Gestion des véhicules", en: "Inventory" },
  adminOrders: { ar: "طلبات الزبائن", fr: "Commandes clients", en: "Orders" },
  addNewCar: { ar: "إضافة سيارة جديدة", fr: "Ajouter un véhicule", en: "Add New Car" },
  editCar: { ar: "تعديل", fr: "Modifier", en: "Edit" },
  deleteCar: { ar: "حذف", fr: "Supprimer", en: "Delete" },
  orderStatus: { ar: "حالة الطلب", fr: "Statut", en: "Status" },
  statusNew: { ar: "جديد", fr: "Nouveau", en: "New" },
  statusContacted: { ar: "تم التواصل", fr: "Contacté", en: "Contacted" },
  statusClosed: { ar: "مكتمل / مباع", fr: "Clôturé", en: "Closed" },
} as const;

export type TranslationKey = keyof typeof translations;

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  dir: "rtl" | "ltr";
};

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "velocity_lang_preference";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language;
    if (saved && (saved === "ar" || saved === "fr" || saved === "en")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: TranslationKey): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry["en"] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
