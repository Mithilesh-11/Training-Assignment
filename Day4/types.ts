// Task 1: Convert plain JS user object into a typed interface

//  plain JS user object 
// const user_js = {
//   id: 1,
//   name: "John",
//   email: "example@gmail.com",
//   isActive: true}

// user_js.id="2"
// console.log(user_js.id) // we can assign the id to a string IN javascript which is not expected 

interface User {
  readonly id: number;          //readonly  field
  name: string;    
  email?: string;              //optional field
  isActive?: boolean;         //optional field

}

// Sample valid user object in TS
const user1: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  isActive: true,
};

console.log(user1)


// isActive is optional so we can create a user object without it
const user2: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
};
console.log(user2)


// ---------------------------
// Expected TypeScript Errors
// (Kept commented so file compiles)
// ---------------------------

// Error

// Invalid User Object
// const invalidUser: User = {
//   name: "John"
// };

// console.log(invalidUser);


// Error:
// Property 'id' is missing in type  '{ name: string; }' but required in type 'User'.


// Readonly Property Modification
/*
const readonlyUser: User = {
  id: 1,
  name: "John"
};

readonlyUser.id = 2;
*/

// Error: Cannot assign to 'id' because it is a read-only property.


// const invalidNameType: User = {
//   id: 1,
//   name: 123   
  
//   // Error: Type 'number' is not assignable to type 'string'.
// };
