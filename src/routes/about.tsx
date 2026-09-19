import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Wrench,
  Sparkles,
  MapPin,
  Clock,
  Layers,
  ArrowLeft,
  ArrowRight,
  Store,
  Car,
  Repeat,
  Compass,
  PlusCircle,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { PublicLayout } from "@/components/PublicLayout";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن | ميزاب موترز (M'zab Motors)" },
      {
        name: "description",
        content:
          "أهلاً بكم في ميزاب موترز، المنصة الرقمية الأولى والرائدة المتخصصة في عالم السيارات والدراجات النارية في ولاية غرداية، وبشكل خاص في مدينة القرارة والمناطق المجاورة.",
      },
    ],
  }),
  component: AboutPage,
});

export default function AboutPage() {
  const { lang } = useLanguage();
  const isRtl = lang === "ar";

  const offerings = [
    {
      icon: Store,
      title: "للبائعين والتجار",
      desc: "نساعدك على إيصال منتجاتك وخدماتك إلى آلاف الزبائن المهتمين يومياً في المنطقة، مما يضمن لك زيادة المبيعات وتوسع تجارتك.",
      tag: "توسع تجاري",
    },
    {
      icon: Car,
      title: "السيارات والدراجات النارية",
      desc: "قسم كامل لبيع وشراء السيارات والدراجات بمختلف أنواعها، سواء كانت جديدة أم مستعملة بأفضل الأسعار.",
      tag: "سوق متكامل",
    },
    {
      icon: Wrench,
      title: "قطع الغيار واللوازم",
      desc: "العثور على قطع غيار السيارات والدراجات النارية (الأصلية، الجديدة، والمستعملة) لم يعد أمراً صعباً؛ كل ما تحتاجه متوفر بضغطة زر.",
      tag: "أصلية ومستعملة",
    },
    {
      icon: Repeat,
      title: "خدمة التبادل (البروزة / المقايضة)",
      desc: "يتيح لك الموقع إمكانية عرض مركبك أو قطعتك للتبادل (التبريز) بكل سهولة وشفافية وبضمانات متبادلة.",
      tag: "تبريز ومقايضة",
    },
    {
      icon: Compass,
      title: "كل ما يخص الميكانيك",
      desc: "نوفر مساحة خاصة لخدمات الصيانة، الورشات، والميكانيكيين لتقديم خدماتهم لسكان المنطقة بكفاءة عالية.",
      tag: "ورشات وصيانة",
    },
  ];

  const whyChooseUs = [
    {
      icon: MapPin,
      title: "استهداف محلي دقيق",
      desc: "نركز بشكل أساسي على منطقة القرارة وغرداية، مما يجعل عملية المعاينة والاستلام أسهل وأسرع.",
    },
    {
      icon: Clock,
      title: "سجّل وعرض في دقائق",
      desc: "واجهة مستخدم بسيطة تمكنك من إضافة إعلانك مع الصور والتفاصيل خلال ثوانٍ معدودة.",
    },
    {
      icon: Layers,
      title: "تنوع وشمولية",
      desc: "تجد لدينا كل الخيارات التي تناسب ميزانيتك، من الجديد إلى المستعمل وخدمات التبادل.",
    },
    {
      icon: ShieldCheck,
      title: "ثقة وموثوقية",
      desc: "نعتز بقيم مجتمعنا الميزابي القائمة على الصدق، الأمانة، والتعاون التجاري المثمر.",
    },
  ];

  return (
    <PublicLayout>
      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-hero border-b border-border py-16 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* TEXT COLUMN */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 text-right"
              dir="rtl"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold mb-5 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                المنصة الرقمية الأولى في غرداية والقرارة
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                من نحن | ميزاب موترز <span className="text-accent">(M'zab Motors)</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
                أهلاً بكم في <strong className="text-accent font-bold">"ميزاب موترز"</strong>، المنصة الرقمية الأولى والرائدة المتخصصة في عالم السيارات والدراجات النارية في ولاية غرداية، وبشكل خاص في مدينة القرارة والمناطق المجاورة.
              </p>

              {/* ACTION BUTTONS */}
              <div className="mt-8 flex flex-wrap gap-3 items-center">
                <Link
                  to="/post-car"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-gradient-accent text-accent-foreground font-bold shadow-elegant hover:scale-105 transition-transform"
                >
                  <PlusCircle className="h-4 w-4" /> انشر إعلانك مجاناً
                </Link>
                <Link
                  to="/cars"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-card border border-border text-white font-bold hover:bg-secondary hover:border-accent/50 transition-colors"
                >
                  تصفح السيارات <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* IMAGE DISPLAY COLUMN (USER REQUESTED M'ZAB VALLEY SCENE) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="lg:col-span-5 flex flex-col items-center"
            >
              <div className="relative group w-full max-w-lg">
                {/* GLOW EFFECT */}
                <div className="absolute -inset-1 bg-gradient-to-r from-accent/40 via-amber-600/30 to-accent/40 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition duration-500" />
                
                {/* IMAGE CARD */}
                <div className="relative rounded-2xl bg-card border border-accent/40 p-3 sm:p-4 shadow-2xl overflow-hidden">
                  <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-background/50 border border-border relative">
                    <img
                      src="/mzab-valley-hero.jpg"
                      alt="غرداية وقصور وادي ميزاب والقرارة"
                      className="h-full w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />
                    
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white">
                      <MapPin className="h-3.5 w-3.5 text-accent" /> غرداية والقرارة
                    </div>

                    <div className="absolute bottom-3 right-3 left-3 text-right">
                      <div className="flex items-center gap-2">
                        <img
                          src="/mzab-logo.jpg"
                          alt="Logo"
                          className="h-7 w-7 rounded-full border border-accent/50 shadow"
                        />
                        <span className="font-display font-bold text-sm text-white drop-shadow">
                          ميزاب موترز • أصالة وتطور
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 px-2 pb-1 text-right">
                    <p className="text-xs text-white/80 font-medium leading-relaxed">
                      من قلب وادي ميزاب التاريخي ومدينة القرارة، ننطلق لخدمة مجتمعنا بأرقى معايير التجارة والميكانيك.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VISION SECTION (رؤيتنا) */}
      <section className="py-16 md:py-20 mx-auto max-w-7xl px-4 sm:px-6" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-card border border-border p-8 md:p-12 shadow-elegant relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 h-1.5 w-full bg-gradient-accent" />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/15 text-accent text-xs font-bold mb-3">
              <Compass className="h-4 w-4" /> رؤيتنا
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              الجسر الرقمي لمحبي المحركات في وادي ميزاب
            </h2>
            <p className="mt-5 text-base sm:text-lg text-white/90 leading-relaxed">
              أسسنا <strong className="text-accent">"ميزاب موترز"</strong> لنكون الجسر الذي يربط بين البائع والمشتري وشغوفي المحركات في منطقتنا. نحن ندرك تماماً طبيعة منطقتنا الصحراوية واحتياجات أهلها، ونسعى لتوفير تجربة رقمية سهلة، آمنة، وسريعة تجمع كل ما يتعلق بعالم الميكانيك في مكان واحد.
            </p>
          </div>
        </motion.div>
      </section>

      {/* WHAT WE OFFER (ماذا نقدم لك؟) */}
      <section className="py-12 md:py-16 bg-card/40 border-y border-border" dir="rtl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-accent mb-2">
              خدمات متكاملة
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              ماذا نقدم لك؟
            </h2>
            <p className="mt-3 text-white/80 text-sm sm:text-base">
              سواء كنت تاجراً، صاحب محل، أو فرداً يبحث عن أفضل الصفقات، فإن منصتنا صُممت لتلبي كافة تطلعاتك:
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl bg-card border border-border p-6 shadow-card hover:border-accent/40 hover:shadow-elegant transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-accent/15 border border-accent/30 text-accent grid place-items-center group-hover:scale-110 transition-transform">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-secondary text-accent border border-border">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-white/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE MZAB MOTORS (لماذا تختار منصة "ميزاب موترز"؟) */}
      <section className="py-16 md:py-20 mx-auto max-w-7xl px-4 sm:px-6" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-accent mb-2">
            ميزات استثنائية
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            لماذا تختار منصة "ميزاب موترز"؟
          </h2>
          <p className="mt-3 text-white/80 text-sm sm:text-base">
            صُممت المنصة خصيصاً لتواكب ثقافة وتجارة واحتياجات أهل وادي ميزاب والمناطق المجاورة
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((col, idx) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.09 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-card border border-border p-6 shadow-card hover:border-accent/40 transition-all text-right"
            >
              <div className="h-11 w-11 rounded-xl bg-accent/15 border border-accent/30 text-accent grid place-items-center mb-4">
                <col.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white">
                {col.title}
              </h3>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">
                {col.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* JOIN US TODAY (انضم إلينا اليوم!) */}
      <section className="pb-20 pt-6 mx-auto max-w-7xl px-4 sm:px-6" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-hero border border-accent/40 p-8 sm:p-12 text-center shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/25 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative max-w-3xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              انضم إلينا اليوم!
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed">
              سواء كنت تبحث عن سيارتك القادمة، تريد تجديد دراجتك النارية، أو ترغب في بيع وشراء قطع الغيار والمعدات — ميزاب موترز بوابتك الرقمية الموثوقة.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/post-car"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-xl bg-gradient-accent text-accent-foreground font-bold shadow-elegant hover:scale-105 transition-transform"
              >
                <PlusCircle className="h-5 w-5" /> أضف إعلانك الآن
              </Link>
              <Link
                to="/cars"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-card/80 border border-accent/40 text-white font-semibold hover:bg-card transition-colors"
              >
                استكشف المعروض <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-transparent border border-white/20 text-white/90 font-medium hover:bg-white/10 transition-colors"
              >
                <Phone className="h-4 w-4 text-accent" /> تواصل معنا
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </PublicLayout>
  );
}
