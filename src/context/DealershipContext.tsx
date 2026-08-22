import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase, type CarRow, type OrderRow } from "@/lib/supabase";
import { initialCars, type Car, type CarStatus } from "@/data/initialCars";

export type OrderStatus = "New" | "In Progress" | "Contacted" | "Closed";
export type OrderType = "Purchase" | "Test Drive" | "Financing" | "Price Inquiry" | "Contact";

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
  status: OrderStatus;
  type?: OrderType;
  preferredDate?: string;
  downPayment?: number;
  internalNotes?: string;
  assignedAgent?: string;
  carPrice?: number;
  carImage?: string;
  unread?: boolean;
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-1",
    carId: "3",
    carTitle: "2024 Porsche 911 Carrera S",
    fullName: "سلطان العتيبي",
    phone: "+966501234567",
    email: "sultan.o@gmail.com",
    city: "الرياض",
    notes: "أرغب بحجز موعد لتجربة قيادة السيارة يوم السبت القادم بعد العصر.",
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 mins ago
    status: "New",
    type: "Test Drive",
    preferredDate: "2026-08-26 16:30",
    assignedAgent: "سارة الشمري",
    carPrice: 124500,
    carImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80",
    unread: true,
  },
  {
    id: "ord-2",
    carId: "1",
    carTitle: "2023 Tesla Model S Plaid",
    fullName: "م. فيصل الدوسري",
    phone: "+966555987654",
    email: "faisal.aldosari@corp.sa",
    city: "جدة",
    notes: "طلب عرض سعر تمويلي مع دفعة أولى 30% وفترة سداد 36 شهراً.",
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    status: "In Progress",
    type: "Financing",
    downPayment: 27000,
    internalNotes: "تم إرسال جدول الأقساط الأولي عبر الواتساب في انتظار موافقة البنك.",
    assignedAgent: "سارة الشمري",
    carPrice: 89990,
    carImage: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1600&q=80",
    unread: false,
  },
  {
    id: "ord-3",
    carId: "8",
    carTitle: "2023 Lamborghini Huracán EVO",
    fullName: "عبدالله بن فهد",
    phone: "+966540112233",
    email: "a.fahad@vip-holding.com",
    city: "الدمام",
    notes: "مهتم بالشراء المباشر نقداً، يرجى تزويدي بفيديو فحص تفصيلي للسيارة.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(), // 14 hours ago
    status: "Contacted",
    type: "Purchase",
    internalNotes: "تم الاتصال بالعميل وإرسال تقرير الفحص الكامل والفيديو عالي الدقة.",
    assignedAgent: "أحمد المنصوري",
    carPrice: 239000,
    carImage: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=80",
    unread: false,
  },
  {
    id: "ord-4",
    carId: "5",
    carTitle: "2021 Audi RS6 Avant",
    fullName: "خالد بن عبدالعزيز",
    phone: "+966567890123",
    email: "khaled.k@domain.sa",
    city: "الرياض",
    notes: "تم إتمام عملية الشراء واستلام المركبة بنجاح.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    status: "Closed",
    type: "Purchase",
    internalNotes: "تم تسليم السيارة ونقل الملكية وإصدار الفاتورة الضريبية.",
    assignedAgent: "أحمد المنصوري",
    carPrice: 92900,
    carImage: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&q=80",
    unread: false,
  },
];

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
  updateOrderStatus: (id: string, s: OrderStatus, internalNotes?: string) => Promise<void>;
  markOrderAsRead: (id: string) => void;
  markAllOrdersAsRead: () => void;
  deleteOrder: (id: string) => Promise<void>;
  simulateIncomingLead: () => void;
};

const DealershipContext = createContext<Ctx | null>(null);

const CARS_STORAGE_KEY = "vm_cars_inventory";
const ORDERS_STORAGE_KEY = "vm_orders_inventory";

export function formatPrice(num: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatMiles(num: number): string {
  return `${new Intl.NumberFormat("en-US").format(num)} mi`;
}

function getStoredCars(): Car[] {
  if (typeof window === "undefined") return initialCars;
  try {
    const raw = localStorage.getItem(CARS_STORAGE_KEY);
    if (!raw) return initialCars;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialCars;
  } catch {
    return initialCars;
  }
}

function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return INITIAL_ORDERS;
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return INITIAL_ORDERS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ORDERS;
  } catch {
    return INITIAL_ORDERS;
  }
}

