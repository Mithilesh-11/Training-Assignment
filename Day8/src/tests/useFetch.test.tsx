import { renderHook, waitFor } from "@testing-library/react";
import useFetch from "../hooks/useFetch"; // Adjust paths as needed
import "@testing-library/jest-dom";


const mockContacts = [
  { id: 1, name: "Leanne Graham", email: "leanne@example.com", phone: "1-770-736-8031" },
  { id: 2, name: "Ervin Howell", email: "ervin@example.com", phone: "010-692-6593" },
];

const mockFetch = (data: unknown, ok = true, delay = 0) => {
  (globalThis as any).fetch = jest.fn(() =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        if (ok) {
          resolve({ ok: true, json: async () => data } as Response);
        } else {
          reject(new Error("Network Error"));
        }
      }, delay)
    )
  );
};

describe("useFetch Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns loading then data", async () => {
    mockFetch(mockContacts, true, 10);

    // 1. renderHook executes the hook in isolation
    const { result } = renderHook(() => useFetch("/api/contacts"));

    // 2. Test initial synchronous state
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();

    // 3. waitFor pauses until internal hook state updates asynchronously
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // 4. Assert the final returned state values directly
    expect(result.current.data).toEqual(mockContacts);
    expect(result.current.error).toBeNull();
  });

  
  it("returns error state when fetch fails", async () => {
    mockFetch(null, false);

    const { result } = renderHook(() => useFetch("/api/contacts"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Network Error");
    expect(result.current.data).toBeNull();
  });
});
