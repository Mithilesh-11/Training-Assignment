import type { UserCardProps } from "../types";

export default function UserCard({ name, email, isActive }: UserCardProps) {
  return (
    <div className="rounded-xl border border-black bg-white p-6 shadow-sm transition hover:shadow-md">
      <h3 className="text-xl font-bold text-black">{name}</h3>
      <p className="mt-2 text-gray-700">{email}</p>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={`inline-block rounded-full border px-3 py-1 text-sm font-medium ${
            isActive ? "border-black bg-black text-white" : "border-gray-400 bg-gray-100 text-gray-700"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>

        {!isActive && <span className="text-sm text-gray-600">User is inactive</span>}
      </div>
    </div>
  );
}