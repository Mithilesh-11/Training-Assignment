interface UserCardProps {
  name: string;
  email: string;
  isActive: boolean;
}

export default function UserCard({name,email,isActive,}: UserCardProps) {
  return (
        <>
      {isActive && (
         <div className="rounded-xl border border-black bg-white p-6 shadow-sm transition hover:shadow-md">
          <h3 className="text-xl font-bold text-black">
            {name}
          </h3>

          <p className="mt-2 text-gray-700">
            {email}
          </p>

          <span className="mt-4 inline-block rounded-full border border-black px-3 py-1 text-sm font-medium">
            Active
          </span>
          </div>

      ) 

  }
  </>
  );
}