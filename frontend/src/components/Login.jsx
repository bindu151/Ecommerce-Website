 import { useState } from "react";
 function Login({ onRegister }) {
  const handleLogin = async (e) => {
  e.preventDefault();
  alert("BUTTON WORKING");

  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
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
      alert(data.message || "Login failed!");
    }
  } catch (error) {
    console.error(error);
    alert("Server connection error!");
  }
};

  return (
    <div className="form-container">

      <p className="new-user-text">
        New here? Create an account and start shopping with us.
      </p>

      <h1>Login to Your Account</h1>

      <p className="subtitle">
        Enter your email and password to continue.
      </p>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          name ="email"
          placeholder="Enter your email"
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          required
        />

        <div className="remember-row">
          <label>
            <input type="checkbox" />
            <span>Remember me</span>
          </label>

          <button type="button" className="forgot-btn">
            Forgot password?
          </button>
        </div>

        <button type="submit" className="sign-in-btn">
          Sign In
        </button>

      </form>

      <div className="or-divider">
        <span>or</span>
      </div>

<button className="social-btn">
  <span className="google-icon">
    <svg viewBox="0 0 24 24" width="20" height="20">
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

<button className="otp-btn">
  <span className="otp-icon">
    <svg viewBox="0 0 24 24" width="20" height="20">
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
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  </span>

  Continue with OTP
</button>
  

      <div className="create-account">
        <p>Don't have an account?</p>

        <button
          type="button"
          onClick={onRegister}
        >
          Create account
        </button>
      </div>

    </div>
  );
}

export default Login;