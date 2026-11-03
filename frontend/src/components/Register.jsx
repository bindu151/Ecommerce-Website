function Register({ onLogin }) {
  const handleRegister = (e) => {
    e.preventDefault();
    alert("Registration successful!");
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
          placeholder="Full Name"
          required
        />

        <input
          type="email"
          placeholder="Email"
          required
        />

        <input
          type="password"
          placeholder="Password"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          required
        />

        <button type="submit" className="sign-in-btn">
          Create Account
        </button>

      </form>

      <div className="create-account">
        <p>Already have an account?</p>

        <button
          type="button"
          onClick={onLogin}
        >
          Login
        </button>
      </div>

    </div>
  );
}

export default Register;