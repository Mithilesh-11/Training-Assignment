import UserCard from "./UserCard";

const User = () => {
 return (
      <div className="mx-auto max-w-6xl">

        <div>
          <h2 className="mb-6 text-2xl font-bold">
            User Cards
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <UserCard
              name="John Doe"
              email="john@example.com"
              isActive={true}
            />

            <UserCard
              name="Jane Smith"
              email="jane@example.com"
              isActive={false}
            />

            <UserCard
              name="Bob Wilson"
              email="bob@example.com"
              isActive={true}
            />
              <UserCard
              name="Jane Smith"
              email="abc@example.com"
              isActive={true}
            />
          </div>
        </div>
      </div>
  );
}

export default User