# Technical Specifications — React Advanced Concepts Learning Assignment

**Product:** React Advanced Concepts Learning Assignment

---

# 1. Executive Summary

This document outlines the technical specification for a React learning assignment focused on advanced React concepts including Hooks, Custom Hooks, Routing, Context API, and Redux Toolkit.

The assignment requires implementation of a countdown timer using React Hooks, creation of a reusable custom data-fetching hook, configuration of nested routing with shared layouts, application-wide theme management using Context API, and asynchronous state management using Redux Toolkit.

---

# 2. Glossary & Definitions

| Term              | Definition                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| Countdown Timer   | A component that displays a decreasing time value and updates automatically until reaching zero. |
| useEffect Cleanup | A cleanup function returned from useEffect to prevent memory leaks and clear side effects.       |
| useFetch          | A reusable custom hook responsible for fetching and managing remote API data.                    |
| Layout Route      | A parent route that provides shared UI structure and renders child routes through Outlet.        |
| Outlet            | React Router component used to render nested route content inside a parent layout.               |
| Theme Context     | React Context responsible for sharing theme state across the application.                        |
| Redux Slice       | A Redux Toolkit construct containing state, reducers, and generated actions.                     |
| createAsyncThunk  | Redux Toolkit utility used for asynchronous actions such as API requests.                        |
| Contacts State    | Global Redux state containing fetched contact information and request status.                    |

---

# 3. Scope

## 3.1. In Scope

| Module           | Description                                                                     |
| ---------------- | ------------------------------------------------------------------------------- |
| Countdown Timer  | Build a countdown timer using useState and useEffect with proper cleanup.       |
| Custom Hook      | Create a reusable useFetch hook and consume it in multiple components.          |
| Routing          | Configure routing using react-router-dom with nested routes and shared layouts. |
| Theme Management | Implement light/dark theme switching using Context API.                         |
| Redux Toolkit    | Create contacts state management using createSlice and createAsyncThunk.        |

## 3.2. Out of Scope

* Authentication backend implementation.
* Persistent storage of theme preferences.
* Contact creation, update, or deletion APIs.
* Server-side rendering.
* Form validation libraries.
* Advanced Redux middleware customization.

---

# 4. Functional Requirements

## FR-001 — Countdown Timer Component

| Field               | Detail                                                                                                                                                                                                                      |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | The application must provide a countdown timer component implemented using useState and useEffect.                                                                                                                          |
| Priority            | Critical                                                                                                                                                                                                                    |
| Source              | assignment                                                                                                                                                                                                                  |
| Acceptance Criteria | <ul><li>The timer displays a countdown value.</li><li>The countdown decreases automatically at a fixed interval.</li><li>The timer stops when it reaches zero.</li><li>The timer state is managed using useState.</li></ul> |
| Stored Data         | Remaining Time                                                                                                                                                                                                              |

---

## FR-002 — useEffect Cleanup

| Field               | Detail                                                                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | The countdown timer must clean up running intervals when the component unmounts or the timer completes.                                                                   |
| Priority            | Critical                                                                                                                                                                  |
| Source              | assignment                                                                                                                                                                |
| Acceptance Criteria | <ul><li>An interval is created using useEffect.</li><li>The interval is cleared in the cleanup function.</li><li>No memory leaks occur after component unmount.</li></ul> |
| Stored Data         | None                                                                                                                                                                      |

---

## FR-003 — Create useFetch Custom Hook

| Field               | Detail                                                                                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Description         | A reusable custom hook named useFetch must be implemented for fetching remote data.                                                                                                                                |
| Priority            | High                                                                                                                                                                                                               |
| Source              | assignment                                                                                                                                                                                                         |
| Acceptance Criteria | <ul><li>The hook accepts a URL parameter.</li><li>The hook performs an API request.</li><li>The hook manages loading state.</li><li>The hook manages error state.</li><li>The hook returns fetched data.</li></ul> |
| Stored Data         | API Response Data                                                                                                                                                                                                  |

---

## FR-004 — Reuse useFetch in Multiple Components

