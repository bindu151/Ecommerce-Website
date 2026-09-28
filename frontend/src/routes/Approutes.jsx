import { Routes, Route } from "react-router-dom";

// Home
import Home from "../pages/Home";

// Authentication
import Login from "../pages/Login";
import Register from "../pages/Register";

// Products
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";

// Cart & Checkout
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

// Payment
import Payment from "../pages/Payment";
import PaymentSuccess from "../pages/PaymentSuccess";

// Seller
import SellerDashboard from "../pages/SellerDashboard";
import AddProduct from "../pages/AddProduct";
import ManageProducts from "../pages/ManageProducts";
import SellerOrders from "../pages/SellerOrders";
import ShopProfile from "../pages/ShopProfile";

// Admin
import AdminDashboard from "../pages/AdminDashboard";
import ManageUsers from "../pages/ManageUsers";
import ManageSellers from "../pages/ManageSellers";
import ManageOrders from "../pages/ManageOrders";

// Orders, Profile & Referral
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";
import Profile from "../pages/Profile";
import Referral from "../pages/Referral";

function AppRoutes() {
  return (
    <Routes>

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Products */}
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />

      {/* Cart & Checkout */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* Payment */}
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />

      {/* Seller */}
      <Route path="/seller" element={<SellerDashboard />} />
      <Route path="/seller/add-product" element={<AddProduct />} />
      <Route path="/seller/products" element={<ManageProducts />} />
      <Route path="/seller/orders" element={<SellerOrders />} />
      <Route path="/seller/profile" element={<ShopProfile />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<ManageUsers />} />
      <Route path="/admin/sellers" element={<ManageSellers />} />
      <Route path="/admin/orders" element={<ManageOrders />} />

      {/* Orders, Profile & Referral */}
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/referral" element={<Referral />} />

    </Routes>
  );
}

export default AppRoutes;