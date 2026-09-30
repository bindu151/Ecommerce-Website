import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import "../css/search.css";

function ProductFilter() {

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  return (
    <div className="filter-results">

  <div className="results-header">
    <div>
      <h2>Products</h2>
      <span className="results-count">24 products found</span>
    </div>

    <div className="sort-section">
      <label>Sort by:</label>

      <select>
        <option>Relevance</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
        <option>Customer Rating</option>
      </select>
    </div>
  </div>

  <div className="product-grid">

    <div className="search-product-card">

      <div className="search-product-image">
        <span className="discount-badge">20% OFF</span>

        <img
          src="/images/product1.jpg"
          alt="Product"
        />
      </div>

      <div className="search-product-info">

        <h3>Wireless Headphones</h3>

        <p className="product-description">
          Bluetooth wireless headphones
        </p>

        <span className="product-rating">
          ★ 4.3
        </span>

        <p>
          <span className="product-price">₹1,599</span>

          <span className="old-price">
            ₹1,999
          </span>

          <span className="discount-text">
            20% off
          </span>
        </p>

        <button className="view-product-btn">
          View Product
        </button>

      </div>

    </div>

  </div>

</div>
  );
}

export default ProductFilter;