/*
========================================
Assignment 1: Generic ApiResponse<T>
========================================
*/

type ApiResponse<T> = {
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

interface Product {
  id: number;
  title: string;
  price: number;
}

/*
========================================
ApiResponse<User>
========================================
*/

const userResponse: ApiResponse<User> = {
  success: true,
  data: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "john123",
  },
  message: "User fetched successfully",
};

console.log("User Response:");
console.log(userResponse);

/*
========================================
ApiResponse<Product>
========================================
*/

const productResponse: ApiResponse<Product> = {
  success: true,
  data: {
    id: 101,
    title: "Laptop",
    price: 75000,
  },
  message: "Product fetched successfully",
};

console.log("\nProduct Response:");
console.log(productResponse);

/*
========================================
ApiResponse<User[]>
========================================
*/

const usersResponse: ApiResponse<User[]> = {
  success: true,
  data: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: "john123",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      password: "jane123",
    },
  ],
  message: "Users fetched successfully",
};

console.log("\nUsers Response:");
console.log(usersResponse);