# Technical Specifications — ES6+ Features & Browser Storage Demo App

> **Product:** ES6+ Features & Browser Storage Demo App

---

## 1. Executive Summary

This product consists of three JavaScript assignments designed to demonstrate modern ES6+ features, asynchronous programming patterns, API data parsing techniques, and browser storage mechanisms. System demonstrates Callback Hell, Promise Chaining, and async/await, demonstrates destructuring, optional chaining, nullish coalescing, default parameters, and parsing nested API responses. It also implements a React based Remember Me feature using localStorage and sessionStorage.

---

## 2. Glossary & Definitions

| Term | Definition |
| :-------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ES6+** | EcmaScript 2015 and subsequent versions of the JavaScript language standard, including features like destructuring, spread/rest operators, default parameters, optional chaining, and nullish coalescing. |
| **React** | A JavaScript library for building user interfaces, maintained by Meta and a community of individual developers and companies. |
| **localStorage** | A web storage object that allows JavaScript applications to save key/value pairs in a web browser with no expiration date. Data stored persists even after the browser is closed. |
| **sessionStorage** | A web storage object that allows JavaScript applications to save key/value pairs in a web browser for the duration of a single session. Data stored is cleared when the browser tab is closed. |
| **Optional Chaining (`?.`)** | A JavaScript operator that permits reading the value of a property located deep within a chain of connected objects without having to explicitly validate that each reference in the chain is valid. |
| **Nullish Coalescing (`??`)** | A JavaScript operator that returns its right-hand side operand when its left-hand side operand is `null` or `undefined`, and otherwise returns its left-hand side operand. |
| **Async/Await** | A syntax in JavaScript for writing asynchronous, promise-based code as if it were synchronous, making it easier to read and write. |
| **Destructuring** | A JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables. |
| **Spread/Rest Operators (`...`)** | The `...` syntax in JavaScript used for either expanding an iterable (spread) or collecting multiple elements into an array (rest). |

---

## 3. Scope

### 3.1. In Scope

| Module | Description |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| **Async Programming** | Demonstrates Callback Hell, Promise Chaining, async/await, and try/catch using a simulated User → Orders → Payments workflow. |
| **API Response Parsing** | Demonstrates destructuring, optional chaining, nullish coalescing, default parameters, and parsing nested API responses. |
| **API Integration** | Retrieves user profile information from the GitHub Users API using fetch and async/await. |
| **Browser Storage** | Implements a Remember Me feature using localStorage and sessionStorage in a React application. |
| **Error Handling** | Uses try/catch blocks to handle API and asynchronous operation failures. |

### 3.2. Out of Scope

- Implementation of Cookies and Service Workers.
- Advanced caching strategies.
- Backend authentication systems.
- Database persistence.
- Unit, integration, or end-to-end testing.
- Advanced UI/UX features not directly related to the assignment objectives.

---

## 4. Functional Requirements

#### FR-001 — User: View Application Interface

| Field | Detail |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description** | The User can access and view the main interface of the Remember Me application and execute JavaScript assignments through the browser console. |
| **Priority** | Critical |
| **Source** | Assignment Requirements |
| **Acceptance Criteria** | _ Application loads successfully. <br> _ Remember Me login form is displayed. |
| **Stored Data** | None |

---

#### FR-002 — User: Initiate Data Fetching Demonstration

| Field | Detail |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Description** | The System should demonstrate asynchronous operations. |
| **Priority** | High |
| **Source** | Assignment 1 |
| **Acceptance Criteria** | _ Assignment executes successfully. <br> _ Callback Hell, Promise Chaining, and Async/Await outputs are displayed. |
| **Stored Data** | None |

---

#### FR-003 — Application: Simulate Multi-Step Asynchronous Data Operations

| Field | Detail |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description** | The System must simulate a multi-step asynchronous workflow consisting of: 1. Fetch User 2. Fetch Orders 3. Fetch Payments. The workflow must be implemented using Callback Hell, Promise Chaining, and Async/Await. |
| **Priority** | Critical |
| **Source** | Assignment 1 |
| **Acceptance Criteria** | _ User data is fetched first. <br> _ Order data is fetched after user retrieval. <br> _ Payment data is fetched after order retrieval. <br> _ All three implementations produce the same final result. |
| **Stored Data** | None |

---

#### FR-004 — Application: Parse Nested API Response with ES6+ Features

| Field | Detail |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description** | The application must process nested API response data using destructuring, optional chaining, and nullish coalescing. The assignment includes a simulated nested API response object and a real GitHub Users API response. Both responses must be parsed safely without runtime errors when properties are missing. |
| **Priority** | Critical |
| **Source** | Assignment 2 |
| **Acceptance Criteria** | _ Nested object properties are extracted using destructuring. <br> _ Optional chaining (`?.`) is used when accessing potentially undefined nested properties. <br> _ Nullish coalescing (`??`) provides default values for missing fields. <br> _ GitHub user profile information is successfully retrieved and displayed. <br> \* Missing fields do not cause application crashes. |
| **Stored Data** | None |

