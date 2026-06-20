📌 Project Overview

StockPilot is a full-stack Inventory Management System designed to help businesses efficiently manage products, categories, suppliers, orders, and users. The system provides a centralized dashboard for tracking inventory, monitoring stock levels, and managing business operations.

The application features secure authentication, role-based access control, real-time inventory updates, and an intuitive user interface for streamlined inventory management.

🚀 Features
Authentication & Authorization
User Registration and Login
JWT-Based Authentication
Protected Routes
Role-Based Access Control (Admin/User)
Dashboard
Overview of Total Products
Total Categories
Total Suppliers
Total Orders
Inventory Statistics
Product Management
Add New Products
Edit Product Details
Delete Products
Search Products
Track Product Quantity and Price
Category Management
Create Categories
Update Categories
Delete Categories
View All Categories
Supplier Management
Add Suppliers
Edit Supplier Information
Delete Suppliers
Supplier Status Management
Order Management
Create Orders
View Order History
Update Order Status
Track Inventory Movement
User Management
Manage Users
Assign Roles
User Profile Management
🛠️ Tech Stack
Frontend
React.js
React Router DOM
Axios
Tailwind CSS
React Icons
Backend
Node.js
Express.js
Database
MongoDB
Mongoose
Authentication
JSON Web Token (JWT)
bcrypt.js

📂 Project Structure ---

StockPilot/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md



⚙️ Installation

1. Clone Repository
git clone https://github.com/your-username/stockmaster.git
cd stockmaster
2. Install Backend Dependencies
cd backend
npm install
3. Install Frontend Dependencies
cd frontend
npm install
🔧 Environment Variables

Create a .env file inside the backend folder.

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key


▶️ Running the Application

Start Backend Server
cd backend
npm run dev

Server runs on:

http://localhost:5000
Start Frontend
cd frontend
npm run dev

Frontend runs on:

http://localhost:5173
📡 API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
Categories
GET    /api/category
POST   /api/category
PUT    /api/category/:id
DELETE /api/category/:id
Products
GET    /api/product
POST   /api/product
PUT    /api/product/:id
DELETE /api/product/:id
Suppliers
GET    /api/supplier
POST   /api/supplier
PUT    /api/supplier/:id
DELETE /api/supplier/:id
Orders
GET    /api/order
POST   /api/order
PUT    /api/order/:id
DELETE /api/order/:id


🔒 Security Features

Password Hashing using bcrypt
JWT Authentication
Protected API Routes
Input Validation
Secure User Sessions


📈 Future Enhancements

Barcode Scanner Integration
Email Notifications
Sales Analytics Dashboard
Low Stock Alerts
Export Reports to PDF/Excel
Multi-Warehouse Support
Dark Mode

👨‍💻 Author

Yash Rajveer Singh

B.Tech (Information Technology)

Skills: Java, React.js, Node.js, Express.js, MongoDB, SQL, Data Structures & Algorithms

📄 License

This project is developed for educational and learning purposes. Feel free to use and modify it according to your requirements.

⭐ If you found this project useful, don't forget to give it a star on GitHub!
