# Technical Specifications — React + TypeScript Components & Form Validation Learning Assignment

**Product:** React + TypeScript Components & Form Validation Learning Assignment

## 1. Executive Summary

This document outlines the technical specification for a React and TypeScript learning assignment. The assignment focuses on creating reusable typed React components, implementing conditional rendering, validating forms using React Hook Form and Zod, and passing strongly typed props between parent and child components.

The implementation must demonstrate TypeScript type safety, component composition, form validation, and React best practices within a Vite + React + TypeScript environment.

---

## 2. Glossary & Definitions

| Term             | Definition                                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| Vite Project     | A React + TypeScript project scaffolded using Vite.                                                            |
| UserCard         | A reusable React component that displays user information based on typed props.                                |
| isActive         | A boolean prop determining whether user details should be displayed or an inactive message should be rendered. |
| Parent Component | A component responsible for rendering multiple UserCard instances and passing props to them.                   |
| Contact Form     | A form used to collect user information with validation rules.                                                 |
| React Hook Form  | A form state management library used for handling form inputs and submission.                                  |
| Zod              | A TypeScript-first schema validation library used to validate form inputs.                                     |
| Form Validation  | The process of ensuring submitted values satisfy defined business rules before acceptance.                     |

---

## 3. Scope

### 3.1. In Scope

| Module                | Description                                                                |
| --------------------- | -------------------------------------------------------------------------- |
| Project Setup         | Creation of a Vite + React + TypeScript application from scratch.          |
| UserCard Component    | Development of a reusable component with typed props.                      |
| Conditional Rendering | Rendering content based on the value of isActive.                          |
| Parent Component      | Rendering multiple UserCard components with different prop values.         |
| Contact Form          | Creating a form using React Hook Form.                                     |
| Zod Validation        | Applying schema-based validation to form fields.                           |
| Type Safety           | Using TypeScript interfaces and inferred types throughout the application. |

### 3.2. Out of Scope

* Backend APIs
* Database integration
* Authentication and authorization
* Form data persistence
* Styling frameworks
* Responsive design requirements
* State management libraries (Redux, Zustand, MobX, etc.)
* API communication

---

## 4. Functional Requirements

### FR-001 — Initialize Vite + React + TypeScript Project

| Field               | Detail                                                                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | A new React application must be created using Vite with TypeScript enabled.                                                                                                                                   |
| Priority            | Critical                                                                                                                                                                                                      |
| Source              | Assignment Requirement                                                                                                                                                                                        |
| Acceptance Criteria | <ul><li>Project is created using Vite.</li><li>TypeScript support is enabled.</li><li>Application compiles successfully without errors.</li><li>Application runs using the Vite development server.</li></ul> |
| Stored Data         | None                                                                                                                                                                                                          |

### FR-002 — Define UserCard Props Interface

| Field               | Detail                                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Description         | A TypeScript interface must define the structure of props accepted by the UserCard component.                                                                      |
| Priority            | Critical                                                                                                                                                           |
| Source              | Assignment Requirement                                                                                                                                             |
| Acceptance Criteria | <ul><li>A UserCardProps interface exists.</li><li>name is defined as string.</li><li>email is defined as string.</li><li>isActive is defined as boolean.</li></ul> |
| Stored Data         | UserCard Props                                                                                                                                                     |

### FR-003 — Render User Information

| Field               | Detail                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Description         | The UserCard component must display user information provided through props.                                              |
| Priority            | High                                                                                                                      |
| Source              | Assignment Requirement                                                                                                    |
| Acceptance Criteria | <ul><li>User name is displayed.</li><li>User email is displayed.</li><li>Displayed values originate from props.</li></ul> |
| Stored Data         | UserCard Props                                                                                                            |

### FR-004 — Conditional Rendering Based on isActive

| Field               | Detail                                                                                                                                                                                    |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | The UserCard component must conditionally render content depending on the value of the isActive prop.                                                                                     |
| Priority            | Critical                                                                                                                                                                                  |
| Source              | Assignment Requirement                                                                                                                                                                    |
| Acceptance Criteria | <ul><li>If isActive is true, user details are displayed.</li><li>If isActive is false, user details are not displayed.</li><li>No runtime errors occur during rendering.</li></ul> |
| Stored Data         | UserCard Props                                                                                                                                                                            |

