import { Routes, Route } from "react-router-dom";

import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Payment from "../pages/payment";
import ProductFilter from "../pages/Productfilter";

// Admin
import AdminLayout from "../components/admin/AdminLayout";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminSellers from "../pages/admin/AdminSellers";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminReports from "../pages/admin/AdminReports";

function AppRoutes() {
  return (
    <Routes>

      {/* Existing Ecommerce routes */}
      <Route path="/products" element={<Products />} />

      <Route
        path="/products/:id"
        element={<ProductDetails />}
      />

      <Route path="/payment" element={<Payment />} />

      <Route path="/productfilter" element={<ProductFilter />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Layout */}
      <Route path="/admin" element={<AdminLayout />}>

        <Route path="dashboard" element={<AdminDashboard />} />

        <Route path="users" element={<AdminUsers />} />

        <Route path="sellers" element={<AdminSellers />} />

        <Route path="products" element={<AdminProducts />} />

        <Route path="orders" element={<AdminOrders />} />

        <Route path="reports" element={<AdminReports />} />

      </Route>

    </Routes>
  );
}

export default AppRoutes;