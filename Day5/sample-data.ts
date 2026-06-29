/*
========================================
Sample Data Constants
========================================
*/

import { ApiResponse, User, Product, ApiResult } from "./shared-types";

// Sample user data
export const sampleUser: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  password: "john123",
};

export const sampleUser2: User = {
  id: 2,
  name: "Jane Smith",
  email: "jane@example.com",
  password: "jane123",
};

// Sample product data
export const sampleProduct: Product = {
  id: 101,
  title: "Laptop",
  price: 75000,
};

// Sample API responses
export const userResponse: ApiResponse<User> = {
  success: true,
  data: sampleUser,
  message: "User fetched successfully",
};

export const productResponse: ApiResponse<Product> = {
  success: true,
  data: sampleProduct,
  message: "Product fetched successfully",
};

export const usersResponse: ApiResponse<User[]> = {
  success: true,
  data: [sampleUser, sampleUser2],
  message: "Users fetched successfully",
};





// Sample API results with union types
export const successUserResult: ApiResult<User> = {
  success: true,
  data: sampleUser,
  message: "User fetched successfully",
};

export const errorUserResult: ApiResult<User> = {
  error: "User not found",
};

// User utility examples data
export const sampleUserPreview = {
  id: 1,
  name: "John Doe",
};

export const sampleUserWithoutPassword = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
};

export const sampleUpdateRequest = {
  email: "updated@example.com",
};

export const sampleReadonlyUser: Readonly<User> = {
  id: 2,
  name: "Jane Smith",
  email: "jane@example.com",
  password: "jane123",
};

export const sampleUserMap = {
  user1: sampleUser,
  user2: sampleUser2,
};
