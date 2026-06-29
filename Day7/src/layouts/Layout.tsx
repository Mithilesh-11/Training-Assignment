import { Link, Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >
      <nav className="border-b border-gray-500">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="flex gap-4">

            <Link to="/" className="hover:underline">
              Home
            </Link>

            <Link to="/contacts"className="hover:underline">
              Contacts
            </Link>

            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </div>

          <button onClick={toggleTheme} className="border px-3 py-1 rounded hover:bg-gray-200 hover:text-black transition" >
            {theme === "light"
              ? "Dark Mode"
              : "Light Mode"}
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
         <Outlet />
      </main>
    </div>
  );
}