
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/admin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    let savedAdmin = null;

    try {
      savedAdmin = JSON.parse(
        localStorage.getItem("adminAccount") || "null"
      );
    } catch {
      savedAdmin = null;
    }

    // Demo account works until an account is registered.
    const correctEmail = "admin@shopease.com";
    const correctPassword = "Admin@123";

    const registeredAccountMatches =
      savedAdmin &&
      savedAdmin.email === email.trim().toLowerCase() &&
      savedAdmin.password === password;

    const demoAccountMatches =
      !savedAdmin &&
      email.trim().toLowerCase() === correctEmail &&
      password === correctPassword;

    if (registeredAccountMatches || demoAccountMatches) {
      navigate("/admin/dashboard");
    } else {
      setMessage("Invalid email or password.");
    }
  }

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <h1>Admin Login</h1>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {message && (
          <p style={{ color: "red" }}>{message}</p>
        )}

        <button type="submit">Login</button>

        <p>
          Don't have an account?{" "}
          <Link to="/admin/register">Create Account</Link>
        </p>
      </form>
    </div>
  );
}

export default AdminLogin;
