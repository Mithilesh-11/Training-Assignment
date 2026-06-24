// ---------------------------
// Valid Usage Examples
// ---------------------------

type ApiResponseState = "loading" | "success" | "error"


function fetchStatusMessage(state: ApiResponseState): string {
  switch (state) {
    case "loading":
      return "Fetching data, please wait...";

    case "success":
      return "Data loaded successfully!";

    case "error":
      return "An error occurred while fetching data.";

    default:
      // Compile-time exhaustive check
      {
      const _exhaustiveCheck: never = state;
      return _exhaustiveCheck;
      }
  }
}

const loadingState: ApiResponseState = "loading";
const successState: ApiResponseState = "success";
const errorState: ApiResponseState = "error";

console.log(
  fetchStatusMessage(loadingState)
);

console.log(
  fetchStatusMessage(successState)
);

console.log(
  fetchStatusMessage(errorState)
);

// ---------------------------
// Expected TypeScript Errors
// (Kept commented so file compiles)
// ---------------------------


// Invalid Union Value
/*
const invalidState: ApiResponseState =
  "pending";
*/

// Error:
// Type '"pending"' is not assignable to type'ApiResponseState'.