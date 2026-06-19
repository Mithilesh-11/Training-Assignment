// Input Data
const users = [
  { id: 1, name: "Alice", age: 25, active: true },
  { id: 2, name: "Bob", age: 30, active: false },
  { id: 3, name: "Charlie", age: 35, active: true }
];

// As Mentioned in the Assignment: Using filter, map, and reduce to calculate total age of active users
const totalAge = users
                 .filter(user => user.active)
                 .map(user => user.age)
                 .reduce((sum, age) => sum + age, 0);


// Alternate approach without chaining using single reduce method

// const totalAge = users.reduce((sum, user) => {
//     return user.active ? sum + user.age : sum;
// }, 0);


console.log("Total Age:", totalAge);