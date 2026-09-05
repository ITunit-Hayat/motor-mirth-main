import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  supabase,
  isSupabaseConfigured,
  type CarRow,
  type OrderRow,
  type OrderType,
  type OrderStatus,
} from "@/lib/supabase";
import { initialCars, type Car } from "@/data/initialCars";

export type { OrderType, OrderStatus };

export type Order = {
  id: string;
  carId: string;
  carTitle: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  notes: string;
  createdAt: string;
  /** Which kind of request this is — drives the inbox filters and workflow. */
  type: OrderType;
  status: OrderStatus;
};

type Ctx = {
  cars: Car[];
  orders: Order[];
  loadingCars: boolean;
  loadingOrders: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addCar: (c: Omit<Car, "id">) => Promise<void>;
  updateCar: (id: string, c: Partial<Car>) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;
  addOrder: (o: Omit<Order, "id" | "createdAt" | "status">) => Promise<void>;
  updateOrderStatus: (id: string, s: Order["status"]) => Promise<void>;
};

const DealershipContext = createContext<Ctx | null>(null);

const toCar = (r: CarRow): Car => ({
  id: String(r.id),
  title: r.name,
  make: r.make,
  model: r.model ?? "",
  year: r.year,
  price: Number(r.price),
  mileage: r.mileage ?? 0,
  category: r.category ?? "Other",
  engine: r.engine ?? "",
  transmission: r.transmission ?? "",
  condition: r.condition ?? "",
  description: r.description ?? "",
  images: r.images ?? [],
  featured: !!r.featured,
  status: r.status ?? "Active",
  inspectionReport: r.inspection_report ?? "",
  previousOwners: r.previous_owners ?? 0,
  sellerId: r.seller_id ?? undefined,
  sellerName: r.seller_name ?? undefined,
  sellerPhone: r.seller_phone ?? undefined,
  wilaya: r.wilaya ?? undefined,
  commune: r.commune ?? undefined,
});

const toCarRow = (c: Partial<Car>) => {
  const row: Record<string, unknown> = {};
  if (c.title !== undefined) row.name = c.title;
  if (c.make !== undefined) row.make = c.make;
  if (c.model !== undefined) row.model = c.model;
  if (c.year !== undefined) row.year = c.year;
  if (c.price !== undefined) row.price = c.price;
  if (c.mileage !== undefined) row.mileage = c.mileage;
  if (c.category !== undefined) row.category = c.category;
  if (c.engine !== undefined) row.engine = c.engine;
  if (c.transmission !== undefined) row.transmission = c.transmission;
  if (c.condition !== undefined) row.condition = c.condition;
  if (c.description !== undefined) row.description = c.description;
  if (c.images !== undefined) row.images = c.images;
  if (c.featured !== undefined) row.featured = c.featured;
  if (c.status !== undefined) row.status = c.status;
  if (c.inspectionReport !== undefined)
    row.inspection_report = c.inspectionReport;
  if (c.previousOwners !== undefined) row.previous_owners = c.previousOwners;
  if (c.sellerId !== undefined) row.seller_id = c.sellerId;
  if (c.sellerName !== undefined) row.seller_name = c.sellerName;
  if (c.sellerPhone !== undefined) row.seller_phone = c.sellerPhone;
  if (c.wilaya !== undefined) row.wilaya = c.wilaya;
  if (c.commune !== undefined) row.commune = c.commune;
  return row;
};

const toOrder = (r: OrderRow): Order => ({
  id: r.id,
  carId: r.car_id ?? "",
  carTitle: r.car_name,
  fullName: r.customer_name,
  phone: r.phone,
  email: r.email,
  city: r.city ?? "",
  notes: r.notes ?? "",
  createdAt: r.created_at,
  type: r.type ?? "Purchase",
  status: r.status ?? "New",
});

/**
 * Insert/update a car row. If the live table hasn't had a newer column
 * migrated in yet, drop it and retry so the admin panel never hard-fails on
 * schema drift.
 */