| Field               | Detail                                                                                                                                                                                          |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | The useFetch hook must be consumed by at least two separate React components.                                                                                                                   |
| Priority            | High                                                                                                                                                                                            |
| Source              | assignment                                                                                                                                                                                      |
| Acceptance Criteria | <ul><li>Two components import and use the custom hook.</li><li>Each component can fetch data independently.</li><li>No duplicated fetch logic exists inside the consuming components.</li></ul> |
| Stored Data         | API Response Data                                                                                                                                                                               |

---

## FR-005 — Configure Application Routing

| Field               | Detail                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | React Router must be configured with required application routes.                                                                                             |
| Priority            | Critical                                                                                                                                                      |
| Source              | assignment                                                                                                                                                    |
| Acceptance Criteria | <ul><li>/contacts route exists.</li><li>/contacts/:id route exists.</li><li>/login route exists.</li><li>Navigation between routes works correctly.</li></ul> |
| Stored Data         | Route State                                                                                                                                                   |

---

## FR-006 — Shared Layout Route

| Field               | Detail                                                                                                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | The application must implement a shared Layout Route using Outlet.                                                                                                                             |
| Priority            | High                                                                                                                                                                                           |
| Source              | assignment                                                                                                                                                                                     |
| Acceptance Criteria | <ul><li>A Layout component exists.</li><li>The Layout component renders common UI.</li><li>Outlet is used to render nested routes.</li><li>Contacts routes render inside the layout.</li></ul> |
| Stored Data         | Route Context                                                                                                                                                                                  |

---

## FR-007 — Dynamic Contact Route

| Field               | Detail                                                                                                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | The application must support dynamic contact details routing.                                                                                                    |
| Priority            | High                                                                                                                                                             |
| Source              | assignment                                                                                                                                                       |
| Acceptance Criteria | <ul><li>The route pattern is /contacts/:id.</li><li>The contact id is obtained using useParams.</li><li>The selected contact information is displayed.</li></ul> |
| Stored Data         | Contact ID                                                                                                                                                       |

---

## FR-008 — Theme Context Provider

| Field               | Detail                                                                                                                                               |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | A Context API implementation must manage application theme state.                                                                                    |
| Priority            | High                                                                                                                                                 |
| Source              | assignment                                                                                                                                           |
| Acceptance Criteria | <ul><li>A ThemeContext is created.</li><li>A ThemeProvider wraps the application.</li><li>Theme state is accessible from child components.</li></ul> |
| Stored Data         | Current Theme                                                                                                                                        |

---

## FR-009 — Theme Toggle Functionality

| Field               | Detail                                                                                                                                                                       |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | Users must be able to switch between light and dark themes.                                                                                                                  |
| Priority            | High                                                                                                                                                                         |
| Source              | assignment                                                                                                                                                                   |
| Acceptance Criteria | <ul><li>A toggle control exists.</li><li>The toggle updates Context state.</li><li>UI updates when the theme changes.</li><li>Supported themes are light and dark.</li></ul> |
| Stored Data         | Current Theme                                                                                                                                                                |

---

## FR-010 — Contacts Redux Slice

| Field               | Detail                                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | A contacts slice must be implemented using Redux Toolkit createSlice.                                                                 |
| Priority            | Critical                                                                                                                              |
| Source              | assignment                                                                                                                            |
| Acceptance Criteria | <ul><li>A contacts slice is created.</li><li>Initial state is defined.</li><li>Reducers are configured through createSlice.</li></ul> |
| Stored Data         | Contacts State                                                                                                                        |

---

## FR-011 — Async Contact Fetching

| Field               | Detail                                                                                                                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | Contacts must be fetched asynchronously using createAsyncThunk.                                                                                                            |
| Priority            | Critical                                                                                                                                                                   |
| Source              | assignment                                                                                                                                                                 |
| Acceptance Criteria | <ul><li>A createAsyncThunk action exists.</li><li>Contacts are retrieved from an API endpoint.</li><li>Loading state is managed.</li><li>Error state is managed.</li></ul> |
| Stored Data         | Contacts Data                                                                                                                                                              |

