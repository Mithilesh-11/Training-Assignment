import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage ()  {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    navigate("/contacts");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__icon">◈</div>
        <h1 className="login-card__title">Welcome back</h1>
        <p className="login-card__subtitle">Sign in to access your contacts</p>

        {error && (
          <div className="login-card__error" role="alert">
            {error}
          </div>
        )}

        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="contact-form__input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="contact-form__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <button className="btn btn--primary btn--full" onClick={handleLogin}>
          Sign In
        </button>

        <p className="login-card__hint">
          Any non-empty credentials will work.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;