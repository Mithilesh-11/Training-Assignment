/*
========================================
Assignment 2: Utility Types
========================================
*/

import { User } from "./shared-types";
import {
  sampleUserPreview,
  sampleUserWithoutPassword,
  sampleUpdateRequest,
  sampleReadonlyUser,
  sampleUserMap,
} from "./sample-data";

/*
========================================
Pick
========================================
*/

type UserPreview = Pick<User, "id" | "name">;

const userPreview: UserPreview = sampleUserPreview;

console.log("User Preview:");
console.log(userPreview);

/*
========================================
Omit
========================================
*/

type UserWithoutPassword = Omit<User, "password">;

const userWithoutPassword: UserWithoutPassword = sampleUserWithoutPassword;

console.log("\nUser Without Password:");
console.log(userWithoutPassword);

/*
========================================
Partial
========================================
*/

type UserUpdateRequest = Partial<User>;

const updateRequest: UserUpdateRequest = sampleUpdateRequest;

console.log("\nPartial User Update:");
console.log(updateRequest);

/*
========================================
Readonly
========================================
*/

type ReadonlyUser = Readonly<User>;

const readonlyUser: ReadonlyUser = sampleReadonlyUser;

console.log("\nReadonly User:");
console.log(readonlyUser);

/*
========================================
Record
========================================
*/

type UserMap = Record<string, User>;

const users: UserMap = sampleUserMap;

console.log("\nUser Map:");
console.log(users);