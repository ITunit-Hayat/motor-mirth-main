# Auto Showcase Hub

Act as a Senior React Developer. Build a modern, fully responsive Car Dealership Web Application using React.js (Vite setup preferred) and Tailwind CSS. The design should be clean, fast, and optimized for smooth user experience.

### 🛠️ Tech Stack & Libraries Required:

- Framework: React (with React Router DOM for page navigation)

- Styling: Tailwind CSS

- Icons: Lucide React or FontAwesome

- Carousel/Slider: Swiper.js or Framer Motion for car image galleries

---

### 🌐 1. Public Facing Website:

1. **Home Page (`/`):**

   - Hero section with a strong call-to-action button ("Browse Cars").

   - "Featured Cars" grid showcasing top inventory.

   - "Why Choose Us" features/benefits section.

2. **Cars Listing Page (`/cars`):**

   - Grid layout of available vehicles (Main Image, Name, Price, Year, Mileage, "View Details" button).

   - Filter bar (Filter by Price range, Brand/Make, or Category).

3. **Car Details Page (`/cars/:id`):**

   - **Interactive Image Slider:** Multiple car photo uploads with Left/Right navigation arrows and clickable thumbnail previews below the main image.

   - **Full Specifications:** Price, Mileage, Engine type, Transmission, Condition, Detailed Description.

   - **Customer Inquiry / Order Form:**

     - Fields: Full Name, Phone Number, Email, City, Additional Notes.

     - On submission: Stores customer details along with the specific `carId` to the Admin Dashboard state/database and displays a success confirmation message.

4. **About Us Page (`/about`):**

   - Showroom story, mission statement, and statistics.

5. **Contact Us Page (`/contact`):**

   - Contact form (Name, Email, Message).

   - Direct details (Phone, Address, Interactive Map placeholder, Social Links).

---

### 🛡️ 2. Admin Dashboard (`/admin`):

Include a clean Sidebar for navigation between these management pages:

1. **Manage Cars / Inventory (`/admin/cars`):**

   - Table/Grid listing all cars with actions to Edit or Delete.

   - **"Add New Car" Form:**

     - Car Title, Make, Model, Year, Price, Specs.

     - Multiple image upload input or image URL array handling.

2. **Manage Customer Orders / Leads (`/admin/orders`):**

   - Table displaying all customer requests submitted from the Car Details page.

   - Show complete customer info: Customer Name, Phone, Email, Selected Car details, Request Date, and Order Status (e.g., New, Contacted, Closed).

---

### 🎨 Design & Code Requirements:

- Use placeholder high-quality car images (e.g., Unsplash URLs).

- Maintain a clean folder structure (`/src/components`, `/src/pages`, `/src/context` or `/src/data`).

- Use React Context API or LocalStorage to handle state management (adding cars, submitting orders) so the app works interactively out of the box.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ce3795c1-d927-4ed2-b796-1465b2f758d7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
