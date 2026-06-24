import { useFetch } from "../hooks/useFetch";

interface User {
  id: number;
  name: string;
}

export default function Users() {
  const {
    data,
    loading,
    error,
  } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading)
    return (
      <p>Loading users...</p>
    );

  if (error)
    return <p>{error}</p>;

  return (
    <div className="border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Users
      </h2>

      <ul className="space-y-2">
        {data?.map((user) => (
          <li
            key={user.id}
            className="border rounded p-2"
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}