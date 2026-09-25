import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SideBar from "./components/SideBar";
import ProductList from "./components/ProductList";

function App() {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 50000,
      rating: 4.5
    },
    {
      id: 2,
      name: "T-Shirt",
      category: "Fashion",
      price: 999,
      rating: 4.2
    },
    {
      id: 3,
      name: "JavaScript Book",
      category: "Books",
      price: 599,
      rating: 4.7
    },
    {
      id: 4,
      name: "Headphones",
      category: "Electronics",
      price: 1999,
      rating: 3.8
    }
  ];
  const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesCategory =
    category === "All" || product.category === category;

  return matchesSearch && matchesCategory;
});

  return (
    <div>
      <h1>Ecommerce Products</h1>

      <SearchBar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
/>

      <SideBar onCategory={setCategory} />

      <ProductList products={filteredProducts} />
    </div>
  );
}

export default App;