import "./products.css";

function ProductDetails({
  product,
  onBack,
  onAddToCart,
}) {
  if (!product) {
    return (
      <main className="products-page">
        <p>Product details are unavailable.</p>

        <button type="button" onClick={onBack}>
          Back to Products
        </button>
      </main>
    );
  }

  return (
    <main className="products-page">
      <button
        type="button"
        className="product-details__back"
        onClick={onBack}
      >
        ← Back to Products
      </button>

      <section className="product-details">
        <div className="product-details__image">
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

        <div className="product-details__content">
          {product.category && (
            <p className="product-card__category">
              {product.category}
            </p>
          )}

          <h1>{product.name}</h1>

          <p className="product-details__price">
            {product.price}
          </p>

          <p className="product-details__description">
            {product.description ||
              "No description available for this product."}
          </p>

          <button
            type="button"
            className="product-details__add"
            onClick={() => onAddToCart?.(product)}
          >
            Add to Cart
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;