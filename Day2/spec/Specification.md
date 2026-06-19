# Technical Specifications — JavaScript Learning Modules (Day 2)

## 1. Executive Summary

This module provides JavaScript coding examples focused on data transformation, string manipulation, and object handling using modern JavaScript features. The implementation demonstrates practical usage of array method chaining, object merging techniques, and string formatting operations.

---

## 2. Glossary & Definitions

| Term                    | Definition                                                                        |
| :---------------------- | :-------------------------------------------------------------------------------- |
| **Function**            | A reusable block of code that performs a specific task.                           |
| **Arrow Function**      | A shorter ES6 syntax for writing functions with lexical `this` binding.           |
| **Method Chaining**     | Executing multiple methods sequentially on the same value.                        |
| **Reducer**             | A callback function used by `reduce()` to accumulate values into a single result. |
| **Mutation**            | Modifying the original object, array, or value.                                   |
| **Immutable Operation** | Returning a new value without modifying the original data.                        |

---

## 3. Scope

| Module                          | Description                                                                                                                     |
| :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------ |
| **Active User Age Calculation** | Uses `filter()`, `map()`, and `reduce()` to calculate the total age of active users from a collection of user objects.          |
| **String Formatter**            | Uses `trim()`, `replace()`, `split()`, string transformation, and word capitalization to produce a formatted output string.     |
| **Object Merge Comparison**     | Demonstrates object merging using `Object.assign()` and spread syntax while highlighting mutation versus non-mutation behavior. |
| **Method Chaining**             | Demonstrates combining multiple array and string methods to perform data transformations efficiently.                           |

### Out of Scope

* Automated unit or integration testing.
* Browser-based user interfaces.
* Backend services or databases.
* Third-party JavaScript libraries.
* TypeScript-specific features.
* Performance benchmarking.

---

## 4. Input Data Specifications

### 4.1 User Object

| Field    | Type    | Description                           |
| :------- | :------ | :------------------------------------ |
| `id`     | Number  | Unique identifier for the user.       |
| `name`   | String  | User name.                            |
| `age`    | Number  | User age.                             |
| `active` | Boolean | Indicates whether the user is active. |

### Sample Input Data

```javascript
[
  { id: 1, name: "Alice", age: 25, active: true },
  { id: 2, name: "Bob", age: 30, active: false },
  { id: 3, name: "Charlie", age: 35, active: true }
]
```

---

## 5. Functional Requirements

### FR-001 — System: Calculate Total Age of Active Users

| Field                   | Detail                                                                                                                                                                    |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Description**         | The system SHALL use a chain of `filter()`, `map()`, and `reduce()` to calculate the total age of active users.                                                           |
| **Priority**            | Critical                                                                                                                                                                  |
| **Source**              | Assignment Requirement #1                                                                                                                                                 |
| **Acceptance Criteria** | Active users are filtered correctly. <br> Ages are extracted using `map()`. <br> Total age is calculated using `reduce()`. <br> Sample input returns the expected result. |
| **Stored Data**         | User Array  |

---

### FR-002 — System: Build String Formatter

| Field                   | Detail                                                                                                                                                                                              |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**         | The system SHALL create a string formatter using `trim()`, `split()`, `replace()`, and `includes()`.                                                                                                |
| **Priority**            | Critical                                                                                                                                                                                            |
| **Source**              | Assignment Requirement #2                                                                                                                                                                           |
| **Acceptance Criteria** | Input string is trimmed correctly. <br> Words are split and processed. <br> Text replacement is performed. <br> Keyword existence is verified using `includes()`. <br> Expected output is produced. |
| **Stored Data**         | String Input                                                                                                                                                                                        |

---

### FR-003 — System: Demonstrate Object Method

