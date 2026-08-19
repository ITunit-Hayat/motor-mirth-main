import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Inbox } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { useDealership, type Order } from "@/context/DealershipContext";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/admin/orders")({
  component: ManageOrders,
});

const statusColors: Record<Order["status"], string> = {
  New: "bg-accent/20 text-accent-foreground border-accent/40",
  Contacted: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
  Closed: "bg-muted text-muted-foreground border-border",
};

function ManageOrders() {
  const { t } = useLanguage();
  const { orders, updateOrderStatus, loadingOrders } = useDealership();

  const getStatusLabel = (status: Order["status"]) => {
    if (status === "New") return t("statusNew");
    if (status === "Contacted") return t("statusContacted");
    return t("statusClosed");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl md:text-3xl font-bold">{t("adminOrdersTitle")}</h1>
      <p className="text-muted-foreground text-sm mt-1">
        {loadingOrders ? t("adminOrdersLoading") : `${orders.length} ${t("adminOrdersCount")}`}
      </p>

      {loadingOrders ? (
        <div className="mt-6 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-36 rounded-2xl border border-border bg-card animate-pulse" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="mt-10 bg-card border border-border rounded-2xl p-16 text-center shadow-card">
          <Inbox className="h-10 w-10 mx-auto text-muted-foreground" />
          <div className="mt-3 font-semibold">{t("adminOrdersEmpty")}</div>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("adminOrdersEmptyDesc")}
          </p>
          <Link to="/cars" className="mt-4 inline-block text-sm font-semibold text-primary hover:text-accent">
            {t("navInventory")} →
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="bg-card border border-border rounded-2xl p-5 shadow-card">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-lg">{o.fullName}</h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${statusColors[o.status]}`}>
                      {getStatusLabel(o.status)}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    {t("adminOrderInterIn")}{" "}
                    <Link to="/cars/$id" params={{ id: o.carId }} className="text-primary font-medium hover:text-accent underline-offset-4 hover:underline">
                      {o.carTitle}
                    </Link>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(o.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <a href={`tel:${o.phone}`} className="hover:text-accent" dir="ltr">{o.phone}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <a href={`mailto:${o.email}`} className="hover:text-accent truncate" dir="ltr">{o.email}</a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{o.city || "—"}</span>
                </div>
              </div>

              {o.notes && (
                <div className="mt-3 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{t("adminOrderNotes")}</span> {o.notes}
                </div>
              )}

              <div className="mt-4 flex items-center gap-2">
                <label className="text-xs font-semibold text-muted-foreground">{t("adminOrderUpdateStatus")}</label>
                <select
                  value={o.status}
                  onChange={async (e) => {
                    try {
                      await updateOrderStatus(o.id, e.target.value as Order["status"]);
                    } catch {
                      /* status stays unchanged on failure */
                    }
                  }}
                  className="h-9 px-3 rounded-md bg-background border border-input text-sm"
                >
                  <option value="New">{t("statusNew")}</option>
                  <option value="Contacted">{t("statusContacted")}</option>
                  <option value="Closed">{t("statusClosed")}</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
