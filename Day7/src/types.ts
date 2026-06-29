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

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ContactsState {
  contacts: Contact[];
  status: RequestStatus;
  error: string | null;
}

export interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface Post {
  id: number;
  title: string;
}

export interface User {
  id: number;
  name: string;
}