console.log("===== LOOP EXAMPLES =====");

const numbers = [1, 2, 3, 4];

const user = {
    name: "Alice",
    age: 30,
    city: "New York"
};


// ======================================
// FOR LOOP (Array)
// ======================================

console.log("\nFOR LOOP - Array");

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}


// ======================================
// FOR LOOP (Object Keys using Object.keys())
// ======================================

console.log("\nFOR LOOP - Object Keys");

const keys = Object.keys(user);

for (let i = 0; i < keys.length; i++) {
     console.log(keys[i]);
           
}


// ======================================
// WHILE LOOP
// ======================================

console.log("\nWHILE LOOP");

let index = 0;

while (index < numbers.length) {
    console.log(numbers[index]);
    index++;
}


// ======================================
// DO...WHILE LOOP
// ======================================

console.log("\nDO...WHILE LOOP");

let count = 0;

do {
    console.log(numbers[count]);
    count++;
} while (count < numbers.length);


// ======================================
// FOR...OF LOOP
// ======================================

console.log("\nFOR...OF LOOP");

for (const value of numbers) {
    console.log(value);
}


// ======================================
// FOR...IN LOOP
// ======================================

console.log("\nFOR...IN LOOP");

for (const key in user) {
    console.log(key);
}