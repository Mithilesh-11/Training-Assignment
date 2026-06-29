import { useFetch } from "../hooks/useFetch";
import type { Post} from "../types"


export default function Posts() {
  const {
    data,
    loading,
    error,
  } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading)
    return (
      <p>Loading posts...</p>
    );

  if (error)
    return <p>{error}</p>;

  return (
    <div className="border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Posts
      </h2>

      <ul className="space-y-2">
        {data?.slice(0, 5).map((post) => (
            <li
              key={post.id}
              className="border rounded p-2"
            >
              {post.title}
            </li>
          ))}
      </ul>
    </div>
  );
}