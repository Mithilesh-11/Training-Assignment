# Technical Specifications — Upload Service API

**Product:** Upload Service API

**Version:** 1.0

---

# 1. Executive Summary

This document defines the technical specification for the Upload Service REST API. The system supports file upload management through Cloudinary, with secure file validation, retry mechanisms, and comprehensive error handling.

The application enforces:
- Multipart file upload handling via Multer
- Cloudinary integration for cloud storage
- Dual-level file validation (MIME type + magic bytes)
- Retry logic with exponential backoff
- Layered architecture (Controller → Service → Repository)
- Unified response handling
- Custom error management
- Swagger/OpenAPI documentation
- Support for profile images and documents

The application follows a layered architecture:

```text
Controller → Service → Repository
```

Controllers orchestrate HTTP requests, Services contain business logic, and Repositories manage external integrations (Cloudinary).

---

# 2. Glossary & Definitions

| Term                 | Definition                                                                  |
| -------------------- | --------------------------------------------------------------------------- |
| Upload               | Process of sending files to the server for storage in Cloudinary.           |
| Cloudinary           | Third-party cloud storage service for media file management.                |
| Multer               | Express middleware for handling multipart/form-data file uploads.           |
| MIME Type            | Standardized way to indicate file type (e.g., image/jpeg).                  |
| Magic Bytes          | File signature bytes used to verify true file type.                         |
| File Validation      | Process of verifying file authenticity and compliance with requirements.    |
| Retry Mechanism      | Automatic re-attempt of failed operations with exponential backoff.         |
| Exponential Backoff  | Progressive delay strategy: 1s, 2s, 4s for retry attempts.                 |
| Public ID            | Cloudinary's unique identifier for stored files.                           |
| Resource Type        | Cloudinary classification: image, video, raw.                              |
| Folder Structure     | Hierarchical path: uploads/{category}/{userId}/{year}/{month}/{day}.       |
| Security Alert       | Detection and rejection of malicious files or spoofed MIME types.          |
| AppError             | Custom exception class for application-specific errors.                     |
| MulterError          | Exception thrown by Multer for upload-related issues.                       |
| Serialization        | Process of formatting upload response data.                                 |

---

# 3. Scope

## 3.1 In Scope

| Module                          | Description                                                      |
| ------------------------------- | ---------------------------------------------------------------- |
| Profile Image Upload            | Upload and store profile images (JPEG, PNG, WEBP)                |
| Document Upload                 | Upload and store documents (PDF, DOC, DOCX)                      |
| File Validation                 | MIME type + magic bytes validation for security                  |
| Cloudinary Integration          | Cloud storage via Cloudinary API                                 |
| Retry Mechanism                 | Exponential backoff retry for failed uploads                      |
| Error Handling                  | Custom error classes and error middleware                         |
| File Organization               | Hierarchical folder structure by user, date, and category         |
| Response Formatting             | Unified API response structure                                    |
| API Documentation               | Swagger/OpenAPI specification and UI                              |
| Memory Storage                  | Multer in-memory buffer for file processing                       |
| File Size Limits                | Enforce size constraints per file type                            |
| CORS Support                    | Cross-origin resource sharing enabled                             |
| Development Server              | Express server with environment configuration                     |

## 3.2 Out of Scope

* Database storage (only Cloudinary)
* User authentication/authorization
* Rate limiting
* File compression
* Virus scanning
* Email notifications
* File versioning or history tracking
* Batch uploads
* Image resizing or transformation
* CDN configuration
* Analytics or usage tracking
* File sharing or permissions
* Multi-language support

---

# 4. Functional Requirements

## FR-001 — Upload Profile Image

| Field       | Detail                        |
| ----------- | ----------------------------- |
| Description | Upload and store a profile image |
| Priority    | Critical                      |
| Method      | POST                          |
| Endpoint    | /api/v1/upload/profile        |

### Request

- **Content-Type:** multipart/form-data
- **Field Name:** file
- **File Types:** JPEG, PNG, WEBP
- **Max Size:** 5 MB

### Success Response (200)

```json
{
  "success": true,
  "message": "Profile image uploaded successfully.",
  "data": {
    "url": "https://res.cloudinary.com/demo/image/upload/v123/avatar.png",
    "publicId": "uploads/profile/1/2026/06/26/550e8400-avatar",
    "folder": "uploads/profile/1/2026/06/26",
    "originalName": "avatar.png",
    "fileName": "550e8400-avatar.png",
    "mimeType": "image/png",
    "size": 245812,
    "resourceType": "image"
  }
}
```

### Acceptance Criteria

* File must be provided in multipart form data.
* File size must not exceed 5 MB.
* File MIME type must be image/jpeg, image/png, or image/webp.
* Magic bytes verification must confirm true file type.
* File stored in folder: `uploads/profile/{userId}/{year}/{month}/{day}`.
* Filename generated as UUID + sanitized original name.
* HTTP Status 200 is returned on success.
* Uploaded URL is accessible via Cloudinary CDN.
* Internal metadata persisted in response.

---

## FR-002 — Upload Document

