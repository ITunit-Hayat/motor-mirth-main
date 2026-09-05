import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "en" | "ar" | "fr";
export type Language = Locale;
export type Dict = Record<string, { en: string; ar: string; fr: string }>;

const D: Dict = {
  brand: { en: "MZAB MOTORS", ar: "مزاب موتورز", fr: "MZAB MOTORS" },
  navHome: { en: "Home", ar: "الرئيسية", fr: "Accueil" },
  navInventory: { en: "Inventory", ar: "المعرض", fr: "Inventaire" },
  navAbout: { en: "About", ar: "من نحن", fr: "À propos" },
  navContact: { en: "Contact", ar: "تواصل معنا", fr: "Contact" },
  navCompare: { en: "Compare", ar: "قارن", fr: "Comparer" },
  navWishlist: { en: "Wishlist", ar: "المفضلة", fr: "Favoris" },
  navAdmin: { en: "Admin", ar: "الإدارة", fr: "Admin" },
  openMenu: { en: "Open menu", ar: "فتح القائمة", fr: "Ouvrir" },
  closeMenu: { en: "Close", ar: "إغلاق", fr: "Fermer" },

  heroEyebrow: {
    en: "Premium Automotive Marketplace",
    ar: "المنصة الأولى للسيارات الفاخرة",
    fr: "Plateforme automobile premium",
  },
  heroTitle: {
    en: "Discover your dream car today.",
    ar: "اكتشف سيارة أحلامك اليوم.",
    fr: "Découvrez la voiture de vos rêves.",
  },
  heroSubtitle: {
    en: "Hand-picked, certified inventory with transparent pricing and lifetime support.",
    ar: "مخزون منتقى ومفحوص بأسعار شفافة ودعم مدى الحياة.",
    fr: "Inventaire sélectionné, certification 200 points, support à vie.",
  },
  heroSearchBtn: { en: "Search", ar: "ابحث", fr: "Rechercher" },
  heroSearchPlaceholder: {
    en: 'Try "Porsche 911" or "BMW"…',
    ar: "جرّب «بورش 911» أو «بي إم دبليو»…",
    fr: "Essayez «Porsche 911» ou «BMW»…",
  },

  statCars: { en: "Cars in stock", ar: "سيارة متاحة", fr: "Voitures" },
  statDrivers: { en: "Happy drivers", ar: "عميل سعيد", fr: "Conducteurs" },
  statRating: { en: "Avg. rating", ar: "متوسط التقييم", fr: "Note moyenne" },

  featuredTitle: {
    en: "Featured vehicles",
    ar: "السيارات المميزة",
    fr: "En vedette",
  },
  featuredSubtitle: {
    en: "Curated picks our team recommends this week.",
    ar: "اختيارات من فريقنا لهذا الأسبوع.",
    fr: "Sélection recommandée.",
  },
  newArrivalsTitle: { en: "Just arrived", ar: "وصل حديثاً", fr: "Arrivages" },
  newArrivalsSubtitle: {
    en: "Fresh on the lot — be the first to test-drive.",
    ar: "حديثاً في المعرض — كن أول من يجرّبها.",
    fr: "Tout frais.",
  },
  browseByCategory: {
    en: "Browse by category",
    ar: "تصفح حسب الفئة",
    fr: "Parcourir par catégorie",
  },
  specialOffersTitle: { en: "Special deals", ar: "عروض خاصة", fr: "Offres" },
  specialOffersSubtitle: {
    en: "Outstanding value — limited time.",
    ar: "قيمة ممتازة لفترة محدودة.",
    fr: "Excellente affaire.",
  },

  pillarCertified: {
    en: "200-Point Inspection",
    ar: "فحص ٢٠٠ نقطة",
    fr: "Inspection 200 points",
  },
  pillarCertifiedDesc: {
    en: "Every car passes our certified inspection.",
    ar: "كل سيارة تجتاز فحصنا المعتمد.",
    fr: "Chaque voiture passe notre inspection.",
  },
  pillarWarranty: {
    en: "1-Year Warranty",
    ar: "ضمان سنة كاملة",
    fr: "Garantie 1 an",
  },
  pillarWarrantyDesc: {
    en: "Drive away worry-free.",
    ar: "اعبر بثقة.",
    fr: "Couverture complète.",
  },
  pillarFinance: {
    en: "Flexible Financing",
    ar: "تمويل مرن",
    fr: "Financement flexible",
  },
  pillarFinanceDesc: {
    en: "Plans tailored to your budget.",
    ar: "خطط مفصّلة لميزانيتك.",
    fr: "Plans adaptés.",
  },
  pillarSupport: {
    en: "Lifetime Support",
    ar: "دعم مدى الحياة",
    fr: "Support à vie",
  },
  pillarSupportDesc: {
    en: "We're your long-term partner.",
    ar: "شريكك على المدى الطويل.",
    fr: "Partenaire longue durée.",
  },

  btnBrowse: {
    en: "Browse inventory",
    ar: "تصفح المعرض",
    fr: "Voir l'inventaire",
  },
  btnTalkSpecialist: {
    en: "Talk to a specialist",
    ar: "تحدّث مع متخصص",
    fr: "Parler à un conseiller",
  },
  viewDetails: { en: "View details", ar: "التفاصيل", fr: "Voir" },
  bookDrive: {
    en: "Book a test drive",
    ar: "احجز تجربة قيادة",
    fr: "Réserver un essai",
  },
  applyFinance: {
    en: "Apply for financing",
    ar: "قدّم طلب تمويل",
    fr: "Demander un financement",
  },
  whatsappNow: { en: "WhatsApp now", ar: "واتساب الآن", fr: "WhatsApp" },

  allVehicles: {
    en: "All vehicles",
    ar: "كل السيارات",
    fr: "Tous les véhicules",
  },
  resultsCount: { en: "vehicles", ar: "سيارة", fr: "véhicules" },
  filterAll: { en: "All", ar: "الكل", fr: "Tout" },
  filterMake: { en: "Make", ar: "الماركة", fr: "Marque" },
  filterCategory: { en: "Category", ar: "الفئة", fr: "Catégorie" },
  filterTransmission: {
    en: "Transmission",
    ar: "ناقل الحركة",
    fr: "Transmission",
  },
  filterFuel: { en: "Fuel", ar: "وقود", fr: "Carburant" },
  filterYear: { en: "Year from", ar: "من سنة", fr: "Année minimum" },
  filterMaxPrice: {
    en: "Maximum price",
    ar: "السعر الأقصى",
    fr: "Prix maximum",
  },
  filterMaxMileage: {
    en: "Max mileage (mi)",
    ar: "أقصى ممشى (ميل)",
    fr: "Kilométrage max",
  },
  sortBy: { en: "Sort by", ar: "الترتيب", fr: "Trier par" },
  sortNewest: { en: "Newest year", ar: "الأحدث موديلاً", fr: "Plus récents" },
  sortPriceLow: {
    en: "Price: low → high",
    ar: "السعر: تصاعدي",
    fr: "Prix croissant",
  },
  sortPriceHigh: {
    en: "Price: high → low",
    ar: "السعر: تنازلي",
    fr: "Prix décroissant",
  },
  sortMileageLow: {
    en: "Lowest mileage",
    ar: "أقل ممشى",
    fr: "Kilométrage bas",
  },
  noCarsFound: {
    en: "No cars match your filters.",
    ar: "لا توجد سيارات مطابقة.",
    fr: "Aucune voiture ne correspond.",
  },
  clearFilters: { en: "Clear", ar: "مسح", fr: "Effacer" },

  badgeInspected: { en: "Inspected", ar: "مفحوصة", fr: "Inspectée" },
  badgeWarranty: { en: "1-yr warranty", ar: "ضمان سنة", fr: "Garantie 1 an" },
  badgeHotDeal: { en: "Hot deal", ar: "فرصة ممتازة", fr: "Bonne affaire" },

  favAdd: {
    en: "Add to wishlist",
    ar: "أضف للمفضلة",
    fr: "Ajouter aux favoris",
  },
  favRemove: {
    en: "Remove from wishlist",
    ar: "إزالة من المفضلة",
    fr: "Retirer",
  },
  favSaved: {
    en: "Saved to wishlist",
    ar: "تمت الإضافة للمفضلة",
    fr: "Ajouté",
  },
  favRemovedMsg: {
    en: "Removed from wishlist",
    ar: "تمت الإزالة",
    fr: "Retiré",
  },
  favsOnly: {
    en: "Wishlist only",
    ar: "المفضلة فقط",
    fr: "Favoris uniquement",
  },

  compareAdd: { en: "Add to compare", ar: "أضف للمقارنة", fr: "Comparer" },
  compareRemove: { en: "Remove", ar: "إزالة", fr: "Retirer" },
  compareTrayTitle: {
    en: "Compare list",
    ar: "قائمة المقارنة",
    fr: "Comparer",
  },
  compareNow: { en: "Compare now", ar: "قارن الآن", fr: "Comparer" },
  compareEmpty: {
    en: "Pick up to 3 vehicles to compare side-by-side.",
    ar: "اختر حتى ٣ سيارات للمقارنة جنباً إلى جنب.",
    fr: "Sélectionnez jusqu'à 3 véhicules.",
  },
  compareTitle: {
    en: "Side-by-side comparison",
    ar: "مقارنة جنباً إلى جنب",
    fr: "Comparaison côte à côte",
  },

  backToInventory: {
    en: "Back to inventory",
    ar: "العودة للمعرض",
    fr: "Retour à l'inventaire",
  },
  description: { en: "Description", ar: "الوصف", fr: "Description" },
  specYear: { en: "Year", ar: "سنة الصنع", fr: "Année" },
  specMileage: { en: "Mileage", ar: "الممشى", fr: "Kilométrage" },
  specEngine: { en: "Engine", ar: "المحرك", fr: "Moteur" },
  specTransmission: {
    en: "Transmission",
    ar: "ناقل الحركة",
    fr: "Transmission",
  },
  specCondition: { en: "Condition", ar: "الحالة", fr: "État" },
  specCategory: { en: "Category", ar: "الفئة", fr: "Catégorie" },
  specColor: { en: "Color", ar: "اللون", fr: "Couleur" },
  specCylinders: { en: "Cylinders", ar: "السلندرات", fr: "Cylindres" },
  specFuel: { en: "Fuel", ar: "الوقود", fr: "Carburant" },

  historyTitle: {
    en: "Vehicle history report",
    ar: "تقرير تاريخ المركبة",
    fr: "Historique",
  },
  historyOwners: {
    en: "Previous owners",
    ar: "الملاك السابقون",
    fr: "Propriétaires",
  },
  historyAccidents: {
    en: "Accidents on record",
    ar: "حوادث مسجلة",
    fr: "Accidents",
  },
  historyService: {
    en: "Service records",
    ar: "سجلات الصيانة",
    fr: "Entretien",
  },
  historyOwnersVal: {
    en: "1 previous owner",
    ar: "مالك واحد سابق",
    fr: "1 propriétaire",
  },
  historyAccidentsVal: {
    en: "No accidents reported",
    ar: "لا توجد حوادث",
    fr: "Aucun accident",
  },
  historyServiceVal: {
    en: "Full agency history",
    ar: "سجل وكالة كامل",
    fr: "Historique complet",
  },
  historyInspectionNotes: {
    en: "Inspection notes",
    ar: "ملاحظات الفحص",
    fr: "Notes d'inspection",
  },
  reportsAvailable: {
    en: "Carfax available",
    ar: "Carfax متوفر",
    fr: "Carfax dispo.",
  },

  reqTypePurchase: { en: "Purchase", ar: "شراء", fr: "Achat" },
  reqTypeTestDrive: {
    en: "Test drive",
    ar: "تجربة قيادة",
    fr: "Essai routier",
  },
  reqTypeFinancing: { en: "Financing", ar: "تمويل", fr: "Financement" },

  inquiryTitle: {
    en: "Send an inquiry",
    ar: "أرسل طلباً",
    fr: "Envoyer une demande",
  },
  inquirySubtitle: {
    en: "A specialist will reply within hours.",
    ar: "سيتواصل معك متخصص خلال ساعات.",
    fr: "Un conseiller vous répond sous quelques heures.",
  },
  inquiryFullName: { en: "Full name", ar: "الاسم الكامل", fr: "Nom complet" },
  inquiryPhone: { en: "Phone", ar: "الهاتف", fr: "Téléphone" },
  inquiryEmail: { en: "Email", ar: "البريد", fr: "Email" },
  inquiryCity: { en: "City", ar: "المدينة", fr: "Ville" },
  inquiryNotes: {
    en: "Notes (optional)",
    ar: "ملاحظات (اختياري)",
    fr: "Notes (optionnel)",
  },
  inquirySubmit: { en: "Send inquiry", ar: "إرسال الطلب", fr: "Envoyer" },
  inquirySending: { en: "Sending…", ar: "جاري الإرسال…", fr: "Envoi…" },
  inquirySuccessTitle: {
    en: "Inquiry sent!",
    ar: "تم إرسال الطلب!",
    fr: "Envoyé !",
  },
  inquirySuccessMsg: {
    en: "We'll get back to you very soon.",
    ar: "سنتواصل معك قريباً جداً.",
    fr: "Nous reviendrons vite.",
  },
  btnSendAnother: {
    en: "Send another inquiry",
    ar: "إرسال طلب آخر",
    fr: "Envoyer un autre",
  },

  fullName: {
    en: "Please enter your full name.",
    ar: "يرجى إدخال اسمك الكامل.",
    fr: "Saisissez votre nom.",
  },
  phoneNumber: {
    en: "Please enter a valid phone number.",
    ar: "يرجى إدخال رقم هاتف صحيح.",
    fr: "Téléphone invalide.",
  },
  emailAddress: {
    en: "Please enter a valid email.",
    ar: "يرجى إدخال بريد إلكتروني صحيح.",
    fr: "Email invalide.",
  },

  calcTitle: {
    en: "Monthly financing calculator",
    ar: "حاسبة التمويل الشهري",
    fr: "Calculateur de financement",
  },
  calcDown: {
    en: "Down payment (%)",
    ar: "الدفعة الأولى (%)",
    fr: "Acompte (%)",
  },
  calcRate: {
    en: "Annual interest (%)",
    ar: "نسبة الفائدة السنوية (%)",
    fr: "Taux annuel (%)",
  },
  calcTerm: {
    en: "Term (months)",
    ar: "مدة التمويل (شهر)",
    fr: "Durée (mois)",
  },
  calcMonthly: {
    en: "Estimated monthly payment",
    ar: "القسط الشهري التقريبي",
    fr: "Mensualité estimée",
  },
  calcDisclaimer: {
    en: "Indicative — excludes fees, taxes and insurance.",
    ar: "تقدير استرشادي، لا يشمل الرسوم والضرائب والتأمين.",
    fr: "Estimation indicative.",
  },

  aboutHeroTitle: { en: "Our story", ar: "قصتنا", fr: "Notre histoire" },
  aboutHeroBody: {
    en: "What began as a single showroom in El Guerrara, in the palm groves of the Ghardaïa valley, has grown into one of the most trusted names in Algeria's automotive retail. We built MZAB MOTORS on a simple idea: treat every buyer like a friend, not a transaction. Today we serve thousands of drivers each year with a curated inventory of luxury, performance and everyday vehicles — each one inspected, priced fairly, and backed by our lifetime support promise.",
    ar: "انطلقنا من صالة عرض واحدة في مدينة القرارة، بين واحات وادي مزاب في ولاية غرداية، لنصبح أحد أكثر الأسماء الموثوقة في تجارة السيارات بالجزائر. فكرة بسيطة: معاملة كل عميل كصديق لا كصفقة. اليوم نخدم آلاف السائقين سنوياً بمخزون منتقى من السيارات الفاخرة والرياضية واليومية، كل سيارة مفحوصة، بسعر عادل، وبدعم مدى الحياة.",
    fr: "Parti d'un seul showroom à El Guerrara, dans la vallée du M'Zab (Ghardaïa), MZAB MOTORS est devenu une référence en Algérie. Traiter chaque acheteur comme un ami. Aujourd'hui nous servons des milliers de conducteurs — inventaire sélectionné, inspecté, juste prix, support à vie.",
  },
  aboutMissionTitle: { en: "Our mission", ar: "رسالتنا", fr: "Notre mission" },
  aboutMission: {
    en: "To make buying a car the best part of owning one.",
    ar: "أن نجعل شراء السيارة أفضل جزء في امتلاكها.",
    fr: "Faire de l'achat la meilleure partie de la possession.",
  },
  valueHonesty: { en: "Honesty first", ar: "الصدق أولاً", fr: "Honnêteté" },
  valueHonestyDesc: {
    en: "Transparent pricing, no hidden fees.",
    ar: "أسعار شفافة بلا رسوم خفية.",
    fr: "Prix transparent.",
  },
  valueExcellence: {
    en: "Engineering excellence",
    ar: "التميز الهندسي",
    fr: "Excellence",
  },
  valueExcellenceDesc: {
    en: "200-point inspection on every car.",
    ar: "فحص من ٢٠٠ نقطة على كل سيارة.",
    fr: "Inspection 200 points.",
  },
  valueCare: {
    en: "Care beyond sale",
    ar: "العناية بعد البيع",
    fr: "Au-delà de la vente",
  },
  valueCareDesc: {
    en: "A relationship for the life of the car.",
    ar: "علاقة تمتد مدى عمر السيارة.",
    fr: "Relation sur la durée.",
  },

  contactHeroTitle: {
    en: "Send us a message",
    ar: "أرسل لنا رسالة",
    fr: "Envoyez-nous un message",
  },
  contactName: { en: "Name", ar: "الاسم", fr: "Nom" },
  contactEmail: { en: "Email", ar: "البريد", fr: "Email" },
  contactMessage: { en: "Message", ar: "الرسالة", fr: "Message" },
  contactSend: { en: "Send message", ar: "إرسال الرسالة", fr: "Envoyer" },
  contactPhone: { en: "Phone", ar: "الهاتف", fr: "Téléphone" },
  contactEmail2: { en: "E-mail", ar: "البريد الإلكتروني", fr: "E-mail" },
  contactShowroom: { en: "Showroom", ar: "المعرض", fr: "Showroom" },
  contactPhoneVal: {
    en: "010-2024 (555)",
    ar: "010-2024 (555)",
    fr: "010-2024 (555)",
  },
  contactEmailVal: {
    en: "hello@velocitymotors.co",
    ar: "hello@velocitymotors.co",
    fr: "hello@velocitymotors.co",
  },
  contactLocationVal: {
    en: "El Guerrara, Ghardaïa Province, Algeria",
    ar: "القرارة، ولاية غرداية، الجزائر",
    fr: "El Guerrara, Wilaya de Ghardaïa, Algérie",
  },
  contactSent: { en: "Message sent!", ar: "تم إرسال رسالتك!", fr: "Envoyé !" },

  toggleDark: { en: "Toggle theme", ar: "تبديل المظهر", fr: "Thème" },
  statusNew: { en: "New", ar: "جديد", fr: "Nouveau" },
  statusContacted: { en: "Contacted", ar: "تم التواصل", fr: "Contacté" },
  statusClosed: { en: "Closed", ar: "مغلق", fr: "Clôturé" },
  notFound: {
    en: "Car not found",
    ar: "السيارة غير موجودة",
    fr: "Voiture introuvable",
  },
  notFoundDesc: {
    en: "This vehicle may have been sold or removed.",
    ar: "قد تكون هذه السيارة قد بِيعت أو أُزيلت.",
    fr: "Ce véhicule a peut-être été vendu.",
  },

  navSellCar: {
    en: "Sell Your Car",
    ar: "بيع سيارتك",
    fr: "Vendez votre voiture",
  },
  reserveNow: {
    en: "Reserve Vehicle",
    ar: "احجز السيارة",
    fr: "Réserver ce véhicule",
  },
  buyOnline: { en: "Buy Online", ar: "شراء أونلاين", fr: "Acheter en ligne" },
  depositAmount: {
    en: "Reservation Deposit",
    ar: "عربون الحجز",
    fr: "Acompte de réservation",
  },
  depositHold7Days: {
    en: "Holds this vehicle exclusively for you for 7 business days.",
    ar: "يحجز هذه السيارة حصرياً لك لمدة ٧ أيام عمل.",
    fr: "Bloque ce véhicule pour vous pendant 7 jours.",
  },
  remainingBalance: {
    en: "Remaining Balance",
    ar: "المبلغ المتبقي",
    fr: "Solde restant",
  },
  deliveryMethod: {
    en: "Delivery & Handover",
    ar: "طريقة الاستلام",
    fr: "Mode de livraison",
  },
  showroomPickup: {
    en: "Showroom VIP Handover",
    ar: "استلام VIP من المعرض",
    fr: "Retrait VIP en concession",
  },
  homeDelivery: {
    en: "Insured Home Delivery",
    ar: "توصيل آمن للمنزل",
    fr: "Livraison sécurisée à domicile",
  },
  paymentMethod: {
    en: "Payment Method",
    ar: "طريقة الدفع",
    fr: "Moyen de paiement",
  },
  cardPayment: {
    en: "Credit / Debit Card",
    ar: "بطاقة ائتمان / مدى",
    fr: "Carte bancaire",
  },
  bankTransfer: {
    en: "Direct Bank Transfer",
    ar: "تحويل بنكي مباشر",
    fr: "Virement bancaire",
  },
  cashOnDelivery: {
    en: "Cash / Certified Cheque",
    ar: "دفع نقدي / شيك مصدق",
    fr: "Paiement au comptant / chèque",
  },
  orderConfirmed: {
    en: "Reservation Confirmed!",
    ar: "تم تأكيد الحجز بنجاح!",
    fr: "Réservation confirmée !",
  },
  orderRefNumber: {
    en: "Booking Reference",
    ar: "رقم مرجع الحجز",
    fr: "Référence de réservation",
  },
  downloadInvoice: {
    en: "Print / Save Invoice",
    ar: "طباعة / حفظ الفاتورة",
    fr: "Imprimer la facture",
  },
  confirmAndPay: {
    en: "Confirm & Reserve (50,000 DZD)",
    ar: "تأكيد ودفع العربون (50,000 د.ج)",
    fr: "Confirmer & réserver (50 000 DZD)",
  },

  sellHeroTitle: {
    en: "Sell or Trade-In Your Car",
    ar: "بع سيارتك أو استبدلها بأعلى سعر",
    fr: "Vendez ou échangez votre voiture",
  },
  sellHeroSubtitle: {
    en: "Get an instant valuation, competitive cash offer, and free inspection within 24 hours.",
    ar: "احصل على تقييم فوري وعرض نقدي منافس وفحص مجاني خلال ٢٤ ساعة.",
    fr: "Obtenez une estimation immédiate et une offre ferme sous 24h.",
  },
  instantValuation: {
    en: "Instant Market Valuation",
    ar: "التقييم الفوري للسيارة",
    fr: "Estimation immédiate",
  },
  estimatedValue: {
    en: "Estimated Cash Offer",
    ar: "القيمة التقديرية لعرض الشراء",
    fr: "Offre d'achat estimée",
  },
  carMake: { en: "Make", ar: "الماركة / الشركة", fr: "Marque" },
  carModel: { en: "Model", ar: "الموديل / الطراز", fr: "Modèle" },
  carYear: { en: "Year", ar: "سنة الصنع", fr: "Année" },
  carMileage: { en: "Mileage", ar: "الممشى الحالي", fr: "Kilométrage" },
  carCondition: {
    en: "Vehicle Condition",
    ar: "حالة السيارة",
    fr: "État du véhicule",
  },
  askingPrice: {
    en: "Your Asking Price (DZD)",
    ar: "السعر المطلوب (د.ج)",
    fr: "Prix souhaité (DZD)",
  },
  uploadPhotos: {
    en: "Upload Car Photos",
    ar: "ارفع صور السيارة",
    fr: "Photos de la voiture",
  },
  submitForSale: {
    en: "Submit Car for Sale",
    ar: "إرسال طلب بيع السيارة",
    fr: "Soumettre ma voiture",
  },
  sellSuccessMsg: {
    en: "Car submission received! Our acquisition team will contact you within 2 hours.",
    ar: "تم استلام بيانات سيارتك بنجاح! سيتواصل معك فريق الشراء خلال ساعتين.",
    fr: "Demande reçue ! Notre équipe vous contactera sous 2h.",
  },

  footerTagline: {
    en: "Premium automotive marketplace since 2014.",
    ar: "منصة السيارات الفاخرة منذ ٢٠١٤.",
    fr: "Plateforme premium depuis 2014.",
  },
  rightsReserved: {
    en: "All rights reserved.",
    ar: "جميع الحقوق محفوظة.",
    fr: "Tous droits réservés.",
  },

  comingSoon: { en: "Coming soon", ar: "قريباً", fr: "Bientôt" },
};

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  language: Locale;
  setLanguage: (l: Locale) => void;
  lang: Locale;
  setLang: (l: Locale) => void;
  dir: "ltr" | "rtl";
  t: (k: keyof typeof D) => string;
  dict: Dict;
};
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("locale");
      if (saved === "ar" || saved === "en" || saved === "fr") {
        setLocaleState(saved);
        return;
      }
    } catch {
      /* private browsing / storage unavailable — fall through to navigator detection */
    }
    if (typeof navigator !== "undefined") {
      const langs = navigator.languages?.length
        ? navigator.languages
        : [navigator.language];
      for (const l of langs) {
        if (!l) continue;
        const lc = l.toLowerCase();
        if (lc.startsWith("ar")) {
          setLocaleState("ar");
          return;
        }
        if (lc.startsWith("fr")) {
          setLocaleState("fr");
          return;
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    }
    try {
      localStorage.setItem("locale", locale);
    } catch {
      /* private browsing / storage full — preference just won't persist */
    }
  }, [locale]);
  const value = useMemo<Ctx>(
    () => ({
      locale,
      setLocale: setLocaleState,
      language: locale,
      setLanguage: setLocaleState,
      lang: locale,
      setLang: setLocaleState,
      dir: locale === "ar" ? "rtl" : "ltr",
      t: (k) => (D[k] && D[k][locale]) || (D[k] && D[k].en) || String(k),
      dict: D,
    }),
    [locale],
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const c = useContext(LanguageContext);
  if (!c) throw new Error("useLanguage must be used within LanguageProvider");
  return c;
}
