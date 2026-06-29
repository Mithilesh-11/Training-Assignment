import UserCard from "./UserCard";
import { mockUsers } from "../mocks/users";

export default function UserList() {
  return (
    <div className="mx-auto max-w-6xl">
      <div>
        <h2 className="mb-6 text-2xl font-bold">User Cards</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {mockUsers.map((user) => (
            <UserCard key={user.id} name={user.name} email={user.email} isActive={user.isActive} />
          ))}
        </div>
      </div>
    </div>
  );
}