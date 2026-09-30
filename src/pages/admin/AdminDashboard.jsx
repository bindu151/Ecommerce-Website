function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <p>Welcome to the Admin Panel</p>

      <div className="stats-container">

        <div className="stat-card">
          <h3>Total Users</h3>
          <p>500</p>
        </div>

        <div className="stat-card">
          <h3>Total Sellers</h3>
          <p>30</p>
        </div>

        <div className="stat-card">
          <h3>Total Products</h3>
          <p>800</p>
        </div>

        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>1200</p>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;