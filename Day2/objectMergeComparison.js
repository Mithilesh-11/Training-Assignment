const obj1 = {
  name: "Alice",
  age: 25
};

const obj2 = {
  age: 30,
  city: "Pune"
};

// Object.assign()
const mergedWithAssign = Object.assign({}, obj1, obj2);

// Spread Operator
const mergedWithSpread = {
  ...obj1,
  ...obj2
};

console.log("Object.assign Result:");
console.log(mergedWithAssign);

console.log("\nSpread Operator Result:");
console.log(mergedWithSpread);



// Mutation Demonstration
const target = { ...obj1 };

Object.assign(target, obj2);

console.log("\nMutated Target using Object.assign:");
console.log(target);

console.log("\nOriginal obj1:");
console.log(obj1);