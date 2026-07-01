# Technical Specifications — Order Management API

**Product:** Order Management API

---

# 1. Executive Summary

This document outlines the technical specification for a TypeScript-based Order Management REST API built with Express, Prisma ORM, and MySQL. The system supports order creation through two execution paths: Prisma transaction-based processing and raw SQL transaction-based processing.

The application follows a layered architecture:

```text
Controller → Service → Repository
```

Controllers handle HTTP request orchestration, Services contain business logic, and Repositories manage database access.

The core business flow ensures that an order can only be created when:

- the user has a wallet,
- the wallet balance is sufficient,
- the requested products exist,
- the requested stock is available,
- the wallet balance and stock are updated atomically.

---

# 2. Glossary & Definitions

| Term | Definition |
| ---- | ---------- |
| Order | A purchase request created by a user for one or more products. |
| User | Customer account that owns a wallet and can place orders. |
| Product | Inventory item with price and stock quantity. |
| Wallet | Balance record linked to a user for payment processing. |
| Controller | Handles HTTP requests and delegates processing to services. |
| Service | Contains business rules and transaction orchestration. |
| Repository | Handles data persistence and retrieval. |
| Transaction | Atomic DB operation that rolls back on failure. |
| Validation | Verification of request payload structure and business rules. |
| Middleware | Executes logic before requests reach controllers. |
| Environment Config | Configuration loaded from environment variables. |
| Unified Response | Standard response format for successful and failed requests. |
| Error Class | Custom application exception mapped to HTTP responses. |

---

# 3. Scope

## 3.1 In Scope

| Module | Description |
| ------ | ----------- |
| Order Creation | Create orders via ORM and raw SQL flows |
| Transaction Management | Ensure atomic wallet deduction, stock changes, and order creation |
| Inventory Validation | Verify product existence and available stock |
| Wallet Validation | Verify wallet existence and sufficient balance |
| Layered Architecture | Controller → Service → Repository |
| Error Handling | Return descriptive errors for invalid requests and business failures |
| Environment Configuration | Support development and production configuration |
| Database Integration | Connect to MySQL through Prisma and mysql2 |

## 3.2 Out of Scope

- Authentication and Authorization
- Order Cancellation and Refund Flow
- Pagination and Search
- Product CRUD Management
- User CRUD Management
- Payment Gateway Integration
- Admin Dashboard

---

# 4. Functional Requirements

## FR-001 — Create Order Using Prisma ORM

| Field | Detail |
| ----- | ------ |
| Description | Create an order using the Prisma ORM transaction flow |
| Priority | Critical |
| Method | POST |
| Endpoint | /api/orders/orm |

### Request Body

```json
{
  "userId": 1,
  "items": [
    {
      "productId": 10,
      "quantity": 2
    }
  ]
}
```

### Success Response

```json
{
  "success": true,
  "message": "Order created successfully.",
  "orderId": 101,
  "totalAmount": 2500
}
```

### Acceptance Criteria

- Request body is structurally valid.
- User wallet exists.
- All products exist.
- Requested stock is available.
- Wallet balance is sufficient.
- The order is created atomically.
- Stock, wallet balance, and order records are updated together.

---

## FR-002 — Create Order Using Raw SQL

| Field | Detail |
| ----- | ------ |
| Description | Create an order using the raw SQL transaction flow |
| Priority | Critical |
| Method | POST |
| Endpoint | /api/orders/raw |

### Request Body

```json
{
  "userId": 1,
  "items": [
    {
      "productId": 10,
      "quantity": 1
    }
  ]
}
```

### Success Response

```json
{
  "success": true,
  "message": "Order created successfully.",
  "orderId": 102,
  "totalAmount": 1250
}
```

### Acceptance Criteria

- The operation uses a database transaction.
- The transaction is committed only after all updates succeed.
- A failure triggers rollback.
- The response confirms successful order creation.

---

## FR-003 — Validation Enforcement

| Field | Detail |
| ----- | ------ |
| Description | All incoming order creation requests must be validated |
| Priority | Critical |

### Acceptance Criteria

- Missing `userId` or `items` is rejected.
- `items` must be a non-empty array.
- `productId` must be a positive integer.
- `quantity` must be a positive integer.
- Invalid requests must return HTTP 400.
- Invalid data must not reach the service layer.

