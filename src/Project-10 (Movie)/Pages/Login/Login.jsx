import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if not logged in
    if (sessionStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    // Logout when tab/browser is closed
    const handleUnload = () => sessionStorage.removeItem("isLoggedIn");
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim().toLowerCase();
    const trimmedPassword = password.trim();

    console.log("Attempting login with:", trimmedUsername, "********"); // Hides password in logs

    if (trimmedUsername === "kempegowda lokesh" && trimmedPassword === "Lokesh@143") {
      sessionStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              autoComplete="off"
              readOnly
              onFocus={(e) => e.target.removeAttribute("readOnly")} // Prevents autofill
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="new-password" // Prevents previous suggestions
              readOnly
              onFocus={(e) => e.target.removeAttribute("readOnly")} // Prevents autofill
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
