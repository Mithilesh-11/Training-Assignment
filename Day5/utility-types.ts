/*
========================================
Assignment 2: Utility Types
========================================
*/

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

/*
========================================
Pick
========================================
*/

type UserPreview = Pick<User, "id" | "name">;

const userPreview: UserPreview = {
  id: 1,
  name: "John Doe",
};

console.log("User Preview:");
console.log(userPreview);

/*
========================================
Omit
========================================
*/

type UserWithoutPassword = Omit<User, "password">;

const userWithoutPassword: UserWithoutPassword = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
};

console.log("\nUser Without Password:");
console.log(userWithoutPassword);

/*
========================================
Partial
========================================
*/

type UserUpdateRequest = Partial<User>;

const updateRequest: UserUpdateRequest = {
  email: "updated@example.com",
};

console.log("\nPartial User Update:");
console.log(updateRequest);

/*
========================================
Readonly
========================================
*/

type ReadonlyUser = Readonly<User>;

const readonlyUser: ReadonlyUser = {
  id: 2,
  name: "Jane Smith",
  email: "jane@example.com",
  password: "jane123",
};

console.log("\nReadonly User:");
console.log(readonlyUser);

/*
========================================
Record
========================================
*/

type UserMap = Record<string, User>;

const users: UserMap = {
  user1: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "john123",
  },
  user2: {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "jane123",
  },
};

console.log("\nUser Map:");
console.log(users);