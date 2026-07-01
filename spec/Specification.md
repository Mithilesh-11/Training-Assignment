# Technical Specifications — CRM Lite -  User Contact Book API

**Product:** CRM Lite / User Contact Book API

---

# 1. Executive Summary

This document defines the technical specification for the CRM Lite REST API. The system supports contact management through two API versions:

- `v1` — in-memory contact CRUD operations
- `v2` — MySQL-backed contact CRUD operations with cursor pagination, search, and audit logging

The application enforces request validation, layered architecture, unified response handling, custom error management, environment-based configuration, request logging, serialization of response data, and reporting.

The application must follow a layered architecture:

```text
Controller → Service → Repository
```

Controllers orchestrate HTTP requests, Services contain business logic, and Repositories manage data access.

---

# 2. Glossary & Definitions

| Term               | Definition                                                  |
| ------------------ | ----------------------------------------------------------- |
| Contact            | Entity representing a person's contact information.         |
| Controller         | Handles HTTP requests and delegates processing to services. |
| Service            | Contains business rules and application logic.              |
| Repository         | Handles data persistence and retrieval.                     |
| Serializer         | Removes internal fields before returning responses.         |
| Validation         | Request payload verification using Zod.                     |
| Middleware         | Executes logic before requests reach controllers.           |
| Environment Config | Configuration loaded based on active environment.           |
| Unified Response   | Standard response structure used by all endpoints.          |
| Error Class        | Custom application exception mapped to HTTP responses.      |
| Audit Log          | Stores update/delete history for v2 contacts.               |
| Cursor Pagination  | Page navigation using a stable cursor based on contact id.  |

---

# 3. Scope

## 3.1 In Scope

| Module                    | Description                                                           |
| ------------------------- | --------------------------------------------------------------------- |
| Contact CRUD              | Create, Read, Update, Delete contacts                                 |
| Validation                | Request validation using Zod                                          |
| Layered Architecture      | Controller → Service → Repository                                     |
| Serialization             | Remove internal/internal audit fields from public responses           |
| Error Handling            | Custom error classes and error middleware                             |
| Request Logging           | Log request details and execution time                               |
| Environment Configuration | Support environment-specific configuration via `.env.<environment>`   |
| Unified Responses         | Consistent API response format                                        |
| MySQL Persistence         | v2 contact storage in MySQL                                           |
| Cursor Pagination         | `v2` contacts list pagination                                         |
| Search & Filtering        | `v2` list search and email filter                                     |
| Audit Logs                | `v2` update/delete audit logging                                      |
| Reports                   | `v2` contacts stats endpoint                                          |

## 3.2 Out of Scope

* Authentication & Authorization
* File Uploads
* Contact Groups
* Third-party integrations
* Rate Limiting

---

# 4. Functional Requirements

## FR-001 — Create Contact

| Field       | Detail                      |
| ----------- | --------------------------- |
| Description | Create a new contact record |
| Priority    | Critical                    |
| Method      | POST                        |
| Endpoint    | /api/v1/contacts /api/v2/contacts |

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "address": "Pune, Maharashtra"
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "id": "cnt_001",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "Pune, Maharashtra"
  },
  "error": null
}
```

### Acceptance Criteria

* Request passes validation.
* Contact is created successfully.
* HTTP Status 201 is returned.
* Serializer removes hidden/internal fields.

---

## FR-002 — Get All Contacts

| Field       | Detail                |
| ----------- | --------------------- |
| Description | Retrieve all contacts |
| Priority    | Critical              |
| Method      | GET                   |
| Endpoint    | /api/v1/contacts /api/v2/contacts |

### v1 Success Response

```json
{
  "success": true,
  "data": [],
  "error": null
}
```

### v2 Success Response

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "nextCursor": null,
    "limit": 20
  },
  "error": null
}
```

---

## FR-003 — Get Contact By ID

| Field       | Detail                           |
| ----------- | -------------------------------- |
| Description | Retrieve a contact by identifier |
| Priority    | High                             |
| Method      | GET                              |
| Endpoint    | /api/v1/contacts/:id /api/v2/contacts/:id |

### Acceptance Criteria

* Returns matching contact.
* Returns HTTP 404 when contact does not exist.
* Serializer removes hidden/internal fields.

---

## FR-004 — Update Contact

| Field       | Detail                     |
| ----------- | -------------------------- |
| Description | Update an existing contact |
| Priority    | High                       |
| Method      | PATCH                      |
| Endpoint    | /api/v1/contacts/:id /api/v2/contacts/:id |