---

## FR-004 — Transactional Order Processing

| Field | Detail |
| ----- | ------ |
| Description | Order placement must be processed as one atomic transaction |
| Priority | Critical |

### Business Rules

1. Retrieve the user wallet.
2. Lock the relevant products.
3. Validate product existence and stock.
4. Validate wallet balance.
5. Deduct wallet balance.
6. Reduce product stock.
7. Create the order.
8. Create order items.
9. Commit the transaction.

### Acceptance Criteria

- All changes succeed together.
- Any failure results in rollback.
- No partial order is persisted.

---

## FR-005 — Concurrency Safety

| Field | Detail |
| ----- | ------ |
| Description | Simultaneous order requests must not create inconsistent inventory or balance state |
| Priority | High |

### Acceptance Criteria

- Product rows are locked during validation and stock update.
- Wallet rows are locked during balance validation and deduction.
- Concurrent transactions do not over-sell stock.

---

## FR-006 — Unified Response Format

### Success Response

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

### Error Response

```json
{
  "success": false,
  "data": null,
  "error": {
    "status": 400,
    "code": "VALIDATION_ERROR",
    "message": "Validation failed."
  }
}
```

### Acceptance Criteria

- All endpoints return a consistent top-level structure.
- Successful responses contain `data` and `error: null`.
- Failed responses contain `data: null` and an `error` object.
- Error responses include `status`, `code`, and `message`.

---

## FR-007 — Error Handling

| Field | Detail |
| ----- | ------ |
| Description | Business and system errors must be mapped to meaningful HTTP responses |
| Priority | High |

### Expected Error Cases

- Empty order payload
- Missing wallet
- Insufficient wallet balance
- Product not found
- Insufficient stock
- Database failure

### Acceptance Criteria

- Errors are propagated to the middleware layer.
- HTTP status codes are returned correctly.
- Error messages are readable and actionable.

---

## FR-008 — Request Logging Middleware

| Field | Detail |
| ----- | ------ |
| Description | Log request details and execution time |
| Priority | Medium |

### Log Format

```text
[2026-06-30T10:00:00Z]
POST /api/orders/orm
Status: 201
Execution Time: 18ms
```

### Acceptance Criteria

- HTTP method is logged.
- Endpoint is logged.
- Status code is logged.
- Execution time is logged.

---

# 5. API Routes

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | /api/orders/orm | Create a new order using Prisma ORM |
| POST | /api/orders/raw | Create a new order using raw SQL |

---

# 6. Validation Rules

## Order Creation Schema

| Field | Type | Required | Validation |
| ----- | ---- | -------- | ---------- |
| userId | integer | Yes | Must be a positive integer |
| items | array | Yes | Must contain at least one item |
| items[].productId | integer | Yes | Must be a positive integer |
| items[].quantity | integer | Yes | Must be greater than 0 |


---

# 7. Data Specifications

## User Entity

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Wallet Entity

```typescript
interface Wallet {
  id: number;
  userId: number;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## Product Entity

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Order Entity

```typescript
interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: "PENDING" | "PAID" | "FAILED" | "CANCELLED";
  createdAt: Date;
  updatedAt: Date;
}
```

## OrderItem Entity

```typescript
interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
```

---


# 8. Error Handling Specification

## HTTP Status Codes

| Status Code | Meaning |
| ----------- | ------- |
| 200 | Request completed successfully |
| 201 | Resource created successfully |
| 400 | Validation failed |
| 404 | Resource not found |
| 409 | Conflict such as duplicate or invalid state |
| 500 | Internal server error |

### 400 Bad Request

```json
{
  "success": false,
  "data": null,
  "error": {
    "status": 400,
    "code": "VALIDATION_ERROR",
    "message": "The order payload is invalid."
  }
}
```

### 404 Not Found

```json
{
  "success": false,
  "data": null,
  "error": {
    "status": 404,
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested wallet or product does not exist."
  }
}
```

### 409 Conflict

```json
{
  "success": false,
  "data": null,
  "error": {
    "status": 409,
    "code": "INSUFFICIENT_STOCK",
    "message": "Requested quantity exceeds available stock."
  }
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "data": null,
  "error": {
    "status": 500,
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred while processing the request."
  }
}
```

---