---

# REST API Assignment – Users, Addresses & Products

📌 Overview

* Tech stack: **Node.js, Express, MongoDB, JWT, Joi**
* Architecture: **MVC**
* Models: **User, Address, Product**
* Features: **CRUD APIs**, **JWT authentication**, **Joi validation**, **Error handling middleware**, **Validation middleware**, **ApiResponse + CustomError utils**

---

## 📂 Project Structure

```
backend/
│── config/
│
│── controllers/
│    ├── admin/
│    │    └── product.controller.js
│    ├── common/
│    ├── shop/
│    │    ├── address.controller.js
│    │    └──
│    └── user/
│         └── user.controller.js
│
│── middleware/
│    ├── auth.middleware.js
│    ├── error.middleware.js
│    └── validation.middleware.js
│
│── models/
│    ├── user.model.js
│    ├── address.model.js
│    └── product.model.js
│
│── routes/
│    ├── admin/
│    │    ├──
│    │    └── product.routes.js
│    ├── common/
│    │    ├──
│    │    └──
│    ├── shop/
│    │    ├──
│    │    ├── address.routes.js
│    │    └──
│    └── user/
│         └── user.routes.js
│
│── seeder/
│
│── utils/
│    ├── apiResponse.util.js
│    ├── customError.util.js
│    └── jwt.util.js
│
│── validations/
│    ├── user.validation.js
│    ├── address.validation.js
│    └── product.validation.js
│
│── .env
│── .gitignore
│── app.js
│── server.js
│── package.json
│── package-lock.json
│
```

---

## 📌 Models

### 🔹 User Model (`user.model.js`)

- `userName` → String, required, unique, lowercase, trimmed
- `email` → String, required, unique, lowercase, trimmed
- `password` → String, required, min 8 chars, max 50, not returned in queries
- `role` → String, default: `"user"`
- Auto timestamps (createdAt, updatedAt)

---

### 🔹 Address Model (`address.model.js`)

- `userId` → ObjectId, ref `"User"`, required
- `address` → String, required, min 5 chars
- `city` → String, required, lowercase, trimmed
- `pincode` → String, required, regex (5–6 digits)
- `phone` → String, required, regex (10 digits)
- `notes` → String, optional, default empty
- Auto timestamps

---

### 🔹 Product Model (`product.model.js`)

- `image` → String, dummy URL required in request body
- `title` → String, required, min 3, max 100, lowercase, indexed
- `description` → String, required, min 10, lowercase
- `category` → String, optional, lowercase
- `brand` → String, optional, lowercase
- `price` → Number, required, min 0
- `salePrice` → Number, default 0, min 0
- `totalStock` → Number, required, min 0
- `averageReview` → Number, default 0, min 0, max 5
- Auto timestamps

---

## 📌 API Endpoints

### 🔹 User Routes (`/api/users`)

| Method | Endpoint    | Description            | JWT Required | Joi Validation |
| ------ | ----------- | ---------------------- | ------------ | -------------- |
| POST   | `/register` | Register new user      | ❌ No        | ✅ Yes         |
| POST   | `/login`    | Login user, return JWT | ❌ No        | ✅ Yes         |
| POST   | `/logout`   | Logout user            | ✅ Yes       | ❌ No          |
| GET    | `/profile`  | Get logged-in user     | ✅ Yes       | ❌ No          |
| PUT    | `/profile`  | Update user profile    | ✅ Yes       | ✅ Yes         |
| DELETE | `/profile`  | Delete user account    | ✅ Yes       | ❌ No          |

---

### 🔹 Address Routes (`/api/addresses`)

| Method | Endpoint | Description              | JWT Required | Joi Validation |
| ------ | -------- | ------------------------ | ------------ | -------------- |
| POST   | `/`      | Create new address       | ✅ Yes       | ✅ Yes         |
| GET    | `/`      | Get all addresses (user) | ✅ Yes       | ❌ No          |
| GET    | `/:id`   | Get address by ID        | ✅ Yes       | ❌ No          |
| PUT    | `/:id`   | Update address (full)    | ✅ Yes       | ✅ Yes         |
| PATCH  | `/:id`   | Update address (partial) | ✅ Yes       | ✅ Yes         |
| DELETE | `/:id`   | Delete address           | ✅ Yes       | ❌ No          |

---

### 🔹 Product Routes (`/api/products`)

⚠️ `req.body.image` must contain a **dummy URL**, e.g.:

```json
{ "image": "https://via.placeholder.com/150" }
```

| Method | Endpoint | Description              | JWT Required | Joi Validation |
| ------ | -------- | ------------------------ | ------------ | -------------- |
| POST   | `/`      | Create new product       | ✅ Yes       | ✅ Yes         |
| GET    | `/`      | Get all products         | ❌ No        | ❌ No          |
| GET    | `/:id`   | Get product by ID        | ❌ No        | ❌ No          |
| PUT    | `/:id`   | Update product (full)    | ✅ Yes       | ✅ Yes         |
| PATCH  | `/:id`   | Update product (partial) | ✅ Yes       | ✅ Yes         |
| DELETE | `/:id`   | Delete product           | ✅ Yes       | ❌ No          |

---

## 📌 Middleware

1. **Auth Middleware** → Protects private routes using JWT
2. **Error Middleware** → Handles validation, JWT, and DB errors, sends structured JSON response
3. **Validation Middleware** → Uses Joi schemas to validate request bodies before controller

---

## 📌 Joi Validations

- **User** → register, login, update profile
- **Address** → create, update
- **Product** → create, update (with dummy image URL required)

---

## 📌 Utils

- **ApiResponse** → unified API response format
- **CustomError** → throw controlled errors with status codes
- **JWT util** → sign & verify tokens

---

## 📌 Naming Convention

Use the format:

```
filename.foldername.js
```

✅ Examples:

- `user.model.js`
- `address.model.js`
- `product.model.js`
- `auth.middleware.js`
- `error.middleware.js`
- `user.validation.js`
- `jwt.util.js`
- `apiResponse.util.js`
- `customError.util.js`
- `user.routes.js`

---

## 📌 Main File (`app.js`) – Static Route Mounting

In `app.js`, import all route files and mount them on **static paths**:

| Static Path           | Route File                       | JWT Required                   |
| --------------------- | -------------------------------- | ------------------------------ |
| `/api/users`          | `routes/user/user.routes.js`     | ✅ Yes (except register/login) |
| `/api/admin/products` | `routes/admin/product.routes.js` | ✅ Yes (admin only)            |
| `/api/shop/addresses` | `routes/shop/address.routes.js`  | ✅ Yes                         |

Also, in `app.js`:

- Apply `express.json()` middleware
- Use `auth.middleware.js` for protected routes
- Apply `validation.middleware.js` where Joi schemas are needed
- Keep `error.middleware.js` at the end for centralized error handling

---
