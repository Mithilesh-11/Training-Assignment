# Technical Specifications — JavaScript Learning Modules

## 1. Executive Summary

This product provides JavaScript coding examples demonstrating fundamental concepts such as different loop types and variable hoisting, alongside an interactive command-line interface (CLI) quiz to test JavaScript knowledge. Its purpose is to offer clear, correct, and functional code implementations for educational and developmental use cases.

## 2. Glossary & Definitions

| Term | Definition |
|:-----|:-----------|
| **CLI Quiz** | An interactive question-and-answer session conducted within a command-line interface. |
| **Hoisting** | JavaScript's mechanism where variable and function declarations are moved to the top of their containing scope during the compilation phase. |
| **Vanilla JavaScript** | JavaScript used without any frameworks, libraries, or additional tools, relying solely on native browser/runtime capabilities. |

## 3. Scope

| Module | Description |
|:-------|:------------|
| **Loop Examples** | Demonstrations of `for`, `while`, `do...while`, `for...of`, and `for...in` loops using specified data structures. |
| **Hoisting Demonstration** | Code examples illustrating the behavior of `var` and `let` variables concerning hoisting. |
| **CLI Quiz** | An interactive quiz focused on JavaScript concepts, featuring question presentation, answer evaluation, scoring, and feedback. |

**Out of Scope**
*   Automated unit or integration tests for the generated code.
*   Definitions or explanations of JavaScript concepts within the output.
*   Graphical User Interface (GUI) components.
*   Backend services or data persistence.
*   User authentication or authorization.
*   Error handling beyond basic operational flow.

## 5. Functional Requirements

#### FR-001 — System: Implement `for` loop for array iteration by index
| Field | Detail |
|-------|--------|
| **Description** | The system SHALL implement a `for` loop to iterate over the array `[1, 2, 3, 4]` using numerical indices, printing each element. |
| **Priority** | High |
| **Source** | constraints: "The `for` loop will iterate an array by index" |
| **Acceptance Criteria** | The `for` loop uses a numerical index counter. <br> The loop iterates exactly four times. <br> The loop outputs `1`, `2`, `3`, `4` in sequence. |
| **Stored Data** | None |

#### FR-002 — System: Implement `for` loop for object key iteration
| Field | Detail |
|-------|--------|
| **Description** | The system SHALL implement a `for` loop to iterate over the object `{ name: 'Alice', age: 30, city: 'New York' }` using `Object.keys()`, printing each key. |
| **Priority** | High |
| **Source** | constraints: "and object keys via `Object.keys()`" |
| **Acceptance Criteria** | The `for` loop uses `Object.keys()` to obtain keys. <br> The loop iterates over `name`, `age`, `city`. <br> The loop outputs `name`, `age`, `city` in sequence. |
| **Stored Data** | None |

#### FR-003 — System: Implement `while` loop for array iteration
| Field | Detail |
|-------|--------|
| **Description** | The system SHALL implement a `while` loop to iterate over the array `[1, 2, 3, 4]` using a counter, printing each element. |
| **Priority** | High |
| **Source** | constraints: "The `while` loop will iterate an array with a counter." |
| **Acceptance Criteria** | The `while` loop uses a counter variable for iteration control. <br> The loop iterates exactly four times. <br> The loop outputs `1`, `2`, `3`, `4` in sequence. |
| **Stored Data** | None |

#### FR-004 — System: Implement `do...while` loop for array iteration
| Field | Detail |
|-------|--------|
| **Description** | The system SHALL implement a `do...while` loop to iterate over the array `[1, 2, 3, 4]`, ensuring at least one execution, printing each element. |
| **Priority** | High |
| **Source** | constraints: "The `do...while` loop will iterate an array ensuring at least one execution." |
| **Acceptance Criteria** | The `do...while` loop executes its body at least once before evaluating the condition. <br> The loop iterates exactly four times. <br> The loop outputs `1`, `2`, `3`, `4` in sequence. |
| **Stored Data** | None |

