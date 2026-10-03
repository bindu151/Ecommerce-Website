
import { Routes, Route, Navigate } from "react-router-dom";

import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Payment from "../pages/Payment";
import ProductFilter from "../pages/ProductFilter";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/productfilter" element={<ProductFilter />} />
    </Routes>
  );
}

export default AppRoutes;