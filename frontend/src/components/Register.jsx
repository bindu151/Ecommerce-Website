
function Register({ onLogin }) {
  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const confirmPassword = e.target.elements.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login.");
        onLogin();
      } else {
        alert(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Server connection error! Please check your backend.");
    }
  };

  return (
    <div className="form-container">
      <p className="new-user-text">
        Create your account and start shopping with us.
      </p>

      <h1>Create Your Account</h1>

      <p className="subtitle">
        Enter your details to create your account.
      </p>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
        />

        <button type="submit" className="sign-in-btn">
          Create Account
        </button>
      </form>

      <div className="create-account">
        <p>Already have an account?</p>

        <button type="button" onClick={onLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Register;