#### FR-005 — System: Implement `for...of` loop for array value iteration
| Field | Detail |
|-------|--------|
| **Description** | The system SHALL implement a `for...of` loop to iterate directly over the values of the array `[1, 2, 3, 4]`, printing each value. |
| **Priority** | High |
| **Source** | constraints: "The `for...of` loop will iterate directly over array values." |
| **Acceptance Criteria** | The `for...of` loop directly accesses the values of the array. <br> The loop iterates exactly four times. <br> The loop outputs `1`, `2`, `3`, `4` in sequence. |
| **Stored Data** | None |

#### FR-006 — System: Implement `for...in` loop for object property name iteration
| Field | Detail |
|-------|--------|
| **Description** | The system SHALL implement a `for...in` loop to iterate over the property names of the object `{ name: 'Alice', age: 30, city: 'New York' }`, printing each property name. |
| **Priority** | High |
| **Source** | constraints: "The `for...in` loop will iterate over object property names." |
| **Acceptance Criteria** | The `for...in` loop directly accesses the property names of the object. <br> The loop iterates over `name`, `age`, `city`. <br> The loop outputs `name`, `age`, `city` in sequence. |
| **Stored Data** | None |

#### FR-007 — System: Demonstrate `var` variable hoisting
| Field | Detail |
|-------|--------|
| **Description** | The system SHALL demonstrate `var` variable hoisting by attempting to log a `var` variable before its declaration, expecting `undefined` as output. |
| **Priority** | High |
| **Source** | constraints: "demonstration must show logging a `var` variable before its declaration, expecting `undefined`" |
| **Acceptance Criteria** | The code explicitly logs a `var` variable before its `var` declaration. <br> The output for the pre-declaration log is `undefined`. |
| **Stored Data** | None |

#### FR-008 — System: Demonstrate `let` variable temporal dead zone
| Field | Detail |
|-------|--------|
| **Description** | The system SHALL demonstrate `let` variable temporal dead zone by attempting to log a `let` variable before its declaration, expecting a `ReferenceError`. |
| **Priority** | High |
| **Source** | constraints: "logging a `let` variable before its declaration, expecting a `ReferenceError`" |
| **Acceptance Criteria** | The code explicitly attempts to log a `let` variable before its `let` declaration. <br> The execution results in a `ReferenceError`. |
| **Stored Data** | None |

#### FR-009 — CLI Quiz: Present JavaScript-focused questions
| Field | Detail |
|-------|--------|
| **Description** | The CLI quiz SHALL present 5 JavaScript-focused questions to the user. |
| **Priority** | Critical |
| **Source** | constraints: "The CLI quiz must include 3-5 JavaScript-focused questions" |
| **Acceptance Criteria** | The quiz contains exactly 5 questions. <br> Each question text is displayed clearly to the user. |
| **Stored Data** | Quiz Question |

#### FR-010 — CLI Quiz: Evaluate answers using `switch`
| Field | Detail |
|-------|--------|
| **Description** | The CLI quiz SHALL evaluate user answers for each question using a `switch` statement to determine correctness. |
| **Priority** | High |
| **Source** | constraints: "utilize `switch` for answer evaluation" |
| **Acceptance Criteria** | For each question, user input is compared against the correct answer using a `switch` statement. <br> The `switch` statement correctly identifies whether the user's answer matches the correct answer. |
| **Stored Data** | Quiz Attempt |

#### FR-011 — CLI Quiz: Format output using ternary operators
| Field | Detail |
|-------|--------|
| **Description** | The CLI quiz SHALL use ternary operators for conditional output formatting, such as indicating correct/incorrect answers or displaying feedback. |
| **Priority** | Medium |
| **Source** | constraints: "and ternary operators for output." |
| **Acceptance Criteria** | At least one instance of output generation or formatting uses a ternary operator. <br> The ternary operator correctly applies conditional formatting based on a boolean condition. |
| **Stored Data** | None |

#### FR-012 — CLI Quiz: Implement Question 1
| Field | Detail |
|-------|--------|
| **Description** | The CLI quiz SHALL include the question "Which keyword declares a block-scoped variable that can be reassigned?" with "let" as the correct answer. |
| **Priority** | High |
| **Source** | constraints: "1. Which keyword declares a block-scoped variable that can be reassigned? (let)" |
| **Acceptance Criteria** | The question text is "Which keyword declares a block-scoped variable that can be reassigned?". <br> The correct answer is "let" (case-insensitive). |
| **Stored Data** | Quiz Question |

