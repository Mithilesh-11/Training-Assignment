# Technical Specifications — TypeScript Fundamentals Learning Assignment

**Product:** TypeScript Fundamentals Learning Assignment 

## 1. Executive Summary

This document outlines the technical specification for a TypeScript learning assignment. It details the declarative policy for defining type-safe interfaces, function type annotations, and union types, ensuring adherence to strict TypeScript compilation rules.

## 2. Glossary & Definitions

| Term | Definition |
|------|------------|
| User | An interface defining the structure for user objects, including id, name, email, and isActive properties. |
| ApiResponseState | A union type representing the distinct states of an API response: 'loading', 'success', or 'error'. |
| formatFullName | A function accepting firstName and lastName (both strings) and returning a concatenated full name string. |
| calculateTotalPrice | A function accepting an array of items (numbers) and a discount (number), returning the calculated total price. |
| checkIfUserIsActive | A function accepting a User object and returning a boolean indicating if the user is active. |


## 3. Scope

### 3.1. In Scope

| Module | Description |
|---------|-------------|
| User Interface Definition | Specification of the User interface with required, optional, and readonly properties. |
| Function Type Annotations | Definition of type signatures for formatFullName, calculateTotalPrice, and checkIfUserIsActive functions. |
| ApiResponseState Union Type | Creation of a union type to represent distinct API response states. |
| Compiler Error Scenarios | Explicit documentation of expected TypeScript compiler errors for invalid usage of defined types and functions. |

### 3.2. Out of Scope

- User Interface (UI) design or implementation details.
- Backend service implementation or API endpoint definitions.
- Specific runtime logic for the functions beyond their type signatures.
- Database schemas or data storage mechanisms.
- Authentication or authorization mechanisms.
- Performance optimizations.

## 4. Functional Requirements

### FR-001 — Define User Interface

| Field | Detail |
|--------|--------|
| Description | The User interface must define the structure of a user object containing a readonly identifier, a required name, and optional email and activity status properties. |
| Priority | Critical |
| Source | constraints, context |
| Acceptance Criteria | <ul><li>The id property is defined as readonly number.</li><li>The name property is defined as string.</li><li>The email property is defined as optional string.</li><li>The isActive property is defined as optional boolean.</li></ul> |
| Stored Data | User (id, name, email, isActive) |

### FR-002 —  Define formatFullName Function Type

| Field | Detail |
|--------|--------|
| Description | The formatFullName function must accept a first name and a last name, both as strings, and return a single string representing the full name. |
| Priority | High |
| Source | context |
| Acceptance Criteria | <ul><li>The firstName parameter is typed as string.</li><li>The lastName parameter is typed as string.</li><li>The function's return type is string.</li></ul> |
| Stored Data |  |

### FR-003 —  Define calculateTotalPrice Function Type

| Field | Detail |
|--------|--------|
| Description | The calculateTotalPrice function must accept an array of numbers representing item prices and a number representing a discount, then return a number representing the calculated total. |
| Priority | High |
| Source | context |
| Acceptance Criteria | <ul><li>The items parameter is typed as number[].</li><li>The discount parameter is typed as number.</li><li>The function's return type is number.</li></ul> |
| Stored Data |  |

### FR-004 —  Define checkIfUserIsActive Function Type

| Field | Detail |
|--------|--------|
| Description | The checkIfUserIsActive function must accept a User object and return a boolean indicating whether the user is active. |
| Priority | High |
| Source | context |
| Acceptance Criteria | <ul><li>The user parameter is typed as User.</li><li>The function's return type is boolean.</li></ul> |
| Stored Data | User (isActive) |

### FR-005 — Define API Response State Union Type

| Field | Detail |
|--------|--------|
| Description | A union type named ApiResponseState must be defined to represent the three possible states of an API response: 'loading', 'success', and 'error'. |
| Priority | High |
| Source | context |
| Acceptance Criteria | <ul><li>The ApiResponseState type is defined as <code>'loading' \| 'success' \| 'error'</code>.</li><li>No other string values are permitted.</li></ul> |
| Stored Data |  |

### FR-006 —  Validate Invalid User Object Assignment

| Field | Detail |
|--------|--------|
| Description | The TypeScript compiler must report an error when an object that does not conform to the User interface structure is assigned to a User type. |
| Priority | High |
| Source | constraints |
| Acceptance Criteria | <ul><li>Attempting to assign { id: 1, name: 'John' } to a User variable without email and isActive does not produce an error because they are optional.</li><li>Attempting to assign { name: 'John', email: 'a@b.com' } to a User variable produces a compiler error due to the missing id property.</li><li>Attempting to modify the id property of a User object produces a compiler error.</li><li>Attempting to assign a non-string value to name property produces a compiler error.</li></ul> |
| Stored Data |  |

### FR-007 —  Validate Invalid formatFullName Call

| Field | Detail |
|--------|--------|
| Description | The TypeScript compiler must report an error when formatFullName is called with arguments that do not match its defined type signature. |
| Priority | High |
| Source | constraints |
| Acceptance Criteria | <ul><li>Calling formatFullName(123, 'Doe') produces a compiler error because 123 is not a string.</li><li>Calling formatFullName('John') produces a compiler error due to missing the lastName argument.</li></ul> |
| Stored Data |  |

### FR-008 —  Validate Invalid calculateTotalPrice Call

