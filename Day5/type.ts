/*
========================================
Assignment 3: Type Guard
========================================
*/

type Apiresponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

/*
========================================
Error Response
========================================
*/

type ErrorResponse = {
  error: string;
};

/*
========================================
Union Type
========================================
*/

type ApiResult<T> = Apiresponse<T> | ErrorResponse;

/*
========================================
Type Guard
========================================
*/

// FIXED: Changed <any> to a generic <T> to keep your strict User types intact
function isErrorResponse<T>(
  data: ApiResult<T>
): data is ErrorResponse {
  return "error" in data;
}

/*
========================================
Success Example
========================================
*/

const successResponse: ApiResult<User> = {
  success: true,
  data: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "john123",
  },
  message: "User fetched successfully",
};

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

const errorResponse: ApiResult<User> = {
  error: "User not found",
};

if (isErrorResponse(errorResponse)) {
  console.log(errorResponse.error);
} else {
  console.log("Success User:");
  console.log(successResponse.data.name); }

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