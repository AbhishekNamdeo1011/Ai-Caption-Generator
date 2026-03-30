import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthMessage("Please wait...");
    setIsSubmitting(true);
    const endpoint = isLogin
      ? "http://localhost:3000/api/auth/login"
      : "http://localhost:3000/api/auth/register";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setAuthMessage(
          data.message || (isLogin ? "Login successful!" : "Registration successful!")
        );
        if (onAuthSuccess) onAuthSuccess();
        navigate("/caption");
      } else {
        setAuthMessage(data.message || "Something went wrong");
      }
    } catch {
      setAuthMessage("Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const messageVariant = authMessage.includes("success")
    ? "success"
    : authMessage === "Please wait..."
    ? "status"
    : "error";

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Caption Generator</h1>
        <p className="muted">
          {isLogin ? "Sign in to keep creating captions." : "Create an account to get started."}
        </p>

        <form onSubmit={handleAuth}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            {isSubmitting
              ? "Processing..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>
        </form>

        <p className="switch-row">
          {isLogin ? "Need an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setAuthMessage("");
            }}
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>

        {authMessage && (
          <p className={`auth-hint ${messageVariant}`} role="status" aria-live="polite">
            {authMessage}
          </p>
        )}
      </div>
    </section>
  );
};

export default Login; 
