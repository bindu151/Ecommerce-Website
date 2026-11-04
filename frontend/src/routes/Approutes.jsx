import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import AuthPage from "../pages/AuthPage";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Payment from "../pages/payment";
import PaymentSuccess from "../pages/paymentsuccess";;
import ProductFilter from "../pages/Productfilter";
import Cart from "../Cart";
import Checkout from "../Checkout";

import SellerDashboard from "../pages/SellerDashboard";
import SellerLogin from "../pages/SellerLogin";
import SellerRegister from "../pages/SellerRegister";


// Admin
import AdminLayout from "../components/admin/AdminLayout";
import AdminRegister from "../pages/admin/AdminRegister";
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

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthPage />} />

      {/* Existing Ecommerce routes */}
      <Route path="/products" element={<Products />} />
      <Route path="/seller/dashboard" element={<SellerDashboard />} />
      
      <Route path="/seller/login" element={<SellerLogin />} />
      <Route path="/seller/register" element={<SellerRegister />} />

      <Route
        path="/products/:id"
        element={<ProductDetails />}
      />

      <Route path="/payment" element={<Payment />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      <Route path="/productfilter" element={<ProductFilter />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />

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