function AdminLogin({ onLogin }) {
  return (
    <div className="login-page">
      <h1>Admin Login</h1>

      <input
        type="email"
        placeholder="Enter email"
      />

      <input
        type="password"
        placeholder="Enter password"
      />

      <button onClick={onLogin}>
        Login
      </button>
    </div>
  );
}

export default AdminLogin;