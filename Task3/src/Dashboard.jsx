import { removeUser } from "./storage";
import React from "react";


function Dashboard({ user, setUser }) {
  const handleLogout = () => {
    removeUser();
    setUser(null);
  };

  return (
    <div className="card">
      <h1 className="card-title">Welcome</h1>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Stored In:</strong> {user.loginMethod}
      </p>

      <p>
        <strong>Last Login:</strong> {new Date(user.loginTime).toLocaleString()}
      </p>

      <button id="dashboard-logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;