import { Routes, Route } from "react-router-dom";

import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Payment from "../pages/payment";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/products" element={<Products />} />

      <Route
        path="/products/:id"
        element={<ProductDetails />}
      />

      <Route path="/payment" element={<Payment />} />

    </Routes>
  );
}

export default AppRoutes;