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
    description:
      "Fully loaded Model S Plaid with autopilot, premium interior, and glass roof. 0-60 in under 2 seconds.",
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1600&q=80",
      "https://images.unsplash.com/photo-1553260168-69b041873e65?w=1600&q=80",
      "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=1600&q=80",
    ],
    featured: true,
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
    description:
      "Stunning M4 Competition in Alpine White with carbon fiber accents. Track-ready with 503 HP.",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80",
      "https://images.unsplash.com/photo-1614026480209-cc82b3f1cea3?w=1600&q=80",
    ],
    featured: true,
  },
  {
    id: "3",
    title: "2024 Porsche 911 Carrera",
    make: "Porsche",
    model: "911",
    year: 2024,
    price: 124500,
    mileage: 2100,
    category: "Sports",
    engine: "3.0L Twin-Turbo Flat-6",
    transmission: "8-Speed PDK",
    condition: "New",
    description:
      "Iconic 911 Carrera with Sport Chrono package. Guards Red exterior, black leather interior.",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=1600&q=80",
      "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?w=1600&q=80",
    ],
    featured: true,
  },
  {
    id: "4",
    title: "2021 Range Rover Sport",
    make: "Land Rover",
    model: "Range Rover Sport",
    year: 2021,
    price: 62000,
    mileage: 24800,
    category: "SUV",
    engine: "3.0L Supercharged V6",
    transmission: "8-Speed Automatic",
    condition: "Used - Excellent",
    description:
      "Luxurious Range Rover Sport with panoramic roof, meridian sound, and adaptive suspension.",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1600&q=80",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&q=80",
    ],
    featured: true,
  },
  {
    id: "5",
    title: "2023 Audi RS7 Sportback",
    make: "Audi",
    model: "RS7",
    year: 2023,
    price: 118000,
    mileage: 5600,
    category: "Sedan",
    engine: "4.0L Twin-Turbo V8",
    transmission: "8-Speed Tiptronic",
    condition: "Used - Like New",
    description:
      "RS7 Sportback in Nardo Grey. 591 HP, quattro AWD, carbon ceramic brakes.",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&q=80",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1600&q=80",
    ],
  },
  {
    id: "6",
    title: "2022 Mercedes-Benz G63 AMG",
    make: "Mercedes-Benz",
    model: "G63",
    year: 2022,
    price: 189500,
    mileage: 9800,
    category: "SUV",
    engine: "4.0L Twin-Turbo V8",
    transmission: "9-Speed Automatic",
    condition: "Used - Excellent",
    description:
      "Iconic G-Wagon AMG. Obsidian Black, red interior, all the toys. A true statement piece.",
    images: [
      "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=1600&q=80",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1600&q=80",
    ],
  },
];