### Request Body

```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "phone": "9999999999",
  "address": "Mumbai"
}
```

### Acceptance Criteria

* Validation executes before update.
* Contact is updated successfully.
* Returns HTTP 404 if contact does not exist.
* v2 updates are recorded in audit logs.

---

## FR-005 — Delete Contact

| Field       | Detail           |
| ----------- | ---------------- |
| Description | Delete a contact |
| Priority    | High             |
| Method      | DELETE           |
| Endpoint    | /api/v1/contacts/:id /api/v2/contacts/:id |

### Success Response

```json
{
  "success": true,
  "data": null,
  "error": null
}
```

### Acceptance Criteria

* Contact is deleted successfully.
* Returns HTTP 404 if contact does not exist.
* v2 deletes are soft deletes and logged in audit logs.

---

## FR-006 — Validation Enforcement

| Field       | Detail                                                         |
| ----------- | -------------------------------------------------------------- |
| Description | All create and update requests must be validated using Zod      |
| Priority    | Critical                                                       |

### Acceptance Criteria

* Invalid requests are rejected.
* HTTP Status 400 is returned.
* Validation messages identify invalid fields.
* Invalid data never reaches the service layer.

---

## FR-007 — Custom Serialization

| Field       | Detail                                               |
| ----------- | ---------------------------------------------------- |
| Description | Internal fields must not be exposed in API responses |
| Priority    | High                                                 |

### Database Record Example

```typescript
{
  id: "cnt_001",
  name: "John Doe",
  email: "john@example.com",
  phone: "9876543210",
  address: "Pune, Maharashtra",
  internal_notes: "VIP Customer",
  created_at: "2026-06-24T10:00:00Z",
  updated_at: "2026-06-24T11:00:00Z",
  deleted_at: null,
  version: 1
}
```

### Hidden/Internal Fields

```text
internal_notes
created_at
updated_at
deleted_at
version
```

### Serialized Response

```json
{
  "id": "cnt_001",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "address": "Pune, Maharashtra"
}
```

### Acceptance Criteria

* Internal fields are never exposed.
* Serializer executes before every response.

---

## FR-008 — Request Logging Middleware

| Field       | Detail                                 |
| ----------- | -------------------------------------- |
| Description | Log request details and execution time |
| Priority    | High                                   |

### Log Format

```text
[2026-06-24T10:00:00Z]
POST /api/v2/contacts
Status: 201
Execution Time: 18ms
```

### Acceptance Criteria

* HTTP method is logged.
* URL is logged.
* Status code is logged.
* Execution time is logged.

---

## FR-09 — Unified Response Format

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

* All endpoints return the same top-level structure.
* Successful responses contain `data` and `error: null`.
* Failed responses contain `data: null` and an error object.
* Error responses include `status`, `code`, and `message`.

---

## FR-010 — Custom Error Classes

### Error Classes

```typescript
abstract class AppError extends Error {
  status: number;
  code: string;
}

class ValidationError extends AppError {
  status = 400;
  code = "VALIDATION_ERROR";
}

class NotFoundError extends AppError {
  status = 404;
  code = "NOT_FOUND";
}

class ConflictError extends AppError {
  status = 409;
  code = "CONFLICT";
}

class InternalServerError extends AppError {
  status = 500;
  code = "INTERNAL_SERVER_ERROR";
}
```

### Acceptance Criteria

* All custom errors extend `Error`.
* Errors are converted into unified responses.
* Proper HTTP status codes are returned.

---

## FR-011 — v2 Cursor Pagination, Search & Sort

| Field       | Detail                                       |
| ----------- | -------------------------------------------- |
| Description | Support cursor pagination, search, and sort  |
| Priority    | High                                         |

### Query Parameters

* `cursor` — UUID of the last-seen contact
* `limit` — page size
* `search` — partial match on name or email
* `email` — exact email filter
* `sortBy` — one or more fields (`createdAt`, `updatedAt`)
* `order` — one or more sort directions (`asc`, `desc`)

### Acceptance Criteria

* `v2` list endpoint supports cursor-based pagination.
* `v2` list endpoint supports search by name/email.
* `v2` list endpoint supports sort field and order.

---

## FR-012 — Audit Logging

| Field       | Detail                                      |
| ----------- | ------------------------------------------- |
| Description | Store update and delete history for v2 data |
| Priority    | Medium                                      |

