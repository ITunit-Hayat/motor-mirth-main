import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DealershipContext-CZIneh0B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var supabase = createClient("https://yzmbqexfzcksihphhqvr.supabase.co", "sb_publishable_Mo3CwdET8kpip01OfGsibw_fvp5yC0r", { auth: {
	persistSession: false,
	autoRefreshToken: false
} });
var initialCars = [
	{
		id: "1",
		title: "2023 Tesla Model S Plaid",
		make: "Tesla",
		model: "Model S",
		year: 2023,
		price: 89990,
		mileage: 8500,
		category: "Electric",
		engine: "Tri-Motor Electric",
		transmission: "Single-Speed",
		condition: "Used - Excellent",
		color: "Pearl White",
		cylinders: 0,
		fuel: "Electric",
		status: "Active",
		vin: "5YJSA1E28PF948201",
		drivetrain: "AWD (All-Wheel Drive)",
		horsepower: 1020,
		fuelTankCapacity: "100 kWh (600 km Range)",
		previousOwners: 1,
		inspectionReport: "اجتاز فحص 200 نقطة الشامل - حالة البطارية 99%",
		warranty: "ضمان الوكالة حتى 2027",
		description: "Fully loaded Model S Plaid with autopilot, premium interior, and glass roof. 0–60 in under 2 seconds.",
		images: [
			"https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1600&q=80",
			"https://images.unsplash.com/photo-1553260168-69b041873e65?w=1600&q=80",
			"https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=1600&q=80",
			"https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1600&q=80"
		],
		featured: true,
		discount: 0
	},
	{
		id: "2",
		title: "2022 BMW M4 Competition",
		make: "BMW",
		model: "M4",
		year: 2022,
		price: 78500,
		mileage: 12400,
		category: "Coupe",
		engine: "3.0L Twin-Turbo I6",
		transmission: "8-Speed Automatic",
		condition: "Used - Like New",
		color: "Alpine White",
		cylinders: 6,
		fuel: "Petrol",
		status: "Active",
		vin: "WBA33AY08NFP12948",
		drivetrain: "RWD (Rear-Wheel Drive)",
		horsepower: 503,
		fuelTankCapacity: "59 Liters",
		previousOwners: 1,
		inspectionReport: "فحص وكالة كامل - خالي من الحوادث والرشوش",
		warranty: "ضمان ممتد سنتين",
		description: "Stunning M4 Competition in Alpine White with carbon fiber accents. Track-ready with 503 HP.",
		images: [
			"https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80",
			"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80",
			"https://images.unsplash.com/photo-1614026480209-cc82b3f1cea3?w=1600&q=80",
			"https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?w=1600&q=80"
		],
		featured: true,
		discount: 5
	},
	{
		id: "3",
		title: "2024 Porsche 911 Carrera S",
		make: "Porsche",
		model: "911",
		year: 2024,
		price: 124500,
		mileage: 3200,
		category: "Sports",
		engine: "3.0L Twin-Turbo Flat-6",
		transmission: "PDK",
		condition: "Used - Like New",
		color: "Guards Red",
		cylinders: 6,
		fuel: "Petrol",
		status: "Reserved",
		vin: "WP0AB2A97NS240192",
		drivetrain: "RWD (Rear-Wheel Drive)",
		horsepower: 443,
		fuelTankCapacity: "64 Liters",
		previousOwners: 1,
		inspectionReport: "فحص بورش المعتمد - بحالة المصنع تماماً",
		warranty: "ضمان المصنع الدولي",
		description: "Iconic 911 Carrera S with rear-wheel drive and PDK transmission. Pure driving joy.",
		images: [
			"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80",
			"https://images.unsplash.com/photo-1611821064430-0d40291922d2?w=1600&q=80",
			"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&q=80",
			"https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1600&q=80"
		],
		featured: true,
		discount: 0
	},
	{
		id: "4",
		title: "2023 Mercedes-Benz GLE 53 AMG",
		make: "Mercedes-Benz",
		model: "GLE",
		year: 2023,
		price: 68900,
		mileage: 18900,
		category: "SUV",
		engine: "3.0L Inline-6 Turbo + EQ Boost",
		transmission: "9-Speed Automatic",
		condition: "Used - Excellent",
		color: "Obsidian Black",
		cylinders: 6,
		fuel: "Petrol",
		status: "Active",
		vin: "4JGFB4FB9PB498210",
		drivetrain: "AWD (All-Wheel Drive)",
		horsepower: 429,
		fuelTankCapacity: "85 Liters",
		previousOwners: 1,
		inspectionReport: "فحص الجفالي - صيانة دورية منتظمة",
		warranty: "ضمان وكالة سنة كاملة",
		description: "Luxury SUV with AMG performance package, panoramic roof, and Burmester sound system.",
		images: [
			"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1600&q=80",
			"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&q=80",
			"https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1600&q=80"
		],
		featured: false,
		discount: 8
	},
	{
		id: "5",
		title: "2021 Audi RS6 Avant",
		make: "Audi",
		model: "RS6",
		year: 2021,
		price: 92900,
		mileage: 21500,
		category: "Sedan",
		engine: "4.0L Twin-Turbo V8",
		transmission: "8-Speed Automatic",
		condition: "Used - Excellent",
		color: "Nardo Grey",
		cylinders: 8,
		fuel: "Petrol",
		status: "Sold",
		vin: "WAUZZZF27MN019482",
		drivetrain: "AWD (All-Wheel Drive)",
		horsepower: 591,
		fuelTankCapacity: "73 Liters",
		previousOwners: 1,
		inspectionReport: "فحص شامل ممتاز - تم البيع للعميل",
		warranty: "ضمان منتهي",
		description: "Super-wagon with 590 HP and space for the whole family. The ultimate daily driver.",
		images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&q=80", "https://images.unsplash.com/photo-1606152421802-97f1b2c6e8a4?w=1600&q=80"],
		featured: false,
		discount: 0
	},
	{
		id: "6",
		title: "2024 Range Rover Sport",
		make: "Land Rover",
		model: "Range Rover Sport",
		year: 2024,
		price: 95900,
		mileage: 5400,
		category: "SUV",
		engine: "3.0L Inline-6 Turbo",
		transmission: "8-Speed Automatic",
		condition: "Used - Like New",
		color: "Santorini Black",
		cylinders: 6,
		fuel: "Petrol",
		status: "Active",
		vin: "SALWR2V45RA819201",
		drivetrain: "4WD (Four-Wheel Drive)",
		horsepower: 395,
		fuelTankCapacity: "90 Liters",
		previousOwners: 1,
		inspectionReport: "فحص شامل بدون أي ملاحظات - تحت الضمان",
		warranty: "ضمان الوكالة حتى 2028",
		description: "Refined luxury SUV with commanding presence and exceptional on-road manners.",
		images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1600&q=80", "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=1600&q=80"],
		featured: true,
		discount: 0
	},
	{
		id: "7",
		title: "2022 Lexus LX 600",
		make: "Lexus",
		model: "LX",
		year: 2022,
		price: 88500,
		mileage: 14200,
		category: "SUV",
		engine: "3.5L Twin-Turbo V6",
		transmission: "10-Speed Automatic",
		condition: "Used - Excellent",
		color: "Atomic Silver",
		cylinders: 6,
		fuel: "Petrol",
		status: "Active",
		vin: "JTJHY7AX8N4029182",
		drivetrain: "4WD (Four-Wheel Drive)",
		horsepower: 409,
		fuelTankCapacity: "110 Liters",
		previousOwners: 1,
		inspectionReport: "سجل صيانة تويوتا/لكزس منتظم بالكامل",
		warranty: "ضمان 3 سنوات متبقي",
		description: "Top-tier Lexus flagship with peerless build quality and whisper-quiet cabin.",
		images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=80"],
		featured: false,
		discount: 3
	},
	{
		id: "8",
		title: "2023 Lamborghini Huracán EVO",
		make: "Lamborghini",
		model: "Huracán",
		year: 2023,
		price: 239e3,
		mileage: 2800,
		category: "Sports",
		engine: "5.2L V10",
		transmission: "7-Speed DCT",
		condition: "Used - Like New",
		color: "Verde Mantis",
		cylinders: 10,
		fuel: "Petrol",
		status: "Active",
		vin: "ZHWUC1ZF5PLA09182",
		drivetrain: "AWD (All-Wheel Drive)",
		horsepower: 631,
		fuelTankCapacity: "83 Liters",
		previousOwners: 1,
		inspectionReport: "فحص مصنع لامبورغيني المعتمد - حماية PPF كاملة",
		warranty: "ضمان المصنع 2026",
		description: "Naturally aspirated V10 symphony. A modern Italian masterpiece, head-turning on every corner.",
		images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=80", "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80"],
		featured: true,
		discount: 0
	},
	{
		id: "9",
		title: "2024 BYD Yangwang U8",
		make: "BYD",
		model: "Yangwang U8",
		year: 2024,
		price: 139e3,
		mileage: 1200,
		category: "SUV",
		engine: "Quad-Motor Electric + Range Extender",
		transmission: "Single-Speed",
		condition: "Brand New (0 km)",
		color: "Santorini Black",
		cylinders: 4,
		fuel: "Plug-in Hybrid (PHEV)",
		status: "Draft",
		vin: "LGXC9A108R1982736",
		drivetrain: "4WD (Four-Wheel Drive)",
		horsepower: 1180,
		fuelTankCapacity: "75 Liters + 49 kWh Battery",
		previousOwners: 0,
		inspectionReport: "سيارة جديدة بالكرتون - جاهزة للتسليم",
		warranty: "ضمان 8 سنوات للبطارية والمحركات",
		description: "Ultra-luxury amphibious off-roader with 1,180 HP, 360-degree tank turn capability and yacht-grade interior.",
		images: ["https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=1600&q=80"],
		featured: false,
		discount: 0
	}
];
var CATEGORY_META = {
	"Sports": {
		icon: "🏁",
		tone: "from-amber-500/30 to-orange-600/20"
	},
	"SUV": {
		icon: "🚙",
		tone: "from-emerald-500/30 to-teal-600/20"
	},
	"Sedan": {
		icon: "🚗",
		tone: "from-sky-500/30 to-blue-600/20"
	},
	"Coupe": {
		icon: "🏎️",
		tone: "from-rose-500/30 to-red-600/20"
	},
	"Electric": {
		icon: "⚡",
		tone: "from-violet-500/30 to-indigo-600/20"
	},
	"Luxury": {
		icon: "👑",
		tone: "from-amber-400/30 to-yellow-600/20"
	},
	"Truck / Pickup": {
		icon: "🛻",
		tone: "from-stone-500/30 to-zinc-600/20"
	}
};
var _jsxFileName = "/app/applet/src/context/DealershipContext.tsx";
var INITIAL_ORDERS = [
	{
		id: "ord-1",
		carId: "3",
		carTitle: "2024 Porsche 911 Carrera S",
		fullName: "سلطان العتيبي",
		phone: "+966501234567",
		email: "sultan.o@gmail.com",
		city: "الرياض",
		notes: "أرغب بحجز موعد لتجربة قيادة السيارة يوم السبت القادم بعد العصر.",
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 1e3 * 60 * 35)).toISOString(),
		status: "New",
		type: "Test Drive",
		preferredDate: "2026-08-26 16:30",
		assignedAgent: "سارة الشمري",
		carPrice: 124500,
		carImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80",
		unread: true
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
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 1e3 * 60 * 180)).toISOString(),
		status: "In Progress",
		type: "Financing",
		downPayment: 27e3,
		internalNotes: "تم إرسال جدول الأقساط الأولي عبر الواتساب في انتظار موافقة البنك.",
		assignedAgent: "سارة الشمري",
		carPrice: 89990,
		carImage: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1600&q=80",
		unread: false
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
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 1e3 * 60 * 60 * 14)).toISOString(),
		status: "Contacted",
		type: "Purchase",
		internalNotes: "تم الاتصال بالعميل وإرسال تقرير الفحص الكامل والفيديو عالي الدقة.",
		assignedAgent: "أحمد المنصوري",
		carPrice: 239e3,
		carImage: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=80",
		unread: false
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
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 1e3 * 60 * 60 * 48)).toISOString(),
		status: "Closed",
		type: "Purchase",
		internalNotes: "تم تسليم السيارة ونقل الملكية وإصدار الفاتورة الضريبية.",
		assignedAgent: "أحمد المنصوري",
		carPrice: 92900,
		carImage: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&q=80",
		unread: false
	}
];
var DealershipContext = (0, import_react.createContext)(null);
var CARS_STORAGE_KEY = "vm_cars_inventory";
var ORDERS_STORAGE_KEY = "vm_orders_inventory";
function formatPrice(num) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(num);
}
function formatMiles(num) {
	return `${new Intl.NumberFormat("en-US").format(num)} mi`;
}
function getStoredCars() {
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
function getStoredOrders() {
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
function DealershipProvider({ children }) {
	const [cars, setCars] = (0, import_react.useState)(getStoredCars);
	const [orders, setOrders] = (0, import_react.useState)(getStoredOrders);
	const [loadingCars, setLoadingCars] = (0, import_react.useState)(false);
	const [loadingOrders, setLoadingOrders] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const persistCars = (0, import_react.useCallback)((updated) => {
		setCars(updated);
		try {
			localStorage.setItem(CARS_STORAGE_KEY, JSON.stringify(updated));
		} catch {}
	}, []);
	const persistOrders = (0, import_react.useCallback)((updated) => {
		setOrders(updated);
		try {
			localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
		} catch {}
	}, []);
	const fetchCars = (0, import_react.useCallback)(async () => {
		setLoadingCars(true);
		try {
			const { data, error: err } = await supabase.from("cars").select("*").order("created_at", { ascending: false });
			if (!err && data && data.length > 0) persistCars(data.map((r) => {
				const matched = cars.find((c) => String(c.id) === String(r.id));
				return {
					id: String(r.id),
					title: r.name || r.title || matched?.title || "Vehicle",
					make: r.make || matched?.make || "",
					model: r.model || matched?.model || "",
					year: Number(r.year) || matched?.year || 2024,
					price: Number(r.price) || matched?.price || 5e4,
					mileage: Number(r.mileage) || matched?.mileage || 0,
					category: r.category || matched?.category || "Other",
					engine: r.engine || matched?.engine || "",
					transmission: r.transmission || matched?.transmission || "Automatic",
					condition: r.condition || matched?.condition || "Used - Excellent",
					description: r.description || matched?.description || "",
					images: Array.isArray(r.images) && r.images.length > 0 ? r.images : matched?.images || ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80"],
					featured: !!r.featured || matched?.featured,
					status: r.status || matched?.status || "Active",
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
					cylinders: r.cylinders ?? matched?.cylinders
				};
			}));
		} catch {} finally {
			setLoadingCars(false);
		}
	}, [cars, persistCars]);
	const fetchOrders = (0, import_react.useCallback)(async () => {
		setLoadingOrders(true);
		try {
			const { data, error: err } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
			if (!err && data && data.length > 0) persistOrders(data.map((r) => ({
				id: String(r.id),
				carId: String(r.car_id || ""),
				carTitle: r.car_name || "Vehicle",
				fullName: r.customer_name || "Customer",
				phone: r.phone || "",
				email: r.email || "",
				city: r.city || "",
				notes: r.notes || "",
				createdAt: r.created_at || (/* @__PURE__ */ new Date()).toISOString(),
				status: r.status || "New",
				type: r.type || "Purchase",
				unread: false
			})));
		} catch {} finally {
			setLoadingOrders(false);
		}
	}, [persistOrders]);
	const refresh = (0, import_react.useCallback)(async () => {
		await Promise.all([fetchCars(), fetchOrders()]);
	}, [fetchCars, fetchOrders]);
	const addCar = (0, import_react.useCallback)(async (carData) => {
		const newCar = {
			id: `car-${Date.now()}`,
			status: "Active",
			images: carData.images.length > 0 ? carData.images : ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80"],
			...carData
		};
		persistCars([newCar, ...cars]);
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
				featured: newCar.featured
			});
		} catch {}
	}, [cars, persistCars]);
	const updateCar = (0, import_react.useCallback)(async (id, changes) => {
		persistCars(cars.map((c) => c.id === id ? {
			...c,
			...changes
		} : c));
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
				featured: changes.featured
			}).eq("id", id);
		} catch {}
	}, [cars, persistCars]);
	const deleteCar = (0, import_react.useCallback)(async (id) => {
		persistCars(cars.filter((c) => c.id !== id));
		try {
			await supabase.from("cars").delete().eq("id", id);
		} catch {}
	}, [cars, persistCars]);
	const addOrder = (0, import_react.useCallback)(async (orderData) => {
		const newId = `ord-${Date.now()}`;
		const car = cars.find((c) => c.id === orderData.carId);
		const newOrder = {
			id: newId,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			status: "New",
			unread: true,
			type: orderData.type || "Purchase",
			carPrice: car?.price,
			carImage: car?.images?.[0],
			...orderData
		};
		persistOrders([newOrder, ...orders]);
		try {
			await supabase.from("orders").insert({
				car_id: newOrder.carId,
				car_name: newOrder.carTitle,
				customer_name: newOrder.fullName,
				phone: newOrder.phone,
				email: newOrder.email,
				city: newOrder.city,
				notes: newOrder.notes,
				status: newOrder.status
			});
		} catch {}
	}, [
		cars,
		orders,
		persistOrders
	]);
	const updateOrderStatus = (0, import_react.useCallback)(async (id, status, internalNotes) => {
		persistOrders(orders.map((o) => {
			if (o.id === id) return {
				...o,
				status,
				internalNotes: internalNotes !== void 0 ? internalNotes : o.internalNotes,
				unread: false
			};
			return o;
		}));
		try {
			await supabase.from("orders").update({ status }).eq("id", id);
		} catch {}
	}, [orders, persistOrders]);
	const markOrderAsRead = (0, import_react.useCallback)((id) => {
		persistOrders(orders.map((o) => o.id === id ? {
			...o,
			unread: false
		} : o));
	}, [orders, persistOrders]);
	const markAllOrdersAsRead = (0, import_react.useCallback)(() => {
		persistOrders(orders.map((o) => ({
			...o,
			unread: false
		})));
	}, [orders, persistOrders]);
	const deleteOrder = (0, import_react.useCallback)(async (id) => {
		persistOrders(orders.filter((o) => o.id !== id));
	}, [orders, persistOrders]);
	const simulateIncomingLead = (0, import_react.useCallback)(() => {
		const sampleCars = cars.filter((c) => c.status !== "Draft");
		const randomCar = sampleCars[Math.floor(Math.random() * sampleCars.length)] || cars[0];
		const names = [
			"عمر السديري",
			"نورة القحطاني",
			"سعود الشريف",
			"محمد بن راشد",
			"ريم الشامسي",
			"يوسف المهيري"
		];
		const types = [
			"Test Drive",
			"Price Inquiry",
			"Financing",
			"Purchase",
			"Contact"
		];
		const chosenType = types[Math.floor(Math.random() * types.length)];
		const chosenName = names[Math.floor(Math.random() * names.length)];
		persistOrders([{
			id: `ord-sim-${Date.now()}`,
			carId: randomCar?.id || "1",
			carTitle: randomCar?.title || "2024 Porsche 911 Carrera S",
			fullName: chosenName,
			phone: `+9665${Math.floor(1e7 + Math.random() * 9e7)}`,
			email: `${chosenName.split(" ")[0].toLowerCase()}@domain.sa`,
			city: "الرياض",
			notes: chosenType === "Test Drive" ? "أرغب بتجربة قيادة المركبة في أقرب فرصة ممكنة وتأكيد توفرها." : chosenType === "Financing" ? "استفسار عن إمكانية تمويل السيارة بدفعة أولى 20% وأقساط ميسرة." : "طلب استفسار فوري وتحديد موعد لزيارة صالة العرض لمعاينة السيارة.",
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			status: "New",
			type: chosenType,
			carPrice: randomCar?.price,
			carImage: randomCar?.images?.[0],
			unread: true
		}, ...orders]);
	}, [
		cars,
		orders,
		persistOrders
	]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DealershipContext.Provider, {
		value: {
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
			simulateIncomingLead
		},
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 457,
		columnNumber: 5
	}, this);
}
function useDealership() {
	const c = (0, import_react.useContext)(DealershipContext);
	if (!c) throw new Error("useDealership must be used within DealershipProvider");
	return c;
}
//#endregion
export { useDealership as a, formatPrice as i, DealershipProvider as n, formatMiles as r, CATEGORY_META as t };
