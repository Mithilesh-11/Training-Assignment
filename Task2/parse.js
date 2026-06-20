console.log("\n===== Destructuring + Optional Chaining =====");

const apiResponse = {
  data: {
    user: {
      id: 1,
      profile: {
        firstName: "John",
        lastName: "Doe",
        contact: {
        },
      },
      address: {
        city: "Pune",
      },
    },
  },
};


function parseUserData(response = {}) {
  // Deep nested destructuring with safe fallbacks
  const {
    data: {
      user: {
        id = null,
        profile: {
          firstName = "First Name Not Available",
          lastName = "Last Name Not Available",
          contact: { email = "Email Not Available" } = {},
        } = {},
        address: { city = "City Not Available" } = {},
      } = {},
    } = {},
  } = response ?? {};

  // Printing each value safely using optional chaining and nullish coalescing
  console.log("ID:", response?.data?.user?.id ?? "ID Not Available");
  console.log("First Name:", response?.data?.user?.profile?.firstName ?? "First Name Not Available");
  console.log("Last Name:", response?.data?.user?.profile?.lastName ?? "Last Name Not Available" );
  console.log("Email:", response?.data?.user?.profile?.contact?.email ?? "Email Not Available");
  console.log("City:", response?.data?.user?.address?.city ?? "City Not Available");

  // Returning the destructured variables
  return { id, firstName, lastName, email, city };
}

// Example 1: Run with valid data
console.log("--- 1. Valid Response Output ---");
parseUserData(apiResponse);

// Example 2: Run with empty object to verify robustness
console.log("\n--- 2. Empty Response Output ---");
parseUserData({});

// Example 3: Run with null to verify null-safety
console.log("\n--- 3. Null Response Output ---");
parseUserData(null);





console.log("\n===== Real API Data Destructuring example =====");

async function getGitHubUser(username = "octocat") {
  const url = `https://api.github.com/users/${username}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 403) {
        const remaining = response.headers.get("X-RateLimit-Remaining");
        if (remaining === "0") {
          throw new Error("GitHub API rate limit exceeded. Please try again later.");
        }
      }
      if (response.status === 404) {
        throw new Error("GitHub user not found.");
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    console.log("\nDestructuring the Response ---");
    // Destructuring all 6 spec-defined fields with safe fallbacks
    const {
      login = "Unknown",
      name = "No Name",
      company = "No Company",
      location = "Unknown Location",
      followers = 0,
      following = 0
    } = data ?? {};

    // Printing the variables created via destructuring
    console.log("Destructured values: ", { login, name, company, location, followers, following });

  } catch (error) {
    console.error("Failed to fetch or parse user data:", error.message);
  }
}

async function runGitHubDemos() {
  await getGitHubUser("octocat");
  console.log("\n----------------------------------------------");
  await getGitHubUser("invalid-github-user-xyz-12345");
}

runGitHubDemos();