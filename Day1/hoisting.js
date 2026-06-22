console.log("===== HOISTING DEMONSTRATION =====");


// ======================================
// VAR HOISTING
// ======================================

function varHoistingDemo() {
    console.log("\nVAR HOISTING");

    console.log(myVar);

    var myVar = "Hello from var";

    console.log(myVar);
}

varHoistingDemo();


// ======================================
// LET HOISTING (TEMPORAL DEAD ZONE)
// ======================================

function letHoistingDemo() {
    console.log("\nLET HOISTING");

    try {
        console.log(myLet);

        let myLet = "Hello from let";

        console.log(myLet);
    } catch (error) {
        console.log(error.message);
    }
}

letHoistingDemo();


// ======================================
// FUNCTION DECLARATION HOISTING
// ======================================

console.log("\nFUNCTION DECLARATION HOISTING");

greet();

function greet() {
    console.log("Hello from function declaration");
}


// ======================================
// FUNCTION EXPRESSION HOISTING
// ======================================

console.log("\nFUNCTION EXPRESSION HOISTING");

try {
    sayHi();

    const sayHi = function() {
        console.log("Hello from function expression");
    };
} catch (error) {
    console.log(error.message);
}