export function DealershipProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Car[]>(getStoredCars);
  const [orders, setOrders] = useState<Order[]>(getStoredOrders);
  const [loadingCars, setLoadingCars] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync to local storage
  const persistCars = useCallback((updated: Car[]) => {
    setCars(updated);
    try {
      localStorage.setItem(CARS_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }, []);

  const persistOrders = useCallback((updated: Order[]) => {
    setOrders(updated);
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }, []);

  const fetchCars = useCallback(async () => {
    setLoadingCars(true);
    try {
      const { data, error: err } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });
      if (!err && data && data.length > 0) {
        // Merge with our richer data
        const mapped = data.map((r: any) => {
          const matched = cars.find((c) => String(c.id) === String(r.id));
          return {
            id: String(r.id),
            title: r.name || r.title || matched?.title || "Vehicle",
            make: r.make || matched?.make || "",
            model: r.model || matched?.model || "",
            year: Number(r.year) || matched?.year || 2024,
            price: Number(r.price) || matched?.price || 50000,
            mileage: Number(r.mileage) || matched?.mileage || 0,
            category: r.category || matched?.category || "Other",
            engine: r.engine || matched?.engine || "",
            transmission: r.transmission || matched?.transmission || "Automatic",
            condition: r.condition || matched?.condition || "Used - Excellent",
            description: r.description || matched?.description || "",
            images: Array.isArray(r.images) && r.images.length > 0 ? r.images : matched?.images || ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80"],
            featured: !!r.featured || matched?.featured,
            status: (r.status as CarStatus) || matched?.status || "Active",
            vin: r.vin || matched?.vin,
            drivetrain: r.drivetrain || matched?.drivetrain,
            horsepower: r.horsepower || matched?.horsepower,
            fuelTankCapacity: r.fuelTankCapacity || matched?.fuelTankCapacity,
            previousOwners: r.previousOwners ?? matched?.previousOwners ?? 1,
            inspectionReport: r.inspectionReport || matched?.inspectionReport,
            warranty: r.warranty || matched?.warranty,
            discount: r.discount ?? matched?.discount ?? 0,
            color: r.color || matched?.color,
            fuel: r.fuel || matched?.fuel,
            cylinders: r.cylinders ?? matched?.cylinders,
          } as Car;
        });
        persistCars(mapped);
      }
    } catch {
      // Keep local state
    } finally {
      setLoadingCars(false);
    }
  }, [cars, persistCars]);

  const fetchOrders = useCallback(async () => {
    setLoadingOrders(true);
    try {
      const { data, error: err } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (!err && data && data.length > 0) {
        const mapped: Order[] = data.map((r: any) => ({
          id: String(r.id),
          carId: String(r.car_id || ""),
          carTitle: r.car_name || "Vehicle",
          fullName: r.customer_name || "Customer",
          phone: r.phone || "",
          email: r.email || "",
          city: r.city || "",
          notes: r.notes || "",
          createdAt: r.created_at || new Date().toISOString(),
          status: (r.status as OrderStatus) || "New",
          type: r.type || "Purchase",
          unread: false,
        }));
        persistOrders(mapped);
      }
    } catch {
      // Keep local
    } finally {
      setLoadingOrders(false);
    }
  }, [persistOrders]);

  const refresh = useCallback(async () => {
    await Promise.all([fetchCars(), fetchOrders()]);
  }, [fetchCars, fetchOrders]);

  const addCar = useCallback(
    async (carData: Omit<Car, "id">) => {
      const newId = `car-${Date.now()}`;
      const newCar: Car = {
        id: newId,
        status: "Active",
        images: carData.images.length > 0 ? carData.images : ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80"],
        ...carData,
      };
      const updated = [newCar, ...cars];
      persistCars(updated);

      try {
        await supabase.from("cars").insert({
          name: newCar.title,
          make: newCar.make,
          model: newCar.model,
          year: newCar.year,
          price: newCar.price,
          mileage: newCar.mileage,
          category: newCar.category,
          engine: newCar.engine,
          transmission: newCar.transmission,
          condition: newCar.condition,
          description: newCar.description,
          images: newCar.images,
          featured: newCar.featured,
        });
      } catch {}
    },
    [cars, persistCars]
  );

  const updateCar = useCallback(
    async (id: string, changes: Partial<Car>) => {
      const updated = cars.map((c) => (c.id === id ? { ...c, ...changes } : c));
      persistCars(updated);

      try {
        await supabase.from("cars").update({
          name: changes.title,
          make: changes.make,
          model: changes.model,
          year: changes.year,
          price: changes.price,
          mileage: changes.mileage,
          category: changes.category,
          engine: changes.engine,
          transmission: changes.transmission,
          condition: changes.condition,
          description: changes.description,
          images: changes.images,
          featured: changes.featured,
        }).eq("id", id);
      } catch {}
    },
    [cars, persistCars]
  );

  const deleteCar = useCallback(
    async (id: string) => {
      const updated = cars.filter((c) => c.id !== id);
      persistCars(updated);

      try {
        await supabase.from("cars").delete().eq("id", id);
      } catch {}
    },
    [cars, persistCars]
  );

  const addOrder = useCallback(
    async (orderData: Omit<Order, "id" | "createdAt" | "status">) => {
      const newId = `ord-${Date.now()}`;
      const car = cars.find((c) => c.id === orderData.carId);
      const newOrder: Order = {
        id: newId,
        createdAt: new Date().toISOString(),
        status: "New",
        unread: true,
        type: orderData.type || "Purchase",
        carPrice: car?.price,
        carImage: car?.images?.[0],
        ...orderData,
      };
      const updated = [newOrder, ...orders];
      persistOrders(updated);

      try {
        await supabase.from("orders").insert({
          car_id: newOrder.carId,
          car_name: newOrder.carTitle,
          customer_name: newOrder.fullName,
          phone: newOrder.phone,
          email: newOrder.email,
          city: newOrder.city,
          notes: newOrder.notes,
          status: newOrder.status,
        });
      } catch {}
    },
    [cars, orders, persistOrders]
  );

  const updateOrderStatus = useCallback(
    async (id: string, status: OrderStatus, internalNotes?: string) => {
      const updated = orders.map((o) => {
        if (o.id === id) {
          return {
            ...o,
            status,
            internalNotes: internalNotes !== undefined ? internalNotes : o.internalNotes,
            unread: false,
          };
        }
        return o;
      });
      persistOrders(updated);

      try {
        await supabase.from("orders").update({ status }).eq("id", id);
      } catch {}
    },
    [orders, persistOrders]
  );

  const markOrderAsRead = useCallback(
    (id: string) => {
      const updated = orders.map((o) => (o.id === id ? { ...o, unread: false } : o));
      persistOrders(updated);
    },
    [orders, persistOrders]
  );

  const markAllOrdersAsRead = useCallback(() => {
    const updated = orders.map((o) => ({ ...o, unread: false }));
    persistOrders(updated);
  }, [orders, persistOrders]);

  const deleteOrder = useCallback(
    async (id: string) => {
      const updated = orders.filter((o) => o.id !== id);
      persistOrders(updated);
    },
    [orders, persistOrders]
  );

  const simulateIncomingLead = useCallback(() => {
    const sampleCars = cars.filter((c) => c.status !== "Draft");
    const randomCar = sampleCars[Math.floor(Math.random() * sampleCars.length)] || cars[0];
    const names = ["عمر السديري", "نورة القحطاني", "سعود الشريف", "محمد بن راشد", "ريم الشامسي", "يوسف المهيري"];
    const types: OrderType[] = ["Test Drive", "Price Inquiry", "Financing", "Purchase", "Contact"];
    const chosenType = types[Math.floor(Math.random() * types.length)];
    const chosenName = names[Math.floor(Math.random() * names.length)];

    const newLead: Order = {
      id: `ord-sim-${Date.now()}`,
      carId: randomCar?.id || "1",
      carTitle: randomCar?.title || "2024 Porsche 911 Carrera S",
      fullName: chosenName,
      phone: `+9665${Math.floor(10000000 + Math.random() * 90000000)}`,
      email: `${chosenName.split(" ")[0].toLowerCase()}@domain.sa`,
      city: "الرياض",
      notes: chosenType === "Test Drive"
        ? "أرغب بتجربة قيادة المركبة في أقرب فرصة ممكنة وتأكيد توفرها."
        : chosenType === "Financing"
        ? "استفسار عن إمكانية تمويل السيارة بدفعة أولى 20% وأقساط ميسرة."
        : "طلب استفسار فوري وتحديد موعد لزيارة صالة العرض لمعاينة السيارة.",
      createdAt: new Date().toISOString(),
      status: "New",
      type: chosenType,
      carPrice: randomCar?.price,
      carImage: randomCar?.images?.[0],
      unread: true,
    };

    persistOrders([newLead, ...orders]);
  }, [cars, orders, persistOrders]);

  return (
    <DealershipContext.Provider
      value={{
        cars,
        orders,
        loadingCars,
        loadingOrders,
        error,
        refresh,
        addCar,
        updateCar,
        deleteCar,
        addOrder,
        updateOrderStatus,
        markOrderAsRead,
        markAllOrdersAsRead,
        deleteOrder,
        simulateIncomingLead,
      }}
    >
      {children}
    </DealershipContext.Provider>
  );
}

export function useDealership() {
  const c = useContext(DealershipContext);
  if (!c) throw new Error("useDealership must be used within DealershipProvider");
  return c;
}
