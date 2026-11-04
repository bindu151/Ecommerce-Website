import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/admin/login");
  };

  return (
    <aside className="admin-sidebar">

      <div className="admin-sidebar-header">
        <h2>ADMIN PANEL</h2>
        <p>Ecommerce Management</p>
      </div>

      <nav className="admin-menu">

        <Link to="/admin/dashboard">
          <span>📊</span>
          Dashboard
        </Link><br />

        <Link to="/admin/users">
          <span>👥</span>
          Users
        </Link><br />

        <Link to="/admin/sellers">
          <span>🏪</span>
          Sellers
        </Link><br />

        <Link to="/admin/products">
          <span>📦</span>
          Products
        </Link><br />

        <Link to="/admin/orders">
          <span>🛒</span>
          Orders
        </Link><br />

        <Link to="/admin/reports">
          <span>📈</span>
          Reports
        </Link><br />

        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          <span>🚪</span>
          Logout
        </button>

      </nav>

    </aside>
  );
}

export default AdminSidebar;