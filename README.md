# StockTrack — Inventory Tracker for Small Shops

A full-stack web application built during the **NextByte Studio Full-Stack Web Development Internship** (8 weeks, Nov 2026 – Jan 2027).

**Intern:** Abdul Malik
**Track:** Full-Stack Web Development
**Current status:** Week 1 — Planning & Repository Setup ✅

---

## 1. The User Problem

Small shopkeepers in Pakistan (kiryana stores, general stores, small wholesalers) still track their stock in paper registers or from memory. This causes real, everyday losses:

- **Items run out silently** — a shopkeeper only discovers a product is finished when a customer asks for it, and the sale is lost.
- **No clear stock picture** — nobody knows exactly how much of each item is in the shop, or what the total stock is worth.
- **Dead stock piles up** — slow items keep getting reordered while fast items are under-stocked.
- **No history** — when stock goes missing or a count looks wrong, there is no record of what was added or sold.

**StockTrack** solves this with a simple web app where a shop owner can record every product, update quantities as stock comes in and goes out, and get a clear **low-stock alert** before an item runs out.

## 2. Who It Is For

- Owner of a small retail shop (single user, one shop)
- No technical background assumed — the design is deliberately simple, with big clear buttons and plain labels

## 3. Main Features (planned)

1. **Dashboard** — total products, low-stock count, total stock value, recent activity
2. **Product management** — add, edit, delete products (name, SKU, category, quantity, price, supplier)
3. **Stock status** — every product is automatically marked *In Stock / Low / Out of Stock* by comparing quantity with a per-product low-stock limit
4. **Low-stock alerts screen** — one list the owner checks every morning
5. **Search & filter** — find a product by name/SKU, filter by category
6. **Login** — the owner's data is private to their account (Week 6)

## 4. Screen Sketches (Week 1)

### 4.1 Dashboard
![Dashboard](screens/01-dashboard.png)

### 4.2 Products List
![Products](screens/02-products.png)

### 4.3 Add / Edit Product
![Add Product](screens/03-add-product.png)

### 4.4 Low-Stock Alerts
![Low Stock Alerts](screens/04-low-stock.png)

## 5. Data Entities

### User
| Field | Type | Notes |
|---|---|---|
| _id | ObjectId | primary key |
| name | String | shop owner's name |
| email | String | unique, used for login |
| passwordHash | String | never stored in plain text |
| shopName | String | name of the shop |
| createdAt | Date | |

### Category
| Field | Type | Notes |
|---|---|---|
| _id | ObjectId | primary key |
| name | String | e.g. Grocery, Household |
| userId | ObjectId → User | owner of the category |

### Product
| Field | Type | Notes |
|---|---|---|
| _id | ObjectId | primary key |
| name | String | e.g. Cooking Oil 5L |
| sku | String | shop's own code, unique per user |
| categoryId | ObjectId → Category | |
| quantity | Number | units currently in stock |
| unitPrice | Number | price in PKR |
| lowStockLimit | Number | alert when quantity ≤ this |
| supplier | String | optional |
| userId | ObjectId → User | owner of the product |
| createdAt / updatedAt | Date | |

### StockMovement (history)
| Field | Type | Notes |
|---|---|---|
| _id | ObjectId | primary key |
| productId | ObjectId → Product | |
| change | Number | +20 (stock in) or −5 (sold) |
| reason | String | purchase / sale / correction |
| createdAt | Date | |

**Relationships:** one User has many Categories and Products; one Category has many Products; one Product has many StockMovements. A product's status is *computed* (not stored): `quantity = 0 → Out`, `quantity ≤ lowStockLimit → Low`, otherwise `In Stock`.

## 6. API Flow (planned REST API)

Base URL: `/api` — all responses are JSON; errors return a consistent shape:
`{ "error": "message" }` with a suitable HTTP status code.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/auth/register | create account |
| POST | /api/auth/login | login, receive token |
| GET | /api/products | list products (search + category filter) |
| POST | /api/products | add a product |
| GET | /api/products/:id | one product |
| PUT | /api/products/:id | edit a product |
| DELETE | /api/products/:id | delete a product |
| POST | /api/products/:id/stock | record stock in/out (creates a StockMovement) |
| GET | /api/products/low-stock | products at/below their limit |
| GET | /api/categories | list categories |
| POST | /api/categories | add a category |
| GET | /api/dashboard | totals: products, low-stock count, stock value, recent activity |

**Example flow — selling an item:**
```
Shop owner opens Products → taps "−" on Rice Bag (or Stock Out form)
   → Frontend: POST /api/products/:id/stock  { change: -5, reason: "sale" }
   → Backend validates (quantity cannot go below 0)
   → Product.quantity updated + StockMovement saved (one database step)
   → Response: updated product with new status
   → UI refreshes the row; if it crossed the limit, it appears on Low-Stock screen
```

## 7. Tech Stack

- **Frontend:** React + Vite, plain CSS (responsive layout)
- **Backend:** Node.js + Express (REST API)
- **Database:** MongoDB (Mongoose models)
- **Auth:** JWT in an httpOnly header flow, passwords hashed with bcrypt
- **Tools:** Git + GitHub, VS Code

## 8. Project Structure

```
nextbyte-fullstack-internship/
├── README.md          ← this file (planning + documentation)
├── screens/           ← Week 1 screen sketches + later screenshots
├── client/            ← React frontend (from Week 2)
└── server/            ← Express + MongoDB backend (from Week 3)
```

## 9. 8-Week Roadmap (per internship plan)

| Week | Task | Status |
|---|---|---|
| 1 | Planning & repository setup | ✅ This week |
| 2 | Frontend foundation (UI, components, demo data) | ⏳ |
| 3 | Backend API (endpoints, validation, error handling) | ⏳ |
| 4 | Database & full CRUD | ⏳ |
| 5 | Connect frontend & backend | ⏳ |
| 6 | Authentication & quality pass | ⏳ |
| 7 | Deployment & integration | ⏳ |
| 8 | Final release (README, demo, screenshots) | ⏳ |

## 10. How to Run (from Week 2 onward)

Setup and run instructions will be added as the client and server are built in Weeks 2–4.

---

*Built as part of the NextByte Studio internship program. This repository is public as required by the program's submission guidelines.*
