let input = "   HELLO javascript world   ";

function formatString(str) {

  if (str.toLowerCase().includes("javascript")) {
  console.log("Keyword found");
}

  return str
    .trim()                        // "HELLO javascript world"
    .replace("javascript", "JS")   // "HELLO JS world"
    .toLowerCase()                 // "hello js world"
    .split(" ")                    // ["hello", "js", "world"]
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // ["Hello", "Js", "World"]
    .join("-");                    // "Hello-Js-World"
}

const formattedString = formatString(input);

console.log("Formatted String:", formattedString);