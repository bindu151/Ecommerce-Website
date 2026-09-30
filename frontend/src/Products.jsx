import ProductCard from "./ProductCard";
import "./products.css";

function Products({
  products = [],
  onViewDetails,
  onAddToCart,
}) {
  return (
    <main className="products-page">
      <header className="products-page__header">
        <h1 className="products-page__title">
          Our Products
        </h1>

        <p className="products-page__subtitle">
          Explore our collection
        </p>
      </header>

      {products.length > 0 ? (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id ?? product.name}
              product={product}
              onViewDetails={onViewDetails}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <p>No products available right now.</p>
      )}
    </main>
  );
}

export default Products;