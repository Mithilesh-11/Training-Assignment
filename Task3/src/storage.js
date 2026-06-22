export const USER_STORAGE_KEY = "user";

const isValidUser = (user) => {
  return (
    user &&
    typeof user === "object" &&
    typeof user.email === "string" &&
    user.email.trim() !== "" &&
    (user.loginMethod === "localStorage" || user.loginMethod === "sessionStorage") &&
    typeof user.loginTime === "number" &&
    typeof user.savedAt === "number"
  );
};

export const saveUser = (user, rememberMe) => {
  const userData = {
    ...user,
    savedAt: Date.now(),
  };

  if (rememberMe) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    sessionStorage.removeItem(USER_STORAGE_KEY);
  } else {
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    localStorage.removeItem(USER_STORAGE_KEY);
  }
};

export const getUser = () => {
  try {
    const localUser = localStorage.getItem(USER_STORAGE_KEY);
    const sessionUser = sessionStorage.getItem(USER_STORAGE_KEY);

    if (localUser) {
      let parsedUser;
      try {
        parsedUser = JSON.parse(localUser);
      } catch (e) {
        throw new Error("Invalid JSON in localStorage");
      }

      if (!isValidUser(parsedUser)) {
        throw new Error("Corrupted user data structure in localStorage");
      }

      // Check if user data stored in localStorage is stale/outdated based on 30-day expiration
      const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
      if (Date.now() - parsedUser.savedAt > THIRTY_DAYS) {
        localStorage.removeItem(USER_STORAGE_KEY);
        return null;
      }

      return parsedUser;
    }

    if (sessionUser) {
      let parsedUser;
      try {
        parsedUser = JSON.parse(sessionUser);
      } catch (e) {
        throw new Error("Invalid JSON in sessionStorage");
      }

      if (!isValidUser(parsedUser)) {
        throw new Error("Corrupted user data structure in sessionStorage");
      }

      return parsedUser;
    }

    return null;
  } catch (error) {
    console.error("Invalid or corrupted storage data:", error.message);
    localStorage.removeItem(USER_STORAGE_KEY);
    sessionStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
  sessionStorage.removeItem(USER_STORAGE_KEY);
};
