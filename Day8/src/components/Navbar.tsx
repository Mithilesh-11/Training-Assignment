import { useNavigate, NavLink } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <button className="navbar__brand" onClick={() => navigate("/")}>
          <span className="navbar__logo">◈</span>
          <span className="navbar__name">ContactsApp</span>
        </button>

        <div className="navbar__links">
          <NavLink
            to="/"
            className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
          >
            Home
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/contacts"
              className={({ isActive }) =>`navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
            >
              Contacts
            </NavLink>
          )}
        </div>

        <div className="navbar__actions">
          {isLoggedIn ? (
            <button className="btn btn--outline" onClick={handleLogout}>
              Log Out
            </button>
          ) : (
            <button
              className="btn btn--primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
