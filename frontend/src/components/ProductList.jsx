function ProductList({ products = [] }) {
  return (
    <div className="product-list">
      <h2>Products</h2>

      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <h3>{product.name}</h3>

          <p>Category: {product.category}</p>

          <p>Price: ₹{product.price}</p>

          <p>Rating: ⭐ {product.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;