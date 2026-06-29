import {createContext,type ReactNode,useContext,useState, useMemo  ,useCallback} from "react";
import type { Theme, ThemeContextType,} from "../types";

const ThemeContext = createContext< ThemeContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function ThemeProvider({children}: Props) {
  const [theme, setTheme] = useState<Theme>("light");



  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }, []);
    
   const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value} >
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