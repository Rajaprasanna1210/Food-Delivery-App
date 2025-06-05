# 🍽️ Food Delivery App - Backend REST API

A fully functional backend REST API built with **Node.js**, **Express.js**, and **MySQL**. It handles user registration/login, restaurant and food item management, and order placement and tracking. Includes admin-only features, token-based authentication, and modular folder structure.

---

## 📁 Project Structure

Food-Delivery-App/
├── core/
│ ├── users/
│ ├── restaurants/
│ ├── food-items/
│ └── orders/
├── database/
│ ├── database.js
│ └── database.txt
├── middleware/
│ ├── auth.js
│ └── admin.js
├── .env
├── server.js
├── package.json
└── README.md

---

## ⚙️ Features

- ✅ JWT-based authentication
- ✅ Role-based admin access
- ✅ Modular file structure
- ✅ Sequelize ORM with raw SQL support
- ✅ Order system with status updates
- ✅ Validation using Joi
- ✅ Auto database setup and sync on server start

---

## 🚀 Setup Guide

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Rajaprasanna1210/Food-Delivery-App.git
cd Food-Delivery-App
2️⃣ Install dependencies
npm install
3️⃣ Configure Environment Variables
Create a .env file in the root by copying from .env:

DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=food_delivery
JWT_SECRET=your_jwt_secret
PORT=3000
4️⃣ Start MySQL server
Make sure MySQL is running and accessible using the credentials from .env.

5️⃣ Start the server
node server.js
This will:

Create the database if not exists
Sync Sequelize models
Execute schema from database/database.txt
📬 Postman Collection

🧪 Import this into Postman
postman collection file added in utils folder 
Open Postman
Click on "Import"
Select the file: Food Delivery App.postman_collection.json
Includes:

✅ User Register/Login
✅ Restaurants CRUD (Admin only)
✅ Food Item CRUD
✅ Orders placement & status updates
📌 API Endpoints

👤 Users
Method	Endpoint	Description
POST	/api/users/register	Register user
POST	/api/users/login	Login & get token
On login, get JWT token:
Use Authorization: Bearer <token> in protected routes.
🏬 Restaurants
Method	Endpoint	Description	Admin
POST	/api/restaurants	Add new restaurant	✅
GET	/api/restaurants	List all restaurants	❌
GET	/api/restaurants/:id	Get restaurant + items	❌
Restaurant body:

{
  "name": "KFC",
  "location": "Bangalore",
  "cuisine": "Fast Food"
}
🍛 Food Items
Method	Endpoint	Description
POST	/api/restaurants/:id/food-items	Add food item to restaurant
GET	/api/food-items	List all food items
GET	/api/food-items/:id	Get a specific item
Food item body:

{
  "name": "Paneer Biryani",
  "price": 180,
  "isVeg": true,
  "category": "Biryani"
}
📦 Orders
Method	Endpoint	Description
POST	/api/orders	Place new order
GET	/api/orders	View all orders (user only)
PUT	/api/orders/:id/status	Update status (admin only)
Place Order body:

{
  "food_item_ids": [1, 2],
  "delivery_address": "123, MG Road, Bangalore"
}
Update Status body:

{
  "status": "Out for Delivery"
}
🔐 Admin Setup

By default, all users are non-admin. To test admin features:

Make a user admin manually via SQL:
UPDATE users SET isAdmin = 1 WHERE id = 1;
Or update in MySQL Workbench/CLI.

🧪 Tech Stack

Node.js
Express.js
MySQL + Sequelize
JWT for auth
Joi for validation
Postman for API testing
🧾 Scripts

# Start server
node server.js

# Run SQL queries manually (optional)
mysql -u root -p food_delivery < database/database.txt
📝 Assumptions / Notes

No frontend – Backend only API
Admin check is done using isAdmin boolean in users table
Authentication is required for protected routes
Raw SQL schema is used for relationships and foreign keys

🔚 Pending / Optional Features

 Admin Dashboard (future scope)
 Pagination and filtering in listings
 Swagger documentation