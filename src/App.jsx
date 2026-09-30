import { useState } from "react";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSellers from "./pages/admin/AdminSellers";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminReports from "./pages/admin/AdminReports";
import AdminLogin from "./pages/admin/AdminLogin";

import AdminSidebar from "./components/admin/AdminSidebar";

function App() {
  const [page, setPage] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPage("login");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setPage("dashboard");
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-container">
        <main className="admin-content">
          <AdminLogin onLogin={handleLogin} />
        </main>
      </div>
    );
  }

  return (
    <div className="admin-container">

      <AdminSidebar
        setPage={setPage}
        onLogout={handleLogout}
      />

      <main className="admin-content">

        {page === "dashboard" && <AdminDashboard />}

        {page === "users" && <AdminUsers />}

        {page === "sellers" && <AdminSellers />}

        {page === "products" && <AdminProducts />}

        {page === "orders" && <AdminOrders />}

        {page === "reports" && <AdminReports />}

      </main>

    </div>
  );
}

export default App;