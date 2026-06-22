import React from "react";
import { useState } from "react";
import { saveUser } from "./storage";


export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [validationError, setValidationError] = useState("");
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const MIN_PASSWORD_LENGTH = 8;

  const handleLogin = (userData, rememberMe) => {
    const savedUser  = saveUser(userData, rememberMe);
    setUser(savedUser);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setValidationError("Email is required.");
      return;
    }

    // Email format validation
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    // Trim password and enforce length
    const trimmedPassword = password.trim();
    if (trimmedPassword.length < MIN_PASSWORD_LENGTH) {
      setValidationError("Password must be at least 8 characters.");
      return;
    }

    const user = {
      email: trimmedEmail,
      loginMethod: rememberMe ? "localStorage" : "sessionStorage",
      loginTime: Date.now(), // Store as number (timestamp) per specifications
    };

    handleLogin(user, rememberMe);
  };
  return (
    <div className="card">
      <h1 className="card-title">Login</h1>
      {validationError && (
        <div id="login-validation-error" className="validation-error-message" role="alert">
          {validationError}
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="input-group">
          <input
            id="login-email-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            id="login-password-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <label className="checkbox-container">
          <input
            id="login-remember-me-checkbox"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span className="checkbox-label">Remember Me</span>
        </label>
        <button id="login-submit-button" type="submit">Login</button>
      </form>
    </div>
  );
}
