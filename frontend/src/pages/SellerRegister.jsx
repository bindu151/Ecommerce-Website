
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/seller-auth.css";

function SellerRegister() {
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

    const savedSeller = {
      name,
      email,
      password,
    };

    localStorage.setItem("sellerAccount", JSON.stringify(savedSeller));

    alert("Seller account created successfully!");
    navigate("/seller/login");
  }

  return (
    <div className="seller-auth-page">
      <form className="seller-auth-card" onSubmit={handleRegister}>
        <h1>Create Seller Account</h1>
        <p>Register your store to start managing products.</p>

        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="At least 6 characters"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={6}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />

        {message && <p className="seller-auth-message">{message}</p>}

        <button type="submit">Create Account</button>

        <p className="seller-auth-footer">
          Already have an account?{" "}
          <Link to="/seller/login">Login</Link>
        </p>

        <Link className="seller-auth-back" to="/">
          Back to Home
        </Link>
      </form>
    </div>
  );
}

export default SellerRegister;
