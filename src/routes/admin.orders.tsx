import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Mail, Phone, MapPin, Inbox, MessageCircle, Send } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import {
  useDealership,
  type Order,
  type OrderStatus,
  type OrderType,
} from "@/context/DealershipContext";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title: "Customer Orders — Admin" },
      { name: "description", content: "Manage customer inquiries and leads." },
      { property: "og:title", content: "Customer Orders — Admin" },
      { property: "og:description", content: "Manage customer inquiries and leads." },
    ],
  }),
  component: ManageOrders,
});

const statusColors: Record<OrderStatus, string> = {
  New: "bg-accent/20 text-accent-foreground border-accent/40",
  Processing: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
  Contacted: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30",
  Closed: "bg-muted text-muted-foreground border-border",
};

const TYPE_LABELS: Record<OrderType, string> = {
  Purchase: "Purchase inquiry",
  TestDrive: "Test drive",
  Financing: "Financing",
  Contact: "Contact us",
};

const TYPE_FILTERS: Array<{ value: OrderType | "All"; label: string }> = [
  { value: "All", label: "All requests" },
  { value: "Purchase", label: "Purchase" },
  { value: "TestDrive", label: "Test drive" },
  { value: "Financing", label: "Financing" },
  { value: "Contact", label: "Contact us" },
];

function ManageOrders() {
  const { orders, updateOrderStatus, loadingOrders } = useDealership();
  const [filter, setFilter] = useState<OrderType | "All">("All");

  const filtered = useMemo(
    () => (filter === "All" ? orders : orders.filter((o) => o.type === filter)),
    [orders, filter],
  );

  return (
    <AdminLayout>
      <h1 className="text-2xl md:text-3xl font-bold">Customer Orders</h1>
      <p className="text-muted-foreground text-sm mt-1">
        {loadingOrders
          ? "Loading leads…"
          : `${filtered.length} of ${orders.length} lead${orders.length !== 1 ? "s" : ""} shown`}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {TYPE_FILTERS.map((tf) => {
          const count =
            tf.value === "All" ? orders.length : orders.filter((o) => o.type === tf.value).length;
          return (
            <button
              key={tf.value}
              onClick={() => setFilter(tf.value)}
              className={`h-9 px-3 rounded-full text-xs font-semibold border transition ${
                filter === tf.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-input hover:bg-secondary"
              }`}
            >
              {tf.label} <span className="opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {loadingOrders ? (
        <div className="mt-6 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-36 rounded-2xl border border-border bg-card animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-10 bg-card border border-border rounded-2xl p-16 text-center shadow-card">
          <Inbox className="h-10 w-10 mx-auto text-muted-foreground" />
          <div className="mt-3 font-semibold">No requests here yet</div>
          <p className="mt-1 text-sm text-muted-foreground">
            Customer inquiries, test drives, financing and contact requests will appear here.
          </p>
          <Link
            to="/cars"
            className="mt-4 inline-block text-sm font-semibold text-primary hover:text-accent"
          >
            Browse cars →
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {filtered.map((o) => (
            <OrderCard key={o.id} order={o} onStatusChange={updateOrderStatus} />
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

function OrderCard({
  order: o,
  onStatusChange,
}: {
  order: Order;
  onStatusChange: (id: string, s: OrderStatus) => Promise<void>;
}) {
  const waDigits = o.phone.replace(/\D/g, "");
  const waHref = waDigits
    ? `https://wa.me/${waDigits}?text=${encodeURIComponent(`Hi ${o.fullName}, thanks for reaching out about the ${o.carTitle}!`)}`
    : undefined;
  const mailHref = `mailto:${o.email}?subject=${encodeURIComponent(`Re: your ${TYPE_LABELS[o.type].toLowerCase()} for ${o.carTitle}`)}`;

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-lg">{o.fullName}</h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full border font-semibold border-border bg-secondary">
              {TYPE_LABELS[o.type]}
            </span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${statusColors[o.status]}`}
            >
              {o.status}
            </span>
          </div>
          <div className="text-sm text-muted-foreground mt-0.5">
            {o.carId ? (
              <>
                Interested in{" "}
                <Link
                  to="/cars/$id"
                  params={{ id: o.carId }}
                  className="text-primary font-medium hover:text-accent"
                >
                  {o.carTitle}
                </Link>
              </>
            ) : (
              <span>General inquiry</span>
            )}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          {new Date(o.createdAt).toLocaleString()}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />{" "}
          <a href={`tel:${o.phone}`} className="hover:text-accent">
            {o.phone}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />{" "}
          <a href={`mailto:${o.email}`} className="hover:text-accent truncate">
            {o.email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" /> {o.city || "—"}
        </div>
      </div>

      {o.notes && (
        <div className="mt-3 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Notes:</span> {o.notes}
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <label className="text-xs font-semibold text-muted-foreground">Status:</label>
        <select
          value={o.status}
          onChange={async (e) => {
            try {
              await onStatusChange(o.id, e.target.value as OrderStatus);
            } catch {
              /* status stays unchanged on failure */
            }
          }}
          className="h-9 px-3 rounded-md bg-background border border-input text-sm"
        >
          <option value="New">New</option>
          <option value="Processing">Processing</option>
          <option value="Contacted">Contacted</option>
          <option value="Closed">Closed / Sold</option>
        </select>

        <div className="ml-auto flex items-center gap-2">
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-[#25D366]/15 text-[#128C4A] dark:text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/25"
            >
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp reply
            </a>
          )}
          <a
            href={mailHref}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-input text-xs font-semibold hover:bg-secondary"
          >
            <Send className="h-3.5 w-3.5" /> Email reply
          </a>
        </div>
      </div>
    </div>
  );
}
