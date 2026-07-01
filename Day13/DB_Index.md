# Database Index Documentation & Architecture Justification

This document details the custom indexing strategy implemented across the application's database schema. It describes the precise configuration of each index and outlines the engineering rationale for its existence.

---

## 🏢 Index Summary Matrix

| Table | Index Name | Type | Columns / Expressions | Primary Use Case |
| :--- | :--- | :--- | :--- | :--- |
| `users` | `idx_users_email` | `UNIQUE` | `email` | Fast authentication & data integrity |
| `products` | `idx_products_name` | Standard B-Tree | `name` | Catalog search & product auto-complete |
| `orders` | `idx_orders_user_created` | Composite (Multi-column) | `userId`, `createdAt DESC` | Instant user order history timelines |
| `products` | `idx_products_low_stock` | Functional (Partial) | `(CASE WHEN stock < 10 THEN stock END)` | Low-stock inventory alerts with low disk usage |

---

## 🔍 Detailed Index Breakdowns & Rationales

### 1. User Email Index (`idx_users_email`)
* **Table**: `users`
* **Definition**: `UNIQUE INDEX idx_users_email(email)`

#### Why It Exists
This index serves two critical production purposes simultaneously:
1. **Security & Authentication Speed**: When a user logs in, the backend issues a `SELECT ... WHERE email = ?` query. This unique index changes a slow full-table scan into an instant point-lookup, ensuring that login operations complete in sub-millisecond times regardless of how many millions of users register.
2. **Data Integrity**: The `UNIQUE` constraint pushes safety down to the database engine tier. It blocks application-level race conditions, ensuring that no two accounts can ever be created with the exact same email address.

---

### 2. Product Name Index (`idx_products_name`)
* **Table**: `products`
* **Definition**: `INDEX idx_products_name(name)`

#### Why It Exists
This index powers the front-facing e-commerce storefront catalog.
1. **Catalog Search Optimization**: When customers browse or use the search bar, the database processes text filtering lookups like `WHERE name LIKE 'Pro%'`. 
2. **Resource Protection**: Without this index, every single customer search query forces the database to read every single product row from the physical storage disk. This index builds an ordered tree structure of text values, shielding database CPU performance during high-traffic shopping events.

---

### 3. Composite Order Index (`idx_orders_user_created`)
* **Table**: `orders`
* **Definition**: `INDEX idx_orders_user_created(userId, createdAt DESC)`

#### Why It Exists
This multi-column index explicitly optimizes the "My Orders" transaction history screen found in user profile dashboards.
1. **Eliminating In-Memory Sorting**: A user history query typically looks like `WHERE userId = X ORDER BY createdAt DESC`. A single-column index on `userId` isn't enough; the database would still have to pull all the user's orders into RAM and perform an expensive sorting operation (a "filesort").
2. **The Power of Compound Ordering**: This index stores data blocks grouped by `userId` and then immediately pre-sorted by `createdAt DESC` on disk. The database engine jumps directly to the user's data chunk and streams the newest orders to the application instantly without spending any CPU cycles on sorting.

---

### 4. Partial Stock Index (`idx_products_low_stock`)
* **Table**: `products`
* **Definition**: `INDEX idx_products_low_stock ((CASE WHEN stock < 10 THEN stock END))`

#### Why It Exists
This index powers backend administrative dashboards and automated inventory replenishment scripts while minimizing infrastructure costs.
1. **Targeted Alerting**: Admin cron jobs continuously query the database to find items requiring immediate warehouse restocking (`WHERE stock < 10`). 
2. **Zero In-Memory Overhead for Healthy Stock**: Instead of creating a massive, traditional index that tracks the stock levels of *all* items (even items with thousands of units in stock), this index leverages MySQL 8.0+ functional expressions. If an item has plenty of stock, the `CASE` statement returns `NULL` and the engine ignores it. The index tree remains tiny, saving massive amounts of RAM and disk storage space.

---

