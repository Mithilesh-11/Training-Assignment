import { useEffect, useState } from "react";
import type { UseFetchResult } from "../types";

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();

        setData(result);

      } catch (err) {
        setError( err instanceof Error ? err.message : "Unknown Error");

      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
}