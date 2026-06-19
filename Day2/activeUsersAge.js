// Input Data
const users = [
  { id: 1, name: "Alice", age: 25, active: true },
  { id: 2, name: "Bob", age: 30, active: false },
  { id: 3, name: "Charlie", age: 35, active: true }
];


const totalAge = users
                 .filter(user => user.active)
                 .map(user => user.age)
                 .reduce((sum, age) => sum + age, 0);


console.log("Total Age:", totalAge);