---

## FR-012 — Redux Store Integration

| Field               | Detail                                                                                                                                       |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | The contacts slice must be integrated into the Redux store.                                                                                  |
| Priority            | High                                                                                                                                         |
| Source              | assignment                                                                                                                                   |
| Acceptance Criteria | <ul><li>A Redux store is configured.</li><li>The contacts reducer is registered.</li><li>The application is wrapped with Provider.</li></ul> |
| Stored Data         | Global Application State                                                                                                                     |

---

# 5. Data Specifications

## 5.1 Entity: ThemeState

| Field | Type             | Constraints | Description                |
| ----- | ---------------- | ----------- | -------------------------- |
| theme | "light" | "dark" | Required    | Current application theme. |

---

## 5.2 Entity: Contact

| Field | Type   | Constraints | Description                |
| ----- | ------ | ----------- | -------------------------- |
| id    | number | Required    | Unique contact identifier. |
| name  | string | Required    | Contact name.              |
| email | string | Required    | Contact email address.     |
| phone | string | Optional    | Contact phone number.      |

---

## 5.3 Entity: ContactsState

| Field    | Type          | Constraints | Description                     |
| -------- | ------------- | ----------- | ------------------------------- |
| contacts | Contact[]     | Required    | List of contacts.               |
| loading  | boolean       | Required    | API request status.             |
| error    | string | null | Optional    | Error message if request fails. |

---

## 5.4 Type Definitions

### Theme Context Type

```typescript
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
```

---

### Contact Interface

```typescript
interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
}
```

---

### Contacts State

```typescript
interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}
```

---

### useFetch Return Type

```typescript
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
```

---

# 5.5 Key Invariants / Business Rules

### Countdown Timer

* Timer value must never become negative.
* Timer decreases by one unit per interval.
* Timer automatically stops at zero.
* All intervals must be cleared during cleanup.

### useFetch

* Loading starts before the request.
* Loading ends after success or failure.
* Errors are stored in error state.
* Data is stored in data state.

### Theme Context

* Only "light" and "dark" themes are valid.
* Theme changes are propagated through Context.
* All subscribed components receive updated theme values.

### Contacts Slice

* Contacts data is stored in Redux state.
* Loading becomes true during API requests.
* Loading becomes false after request completion.
* Errors are stored when requests fail.

---

# 6. Routing Specifications

```text
/
├── login
└── contacts
    ├── index
    └── :id
```

### Route Definitions

| Route         | Component       |
| ------------- | --------------- |
| /login        | Login Page      |
| /contacts     | Contacts List   |
| /contacts/:id | Contact Details |
| Layout Route  | Shared Layout   |

---

### Layout Route Structure

```tsx
<Routes>
  <Route element={<Layout />}>
    <Route path="/contacts" element={<Contacts />} />
    <Route path="/contacts/:id" element={<ContactDetails />} />
  </Route>

  <Route
    path="/login"
    element={<Login />}
  />
</Routes>
```

---

# 7. Redux Toolkit Specifications

### Async Thunk

```typescript
export const fetchContacts =
  createAsyncThunk(
    "contacts/fetchContacts",
    async () => {}
  );
```

### Slice Structure

```typescript
const contactsSlice =
  createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers: builder => {}
  });
```

---

# 8. Expected Behaviors

### Countdown Completion

```text
Initial Value: 10

10
9
8
...
1
0

Timer Stops
```

---

### Theme Toggle

```text
Current Theme: Light

User Clicks Toggle

Current Theme: Dark
```

---

### Successful Contact Fetch

```text
loading = true

API Request Executes

loading = false
contacts = [ ... ]
error = null
```

---

### Failed Contact Fetch

```text
loading = true

API Request Fails

loading = false
contacts = []
error = "Failed to fetch contacts"
```

---

# 9. Required Dependencies

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "@reduxjs/toolkit": "^2.x",
    "react-redux": "^9.x"
  }
}
```

---
