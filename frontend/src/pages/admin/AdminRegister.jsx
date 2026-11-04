
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/admin.css";

function AdminRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleRegister(event) {
    event.preventDefault();

    if (password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const adminAccount = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
    };

    localStorage.setItem(
      "adminAccount",
      JSON.stringify(adminAccount)
    );

    alert("Admin account created successfully!");
    navigate("/admin/login");
  }

  return (
    <div className="login-page">
      <form onSubmit={handleRegister}>
        <h1>Create Admin Account</h1>

        <input
          type="text"
          placeholder="Enter full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Create password (at least 6 characters)"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={6}
          required
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(event) =>
            setConfirmPassword(event.target.value)
          }
          required
        />

        {message && (
          <p style={{ color: "red" }}>{message}</p>
        )}

        <button type="submit">Create Account</button>

        <p>
          Already have an account?{" "}
          <Link to="/admin/login">Admin Login</Link>
        </p>
      </form>
    </div>
  );
}

export default AdminRegister;
