import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const handleLogin = async (e) => {
    e.preventDefault();
  const email = document.querySelector(".login-email").value.trim();
  const password = document.querySelector(".login-password").value;

  if (!email) {
    alert("Please enter your email.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!password) {
    alert("Please enter your password.");
    return;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

if (response.ok) {
  localStorage.setItem("token", data.token);

  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  alert("Login successful!");
} else {
  if (response.status === 401) {
    alert("Invalid email or password.");
  } else if (response.status === 404) {
    alert("Account not found. Please create an account first.");
    setPage("register");
  } else {
    alert(data.message || "Login failed.");
  }
}
  } catch (error) {
    alert("Server connection error!");
  }
};

const handleRegister = async () => {
  const name = document.querySelector(".register-name").value.trim();
const email = document.querySelector(".register-email").value.trim();
const password = document.querySelector(".register-password").value;
const confirmPassword = document.querySelector(".register-confirm-password").value;
  if (!name) {
    alert("Please enter your name.");
    return;
  }

  if (!email || !email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
  alert("Account created successfully!");
  setPage("login");
} else {
  if (response.status === 409) {
    alert("This email is already registered.");
  } else if (response.status === 400) {
    alert(data.message || "Please check your registration details.");
  } else {
    alert(data.message || "Registration failed.");
  }
}
  } catch (error) {
    alert("Server connection error!");
  }
};

  return (
    <div className="auth-page">

{/* LEFT SIDE */}
<div className="left-panel">

  <div className="brand-name">
    Shop<span>Ease</span>
  </div>

  <p className="brand-tagline">
    Better Products • Happier You
  </p>

  <h1 className="left-main-title">
    Shop Smarter,
    <br />
    <span>Live Better</span>
  </h1>

  <p className="left-description">
    Discover amazing products, great deals
    <br />
    and a seamless shopping experience —
    <br />
    all in one place.
  </p>

  <div className="feature-item">
    <div className="feature-icon">🚚</div>
    <div>
      <b>Fast & Reliable Delivery</b>
      <p>Your order, on time</p>
    </div>
  </div>

  <div className="feature-item">
    <div className="feature-icon">🛡️</div>
    <div>
      <b>Secure Payments</b>
      <p>Shop with confidence</p>
    </div>
  </div>

  <div className="feature-item">
    <div className="feature-icon">★</div>
    <div>
      <b>Personalized for You</b>
      <p>Because you're unique</p>
    </div>
  </div>

</div>


      {/* RIGHT SIDE */}
      <div className="right-panel">

        <div className="top-buttons">
          <button
            className={page === "login" ? "active-tab" : ""}
            onClick={() => setPage("login")}
          >
            Login
          </button>

          <button
            className={page === "register" ? "active-tab" : ""}
            onClick={() => setPage("register")}
          >
            Register
          </button>
        </div>

        {page === "login" ? (
          <>
            <p className="new-user-text">
              New here? Create an account and start shopping with us.
            </p>

            <h2>Login to Your Account</h2>

            <p className="subtitle">
              Enter your email and password to continue.
            </p>

            <input
              type="email"
              className="login-email"
              placeholder="Enter your email"
            />

            <input
              type="password"
              className="login-password"
              placeholder="Enter your password"
            />

            <div className="remember">
              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <button type="button" className="forgot">
                Forgot password?
              </button>
            </div>

           <button
  type="button"
  className="sign-in"
  onClick={handleLogin}
  >
  Sign In
</button>

            <div className="or">
              <span>or</span>
            </div>

            {/* GOOGLE */}
            <button type="button" className="social-btn">

              <span className="google-icon">
                <svg viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M21.35 12.27c0-.79-.07-1.55-.23-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M6.54 13.59A5.85 5.85 0 0 1 6.24 12c0-.55.1-1.08.3-1.59V7.88H3.3A9.5 9.5 0 0 0 2.5 12c0 1.49.36 2.9 1 4.12l3.04-2.53z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 6.38c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.83 3.43 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.38l3.04 2.53C7.31 8.1 9.46 6.38 12 6.38z"
                  />
                </svg>
              </span>

              Continue with Google
            </button>

            {/* OTP */}
            <button type="button" className="social-btn">

              <span className="otp-icon">
                <svg viewBox="0 0 24 24">
                  <rect
                    x="5"
                    y="2.5"
                    width="14"
                    height="19"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="18"
                    r="1"
                    fill="currentColor"
                  />
                </svg>
              </span>

              Continue with OTP
            </button>

          
          </>
        ) : (
          <>
            <p className="new-user-text">
              Create your account and start shopping with us.
            </p>

            <h2>Create Your Account</h2>

            <p className="subtitle">
              Enter your details to create your account.
            </p>

            <input
              type="text"
              className="register-name"
              placeholder="Full Name"
            />

            <input
              type="email"
              className="register-email"
              placeholder="Email"
            />

            <input
              type="password"
              className="register-password"
              placeholder="Password"
            />

            <input
              type="password"
              className="register-confirm-password"
              placeholder="Confirm Password"

            />

            <button 
            type = "button"
            className="sign-in"
            onClick ={handleRegister}
            >
              Create Account
            </button>

            <p className="create-text">
              Already have an account?
            </p>

            <button
              type="button"
              className="create-btn"
              onClick={() => setPage("login")}
            >
              Login
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default App;

