export type CarStatus = "Active" | "Draft" | "Reserved" | "Sold";

export type Car = {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  category: string;
  engine: string;
  transmission: string;
  condition: string;
  description: string;
  images: string[];
  featured?: boolean;
  color?: string;
  cylinders?: number;
  fuel?: string;
  discount?: number;
  status?: CarStatus;
  vin?: string;
  drivetrain?: string;
  fuelTankCapacity?: string;
  horsepower?: number;
  previousOwners?: number;
  inspectionReport?: string;
  warranty?: string;
};

export const initialCars: Car[] = [
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
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&q=80",
      "https://images.unsplash.com/photo-1606152421802-97f1b2c6e8a4?w=1600&q=80"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1600&q=80",
      "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=1600&q=80"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=80"
    ],
    featured: false,
    discount: 3
  },
  {
    id: "8",
    title: "2023 Lamborghini Huracán EVO",
    make: "Lamborghini",
    model: "Huracán",
    year: 2023,
    price: 239000,
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
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80"
    ],
    featured: true,
    discount: 0
  },
  {
    id: "9",
    title: "2024 BYD Yangwang U8",
    make: "BYD",
    model: "Yangwang U8",
    year: 2024,
    price: 139000,
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
    images: [
      "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=1600&q=80"
    ],
    featured: false,
    discount: 0
  }
];

export const CATEGORY_META: Record<string, { icon: string; tone: string }> = {
  "Sports": { icon: "🏁", tone: "from-amber-500/30 to-orange-600/20" },
  "SUV": { icon: "🚙", tone: "from-emerald-500/30 to-teal-600/20" },
  "Sedan": { icon: "🚗", tone: "from-sky-500/30 to-blue-600/20" },
  "Coupe": { icon: "🏎️", tone: "from-rose-500/30 to-red-600/20" },
  "Electric": { icon: "⚡", tone: "from-violet-500/30 to-indigo-600/20" },
  "Luxury": { icon: "👑", tone: "from-amber-400/30 to-yellow-600/20" },
  "Truck / Pickup": { icon: "🛻", tone: "from-stone-500/30 to-zinc-600/20" }
};