#### FR-013 — CLI Quiz: Implement Question 2
| Field | Detail |
|-------|--------|
| **Description** | The CLI quiz SHALL include the question "Which keyword declares a constant block-scoped variable?" with "const" as the correct answer. |
| **Priority** | High |
| **Source** | constraints: "2. Which keyword declares a constant block-scoped variable? (const)" |
| **Acceptance Criteria** | The question text is "Which keyword declares a constant block-scoped variable?". <br> The correct answer is "const" (case-insensitive). |
| **Stored Data** | Quiz Question |

#### FR-014 — CLI Quiz: Implement Question 3
| Field | Detail |
|-------|--------|
| **Description** | The CLI quiz SHALL include the question "Which loop iterates over the values of an iterable object?" with "for...of" as the correct answer. |
| **Priority** | High |
| **Source** | constraints: "3. Which loop iterates over the values of an iterable object? (for...of)" |
| **Acceptance Criteria** | The question text is "Which loop iterates over the values of an iterable object?". <br> The correct answer is "for...of" (case-insensitive). |
| **Stored Data** | Quiz Question |

#### FR-015 — CLI Quiz: Implement Question 4
| Field | Detail |
|-------|--------|
| **Description** | The CLI quiz SHALL include the question "What is the result of `typeof null` in JavaScript?" with "object" as the correct answer. |
| **Priority** | High |
| **Source** | constraints: "4. What is the result of `typeof null` in JavaScript? (object)" |
| **Acceptance Criteria** | The question text is "What is the result of `typeof null` in JavaScript?". <br> The correct answer is "object" (case-insensitive). |
| **Stored Data** | Quiz Question |

#### FR-016 — CLI Quiz: Implement Question 5
| Field | Detail |
|-------|--------|
| **Description** | The CLI quiz SHALL include the question "Can a `var` variable be re-declared in the same scope without an error?" with "yes" as the correct answer. |
| **Priority** | High |
| **Source** | constraints: "5. Can a `var` variable be re-declared in the same scope without an error? (yes)" |
| **Acceptance Criteria** | The question text is "Can a `var` variable be re-declared in the same scope without an error?". <br> The correct answer is "yes" (case-insensitive). |
| **Stored Data** | Quiz Question |

#### FR-017 — CLI Quiz: Display final score
| Field | Detail |
|-------|--------|
| **Description** | Upon completion of all questions, the CLI quiz SHALL display the user's final score, indicating how many questions were answered correctly. |
| **Priority** | Critical |
| **Source** | constraints: "The quiz must display a final score" |
| **Acceptance Criteria** | After the last question, a clear message shows the total correct answers. <br> The score accurately reflects the number of correct responses. |
| **Stored Data** | Quiz Attempt |

#### FR-018 — CLI Quiz: List missed questions
| Field | Detail |
|-------|--------|
| **Description** | Upon completion of all questions, the CLI quiz SHALL display a list of all questions that were answered incorrectly by the user. |
| **Priority** | High |
| **Source** | constraints: "and a list of missed questions." |
| **Acceptance Criteria** | After the last question, a section lists all questions for which the user provided an incorrect answer. <br> Each missed question's text is displayed. |
| **Stored Data** | Quiz Attempt |

## 6. Data Specifications

### 6.1. Entities

#### Quiz Question
| Field | Type | Description |
|:------|:-----|:------------|
| `id` | Integer | Unique identifier for the question. |
| `text` | String | The full text of the quiz question. |
| `correctAnswer` | String | The expected correct answer to the question. |

#### Quiz Attempt
| Field | Type | Description |
|:------|:-----|:------------|
| `questionId` | Integer | Identifier linking to the `Quiz Question` that was attempted. |
| `userAnswer` | String | The answer provided by the user for the `questionId`. |
| `isCorrect` | Boolean | `true` if `userAnswer` matches `correctAnswer` for the `questionId`, `false` otherwise. |
