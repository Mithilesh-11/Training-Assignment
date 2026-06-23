interface User {
  readonly id: number;
  name: string;
  email?: string;
  isActive?: boolean;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  isActive: true,
};

// Function 1
function formatFullName(
  firstName: string,
  lastName: string
): string {
  return `${firstName} ${lastName}`;
}


// Function 2
function calculateTotalPrice(
  items: number[],
  discount: number
): number {
  const total = items.reduce(
    (sum, price) => sum + price,
    0
  );

  return total - discount;
}


// Function 3
function checkIfUserIsActive(
  user: User
): boolean {
  return user.isActive ?? false;
}

console.log(
  formatFullName("John", "Doe")
);

console.log( 
  calculateTotalPrice([100, 200, 300],50 )
);

console.log( checkIfUserIsActive(user));


// ---------------------------
// Expected TypeScript Errors
// (Kept commented so file compiles)
// ---------------------------


// Invalid Function Argument
/*
formatFullName(123, "Doe");
*/

// Error:
// Argument of type 'number'
// is not assignable to parameter
// of type 'string'.

// Missing Argument
/*
formatFullName("John");
*/

// Error:
// Expected 2 arguments,
// but got 1.

// Invalid Discount Type
/*
calculateTotalPrice(
  [10, 20],
  "5%"
);
*/

// Error:
// Argument of type 'string'
// is not assignable to parameter
// of type 'number'.

// Invalid Array Item Type
/*
calculateTotalPrice(
  [10, "20"],
  5
);
*/

// Error:
// Type 'string'
// is not assignable to type 'number'.

// Invalid User Argument
/*
checkIfUserIsActive({
  name: "Jane"
});
*/

// Error:
// Property 'id' is missing
// in type '{ name: string; }'
// but required in type 'User'.

// Null User
/*
checkIfUserIsActive(null);
*/

// Error:
// Argument of type 'null'
// is not assignable to parameter
// of type 'User'.



