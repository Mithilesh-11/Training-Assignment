# Technical Specifications — TypeScript Fundamentals (Part 2) Learning Assignment

**Product:** TypeScript Fundamentals (Part 2) Learning Assignment

---

# 1. Executive Summary

This document outlines the technical specification for a TypeScript learning assignment focused on advanced type system features. The assignment covers generic types, utility types, type narrowing, type guards, and enums. The goal is to ensure strong type safety, reusable type definitions, and proper type inference through compile-time validation.

---

# 2. Glossary & Definitions

| Term               | Definition                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| ApiResponse<T>     | A generic type representing a standard API response structure containing data of type T.                      |
| User               | An interface defining the complete structure of a user entity.                                                |
| UserPreview        | A derived type containing only selected User properties for preview/display purposes.                         |
| Utility Types      | Built-in TypeScript types such as Pick, Omit, Partial, Record, and Readonly used to transform existing types. |
| ErrorResponse      | A type representing an API error response containing an error message.                                        |
| SuccessResponse<T> | A type representing a successful API response containing data of type T.                                      |
| isErrorResponse    | A user-defined type guard used to distinguish error responses from successful responses.                      |
| Direction          | An enum representing directional values.                                                                      |

---

# 3. Scope

## 3.1. In Scope

| Module                       | Description                                                         |
| ---------------------------- | ------------------------------------------------------------------- |
| Generic API Response Type    | Creation and usage of ApiResponse<T> with multiple data structures. |
| Utility Type Transformations | Use of Pick and Omit to derive new types from existing interfaces.  |
| Type Guards                  | Creation of custom type guards for safe type narrowing.             |
| Type Narrowing               | Use of narrowing techniques through user-defined type guards.       |
| Enum Definition              | Creation and usage of a Direction enum.                             |
| Compiler Error Validation    | Documentation of expected TypeScript compile-time errors.           |

## 3.2. Out of Scope

* API implementation details.
* Backend service development.
* Database schema design.
* UI rendering logic.
* Runtime validation libraries.
* Network request implementation.

---

# 4. Functional Requirements

## FR-001 — Define Generic ApiResponse<T>

| Field               | Detail                                                                                                                                                                                          |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | A reusable generic type ApiResponse<T> must be defined to represent successful API responses containing different data structures.                                                              |
| Priority            | Critical                                                                                                                                                                                        |
| Source              | Assignment Requirements                                                                                                                                                                         |
| Acceptance Criteria | <ul><li>ApiResponse<T> contains success, data, and message properties.</li><li>The data property must use generic type T.</li><li>The generic type must support multiple data shapes.</li></ul> |
| Stored Data         | Generic response data                                                                                                                                                                           |

---

## FR-002 — Use ApiResponse<T> With User Data

| Field               | Detail                                                                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Description         | ApiResponse<T> must be used with a User data structure.                                                                    |
| Priority            | High                                                                                                                       |
| Source              | Assignment Requirements                                                                                                    |
| Acceptance Criteria | <ul><li>ApiResponse<User> compiles successfully.</li><li>The data property follows the User interface structure.</li></ul> |
| Stored Data         | User                                                                                                                       |

---

## FR-003 — Use ApiResponse<T> With Product Data

| Field               | Detail                                                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Description         | ApiResponse<T> must be used with a Product data structure.                                                                       |
| Priority            | High                                                                                                                             |
| Source              | Assignment Requirements                                                                                                          |
| Acceptance Criteria | <ul><li>ApiResponse<Product> compiles successfully.</li><li>The data property follows the Product interface structure.</li></ul> |
| Stored Data         | Product                                                                                                                          |

---

## FR-004 — Use ApiResponse<T> With Array Data

| Field               | Detail                                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Description         | ApiResponse<T> must be used with an array type.                                                                          |
| Priority            | High                                                                                                                     |
| Source              | Assignment Requirements                                                                                                  |
| Acceptance Criteria | <ul><li>ApiResponse<User[]> compiles successfully.</li><li>The data property accepts an array of User objects.</li></ul> |
| Stored Data         | User Collection                                                                                                          |

---

## FR-005 — Derive UserPreview Using Pick

| Field               | Detail                                                                                                            |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Description         | A UserPreview type must be created using Pick to expose only selected User properties.                            |
| Priority            | High                                                                                                              |
| Source              | Assignment Requirements                                                                                           |
| Acceptance Criteria | <ul><li>UserPreview includes id and name properties.</li><li>No additional User properties are present.</li></ul> |
| Stored Data         | User Preview                                                                                                      |

---

## FR-006 — Derive UserWithoutPassword Using Omit

| Field               | Detail                                                                                                |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| Description         | A new type must be created using Omit to exclude sensitive information from User.                     |
| Priority            | High                                                                                                  |
| Source              | Assignment Requirements                                                                               |
| Acceptance Criteria | <ul><li>Password property is excluded.</li><li>All remaining User properties are preserved.</li></ul> |
| Stored Data         | User Without Password                                                                                 |

---

## FR-007 — Define ErrorResponse Type

| Field               | Detail                                                                                                |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| Description         | A type representing API error responses must be defined.                                              |
| Priority            | High                                                                                                  |
| Source              | Assignment Requirements                                                                               |
| Acceptance Criteria | <ul><li>Contains an error property of type string.</li><li>Can participate in a union type.</li></ul> |
| Stored Data         | Error Information                                                                                     |