### FR-005 — Create Contact Form

| Field               | Detail                                                                                                                                                                        |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | A contact form must be implemented using React Hook Form.                                                                                                                     |
| Priority            | Critical                                                                                                                                                                      |
| Source              | Assignment Requirement                                                                                                                                                        |
| Acceptance Criteria | <ul><li>Form contains Name field.</li><li>Form contains Email field.</li><li>Form contains Phone field.</li><li>Form submission is handled through React Hook Form.</li></ul> |
| Stored Data         | Form Input Values                                                                                                                                                             |

### FR-006 — Define Zod Validation Schema

| Field               | Detail                                                                                                                                                                                                                 |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | A Zod schema must define validation rules for all form fields.                                                                                                                                                         |
| Priority            | Critical                                                                                                                                                                                                               |
| Source              | Assignment Requirement                                                                                                                                                                                                 |
| Acceptance Criteria | <ul><li>Name field is required.</li><li>Email field must be a valid email format.</li><li>Phone field enforces minimum length requirement.</li><li>Schema is connected to React Hook Form using zodResolver.</li></ul> |
| Stored Data         | Validation Schema                                                                                                                                                                                                      |

### FR-007 — Display Validation Errors

| Field               | Detail                                                                                                                                                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | Validation errors returned from Zod must be displayed to the user.                                                                                                                                          |
| Priority            | High                                                                                                                                                                                                        |
| Source              | Assignment Requirement                                                                                                                                                                                      |
| Acceptance Criteria | <ul><li>Missing name displays an error message.</li><li>Invalid email displays an error message.</li><li>Short phone number displays an error message.</li><li>Error messages update dynamically.</li></ul> |
| Stored Data         | Validation Errors                                                                                                                                                                                           |

### FR-008 — Parent Component Renders Multiple UserCards

| Field               | Detail                                                                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | A parent component must render multiple UserCard instances using different prop values.                                                                                                              |
| Priority            | Critical                                                                                                                                                                                          |
| Source              | Assignment Requirement                                                                                                                                                                            |
| Acceptance Criteria | <ul><li>A parent component must render multiple UserCard instances using different prop values.</li><li>Each receives unique prop values.</li><li>At least one active user is rendered.</li></ul> |
| Stored Data         | User Data                                                                                                                                                                                         |

### FR-009 — Maintain Type Safety

| Field               | Detail                                                                                                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description         | All components, props, forms, and validation schemas must be type-safe.                                                                                                                        |
| Priority            | High                                                                                                                                                                                           |
| Source              | Assignment Requirement                                                                                                                                                                         |
| Acceptance Criteria | <ul><li>No implicit any types exist.</li><li>Props are strongly typed.</li><li>Form data types are inferred from Zod schema.</li><li>Application compiles without TypeScript errors.</li></ul> |
| Stored Data         | Type Definitions                                                                                                                                                                               |

---

## 5. Data Specifications

### 5.1. Entity: UserCardProps

The UserCardProps entity defines the structure of data passed to the UserCard component.

| Field    | Type    | Constraints | Description                      |
| -------- | ------- | ----------- | -------------------------------- |
| name     | string  | Required    | User's display name              |
| email    | string  | Required    | User's email address             |
| isActive | boolean | Required    | Determines active/inactive state |

### 5.2. Entity: ContactFormData

The ContactFormData entity represents the data submitted through the contact form.

| Field | Type   | Constraints             | Description          |
| ----- | ------ | ----------------------- | -------------------- |
| name  | string | Required                | User's full name     |
| email | string | Must be valid email     | User's email address |
| phone | string | Minimum length enforced | User's phone number  |

### 5.3. Type Definitions

#### Interface: UserCardProps

```typescript
interface UserCardProps {
  name: string;
  email: string;
  isActive: boolean;
}
```

