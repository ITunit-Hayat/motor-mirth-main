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

  // Search, Sort & Favorites
  searchCars: { ar: "ابحث بالاسم أو الماركة...", fr: "Rechercher par nom ou marque...", en: "Search by name or make..." },
  sortBy: { ar: "الترتيب", fr: "Trier par", en: "Sort by" },
  sortNewest: { ar: "الأحدث موديلاً", fr: "Plus récents", en: "Newest year" },
  sortPriceLow: { ar: "السعر: من الأقل للأعلى", fr: "Prix croissant", en: "Price: low to high" },
  sortPriceHigh: { ar: "السعر: من الأعلى للأقل", fr: "Prix décroissant", en: "Price: high to low" },
  sortMileageLow: { ar: "الممشى: الأقل أولاً", fr: "Kilométrage croissant", en: "Mileage: lowest first" },
  favAdd: { ar: "أضف إلى المفضلة", fr: "Ajouter aux favoris", en: "Add to favorites" },
  favRemove: { ar: "إزالة من المفضلة", fr: "Retirer des favoris", en: "Remove from favorites" },
  favSaved: { ar: "تمت الإضافة إلى المفضلة", fr: "Ajouté aux favoris", en: "Saved to favorites" },
  favRemovedMsg: { ar: "تمت الإزالة من المفضلة", fr: "Retiré des favoris", en: "Removed from favorites" },
  favsOnly: { ar: "عرض المفضلة فقط", fr: "Favoris uniquement", en: "Favorites only" },
  resultsCount: { ar: "سيارة متاحة", fr: "véhicules disponibles", en: "vehicles available" },

  // Finance Calculator
  calcTitle: { ar: "حاسبة التمويل الشهري", fr: "Calculateur de financement", en: "Finance Calculator" },
  calcDown: { ar: "الدفعة الأولى (%)", fr: "Acompte (%)", en: "Down payment (%)" },
  calcRate: { ar: "نسبة الفائدة السنوية (%)", fr: "Taux annuel (%)", en: "Annual interest (%)" },
  calcTerm: { ar: "مدة التمويل (شهر)", fr: "Durée (mois)", en: "Term (months)" },
  calcMonthly: { ar: "القسط الشهري التقريبي", fr: "Mensualité estimée", en: "Estimated monthly payment" },
  calcDisclaimer: { ar: "حساب تقديري للاسترشاد فقط ولا يشمل الرسوم والتأمين.", fr: "Estimation indicative hors frais et assurance.", en: "Indicative estimate, excluding fees and insurance." },

  // About Page (كامل صفحة من نحن)
  aboutMetaTitle: { ar: "من نحن — فيلوسيتي موتورز", fr: "À propos — VelocityMotors", en: "About Us — VelocityMotors" },
  aboutMetaDesc: { ar: "قصتنا، رسالتنا وفريق العمل خلف فيلوسيتي موتورز.", fr: "Notre histoire, notre mission et l'équipe VelocityMotors.", en: "Our story, mission, and the team behind VelocityMotors." },
  aboutHeroTitle: { ar: "معرض سيارات مبني على الثقة والشفافية.", fr: "Une concession fondée sur la confiance.", en: "A dealership built on trust, not tactics." },
  aboutHeroDesc: {
    ar: "منذ عام 2013، فيلوسيتي موتورز تعيد تعريف تجربة شراء السيارات لتكون ممتعة، راقية، وواضحة بدون تعقيدات.",
    fr: "Depuis 2013, VelocityMotors redéfinit l'expérience d'achat automobile : honnête, humaine et sans effort.",
    en: "Since 2013, VelocityMotors has been redefining what buying a car should feel like — honest, human, and effortless."
  },
  aboutStoryTitle: { ar: "قصتنا ومسيرتنا", fr: "Notre Histoire", en: "Our Story" },
  aboutStoryP1: {
    ar: "ما بدأ كصالة عرض واحدة أصبح اليوم أحد أكثر الأسماء موثوقية في عالم تجارة السيارات الفاخرة والمميزة. أسسنا فيلوسيتي موتورز على مبدأ راسخ: معاملة كل عميل كصديق وشريك نجاح.",
    fr: "Ce qui a commencé comme un unique showroom est devenu l'une des adresses les plus réputées du marché automobile haut de gamme. Nous traitons chaque client comme un partenaire privilégié.",
    en: "What started as a single showroom has grown into one of the most trusted names in premium automotive retail. We built VelocityMotors on a simple idea: treat every buyer like a friend, not a target."
  },
  aboutStoryP2: {
    ar: "نخدم اليوم آلاف السائقين سنوياً بمجموعة منتقاة من السيارات الفاخرة، والرياضية، واليومية المعتمدة — كل سيارة تخضع لفحص شامل ودقيق، وتُعرض بسعر عادل مع ضمان وخدمة دعم مستمرة.",
    fr: "Aujourd'hui, nous accompagnons des milliers de conducteurs chaque année avec un inventaire trié sur le volet de véhicules de luxe et de sport, tous inspectés et garantis.",
    en: "Today we serve thousands of drivers a year with a curated inventory of luxury, performance, and everyday vehicles — each one inspected, priced fairly, and backed by our lifetime support promise."
  },
  aboutMissionBadge: { ar: "رسالتنا ورؤيتنا", fr: "Notre Mission", en: "Our Mission" },
  aboutMissionText: {
    ar: "أن نجعل شراء السيارة الجزء الأجمل والأكثر راحة في تجربة امتلاكها.",
    fr: "Faire de l'achat d'un véhicule le moment le plus gratifiant de votre expérience.",
    en: "To make buying a car the best part of owning one."
  },
  aboutStat1Val: { ar: "+12", fr: "12+", en: "12+" },
  aboutStat1Label: { ar: "عاماً من الخبرة والتميز", fr: "Années d'expérience", en: "Years in business" },
  aboutStat2Val: { ar: "+10,000", fr: "10 000+", en: "10,000+" },
  aboutStat2Label: { ar: "عميل راضٍ وسعيد", fr: "Clients satisfaits", en: "Happy customers" },
  aboutStat3Val: { ar: "38", fr: "38", en: "38" },
  aboutStat3Label: { ar: "جائزة جودة وتميز", fr: "Prix d'excellence", en: "Industry awards" },
  aboutStat4Val: { ar: "4.9/5", fr: "4.9/5", en: "4.9/5" },
  aboutStat4Label: { ar: "متوسط تقييم العملاء", fr: "Note moyenne avis", en: "Average review" },

  // Contact Page (كامل صفحة اتصل بنا)
  contactMetaTitle: { ar: "اتصل بنا — فيلوسيتي موتورز", fr: "Contact — VelocityMotors", en: "Contact — VelocityMotors" },
  contactMetaDesc: { ar: "تواصل مع فيلوسيتي موتورز عبر الهاتف، البريد أو بزيارة صالة العرض.", fr: "Contactez VelocityMotors par téléphone, email ou rendez-vous en showroom.", en: "Reach VelocityMotors by phone, email, or visit our showroom." },
  contactHeroTitle: { ar: "يسعدنا دائماً تواصلك معنا", fr: "Contactez-nous", en: "Get in touch" },
  contactHeroDesc: {
    ar: "هل لديك أي استفسار حول سيارة، خطط التمويل، أو استبدال سيارتك القديمة؟ فريقنا المتخصص جاهز للإجابة عليك.",
    fr: "Une question sur un véhicule, un financement ou une reprise ? Nous sommes à votre écoute.",
    en: "Have a question about a vehicle, financing, or your trade-in? We're here."
  },
  contactPhoneLabel: { ar: "الهاتف المباشر", fr: "Téléphone", en: "Phone" },
  contactEmailLabel: { ar: "البريد الإلكتروني", fr: "Email", en: "Email" },
  contactShowroomLabel: { ar: "عنوان المعرض", fr: "Showroom", en: "Showroom" },
  contactShowroomAddr: { ar: "88 جادة غراند، لوس أنجلوس، كاليفورنيا", fr: "88 Grand Ave, Los Angeles, CA 90015", en: "88 Grand Ave, Los Angeles, CA 90015" },
  contactFormTitle: { ar: "أرسل لنا استفسارك أو رسالتك", fr: "Envoyez-nous un message", en: "Send us a message" },
  contactNameLabel: { ar: "الاسم الكامل", fr: "Nom complet", en: "Name" },
  contactEmailField: { ar: "البريد الإلكتروني", fr: "Adresse e-mail", en: "Email" },
  contactMsgLabel: { ar: "نص الرسالة أو الاستفسار", fr: "Message", en: "Message" },
  contactMsgPlaceholder: { ar: "اكتب تفاصيل طلبك أو استفسارك هنا...", fr: "Écrivez votre message ici...", en: "Write your message here..." },
  contactBtnSend: { ar: "إرسال الرسالة الآن", fr: "Envoyer le message", en: "Send Message" },
  contactBtnSent: { ar: "تم الإرسال بنجاح ✓ — إرسال رسالة أخرى", fr: "Message envoyé ✓ — Envoyer un autre", en: "Sent ✓ — Send another" },
  contactFillAll: { ar: "يرجى تعبئة جميع الحقول المطلوبة.", fr: "Veuillez remplir tous les champs.", en: "Please complete all fields." },
  contactSuccessToast: { ar: "تم إرسال رسالتك بنجاح — سنرد عليك في أقرب وقت.", fr: "Message envoyé — nous vous répondrons sous peu.", en: "Message sent — we'll reply soon." },

  // Admin cars & orders enhancements
  adminCarsLoading: { ar: "جاري تحميل المخزون...", fr: "Chargement...", en: "Loading inventory…" },
  adminCarsInStock: { ar: "سيارة متوفرة في المخزون", fr: "véhicules en stock", en: "vehicles in stock" },
  adminThCar: { ar: "السيارة", fr: "Véhicule", en: "Car" },
  adminThYear: { ar: "السنة", fr: "Année", en: "Year" },
  adminThPrice: { ar: "السعر", fr: "Prix", en: "Price" },
  adminThMileage: { ar: "الممشى", fr: "Kilométrage", en: "Mileage" },
  adminThCategory: { ar: "الفئة", fr: "Catégorie", en: "Category" },
  adminThActions: { ar: "إجراءات", fr: "Actions", en: "Actions" },
  adminNoCars: { ar: "لا توجد سيارات بعد — أضف أول سيارة الآن.", fr: "Aucun véhicule pour l'instant — ajoutez le premier.", en: "No cars yet — add your first vehicle." },
  adminConfirmDelete: { ar: "هل أنت متأكد من حذف هذه السيارة؟", fr: "Êtes-vous sûr de vouloir supprimer ce véhicule ?", en: "Are you sure you want to delete this car?" },
  adminDeletedSuccess: { ar: "تم حذف السيارة بنجاح", fr: "Véhicule supprimé", en: "Car deleted" },
  adminSavedSuccess: { ar: "تم حفظ بيانات السيارة بنجاح", fr: "Véhicule enregistré avec succès", en: "Car saved successfully" },
  adminModalAdd: { ar: "إضافة سيارة جديدة للمخزون", fr: "Ajouter un nouveau véhicule", en: "Add New Car" },
  adminModalEdit: { ar: "تعديل بيانات السيارة", fr: "Modifier le véhicule", en: "Edit Car" },
  adminFieldTitle: { ar: "عنوان / اسم السيارة", fr: "Nom du véhicule", en: "Car Title" },
  adminFieldMake: { ar: "الشركة المصنعة / الماركة", fr: "Marque", en: "Make" },
  adminFieldModel: { ar: "الموديل / الطراز", fr: "Modèle", en: "Model" },
  adminFieldYear: { ar: "سنة الصنع", fr: "Année", en: "Year" },
  adminFieldPrice: { ar: "السعر بالدولار ($)", fr: "Prix (USD)", en: "Price (USD)" },
  adminFieldMileage: { ar: "الممشى (ميل)", fr: "Kilométrage (mi)", en: "Mileage (mi)" },
  adminFieldEngine: { ar: "نوع وسعة المحرك", fr: "Moteur", en: "Engine" },
  adminFieldTrans: { ar: "ناقل الحركة", fr: "Transmission", en: "Transmission" },
  adminFieldCond: { ar: "حالة السيارة", fr: "État", en: "Condition" },
  adminFieldCat: { ar: "فئة السيارة", fr: "Catégorie", en: "Category" },
  adminFieldDesc: { ar: "الوصف التفصيلي", fr: "Description détaillée", en: "Description" },
  adminFieldImgs: { ar: "روابط الصور (رابط في كل سطر)", fr: "URLs des images (une par ligne)", en: "Image URLs (one per line)" },
  adminFieldFeatured: { ar: "عرض في قسم السيارات المميزة بالرئيسية", fr: "Mettre en vedette sur l'accueil", en: "Featured on homepage" },
  adminBtnCancel: { ar: "إلغاء", fr: "Annuler", en: "Cancel" },
  adminBtnSave: { ar: "حفظ التغييرات", fr: "Enregistrer", en: "Save" },
  adminBtnSaving: { ar: "جاري الحفظ...", fr: "Enregistrement...", en: "Saving…" },

  // Orders
  adminOrdersTitle: { ar: "طلبات وحجوزات العملاء", fr: "Commandes et prospects", en: "Customer Orders" },
  adminOrdersCount: { ar: "طلب مستلم", fr: "demande(s) reçue(s)", en: "lead(s) received" },
  adminOrdersLoading: { ar: "جاري تحميل الطلبات...", fr: "Chargement des commandes...", en: "Loading leads…" },
  adminOrdersEmpty: { ar: "لا توجد طلبات جديدة حالياً", fr: "Aucune commande pour le moment", en: "No orders yet" },
  adminOrdersEmptyDesc: { ar: "استفسارات وحجوزات العملاء من صفحة تفاصيل السيارات ستظهر هنا فور إرسالها.", fr: "Les demandes envoyées par les clients apparaîtront ici.", en: "Customer inquiries from the car details page will appear here." },
  adminOrderInterIn: { ar: "مهتم بسيارة", fr: "Intéressé par", en: "Interested in" },
  adminOrderNotes: { ar: "ملاحظات العميل:", fr: "Notes du client :", en: "Notes:" },
  adminOrderUpdateStatus: { ar: "تحديث الحالة:", fr: "Modifier le statut :", en: "Update status:" },
  adminViewSite: { ar: "معاينة الموقع", fr: "Voir le site", en: "View Site" },
  adminTotalCars: { ar: "إجمالي السيارات", fr: "Total Véhicules", en: "Total Cars" },
  adminTotalOrders: { ar: "إجمالي الطلبات", fr: "Total Commandes", en: "Total Orders" },
  adminNewLeads: { ar: "طلبات جديدة", fr: "Nouveaux prospects", en: "New Leads" },
  adminInvValue: { ar: "قيمة المخزون الإجمالية", fr: "Valeur de l'inventaire", en: "Inventory Value" },
  adminManageInvBtn: { ar: "إدارة المخزون ←", fr: "Gérer l'inventaire →", en: "Manage Inventory →" },
  adminManageOrdersBtn: { ar: "إدارة الطلبات ←", fr: "Gérer les commandes →", en: "Manage Orders →" },
  adminDashboardSubtitle: { ar: "نظرة عامة ومباشرة على أداء المعرض والمبيعات.", fr: "Aperçu global des activités de votre concession.", en: "Overview of your dealership at a glance." },

  // Detail Page additions
  carNotFoundTitle: { ar: "السيارة غير متوفرة", fr: "Véhicule non trouvé", en: "Car not found" },
  carNotFoundDesc: { ar: "قد تكون هذه السيارة قد بيعت أو تمت إزالتها من المعرض.", fr: "Ce véhicule a peut-être été vendu ou retiré.", en: "This vehicle may have been sold or removed." },
  photoCount: { ar: "صورة", fr: "photos", en: "photos" },
  prevImg: { ar: "الصورة السابقة", fr: "Image précédente", en: "Previous image" },
  nextImg: { ar: "الصورة التالية", fr: "Image suivante", en: "Next image" },
  noVehiclesListed: { ar: "لا توجد سيارات معروضة حالياً.", fr: "Aucun véhicule affiché pour l'instant.", en: "No vehicles listed yet." },
  chooseLang: { ar: "اللغة والموقع", fr: "Langue & Région", en: "Language & Region" },
  adminPanelTitle: { ar: "لوحة الإدارة", fr: "Panneau d'administration", en: "Admin Panel" },
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
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved && (saved === "ar" || saved === "fr" || saved === "en")) {
        setLanguageState(saved);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language;
    }
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
