// Object.assign()

const obj1 = {
  name: "Alice",
  age: 25
};

const obj2 = {
  age: 30,
  city: "Pune"
};

console.log("Before Mutation (obj1):");
console.log(obj1);

Object.assign(obj1, obj2);

console.log("\nAfter Object.assign (obj1):"); // obj1 is mutated
console.log(obj1);


// Spread Operator

const obj3 = {
  name: "Alice",
  age: 25
};

const obj4 = {
  age: 30,
  city: "Pune"
};

console.log("\nBefore Using Spread Operator (obj3):");
console.log(obj3);

const mergedWithSpread = {
  ...obj3,
  ...obj4
};

console.log("\nSpread Operator Result:");
console.log(mergedWithSpread);

console.log("\nAfter Using Spread Operator (obj3):"); // obj3 remains unchanged
console.log(obj3);