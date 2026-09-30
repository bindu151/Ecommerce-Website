function AdminSidebar({ setPage, onLogout }) {
  return (
    <div className="admin-sidebar">
      <h2>ADMIN PANEL</h2>

      <div className="admin-menu">

        <p onClick={() => setPage("dashboard")}>
          Dashboard
        </p>

        <p onClick={() => setPage("users")}>
          Users
        </p>

        <p onClick={() => setPage("sellers")}>
          Sellers
        </p>

        <p onClick={() => setPage("products")}>
          Products
        </p>

        <p onClick={() => setPage("orders")}>
          Orders
        </p>

        <p onClick={() => setPage("reports")}>
          Reports
        </p>

        <p onClick={onLogout}>
          Logout
        </p>

      </div>
    </div>
  );
}

export default AdminSidebar;