async function writeCarRow(
  mode: "insert" | "update",
  row: Record<string, unknown>,
  id?: string,
): Promise<CarRow> {
  if (!isSupabaseConfigured) {
    throw new Error(
      "قاعدة بيانات Supabase غير متصلة. يرجى إضافة مفاتيح VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY في Vercel.",
    );
  }
  const payload = { ...row };
  for (let attempt = 0; attempt < 8; attempt++) {
    const query =
      mode === "insert"
        ? supabase.from("cars").insert(payload).select().single()
        : supabase.from("cars").update(payload).eq("id", id).select().single();
    const { data, error } = await query;
    if (!error) return data as CarRow;

    console.error("Supabase cars write failed:", error);
    const missing =
      error.code === "PGRST204" && error.message.match(/'([^']+)' column/)?.[1];
    if (missing && missing in payload) {
      delete payload[missing];
      continue;
    }
    throw new Error(error.message || "Save failed");
  }
  throw new Error("Save failed: could not match the cars table schema");
}

/**
 * Insert an order row. Mirrors writeCarRow: if the live table hasn't had the
 * newer columns (e.g. `type`) migrated in yet, drop them and retry so the
 * public inquiry/contact forms never hard-fail on schema drift.
 */
async function writeOrderRow(row: Record<string, unknown>): Promise<OrderRow> {
  if (!isSupabaseConfigured) {
    throw new Error(
      "تعذّر إرسال الطلب: يرجى إضافة مفاتيح Supabase في لوحة Vercel.",
    );
  }
  const payload = { ...row };
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data, error } = await supabase
      .from("orders")
      .insert(payload)
      .select()
      .single();
    if (!error) return data as OrderRow;

    console.error("Supabase orders write failed:", error);

    const missing =
      error.code === "PGRST204" && error.message.match(/'([^']+)' column/)?.[1];
    if (missing && missing in payload) {
      delete payload[missing];
      continue;
    }
    throw new Error(error.message || "Send failed");
  }
  throw new Error("Send failed: could not match the orders table schema");
}

/* ---------- provider ---------- */

export function DealershipProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = useCallback(async () => {
    setLoadingCars(true);
    if (!isSupabaseConfigured) {
      setLoadingCars(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setError(null);
      if (data && data.length > 0) {
        setCars((data as CarRow[]).map(toCar));
      }
    } catch (e) {
      console.warn("Cars load error:", e);
    } finally {
      setLoadingCars(false);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoadingOrders(true);
    if (!isSupabaseConfigured) {
      setLoadingOrders(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      if (data) {
        setOrders((data as OrderRow[]).map(toOrder));
      }
    } catch (e) {
      console.warn("Orders load error:", e);
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await Promise.allSettled([fetchCars(), fetchOrders()]);
  }, [fetchCars, fetchOrders]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value: Ctx = {
    cars,
    orders,
    loadingCars,
    loadingOrders,
    error,
    refresh,
    addCar: async (c) => {
      const row = await writeCarRow("insert", toCarRow(c));
      setCars((prev) => [toCar(row), ...prev]);
    },
    updateCar: async (id, c) => {
      const row = await writeCarRow("update", toCarRow(c), id);
      setCars((prev) => prev.map((x) => (x.id === id ? toCar(row) : x)));
    },
    deleteCar: async (id) => {
      const { error } = await supabase.from("cars").delete().eq("id", id);
      if (error) throw error;
      setCars((prev) => prev.filter((x) => x.id !== id));
    },
    addOrder: async (o) => {
      const data = await writeOrderRow({
        car_id: o.carId || null,
        car_name: o.carTitle,
        customer_name: o.fullName,
        phone: o.phone,
        email: o.email,
        city: o.city,
        notes: o.notes,
        type: o.type,
        status: "New",
      });
      setOrders((prev) => [toOrder(data), ...prev]);
    },
    updateOrderStatus: async (id, s) => {
      const { error } = await supabase
        .from("orders")
        .update({ status: s })
        .eq("id", id);
      if (error) throw error;
      setOrders((prev) =>
        prev.map((x) => (x.id === id ? { ...x, status: s } : x)),
      );
    },
  };

  return (
    <DealershipContext.Provider value={value}>
      {children}
    </DealershipContext.Provider>
  );
}

export function useDealership() {
  const ctx = useContext(DealershipContext);
  if (!ctx)
    throw new Error("useDealership must be used within DealershipProvider");
  return ctx;
}

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("ar-DZ", {
    style: "currency",
    currency: "DZD",
    maximumFractionDigits: 0,
  }).format(n);
/** Name kept as formatMiles for compatibility with existing call sites — now renders km, Algeria's unit. */
export const formatMiles = (n: number) =>
  new Intl.NumberFormat("ar-DZ").format(n) + " كم";
