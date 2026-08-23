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
  /** Visibility / lifecycle state — controls what shows on the public site. */
  status?: CarStatus;
  /** Vehicle history tab: inspection report notes. */
  inspectionReport?: string;
  /** Vehicle history tab: number of previous owners. */
  previousOwners?: number;
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
    description:
      "Fully loaded Model S Plaid with autopilot, premium interior, and glass roof. 0–60 in under 2 seconds.",
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1600&q=80",
      "https://images.unsplash.com/photo-1553260168-69b041873e65?w=1600&q=80",
      "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=1600&q=80",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1600&q=80",
    ],
    featured: true,
    discount: 0,
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
    description:
      "Stunning M4 Competition in Alpine White with carbon fiber accents. Track-ready with 503 HP.",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80",
      "https://images.unsplash.com/photo-1614026480209-cc82b3f1cea3?w=1600&q=80",
      "https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?w=1600&q=80",
    ],
    featured: true,
    discount: 5,
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
    description:
      "Iconic 911 Carrera S with rear-wheel drive and PDK transmission. Pure driving joy.",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80",
      "https://images.unsplash.com/photo-1611821064430-0d40291922d2?w=1600&q=80",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&q=80",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1600&q=80",
    ],
    featured: true,
    discount: 0,
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
    description:
      "Luxury SUV with AMG performance package, panoramic roof, and Burmester sound system.",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1600&q=80",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&q=80",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1600&q=80",
    ],
    featured: false,
    discount: 8,
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
    description:
      "Super-wagon with 590 HP and space for the whole family. The ultimate daily driver.",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&q=80",
      "https://images.unsplash.com/photo-1606152421802-97f1b2c6e8a4?w=1600&q=80",
    ],
    featured: false,
    discount: 0,
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
    description: "Refined luxury SUV with commanding presence and exceptional on-road manners.",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1600&q=80",
      "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=1600&q=80",
    ],
    featured: true,
    discount: 0,
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
    description: "Top-tier Lexus flagship with peerless build quality and whisper-quiet cabin.",
    images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=80"],
    featured: false,
    discount: 3,
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
    description:
      "Naturally aspirated V10 symphony. A modern Italian masterpiece, head-turning on every corner.",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80",
    ],
    featured: true,
    discount: 0,
  },
  {
    id: "9",
    title: "2021 Toyota Camry Hybrid",
    make: "Toyota",
    model: "Camry",
    year: 2021,
    price: 24800,
    mileage: 34200,
    category: "Sedan",
    engine: "2.5L Hybrid I4",
    transmission: "eCVT",
    condition: "Used - Excellent",
    color: "Midnight Black",
    cylinders: 4,
    fuel: "Hybrid",
    description:
      "Bulletproof reliability, exceptional fuel economy, and Toyota's legendary build quality.",
    images: ["https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1600&q=80"],
    featured: false,
    discount: 0,
  },
  {
    id: "10",
    title: "2022 Ford Mustang Mach-E GT",
    make: "Ford",
    model: "Mustang Mach-E",
    year: 2022,
    price: 42900,
    mileage: 16700,
    category: "Electric",
    engine: "Dual Electric Motor",
    transmission: "Single-Speed",
    condition: "Used - Excellent",
    color: "Grabber Blue",
    cylinders: 0,
    fuel: "Electric",
    description:
      "All-electric crossover SUV with stunning acceleration and modern tech throughout.",
    images: ["https://images.unsplash.com/photo-1591293836027-e05b48473b67?w=1600&q=80"],
    featured: false,
    discount: 7,
  },
  {
    id: "11",
    title: "2024 Genesis G90",
    make: "Genesis",
    model: "G90",
    year: 2024,
    price: 84500,
    mileage: 4200,
    category: "Sedan",
    engine: "3.5L Twin-Turbo V6",
    transmission: "8-Speed Automatic",
    condition: "Used - Like New",
    color: "Brunswick Green",
    cylinders: 6,
    fuel: "Petrol",
    description:
      "A benchmark for luxury and refinement at its price point. Hand-stitched Nappa leather throughout.",
    images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=80"],
    featured: false,
    discount: 5,
  },
  {
    id: "12",
    title: "2022 Chevrolet Corvette Z06",
    make: "Chevrolet",
    model: "Corvette",
    year: 2022,
    price: 109900,
    mileage: 7600,
    category: "Coupe",
    engine: "5.5L V8",
    transmission: "8-Speed DCT",
    condition: "Used - Excellent",
    color: "Accelerate Yellow",
    cylinders: 8,
    fuel: "Petrol",
    description:
      "The most powerful naturally aspirated V8 ever installed in a production Corvette.",
    images: ["https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=1600&q=80"],
    featured: false,
    discount: 0,
  },
];

export const CATEGORY_META: Record<string, { icon: string; tone: string }> = {
  Sports: { icon: "🏁", tone: "from-amber-500/30 to-orange-600/20" },
  SUV: { icon: "🚙", tone: "from-emerald-500/30 to-teal-600/20" },
  Sedan: { icon: "🚗", tone: "from-sky-500/30 to-blue-600/20" },
  Coupe: { icon: "🏎️", tone: "from-rose-500/30 to-red-600/20" },
  Electric: { icon: "⚡", tone: "from-violet-500/30 to-indigo-600/20" },
};
