# Technical Specifications — CRM Lite - User Contact Book API

**Product:** CRM Lite / User Contact Book API

**Version:** 2.0

---

# 1. Executive Summary

This document defines the technical specification for the CRM Lite REST API. The system supports user authentication, contact management through MySQL with cursor pagination, search, audit logging, and role-based access control.

The application enforces:
- Request validation using Zod
- Layered architecture (Controller → Service → Repository)
- Unified response handling
- Custom error management
- JWT-based authentication with access & refresh tokens
- Role-based authorization (admin/user)
- Request logging with execution time tracking
- Serialization of response data
- Audit logging for data modifications
- Multi-tenant support (contacts belong to users)

The application must follow a layered architecture:

```text
Controller → Service → Repository
```

Controllers orchestrate HTTP requests, Services contain business logic, and Repositories manage data access.

---

# 2. Glossary & Definitions

| Term               | Definition                                                         |
| ------------------ | ------------------------------------------------------------------ |
| Contact            | Entity representing a person's contact information.                |
| Controller         | Handles HTTP requests and delegates processing to services.        |
| Service            | Contains business rules and application logic.                     |
| Repository         | Handles data persistence and retrieval.                            |
| Serializer         | Removes internal fields before returning responses.                |
| Validation         | Request payload verification using Zod.                            |
| Middleware         | Executes logic before requests reach controllers.                  |
| Environment Config | Configuration loaded based on active environment.                  |
| Unified Response   | Standard response structure used by all endpoints.                 |
| Error Class        | Custom application exception mapped to HTTP responses.             |
| Audit Log          | Stores update/delete history for contacts.                         |
| Cursor Pagination  | Page navigation using a stable cursor based on contact ID.         |
| JWT Token          | JSON Web Token for stateless authentication.                       |
| Access Token       | Short-lived token (15m) for API request authorization.             |
| Refresh Token      | Long-lived token (7d) stored in HTTP-only cookie for token renewal.|
| Role-Based Access  | Authorization based on user role (admin/user).                     |

---

# 3. Scope

## 3.1 In Scope

| Module                    | Description                                                           |
| ------------------------- | --------------------------------------------------------------------- |
| Contact CRUD              | Create, Read, Update, Delete contacts                                 |
| User Authentication       | Register, Login, Token Refresh, Logout                                |
| Role-Based Authorization  | Admin and User roles with permission-based access                     |
| Validation                | Request validation using Zod                                          |
| Layered Architecture      | Controller → Service → Repository                                     |
| Serialization             | Remove internal/audit fields from public responses                    |
| Error Handling            | Custom error classes and error middleware                             |
| Request Logging           | Log request details and execution time                                |
| Environment Configuration | Support environment-specific configuration via `.env.<environment>`   |
| Unified Responses         | Consistent API response format                                        |
| MySQL Persistence         | Contact storage in MySQL with soft deletes                            |
| Cursor Pagination         | Contacts list pagination using keyset approach                        |
| Search & Filtering        | List search by name/email and exact email filter                      |
| Audit Logs                | Update/delete audit logging with before/after snapshots              |
| Reports                   | Contacts stats endpoint (total, added today, common email domain)    |
| JWT Authentication        | Access & Refresh token-based authentication                           |
| Multi-Tenant Support      | Contacts belong to users; non-admin users see only their contacts    |
| Token Revocation          | Logout from single device or all devices                              |

## 3.2 Out of Scope

* File Uploads
* Contact Groups or Categories
* Third-party integrations
* Rate Limiting
* Email notifications
* Contact sharing between users
* API versioning (v1 in-memory)

---

# 4. Functional Requirements

## FR-001 — User Registration

| Field       | Detail                      |
| ----------- | --------------------------- |
| Description | Create a new user account   |
| Priority    | Critical                    |
| Method      | POST                        |
| Endpoint    | /api/v2/auth/register       |

### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

### Success Response (201)

```json
{
  "success": true,
  "data": {
    "id": "user-uuid-001",
    "email": "user@example.com",
    "role": "user",
    "created_at": "2026-06-24T10:00:00Z"
  },
  "error": null
}
```

