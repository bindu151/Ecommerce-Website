
import { Link } from "react-router-dom";
import "../css/navbar.css";

function Navbar() {
  return (
    <nav>
      <h2>ShopEase</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login / Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
