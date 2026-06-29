import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

const AUTH_TOKEN_KEY = "authToken";

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => Boolean(localStorage.getItem(AUTH_TOKEN_KEY))
  );

  const login = () => {
    localStorage.setItem(AUTH_TOKEN_KEY, "demo-token");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsLoggedIn(false);
  };

  const value = useMemo(
    () => ({ isLoggedIn, login, logout }),
    [isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