| Field                   | Detail                                                                                                |
| :---------------------- | :---------------------------------------------------------------------------------------------------- |
| **Description**         | The system SHALL demonstrate `Object.assign()`.                                                       |
| **Priority**            | High                                                                                                  |
| **Source**              | Day 2 Topic Requirements                                                                              |
| **Acceptance Criteria** | Each method is implemented using sample objects. <br> Outputs demonstrate the purpose of each method. |
| **Stored Data**         | Object Data                                                                                           |

---

### FR-004 — System: Compare Object Merging Techniques

| Field                   | Detail                                                                                                                                                                |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**         | The system SHALL merge two objects using both `Object.assign()` and spread syntax and document the differences between the two approaches.                            |
| **Priority**            | Critical                                                                                                                                                              |
| **Source**              | Assignment Requirement #3                                                                                                                                             |
| **Acceptance Criteria** | Both techniques produce the expected merged object. <br> Mutation behavior is documented. <br> Differences between `Object.assign()` and spread syntax are explained. |
| **Stored Data**         | Object Data                                                                                                                                                           |

---

### FR-005 — System: Document Mutation vs Non-Mutation Behavior

| Field                   | Detail                                                                                                                    |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **Description**         | The system SHALL document which methods mutate original values and which return new values.                               |
| **Priority**            | Critical                                                                                                                  |
| **Source**              | Spec Submission Requirement                                                                                               |
| **Acceptance Criteria** | Documentation includes all methods used in the assignment. <br> Mutating and non-mutating methods are clearly identified. |
| **Stored Data**         | None                                                                                                                      |

---

## 6. Expected Outputs

### Assignment 1 — Total Age of Active Users

#### Input

```javascript
[
  { id: 1, name: "Alice", age: 25, active: true },
  { id: 2, name: "Bob", age: 30, active: false },
  { id: 3, name: "Charlie", age: 35, active: true }
]
```

#### Processing Steps

1. Filter active users.
2. Extract ages.
3. Sum ages using `reduce()`.

#### Expected Output

```javascript
60
```

---

### Assignment 2 — String Formatter

#### Input

```javascript
"   hello javascript world   "
```

#### Processing Steps

1. Remove extra whitespace using `trim()`.
2. Verify keyword existence using `includes()`.
3. Replace "javascript" with "JS".
4. Split string into words.
5. Recombine into formatted output.

#### Expected Output

```javascript
"Hello-Js-World"
```

---

### Assignment 3 — Object Merge Comparison

#### Input

```javascript
const obj1 = {
  name: "Alice",
  age: 25
};

const obj2 = {
  age: 30,
  city: "Pune"
};
```

#### Expected Output Using Object.assign()

```javascript
{
  name: "Alice",
  age: 30,
  city: "Pune"
}
```

#### Expected Output Using Spread Operator

```javascript
{
  name: "Alice",
  age: 30,
  city: "Pune"
}
```

---

## 7. Mutation Reference Table

| Method          | Mutates Original Value |
| :-------------- | :--------------------- |
| map()           | No                     |
| filter()        | No                     |
| reduce()        | No                     |
| forEach()       | No                     |
| some()          | No                     |
| every()         | No                     |
| find()          | No                     |
| includes()      | No                     |
| split()         | No                     |
| trim()          | No                     |
| replace()       | No                     |
| slice()         | No                     |
| substring()     | No                     |
| substr()        | No                     |
| sort()          | Yes                    |
| Object.assign() | Yes (target object)    |
| Spread Operator | No                     |

---

## 8. Data Specifications

### User Entity

| Field    | Type    | Description             |
| :------- | :------ | :---------------------- |
| `id`     | Number  | Unique user identifier. |
| `name`   | String  | User name.              |
| `age`    | Number  | User age.               |
| `active` | Boolean | Active status of user.  |

### Transformation Result

| Field             | Type   | Description                            |
| :---------------- | :----- | :------------------------------------- |
| `totalAge`        | Number | Sum of ages of active users.           |
| `formattedString` | String | Result of string formatting operation. |
| `mergedObject`    | Object | Result of object merge operation.      |

---