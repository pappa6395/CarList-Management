# CarList-Management

A full-stack web application for managing car inventory, designed for car rental businesses.
Built with Vite + React (TypeScript) for frontend and Express + MongoDB (Mongoose) for backend.

DEMO Website: https://carlistmanageapp.netlify.app/

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

![Project Structure](./web/public/project%20structure.png)

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

![Sysmtem Design](./web/public/system%20design.png)

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

![Car Model](./web//public/Carlist%20model.png)

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

![Diagram Summary](./web//public/summary%20diagram.png)

👨‍💻 Developed By

Nontachai Pahsukkul (Pap)

