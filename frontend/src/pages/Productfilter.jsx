import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/SideBar";
import "../css/search.css";

function ProductFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  return (
    <div className="filter-page">

      <h1>Search & Filter Products</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="filter-layout">

        <Sidebar
          setCategory={setCategory}
          setPriceRange={setPriceRange}
        />

        <div className="filter-results">

          <h2>Product Results</h2>

          <p>
            Search: {searchTerm || "All Products"}
          </p>

          <p>
            Category: {category}
          </p>

          <p>
            Price: {priceRange}
          </p>

        </div>

      </div>

    </div>
  );
}

export default ProductFilter;