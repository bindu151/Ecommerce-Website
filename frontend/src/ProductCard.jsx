function ProductCard({ product, onViewDetails, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-card__image">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
          />
        ) : (
          <div className="product-card__placeholder">
            No image available
          </div>
        )}
      </div>

      <div className="product-card__content">
        {product.category && (
          <p className="product-card__category">
            {product.category}
          </p>
        )}

        <h3 className="product-card__name">
          {product.name}
        </h3>

        <p className="product-card__price">
          {product.price}
        </p>

        <div className="product-card__actions">
          <button
            type="button"
            onClick={() => onViewDetails?.(product)}
          >
            View Details
          </button>

          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;