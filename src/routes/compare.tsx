import { createFileRoute, Link } from "@tanstack/react-router";
import { X, GitCompare } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { useDealership, formatPrice, formatMiles } from "@/context/DealershipContext";
import { useLanguage } from "@/context/LanguageContext";
import { clearCompare, useCompareList } from "@/lib/compare";

export const Route = createFileRoute("/compare")({
  head: () => ({ meta: [{ title: "مقارنة السيارات — MZAB MOTORS" }] }),
  component: ComparePage,
});

function ComparePage() {
  const { t } = useLanguage();
  const { cars } = useDealership();
  const ids = useCompareList();
  const list = ids.map((id) => cars.find((c) => c.id === id)).filter(Boolean) as typeof cars;

  const attrs: { key: keyof typeof list[number]; label: string }[] = [
    { key: "title", label: t("description") === "Description" ? "Model" : t("description") },
    { key: "year", label: t("specYear") },
    { key: "mileage", label: t("specMileage") },
    { key: "price", label: "Price" },
    { key: "category", label: t("specCategory") },
    { key: "engine", label: t("specEngine") },
    { key: "transmission", label: t("specTransmission") },
    { key: "condition", label: t("specCondition") },
  ];

  const fmt = (val: any, k: string) => {
    if (val == null || val === "") return "—";
    if (k === "price") return formatPrice(Number(val));
    if (k === "mileage") return formatMiles(Number(val));
    return String(val);
  };

  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <GitCompare className="h-7 w-7 text-accent" />
            <h1 className="text-3xl sm:text-4xl font-bold">{t("compareTitle")}</h1>
          </div>
          {ids.length > 0 && (
            <button onClick={clearCompare} className="text-sm font-semibold text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
              <X className="h-4 w-4" /> {t("clearFilters")}
            </button>
          )}
        </div>

        {list.length === 0 ? (
          <div className="mt-12 text-center py-20 bg-card rounded-2xl border border-border">
            <GitCompare className="h-10 w-10 mx-auto text-muted-foreground" />
            <p className="mt-5 text-muted-foreground max-w-md mx-auto">{t("compareEmpty")}</p>
            <Link to="/cars" className="mt-5 inline-block text-sm font-semibold text-primary hover:text-accent">{t("btnBrowse")} →</Link>
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] bg-card border border-border rounded-2xl shadow-card overflow-hidden">
              <thead className="bg-secondary">
                <tr>
                  <th className="ltr:text-left rtl:text-right p-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Feature</th>
                  {list.map((c) => (
                    <th key={c.id} className="p-3 text-center">
                      <Link to="/cars/$id" params={{ id: c.id }} className="block">
                        <img src={c.images[0]} alt="" className="h-24 w-full object-cover rounded-md mb-2" />
                        <div className="font-display font-bold text-sm truncate">{c.title}</div>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attrs.map(({ key, label }) => (
                  <tr key={key as string} className="border-t border-border">
                    <td className="p-3 text-sm font-semibold text-muted-foreground">{label}</td>
                    {list.map((c) => (
                      <td key={c.id} className="p-3 text-center text-sm font-medium">{fmt((c as any)[key], key as string)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </PublicLayout>
  );
}
