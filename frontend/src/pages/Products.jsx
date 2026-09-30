import ProductCard from "../components/ProductCard";
import "../css/products.css";

function Products() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 1999,
      seller: "Tech Store",
      image: "https://via.placeholder.com/250x200?text=Headphones",
    },

    {
      id: 2,
      name: "Smart Watch",
      price: 2499,
      seller: "Digital World",
      image: "https://via.placeholder.com/250x200?text=Smart+Watch",
    },

    {
      id: 3,
      name: "Laptop Backpack",
      price: 1299,
      seller: "Bag World",
      image: "https://via.placeholder.com/250x200?text=Backpack",
    },

    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 1599,
      seller: "Sound Hub",
      image: "https://via.placeholder.com/250x200?text=Speaker",
    },
  ];

  return (
    <div className="products-page">

      <div className="products-header">
        <h1>All Products</h1>
        <p>Explore products from different sellers</p>
      </div>

      <div className="products-grid">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </div>
  );
}

export default Products;