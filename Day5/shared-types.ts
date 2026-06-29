/*
========================================
Shared Types and Interfaces
========================================
*/

// Generic API Response type
type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

// User interface
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Product interface
interface Product {
  id: number;
  title: string;
  price: number;
}

// Error Response type
type ErrorResponse = {
  error: string;
};

// Union type for API results
type ApiResult<T> = ApiResponse<T> | ErrorResponse;

export { ApiResponse, User, Product, ErrorResponse, ApiResult };
