
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/seller-auth.css";

function SellerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    const savedSeller = JSON.parse(
      localStorage.getItem("sellerAccount") || "null"
    );

    if (
      savedSeller &&
      savedSeller.email === email &&
      savedSeller.password === password
    ) {
      setMessage("Login successful!");
      navigate("/seller/dashboard");
    } else {
      setMessage("Account not found or incorrect details. Please create an account.");
    }
  }

  return (
    <div className="seller-auth-page">
      <form className="seller-auth-card" onSubmit={handleLogin}>
        <h1>Seller Login</h1>
        <p>Login to manage your store and products.</p>

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
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {message && <p className="seller-auth-message">{message}</p>}

        <button type="submit">Login</button>

        <p className="seller-auth-footer">
          Don't have a seller account?{" "}
          <Link to="/seller/register">Create Account</Link>
        </p>

        <Link className="seller-auth-back" to="/">
          Back to Home
        </Link>
      </form>
    </div>
  );
}

export default SellerLogin;