### Acceptance Criteria

* `v2` updates record old/new snapshots.
* `v2` deletes record a before-delete snapshot.
* Audit logs are persisted to `contact_audit_logs`.

---

## FR-013 — Reports Endpoint

| Field       | Detail                                       |
| ----------- | -------------------------------------------- |
| Description | Provide contact statistics                    |
| Priority    | Medium                                      |
| Method      | GET                                         |
| Endpoint    | /api/v2/reports/contacts-stats              |

### Success Response

```json
{
  "success": true,
  "data": {
    "totalContacts": 42,
    "addedToday": 3,
    "mostCommonEmailDomain": "example.com"
  },
  "error": null
}
```

### Acceptance Criteria

* Returns total active contacts.
* Returns contacts added today.
* Returns the most common email domain.

---

# 5. API Routes

| Method | Endpoint                        | Description                                           |
| ------ | ------------------------------- | ----------------------------------------------------- |
| GET    | /api/v1/contacts                | Get all v1 contacts                                   |
| GET    | /api/v1/contacts/:id            | Get v1 contact by ID                                  |
| POST   | /api/v1/contacts                | Create v1 contact                                     |
| PATCH  | /api/v1/contacts/:id            | Update v1 contact                                     |
| DELETE | /api/v1/contacts/:id            | Delete v1 contact                                     |
| GET    | /api/v2/contacts                | Get all v2 contacts with pagination/search/sort      |
| GET    | /api/v2/contacts/:id            | Get v2 contact by ID                                  |
| POST   | /api/v2/contacts                | Create v2 contact                                     |
| PATCH  | /api/v2/contacts/:id            | Update v2 contact with audit logging                  |
| DELETE | /api/v2/contacts/:id            | Soft delete v2 contact with audit logging             |
| GET    | /api/v2/reports/contacts-stats  | Get v2 contact statistics                             |

---

# 6. Validation Rules

## Contact Schema

| Field   | Type   | Required | Validation                |
| ------- | ------ | -------- | ------------------------- |
| name    | string | Yes      | Min 2, Max 100 characters |
| email   | string | Yes      | Valid email format        |
| phone   | string | Yes      | Exactly 10 digits         |
| address | string | Yes      | Min 5, Max 255 characters |

### Example Zod Schema

```typescript
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^[0-9]{10}$/),
  address: z.string().min(5).max(255),
});
```

### Update Schema

```typescript
const updateContactSchema = contactSchema.partial();
```

---

# 7. Data Specifications

## Contact Entity (v1 and v2)

```typescript
interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  internal_notes?: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  version: number;
}
```

## Serialized Contact (API response)

```typescript
interface SerializedContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}
```

---

# 8. Architecture Specification

## Controller Layer

### Responsibilities

* Receive HTTP requests.
* Extract request parameters and body.
* Validate inputs.
* Call service methods.
* Return formatted responses.

### Must NOT

* Contain business logic.
* Access repositories directly.

---

## Service Layer

### Responsibilities

* Execute business logic.
* Orchestrate validation results and repository access.
* Apply serialization.
* Throw domain-specific errors.

### Must NOT

* Handle raw HTTP request or response objects.

---

## Repository Layer

### Responsibilities

* Perform data persistence and retrieval.
* Implement in-memory storage for v1.
* Implement MySQL queries for v2.
* Provide cursor pagination and stats queries.

### Must NOT

* Contain business logic.
* Return HTTP responses.

---

# 9. Environment Configuration

## config.ts

```typescript
export const config = {
  port: process.env.PORT || "3001",
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL || "",
};
```

### Database config

* `src/config/db.ts` loads `.env.development` by default.
* MySQL pool settings use `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.

### Environment Files

```text
.env.development
.env.staging
.env.production
```

---

# 10. Error Handling Specification

## HTTP Status Codes

| Status Code | Meaning                        |
| ----------- | ------------------------------ |
| 200         | Request completed successfully |
| 201         | Resource created successfully  |
| 400         | Validation failed              |
| 404         | Contact not found              |
| 409         | Duplicate email exists         |
| 500         | Internal server error          |

### 400 Bad Request

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

### 404 Not Found

```json
{
  "success": false,
  "data": null,
  "error": {
    "status": 404,
    "code": "NOT_FOUND",
    "message": "The contact with the requested ID does not exist."
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
    "code": "CONFLICT",
    "message": "A contact already exists with this email address."
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