---

## FR-008 — Implement isErrorResponse Type Guard

| Field               | Detail                                                                                                                 |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Description         | A custom type guard must determine whether a response is an ErrorResponse.                                             |
| Priority            | Critical                                                                                                               |
| Source              | Assignment Requirements                                                                                                |
| Acceptance Criteria | <ul><li>Returns a boolean.</li><li>Uses property existence checks.</li><li>Narrows the union type when true.</li></ul> |
| Stored Data         | None                                                                                                                   |

---

## FR-009 — Validate Type Narrowing

| Field               | Detail                                                                                                                                                    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | The type guard must allow safe access to type-specific properties after narrowing.                                                                        |
| Priority            | High                                                                                                                                                      |
| Source              | Assignment Requirements                                                                                                                                   |
| Acceptance Criteria | <ul><li>Error properties can be accessed only after successful narrowing.</li><li>Success data can be accessed only when not an error response.</li></ul> |
| Stored Data         | None                                                                                                                                                      |

---

## FR-010 — Define Direction Enum

| Field               | Detail                                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| Description         | An enum named Direction must represent directional values.                                         |
| Priority            | Medium                                                                                             |
| Source              | Assignment Requirements                                                                            |
| Acceptance Criteria | <ul><li>Enum contains UP and DOWN values.</li><li>Only valid enum values are assignable.</li></ul> |
| Stored Data         | Direction                                                                                          |

---

# 5. Data Specifications

## 5.1. Entity: User

| Field    | Type   | Constraints | Description            |
| -------- | ------ | ----------- | ---------------------- |
| id       | number | Required    | Unique user identifier |
| name     | string | Required    | User name              |
| email    | string | Required    | User email             |
| password | string | Required    | User password          |

---

## 5.2. Entity: Product

| Field | Type   | Constraints | Description        |
| ----- | ------ | ----------- | ------------------ |
| id    | number | Required    | Product identifier |
| title | string | Required    | Product name       |
| price | number | Required    | Product price      |

---

## 5.3. Type Definitions

### Generic Type: ApiResponse<T>

```typescript
type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};
```

Reason:

* Provides a reusable API response structure.
* Supports any data shape through generics.
* Eliminates duplication across response models.

---

### Interface: User

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}
```

---

### Interface: Product

```typescript
interface Product {
  id: number;
  title: string;
  price: number;
}
```

---

### Derived Type: UserPreview

```typescript
type UserPreview = Pick<
  User,
  "id" | "name"
>;
```

Reason:

* Selects only fields required for preview displays.
* Prevents exposure of unnecessary information.

---

### Derived Type: UserWithoutPassword

```typescript
type UserWithoutPassword =
  Omit<User, "password">;
```

Reason:

* Removes sensitive information.
* Useful when returning user data to clients.

---

### Error Response Type

```typescript
type ErrorResponse = {
  error: string;
};
```

---

### Union Type

```typescript
type ApiResult<T> =
  | ApiResponse<T>
  | ErrorResponse;
```

---

### Type Guard

```typescript
function isErrorResponse(
  data: ApiResult<any>
): data is ErrorResponse;
```

Pseudocode:

1. Receive response object.
2. Check if "error" property exists.
3. If property exists:

   * Return true.
4. Otherwise:

   * Return false.

---

### Enum: Direction

```typescript
enum Direction {
  UP,
  DOWN
}
```

---

# 6. Utility Type Transformations

| Utility Type              | Transformation                                    |
| ------------------------- | ------------------------------------------------- |
| Pick<User, "id" | "name"> | Creates UserPreview with only id and name.        |
| Omit<User, "password">    | Creates UserWithoutPassword by removing password. |
| Partial<User>             | Makes all User properties optional.               |
| Readonly<User>            | Makes all User properties immutable.              |
| Record<string, User>      | Creates a key-value map of users.                 |

---

# 7. Expected TypeScript Compiler Errors

### 1. Invalid ApiResponse Data Shape

```typescript
const response: ApiResponse<User> = {
  success: true,
  data: {
    id: 1
  },
  message: "Success"
};
```

Expected Compiler Error:

```text
Property 'name' is missing in type '{ id: number; }'
but required in type 'User'.
```

---

### 2. Invalid UserPreview Property

```typescript
const preview: UserPreview = {
  id: 1,
  email: "test@test.com"
};
```

Expected Compiler Error:

```text
Object literal may only specify known properties.
```

---

### 3. Accessing Password From UserPreview

```typescript
preview.password;
```

Expected Compiler Error:

```text
Property 'password' does not exist on type 'UserPreview'.
```

---

### 4. Invalid Enum Value

```typescript
const direction: Direction =
  "LEFT";
```

Expected Compiler Error:

```text
Type '"LEFT"' is not assignable to type 'Direction'.
```

---

### 5. Accessing Error Property Without Narrowing

```typescript
const result: ApiResult<User> = response;

console.log(result.error);
```

Expected Compiler Error:

```text
Property 'error' does not exist on type 'ApiResult<User>'.
```

---

### 6. Invalid Type Guard Return

```typescript
function isErrorResponse(
  data: ApiResult<User>
): string {
  return "true";
}
```

Expected Compiler Error:

```text
Type 'string' is not assignable to type 'boolean'.
```
