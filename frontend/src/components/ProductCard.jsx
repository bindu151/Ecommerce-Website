import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <h3>{product.name}</h3>

        <p className="product-price">₹{product.price}</p>

        <p className="product-seller">
          Seller: {product.seller}
        </p>

        <Link
          to={`/products/${product.id}`}
          className="view-product-btn"
        >
          View Product
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;