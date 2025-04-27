# CarList-Management

A full-stack web application for managing car inventory, designed for car rental businesses.
Built with Vite + React (TypeScript) for frontend and Express + MongoDB (Mongoose) for backend.

🌟 Features
1.User-friendly Dashboard with modern UI (Ant Design inspired)
2.Add, Edit, Delete car entries
3.Search, Filter, Sort, Pagination
4.Multiple view modes (Card/Grid view & List view)
5.Toast Notifications and Spinners for better UX
6.Error handling (server + client)
7.Animations (smooth fade-ins, bounces, form transitions)
8.Seed data for easy testing
9.Environment based configuration (.env)
10.Responsive and mobile-first design

🏛️ Project Structure

CarList-management/
├── api/                  # Backend
│   ├── controllers/       # Business logic (CRUD operations)
│   ├── models/            # Mongoose models (Car schema)
│   ├── routes/            # API routes (cars API)
|   ├── dtos/              # Validation
│   ├── middlewares/       # Error handlers and utilities
│   ├── seed/              # Database seeding scripts
│   ├── server.js          # Express server setup
│   └── package.json
├── web/                   # Frontend (Vite + React + TS)
│   ├── src/
│   │   ├── components/    # Navbar, Sidebar, Cards, Filters, Forms
│   │   ├── context/       # Global context (filters, pagination, view modes)
│   │   ├── pages/         # Car List, Add Car, Edit Car pages
│   │   ├── api/           # API calls
│   │   ├── lib/           # types
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── README.md
└── .env.example           # Environment variable example


🛠️ System Design
Frontend:
- Vite + React + TypeScript
- UI Libraries: Ant Design, React-Icons, React-Toastify
- State Management: Context API
- Routing: React Router
- Animations: Framer Motion

Backend:
- Node.js + Express
- Database: MongoDB with Mongoose
- API Routes: /api/cars
- Error Handling Middleware
- DTOs (Data Transfer Objects) for validation

Deployment-ready:
- Environment variables for flexible MongoDB URI
- Production build scripts
- Flexible seed data script

🧩 Installation

1. Clone the repository

- git clone https://github.com/your-username/CarList-Management.git
- cd CarList-Management


2. Setup Backend

- cd api
- npm install
- cp .env.example .env
# Edit .env if needed (Mongo URI, port)
- npm run seed  # (Optional) Seed some initial car data
- npm run dev   # Start server with nodemon

3. Setup Frontend

- cd web
- npm install
- npm run dev

4. Access App

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/cars

📦 Environment Variables (.env)

Example .env.example file:

MONGO_URI=mongodb://127.0.0.1:27017/car-management
PORT=8000


🚗 Car Model (Professional Car Information)

Field	            Type	    Required	Description
brand	            String	        ✅	    Car brand (e.g., Toyota)
model	            String	        ✅	    Car model (e.g., Camry)
year	            Number	        ✅	    Manufacture year
color	            String	        ✅	    Color
registrationNumber	String	        ✅	    License plate number
vin	                String	        ✅	    Vehicle Identification Number
mileage	            Number	        ✅	    Mileage in km
fuelType	        String	        ✅	    Fuel type (Petrol, Diesel, EV, Hybrid)
transmission	    String	        ✅	    Transmission type (Auto, Manual)
rentalPricePerDay	Number	        ✅	    Price per day (฿)
availability	    Boolean     	✅	    Availability status
location	        String	        ✅	    Car location
imageUrl	        String	        ❌	    (Optional) Car image URL
notes	            String	        ❌	    (Optional) Notes


🔥 Seed Data
Run this command to populate testing data:

- npm run seed

It will create a few sample cars for testing purposes.


🛡️ Error Handling

- Backend: Centralized error middleware for clean responses.
- Frontend: Toastify notifications for better UX.

🚀 Future Improvements (Optional)

- Authentication (Admin / User roles)
- Image upload with Cloudinary
- Sorting and advanced filtering
- Booking system (for rental)


👨‍💻 Developed By

Nontachai Pahsukkul (Pap)