| Field    | Type    | Required | Description          |
| -------- | ------- | -------- | -------------------- |
| name     | string  | Yes      | User display name    |
| email    | string  | Yes      | User email address   |
| isActive | boolean | Yes      | User activity status |

#### Zod Schema

```typescript
const contactSchema = z.object({
  name: z
    .string().min(1, "Name is required"),

  email: z
    .email("Invalid email address"), 
    
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only numbers"),
});
```

#### Form Type

```typescript
type ContactFormData =
  z.infer<typeof contactSchema>;
```

Reason:

Using `z.infer` ensures TypeScript types remain synchronized with the Zod validation schema and eliminates duplicate type definitions.

---

## 6. Component Specifications

### Component: UserCard

#### Purpose

Display user information while conditionally rendering based on activity status.

#### Props

```typescript
interface UserCardProps {
  name: string;
  email: string;
  isActive: boolean;
}
```

#### Rendering Rules

| Condition          | Output                            |
| ------------------ | --------------------------------- |
| isActive === true  | Render user name and email        |
| isActive === false | Render "User is inactive" message |

---

### Component: User

#### Purpose

Render multiple UserCard components and provide props.

#### Example Structure

```typescript
<UserCard
  name="John Doe"
  email="john@example.com"
  isActive={true}
/>

<UserCard
  name="Jane Smith"
  email="jane@example.com"
  isActive={false}
/>

<UserCard
  name="Bob Wilson"
  email="bob@example.com"
  isActive={true}
/>
```

---

### Component: ContactForm

#### Purpose

Collect and validate user input.

#### Fields

| Field | Input Type | Validation                 |
| ----- | ---------- | -------------------------- |
| Name  | Text       | Required                   |
| Email | Email      | Valid email format         |
| Phone | Text       | Minimum length requirement |

#### Submission Behavior

1. User enters form values.
2. React Hook Form manages form state.
3. Zod validates values.
4. Validation errors are displayed when invalid.
5. Valid submissions proceed successfully.

---

## 7. Expected Validation Errors

### 1. Missing Name

```typescript
{
  name: "",
  email: "john@example.com",
  phone: "9876543210",
}
```

Expected Validation Error:

```text
Name is required
```

---

### 2. Invalid Email

```typescript
{
  name: "John Doe",
  email: "invalid-email",
  phone: "9876543210",
}
```

Expected Validation Error:

```text
Invalid email address
```

---

### 3. Phone Number Too Short

```typescript
{
  name: "John Doe",
  email: "john@example.com",
  phone: "12345",
}
```

Expected Validation Error:

```text
Phone number must be at least 10 characters
```

---

## 8. Expected TypeScript Compiler Errors

### 1. Missing Required Prop

```typescript
<UserCard
  name="John Doe"
  email="john@example.com"
/>
```

Expected Compiler Error:

```text
Property 'isActive' is missing in type
```

---

### 2. Invalid Prop Type

```typescript
<UserCard
  name="John Doe"
  email="john@example.com"
  isActive="true"
/>
```

Expected Compiler Error:

```text
Type 'string' is not assignable to type 'boolean'
```

---

### 3. Invalid Email Type

```typescript
<UserCard
  name="John Doe"
  email={123}
  isActive={true}
/>
```

Expected Compiler Error:

```text
Type 'number' is not assignable to type 'string'
```

---

### 4. Invalid Name Type

```typescript
<UserCard
  name={100}
  email="john@example.com"
  isActive={true}
/>
```

Expected Compiler Error:

```text
Type 'number' is not assignable to type 'string'
```

---

### 5. Invalid Form Field Type

```typescript
const data: ContactFormData = {
  name: "John",
  email: "john@example.com",
  phone: 1234567890,
};
```

Expected Compiler Error:

```text
Type 'number' is not assignable to type 'string'
```

---

### 6. Invalid Activity Status Type

```typescript
const user: UserCardProps = {
  name: "John",
  email: "john@example.com",
  isActive: "yes",
};
```

Expected Compiler Error:

```text
Type 'string' is not assignable to type 'boolean'
```

---