| Field       | Detail                        |
| ----------- | ----------------------------- |
| Description | Upload and store a document   |
| Priority    | Critical                      |
| Method      | POST                          |
| Endpoint    | /api/v1/upload/document       |

### Request

- **Content-Type:** multipart/form-data
- **Field Name:** file
- **File Types:** PDF, DOC, DOCX
- **Max Size:** 10 MB

### Success Response (200)

```json
{
  "success": true,
  "message": "Document uploaded successfully.",
  "data": {
    "url": "https://res.cloudinary.com/demo/raw/upload/v456/contract.pdf",
    "publicId": "uploads/document/1/2026/06/26/550e8400-contract",
    "folder": "uploads/document/1/2026/06/26",
    "originalName": "contract.pdf",
    "fileName": "550e8400-contract.pdf",
    "mimeType": "application/pdf",
    "size": 2048576,
    "resourceType": "raw"
  }
}
```

### Acceptance Criteria

* File must be provided in multipart form data.
* File size must not exceed 10 MB.
* File MIME type must be application/pdf, application/msword, or application/vnd.openxmlformats-officedocument.wordprocessingml.document.
* Magic bytes verification must confirm true file type.
* File stored in folder: `uploads/document/{userId}/{year}/{month}/{day}`.
* Filename generated as UUID + sanitized original name.
* HTTP Status 200 is returned on success.
* Uploaded URL is accessible via Cloudinary CDN.
* Resource type automatically determined by Cloudinary.

---

## FR-003 — File Validation (Two-Layer Security)

| Field       | Detail                                      |
| ----------- | ------------------------------------------- |
| Description | Validate files using MIME type + magic bytes |
| Priority    | Critical                                    |

### Layer 1: MIME Type Pre-Filter

- Fast client-provided metadata check.
- Prevents obviously malicious files from consuming server RAM.
- Executed by Multer file filter.

### Layer 2: Magic Bytes Deep Scan

- Verifies true file type using magic bytes from file buffer.
- Detects and rejects spoofed files.
- Executed in middleware after file upload.

### Acceptance Criteria

* Both validation layers must pass.
* MIME type validation occurs before file buffering.
* Magic bytes validation occurs after file buffering.
* Spoofed files rejected with security alert message.
* Invalid file types return HTTP 400 with descriptive error.

---

## FR-004 — Retry Mechanism with Exponential Backoff

| Field       | Detail                                          |
| ----------- | ----------------------------------------------- |
| Description | Automatic retry for failed upload operations    |
| Priority    | High                                            |

### Retry Configuration

- **Max Attempts:** 4
- **Initial Delay:** 1000 ms
- **Backoff Multiplier:** 2 (exponential)
- **Retry Delays:** 1s, 2s, 4s (between attempts)

### Retry Flow

```
Attempt 1 (initial) → Fail
Wait 1s
Attempt 2 → Fail
Wait 2s
Attempt 3 → Fail
Wait 4s
Attempt 4 → Fail or Success
```

### Acceptance Criteria

* Failed operations automatically retry.
* Exponential backoff prevents server overload.
* Maximum 4 total attempts (1 initial + 3 retries).
* Final failure throws error to caller.
* Retry logic transparent to controller layer.

---

## FR-005 — File Organization and Naming

| Field       | Detail                                  |
| ----------- | --------------------------------------- |
| Description | Organize uploaded files in folder hierarchy |
| Priority    | High                                    |

### Folder Structure

```
uploads/
  ├── profile/
  │   └── {userId}/
  │       └── {year}/
  │           └── {month}/
  │               └── {day}/
  └── document/
      └── {userId}/
          └── {year}/
              └── {month}/
                  └── {day}/
```

### Filename Generation

- Format: `{UUID}-{sanitized-original-name}{extension}`
- Example: `550e8400-e29b-41d4-a716-446655440000-contract.pdf`
- Sanitization: Remove special characters, replace spaces with hyphens, lowercase conversion.

### Acceptance Criteria

* Folder structure created dynamically based on upload date.
* User ID extracted from request context.
* Filename includes random UUID for uniqueness.
* Original filename sanitized to prevent path traversal.
* Extension preserved from original file.

---

## FR-006 — Cloudinary Integration

| Field       | Detail                                      |
| ----------- | ------------------------------------------- |
| Description | Upload files to Cloudinary cloud storage    |
| Priority    | Critical                                    |

### Configuration

- Cloud Name, API Key, API Secret from environment variables.
- Secure HTTPS connection enabled.
- Resource type auto-detected (image, raw, video).
- Overwrite disabled (preserves versions).

### Upload Process

1. Convert file buffer to Base64 data URI.
2. Send to Cloudinary with folder path and public ID.
3. Receive response with secure URL and metadata.
4. Extract and return relevant fields.

### Acceptance Criteria

* Cloudinary credentials loaded from environment.
* Base64 encoding handles binary file conversion.
* Public ID preserves hierarchical folder structure.
* Resource type automatically determined.
* Secure HTTPS URLs returned for all files.

---

## FR-007 — Unified Response Format

### Success Response

