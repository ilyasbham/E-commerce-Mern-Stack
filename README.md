# 🛒 **E-Commerce MERN Stack Project**

---

## 📖 **Project Overview**

This is a full-stack **E-Commerce web application** built with the MERN stack:

- **Frontend:** React.js, Redux, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas

**Features:** Users can browse products, add to cart, place orders, and manage accounts. Admins can manage products, orders, and users via a dashboard.

---

## ✨ **Features**

<details>
<summary>Click to expand</summary>

### 👤 **User Features**

- 🛍 Browse products by category
- 🔎 Product search and details
- 🛒 Add/remove products to/from cart
- 💳 Checkout with payment integration
- 📜 Order history and status
- 👤 User profile management
- 🔑 Password reset via email

### 🛠 **Admin Features**

- 📊 Dashboard with overview metrics
- ➕➖ CRUD operations on products
- ✅ Manage orders (process, update status)
- 👥 Manage users and user roles
- ⭐ View product reviews

</details>

---

## 🛠 **Tech Stack**

| Layer | Technology / Library |
| --- | --- |
| 🌐 Frontend | React.js, Redux, Vite |
| ⚙️ Backend | Node.js, Express.js |
| 🗄 Database | MongoDB Atlas |
| 🔒 Auth | JWT, Cookie Authentication |
| 💳 Payments | Stripe/PayPal Integration |
| 🎨 Styling | CSS, Tailwind / Custom CSS |
| 🚀 Deployment | Render / Vercel |
| 📄 Docs | Swagger |

---

## 📁 **File Structure**

```
E-Commerce/
├── backend
│   ├── config          # Database & Swagger setup
│   ├── controllers     # Express route controllers
│   ├── middleware      # Error handling & authentication
│   ├── models          # Mongoose models
│   ├── routes          # API routes
│   ├── utils           # Utilities (email, JWT, etc.)
│   ├── app.js          # Express app setup
│   └── server.js       # Server startup
├── frontend
│   ├── public
│   └── src             # React source code (components, actions, reducers, store)
├── .gitignore
├── package.json
└── Procfile

```
