const input = "   HELLO javascript world   ";

// Demonstrating string methods
if (typeof input === "string" && input.toLowerCase().includes("javascript")) {
    console.log("Keyword found");
}

// String formatting function with validation
function formatString(str) {
    // Type validation
    if (typeof str !== "string") {
        throw new Error("Input must be a string");
    }

    // Empty string validation
    if (str.trim().length === 0) {
        throw new Error("Input string cannot be empty");
    }

    return str
        .trim()                          // "HELLO javascript world"
        .replace("javascript", "JS")     // "HELLO JS world"
        .toLowerCase()                   // "hello js world"
        .split(/\s+/)                    // ["hello", "js", "world"]
        .map( word =>word.charAt(0).toUpperCase() +word.slice(1))
        .join("-");                      // "Hello-Js-World"
}

try {
    const formattedString = formatString(input);
    console.log("Formatted String:", formattedString);
} catch (error) {
    console.error("Error:", error.message);
}
