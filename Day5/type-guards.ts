/*
========================================
Assignment 3: Type Guard
========================================
*/

import { User, ApiResult, ErrorResponse } from "./shared-types";
import { successUserResult, errorUserResult } from "./sample-data";

/*
========================================
Type Guard
========================================
*/

// FIXED: Changed <any> to a generic <T> to keep your strict User types intact
function isErrorResponse<T>(data: ApiResult<T>): data is ErrorResponse {
  return "error" in data;
}

/*
========================================
Success Example
========================================
*/

const successResponse: ApiResult<User> = successUserResult;

if (isErrorResponse(successResponse)) {
  console.log("Error:", successResponse.error);
} else {
  console.log("Success User:");
  // Safe: TypeScript accurately knows .data belongs to the User interface here
  console.log(successResponse.data.name);
}

/*
========================================
Error Example
========================================
*/

const errorResponse: ApiResult<User> = errorUserResult;

if (isErrorResponse(errorResponse)) {
  console.log(errorResponse.error);
} else {
  console.log("Success User:");
  console.log(errorResponse.data.name);
}

/*
========================================
Enum
========================================
*/

enum Direction {
  UP,
  DOWN,
}

const currentDirection: Direction = Direction.UP;

console.log("\nDirection:");
console.log(currentDirection);