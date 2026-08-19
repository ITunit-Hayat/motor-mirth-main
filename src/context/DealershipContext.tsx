import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase, type CarRow, type OrderRow } from "@/lib/supabase";
import { initialCars, type Car } from "@/data/initialCars";

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
  status: "New" | "Contacted" | "Closed";
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

/* ---------- row <-> app model mappers ---------- */

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
  status: r.status,
});

/**
 * Insert/update a car row. If the live Supabase table is missing an optional
 * column (e.g. `category` / `featured`), PostgREST returns PGRST204 naming the
 * column — we drop it and retry so saving never hard-fails on schema drift.
 */
async function writeCarRow(row: Record<string, unknown>, id?: string): Promise<CarRow> {
  const payload = { ...row };
  for (let attempt = 0; attempt < 5; attempt++) {
    const query = supabase.from("cars");
    const { data, error } = id
      ? await query.update(payload).eq("id", id).select().single()
      : await query.insert(payload).select().single();

    if (!error) return data as CarRow;

    console.error("Supabase cars write failed:", error);

    const missing = error.code === "PGRST204" && error.message.match(/'([^']+)' column/)?.[1];
    if (missing && missing in payload) {
      delete payload[missing];
      continue;
    }
    throw new Error(error.message || "Save failed");
  }
  throw new Error("Save failed: could not match the cars table schema");
}

/* ---------- provider ---------- */

export function DealershipProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingCars, setLoadingCars] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = useCallback(async () => {
    setLoadingCars(true);
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.warn("Supabase cars fetch warning:", error.message);
      } else if (data && data.length > 0) {
        setError(null);
        setCars((data as CarRow[]).map(toCar));
      }
    } catch (e: any) {
      console.warn("Dealership cars load error:", e);
    } finally {
      setLoadingCars(false);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoadingOrders(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setOrders((data as OrderRow[]).map(toOrder));
      }
    } catch (e: any) {
      console.warn("Dealership orders load error:", e);
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
      const data = await writeCarRow(toCarRow(c));
      setCars((prev) => [toCar(data), ...prev]);
    },
    updateCar: async (id, c) => {
      const data = await writeCarRow(toCarRow(c), id);
      setCars((prev) => prev.map((x) => (x.id === id ? toCar(data) : x)));
    },
    deleteCar: async (id) => {
      const { error } = await supabase.from("cars").delete().eq("id", id);
      if (error) throw error;
      setCars((prev) => prev.filter((x) => x.id !== id));
    },
    addOrder: async (o) => {
      const { data, error } = await supabase
        .from("orders")
        .insert({
          car_id: o.carId || null,
          car_name: o.carTitle,
          customer_name: o.fullName,
          phone: o.phone,
          email: o.email,
          city: o.city,
          notes: o.notes,
          status: "New",
        })
        .select()
        .single();
      if (error) throw error;
      setOrders((prev) => [toOrder(data as OrderRow), ...prev]);
    },
    updateOrderStatus: async (id, s) => {
      const { error } = await supabase.from("orders").update({ status: s }).eq("id", id);
      if (error) throw error;
      setOrders((prev) => prev.map((x) => (x.id === id ? { ...x, status: s } : x)));
    },
  };

  return (
    <DealershipContext.Provider value={value}>{children}</DealershipContext.Provider>
  );
}

export function useDealership() {
  const ctx = useContext(DealershipContext);
  if (!ctx) throw new Error("useDealership must be used within DealershipProvider");
  return ctx;
}

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
export const formatMiles = (n: number) =>
  new Intl.NumberFormat("en-US").format(n) + " mi";
