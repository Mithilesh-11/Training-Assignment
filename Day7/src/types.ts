export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}

export interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}