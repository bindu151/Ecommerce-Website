import React from "react";

function Sidebar({ setCategory, setPriceRange }) {
  return (
    <aside className="filter-sidebar">
      <h2>Filters</h2>

      <h3>Category</h3>

      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
        <option value="Home">Home</option>
        <option value="Books">Books</option>
      </select>

      <h3>Price</h3>

      <select onChange={(e) => setPriceRange(e.target.value)}>
        <option value="All">All</option>
        <option value="0-1000">Below ₹1,000</option>
        <option value="1000-5000">₹1,000 - ₹5,000</option>
        <option value="5000-50000">₹5,000 - ₹50,000</option>
      </select>
    </aside>
  );
}

export default Sidebar;