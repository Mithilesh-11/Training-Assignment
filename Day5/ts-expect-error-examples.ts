import { ApiResponse, User, ApiResult } from "./shared-types";

type UserPreview = Pick<User, "id" | "name">;

enum Direction {
  UP,
  DOWN,
}

// 1. Invalid ApiResponse Data Shape
const response: ApiResponse<User> = {
  success: true,
  // @ts-expect-error - Property 'name' is missing in type '{ id: number; }'
  data: {
    id: 1,
  },
  message: "Success",
};

// 2. Invalid UserPreview Property
const preview: UserPreview = {
  id: 1,
  // @ts-expect-error - Object literal may only specify known properties
  email: "test@test.com",
};

// 3. Accessing Password From UserPreview
const validPreview: UserPreview = { id: 1, name: "John" };
// @ts-expect-error - Property 'password' does not exist on type 'UserPreview'
validPreview.password;

// 4. Invalid Enum Value
// @ts-expect-error - Type '"LEFT"' is not assignable to type 'Direction'
const direction: Direction = "LEFT";

// 5. Accessing Error Property Without Narrowing
const result: ApiResult<User> = {
  error: "User not found",
};
// @ts-expect-error - Property 'data' does not exist on type 'ApiResult<User>'
console.log(result.data);

// 6. Invalid Type Guard Return
function isErrorResponse(data: ApiResult<User>): boolean {
  // @ts-expect-error - Type '"true"' is not assignable to type 'boolean'
  return "true";
}

export {};
