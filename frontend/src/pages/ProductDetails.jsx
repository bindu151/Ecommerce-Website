import { useParams, Link } from "react-router-dom";
import "../css/products.css";

function ProductDetails() {
  const { id } = useParams();

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 1999,
      seller: "Tech Store",
      image: "https://via.placeholder.com/400x300?text=Headphones",
      description:
        "High-quality wireless headphones with clear sound and comfortable design.",
    },

    {
      id: 2,
      name: "Smart Watch",
      price: 2499,
      seller: "Digital World",
      image: "https://via.placeholder.com/400x300?text=Smart+Watch",
      description:
        "Smart watch with fitness tracking, notifications and modern design.",
    },

    {
      id: 3,
      name: "Laptop Backpack",
      price: 1299,
      seller: "Bag World",
      image: "https://via.placeholder.com/400x300?text=Backpack",
      description:
        "Durable laptop backpack suitable for college, office and travel.",
    },

    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 1599,
      seller: "Sound Hub",
      image: "https://via.placeholder.com/400x300?text=Speaker",
      description:
        "Portable Bluetooth speaker with powerful sound and compact design.",
    },
  ];

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>

        <Link to="/products">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="product-details-page">

      <div className="product-details-card">

        <div className="product-details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="product-details-info">

          <h1>{product.name}</h1>

          <p className="details-price">
            ₹{product.price}
          </p>

          <p>
            <strong>Seller:</strong> {product.seller}
          </p>

          <p className="details-description">
            {product.description}
          </p>

          <button className="add-cart-btn">
            Add to Cart
          </button>

          <button className="buy-now-btn">
            Buy Now
          </button>

          <br />

          <Link
            to="/products"
            className="back-products"
          >
            ← Back to Products
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;