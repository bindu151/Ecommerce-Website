import ProductCard from "../components/ProductCard";
import "../css/products.css";

function Products() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 1999,
      seller: "Tech Store",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    },

    {
      id: 2,
      name: "Smart Watch",
      price: 2499,
      seller: "Digital World",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    },

    {
      id: 3,
      name: "Laptop Backpack",
      price: 1299,
      seller: "Bag World",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    },

    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 1599,
      seller: "Sound Hub",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
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