```json
{
  "success": true,
  "message": "string",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description"
}
```

### Upload Data Structure

```typescript
{
  url: string;              // Cloudinary HTTPS URL
  publicId: string;         // Cloudinary public ID
  folder: string;           // Upload folder path
  originalName: string;     // Original filename
  fileName: string;         // Generated filename with UUID
  mimeType: string;         // File MIME type
  size: number;             // File size in bytes
  resourceType: string;     // Cloudinary resource type
}
```

### Acceptance Criteria

* All endpoints return consistent top-level structure.
* Success response includes `success: true`, `message`, `data`.
* Error response includes `success: false`, `message`.
* Upload data includes complete metadata for client.

---

## FR-008 — Error Handling

| Field       | Detail                                 |
| ----------- | -------------------------------------- |
| Description | Comprehensive error handling and responses |
| Priority    | High                                   |

### AppError Class

```typescript
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly success = false;
  public readonly isOperational: boolean;
}
```

### Error Types

| Error Type       | Status | Cause                                    |
| ---------------- | ------ | ---------------------------------------- |
| No File          | 400    | Missing file in request                  |
| Invalid MIME     | 400    | Invalid file type provided in headers    |
| Security Alert   | 400    | Magic bytes don't match MIME type        |
| File Too Large   | 413    | File exceeds size limits                 |
| Validation Error | 400    | General validation failure               |
| Network Error    | 500    | Cloudinary connection issues             |
| Server Error     | 500    | Unexpected application errors            |

### Error Response Example

```json
{
  "success": false,
  "message": "Only authentic JPEG, PNG, and WEBP images are allowed."
}
```

### Acceptance Criteria

* All errors inherit from AppError.
* Custom HTTP status codes returned.
* Descriptive error messages provided.
* Multer errors caught and transformed.
* Stack trace included in development mode.

---

## FR-009 — Request Validation

| Field       | Detail                                  |
| ----------- | --------------------------------------- |
| Description | Validate incoming upload requests       |
| Priority    | High                                    |

### Validation Checks

1. **File Presence:** Ensure file field exists in request.
2. **MIME Type:** Check against allowed types.
3. **File Size:** Verify size within limits.
4. **Magic Bytes:** Confirm true file type.
5. **Extension:** Ensure proper file extension.

### Field Constraints

| Field    | Type             | Required | Validation                                      |
| -------- | ---------------- | -------- | ----------------------------------------------- |
| file     | multipart file   | Yes      | MIME type + magic bytes + size limit            |

### Acceptance Criteria

* Validation occurs before Cloudinary upload.
* Invalid requests rejected with HTTP 400.
* Validation messages identify specific issues.
* Invalid data never reaches Cloudinary.

---

## FR-010 — Swagger/OpenAPI Documentation

| Field       | Detail                                  |
| ----------- | --------------------------------------- |
| Description | API documentation via Swagger UI        |
| Priority    | Medium                                  |

### Documentation Includes

- OpenAPI 3.0.3 specification.
- Endpoint descriptions and examples.
- Request/response schemas.
- Error response definitions.
- MIME type specifications.
- File size constraints.

### Access

- **Swagger UI:** `/api-docs`
- **OpenAPI JSON:** Available in Swagger UI

### Acceptance Criteria

* All endpoints documented.
* Request/response examples provided.
* Schema definitions complete.
* Swagger UI accessible and functional.

---

# 5. API Routes

| Method | Endpoint              | Description                | Auth Required |
| ------ | --------------------- | -------------------------- | ------------- |
| POST   | /api/v1/upload/profile   | Upload profile image       | No            |
| POST   | /api/v1/upload/document  | Upload document            | No            |
| GET    | /                        | Health check               | No            |
| GET    | /api-docs                | Swagger UI documentation   | No            |

---

# 6. Validation Rules

## Profile Image Upload

| Field       | Type             | Required | Validation                             |
| ----------- | ---------------- | -------- | -------------------------------------- |
| file        | multipart file   | Yes      | MIME: JPEG, PNG, WEBP; Size: ≤ 5 MB   |

## Document Upload

| Field       | Type             | Required | Validation                             |
| ----------- | ---------------- | -------- | -------------------------------------- |
| file        | multipart file   | Yes      | MIME: PDF, DOC, DOCX; Size: ≤ 10 MB   |

### Allowed MIME Types

**Images:**
```
image/jpeg
image/png
image/webp
```

**Documents:**
```
application/pdf
application/msword
application/vnd.openxmlformats-officedocument.wordprocessingml.document
```
---

# 7. File Size & Type Constraints

## Profile Images

| Constraint   | Value                                        |
| ------------ | -------------------------------------------- |
| Max Size     | 5 MB (5242880 bytes)                        |
| MIME Types   | image/jpeg, image/png, image/webp           |
| Extensions   | .jpg, .jpeg, .png, .webp                    |

## Documents

| Constraint   | Value                                        |
| ------------ | -------------------------------------------- |
| Max Size     | 10 MB (10485760 bytes)                      |
| MIME Types   | application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document |
| Extensions   | .pdf, .doc, .docx                           |

---