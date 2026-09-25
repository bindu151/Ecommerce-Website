import { Routes, Route } from "react-router-dom";
import Payment from "../pages/payment";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}

export default AppRoutes;