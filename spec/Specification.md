# Technical Specifications — User Contact Book API

**Product:** User Contact Book API

---

# 1. Executive Summary

This document outlines the technical specification for a Contact Book REST API. The system provides CRUD operations for managing contacts while enforcing strict request validation, layered architecture, unified response handling, custom error management, environment-based configuration, request logging, and serialization of response data.

The application must follow a layered architecture:

```text
Controller → Service → Repository
```

Controllers are responsible for request orchestration, Services contain business logic, and Repositories manage data access operations.

---

# 2. Glossary & Definitions

| Term               | Definition                                                  |
| ------------------ | ----------------------------------------------------------- |
| Contact            | Entity representing a person's contact information.         |
| Controller         | Handles HTTP requests and delegates processing to services. |
| Service            | Contains business rules and application logic.              |
| Repository         | Handles data persistence and retrieval.                     |
| Serializer         | Removes internal fields before returning responses.         |
| Validation         | Request payload verification using Zod/Joi.                 |
| Middleware         | Executes logic before requests reach controllers.           |
| Environment Config | Configuration loaded based on active environment.           |
| Unified Response   | Standard response structure used by all endpoints.          |
| Error Class        | Custom application exception mapped to HTTP responses.      |

---

# 3. Scope

## 3.1 In Scope

| Module                    | Description                               |
| ------------------------- | ----------------------------------------- |
| Contact CRUD              | Create, Read, Update, Delete contacts     |
| Validation                | Request validation using Zod/Joi          |
| Layered Architecture      | Controller → Service → Repository         |
| Serialization             | Remove internal fields from responses     |
| Error Handling            | Custom error classes and error middleware |
| Request Logging           | Log request details and execution time    |
| Environment Configuration | Support dev, stage, prod environments     |
| Unified Responses         | Consistent API response format            |

## 3.2 Out of Scope

* Authentication & Authorization
* Pagination
* Search & Filtering
* Rate Limiting
* File Uploads
* Contact Groups
* Database Migrations

---

# 4. Functional Requirements

## FR-001 — Create Contact

| Field       | Detail                      |
| ----------- | --------------------------- |
| Description | Create a new contact record |
| Priority    | Critical                    |
| Method      | POST                        |
| Endpoint    | /contacts                   |

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
* Serializer removes hidden fields.

---

## FR-002 — Get All Contacts

| Field       | Detail                |
| ----------- | --------------------- |
| Description | Retrieve all contacts |
| Priority    | Critical              |
| Method      | GET                   |
| Endpoint    | /contacts             |

### Success Response

```json
{
  "success": true,
  "data": [],
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
| Endpoint    | /contacts/:id                    |

### Acceptance Criteria

* Returns matching contact.
* Returns HTTP 404 when contact does not exist.
* Serializer removes hidden fields.

---

## FR-004 — Update Contact

| Field       | Detail                     |
| ----------- | -------------------------- |
| Description | Update an existing contact |
| Priority    | High                       |
| Method      | PUT                        |
| Endpoint    | /contacts/:id              |

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

---

## FR-005 — Delete Contact

| Field       | Detail           |
| ----------- | ---------------- |
| Description | Delete a contact |
| Priority    | High             |
| Method      | DELETE           |
| Endpoint    | /contacts/:id    |

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

---

## FR-006 — Validation Enforcement

| Field       | Detail                                                         |
| ----------- | -------------------------------------------------------------- |
| Description | All create and update requests must be validated using Zod/Joi |
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

### Database Record

```typescript
{
  id: "cnt_001",
  name: "John Doe",
  email: "john@example.com",
  phone: "9876543210",
  address: "Pune",
  internalNotes: "VIP Customer",
  createdAt: "2026-06-24T10:00:00Z",
  updatedAt: "2026-06-24T11:00:00Z",
  version: 1
}
```

### Hidden Fields

```typescript
internalNotes
createdAt
updatedAt
deletedAt
version
```

### Serialized Response

```json
{
  "id": "cnt_001",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "address": "Pune"
}
```

### Acceptance Criteria

* internalNotes is never exposed.
* createdAt is hidden.
* updatedAt is hidden.
* deletedAt is hidden.
* version is hidden.
* Serializer executes before every response.

---

## FR-008 — Environment Configuration

| Field       | Detail                                         |
| ----------- | ---------------------------------------------- |
| Description | Configuration must change based on environment |
| Priority    | High                                           |

### Supported Environments

```text
development
staging
production
```

### Required Variables

```typescript
PORT
NODE_ENV
DATABASE_URL
LOG_LEVEL
```

### Acceptance Criteria

* Environment variables load at startup.
* Missing required variables prevent startup.
* Different environments support different values.

---

## FR-009 — Request Logging Middleware

| Field       | Detail                                 |
| ----------- | -------------------------------------- |
| Description | Log request details and execution time |
| Priority    | High                                   |

### Log Format

```text
[2026-06-24T10:00:00Z]
POST /contacts
Status: 201
Execution Time: 18ms
```

### Acceptance Criteria

* HTTP method is logged.
* URL is logged.
* Status code is logged.
* Execution time is logged.

---

## FR-010 — Unified Response Format

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
* Successful responses contain data and error: null.
* Failed responses contain data: null and an error object.
* Error responses include status, code, and message.

---

## FR-011 — Custom Error Classes

### Error Classes

```typescript
class ValidationError extends Error {
  status = 400;
}

class NotFoundError extends Error {
  status = 404;
}

class ConflictError extends Error {
  status = 409;
}

class InternalServerError extends Error {
  status = 500;
}
```

### Acceptance Criteria

* All custom errors extend Error.
* Errors are converted into unified responses.
* Proper HTTP status codes are returned.

---

# 5. API Routes

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| POST   | /contacts     | Create contact    |
| GET    | /contacts     | Get all contacts  |
| GET    | /contacts/:id | Get contact by ID |
| PUT    | /contacts/:id | Update contact    |
| DELETE | /contacts/:id | Delete contact    |

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
  address: z.string().min(5).max(255)
});
```

---

# 7. Data Specifications

## Contact Entity

```typescript
interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  internalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

| Field         | Type   | Required |
| ------------- | ------ | -------- |
| id            | string | Yes      |
| name          | string | Yes      |
| email         | string | Yes      |
| phone         | string | Yes      |
| address       | string | Yes      |
| internalNotes | string | Internal |
| createdAt     | Date   | Internal |
| updatedAt     | Date   | Internal |

---

# 8. Architecture Specification

## Controller Layer

### Responsibilities

* Receive HTTP requests
* Extract parameters and body
* Call service methods
* Return formatted responses

### Must NOT

* Contain business logic
* Access repositories directly

---

## Service Layer

### Responsibilities

* Business logic
* Validation orchestration
* Serialization
* Error handling

### Must NOT

* Handle HTTP request or response objects

---

## Repository Layer

### Responsibilities

* CRUD operations
* Data retrieval
* Data persistence

### Must NOT

* Contain business logic
* Return HTTP responses

---

# 9. Environment Configuration

## config.ts

```typescript
export const config = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  logLevel: process.env.LOG_LEVEL
};
```

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
    "message": "Email format is invalid."
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
    "code": "CONTACT_NOT_FOUND",
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
    "code": "DUPLICATE_EMAIL",
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