| Field | Detail |
|--------|--------|
| Description | The TypeScript compiler must report an error when calculateTotalPrice is called with arguments that do not match its defined type signature. |
| Priority | High |
| Source | constraints |
| Acceptance Criteria | <ul><li>Calling calculateTotalPrice([10, 20], '5%') produces a compiler error because '5%' is not a number.</li><li>Calling calculateTotalPrice([10, '20'], 5) produces a compiler error because '20' is not a number within the items array.</li></ul> |
| Stored Data |  |

### FR-009 —  Validate Invalid checkIfUserIsActive Call

| Field | Detail |
|--------|--------|
| Description | The TypeScript compiler must report an error when checkIfUserIsActive is called with an argument that does not conform to the User type. |
| Priority | High |
| Source | constraints |
| Acceptance Criteria | <ul><li>Calling checkIfUserIsActive({ name: 'Jane' }) produces a compiler error because the argument is missing the required id property of a User object.</li><li>Calling checkIfUserIsActive(null) produces a compiler error.</li></ul> |
| Stored Data |  |

## 5. Data Specifications

### 5.1. Entity: User

The User entity represents a system user and is defined by the following structure:

| Field | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | number | readonly, Required | Unique identifier for the user. |
| name | string | Required | The full name of the user. |
| email | string | Optional | The email address of the user. |
| isActive | boolean | Optional | Indicates whether the user account is active. |

### 5.2. Type: ApiResponseState

The ApiResponseState type enumerates the possible states of an asynchronous API operation:

| Value | Type | Description |
|--------|------|-------------|
| 'loading' | string literal | Indicates that an API call is in progress. |
| 'success' | string literal | Indicates that an API call completed successfully. |
| 'error' | string literal | Indicates that an API call encountered an error. |


## 5.3. Type Definitions 

### Interface: User

```typescript
interface User {
  readonly id: number;
  name: string;
  email?: string;
  isActive?: boolean;
}
```


| Field    | Type    | Required | Description            | Reason                                                                                    |
| -------- | ------- | -------- | ---------------------- | ----------------------------------------------------------------------------------------- |
| id       | number  | Yes      | Unique user identifier | Required for object identity and marked `readonly` to prevent modification after creation |
| name     | string  | Yes      | User display name      | Core user information required in all User objects                                        |
| email    | string  | No       | User email address     | Optional because a user may exist without an email                                        |
| isActive | boolean | No       | User active status     | Optional because status may be assigned later                                             |

### Type: ApiResponseState

```typescript
type ApiResponseState =
  | "loading"
  | "success"
  | "error";
```

Reason:
Only three valid API lifecycle states are required by the assignment.
Restricting values through a union type prevents invalid states.


| Value     | Description                        |
| --------- | ---------------------------------- |
| "loading" | API request is in progress         |
| "success" | API request completed successfully |
| "error"   | API request failed                 |


### Function Signatures

```typescript
function formatFullName(
  firstName: string,
  lastName: string
): string;

function calculateTotalPrice(
  items: number[],
  discount: number
): number;

function checkIfUserIsActive(
  user: User
): boolean;
```


-   **Key Invariants / Business Rules**:
    *   `formatFullName`: Requires two `string` arguments (`firstName`, `lastName`) and returns a `string`.
    *   `calculateTotalPrice`: Requires an array of `number`s (`items`) and a `number` (`discount`), returning a `number`.
    *   `checkIfUserIsActive`: Requires an argument conforming to the `User` interface and returns a `boolean`.


## 6. Expected TypeScript Compiler Errors

#### 1. Invalid User Object

```typescript
const user: User = {
  name: "John"
};
```

Expected Compiler Error:

```text
Property 'id' is missing in type '{ name: string; }' but required in type 'User'.
```

---

#### 2. Readonly Property Modification

```typescript
const user: User = {
  id: 1,
  name: "John"
};

user.id = 2;
```

Expected Compiler Error:

```text
Cannot assign to 'id' because it is a read-only property.
```

---

#### 3. Invalid Function Argument

```typescript
formatFullName(123, "Doe");
```

Expected Compiler Error:

```text
Argument of type 'number' is not assignable to parameter of type 'string'.
```

---

#### 4. Missing Function Argument

```typescript
formatFullName("John");
```

Expected Compiler Error:

```text
Expected 2 arguments, but got 1.
```

---

#### 5. Invalid Discount Type

```typescript
calculateTotalPrice([10, 20], "5%");
```

Expected Compiler Error:

```text
Argument of type 'string' is not assignable to parameter of type 'number'.
```

---

#### 6. Invalid Array Element Type

```typescript
calculateTotalPrice([10, "20"], 5);
```

Expected Compiler Error:

```text
Type 'string' is not assignable to type 'number'.
```

---

#### 7. Missing Required User Property

```typescript
checkIfUserIsActive({
  name: "Jane"
});
```

Expected Compiler Error:

```text
Property 'id' is missing in type '{ name: string; }' but required in type 'User'.
```

---

#### 8. Null Passed Instead of User

```typescript
checkIfUserIsActive(null);
```

Expected Compiler Error:

```text
Argument of type 'null' is not assignable to parameter of type 'User'.
```

---

#### 9. Invalid Union Type Value

```typescript
const state: ApiResponseState = "pending";
```

Expected Compiler Error:

```text
Type '"pending"' is not assignable to type 'ApiResponseState'.
```

