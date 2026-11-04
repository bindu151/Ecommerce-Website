import { useParams, Link, useNavigate } from "react-router-dom";
import "../css/products.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 1999,
      seller: "Tech Store",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
      description:
        "High-quality wireless headphones with clear sound and a comfortable design.",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 2499,
      seller: "Digital World",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
      description:
        "Smart watch with fitness tracking, notifications and a modern design.",
    },
    {
      id: 3,
      name: "Laptop Backpack",
      price: 1299,
      seller: "Bag World",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
      description:
        "Durable laptop backpack suitable for college, office and travel.",
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 1599,
      seller: "Sound Hub",
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
      description:
        "Portable Bluetooth speaker with powerful sound and a compact design.",
    },
  ];

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const addToCart = () => {
    const existingCart = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );

    const existingItem = existingCart.find(
      (item) => Number(item.id) === product.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        Number(item.id) === product.id
          ? { ...item, quantity: (Number(item.quantity) || 1) + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        { ...product, quantity: 1 },
      ];
    }

    localStorage.setItem(
      "cartItems",
      JSON.stringify(updatedCart)
    );

    navigate("/cart");
  };

  const buyNow = () => {
    addToCart();
  };

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <Link to="/products">Back to Products</Link>
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
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="product-details-info">
          <h1>{product.name}</h1>

          <p className="details-price">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <p>
            <strong>Seller:</strong> {product.seller}
          </p>

          <p className="details-description">
            {product.description}
          </p>

          <button
            type="button"
            className="add-cart-btn"
            onClick={addToCart}
          >
            Add to Cart
          </button>

          <button
            type="button"
            className="buy-now-btn"
            onClick={buyNow}
          >
            Buy Now
          </button>

          <br />

          <Link to="/products" className="back-products">
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