### Acceptance Criteria

* Email must be valid and unique.
* Password must be at least 6 characters.
* Role defaults to "user" if not provided.
* HTTP Status 201 is returned.
* Password is hashed using bcryptjs before storage.
* Duplicate email returns 409 Conflict.

---

## FR-002 — User Login

| Field       | Detail                  |
| ----------- | ----------------------- |
| Description | Authenticate user       |
| Priority    | Critical                |
| Method      | POST                    |
| Endpoint    | /api/v2/auth/login      |

### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Success Response (200)

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid-001",
      "email": "user@example.com",
      "role": "user"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  },
  "error": null
}
```

### Cookies Set

* `refreshToken` (HTTP-only, secure, SameSite=strict, 7 days expiry)

### Acceptance Criteria

* Email and password validation required.
* Invalid credentials return 401 Unauthorized.
* Access token valid for 15 minutes.
* Refresh token stored in secure HTTP-only cookie.
* HTTP Status 200 is returned.

---

## FR-003 — Token Refresh

| Field       | Detail                      |
| ----------- | --------------------------- |
| Description | Obtain new access token     |
| Priority    | Critical                    |
| Method      | POST                        |
| Endpoint    | /api/v2/auth/refresh        |

### Request

* Refresh token read from `refreshToken` cookie automatically.

### Success Response (200)

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  },
  "error": null
}
```

### Cookies Set

* New `refreshToken` (rotated)

### Acceptance Criteria

* Refresh token validated and verified.
* Old refresh token revoked in database.
* New token pair generated.
* Token reuse detection: if revoked token used again, all user tokens invalidated.
* HTTP Status 200 is returned.

---

## FR-004 — User Logout (Single Device)

| Field       | Detail                  |
| ----------- | ----------------------- |
| Description | Logout from one device  |
| Priority    | High                    |
| Method      | POST                    |
| Endpoint    | /api/v2/auth/logout     |

### Request

* Refresh token read from `refreshToken` cookie automatically.

### Success Response (200)

```json
{
  "success": true,
  "data": { "message": "Logged out successfully" },
  "error": null
}
```

### Cookies Cleared

* `refreshToken` cleared

### Acceptance Criteria

* Current refresh token marked as revoked in database.
* Refresh token cookie cleared.
* User can still use other active sessions from other devices.
* HTTP Status 200 is returned.

---

## FR-005 — User Logout from All Devices

| Field       | Detail                          |
| ----------- | ------------------------------- |
| Description | Logout from all active sessions |
| Priority    | High                            |
| Method      | POST                            |
| Endpoint    | /api/v2/auth/logout-all         |
| Auth        | Requires access token           |

### Request

* Access token in Authorization header: `Bearer <accessToken>`

### Success Response (200)

```json
{
  "success": true,
  "data": { "message": "Logged out from all devices successfully" },
  "error": null
}
```

### Cookies Cleared

* `refreshToken` cleared

### Acceptance Criteria

* All refresh tokens for the user marked as revoked.
* All sessions invalidated across all devices.
* Current refresh token cookie cleared.
* HTTP Status 200 is returned.

---

## FR-006 — Create Contact

