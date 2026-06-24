import {createContext,type ReactNode,useContext,useState,} from "react";
import type { Theme, ThemeContextType,} from "../types";

const ThemeContext = createContext< ThemeContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function ThemeProvider({children}: Props) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light"
        ? "dark"
        : "light"
    );
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme,}} >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}