---

### FR-005 — Application: Store Authentication Data Based on Remember Me Selection

| Field | Detail |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description** | The application must store authentication data using either localStorage or sessionStorage based on the user's Remember Me selection. |
| **Priority** | High |
| **Source** | Assignment 3 |
| **Acceptance Criteria** | _ If Remember Me is checked, user data is stored in localStorage. <br> _ If Remember Me is not checked, user data is stored in sessionStorage. |
| **Stored Data** | User Information |

---

### FR-006 — Application: Restore User Session

| Field | Detail |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Description** | The application must restore user information from browser storage when the application loads. |
| **Priority** | High |
| **Source** | Assignment 3 |
| **Acceptance Criteria** | _ localStorage is checked first. <br> _ sessionStorage is checked second. <br> \* Existing users are automatically logged in. |
| **Stored Data** | User Information |

---

### FR-007 — User: Logout from Application

| Field | Detail |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description** | The User can log out of the application. |
| **Priority** | High |
| **Source** | Assignment 3 |
| **Acceptance Criteria** | _ Logout button is available. <br> _ Clicking Logout removes stored user information from localStorage and sessionStorage. <br> \* Login screen is displayed again. |
| **Stored Data** | User Information |

---

#### FR-008 — Application: Handle Asynchronous Operation Errors

| Field | Detail |
| ----------------------- | ---------------------------------------------------------------------------------- |
| **Description** | The application must implement error handling for asynchronous operations. |
| **Priority** | Critical |
| **Source** | Assignment |
| **Acceptance Criteria** | _ try/catch blocks should used. <br> _ Errors are logged with meaningful messages. |
| **Stored Data** | None |

---

## 5. Data Specifications

### 5.1. Entities

| Entity Name | Description | Fields | Storage Mechanism |
| :---------------------- | :------------------------------------------------------------------ | :--------------------------------------------------------------- | :---------------------------- |
| **User** | Simulated user returned during Assignment 1. | `id`, `name` | In-memory |
| **Order** | Simulated order information. | `orderId`, `amount` | In-memory |
| **Payment** | Simulated payment information. | `paymentId`, `status` | In-memory |
| **Nested API Response** | Object used for destructuring and optional chaining demonstrations. | `user.profile`, `user.contact`, `user.address` | In-memory |
| **GitHub User Profile** | Response from GitHub Users API. | `login`, `name`, `company`, `location`, `followers`, `following` | API Response |
| **User Information** | Stored when Remember Me is enabled or disabled. | `email`, `loginMethod`, `loginTime` | localStorage / sessionStorage |

---

## 6. Security & Compliance Policy

### 6.1. Data Handling & Security

- Browser storage access should be performed safely.
- Sensitive information such as passwords should never be stored in browser storage.
- Authentication data stored for demonstration purposes should be removed on logout.

---

## 7. Async Workflow

The application simulates a sequence of dependent asynchronous operations.

1. Retrieve user information.
2. Use the user ID to retrieve order information.
3. Use the order ID to retrieve payment information.
4. Display the final user, order, and payment data.

The workflow is implemented using:
- Callback Hell
- Promise Chaining
- Async/Await

Each implementation produces the same result while demonstrating different approaches to handling asynchronous operations.

---

## 8. Error Handling Strategy

### Error State 1: Missing API Response Data

Cause:
Expected properties are missing from the API response.

Handling:
- Use optional chaining (`?.`) to safely access nested properties.
- Use nullish coalescing (`??`) to provide default values.
- Prevent runtime errors caused by undefined values.

---

### Error State 2: GitHub API Request Failure

Cause:
Network issues, invalid username, or API errors.

Handling:
- Validate response using `response.ok`.
- Throw an error for unsuccessful requests.
- Catch errors using `try/catch`.
- Log meaningful error messages.

---

### Error State 3: Promise Chain Failure

Cause:
Any asynchronous operation fails during Promise execution.

Handling:
- Use `.catch()` to capture errors.
- Stop further execution.
- Display the error message.

---

### Error State 4: Async/Await Failure

Cause:
User, order, or payment retrieval fails.

Handling:
- Wrap asynchronous operations in `try/catch`.
- Log the error message.
- Prevent application crashes.

---

## 9. Storage Strategy


### LocalStorage

Purpose: Store user information when the "Remember Me" option is selected.

Stored Data: User Information

Reason: Data persists even after the browser is closed and reopened, allowing users to remain logged in.

---

### SessionStorage

Purpose: Store user information when the "Remember Me" option is not selected.

Stored Data: User Information

Reason: Data remains available only for the current browser session and is cleared when the browser tab is closed.

---

### Storage Retrieval

On application startup:

1. Check localStorage for existing user information.
2. If no data exists, check sessionStorage.
3. Restore the user session if stored data is found.

---

### Storage Cleanup

On logout:

1. Remove user information from localStorage.
2. Remove user information from sessionStorage.
3. Return the user to the login screen.

---