| Field       | Detail                       |
| ----------- | ---------------------------- |
| Description | Create a new contact record  |
| Priority    | Critical                     |
| Method      | POST                         |
| Endpoint    | /api/v2/contacts             |
| Auth        | Requires access token        |

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "address": "Pune, Maharashtra"
}
```

### Success Response (201)

```json
{
  "success": true,
  "data": {
    "id": "cnt-uuid-001",
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
* Email must be unique across all contacts.
* Contact is created and assigned to authenticated user.
* HTTP Status 201 is returned.
* Internal fields removed from response via serializer.
* Duplicate email returns 409 Conflict.

---

## FR-007 — Get All Contacts

| Field       | Detail                          |
| ----------- | ------------------------------- |
| Description | Retrieve contacts with filters  |
| Priority    | Critical                        |
| Method      | GET                             |
| Endpoint    | /api/v2/contacts                |
| Auth        | Requires access token           |

### Query Parameters

* `cursor` — UUID of the last-seen contact (for pagination)
* `limit` — page size (default: 20)
* `search` — partial match on name or email
* `email` — exact email filter
* `sortBy` — comma-separated fields: `createdAt`, `updatedAt` (default: `createdAt`)
* `order` — comma-separated directions: `asc`, `desc` (default: `asc`)

### Success Response (200)

```json
{
  "success": true,
  "data": [
    {
      "id": "cnt-uuid-001",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "address": "Pune, Maharashtra"
    }
  ],
  "pagination": {
    "nextCursor": "cnt-uuid-002",
    "limit": 20
  },
  "error": null
}
```

### Acceptance Criteria

* Non-admin users see only their own contacts.
* Admin users see all contacts.
* Cursor-based pagination with keyset approach.
* Search works on name and email (partial match).
* Email filter provides exact match.
* Sort order customizable.
* Deleted contacts excluded.
* Serializer removes internal fields.

---

## FR-008 — Get Contact By ID

| Field       | Detail                           |
| ----------- | -------------------------------- |
| Description | Retrieve a contact by identifier |
| Priority    | High                             |
| Method      | GET                              |
| Endpoint    | /api/v2/contacts/:id             |
| Auth        | Requires access token            |

### Success Response (200)

```json
{
  "success": true,
  "data": {
    "id": "cnt-uuid-001",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "Pune, Maharashtra"
  },
  "error": null
}
```

### Acceptance Criteria

* Returns matching contact.
* Non-admin users cannot access contacts owned by others.
* Returns HTTP 404 when contact does not exist or not owned.
* Serializer removes internal fields.

---

## FR-009 — Update Contact

| Field       | Detail                     |
| ----------- | -------------------------- |
| Description | Update an existing contact |
| Priority    | High                       |
| Method      | PATCH                      |
| Endpoint    | /api/v2/contacts/:id       |
| Auth        | Requires access token      |

### Request Body

```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "phone": "9999999999",
  "address": "Mumbai"
}
```

### Success Response (200)

```json
{
  "success": true,
  "data": {
    "id": "cnt-uuid-001",
    "name": "Updated Name",
    "email": "updated@example.com",
    "phone": "9999999999",
    "address": "Mumbai"
  },
  "error": null
}
```

### Acceptance Criteria

* Validation executes before update (all fields optional).
* Contact is updated successfully.
* Non-admin users cannot update contacts owned by others.
* Returns HTTP 404 if contact does not exist or not owned.
* Email must be unique if changed.
* Update recorded in audit logs with before/after snapshots.
* Version number incremented automatically.

---

## FR-010 — Delete Contact

| Field       | Detail                                 |
| ----------- | -------------------------------------- |
| Description | Soft delete a contact                  |
| Priority    | High                                   |
| Method      | DELETE                                 |
| Endpoint    | /api/v2/contacts/:id                   |
| Auth        | Requires access token                  |

### Success Response (200)

```json
{
  "success": true,
  "data": null,
  "error": null
}
```

### Acceptance Criteria

* Contact is soft deleted (marked with deleted_at).
* Non-admin users cannot delete contacts owned by others.
* Returns HTTP 404 if contact does not exist or not owned.
* Deleted contacts excluded from list queries.
* Delete recorded in audit logs with before-delete snapshot.

---

## FR-011 — Get Contact Statistics

| Field       | Detail                                       |
| ----------- | -------------------------------------------- |
| Description | Provide contact statistics                    |
| Priority    | Medium                                       |
| Method      | GET                                          |
| Endpoint    | /api/v2/reports/contacts-stats              |
| Auth        | Requires access token                        |

### Success Response (200)

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

* Non-admin users see stats for their own contacts only.
* Admin users see stats for all contacts.
* Total contacts count excludes deleted contacts.
* Added today counts contacts created on current date.
* Most common email domain calculated by @domain extraction.
* Returns null if no contacts exist.

---

## FR-012 — Validation Enforcement

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

## FR-013 — Custom Serialization

| Field       | Detail                                               |
| ----------- | ---------------------------------------------------- |
| Description | Internal fields must not be exposed in API responses |
| Priority    | High                                                 |

### Database Record Example

```typescript
{
  id: "cnt-uuid-001",
  name: "John Doe",
  email: "john@example.com",
  phone: "9876543210",
  address: "Pune, Maharashtra",
  internal_notes: "VIP Customer",
  user_id: "user-uuid-001",
  created_at: "2026-06-24T10:00:00Z",
  updated_at: "2026-06-24T11:00:00Z",
  deleted_at: null,
  version: 1
}
```

### Hidden/Internal Fields

```text
internal_notes
user_id
created_at
updated_at
deleted_at
version
```

### Serialized Response

```json
{
  "id": "cnt-uuid-001",
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

## FR-014 — Request Logging Middleware

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
* Execution time is logged in milliseconds.

---

## FR-015 — Unified Response Format

### Success Response

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

### List Response with Pagination

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
* List endpoints include pagination object.

---

## FR-016 — Custom Error Classes

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

class UnauthorizedError extends AppError {
  status = 401;
  code = "UNAUTHORIZED";
}

class ForbiddenError extends AppError {
  status = 403;
  code = "FORBIDDEN";
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

## FR-017 — JWT Authentication

| Field       | Detail                                        |
| ----------- | --------------------------------------------- |
| Description | Stateless JWT-based authentication             |
| Priority    | Critical                                      |

### Access Token

* **Duration:** 15 minutes
* **Location:** Authorization header (`Bearer <token>`)
* **Payload:** `{ userId, email, role }`

### Refresh Token

* **Duration:** 7 days
* **Location:** HTTP-only cookie (`refreshToken`)
* **Stored in:** Database with revocation flag
* **Rotation:** New token issued on every refresh

### Acceptance Criteria

* Access token verified on protected endpoints.
* Missing/invalid access token returns 401 Unauthorized.
* Refresh token validated against database.
* Token reuse detected and all sessions invalidated.

---

## FR-018 — Role-Based Access Control

| Field       | Detail                                  |
| ----------- | --------------------------------------- |
| Description | Authorization based on user roles       |
| Priority    | High                                    |

### Roles

* **admin** — Full access to all contacts and operations
* **user** — Limited to own contacts

### Enforcement

* Non-admin users cannot list all contacts (only their own).
* Non-admin users cannot view/edit/delete contacts owned by others.
* Admin users can manage all contacts.
* Admin-only endpoints enforced via middleware.

### Acceptance Criteria

* Role checked before resource access.
* Insufficient permissions return 403 Forbidden.
* Non-admin users see only own data.

---

## FR-019 — Audit Logging

| Field       | Detail                                      |
| ----------- | ------------------------------------------- |
| Description | Store update and delete history for data    |
| Priority    | Medium                                      |

### Acceptance Criteria

* Update operations record old and new snapshots.
* Delete operations record before-delete snapshot.
* Audit logs persisted to `contact_audit_logs` table.
* Includes timestamps for all audit entries.

---

# 5. API Routes

| Method | Endpoint                        | Description                                              | Auth Required |
| ------ | ------------------------------- | -------------------------------------------------------- | ------------- |
| POST   | /api/v2/auth/register           | Register new user                                        | No            |
| POST   | /api/v2/auth/login              | Login and get tokens                                     | No            |
| POST   | /api/v2/auth/refresh            | Refresh access token                                     | No            |
| POST   | /api/v2/auth/logout             | Logout from current device                               | No (uses cookie) |
| POST   | /api/v2/auth/logout-all         | Logout from all devices                                  | Yes           |
| GET    | /api/v2/contacts                | Get all contacts with pagination/search/sort            | Yes           |
| GET    | /api/v2/contacts/:id            | Get contact by ID                                        | Yes           |
| POST   | /api/v2/contacts                | Create new contact                                       | Yes           |
| PATCH  | /api/v2/contacts/:id            | Update contact with audit logging                        | Yes           |
| DELETE | /api/v2/contacts/:id            | Soft delete contact with audit logging                   | Yes           |
| GET    | /api/v2/reports/contacts-stats  | Get contact statistics                                   | Yes           |

---

# 6. Validation Rules

## User Registration Schema

| Field    | Type   | Required | Validation                     |
| -------- | ------ | -------- | ------------------------------ |
| email    | string | Yes      | Valid email format             |
| password | string | Yes      | Min 6 characters               |
| role     | enum   | No       | "admin" or "user" (default: user)|

## User Login Schema

| Field    | Type   | Required | Validation                |
| -------- | ------ | -------- | ------------------------- |
| email    | string | Yes      | Valid email format        |
| password | string | Yes      | At least 1 character      |

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

const updateContactSchema = contactSchema.partial();
```

## Contact List Query Schema

| Field   | Type   | Required | Validation                            |
| ------- | ------ | -------- | ------------------------------------- |
| cursor  | uuid   | No       | Valid UUID for pagination             |
| limit   | number | No       | Default 20                            |
| search  | string | No       | Min 1 character for name/email match  |
| email   | string | No       | Valid email format for exact match    |
| sortBy  | string | No       | Comma-separated: createdAt, updatedAt |
| order   | string | No       | Comma-separated: asc, desc            |

---

# 7. Data Specifications

## User Entity

```typescript
interface User {
  id: string;
  email: string;
  password_hash: string;
  role: "admin" | "user";
  created_at: Date;
  updated_at: Date;
}
```

## Contact Entity

```typescript
interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  user_id: string;
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

## Refresh Token Entity

```typescript
interface RefreshToken {
  id: string;
  user_id: string;
  token: string;
  expires_at: Date;
  revoked: boolean;
  created_at: Date;
}
```

## Audit Log Entity

```typescript
interface AuditLog {
  id: number;
  contact_id: string;
  action: "UPDATE" | "DELETE";
  old_data: Contact;
  new_data: Contact | null;
  changed_at: Date;
}
```

---

# 8. Architecture Specification

## Controller Layer

### Responsibilities

* Receive HTTP requests.
* Extract request parameters and body.
* Validate inputs via schema validation.
* Call service methods.
* Return formatted responses via middleware.
* Extract user from JWT in request object.

### Must NOT

* Contain business logic.
* Access repositories directly.
* Handle error transformation.

---

## Service Layer

### Responsibilities

* Execute business logic.
* Orchestrate validation results and repository access.
* Enforce business rules (unique email, ownership checks).
* Apply serialization.
* Throw domain-specific errors.
* Handle role-based authorization checks.

### Must NOT

* Handle raw HTTP request or response objects.
* Directly interact with database.
* Handle token management (auth service exception).

---

## Repository Layer

### Responsibilities

* Perform data persistence and retrieval.
* Implement MySQL queries for v2.
* Provide cursor pagination with keyset approach.
* Provide search and filter capabilities.
* Implement soft deletes.
* Provide stats queries (count, domain aggregation).

### Must NOT

* Contain business logic.
* Return HTTP responses.
* Handle error transformation.

---

## Middleware Layer

### Logger Middleware

* Logs request method, URL, status code, and execution time.
* Executes before request reaches controllers.

### Error Middleware

* Catches errors from controllers and services.
* Transforms custom errors into unified response format.
* Returns appropriate HTTP status codes.
* Logs errors for debugging.

### Auth Middleware

* Extracts JWT from Authorization header.
* Verifies token signature and expiration.
* Attaches decoded user payload to request object.
* Enforces role-based access via `requireRole` middleware.

---

# 9. Environment Configuration

## config.ts

```typescript
export const config = {
  port: process.env.PORT || "3001",
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL || "",
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "default_access_secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
};
```

### Database config

* `src/config/db.ts` loads `.env.<environment>` by default.
* MySQL pool settings use `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.

### Environment Files

```text
.env.development
.env.staging
.env.production
```

### Required Environment Variables

* `PORT` — Server port (default: 3001)
* `NODE_ENV` — Environment name (development/staging/production)
* `DB_HOST` — MySQL host
* `DB_PORT` — MySQL port
* `DB_USER` — MySQL user
* `DB_PASSWORD` — MySQL password
* `DB_NAME` — Database name
* `JWT_ACCESS_SECRET` — Secret key for access tokens
* `JWT_REFRESH_SECRET` — Secret key for refresh tokens

---

# 10. Error Handling Specification

## HTTP Status Codes

| Status Code | Meaning                        |
| ----------- | ------------------------------ |
| 200         | Request completed successfully |
| 201         | Resource created successfully  |
| 400         | Validation failed              |
| 401         | Unauthorized (missing/invalid token) |
| 403         | Forbidden (insufficient permissions) |
| 404         | Contact not found              |
| 409         | Duplicate email exists         |
| 500         | Internal server error          |

---

## Error Response Examples

### 400 Bad Request

```json
{
  "success": false,
  "data": null,
  "error": {
    "status": 400,
    "code": "VALIDATION_ERROR",
    "message": "Phone number must contain exactly 10 digits"
  }
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "data": null,
  "error": {
    "status": 401,
    "code": "INVALID_ACCESS_TOKEN",
    "message": "Invalid or expired access token"
  }
}
```

### 403 Forbidden

```json
{
  "success": false,
  "data": null,
  "error": {
    "status": 403,
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Insufficient permissions to perform this action"
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

# 11. Authentication & Authorization Flow

## Registration Flow

```
1. User POST /register { email, password, role }
2. Validate input
3. Hash password with bcryptjs
4. Store user in database
5. Return user details (201 Created)
```

## Login Flow

```
1. User POST /login { email, password }
2. Validate credentials
3. Generate access token (15m expiry)
4. Generate refresh token (7d expiry)
5. Store refresh token in database
6. Return access token in response
7. Set refreshToken cookie (HTTP-only, secure)
```

## Token Refresh Flow

```
1. Client POST /refresh (with refreshToken cookie)
2. Extract and validate refresh token from database
3. Detect token reuse: if revoked, invalidate all user sessions
4. Revoke old refresh token
5. Generate new access token
6. Generate new refresh token (rotation)
7. Store new refresh token in database
8. Return new access token
9. Set new refreshToken cookie
```

## Protected Request Flow

```
1. Client sends request with Authorization: Bearer <accessToken>
2. authenticateToken middleware extracts and validates token
3. Attach decoded user payload to request.user
4. Controller processes request
5. Service enforces ownership/role checks
6. Repository performs data operation
7. Serialize response
8. Return to client
```

## Logout Flow

### Single Device (POST /logout)

```
1. User POST /logout (with refreshToken cookie)
2. Find refresh token in database
3. Mark as revoked
4. Clear refreshToken cookie
5. Return success (200 OK)
```

### All Devices (POST /logout-all)

```
1. User POST /logout-all (with accessToken header)
2. Extract userId from access token
3. Mark ALL refresh tokens for user as revoked
4. Clear refreshToken cookie
5. Return success (200 OK)
```

---

# 12. Cursor Pagination Implementation

## Keyset-Based Pagination

* Uses composite key: `(created_at, id)`
* Cursor is the ID of the last-seen contact.
* Subsequent query filters: `(created_at, id) > (cursor_created_at, cursor_id)`
* Ensures stable pagination even when data changes.

## Pagination Response

```json
{
  "success": true,
  "data": [ /* contacts */ ],
  "pagination": {
    "nextCursor": "uuid-of-last-contact",
    "limit": 20
  },
  "error": null
}
```

* `nextCursor` is null when no more pages available.
* `limit` indicates the page size used.

---

# 13. Database Schema

## users Table

```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## contacts Table

```sql
CREATE TABLE contacts (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(10) NOT NULL,
  address VARCHAR(255) NOT NULL,
  internal_notes TEXT,
  version INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE KEY unique_email_per_user (email, user_id, deleted_at)
);
```

## refresh_tokens Table

```sql
CREATE TABLE refresh_tokens (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  token LONGTEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  revoked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## contact_audit_logs Table

```sql
CREATE TABLE contact_audit_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contact_id VARCHAR(36) NOT NULL,
  action ENUM('UPDATE', 'DELETE') NOT NULL,
  old_data JSON NOT NULL,
  new_data JSON,
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (contact_id) REFERENCES contacts(id)
);
```

---

